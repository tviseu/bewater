-- =====================================================
-- BE WATER - CUPÃO TAXAFREE (Oferta Seguro/Inscrição)
-- =====================================================
-- Cupão especial para oferta da taxa de inscrição (seguro)
-- 
-- FUNCIONALIDADE:
-- - Oferta da Taxa de Inscrição (Seguro Anual)
-- - Sem descontos na mensalidade
-- - Pagamento normal da primeira mensalidade
--
-- INSTRUÇÕES:
-- 1. Aceder ao Supabase Dashboard
-- 2. Ir a "SQL Editor"
-- 3. Copiar e colar este script completo
-- 4. Executar (Run)
-- =====================================================

-- =====================================================
-- 1. Criar cupão TAXAFREE
-- =====================================================

INSERT INTO coupons (
  code, 
  type, 
  active, 
  discount_type, 
  discount_value, 
  waive_registration_fee, 
  description_pt, 
  description_en,
  instructions_steps_pt,
  instructions_steps_en
)
VALUES (
  'taxafree',
  'generic',
  true,
  'none',
  0.00,
  true,
  'Oferta do Seguro Anual (poupas €25)! Pagas apenas a mensalidade.',
  'Annual Insurance Offer (save €25)! Pay only the monthly fee.',
  '["1️⃣ Oferta da Taxa de Inscrição / Seguro Anual (€25)", "2️⃣ Pagas apenas o valor da mensalidade normal", "3️⃣ Acesso imediato a todas as aulas", "4️⃣ BE WATER, MY FRIEND! 🥋"]'::json,
  '["1️⃣ Registration Fee / Annual Insurance Offer (€25)", "2️⃣ Pay only the regular monthly fee", "3️⃣ Immediate access to all classes", "4️⃣ BE WATER, MY FRIEND! 🥋"]'::json
)
ON CONFLICT (code) 
DO UPDATE SET
  active = true,
  discount_type = 'none',
  discount_value = 0.00,
  waive_registration_fee = true,
  description_pt = EXCLUDED.description_pt,
  description_en = EXCLUDED.description_en,
  instructions_steps_pt = EXCLUDED.instructions_steps_pt,
  instructions_steps_en = EXCLUDED.instructions_steps_en;

-- =====================================================
-- 2. Adicionar integrações Regyfit para TAXAFREE
-- =====================================================
-- Elite: 33
-- Rise: 34
-- Starter: 35

INSERT INTO coupon_regyfit_integrations (coupon_code, plan_type, iframe_id, integration_id)
VALUES 
  ('taxafree', 'elite', 33, 33),
  ('taxafree', 'rise', 34, 34),
  ('taxafree', 'starter', 35, 35)
ON CONFLICT (coupon_code, plan_type) 
DO UPDATE SET 
  iframe_id = EXCLUDED.iframe_id,
  integration_id = EXCLUDED.integration_id;

-- =====================================================
-- 3. Verificar configuração
-- =====================================================

-- Ver cupão TAXAFREE
SELECT 'Cupão TAXAFREE' as category, * 
FROM coupons 
WHERE code = 'taxafree';

-- Ver integrações Regyfit
SELECT 'TAXAFREE Regyfit Integrations' as category, * 
FROM coupon_regyfit_integrations 
WHERE coupon_code = 'taxafree'
ORDER BY plan_type;

