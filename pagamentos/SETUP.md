# 🛡️ SETUP PAGAMENTOS SEGUROS - BE WATER

Como configurar pagamentos MBWay seguros quando o site está no GitHub.

## 🚨 PROBLEMA COM GITHUB PAGES

**GitHub Pages** só suporta sites estáticos (HTML, CSS, JS).
**Não podes usar PHP** ou expor API keys no frontend.

## ✅ SOLUÇÕES SEGURAS

### **OPÇÃO 1: NETLIFY (RECOMENDADO)**

#### **1. Setup Inicial**
```bash
# 1. Cria conta no Netlify (grátis)
# 2. Conecta o teu repositório GitHub
# 3. Deploy automático ativado
```

#### **2. Estrutura de Ficheiros**
```
brutal-gym/
├── pagamentos/
│   ├── index.html
│   ├── netlify.toml
│   └── netlify/
│       └── functions/
│           └── mbway-payment.js
```

#### **3. Configurar Variáveis de Ambiente**
No dashboard do Netlify:
```
Site Settings > Environment Variables > Add Variable

EUPAGO_API_KEY = XXXX-XXXX-XXXX-XXXX-XXXX
EUPAGO_SANDBOX = true
```

#### **4. Deploy**
```bash
git add .
git commit -m "Add secure payment system"
git push origin main
# Netlify faz deploy automático
```

#### **5. URLs Funcionais**
```
https://bewater.netlify.app/pagamentos/
https://bewater.netlify.app/api/mbway/payment
```

---

### **OPÇÃO 2: VERCEL (ALTERNATIVA)**

#### **1. Setup Inicial**
```bash
# 1. Cria conta no Vercel (grátis)
# 2. Conecta o teu repositório GitHub
# 3. Deploy automático ativado
```

#### **2. Estrutura de Ficheiros**
```
brutal-gym/
├── pagamentos/
│   ├── index.html
│   ├── vercel.json
│   └── api/
│       └── mbway-payment.js
```

#### **3. Configurar Variáveis de Ambiente**
No dashboard do Vercel:
```
Project Settings > Environment Variables

EUPAGO_API_KEY = XXXX-XXXX-XXXX-XXXX-XXXX
EUPAGO_SANDBOX = true
```

#### **4. Deploy**
```bash
git add .
git commit -m "Add secure payment system"
git push origin main
# Vercel faz deploy automático
```

---

## 🔧 CONFIGURAÇÃO DOS PRODUTOS

### **⚠️ IMPORTANTE: 3 Ficheiros a Alterar**

Para **adicionar um novo produto**, tens que alterar **EXATAMENTE 3 ficheiros**:

#### **1️⃣ Frontend - `pagamentos/index.html`**
Adicionar o produto na seção correta:
```html
<div class="produto-card" data-id="NOVO_PRODUTO_001" data-nome="Novo Produto" data-preco="10.00">
    <div class="produto-icon">🆕</div>
    <div class="produto-nome" data-payment-i18n="product.novo-produto">Novo Produto</div>
    <div class="produto-preco">€10.00</div>
    <div class="produto-descricao" data-payment-i18n="product.novo-produto.desc">Descrição do produto</div>
    <button class="produto-btn" data-payment-i18n="product.btn">Pagar com MBWay</button>
</div>
```

#### **2️⃣ Traduções - `pagamentos/api/i18n.js`**
Adicionar traduções PT + EN:
```javascript
// Português
'product.novo-produto': 'Novo Produto',
'product.novo-produto.desc': 'Descrição em português',

// English (na seção en:)
'product.novo-produto': 'New Product',
'product.novo-produto.desc': 'English description',
```

#### **3️⃣ Backend - `pagamentos/netlify/functions/mbway-payment.js`**
Adicionar aos **2 arrays obrigatórios**:
```javascript
// Array 1: PRODUTOS_VENDUS (para faturas)
const PRODUTOS_VENDUS = {
  'NOVO_PRODUTO_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
  // ... outros produtos
};

// Array 2: PRODUTOS_PERMITIDOS (validação segurança)
const PRODUTOS_PERMITIDOS = {
  'NOVO_PRODUTO_001': { nome: 'Novo Produto', preco: 10.00 },
  // ... outros produtos
};
```

### **🎯 Checklist Novo Produto:**
- [ ] ✅ HTML: Produto adicionado na seção correta
- [ ] ✅ Traduções: PT + EN adicionadas no `i18n.js`
- [ ] ✅ Backend: Produto nos 2 arrays do `mbway-payment.js`
- [ ] ✅ Preços: Valores iguais nos 3 ficheiros
- [ ] ✅ IDs: Formato `NOME_PRODUTO_001` consistente

### **⚠️ Erros Comuns:**
- **Esquecer o `i18n.js`** → Traduções não funcionam
- **Esquecer 1 dos arrays** → Pagamentos falham
- **Preços diferentes** → Validação de segurança falha
- **IDs inconsistentes** → Produto não é encontrado

### **📂 Organização das Seções**

O site está organizado em **4 seções temáticas**:

#### **🥤 Hidratação & Energia** (`section.hydration-energy`)
- Bebidas, cafés, energia
- Exemplo: Café, Águas, Powerade, Coca Cola Zero, AminoX

#### **💪 Nutrição Warrior** (`section.nutrition-warrior`)
- Produtos proteicos sólidos
- Exemplo: Batidos, Barras, Cookies proteicas

#### **🎒 Essenciais do Dojo** (`section.dojo-essentials`)
- Acessórios e equipamentos
- Exemplo: Cadeados, Toalhas

#### **❤️ Apoio à Tribo** (`section.tribe-support`)
- Donativos e apoios
- Exemplo: Donativo variável

**Para mover produto entre seções:** cortar/colar o HTML do produto na seção correta do `index.html`

### **🔄 Exemplo Prático (Powerade):**
```html
<!-- index.html -->
<div class="produto-card" data-id="POWERADE_001" data-nome="Powerade" data-preco="2.90">
    <div class="produto-icon">⚡</div>
    <div class="produto-nome" data-payment-i18n="product.powerade">Powerade</div>
    <div class="produto-preco">€2.90</div>
    <div class="produto-descricao" data-payment-i18n="product.powerade.desc">Reposição de electrólitos para atletas</div>
    <button class="produto-btn" data-payment-i18n="product.btn">Pagar com MBWay</button>
</div>
```

```javascript
// i18n.js (PT)
'product.powerade': 'Powerade',
'product.powerade.desc': 'Reposição de electrólitos para atletas',

// i18n.js (EN)
'product.powerade': 'Powerade',
'product.powerade.desc': 'Electrolyte replacement for athletes',

// mbway-payment.js
'POWERADE_001': { nome: 'Consumivel BEWATER', iva: 0, categoria: 'Consumíveis', tax_exempt_reason: 'Artigo 53º do CIVA' },
'POWERADE_001': { nome: 'Powerade', preco: 2.90 },
```

### **URLs para QR Codes**
```
https://bewater.netlify.app/pagamentos/?produto=Café&preco=1.50&id=CAFE_001
https://bewater.netlify.app/pagamentos/?produto=Suplemento&preco=25.00&id=SUPLEMENTO_001
```

### **URLs Simplificadas (com redirects)**
```
https://bewater.netlify.app/pagamento  → redireciona para /pagamentos/
https://bewater.netlify.app/pay       → redireciona para /pagamentos/
```

---

## 🛡️ SEGURANÇA

### ✅ **O que está SEGURO:**
- API key protegida no servidor
- Validação de produtos e preços
- Validação de telemóveis e NIFs
- CORS configurado
- Logs de transações

### ❌ **O que NÃO fazer:**
- Nunca colocar API key no HTML
- Nunca fazer calls diretas à EuPago do frontend
- Nunca confiar só nas validações do frontend

---

## 🚀 TESTING

### **1. Sandbox Mode**
```
EUPAGO_SANDBOX = true
```
Usa URLs de teste da EuPago

### **2. Production Mode**
```
EUPAGO_SANDBOX = false
```
Usa URLs de produção da EuPago

### **3. Testar Localmente**
```bash
# Netlify CLI
npm install -g netlify-cli
cd pagamentos
netlify dev

# Vercel CLI
npm install -g vercel
cd pagamentos
vercel dev
```

---

## 💰 CUSTOS

### **Netlify/Vercel (Grátis):**
- 125.000 function calls/mês
- Bandwidth ilimitado
- Deploy automático
- SSL grátis

### **GitHub (Grátis):**
- Repositórios públicos ilimitados
- GitHub Actions (2000 min/mês)

**TOTAL: €0/mês** 🎉

---

## 🔄 WORKFLOW COMPLETO

1. **Cliente escaneia QR Code**
2. **Abre página de pagamento** (`/pagamentos/`)
3. **Insere telemóvel e NIF**
4. **Frontend chama Netlify/Vercel Function**
5. **Function valida e chama EuPago API**
6. **Cliente confirma no MBWay**
7. **Pagamento concluído**

---

## 📱 QR CODE GENERATOR

```javascript
// Usar biblioteca como qrcode.js
const qr = qrcode(0, 'M');
qr.addData('https://bewater.netlify.app/pagamentos/?produto=Café&preco=1.50&id=CAFE_001');
qr.make();
document.getElementById('qrcode').innerHTML = qr.createImgTag();
```

---

## 🗂️ ESTRUTURA FINAL

```
brutal-gym/
├── index.html                    (site principal)
├── src/
│   ├── css/
│   ├── js/
│   └── images/
└── pagamentos/                   (sistema de pagamentos)
    ├── index.html               (página de pagamento)
    ├── netlify.toml             (config Netlify)
    ├── vercel.json              (config Vercel)
    ├── SETUP.md                 (este guia)
    ├── netlify/
    │   └── functions/
    │       └── mbway-payment.js (Netlify Function)
    └── api/
        └── mbway-payment.js     (Vercel Function)
```

---

## 🆘 TROUBLESHOOTING

### **Function não funciona:**
- Verifica variáveis de ambiente
- Verifica logs no dashboard
- Testa localmente primeiro

### **CORS errors:**
- Ajusta origins permitidos
- Verifica headers das functions

### **EuPago errors:**
- Verifica API key
- Verifica se está em sandbox/produção correto
- Verifica formato dos dados enviados

### **Paths incorretos:**
- Verifica se os ficheiros estão na pasta `pagamentos/`
- Verifica configurações no `netlify.toml` ou `vercel.json`

---

---

## 🎉 NOVA FUNCIONALIDADE: CONFIRMAÇÃO DE PAGAMENTOS

### **⚡ Webhook EuPago + Dashboard Staff**

Agora o sistema tem **confirmação automática** quando os clientes pagam!

#### **📋 O que foi adicionado:**

1. **`payment-webhook.js`** - Recebe confirmações da EuPago
2. **`staff.html`** - Dashboard para o staff monitorizar pagamentos
3. **Gestão de estados** - Pendente → Confirmado → Entregue

#### **🔧 Configuração Webhook EuPago:**

1. **Aceder ao painel EuPago** → Webhooks 2.0
2. **Webhook Endpoint:** 
   ```
   https://cool-starship-a7a3e1.netlify.app/.netlify/functions/payment-webhook
   ```
3. **Tipo de Webhook:** ✅ Pagamento + ✅ Erro
4. **Encriptar Webhook:** ✅ Sim
5. **Gerar Chave Criptográfica** → Copiar chave
6. **Configurar no Netlify:**
   ```
   EUPAGO_WEBHOOK_SECRET = chave_gerada_eupago
   ```

#### **📱 Interface Staff:**

Aceder em: `https://cool-starship-a7a3e1.netlify.app/pagamentos/staff.html`

**Funcionalidades:**
- ✅ **Monitor em tempo real** - atualização automática a cada 10s
- ✅ **Filtros** - Ver por status (confirmado, pendente, entregue)
- ✅ **Estatísticas diárias** - total vendas, pagamentos, entregas
- ✅ **Botão "Entregar"** - marcar produto como entregue
- ✅ **Notificações visuais** - título da página muda com novos pagamentos
- ✅ **Responsive** - funciona em tablet/móvel

#### **🔄 Fluxo Completo:**

```
1. Cliente paga MBWay → "Pedido enviado"
2. Cliente confirma no telemóvel
3. EuPago envia webhook → pagamento confirmado
4. Staff vê notificação → "✅ Café pago - entregar"
5. Staff clica "Entregar" → produto marcado como entregue
```

#### **💡 Vantagens:**

- ✅ **Zero trabalho manual** - confirmações automáticas
- ✅ **Comprovativo real** - só produtos confirmados podem ser entregues
- ✅ **Controlo total** - dashboard com histórico completo
- ✅ **Notificações** - staff sabe imediatamente quando há pagamento
- ✅ **Estatísticas** - vendas diárias, produtos mais vendidos

#### **🎯 Para o Staff:**

1. **Deixar dashboard aberto** no computador/tablet do ginásio
2. **Quando toca notificação** → verificar novo pagamento
3. **Cliente mostra telemóvel** → confirmar que aparece como "✅ Confirmado"
4. **Entregar produto** → clicar botão "📦 Entregar"

---

**🔥 Resultado Final: Sistema de pagamentos 100% seguro, grátis e organizado na pasta `pagamentos/` com confirmação automática!** 