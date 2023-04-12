import { keywordHandler } from "./event-listeners.js";

// Factory to add keywords in dropdown menus
export function dropDownFactory(data) {

    const dropDownMenuWrapper = document.querySelector('.drop-down-menus-wrapper');
    
    // Add ingredient keyword
    function addIngredient() {
        const ingredients = dropDownMenuWrapper.querySelector('.ingredients');
        const dropDownGrid = ingredients.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'keyword');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);

        div.addEventListener('click', keywordHandler);
    }

    // Add appliance keyword
    function addAppliance() {
        const applicances = dropDownMenuWrapper.querySelector('.appliances');
        const dropDownGrid = applicances.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'keyword');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);

        div.addEventListener('click', keywordHandler);
    }

    // Add ustensil keyword
    function addUstensil() {
        const ustensils = dropDownMenuWrapper.querySelector('.ustensils');
        const dropDownGrid = ustensils.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'keyword');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);

        div.addEventListener('click', keywordHandler);
    }

    return {addIngredient, addAppliance, addUstensil};
}