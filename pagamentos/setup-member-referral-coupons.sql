-- =====================================================
-- BE WATER - CONFIGURAÇÃO DE CUPÕES DE SÓCIO
-- =====================================================
-- Este script configura os cupões de referência de sócios para usar
-- as integrações Regyfit específicas (id_int: 26, 27, 28)
--
-- FUNCIONALIDADE:
-- - Novo sócio recebe 50% de desconto na mensalidade da INSCRIÇÃO (agora)
-- - Sócio existente recebe 50% de desconto na PRÓXIMA mensalidade
-- - Os descontos são aplicados manualmente pelo staff
--
-- INSTRUÇÕES:
-- 1. Aceder ao Supabase Dashboard
-- 2. Ir a "SQL Editor"
-- 3. Copiar e colar este script completo
-- 4. Executar (Run)
-- =====================================================

-- =====================================================
-- 1. Adicionar integrações Regyfit para cupões de sócio
-- =====================================================
-- Usar código especial '_member_email' para todos os cupões de tipo member_email

INSERT INTO coupon_regyfit_integrations (coupon_code, plan_type, iframe_id, integration_id)
VALUES 
  ('_member_email', 'elite', 26, 26),
  ('_member_email', 'rise', 27, 27),
  ('_member_email', 'starter', 28, 28)
ON CONFLICT (coupon_code, plan_type) 
DO UPDATE SET 
  iframe_id = EXCLUDED.iframe_id,
  integration_id = EXCLUDED.integration_id;

-- =====================================================
-- 2. Atualizar cupões de sócio existentes
-- =====================================================
-- Garantir que todos os cupões de tipo 'member_email' têm:
-- - discount_type = 'percentage_next' (50% na mensalidade atual do novo sócio + 50% na próxima do sócio existente)
-- - discount_value = 50.00
-- - waive_registration_fee = false (taxa de inscrição é cobrada)
-- - Descrições em PT e EN

UPDATE coupons 
SET 
  discount_type = 'percentage_next',
  discount_value = 50.00,
  waive_registration_fee = false,
  description_pt = '50% desconto na tua mensalidade agora + 50% desconto na próxima mensalidade do sócio',
  description_en = '50% discount on your membership now + 50% discount on next membership for the member'
WHERE type = 'member_email'
  AND (discount_type IS NULL 
       OR discount_type = 'percentage_next' 
       OR description_pt IS NULL);

-- =====================================================
-- 3. Verificar configuração
-- =====================================================

-- Verificar integrações Regyfit para cupões de sócio
SELECT 'Member Email Regyfit Integrations' as category, * 
FROM coupon_regyfit_integrations 
WHERE coupon_code = '_member_email'
ORDER BY plan_type;

-- Verificar cupões de sócio
SELECT 'Member Email Coupons (Sample)' as category,
  code, 
  type, 
  active,
  discount_type,
  discount_value,
  waive_registration_fee,
  description_pt
FROM coupons 
WHERE type = 'member_email' 
  AND active = true
LIMIT 5;

-- Contar cupões de sócio ativos
SELECT 'Total Active Member Email Coupons' as category,
  COUNT(*) as total_count
FROM coupons 
WHERE type = 'member_email' 
  AND active = true;

-- =====================================================
-- 4. Como adicionar novos emails de sócios
-- =====================================================
-- Para adicionar novos emails de sócios à base de dados,
-- usar o arquivo member-emails-import.sql ou inserir manualmente:

-- EXEMPLO:
-- INSERT INTO coupons (code, type, active, discount_type, discount_value, waive_registration_fee, description_pt, description_en)
-- VALUES 
--   ('socio.novo@gmail.com', 'member_email', true, 'percentage_next', 50.00, false,
--    '50% desconto na próxima mensalidade para ti e para o sócio',
--    '50% discount on next membership for you and the member')
-- ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- Configuração Completa!
-- =====================================================

