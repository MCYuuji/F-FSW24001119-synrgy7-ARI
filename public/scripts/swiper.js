const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 2.5,
  spaceBetween: 10,
  slidesPerGroup: 1,
  loopFillGroupWithBlank: true,
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    100: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 10,
    },
  },
});
