//--------------------------------------------------------------------------------------------------------------------------------------------------------
// Example (Bank account)
console.log('----------------------------------------------------------');
console.log();

let myAccount = {
    name: 'Alexander Timoshenko',
    income: {
        amountInc: 0,
        notesInc: []
    },
    expenses: {
        amountExp: 0,
        notesExp: []
    },
    balance: function (){
        const beforeTaxes = this.income.amountInc - this.expenses.amountExp;
        const addTaxes = (curBalance) => {
            let precentageOfTaxes = curBalance * .2; // <-- Taxes 20%
            return curBalance - precentageOfTaxes;
        };
        return {
            beforeT: beforeTaxes,
            afterT: addTaxes(beforeTaxes)
        }
    },
    getSummary: function (){
        console.log(`Account for Andrew has before taxes $${this.balance().beforeT}, after taxes $${this.balance().afterT}.\n$${this.income.amountInc}(${this.income.notesInc}) in income.\n$${this.expenses.amountExp}(${this.expenses.notesExp}) in expenses.`);
    },
    addIncome: function (num, noteI){
        this.income.amountInc += num;
        this.income.notesInc.push(noteI);
    },
    addExpenses: function (num, noteE){
        this.expenses.amountExp += num;
        this.expenses.notesExp.push(noteE);
    },
    resetAccount: function (){
        this.income.amountInc = 0;
        this.income.notesInc = '';
        this.expenses.amountExp = 0;
        this.expenses.notesExp = '';
    }
};

//-----------------------------------------------
console.log('---- Before ----');
myAccount.getSummary();
//-----------------------------------------------
console.log();
console.log('---- After ----');

myAccount.addIncome(500, 'Sold board');
myAccount.addExpenses(55, 'Lunch');
myAccount.getSummary();
//-----------------------------------------------
console.log();
console.log('Warning! RESET!!!!')

myAccount.resetAccount();
myAccount.getSummary();



//--------------------------------------------------------------------------------------------------------------------------------------------------------
// Another example (Restaurant)
console.log('----------------------------------------------------------');
console.log();


let restaurant = {
    name: 'Bride Star',
    guestCapacity: 75,
    guestCame: 0,
    guestLeft: 0,
    seatsInUse: 0,
    checkAvability: function (partySize){
        this.guestCame = 0;
        this.guestLeft = 0;
        const seatsLeft = this.guestCapacity - this.guestCame;
        return {
            status: seatsLeft >= partySize,
            guests: partySize
        }
    },
    addGuests: function (num){
        return {
            addCount: this.guestCame = num,
            lessCapacity: this.guestCapacity -= num,
            inUse: this.seatsInUse += num,
        }
    },
    removeParty: function (num){
        this.guestCame = 0;
        this.guestLeft = 0;
        return {
            guestsLeft: this.guestLeft = num,
            addCapacity: this.guestCapacity += num,
            inUse: this.seatsInUse -= num
        }
    }
}

let checkStatus = function(size){
    let check = restaurant.checkAvability(size);
    let status = check.status;
    let guests = check.guests;

    if (status){
        console.log(status);
        restaurant.addGuests(guests);
    }
    else {
        console.log(status);
        console.log('Sorry, we don\'t have enough seats!');
    }

}
console.log(restaurant);

checkStatus(50);
console.log(restaurant);

restaurant.removeParty(5);
console.log(restaurant);

checkStatus(25);
console.log(restaurant);

restaurant.removeParty(10);
console.log(restaurant);
