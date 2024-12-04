let addCategoryForm = document.getElementById("addCategoryForm");
let alreadyAdded = document.getElementById("added");

let catNameArray = [];

categorieArray.forEach((cat) => {
  catNameArray = [...catNameArray, cat.name];
  return categorieArray;
});

addCategoryForm.addEventListener("submit", (e) => {
  alreadyAdded.innerHTML = "";
  e.preventDefault();
  const formData = new FormData(e.target);
  let categorieAdded = formData.get("categorieAdded");

  if (catNameArray.includes(categorieAdded)) {
    alreadyAdded.innerHTML = "Catégorie deja ajouté";
  } else {
    alreadyAdded.innerHTML = "Catégorie ajouté !";
    axios
      .post("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories", {
        name: categorieAdded,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
