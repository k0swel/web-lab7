import { allDishes } from "./dishes.js";
import {filtersContainers, createDishElement} from './showDishes.js'
const sortElementsOnButton = document.getElementById("sortButton");



function sortContainer(container, filter) {
    console.log('container');
    console.dir(container)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (filter == 'all') {
        for (const dish of allDishes) {
            if (dish.category == container.dataset.category) {
                container.appendChild(createDishElement(dish));
            }
        }
    }
    else {
        for (const dish of allDishes) {
            console.log(`dish.kind = ${dish.kind}; container.dataset.kind = ${container.dataset.kind}`)
            if (dish.kind == filter && dish.category == container.dataset.category) {
                container.appendChild(createDishElement(dish));
            }
        }
    }
}

// Если выбран какой-то фильтр, закрашиваем его, а у остальных фильтров убираем закрашивание.
function clickedOption(option) {
    option.classList = ['filter-option-enable'];
    const container = option.parentElement;
    for (const obj of container.children) {
        if (obj != option) obj.classList = [];
    }
}

// фильтр контейнера в зависимости от категории
function callback(e) {
    console.dir(e);
    const sourceElement = e.target; // источник события
    clickedOption(sourceElement); // красим выбранный фильтр
    const targetForFiltering = sourceElement.closest(`section`).querySelector(`div[data-category]`);
    const filterValue = sourceElement.dataset.kind;
    console.log(`filterValue = ${filterValue}`)
    

    switch (filterValue) {
        case 'all':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'fish':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'meat':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'veg':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'hot':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'cold':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'small':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'medium':
            sortContainer(targetForFiltering, filterValue);
            break;
        case 'large':
            sortContainer(targetForFiltering, filterValue);
            break;
    }
}

function createEvents(containersWithFilters) {
    for (const containerKey in containersWithFilters) {
        const container = containersWithFilters[containerKey];
        const childElements = container.children;
        clickedOption(childElements[0]); // красим первый элемент из фильтра
        for (const filter of childElements) {
            filter.addEventListener('click', callback);
        }
    }
}

function main() {
    createEvents(filtersContainers);
}

main();