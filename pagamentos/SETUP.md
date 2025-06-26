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

### **Adicionar Novos Produtos**
Em `pagamentos/netlify/functions/mbway-payment.js` ou `pagamentos/api/mbway-payment.js`:

```javascript
const PRODUTOS_PERMITIDOS = {
  'CAFE_001': { nome: 'Café', preco: 1.50 },
  'SUPLEMENTO_001': { nome: 'Suplemento Protein', preco: 25.00 },
  'AGUA_001': { nome: 'Água', preco: 1.00 },
  'BARRITA_001': { nome: 'Barra Proteína', preco: 3.50 },
  'SHAKER_001': { nome: 'Shaker BE WATER', preco: 12.00 },
  // ADICIONAR NOVOS PRODUTOS AQUI
  'NOVO_PRODUTO_001': { nome: 'Novo Produto', preco: 10.00 }
};
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

**🔥 Resultado Final: Sistema de pagamentos 100% seguro, grátis e organizado na pasta `pagamentos/`!** 