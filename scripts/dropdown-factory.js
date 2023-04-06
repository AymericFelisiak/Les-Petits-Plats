export function dropDownFactory(data) {

    const dropDownMenuWrapper = document.querySelector('.drop-down-menus-wrapper');
    
    function addIngredient() {
        const ingredients = dropDownMenuWrapper.querySelector('.ingredients');
        const dropDownGrid = ingredients.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'selectable-tag');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);
    }

    function addAppliance() {
        const applicances = dropDownMenuWrapper.querySelector('.appliances');
        const dropDownGrid = applicances.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'selectable-tag');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);
    }

    function addUstensil() {
        const ustensils = dropDownMenuWrapper.querySelector('.ustensils');
        const dropDownGrid = ustensils.querySelector('.drop-down-content');

        const div = document.createElement('div');
        div.setAttribute('class', 'selectable-tag');

        const p = document.createElement('p');
        p.textContent = data;
        
        div.appendChild(p);

        dropDownGrid.appendChild(div);
    }

    return {addIngredient, addAppliance, addUstensil};
}