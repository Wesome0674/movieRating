let likesButton = document.getElementById("likesButton");
let message = document.getElementById("message");
let messsageContainer = document.querySelector(".message-container");

function createLikeButton(film) {
  likesButton.innerHTML = "";

  let likeIcon = document.createElement("img");
  likeIcon.src = film.isMovieLiked
    ? "/assets/img/svg/likefill.svg"
    : "/assets/img/svg/like.svg";
  likeIcon.alt = "Like Icon";
  likeIcon.style.cursor = "pointer";
  likeIcon.classList.add("like-button");

  likeIcon.addEventListener("click", () => {
    const currentMovieId = film.id;
    let isLiked = film.isMovieLiked;

    if (!isLiked) {
      const newLikes = film.likes + 1;
      numberOfLikes.textContent = newLikes;
      likeIcon.src = "/assets/img/svg/likefill.svg";
      film.isMovieLiked = true;

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
          localStorage.setItem(
            `isLiked_${currentMovieId}`,
            JSON.stringify(true)
          ); // Mise à jour dans le localStorage
        })
        .catch(function (error) {
          console.error("Erreur lors de la mise à jour du film :", error);
        });
    } else {
      console.log("Already liked");
      messsageContainer.style.display = "block";
      message.textContent = "Vous avez déjà liké ce film";
      setTimeout(() => {
        messsageContainer.style.display = "none";
      }, 3000);
    }
  });

  likesButton.appendChild(likeIcon);
}
