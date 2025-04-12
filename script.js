"use strict";

const icons = document.querySelectorAll(".section-1-icons i");

//? add functionality for automatic icon change
let i = 0;
setInterval(() => {
  icons[i].classList.remove("change");
  i = (i + 1) % icons.length;
  icons[i].classList.add("change");
}, 3000);
