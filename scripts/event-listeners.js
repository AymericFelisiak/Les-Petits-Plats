import { tagFactory } from "./tag-factory.js";
import { tagExists, pushToTagList, removeFromTagList } from "./utils.js";

let opened = false;

// Creates events for the dropdown menus
export function addDropDownEventListener() {
    const dropDownMenus = document.querySelectorAll('.drop-down-button');

    dropDownMenus.forEach(menu => menu.addEventListener('click', dropDownEvent));
}

// Creates new attribute to extend the menu
function expandMenu(headerNode, dropDownNode, attribute) {
    const newAttribute = attribute + ' display';
    const type = getType(attribute);
    const input = headerNode.querySelector('input');
    dropDownNode.setAttribute('class', newAttribute);
    headerNode.setAttribute('class', 'drop-down-header expanded');

    if(type == 'ingredients') {
        input.setAttribute('placeholder', 'Rechercher un ingrédient');
    }
    else if(type == 'appliances') {
        input.setAttribute('placeholder', 'Rechercher un appareil');
    }
    else input.setAttribute('placeholder', 'Rechercher un ustensil');
}

// Creates new attribute to retract the menu
function retractMenu(headerNode, dropDownNode, attribute) {
    const type = getType(attribute);
    const input = headerNode.querySelector('input');
    const newAttribute = 'drop-down-content ' + type;
    dropDownNode.setAttribute('class', newAttribute);
    headerNode.setAttribute('class', 'drop-down-header');

    if(type == 'ingredients') {
        input.setAttribute('placeholder', 'Ingrédients');
    }
    else if(type == 'appliances') {
        input.setAttribute('placeholder', 'Appareils');
    }
    else input.setAttribute('placeholder', 'Ustensils');
}

// Handler when menu is clicked
function dropDownEvent() {
    if (!opened) {
        const dropDownContent = this.querySelector('.drop-down-content');
        const dropDownHeader = this.querySelector('.drop-down-header');
        const attribute = dropDownContent.getAttribute('class');

        if (attribute.split(' ').length == 2) {
            expandMenu(dropDownHeader, dropDownContent, attribute);
        }
        else {
            retractMenu(dropDownHeader, dropDownContent, attribute);
        }
        opened = true;
    }
    else {  // If a menu is already opened
        const dropDownMenuWrapper = document.querySelector('.drop-down-menus-wrapper');
        const expandedMenu = dropDownMenuWrapper.querySelector('.display');
        const expandedMenuAttribute = expandedMenu.getAttribute('class');
        const dropDownHeader = this.querySelector('.drop-down-header');

        if(this === expandedMenu.parentElement) {   // If the menu clicked is the one opened, closes the menu
            retractMenu(dropDownHeader, expandedMenu, expandedMenuAttribute);
            opened = false;
        }
        else {  // If this is not the same, closes the old one and opens the new one
            const newExpandedMenu = this.querySelector('.drop-down-content');
            const newExpandedMenuAttribute = newExpandedMenu.getAttribute('class');
            const expandedHeader = document.querySelector('.expanded');

            retractMenu(expandedHeader, expandedMenu, expandedMenuAttribute);
            expandMenu(dropDownHeader, newExpandedMenu, newExpandedMenuAttribute);
        }
    }
}

// Returns type of the menu clicked : ingredients, appliances or ustensils
function getType(attribute) {
    const array = attribute.split(' ');
    let type;
    array.forEach(attribute => {
        if (attribute === 'ingredients' || attribute === 'appliances' || attribute === 'ustensils') {
            type = attribute;
        }
    });
    return type;
}

// Function handling click on keyword, adds tag
export function keywordHandler() {
    const filterTagsWrapper = document.querySelector('.filter-tags-wrapper');
    const parentAttribute = this.parentElement.getAttribute('class').split(' ');
    const type = parentAttribute[1];

    const keywordName = this.querySelector('p').textContent;

    if(!tagExists(keywordName, type)) {
        pushToTagList(keywordName, type);

        // Display wrapper if div doesn't have children
        if(!filterTagsWrapper.hasChildNodes()) {
            filterTagsWrapper.setAttribute('class', 'filter-tags-wrapper display');
        }

        const tagFactoryModel = tagFactory(keywordName, type);
        const tag = tagFactoryModel.getTag();
        filterTagsWrapper.appendChild(tag);
    }
}

// Function handling click on xmark to remove a tag
export function removeTagHandler() {
    const filterTagsWrapper = document.querySelector('.filter-tags-wrapper');
    const parent = this.parentElement;
    const name = parent.querySelector('p').textContent;
    const attribute = parent.getAttribute('class').split(' ');
    const type = attribute[1];

    filterTagsWrapper.removeChild(parent);
    
    removeFromTagList(name, type);

    // Hide wrapper if div is empty
    if(!filterTagsWrapper.hasChildNodes()) {
        filterTagsWrapper.setAttribute('class', 'filter-tags-wrapper');
    }
}