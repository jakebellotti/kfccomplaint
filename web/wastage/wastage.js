//TODO loop and create sheet

let weekStartDateInput = document.getElementById("week-start-date-input");

let dateSelectContainer = document.getElementById("select-date-button-container");
let enterWastageDiv = document.getElementById("enter-wastage-div");
let currentWastageSheetHeader = document.getElementById("current-wastage-sheet-header");

let totalWastageAmount = document.getElementById("total-wastage-amount");

let loadingOverlay = document.getElementById("loading-overlay");
let loadingOverlayText = document.getElementById("loading-overlay-text");

let selectedDate = null;

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

//TODO when manually selecting a week start date, if it is not a monday, set the date to the previous Monday

function backOneWeekButtonClicked() {
    weekStartDateInput.valueAsDate = moment(weekStartDateInput.valueAsDate).subtract(7, "days").toDate();
    fillButtonDiv();
//    TODO change, then update, select first
    selectToday();

}

function forwardOneWeekButtonClicked() {
//    TODO implement
    weekStartDateInput.valueAsDate = moment(weekStartDateInput.valueAsDate).add(7, "days").toDate();
    fillButtonDiv();
    selectToday();
}

function setToCurrentWeekButtonClicked() {
    weekStartDateInput.valueAsDate = DateUtils.getMondayDate();
    fillButtonDiv();
    selectToday();
}

function fillButtonDiv() {
    dateSelectContainer.innerHTML = "";

    //TODO when getting the date, strip the time (bug that says hours ago on current day etc)
    //TODO maybe use a.diff(b, 'days') from moment js and do our own calculations

    // console.log(weekStartDateInput.valueAsDate);
    let monday = moment(DateUtils.getMondayDateFromDate(weekStartDateInput.valueAsDate));
    // console.log(monday);



    for (let i = 0; i < 7; i++) {
        //TODO disable if in the future
        let today = moment(monday).add(i, "days");
        // console.log(`Today: ${today}`)

        let daysUntilString = DateUtils.getDaysFromNow(today.toDate());

        let todayAsString = today.format("ddd Do MMM");
        let todayAsDateString = today.format("DD/MM/YYYY");

        let button = document.createElement("button");
        button.innerText = todayAsString;
        button.dataset.date = todayAsDateString;
        button.dataset.dateAsString = todayAsString;
        button.dataset.fromNow = daysUntilString;
        //TODO custom

        button.classList.add("date-select-button");
        button.onclick = () => selectDateButtonClicked(button);

        dateSelectContainer.appendChild(button);
    }
}

//TODO month view
//TODO week view
//TODO allow to go back a few weeks, most common wastage item etc

function selectDateButtonClicked(self) {
    for (const element of document.querySelectorAll(".date-select-button-selected")) {
        element.classList.remove("date-select-button-selected");
    }
    self.classList.add("date-select-button-selected");
    //TODO if a few seconds ago, show today

    currentWastageSheetHeader.innerText = `${self.dataset.dateAsString} (${self.dataset.fromNow === "a few seconds ago" ? "today" : self.dataset.fromNow})`;

    selectedDate = self.dataset.date;

    console.log("Selected date: " + selectedDate);

    showLoadingOverlay(`Getting data for ${selectedDate}`);
    getWastageDataForSelectedDate(function (data) {
        hideLoadingOverlay();
        if (data !== null) {
            for (const container of document.querySelectorAll(".enter-wastage-item-container")) {
                for (const object of data) {
                    if (container.dataset.itemName === object.itemName) {
                        let quantityInput = container.querySelector(".wastage-amount-input");
                        quantityInput.value = object.itemQuantity;
                        quantityInput.oninput();
                    }
                }
            }
        } else {
            for (const container of document.querySelectorAll(".enter-wastage-item-container")) {
                let quantityInput = container.querySelector(".wastage-amount-input");
                quantityInput.value = '';
                quantityInput.oninput();

            }
        }
    });
}

function getWastageDataForSelectedDate(callback) {
    database.ref(`wastage/${selectedDate.replaceAll("/", "-")}`).once("value").then((snapshot => {
        callback(snapshot.val());
    }));
}

function onInput(row) {
    let wastageAmountInput = row.querySelector(".wastage-amount-input");
    let wastageTotalInput = row.querySelector(".wastage-total-input");
    //TODO format properly

    let pricePerUnit = wastageAmountInput.dataset.pricePerUnit;
    let quantity = parseFloat(wastageAmountInput.value);
    if (!quantity) {
        quantity = 0;
        wastageTotalInput.value = "";
    }

    let total = (pricePerUnit * quantity);
    wastageTotalInput.value = formatter.format(total);

    totalWastageAmount.innerText = formatter.format(getTotalWastageAmount());
}

function createWastageItem(name, unit, pricePerUnit) {
    let container = document.createElement("div");
    container.classList.add("enter-wastage-item-container");
    container.dataset.itemName = name;

    let itemName = document.createElement("p");
    itemName.classList.add("enter-wastage-item-name");
    itemName.innerText = name;

    let numberInputContainer = document.createElement("div");
    numberInputContainer.classList.add("number-input-container");

    let wastedInput = document.createElement("input");
    wastedInput.setAttribute("type", "text");
    wastedInput.dataset.pricePerUnit = pricePerUnit;
    wastedInput.classList.add("wastage-amount-input");
    wastedInput.oninput = () => onInput(container);

    let costP = document.createElement("p");
    costP.innerText = `${unit} x $${pricePerUnit}/${unit} = `;

    let totalInput = document.createElement("input");
    totalInput.setAttribute("type", "text");
    totalInput.classList.add("wastage-total-input");

    numberInputContainer.appendChild(wastedInput);
    numberInputContainer.appendChild(costP);
    numberInputContainer.appendChild(totalInput);

    container.appendChild(itemName);
    container.appendChild(numberInputContainer);
    return container;
}

function addAllWastageItems() {
    let categories = [
        "chicken",
        "bread",
        "side",
        "freezer",
        "salad",
        "misc"
    ];

    for (const category of categories) {
        let categoryHeader = document.createElement("p");
        categoryHeader.classList.add("category-header");
        categoryHeader.innerText = category.toUpperCase();
        enterWastageDiv.appendChild(categoryHeader);

        for (const wastageItem of wastageItems) {
            if (category === wastageItem.category) {
                enterWastageDiv.appendChild(createWastageItem(wastageItem.name, "EA", wastageItem.costPerUnit));
            }
        }
    }

}

function selectToday() {
    console.log("select today");
    let elements = document.querySelectorAll(".date-select-button");
    let currentDateString = moment().format("DD/MM/YYYY");

    for (const element of elements) {
        if (element.dataset.date === currentDateString) {
            element.click();
            return;
        }
    }
    elements[0].click();
}

function getAllWastage() {
    let returnObj = [];

    for (const element of enterWastageDiv.querySelectorAll(".enter-wastage-item-container")) {
        let itemName = element.dataset.itemName;
        let itemQuantity = 0;
        let itemValue = 0;

        let input = element.querySelector(".wastage-amount-input");
        itemValue = input.dataset.pricePerUnit;

        let quantityParsed = parseFloat(input.value);
        if (quantityParsed) {
            itemQuantity = quantityParsed;
        }

        returnObj.push({
            itemName: itemName,
            itemQuantity: itemQuantity,
            itemValue: itemValue
        });
    }

    return returnObj;
}

function getTotalWastageAmount() {
    let total = 0;
    for (const o of getAllWastage()) {
        total += (o.itemQuantity * o.itemValue);
    }

    return total;
}

function saveWastage() {
    //TODO set params correctly
    //TODO show overlay
    //TODO get the date
    let dateAsString = selectedDate.replaceAll("/", "-");


    showLoadingOverlay("Saving data...");
    database.ref(`wastage/${dateAsString}`).set(getAllWastage()).then(() => {
        hideLoadingOverlay();
    });
}

function showLoadingOverlay(text) {
    loadingOverlay.classList.add("loading-overlay-showing");
    loadingOverlayText.innerText = text;
}

function hideLoadingOverlay() {
    loadingOverlay.classList.remove("loading-overlay-showing");
}

function getBatchWastageData(dateStrings) {
    let left = dateStrings.length;
    let allData = [];
    let startTime = performance.now();

    for (const ds of dateStrings) {
        database.ref(`wastage/${ds}`).once("value").then((snapshot => {
            allData[ds] = snapshot.val();
            left = (left - 1);
            console.log("Got: " + ds);

            if (left === 0) {
                console.log("Finished");
                console.log(allData);
                console.log(`Took ${performance.now() - startTime} ms.`);
            }
        }));
    }

    //TODO loop, return data, callback
    // database.ref(`wastage/${selectedDate.replaceAll("/", "-")}`).once("value").then((snapshot => {
    //     callback(snapshot.val());
    // }));
}

/**
 * For when we are logged in, start the application up.
 */
function startup() {
    console.log("Starting up.")
    selectToday();
    getAllWastage();
}

function checkLogin() {
    //TODO handle more elegantly (without the listener)
    showLoadingOverlay("Signing you in...");
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            let password = prompt("Enter the password");

            if (password == null || password === "") {
                //    TODO handle
            } else {
                firebase.auth().signInWithEmailAndPassword("7901@collinsfoods.com", password)
                    .then((userCredential) => {
                        console.log("Signed in.");
                    });
            }
        } else {
            hideLoadingOverlay();
            startup();
        }
    });
}

weekStartDateInput.valueAsDate = DateUtils.getMondayDate();

fillButtonDiv();
addAllWastageItems();
checkLogin();
