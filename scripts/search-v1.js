import { recipes } from "../data/recipes.js";
import { removeDishes } from "./index.js";
import { init } from "./index.js";
import { searched } from "./index.js";
import { removeKeywordsDOM } from "./utils.js";
import { compareEntries } from "./utils.js";

// First version of search algorithm. Supposedly the slowest

let newRecipeList = [];
let searchLength = 0;
export const tagList = [];

// Adds listener to search bar
export function addSearchListeners() {
    const searchBar = document.querySelector('#searchbar');
    searchBar.addEventListener('input', searchBarEvent);
}

// Handler when user starts searching with searchbar
export function searchBarEvent() {

    const searchBarValue = document.querySelector('#searchbar').value;
    const currentSearchLength = searchBarValue.length;

    // If the user entered 3 or more letters
    if(currentSearchLength >= 3) {

        // If there wasn't any search before, searches in the original recipe list
        if(searchLength == 0 && tagList.length == 0) {
            recipes.forEach(recipe => {
                if(compareEntries(recipe.name, searchBarValue)) {
                    newRecipeList.push(recipe);
                }
                else if(compareEntries(recipe.description, searchBarValue)) {
                    newRecipeList.push(recipe);
                }
                else {
                    recipe.ingredients.every(ingredient => {
                        if(compareEntries(ingredient.ingredient, searchBarValue)) {
                            newRecipeList.push(recipe);
                            return;
                        }
                    });
                }
            });
        }

        // If there was a search before, will search in the current list
        else {

            // If there are more letters than previous research
            if(currentSearchLength > searchLength) {
                let tempRecipeList = [];
                newRecipeList.forEach(recipe => {
                    if(compareEntries(recipe.name, searchBarValue)) {
                        tempRecipeList.push(recipe);
                    }
                    else if(compareEntries(recipe.description, searchBarValue)) {
                        tempRecipeList.push(recipe);
                    }
                    else {
                        recipe.ingredients.every(ingredient => {
                            if(compareEntries(ingredient.ingredient, searchBarValue)) {
                                newRecipeList.push(recipe);
                                return;
                            }
                        });
                    }
                });
                newRecipeList = tempRecipeList;
            }
            // If there are less letters than previous research
            else {
                newRecipeList = [];
                recipes.forEach(recipe => {
                    if(compareEntries(recipe.name, searchBarValue)) {
                        newRecipeList.push(recipe);
                    }
                    else if(compareEntries(recipe.description, searchBarValue)) {
                        newRecipeList.push(recipe);
                    }
                    else {
                        recipe.ingredients.every(ingredient => {
                            if(compareEntries(ingredient.ingredient, searchBarValue)) {
                                newRecipeList.push(recipe);
                                return;
                            }
                        });
                    }
                });
            }
        }

        // If there results from previous search
        if(newRecipeList.length > 0) {
            // If there are tags, will search in the new list while filtering with tags
            if(tagList.length > 0) {
                tagList.forEach(tag => tagSearch(tag));
            }
            // No tags, then just display the list
            else {
                removeDishes();
                removeKeywordsDOM();
                searched(newRecipeList);
            }
        }
        // No items in list, the dish researched doesn't exist
        else {
            removeDishes();
            removeKeywordsDOM();
        }
        searchLength = currentSearchLength;
    }
    // If there are less than 3 letters in searchbar
    else {
        // Resets list and search length
        newRecipeList = [];
        searchLength = 0;
        // If there are tags, will filter original list with tags
        if(tagList.length > 0) {
            tagList.forEach(tag => tagSearch(tag));
        }
        // If there aren't any tags, display default page (original list)
        else {
            removeDishes();
            removeKeywordsDOM();
            init();
        }
    }
}

// Handler when a tag is added and when the user is using the searchbar
export function tagSearch(tag) {

    // If the list isn't empty (meaning a search was already ongoing)
    if(newRecipeList.length > 0) {
        let tempRecipeList = [];
        newRecipeList.forEach(recipe => {
            if(tag.type === 'ingredients') {
                if(ingredientTagSearch(recipe, tag)) {
                    tempRecipeList.push(recipe);
                }
            }
            else if(tag.type === 'appliances') {
                if(applianceTagSearch(recipe, tag)) {
                    tempRecipeList.push(recipe);
                }
            }
            else if(tag.type === 'ustensils') {
                if(ustensilTagSearch(recipe, tag)) {
                    tempRecipeList.push(recipe);
                }
            }
        });
        newRecipeList = tempRecipeList;
    }
    // If there wasn't any search
    else {
        newRecipeList = [];
        recipes.forEach(recipe => {
            if(tag.type === 'ingredients') {
                if(ingredientTagSearch(recipe, tag)) {
                    newRecipeList.push(recipe);
                }
            }
            else if(tag.type === 'appliances') {
                if(applianceTagSearch(recipe, tag)) {
                    newRecipeList.push(recipe);
                }
            }
            else if(tag.type === 'ustensils') {
                if(ustensilTagSearch(recipe, tag)) {
                    newRecipeList.push(recipe);
                }
            }
        });
    }
    removeDishes();
    removeKeywordsDOM();
    searched(newRecipeList);
}

// Return true if the recipe uses the ingredient from the tag
function ingredientTagSearch(recipe, tag) {
    for(const ingredient of recipe.ingredients) {
        if(compareEntries(ingredient.ingredient, tag.name)) {
            return true;
        }
    }
    return false;
}

// Return true if the recipe uses the appliance from the tag
function applianceTagSearch(recipe, tag) {
    if(compareEntries(recipe.appliance, tag.name)) {
        return true;
    }
    return false;
}

// Return true if the recipe uses the ustensil from the tag
function ustensilTagSearch(recipe, tag) {
    for(const ustensil of recipe.ustensils) {
        if(compareEntries(ustensil, tag.name)) {
            return true;
        }
    }
    return false;
}