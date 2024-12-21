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
let likesButton = document.getElementById("likesButton");

let playButton = document.getElementById("play-button");
let videoHome = document.querySelector(".video-home");
let closeButton = document.querySelector(".closeButton");

let isLiked = false;
localStorage.setItem("isLiked", isLiked);

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

function createLikeButton() {
  likesButton.innerHTML = "";

  let likeIcon = document.createElement("img");
  likeIcon.src = "/assets/img/svg/like.svg";
  likeIcon.alt = "Like Icon";
  likeIcon.style.cursor = "pointer";
  likeIcon.classList.add("like-button");

  likeIcon.addEventListener("click", () => {
    const likes = parseInt(numberOfLikes.textContent, 10);
    let isLiked = JSON.parse(localStorage.getItem("isLiked"));

    if (!isLiked) {
      const currentMovieId = document.querySelector("#movie-title").dataset.id;
      console.log(`Current movie id: ${currentMovieId}`);
      const newLikes = likes + 1;
      numberOfLikes.textContent = newLikes;
      likeIcon.src = "/assets/img/svg/likefill.svg";
      console.log(`Current number of likes: ${newLikes}`);
      isLiked = true;
      localStorage.setItem("isLiked", JSON.stringify(isLiked)); 

      const content = {
        likes: newLikes,
      };

      axios
        .patch(
          `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/${currentMovieId}/like`,
          content
        )
        .then(function (response) {
          console.log("Like ajouté avec succès", response.data);
        })
        .catch(function (error) {
          console.error("Erreur lors de la mise à jour du film :", error);
        });
    } else {
      console.log("Already clicked");
    }
  });

  likesButton.appendChild(likeIcon);
}


function updateMovieDetails(film) {
  videoHeader.src = `${film.url}&autoplay=1&loop=1&controls=0&rel=0`;
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

  createLikeButton();
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

// Charger les films et catégories via API
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
        id: element.id,
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
    allMoviesItem.classList.add("body-font-500", "category-item", "underline");
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
