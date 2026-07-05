(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  function getInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const isLight = theme === "light";
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isLight));
      const text = toggle.querySelector(".theme-toggle-text");
      if (text) text.textContent = isLight ? "Light mode" : "Dark mode";
    }

    if (metaTheme) {
      metaTheme.setAttribute("content", isLight ? "#f8fafc" : "#0f172a");
    }
  }

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
})();
