const swiper = new Swiper('.swiper', {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true, // Active la boucle
  loopFillGroupWithBlank: true, // Remplit les espaces restants avec des slides vides
  direction: 'horizontal',
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 1000, // Temps entre chaque mouvement (en millisecondes)
    disableOnInteraction: false, // Continue même après une interaction manuelle
  },
});
