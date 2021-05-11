function createDividerRow(name) {
    let row = document.createElement("tr");
    row.classList.add("divider-row");
    let td = document.createElement("td");
    td.innerText = name;
    td.setAttribute("colspan", "7");
    row.appendChild(td);
    return row;
}

function getNumericalValueFromFirstInClassOrNull(parent, className) {
    //TODO whether or not to parse float or integer
    let querySelector = parent.querySelector(className);
    if (querySelector) {
        let value = querySelector.innerText;
        if (value && value.trim().length > 0) {
            return parseFloat(value.trim());
        }
    }
    return null;
}

function updateRow(row) {
//    TODO update total, sold /used etc

    //TODO error checking with negative values

    let openQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-open-quantity");
    let receivedQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-received-quantity");
    let wastedQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-wasted-quantity");
    let closeQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-closing-quantity");

    let totalInput = row.querySelector(".input-type-total");
    let soldInput = row.querySelector(".input-type-sold-quantity");

    let total = 0;
    let sold = 0;

    if (openQuantity) {
        total += openQuantity;
    }
    if (receivedQuantity) {
        total += receivedQuantity;
    }
    if (wastedQuantity) {
        total -= wastedQuantity;
    }
    totalInput.innerText = total;

    if (closeQuantity || closeQuantity === 0) {
        sold = (total - closeQuantity);
        soldInput.innerText = sold;
    }
//    TODO sold/used

}

function createTableEntry(name, structure, returnType = "each") {
    // console.log(structure);

    let row = document.createElement("tr");
    row.dataset.returnType = structure.returnType;
    row.classList.add("data-tr");
    //TODO if head, handle differently

    let nameTD = document.createElement("td");
    nameTD.innerText = name;
    nameTD.classList.add("name-td");

    let openTD = document.createElement("td");
    openTD.classList.add("editable-td");
    openTD.classList.add("input-type-open-quantity");
    //TODO include for all of them
    openTD.onclick = function () {
        //TODO rename
        //TODO on accept
        //TODO create a modal window that accepts numbers only

        // createCountInputModalWindow(name, structure, openTD, returnType);
        // createSimpleInputModalWindow(name, structure, openTD, returnType);
        createSimpleInputModalWindow(name, openTD, row);
    };

    let receivedTD = document.createElement("td");
    receivedTD.classList.add("editable-td");
    receivedTD.classList.add("input-type-received-quantity");
    receivedTD.onclick = function () {
        createSimpleInputModalWindow(name, receivedTD, row);
    };

    let wastedTD = document.createElement("td");
    wastedTD.classList.add("editable-td");
    wastedTD.classList.add("input-type-wasted-quantity");
    wastedTD.onclick = function () {
        createSimpleInputModalWindow(name, wastedTD, row);
    };

    let totalTD = document.createElement("td");
    totalTD.classList.add("input-type-total");

    let closedTD = document.createElement("td");
    closedTD.classList.add("editable-td");
    closedTD.classList.add("input-type-closing-quantity");
    closedTD.onclick = function () {
        createSimpleInputModalWindow(name, closedTD, row);
    };

    let soldTD = document.createElement("td");
    soldTD.classList.add("input-type-sold-quantity");

    row.appendChild(nameTD);
    row.appendChild(openTD);
    row.appendChild(receivedTD);
    row.appendChild(wastedTD);
    row.appendChild(totalTD);
    row.appendChild(closedTD);
    row.appendChild(soldTD);

    return row;
}

function createTableEntriesFromData() {
    let products = document.getElementById("products");

    for (const key of Object.keys(allStructures)) {
        let category = allStructures[key];
        products.appendChild(createDividerRow(category.name));

        for (let i = 0; i < category.structures.length; i++) {
            let currentStructure = category.structures[i];
            products.append(createTableEntry(currentStructure.name, currentStructure));
        }

        //    TODO create structures
    }
}

function createTableEntries() {
    let products = document.getElementById("products");
    //TODO use function that builds all of this from a completed count, saves us from having to share the configuration over multiple locations

    //TODO put this into a JS array and handle like that

    products.appendChild(createDividerRow("Chicken"));
    products.appendChild(createTableEntry("Original Recipe", cobStructure, "head"));
    products.appendChild(createTableEntry("Hot & Spicy", cobStructure, "head"));
    products.appendChild(createTableEntry("Original Fillets", filletsStructure));
    products.appendChild(createTableEntry("Zinger Fillets", filletsStructure));
    products.appendChild(createTableEntry("Tenders", tendersStructure));
    products.appendChild(createTableEntry("Wicked Wings", wickedWingsStructure));

    products.appendChild(createDividerRow("Freezer"));
    products.appendChild(createTableEntry("Chicken Nuggets", nuggetsStructure));
    products.appendChild(createTableEntry("Popcorn Chicken", popcornChickenStructure));
    products.appendChild(createTableEntry("Chips", chipsStructure));
    products.appendChild(createTableEntry("Bacon", baconStructure));
    products.appendChild(createTableEntry("Chocolate Mousse", chocolateMousseStructure));

    products.appendChild(createDividerRow("Salads"));
    products.appendChild(createTableEntry("Diced Tomato", tomatoStructure));
    products.appendChild(createTableEntry("Lettuce", lettuceStructure));
    products.appendChild(createTableEntry("Coleslaw (Small)", smallColeslawStructure));
    products.appendChild(createTableEntry("Coleslaw (Large)", largeColeslawStructure));

    products.appendChild(createDividerRow("Breads"));
    products.appendChild(createTableEntry("Burger Buns", burgerBunsStructure));
    products.appendChild(createTableEntry("Dinner Rolls", dinnerRollsStructure));
    products.appendChild(createTableEntry("Flatbread", flatbreadSlidersStructure));
    products.appendChild(createTableEntry("Tortillas", tortillasStructure));

    //TODO handle promo different
    products.appendChild(createDividerRow("Misc"));
    products.appendChild(createTableEntry("Promo"));

}

function updateUnitsFromTotal(total, sender) {
    let window = sender.parentElement.parentElement.parentElement;
    for (const e of window.querySelectorAll(".data-input-total-count")) {
        e.value = total;
    }

    let left = total;

    for (const e of window.querySelectorAll(".data-input-single-unit")) {
        let count = e.dataset.unitCount;

        let wholeUnits = Math.floor(left / count);
        let modulus = (left % count);
        e.value = wholeUnits;
        left = modulus;
    }
}

function onHeadInputUpdated(sender) {
    updateUnitsFromTotal(sender.value * 9, sender);
}

function onTotalInputUpdated(sender) {
    let window = sender.parentElement.parentElement.parentElement;
    updateUnitsFromTotal(sender.value, sender);
    for (const e of window.querySelectorAll(".data-input-total-count-head")) {
        e.value = Math.floor(sender.value / 9);
    }
}

function onIndividualUnitUpdated(event) {
    if (event === undefined) {
        return;
    }

    let inputContainer = event.parentElement.parentElement;
    let window = inputContainer.parentElement;

    let inputs = inputContainer.querySelectorAll("input[type=number]");
    let totalCount = 0;

    for (const input of inputs) {
        let unitCount = input.dataset.unitCount;
        let count = parseInt(input.value) * unitCount;
        if (!isNaN(count)) {
            totalCount += count;
        }
    }

    for (const aElement of window.querySelectorAll(".data-input-total-count")) {
        aElement.value = totalCount;
    }

    for (const aElement of window.querySelectorAll(".data-input-total-count-head")) {
        aElement.value = Math.floor(totalCount / 9);
    }

}

function createSimpleInputModalWindow(headerText, field, row) {
//    TODO get number, insert number,
//    TODO pass param for type we are entering (closing amount, opening amount etc)
    let input = prompt(`Enter value for ${headerText}`, field.innerHTML);
    if (input) {
        field.innerText = input;
        updateRow(row);
    }
}

function createCountInputModalWindow(headerText, structure, field, returnType) {
    let modalWindowBackground = document.createElement("div");
    modalWindowBackground.classList.add("modal-window-background");

    let modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-window");

    let header = document.createElement("p");
    header.classList.add("unit-input-header");
    header.innerText = headerText;

    modalWindow.appendChild(header);


    //TODO if there is a value in the field, set it
    for (let i = 0; i < structure.length; i++) {
        let currentRow = structure[i];
        let container = document.createElement("div");
        container.classList.add("unit-input-container");

        for (let i2 = 0; i2 < currentRow.length; i2++) {
            let currentInput = currentRow[i2];
            let currentDiv = document.createElement("div");
            let currentDivHeader = document.createElement("p");
            currentDivHeader.innerText = currentInput.name;
            currentDiv.appendChild(currentDivHeader);

            let currentDivInput = document.createElement("input");
            currentDivInput.classList.add(currentInput.unit);
            currentDivInput.setAttribute("type", "number");
            //TODO only do if present
            currentDivInput.setAttribute("data-unit-count", currentInput.unitCount);

            if (currentInput.unit.toLowerCase() === "data-input-single-unit".toLowerCase()) {
                currentDivInput.onkeyup = () => onIndividualUnitUpdated(currentDivInput);
            } else if (currentInput.unit.toLowerCase() === "data-input-total-count".toLowerCase()) {
                currentDivInput.onkeyup = () => onTotalInputUpdated(currentDivInput);
            } else if (currentInput.unit.toLowerCase() === "data-input-total-count-head") {
                currentDivInput.onkeyup = () => onHeadInputUpdated(currentDivInput);
            }

            currentDiv.appendChild(currentDivInput);
            container.appendChild(currentDiv);
        }

        modalWindow.appendChild(container);
    }

    //TODO append buttons
    let acceptButton = document.createElement("button");
    acceptButton.classList.add("unit-input-accept-button");
    acceptButton.innerText = "Accept";
    acceptButton.onclick = function () {
        let returnValue;
        if (returnType === "head") {
            //    TODO get head
            returnValue = modalWindow.querySelector(".data-input-total-count-head").value;
        } else if (returnType === "total") {
            returnValue = modalWindow.querySelector(".data-input-total-count").value;
        }
        field.innerHTML = "";
        let valueP = document.createElement("p");
        valueP.innerText = returnValue;
        field.appendChild(valueP);
        document.body.removeChild(document.querySelector(".modal-window-background"));
        //    TODO set value, trigger event listeners for closing numbers etc
    }

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("unit-input-accept-button");
    cancelButton.innerText = "Cancel";
    cancelButton.onclick = () => document.body.removeChild(document.querySelector(".modal-window-background"));

    modalWindow.appendChild(acceptButton);
    modalWindow.appendChild(cancelButton);

    modalWindowBackground.appendChild(modalWindow);
    document.body.appendChild(modalWindowBackground);
}

//TODO programatically create input popup
//TODO include identifier on every data-row

// createTableEntries();
createTableEntriesFromData();

//TODO check params and see what we are doing (loading a specific date for example).
let params = new URLSearchParams(window.location.search);

let openDate = params.get("openDate");
if (openDate) {
    console.log("Opening date: " + openDate);
//    TODO validate
//    TODO then load
}

//TODO functions to allow saving