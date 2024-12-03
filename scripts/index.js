let filmsCard = [];
let wrapper = document.getElementById("wrapper");
let videoHeader = document.getElementById("video-header");
let numberOfLikes = document.getElementById("likes");
let numberOfDisLikes = document.getElementById("dislikes");
let description = document.getElementById("description");
let movieName = document.getElementById("movie-title");
let movieAuthor = document.getElementById("author");
let movieCategory = document.getElementById("movie-categorie");
let ratio = document.getElementById("ratio");
let categorieContainer = document.getElementById("categorie-container");

let playButton = document.getElementById("play-button");
let videoHome = document.querySelector(".video-home");
let closeButton = document.querySelector(".closeButton");

let swiper;
let categoryMap = {};

function initializeSwiper() {
  swiper = new Swiper(".swiper", {
    slidesPerView: 5,
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
  });

  swiper.el.addEventListener("mouseenter", function () {
    swiper.autoplay.stop();
  });

  swiper.el.addEventListener("mouseleave", function () {
    swiper.autoplay.start();
  });
}

function displayMovies(filmsToDisplay) {
  wrapper.innerHTML = "";

  filmsToDisplay.forEach((film) => {
    let card = document.createElement("div");
    card.classList.add("swiper-slide");
    card.classList.add("card");
    card.style.backgroundImage = `url(${film.img})`;

    card.dataset.videoUrl = film.url;
    card.dataset.name = film.name;
    card.dataset.likes = film.likes;
    card.dataset.dislikes = film.dislikes;
    card.dataset.description = film.description;
    card.dataset.author = film.author;
    card.dataset.categorieId = film.categorieId;
    card.dataset.ratio = Math.floor(
      (film.likes / (film.likes + film.dislikes)) * 100
    );

    wrapper.appendChild(card);

    card.addEventListener("click", () => {
      let videoUrl = card.dataset.videoUrl;
      videoHeader.src = `${videoUrl}&autoplay=1&loop=1&controls=0&rel=0`;

      numberOfLikes.textContent = card.dataset.likes;
      numberOfDisLikes.textContent = card.dataset.dislikes;
      description.textContent = card.dataset.description;
      movieName.textContent = card.dataset.name;
      movieAuthor.textContent = card.dataset.author;
      ratio.innerText = card.dataset.ratio;

      let categoryId = card.dataset.categorieId;
      movieCategory.textContent = categoryMap[categoryId];
    });
  });

  if (swiper) {
    swiper.destroy(true, true);
  }
  initializeSwiper();

  if (filmsToDisplay.length > 0) {
    let firstFilm = filmsToDisplay[0];
    videoHeader.src = `${firstFilm.url}&autoplay=1&loop=1&controls=0&rel=0`;
    numberOfLikes.textContent = firstFilm.likes;
    numberOfDisLikes.textContent = firstFilm.dislikes;
    description.textContent = firstFilm.description;
    movieName.textContent = firstFilm.name;
    movieAuthor.textContent = firstFilm.author;
    ratio.innerText = Math.floor(
      (firstFilm.likes / (firstFilm.likes + firstFilm.dislikes)) * 100
    );

    let categoryId = firstFilm.categorieId;
    movieCategory.textContent = categoryMap[categoryId];
  }
}

axios
  .get("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies")
  .then(function (response) {
    const res = response.data;

    res.forEach((element) => {
      filmsCard.push({
        img: element.img,
        url: element.video,
        name: element.name,
        likes: element.likes,
        dislikes: element.dislikes,
        description: element.description,
        categorieId: element.category,
        author: element.author,
      });
    });

    let categoryIds = filmsCard.map((film) => film.categorieId);

    axios
      .get(
        `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories?ids=${categoryIds.join(
          ","
        )}`
      )
      .then(function (categoryResponse) {
        let categories = categoryResponse.data;

        categories.forEach((category) => {
          categoryMap[category.id] = category.name;
        });
        categories.slice(0, 6).forEach((category) => {
          let cat = document.createElement("li");
          cat.classList.add("body-font-400");
          cat.classList.add("category-item");
          cat.id = category.id;
          cat.innerText = category.name;
          categorieContainer.appendChild(cat);
        });

        let allMoviesItem = document.createElement("li");
        allMoviesItem.classList.add(
          "body-font-500",
          "category-item",
          "underline"
        );
        allMoviesItem.id = "all";
        allMoviesItem.innerText = "All Movies";
        categorieContainer.prepend(allMoviesItem);

        displayMovies(filmsCard);

        document.querySelectorAll(".category-item").forEach((item) => {
          item.addEventListener("click", () => {
            if (item.id === "all") {
              movieCategory.textContent = "All Movies";
              displayMovies(filmsCard);
            } else {
              movieCategory.textContent = item.innerText;
              let selectedCategoryId = item.id;
              let filteredFilms = filmsCard.filter(
                (film) => film.categorieId === selectedCategoryId
              );
              displayMovies(filteredFilms);
            }

            document.querySelectorAll(".category-item").forEach((element) => {
              element.classList.remove("underline");
            });
            item.classList.add("underline");
          });
        });
      })
      .catch(function (error) {
        console.log("Erreur lors de la récupération des catégories:", error);
      });
  })
  .catch(function (error) {
    console.log("Erreur lors de la récupération des films:", error);
  })
  .finally(function () {});

// Bouton play
playButton.addEventListener("click", () => {
  videoHome.classList.add("fullscreen");
  closeButton.classList.add("showButton");
});

// Bouton de fermeture
closeButton.addEventListener("click", () => {
  videoHome.classList.remove("fullscreen");
  closeButton.classList.remove("showButton");
});

const editButton = document.getElementById("edit-button");
let editModal = document.getElementById("editModal");
let closeEdit = document.getElementById("close-modal");

editButton.addEventListener("click", () => {
  editModal.classList.add("editShow");
});

closeEdit.addEventListener("click", () => {
  editModal.classList.remove("editShow");
});

