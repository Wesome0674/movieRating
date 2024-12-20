let searchForm = document.getElementById("search-input");
let searchPanel = document.querySelector(".search-panel");
const container = document.getElementById("film-search-container");
let notFound = document.getElementById("notFound");
let backHome = document.querySelector(".backHome");
let clearInput = document.getElementById("clearInput");
let searchIn = document.getElementById("searchIn");
let filterInput = document.getElementById("filterInput");
let sideContainer = document.querySelector(".sideSearch");
let listOfCategories = document.getElementById("cactegoryList");
let mostLiked = document.getElementById("mostLiked");
let mostDisliked = document.getElementById("mostDisliked");
let results = document.getElementById("results");
let catOfMovies = [];
let moreCat = document.querySelector(".moreCat");

let filmdataSearch = JSON.parse(localStorage.getItem("films")) || [];

filmdataSearch.forEach((film) => {
  catOfMovies = [...catOfMovies, film.categorieId];
});

searchPanel.style.display = "none";
notFound.style.display = "none";
sideContainer.style.display = "none";

const displayFilteredFilms = (filteredFilms) => {
  container.innerHTML = "";
  if (filteredFilms.length === 0) {
    notFound.style.display = "flex";
  } else {
    notFound.style.display = "none";
    filteredFilms.forEach((film) => {
      let img = document.createElement("img");
      img.classList.add("card");
      img.id = film.categorieId;
      img.style.backgroundImage = `url(${film.img})`;
      container.appendChild(img);
    });
  }
};

searchForm.addEventListener("click", () => {
  searchPanel.style.display = "flex";
  notFound.style.display = "none";
});

backHome.addEventListener("click", () => {
  searchPanel.style.display = "none";
  notFound.style.display = "none";
});

searchForm.addEventListener("keyup", (e) => {
  let inputOfuser = e.target.value.toLowerCase();

  const filteredFilms = filmdataSearch.filter(
    (film) =>
      film.name.toLowerCase().includes(inputOfuser) ||
      film.author.toLowerCase().includes(inputOfuser)
  );

  displayFilteredFilms(filteredFilms);
  results.textContent = filteredFilms.length;
});

clearInput.addEventListener("click", () => {
  searchIn.value = "";
  displayFilteredFilms([]);
});

filterInput.addEventListener("click", () => {
  if (
    sideContainer.style.display === "none" ||
    sideContainer.style.display === ""
  ) {
    sideContainer.style.display = "block";
  } else {
    sideContainer.style.display = "none";
  }
});

moreCat.addEventListener("click", () => {
  searchPanel.style.display = "flex";
  sideContainer.style.display = "block";
});

categorieArray.forEach((cat) => {
  let list = document.createElement("li");
  list.innerHTML = cat.name;
  list.classList.add("body-font-500");
  list.style.color = "white";
  listOfCategories.appendChild(list);
  list.id = cat.id;

  list.addEventListener("click", () => {
    const filteredFilms = filmdataSearch.filter((film) =>
      film.categorieId.includes(list.id)
    );
    displayFilteredFilms(filteredFilms);
    results.textContent = filteredFilms.length;
  });
});

mostLiked.addEventListener("click", () => {
  const filteredFilms = filmdataSearch
    .sort((current, previous) => previous.likes - current.likes)
    .slice(0, 5);
  displayFilteredFilms(filteredFilms);
  results.textContent = filteredFilms.length;
});

mostDisliked.addEventListener("click", () => {
  const filteredFilms = filmdataSearch
    .sort((current, previous) => current.likes - previous.likes)
    .slice(0, 5);
  displayFilteredFilms(filteredFilms);
  results.textContent = filteredFilms.length;
});
