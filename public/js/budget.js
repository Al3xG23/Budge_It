// TODO
const api = '/api/bills';

fetch(api)
    .then(response => {
        if (!response.ok) {
            throw new Error('No network response');
        }
        return response.json();
    })
    .then(billData => {
        // console.log(billData);
        let allBills = [];
        let billTotal = 0;
        let billMonth = " ";
        let billDay = " ";
        let billInfo = [];
        let spendings = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
            20: 0,
            21: 0,
            22: 0,
            23: 0,
            24: 0,
            25: 0,
            26: 0,
            27: 0,
            28: 0,
            29: 0,
            30: 0,
            31: 0
        }
        // let year = {
        //     january: 31,
        //     february: 29,
        //     march: 31,
        //     april: 30,
        //     may: 31,
        //     june: 30,
        //     july: 31,
        //     august: 31,
        //     september: 30,
        //     october: 31,
        //     november: 30,
        //     december: 31
        // }
        for (let i = 0; i < billData.length; i++) {

            let billAmount = parseFloat(billData[i].amount);
            billTotal += billAmount;
            allBills.push({ amount: billAmount, dueDate: billData[i].dueDate });

            let dateString = billData[i].dueDate;
            let date = new Date(dateString);
            billMonth = date.getMonth() + 1;
            billDay = date.getDate() + 1;
            // console.log("month:", billMonth, "day:", billDay);
            billInfo = {
                billMonth, billDay, billAmount
            };
            // console.log(billInfo);
            if (billDay >= 1 && billDay <= year[date.toLocaleString('en-us', { month: 'long' }).toLowerCase()]) {
                spendings[billDay] += billAmount;
            }
        }

        for (let day in spendings) {
            let bill = spendings[day];
            console.log(day, bill);
        }
        // console.log(allBills);
        // console.log(billTotal);
               
        function submitForm() {
            let daysDropNumbers = parseInt(daysDrop.value)
            let selectedDate = parseInt(dateDrop.value);
            let startingNumber = parseInt(startingNumberInput.value);
            let remainingAmount = startingNumber;
            for (let i = selectedDate; i < selectedDate + daysDropNumbers; i++) {
                if (spendings[i] && spendings[i] > 0) {
                    remainingAmount -= spendings[i];
                }
            }
        
            if (remainingAmount < 0) {
                answer.setAttribute("style", "color: red;");
                answer.textContent = "$" + remainingAmount;
            } else {
                answer.setAttribute("style", "color: green;");
                answer.textContent = "$" + remainingAmount;
            }
        }
        
        let submitButton = document.getElementById("button");
        
        submitButton.addEventListener("click", submitForm);
        
    })
    .catch(error => {
        console.error('Error: ', error);
    });

// hard coded amounts for each day of month need to change to input based
// let spendings = {
//     1: 426 + 30 + 33,
//     2: 50,
//     3: 0,
//     4: 0,
//     5: 0,
//     6: 19,
//     7: 0,
//     8: 0,
//     9: 0,
//     10: 590 + 76,
//     11: 0,
//     12: 0,
//     13: 166 + 17,
//     14: 442,
//     15: 24,
//     16: 0,
//     17: 130,
//     18: 0,
//     19: 0,
//     20: 360,
//     21: 44,
//     22: 0,
//     23: 0,
//     24: 0,
//     25: 43,
//     26: 0,
//     27: 16,
//     28: 0,
//     29: 397 + 50 + 297 + 140,
//     30: 0,
//     31: 0
// }

// the year object holds the number of days of each month
let year = {
    january: 31,
    february: 29,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31
}

let monthDrop = document.getElementById("monthDrop");
let dateDrop = document.getElementById("dateDrop");
let startingNumberInput = document.getElementById("startingNumber");
let dayDrop = document.getElementById("billDrop");
let answer = document.getElementById("answer");



// shows the selected month within the year object
for (let month in year) {
    let option = document.createElement("option");
    option.text = month;
    monthDrop.add(option);
}

// // function to show number of days for selected month
function populateDays() {
    dateDrop.innerHTML = "";
    let selectedMonth = monthDrop.value;
    let daysInMonth = year[selectedMonth.toLowerCase()];

    for (let i = 1; i <= daysInMonth; i++) {
        let option = document.createElement("option");
        option.text = i;
        dateDrop.add(option);
    }
}

// // function to look up to 14 days into the future
function populateDaysDrop() {
    let daysDrop = document.getElementById("daysDrop");
    daysDrop.innerHTML = "";

    for (let i = 1; i <= 14; i++) {
        let option = document.createElement("option");
        option.text = i;
        daysDrop.add(option);
    }
}

monthDrop.addEventListener("change", populateDays);

populateDays();
populateDaysDrop();

// // instead of spendings use billInfo & dateDrop.value should have the bill for that day from
function submitForm() {
    // let daysDropNumbers = parseInt(daysDrop.value)
    // let selectedDate = parseInt(dateDrop.value);
    let startingNumber = parseInt(startingNumberInput.value);
    let remainingAmount = startingNumber;
    // for (let i = selectedDate; i < selectedDate + daysDropNumbers; i++) {
    //     if (spendings[i] && spendings[i] > 0) {
    //         remainingAmount -= spendings[i];
    //     }
    // }

    if (remainingAmount < 0) {
        answer.setAttribute("style", "color: red;");
        answer.textContent = "$" + remainingAmount;
    } else {
        answer.setAttribute("style", "color: green;");
        answer.textContent = "$" + remainingAmount;
    }
}

let submitButton = document.getElementById("button");

submitButton.addEventListener("click", submitForm);