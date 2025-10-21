-- ============================================
-- BE WATER - Migração Multi-Produto
-- ============================================
-- Adiciona suporte para carrinho de compras com múltiplos produtos
-- Data: 2025-10-21
-- Descrição: Adiciona colunas para quantidade, preço unitário e flag de multi-produto

-- Adicionar novas colunas à tabela payments
ALTER TABLE payments ADD COLUMN IF NOT EXISTS produto_id TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS quantidade INTEGER DEFAULT 1;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS preco_unitario NUMERIC(10,2);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS is_multi_product BOOLEAN DEFAULT FALSE;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS multi_product_count INTEGER DEFAULT 1;

-- Adicionar comentários para documentação
COMMENT ON COLUMN payments.produto_id IS 'ID único do produto (ex: CAFE_001, AGUA_GRANDE_001)';
COMMENT ON COLUMN payments.quantidade IS 'Quantidade do produto neste item de pagamento';
COMMENT ON COLUMN payments.preco_unitario IS 'Preço unitário do produto (sem multiplicar pela quantidade)';
COMMENT ON COLUMN payments.is_multi_product IS 'Indica se este pagamento faz parte de uma compra multi-produto';
COMMENT ON COLUMN payments.multi_product_count IS 'Número total de produtos na transação (se multi-produto)';

-- Atualizar dados existentes para preencher os novos campos
UPDATE payments 
SET 
    quantidade = 1,
    preco_unitario = valor,
    is_multi_product = FALSE,
    multi_product_count = 1
WHERE quantidade IS NULL;

-- Criar índice para melhor performance em queries por transaction_id (agrupar multi-produtos)
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_multi_product ON payments(transaction_id, is_multi_product);

-- Verificar resultados
SELECT 
    'Migração concluída!' as status,
    COUNT(*) as total_payments,
    COUNT(DISTINCT transaction_id) as unique_transactions,
    SUM(CASE WHEN is_multi_product THEN 1 ELSE 0 END) as multi_product_payments
FROM payments;

