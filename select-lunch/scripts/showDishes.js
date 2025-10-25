import { allDishes } from "./dishes.js";
const headerTag = document.getElementsByTagName('header')[0];
const mainTag = document.getElementsByTagName('main')[0];
const sectionSoupsTag = document.getElementById('section-soups');
const sectionMainDishesTag = document.getElementById(`section-main-dishes`);
const sectionSaladsTag = document.getElementById(`section-salads`);
const sectionDrinksTag = document.getElementById('section-drink');
const sectionDesertsTag = document.getElementById('section-deserts');


export const containersForCategoryDishes = {
    'soup': createDishContainer('soup'),
    'main-course': createDishContainer('main-course'),
    'salad': createDishContainer('salad'),
    'drink': createDishContainer('drink'),
    'dessert': createDishContainer('dessert')
}

export const filtersContainers = {
    'soupFilter': createContainerWithFilters('soup'),
    'main-courseFilter': createContainerWithFilters('main-course'),
    'saladFilter': createContainerWithFilters('salad'),
    'drinkFilter': createContainerWithFilters('drink'),
    'dessertFilter':  createContainerWithFilters('dessert')
}

function createContainerWithFilters(category) {
    // создаём контейнер, который будет наполнен опциями
    let container = document.createElement('div');
    //

    // Создаём опцию отображения всех блюд
    container.classList = ['container-filters'];
    let allElements = document.createElement('a');
    allElements.setAttribute('data-kind', 'all');
    allElements.innerText = 'Все';
    container.appendChild(allElements);
    //

    switch (category) {
        case 'soup':
        case 'main-course':
        case 'salad':
            // рыбные блюда
            let fishItems = document.createElement('a');
            fishItems.innerText = 'рыбный';
            fishItems.setAttribute('data-kind', 'fish');

            // мясные блюда
            let meatItems = document.createElement('a');
            meatItems.innerText = 'мясной';
            meatItems.setAttribute('data-kind', 'meat');
            
            // вегетарианские блюда
            let vegItems = document.createElement('a');
            vegItems.innerText = 'вегетарианский';
            vegItems.setAttribute('data-kind', 'veg');

            container.appendChild(fishItems); // добавляем фильтр по рыбе
            container.appendChild(meatItems); // добавляем фильтр по мясу
            container.appendChild(vegItems); // добавляем фильтр по вегетарианству
            break;
        case 'drink':
            // горячие напитки
            let hotItem = document.createElement('a');
            hotItem.innerText = 'Горячие напитки';
            hotItem.setAttribute('data-kind', 'hot');
            container.appendChild(hotItem); // добавляем фильтр по холодноу напитку

            // холодные напитки
            let coldItem = document.createElement('a');
            coldItem.innerText = 'Холодные напитки';
            coldItem.setAttribute('data-kind', 'cold');
            container.appendChild(coldItem); // добавляем фильтр по горячему напитку
            break;
        case 'dessert':
            // маленькие десерты
            let smallItem = document.createElement('a');
            smallItem.innerHTML = 'Маленькие порции';
            smallItem.setAttribute('data-kind', 'small');
            container.appendChild(smallItem);

            let mediumItem = document.createElement('a');
            mediumItem.innerHTML = 'Средние порции';
            mediumItem.setAttribute('data-kind', 'medium');
            container.appendChild(mediumItem);

            let largeItem = document.createElement('a');
            largeItem.innerHTML = 'Большие порции';
            largeItem.setAttribute('data-kind', 'large');
            container.appendChild(largeItem);
    }

    return container; // возвращаем получившийся контейнер
}

function createDishContainer(category) {
    const dishContainer= document.createElement('div');
    dishContainer.setAttribute('data-category', category);
    dishContainer.classList = ['dish-container'];
    return dishContainer;
}

function appendContainerToSections(dishContainer) {
    switch (dishContainer.dataset.category) {
        case 'soup':
            sectionSoupsTag.appendChild(containersForCategoryDishes['soup']);
            break
        case 'main-course':
            sectionMainDishesTag.appendChild(containersForCategoryDishes['main-course']);
            break
        case 'salad':
            sectionSaladsTag.appendChild(containersForCategoryDishes['salad']);
            break
        case 'drink':
            sectionDrinksTag.appendChild(containersForCategoryDishes['drink']);
            break
        case 'dessert':
            sectionDesertsTag.appendChild(containersForCategoryDishes['dessert']);
            break
    }
}



export function createDishElement(dishObject) {
    const dishElement = document.createElement('div');
    dishElement.classList = ['dish-element'];

    const imageElement = document.createElement('img');
    imageElement.loading = 'eager';
    imageElement.src = dishObject.image;
    imageElement.alt = 'некоторый текст';
    imageElement.classList = ['image-dish'];
    dishElement.appendChild(imageElement);
    
    const nameElement = document.createElement('p');
    nameElement.classList = ['name-dish'];
    nameElement.innerText = dishObject.name;
    dishElement.appendChild(nameElement);


    const priceElement = document.createElement('p');
    priceElement.classList = ['price-dish'];
    priceElement.innerText = `${dishObject.price} руб.`;
    dishElement.appendChild(priceElement);

    const weightElement = document.createElement('p')
    weightElement.classList = ['weight-dish'];
    weightElement.innerText = dishObject.count;
    dishElement.appendChild(weightElement);

    const btnAddToCart = document.createElement(`button`);
    btnAddToCart.classList = [`btn-add-to-buy-list`];
    btnAddToCart.innerText = `Добавить в корзину`;
    btnAddToCart.setAttribute("data-dish", dishObject.keyword);
    btnAddToCart.setAttribute('title', 'Добавить в корзину');
    dishElement.appendChild(btnAddToCart);

    dishElement.setAttribute("data-kind", dishObject.kind);
    return dishElement;
}

export function renderDishes(dishesArray) {
    for (const dish of dishesArray) {
        const dishElement = createDishElement(dish);
        switch (dish.category) {
            case 'soup':
                containersForCategoryDishes['soup'].appendChild(dishElement);
                break;
            case 'main-course':
                containersForCategoryDishes['main-course'].appendChild(dishElement);
                break;
            case 'salad':
                containersForCategoryDishes['salad'].appendChild(dishElement);
                break;
            case 'drink':
                containersForCategoryDishes[`drink`].appendChild(dishElement);
                break;
            case 'dessert':
                containersForCategoryDishes['dessert'].appendChild(dishElement);
                break;
        }
    }
}

function main() {
    for (const container in containersForCategoryDishes) {
        appendContainerToSections(containersForCategoryDishes[container]);
    }
    sectionSoupsTag.insertBefore(filtersContainers.soupFilter, containersForCategoryDishes.soup)
    sectionMainDishesTag.insertBefore(filtersContainers["main-courseFilter"], containersForCategoryDishes['main-course']);
    sectionDrinksTag.insertBefore(filtersContainers.drinkFilter, containersForCategoryDishes.drink);
    sectionSaladsTag.insertBefore(filtersContainers.saladFilter, containersForCategoryDishes.salad);
    sectionDesertsTag.insertBefore(filtersContainers.dessertFilter, containersForCategoryDishes.dessert);

    renderDishes(allDishes);

}

main();