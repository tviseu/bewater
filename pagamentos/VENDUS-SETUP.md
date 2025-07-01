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
| Café €1.50 | Alimentação | 23% |
| Água €1.00 | Alimentação | 23% |
| Barra Proteína €3.50 | Alimentação | 23% |
| Shaker €12.00 | Equipamentos | 23% |
| Suplemento €25.00 | Equipamentos | 23% |
| Donativo €1-100 | Donativos | 0% |

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

## **🔍 TROUBLESHOOTING**

### **❌ Erro: "VENDUS_API_KEY não configurado"**
- **Solução**: Verificar se a variável está corretamente adicionada no Netlify

### **❌ Erro: "Vendus API erro 401"**
- **Causa**: API key inválida
- **Solução**: Verificar se copiei a chave corretamente: `f3842572b2837ff927bad6fbe82c3b35`

### **❌ Erro: "Vendus API erro 404"**
- **Causa**: Endpoint incorreto
- **Solução**: Verificar URL base: `https://www.vendus.pt/ws`

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

🎯 **Sistema pronto para faturação automática!** 