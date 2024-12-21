let filmsCard = []; // tableau qui stocke les données des films
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


let categoryMap = {};

function updateMovieDetails(film) {
  let newurl = formatUrl(film.url, 1, 1, 0);
  videoHeader.src = newurl;
  numberOfLikes.textContent = film.likes;
  numberOfDisLikes.textContent = film.dislikes;
  description.textContent = film.description;
  movieName.textContent = film.name;
  movieName.dataset.id = film.id;
  movieAuthor.textContent = film.author;
  ratio.innerText = Math.floor(
    (film.likes / (film.likes + film.dislikes)) * 100
  );
  let categoryId = film.categorieId;
  movieCategory.textContent = categoryMap[categoryId];

  createLikeButton(film);
  createDislikeButton(film);
}

function displayMovies(filmsToDisplay) {
  wrapper.innerHTML = "";

  filmsToDisplay.forEach((film) => {
    let card = document.createElement("div");
    card.classList.add("swiper-slide", "card");
    card.style.backgroundImage = `url(${film.img})`;
    card.dataset.videoUrl = film.url;

    card.addEventListener("click", () => {
      updateMovieDetails(film);
    });

    wrapper.appendChild(card);
  });

  if (swiper) {
    swiper.destroy(true, true);
  }
  initializeSwiper();

  if (filmsToDisplay.length > 0) {
    updateMovieDetails(filmsToDisplay[0]);
  }
}

function loadFilms() {
  // Charger les films et catégories via API
  axios
    .get("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies")
    .then(function (response) {
      const res = response.data;

      res.forEach((element) => {
        element.isMovieLiked =
          JSON.parse(localStorage.getItem(`isLiked_${element.id}`)) || false;
        element.isMovieDisliked =
          JSON.parse(localStorage.getItem(`isDisliked_${element.id}`)) || false;
        filmsCard.push({
          img: element.img,
          url: element.video,
          name: element.name,
          likes: element.likes,
          dislikes: element.dislikes,
          description: element.description,
          categorieId: element.category,
          author: element.author,
          id: element.id,
          isMovieLiked: element.isMovieLiked,
          isMovieDisliked: element.isMovieDisliked,
        });
      });

      localStorage.setItem("films", JSON.stringify(filmsCard));

      let categoryIds = filmsCard.map((film) => film.categorieId);

      return axios.get(
        `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories?ids=${categoryIds.join(
          ","
        )}`
      );
    })
    .then(function (categoryResponse) {
      const categories = categoryResponse.data;

      localStorage.setItem("categories", JSON.stringify(categories));

      categories.forEach((category) => {
        categoryMap[category.id] = category.name;
      });

      // Afficher les catégories
      categories.slice(0, 6).forEach((category) => {
        let cat = document.createElement("li");
        cat.classList.add("body-font-400", "category-item");
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

      // Afficher les films
      displayMovies(filmsCard);

      // Ajouter des événements aux catégories
      document.querySelectorAll(".category-item").forEach((item) => {
        item.addEventListener("click", () => {
          if (item.id === "all") {
            movieCategory.textContent = "All Movies";
            displayMovies(filmsCard);
          } else {
            movieCategory.textContent = item.innerText;
            const filteredFilms = filmsCard.filter(
              (film) => film.categorieId === item.id
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
      console.log("Erreur lors de la récupération des données:", error);
    });
}

// Charger les films au chargement de la page
document.addEventListener("DOMContentLoaded", loadFilms);

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
