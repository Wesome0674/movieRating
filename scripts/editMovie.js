const formEdit = document.getElementById("editMovieForm");
let selectorFilmEdit = document.getElementById("movieInputEdit");

let editName = document.getElementById("editName");
let editAuthor = document.getElementById("editAuthor");
let editUrl = document.getElementById("editUrl");
let editVideo = document.getElementById("editVideo");
let editDesc = document.getElementById("editDesc");
let editCat = document.getElementById("editcat");

categorieArray.forEach((cat) => {
  let options = document.createElement("option");
  options.value = cat.id;
  options.innerText = cat.name;
  editCat.appendChild(options);
});

filmsData.forEach((movie) => {
  let options = document.createElement("option");
  options.dataset.name = movie.name;
  options.dataset.author = movie.author;
  options.dataset.desc = movie.description;
  options.dataset.affiche = movie.img;
  options.dataset.category = movie.categorieId; 
  options.dataset.video = movie.url;
  options.value = movie.id;
  options.innerText = movie.name;
  selectorFilmEdit.appendChild(options);
});

selectorFilmEdit.addEventListener("change", (e) => {
  let selectedOption = e.target.selectedOptions[0];

  let selectedMovieName = selectedOption.dataset.name;
  let selectedMovieAuthor = selectedOption.dataset.author;
  let selectedMovieDescription = selectedOption.dataset.desc;
  let selectedMovieVideo = selectedOption.dataset.video;
  let selectedMovieUrl = selectedOption.dataset.affiche;
  let selectedMovieCat = selectedOption.dataset.category; 

  editName.value = selectedMovieName;
  editAuthor.value = selectedMovieAuthor;
  editUrl.value = selectedMovieUrl;
  editVideo.value = selectedMovieVideo;
  editDesc.value = selectedMovieDescription;

  editCat.value = selectedMovieCat; 
});

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieData = new FormData(e.target);
  
  let movieId = movieData.get("movieInputEdit"); 

  let movieName = movieData.get("movieNameEdit");
  let movieAuthor = movieData.get("movieAuthorEdit");
  let urlAffiche = movieData.get("urlAfficheEdit");
  let urlVideo = movieData.get("urlVideoEdit");
  let descriptionInput = movieData.get("descriptionInputEdit");
  let categoryInput = movieData.get("editcat"); 

  const updatedMovieData = {
    name: movieName,
    author: movieAuthor,
    img: urlAffiche,
    video: urlVideo,
    description: descriptionInput,
    category: categoryInput, 
  };

  console.table(updatedMovieData)

  axios
    .patch(
      `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/${movieId}`,
      updatedMovieData
    )
    .then(function (response) {
      console.log("Film mis à jour avec succès", response.data);
    })
    .catch(function (error) {
      console.error("Erreur lors de la mise à jour du film", error);
    });
});
