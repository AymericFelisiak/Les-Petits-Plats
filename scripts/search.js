import { recipes } from "../data/recipes.js";
import { removeDishes } from "./index.js";
import { init } from "./index.js";
import { searched } from "./index.js";
import { removeKeyWords } from "./index.js";

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
            if(compare(recipe.name, this.value)) {
                newList.push(recipe);
            }
            else if(compare(recipe.description, this.value)) {
                newList.push(recipe);
            }
            else {
                recipe.ingredients.every(ingredient => {
                    if(compare(ingredient.ingredient, this.value)) {
                        newList.push(recipe);
                        return;
                    }
                });
            }
        });

        if(newList.length > 0) {
            removeDishes();
            removeKeyWords();
            searched(newList);
        }
    }
    else if(search){
        removeDishes();
        removeKeyWords();
        init();
        search = false;
    }
}

function compare(data1, data2) {
    if(data1.toLowerCase().includes(data2.toLowerCase())) {
        return true;
    }
    return false;
}