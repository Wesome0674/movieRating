let openEditModal = document.querySelectorAll("#edit-button");
let editModal = document.getElementById("editModal");
let closeModal = document.querySelectorAll("#close-modal");
let playButton = document.getElementById("play-button");
let videoHome = document.querySelector(".video-home");
let closeButton = document.querySelector(".closeButton");


playButton.addEventListener("click", () => {
  videoHome.classList.add("fullscreen");
  closeButton.classList.add("showButton");
});

closeButton.addEventListener("click", () => {
  videoHome.classList.remove("fullscreen");
  closeButton.classList.remove("showButton");
});


openEditModal.forEach((button) => {
  button.addEventListener("click", () => {
    editModal.style.display = "block";
  });
});
closeModal.forEach((button) => {
  button.addEventListener("click", () => {
    editModal.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const tabLinks = document.querySelectorAll(".edit-list a");
  const tabContents = document.querySelectorAll(".tab-content .tab");

  tabLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      // Remove active class from all tabs and links
      tabLinks.forEach(link => link.parentElement.classList.remove("active"));
      tabContents.forEach(tab => tab.classList.remove("active"));

      // Add active class to the clicked tab and corresponding content
      const target = document.querySelector(this.getAttribute("href"));
      this.parentElement.classList.add("active");
      target.classList.add("active");
    });
  });
});