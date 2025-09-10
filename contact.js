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

  
  
  
  
  
  // contact page 

document.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.querySelectorAll(".contact1-box"));

  boxes.forEach((b, i) => b.dataset.index = i);
  const STAGGER_MS = 150;

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
    }, {
      root: null,
      rootMargin: "0px 0px -15% 0px",
      threshold: 0.15
    });

    boxes.forEach(b => io.observe(b));
  } else {
    // Fallback
    function triggerBottom() {
      return window.innerHeight * 0.85;
    }

    function checkBoxes() {
      boxes.forEach((box, idx) => {
        if (box.classList.contains("show")) return;
        const top = box.getBoundingClientRect().top;
        if (top < triggerBottom()) {
          box.style.setProperty("--delay", `${idx * STAGGER_MS}ms`);
          setTimeout(() => box.classList.add("show"), idx * STAGGER_MS);
        }
      });
    }

    window.addEventListener("scroll", checkBoxes, { passive: true });
    window.addEventListener("resize", checkBoxes);
    checkBoxes();
  }
});
