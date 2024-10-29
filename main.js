AOS.init({
  duration: 1000,
});


// Initialize the Swiper instance
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 110,
  loop: true,
  speed: 1500, // Set slide transition speed to 1.5 seconds
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 2000, // 2 seconds
    disableOnInteraction: false, // Keeps autoplay running even after user interactions
  },
});

// Custom buttons to move 3 slides at once
document.getElementById('prevBtn').addEventListener('click', function () {
  // Move back by 3 slides
  swiper.slideTo(Math.max(swiper.activeIndex - 3, 0));
});

document.getElementById('nextBtn').addEventListener('click', function () {
  // Move forward by 3 slides
  swiper.slideTo(Math.min(swiper.activeIndex + 3, swiper.slides.length - 1));
});

// Update slidesPerView on window resize
function updateSlidesPerView() {
  if (window.innerWidth <= 400) {
    swiper.params.slidesPerView = 1; // Show 1 slide on screens <= 400px
  } else if (window.innerWidth <= 768) {
    swiper.params.slidesPerView = 2; // Show 2 slides on screens <= 768px
  } else {
    swiper.params.slidesPerView = 3; // Default to 3 slides
  }
  
  swiper.update(); // Update the swiper instance to apply changes
}

// Initial check
updateSlidesPerView();

// Attach the event listener to handle resize events
window.addEventListener('resize', updateSlidesPerView);















// Function to animate numbers with a fixed 2-second duration
function animateCount(element, end) {
  let current = 0;
  const duration = 2000; // 2 seconds
  const frameRate = 60; // 60 frames per second
  const totalFrames = Math.round((duration / 1000) * frameRate);
  const increment = end / totalFrames; // How much to increase per frame

  let frame = 0;
  const timer = setInterval(() => {
    frame++;
    current += increment;
    element.textContent = `${Math.round(current)}+`; // Display the current value with the + symbol

    if (frame === totalFrames) {
      element.textContent = `${end}+`; // Ensure it ends exactly on the end value with +
      clearInterval(timer);
    }
  }, 1000 / frameRate); // 1000ms / frame rate = time per frame
}

// Initialize AOS
AOS.init({
  duration: 1000, // AOS duration for all elements
  once: true      // Only animate once when scrolled into view
});

// Trigger count animation after AOS animation completes
document.addEventListener('DOMContentLoaded', () => {
  const countElements = document.querySelectorAll('.number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countElements.forEach((element) => {
          const endValue = parseInt(element.textContent, 10); // End value from HTML
          animateCount(element, endValue); // Animate from 0 to the end value
        });
        observer.disconnect(); // Stop observing once animation starts
      }
    });
  });

  // Observe the parent wrapper of the numbers to ensure AOS has completed
  const wrapper = document.querySelector('.info__wrap');
  observer.observe(wrapper);
});
