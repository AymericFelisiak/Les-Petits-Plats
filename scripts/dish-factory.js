// Factory to create each dish card
export function dishFactory(data) {
    const {name, ingredients, time, description} = data;

    // Creates the list of ingredients and returns the node
    function ingredientsList() {
        const ingredientsList = document.createElement('div');
        let HTML = '<p>';
        for(let i = 0; i < ingredients.length; i++) {
            HTML = HTML + '<b>' + ingredients[i].ingredient + ': </b>'
                + ingredients[i].quantity;
            if('unit' in ingredients[i]) {
                HTML = HTML + ' ' + ingredients[i].unit + '<br>';
            }
            else HTML = HTML + '<br>';
        }
        HTML = HTML + '</p>';
        const p = document.createElement('p');
        p.innerHTML = HTML;
        ingredientsList.appendChild(p);
        return ingredientsList;
    }

    // Creates the dish card node. Returns the node.
    function getDishCardDOM() {
        const dishCard = document.createElement('article');
        dishCard.setAttribute('class', 'article-wrapper');

        const imgWrapper = document.createElement('div');
        imgWrapper.setAttribute('class', 'img-wrapper');

        const informationWrapper = document.createElement('div');
        informationWrapper.setAttribute('class', 'information-wrapper');

        const topWrapper = document.createElement('div');
        topWrapper.setAttribute('class', 'top-wrapper');

        const dishNameWrapper = document.createElement('div');
        dishNameWrapper.setAttribute('class', 'dish-name-wrapper');

        const dishName = document.createElement('h2');
        dishName.textContent = name;

        const cookingTimeWrapper = document.createElement('div');
        cookingTimeWrapper.setAttribute('class', 'cooking-time-wrapper');

        const clock = document.createElement('i');
        clock.setAttribute('class', 'fa-regular fa-clock');

        const timeNode = document.createElement('p');
        timeNode.setAttribute('class', 'time');
        timeNode.textContent = time + " min";

        const bottomWrapper = document.createElement('div');
        bottomWrapper.setAttribute('class', 'bottom-wrapper');

        const ingredientsListWrapper = ingredientsList();
        ingredientsListWrapper.setAttribute('class', 'ingredients-list-wrapper');

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.setAttribute('class', 'description-wrapper');

        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.textContent = description;

        descriptionWrapper.appendChild(descriptionParagraph);

        cookingTimeWrapper.appendChild(clock);
        cookingTimeWrapper.appendChild(timeNode);

        dishNameWrapper.appendChild(dishName);

        topWrapper.appendChild(dishNameWrapper);
        topWrapper.appendChild(cookingTimeWrapper);

        bottomWrapper.appendChild(ingredientsListWrapper);
        bottomWrapper.appendChild(descriptionWrapper);

        informationWrapper.appendChild(topWrapper);
        informationWrapper.appendChild(bottomWrapper);

        dishCard.appendChild(imgWrapper);
        dishCard.appendChild(informationWrapper);

        return (dishCard);
    }

    return {getDishCardDOM};
}