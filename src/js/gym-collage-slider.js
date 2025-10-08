// ===========================
// GYM COLLAGE SLIDER & PHOTO POPUP
// ===========================

class GymCollageSlider {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.track = null;
    this.slides = [];
    this.indicators = [];
    this.prevBtn = null;
    this.nextBtn = null;
    this.popup = null;
    this.popupImage = null;
    this.popupCaption = null;
    this.popupClose = null;
    this.popupOverlay = null;
    this.popupPrev = null;
    this.popupNext = null;
    this.currentPopupSlide = 0;
    this.allPhotos = [];
    this.genericCaptions = [
      'Treino de força',
      'Zona de treino',
      'Equipamento de qualidade',
      'Mobilidade e flexibilidade',
      'Condição física',
      'Força e técnica',
      'Energia e foco',
      'Resistência e disciplina',
      'Bem-estar',
      'Desempenho e progresso'
    ];
    
    this.init();
  }

  init() {
    // Initialize slider elements
    this.track = document.getElementById('gymCollageTrack');
    this.slides = Array.from(document.querySelectorAll('.gym-collage-slide'));
    this.indicators = document.querySelectorAll('.collage-indicator');
    this.prevBtn = document.getElementById('gymCollagePrev');
    this.nextBtn = document.getElementById('gymCollageNext');
    
    // Initialize popup elements
    this.popup = document.getElementById('gymPhotoPopup');
    this.popupImage = document.getElementById('popupImage');
    this.popupCaption = document.getElementById('popupCaption');
    this.popupClose = document.getElementById('popupClose');
    this.popupOverlay = document.getElementById('popupOverlay');
    this.popupPrev = document.getElementById('popupPrev');
    this.popupNext = document.getElementById('popupNext');

    if (!this.track || !this.slides.length) {
      console.warn('Gym collage slider elements not found');
      return;
    }

    // Remove slides without a valid image
    this.slides = this.slides.filter((slide) => {
      const img = slide.querySelector('.gym-photo img');
      const src = img ? img.getAttribute('src') : '';
      if (!img || !src) {
        slide.remove();
        return false;
      }
      return true;
    });

    // Apply generic captions to avoid mismatched captions
    this.slides.forEach((slide, index) => {
      const photo = slide.querySelector('.gym-photo');
      const img = slide.querySelector('.gym-photo img');
      if (!photo || !img) return;
      const generic = this.genericCaptions[index % this.genericCaptions.length];
      photo.setAttribute('data-photo', generic);
      const captionEl = slide.querySelector('.gym-photo__caption');
      if (captionEl) captionEl.textContent = generic;
      img.alt = generic;
    });

    // Recalculate after potential removals
    this.totalSlides = this.slides.length;

    // Guard: nothing to show
    if (this.totalSlides === 0) {
      console.warn('No valid slides found for Gym collage');
      return;
    }

    // Set dynamic widths so that 1 slide = 100% / totalSlides of the track
    this.track.style.width = `${this.totalSlides * 100}%`;
    this.slides.forEach((slide) => {
      slide.style.width = `${100 / this.totalSlides}%`;
    });
    
    // Get all photos for popup navigation
    this.allPhotos = Array.from(document.querySelectorAll('.gym-photo'));
    
    // Hide extra indicators if any
    if (this.indicators.length > this.totalSlides) {
      for (let i = this.totalSlides; i < this.indicators.length; i++) {
        const el = this.indicators[i];
        if (el && el.parentElement) el.parentElement.removeChild(el);
      }
      this.indicators = document.querySelectorAll('.collage-indicator');
    }

    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize first slide
    this.updateSlider();
    

  }

  setupEventListeners() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Photo click events for popup
    this.allPhotos.forEach((photo, index) => {
      photo.addEventListener('click', (e) => this.openPhotoPopup(e, index));
    });

    // Popup close events
    if (this.popupClose) {
      this.popupClose.addEventListener('click', () => this.closePhotoPopup());
    }
    
    if (this.popupOverlay) {
      this.popupOverlay.addEventListener('click', () => this.closePhotoPopup());
    }

    // Popup navigation events
    if (this.popupPrev) {
      this.popupPrev.addEventListener('click', () => this.previousPopupPhoto());
    }
    
    if (this.popupNext) {
      this.popupNext.addEventListener('click', () => this.nextPopupPhoto());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));

    // Touch/Swipe support for mobile
    this.addTouchSupport();

    // Auto-advance slider (disabled - manual navigation only)
    // this.startAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateSlider();
  }

  updateSlider() {
    if (!this.track) return;

    // Translate proportionally based on total slides
    const slidePercentage = 100 / this.totalSlides;
    const translateX = -this.currentSlide * slidePercentage;
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update slide active states
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
    

  }

  nextPopupPhoto() {
    this.currentPopupSlide = (this.currentPopupSlide + 1) % this.allPhotos.length;
    this.updatePopupPhoto();
  }

  previousPopupPhoto() {
    this.currentPopupSlide = (this.currentPopupSlide - 1 + this.allPhotos.length) % this.allPhotos.length;
    this.updatePopupPhoto();
  }

  updatePopupPhoto() {
    const currentPhoto = this.allPhotos[this.currentPopupSlide];
    const img = currentPhoto.querySelector('img');
    const photoData = currentPhoto.getAttribute('data-photo');
    
    if (!img || !this.popup) return;

    // Get image source and caption
    const imageSrc = img.src;
    const imageAlt = img.alt;
    
    // Fix caption - keep hyphens and clean format
    const cleanCaption = photoData || imageAlt;

    // Set popup content
    this.popupImage.src = imageSrc;
    this.popupImage.alt = imageAlt;
    this.popupCaption.textContent = cleanCaption;
  }

  openPhotoPopup(event, photoIndex) {
    const photoElement = event.currentTarget;
    const img = photoElement.querySelector('img');
    const photoData = photoElement.getAttribute('data-photo');
    
    if (!img || !this.popup) return;

    this.currentPopupSlide = photoIndex;

    const imageSrc = img.src;
    const imageAlt = img.alt;
    
    // Fix caption - keep hyphens and clean format
    const cleanCaption = photoData || imageAlt;

    this.popupImage.src = imageSrc;
    this.popupImage.alt = imageAlt;
    this.popupCaption.textContent = cleanCaption;

    this.popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closePhotoPopup() {
    if (!this.popup) return;

    // Synchronize main slider with popup position before closing
    if (this.currentPopupSlide >= 0 && this.currentPopupSlide < this.totalSlides) {
      this.currentSlide = this.currentPopupSlide;
      this.updateSlider();
    }

    this.popup.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleKeyPress(event) {
    // Handle popup
    if (this.popup && this.popup.classList.contains('active')) {
      if (event.key === 'Escape') {
        this.closePhotoPopup();
      } else if (event.key === 'ArrowLeft') {
        this.previousPopupPhoto();
      } else if (event.key === 'ArrowRight') {
        this.nextPopupPhoto();
      }
      return;
    }

    // Handle slider navigation
    if (event.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  startAutoSlide() {
    // Auto-advance every 6 seconds (optional)
    setInterval(() => {
      // Only auto-advance if popup is not open
      if (!this.popup || !this.popup.classList.contains('active')) {
        this.nextSlide();
      }
    }, 6000);
  }

  // Touch/Swipe support for mobile devices
  addTouchSupport() {
    if (!this.track) return;

    let startX = 0;
    let currentX = 0;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let hasMoved = false;
    const minSwipeDistance = 50; // Minimum distance for a valid swipe

    // Touch start
    this.track.addEventListener('touchstart', (e) => {
      // Only enable on mobile/tablet
      if (window.innerWidth > 768) return;

      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      currentY = startY;
      isDragging = true;
      hasMoved = false;

      // Disable transition during drag
      this.track.style.transition = 'none';
    });

    // Touch move
    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging || window.innerWidth > 768) return;

      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
      
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      
      // If movement is more horizontal than vertical, prevent default scrolling
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        hasMoved = true;
      }
    });

    // Touch end
    this.track.addEventListener('touchend', (e) => {
      if (!isDragging || window.innerWidth > 768) return;

      // Re-enable transition
      this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      if (hasMoved) {
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Only swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            // Swipe right - go to previous slide
            this.previousSlide();
          } else {
            // Swipe left - go to next slide
            this.nextSlide();
          }
        }
      }

      // Reset values
      isDragging = false;
      hasMoved = false;
      startX = 0;
      currentX = 0;
      startY = 0;
      currentY = 0;
    });

    // Touch cancel (if user drags off screen)
    this.track.addEventListener('touchcancel', (e) => {
      if (!isDragging || window.innerWidth > 768) return;

      // Re-enable transition
      this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      // Reset values
      isDragging = false;
      hasMoved = false;
      startX = 0;
      currentX = 0;
      startY = 0;
      currentY = 0;
    });

    // Add popup swipe support
    this.addPopupSwipeSupport();
  }

  // Add swipe support for popup navigation
  addPopupSwipeSupport() {
    if (!this.popup) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false;
    const minSwipeDistance = 50;

    this.popup.addEventListener('touchstart', (e) => {
      if (!this.popup.classList.contains('active')) return;

      startX = e.touches[0].clientX;
      currentX = startX;
      isDragging = true;
      hasMoved = false;
    });

    this.popup.addEventListener('touchmove', (e) => {
      if (!isDragging || !this.popup.classList.contains('active')) return;

      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      
      if (Math.abs(deltaX) > 10) {
        hasMoved = true;
        e.preventDefault();
      }
    });

    this.popup.addEventListener('touchend', (e) => {
      if (!isDragging || !this.popup.classList.contains('active')) return;

      if (hasMoved) {
        const deltaX = currentX - startX;

        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            // Swipe right - go to previous photo
            this.previousPopupPhoto();
          } else {
            // Swipe left - go to next photo
            this.nextPopupPhoto();
          }
        }
      }

      // Reset values
      isDragging = false;
      hasMoved = false;
      startX = 0;
      currentX = 0;
    });
  }

  // Public method to stop auto-slide
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.gymCollageSlider = new GymCollageSlider();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GymCollageSlider;
} 