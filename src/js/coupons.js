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
  }
};

// ============================================
// VALIDAÇÃO DE CUPÃO
// ============================================

/**
 * Valida um cupão contra a base de dados Supabase
 * @param {string} code - Código do cupão (email ou código genérico)
 * @returns {Promise<{valid: boolean, type: string, message: string}>}
 */
async function validateCoupon(code) {
  try {
    // Normalizar código (trim e lowercase para emails)
    const normalizedCode = code.trim().toLowerCase();
    
    if (!normalizedCode) {
      return {
        valid: false,
        type: null,
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
          message: window.i18n ? window.i18n.t('coupon.invalid') : '❌ Cupão inválido'
        };
      }
      
      // Outro erro
      return {
        valid: false,
        type: null,
        message: 'Erro ao validar cupão. Tente novamente.'
      };
    }

    // Cupão válido!
    console.log('✅ Cupão válido:', data);
    
    const typeLabel = data.type === 'member_email' ? 'Email de Sócio' : 'Cupão Genérico';
    
    return {
      valid: true,
      type: data.type,
      message: window.i18n ? window.i18n.t('coupon.valid') : '✅ Cupão válido! 50% desconto confirmado'
    };

  } catch (err) {
    console.error('❌ Erro fatal na validação:', err);
    return {
      valid: false,
      type: null,
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
function saveCouponToSession(couponCode, couponType, planType) {
  const data = {
    couponCode: couponCode.trim().toLowerCase(),
    couponType,
    planType,
    timestamp: new Date().toISOString()
  };
  
  sessionStorage.setItem(COUPON_CONFIG.SESSION_KEY, JSON.stringify(data));
  console.log('💾 Cupão guardado na sessão:', data);
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

  const couponForm = modal.querySelector('.coupon-pre-form');
  const regyContainer = modal.querySelector('.modal-regy-container');
  const instructions = modal.querySelector('.modal-purchase-instructions');

  if (couponForm) couponForm.style.display = 'block';
  if (regyContainer) regyContainer.style.display = 'none';
  if (instructions) instructions.style.display = 'none';
}

/**
 * Mostra o iframe REGYFIT
 */
function showRegyStep(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const couponForm = modal.querySelector('.coupon-pre-form');
  const regyContainer = modal.querySelector('.modal-regy-container');
  const instructions = modal.querySelector('.modal-purchase-instructions');
  const postForm = modal.querySelector('.coupon-post-form');

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

