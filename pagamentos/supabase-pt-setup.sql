-- Migração para Sistema de Gestão de PTs

-- 1. Tabela de Coaches
CREATE TABLE pt_coaches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Configurações (Taxas do Ginásio)
CREATE TABLE pt_settings (
    key VARCHAR(50) PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Sessões de PT
CREATE TABLE pt_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    coach_id UUID REFERENCES pt_coaches(id),
    client_name VARCHAR(255),
    type VARCHAR(20) CHECK (type IN ('internal', 'external')),
    gym_fee DECIMAL(10,2) NOT NULL, -- Valor fixo no momento do registo para histórico
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir Coaches Iniciais
INSERT INTO pt_coaches (name) VALUES 
('Salgueiro'),
('Lourenço'),
('Inês');

-- Inserir Configurações Iniciais
INSERT INTO pt_settings (key, value, description) VALUES 
('gym_rate_internal', 15.00, 'Valor que o ginásio recebe por PT Interno'),
('gym_rate_external', 10.00, 'Valor que o ginásio recebe por PT Externo');

-- Índices para performance
CREATE INDEX idx_pt_sessions_timestamp ON pt_sessions(timestamp DESC);
CREATE INDEX idx_pt_sessions_coach ON pt_sessions(coach_id);
