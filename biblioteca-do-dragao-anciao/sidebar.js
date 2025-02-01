const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".menu-lateral");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("menu-lateral--off");
});

document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (!sidebar.contains(clickedElement) && !menuBtn.contains(clickedElement)) {
    sidebar.classList.add("menu-lateral--off");
  }
});
