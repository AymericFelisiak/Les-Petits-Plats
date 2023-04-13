import { ingredientsSet, appliancesSet, ustentilsSet } from "./index.js";
import { compareEntries, removeKeywordsFromNode, tagExists, newIngredientsKeywords, newAppliancesKeywords, newUstensilsKeywords } from "./utils.js";

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
            removeKeywordsFromNode(this.parentElement.parentElement);
            newIngredientsKeywords(ingredientsList);
        }
    }
    else {
        removeKeywordsFromNode(this.parentElement.parentElement);
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
            removeKeywordsFromNode(this.parentElement.parentElement);
            newAppliancesKeywords(appliancesList);
        }
    }
    else {
        removeKeywordsFromNode(this.parentElement.parentElement);
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
            removeKeywordsFromNode(this.parentElement.parentElement);
            newUstensilsKeywords(ustensilsList);
        }
    }
    else {
        removeKeywordsFromNode(this.parentElement.parentElement);
        newUstensilsKeywords(ustentilsSet);
    }
}