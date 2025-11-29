// Pricing Modals Functionality - Enhanced Version with Improved Timing and Error Handling
document.addEventListener('DOMContentLoaded', function() {
  
  // Ensure DOM is fully ready before executing
  if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting...');
    return;
  }
  
  // Function to make iframes responsive and dynamic with enhanced error handling
  function makeIframesDynamic() {
    const allIframes = document.querySelectorAll('iframe[name^="frame_regy"]');
    
    if (allIframes.length === 0) {
      console.warn('No Regy iframes found');
      return;
    }
    
    allIframes.forEach(function(iframe) {
      // Check if iframe is valid before processing
      if (!iframe || iframe.style === undefined) {
        console.warn('Invalid iframe element found');
        return;
      }
      
      try {
        // Set initial responsive styles with safety checks
        iframe.style.width = '100%';
        iframe.style.minHeight = '800px';
        iframe.style.border = 'none';
        iframe.style.display = 'block';
        
        // Enable scrolling for better UX
        iframe.setAttribute('scrolling', 'auto');
        
        // Try to auto-resize based on content (when possible)
        iframe.onload = function() {
          try {
            // This might work for same-origin content
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc && iframeDoc.body) {
              const iframeHeight = iframeDoc.body.scrollHeight;
              if (iframeHeight > 400) {
                iframe.style.height = Math.min(iframeHeight + 50, window.innerHeight * 0.8) + 'px';
              }
            }
          } catch (e) {
            // Cross-origin restrictions - use fixed responsive height
            console.log('Auto-resize not possible due to cross-origin restrictions');
          }
        };
        
        // Add error handler for iframe loading
        iframe.onerror = function() {
          console.warn('Iframe failed to load:', iframe.name);
        };
        
      } catch (error) {
        console.error('Error setting up iframe:', iframe.name, error);
      }
    });
  }
  
  // Apply dynamic sizing with safety delay
  setTimeout(function() {
    makeIframesDynamic();
  }, 100);
  
  // Initialize modal functionality with enhanced timing
  setTimeout(function() {
    // Track last modal open time to prevent rapid successive opens
    let lastModalOpenTime = 0;
    const MODAL_OPEN_DEBOUNCE = 500; // milliseconds
    
    // Modal functions
    function openModal(modalId) {
      // Debounce: prevent opening modals too quickly in succession
      const now = Date.now();
      if (now - lastModalOpenTime < MODAL_OPEN_DEBOUNCE) {
        console.log('⏳ Modal open debounced, please wait...');
        return;
      }
      
      // CLOSE ANY ACTIVE LIGHTBOX FIRST (Fix for overlaying issues)
      const activeLightbox = document.querySelector('.bento-lightbox.active');
      if (activeLightbox) {
          // Safely close lightbox if function exists, otherwise manual class removal
          if (typeof window.closeLightbox === 'function') {
              window.closeLightbox();
          } else {
              activeLightbox.classList.remove('active');
              // Stop videos
              const videos = activeLightbox.querySelectorAll('video');
              videos.forEach(v => v.pause());
              document.body.style.overflow = ''; // Restore scroll
          }
      }

      lastModalOpenTime = now;
      const modal = document.getElementById('modal-' + modalId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        console.log('Modal opened:', modalId);
        
        // Check if this is a PLAN modal (with pricing request form) or a PACK/COUPON modal
        const pricingRequestForm = modal.querySelector('.pricing-request-form');
        const couponPreForm = modal.querySelector('.coupon-pre-form');
        const requestCodeForm = modal.querySelector('.request-code-form');
        const regyContainer = modal.querySelector('.modal-regy-container');
        
        if (pricingRequestForm) {
          // PLAN modal (Elite/Rise/Starter) - always show pricing request form
          pricingRequestForm.style.display = 'block';
          if (requestCodeForm) requestCodeForm.style.display = 'none';
          if (regyContainer) regyContainer.style.display = 'none';
          
          // Reset pricing request form state
          const pricingForm = pricingRequestForm.querySelector('form');
          const pricingSuccess = modal.querySelector('.pricing-request-success');
          const submitBtn = pricingForm ? pricingForm.querySelector('button[type="submit"]') : null;
          
          if (pricingForm) pricingForm.reset();
          if (pricingSuccess) pricingSuccess.style.display = 'none';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = window.i18n ? window.i18n.t('pricing_request.submit') : 'PEDIR INFORMAÇÃO';
          }
          
          console.log('  ✅ Plan modal initialized with pricing request form visible');
        } else if (couponPreForm) {
          // COUPON modal (Elite/Rise/Starter coupon systems) - show coupon form
          couponPreForm.style.display = 'block';
          if (requestCodeForm) requestCodeForm.style.display = 'none';
          if (regyContainer) regyContainer.style.display = 'none';
          console.log('  ✅ Coupon modal initialized with coupon form visible');
        } else if (regyContainer) {
          // PACK modal (Pack5/Pack10/etc) - show Regyfit directly
          regyContainer.style.display = 'block';
          if (requestCodeForm) requestCodeForm.style.display = 'none';
          console.log('  ✅ Pack modal initialized with Regyfit visible');
        }
        
        // TRIAL modal - reset form state when opening
        if (modalId === 'trial') {
          const trialForm = modal.querySelector('#trial-booking-form');
          const trialSuccessMessage = modal.querySelector('#trial-success-message');
          const trialIntro = modal.querySelector('.trial-intro');
          const submitBtn = trialForm ? trialForm.querySelector('button[type="submit"]') : null;
          
          if (trialForm) {
            trialForm.style.display = 'block';
            trialForm.reset();
          }
          if (trialIntro) trialIntro.style.display = 'block';
          if (trialSuccessMessage) trialSuccessMessage.style.display = 'none';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = window.i18n ? window.i18n.t('trial.form.submit') : 'SOLICITAR AULA';
          }
          console.log('  ✅ Trial modal reset and ready for new submission');
        }
        
        // Setup email validation when modal opens (for trial and request forms)
        if (typeof setupEmailValidation === 'function') {
          setupEmailValidation();
        }
        
        // Ensure iframe is properly sized when modal opens
        const iframe = modal.querySelector('iframe[name^="frame_regy"]');
        if (iframe) {
          console.log('  Found iframe:', iframe.id);
          console.log('  Iframe src:', iframe.src || 'EMPTY');
          console.log('  Iframe height:', iframe.height);
          
          makeIframesDynamic();
          
          // Load Regy script ONLY ONCE globally (not per modal)
          if (typeof window.loadRegyScript === 'function' && !window.regyScriptLoaded) {
            console.log('  🔄 Loading Regy script for the first time...');
            setTimeout(() => {
              window.loadRegyScript();
              
              // Check iframe state after script loads
              setTimeout(() => {
                console.log('  After Regy load - iframe src:', iframe.src || 'EMPTY');
                console.log('  After Regy load - iframe height:', iframe.height);
                
                // Fix: Force minimum height if Regyfit set it to 0
                if (iframe.height === '0px' || iframe.height === '0') {
                  iframe.height = '1000px';
                  iframe.style.minHeight = '1000px';
                  console.log('  ⚠️ Fixed iframe height from 0px to 1000px');
                }
              }, 1000);
            }, 300);
          } else if (window.regyScriptLoaded) {
            console.log('  ✅ Regy script already loaded, skipping reload');
          }
        }
      }
    }

    function closeModal(modalId) {
      const modal = document.getElementById('modal-' + modalId);
      if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Reset do sistema de cupões
        resetCouponForm(modalId);
        
        // Clean up any duplicate iframe content that might have been created
        // BUT DON'T hide the iframes - let them stay ready for next open
        const regyContainer = modal.querySelector('.modal-regy-container');
        if (regyContainer) {
          const iframes = regyContainer.querySelectorAll('iframe[name^="frame_regy"]');
          iframes.forEach(iframe => {
            // DON'T hide iframes - just clean up duplicates if they exist
            // iframe.style.display will be managed by showRegyStep() when needed
            
            // Remove any duplicate form content inside iframes (if Regyfit created duplicates)
            try {
              const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
              if (iframeDoc && iframeDoc.body) {
                // Check for duplicate forms
                const forms = iframeDoc.querySelectorAll('form');
                if (forms.length > 1) {
                  console.warn(`⚠️ Found ${forms.length} forms in iframe ${iframe.id}, keeping only the first one`);
                  // Remove duplicates (keep only the first form)
                  for (let i = 1; i < forms.length; i++) {
                    forms[i].remove();
                  }
                }
              }
            } catch (e) {
              // Cross-origin restrictions - can't access iframe content
              // This is expected for Regyfit iframes
            }
          });
        }
        
        console.log('✅ Modal closed, iframe state preserved:', modalId);
      }
    }
    
    /**
     * Reset coupon form when modal closes
     */
    function resetCouponForm(modalId) {
      // Check if this modal has a coupon system (plan modals only)
      const couponPreForm = document.getElementById(`coupon-pre-form-${modalId}`);
      
      if (!couponPreForm) {
        // This is a PACK modal (no coupon system) - nothing to reset
        console.log(`ℹ️ Pack modal closed (no coupon reset needed): ${modalId}`);
        return;
      }
      
      // This is a PLAN modal - reset coupon system
      
      // Limpar input
      const couponInput = document.getElementById(`coupon-input-${modalId}`);
      if (couponInput) {
        couponInput.value = '';
      }
      
      // Re-habilitar botões
      const validateBtn = document.querySelector(`#coupon-pre-form-${modalId} .coupon-btn--primary`);
      const skipBtn = document.querySelector(`#coupon-pre-form-${modalId} .coupon-btn--secondary`);
      
      if (validateBtn) {
        validateBtn.disabled = false;
      }
      
      if (skipBtn) {
        skipBtn.disabled = false;
      }
      
      // Limpar mensagens
      const messageDiv = document.getElementById(`coupon-message-${modalId}`);
      if (messageDiv) {
        messageDiv.innerHTML = '';
        messageDiv.style.display = 'none';
        messageDiv.className = 'coupon-message'; // Reset classes
      }
      
      // Esconder "Como Funciona"
      const successInfo = document.getElementById(`coupon-success-info-${modalId}`);
      if (successInfo) {
        successInfo.style.display = 'none';
      }
      
      // Reset all forms to default state - show pricing request
      const pricingRequestForm = document.querySelector(`#modal-${modalId} .pricing-request-form`);
      const pricingRequestSuccess = document.querySelector(`#modal-${modalId} .pricing-request-success`);
      const requestCodeForm = document.querySelector(`#modal-${modalId} .request-code-form`);
      const regyContainer = document.querySelector(`#modal-${modalId} .modal-regy-container`);
      
      if (pricingRequestForm) {
        pricingRequestForm.style.display = 'block';
      }
      
      if (pricingRequestSuccess) {
        pricingRequestSuccess.style.display = 'none';
      }
      
      if (couponPreForm) {
        couponPreForm.setAttribute('style', 'display: none !important;');
      }
      
      if (requestCodeForm) {
        requestCodeForm.style.display = 'none';
      }
      
      if (regyContainer) {
        regyContainer.style.display = 'none';
      }
      
      // Limpar sessionStorage coupon data
      if (typeof window.CouponSystem !== 'undefined') {
        window.CouponSystem.clearSession();
      }
      
      console.log(`✅ Modal reset para estado inicial: ${modalId}`);
    }
    
    // Attach event listeners to pricing buttons
    const buttons = document.querySelectorAll('[data-modal]');
    buttons.forEach(function(btn) {
      const modalId = btn.getAttribute('data-modal');
      
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(modalId);
      });
    });
    
    // Close button functionality
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-close');
        closeModal(modalId);
      });
    });
    
    // Close on overlay click
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(function(overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === this) {
          const modalId = this.id.replace('modal-', '');
          closeModal(modalId);
        }
      });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
          const modalId = activeModal.id.replace('modal-', '');
          closeModal(modalId);
        }
      }
    });
    
    // Make functions globally available
    window.openModal = openModal;
    window.closeModal = closeModal;
    
    // Re-apply dynamic sizing when window resizes
    window.addEventListener('resize', function() {
      makeIframesDynamic();
    });
    
  }, 750);
}); 