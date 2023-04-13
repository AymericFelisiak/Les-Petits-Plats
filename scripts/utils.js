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
    return tag;
}

export function compareEntries(data1, data2) {
    if(data1.toLowerCase().includes(data2.toLowerCase())) {
        return true;
    }
    return false;
}

export function removeKeywordsDOM() {
    const nodeList = document.querySelectorAll('.drop-down-content');
    nodeList.forEach(node => node.innerHTML = '');
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