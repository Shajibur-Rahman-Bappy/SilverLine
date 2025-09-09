async function loadPart(id, file) {
  const el = document.getElementById(id);
  if (el) {
    const res = await fetch(file);
    el.innerHTML = await res.text();
  }
}

// Load header and footer
loadPart("header", "header.html");
loadPart("footer", "footer.html");




window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { // change 50 to how much scroll you want
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });



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

     // --- Fade in/out on scroll (robust) ---
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          el.classList.remove('out-view');
        } else {
          el.classList.remove('in-view');
          el.classList.add('out-view');
        }
      });
    }, {
      root: null,
      threshold: 0,              // trigger as soon as it touches viewport
      rootMargin: "0px 0px -10% 0px" // start a bit earlier
    });

    const title = document.getElementById('studioTitle');
    const images = document.querySelectorAll('.studio-image');
    io.observe(title);
    images.forEach(img => io.observe(img));

    // Ensure visible on first paint (in case some browsers delay IO callback)
    window.addEventListener('load', () => {
      [title, ...images].forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) el.classList.add('in-view');
      });
    });

    // --- Parallax (relative to the container) ---
    const container = document.getElementById('studio');

    function parallax() {
      const rect = container.getBoundingClientRect();
      const scrolledPastTop = Math.min(Math.max(-rect.top, 0), rect.height + window.innerHeight);
      images.forEach((img) => {
        const speed = parseFloat(img.dataset.speed) || 3;
        // Move up/down based on how far the container has scrolled through the viewport
        img.style.transform = `translateY(${scrolledPastTop / speed}px)`;
      });
    }
    // run on scroll + on load
    window.addEventListener('scroll', parallax, { passive: true });
    window.addEventListener('resize', parallax);
    window.addEventListener('load', parallax);

// Employee section
     const employeeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.info-image, .info-text').forEach(el => employeeObserver.observe(el));


    // Bussiness Section

    const businessObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("business-card")) {
            // add stagger delay for cards
            const cards = document.querySelectorAll(".business-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("in-view");
              }, index * 300); // 300ms delay each
            });
          } else {
            entry.target.classList.add("in-view");
          }
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll(".business-text, .business-card").forEach(el => businessObserver.observe(el));

 // Footer Section

    const backToTopBtn = document.getElementById("backToTop");

    window.onscroll = function () {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });



    // About us Page Section

// Scroll Fade-in
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // Parallax Tilt Effect
    const tiltElements = document.querySelectorAll('.tilt');
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        el.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });



      document.querySelectorAll('.story-img').forEach(img => {
    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  });




