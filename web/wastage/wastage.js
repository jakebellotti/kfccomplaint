//TODO loop and create sheet

let dateSelectContainer = document.getElementById("select-date-button-container");
let enterWastageDiv = document.getElementById("enter-wastage-div");
let currentWastageSheetHeader = document.getElementById("current-wastage-sheet-header");

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

function fillButtonDiv() {
    let monday = DateUtils.getMondayDate();

    for (let i = 0; i < 7; i++) {
        //TODO disable if in the future
        let today = moment(monday).add(i, "days");
        let todayAsString = today.format("ddd Do MMM");
        let todayAsDateString = today.format("DD/MM/YYYY");

        let button = document.createElement("button");
        button.innerText = todayAsString;
        button.dataset.date = todayAsDateString;
        button.dataset.dateAsString = todayAsString;
        button.dataset.fromNow = today.fromNow();

        button.classList.add("date-select-button");
        button.onclick = () => selectDateButtonClicked(button);

        dateSelectContainer.appendChild(button);
        //TODO add class
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
    //TODO show string
//    TODO show the correct count
}

function onInput(row) {
    let wastageAmountInput = row.querySelector(".wastage-amount-input");
    let wastageTotalInput = row.querySelector(".wastage-total-input");
    //TODO format properly

    let pricePerUnit = wastageAmountInput.dataset.pricePerUnit;
    let quantity = parseFloat(wastageAmountInput.value);
    if (!quantity) {
        console.log("error");
        wastageTotalInput.value = "";
        return;
    }

    let total = (pricePerUnit * quantity);
    wastageTotalInput.value = formatter.format(total);

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
    for (const element of document.querySelectorAll(".date-select-button")) {
        if (element.dataset.date === moment().format("DD/MM/YYYY")) {
            element.click();
            break;
        }
    }
}

function getAllWastage() {
    console.log("wastage");

    for (const element of enterWastageDiv.querySelectorAll(".enter-wastage-item-container")) {
        //TODO add all

    }
}

//TODO check if exists in DB
//TODO need to add functionality for saving changes
//TODO be able to save count in localStorage for integrity

fillButtonDiv();
addAllWastageItems();

selectToday();

getAllWastage();