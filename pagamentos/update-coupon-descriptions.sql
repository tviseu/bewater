-- =====================================================
-- Update Coupon Descriptions - Pro-rata Payment Info
-- =====================================================
-- Este script atualiza as descrições dos cupões existentes
-- para incluir informação sobre pagamento proporcional
-- 
-- Execute este script APENAS se já tiver executado o migrate-to-dynamic-coupons.sql
-- =====================================================

-- PLANALTO coupon - corrigir descrição e steps (SEM SEGURO!)
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

-- EARLYBIRD coupon - corrigir descrição e steps
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

-- Outros cupões genéricos - adicionar pagamento proporcional
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
  AND instructions_steps_pt IS NOT NULL;

-- Verificação
SELECT code, 
       discount_type, 
       discount_value,
       instructions_steps_pt->>0 as step1_pt,
       instructions_steps_pt->>1 as step2_pt,
       instructions_steps_pt->>2 as step3_pt,
       instructions_steps_pt->>3 as step4_pt
FROM coupons 
WHERE active = true
ORDER BY code;

