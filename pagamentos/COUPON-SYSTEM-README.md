# Sistema de Cupões de Desconto - BE WATER

Sistema de referência que permite a sócios atuais ou cupões genéricos darem **50% de desconto** na próxima mensalidade (tanto para o novo sócio como para o referenciador).

## 📋 Índice

1. [Como Funciona](#como-funciona)
2. [Setup Inicial](#setup-inicial)
3. [Gestão de Cupões](#gestão-de-cupões)
4. [Fluxo do Utilizador](#fluxo-do-utilizador)
5. [Troubleshooting](#troubleshooting)

---

## 🎯 Como Funciona

### Arquitetura

```
Frontend (GitHub Pages) → Supabase (validação) → Formspark (notificações)
```

**Stack:**
- **Frontend:** HTML + JavaScript puro (sem build, sem Node.js)
- **Database:** Supabase (PostgreSQL com RLS)
- **Notifications:** Formspark (email para bewaterlisboa@gmail.com)

### Fluxo Completo (Simplificado)

1. **User abre modal de subscrição** (Elite/Rise/Starter)
2. **Pré-Form:** Opcionalmente insere cupão (email de sócio ou código genérico)
3. **Validação:** Sistema verifica cupão no Supabase em tempo real
4. **Notificação Imediata:** Se válido, email automático enviado para staff via Formspark
5. **REGYFIT:** User completa inscrição normal no iframe REGYFIT (paga valor COMPLETO)
6. **Staff:** Aplica **50% desconto na PRÓXIMA mensalidade** para ambos (novo sócio + referenciador)

**IMPORTANTE:** O desconto é aplicado na **PRÓXIMA mensalidade**, não na primeira. O user paga valor completo na inscrição inicial.

---

## 🚀 Setup Inicial

### 1. Configurar Supabase

#### 1.1 Criar Projeto Supabase

1. Ir a [supabase.com](https://supabase.com)
2. Criar novo projeto
3. Guardar credenciais:
   - **URL:** `https://xxxx.supabase.co`
   - **ANON_KEY:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### 1.2 Executar SQL Setup

1. Ir ao **SQL Editor** no dashboard Supabase
2. Abrir o ficheiro `supabase-coupons-setup.sql`
3. Copiar **todo o conteúdo**
4. Colar no SQL Editor
5. Clicar **Run**

Isto cria:
- Tabela `coupons` (armazena cupões válidos)
- Tabela `coupon_usages` (histórico de utilizações)
- Row Level Security (RLS) para segurança
- Índices para performance

#### 1.3 Atualizar index.html com Credenciais

Abrir `index.html` e substituir:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

Por:

```javascript
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 2. Verificar Formspark

O form Formspark já está configurado:
- **Form ID:** `cMzqixKrn`
- **Email destino:** bewaterlisboa@gmail.com

Se precisares de alterar, editar em `src/js/coupons.js`:

```javascript
const COUPON_CONFIG = {
  FORMSPARK_ID: 'cMzqixKrn', // Alterar aqui
  // ...
};
```

### 3. Importar Emails de Sócios

#### Opção A: Via SQL (recomendado)

1. Abrir Excel com emails dos sócios
2. Abrir ficheiro `member-emails-import.sql`
3. Substituir os emails de exemplo pelos emails reais:

```sql
INSERT INTO coupons (code, type, active) VALUES
  ('socio1@gmail.com', 'member_email', true),
  ('socio2@hotmail.com', 'member_email', true),
  ('socio3@yahoo.com', 'member_email', true)
  -- ... adicionar mais
ON CONFLICT (code) DO NOTHING;
```

4. Executar no SQL Editor do Supabase

#### Opção B: Fórmula Excel para Gerar SQL

Na célula B1 do Excel (assumindo emails na coluna A):

```
="('"&A1&"', 'member_email', true),"
```

Arrastar para baixo, copiar coluna B, colar no SQL.

---

## 🎟️ Gestão de Cupões

### Ver Todos os Cupões

```sql
SELECT * FROM coupons ORDER BY created_at DESC;
```

### Ver Apenas Ativos

```sql
SELECT * FROM coupons WHERE active = true ORDER BY type, code;
```

### Adicionar Novo Email de Sócio

```sql
INSERT INTO coupons (code, type, active) VALUES
  ('novo.socio@email.com', 'member_email', true);
```

### Adicionar Cupão Genérico

```sql
INSERT INTO coupons (code, type, active) VALUES
  ('PROMO2025', 'generic', true);
```

### Desativar Cupão (sem apagar)

```sql
UPDATE coupons SET active = false WHERE code = 'socio@email.com';
```

### Reativar Cupão

```sql
UPDATE coupons SET active = true WHERE code = 'socio@email.com';
```

### Apagar Cupão Permanentemente

```sql
DELETE FROM coupons WHERE code = 'socio@email.com';
```

---

## 📊 Relatórios e Estatísticas

### Ver Utilizações de Cupões

```sql
SELECT * FROM coupon_usages ORDER BY used_at DESC;
```

### Cupões Mais Utilizados

```sql
SELECT 
  cu.coupon_code, 
  c.type, 
  COUNT(*) as vezes_usado
FROM coupon_usages cu
LEFT JOIN coupons c ON cu.coupon_code = c.code
GROUP BY cu.coupon_code, c.type
ORDER BY vezes_usado DESC
LIMIT 10;
```

### Utilizações por Plano

```sql
SELECT plan_type, COUNT(*) as total
FROM coupon_usages
GROUP BY plan_type
ORDER BY total DESC;
```

### Utilizações nos Últimos 30 Dias

```sql
SELECT DATE(used_at) as dia, COUNT(*) as utilizacoes
FROM coupon_usages
WHERE used_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(used_at)
ORDER BY dia DESC;
```

### Total de Descontos a Aplicar

```sql
-- Cada utilização = 2 descontos (novo sócio + referenciador)
SELECT COUNT(*) * 2 as total_descontos_pendentes
FROM coupon_usages
WHERE notification_sent = false;
```

---

## 👤 Fluxo do Utilizador (Frontend)

### 1. Utilizador Abre Modal de Subscrição

- Clica em "INSCREVE-TE" num dos planos (Elite, Rise, Starter)
- Modal abre com **pré-form de cupão**

### 2. Pré-Form: Validação de Cupão

**Opção A:** Tem cupão
1. Insere email de sócio ou código genérico (ex: `socio@email.com` ou `PROMO2025`)
2. Clica "VALIDAR CUPÃO"
3. Sistema consulta Supabase em tempo real
4. Se válido: 
   - Mensagem verde "✅ Cupão válido! Email enviado para staff"
   - Email enviado automaticamente via Formspark para bewaterlisboa@gmail.com
   - Uso guardado na tabela `coupon_usages`
   - Botão "CONTINUAR PARA INSCRIÇÃO" aparece
5. User vê explicação: **"Pagas valor COMPLETO agora, desconto 50% na PRÓXIMA mensalidade"**

**Opção B:** Não tem cupão
1. Clica "NÃO TENHO CUPÃO"
2. Vai direto para REGYFIT

### 3. REGYFIT: Inscrição Normal

- Iframe REGYFIT carrega
- User preenche dados normalmente (nome, email, telefone, etc.)
- Completa inscrição e **paga valor COMPLETO** (primeira mensalidade + taxa inscrição)
- **Fim do fluxo online** - não há mais pop-ups ou formulários

### 4. Staff Aplica Desconto Manualmente

- Staff recebe email com cupão usado
- Na próxima cobrança mensal:
  - **Novo sócio:** 50% desconto
  - **Sócio referenciador:** 50% desconto
- Ambos pagam metade do valor na segunda mensalidade

---

## 📧 Email de Notificação (Simplificado)

Quando um cupão é validado, o staff recebe email automático via Formspark:

```
Para: bewaterlisboa@gmail.com
Assunto: 🎟️ Novo Cupão Utilizado - Elite

🎟️ CUPÃO USADO:
Código: maria@socio.com
Tipo: Email de Sócio
Plano: Elite

💰 ACÇÃO NECESSÁRIA:
1. Aguardar inscrição REGYFIT completar
2. Identificar novo sócio no sistema REGYFIT
3. Aplicar 50% desconto na PRÓXIMA mensalidade:
   - Novo sócio
   - Sócio maria@socio.com (referenciador)
```

**NOTA:** Os dados do novo sócio (nome, telefone) são capturados pelo REGYFIT e ficam disponíveis no sistema de gestão do ginásio.

**Staff deve:**
1. Consultar REGYFIT para identificar nova inscrição recente no plano mencionado
2. Aplicar 50% desconto ao novo sócio (na PRÓXIMA mensalidade)
3. Aplicar 50% desconto ao sócio referenciador (na PRÓXIMA mensalidade)
4. Marcar como concluído

---

## 🔧 Troubleshooting

### Cupão não valida

**Problema:** Ao inserir cupão, dá erro ou não valida.

**Soluções:**
1. Verificar se Supabase está configurado no `index.html`
2. Abrir DevTools (F12) → Console → ver erros
3. Verificar se cupão existe e está ativo:
   ```sql
   SELECT * FROM coupons WHERE code = 'email@teste.com';
   ```
4. Verificar RLS policies no Supabase

### Email de notificação não chega

**Problema:** Cupão é registado mas email não chega.

**Soluções:**
1. Verificar Form ID Formspark em `src/js/coupons.js`
2. Ver se email foi para SPAM
3. Verificar logs no Formspark dashboard
4. Testar Formspark manualmente

### Modal não mostra pré-form

**Problema:** Modal abre direto no REGYFIT, sem cupão.

**Soluções:**
1. Verificar se ficheiro `src/js/coupons.js` está carregado
2. Abrir DevTools → Console → procurar erros JavaScript
3. Verificar se CSS foi carregado (procurar por `.coupon-pre-form` nos estilos)

### Dados não são guardados no Supabase

**Problema:** Cupão valida mas não guarda utilização.

**Soluções:**
1. Verificar RLS policy de INSERT na tabela `coupon_usages`
2. Ver logs no Supabase: Settings → Logs → Database
3. Verificar se ANON_KEY está correto

---

## 🔒 Segurança

### Por que a ANON_KEY está no código?

A chave `ANON_KEY` do Supabase é pública por design. A segurança vem do **Row Level Security (RLS)**:

- **Leitura:** Apenas cupões **ativos** podem ser lidos
- **Escrita:** Apenas **inserções** na tabela `coupon_usages`
- **Admin:** Modificar cupões requer `service_role` key (secreta)

### Teste de Segurança

Tentar modificar cupão via browser console:

```javascript
// Isto DEVE FALHAR por causa do RLS
await supabase.from('coupons').delete().eq('code', 'teste@email.com');
// Erro: "permission denied"
```

---

## 🚀 Deploy

### GitHub Pages

1. Fazer commit de todos os ficheiros
2. Push para GitHub
3. GitHub Pages serve automaticamente
4. **Tudo funciona!** ✅

### Netlify (alternativa)

1. Conectar repo ao Netlify
2. Build settings: nenhum (site estático)
3. Deploy!

---

## 📝 Manutenção Regular

### Semanal

1. Ver emails de notificação
2. Aplicar descontos
3. Atualizar lista de emails de sócios (se necessário)

### Mensal

1. Ver relatório de utilizações:
   ```sql
   SELECT * FROM coupon_usages 
   WHERE used_at >= DATE_TRUNC('month', NOW());
   ```
2. Desativar cupões expirados (se aplicável)
3. Limpar utilizações antigas (opcional)

---

## 💡 Ideias Futuras

- [ ] Dashboard admin para gerir cupões (sem SQL)
- [ ] Limites de utilização por cupão
- [ ] Cupões com data de expiração
- [ ] Descontos variáveis (não apenas 50%)
- [ ] Integração direta com REGYFIT API (se disponível)

---

## 📞 Suporte

**Problemas técnicos:**
- Ver secção [Troubleshooting](#troubleshooting)
- Logs do Supabase: Settings → Logs
- Logs do Formspark: Dashboard → Forms → cMzqixKrn

**Dúvidas sobre o sistema:**
- Reler esta documentação
- Verificar ficheiros SQL comentados
- Testar num ambiente de staging primeiro

---

**Sistema implementado em:** 2025  
**Versão:** 1.0  
**Stack:** HTML + JavaScript + Supabase + Formspark  
**Compatibilidade:** 100% GitHub Pages ✅

