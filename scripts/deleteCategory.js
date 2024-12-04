const deleteCatForm = document.getElementById("DeleteCategory");
let selectCatToDelete = document.getElementById("deleteCatInput");

let categoriesIdsOfMovies = [];

filmsData.forEach((movie) => {
  categoriesIdsOfMovies = [...categoriesIdsOfMovies, movie.categorieId];
});

categorieArray.forEach((cat) => {
  let options = document.createElement("option");
  options.value = cat.id;
  options.innerText = cat.name;
  selectCatToDelete.appendChild(options);
});

deleteCatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieData = new FormData(e.target);

  let catergorieInput = movieData.get("deleteCatInput");

  console.log(catergorieInput);

  console.table(catergorieInput);

  if (categoriesIdsOfMovies.includes(catergorieInput)) {
    console.log("cette catégorie contient des films.");
  } else {
    console.log("c'est bon le rho");
    axios
      .delete(
        `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories/${catergorieInput}`
      )
      .then((response) => {
        console.log("Catégorie supprimé avec succès:", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du film:", error);
      });
  }
});
