'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/* // Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
 */
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////
console.log('------------------------------------------------------------------------');
// FOREACH
// Does NOT change original array -->

movements.forEach((curElement, index, array) =>{
  if (curElement > 0){
    console.log(`Movement ${index + 1}: You deposited ${curElement}`);
  }
  else{
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(curElement)}`);
  }
});
console.log(movements);

console.log('------------------------------------------------------------------------');
// MAP and SET with FOREACH -->

// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});
console.log(currencies);

//SET
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${_}`); // the SAME as value === value (SET do NOT have 'key')
})

///////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log('------------------------------------------------------------------------');
// SLICE
// Does NOT change original array -->

console.log(arr.slice(2)); // <-- slice method. output: [ 'c', 'd', 'e' ]
console.log(arr); // <-- ORIGINAL. output: [ 'a', 'b', 'c', 'd', 'e' ]

console.log(arr.slice(2, 4)); 
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

console.log(arr.slice()); // <-- Same
console.log([...arr]); // <-- Same

console.log('------------------------------------------------------------------------');
//SPLICE
// changing original array -->

console.log(arr.splice(2)); // <-- splice method. output: [ 'c', 'd', 'e' ]
console.log(arr); // <-- ORIGINAL. output: [ 'a', 'b' ]

console.log(arr.splice(1, 2));


console.log('------------------------------------------------------------------------');
// REVERSE
// changing original array -->

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j','i','h','g','f'];

console.log(arr2.reverse());
console.log(arr2);

console.log('------------------------------------------------------------------------');
// CONCAT
// Does NOT change original array -->

const letter = arr.concat(arr2); // Added arr and arr2 into new Array 'letter'
console.log(letter); // <-- NEW array. output ['a', 'b', 'c', 'd','e', 'f', 'g', 'h','i', 'j']
console.log([...arr, ...arr2]); // <-- Same 

console.log(arr); // <-- ORIGINAL. output: [ 'a', 'b', 'c', 'd', 'e' ]

console.log('------------------------------------------------------------------------');
// JOIN
// Does NOT change original array -->

console.log(letter.join('-')); // <-- NEW array. output: a-b-c-d-e-f-g-h-i-j
console.log(letter); // <-- ORIGINAL. output: ['a', 'b', 'c', 'd','e', 'f', 'g', 'h','i', 'j']
