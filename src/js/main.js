// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu element
  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('mobile-menu');
  
  // Copy nav links to mobile menu
  const navLinks = document.querySelector('.header__nav ul').cloneNode(true);
  mobileMenu.appendChild(navLinks);
  
  // Add mobile menu to body
  document.body.appendChild(mobileMenu);
  
  // Menu toggle functionality
  const menuToggle = document.querySelector('.header__menu-toggle');
  
  // Add multiple event listeners for better compatibility
  menuToggle.addEventListener('click', handleMenuToggle);
  menuToggle.addEventListener('touchstart', handleMenuToggle);
  
  function handleMenuToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Hamburger menu clicked!'); // Debug log
    
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
    
    if (mobileMenu.classList.contains('active')) {
      console.log('Opening menu, transforming to X'); // Debug log
      // When menu is open, transform spans into X
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[0].style.top = '16px';
      spans[0].style.width = '25px';
      spans[0].style.height = '4px';
      spans[1].style.opacity = '0';
      spans[1].style.transform = 'scale(0)';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      spans[2].style.top = '16px';
      spans[2].style.width = '25px';
      spans[2].style.height = '4px';
    } else {
      console.log('Closing menu, transforming to hamburger'); // Debug log
      // Reset to hamburger icon
      spans[0].style.transform = 'none';
      spans[0].style.top = '8px';
      spans[0].style.width = '100%';
      spans[0].style.height = '3px';
      spans[1].style.opacity = '1';
      spans[1].style.transform = 'none';
      spans[2].style.transform = 'none';
      spans[2].style.top = '22px';
      spans[2].style.width = '100%';
      spans[2].style.height = '3px';
    }
  }
  
  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('Menu link clicked, closing menu'); // Debug log
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Reset hamburger icon
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[0].style.top = '8px';
      spans[0].style.width = '100%';
      spans[0].style.height = '3px';
      spans[1].style.opacity = '1';
      spans[1].style.transform = 'none';
      spans[2].style.transform = 'none';
      spans[2].style.top = '22px';
      spans[2].style.width = '100%';
      spans[2].style.height = '3px';
    });
  });
});

// Pillars Carousel - REMOVED
// (Carousel functionality removed as the HTML carousel section was removed)

// Brutalist Cursor Effect
function createBrutalistCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('brutalist-cursor');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background-color: var(--color-primary);
    border: 3px solid var(--color-black);
    border-radius: 0;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s;
    display: none;
  `;
  
  document.body.appendChild(cursor);
  
  // Only show custom cursor on desktop
  if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    // Scale up cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, .class-card, .trainer-card, .price-card');
    
    clickables.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.mixBlendMode = 'difference';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.mixBlendMode = 'normal';
      });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    clickables.forEach(element => {
      element.style.cursor = 'none';
    });
  }
}

// Uncomment to enable brutalist cursor
// createBrutalistCursor();

// Glitch effect on hover for hero title
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero__title');
  
  if (heroTitle) {
    let originalText = heroTitle.innerHTML;
    
    heroTitle.addEventListener('mouseenter', function() {
      let i = 0;
      const glitchInterval = setInterval(function() {
        heroTitle.innerHTML = glitchText(originalText);
        i++;
        if (i > 5) {
          clearInterval(glitchInterval);
          heroTitle.innerHTML = originalText;
        }
      }, 100);
    });
    
    function glitchText(text) {
      return text.split('').map(char => {
        if (char === ' ' || char === '<' || char === '>' || char === 'b' || char === 'r') {
          return char; // Preserve spaces and HTML
        }
        return Math.random() > 0.7 ? getRandomChar() : char;
      }).join('');
    }
    
    function getRandomChar() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
      return chars[Math.floor(Math.random() * chars.length)];
    }
  }
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.about__stat, .class-card, .trainer-card, .price-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
});

// Newsletter Form Handler - More Aggressive Approach
// Run this immediately, not waiting for DOMContentLoaded
(function() {
  let newsletterHandlerAdded = false;
  
  function setupNewsletterHandler() {
    if (newsletterHandlerAdded) return;
    
    const newsletterForm = document.querySelector('.footer__newsletter-form');
    if (!newsletterForm) {
      setTimeout(setupNewsletterHandler, 100);
      return;
    }
    
    newsletterHandlerAdded = true;
    
    // Remove any existing action attribute to prevent default form submission
    const originalAction = newsletterForm.getAttribute('action');
    newsletterForm.removeAttribute('action');
    
    // Add multiple event listeners to catch any submission attempt
    newsletterForm.addEventListener('submit', handleNewsletterSubmit, true); // Use capture
    newsletterForm.addEventListener('submit', handleNewsletterSubmit, false); // Use bubble
    
    // Also handle button click directly
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        handleNewsletterSubmit(e);
      });
    }
    
    // Handle Enter key on input
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput) {
      emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleNewsletterSubmit(e);
        }
      });
    }
    
    async function handleNewsletterSubmit(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      
      if (!emailInput || !submitBtn) {
        console.error('Newsletter form elements not found');
        return false;
      }
      
      const email = emailInput.value.trim();
      const originalText = submitBtn.textContent;
      
      // Validate email
      if (!validateEmailNewsletter(email)) {
        showNewsletterErrorNew('EMAIL INVÁLIDO!');
        return false;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'A SUBSCREVER...';
      
      try {
        // Create JSON data manually
        const data = {
          email: email,
          _email: {
            subject: 'Nova subscrição newsletter BE WATER'
          }
        };
        
        const response = await fetch(originalAction, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Success - show thank you message
          newsletterForm.innerHTML = `
            <div class="newsletter-success">
              <strong>✅ SUBSCRITO COM SUCESSO!</strong>
              <br>
              <small>Obrigado pelo interesse.</small>
            </div>
          `;
          
          const successDiv = newsletterForm.querySelector('.newsletter-success');
          successDiv.style.cssText = `
            background-color: var(--color-primary);
            color: var(--color-white);
            padding: 1rem;
            border: 2px solid var(--color-black);
            text-align: center;
            font-family: var(--font-heading);
            font-weight: 700;
            text-transform: uppercase;
            box-shadow: 4px 4px 0 var(--color-black);
          `;
          
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        // Error - restore form and show error
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        showNewsletterErrorNew('ERRO NO ENVIO. TENTA NOVAMENTE.');
      }
      
      return false;
    }
    
    function showNewsletterErrorNew(message) {
      // Remove existing errors
      const existingErrors = newsletterForm.querySelectorAll('.newsletter-error');
      existingErrors.forEach(error => error.remove());
      
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('newsletter-error');
      errorDiv.textContent = message;
      errorDiv.style.cssText = `
        background-color: var(--color-black);
        color: var(--color-white);
        padding: 0.5rem;
        margin-top: 0.5rem;
        font-weight: 700;
        border: 2px solid #ff0000;
        text-align: center;
        font-size: 0.9rem;
      `;
      
      newsletterForm.appendChild(errorDiv);
      
      setTimeout(() => {
        errorDiv.remove();
      }, 5000);
    }
    
    function validateEmailNewsletter(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
  
  // Try to setup immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNewsletterHandler);
  } else {
    setupNewsletterHandler();
  }
})();

// Form validation with brutalist error messages
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact__form');
  
  if (contactForm && !contactForm.hasAttribute('data-handler-added')) {
    contactForm.setAttribute('data-handler-added', 'true');
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault(); // Always prevent default - we handle submission via AJAX
      
      // Remove any existing error messages
      const existingErrors = contactForm.querySelectorAll('.form-error');
      existingErrors.forEach(error => error.remove());
      
      // Get form fields
      const nameField = contactForm.querySelector('#name');
      const emailField = contactForm.querySelector('#email');
      const messageField = contactForm.querySelector('#message');
      
      let valid = true;
      
      // Validate name
      if (!nameField.value.trim()) {
        showBrutalistError(nameField, 'NOME OBRIGATÓRIO. NÃO EXCUSES.');
        valid = false;
      }
      
      // Validate email
      if (!validateEmail(emailField.value)) {
        showBrutalistError(emailField, 'EMAIL REAL NECESSÁRIO. AGORA.');
        valid = false;
      }
      
      // Validate message
      if (!messageField.value.trim()) {
        showBrutalistError(messageField, 'MENSAGEM VAZIA? SERIAMENTE?');
        valid = false;
      }
      
      if (!valid) {
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'A ENVIAR...';
      
      try {
        // Send form data to Formspark via JSON
        const data = {
          name: nameField.value,
          email: emailField.value,
          phone: contactForm.querySelector('#phone').value,
          message: messageField.value,
          _email: {
            subject: 'Nova mensagem BE WATER'
          }
        };

        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Success - show thank you message
          contactForm.innerHTML = `
            <div class="form-success">
              <h3>MENSAGEM RECEBIDA!</h3>
              <p>Obrigado pelo teu contacto. A nossa equipa irá responder-te brevemente.</p>
              <p><strong>BE WATER, MY FRIEND.</strong></p>
            </div>
          `;
          
          const formSuccess = contactForm.querySelector('.form-success');
          formSuccess.style.cssText = `
            padding: 3rem;
            border: 4px solid var(--color-black);
            background-color: var(--color-primary);
            color: var(--color-white);
            text-align: center;
            box-shadow: 8px 8px 0 var(--color-black);
            font-family: var(--font-heading);
            text-transform: uppercase;
          `;
          
          formSuccess.querySelector('h3').style.cssText = `
            font-size: 2rem;
            margin-bottom: 1rem;
            font-weight: 900;
          `;
          
          formSuccess.querySelector('p').style.cssText = `
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1rem;
          `;
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        // Error - restore form and show error
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('form-error');
        errorDiv.textContent = 'ERRO NO ENVIO. TENTA NOVAMENTE.';
        errorDiv.style.cssText = `
          background-color: var(--color-black);
          color: var(--color-white);
          padding: 1rem;
          margin-top: 1rem;
          font-weight: 700;
          border: 2px solid #ff0000;
          text-align: center;
          transform: rotate(-1deg);
        `;
        
        contactForm.appendChild(errorDiv);
        
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
    });
  }
});

// Store functionality
const products = {
  1: { id: 1, name: 'BE WATER Training Gloves', price: 49.99 },
  2: { id: 2, name: 'BE WATER Performance Shirt', price: 29.99 },
  3: { id: 3, name: 'BE WATER Gym Bag', price: 39.99 }
};



// Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
}

// Payment functionality
let stripe;
let elements;
let card;

async function initializeStripe() {
  stripe = Stripe('your_publishable_key'); // Replace with your Stripe publishable key
  elements = stripe.elements();
  card = elements.create('card');
  card.mount('#card-element');
}

async function handleCardPayment(amount) {
  try {
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      }
    });

    if (error) {
      document.getElementById('card-errors').textContent = error.message;
    } else if (paymentIntent.status === 'succeeded') {
      handlePaymentSuccess();
    }
  } catch (error) {
    console.error('Payment failed:', error);
  }
}

async function handleMBWayPayment() {
  const phoneNumber = document.getElementById('phone-number').value;
  
  try {
    // Here you would integrate with your backend to handle MBWay payment
    const response = await fetch('/api/create-mbway-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        amount: 0
      })
    });

    const result = await response.json();
    
    if (result.success) {
      handlePaymentSuccess();
    } else {
      document.getElementById('mbway-errors').textContent = result.error;
    }
  } catch (error) {
    console.error('MBWay payment failed:', error);
  }
}

function handlePaymentSuccess() {
  alert('Pagamento realizado com sucesso! Obrigado pela tua compra.');
  closeModal('payment-modal');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Close buttons
  document.querySelectorAll('.modal__close').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal.id);
    });
  });
  //   }
  // });
});

// Gallery functionality
class BrutalistGallery {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    
    this.track = document.getElementById('galleryTrack');
    this.prevBtn = document.getElementById('galleryPrev');
    this.nextBtn = document.getElementById('galleryNext');
    this.caption = document.getElementById('galleryCaption');
    
    if (this.track && this.prevBtn && this.nextBtn && this.caption) {
      this.init();
    } else {
      console.error('Gallery: Missing DOM elements');
    }
  }
  
  async init() {
    try {
      await this.loadImages();
      this.setupEventListeners();
      this.addTouchSupport();
      this.updateDisplay();
      this.addLanguageListener();
    } catch (error) {
      console.error('Gallery initialization failed:', error);
      this.showPlaceholder();
    }
  }
  
  async loadImages() {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    this.images = [];
    
    // List of all gallery images that exist (based on current folder contents)
    const galleryNumbers = [3, 4, 5, 6, 7, 9, 11, 12, 13, 14];
    
    // Load each available gallery image
    for (const num of galleryNumbers) {
      let foundImage = false;
      
      // 1. Tentar versão otimizada WebP primeiro (Melhor performance)
      const optimizedWebP = `src/images/gallery/gallery${num}_optimized.webp`;
      const optimizedExists = await this.checkImageExists(optimizedWebP);
      
      if (optimizedExists) {
        this.images.push(optimizedWebP);
        continue;
      }
      
      // 2. Tentar outras extensões se não encontrar a otimizada
      for (const ext of imageExtensions) {
        const imagePath = `src/images/gallery/gallery${num}.${ext}`;
        const exists = await this.checkImageExists(imagePath);
        
        if (exists) {
          this.images.push(imagePath);
          foundImage = true;
          break; // Found this number, move to next
        }
      }
    }
    
    // If no images found, use fallback images
    if (this.images.length === 0) {
      const fallbackImages = [
              'src/images/general/images-optimized/d88af4ef-e380-4b56-96c2-71197a7a6f72_optimized.png',
      'src/images/general/images-optimized/7b76cb8d-f94f-46be-be70-b470f40b6856_optimized.png',
      'src/images/general/images-optimized/7c18eef0-2694-4241-aadd-2e9fa2d0d8ae_optimized.png',
      'src/images/general/images-optimized/ccd81ca1-257a-4edf-b66c-ce2498a30dfa_optimized.png'
      ];
      
      // Test fallback images
      for (const fallback of fallbackImages) {
        const exists = await this.checkImageExists(fallback);
        if (exists) {
          this.images.push(fallback);
        }
      }
    }
    
    this.createImageElements();
  }
  
  async checkImageExists(imagePath) {
    return new Promise((resolve) => {
      const img = new Image();
      
      const timeout = setTimeout(() => {
        resolve(false);
      }, 2000);
      
      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
      
      img.src = imagePath;
    });
  }
  
  createImageElements() {
    this.track.innerHTML = '';
    
    if (this.images.length === 0) {
      return;
    }
    
    this.images.forEach((imageSrc, index) => {
      const item = document.createElement('div');
      item.className = 'gallery__item';
      
      const img = document.createElement('img');
      img.className = 'gallery__image';
      img.src = imageSrc;
      img.alt = `Gallery Image ${index + 1}`;
      img.loading = 'lazy';
      
      // Add error handling for individual images
      img.onerror = () => {
        img.style.display = 'none';
        item.innerHTML = `
          <div style="
            width: 100%; 
            height: 500px; 
            background: var(--color-black); 
            color: var(--color-white); 
            display: flex; 
            flex-direction: column;
            align-items: center; 
            justify-content: center; 
            font-family: var(--font-heading);
            font-size: 1.5rem;
            font-weight: 900;
            text-transform: uppercase;
            text-align: center;
            padding: 2rem;
          ">
            <div>❌ IMAGEM NÃO ENCONTRADA</div>
            <div style="font-size: 1rem; margin-top: 1rem; color: #FFD700;">
              ${imageSrc}
            </div>
            <div style="font-size: 0.8rem; margin-top: 1rem; color: #666;">
              Verifique se o ficheiro existe
            </div>
          </div>
        `;
      };
      
      item.appendChild(img);
      this.track.appendChild(item);
    });
  }
  
  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => this.prevImage());
    this.nextBtn.addEventListener('click', () => this.nextImage());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });
  }
  
  addTouchSupport() {
    let startX = 0;
    let isDragging = false;
    
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
    
    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
    
    this.track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          this.nextImage();
        } else {
          this.prevImage();
        }
      }
      
      isDragging = false;
    });
  }
  
  prevImage() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.updateDisplay();
  }
  
  nextImage() {
    this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.updateDisplay();
  }
  
  addLanguageListener() {
    // Listen for language changes
    window.addEventListener('languageChanged', () => {
      this.updateDisplay();
    });
  }
  
  updateDisplay() {
    const translateX = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update caption using the translation system
    const captionKey = `salgueiro.gallery.caption.${this.currentIndex + 1}`;
    const captionText = window.i18n ? window.i18n.t(captionKey) : `Caption ${this.currentIndex + 1}`;
    
    this.caption.textContent = captionText;
    
    // Add animation to caption
    this.caption.style.opacity = '0';
    setTimeout(() => {
      this.caption.style.opacity = '1';
    }, 150);
  }
  
  showPlaceholder() {
    this.track.innerHTML = `
      <div class="gallery__item">
        <div style="
          width: 100%; 
          height: 500px; 
          background: var(--color-accent); 
          color: var(--color-black); 
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center; 
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
          text-transform: uppercase;
          border: 4px solid var(--color-black);
          text-align: center;
          padding: 2rem;
        ">
          <div>GALERIA EM CONSTRUÇÃO</div>
          <div style="font-size: 1rem; margin-top: 1rem;">
            Adicione imagens à pasta /gallery
          </div>
        </div>
      </div>
    `;
    
    // Use translation system if available
    const placeholderCaption = window.i18n ? window.i18n.t('salgueiro.gallery.caption.1') : 'AGUARDE POR CONTEÚDO ÉPICO';
    this.caption.textContent = placeholderCaption;
    this.prevBtn.style.display = 'none';
    this.nextBtn.style.display = 'none';
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  new BrutalistGallery();
});

// Enhanced Brutalist Form Validation 
function showBrutalistError(field, message) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('form-error');
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    background-color: var(--color-black);
    color: var(--color-white);
    padding: 0.5rem;
    margin-top: 0.5rem;
    font-weight: 700;
    border: 2px solid var(--color-primary);
    transform: rotate(-1deg);
  `;
  
  field.parentNode.appendChild(errorDiv);
  
  // Shake the field
  field.style.transform = 'translateX(0)';
  let shake = 0;
  const shakeInterval = setInterval(() => {
    field.style.transform = `translateX(${shake % 2 === 0 ? -5 : 5}px)`;
    shake++;
    if (shake > 5) {
      clearInterval(shakeInterval);
      field.style.transform = 'translateX(0)';
    }
  }, 50);
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
} 

// Corner Badge functionality removed - feature not implemented

// Active Navigation State Management
document.addEventListener('DOMContentLoaded', function() {
  // Wait for mobile menu to be created
  setTimeout(() => {
    const desktopNavLinks = document.querySelectorAll('.header__nav a[href^="#"]');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
  
  if (!sections.length) {
    console.log('No sections found for navigation highlighting');
    return;
  }
  
  console.log('Found sections:', Array.from(sections).map(s => s.id));
  console.log('Found desktop nav links:', Array.from(desktopNavLinks).map(l => l.getAttribute('href')));
  console.log('Found mobile nav links:', Array.from(mobileNavLinks).map(l => l.getAttribute('href')));
  

  
  // Function to update active navigation link
  function updateActiveNav(activeSectionId) {
    console.log('Updating navigation for section:', activeSectionId);
    
    // Update desktop navigation
    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (activeSectionId && link.getAttribute('href') === `#${activeSectionId}`) {
        link.classList.add('active');
        console.log('Added active class to desktop link:', link.getAttribute('href'));
      }
    });
    
    // Update mobile navigation - but keep PREÇOS yellow and just add underline
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (activeSectionId && link.getAttribute('href') === `#${activeSectionId}`) {
        link.classList.add('active');
        console.log('Added active class to mobile link:', link.getAttribute('href'));
        

      }
    });
  }

  // Don't automatically set any section as active - let the detection system work naturally
  
  // Use Intersection Observer for more accurate detection
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -60% 0px', // Only trigger when section is prominently in view
    threshold: 0
  };
  
  let currentActiveSection = '';
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId !== currentActiveSection) {
          currentActiveSection = sectionId;
          updateActiveNav(sectionId);
        }
      }
    });
    
    // If no sections are prominently visible, check if we're in HERO
    const hasVisibleSection = entries.some(entry => entry.isIntersecting);
    if (!hasVisibleSection || window.scrollY < window.innerHeight * 0.3) {
      if (currentActiveSection !== null) {
        currentActiveSection = null;
        updateActiveNav(null);
      }
    }
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Fallback: manual detection for edge cases
  function getCurrentSectionFallback() {
    const headerHeight = document.querySelector('.header').offsetHeight || 120;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // If at the very top of the page (in HERO section), return null - no nav should be active
    if (scrollY < viewportHeight * 0.3) {
      return null; // No section should be active when in HERO
    }
    
    // Find the section that's most prominently visible
    const viewportMiddle = scrollY + viewportHeight / 2;
    let activeSection = null;
    let minDistance = Infinity;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      // Check if section is visible
      if (sectionBottom > scrollY && sectionTop < scrollY + viewportHeight) {
        const sectionMiddle = sectionTop + (section.offsetHeight / 2);
        const distance = Math.abs(viewportMiddle - sectionMiddle);
        
        if (distance < minDistance) {
          minDistance = distance;
          activeSection = section.id;
        }
      }
    });
    
    return activeSection;
  }
  
  // Initialize on load with fallback method
  setTimeout(() => {
    const initialSection = getCurrentSectionFallback();
    updateActiveNav(initialSection);
  }, 100);

  // Additional initialization after all content is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      const initialSection = getCurrentSectionFallback();
      updateActiveNav(initialSection);
    }, 200);
  });

  // Also update on first scroll to ensure proper detection
  let hasScrolled = false;
  window.addEventListener('scroll', () => {
    if (!hasScrolled) {
      hasScrolled = true;
      setTimeout(() => {
        const currentSection = getCurrentSectionFallback();
        updateActiveNav(currentSection);
      }, 50);
    }
  }, { once: true });
  
  console.log(`Active navigation initialized with ${sections.length} sections and ${desktopNavLinks.length + mobileNavLinks.length} nav links`);
  
  }, 500); // Wait for mobile menu creation
});

// Schedule Activity Click to Scroll to Legend
document.addEventListener('DOMContentLoaded', function() {
  const activities = document.querySelectorAll('.activity');
  const legend = document.querySelector('.schedule__legend');
  
  if (!legend) {
    console.log('Schedule legend not found');
    return;
  }
  
  if (!activities.length) {
    console.log('No schedule activities found');
    return;
  }
  
  function scrollToLegend() {
    const headerHeight = document.querySelector('.header').offsetHeight || 120;
    const legendPosition = legend.offsetTop - headerHeight - 20; // 20px extra padding
    
    window.scrollTo({
      top: legendPosition,
      behavior: 'smooth'
    });
    
    // Add a subtle highlight effect to the legend
    legend.style.transition = 'box-shadow 0.3s ease';
    legend.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
    
    setTimeout(() => {
      legend.style.boxShadow = 'none';
    }, 2000);
  }
  
  // Add click event listeners to all activities
  activities.forEach(activity => {
    activity.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Activity clicked, scrolling to legend');
      scrollToLegend();
    });
    
    // Make activities appear clickable
    activity.style.cursor = 'pointer';
  });
  
  console.log(`Added click handlers to ${activities.length} schedule activities`);
});

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqNumber = this.dataset.faq;
            const answer = document.querySelector(`[data-faq-answer="${faqNumber}"]`);
            const icon = this.querySelector('.faq-icon');
            
            // Close other open answers
            document.querySelectorAll('.faq-answer.active').forEach(openAnswer => {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove('active');
                    const otherIcon = openAnswer.previousElementSibling.querySelector('.faq-icon');
                    otherIcon.classList.remove('rotated');
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            icon.classList.toggle('rotated');
        });
    });
});
// Mobile Schedule Tabs Logic
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.schedule__tab-btn');
  const days = document.querySelectorAll('.schedule__day');
  
  if (!tabs.length || !days.length) return;

  function activateDay(index) {
    // Deactivate all
    tabs.forEach(tab => tab.classList.remove('active'));
    days.forEach(day => day.classList.remove('active'));
    
    // Activate specific
    if (tabs[index]) tabs[index].classList.add('active');
    if (days[index]) days[index].classList.add('active');
  }

  // Add click listeners
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-day'));
      activateDay(index);
    });
  });

  // Set initial day based on current day of week
  // 0=Sun, 1=Mon, ..., 6=Sat
  const today = new Date().getDay();
  
  // Map JS Day (0-6 Sun-Sat) to our Index (0-6 Mon-Sun)
  // JS: Sun(0), Mon(1), Tue(2), Wed(3), Thu(4), Fri(5), Sat(6)
  // My Tabs: Mon(0), Tue(1), Wed(2), Thu(3), Fri(4), Sat(5), Sun(6)
  
  let initialIndex;
  if (today === 0) { // Sunday
    initialIndex = 6;
  } else {
    initialIndex = today - 1;
  }

  // Activate today
  activateDay(initialIndex);
});

