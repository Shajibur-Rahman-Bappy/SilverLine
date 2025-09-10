
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



// Reveal on scroll
function revealOnScroll() {
  const elements = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


