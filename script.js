(function () {
  const ROUTES = ["home", "concept", "course", "drink", "chef", "space", "news", "reserve"];
  const main = document.getElementById("main");
  const sections = document.querySelectorAll("[data-route]");
  const navLinks = document.querySelectorAll("[data-route-link]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.querySelector(".nav");
  function setHeaderHeight() {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setHeaderHeight);

  function currentRoute() {
    const h = String(location.hash || "").replace(/^#\/?/, "");
    return ROUTES.includes(h) ? h : "home";
  }

  function render(animate) {
    const route = currentRoute();

    sections.forEach((section) => {
      section.classList.toggle("is-active", section.dataset.route === route);
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.routeLink === route);
    });

    if (animate && !prefersReducedMotion) {
      main.classList.remove("is-transitioning");
      void main.offsetWidth;
      main.classList.add("is-transitioning");
    }

    if (window.scrollY > 0) window.scrollTo(0, 0);
  }

  let lastRoute = currentRoute();
  window.addEventListener("hashchange", () => {
    const route = currentRoute();
    render(route !== lastRoute);
    lastRoute = route;
  });
  render(false);

  const form = document.getElementById("reserve-form");
  const done = document.getElementById("reserve-done");
  const resetBtn = document.getElementById("reserve-reset");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    done.style.display = "grid";
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    form.style.display = "grid";
    done.style.display = "none";
  });
})();
