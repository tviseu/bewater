-- =====================================================
-- Database Migration: Dynamic Coupons System
-- =====================================================
-- This script moves coupon configuration from hardcoded JavaScript to the database
-- Run this in Supabase SQL Editor

-- =====================================================
-- 1. Create coupon_regyfit_integrations table
-- =====================================================

CREATE TABLE IF NOT EXISTS coupon_regyfit_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coupon_code VARCHAR(255) NOT NULL,
  plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('elite', 'rise', 'starter')),
  iframe_id INT NOT NULL,
  integration_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(coupon_code, plan_type)
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_coupon_regyfit_lookup 
ON coupon_regyfit_integrations(coupon_code, plan_type);

-- =====================================================
-- 2. Populate Regyfit integrations
-- =====================================================

-- Default integrations (for generic coupons or no coupon)
INSERT INTO coupon_regyfit_integrations (coupon_code, plan_type, iframe_id, integration_id)
VALUES 
  ('_default', 'elite', 5, 1),
  ('_default', 'rise', 6, 3),
  ('_default', 'starter', 7, 2)
ON CONFLICT (coupon_code, plan_type) DO NOTHING;

-- PLANALTO coupon integrations
INSERT INTO coupon_regyfit_integrations (coupon_code, plan_type, iframe_id, integration_id)
VALUES 
  ('planalto', 'elite', 20, 20),
  ('planalto', 'rise', 21, 21),
  ('planalto', 'starter', 22, 22)
ON CONFLICT (coupon_code, plan_type) DO NOTHING;

-- EARLYBIRD coupon integrations
INSERT INTO coupon_regyfit_integrations (coupon_code, plan_type, iframe_id, integration_id)
VALUES 
  ('earlybird', 'elite', 24, 24),
  ('earlybird', 'rise', 23, 23),
  ('earlybird', 'starter', 25, 25)
ON CONFLICT (coupon_code, plan_type) DO NOTHING;

-- =====================================================
-- 3. Add instructions columns to coupons table
-- =====================================================

ALTER TABLE coupons 
ADD COLUMN IF NOT EXISTS instructions_steps_pt JSON,
ADD COLUMN IF NOT EXISTS instructions_steps_en JSON;

-- =====================================================
-- 4. Migrate hardcoded steps to database
-- =====================================================

-- PLANALTO coupon instructions (Portuguese) - SEM SEGURO!
UPDATE coupons 
SET instructions_steps_pt = '[
  "1️⃣ Preencha o formulário de inscrição",
  "2️⃣ Primeiro mês pago de forma proporcional aos dias que faltam",
  "3️⃣ SEM taxa de inscrição e SEM seguro (poupas €25)",
  "4️⃣ Desconto de €10 PERMANENTE aplicado TODOS os meses"
]'::json,
instructions_steps_en = '[
  "1️⃣ Fill out the registration form",
  "2️⃣ First month paid pro-rata for remaining days",
  "3️⃣ NO registration fee and NO insurance (save €25)",
  "4️⃣ €10 PERMANENT discount applied EVERY month"
]'::json
WHERE code = 'planalto';

-- EARLYBIRD coupon instructions (Portuguese)
UPDATE coupons 
SET instructions_steps_pt = '[
  "1️⃣ Preencha o formulário de inscrição",
  "2️⃣ Primeiro mês pago de forma proporcional aos dias que faltam",
  "3️⃣ Pagamento do seguro anual (€25)",
  "4️⃣ Desconto de €10 PERMANENTE aplicado todos os meses"
]'::json,
instructions_steps_en = '[
  "1️⃣ Fill out the registration form",
  "2️⃣ First month paid pro-rata for remaining days",
  "3️⃣ Annual insurance payment (€25)",
  "4️⃣ €10 PERMANENT discount applied every month"
]'::json
WHERE code = 'earlybird';

-- Default instructions for generic coupons (if any exist)
-- These are the standard 4-step instructions previously hardcoded
UPDATE coupons 
SET instructions_steps_pt = '[
  "1️⃣ Preencha o formulário de inscrição",
  "2️⃣ Primeiro mês pago de forma proporcional aos dias que faltam",
  "3️⃣ Pagamento do seguro anual (€25)",
  "4️⃣ Desconto aplicado conforme o cupão",
  "5️⃣ Mensalidades seguintes ao preço padrão"
]'::json,
instructions_steps_en = '[
  "1️⃣ Fill out the registration form",
  "2️⃣ First month paid pro-rata for remaining days",
  "3️⃣ Annual insurance payment (€25)",
  "4️⃣ Discount applied according to coupon",
  "5️⃣ Subsequent months at standard price"
]'::json
WHERE code NOT IN ('planalto', 'earlybird') 
  AND (instructions_steps_pt IS NULL OR instructions_steps_en IS NULL);

-- =====================================================
-- 5. Verification queries
-- =====================================================

-- View all Regyfit integrations
SELECT * FROM coupon_regyfit_integrations ORDER BY coupon_code, plan_type;

-- View coupons with instructions
SELECT code, discount_type, discount_value, 
       instructions_steps_pt, instructions_steps_en 
FROM coupons 
WHERE active = true;

-- =====================================================
-- Migration Complete
-- =====================================================

