//TODO append the data so we can view
let itemsTableTbody = document.getElementById("items-table-tbody");


function createElementWithData(type, data) {
    let td = document.createElement(type);
    td.innerText = data;
    return td;
}

function createItemRow(itemData) {
    let tr = document.createElement("tr");

    let nameTD = document.createElement("td");
    nameTD.appendChild(createElementWithData("p", "Pref: " + itemData.itemNamePref));
    nameTD.appendChild(createElementWithData("p", "Full: " + itemData.itemNameFull));

    tr.appendChild(nameTD);
    tr.appendChild(createElementWithData("td", itemData.itemID));
    tr.appendChild(createElementWithData("td", itemData.itemIdentifier));
    //TODO determine if it is active

    let active = ItemData.isItemActive(itemData);
    //TODO add the toggle
    let activeTD = createElementWithData("td", active);
    activeTD.classList.add(`item-active-td-${active ? "enabled" : "disabled"}`);

    activeTD.onclick = function () {
        ItemData.setItemActivationOverride(itemData.itemIdentifier, !active);
        addItemsToTable();
        //    TODO make it a button maybe
    };

    tr.appendChild(activeTD);


    tr.appendChild(createElementWithData("td", itemData.availability));
    //TODO check if not null
    if (itemData.storageCase) {
        tr.appendChild(createElementWithData("td", `${itemData.storageCase.name}: ${itemData.storageCase.quantity}`));
    } else {
        tr.appendChild(createElementWithData("td", "-"));
    }

    if (itemData.storageInner) {
        tr.appendChild(createElementWithData("td", `${itemData.storageInner.name}: ${itemData.storageInner.quantity}`));
    } else {
        tr.appendChild(createElementWithData("td", "-"));
    }

    if (itemData.storageUnit) {
        tr.appendChild(createElementWithData("td", `${itemData.storageUnit.name}: ${itemData.storageUnit.quantity}`));
    } else {
        tr.appendChild(createElementWithData("td", "-"));
    }

    let calculationMethods = document.createElement("td");
    // calculationMethods.appendChild()
    //TODO loop
    for (const cm of itemData.calculationMethods) {
        calculationMethods.appendChild(createElementWithData("p", `${cm.name}: ${cm.method}`));
    }
    tr.appendChild(calculationMethods);

    return tr;
}

function createHeaderRow(headerName) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.classList.add("header-row");
    td.innerText = headerName;
    td.setAttribute("colspan", "9");
    tr.appendChild(td);
    return tr;
}

function addItemsToTable() {
    itemsTableTbody.innerHTML = "";
    itemsTableTbody.appendChild(createHeaderRow("Chicken"));
    for (const chickenItem of ItemData.getAllChickenItems()) {
        itemsTableTbody.appendChild(createItemRow(chickenItem));
    }

    itemsTableTbody.appendChild(createHeaderRow("Frozen Chicken"));
    for (const chickenItem of ItemData.getAllFrozenChickenItems()) {
        itemsTableTbody.appendChild(createItemRow(chickenItem));
    }
    itemsTableTbody.appendChild(createHeaderRow("Salads"));
    for (const chickenItem of ItemData.getAllSaladItems()) {
        itemsTableTbody.appendChild(createItemRow(chickenItem));
    }
    itemsTableTbody.appendChild(createHeaderRow("Freezer"));
    for (const chickenItem of ItemData.getAllFreezerItems()) {
        itemsTableTbody.appendChild(createItemRow(chickenItem));
    }
    itemsTableTbody.appendChild(createHeaderRow("Bread"));
    for (const chickenItem of ItemData.getAllBreadItems()) {
        itemsTableTbody.appendChild(createItemRow(chickenItem));
    }
    itemsTableTbody.appendChild(createHeaderRow("Misc"));
    for (const chickenItem of ItemData.getAllMiscItems()) {
        itemsTableTbody.appendChild(createItemRow(chickenItem));
    }
    // console.log(ItemData.getAllChickenItems());
    // console.log(ItemData.getUniqueCategories());
}

addItemsToTable();