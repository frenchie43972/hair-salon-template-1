// Hero Slider Configuration
const heroSlider = {
  // Configuration
  config: {
    interval: 3000, // 3 seconds between slides
    fadeDuration: 1000, // 1 second fade transition
    images: [
      './images/agustin-fernandez-image-2.jpg',
      './images/anna-ruth-folk-image-7.jpg',
      './images/cesar-saravia-image-3.jpg',
      './images/jessie-dee-dabrowski-image-4.jpg',
    ],
  },

  // State
  state: {
    currentIndex: 0,
    isTransitioning: false,
    intervalId: null,
  },

  // Initialize the slider
  init() {
    // Create and append the slider container
    const hero = document.querySelector('.hero');
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'hero-slider';

    // Create initial slides
    this.config.images.forEach((src, index) => {
      const slide = document.createElement('div');
      slide.className = 'hero-slide';
      slide.style.backgroundImage = `url(${src})`;
      slide.style.opacity = index === 0 ? '1' : '0';
      sliderContainer.appendChild(slide);
    });

    // Insert slider before the hero content
    hero.insertBefore(sliderContainer, hero.firstChild);

    // Start the slider
    this.startSlideshow();
  },

  // Start the slideshow
  startSlideshow() {
    this.state.intervalId = setInterval(
      () => this.nextSlide(),
      this.config.interval
    );
  },

  // Stop the slideshow
  stopSlideshow() {
    clearInterval(this.state.intervalId);
  },

  // Show next slide
  nextSlide() {
    if (this.state.isTransitioning) return;
    this.state.isTransitioning = true;

    const slides = document.querySelectorAll('.hero-slide');
    const currentSlide = slides[this.state.currentIndex];
    const nextIndex = (this.state.currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    // Fade out current slide
    currentSlide.style.transition = `opacity ${this.config.fadeDuration}ms ease-in-out`;
    currentSlide.style.opacity = '0';

    // Fade in next slide
    nextSlide.style.transition = `opacity ${this.config.fadeDuration}ms ease-in-out`;
    nextSlide.style.opacity = '1';

    // Update state after transition
    setTimeout(() => {
      this.state.currentIndex = nextIndex;
      this.state.isTransitioning = false;
    }, this.config.fadeDuration);
  },
};

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  heroSlider.init();
});
