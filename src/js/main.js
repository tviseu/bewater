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
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
    
    if (mobileMenu.classList.contains('active')) {
      // When menu is open, transform spans into X
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      // Reset to hamburger icon
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Reset hamburger icon
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
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
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
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
        showBrutalistError(nameField, 'NAME REQUIRED. NO EXCUSES.');
        valid = false;
      }
      
      // Validate email
      if (!validateEmail(emailField.value)) {
        showBrutalistError(emailField, 'REAL EMAIL NEEDED. NOW.');
        valid = false;
      }
      
      // Validate message
      if (!messageField.value.trim()) {
        showBrutalistError(messageField, 'EMPTY MESSAGE? SERIOUSLY?');
        valid = false;
      }
      
      if (valid) {
        // Simulate form submission with brutalist confirmation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';
        
        setTimeout(() => {
          contactForm.innerHTML = `
            <div class="form-success">
              <h3>MESSAGE RECEIVED.</h3>
              <p>We'll respond if we think it's worth our time.</p>
            </div>
          `;
          
          const formSuccess = contactForm.querySelector('.form-success');
          formSuccess.style.cssText = `
            padding: 2rem;
            border: 4px solid var(--color-black);
            background-color: var(--color-primary);
            color: var(--color-white);
            text-align: center;
            box-shadow: 8px 8px 0 var(--color-black);
          `;
        }, 1500);
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
  alert('Payment successful! Thank you for your purchase.');
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
      button.textContent = 'ADDED!';
      setTimeout(() => {
        button.classList.remove('btn--added');
        button.textContent = 'ADD TO CART';
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