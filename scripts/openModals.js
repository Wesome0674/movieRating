let openEditModal = document.getElementById("edit-button");
let editModal = document.getElementById("editModal");
let closeModal = document.getElementById("close-modal");

openEditModal.addEventListener("click", () => {
  editModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  editModal.style.display = "none";
});