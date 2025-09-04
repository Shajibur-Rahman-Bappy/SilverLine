function initCarousel(slider, hasThumbs = false) {
  const slides = slider.querySelectorAll(".slide");
  const thumbs = hasThumbs ? slider.querySelectorAll(".thumbnails img") : [];
  let current = 0;
  const interval = 10000; // 10s

  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.classList.remove("active");
      if (idx === i) {
        s.classList.add("active");

        // Restart zoom animation
        const img = s.querySelector("img");
        img.style.animation = "none";
        void img.offsetWidth;
        img.style.animation = `zoom ${interval}ms ease-in-out forwards`;

        // Restart fade text animation
        const txt = s.querySelector(".text-content");
        txt.style.animation = "none";
        void txt.offsetWidth;
        txt.style.animation = `fadeText ${interval}ms ease-in-out forwards`;
      }
    });

    if (hasThumbs) {
      thumbs.forEach((t, idx) => t.classList.toggle("active", idx === i));
    }
    current = i;
  }

  if (hasThumbs) {
    thumbs.forEach(t => {
      t.addEventListener("click", () => {
        const index = parseInt(t.dataset.index);
        showSlide(index);
      });
    });
  }

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, interval);

  // Start first slide
  showSlide(current);
}

// Init carousels
document.querySelectorAll(".slider").forEach(slider => initCarousel(slider));
document.querySelectorAll(".slider-with-thumbs").forEach(slider => initCarousel(slider, true));


// brands

let logos = document.querySelectorAll('.logo-container img');
    let index = 0;

    function showNextLogo() {
      logos.forEach(img => img.classList.remove('active'));
      logos[index].classList.add('active');
      index = (index + 1) % logos.length; // loop back
    }

    // First logo active
    showNextLogo();

    // Change every 2 seconds
    setInterval(showNextLogo, 2000);



    // Product Section

      function revealOnScroll(elements, className) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.classList.remove("hide");
          } else {
            entry.target.classList.remove("show");
            entry.target.classList.add("hide");
          }
        });
      }, { threshold: 0.2 });

      elements.forEach(el => observer.observe(el));
    }

    document.addEventListener("DOMContentLoaded", () => {
      const title = document.querySelectorAll(".section-title");
      const cards = document.querySelectorAll(".card");

      revealOnScroll(title, "show");
      revealOnScroll(cards, "show");
    });