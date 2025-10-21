-- SQL para inserir pagamento de teste: Água + Café (multi-produto)
-- Transaction ID único para não conflitar com pagamentos reais
-- Status: confirmado (pronto para emitir fatura)

-- Gerar transaction_id único baseado em timestamp
-- Usar este ID para ambos os produtos (mesma compra)

-- PRODUTO 1: Água Pequena
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
    'TEST_' || FLOOR(EXTRACT(EPOCH FROM NOW()))::TEXT,  -- transaction_id único
    '99999001',                                          -- reference fictícia
    'Água Pequena',                                      -- produto
    'Água Pequena',                                      -- produto_nome
    'AGUA_PEQUENA_001',                                  -- produto_id
    1.00,                                                -- valor total
    1,                                                   -- quantidade
    1.00,                                                -- preco_unitario
    '912345678',                                         -- telefone teste
    'Cliente Teste - Água e Café',                       -- nome
    'teste@bewaterlisboa.pt',                            -- email
    '238494900',                                         -- nif PT válido
    'confirmado',                                        -- status
    NOW(),                                               -- timestamp
    NOW(),                                               -- last_update
    false,                                               -- fatura_emitida
    0,                                                   -- fatura_tentativas
    true,                                                -- is_multi_product
    2                                                    -- multi_product_count
);

-- PRODUTO 2: Café (mesma compra)
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
    (SELECT transaction_id FROM payments WHERE reference = '99999001' ORDER BY id DESC LIMIT 1),  -- Mesmo transaction_id da água
    '99999001',                                          -- reference fictícia (mesma)
    'Café',                                              -- produto
    'Café',                                              -- produto_nome
    'CAFE_001',                                          -- produto_id
    0.85,                                                -- valor total
    1,                                                   -- quantidade
    0.85,                                                -- preco_unitario
    '912345678',                                         -- telefone teste (mesmo)
    'Cliente Teste - Água e Café',                       -- nome (mesmo)
    'teste@bewaterlisboa.pt',                            -- email (mesmo)
    '238494900',                                         -- nif PT válido (mesmo)
    'confirmado',                                        -- status
    NOW(),                                               -- timestamp
    NOW(),                                               -- last_update
    false,                                               -- fatura_emitida
    0,                                                   -- fatura_tentativas
    true,                                                -- is_multi_product
    2                                                    -- multi_product_count
);

-- Verificar se foi inserido corretamente
SELECT 
    id,
    transaction_id,
    produto_nome,
    produto_id,
    valor,
    quantidade,
    status,
    is_multi_product,
    fatura_emitida
FROM payments 
WHERE reference = '99999001'
ORDER BY id DESC;

