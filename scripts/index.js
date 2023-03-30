import { recipes } from "../data/recipes.js";
import { dishFactory } from "./dish-factory.js";

function init() {
    const sectionWrapper = document.querySelector('.section-wrapper');
    recipes.forEach(recipe => {
        const dish = dishFactory(recipe);
        const dishCard = dish.getDishCardDOM();
        sectionWrapper.appendChild(dishCard);
    });
}

init();