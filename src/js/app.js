import {isWebP} from "./modules/functions.js";

isWebP();

const burgerBtn = document.querySelector('[data-burger]');
const menu = document.querySelector('[data-menu]');
burgerBtn.addEventListener('click' , () => {
    burgerBtn.classList.toggle('menu-open');
    menu.classList.toggle('menu-open');
});