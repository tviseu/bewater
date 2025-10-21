# 🛒 Sistema de Carrinho de Compras Multi-Produto

## Visão Geral

Implementação completa de um carrinho de compras para o sistema de pagamentos MBWay do BE WATER, permitindo que clientes adicionem múltiplos produtos antes de finalizar uma única compra.

## 🎯 Funcionalidades

✅ **Widget de Carrinho Flutuante**
- Design neobrutalist consistente com BE WATER
- Badge com contador de items
- Painel expandível com lista de produtos
- Botões de alterar quantidade e remover items
- Responsivo (mobile e desktop)

✅ **Gestão de Produtos**
- Stepper de quantidade em cada card de produto
- Botão "Adicionar ao Carrinho" em vez de pagamento direto
- Suporte para valor variável (donativos)
- Reset automático de quantidade após adicionar

✅ **Checkout**
- Resumo completo do pedido no formulário
- Tabela com produtos, quantidades, preços unitários e subtotais
- Total destacado
- Validação de carrinho vazio

✅ **Backend Multi-Produto**
- Validação de todos os produtos do carrinho
- Cálculo automático de totais
- Criação de múltiplas entradas no banco (uma por produto)
- Mesmo `transaction_id` para agrupar itens

✅ **Staff Dashboard Agrupado**
- Detecção automática de compras multi-produto
- Visualização expandível de grupos
- Total consolidado por transação
- Único botão "Emitir Fatura" para todo o grupo

✅ **Faturação Multi-Item**
- Fatura Vendus com múltiplos items
- Busca automática de todos os produtos da transação
- Marcação de todos os items como "fatura emitida"

## 📁 Arquivos Modificados

### Frontend
1. **`pagamentos/i18n.js`**
   - Traduções PT/EN para carrinho
   - Novas keys: `cart.*`, `form.order.*`

2. **`pagamentos/index.html`**
   - CSS do widget flutuante (responsivo)
   - HTML do carrinho
   - Modificação de todos os cards de produtos (stepper + botão)
   - Resumo do pedido no formulário
   - Lógica JavaScript completa do carrinho
   - Event listeners e processamento de pagamento

### Backend
3. **`pagamentos/netlify/functions/mbway-payment.js`**
   - Aceita `produtos` array ou `produto_id` único (backward compatible)
   - Validação de múltiplos produtos
   - Cálculo de total do carrinho
   - Criação de múltiplas entradas pendentes
   - Identifier MBWay adaptado para multi-produto

4. **`pagamentos/netlify/functions/payment-webhook.js`**
   - Armazena campos adicionais: `quantidade`, `preco_unitario`, `is_multi_product`, `multi_product_count`
   - Retorna campos multi-produto no GET endpoint

5. **`pagamentos/netlify/functions/emit-invoice.js`**
   - Busca TODOS os produtos de uma transação
   - Aceita array de produtos
   - Cria fatura Vendus com items array
   - Marca todos os produtos como "fatura emitida"

### Dashboard
6. **`pagamentos/staff.html`**
   - CSS para grupos expandíveis
   - Agrupamento por `transaction_id`
   - Renderização diferenciada (grupo vs. produto único)
   - Função `toggleGroup()` para expandir/colapsar

### Database
7. **`pagamentos/supabase-migration-multi-product.sql`**
   - Adiciona novas colunas à tabela `payments`
   - Índices para performance
   - Script de verificação

## 🚀 Deploy

### 1. Atualizar Base de Dados

Execute no Supabase SQL Editor:

```bash
# Copiar e executar o arquivo:
pagamentos/supabase-migration-multi-product.sql
```

Novas colunas adicionadas:
- `produto_id` (TEXT)
- `quantidade` (INTEGER, default: 1)
- `preco_unitario` (NUMERIC)
- `is_multi_product` (BOOLEAN, default: false)
- `multi_product_count` (INTEGER, default: 1)

### 2. Deploy Netlify Functions

As funções serão automaticamente atualizadas no próximo deploy:
- `mbway-payment.js`
- `payment-webhook.js`
- `emit-invoice.js`

### 3. Deploy Frontend

Os arquivos HTML e JS serão atualizados:
- `pagamentos/index.html`
- `pagamentos/i18n.js`
- `pagamentos/staff.html`

```bash
git add .
git commit -m "feat: implementar carrinho de compras multi-produto"
git push origin main
```

## 📊 Estrutura de Dados

### Produto no Carrinho (Frontend)
```javascript
{
  id: 'CAFE_001',
  nome: 'Café',
  preco: 0.85,
  quantidade: 2
}
```

### Payload para Backend
```javascript
{
  produtos: [
    { produto_id: 'CAFE_001', nome: 'Café', preco: 0.85, quantidade: 2 },
    { produto_id: 'AGUA_GRANDE_001', nome: 'Água Grande', preco: 1.50, quantidade: 1 }
  ],
  amount: 3.20,  // Total calculado
  phone: '912345678',
  email: 'cliente@example.com',
  nome: 'João Silva',
  nif: '123456789'
}
```

### Entradas na Base de Dados
```
transaction_id: ABC123 (mesmo para todos)

Entrada 1:
- produto_id: CAFE_001
- produto_nome: Café
- quantidade: 2
- preco_unitario: 0.85
- valor: 1.70 (subtotal)
- is_multi_product: true
- multi_product_count: 2

Entrada 2:
- produto_id: AGUA_GRANDE_001
- produto_nome: Água Grande
- quantidade: 1
- preco_unitario: 1.50
- valor: 1.50
- is_multi_product: true
- multi_product_count: 2
```

### Fatura Vendus
```javascript
{
  items: [
    { reference: 'CAFE_001', title: 'Café', gross_price: 0.85, qty: 2 },
    { reference: 'AGUA_GRANDE_001', title: 'Água Grande', gross_price: 1.50, qty: 1 }
  ]
}
```

## 🔍 Fluxo Completo

1. **Utilizador adiciona produtos ao carrinho**
   - Clica em produto → define quantidade → "Adicionar ao Carrinho"
   - Widget atualiza badge e mostra items

2. **Checkout**
   - Clica "Finalizar Compra" no widget
   - Formulário mostra resumo detalhado
   - Preenche dados (telefone, email, NIF)

3. **Pagamento**
   - Frontend envia array de produtos para `mbway-payment`
   - Backend valida cada produto
   - Calcula total
   - Cria transação MBWay única
   - Cria múltiplas entradas pendentes (uma por produto)

4. **Confirmação**
   - Utilizador confirma no telemóvel
   - Webhook atualiza status de TODOS os produtos da transação

5. **Staff Dashboard**
   - Produtos aparecem agrupados
   - Clique para expandir e ver detalhes
   - Botão único "Emitir Fatura" para o grupo

6. **Emissão de Fatura**
   - `emit-invoice` busca TODOS os produtos da transação
   - Cria fatura Vendus com array de items
   - Marca TODOS os produtos como "fatura emitida"

## ⚙️ Configuração

Nenhuma configuração adicional necessária! O sistema é:
- ✅ **Backward Compatible**: Produtos únicos continuam a funcionar
- ✅ **Auto-Detect**: Detecta automaticamente compras multi-produto
- ✅ **Fallback**: Se Supabase falhar, usa dados do input

## 📱 Responsividade

### Desktop (> 768px)
- Widget: canto inferior direito, largura fixa 400px
- Painel: expande para cima
- Hover effects: transform e shadow

### Mobile (< 768px)
- Widget: barra inferior full-width
- Painel: overlay 80vh
- Touch targets: mínimo 44px
- Botões maiores para facilitar toque

## 🧪 Testes

### Cenários a Testar

1. **Produto único**
   - ✅ Adicionar 1 café
   - ✅ Checkout e pagamento
   - ✅ Deve aparecer normal no staff.html

2. **Múltiplos produtos, quantidade 1**
   - ✅ Adicionar café + água
   - ✅ Checkout e pagamento
   - ✅ Deve aparecer como grupo no staff.html

3. **Produto com quantidade > 1**
   - ✅ Adicionar 3 cafés
   - ✅ Deve calcular subtotal correto
   - ✅ Fatura deve ter qty: 3

4. **Compra mista**
   - ✅ 2 cafés + 1 água + 1 protein snack
   - ✅ Total deve ser correto
   - ✅ Grupo expansível com 3 items

5. **Donativo variável no carrinho**
   - ✅ Donativo €10 + café
   - ✅ Total €10.85
   - ✅ Fatura com ambos items

6. **Emissão de fatura multi-produto**
   - ✅ Clicar "Emitir" no grupo
   - ✅ Fatura com múltiplos items
   - ✅ Todos marcados como emitidos

## 🐛 Troubleshooting

### Carrinho não aparece
- Verificar console do browser
- Certificar que `i18n.js` está carregado
- Verificar elemento `#cartWidget` existe

### Produtos não agrupam no staff.html
- Verificar que `transaction_id` é o mesmo
- Console deve mostrar: "Agrupados em X transações"
- Verificar campos `is_multi_product` no Supabase

### Fatura com items duplicados
- Sistema cria UMA fatura com MÚLTIPLOS items
- Não deve haver duplicação se `transaction_id` único
- Verificar função `marcarFaturaEmitida` atualiza todos

### Preços errados
- Backend valida preços contra `PRODUTOS_PERMITIDOS`
- Verificar `preco_unitario` vs `valor` (subtotal)
- `valor = preco_unitario * quantidade`

## 📝 Notas Técnicas

- **localStorage**: Opcional (não implementado), mas fácil adicionar persistência do carrinho
- **Validações**: Dupla (frontend + backend) para segurança
- **Atomicidade**: Todos os produtos de uma transação partilham mesmo `transaction_id`
- **Isenção IVA**: Artigo 53º do CIVA aplicado a todos items
- **Email fallback**: `bewaterlisboa@gmail.com` se não fornecido

## 🎨 Customização

### Cores do Widget
```css
.cart-toggle {
  background: var(--color-accent);  /* Amarelo BE WATER */
  border: var(--border-thick);
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0 var(--color-primary);
}
```

### Limite de Produtos
```javascript
// Em mbway-payment.js
if (produtos.length > 50) {
  throw new Error('Máximo 50 produtos por compra');
}
```

### Quantidade Máxima
```javascript
// Em index.html
if (qty < 99) {  // Alterar este valor
  qtyDisplay.textContent = qty + 1;
}
```

## 📚 Referências

- [EuPago API Docs](https://eupago.docs.apiary.io/)
- [Vendus API Docs](https://www.vendus.pt/ws/v1.1/)
- [Supabase Docs](https://supabase.com/docs)

## ✨ Melhorias Futuras

- [ ] Persistência do carrinho em localStorage
- [ ] Botão "Esvaziar Carrinho" com confirmação
- [ ] Animações de transição mais suaves
- [ ] Notificações toast ao adicionar produtos
- [ ] Histórico de compras do cliente
- [ ] Cupões de desconto
- [ ] Produtos relacionados/sugestões

---

**Implementado por:** Cursor AI Assistant
**Data:** 21 de Outubro de 2025
**Versão:** 1.0.0

