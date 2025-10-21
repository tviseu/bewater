-- ============================================
-- BE WATER - Fix UNIQUE Constraint para Multi-Produto
-- ============================================
-- PROBLEMA: A tabela payments tem CONSTRAINT UNIQUE em transaction_id
-- SOLUÇÃO: Remover constraint e permitir múltiplos produtos por transação
-- Data: 2025-10-21

-- 1. Verificar constraints existentes
SELECT 
    con.conname AS constraint_name,
    col.attname AS column_name
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
JOIN pg_attribute col ON col.attrelid = con.conrelid AND col.attnum = ANY(con.conkey)
WHERE rel.relname = 'payments'
  AND con.contype = 'u';  -- 'u' = UNIQUE constraint

-- 2. Remover constraint UNIQUE em transaction_id (se existir)
-- NOTA: O nome exato da constraint pode variar - verificar acima primeiro
-- Exemplos de possíveis nomes:
--   - payments_transaction_id_key
--   - unique_transaction_id
--   - payments_pkey (se for primary key - NÃO REMOVER!)

-- DESCOMENTAR a linha abaixo com o nome correto da constraint:
-- ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_transaction_id_key;

-- 3. Verificar se existe coluna 'id' como PRIMARY KEY (deve existir!)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'payments' AND column_name = 'id';

-- 4. Se 'id' não for PRIMARY KEY, torná-lo PRIMARY KEY
-- ALTER TABLE payments ADD PRIMARY KEY (id);

-- 5. Criar índice não-único em transaction_id para performance
-- (substituir constraint UNIQUE por índice normal)
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id_nonunique 
ON payments(transaction_id);

-- 6. Verificar resultado final
SELECT 
    'VERIFICAÇÃO FINAL' as status,
    COUNT(*) as total_payments,
    COUNT(DISTINCT transaction_id) as unique_transactions,
    COUNT(*) - COUNT(DISTINCT transaction_id) as duplicate_transactions
FROM payments;

-- ============================================
-- INSTRUÇÕES:
-- ============================================
-- 1. Executar query #1 para ver as constraints
-- 2. Copiar o nome da constraint UNIQUE em transaction_id
-- 3. Descomentar e ajustar query #2 com o nome correto
-- 4. Executar todas as queries em ordem
-- ============================================

