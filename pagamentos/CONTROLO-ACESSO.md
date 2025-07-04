# 🔐 CONTROLO DE ACESSO - Staff Dashboard

Guia completo para configurar autenticação segura no painel de staff do BE WATER usando **Netlify Identity**.

## 🎯 **Sobre esta Implementação**

- **Netlify Identity** - Sistema profissional de autenticação
- **Gratuito** até 1000 utilizadores/mês
- **Seguro** - Sem passwords no código
- **Profissional** - UI integrada
- **Fácil Gestão** - Dashboard web para gerir utilizadores

---

## ⚡ **Configuração Inicial (1x)**

### **1. Ativar Netlify Identity**

No **Dashboard do Netlify**:
```
1. Acede ao teu site: https://app.netlify.com/sites/[SITE-NAME]
2. Vai a: Site Settings → Identity
3. Clica: "Enable Identity"
```

### **2. Configurar Definições de Registo**

```
Identity Settings → Registration → Edit Settings:

☑️ Open = ON (para permitir auto-registo inicial)
⚠️ NOTA: Depois de criares as contas, muda para "Invite only"
```

### **3. Configurar Provedores Externos (Opcional)**

```
Identity Settings → External providers:

☑️ Google = ON (recomendado para utilizadores Gmail)
☑️ GitHub = ON (para developers)
☐ GitLab, Bitbucket = conforme necessário
```

### **4. Configurar Email Templates**

```
Identity Settings → Emails → Edit templates:

- Confirmation template: Personalizar welcome email
- Invitation template: Email para novos utilizadores  
- Recovery template: Reset password email
```

---

## 👥 **Gestão de Utilizadores**

### **Método 1: Auto-Registo (Inicial)**

1. **Ativar registo aberto temporariamente**
2. **Cada membro da equipa vai a**: `https://[SITE].netlify.app/pagamentos/staff.html`
3. **Clica "Fazer Login"** → **"Sign Up"**
4. **Regista-se** com email da empresa
5. **Administrador desativa registo** e ativa "Invite only"

### **Método 2: Convites (Recomendado)**

No **Netlify Dashboard**:
```
Identity → View users → Invite users

Email: joao@bewater.pt
Role: (opcional, deixar vazio)

Enviar convite → O utilizador recebe email → Cria password
```

### **Método 3: API (Automático)**

```bash
# Usando Netlify CLI
npm install -g netlify-cli
netlify login

# Convidar utilizador
netlify identity:invite --site [SITE-ID] --email joao@bewater.pt
```

---

## 🛡️ **Configuração de Segurança**

### **Depois de Criar Contas da Equipa:**

```
1. Netlify Dashboard → Identity → Settings
2. Registration → Edit Settings  
3. Mudar para: "Invite only" ✅
4. Save settings
```

### **Roles e Permissões (Futuro)**

```javascript
// Código futuro para diferentes níveis de acesso
netlifyIdentity.on('login', user => {
  const roles = user.app_metadata?.roles || [];
  
  if (roles.includes('admin')) {
    // Acesso total
  } else if (roles.includes('staff')) {
    // Acesso limitado  
  } else {
    // Negar acesso
    netlifyIdentity.logout();
  }
});
```

---

## 🔧 **Configuração Técnica**

### **Files Modificados:**

```
pagamentos/staff.html:
✅ Netlify Identity Widget adicionado
✅ Interface de login/logout
✅ Proteção de toda a página
✅ Auto-carregamento após login
```

### **Como Funciona:**

```
1. Utilizador acede staff.html
2. Sistema verifica se está logado
3. Se NÃO → Mostra tela de login
4. Se SIM → Mostra dashboard
5. Dashboard só carrega dados se autenticado
```

### **URLs de Acesso:**

```
🔐 Staff Dashboard: https://[SITE].netlify.app/pagamentos/staff.html
📊 Pagamentos Público: https://[SITE].netlify.app/pagamentos/
```

---

## 📋 **Lista de Verificação**

### **Setup Inicial:**
- [ ] Netlify Identity ativado
- [ ] Registration = "Open" (temporário)
- [ ] Google/GitHub providers configurados
- [ ] Email templates personalizados

### **Criar Contas da Equipa:**
- [ ] Admin cria conta
- [ ] Staff member 1 cria conta  
- [ ] Staff member 2 cria conta
- [ ] (etc...)

### **Securizar Sistema:**
- [ ] Registration = "Invite only"
- [ ] Testar login/logout
- [ ] Verificar proteção da página
- [ ] Confirmar carregamento de dados

---

## 👥 **Gestão da Equipa**

### **Adicionar Novo Membro:**

```
1. Netlify Dashboard → Identity → Invite users
2. Email: novo@bewater.pt
3. Utilizador recebe email → Cria password
4. Testa acesso a staff.html
```

### **Remover Membro:**

```
1. Netlify Dashboard → Identity → View users  
2. Encontrar utilizador → Delete
3. Acesso revogado imediatamente
```

### **Reset Password:**

```
1. Utilizador clica "Forgot password" no login
2. OU Admin → Identity → View users → Reset password
3. Utilizador recebe email de reset
```

---

## 🚨 **Resolução de Problemas**

### **"Netlify Identity não carrega"**
```bash
# Verificar na consola do browser:
- Erro 404 no widget script
- Site settings → Identity não ativado
- URL incorreta no script
```

### **"Login não funciona"**
```bash
# Verificar:
- Registration settings corretos
- Email provider configurado
- Não há popup blocker ativo
- Console errors no browser
```

### **"Utilizador não consegue registar"**
```bash
# Possíveis causas:
- Registration = "Invite only" (mudar para Open temporariamente)
- Email já existe
- Problemas de conectividade
```

### **"Dashboard não carrega após login"**
```bash
# Verificar:
- Console errors no browser
- API functions a funcionar
- Utilizador realmente autenticado
```

---

## 💰 **Custos e Limites**

### **Netlify Identity (Grátis):**
```
✅ 1000 utilizadores ativos/mês  
✅ Unlimited login attempts
✅ Email notifications
✅ Social login providers
✅ JWT tokens
```

### **Para BE WATER (Equipa Pequena):**
```
👥 ~5-10 utilizadores = €0/mês
🔐 Segurança profissional
📊 Dashboard analytics
⚡ Setup time: ~30 minutos
```

---

## 📞 **Suporte**

### **Logs e Debug:**
```javascript
// Ativar logs detalhados (adicionar ao staff.html)
netlifyIdentity.on('init', user => console.log('Init:', user));
netlifyIdentity.on('login', user => console.log('Login:', user));
netlifyIdentity.on('logout', () => console.log('Logout'));
netlifyIdentity.on('error', err => console.error('Error:', err));
```

### **Documentação Oficial:**
- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
- [Widget Documentation](https://github.com/netlify/netlify-identity-widget)

### **Contacto Técnico:**
- Issues no GitHub do projeto
- Netlify Support (se problemas da plataforma)

---

## 🔄 **Próximos Passos**

### **Melhorias Futuras:**
1. **Roles/Permissions** - Admin vs Staff vs View-only
2. **Session Timeout** - Auto-logout após inatividade
3. **2FA** - Autenticação de 2 fatores
4. **Audit Logs** - Registo de acessos
5. **Mobile App** - Netlify Identity funciona em PWAs

### **Monitorização:**
```
Netlify Dashboard → Site analytics → Identity:
- Login attempts
- Active users  
- Failed authentications
- Popular login methods
```

---

*💡 **Tip**: Después de configurar, testa sempre em incognito mode para simular novo utilizador!* 