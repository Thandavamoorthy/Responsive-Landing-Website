const toggleBtn = document.querySelector(".toggle-btn");
const menu = document.querySelector(".links");
const navLink = document.querySelectorAll(".nav-links");

toggleBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
})

navLink.forEach(e => e.addEventListener("click", function () {
    menu.classList.remove("active");
}))

