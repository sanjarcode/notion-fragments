// Create kebab-case from heading text
function toKebab(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- 1. Find heading node matching fragment ---
function findHeadingByFragment(fragment, root = document) {
  if (!fragment) return null;

  const frag = fragment.startsWith("#") ? fragment.slice(1) : fragment;
  const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6");

  for (const h of headings) {
    const text = h.textContent.trim();
    if (!text) continue;

    if (toKebab(text) === frag) {
      return h;
    }
  }

  return null;
}

// --- 2. Intercept fragment-clicks and custom-scroll ---
function interceptFragmentClicks(root = document) {
  root.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    const url = new URL(a.href, location.href);
    const fragment = url.hash;

    if (!fragment) return; // normal behavior

    e.preventDefault();

    const target = findHeadingByFragment(fragment);
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    }
    // else — fragment not found → silently ignore
  });
}

interceptFragmentClicks();
