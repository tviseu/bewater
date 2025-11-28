document.addEventListener('DOMContentLoaded', function() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const videoItems = document.querySelectorAll('.video-item video');
  
  // --- 1. Video Behavior ---
  
  if (isMobile) {
    // Mobile: Intersection Observer for auto-play
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Try to play (might be blocked by browser policy if not muted)
            // Videos are muted by default in HTML, so this should work
            const playPromise = entry.target.play();
            if (playPromise !== undefined) {
              playPromise.catch(e => {
                // Auto-play was prevented
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
        video.currentTime = 0; // Reset to start for loop effect
      });
    });
  }
  
  // --- 2. Lightbox ---
  
  const lightbox = document.getElementById('bento-lightbox');
  if (!lightbox) return;
  
  const lightboxContent = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const bentoItems = document.querySelectorAll('.bento-item');
  
  function openLightbox(content) {
    lightboxContent.innerHTML = ''; // Clear previous
    lightboxContent.appendChild(content);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop video if playing in lightbox
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
  }
  
  bentoItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Prevent opening if clicking strictly on overlay actions if implemented differently
      // But here the whole tile is clickable
      
      const video = item.querySelector('video');
      const img = item.querySelector('img');
      
      let contentToShow;
      
      if (video) {
        contentToShow = video.cloneNode(true);
        contentToShow.controls = true; // Enable controls for lightbox
        contentToShow.muted = false; // Unmute for full experience
        contentToShow.style.width = 'auto'; // Reset size constraints for lightbox
        contentToShow.style.height = 'auto';
        
        // Try to play
        setTimeout(() => {
           const playPromise = contentToShow.play();
           if (playPromise !== undefined) {
             playPromise.catch(e => {});
           }
        }, 100);
        
      } else if (img) {
        contentToShow = document.createElement('img');
        // Prefer data-lightbox-src if available for higher res
        const hiRes = item.getAttribute('data-lightbox-src');
        contentToShow.src = hiRes || img.src;
        contentToShow.alt = img.alt;
      }
      
      if (contentToShow) {
        openLightbox(contentToShow);
      }
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});

