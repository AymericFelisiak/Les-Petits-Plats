import { tagList } from "./index.js";

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

export function removeFromTagList(name, type) {
    const length = tagList.length;
    for(let i = 0; i < length; i++) {
        if(tagList[i].name === name && tagList[i].type === type) {
            tagList.splice(i, 1);
            return;
        }
    }
}

export function pushToTagList(name, type) {
    tagList.push({
        name: name,
        type: type
    });
}