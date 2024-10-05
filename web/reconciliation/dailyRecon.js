//TODO remove the remnants of antiquated functions
//TODO new way of entering data for receiving, store 2 types of data, one for frozen and one for receiving
//TODO allow deleting of promo items from recon (for once promo is ended and we aren't counting, to avoid error from not entering it).

//TODO migrate to firebase

CloudDailyReconciliationAPI.initFirebase();

let openDay = null;

let productsTbody = document.getElementById("products");

let unsavedDocumentSpan = document.getElementById("unsaved-document-span");

let openDayName = document.getElementById("open-day-day");
let openDayDate = document.getElementById("open-day-date");
let amManagerInput = document.getElementById("am-manager-input");
let pmManagerInput = document.getElementById("pm-manager-input");

let salesInput = document.getElementById("sales-input");
let customerCountInput = document.getElementById("customer-count-input");
let cashVarianceInput = document.getElementById("cash-variance-input");
let notesTextarea = document.getElementById("notes-textarea");

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

function getAllRowsData() {
    let returnObj = [];
    for (const element of productsTbody.querySelectorAll(".data-tr")) {
        returnObj.push(getRowData(element));
    }
    return returnObj;
}

function getRowData(row) {
    let openQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-open-quantity");
    let receivedQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-received-quantity");
    let wastedQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-wasted-quantity");
    let closeQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-closing-quantity");

    //TODO allow to return sold/used
    return {
        identifier: row.dataset.itemIdentifier,
        openQuantity: openQuantity,
        receivedQuantity: receivedQuantity,
        wastedQuantity: wastedQuantity,
        closeQuantity: closeQuantity
    };
}

function updateRowWithData(row, data) {
    let openQuantityInput = row.querySelector(".input-type-open-quantity");
    let receivedQuantityInput = row.querySelector(".input-type-received-quantity");
    let wastedQuantityInput = row.querySelector(".input-type-wasted-quantity");
    let closingQuantityInput = row.querySelector(".input-type-closing-quantity");

    openQuantityInput.innerHTML = data.openQuantity;
    receivedQuantityInput.innerHTML = data.receivedQuantity;
    wastedQuantityInput.innerHTML = data.wastedQuantity;
    closingQuantityInput.innerHTML = data.closeQuantity;

    updateRow(row);
}

function updateRow(row) {
    //TODO error checking with negative values

    let openQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-open-quantity");
    let receivedQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-received-quantity");
    let wastedQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-wasted-quantity");
    let closeQuantity = getNumericalValueFromFirstInClassOrNull(row, ".input-type-closing-quantity");

    let totalInput = row.querySelector(".input-type-total");
    let soldInput = row.querySelector(".input-type-sold-quantity");

    let total = 0;
    let sold = 0;

    if (openQuantity !== null) {
        total += openQuantity;
    }
    if (receivedQuantity !== null) {
        total += receivedQuantity;
    }
    if (wastedQuantity !== null) {
        total -= wastedQuantity;
    }
    totalInput.innerText = total;

    //TODO does not work when it is 0
    if (openQuantity !== null && closeQuantity !== null) {
        //TODO if it goes below 0, there has been an error so log it
        sold = (total - closeQuantity);
        soldInput.innerText = Math.max(sold, 0);
    }

    onDocumentDataChanged();
}

function createTableEntryFromItemConfigData(itemData) {
    //TODO special styling if it is a promo item
    let row = document.createElement("tr");
    row.dataset.itemIdentifier = itemData.itemIdentifier;
    // row.dataset.returnType = structure.returnType;
    row.classList.add("data-tr");
    //TODO if head, handle differently

    let nameTD = document.createElement("td");
    nameTD.innerText = itemData.itemNamePref;
    nameTD.classList.add("name-td");
    if (itemData.availability === "promotion") {
        nameTD.classList.add("name-td-promotional-item");
    }

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
        createSimpleInputModalWindow("opening", itemData.itemNamePref, openTD, row);
    };

    let receivedTD = document.createElement("td");
    receivedTD.classList.add("editable-td");
    receivedTD.classList.add("input-type-received-quantity");
    receivedTD.onclick = function () {
        createSimpleInputModalWindow("receiving", itemData.itemNamePref, receivedTD, row);
    };

    let wastedTD = document.createElement("td");
    wastedTD.classList.add("editable-td");
    wastedTD.classList.add("input-type-wasted-quantity");
    wastedTD.onclick = function () {
        createSimpleInputModalWindow("wasting", itemData.itemNamePref, wastedTD, row);
    };

    let totalTD = document.createElement("td");
    totalTD.classList.add("input-type-total");

    let closedTD = document.createElement("td");
    closedTD.classList.add("editable-td");
    closedTD.classList.add("input-type-closing-quantity");
    closedTD.onclick = function () {
        createSimpleInputModalWindow("closing", itemData.itemNamePref, closedTD, row);
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

function itemIsActiveOrPresent(item, currentDay) {
    let currentlyActive = ItemData.isItemActive(item);
    if (currentlyActive) {
        //If the item is currently active, include it and don't continue
        return true;
    }
    for (const row of currentDay.data) {
        if (row.identifier === item.itemIdentifier) {
            //The item is included in the count, so we will include it (in case we are viewing historical data).
            return true;
        }
    }
    return false;
}

function createTableEntriesFromItemConfigData(currentDay) {
    if (!currentDay) {
        console.log("No day specified.");
        return;
    }

    let products = document.getElementById("products");
    // console.log()
//    chicken
//    TODO organise by preference
    //TODO if active or present in recon we are opening
    products.appendChild(createDividerRow("Chicken"));
    for (const item of ItemData.getAllChickenItems()) {


        let isItemActive = ItemData.isItemActive(item);
        if (itemIsActiveOrPresent(item, currentDay)) {
            products.append(createTableEntryFromItemConfigData(item));
        }
    }

    products.appendChild(createDividerRow("Freezer"));
    for (const item of ItemData.getAllFreezerItems()) {
        let isItemActive = ItemData.isItemActive(item);
        if (isItemActive) {
            products.append(createTableEntryFromItemConfigData(item));
        }
    }

    products.appendChild(createDividerRow("Salads"));
    for (const item of ItemData.getAllSaladItems()) {
        let isItemActive = ItemData.isItemActive(item);
        if (isItemActive) {
            products.append(createTableEntryFromItemConfigData(item));
        }
    }

    products.appendChild(createDividerRow("Breads"));
    for (const item of ItemData.getAllBreadItems()) {
        let isItemActive = ItemData.isItemActive(item);
        if (isItemActive) {
            products.append(createTableEntryFromItemConfigData(item));
        }
    }

    products.appendChild(createDividerRow("Misc"));
    for (const item of ItemData.getAllMiscItems()) {
        let isItemActive = ItemData.isItemActive(item);
        if (isItemActive) {
            products.append(createTableEntryFromItemConfigData(item));
        }
    }
}

//TODO create another function to do the same as this, but take active rows into consideration
//TODO what if we are opening a recon that includes data from a currently disabled item?


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

function createSimpleInputModalWindow(inputDataType, headerText, field, row) {
    let input = prompt(`Enter ${inputDataType} quantity for ${headerText}`, field.innerHTML);

    let number = parseFloat(input);

    if (input && !isNaN(number)) {
        field.innerText = input;
    } else {
        field.innerText = null;
    }
    updateRow(row);
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

/**
 * Returns the data row that contains a matching identifier. If it doesn't find any, it will just return null.
 * @param itemIdentifier
 */
function findDataRowWithItemIdentifier(itemIdentifier) {
    for (const row of productsTbody.querySelectorAll(".data-tr")) {
        let identifier = row.dataset.itemIdentifier;
        if (identifier && identifier === itemIdentifier) {
            return row;
        }
    }
    return null;
}

/**
 * Adds data from the currently loaded day
 */
function setCurrentDayData() {
    console.log(openDay);

    let momentDate = moment(openDay.date, "DD/MM/YYYY");
    openDayName.value = momentDate.format("dddd");
    openDayDate.value = openDay.date;
    amManagerInput.value = openDay.amManager;
    pmManagerInput.value = openDay.pmManager;

    //TODO proper formatting of cash etc
    salesInput.value = openDay.sales;
    customerCountInput.value = openDay.customerCount;
    cashVarianceInput.value = openDay.cashVariance;
    notesTextarea.value = openDay.notes;

    for (const row of openDay.data) {
        let foundRow = findDataRowWithItemIdentifier(row.identifier);
        if (foundRow) {
            updateRowWithData(foundRow, row);
        } else {
            //    TODO if row with identifier doesn't exist make sure to show it,
        }
    }
//    TODO set the item data now
}

function openReconDate(date) {
    ModalOverlay.showModalWindow(`Loading reconciliation for date: ${openDate}`);
    CloudDailyReconciliationAPI.dayExists(date, function (day) {
        if (day === undefined) {
            alert("Day is null");
        } else {
            openDay = day;
            createTableEntriesFromItemConfigData(day);
            setCurrentDayData();
        }

        ModalOverlay.hideModalWindow();
    });

    //    TODO update, maybe put loading screen on this too
//    TODO validate
//    TODO then load
}

/**
 * Called when it is detected that we are inputting data from a count upon opening the sheet
 */
function addDataFromCount(countData) {
    //TODO get today date
    //TODO save the data from the count (which includes wasted data) so that we can easily transfer it to the next day's reconciliation when the create next day button is clicked

    if (true) {
        alert("Not yet implemented.");
        return;
    }
    DailyReconciliationAPI.getToday(function (dayData, index) {
        if (dayData === null) {
            //TODO handle with overlay
            alert("No day exists for today");
            return;
        }
        //TODO updatye
        //TODO when setting the open day, maybe set it through a function so that
        openDay = dayData;
        createTableEntriesFromItemConfigData(dayData);
        setCurrentDayData();


        //TODO decide which calculation method we use
        let parsedData = JSON.parse(countData);
        let freshData = parsedData.freshData;
        for (const key of Object.keys(freshData)) {
            let data = freshData[key];
            for (const node of document.querySelectorAll("#products .data-tr")) {
                if (node.dataset.itemIdentifier === key) {
                    node.querySelector(".input-type-closing-quantity").innerText = data;
                    //    TODO make it obvious that data was added by adding an animation to the boxes
                }
            }
        }

        onDocumentDataChanged();
    });

//    TODO load required date first (default to current date)
//    TODO determine whether or not it is for close or open data
//    TODO handle wastage items
//    TODO parse, and then set
}

function previousDayButtonClicked() {
    if (openDay === null) {
        alert("No day is currently selected.");
        return;
    }
    let goToPreviousDay = true;

    if (documentHasUnsavedChanges()) {
        goToPreviousDay = window.confirm("This document has unsaved changes. Are you sure you want to navigate to the previous day?");
    }
    if (!goToPreviousDay) {
        return;
    }

    ModalOverlay.showModalWindow("Checking...")
    CloudDailyReconciliationAPI.previousDayExists(openDay.date, function (data) {
        if (data !== undefined) {
            ModalOverlay.hideModalWindow();
            window.location = `dailyRecon.html?openDate=${moment(openDay.date, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY")}`;
        } else {
            ModalOverlay.hideModalWindow();
            alert("Next day does not exist.");
        }
    });
}

function nextDayButtonClicked() {
    if (openDay === null) {
        alert("No day is currently selected.");
        return;
    }
    let goToNextDay = true;

    if (documentHasUnsavedChanges()) {
        goToNextDay = window.confirm("This document has unsaved changes. Are you sure you want to navigate to the next day?");
    }
    if (!goToNextDay) {
        return;
    }

    ModalOverlay.showModalWindow("Checking...")
    CloudDailyReconciliationAPI.nextDayExists(openDay.date, function (data) {
        if (data !== undefined) {
            ModalOverlay.hideModalWindow();
            window.location = `dailyRecon.html?openDate=${moment(openDay.date, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY")}`;
        } else {
            ModalOverlay.hideModalWindow();
            alert("Next day does not exist.");
        }
    });
//    TODO if does not exist, call api to insert it (with wasted and frozen data if applic)
}

function getInputAsIntegerOrNull(input) {
    let val = input.value;
    if (val) {
        let result = parseInt(val);
        if (result) {
            return result;
        }
    }
    return null;
}

function getInputAsFloatOrNull(input) {
    let val = input.value;
    if (val) {
        let result = parseFloat(val);
        if (result) {
            return result;
        }
    }
    return null;
}

/**
 * Updates the local openDay object with the data from the input fields
 */
function updateDataFromInputFields() {
    //TODO maybe clone the object, then the return of this function can be the cloned object, if we want to update the true data we just set the original data to the new cloned one, if we ever want to check if any changes have been made between a series of events we can simply check the result of this function against the current object LOL did you get all of that

    //TODO if the data is null, this will cause an error to occur
    let clonedObject = JSON.parse(JSON.stringify(openDay));

    clonedObject.amManager = amManagerInput.value;
    clonedObject.pmManager = pmManagerInput.value;
    clonedObject.sales = getInputAsFloatOrNull(salesInput);
    clonedObject.customerCount = getInputAsIntegerOrNull(customerCountInput);
    clonedObject.cashVariance = getInputAsFloatOrNull(cashVarianceInput);
    clonedObject.notes = notesTextarea.value;
    clonedObject.data = getAllRowsData();

    return clonedObject;
}

function saveButtonClicked() {
    if (openDay === null) {
        alert("No day is currently selected.");
        return;
    }

    let newOpenDay = updateDataFromInputFields();

    let isChanged = JSON.stringify(openDay) !== JSON.stringify(newOpenDay);

    if (isChanged) {
        openDay = newOpenDay;

        ModalOverlay.showModalWindow("Saving data...");
        CloudDailyReconciliationAPI.saveDay(openDay, function () {
            onDocumentDataChanged();
            ModalOverlay.hideModalWindow();
        });

        // DailyReconciliationAPI.saveDay(openDay, function () {
        //
        // });
    } else {
        alert("No changes have been made");
    }
//    TODO defrosted
}

/**
 * Should be called after we are finished editing any kind of data
 */
function onDocumentDataChanged() {
    //TODO now do this on editing all input fields
    let changes = documentHasUnsavedChanges();
    if (changes) {
        showUnsavedDocumentSpan();
    } else {
        hideUnsavedDocumentSpan();
    }
}

function documentHasUnsavedChanges() {
    let newOpenDay = updateDataFromInputFields();

    // console.log(openDay);
    // console.log(newOpenDay);

    return JSON.stringify(openDay) !== JSON.stringify(newOpenDay);
}

function showUnsavedDocumentSpan() {
    unsavedDocumentSpan.classList.add("show-span");
}

function hideUnsavedDocumentSpan() {
    unsavedDocumentSpan.classList.remove("show-span");
}

function createNextDayButtonClicked() {
//    TODO validate the data is complete
//    TODO this being completed is probably the last part before I can consider it to be usable at a bare minimum
//    TODO once this is done, start to work on the averages etc workbook look alike page

    //TODO if unsaved changes, prompt to save it first as it will avoid a bug
    if (documentHasUnsavedChanges()) {
        alert("Unsaved changes. Save before clicking this button and then try again.")
        return;
    }

    for (const row of getAllRowsData()) {
        //    TODO use the full name and not the identifier so it looks nicer, also tell exactly what figures are missing instead of being ambiguous
        let quantitiesPresent = (row.openQuantity !== null) && (row.closeQuantity !== null);
        if (!quantitiesPresent) {
            alert(`Missing open or closing figures for ${row.identifier}.`);
            return;
        }
    }

    ModalOverlay.showModalWindow("Creating next day...");
    CloudDailyReconciliationAPI.nextDayExists(openDay.date, function (data) {
        if (data !== undefined) {
            alert("The next day has already been created.");
            ModalOverlay.hideModalWindow();
        } else {
            CloudDailyReconciliationAPI.createNextDay(openDay.date, openDay, null, null, function (newDate) {
                ModalOverlay.hideModalWindow();
                // alert("Next day created.");
                // window.location = `dailyRecon.html?openDate=${newDate.date}`;
                //TODO should we open in new window?
            });
        }
    });

    // DailyReconciliationAPI.nextDayExists(openDay.date, function (found) {
    //     if (found !== null) {
    //         alert("The next day has already been created.");
    //         return;
    //     } else {
    //         //TODO insert wasted data if present and defrosted data
    //         DailyReconciliationAPI.createNextDay(openDay.date, openDay, null, null, function (newDate) {
    //             alert("Next day created.");
    //             window.location = `dailyRecon.html?openDate=${newDate.date}`;
    //             //    TODO should we open?
    //         });
    //     }
    // });

    //TODO check the rest of the compulsory values
}

//TODO programatically create input popup
//TODO include identifier on every data-row

// createTableEntries();
//TODO remove this when we finish the other
//T
// createTableEntriesFromData();
//TODO this shoudldn't be called by default, should only let it be called when opening something so we can selectively add promo items if they are present etc
// createTableEntriesFromItemConfigData();

//TODO check params and see what we are doing (loading a specific date for example).
let params = new URLSearchParams(window.location.search);

let openDate = params.get("openDate");
let countData = params.get("countData");

if (!countData) {
} else {
    addDataFromCount(countData);
}

if (openDate) {
    openReconDate(openDate);
} else {
    ModalOverlay.showModalWindow("No day has been selected.");
}

//TODO if open date is not set, set to current day (or last day that exists)

//TODO functions to allow saving