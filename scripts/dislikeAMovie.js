let dislikesButton = document.getElementById("dislikesButton");

function createDislikeButton(film) {
  dislikesButton.innerHTML = "";

  let dislikeIcon = document.createElement("img");
  dislikeIcon.src = film.isMovieDisliked
    ? "/assets/img/svg/dislikefill.svg"
    : "/assets/img/svg/dislike.svg";
  dislikeIcon.alt = "Dislike Icon";
  dislikeIcon.style.cursor = "pointer";
  dislikeIcon.classList.add("dislike-button");

  dislikeIcon.addEventListener("click", () => {
    const currentMovieId = film.id;
    let isDisliked = film.isMovieDisliked;

    if (!isDisliked) {
      const newDislikes = film.dislikes + 1;
      numberOfDisLikes.textContent = newDislikes;
      dislikeIcon.src = "/assets/img/svg/dislikefill.svg";
      film.isMovieDisliked = true;

      const content = {
        dislikes: newDislikes,
      };

      axios
        .patch(
          `https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/${currentMovieId}/dislike`,
          content
        )
        .then(function (response) {
          console.log("Dislike ajouté avec succès", response.data);
          localStorage.setItem(
            `isDisliked_${currentMovieId}`,
            JSON.stringify(true)
          ); // Mise à jour dans le localStorage
        })
        .catch(function (error) {
          console.error("Erreur lors de la mise à jour du film :", error);
        });
    } else {
      console.log("Already disliked");
    }
  });

  dislikesButton.appendChild(dislikeIcon);
}