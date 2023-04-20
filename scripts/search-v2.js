import { recipes } from "../data/recipes.js";
import { removeDishes } from "./index.js";
import { init } from "./index.js";
import { searched } from "./index.js";
import { removeAllKeyWords } from "./utils.js";
import { compareEntries } from "./utils.js";
import { test } from "./utils.js";

// First version of search algorithm. Supposedly the slowest

let newRecipeList = [];
export const tagList = [];

// Adds listener to search bar
export function addSearchListeners() {
    const searchBar = document.querySelector('#searchbar');
    searchBar.addEventListener('input', search);
}

export function search() {
    const searchBar = document.querySelector('#searchbar');
    if(searchBar.value.length > 2) {
        if(newRecipeList.length > 0) {
            searchFromBar(newRecipeList, searchBar.value);
        }
        else searchFromBar(recipes, searchBar.value);
        if(tagList.length > 0) {
            tagFiltering(newRecipeList);
        }
        searched(newRecipeList);
    }
    else {
        if (tagList.length > 0) {
            tagFiltering(recipes);
            searched(newRecipeList);
        }
        else {
            newRecipeList = [];
            removeDishes();
            removeAllKeyWords();
            init();
        }
    }
}

function searchFromBar(recipeList, searchValue) {
    let i, length = recipeList.length, tempRecipeList = [];
    for(i = 0; i < length; i++) {
        const joinedIngredients = recipeList[i].ingredients.map(elm => elm.ingredient).join(',');
        if(test(recipeList[i].name, recipeList[i].description, joinedIngredients, searchValue)) {
            tempRecipeList.push(recipeList[i]);
        }
    }
    newRecipeList = tempRecipeList;
} 

function tagFiltering(recipeList) {
    let i, length = recipeList.length, tempRecipeList = [];
    for(i = 0; i < length; i++) {
        const recipe = recipeList[i];
        if(tagExists(recipe)) {
            tempRecipeList.push(recipe);
        }
    }
    newRecipeList = tempRecipeList;
}

function tagExists(recipe) {
    let i, length = tagList.length;
    for(i = 0; i < length; i++) {
        const tag = tagList[i];
        if(tag.type == 'ingredients') {
            return ingredientTagSearch(recipe, tag);
        }
        if(tag.type == 'appliances') {
            return applianceTagSearch(recipe, tag);
        }
        if(tag.type == 'ustensils') {
            return ustensilTagSearch(recipe, tag);
        }
    }
}

function ingredientTagSearch(recipe, tag) {
    const joinedIngredients = recipe.ingredients.map(elm => elm.ingredient).join(',');
    return compareEntries(joinedIngredients, tag.name);
}

function applianceTagSearch(recipe, tag) {
    return compareEntries(recipe.appliance, tag.name);
}

function ustensilTagSearch(recipe, tag) {
    return compareEntries(recipe.ustensils, tag.name);
}