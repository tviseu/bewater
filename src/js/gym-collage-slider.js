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
    
    this.init();
  }

  init() {
    // Initialize slider elements
    this.track = document.getElementById('gymCollageTrack');
    this.slides = document.querySelectorAll('.gym-collage-slide');
    this.indicators = document.querySelectorAll('.collage-indicator');
    this.prevBtn = document.getElementById('gymCollagePrev');
    this.nextBtn = document.getElementById('gymCollageNext');
    
    // Initialize popup elements
    this.popup = document.getElementById('gymPhotoPopup');
    this.popupImage = document.getElementById('popupImage');
    this.popupCaption = document.getElementById('popupCaption');
    this.popupClose = document.getElementById('popupClose');
    this.popupOverlay = document.getElementById('popupOverlay');

    if (!this.track || !this.slides.length) {
      console.warn('Gym collage slider elements not found');
      return;
    }

    this.totalSlides = this.slides.length;
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize first slide
    this.updateSlider();
    
    console.log('Gym Collage Slider initialized with', this.totalSlides, 'slides');
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
    document.querySelectorAll('.gym-photo').forEach(photo => {
      photo.addEventListener('click', (e) => this.openPhotoPopup(e));
    });

    // Popup close events
    if (this.popupClose) {
      this.popupClose.addEventListener('click', () => this.closePhotoPopup());
    }
    
    if (this.popupOverlay) {
      this.popupOverlay.addEventListener('click', () => this.closePhotoPopup());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));

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

    // Move track to show current slide
    const translateX = -this.currentSlide * 7.69; // 7.69% per slide (100% / 13 slides)
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

  openPhotoPopup(event) {
    const photoElement = event.currentTarget;
    const img = photoElement.querySelector('img');
    const photoData = photoElement.getAttribute('data-photo');
    
    if (!img || !this.popup) return;

    // Get image source and caption
    const imageSrc = img.src;
    const imageAlt = img.alt;
    
    // Clean up the caption (remove _optimized and replace dashes/underscores)
    const cleanCaption = photoData
      .replace('_optimized', '')
      .replace(/[-_]/g, ' ')
      .replace(/IMG /g, '')
      .replace(/WA/g, 'WA')
      .toUpperCase();

    // Set popup content
    this.popupImage.src = imageSrc;
    this.popupImage.alt = imageAlt;
    this.popupCaption.textContent = cleanCaption;

    // Show popup
    this.popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    console.log('Photo popup opened:', cleanCaption);
  }

  closePhotoPopup() {
    if (!this.popup) return;

    this.popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling

    console.log('Photo popup closed');
  }

  handleKeyPress(event) {
    // Handle popup
    if (this.popup && this.popup.classList.contains('active')) {
      if (event.key === 'Escape') {
        this.closePhotoPopup();
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