import { removeTagHandler } from "./event-listeners.js";

// Creates tag when user clicks on a keyword
export function tagFactory(data, type) {
    const tagName = data;
    const tagClass = 'tag ' + type;


    function getTag() {

        const tag = document.createElement('div');
        tag.setAttribute('class', tagClass);

        const tagTitle = document.createElement('p');
        tagTitle.textContent = tagName;

        const icon = document.createElement('i');
        icon.setAttribute('class', 'fa-regular fa-circle-xmark');
        icon.addEventListener('click', removeTagHandler);

        tag.appendChild(tagTitle);
        tag.appendChild(icon);

        return (tag);
    }

    return {getTag};
}