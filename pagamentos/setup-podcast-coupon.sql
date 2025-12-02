-- =====================================================
-- BE WATER - CUPÃO PODCAST (Oferta Seguro/Inscrição)
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
-- 1. Criar cupão PODCAST
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
  'podcast',
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
-- 2. Adicionar integrações Regyfit para PODCAST
-- =====================================================
-- Usa as mesmas integrações Regyfit que TAXAFREE
-- Elite: iframe_id=36, integration_id=33 (mesmo que TAXAFREE)
-- Rise: iframe_id=37, integration_id=34 (mesmo que TAXAFREE)
-- Starter: iframe_id=38, integration_id=35 (mesmo que TAXAFREE)

INSERT INTO coupon_regyfit_integrations (coupon_code, plan_type, iframe_id, integration_id)
VALUES 
  ('podcast', 'elite', 36, 33),
  ('podcast', 'rise', 37, 34),
  ('podcast', 'starter', 38, 35)
ON CONFLICT (coupon_code, plan_type) 
DO UPDATE SET 
  iframe_id = EXCLUDED.iframe_id,
  integration_id = EXCLUDED.integration_id;

-- =====================================================
-- 3. Verificar configuração
-- =====================================================

-- Ver cupão PODCAST
SELECT 'Cupão PODCAST' as category, * 
FROM coupons 
WHERE code = 'podcast';

-- Ver integrações Regyfit
SELECT 'PODCAST Regyfit Integrations' as category, * 
FROM coupon_regyfit_integrations 
WHERE coupon_code = 'podcast'
ORDER BY plan_type;

