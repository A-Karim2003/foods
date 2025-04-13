"use strict";

const icons = document.querySelectorAll(".section-1-icons i");
const cardContainer = document.querySelector(".card-container");

//? add functionality for automatic icon change
let i = 0;
setInterval(() => {
  icons[i].classList.remove("change");
  i = (i + 1) % icons.length;
  icons[i].classList.add("change");
}, 3000);

/*=================================================*/
//* use json to extract card data and append to DOM

async function fetchCardData() {
  try {
    const res = await fetch("./popular-meals.json");
    if (!res.ok) throw new Error("Could not fetch data.");
    const data = await res.json();
    renderCards(data);
  } catch (error) {}
}
fetchCardData();

function renderCards(data) {
  data.forEach((card) => {
    const cardHTML = `
      <div class="card">
          <img src="${card.image}" class="card-img">
          <h3 class="card-name">
              ${card.title}
          </h3>
          <button>Order Now</button>
      </div>
    `;
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}
