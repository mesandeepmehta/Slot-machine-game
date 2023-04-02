// 1. Deposit some money
// 2. Collect a bet amount
// 3. Determine Number of lines
// 4. Spin the slot machine
// 5. check if the user won
// 6. Give the user their money
// 7. play again

const prompt = require("prompt-sync")();

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

const betAmount = () => {
    while (true){
        const bet = prompt("How much you want to bet: ");
        const betNum = parseFloat(bet);
        if (isNaN(betNum) || betNum < 0 || betNum > depositAmount){
            console.log("Please Enter Valid Number: ")
        }
        else{
            return betNum
        }
    }
}


const depositAmount = deposit();
const noOfLines = getNumberOfLines();
const bet  = betAmount();
console.log(depositAmount);
console.log(noOfLines);
console.log(bet);