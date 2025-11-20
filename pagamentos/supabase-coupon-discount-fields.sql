-- ============================================
-- BE WATER - CUPÕES COM CAMPOS DE DESCONTO
-- ============================================
-- Este script adiciona campos para permitir cupões com diferentes
-- tipos de desconto e descrições personalizadas.
--
-- INSTRUÇÕES:
-- 1. Aceder ao Supabase Dashboard
-- 2. Ir a "SQL Editor"
-- 3. Copiar e colar este script completo
-- 4. Executar (Run)
-- ============================================

-- Adicionar campos de desconto à tabela coupons
ALTER TABLE coupons ADD COLUMN IF NOT EXISTS discount_type VARCHAR(50) 
  CHECK (discount_type IN ('percentage_next', 'permanent_amount', 'percentage_permanent', 'none'))
  DEFAULT 'percentage_next';

ALTER TABLE coupons ADD COLUMN IF NOT EXISTS discount_value NUMERIC(10,2) DEFAULT 50.00;

ALTER TABLE coupons ADD COLUMN IF NOT EXISTS waive_registration_fee BOOLEAN DEFAULT false;

ALTER TABLE coupons ADD COLUMN IF NOT EXISTS description_pt TEXT DEFAULT '50% desconto na próxima mensalidade';

ALTER TABLE coupons ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT '50% discount on next membership fee';

-- Comentários descritivos
COMMENT ON COLUMN coupons.discount_type IS 'Tipo de desconto: percentage_next (% próxima mensalidade), permanent_amount (valor fixo permanente), percentage_permanent (% permanente), none (sem desconto)';
COMMENT ON COLUMN coupons.discount_value IS 'Valor do desconto (percentagem ou valor em euros)';
COMMENT ON COLUMN coupons.waive_registration_fee IS 'Se true, dispensa taxa de inscrição (€25)';
COMMENT ON COLUMN coupons.description_pt IS 'Descrição do desconto em Português (mostrada ao utilizador)';
COMMENT ON COLUMN coupons.description_en IS 'Descrição do desconto em Inglês (mostrada ao utilizador)';

-- ============================================
-- ATUALIZAR CUPÕES EXISTENTES
-- ============================================

-- Atualizar cupão "planalto" existente com desconto permanente de €10
UPDATE coupons 
SET 
  discount_type = 'permanent_amount',
  discount_value = 10.00,
  waive_registration_fee = true,
  description_pt = '€10 desconto PERMANENTE na mensalidade + sem seguro este ano + sem taxa de inscrição',
  description_en = '€10 PERMANENT discount on membership + no insurance this year + no registration fee'
WHERE code = 'planalto';

-- Atualizar cupões genéricos existentes para o padrão (50% próxima mensalidade)
UPDATE coupons 
SET 
  discount_type = 'percentage_next',
  discount_value = 50.00,
  waive_registration_fee = false,
  description_pt = '50% desconto na próxima mensalidade para ti e para o sócio',
  description_en = '50% discount on next membership fee for you and the member'
WHERE discount_type IS NULL OR discount_type = 'percentage_next';

-- ============================================
-- EXEMPLOS DE CUPÕES COM DIFERENTES DESCONTOS
-- ============================================

-- EXEMPLO 1: Cupão de 20% desconto permanente
-- INSERT INTO coupons (code, type, active, discount_type, discount_value, waive_registration_fee, description_pt, description_en)
-- VALUES ('PROMO20', 'generic', true, 'percentage_permanent', 20.00, true, '20% desconto permanente + sem taxa de inscrição', '20% permanent discount + no registration fee');

-- EXEMPLO 2: Cupão de €15 desconto permanente
-- INSERT INTO coupons (code, type, active, discount_type, discount_value, waive_registration_fee, description_pt, description_en)
-- VALUES ('SAVE15', 'generic', true, 'permanent_amount', 15.00, false, '€15 desconto permanente na mensalidade', '€15 permanent discount on membership fee');

-- EXEMPLO 3: Cupão de 30% desconto apenas próxima mensalidade
-- INSERT INTO coupons (code, type, active, discount_type, discount_value, waive_registration_fee, description_pt, description_en)
-- VALUES ('FIRST30', 'generic', true, 'percentage_next', 30.00, true, '30% desconto na próxima mensalidade + sem taxa de inscrição', '30% discount on next membership fee + no registration fee');

-- ============================================
-- CUPÃO EARLYBIRD - PROMOÇÃO ATUAL
-- ============================================
-- Cupão EARLYBIRD: €10 desconto permanente na mensalidade
-- O sócio paga o seguro anual de €25 normalmente
INSERT INTO coupons (code, type, active, discount_type, discount_value, waive_registration_fee, description_pt, description_en)
VALUES ('EARLYBIRD', 'generic', true, 'permanent_amount', 10.00, false, 
  '€10 desconto PERMANENTE na mensalidade (seguro anual de €25 aplicável)', 
  '€10 PERMANENT discount on monthly membership (annual insurance €25 applies)')
ON CONFLICT (code) 
DO UPDATE SET 
  active = true,
  discount_type = 'permanent_amount',
  discount_value = 10.00,
  waive_registration_fee = false,
  description_pt = '€10 desconto PERMANENTE na mensalidade (seguro anual de €25 aplicável)',
  description_en = '€10 PERMANENT discount on monthly membership (annual insurance €25 applies)';

-- ============================================
-- VERIFICAÇÃO
-- ============================================
-- Verificar se as colunas foram adicionadas corretamente
SELECT 
  code,
  type,
  active,
  discount_type,
  discount_value,
  waive_registration_fee,
  description_pt,
  description_en
FROM coupons
ORDER BY created_at DESC;

