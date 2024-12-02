let filmsCard = [];
let wrapper = document.getElementById("wrapper");

axios
  .get("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies")
  .then(function (response) {
    const res = response.data;
    console.log(res);
    res.forEach((element) => {
      filmsCard.push(element.img);
    });
    
    filmsCard.map((img) => {
      let card = document.createElement("div");
      card.classList.add("swiper-slide");
      card.classList.add("card");
      card.style.backgroundImage = `url(${img})`;  
      wrapper.appendChild(card);
    });
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {});
