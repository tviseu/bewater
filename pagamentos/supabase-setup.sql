-- SETUP SQL PARA SUPABASE
-- Execute este código no SQL Editor do Supabase

-- Criar tabela de pagamentos
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transaction_id VARCHAR(255) UNIQUE,
    reference VARCHAR(255),
    produto VARCHAR(100) NOT NULL,
    produto_nome VARCHAR(255),
    valor DECIMAL(10,2) NOT NULL,
    telefone VARCHAR(20),
    nome VARCHAR(255),
    email VARCHAR(255),
    nif VARCHAR(9),
    status VARCHAR(20) CHECK (status IN ('pendente', 'confirmado', 'falhado')) DEFAULT 'pendente',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    fatura JSONB, -- Dados da fatura Vendus
    fatura_emitida BOOLEAN DEFAULT FALSE,
    fatura_tentativas INTEGER DEFAULT 0,
    raw_webhook_data JSONB, -- Debug: dados completos do webhook
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_timestamp ON payments(timestamp DESC);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON payments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - permitir acesso total por agora
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy para permitir todas as operações (ajustar em produção)
CREATE POLICY "Allow all operations" ON payments
    FOR ALL USING (true) WITH CHECK (true);

-- Inserir dados de exemplo para teste (opcional)
INSERT INTO payments (
    transaction_id, 
    reference, 
    produto, 
    produto_nome, 
    valor, 
    telefone, 
    nome, 
    email, 
    status
) VALUES (
    'TEST_001',
    'REF_001',
    'CAFE_001',
    'Café - BE WATER',
    0.85,
    '91***89',
    'João Teste',
    'joao@teste.com',
    'confirmado'
);

-- Verificar se funcionou
SELECT * FROM payments; 