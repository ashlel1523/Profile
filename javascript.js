
  // Dark Mode Toggle
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Set dark mode as default on first load if no theme is saved
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Reusable slideshow logic for multiple sections
  function initSlideshow(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slides = container.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    showSlide(currentSlide); // show first immediately

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 3500);
  }

  // Initialize all slideshow sections
  initSlideshow('slideshow1');
  initSlideshow('slideshow2');

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const controls = document.querySelector(".modal-controls");
  const slideImages = [...document.querySelectorAll(".slide")];
  let currentIndex = 0;

  function openModal(src, isSlide = false, index = 0) {
    modal.style.display = "block";
    modalImg.src = src;
    controls.style.display = isSlide ? "flex" : "none";
    if (isSlide) currentIndex = index;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function changeSlide(n) {
    currentIndex += n;
    if (currentIndex < 0) currentIndex = slideImages.length - 1;
    if (currentIndex >= slideImages.length) currentIndex = 0;
    modalImg.src = slideImages[currentIndex].src;
  }

  // Slide images (with arrows)
  slideImages.forEach((img, i) => {
    img.addEventListener("click", () => openModal(img.src, true, i));
  });

  // Static images (no arrows)
  document.querySelectorAll(".slides:not(.slide)").forEach(img => {
    img.addEventListener("click", () => openModal(img.src, false));
  });

  // Close on outside click
  window.onclick = function(e) {
    if (e.target === modal) closeModal();
  }

