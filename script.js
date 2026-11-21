"use strict";

// The mobile navigation is enhanced with JavaScript; it stays usable without it.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
const mobileScreen = window.matchMedia("(max-width: 760px)");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.hidden = mobileScreen.matches && !open;
}

function updateNavigation() {
  menuButton.hidden = !mobileScreen.matches;
  setMenu(false);
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileScreen.matches && !navigation.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});
mobileScreen.addEventListener("change", updateNavigation);
updateNavigation();

document.querySelector("#year").textContent = new Date().getFullYear();

// Observe elements only when supported. Reduced-motion users see all content.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("is-waiting");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  if (!reducedMotion.matches) {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("is-waiting");
      revealObserver.observe(element);
    });
  }
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      document.querySelectorAll(".is-waiting").forEach((element) => {
        element.classList.remove("is-waiting");
      });
      revealObserver.disconnect();
    }
  });

  // Highlight the section currently in view in the navigation.
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll("a").forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });
  document.querySelectorAll("main > section").forEach((section) => sectionObserver.observe(section));
}
