// this is what we need to do to create a game

// 1. Deposit some money
// 2. Collect a bet amount
// 3. Determine Number of lines to bet on
// 4. Spin the slot machine
// 5. check if the user won
// 6. Give the user their money
// 7. play again

const prompt = require("prompt-sync")();

//global varriables

const ROWS = 3;
const COLS = 3;

// create object
const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}


const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}



//create a function to ask for user input
const deposit = () =>{ 
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);  //to convert it to float

        if (isNaN(numberDepositAmount) || numberDepositAmount<=0){
            console.log("Invalid deposit amount, try again.");
        } 
        else{
            return numberDepositAmount;
            break;
        }
    }
};

const getNumberOfLines = () => {
    while (true){
        const lines = prompt("How many lines you want to bet on (1-3): ");
        const linesInNumber = parseInt(lines);
        if (isNaN(linesInNumber) || linesInNumber<1 || linesInNumber > 3){
            console.log("Please enter a valid input")
        }else{
            return linesInNumber;
            break;
        }
    }
}


//how much user wants to bet

const betAmount = (balance,lines) => {
    while (true){
        const bet = prompt("How much you want to bet per line: ");
        const betNum = parseFloat(bet);
        if (isNaN(betNum) || betNum < 0 || betNum > balance / lines){
            console.log("Please Enter Valid Number: ")
        }
        else{
            return betNum
        }
    }
}

//create a spin function

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0 ; i<count ; i++){
            symbols.push(symbol)
        }
    }
    const reels = [];                      //'reels' is the array of arrays that we need to output
    for (let i=0; i < COLS; i++){
        reels.push([])
            const reelSymbol = [...symbols];
        for (let j=0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbol.length);
                const selectedSymbol = reelSymbol[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbol.splice(randomIndex, 1);
        }
    }
    return reels
}

// to create a transpose of a matrix.

const transpose = (reels) => {
    const rows=[];
    for (let i =0 ; i<ROWS; i++){
        rows.push([])
        for (let j=0; j<COLS ; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows
}


const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){                  //here "i" loops through index and "symbol" loops through values.
            rowString += symbol
            if (i!= row.length -1){
                rowString +=" | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row =0; row<lines; row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet*SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}


// to start the game
const game = () => {
    let balance = deposit();
    while (true){
        console.log("You have a balance of $" + balance)
        const noOfLines = getNumberOfLines();
        const bet  = betAmount(balance, noOfLines);
        balance -= bet * noOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, getNumberOfLines)
        balance += winnings;
        console.log("Yow won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You ran out of money");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)? ");
        if (playAgain != "y") {
            console.log("Thank You for playing");
            break;
        }
    }
};

game()







