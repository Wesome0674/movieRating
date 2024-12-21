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
        slidesPerView: 1, // 1 carte pour les très petits écrans
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2, // 2 cartes pour les petits écrans
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3, // 3 cartes pour les écrans moyens
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 5, // 5 cartes pour les grands écrans
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
