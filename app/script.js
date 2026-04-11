const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function updateThemeIcon() {
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.textContent = "☾";
  } else {
    themeIcon.textContent = "☀";
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateThemeIcon();
});

updateThemeIcon();