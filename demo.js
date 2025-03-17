'use strict';

const arrayA = [];

function x(data) {
    arrayA.push('z'); // changed the array data - is the same array, not a copy - you dont want a copy from a big data array
}

console.log(arrayA);

x(arrayA);

console.log(arrayA);