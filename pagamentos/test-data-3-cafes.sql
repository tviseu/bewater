-- SQL para inserir pagamento de teste: 3x Café (mesmo produto, quantidade 3)
-- Transaction ID único para não conflitar com pagamentos reais
-- Status: confirmado (pronto para emitir fatura)
-- NIF PT válido para testes

-- PRODUTO: 3x Café (Opção A - quantidade agrupada)
INSERT INTO payments (
    transaction_id,
    reference,
    produto,
    produto_nome,
    produto_id,
    valor,
    quantidade,
    preco_unitario,
    telefone,
    nome,
    email,
    nif,
    status,
    timestamp,
    last_update,
    fatura_emitida,
    fatura_tentativas,
    is_multi_product,
    multi_product_count
) VALUES (
    'TEST_CAFE3_' || FLOOR(EXTRACT(EPOCH FROM NOW()))::TEXT,  -- transaction_id único
    '99999003',                                                -- reference fictícia
    'Café',                                                    -- produto
    'Café',                                                    -- produto_nome
    'CAFE_001',                                                -- produto_id
    2.55,                                                      -- valor total (3 x 0.85)
    3,                                                         -- quantidade (3 cafés)
    0.85,                                                      -- preco_unitario
    '912345678',                                               -- telefone teste
    'João Silva Teste',                                        -- nome
    'teste.cafe@bewaterlisboa.pt',                             -- email
    '238494900',                                               -- NIF PT válido para testes
    'confirmado',                                              -- status
    NOW(),                                                     -- timestamp
    NOW(),                                                     -- last_update
    false,                                                     -- fatura_emitida
    0,                                                         -- fatura_tentativas
    false,                                                     -- is_multi_product (produto único, qty 3)
    1                                                          -- multi_product_count
);

-- Verificar se foi inserido corretamente
SELECT 
    id,
    transaction_id,
    produto_nome,
    produto_id,
    valor,
    quantidade,
    preco_unitario,
    nif,
    status,
    is_multi_product,
    fatura_emitida
FROM payments 
WHERE reference = '99999003'
ORDER BY id DESC;

-- Resultado esperado:
-- - 1 linha: Café x3 = €2.55 (0.85 cada)
-- - Ao emitir fatura: 1 documento Vendus com "Café" qty=3

