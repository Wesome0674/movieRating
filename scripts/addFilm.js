const addFilmForm = document.getElementById("addfilmForm");
const categorieArray = JSON.parse(localStorage.getItem("categories")) || [];
let addedMovie = document.getElementById("addedMovie");

let selector = document.getElementById("catergorieInput");

categorieArray.forEach((cat) => {
  let options = document.createElement("option");
  options.value = cat.id;
  options.innerText = cat.name;
  selector.appendChild(options);
});

addFilmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  let movieName = formData.get("movieName");
  let movieAuthor = formData.get("movieAuthor");
  let urlAffiche = formData.get("urlAffiche");
  let urlVideo = formData.get("urlVideo");
  let descriptionInput = formData.get("descriptionInput");
  let catergorieInput = formData.get("catergorieInput");

  axios
    .post(
      "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies",
      {
        name: movieName,
        author: movieAuthor,
        img: urlAffiche,
        category: catergorieInput,
        description: descriptionInput,
        video: urlVideo,
      }
    )
    .then(function (response) {
      console.log(response);
      addedMovie.innerHTML = "Film ajouté avec succès, redirection en cours...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    })
    .catch(function (error) {
      console.log(error);
    });
});
