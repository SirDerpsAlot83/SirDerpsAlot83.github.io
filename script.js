const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const luauCodeBlocks = document.querySelectorAll(".code-panel pre code");

const luauTokenClass = new Map([
  ["local", "keyword"],
  ["function", "keyword"],
  ["end", "keyword"],
  ["if", "keyword"],
  ["then", "keyword"],
  ["else", "keyword"],
  ["elseif", "keyword"],
  ["for", "keyword"],
  ["in", "keyword"],
  ["do", "keyword"],
  ["return", "keyword"],
  ["true", "constant"],
  ["false", "constant"],
  ["nil", "constant"],
  ["typeof", "builtin"],
  ["table", "builtin"],
  ["math", "builtin"],
]);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (luauCodeBlocks.length > 0) {
  const tokenPattern =
    /(--[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:local|function|end|if|then|else|elseif|for|in|do|return|true|false|nil|typeof|table|math)\b|\b\d+(?:\.\d+)?\b)/g;

  const escapeHtml = (value) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  for (const block of luauCodeBlocks) {
    const highlighted = escapeHtml(block.textContent).replace(tokenPattern, (token) => {
      let tokenClass = luauTokenClass.get(token);

      if (!tokenClass) {
        if (token.startsWith("--")) {
          tokenClass = "comment";
        } else if (token.startsWith('"') || token.startsWith("'")) {
          tokenClass = "string";
        } else {
          tokenClass = "number";
        }
      }

      return `<span class="luau-${tokenClass}">${token}</span>`;
    });

    block.innerHTML = highlighted;
  }
}
