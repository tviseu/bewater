// Pricing Modals Functionality
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    // Modal functions
    function openModal(modalId) {
      const modal = document.getElementById('modal-' + modalId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Lazy load Regy iframe with placeholder
        const iframe = modal.querySelector('iframe');
        const input = modal.querySelector('input.class_regy');
        const placeholder = modal.querySelector('.iframe-placeholder');
        
        if (iframe && input && input.value && !iframe.src) {
          // Show placeholder initially
          if (placeholder) {
            placeholder.style.display = 'flex';
          }
          iframe.style.display = 'none';
          
          // Load Regy script first (if available)
          if (window.loadRegyScript) {
            window.loadRegyScript();
          }
          
          // Load iframe
          iframe.src = input.value;
          
          // Hide placeholder and show iframe when loaded
          iframe.onload = function() {
            if (placeholder) {
              placeholder.style.display = 'none';
            }
            iframe.style.display = 'block';
          };
          
          // Fallback timeout in case onload doesn't fire
          setTimeout(function() {
            if (placeholder) {
              placeholder.style.display = 'none';
            }
            iframe.style.display = 'block';
          }, 3000);
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
    
  }, 500); // Small delay to ensure DOM is ready
}); 