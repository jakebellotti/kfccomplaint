let countTableBody = document.getElementById("count-table-body");
let countAreaHeader = document.getElementById("current-count-area-text");

let openCountArea = null;
let countData = new Map();


//TODO we need to add support for promo
//TODO we need to add support for linking count areas
//TODO now build all count units

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

function getAllTableData() {
    let returnArray = [];
    let rows = countTableBody.querySelectorAll("tr");
    for (const row of rows) {
        let identifier = row.dataset.productIdentifier;
        if (identifier) {
            returnArray.push(getRowData(row));
        }
    }
//    TODO handle wasted items
    return returnArray;
}

function updateTotal(row) {
    let parsedData = getRowData(row);

    //TODO now we need to update the individual inputs ahhh

    let totalCount = 0;
    if (parsedData.caseAmount !== null) {
        //TODO need to multiply by amount
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
}


function updateIndividualTotals(row) {
    // let querySelector = row.querySelector(divClass);
    // if (querySelector === null || querySelector === undefined) {
    //     return;
    // }
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
    //TODO nan error

    let parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
        total.value = (parsedValue) * input.dataset.unitQuantity;
    }
    updateTotal(row);

//    TODO handle to 2dp
//    TODO handle decimals too
//    TODO update based on unit
//    TODO update total in div, total at the end of the row
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
    //TODO if not showing units, dont do it

    let currentRow = document.createElement("tr");
    currentRow.setAttribute("data-product-identifier", currentStructure.identifier);

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

function showAllCount() {
    //TODO make a function to save this
    if (openCountArea !== null) {
        countData.set(openCountArea, getAllTableData());
        openCountArea = null;
    }
    deselectOpenCountButtons();
    //TODO select ths

    countAreaHeader.innerText = "All";
    countTableBody.innerHTML = "";

    let mergedData = getMergedData();
    // console.log(mergedData);

    for (let i = 0; i < allStructures.length; i++) {
        let currentCategory = allStructures[i];
        let currentStructures = currentCategory.structures;
        countTableBody.appendChild(createCountTableHeader(currentCategory.name));

        for (let i2 = 0; i2 < currentStructures.length; i2++) {
            let currentStructure = currentStructures[i2];
            let createdRow = createRowFromStructure(currentStructure, true, true, true);

            //TODO default to 0
            let caseInput = createdRow.querySelector(".item-count-container-case .number-input");
            let innerInput = createdRow.querySelector(".item-count-container-inner .number-input");
            let unitInput = createdRow.querySelector(".item-count-container-unit .number-input");

            //TODO some may be null
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

            //TODO update individual values for row function
            updateIndividualTotals(createdRow);
            // updateTotal(createdRow);
        }
    }
}

function deselectOpenCountButtons() {
    for (const node of document.querySelectorAll(".count-area-open")) {
        node.classList.remove("count-area-open");
    }
}

function displayCountArea(button, area) {
    if (openCountArea !== null) {
        countData.set(openCountArea, getAllTableData());
    }
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

    let currentData = countData.get(area.areaName);
    if (currentData == null) {
        return;
    }
    for (const rowElement of countTableBody.querySelectorAll("tr")) {
        if (rowElement.dataset.productIdentifier) {

            for (let i = 0; i < currentData.length; i++) {
                if (currentData[i].identifier === rowElement.dataset.productIdentifier) {

                    //TODO the event to update the data is not trigering
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
            //TODO here
            // updateTotal(rowElement);
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

            areaButton.onclick = () => displayCountArea(areaButton, area);

            currentLineDiv.appendChild(areaButton);
            //    TODO event handlers
            //    TODO styling
        }
        countAreaContainer.appendChild(currentLineDiv);
    }

    let allButtonLineDiv = document.createElement("div");
    allButtonLineDiv.classList.add("count-area-line");
    let allButton = document.createElement("button");
    allButton.innerText = "All";
    allButton.onclick = () => showAllCount();
    allButtonLineDiv.appendChild(allButton);
    countAreaContainer.appendChild(allButtonLineDiv);
}

function getMergedData() {
    let returnObj = new Map();

    for (const fullObj of countData) {
        for (const line of fullObj[1]) {
            if (!returnObj.has(line.identifier)) {
                returnObj.set(line.identifier, {caseAmount: 0, innerAmount: 0, unitAmount: 0});
            }

            returnObj.get(line.identifier).caseAmount += line.caseAmount;
            returnObj.get(line.identifier).innerAmount += line.innerAmount;
            returnObj.get(line.identifier).unitAmount += line.unitAmount;
        }
    }
    return returnObj;
}


showAllCount();
displayCountLocations();


//TODO by default select first count location, generate
document.getElementById("count-area-container").querySelector("button").click();
