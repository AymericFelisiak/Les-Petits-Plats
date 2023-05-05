import { tagList } from "./search-v2.js";
import { dropDownFactory } from "./dropdown-factory.js";

export function tagExists(name, type) {
    const length = tagList.length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            if (tagList[i].name === name && tagList[i].type === type) {
                return true;
            }
        }
    }
    return false;
}

export function removeFromTagList(name, type) {
    const length = tagList.length;
    for (let i = 0; i < length; i++) {
        if (tagList[i].name === name && tagList[i].type === type) {
            tagList.splice(i, 1);
            return;
        }
    }
}

export function addToTagList(name, type) {
    const tag = { name: name, type: type };
    tagList.push(tag);
}

export function compareEntries(data1, data2) {
    data1 = data1.toLowerCase();
    data2 = data2.toLowerCase();
    if (data1.includes(data2)) {
        return true;
    }
    return false;
}

export function compareRecipeToSearch(name, description, ingredients, searchValue) {
    name = name.toLowerCase();
    description = description.toLowerCase();
    searchValue = searchValue.toLowerCase();
    if (name.includes(searchValue) || description.includes(searchValue)) {
        return true;
    }
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i].ingredient.toLowerCase();
        if (ingredient.includes(searchValue)) {
            return true;
        }
    }
    return false;
}

export function removeAllKeyWords() {
    const nodeList = document.querySelectorAll('.drop-down-content');
    nodeList.forEach(node => node.innerHTML = '');
}

export function removeIngredientsKeywords() {
    const ingredientsDropDown = document.querySelector('.drop-down-content.ingredients');
    console.log(ingredientsDropDown);
    ingredientsDropDown.innerHTML = '';
}

export function removeAppliancesKeywords() {
    const ingredientsDropDown = document.querySelector('.drop-down-content.appliances');
    ingredientsDropDown.innerHTML = '';
}

export function removeUstensilsKeywords() {
    const ingredientsDropDown = document.querySelector('.drop-down-content.ustensils');
    ingredientsDropDown.innerHTML = '';
}

export function newIngredientsKeywords(list) {
    list.forEach(ingredient => {
        const dropDownModel = dropDownFactory(ingredient);
        dropDownModel.addIngredient();
    });
}

export function newAppliancesKeywords(list) {
    list.forEach(appliance => {
        const dropDownModel = dropDownFactory(appliance);
        dropDownModel.addAppliance();
    });
}

export function newUstensilsKeywords(list) {
    list.forEach(ustensil => {
        const dropDownModel = dropDownFactory(ustensil);
        dropDownModel.addUstensil();
    });
}