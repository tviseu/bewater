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
    menuToggle.classList.toggle('active');
    
    // Let mobile menu transitions happen
    document.querySelector('.header__nav').classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      menuToggle.classList.remove('active');
      document.querySelector('.header__nav').classList.remove('active');
    });
  });
});

// Water Ripple Cursor Effect
function createWaterCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('water-cursor');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background-color: var(--color-yellow);
    border: 2px solid var(--color-black);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: none;
    opacity: 0.7;
  `;
  
  // Create ripple effect
  const ripple = document.createElement('div');
  ripple.classList.add('water-ripple');
  ripple.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    border: 2px solid var(--color-yellow);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    display: none;
  `;
  
  document.body.appendChild(cursor);
  document.body.appendChild(ripple);
  
  // Only show custom cursor on desktop
  if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    ripple.style.display = 'block';
    
    document.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Ripple follows with slight delay
      setTimeout(() => {
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
      }, 50);
    });
    
    // Create ripple effect on click
    document.addEventListener('click', e => {
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.opacity = '0.5';
      
      // Animate ripple
      ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0.5 },
        { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
      ], {
        duration: 700,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      });
    });
    
    // Scale up cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, .class-card, .trainer-card, .price-card');
    
    clickables.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'var(--color-black)';
        cursor.style.borderColor = 'var(--color-yellow)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'var(--color-yellow)';
        cursor.style.borderColor = 'var(--color-black)';
      });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    clickables.forEach(element => {
      element.style.cursor = 'none';
    });
  }
}

// Uncomment to enable water cursor
createWaterCursor();

// Water flow effect on hero title
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero__title');
  
  if (heroTitle) {
    let originalText = heroTitle.innerHTML;
    const bruceQuotes = [
      "Be water, my friend.",
      "Empty your mind.",
      "Absorb what is useful.",
      "The key to immortality is first living a life worth remembering.",
      "Knowing is not enough; we must apply.",
      "Simplicity is the key to brilliance."
    ];
    
    heroTitle.addEventListener('mouseenter', function() {
      // Create water ripple effect animation on text
      heroTitle.style.animation = 'textWave 1s ease-in-out';
      
      setTimeout(() => {
        // Show a random Bruce Lee quote temporarily
        const randomQuote = bruceQuotes[Math.floor(Math.random() * bruceQuotes.length)];
        heroTitle.innerHTML = randomQuote;
        
        // Add a wavy animation class
        heroTitle.classList.add('wavy-text');
        
        setTimeout(() => {
          // Revert back to original text
          heroTitle.innerHTML = originalText;
          heroTitle.style.animation = '';
          heroTitle.classList.remove('wavy-text');
        }, 2000);
      }, 500);
    });
    
    // Add wavy text CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes textWave {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      }
      
      .wavy-text {
        display: inline-block;
        animation: wavy 2s infinite;
        color: var(--color-yellow);
      }
      
      @keyframes wavy {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-5px); }
        75% { transform: translateY(5px); }
      }
    `;
    document.head.appendChild(style);
  }
});

// Flowing scroll animations
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.about__stat, .class-card, .trainer-card, .price-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delayed staggered animation like flowing water
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) rotate(0deg)';
        }, index * 150);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    // Random start positions for more organic flow
    const randomX = Math.random() * 20 - 10;
    const randomRotate = Math.random() * 2 - 1;
    
    element.style.opacity = '0';
    element.style.transform = `translateY(30px) translateX(${randomX}px) rotate(${randomRotate}deg)`;
    element.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(element);
  });
  
  // Add water flow effect to section lines
  const sectionLines = document.querySelectorAll('.section-line');
  sectionLines.forEach(line => {
    line.style.width = '0';
    line.style.transition = 'width 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)';
  });
  
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = '100px';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });
  
  sectionLines.forEach(line => {
    lineObserver.observe(line);
  });
});

// Form validation with Bruce Lee philosophy error messages
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
      
      // Validate name with Bruce Lee inspired messages
      if (!nameField.value.trim()) {
        showPhilosophyError(nameField, 'Your name is your identity. Do not abandon it.');
        valid = false;
      }
      
      // Validate email
      if (!validateEmail(emailField.value)) {
        showPhilosophyError(emailField, 'A correct email flows like water, finding its path.');
        valid = false;
      }
      
      // Validate message
      if (!messageField.value.trim()) {
        showPhilosophyError(messageField, 'Empty your mind, not your message.');
        valid = false;
      }
      
      if (valid) {
        // Simulate form submission with water-like confirmation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'FLOWING...';
        
        setTimeout(() => {
          contactForm.innerHTML = `
            <div class="form-success">
              <h3>MESSAGE RECEIVED</h3>
              <p>"Knowing is not enough, we must apply. Willing is not enough, we must do."</p>
              <p>We will respond soon.</p>
            </div>
          `;
          
          const formSuccess = contactForm.querySelector('.form-success');
          formSuccess.style.cssText = `
            padding: 2rem;
            border: 3px solid var(--color-black);
            background-color: var(--color-yellow);
            color: var(--color-black);
            text-align: center;
            box-shadow: 8px 8px 0 var(--color-black);
          `;
          
          // Add a subtle water ripple animation to the success message
          formSuccess.animate([
            { transform: 'scale(0.95)', opacity: 0.8 },
            { transform: 'scale(1)', opacity: 1 }
          ], {
            duration: 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            iterations: 1
          });
        }, 1500);
      }
    });
    
    function showPhilosophyError(field, message) {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('form-error');
      errorDiv.textContent = message;
      errorDiv.style.cssText = `
        background-color: var(--color-black);
        color: var(--color-yellow);
        padding: 0.5rem;
        margin-top: 0.5rem;
        font-weight: 700;
        border-left: 4px solid var(--color-yellow);
        transform: translateX(5px);
        transition: all 0.3s ease;
      `;
      
      field.parentNode.appendChild(errorDiv);
      
      // Flow-like animation for the error message
      errorDiv.animate([
        { transform: 'translateX(15px)', opacity: 0 },
        { transform: 'translateX(5px)', opacity: 1 }
      ], {
        duration: 500,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      });
      
      // Change field border color
      field.style.borderColor = 'var(--color-black)';
      field.style.boxShadow = '0 0 0 2px rgba(255, 204, 0, 0.3)';
    }
    
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
});

// Add Chinese characters floating in the background
document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    // Chinese characters related to water and Bruce Lee philosophy
    const characters = ['水', '力', '道', '功', '龍', '武', '心', '氣', '流'];
    
    // Create floating characters
    for (let i = 0; i < 15; i++) {
      const character = document.createElement('span');
      character.classList.add('floating-character');
      character.textContent = characters[Math.floor(Math.random() * characters.length)];
      
      // Random positions
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 5 + 2;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      character.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        font-size: ${size}rem;
        color: rgba(255, 204, 0, 0.1);
        pointer-events: none;
        z-index: 1;
        animation: float ${duration}s ease-in-out ${delay}s infinite alternate;
      `;
      
      heroSection.appendChild(character);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        100% { transform: translate(20px, 20px) rotate(5deg); }
      }
    `;
    document.head.appendChild(style);
  }
}); 