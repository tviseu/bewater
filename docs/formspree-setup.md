# 📧 Guia de Configuração Formspree - BE WATER

## 🎯 Objetivo
Configurar o Formspree para recolher:
1. **Mensagens de contacto** do formulário principal
2. **Emails da newsletter** (só recolher, não enviar ainda)

---

## 📋 PASSO 1: Criar Conta Formspree

1. Ir a **https://formspree.io**
2. Clicar em **"Get Started"**
3. **Registar** com o email do BE WATER
4. **Verificar email** (checkmail)

---

## 📋 PASSO 2: Criar Formulário de CONTACTO

### 2.1 No Dashboard Formspree:
1. Clicar **"+ New Form"**
2. **Nome**: `BE WATER - Contacto`
3. **Email destino**: `seuemail@bewater.com` (ou o email que quiserem)
4. Clicar **"Create Form"**

### 2.2 Copiar o endpoint:
```
https://formspree.io/f/YOUR_CONTACT_ID
```
*(Guardar este ID para usar no código)*

---

## 📋 PASSO 3: Criar Formulário de NEWSLETTER

### 3.1 No Dashboard Formspree:
1. Clicar **"+ New Form"** novamente
2. **Nome**: `BE WATER - Newsletter`
3. **Email destino**: `seuemail@bewater.com` (mesmo email ou diferente)
4. Clicar **"Create Form"**

### 3.2 Copiar o endpoint:
```
https://formspree.io/f/YOUR_NEWSLETTER_ID
```
*(Guardar este ID também)*

---

## 📋 PASSO 4: Configurar Formulários no Website

### 4.1 Formulário de Contacto (index.html):

**ANTES:**
```html
<form class="contact__form">
```

**DEPOIS:**
```html
<form class="contact__form" action="https://formspree.io/f/YOUR_CONTACT_ID" method="POST">
```

### 4.2 Formulário Newsletter (index.html):

**ANTES:**
```html
<form class="footer__newsletter-form">
```

**DEPOIS:**
```html
<form class="footer__newsletter-form" action="https://formspree.io/f/YOUR_NEWSLETTER_ID" method="POST">
```

---

## 📋 PASSO 5: Adicionar Campos Obrigatórios

### 5.1 No formulário de contacto, adicionar:
```html
<input type="hidden" name="_subject" value="Nova mensagem BE WATER">
<input type="hidden" name="_next" value="https://seudominio.com/obrigado.html">
```

### 5.2 No formulário newsletter, adicionar:
```html
<input type="hidden" name="_subject" value="Nova subscrição newsletter BE WATER">
<input type="hidden" name="_next" value="https://seudominio.com/obrigado-newsletter.html">
```

---

## 📋 PASSO 6: Configurações Opcionais no Formspree

### 6.1 Anti-Spam:
- No dashboard → Form Settings
- Ativar **"reCAPTCHA"** (recomendado)

### 6.2 Auto-resposta:
- Configurar mensagem automática para quem envia
- Ex: "Obrigado pelo contacto! Responderemos em breve."

### 6.3 Notificações:
- Configurar emails de notificação personalizados
- Escolher quando receber notificações

---

## 📊 PASSO 7: Testar os Formulários

### 7.1 Teste de Contacto:
1. Preencher formulário no website
2. Verificar se recebem email
3. Verificar se aparece no dashboard Formspree

### 7.2 Teste de Newsletter:
1. Subscrever newsletter no website
2. Verificar se recebem notificação
3. Confirmar que email fica guardado

---

## 📈 PASSO 8: Acompanhar Resultados

### 8.1 Dashboard Formspree:
- **Submissions**: Ver todas as submissões
- **Export**: Exportar emails da newsletter
- **Analytics**: Estatísticas de uso

### 8.2 Plano Gratuito:
- **50 submissões/mês** (contacto + newsletter)
- **Unlimited forms**
- **Basic spam protection**

---

## 🚨 IMPORTANTE - IDs a Substituir

Quando configurarem, substituir:
- `YOUR_CONTACT_ID` → ID real do formulário de contacto
- `YOUR_NEWSLETTER_ID` → ID real do formulário de newsletter
- `seuemail@bewater.com` → Email real do BE WATER
- `seudominio.com` → Domínio real do website

---

## 💡 PRÓXIMOS PASSOS (Futuro)

### Quando quiserem enviar newsletters:
1. **Exportar** emails do Formspree
2. **Importar** para Mailchimp/ConvertKit
3. **Criar** campaigns de email marketing
4. **GDPR**: Adicionar checkbox de consentimento

---

## 📞 SUPORTE

- **Formspree Docs**: https://formspree.io/guides
- **Email Support**: help@formspree.io
- **Status**: https://status.formspree.io

---

*Criado para BE WATER - Implementação de formulários de contacto e newsletter* 