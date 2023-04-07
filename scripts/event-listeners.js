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