document.addEventListener("DOMContentLoaded", function () {
    
  gsap.from(".pretitle", {
    opacity: 0,
    y: 50,
    duration: 3,
    ease: "power3.out",
  });

  gsap.from(".title", {
    opacity: 0,
    scale: 0.8,
    duration: 3,
    delay: 1,
    ease: "power3.out",
  });

  gsap.from(".subtitle", {
    opacity: 0,
    y: 25,
    duration: 3,
    delay: 1.5,
    ease: "power3.out",
  });

  // Duplicerar marquee-innehållret så det flyter på snyggt
  document.querySelectorAll(".marquee__inner").forEach(inner => {
    inner.innerHTML += inner.innerHTML;
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



