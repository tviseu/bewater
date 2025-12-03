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
// REGYFIT INTEGRATIONS (Database-driven)
// ============================================

/**
 * Obtém configuração de integração Regyfit para um cupão específico
 * @param {string} couponCode - Código do cupão (lowercase)
 * @param {string} planType - Tipo de plano ('elite', 'rise', 'starter')
 * @param {string} couponType - Tipo do cupão ('member_email' ou 'generic')
 * @returns {Promise<{id: number, int: number}>} - IDs do iframe e integração
 */
async function getCouponRegyfit(couponCode, planType, couponType = null) {
  try {
    console.log(`🔍 Buscando Regyfit integration para cupão "${couponCode}" / plano "${planType}" / tipo "${couponType}"`);
    
    // Se for cupão de sócio (member_email), buscar por '_member_email'
    const lookupCode = couponType === 'member_email' ? '_member_email' : couponCode.toLowerCase();
    
    if (couponType === 'member_email') {
      console.log(`👥 Cupão de sócio detectado, buscando integração especial para member_email`);
    }
    
    // Primeiro tentar buscar integração específica do cupão
    const { data, error } = await supabase
      .from('coupon_regyfit_integrations')
      .select('iframe_id, integration_id')
      .eq('coupon_code', lookupCode)
      .eq('plan_type', planType)
      .limit(1);
    
    if (!error && data && data.length > 0) {
      console.log(`✅ Integração específica encontrada: iframe_id=${data[0].iframe_id}, integration_id=${data[0].integration_id}`);
      return { id: data[0].iframe_id, int: data[0].integration_id };
    }
    
    // Se não encontrar, usar integração default
    console.log(`⚠️ Integração específica não encontrada para "${lookupCode}", usando default`);
    return getDefaultRegyfit(planType);
    
  } catch (err) {
    console.error('❌ Erro ao buscar Regyfit integration:', err);
    return getDefaultRegyfit(planType);
  }
}

/**
 * Obtém configuração default de Regyfit (sem cupão especial)
 * @param {string} planType - Tipo de plano ('elite', 'rise', 'starter')
 * @returns {Promise<{id: number, int: number}>}
 */
async function getDefaultRegyfit(planType) {
  // Normalize planType (remove -coupon suffix if present)
  const normalizedPlanType = planType.replace('-coupon', '');
  
  try {
    const { data, error } = await supabase
      .from('coupon_regyfit_integrations')
      .select('iframe_id, integration_id')
      .eq('coupon_code', '_default')
      .eq('plan_type', normalizedPlanType)
      .limit(1);
    
    if (!error && data && data.length > 0) {
      console.log(`✅ Integração default encontrada: iframe_id=${data[0].iframe_id}, integration_id=${data[0].integration_id}`);
      return { id: data[0].iframe_id, int: data[0].integration_id };
    }
    
    // Fallback hardcoded caso a BD não tenha dados
    console.warn(`⚠️ Usando fallback hardcoded para integração default (${normalizedPlanType})`);
    const fallback = {
      elite: { id: 5, int: 1 },
      rise: { id: 6, int: 3 },
      starter: { id: 7, int: 2 }
    };
    return fallback[normalizedPlanType] || fallback.elite; // Default to elite if not found
    
  } catch (err) {
    console.error('❌ Erro ao buscar default Regyfit, usando fallback:', err);
    const fallback = {
      elite: { id: 5, int: 1 },
      rise: { id: 6, int: 3 },
      starter: { id: 7, int: 2 }
    };
    return fallback[normalizedPlanType] || fallback.elite; // Default to elite if not found
  }
}

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

    // Consultar Supabase - usar limit(1) em vez de single() para evitar erro com duplicatas
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', normalizedCode)
      .eq('active', true)
      .limit(1);

    if (error) {
      console.log('⚠️ Erro Supabase:', error.message);
      return {
        valid: false,
        type: null,
        code: null,
        isSpecial: false,
        message: 'Erro ao validar cupão. Tente novamente.'
      };
    }

    // Verificar se encontrou pelo menos 1 resultado
    if (!data || data.length === 0) {
      console.log('⚠️ Cupão não encontrado na BD');
      return {
        valid: false,
        type: null,
        code: null,
        isSpecial: false,
        message: window.i18n ? window.i18n.t('coupon.invalid') : '❌ Cupão inválido'
      };
    }

    // Pegar o primeiro resultado (mesmo que haja duplicatas)
    const couponData = data[0];
    
    // Avisar se houver duplicatas (e dizer ao utilizador para limpar a BD)
    if (data.length > 1) {
      console.warn(`⚠️ ATENÇÃO: Encontradas ${data.length} entradas duplicadas para o cupão "${normalizedCode}". Usando a primeira. Recomenda-se limpar duplicatas na BD.`);
    }

    // Cupão válido!
    console.log('✅ Cupão válido:', couponData);
    
    const typeLabel = couponData.type === 'member_email' ? 'Email de Sócio' : 'Cupão Genérico';
    
    // Usar descrição da base de dados se disponível, senão usar mensagem padrão
    let message = window.i18n ? window.i18n.t('coupon.valid') : '✅ Cupão válido!';
    
    if (couponData.description_pt) {
      const currentLang = window.i18n && window.i18n.currentLang ? window.i18n.currentLang() : 'pt';
      const description = currentLang === 'en' && couponData.description_en ? couponData.description_en : couponData.description_pt;
      message = `✅ Cupão válido! ${description}`;
    } else if (couponData.type === 'member_email') {
      // Para cupões de sócio sem descrição, mostrar desconto automaticamente
      const discountValue = couponData.discount_value || 50;
      const currentLang = window.i18n && window.i18n.currentLang ? window.i18n.currentLang() : 'pt';
      if (currentLang === 'en') {
        message = `✅ Valid coupon! You'll get ${discountValue}% off your first membership payment, and the member who referred you will get ${discountValue}% off their next payment!`;
      } else {
        message = `✅ Cupão válido! Vais receber ${discountValue}% de desconto na tua mensalidade agora, e o sócio que te referenciou recebe ${discountValue}% de desconto na próxima mensalidade!`;
      }
    }
    
    // Determinar se é especial baseado no discount_type (não mais array hardcoded)
    // BRUCELEE (100% desconto + sem taxa) também é considerado especial
    // TAXAFREE (Oferta seguro anual) também é considerado especial
    // PODCAST (Oferta seguro anual) também é considerado especial
    const isSpecial = (couponData.discount_type && 
                      (couponData.discount_type === 'permanent_amount' || 
                       couponData.discount_type === 'permanent_monthly')) ||
                      (couponData.discount_value === 100.00 && couponData.waive_registration_fee) ||
                      normalizedCode === 'brucelee' ||
                      normalizedCode === 'taxafree' ||
                      normalizedCode === 'podcast';
    
    if (isSpecial) {
      console.log('🌟 Cupão ESPECIAL detectado - vai usar Regyfit específico e mostrar banner');
    }
    
    return {
      valid: true,
      type: couponData.type,
      code: normalizedCode,
      isSpecial: isSpecial,
      message: message,
      discountType: couponData.discount_type || 'percentage_next',
      // Fix: allow 0 as a valid discount value (don't default to 50 if it's 0)
      discountValue: (couponData.discount_value !== null && couponData.discount_value !== undefined) ? couponData.discount_value : 50.00,
      waiveRegistrationFee: couponData.waive_registration_fee || false,
      descriptionPt: couponData.description_pt,
      descriptionEn: couponData.description_en,
      instructionsStepsPt: couponData.instructions_steps_pt || null,
      instructionsStepsEn: couponData.instructions_steps_en || null
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
function saveCouponToSession(couponCode, couponType, planType, isSpecial = false, instructionsStepsPt = null, instructionsStepsEn = null, discountValue = null, waiveRegistrationFee = false, discountType = null) {
  const data = {
    couponCode: couponCode.trim().toLowerCase(),
    couponType,
    planType,
    isSpecial: isSpecial,
    instructionsStepsPt: instructionsStepsPt,
    instructionsStepsEn: instructionsStepsEn,
    discountValue: discountValue,
    waiveRegistrationFee: waiveRegistrationFee,
    discountType: discountType,
    timestamp: new Date().toISOString()
  };
  
  sessionStorage.setItem(COUPON_CONFIG.SESSION_KEY, JSON.stringify(data));
  console.log('💾 Cupão guardado na sessão:', data);
  if (isSpecial) {
    console.log('🌟 Cupão ESPECIAL guardado - tipo: ' + discountType + ', valor: ' + discountValue + ', dispensa seguro: ' + waiveRegistrationFee);
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

  // Reset modal container width to default (compact)
  const modalContainer = modal.querySelector('.modal-container');
  if (modalContainer) {
    modalContainer.style.maxWidth = '';
    modalContainer.style.width = '';
    console.log('  📏 Reset modal width to default');
  }

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
async function showRegyStep(modalId, forceNormal = false) {
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
  // Normalize planType (remove -coupon suffix if present)
  const planType = modalId.replace('modal-', '').replace('-coupon', '');
  
  // Determinar qual iframe mostrar usando a BD
  let integrationConfig;
  
  if (isSpecial && couponData && couponData.couponCode) {
    // Cupão especial - buscar integração específica da BD
    const couponCode = couponData.couponCode.toLowerCase();
    const couponType = couponData.couponType || null;
    integrationConfig = await getCouponRegyfit(couponCode, planType, couponType);
    if (!integrationConfig) {
      console.error('❌ Falha ao obter configuração do cupão especial, usando fallback');
      integrationConfig = { id: 5, int: 1 }; // Fallback to elite default
    }
    console.log(`🌟 Usando Regyfit para cupão "${couponCode.toUpperCase()}" (id_int=${integrationConfig.int}) para plano ${planType}`);
  } else if (couponData && couponData.couponCode && couponData.couponType === 'member_email') {
    // Cupão de sócio (member_email) - usar integração específica de member_email
    const couponCode = couponData.couponCode.toLowerCase();
    integrationConfig = await getCouponRegyfit(couponCode, planType, 'member_email');
    if (!integrationConfig) {
      console.error('❌ Falha ao obter configuração do cupão de sócio, usando fallback');
      integrationConfig = { id: 5, int: 1 }; // Fallback to elite default
    }
    console.log(`👥 Usando Regyfit para cupão de SÓCIO (id_int=${integrationConfig.int}) para plano ${planType}`);
  } else {
    // Cupão normal ou sem cupão - usar integração default da BD
    integrationConfig = await getDefaultRegyfit(planType);
    if (!integrationConfig) {
      console.error('❌ Falha ao obter configuração default, usando fallback hardcoded');
      integrationConfig = { id: 5, int: 1 }; // Fallback to elite default
    }
    console.log(`📋 Usando Regyfit NORMAL (id_int=${integrationConfig.int}) para plano ${planType}`);
  }
  
  // Determinar se estamos num modal de cupões (que tem IDs com sufixo "_coupon")
  const isCouponModal = modalId.includes('-coupon');
  const iframeSuffix = isCouponModal ? '_coupon' : '';
  
  // Construir ID do iframe e input corretos
  const iframeId = `frame_regy${integrationConfig.id}${iframeSuffix}`;
  const inputId = `src_regy${integrationConfig.id}${iframeSuffix}`;
  
  console.log(`🎯 Procurando iframe: ${iframeId} (modal: ${modalId}, isCouponModal: ${isCouponModal}, integration: ${integrationConfig.int})`);
  
  // Hide ALL iframes in this modal first
  const allIframes = regyContainer.querySelectorAll('iframe[name^="frame_regy"]');
  console.log('  🔍 DEBUG: Total iframes found in container:', allIframes.length);
  allIframes.forEach((iframe, index) => {
    console.log(`  🔍 DEBUG: Hiding iframe ${index}:`, iframe.id, 'current display:', window.getComputedStyle(iframe).display);
    iframe.style.setProperty('display', 'none', 'important');
    iframe.style.setProperty('position', 'absolute', 'important');  // Remove from layout flow
    iframe.style.setProperty('visibility', 'hidden', 'important');  // Extra hiding
    iframe.style.setProperty('height', '0', 'important');
    iframe.style.setProperty('min-height', '0', 'important');
  });
  
  // Reactivate the corresponding input if it was deferred
  const inputToActivate = document.getElementById(inputId);
  if (inputToActivate && inputToActivate.classList.contains('class_regy_deferred')) {
    inputToActivate.classList.remove('class_regy_deferred');
    inputToActivate.classList.add('class_regy');
    console.log(`  ✅ Reactivated deferred input: ${inputId}`);
    
    // Reload Regyfit script to process the newly activated input
    if (typeof window.reloadRegyScript === 'function') {
      window.reloadRegyScript();
    }
  }
  
  // Show ONLY the correct iframe
  const iframeToShow = document.getElementById(iframeId);
  if (iframeToShow) {
    console.log('  🔍 DEBUG: Found iframe to show:', iframeId);
    console.log('  🔍 DEBUG: Iframe current src:', iframeToShow.src);
    console.log('  🔍 DEBUG: Iframe current display:', window.getComputedStyle(iframeToShow).display);
    console.log('  🔍 DEBUG: Iframe current position:', window.getComputedStyle(iframeToShow).position);
    console.log('  🔍 DEBUG: Iframe current height:', window.getComputedStyle(iframeToShow).height);
    console.log('  🔍 DEBUG: Iframe current minHeight:', window.getComputedStyle(iframeToShow).minHeight);
    
    // Ensure iframe is initialized if empty (fallback for when hidden initially)
    if (!iframeToShow.src || iframeToShow.src === '' || iframeToShow.src === 'about:blank') {
        console.log(`  ⚠️ Iframe ${iframeId} vazio, a inicializar manualmente...`);
        const input = document.getElementById(inputId);
        if (input && input.value) {
            const url = input.value;
            const lang = document.documentElement.lang || 'pt';
            const fullUrl = `${url}&lang=${lang}&site_url=${encodeURIComponent(window.location.href)}`;
            iframeToShow.src = fullUrl;
            console.log(`  ✅ Iframe src definido: ${fullUrl}`);
        }
    }

    iframeToShow.style.setProperty('display', 'block', 'important');
    iframeToShow.style.setProperty('position', 'relative', 'important');  // Back to normal flow
    iframeToShow.style.setProperty('visibility', 'visible', 'important');
    iframeToShow.style.width = '100%';
    iframeToShow.style.height = 'auto';
    iframeToShow.style.setProperty('min-height', '100px', 'important');
    iframeToShow.style.padding = '0';
    iframeToShow.style.margin = '0';
    
    console.log(`✅ Iframe mostrado: ${iframeId}`);
    console.log('  🔍 DEBUG: Iframe AFTER changes - display:', window.getComputedStyle(iframeToShow).display);
    console.log('  🔍 DEBUG: Iframe AFTER changes - height:', window.getComputedStyle(iframeToShow).height);
    console.log('  🔍 DEBUG: Iframe AFTER changes - minHeight:', window.getComputedStyle(iframeToShow).minHeight);
    
    // Check if there are any siblings taking up space
    const siblings = Array.from(regyContainer.children);
    console.log('  🔍 DEBUG: regyContainer children count:', siblings.length);
    siblings.forEach((child, index) => {
      const computedStyle = window.getComputedStyle(child);
      console.log(`  🔍 DEBUG: Child ${index}:`, {
        tagName: child.tagName,
        id: child.id,
        display: computedStyle.display,
        height: computedStyle.height,
        minHeight: computedStyle.minHeight,
        position: computedStyle.position
      });
    });
  } else {
    console.error(`❌ Iframe não encontrado: ${iframeId}`);
    console.log(`🔍 IDs disponíveis no modal:`, Array.from(allIframes).map(f => f.id));
    console.error(`   Iframes disponíveis:`, Array.from(allIframes).map(i => i.id));
  }

  if (couponForm) {
    couponForm.style.display = 'none';
    console.log('  🔍 DEBUG: couponForm hidden');
  }
  if (regyContainer) {
    regyContainer.style.display = 'block';
    regyContainer.style.padding = '0';
    regyContainer.style.margin = '0';
    console.log('  🔍 DEBUG: regyContainer shown');
    console.log('  🔍 DEBUG: regyContainer computed height:', window.getComputedStyle(regyContainer).height);
    console.log('  🔍 DEBUG: regyContainer computed padding:', window.getComputedStyle(regyContainer).padding);
    console.log('  🔍 DEBUG: regyContainer computed margin:', window.getComputedStyle(regyContainer).margin);
    
    // Expandir modal para largura completa quando Regyfit é mostrado
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
      modalContainer.style.maxWidth = '1200px';
      modalContainer.style.width = '98%';
      console.log('  🔍 DEBUG: Modal container expanded for Regyfit');
    }
    
    // Scroll suave para o topo do container Regyfit
    setTimeout(() => {
      regyContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      
      // Ajustar com offset para compensar header fixo
      setTimeout(() => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
          top: Math.max(0, currentScroll - 100), // Offset de 100px para header
          behavior: 'smooth'
        });
      }, 300);
    }, 200); // Delay para garantir que o iframe foi renderizado
  }
  if (instructions) {
    instructions.style.display = 'none';
    console.log('  🔍 DEBUG: instructions hidden');
  }
  if (postForm) {
    postForm.style.display = 'none';
    console.log('  🔍 DEBUG: postForm hidden');
  }
  
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

