import { tagList } from "./search-v1.js";
import { dropDownFactory } from "./dropdown-factory.js";

export function tagExists(name, type) {
    const length = tagList.length;
    if(length > 0) {
        for(let i = 0; i < length; i++) {
            if(tagList[i].name === name && tagList[i].type === type) {
                return true;
            }
        }
    }
    return false;
}

export function removeTagFromList(name, type) {
    const length = tagList.length;
    for(let i = 0; i < length; i++) {
        if(tagList[i].name === name && tagList[i].type === type) {
            tagList.splice(i, 1);
            return;
        }
    }
}

export function pushToTagList(name, type) {
    const tag = {name: name, type: type};
    tagList.push(tag);
}

export function compareEntries(data1, data2) {
    if(data1.toLowerCase().includes(data2.toLowerCase())) {
        return true;
    }
    return false;
}

export function compareRecipeToSearch(name, description, ingredients, searchValue) {
    name = name.toLowerCase();
    description = description.toLowerCase();
    ingredients = ingredients.toLowerCase();
    searchValue = searchValue.toLowerCase();
    if(name.includes(searchValue) 
        || description.includes(searchValue) 
        || ingredients.includes(searchValue)) {
            return true;
    }
    return false;
}

export function removeAllKeyWords() {
    const nodeList = document.querySelectorAll('.drop-down-content');
    nodeList.forEach(node => node.innerHTML = '');
}

export function removeKeywordsFromNode(node) {
    const nodeList = node.querySelectorAll('.drop-down-content');
    nodeList.forEach(node => node.innerHTML = '');
}

export function removeIngredientsKeywordsDOM() {
    const dropDownContent = document.querySelectorAll('.drop-down-content.ingredients');
    dropDownContent.forEach(node => node.innerHTML = '');
}

export function removeAppliancesKeywordsDOM() {
    const dropDownContent = document.querySelectorAll('.drop-down-content.appliances');
    dropDownContent.forEach(node => node.innerHTML = '');
}

export function removeUstensilsKeywordsDOM() {
    const dropDownContent = document.querySelectorAll('.drop-down-content.ustensils');
    dropDownContent.forEach(node => node.innerHTML = '');
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