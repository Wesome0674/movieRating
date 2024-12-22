const filmsData = JSON.parse(localStorage.getItem("films"))
let deleteMovie = document.getElementById("deleteMovie");
const formDelete = document.getElementById("deleteFilmForm")

let selectorFilm = document.getElementById("movieInput");

filmsData.forEach((movie) => {
  let options = document.createElement("option");
  options.value = movie.id;
  options.innerText = movie.name;
  selectorFilm.appendChild(options);
});

formDelete.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieData = new FormData(e.target);

  let catergorieInput = movieData.get("movieInput");

  axios.delete(`https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/${catergorieInput}`)
  .then(response => {
    console.log('Film supprimé avec succès:', response.data);
    deleteMovie.innerHTML = "Film supprimé avec succès, redirection en cours...";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  })
  .catch(error => { 
    console.error('Erreur lors de la suppression du film:', error);
  });
});
