import { keywordHandler } from "./dropdown-menus.js";
import { ingredientSearch, applianceSearch, ustensilSearch } from "./dropdown-search.js";

// Factory to add keywords in dropdown menus
export function dropDownFactory(data) {

    const dropDownMenuWrapper = document.querySelector('.drop-down-menus-wrapper');
    
    // Add ingredient keyword
    function addIngredient() {
        const ingredients = dropDownMenuWrapper.querySelector('.ingredients');
        const dropDownInput = ingredients.querySelector('input');
        const dropDownGrid = ingredients.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'keyword');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);

        div.addEventListener('click', keywordHandler);
        dropDownInput.addEventListener('input', ingredientSearch);
    }

    // Add appliance keyword
    function addAppliance() {
        const applicances = dropDownMenuWrapper.querySelector('.appliances');
        const dropDownInput = applicances.querySelector('input');
        const dropDownGrid = applicances.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'keyword');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);

        div.addEventListener('click', keywordHandler);
        dropDownInput.addEventListener('input', applianceSearch);
    }

    // Add ustensil keyword
    function addUstensil() {
        const ustensils = dropDownMenuWrapper.querySelector('.ustensils');
        const dropDownInput = ustensils.querySelector('input');
        const dropDownGrid = ustensils.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'keyword');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);

        div.addEventListener('click', keywordHandler);
        dropDownInput.addEventListener('input', ustensilSearch);
    }

    return {addIngredient, addAppliance, addUstensil};
}