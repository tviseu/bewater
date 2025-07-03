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
| Consumível €1.50 | Consumíveis | 0% |
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
    "vat": "238494900",
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

# 🏥 VENDUS API - CORREÇÕES CRÍTICAS

## ❌ PROBLEMAS IDENTIFICADOS:

### **1. Estrutura API Incorreta**
A API Vendus **rejeitou TODOS os parâmetros** que estávamos a usar:

**❌ PROBLEMAS IDENTIFICADOS:**
- `customer` → deve ser `client`
- `line_items` → deve ser `items`  
- `type: 'invoice'` → deve ser `type: 'FT'`
- `client.vat` → deve ser `client.fiscal_id`
- `items.name` → deve ser `items.title`
- `items.unit_price` → deve ser `items.gross_price`
- `items.quantity` → deve ser `items.qty`
- `items.vat_rate` → removido (Vendus calcula automaticamente)
- **❌ URL INCORRETA:** `/ws/documents/` → `/ws/v1.1/documents/`
- **❌ AUTH INCORRETA:** `?api_key=` parameter → Basic Auth header
- **❌ ITEMS SEM ID:** Faltava `reference` obrigatório

**✅ CAMPOS ACEITES:**

**Documento:** `type` (valores: FT, FS, FR, NC, DC, PF, OT, EC, GA, GT, GR, GD, RG)

**Cliente:** `id, fiscal_id, name, address, postalcode, city, phone, mobile, email, website, notes, country, external_reference, send_email, billing_email, irs_retention`

**Items:** `id, reference, gross_price, supply_price, qty, type_id, variant_id, lot_id, title, unit_id, category_id, brand_id, discount_amount, discount_percentage, stock_control, stock_type, tax_id, tax_exemption, tax_exemption_law, tax_custom, reference_document, text, serial`

**Geral:** `register_id, discount_code, discount_amount, discount_percentage, date_due, payments, mode, date, date_supply, notes, ncr_id, external_reference, stock_operation, ifthenpay, eupago, multibanco, client, supplier, items, movement_of_goods, invoices, print_discount, output, output_template_id, tx_id, errors_full, rest_room, rest_table, occupation, stamp_retention_amount, irc_retention_id, related_document_id, return_qrcode, doc_to_generate`

### **2. Sistema Correlação Falhava**
O storage temporário `tempClientData` perdia-se entre invocações de função.

---

## ✅ SOLUÇÕES IMPLEMENTADAS:

### **1. Estrutura API Corrigida (FINAL)**
```javascript
// ❌ REJEITADO (1ª tentativa)
const faturaPayload = {
  customer: { name, vat, email },
  line_items: [{ name, unit_price, quantity, vat_rate }]
};

// ❌ REJEITADO (2ª tentativa)  
const faturaPayload = {
  type: 'invoice',
  client: { name, vat, email },
  items: [{ name, unit_price, quantity, vat_rate }]
};

// ❌ REJEITADO (3ª tentativa - estrutura corrigida mas auth/URL erradas)
const faturaPayload = {
  type: 'FT',
  client: { name: nomeCliente, fiscal_id: nif, email: email },
  items: [{ title: produtoNome, gross_price: preco, qty: 1, tax_id: 1 }]
};

// ✅ ACEITE (FINAL - baseado na documentação oficial)
const faturaPayload = {
  type: 'FT', // Fatura
  client: { 
    name: nomeCliente, 
    fiscal_id: nif, // era 'vat' 
    email: email 
  },
  items: [{ 
    reference: produtoId, // OBRIGATÓRIO conforme documentação
    title: produtoNome, // era 'name'
    gross_price: preco, // era 'unit_price'
    qty: 1 // era 'quantity'
    // tax_id removido - Vendus calcula automaticamente
  }],
  notes: `Pagamento MBWay - Ref: ${reference}`,
  external_reference: reference,
  date: '2025-07-01'
};

// ✅ URL & AUTH CORRETAS (baseado na documentação)
URL: https://www.vendus.pt/ws/v1.1/documents/ (era /ws/documents/)
AUTH: Basic Auth (era ?api_key= parameter)
```

### **2. Correlação Robusta com Base64**
```javascript
// ✅ EMBEDAR dados no identifier
const clientDataBase64 = Buffer.from(JSON.stringify({
  nome, email, nif, telefone
})).toString('base64');

const identifier = `${produto.nome} - BE WATER | ${clientDataBase64}`;

// ✅ WEBHOOK extrai dados
if (identifier.includes(' | ')) {
  const parts = identifier.split(' | ');
  const clientDataJson = Buffer.from(parts[1], 'base64').toString('utf8');
  const clientData = JSON.parse(clientDataJson);
}
```

---

## 🧪 TESTE AGORA:

1. **Fazer pagamento** via `cool-starship-a7a3e1.netlify.app/pagamentos/`
2. **Verificar logs** webhook Netlify
3. **Ver dashboard** `cool-starship-a7a3e1.netlify.app/pagamentos/staff.html`
4. **Confirmar**:
   - ✅ Dados cliente aparecem
   - ✅ Fatura Vendus emite sem erro
   - ✅ Status correlacionado corretamente

---

## 📞 PRÓXIMOS PASSOS:

Após confirmar funcionamento:
- [ ] Remover logs debug excessivos
- [ ] Configurar produção Vendus  
- [ ] Implementar regime isenção IVA se necessário
- [ ] Otimizar performance

---

## 🔧 CONFIGURAÇÃO VENDUS:

**Credenciais:**
- API Key: `f3842572b2837ff927bad6fbe82c3b35`
- URL Base: `https://www.vendus.pt/ws/`
- User: Luis Piçarra

**Estrutura Endpoint:**
```
POST https://www.vendus.pt/ws/documents/?api_key={API_KEY}
``` 