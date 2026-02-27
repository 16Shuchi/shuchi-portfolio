const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("primaryNav");
const navLinks = nav.querySelectorAll("a");
const header = document.querySelector(".site-header");
const sections = document.querySelectorAll("main section[id]");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
});

const setActiveLink = () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

const skillBars = document.querySelectorAll(".skill-bar span");
const revealItems = document.querySelectorAll(
  ".hero-image-card, .hero-content, .about .container, .skill-item, .experience .card, .projects .card, .contact .container"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item, i) => {
  item.style.transitionDelay = `${Math.min(i * 40, 280)}ms`;
  revealObserver.observe(item);
});

const skillObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const progress = bar.getAttribute("data-progress") || "0";
      bar.style.width = `${progress}%`;
      obs.unobserve(bar);
    });
  },
  { threshold: 0.35 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

document.getElementById("year").textContent = new Date().getFullYear();
