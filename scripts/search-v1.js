import { recipes } from "../data/recipes.js";
import { removeDishes } from "./index.js";
import { init } from "./index.js";
import { searched } from "./index.js";
import { removeAllKeyWords } from "./utils.js";
import { compareEntries, compareRecipeToSearch } from "./utils.js";

// First version of search algorithm. Supposedly the slowest

let newRecipeList = [];
let searchLength = 0;
export const tagList = [];

// Adds listener to search bar
export function addSearchListeners() {
    const searchBar = document.querySelector('#searchbar');
    searchBar.addEventListener('input', search);
}

// Search function for tags and searchbar
export function search() {
    const searchBar = document.querySelector('#searchbar');
    const currentSearchLength = searchBar.value.length;

    // If more than 2 letters in search bar
    if(currentSearchLength > 2) {
        // If newRecipeList isn't empty and current search has more letter than previous then search the current list
        if(newRecipeList.length > 0 && currentSearchLength > searchLength) {
            searchFromBar(newRecipeList, searchBar.value);
        }   // If user removes letter then search from default list
        else searchFromBar(recipes, searchBar.value);

        // If tags were selected, filters the search
        if(tagList.length > 0) {
            tagFiltering(newRecipeList);
        }
        searched(newRecipeList);
        searchLength = currentSearchLength;
    }

    // If less than 3 letters
    else {
        // If tags were selected, filters the default list to search from tags
        if (tagList.length > 0) {
            tagFiltering(recipes);
            searched(newRecipeList);
        }
        // If nothing is selected and there's no search, resets to default page
        else {
            newRecipeList = [];
            removeDishes();
            removeAllKeyWords();
            init();
        }
        searchLength = 0;
    }
}

// Function populating the new list of recipes from user input through searchbar
function searchFromBar(recipeList, searchValue) {
    let tempRecipeList = [];
    recipeList.forEach(recipe => {
        const joinedIngredients = recipe.ingredients.map(elm => elm.ingredient).join(',');
        if(compareRecipeToSearch(recipe.name, recipe.description, joinedIngredients, searchValue)) {
            tempRecipeList.push(recipe);
        }
    })
    newRecipeList = tempRecipeList;
} 

// Function populating the new list of recipes from user selected tags
function tagFiltering(recipeList) {
    let tempRecipeList = [];
    recipeList.forEach(recipe => {
        if(searchRecipesWithTag(recipe)) {
            tempRecipeList.push(recipe);
        }
    });
    newRecipeList = tempRecipeList;
}

// Return true if recipes matches with all the selected tags
function searchRecipesWithTag(recipe) {
    let ok = 0;
    tagList.forEach(tag => {
        const value = getRecipeValueFromTagType(recipe, tag.type);
        if(compareEntries(value, tag.name)) {
            ok++;
        }
    });
    if(ok == tagList.length) {
        return true;
    }
    return false;
}

// Returns string value of the recipe matching the tag type
function getRecipeValueFromTagType(recipe, tagType) {
    let value;
    if(tagType == 'ingredients') {
        value = recipe.ingredients.map(ingredients => ingredients.ingredient).join('');
        return value;
    }
    if(tagType == 'appliances') {
        value = recipe.appliance;
        return value;
    }
    if(tagType == 'ustensils') {
        value = recipe.ustensils.join('');
        return value;
    }
    return 'Error tag type';
}