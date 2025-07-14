# Configuração Variáveis de Ambiente Supabase

## Passo 1: Obter Credenciais do Supabase

1. No dashboard do Supabase, ir a **Settings** → **API**
2. Copiar os seguintes valores:
   - **Project URL**: `https://xxxxxxxx.supabase.co`
   - **Service Role Key**: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...` (a chave longa secreta)

⚠️ **ATENÇÃO**: Usar a **Service Role Key**, NÃO a "anon public" key!

## Passo 2: Configurar no Netlify

1. Ir ao **Netlify Dashboard** → teu site → **Site Settings**
2. Ir a **Environment Variables**
3. Adicionar as seguintes variáveis:

```
SUPABASE_URL = https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## Passo 3: Verificar

Após configurar, fazer deploy para as variáveis serem aplicadas:

```bash
git add .
git commit -m "Add Supabase environment variables"
git push origin main
```

## Exemplo das Credenciais

No teu projeto **bewater-payments**, as credenciais devem ser similares a:

```
Project URL: https://abcdefgh.supabase.co  (substitui pelo teu)
Service Role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (a tua chave longa)
```

## Como Testar

Após configurar, os pagamentos devem começar a aparecer persistentemente no staff.html! 