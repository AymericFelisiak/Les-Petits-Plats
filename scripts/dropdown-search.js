import { ingredientsSet, appliancesSet, ustentilsSet } from "./index.js";
import { compareEntries, tagExists, newIngredientsKeywords, newAppliancesKeywords, newUstensilsKeywords, removeIngredientsKeywordsDOM, removeAppliancesKeywordsDOM , removeUstensilsKeywordsDOM } from "./utils.js";

let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];

export function ingredientSearch() {
    if(this.value.length > 0) {
        ingredientsList = [];
        ingredientsSet.forEach(ingredient => {
            if(compareEntries(ingredient, this.value) && tagExists(ingredient, 'ingredients') == false) {
                ingredientsList.push(ingredient);
            }
        });
        if(ingredientsList.length > 0) {
            removeIngredientsKeywordsDOM();
            newIngredientsKeywords(ingredientsList);
        }
    }
    else {
        removeIngredientsKeywordsDOM();
        newIngredientsKeywords(ingredientsSet);
    }
}

export function applianceSearch() {
    if(this.value.length > 0) {
        appliancesList = [];
        appliancesSet.forEach(appliance => {
            if(compareEntries(appliance, this.value)) {
                appliancesList.push(appliance);
            }
        });
        if(appliancesList.length > 0) {
            removeAppliancesKeywordsDOM();
            newAppliancesKeywords(appliancesList);
        }
    }
    else {
        removeAppliancesKeywordsDOM();
        newAppliancesKeywords(appliancesSet);
    }
}

export function ustensilSearch() {
    if(this.value.length > 0) {
        ustensilsList = [];
        ustentilsSet.forEach(ustensil => {
            if(compareEntries(ustensil, this.value)) {
                ustensilsList.push(ustensil);
            }
        });
        if(appliancesList.length > 0) {
            removeUstensilsKeywordsDOM();
            newUstensilsKeywords(ustensilsList);
        }
    }
    else {
        removeUstensilsKeywordsDOM();
        newUstensilsKeywords(ustentilsSet);
    }
}