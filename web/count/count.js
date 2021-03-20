let currentCountDatePicker = document.getElementById("current-count-date-picker");
let currentCountTimePicker = document.getElementById("current-count-time-picker");
let currentCountIDInput = document.getElementById("current-count-count-id");

let countTableBody = document.getElementById("count-table-body");
let countAreaHeader = document.getElementById("current-count-area-text");

let productsTableBody = document.getElementById("products-tbody");

let freshButton = document.getElementById("fresh-button");
let wastedButton = document.getElementById("wasted-button");

let openCountArea = null;
// let countData = new Map();

//TODO it is important that we allow data to be saved to browser data because ipad may refresh and we will lose all data during the count
//TODO also only insert area data etc first time when it is null, so it can be edited later

let lastClickedButton = null;

// let freshData = new Map();
// let wastedData = new Map();

let countMode = null;

//TODO organise code a little neater
//TODO we need to add support for promo

function createCountTableHeader(name) {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.innerText = name;
    td.setAttribute("colSpan", "5");
    td.classList.add("count-table-category-separator");
    tr.appendChild(td);
    return tr;
}

function createUnitDiv(data, row) {
    let containerDiv = document.createElement("div");
    if (data === null || data === undefined) {
        return containerDiv;
    }

    containerDiv.classList.add("item-count-container-unit");

    let input = document.createElement("input");
    input.classList.add("number-input");
    input.setAttribute("type", "text");
    input.setAttribute("data-unit-quantity", data.quantity);

    input.oninput = () => updateTotal(row);

    let p = document.createElement("p");
    p.innerText = data.unitName;

    containerDiv.appendChild(input);
    containerDiv.appendChild(p);
    return containerDiv;
}

function parseFloatOrNull(val) {
    let returnValue = parseFloat(val);
    return isNaN(returnValue) ? null : returnValue;
}

/* Gets the data for a single row*
 *
 * @param row
 * @returns {{identifier: string, innerAmount: (null|number), unitMultiplier: (null|number), caseAmount: (null|number), innerMultiplier: (null|number), unitAmount: (null|number), caseMultiplier: (null|number)}}
 */
function getRowData(row) {
    let identifier = row.dataset.productIdentifier;

    let selCase = row.querySelector(".item-count-container-case .number-input");
    let selInner = row.querySelector(".item-count-container-inner .number-input");
    let selUnit = row.querySelector(".item-count-container-unit .number-input");

    return {
        identifier: identifier,
        caseAmount: (selCase == null) ? null : parseFloatOrNull(selCase.value),
        caseMultiplier: (selCase == null) ? null : parseFloatOrNull(selCase.dataset.unitQuantity),

        innerAmount: (selInner == null) ? null : parseFloatOrNull(selInner.value),
        innerMultiplier: (selInner == null) ? null : parseFloatOrNull(selInner.dataset.unitQuantity),

        unitAmount: (selUnit == null) ? null : parseFloatOrNull(selUnit.value),
        unitMultiplier: (selUnit == null) ? null : parseFloatOrNull(selUnit.dataset.unitQuantity),
    };
}

/**
 * Gets the data out of all currently displayed rows
 * @returns {[]}
 */
function getAllTableData() {
    let returnArray = [];
    let rows = countTableBody.querySelectorAll("tr");
    for (const row of rows) {
        let identifier = row.dataset.productIdentifier;
        if (identifier) {
            returnArray.push(getRowData(row));
        }
    }
    return returnArray;
}

function updateTotal(row) {
    let parsedData = getRowData(row);

    let totalCount = 0;
    if (parsedData.caseAmount !== null) {
        totalCount += parsedData.caseAmount * parsedData.caseMultiplier;
    }
    if (parsedData.innerAmount !== null) {
        totalCount += parsedData.innerAmount * parsedData.innerMultiplier;
    }
    if (parsedData.unitAmount !== null) {
        totalCount += parsedData.unitAmount * parsedData.unitMultiplier;
    }

    let totalSelect = row.querySelectorAll(".item-count-container-total .total-count");

    for (const totalSelectElement of totalSelect) {
        let calculationMethod = totalSelectElement.dataset.calculationMethod;
        if (calculationMethod.toLowerCase() === "individual".toLowerCase()) {
            totalSelectElement.value = totalCount;
        } else if (calculationMethod.toLowerCase() === "heads".toLowerCase()) {
            totalSelectElement.value = (totalCount / 9);
        } else {
            console.log("Calculation method not set.");
        }
    }
    saveCountData();
}


function updateIndividualTotals(row) {
    let selCase = row.querySelector(".item-count-container-case");
    if (selCase !== null) {
        countChanged(row, selCase.querySelector(".number-input"), selCase.querySelector(".total-count"));
    }

    let selInner = row.querySelector(".item-count-container-inner");
    if (selInner !== null) {
        countChanged(row, selInner.querySelector(".number-input"), selInner.querySelector(".total-count"));
    }
    updateTotal(row);
}

function countChanged(row, input, total) {
    let value = input.value;

    let parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
        total.value = (parsedValue) * input.dataset.unitQuantity;
    }
    updateTotal(row);
    // saveCountData();
//    TODO handle to 2dp
//    TODO handle decimals too
}

function createCountDiv(data, row, className) {
    let itemCountContainerDiv = document.createElement("div");
    if (data == null) {
        return itemCountContainerDiv;
    }
    itemCountContainerDiv.classList.add(className);

    let input = document.createElement("input");
    input.classList.add("number-input");
    input.setAttribute("type", "text");
    input.setAttribute("data-unit-quantity", data.quantity);

    let p = document.createElement("p");
    p.innerText = `${data.name} x ${data.quantity} ${data.unitName} = `;

    let totalInput = document.createElement("input");
    totalInput.setAttribute("type", "text");
    totalInput.classList.add("number-input");
    totalInput.classList.add("total-count");

    input.oninput = () => countChanged(row, input, totalInput);

    itemCountContainerDiv.appendChild(input);
    itemCountContainerDiv.appendChild(p);
    itemCountContainerDiv.appendChild(totalInput);
    return itemCountContainerDiv;
}

function createTotalDiv(data) {
    let div = document.createElement("div");
    div.classList.add("item-count-container-total");

    let equalsP = document.createElement("p");
    equalsP.innerText = "=";

    div.appendChild(equalsP);
    for (let i = 0; i < data.length; i++) {
        let currentData = data[i];

        let calcDiv = document.createElement("div");
        calcDiv.classList.add("calc-div");

        let calcInput = document.createElement("input");
        calcInput.classList.add("number-input");
        calcInput.classList.add("total-count");
        calcInput.setAttribute("data-calculation-method", currentData.calculationMethod);

        let calcP = document.createElement("p");
        calcP.innerText = currentData.name;

        calcDiv.appendChild(calcInput);
        calcDiv.appendChild(calcP);

        div.appendChild(calcDiv);
    }

    return div;
}


function createRowFromStructure(currentStructure, showCase, showInner, showUnit) {
    let currentRow = document.createElement("tr");
    currentRow.setAttribute("data-product-identifier", currentStructure.identifier);

    //TODO maybe blank box when we are not showing instead of nothing

    let nameTD = document.createElement("td");
    nameTD.classList.add("item-count-name");
    nameTD.innerText = currentStructure.name;

    let caseTD = document.createElement("td");
    if (showCase) {
        caseTD.appendChild(createCountDiv(currentStructure.data.case, currentRow, "item-count-container-case"));
    }

    let innerTD = document.createElement("td");
    if (showInner) {
        innerTD.appendChild(createCountDiv(currentStructure.data.inner, currentRow, "item-count-container-inner"));
    }

    let unitTD = document.createElement("td");
    if (showUnit) {
        unitTD.appendChild(createUnitDiv(currentStructure.data.unit, currentRow));
    }

    let totalTD = document.createElement("td");
    totalTD.appendChild(createTotalDiv(currentStructure.data.total));

    currentRow.appendChild(nameTD);
    currentRow.appendChild(caseTD);
    currentRow.appendChild(innerTD);
    currentRow.appendChild(unitTD);
    currentRow.appendChild(totalTD);

    return currentRow;
}

function setAllCounts(data) {
    setStorageObj("count_all_counts", data);
}

function getAllCounts() {
    return getStorageObj("count_all_counts");
}

function getCurrentCount() {
    let currentCountIndex = getCurrentCountIndex();
    if (currentCountIndex == null) {
        console.log("Fatal error");
        return null;
    }

    let allCounts = getStorageObj("count_all_counts");
    return allCounts[currentCountIndex];
}

/**
 * Gets the immutable Map of whatever is the active data (e.g. fresh or wasted)
 * @returns {Map<any, any>}
 */
function getCurrentCountActiveData() {
    let currentCount = getCurrentCount();
    return countMode === "fresh" ? currentCount.freshData : currentCount.wastedData;
}

function saveCountData() {
    console.log("saveCountData()");
    //TODO set, get
    //TODO use current count stored in data
    //TODO save
    //    TODO else if equals wasted


    if (openCountArea !== null) {
        let allCounts = getAllCounts();

        if (countMode === "fresh") {
            //TODO area of concern
            // allCounts[getCurrentCountIndex()].freshData.set(openCountArea, getAllTableData());
            allCounts[getCurrentCountIndex()].freshData[openCountArea] = getAllTableData();
        } else {
            allCounts[getCurrentCountIndex()].wastedData[openCountArea] = getAllTableData();
        }
        setAllCounts(allCounts);
    }

    // let countData = countMode === "fresh" ? freshData : wastedData;
    // if (openCountArea !== null) {
    //     countData.set(openCountArea, getAllTableData());
    // }
}

function showAllCount() {
    openCountArea = null;
    deselectOpenCountButtons();

    countAreaHeader.innerText = "All";
    countTableBody.innerHTML = "";

    let mergedData = getMergedData();

    for (let i = 0; i < allStructures.length; i++) {
        let currentCategory = allStructures[i];
        let currentStructures = currentCategory.structures;
        countTableBody.appendChild(createCountTableHeader(currentCategory.name));

        for (let i2 = 0; i2 < currentStructures.length; i2++) {
            let currentStructure = currentStructures[i2];
            let createdRow = createRowFromStructure(currentStructure, true, true, true);

            let caseInput = createdRow.querySelector(".item-count-container-case .number-input");
            let innerInput = createdRow.querySelector(".item-count-container-inner .number-input");
            let unitInput = createdRow.querySelector(".item-count-container-unit .number-input");

            if (caseInput !== null || undefined) {
                caseInput.value = 0;
            }
            if (innerInput !== null || undefined) {
                innerInput.value = 0;
            }
            if (unitInput !== null || undefined) {
                unitInput.value = 0;
            }

            if (mergedData.has(currentStructure.identifier)) {
                let currentMerged = mergedData.get(currentStructure.identifier);
                if (caseInput !== null) {
                    caseInput.value = currentMerged.caseAmount === undefined ? 0 : currentMerged.caseAmount;
                }
                if (innerInput !== null) {
                    innerInput.value = currentMerged.innerAmount === undefined ? 0 : currentMerged.innerAmount;
                }
                if (unitInput !== null) {
                    unitInput.value = currentMerged.unitAmount === undefined ? 0 : currentMerged.unitAmount;
                }
            }

            countTableBody.appendChild(createdRow);

            updateIndividualTotals(createdRow);
        }
    }
}

function deselectOpenCountButtons() {
    for (const node of document.querySelectorAll(".count-area-open")) {
        node.classList.remove("count-area-open");
    }
}

function displayCountArea(button, area) {
    getCurrentCount();
    let countData = getCurrentCountActiveData();
    // let countData = countMode === "fresh" ? freshData : wastedData;

    openCountArea = area.areaName;

    deselectOpenCountButtons();
    button.classList.add("count-area-open");

    countTableBody.innerHTML = "";
    countAreaHeader.innerText = area.areaName;

    for (const category of allStructures) {
        for (const structure of category.structures) {

            for (const item of area.countItems) {
                if (item.identifier === structure.identifier) {
                    let row = createRowFromStructure(structure, item.includeCase, item.includeInner, item.includeUnit);
                    countTableBody.appendChild(row);
                }
            }
        }
    }

    let currentData = countData[area.areaName];

    // let currentData = countData.get(area.areaName);
    if (currentData == null) {
        return;
    }
    for (const rowElement of countTableBody.querySelectorAll("tr")) {
        if (rowElement.dataset.productIdentifier) {

            for (let i = 0; i < currentData.length; i++) {
                if (currentData[i].identifier === rowElement.dataset.productIdentifier) {

                    let caseSelect = rowElement.querySelector(".item-count-container-case .number-input");
                    if (caseSelect !== null && currentData[i].caseAmount !== null) {
                        caseSelect.value = currentData[i].caseAmount;
                    }

                    let innerSelect = rowElement.querySelector(".item-count-container-inner .number-input");
                    if (innerSelect !== null && currentData[i].innerAmount !== null) {
                        innerSelect.value = currentData[i].innerAmount;
                    }

                    let unitSelect = rowElement.querySelector(".item-count-container-unit .number-input");
                    if (unitSelect !== null && currentData[i].unitAmount !== null) {
                        unitSelect.value = currentData[i].unitAmount;
                    }
                }
            }
            updateIndividualTotals(rowElement);
        }
    }
}

function displayCountLocations() {
    let countAreaContainer = document.getElementById("count-area-container");

    for (const countLine of countAreas) {
        let currentLineDiv = document.createElement("div");
        currentLineDiv.classList.add("count-area-line");

        for (const area of countLine) {
            let areaButton = document.createElement("button");
            areaButton.innerText = area.areaName;

            areaButton.onclick = () => {
                lastClickedButton = areaButton;
                displayCountArea(areaButton, area);
            };

            currentLineDiv.appendChild(areaButton);
        }
        countAreaContainer.appendChild(currentLineDiv);
    }

    let allButtonLineDiv = document.createElement("div");
    allButtonLineDiv.classList.add("count-area-line");
    let allButton = document.createElement("button");
    allButton.innerText = "All";
    allButton.onclick = () => {
        lastClickedButton = allButton;
        showAllCount();
    };
    allButtonLineDiv.appendChild(allButton);
    countAreaContainer.appendChild(allButtonLineDiv);
}

function getFreshMergedData() {
    return getMergedData(getCurrentCount().freshData);
}

function getWastedMergedData() {
    return getMergedData(getCurrentCount().wastedData);
}

function getMergedData(countData = getCurrentCountActiveData()) {
    let returnObj = new Map();

    for (const key of Object.keys(countData)) {
        let currentArea = countData[key];
        for (let i = 0; i < currentArea.length; i++) {
            let line = currentArea[i];

            if (!returnObj.has(line.identifier)) {
                returnObj.set(line.identifier, {caseAmount: 0, innerAmount: 0, unitAmount: 0});
            }

            returnObj.get(line.identifier).caseAmount += line.caseAmount;
            returnObj.get(line.identifier).caseMultiplier = line.caseMultiplier;
            returnObj.get(line.identifier).innerAmount += line.innerAmount;
            returnObj.get(line.identifier).innerMultiplier = line.innerMultiplier;
            returnObj.get(line.identifier).unitAmount += line.unitAmount;
            returnObj.get(line.identifier).unitMultiplier = line.unitMultiplier;
        }

    }
    return returnObj;
}

function freshButtonClicked() {
    countMode = "fresh";
    freshButton.classList.add("fresh-button-selected");
    wastedButton.classList.remove("wasted-button-selected");

    refreshCount();
}

function refreshCount() {
    //TODO is there a better way of doing this?
    if (lastClickedButton !== null) {
        lastClickedButton.click();
    }
}

function wastedButtonClicked() {
    countMode = "wasted";
    freshButton.classList.remove("fresh-button-selected");
    wastedButton.classList.add("wasted-button-selected");
    refreshCount();
}

function selectFirstCountLocation() {
    document.getElementById("count-area-container").querySelector("button").click();
}

function setStorageObj(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getStorageObj(key) {
    let item = localStorage.getItem(key);
    if (item === null || item === undefined) {
        return null;
    }
    return JSON.parse(item);
}

function getTimeStringFromDate(date) {
    let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return hour + ":" + minutes;
}

function setCurrentCountIndex(value) {
    setStorageObj("count_current_count_index", value);
}

function getCurrentCountIndex() {
    return getStorageObj("count_current_count_index");
}

function createTDWithData(inner) {
    let td = document.createElement("td");
    td.innerText = inner;
    return td;
}

function showProducts() {
//    TODO this only adds the results it does not show the window

    for (const area of allStructures) {
        for (const item of area.structures) {
            let tr = document.createElement("tr");
            tr.appendChild(createTDWithData(item.name));
            tr.appendChild(createTDWithData(item.identifier));
            tr.appendChild(createTDWithData(item.data.case ? item.data.case.quantity : "-"));
            tr.appendChild(createTDWithData(item.data.case ? item.data.case.name : "-"));

            tr.appendChild(createTDWithData(item.data.inner ? item.data.inner.quantity : "-"));
            tr.appendChild(createTDWithData(item.data.inner ? item.data.inner.name : "-"));

            tr.appendChild(createTDWithData(item.data.unit ? item.data.unit.quantity : "-"));
            tr.appendChild(createTDWithData(item.data.unit ? item.data.unit.name : "-"));

            productsTableBody.appendChild(tr);
        }
    }
}

function loadCount(countID) {
    let currentCount = getAllCounts()[countID];

    currentCountDatePicker.valueAsDate = new Date(currentCount.countDate);
    currentCountTimePicker.value = currentCount.countTime;
    currentCountIDInput.value = countID;
//    TODO handle everything
//    TODO get and set data, time etc
}

// function loadCount(countID) {
//     let allCounts = getStorageObj("count_all_counts");
//     if (allCounts == null) {
//         console.log("Fatal error");
//         return;
//     }
//
//     console.log(allCounts[countID]);
// //    TODO verify
// }

function createNewCount() {
    console.log("createNewCount()");
    //TODO return the true index
    let newCount = {
        countDate: new Date(),
        countTime: getTimeStringFromDate(new Date()),
        freshData: new Map(),
        wastedData: new Map()
    };

    let allCounts = getStorageObj("count_all_counts");
    allCounts.push(newCount);
    let returnCountIndex = allCounts.indexOf(newCount);
    setStorageObj("count_all_counts", allCounts);
    return returnCountIndex;
}

function loadDefaultCount() {
    let allCounts = getStorageObj("count_all_counts");
    let currentCountIndex = getCurrentCountIndex();

    if (currentCountIndex == null) {
        console.log("No count index");

        //If data is not initialized, insert new count

        if (!allCounts) {
            setStorageObj("count_all_counts", []);
        }

        let newCountIndex = createNewCount();
        setCurrentCountIndex(newCountIndex);
    }

    if (currentCountIndex !== null) {
//    TODO we have found a count, so show it, notify user and ask if they meant to continue count or create a new one
    }

    loadCount(getCurrentCountIndex());
}

function setDefaultData() {
    currentCountDatePicker.valueAsDate = new Date();
    currentCountTimePicker.value = getTimeStringFromDate(new Date());
}

function exportToDailyReconciliation() {
//    TODO print the data (do the all functionality first, see if it has enough
//    TODO need to have another function for only wasted data

    let returnObj = {};
    returnObj.freshData = {};
    returnObj.wastedData = {};

    // let freshData = getMergedData();

    console.log("Testing");

    //TODO why is this an Object and not an actual map
    for (const data of getFreshMergedData()) {
        let identifier = data[0];
        let o = data[1];

        let total = 0;
        total += (o.caseAmount * o.caseMultiplier);
        total += (o.innerAmount * o.innerMultiplier);
        total += (o.unitAmount * o.unitMultiplier);
        returnObj.freshData[identifier] = total;
    }

    let wastedData = null;

    //TODO actually export using REST API
    console.log(returnObj);
}

//TODO function to extract data into a ready to go 'template' for daily recon

function productsButtonClicked() {
//    TODO show products
}

//Building the interface

displayCountLocations();
setDefaultData();

//TODO if count is null, create new count

loadDefaultCount();

//This is out starting point
freshButton.click();
selectFirstCountLocation();

showProducts();
