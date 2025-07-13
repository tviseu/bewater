// Pricing Modals Functionality - Simple Version with Dynamic Sizing
document.addEventListener('DOMContentLoaded', function() {
  
  // Function to make iframes responsive and dynamic
  function makeIframesDynamic() {
    const allIframes = document.querySelectorAll('iframe[name^="frame_regy"]');
    
    allIframes.forEach(function(iframe) {
      // Set initial responsive styles
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
          if (iframeDoc) {
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
    });
  }
  
  // Apply dynamic sizing
  makeIframesDynamic();
  
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
          makeIframesDynamic();
        }
      }
    }

    function closeModal(modalId) {
      const modal = document.getElementById('modal-' + modalId);
      if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
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
    
  }, 500);
}); 