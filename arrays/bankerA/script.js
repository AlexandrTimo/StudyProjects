'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
 
// Data
const account1 = {
  owner: 'Jessica Davis',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Alexander Livtcer',
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


// Get short initials for user login *** -->
const computeUserName = acc => {
  acc.forEach(cur => {
    cur.username = cur.owner.toLowerCase().split(' ').map(cur => cur[0]).join('');
  });
};
computeUserName(accounts);                     // <-- LAUNCH ^^^^^^^^^^^^^^


// Show list of money movements *** -->
const displayMovements = (movements, sort = false) =>{ // <-- UI MODULE 
  containerMovements.innerHTML = ''; // <-- Clean all html at class 'containerMovements' 

  const movs = sort ? movements.slice().sort( (a,b) => a - b) : movements;
  
  movs.forEach((cur, i) =>{
    const type = cur > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__num"> ${i + 1} </div>
        <div class="movements__type movements__type--${type}">${type}</div>
        <div class="movements__value">${cur}$</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); // <-- this method allow 2 strings = (position, element)
  }); 
};
//displayMovements(account1.movements);         // <-- LAUNCH ^^^^^^^^^^^^^^

// Display current balance *** -->
const calcDisplayBalance = account => {
  account.balance = account.movements.reduce((acc, cur) => {return acc + cur});
  labelBalance.textContent = `${account.balance}$`;
};

//calcDisplayBalance(account1.movements);       // <-- LAUNCH ^^^^^^^^^^^^^

// Display summary balance *** -->
const calcBalanceSummary = account => {
  const curDeposit = account.movements.filter( cur => cur > 0).reduce( (acc, cur ) => acc + cur);
  labelSumIn.textContent = `${curDeposit}$`;

  const curWithdrawal = Math.abs(account.movements.filter( cur => cur < 0).reduce( (acc, cur ) => acc + cur));
  labelSumOut.textContent = `${curWithdrawal}$`;

  const interest = account.movements.filter( cur => cur > 0).map( cur => (cur * account.interestRate)/100).filter( cur => cur >= 1).reduce( (acc, cur ) => acc + cur); // <-- Interest of the bank only 1% or more
  labelSumInterest.textContent = `${interest}$`;
  };

//calcBalanceSummary(account1.movements);       // <-- LAUNCH ^^^^^^^^^^^^^^


// Display ALL in 1 *** -->
const updateUI = acc => {
  //  Display Movements
  displayMovements(acc.movements);
  //  Display Balance
  calcDisplayBalance(acc);
  //  Display Summary 
  calcBalanceSummary(acc); 
};

// Event Handler -->
let currentAccount;

btnLogin.addEventListener('click', el => { // <-- Login input (start)
  el.preventDefault();  

  currentAccount = accounts.find( acc => acc.username === inputLoginUsername.value); // Get the current user by username
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)){ // <-- Checking pin

    //  Display Welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`; // <-- Welcome message

    inputLoginUsername.value = inputLoginPin.value = ''; // <-- Clear input fields
    inputLoginPin.blur(); // <-- Clear focus from input field

    containerApp.style.opacity = 100; // <-- Changing style 

    // Display Movements + Display Balance + Display Summary 
    updateUI(currentAccount);
    
  }; 
});

// Transfer block *** -->
btnTransfer.addEventListener('click', el => { // <-- Accept info for transfer
  el.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transLogin = accounts.find( acc => acc.username === inputTransferTo.value ); // <-- Get the user by username to do transfer 

  inputTransferTo.value = inputTransferAmount.value = ''; // <-- Clear input fields
  inputTransferAmount.blur(); // <-- Clear focus from input field

  // Checking roules
  if (amount > 0 && transLogin && currentAccount.balance >= amount && transLogin?.username !== currentAccount.username){
    console.log('Geat! Transfer valid!');
  }else if (transLogin?.username === currentAccount.username){
    alert ('ERROR... \nYou can\'t tranfer money to yourself. \nPlease use "Request Loan" option for request extra money.');
  }else if (!transLogin?.username){ 
    alert ('ERROR... \nThis username does NOT exist!') 
  }else{
    alert ('Sorry, you not enough money to transfer! :(((')
  };

  // Doing the TRANSFER -->
  currentAccount.movements.push(-amount);
  transLogin.movements.push(amount);

  // Display Movements + Display Balance + Display Summary
  updateUI(currentAccount);
 
});

// Request LOAN *** -->

btnLoan.addEventListener('click', el => {
  el.preventDefault();
  const amountLoan = Number(inputLoanAmount.value);
  const condition = currentAccount.movements.some( cur => cur >= amountLoan * 0.1 );

  inputLoanAmount.value = ''; // <-- Clear input fields
  inputLoanAmount.blur(); // <-- Clear focus from input field

  if (amountLoan > 0 && condition){
    currentAccount.movements.push(amountLoan);

    // Display Movements + Display Balance + Display Summary
    updateUI(currentAccount);
    console.log('Success!');

  }else{
    alert ('Unfortunately, you unable to get loan on this amount.')
  }

});


// Delete account *** -->
btnClose.addEventListener('click', el => {
  el.preventDefault();
  const confAcc = accounts.find( cur => cur.username === inputCloseUsername.value ); // <-- Get the user by username to do close account 
  const confAccPin = Number(inputClosePin.value);

  inputCloseUsername.value = inputClosePin.value = ''; // <-- Clear input fields
  inputClosePin.blur(); // <-- Clear focus from input field

  if (confAcc && confAcc.username === currentAccount.username && confAccPin && confAccPin === currentAccount.pin){ 
    console.log('Account DELETED!');

    const index = accounts.findIndex( cur => cur.username === currentAccount.username ); // <-- Get the index of current username to do close account 
    accounts.splice(index, 1); // <-- Delete Account from array (data)
    containerApp.style.opacity = 0; // <-- Changing style (Hide Account)
    
    // Display Welcome message
    labelWelcome.textContent = 'Log in to get started'; // <-- Welcome message
    console.log(accounts);

  }else{
    alert ('Incorrect user!')
    inputCloseUsername.value = inputClosePin.value = ''; // <-- Clear input fields
    inputClosePin.blur(); // <-- Clear focus from input field
  };
})

// Switcher button SORT -->
let sorted = false; 

btnSort.addEventListener('click', el => {
  el.preventDefault();

  displayMovements(currentAccount.movements, !sorted); // Switcher button 
  sorted = !sorted;
});


// Test All Bank Balance movements -->

/* 
const accountMovments = accounts.map( acc => acc.movements);
//console.log(accountMovments);
const allArrMovements = accountMovments.flat();
//console.log(allArrMovements);
const bankMovementsValue = allArrMovements.reduce( (acc, cur) => acc + cur, 0 );
console.log(bankMovementsValue); 
*/
  
const bankMovementsValueChaining = accounts.map( acc => acc.movements).flat().reduce( (acc, cur) => acc + cur, 0 );
console.log(bankMovementsValueChaining);


// Test --> grab node list(current movement array (not a real array)) and copy it

labelBalance.addEventListener('click', el => {
  // Using length in DOM ('.movements__value') with querySelectorAll and "map method" in second argument  -->
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('$', '')));
  console.log(movementsUI);

  // second example
  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(el => Number(el.textContent.replace('$', '')));
  console.log(movementsUI2);
});
