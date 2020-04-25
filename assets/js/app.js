const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const exit = document.querySelector(".close-btn");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });
  exit.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });
};

navSlide();