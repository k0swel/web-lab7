// вытаскиваем блюда из апишки.
export const  allDishes = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes').then( (answer) => answer.text() );