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

// Pillars Carousel
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('pillarsTrack');
  const prevBtn = document.getElementById('pillarsPrev');
  const nextBtn = document.getElementById('pillarsNext');
  const indicators = document.querySelectorAll('.indicator');
  const slides = document.querySelectorAll('.carousel-slide');
  
  console.log('Carousel initialization:', {
    track: !!track,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn,
    indicators: indicators.length,
    slides: slides.length
  });
  
  if (!track || !prevBtn || !nextBtn || slides.length === 0) {
    console.error('Carousel elements not found or no slides available');
    return;
  }
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  function updateCarousel() {
    console.log(`Moving to slide ${currentSlide + 1} of ${totalSlides}`);
    
    // Move track - cada slide tem 25% de largura
    const translateX = -currentSlide * 25; // 25% por slide
    track.style.transform = `translateX(${translateX}%)`;
    
    console.log(`Applied transform: translateX(${translateX}%)`);
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Update active slide class (opcional para styling adicional)
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    console.log(`Updated indicators and slides for slide ${currentSlide}`);
  }
  
  function nextSlide() {
    const previousSlide = currentSlide;
    currentSlide = (currentSlide + 1) % totalSlides;
    console.log(`Next slide: ${previousSlide} → ${currentSlide}`);
    updateCarousel();
  }
  
  function prevSlide() {
    const previousSlide = currentSlide;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    console.log(`Previous slide: ${previousSlide} → ${currentSlide}`);
    updateCarousel();
  }
  
  function goToSlide(slideIndex) {
    const previousSlide = currentSlide;
    currentSlide = slideIndex;
    console.log(`Go to slide: ${previousSlide} → ${currentSlide}`);
    updateCarousel();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Next button clicked');
    nextSlide();
  });
  
  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Previous button clicked');
    prevSlide();
  });
  
  // Indicator event listeners
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(`Indicator ${index} clicked`);
      goToSlide(index);
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      console.log('Left arrow pressed');
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      console.log('Right arrow pressed');
      nextSlide();
    }
  });
  
  // Touch/swipe support for mobile
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
    console.log('Touch start at:', startX);
  });
  
  track.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    e.preventDefault();
  });
  
  track.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    console.log('Touch end, diff:', diff, 'threshold:', threshold);
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        console.log('Swipe left detected');
        nextSlide(); // Swipe left - next slide
      } else {
        console.log('Swipe right detected');
        prevSlide(); // Swipe right - previous slide
      }
    }
    
    isDragging = false;
  });
  
  // Debug: Force CSS styles to ensure proper layout
  console.log('Setting up CSS debug...');
  
  // Ensure track has proper width
  track.style.width = '400%'; // 4 slides × 100%
  track.style.display = 'flex';
  
  // Ensure each slide has proper width
  slides.forEach((slide, index) => {
    slide.style.minWidth = '25%';
    slide.style.width = '25%';
    slide.style.flex = '0 0 25%';
    slide.style.boxSizing = 'border-box';
    console.log(`Slide ${index} styled: width=25%, flex=0 0 25%`);
  });
  
  // Initialize carousel
  console.log('Initializing carousel at slide 0');
  updateCarousel();
  
  // Debug info
  setTimeout(() => {
    console.log('=== CAROUSEL DEBUG INFO ===');
    console.log('Track computed style:', {
      width: getComputedStyle(track).width,
      transform: getComputedStyle(track).transform,
      display: getComputedStyle(track).display
    });
    
    slides.forEach((slide, index) => {
      const computedStyle = getComputedStyle(slide);
      console.log(`Slide ${index} computed style:`, {
        width: computedStyle.width,
        minWidth: computedStyle.minWidth,
        flex: computedStyle.flex,
        boxSizing: computedStyle.boxSizing
      });
    });
    console.log('===========================');
  }, 100);
});

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

// Form validation with brutalist error messages
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact__form');
  
  if (contactForm) {
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
        // Send form data to Formspree via AJAX
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
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
  }
  
  // Newsletter form handler
  const newsletterForm = document.querySelector('.footer__newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Validate email
      if (!validateEmail(emailInput.value)) {
        showNewsletterError('EMAIL INVÁLIDO!');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'A SUBSCREVER...';
      
      try {
        // Send form data to Formspree via AJAX
        const formData = new FormData(newsletterForm);
        const response = await fetch(newsletterForm.action, {
          method: 'POST',
          body: formData,
          headers: {
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
          `;
          
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        // Error - restore form and show error
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        showNewsletterError('ERRO NO ENVIO. TENTA NOVAMENTE.');
      }
    });
    
    function showNewsletterError(message) {
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
    
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
});

// Store functionality
const products = {
  1: { id: 1, name: 'BE WATER Training Gloves', price: 49.99 },
  2: { id: 2, name: 'BE WATER Performance Shirt', price: 29.99 },
  3: { id: 3, name: 'BE WATER Gym Bag', price: 39.99 }
};

let cart = [];

// Cart functionality
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
    // Update the cart icon text to show "items"
    const cartText = cart.length === 1 ? 'item' : 'items';
    cartCount.setAttribute('title', `${cart.length} ${cartText} in cart`);
  }
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + products[item.id].price, 0);
  const totalElement = document.getElementById('cart-total-amount');
  if (totalElement) {
    totalElement.textContent = `€${total.toFixed(2)}`;
  }
  return total;
}

function addToCart(productId) {
  cart.push({ id: productId });
  updateCartCount();
  updateCartDisplay();
  
  // Show feedback animation
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.classList.add('cart-icon--shake');
  setTimeout(() => {
    cartIcon.classList.remove('cart-icon--shake');
  }, 500);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const product = products[item.id];
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item__info">
        <div class="cart-item__title">${product.name}</div>
        <div class="cart-item__price">€${product.price.toFixed(2)}</div>
      </div>
      <button class="cart-item__remove" onclick="removeFromCart(${index})">&times;</button>
    `;
    cartItems.appendChild(cartItem);
  });

  updateCartTotal();
}

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
        amount: updateCartTotal()
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
  cart = [];
  updateCartCount();
  closeModal('payment-modal');
  closeModal('cart-modal');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart display
  updateCartCount();
  updateCartDisplay();
  
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.dataset.productId);
      addToCart(productId);
      
      // Add feedback animation to the button
      button.classList.add('btn--added');
      button.textContent = 'ADICIONADO!';
      setTimeout(() => {
        button.classList.remove('btn--added');
        button.textContent = 'ADICIONAR AO CARRINHO';
      }, 1000);
    });
  });

  // Cart toggle
  document.getElementById('cart-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    openModal('cart-modal');
  });

  // Close buttons
  document.querySelectorAll('.modal__close').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal.id);
    });
  });

  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    closeModal('cart-modal');
    openModal('payment-modal');
  });

  // Payment options
  document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', () => {
      const paymentMethod = option.dataset.payment;
      document.querySelectorAll('.payment-form').forEach(form => {
        form.style.display = 'none';
      });
      document.getElementById(`${paymentMethod}-payment-form`).style.display = 'block';
      
      if (paymentMethod === 'card') {
        initializeStripe();
      }
    });
  });

  // Pay button
  document.getElementById('pay-btn').addEventListener('click', () => {
    const activePaymentForm = document.querySelector('.payment-form[style="display: block;"]');
    if (activePaymentForm.id === 'card-payment-form') {
      handleCardPayment(updateCartTotal());
    } else if (activePaymentForm.id === 'mbway-payment-form') {
      handleMBWayPayment();
    }
  });
});

// Gallery functionality
class BrutalistGallery {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.captions = [
      'FORÇA ATRAVÉS DA DISCIPLINA',
      'MESTRE EM ACÇÃO - TREINO INTENSO',
      'A ARTE DA GUERRA INTERIOR',
      'CAMINHO DO GUERREIRO MODERNO',
      'MENTE, CORPO E ESPÍRITO UNIDOS',
      'TRADIÇÃO E INOVAÇÃO EM HARMONIA',
      'O DOJO: ESPAÇO SAGRADO DE CRESCIMENTO',
      'TÉCNICA PERFEITA ATRAVÉS DA REPETIÇÃO'
    ];
    
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
    } catch (error) {
      console.error('Gallery initialization failed:', error);
      this.showPlaceholder();
    }
  }
  
  async loadImages() {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    this.images = [];
    
    // Simple iteration: gallery3, gallery4, gallery5, etc. (starting from 3 since gallery1&2 don't exist)
    for (let i = 3; i <= 50; i++) {
      let foundImage = false;
      
      // Try each extension for this number
      for (const ext of imageExtensions) {
        const imagePath = `src/images/gallery/gallery${i}.${ext}`;
        const exists = await this.checkImageExists(imagePath);
        
        if (exists) {
          this.images.push(imagePath);
          foundImage = true;
          break; // Found this number, move to next
        }
      }
      
      // If we don't find an image for this number, stop looking
      // (assumes images are numbered consecutively after gaps)
      if (!foundImage && i > 6) {
        break;
      }
    }
    
    // If no images found, use fallback images
    if (this.images.length === 0) {
      const fallbackImages = [
        'src/images/d88af4ef-e380-4b56-96c2-71197a7a6f72.png',
        'src/images/7b76cb8d-f94f-46be-be70-b470f40b6856.png',
        'src/images/7c18eef0-2694-4241-aadd-2e9fa2d0d8ae.png',
        'src/images/ccd81ca1-257a-4edf-b66c-ce2498a30dfa.png'
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
  
  updateDisplay() {
    const translateX = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update caption
    const captionText = this.captions[this.currentIndex % this.captions.length];
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
    
    this.caption.textContent = 'AGUARDE POR CONTEÚDO ÉPICO';
    this.prevBtn.style.display = 'none';
    this.nextBtn.style.display = 'none';
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  new BrutalistGallery();
});

// Enhanced Brutalist Form Validation 