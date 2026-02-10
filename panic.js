// Global panic key handler (works on all pages)
document.addEventListener("keydown", (e) => {
  const panicKey = localStorage.getItem("panicKey");
  const panicUrl = localStorage.getItem("panicUrl");

  if (!panicKey || !panicUrl) return;

  if (e.key.toLowerCase() === panicKey.toLowerCase()) {
    window.location.replace(panicUrl);
  }
});
