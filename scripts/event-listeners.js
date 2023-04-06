export function addDropDownEventListener() {
    const dropDownMenus = document.querySelectorAll('.drop-down-button');
    
    dropDownMenus.forEach(menu => menu.addEventListener('click', dropDownEvent));

}

function dropDownEvent() {
    const dropDownContent = this.querySelector('.drop-down-content');
    const attribute = dropDownContent.getAttribute('class').split(' ');
    if(attribute.length == 2) {
        const newAttribute = attribute[0] + ' ' + attribute[1] + ' display';
        dropDownContent.setAttribute('class', newAttribute);
    }
    else {
        const newAttribute = attribute[0] + ' ' + attribute[1];
        dropDownContent.setAttribute('class', newAttribute);
    }
}