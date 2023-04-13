import { recipes } from "../data/recipes.js";
import { removeDishes } from "./index.js";
import { init } from "./index.js";
import { searched } from "./index.js";
import { removeKeywordsDOM } from "./utils.js";
import { compareEntries } from "./utils.js";

let search;

export function addSearchListeners() {
    const searchBar = document.querySelector('#searchbar');
    searchBar.addEventListener('input', searchEvent);
}

function searchEvent() {
    if(this.value.length >= 3) {
        search = true;
        const newList = [];
        recipes.forEach(recipe => {
            if(compareEntries(recipe.name, this.value)) {
                newList.push(recipe);
            }
            else if(compareEntries(recipe.description, this.value)) {
                newList.push(recipe);
            }
            else {
                recipe.ingredients.every(ingredient => {
                    if(compareEntries(ingredient.ingredient, this.value)) {
                        newList.push(recipe);
                        return;
                    }
                });
            }
        });

        if(newList.length > 0) {
            removeDishes();
            removeKeywordsDOM();
            searched(newList);
        }
        else {
            removeDishes();
            removeKeywordsDOM();
        }
    }
    else if(search){
        removeDishes();
        removeKeywordsDOM();
        init();
        search = false;
    }
}