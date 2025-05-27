/*
 * Glamour Salon - Modern Hair Salon Template
 * JavaScript functionality for lightbox, team slider
 */

document.addEventListener('DOMContentLoaded', () => {
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

    const isOpen = menuBtn.classList.contains('active');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  }

  menuBtn.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);

  document.querySelectorAll('.nav_link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetSection = document.querySelector(link.getAttribute('href'));
      if (!targetSection) return;

      if (navList.classList.contains('active')) {
        // Listens for the menu to close before scrolling
        const onNavClosed = (e) => {
          if (e.propertyName === 'right') {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            navList.removeEventListener('transitionend', onNavClosed);
          }
        };
        navList.addEventListener('transitionend', onNavClosed);
        toggleMenu();
      } else {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Gallery Lightbox
  const galleryItems = [
    {
      src: './images/agustin-fernandez-image-2.jpg',
      alt: 'Hair Styling Example 1',
    },
    {
      src: './images/toa-heftiba-image-6.jpg',
      alt: 'Hair Styling Example 2',
    },
    {
      src: './images/jonathan-weiss-image-5.jpg',
      alt: 'Hair Styling Example 3',
    },
    {
      src: './images/george-bohunicky-image-1.jpg',
      alt: 'Hair Styling Example 4',
    },
    {
      src: './images/jessie-dee-dabrowski-image-4.jpg',
      alt: 'Hair Styling Example 5',
    },
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
});
