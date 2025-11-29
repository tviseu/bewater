document.addEventListener('DOMContentLoaded', function() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const videoItems = document.querySelectorAll('.video-item video');
  
  // --- 1. Video Behavior (Grid View) ---
  
  if (isMobile) {
    // Mobile: Intersection Observer for auto-play
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Try to play (might be blocked by browser policy if not muted)
            const playPromise = entry.target.play();
            if (playPromise !== undefined) {
              playPromise.catch(e => {
                console.log("Autoplay prevented (mobile)", e);
              });
            }
          } else {
            entry.target.pause();
          }
        });
      }, { threshold: 0.5 });
      
      videoItems.forEach(video => observer.observe(video));
    }
    
  } else {
    // Desktop: Play on Hover
    const videoContainers = document.querySelectorAll('.video-item');
    
    videoContainers.forEach(container => {
      const video = container.querySelector('video');
      if (!video) return;
      
      container.addEventListener('mouseenter', () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.log("Hover play prevented", e);
          });
        }
      });
      
      container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Reset to start
      });
    });
  }
  
  // --- 2. Lightbox Logic ---
  
  const lightbox = document.getElementById('bento-lightbox');
  if (!lightbox) return;
  
  const lightboxContent = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const counterDiv = lightbox.querySelector('.lightbox-counter');
  
  // Convert NodeList to Array to easily access by index
  const bentoItems = Array.from(document.querySelectorAll('.bento-item'));
  let currentIndex = 0;
  
  // Open Lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
  
  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop any video playing in lightbox
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
    
    lightboxContent.innerHTML = ''; // Clear content
  }

  // Export closeLightbox globally so modals.js can use it
  window.closeLightbox = closeLightbox;
  
  // Update Content (The core logic for mixed media)
  function updateLightboxContent() {
    // Update Counter
    if (counterDiv) {
      counterDiv.textContent = `${currentIndex + 1} / ${bentoItems.length}`;
    }
    
    // Reset animations
    lightboxContent.classList.remove('bounce-left', 'bounce-right');

    // Fade out effect
    lightboxContent.style.opacity = '0';
    
    setTimeout(() => {
      lightboxContent.innerHTML = ''; // Clear previous
      
      const item = bentoItems[currentIndex];
      const video = item.querySelector('video');
      const img = item.querySelector('img');
      
      let contentElement;
      
      if (video) {
        // Clone video for lightbox
        contentElement = video.cloneNode(true);
        contentElement.controls = true;
        contentElement.muted = true; // Muted by default
        contentElement.style.width = 'auto';
        contentElement.style.height = 'auto';
        
        // Autoplay video
        const playPromise = contentElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.log("Lightbox autoplay prevented", e));
        }
        
      } else if (img) {
        // Create image element
        contentElement = document.createElement('img');
        // Use high-res source if available
        const hiRes = item.getAttribute('data-lightbox-src');
        contentElement.src = hiRes || img.src;
        contentElement.alt = img.alt;
      }
      
      if (contentElement) {
        lightboxContent.appendChild(contentElement);
      }
      
      // Fade in effect
      lightboxContent.style.opacity = '1';
      
    }, 200); // Small delay for fade transition
  }
  
  // Navigation
  function showNext() {
    if (currentIndex < bentoItems.length - 1) {
        currentIndex++;
        updateLightboxContent();
    } else {
        // End of list - Bounce effect
        triggerBounce('left'); // Trying to go right, so bounce left
    }
  }
  
  function showPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateLightboxContent();
    } else {
        // Start of list - Bounce effect
        triggerBounce('right'); // Trying to go left, so bounce right
    }
  }
  
  function triggerBounce(direction) {
      lightboxContent.classList.remove('bounce-left', 'bounce-right');
      // Force reflow
      void lightboxContent.offsetWidth;
      
      if (direction === 'left') {
          lightboxContent.classList.add('bounce-left');
      } else {
          lightboxContent.classList.add('bounce-right');
      }
  }
  
  // Event Listeners for Items
  bentoItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      openLightbox(index);
    });
  });
  
  // Event Listeners for Controls
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });
  
  // Keyboard Support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
  
  // Touch Gestures (Swipe)
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 30; // Increased sensitivity (lower number = easier swipe)
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) {
            // Swiped Left -> Next
            showNext();
        } else {
            // Swiped Right -> Prev
            showPrev();
        }
    }
  }
  
});
