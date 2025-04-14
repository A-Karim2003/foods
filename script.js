"use strict";
const POPULAR_MEALS_PATH = "./data/popular-meals.json";
const GALLERY_PATH = "./data/gallery.json";

const icons = document.querySelectorAll(".section-1-icons i");
const cardsContainer = document.querySelector(".card-container");
const GalleryContainer = document.querySelector(".Gallery-container");
const menu = document.querySelector(".menu");
const targets = document.querySelectorAll(".target");

//? add functionality for automatic icon change
let i = 0;
setInterval(() => {
  icons[i].classList.remove("change");
  i = (i + 1) % icons.length;
  icons[i].classList.add("change");
}, 3000);

//? Add functionality of retracting header

menu.addEventListener("click", () => {
  targets.forEach((target) => {
    target.classList.toggle("active");
  });
});

/*=================================================*/
//* use json to extract card data and append to DOM

async function fetchCardData(jsonPath, renderFunction, container) {
  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error("Could not fetch data.");
    const data = await res.json();
    renderFunction(data, container);
  } catch (error) {}
}
//* Renders popular meals
fetchCardData(POPULAR_MEALS_PATH, renderCards, cardsContainer);
fetchCardData(GALLERY_PATH, renderGalleryCards, GalleryContainer);

function renderCards(data, container) {
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
    container.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function renderGalleryCards(data, container) {
  data.forEach((meal) => {
    const galleryHTML = `
      <div class="gallery">
        <a href="#" class="gallery-link">
            <img src="${meal.image}" class="food-img">
            <h3 class="food-name">${meal.title}</h3>
            <p class="food-description">
            ${meal.description}
            </p>
        </a>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", galleryHTML);
  });
}

//? Implement intersection observer

const options = {
  root: null,
  threshold: 0,
  // rootMargin: 0,
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      targets.forEach((target) => {
        target.classList.add("active");
      });
    } else {
      console.log("Not intersecting");

      targets.forEach((target) => {
        target.classList.remove("active");
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);

const section1 = document.querySelector(".section-1"); // element being observed
observer.observe(section1);

//===========================================================================================
