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
      
      // SKIP iframes that are explicitly hidden (position: absolute means hidden)
      if (iframe.style.position === 'absolute' || iframe.style.visibility === 'hidden') {
        console.log('  ⏭️ Skipping hidden iframe:', iframe.id);
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
        
        // FORCE SCROLL TO TOP (Fix for Drop-in scroll issue)
        // 1. Reset scroll immediately
        modal.scrollTop = 0;
        const container = modal.querySelector('.modal-container');
        if (container) container.scrollTop = 0;
        const content = modal.querySelector('.modal-content');
        if (content) content.scrollTop = 0;

        // 2. Force Focus on Close Button (Prevents iframe from stealing focus/scroll)
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
          setTimeout(() => {
            closeBtn.focus({ preventScroll: true });
          }, 10);
        }
        
        // 3. "Scroll Police" - Force top scroll repeatedly during iframe load
        const scrollPoliceman = setInterval(() => {
            if (modal.scrollTop > 0) modal.scrollTop = 0;
            if (container && container.scrollTop > 0) container.scrollTop = 0;
            if (content && content.scrollTop > 0) content.scrollTop = 0;
        }, 50);

        // Stop policing after 1 second (enough time for Regyfit to load)
        setTimeout(() => {
            clearInterval(scrollPoliceman);
        }, 1000);
        
        console.log('Modal opened:', modalId);
        
        // Check if this is a PLAN modal, PACK modal, or COUPON modal
        const couponPreForm = modal.querySelector('.coupon-pre-form');
        const regyContainer = modal.querySelector('.modal-regy-container');
        
        if (couponPreForm) {
          // COUPON modal (Elite/Rise/Starter coupon systems) - show coupon form
          // Ensure any previous styles are cleared
          couponPreForm.removeAttribute('style');
          couponPreForm.style.display = 'block';
          
          if (regyContainer) {
             regyContainer.style.setProperty('display', 'none', 'important');
             
             // Double check: hide all iframes inside to prevent them from showing up
             const childIframes = regyContainer.querySelectorAll('iframe');
             childIframes.forEach(f => {
                f.style.setProperty('display', 'none', 'important');
                f.style.setProperty('visibility', 'hidden', 'important');
             });
          }
          console.log('  ✅ Coupon modal initialized with coupon form visible');
        } else if (regyContainer) {
          // PLAN or PACK modal - show Regyfit directly (pricing-request-form is now hidden by default)
          regyContainer.style.display = 'block';
          regyContainer.style.visibility = 'visible';
          regyContainer.style.opacity = '1';
          
          // Force all iframes inside to be visible AND load content
          const iframes = regyContainer.querySelectorAll('iframe[name^="frame_regy"]');
          iframes.forEach(iframe => {
            iframe.style.display = 'block';
            iframe.style.visibility = 'visible';
            iframe.style.opacity = '1';
            iframe.style.minHeight = '1400px';
            iframe.style.height = '1400px';
            
            // If iframe doesn't have src, load it immediately
            if (!iframe.src || iframe.src === '' || iframe.src === 'about:blank') {
              const inputId = iframe.id.replace('frame_', 'src_');
              const input = document.getElementById(inputId);
              if (input && input.value) {
                const url = input.value;
                const lang = document.documentElement.lang || 'pt';
                const fullUrl = `${url}&lang=${lang}&site_url=${encodeURIComponent(window.location.href)}`;
                iframe.src = fullUrl;
                console.log('  🚀 Immediately loaded iframe:', iframe.id, fullUrl);
              }
            }
            
            console.log('  🔧 Forced iframe visible:', iframe.id, 'src:', iframe.src || 'EMPTY');
          });
          
          // Ensure purchase instructions are visible
          const instructions = modal.querySelector('.modal-purchase-instructions');
          if (instructions) {
            instructions.style.display = 'block';
            console.log('  ✅ Purchase instructions visible');
          }
          
          console.log('  ✅ Modal initialized with Regyfit visible');
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
        const isCouponMode = couponPreForm && couponPreForm.style.display !== 'none';
        
        if (iframe) {
          console.log('  Found iframe:', iframe.id);
          console.log('  Iframe src:', iframe.src || 'EMPTY');
          
          // Only force visibility if NOT in coupon mode
          if (!isCouponMode) {
             iframe.style.display = 'block';
             iframe.style.visibility = 'visible';
          } else {
             // Force hide if in coupon mode
             iframe.style.setProperty('display', 'none', 'important');
             iframe.style.setProperty('visibility', 'hidden', 'important');
          }
          
          iframe.style.minHeight = '0px';
          iframe.style.width = '100%';
          
          makeIframesDynamic();
          
          // Load Regy script ONLY ONCE globally (not per modal)
          if (typeof window.loadRegyScript === 'function' && !window.regyScriptLoaded) {
            console.log('  🔄 Loading Regy script for the first time...');
            setTimeout(() => {
              window.loadRegyScript();
              
              // Check iframe state after script loads
              setTimeout(() => {
                // Fix: Force minimum height if Regyfit set it to 0
                if (iframe.height === '0px' || iframe.height === '0') {
                  iframe.height = '1000px';
                  iframe.style.minHeight = '1000px';
                }
              }, 1000);
            }, 300);
          } else if (window.regyScriptLoaded) {
            console.log('  ✅ Regy script already loaded, checking if iframe needs initialization...');
            
            // Check if iframe has content loaded
            setTimeout(() => {
              console.log('  🔍 Checking iframe state after modal open...');
              
              let hasContent = false;
              try {
                hasContent = iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.children.length > 0;
              } catch(e) {
                // Cross-origin, check if src is set
                hasContent = iframe.src && iframe.src.length > 0;
              }
              
              // If iframe doesn't have content, manually trigger Regyfit to load it
              if (!hasContent || !iframe.src) {
                console.log('  ⚠️ Iframe empty, manually loading Regyfit content...');
                
                // Find the corresponding input
                const inputId = iframe.id.replace('frame_', 'src_');
                const input = document.getElementById(inputId);
                
                if (input && input.value) {
                  // Manually set iframe src from input value
                  const url = input.value;
                  const lang = document.documentElement.lang || 'pt';
                  const fullUrl = `${url}&lang=${lang}&site_url=${encodeURIComponent(window.location.href)}`;
                  
                  iframe.src = fullUrl;
                  console.log('  ✅ Manually set iframe src:', fullUrl);
                }
              }
              
              // Force visibility ONLY if not in coupon mode
              if (!isCouponMode) {
                iframe.style.display = 'block';
                iframe.style.visibility = 'visible';
              }
            }, 500);
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
      
      // Reset all forms to default state - show Regyfit (pricing-request-form is now hidden by default)
      const requestCodeForm = document.querySelector(`#modal-${modalId} .request-code-form`);
      const regyContainer = document.querySelector(`#modal-${modalId} .modal-regy-container`);
      
      if (couponPreForm) {
        couponPreForm.style.display = 'none';
      }
      
      if (requestCodeForm) {
        requestCodeForm.style.display = 'none';
      }
      
      if (regyContainer) {
        regyContainer.style.display = 'block';
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
    
    // Sticky Trial Buttons - Manual Event Listener (Mobile Fix)
    const stickyButtons = document.querySelectorAll('.btn-sticky-trial');
    stickyButtons.forEach(btn => {
      // Clone button to remove inline onclick if needed, or just add listener
      btn.addEventListener('click', function(e) {
        // Don't prevent default immediately to let inline onclick work if valid
        // But we'll add our own logic as backup
        console.log('🎯 Sticky Trial Button Clicked (JS Listener)');
        
        // If inline onclick fails, this logic will run
        // Find parent modal ID from overlay
        const modalOverlay = btn.closest('.modal-overlay');
        if (modalOverlay) {
           const modalId = modalOverlay.id.replace('modal-', '');
           console.log('  Closing modal from JS listener:', modalId);
           
           // Close current
           closeModal(modalId);
           
           // Open trial
           setTimeout(() => {
             openModal('trial');
           }, 300);
        }
      });
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