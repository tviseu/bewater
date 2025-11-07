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
    // Modal functions
    function openModal(modalId) {
      const modal = document.getElementById('modal-' + modalId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        console.log('Modal opened:', modalId);
        
        // Ensure iframe is properly sized when modal opens
        const iframe = modal.querySelector('iframe[name^="frame_regy"]');
        if (iframe) {
          console.log('  Found iframe:', iframe.id);
          console.log('  Iframe src:', iframe.src || 'EMPTY');
          console.log('  Iframe height:', iframe.height);
          
          makeIframesDynamic();
          
          // Load Regy script when modal with iframe opens (only once)
          if (typeof window.loadRegyScript === 'function') {
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
        
        // DON'T clear iframe - let Regyfit keep its state
        // The Regyfit script manages the iframes and clearing them breaks functionality
        console.log('✅ Modal closed, iframe state preserved:', modalId);
      }
    }
    
    /**
     * Reset coupon form when modal closes
     */
    function resetCouponForm(modalId) {
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
      
      // Mostrar pré-form e esconder REGYFIT
      const couponPreForm = document.getElementById(`coupon-pre-form-${modalId}`);
      const regyContainer = document.querySelector(`#modal-${modalId} .modal-regy-container`);
      
      if (couponPreForm) {
        couponPreForm.style.display = 'block';
      }
      
      if (regyContainer) {
        regyContainer.style.display = 'none';
      }
      
      // Limpar sessionStorage
      if (typeof window.CouponSystem !== 'undefined') {
        window.CouponSystem.clearSession();
      }
      
      console.log(`✅ Cupão reset para modal: ${modalId}`);
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