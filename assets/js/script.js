// ------------------------- Hero Swiper ------------------------ //
const swiper = new Swiper(".mySwiper", {
  loop: true,
  speed: 1000,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  on: {
    slideChange() {
      const index = this.realIndex;
      document
        .querySelectorAll(".paginationImg .circle-div")
        .forEach((el, i) => {
          el.classList.toggle("active", i === index);
          const num = el.querySelector(".number");
          num.style.visibility = i === index ? "hidden" : "visible";
        });
    },
  },
});

// Pagination click
document
  .querySelectorAll(".paginationImg .circle-div")
  .forEach((el, i) =>
    el.addEventListener("click", () => swiper.slideToLoop(i))
  );

// Initialize first state
const firstCircle = document.querySelector(".paginationImg .circle-div");
firstCircle.classList.add("active");
firstCircle.querySelector(".number").style.visibility = "hidden";

// ------------------------- Counter ------------------------ //
function animateCounter(el, target, duration = 2000) {
  let current = 0,
    increment = target / (duration / 16),
    suffix = el.dataset.suffix || "";

  function update() {
    current += increment;
    if (current < target) {
      el.textContent =
        target >= 1000
          ? Math.floor(current) + suffix
          : current.toFixed(1).replace(/\.0$/, "") + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  update();
}

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseFloat(entry.target.dataset.target));
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".count h3").forEach((el) => observer.observe(el));

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
    delay: 3000, 
    disableOnInteraction: false, 
  },
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 2, spaceBetween: 40 },
  },
});

// -----------------------underline-animation-----------------//
document.addEventListener("DOMContentLoaded", () => {
  const paths = document.querySelectorAll(".underline-path");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  paths.forEach((path) => {
    observer.observe(path);
  });
});
// ------------------------vellura-farm slider----------------//

var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true, 
  loop: true,
  freeMode: false,     
  navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
   autoplay: {
    delay: 3000,
    disableOnInteraction: false, 
  },
  keyboard: true,
  on: {
    slideChange: function () {
      document.querySelectorAll(".swiper-slide").forEach(slide => {
        slide.classList.remove("swiper-slide-active-center");
      });

      const activeSlide = this.slides[this.activeIndex];
      if (activeSlide) activeSlide.classList.add("swiper-slide-active-center");
    },
  },
});
// ------------gallery functionality------------//
const filterButtons = document.querySelectorAll(".gallery-filters button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

const lightbox = GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
  closeButton: true,   
  slideEffect: 'fade', 
  autoplayVideos: false,
});
// ------------gallery functionality------------//


// ------------Blogs---------------//
document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".blog-categories .btn");
  const blogPosts = document.querySelectorAll(".blog-post");

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // stops page refresh
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      blogPosts.forEach((post) => {
        if (filter === "all" || post.classList.contains(filter)) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  });
});
 
// ------------Blogs---------------//
