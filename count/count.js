console.log(allStructures);

let countTableBody = document.getElementById("count-table-body");

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

function createUnitDiv(data) {
    let containerDiv = document.createElement("div");
    if (data === null || data === undefined) {
        return containerDiv;
    }

    containerDiv.classList.add("item-count-container-unit");

    let input = document.createElement("input");
    input.classList.add("number-input");
    input.setAttribute("type", "text");

    let p = document.createElement("p");
    p.innerText = data.unitName;

    containerDiv.appendChild(input);
    containerDiv.appendChild(p);
    return containerDiv;
}

//TODO update row

function updateTotal(row) {
    console.log("update total");
    console.log(row);
}

function countChanged(row, input, total) {
    let value = input.value;
    //TODO nan error

    let parsedValue = parseFloat(value);

    total.value = (parsedValue) * input.dataset.unitQuantity;
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
    p.innerText = `${data.name} x ${data.quantity} ${data.unitName}`;

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
    div.classList.add("item-count-container-inner");

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

        let calcP = document.createElement("p");
        calcP.innerText = currentData.name;

        calcDiv.appendChild(calcInput);
        calcDiv.appendChild(calcP);

        div.appendChild(calcDiv);
    }

    return div;
}


for (let i = 0; i < allStructures.length; i++) {
    let currentCategory = allStructures[i];
    let currentStructures = currentCategory.structures;
    countTableBody.appendChild(createCountTableHeader(currentCategory.name));

    for (let i2 = 0; i2 < currentStructures.length; i2++) {
        let currentStructure = currentStructures[i2];

        let currentRow = document.createElement("tr");
        let nameTD = document.createElement("td");
        nameTD.classList.add("item-count-name");
        nameTD.innerText = currentStructure.name;
        // itemCountContainerDiv.classList.add("item-count-container-inner");

        let caseTD = document.createElement("td");
        caseTD.appendChild(createCountDiv(currentStructure.data.case, currentRow, "item-count-container-case"));

        let innerTD = document.createElement("td");
        innerTD.appendChild(createCountDiv(currentStructure.data.inner, currentRow,"item-count-container-inner"));

        let unitTD = document.createElement("td");
        unitTD.appendChild(createUnitDiv(currentStructure.data.unit));

        let totalTD = document.createElement("td");
        totalTD.appendChild(createTotalDiv(currentStructure.data.total));

        currentRow.appendChild(nameTD);
        currentRow.appendChild(caseTD);
        currentRow.appendChild(innerTD);
        currentRow.appendChild(unitTD);
        currentRow.appendChild(totalTD);
        countTableBody.appendChild(currentRow);
    }

//    TODO loop, add all count items
}
