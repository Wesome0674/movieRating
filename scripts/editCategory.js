const formCatEdit = document.getElementById("editCategoriyForm");
let selectorCatEdit = document.getElementById("editCatSelect");

let catEdit = document.getElementById("catEdit");

console.log(categorieArray);

categorieArray.forEach((cat) => {
  let options = document.createElement("option");
  options.value = cat.id;
  options.innerText = cat.name;
  selectorCatEdit.appendChild(options);
});

selectorCatEdit.addEventListener("change", (e) => {
  let selectedOption = e.target.selectedOptions[0];
  let selectedCatId = selectedOption.value;

  let selectedCatName = selectedOption.innerText;
  catEdit.value = selectedCatName;
  catEdit.dataset.catId = selectedCatId;
});

formCatEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieData = new FormData(e.target);

  let movieName = movieData.get("catEdit");
  let catId = catEdit.dataset.catId;

  const updatedMovieData = {
    name: movieName,
    id: catId,
  };

  console.table(updatedMovieData);

  axios
    .put(
      `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories/${catId}`,
      updatedMovieData
    )
    .then(function (response) {
      console.log("Film mis à jour avec succès", response.data);
    })
    .catch(function (error) {
      console.error("Erreur lors de la mise à jour du film", error);
    });
});
