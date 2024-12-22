const deleteCatForm = document.getElementById("DeleteCategory");
let selectCatToDelete = document.getElementById("deleteCatInput");
let deleted = document.getElementById("deleted");

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
    deleted.innerHTML = "Vous ne pouvez pas supprimer une catégorie qui contient des films";
  } else {
    console.log("c'est bon le rho");
    axios
      .delete(
        `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories/${catergorieInput}`
      )
      .then((response) => {
        console.log("Catégorie supprimé avec succès:", response.data);
        deleted.innerHTML = "Catégorie supprimé avec succès, redirection en cours...";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du film:", error);
      });
  }
});
