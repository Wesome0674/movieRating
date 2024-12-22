let swiper;

function initializeSwiper() {
  swiper = new Swiper(".swiper", {
    slidesPerView: 5, // Valeur par défaut
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 2, 
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2, 
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 5, 
        spaceBetween: 30,
      },
    },
  });

  swiper.el.addEventListener("mouseenter", function () {
    swiper.autoplay.stop();
  });

  swiper.el.addEventListener("mouseleave", function () {
    swiper.autoplay.start();
  });
}
