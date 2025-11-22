/**
 * Animations for Be Water Website
 * Handles:
 * 1. Scroll animations (Fade In Blur)
 * 2. Hero Text Animation (Split text)
 * 3. Flashlight/Spotlight effect on cards
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHeroTextAnimation();
  initFlashlightEffect();
  initButtonBeamEffect();
});

/**
 * 1. Scroll Animations using IntersectionObserver
 * Adds 'is-visible' class when elements enter viewport
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Target elements with .animate-on-scroll class
  // Also auto-target cards and section titles
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .card, .trainer-card, .price-card, .section-title');
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll'); // Ensure class exists
    observer.observe(el);
  });
}

/**
 * 2. Hero Text Animation
 * Splits text into spans for letter-by-letter animation
 */
function initHeroTextAnimation() {
  const heroTitle = document.querySelector('.hero__title');
  if (!heroTitle) return;

  // Prepare text for animation if not already prepared
  if (!heroTitle.querySelector('.char')) {
    // Keep the <br> structure
    const lines = heroTitle.innerHTML.split('<br>');
    
    const processedLines = lines.map(line => {
      // Remove HTML tags for splitting, then wrap chars
      const text = line.replace(/<[^>]*>/g, ''); // simplified, assuming simple text
      const chars = text.split('').map((char, index) => {
        if (char === ' ') return '<span class="char space">&nbsp;</span>';
        return `<span class="char" style="animation-delay: ${index * 0.05}s">${char}</span>`;
      }).join('');
      return `<span class="line-wrapper">${chars}</span>`;
    });

    heroTitle.innerHTML = processedLines.join('<br>');
    heroTitle.classList.add('text-animated');
  }
}

/**
 * 3. Flashlight Effect on Cards
 * Tracks mouse position relative to card
 */
function initFlashlightEffect() {
  const cards = document.querySelectorAll('.card, .price-card, .trainer-card, .gym-collage-slide');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 4. Button Beam Effect
 * Adds hover effect listeners if needed (CSS might handle most)
 */
function initButtonBeamEffect() {
  // CSS handles the hover, this is just for potential JS enhancements
  // Currently relying on CSS :hover and pseudo-elements
}
