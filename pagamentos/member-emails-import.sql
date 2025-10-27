-- ============================================
-- BE WATER - IMPORT DE EMAILS DE SÓCIOS
-- ============================================
-- Este ficheiro serve para importar emails de sócios atuais
-- do Excel para a base de dados de cupões.
--
-- INSTRUÇÕES:
-- 1. Copiar todos os emails do Excel
-- 2. Substituir os emails de exemplo abaixo
-- 3. Aceder ao Supabase Dashboard → SQL Editor
-- 4. Copiar e colar o código completo
-- 5. Executar (Run)
--
-- NOTAS:
-- - Cada email só pode ser inserido uma vez (constraint UNIQUE)
-- - Se um email já existir, vai dar erro - isto é normal!
-- - Para atualizar emails, ver secção "GESTÃO DE CUPÕES" abaixo
-- ============================================

-- ============================================
-- INSERIR EMAILS DE SÓCIOS
-- ============================================
-- Formato: ('email@exemplo.com', 'member_email', true)
-- 
-- SUBSTITUIR OS EMAILS ABAIXO PELOS EMAILS REAIS DO EXCEL:

INSERT INTO coupons (code, type, active) VALUES
  -- Adicionar emails aqui, um por linha:
  ('socio1@gmail.com', 'member_email', true),
  ('socio2@hotmail.com', 'member_email', true),
  ('socio3@yahoo.com', 'member_email', true)
  -- ... adicionar mais emails conforme necessário
ON CONFLICT (code) DO NOTHING; -- Ignora se email já existir

-- ============================================
-- INSERIR CUPÕES GENÉRICOS (OPCIONAL)
-- ============================================
-- Cupões genéricos são códigos promocionais criados manualmente
-- Exemplos: PROMO2025, AMIGO50, REFERRAL, etc.

INSERT INTO coupons (code, type, active) VALUES
  ('PROMO2025', 'generic', true),
  ('AMIGO50', 'generic', true)
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- GESTÃO DE CUPÕES
-- ============================================

-- VER TODOS OS CUPÕES ATIVOS:
-- SELECT * FROM coupons WHERE active = true ORDER BY created_at DESC;

-- VER TODOS OS CUPÕES (ATIVOS E INATIVOS):
-- SELECT * FROM coupons ORDER BY created_at DESC;

-- DESATIVAR UM CUPÃO (sem apagar):
-- UPDATE coupons SET active = false WHERE code = 'email@exemplo.com';

-- REATIVAR UM CUPÃO:
-- UPDATE coupons SET active = true WHERE code = 'email@exemplo.com';

-- APAGAR UM CUPÃO PERMANENTEMENTE:
-- DELETE FROM coupons WHERE code = 'email@exemplo.com';

-- ADICIONAR NOVO CUPÃO INDIVIDUAL:
-- INSERT INTO coupons (code, type, active) VALUES ('novo@email.com', 'member_email', true);

-- ============================================
-- RELATÓRIOS E ESTATÍSTICAS
-- ============================================

-- TOTAL DE CUPÕES POR TIPO:
-- SELECT type, COUNT(*) as total, 
--        SUM(CASE WHEN active THEN 1 ELSE 0 END) as ativos
-- FROM coupons 
-- GROUP BY type;

-- CUPÕES MAIS UTILIZADOS:
-- SELECT cu.coupon_code, c.type, COUNT(*) as vezes_usado
-- FROM coupon_usages cu
-- LEFT JOIN coupons c ON cu.coupon_code = c.code
-- GROUP BY cu.coupon_code, c.type
-- ORDER BY vezes_usado DESC
-- LIMIT 10;

-- UTILIZAÇÕES POR PLANO:
-- SELECT plan_type, COUNT(*) as total
-- FROM coupon_usages
-- GROUP BY plan_type
-- ORDER BY total DESC;

-- UTILIZAÇÕES NOS ÚLTIMOS 30 DIAS:
-- SELECT DATE(used_at) as dia, COUNT(*) as utilizacoes
-- FROM coupon_usages
-- WHERE used_at >= NOW() - INTERVAL '30 days'
-- GROUP BY DATE(used_at)
-- ORDER BY dia DESC;

-- ============================================
-- EXEMPLO PRÁTICO: EXCEL COM 50 EMAILS
-- ============================================
-- Se tiveres um Excel com emails numa coluna, podes usar
-- esta fórmula no Excel para gerar o SQL automaticamente:
--
-- Célula B1: ="('"&A1&"', 'member_email', true),"
-- 
-- Depois copiar a coluna B e colar aqui, substituindo os exemplos.
-- ============================================

