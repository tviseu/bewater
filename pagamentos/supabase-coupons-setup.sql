-- ============================================
-- BE WATER - SISTEMA DE CUPÕES DE DESCONTO
-- ============================================
-- Este script cria as tabelas necessárias para o sistema de cupões
-- que permite a sócios atuais ou cupões genéricos darem 50% desconto
-- na próxima mensalidade (para ambas as partes).
--
-- INSTRUÇÕES:
-- 1. Aceder ao Supabase Dashboard
-- 2. Ir a "SQL Editor"
-- 3. Copiar e colar este script completo
-- 4. Executar (Run)
-- ============================================

-- TABELA 1: COUPONS
-- Armazena todos os cupões válidos (emails de sócios + cupões genéricos)
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) CHECK (type IN ('member_email', 'generic')) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(active);
CREATE INDEX IF NOT EXISTS idx_coupons_type ON coupons(type);

-- Comentários descritivos
COMMENT ON TABLE coupons IS 'Cupões de desconto válidos (emails de sócios e códigos genéricos)';
COMMENT ON COLUMN coupons.code IS 'Email do sócio ou código genérico (ex: PROMO2025)';
COMMENT ON COLUMN coupons.type IS 'Tipo: member_email (email de sócio) ou generic (código genérico)';
COMMENT ON COLUMN coupons.active IS 'Se false, o cupão não pode ser usado';

-- TABELA 2: COUPON_USAGES
-- Regista todas as utilizações de cupões
CREATE TABLE IF NOT EXISTS coupon_usages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_code VARCHAR(255) NOT NULL,
  coupon_type VARCHAR(50),
  subscriber_name VARCHAR(255),
  subscriber_email VARCHAR(255),
  subscriber_phone VARCHAR(50),
  plan_type VARCHAR(50),
  used_at TIMESTAMPTZ DEFAULT NOW(),
  notification_sent BOOLEAN DEFAULT false
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_coupon_usages_code ON coupon_usages(coupon_code);
CREATE INDEX IF NOT EXISTS idx_coupon_usages_email ON coupon_usages(subscriber_email);
CREATE INDEX IF NOT EXISTS idx_coupon_usages_date ON coupon_usages(used_at DESC);

-- Comentários descritivos
COMMENT ON TABLE coupon_usages IS 'Histórico de utilizações de cupões';
COMMENT ON COLUMN coupon_usages.coupon_code IS 'Código do cupão que foi usado';
COMMENT ON COLUMN coupon_usages.coupon_type IS 'Tipo do cupão (member_email ou generic)';
COMMENT ON COLUMN coupon_usages.subscriber_name IS 'Nome do novo sócio que usou o cupão';
COMMENT ON COLUMN coupon_usages.plan_type IS 'Plano escolhido: Elite, Rise ou Starter';
COMMENT ON COLUMN coupon_usages.notification_sent IS 'Se email de notificação foi enviado com sucesso';

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Protege os dados permitindo apenas operações específicas via ANON_KEY

-- Ativar RLS nas tabelas
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usages ENABLE ROW LEVEL SECURITY;

-- POLICY 1: Permitir leitura pública de cupões ATIVOS (para validação no frontend)
CREATE POLICY "Allow public read active coupons" ON coupons
  FOR SELECT
  USING (active = true);

-- POLICY 2: Permitir insert público de utilizações (para registar uso no frontend)
CREATE POLICY "Allow public insert usage" ON coupon_usages
  FOR INSERT
  WITH CHECK (true);

-- POLICY 3: Apenas admins podem modificar cupões (via service_role key)
-- Esta policy não é necessária pois RLS por default bloqueia UPDATE/DELETE sem policy

-- ============================================
-- TRIGGER: AUTO-UPDATE DO TIMESTAMP
-- ============================================
CREATE OR REPLACE FUNCTION update_coupons_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_coupons_updated_at
  BEFORE UPDATE ON coupons
  FOR EACH ROW
  EXECUTE FUNCTION update_coupons_updated_at();

-- ============================================
-- DADOS DE TESTE (OPCIONAL)
-- ============================================
-- Descomentar para inserir cupões de teste

-- Cupão genérico de teste
-- INSERT INTO coupons (code, type, active) VALUES ('TESTE50', 'generic', true);

-- Email de sócio de teste
-- INSERT INTO coupons (code, type, active) VALUES ('socio@teste.com', 'member_email', true);

-- ============================================
-- VERIFICAÇÃO
-- ============================================
-- Verificar se as tabelas foram criadas corretamente
SELECT 'Tabela coupons criada com sucesso!' as status, COUNT(*) as total_coupons FROM coupons
UNION ALL
SELECT 'Tabela coupon_usages criada com sucesso!' as status, COUNT(*) as total_usages FROM coupon_usages;

-- Ver estrutura das tabelas
\d coupons
\d coupon_usages

