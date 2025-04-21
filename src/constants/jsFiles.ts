const lazy = `
let lazyMedias = ["img", "video", "iframe"];

const lazy_observer = new IntersectionObserver(callback, {
  rootMargin: "100px",
});

function callback(entries, lazy_observer) {
  entries.forEach((entry) => {
    const tagName = entry.target.tagName.toLowerCase();
    if (entry.isIntersecting) {
      if (!lazyMedias.find((name) => name === tagName)) {
        entry.target.style.background = entry.target.dataset.src;
        entry.target.style.backgroundSize = "cover";
      } else {
        entry.target.src = entry.target.dataset.src;
      }
      lazy_observer.unobserve(entry.target);
    }
  });
}

const targets = document.querySelectorAll(".lazy");
targets.forEach((target) => {
  lazy_observer.observe(target);
});
`

export const jsFiles = [
  { filename: "lazy.js", content: lazy },
];