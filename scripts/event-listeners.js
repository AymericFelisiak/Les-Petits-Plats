import { tagFactory } from "./tag-factory.js";
import { tagExists, pushToTagList, removeTagFromList } from "./utils.js";
import { tagSearch, refreshSearchAfterTagRemoved } from "./search-v1.js";

let opened = false;

// Creates events for the dropdown menus
export function addDropDownEventListener() {
    const dropDownMenus = document.querySelectorAll('.drop-down-button');

    dropDownMenus.forEach(menu => menu.addEventListener('click', dropDownEvent));
}

// Creates new attribute to extend the menu
function expandMenu(node, attribute) {
    const newAttribute = attribute + ' display';
    node.setAttribute('class', newAttribute);
}

// Creates new attribute to retract the menu
function retractMenu(node, attribute) {
    const newAttribute = 'drop-down-content ' + getType(attribute);
    node.setAttribute('class', newAttribute);
}

// Handler when menu is clicked
function dropDownEvent() {
    if (!opened) {
        const dropDownContent = this.querySelector('.drop-down-content');
        const attribute = dropDownContent.getAttribute('class');

        if (attribute.split(' ').length == 2) {
            expandMenu(dropDownContent, attribute);
        }
        else {
            retractMenu(dropDownContent, attribute);
        }
        opened = true;
    }
    else {  // If a menu is already opened
        const dropDownMenuWrapper = document.querySelector('.drop-down-menus-wrapper');
        const expandedMenu = dropDownMenuWrapper.querySelector('.display');
        const expandedMenuAttribute = expandedMenu.getAttribute('class');

        if(this === expandedMenu.parentElement) {   // If the menu clicked is the one opened, closes the menu
            retractMenu(expandedMenu, expandedMenuAttribute);
            opened = false;
        }
        else {  // If this is not the same, closes the old one and opens the new one
            const newExpandedMenu = this.querySelector('.drop-down-content');
            const newExpandedMenuAttribute = newExpandedMenu.getAttribute('class');
            retractMenu(expandedMenu, expandedMenuAttribute);
            expandMenu(newExpandedMenu, newExpandedMenuAttribute);
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
        const tag = pushToTagList(keywordName, type);

        // Display wrapper if div doesn't have children
        if(!filterTagsWrapper.hasChildNodes()) {
            filterTagsWrapper.setAttribute('class', 'filter-tags-wrapper display');
        }

        const tagFactoryModel = tagFactory(keywordName, type);
        const tagDOM = tagFactoryModel.getTag();
        filterTagsWrapper.appendChild(tagDOM);
        tagSearch(tag);
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
    
    removeTagFromList(name, type);
    refreshSearchAfterTagRemoved();

    // Hide wrapper if div is empty
    if(!filterTagsWrapper.hasChildNodes()) {
        filterTagsWrapper.setAttribute('class', 'filter-tags-wrapper');
    }
}