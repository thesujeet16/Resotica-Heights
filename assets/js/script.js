// ------------------------- Hero Swiper ------------------------ //
const swiper = new Swiper(".mySwiper", {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  on: {
    slideChange() {
      const index = this.realIndex;
      document.querySelectorAll(".paginationImg .circle-div").forEach((el, i) => {
        el.classList.toggle("active", i === index);
        const num = el.querySelector(".number");
        num.style.visibility = i === index ? "hidden" : "visible";
      });
    },
  },
});

// Pagination click
document.querySelectorAll(".paginationImg .circle-div").forEach((el, i) =>
  el.addEventListener("click", () => swiper.slideToLoop(i))
);

// Initialize first state
const firstCircle = document.querySelector(".paginationImg .circle-div");
firstCircle.classList.add("active");
firstCircle.querySelector(".number").style.visibility = "hidden";


// ------------------------- Counter ------------------------ //
function animateCounter(el, target, duration = 2000) {
  let current = 0, increment = target / (duration / 16), suffix = el.dataset.suffix || "";

  function update() {
    current += increment;
    if (current < target) {
      el.textContent = target >= 1000
        ? Math.floor(current) + suffix
        : current.toFixed(1).replace(/\.0$/, "") + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  update();
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseFloat(entry.target.dataset.target));
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".count h3").forEach(el => observer.observe(el));


// ------------------------- Project Swiper ------------------------ //
const swiper1 = new Swiper(".projectSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
   autoplay: {
    delay: 3000, // time between slides (ms) → 3s
    disableOnInteraction: false, // keeps autoplay running after user swipes
  },
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 2, spaceBetween: 40 },
  },
});
