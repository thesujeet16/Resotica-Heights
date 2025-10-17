document.addEventListener("DOMContentLoaded", () => {
  // ------------------------- Hero Swiper ------------------------ //
  const heroSwiperEl = document.querySelector(".mySwiper");
  if (heroSwiperEl) {
    const swiper = new Swiper(heroSwiperEl, {
      loop: true,
      speed: 1000,
      // autoplay: { delay: 5000, disableOnInteraction: false },
      on: {
        slideChange() {
          const index = this.realIndex;
          document
            .querySelectorAll(".paginationImg .circle-div")
            .forEach((el, i) => {
              el.classList.toggle("active", i === index);
              const num = el.querySelector(".number");
              if (num)
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
    if (firstCircle) {
      firstCircle.classList.add("active");
      const num = firstCircle.querySelector(".number");
      if (num) num.style.visibility = "hidden";
    }
  }

  // ------------------------- Counter ------------------------ //
  const counterElements = document.querySelectorAll(".count h3");
  if (counterElements.length) {
    function animateCounter(el, target, duration = 2000) {
      let startTime = null;
      const suffix = el.dataset.suffix || "";

      function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = target * progress;

        el.textContent =
          target >= 1000
            ? Math.floor(current) + suffix
            : current.toFixed(1).replace(/\.0$/, "") + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetValue = parseFloat(entry.target.dataset.target);
            if (!isNaN(targetValue)) {
              animateCounter(entry.target, targetValue, 4000);
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counterElements.forEach((el) => observer.observe(el));
  }

  // ------------------------- testimonial ------------------------ //
  const projectSwiperEl = document.querySelector(".projectSwiper");
  if (projectSwiperEl) {
    const swiper1 = new Swiper(projectSwiperEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // autoplay: { delay: 3000, disableOnInteraction: false },
      breakpoints: {
        768: { slidesPerView: 1, spaceBetween: 30 },
        1024: { slidesPerView: 2, spaceBetween: 40 },
      },
    });
  }

  // ------project------//
  const projectSwiperEl1 = document.querySelector(".projectSwiper1");
  if (projectSwiperEl1) {
    const swiper1 = new Swiper(projectSwiperEl1, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // autoplay: { delay: 3000, disableOnInteraction: false },
      breakpoints: {
        768: { slidesPerView: 1, spaceBetween: 30 },
        1024: { slidesPerView: 2, spaceBetween: 40 },
      },
    });
  }
  // ----------------------- Underline Animation -----------------//
  const paths = document.querySelectorAll(".underline-path");
  if (paths.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    paths.forEach((path) => observer.observe(path));
  }

  // ------------------------ Vellura Farm Slider ----------------//
  const velluraSwiperEl = document.querySelector(".mySwiper3");
  if (velluraSwiperEl) {
    const swiper3 = new Swiper(velluraSwiperEl, {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      freeMode: false,
      navigation: { nextEl: ".custom-next", prevEl: ".custom-prev" },
      pagination: { el: ".swiper-pagination", clickable: true },
      autoplay: { delay: 3000, disableOnInteraction: false },
      keyboard: true,
      on: {
        slideChange: function () {
          document.querySelectorAll(".swiper-slide").forEach((slide) => {
            slide.classList.remove("swiper-slide-active-center");
          });
          const activeSlide = this.slides[this.activeIndex];
          if (activeSlide)
            activeSlide.classList.add("swiper-slide-active-center");
        },
      },
    });
  }

  // ---------------------- Gallery Functionality ----------------//
  const filterButtons = document.querySelectorAll(".gallery-filters button");
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (filterButtons.length && galleryItems.length) {
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
  }

  // ---------------------- GLightbox ----------------//
  if (document.querySelector(".glightbox")) {
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      closeButton: true,
      slideEffect: "fade",
      autoplayVideos: false,
    });
  }

  // ---------------------- Blogs ----------------//
  const categoryButtons = document.querySelectorAll(".blog-categories .btn");
  const blogPosts = document.querySelectorAll(".blog-post");
  if (categoryButtons.length && blogPosts.length) {
    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
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
  }

  // ----------about-us--------------//
  function animateStats() {
    const stats = document.querySelectorAll(".percent");

    stats.forEach((stat) => {
      const target = +stat.getAttribute("data-percentage");
      const progressBar = stat.parentElement.querySelector(".progress-bar");
      let count = 0;
      const width = progressBar.parentElement.getAttribute("width");

      const interval = setInterval(() => {
        if (count < target) {
          count++;
          stat.textContent = count + "%";
          progressBar.setAttribute("width", (count / 100) * width);
        } else {
          clearInterval(interval);
        }
      }, 20);
    });
  }

  window.addEventListener("DOMContentLoaded", animateStats);
});
