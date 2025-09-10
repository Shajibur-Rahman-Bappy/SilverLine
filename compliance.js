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

// Navbar scroll background
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// Back to top button
const backToTop = document.getElementById("backToTop");
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};
backToTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

 // Scroll Animation
    const cards = document.querySelectorAll(".card2");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card2 => observer.observe(card2));

    document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card2"));

  // assign index for stagger
  cards.forEach((c, i) => c.dataset.index = i);

  const STAGGER_MS = 150; // delay between each card

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = parseInt(el.dataset.index, 10) || 0;
          el.style.setProperty("--delay", `${idx * STAGGER_MS}ms`);
          el.classList.add("show");
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(c => io.observe(c));
  } else {
    // fallback if IO not supported
    function triggerBottom() {
      return window.innerHeight * 0.85;
    }

    function checkCards() {
      cards.forEach((card2, idx) => {
        if (card2.classList.contains("show")) return;
        const top = card2.getBoundingClientRect().top;
        if (top < triggerBottom()) {
          card2.style.setProperty("--delay", `${idx * STAGGER_MS}ms`);
          setTimeout(() => card2.classList.add("show"), idx * STAGGER_MS);
        }
      });
    }

    window.addEventListener("scroll", checkCards, { passive: true });
    window.addEventListener("resize", checkCards);
    checkCards();
  }
});
