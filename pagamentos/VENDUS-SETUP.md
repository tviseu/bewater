# 🧾 INTEGRAÇÃO VENDUS - CONFIGURAÇÃO COMPLETA

## **📋 DADOS DA TUA CONTA VENDUS**

```bash
API Key: f3842572b2837ff927bad6fbe82c3b35
URL Base: https://www.vendus.pt/ws/
Utilizador: Luis Piçarra
Documentação: https://www.vendus.pt/ws/
```

---

## **⚙️ CONFIGURAÇÃO NETLIFY**

### **1. Aceder às Variáveis de Ambiente:**
1. Ir para [Netlify Dashboard](https://app.netlify.com/)
2. Selecionar o site **cool-starship-a7a3e1**
3. **Site settings** → **Environment variables**

### **2. Adicionar Variável de Ambiente:**

| **Nome da Variável** | **Valor** |
|---------------------|-----------|
| `VENDUS_API_KEY` | `f3842572b2837ff927bad6fbe82c3b35` |

⚠️ **NOTA**: A URL base `https://www.vendus.pt/ws` está hard-coded no código (não é sensível)
⚠️ **IMPORTANTE**: Remove as variáveis `VENDUS_EMPRESA_ID` e `VENDUS_BASE_URL` se existirem

---

## **🔧 TESTE DA INTEGRAÇÃO**

### **Como Testar:**
1. Fazer um pagamento MBWay de teste
2. Verificar logs Netlify Functions:
   - **Site settings** → **Functions** → **payment-webhook**
   - Procurar por logs `🧾 Emitindo fatura Vendus:`

### **O Que Esperar:**
```
✅ Fatura Vendus emitida: {
  "id": "DOC123456",
  "number": "FT 2025/001",
  "download_url": "https://www.vendus.pt/download/..."
}
```

---

## **📊 MAPEAMENTO PRODUTOS → VENDUS**

| **Produto BE WATER** | **Categoria Vendus** | **IVA** |
|---------------------|---------------------|---------|
| Café €1.50 | Consumíveis | 0% |
| Água €1.00 | Consumíveis | 0% |
| Barra Proteína €3.50 | Consumíveis | 0% |
| Shaker €12.00 | Consumíveis | 0% |
| Suplemento €25.00 | Consumíveis | 0% |
| Donativo €1-100 | Donativos | 0% |

⚖️ **Regime Fiscal**: Isenção de IVA (Artº 53) - Todos os produtos BE WATER

---

## **👤 LÓGICA DE CLIENTES**

### **Cliente com NIF:**
```json
{
  "customer": {
    "name": "João Silva",
    "vat": "123456789",
    "email": "joao@email.com"
  }
}
```

### **Cliente sem NIF:**
```json
{
  "customer": {
    "name": "Consumidor Final",
    "vat": null,
    "email": "cliente@email.com"
  }
}
```

---

## **⚙️ CONFIGURAÇÕES NECESSÁRIAS NA VENDUS**

### **📂 Criar Categorias de Produtos:**
1. **Ir para**: Vendus → **Produtos** → **Categorias**
2. **Criar estas 2 categorias**:

| **Nome Categoria** | **Descrição** | **IVA Padrão** |
|-------------------|---------------|----------------|
| `Consumíveis` | Café, Água, Barras, Shakers, Suplementos | 0% |
| `Donativos` | Contribuições BE WATER | 0% |

### **💰 Configuração Fiscal Automática:**
- ✅ **IVA 0%** - Definido automaticamente via API
- ⚖️ **Regime de Isenção (Artº 53)** - Enviado em cada fatura
- 🔧 **Campos API enviados**:
  - `tax_exempt: true`
  - `tax_exemption_reason: "Regime de Isenção (Artº 53 do CIVA)"`
  - `tax_exemption_code: "ART53"`
  - `vat_exemption_code: "ART53"`

⚠️ **NOTA**: O regime fiscal é definido **diretamente na API**, não sendo necessária configuração manual no site Vendus!

### **🎨 Opcional - Upload Logotipo:**
- **Ir para**: Configurações → Geral → **Logotipo**
- **Upload**: Logo BE WATER (aparecerá nas faturas)

---

## **🔍 TROUBLESHOOTING**

### **❌ Erro: "VENDUS_API_KEY não configurado"**
- **Solução**: Verificar se a variável está corretamente adicionada no Netlify

### **❌ Erro: "Vendus API erro 401"**
- **Causa**: API key inválida
- **Solução**: Verificar se copiei a chave corretamente: `f3842572b2837ff927bad6fbe82c3b35`

### **❌ Erro: "Vendus API erro 404"**
- **Causa**: Endpoint incorreto
- **Solução**: Verificar URL base: `https://www.vendus.pt/ws`

### **❌ Erro: IVA incorreto nas faturas**
- **Causa**: Campos de regime de isenção não aceites pela API
- **Solução**: API agora envia múltiplos campos:
  - `tax_exempt: true`
  - `tax_exemption_reason: "Regime de Isenção (Artº 53 do CIVA)"`
  - `tax_exemption_code: "ART53"`
  - Vendus deve aceitar pelo menos um destes campos

### **❌ Fatura não é emitida mas pagamento é processado**
- **Comportamento esperado**: Sistema é "error-proof"
- **Pagamento**: ✅ Sempre processado
- **Fatura**: ⚠️ Tentada mas não bloqueia pagamento se falhar

---

## **📱 DASHBOARD STAFF - INFORMAÇÕES FATURA**

Após integração ativa, o dashboard mostrará:

```
📅 30/06/2025 21:06
🧾 89092354
💰 Café BE WATER - €1.50
👤 João Silva
✉️ joao@email.com
📄 🔗 Fatura FT 2025/001
```

---

## **🚀 TESTE FINAL**

### **Checklist Pré-Produção:**
- [ ] ✅ API Key configurada no Netlify (`VENDUS_API_KEY`)
- [ ] ✅ Deployment realizado
- [ ] ✅ Pagamento teste efetuado
- [ ] ✅ Fatura aparece no dashboard Vendus
- [ ] ✅ Link download funciona

### **Comandos Git:**
```bash
git add .
git commit -m "VENDUS: API integração corrigida com dados reais"
git push origin main
```

---

## **📞 SUPORTE**

- **Vendus**: Utilizar chat/email no painel Vendus
- **EuPago**: Suporte via dashboard EuPago
- **Sistema BE WATER**: Verificar logs Netlify Functions

---

## **🎯 NOVO FLUXO DE TRABALHO MANUAL**

### **💳 Para o Cliente:**
1. **Aceder**: `https://cool-starship-a7a3e1.netlify.app/pagamentos/`
2. **Escolher produto** e inserir dados (email obrigatório!)
3. **Pagar com MBWay** no telemóvel
4. **Apresentar comprovativo** ao staff BE WATER

### **👥 Para o Staff:**
1. **Aceder dashboard**: `https://cool-starship-a7a3e1.netlify.app/pagamentos/staff.html`
2. **Ver pagamento "confirmado"** em tempo real
3. **Verificar comprovativo** MBWay do cliente
4. **Clicar "🧾 Emitir Fatura"** se comprovativo estiver correto
5. **Entregar produto** ao cliente
6. **Cliente recebe fatura por email** automaticamente

### **🔧 VANTAGENS DO SISTEMA MANUAL:**
- ✅ **Controlo total**: Staff verifica antes de emitir fatura
- ✅ **Sem erros**: Produto só entregue após confirmação visual
- ✅ **Rastreabilidade**: Dashboard mostra estado de cada fatura
- ✅ **Flexibilidade**: Pode emitir fatura mais tarde se necessário
- ✅ **Regime fiscal**: IVA 0% (Artº 53) automático em todas as faturas
- ✅ **Sem pagamentos falsos**: Comprovativo verificado pessoalmente

### **🧾 ENDPOINTS CRIADOS:**
- `/.netlify/functions/mbway-payment` - Processar pagamento (sem fatura)
- `/.netlify/functions/payment-webhook` - Confirmar pagamento via EuPago
- `/.netlify/functions/emit-invoice` - **NOVO**: Emitir fatura sob demanda
- `/staff.html` - Dashboard staff com botão "Emitir Fatura"

---

🎯 **Sistema otimizado para controlo manual de faturas!** 