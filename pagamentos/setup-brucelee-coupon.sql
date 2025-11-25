-- =====================================================
-- BE WATER - CUPÃO BRUCELEE (Dezembro 2025 Gratuito)
-- =====================================================
-- Cupão especial para celebrar o aniversário de Bruce Lee
-- 
-- FUNCIONALIDADE:
-- - Treina GRÁTIS em Dezembro 2025
-- - Paga apenas o seguro anual de €25
-- - Sem taxa de inscrição
-- - Começa a pagar mensalidades em Janeiro 2026
--
-- INSTRUÇÕES:
-- 1. Aceder ao Supabase Dashboard
-- 2. Ir a "SQL Editor"
-- 3. Copiar e colar este script completo
-- 4. Executar (Run)
-- =====================================================

-- =====================================================
-- 1. Criar cupão BRUCELEE
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
  'brucelee',
  'generic',
  true,
  'percentage_next',
  100.00,
  true,
  'Treina GRÁTIS em Dezembro 2025! Paga apenas o seguro anual de €25',
  'Train FREE in December 2025! Pay only the annual insurance of €25',
  '["1️⃣ Paga APENAS o seguro anual de €25 (SEM taxa de inscrição)", "2️⃣ Treinas GRÁTIS em Dezembro 2025 - primeiro mês sem custos!", "3️⃣ A partir de Janeiro 2026 começas a pagar a mensalidade normal", "4️⃣ BE WATER, MY FRIEND! 🥋"]'::json,
  '["1️⃣ Pay ONLY the annual insurance of €25 (NO registration fee)", "2️⃣ Train FREE in December 2025 - first month at no cost!", "3️⃣ From January 2026 you start paying regular monthly fee", "4️⃣ BE WATER, MY FRIEND! 🥋"]'::json
)
ON CONFLICT (code) 
DO UPDATE SET
  active = true,
  discount_type = 'percentage_next',
  discount_value = 100.00,
  waive_registration_fee = true,
  description_pt = EXCLUDED.description_pt,
  description_en = EXCLUDED.description_en,
  instructions_steps_pt = EXCLUDED.instructions_steps_pt,
  instructions_steps_en = EXCLUDED.instructions_steps_en;

-- =====================================================
-- 2. Adicionar integrações Regyfit para BRUCELEE
-- =====================================================
-- A mesma integração (id_int=29) serve para os 3 planos
-- Mas cada modal precisa do seu próprio iframe (29, 30, 31)
-- O Formspark já recebe informação sobre qual plano foi escolhido

INSERT INTO coupon_regyfit_integrations (coupon_code, plan_type, iframe_id, integration_id)
VALUES 
  ('brucelee', 'elite', 29, 29),
  ('brucelee', 'rise', 30, 29),
  ('brucelee', 'starter', 31, 29)
ON CONFLICT (coupon_code, plan_type) 
DO UPDATE SET 
  iframe_id = EXCLUDED.iframe_id,
  integration_id = EXCLUDED.integration_id;

-- =====================================================
-- 3. Verificar configuração
-- =====================================================

-- Ver cupão BRUCELEE
SELECT 'Cupão BRUCELEE' as category, * 
FROM coupons 
WHERE code = 'brucelee';

-- Ver integrações Regyfit
SELECT 'BRUCELEE Regyfit Integrations' as category, * 
FROM coupon_regyfit_integrations 
WHERE coupon_code = 'brucelee'
ORDER BY plan_type;

-- =====================================================
-- 4. Como usar
-- =====================================================
-- Utilizadores inserem o código "BRUCELEE" no campo de cupão
-- Sistema mostra:
-- - Banner: "Poupas a MENSALIDADE COMPLETA de Dezembro!"
-- - Instruções de como funciona
-- - Botão para continuar para inscrição Regyfit
--
-- No Regyfit (com integrações 29, 30, 31):
-- - Cobra apenas €25 de seguro
-- - SEM taxa de inscrição
-- - SEM cobrança de primeira mensalidade
-- - Mensalidades começam em Janeiro 2026
-- =====================================================

-- Script Completo! 🥋 BE WATER, MY FRIEND!

