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

/* Change nav-bar depending on backgorund-color Using fuction above */
document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const navLinks = navbar.querySelectorAll("a");
  let matched = false;
  
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= navbar.offsetHeight && rect.bottom >= navbar.offsetHeight) {
      matched = true;
      const backgroundColor = getComputedStyle(section).backgroundColor;

      // Skippa om färgen är transparent (rgba(0,0,0,0))
      if (backgroundColor === "rgba(0, 0, 0, 0)") {
        navbar.style.backgroundColor = "transparent";
        return;
      }

      navbar.style.backgroundColor = backgroundColor;
      const luminance = calculateLuminance(backgroundColor);

      if (luminance < 0.5) {
        navbar.style.color = "white";
        const navImages = navbar.querySelectorAll("img");
        navLinks.forEach(link => {
          link.style.color = "white";
        });
        navImages.forEach((img) => {
          img.style.filter = "invert(1)";
        });
      } else {
        navbar.style.color = ""; 
        const navImages = navbar.querySelectorAll("img");
        navLinks.forEach(link => {
          link.style.color = "";
        });
        navImages.forEach((img) => {
          img.style.filter = ""; 
        });
      }
    }
  });
  
  if (!matched) {
    navbar.style.backgroundColor = "transparent";
  }
});



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



