/**
 * BE WATER - Sistema de Cupões de Desconto
 * 
 * Este módulo gere todo o fluxo de cupões:
 * 1. Validação de cupões contra Supabase
 * 2. Gestão de estados do formulário (pré-form, REGYFIT, pós-form)
 * 3. Registo de utilizações
 * 4. Envio de notificações via Formspark
 */

// ============================================
// CONFIGURAÇÃO
// ============================================

const COUPON_CONFIG = {
  FORMSPARK_ID: 'cMzqixKrn', // Form ID para notificações de cupões
  SESSION_KEY: 'bewater_coupon_data',
  PLANS: {
    'elite': 'Elite',
    'rise': 'Rise',
    'starter': 'Starter'
  },
  // Cupões especiais que redirecionam para integrações Regyfit diferentes
  // (€10 desconto PERMANENTE, sem seguro este ano, sem taxa inscrição €25)
  SPECIAL_COUPONS: [
    'planalto',  // Cupão Planalto: €10 desconto PARA SEMPRE + sem seguro este ano + sem taxa inscrição
  ],
  // Mapeamento de IDs de integração Regyfit
  REGYFIT_INTEGRATIONS: {
    normal: {
      elite: { id: 5, int: 1 },    // id_int=1
      rise: { id: 6, int: 3 },     // id_int=3
      starter: { id: 7, int: 2 }   // id_int=2
    },
    special: {
      elite: { id: 20, int: 20 },   // id_int=20
      rise: { id: 21, int: 21 },    // id_int=21
      starter: { id: 22, int: 22 }  // id_int=22
    }
  }
};

// ============================================
// VALIDAÇÃO DE CUPÃO
// ============================================

/**
 * Valida um cupão contra a base de dados Supabase
 * @param {string} code - Código do cupão (email ou código genérico)
 * @returns {Promise<{valid: boolean, type: string, message: string, code: string, isSpecial: boolean}>}
 */
async function validateCoupon(code) {
  try {
    // Normalizar código (trim e lowercase para emails)
    const normalizedCode = code.trim().toLowerCase();
    
    if (!normalizedCode) {
      return {
        valid: false,
        type: null,
        code: null,
        isSpecial: false,
        message: window.i18n ? window.i18n.t('coupon.error.empty') : 'Cupão não pode estar vazio'
      };
    }

    console.log('🔍 Validando cupão:', normalizedCode);

    // Verificar se Supabase está disponível
    if (typeof supabase === 'undefined') {
      console.error('❌ Supabase não está inicializado');
      return {
        valid: false,
        type: null,
        code: null,
        isSpecial: false,
        message: 'Erro de configuração. Contacte o staff.'
      };
    }

    // Consultar Supabase
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', normalizedCode)
      .eq('active', true)
      .single();

    if (error) {
      console.log('⚠️ Erro Supabase:', error.message);
      
      // Se não encontrou, é cupão inválido
      if (error.code === 'PGRST116') {
        return {
          valid: false,
          type: null,
          code: null,
          isSpecial: false,
          message: window.i18n ? window.i18n.t('coupon.invalid') : '❌ Cupão inválido'
        };
      }
      
      // Outro erro
      return {
        valid: false,
        type: null,
        code: null,
        isSpecial: false,
        message: 'Erro ao validar cupão. Tente novamente.'
      };
    }

    // Cupão válido!
    console.log('✅ Cupão válido:', data);
    
    // Verificar se é um cupão especial (redireciona para Regyfit diferente)
    const isSpecial = COUPON_CONFIG.SPECIAL_COUPONS.includes(normalizedCode);
    
    const typeLabel = data.type === 'member_email' ? 'Email de Sócio' : 'Cupão Genérico';
    
    let message = window.i18n ? window.i18n.t('coupon.valid') : '✅ Cupão válido! 50% desconto confirmado';
    if (isSpecial) {
      message = '✅ Cupão Planalto válido!';
      console.log('🌟 Cupão ESPECIAL detectado - vai usar Regyfit diferente');
    }
    
    return {
      valid: true,
      type: data.type,
      code: normalizedCode,
      isSpecial: isSpecial,
      message: message
    };

  } catch (err) {
    console.error('❌ Erro fatal na validação:', err);
    return {
      valid: false,
      type: null,
      code: null,
      isSpecial: false,
      message: 'Erro inesperado. Contacte o staff.'
    };
  }
}

// ============================================
// GESTÃO DE SESSÃO
// ============================================

/**
 * Guarda dados do cupão validado na sessão
 */
function saveCouponToSession(couponCode, couponType, planType, isSpecial = false) {
  const data = {
    couponCode: couponCode.trim().toLowerCase(),
    couponType,
    planType,
    isSpecial: isSpecial,
    timestamp: new Date().toISOString()
  };
  
  sessionStorage.setItem(COUPON_CONFIG.SESSION_KEY, JSON.stringify(data));
  console.log('💾 Cupão guardado na sessão:', data);
  if (isSpecial) {
    console.log('🌟 Cupão ESPECIAL guardado - vai usar integração Regyfit diferente');
  }
}

/**
 * Recupera dados do cupão da sessão
 */
function getCouponFromSession() {
  const stored = sessionStorage.getItem(COUPON_CONFIG.SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Limpa dados do cupão da sessão
 */
function clearCouponSession() {
  sessionStorage.removeItem(COUPON_CONFIG.SESSION_KEY);
  console.log('🗑️ Sessão de cupão limpa');
}

// ============================================
// REGISTO DE UTILIZAÇÃO
// ============================================

/**
 * Regista a utilização de um cupão no Supabase
 */
async function saveCouponUsage(usageData) {
  try {
    console.log('💾 Guardando utilização de cupão:', usageData);

    const { data, error } = await supabase
      .from('coupon_usages')
      .insert({
        coupon_code: usageData.couponCode,
        coupon_type: usageData.couponType,
        subscriber_name: usageData.subscriberName,
        subscriber_email: usageData.subscriberEmail,
        subscriber_phone: usageData.subscriberPhone,
        plan_type: usageData.planType,
        notification_sent: false // Será atualizado após envio
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao guardar utilização:', error);
      throw error;
    }

    console.log('✅ Utilização guardada:', data);
    return { success: true, data };

  } catch (err) {
    console.error('❌ Erro fatal ao guardar utilização:', err);
    return { success: false, error: err.message };
  }
}

// ============================================
// NOTIFICAÇÃO VIA FORMSPARK
// ============================================

/**
 * Envia notificação por email via Formspark
 */
async function sendCouponNotification(usageData) {
  try {
    console.log('📧 Enviando notificação via Formspark:', usageData);

    const formData = {
      subscriber_name: usageData.subscriberName,
      subscriber_email: usageData.subscriberEmail,
      subscriber_phone: usageData.subscriberPhone,
      plan_type: usageData.planType,
      coupon_code: usageData.couponCode,
      coupon_type: usageData.couponType === 'member_email' ? 'Email de Sócio' : 'Cupão Genérico',
      _email: {
        subject: `🎟️ Novo Cupão Utilizado - ${usageData.planType}`
      }
    };

    const response = await fetch(`https://submit-form.com/${COUPON_CONFIG.FORMSPARK_ID}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Notificação enviada com sucesso:', result);
    return { success: true };

  } catch (err) {
    console.error('❌ Erro ao enviar notificação:', err);
    return { success: false, error: err.message };
  }
}

// ============================================
// FLUXO COMPLETO DE SUBMISSÃO
// ============================================

/**
 * Processa submissão simplificada: apenas guarda uso no Supabase
 * O email é enviado diretamente no index.html após validação
 */
async function submitCouponUsage(couponCode, couponType, planType) {
  try {
    const usageData = {
      couponCode,
      couponType,
      subscriberName: null,  // Não temos - staff gere manualmente
      subscriberEmail: couponCode,  // Usar o email do cupão
      subscriberPhone: null,  // Não temos - staff gere manualmente
      planType
    };

    // Guardar no Supabase
    const saveResult = await saveCouponUsage(usageData);
    
    if (!saveResult.success) {
      console.warn('⚠️ Erro ao guardar no Supabase:', saveResult.error);
      // Não bloquear - email já foi enviado
    } else {
      console.log('✅ Utilização guardada no Supabase');
    }

    return { success: true, message: 'Cupão registado!' };

  } catch (err) {
    console.error('❌ Erro ao guardar utilização:', err);
    // Não bloquear - email já foi enviado
    return { success: true, message: 'Cupão registado (sem Supabase)' };
  }
}

// ============================================
// UI - GESTÃO DE ESTADOS DO MODAL
// ============================================

/**
 * Mostra o pré-form de cupão
 */
function showCouponStep(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // Limpar sessão ao mostrar formulário de cupão para evitar dados residuais
  clearCouponSession();
  console.log('🧹 Sessão limpa ao abrir formulário de cupão');

  const couponForm = modal.querySelector('.coupon-pre-form');
  const regyContainer = modal.querySelector('.modal-regy-container');
  const instructions = modal.querySelector('.modal-purchase-instructions');

  if (couponForm) couponForm.style.display = 'block';
  if (regyContainer) regyContainer.style.display = 'none';
  if (instructions) instructions.style.display = 'none';
}

/**
 * Mostra o iframe REGYFIT (normal ou especial)
 * @param {string} modalId - ID do modal (ex: 'modal-elite')
 * @param {boolean} forceNormal - Forçar uso do iframe normal (sem cupão especial)
 */
function showRegyStep(modalId, forceNormal = false) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const couponForm = modal.querySelector('.coupon-pre-form');
  const regyContainer = modal.querySelector('.modal-regy-container');
  const instructions = modal.querySelector('.modal-purchase-instructions');
  const postForm = modal.querySelector('.coupon-post-form');

  // Verificar se há cupão especial na sessão
  const couponData = getCouponFromSession();
  const isSpecial = forceNormal ? false : (couponData && couponData.isSpecial);
  
  if (forceNormal) {
    console.log('🔒 Forçando uso de iframe NORMAL (ignorando cupão especial da sessão)');
  }
  
  // Extrair o tipo de plano do modalId (ex: 'modal-elite' -> 'elite')
  const planType = modalId.replace('modal-', '');
  
  // Esconder todos os iframes primeiro
  const allIframes = regyContainer.querySelectorAll('iframe');
  allIframes.forEach(iframe => {
    iframe.style.display = 'none';
  });
  
  // Determinar qual iframe mostrar
  let iframeId, iframeToShow;
  if (isSpecial) {
    // Cupão especial - usar integrações id_int=20/21/22
    const specialConfig = COUPON_CONFIG.REGYFIT_INTEGRATIONS.special[planType];
    iframeId = `frame_regy${specialConfig.id}`;
    console.log(`🌟 Usando Regyfit ESPECIAL (id_int=${specialConfig.int}) para plano ${planType}`);
  } else {
    // Cupão normal ou sem cupão - usar integrações normais id_int=1/3/2
    const normalConfig = COUPON_CONFIG.REGYFIT_INTEGRATIONS.normal[planType];
    iframeId = `frame_regy${normalConfig.id}`;
    console.log(`📋 Usando Regyfit NORMAL (id_int=${normalConfig.int}) para plano ${planType}`);
  }
  
  // Mostrar o iframe correto
  iframeToShow = document.getElementById(iframeId);
  if (iframeToShow) {
    iframeToShow.style.display = 'block';
    console.log(`✅ Iframe mostrado: ${iframeId}`);
  } else {
    console.error(`❌ Iframe não encontrado: ${iframeId}`);
  }

  if (couponForm) couponForm.style.display = 'none';
  if (regyContainer) regyContainer.style.display = 'block';
  if (instructions) instructions.style.display = 'block';
  if (postForm) postForm.style.display = 'none';
  
  // Regyfit script handles iframe initialization automatically
  console.log('✅ Showing Regyfit container for modal:', modalId);
}

/**
 * Mostra o pós-form de captura de dados
 */
function showDataStep(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const couponForm = modal.querySelector('.coupon-pre-form');
  const regyContainer = modal.querySelector('.modal-regy-container');
  const instructions = modal.querySelector('.modal-purchase-instructions');
  const postForm = modal.querySelector('.coupon-post-form');

  if (couponForm) couponForm.style.display = 'none';
  if (regyContainer) regyContainer.style.display = 'none';
  if (instructions) instructions.style.display = 'none';
  if (postForm) postForm.style.display = 'block';
}

/**
 * Mostra mensagem de sucesso final
 */
function showSuccessMessage(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const postForm = modal.querySelector('.coupon-post-form');
  if (!postForm) return;

  const successHTML = `
    <div class="coupon-final-success">
      <h3>✅ ${window.i18n ? window.i18n.t('coupon.success_title') : 'Tudo Pronto!'}</h3>
      <p>${window.i18n ? window.i18n.t('coupon.success') : 'Obrigado! O desconto de 50% será aplicado manualmente pelo staff na tua próxima mensalidade e na do sócio que te referenciou.'}</p>
      <p><strong>BE WATER, MY FRIEND.</strong></p>
    </div>
  `;

  postForm.innerHTML = successHTML;
}

// ============================================
// EXPORTAR PARA GLOBAL
// ============================================

// Tornar funções disponíveis globalmente para uso no HTML
window.CouponSystem = {
  validate: validateCoupon,
  submit: submitCouponUsage,
  saveToSession: saveCouponToSession,
  getFromSession: getCouponFromSession,
  clearSession: clearCouponSession,
  ui: {
    showCouponStep,
    showRegyStep,
    showDataStep,
    showSuccessMessage
  }
};

console.log('✅ Sistema de cupões carregado');

