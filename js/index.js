document.addEventListener("DOMContentLoaded", function () {
  // Duplicerar marquee-innehållret så det flyter på snyggt
  document.querySelectorAll(".marquee__inner").forEach(inner => {
    inner.innerHTML += inner.innerHTML;
  });

  fetch('img/hollywood-sign.svg')
  .then(res => res.text())
  .then(svgText => {
    const heroLogo = document.querySelector('.hero-logo');
    heroLogo.innerHTML = svgText;

    const circles = heroLogo.querySelectorAll('circle');
    console.log('Hittade cirklar:', circles.length); // Ska vara > 0

    circles.forEach((circle, i) => {
      circle.style.animation = `bulb-glow 4s ease-in-out infinite`;
      circle.style.animationDelay = `${(i * 0.08) % 2.5}s`;
    });
  });

});

/* Reveal elements on scroll */
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.8 });

  elements.forEach((el) => observer.observe(el));
});

// Calculate luminance of a color
function calculateLuminance(color) {
  const rgb = color.match(/\d+/g).map(Number); 
  const [r, g, b] = rgb.map((value) => {
    value /= 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b; 
}

/* Hide/show navbar on scroll */
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 20) {
    // Skrollar nedåt = göm navbaren
    gsap.to(navbar, { y: "-100%", duration: 0.3, ease: "power2.out" });
  } else {
    // Skrollar uppåt = visa navbaren
    gsap.to(navbar, { y: "0%", duration: 0.3, ease: "power2.out" });
  }

  lastScrollY = currentScrollY;
});

/* Change nav-bar depending on backgorund-color Using fuction above */
function updateNavbar() {
  const navbar = document.querySelector(".navbar");
  const navLinks = navbar.querySelectorAll(".navbar__links a");
  const sections = document.querySelectorAll("section");

  let matched = false;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const navHeight = navbar.offsetHeight;

    if (rect.top <= navHeight && rect.bottom >= navHeight) {
      matched = true;

      const theme = section.dataset.theme;
      const bg = section.dataset.navbarBg;

      if (bg) {
        navbar.style.setProperty("--navbar-bg", bg);
      }

      if (theme === "dark") {
        navbar.style.color = "white";
        navLinks.forEach(a => a.style.color = "white");
        navbar.querySelectorAll("img").forEach(img => img.style.filter = "invert(1)");
      } else {
        navbar.style.color = "";
        navLinks.forEach(a => a.style.color = "");
        navbar.querySelectorAll("img").forEach(img => img.style.filter = "");
      }
    }
  });

  if (!matched) {
    navbar.style.color = "";
  }
}

window.addEventListener("scroll", updateNavbar);
window.addEventListener("load", updateNavbar);



/* Hamburger menu */
const hamburger = document.getElementById("hamburger");
const fullscreenMenu = document.getElementById("fullscreen-menu");
const menuLinks = document.querySelectorAll(".navbar__link a");

hamburger.addEventListener("click", () => {
    fullscreenMenu.classList.toggle('active');
    hamburger.style.color = fullscreenMenu.classList.contains("active") ? "white" : "";
    hamburger.innerHTML = fullscreenMenu.classList.contains("active") ? "✕" : "☰";
});

// Close menu
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        fullscreenMenu.classList.remove("active");
        hamburger.style.color = fullscreenMenu.classList.contains("active") ? "white" : "";
        hamburger.innerHTML = fullscreenMenu.classList.contains("active") ? "✕" : "☰";
    });
});



