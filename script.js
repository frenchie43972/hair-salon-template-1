/*
 * Glamour Salon - Modern Hair Salon Template
 * JavaScript functionality for lightbox, team slider, and form validation
 */

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.header_menu-btn');
  const navList = document.querySelector('.nav_list');
  const menuOverlay = document.querySelector('.menu-overlay');

  function toggleMenu() {
    menuBtn.classList.toggle('active');
    navList.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuBtn.classList.contains('active')
      ? 'hidden'
      : '';
  }

  menuBtn.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link
  document.querySelectorAll('.nav_link').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        toggleMenu();
      }
    });
  });

  // Gallery Lightbox
  const galleryItems = [
    { src: 'gallery-1.jpg', alt: 'Hair Styling Example 1' },
    { src: 'gallery-2.jpg', alt: 'Hair Styling Example 2' },
    { src: 'gallery-3.jpg', alt: 'Hair Styling Example 3' },
    { src: 'gallery-4.jpg', alt: 'Hair Styling Example 4' },
    { src: 'gallery-5.jpg', alt: 'Hair Styling Example 5' },
    { src: 'gallery-6.jpg', alt: 'Hair Styling Example 6' },
  ];

  const galleryGrid = document.querySelector('.gallery_grid');

  // Populate gallery grid
  galleryItems.forEach((item) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery_item';
    galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy">
        `;
    galleryGrid.appendChild(galleryItem);
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox_image');
  const lightboxClose = lightbox.querySelector('.lightbox_close');
  const galleryImages = document.querySelectorAll('.gallery_item img');

  galleryImages.forEach((img) => {
    img.addEventListener('click', function () {
      lightbox.style.display = 'block';
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
    });
  });

  lightboxClose.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Team Slider
  const teamSlider = document.querySelector('.team_slider');
  const teamMembers = document.querySelectorAll('.team_member');
  const prevBtn = document.querySelector('.slider_btn--prev');
  const nextBtn = document.querySelector('.slider_btn--next');
  let currentSlide = 0;

  function updateSlider() {
    const offset = -currentSlide * 100;
    teamSlider.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + teamMembers.length) % teamMembers.length;
    updateSlider();
  });

  nextBtn.addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % teamMembers.length;
    updateSlider();
  });

  // Auto-advance slider every 5 seconds
  setInterval(function () {
    currentSlide = (currentSlide + 1) % teamMembers.length;
    updateSlider();
  }, 5000);

  // Form Validation
  const bookingForm = document.getElementById('bookingForm');

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const date = document.getElementById('date');
    let isValid = true;

    // Name validation
    if (name.value.trim() === '') {
      showError(name, 'Name is required');
      isValid = false;
    } else {
      removeError(name);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    } else {
      removeError(email);
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone.value)) {
      showError(phone, 'Please enter a valid phone number');
      isValid = false;
    } else {
      removeError(phone);
    }

    // Service validation
    if (service.value === '') {
      showError(service, 'Please select a service');
      isValid = false;
    } else {
      removeError(service);
    }

    // Date validation
    if (date.value === '') {
      showError(date, 'Please select a date');
      isValid = false;
    } else {
      removeError(date);
    }

    if (isValid) {
      // Here you would typically send the form data to a server
      alert('Appointment booked successfully!');
      bookingForm.reset();
    }
  });

  function showError(input, message) {
    const formGroup = input.parentElement;
    const error =
      formGroup.querySelector('.error-message') ||
      document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(error);
    }

    input.classList.add('error');
  }

  function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');

    if (error) {
      formGroup.removeChild(error);
    }

    input.classList.remove('error');
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Close mobile menu if open
        if (window.innerWidth < 768) {
          toggleMenu();
        }
      }
    });
  });

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
});
