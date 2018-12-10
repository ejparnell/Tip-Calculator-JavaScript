const tip10per = '10';
const tip15per = '15';
const tip20per = '20';

// Function to create the original tip percent. 
function tipCalculator(billTotal, selectedPer) {
    if (selectedPer === tip10per) {
        return billTotal * .10;
    }
    else if (selectedPer === tip15per) {
        return billTotal * .15;
    }
    else if (selectedPer === tip20per) {
        return billTotal * .20;
    }
    throw new Error('tip not selected')
}


function totalAmount(billTotal, selectedPer, numPpl) {
    //Gets the selected percent that you want to leave for a tip from the bill total enterd and adds them together.
    let tipAmount = tipCalculator(billTotal, selectedPer);
    let totalAmount = tipAmount + billTotal;
    //Does the OCD calculations by rounding the total bill amount up to make a whole number. Then taking that number and subtracting it from the total bill, which gives you a new tip amount that makes the bill total to be a whole number.
    let ocdTotalAmount = Math.ceil(totalAmount);
    let newTip = new Number((ocdTotalAmount - billTotal).toFixed(2));
    
    let billInfo = {
        prevBillTotal: billTotal,
        tipAmount: newTip,
        newAmount: ocdTotalAmount
    }
    //Sends the above content to the splitBill function if more than one person was selected.
    if (numPpl > 1) {
        return splitBill(billInfo, numPpl);
    }
    else {
        return billInfo;
    }
}

function splitBill(splitTotal, numPpl) {
    //Dividing the tip and bill between selected number of people.
    let billPerPerson = splitTotal.prevBillTotal / numPpl;
    let tipPerPerson = splitTotal.tipAmount / numPpl;
    //Rounding bill to nearest 100 to make sure we get back a number that can be made from change. 
    tipPerPerson = Math.round(100 * tipPerPerson) / 100;

    return {

        prevBillTotal: splitTotal.prevBillTotal,
        newAmount: billPerPerson,
        tipAmount: tipPerPerson,
    }
}

//Get the bill that is entered.
function getTotalbill() {
    return parseFloat(document.getElementById('totalBillInput').value);
}
//Get the number of people entered.
function getNumPpl() {
    return parseInt(document.getElementById('numPplInput').value);
}
// Get the tip perect that was selected. 
function handlePercentClick(tipPercent) {
    let billTotal = getTotalbill();
    let numPpl = getNumPpl();

    if (billTotal <= 0) {
        return alert('Fill in all boxes please!')
    }
    else {
        //Displays to the UI
        let finBillTotal = totalAmount(billTotal, tipPercent, numPpl);
        document.getElementById('ocdBill').textContent = finBillTotal.newAmount;
        document.getElementById("ocdtTipAmount").textContent = finBillTotal.tipAmount;
    }
}

