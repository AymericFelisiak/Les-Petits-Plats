import { recipes } from "../data/recipes.js";
import { dishFactory } from "./dish-factory.js";
import { dropDownFactory } from "./dropdown-factory.js";
import { addDropDownEventListener } from "./event-listeners.js";
import { addSearchListeners } from "./search-v1.js";

export let ingredientsSet;
export let appliancesSet;
export let ustentilsSet;

export function removeDishes() {
    const sectionWrapper = document.querySelector('.section-wrapper');

    sectionWrapper.innerHTML = '';
}

export function addDishes(node) {
    const sectionWrapper = document.querySelector('.section-wrapper');

    sectionWrapper.appendChild(node);
}

export function searched(newRecipes) {
    const sectionWrapper = document.querySelector('.section-wrapper');
    let tempIngredientsList = [];
    let tempApplianceList = [];
    let tempUstensilList = [];
    newRecipes.forEach(recipe => {
        const dishModel = dishFactory(recipe);
        const dishCard = dishModel.getDishCardDOM();
        sectionWrapper.appendChild(dishCard);

        recipe.ingredients.forEach(ingredient => {
            tempIngredientsList.push(ingredient.ingredient);
        });

        tempApplianceList.push(recipe.appliance);

        recipe.ustensils.forEach(ustensil => tempUstensilList.push(ustensil));
    });

    ingredientsSet = [... new Set(tempIngredientsList)];
    appliancesSet = [... new Set(tempApplianceList)];
    ustentilsSet = [... new Set(tempUstensilList)];

    ingredientsSet.forEach(ingredient => {
        const dropDownModel = dropDownFactory(ingredient);
        dropDownModel.addIngredient();
    });

    appliancesSet.forEach(appliance => {
        const dropDownModel = dropDownFactory(appliance);
        dropDownModel.addAppliance();
    });

    ustentilsSet.forEach(ustensil => {
        const dropDownModel = dropDownFactory(ustensil);
        dropDownModel.addUstensil();
    });

    addDropDownEventListener();

    addSearchListeners();
}

export function init() {
    const sectionWrapper = document.querySelector('.section-wrapper');
    let tempIngredientsList = [];
    let tempApplianceList = [];
    let tempUstensilList = [];
    recipes.forEach(recipe => {
        const dishModel = dishFactory(recipe);
        const dishCard = dishModel.getDishCardDOM();
        sectionWrapper.appendChild(dishCard);

        recipe.ingredients.forEach(ingredient => {
            tempIngredientsList.push(ingredient.ingredient);
        });

        tempApplianceList.push(recipe.appliance);

        recipe.ustensils.forEach(ustensil => tempUstensilList.push(ustensil));
    });

    ingredientsSet = [... new Set(tempIngredientsList)];
    appliancesSet = [... new Set(tempApplianceList)];
    ustentilsSet = [... new Set(tempUstensilList)];

    ingredientsSet.forEach(ingredient => {
        const dropDownModel = dropDownFactory(ingredient);
        dropDownModel.addIngredient();
    });

    appliancesSet.forEach(appliance => {
        const dropDownModel = dropDownFactory(appliance);
        dropDownModel.addAppliance();
    });

    ustentilsSet.forEach(ustensil => {
        const dropDownModel = dropDownFactory(ustensil);
        dropDownModel.addUstensil();
    });

    addDropDownEventListener();

    addSearchListeners();
}

init();