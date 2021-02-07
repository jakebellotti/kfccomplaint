function createDividerRow(name) {
    let row = document.createElement("tr");
    row.classList.add("divider-row");
    let td = document.createElement("td");
    td.innerText = name;
    td.setAttribute("colspan", "7");
    row.appendChild(td);
    return row;
}

function createTableEntry(name) {
    let row = document.createElement("tr");
    row.classList.add("data-tr");

    let nameTD = document.createElement("td");
    nameTD.innerText = name;
    nameTD.classList.add("name-td");

    let openTD = document.createElement("td");
    openTD.classList.add("editable-td");
    openTD.onclick = function () {
        //TODO rename
        createOriginalModalWindow();
    };

    let receivedTD = document.createElement("td");
    receivedTD.classList.add("editable-td");

    let wastedTD = document.createElement("td");
    wastedTD.classList.add("editable-td");
    let totalTD = document.createElement("td");
    let closedTD = document.createElement("td");
    closedTD.classList.add("editable-td");
    let soldTD = document.createElement("td");

    row.appendChild(nameTD);
    row.appendChild(openTD);
    row.appendChild(receivedTD);
    row.appendChild(wastedTD);
    row.appendChild(totalTD);
    row.appendChild(closedTD);
    row.appendChild(soldTD);

    return row;
}

function createTableEntries() {
    let products = document.getElementById("products");
    //TODO dividers
    products.appendChild(createDividerRow("Chicken"));
    products.appendChild(createTableEntry("Original Recipe"));
    products.appendChild(createTableEntry("Hot & Spicy"));
    products.appendChild(createTableEntry("Original Fillets"));
    products.appendChild(createTableEntry("Zinger Fillets"));
    products.appendChild(createTableEntry("Wicked Wings"));

    products.appendChild(createDividerRow("Freezer"));
    products.appendChild(createTableEntry("Chicken Nuggets"));
    products.appendChild(createTableEntry("Popcorn Chicken"));
    products.appendChild(createTableEntry("Chips"));
    products.appendChild(createTableEntry("Bacon"));
    products.appendChild(createTableEntry("Chocolate Mousse"));

    products.appendChild(createDividerRow("Salads"));
    products.appendChild(createTableEntry("Diced Tomato"));
    products.appendChild(createTableEntry("Lettuce"));
    products.appendChild(createTableEntry("Coleslaw (Small)"));
    products.appendChild(createTableEntry("Coleslaw (Large)"));

    products.appendChild(createDividerRow("Breads"));
    products.appendChild(createTableEntry("Burger Buns"));
    products.appendChild(createTableEntry("Dinner Rolls"));
    products.appendChild(createTableEntry("Flatbread"));
    products.appendChild(createTableEntry("Tortillas"));

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

function createOriginalModalWindow() {
    let modalWindowBackground = document.createElement("div");
    modalWindowBackground.classList.add("modal-window-background");

    let modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-window");

    let header = document.createElement("p");
    header.classList.add("unit-input-header");
    header.innerText = "Original Recipe";
    //TODO custom header

    let structure = [
        [
            {
                name: "Crates",
                unit: "data-input-single-unit",
                unitCount: 108
            },
            {
                name: "Bags",
                unit: "data-input-single-unit",
                unitCount: 18
            },
            {
                name: "Individual",
                unit: "data-input-single-unit",
                unitCount: 1
            }
        ]
    ];

    modalWindow.appendChild(header);

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

            if (currentInput.unit.toLowerCase().indexOf("data-input-single-unit".toLowerCase()) > -1) {
                currentDivInput.onkeyup = function () {
                    onIndividualUnitUpdated(currentDivInput);
                };
            }

            currentDiv.appendChild(currentDivInput);

            container.appendChild(currentDiv);

            //     <!-- <input class="data-input-single-unit" onkeyup="onIndividualUnitUpdated(this)" type="number" data-unit-count="108">-->
            //    TODO create input div and fields, then add to main
        }

        modalWindow.appendChild(container);
    }


    modalWindowBackground.appendChild(modalWindow);
    document.body.appendChild(modalWindowBackground);
    /**
     * <div class="modal-window-background">
     <div class="modal-window">
     <p class="unit-input-header">Original Recipe</p>
     <div class="unit-input-container">
     <div>
     <p>Crates</p>
     <input class="data-input-single-unit" onkeyup="onIndividualUnitUpdated(this)" type="number" data-unit-count="108">
     </div>
     <div>
     <p>Bags</p>
     <input class="data-input-single-unit" onkeyup="onIndividualUnitUpdated(this)" type="number" data-unit-count="18">
     </div>
     <div>
     <p>Individual</p>
     <input class="data-input-single-unit" onkeyup="onIndividualUnitUpdated(this)" type="number" data-unit-count="1">
     </div>
     </div>
     <div class="unit-input-container">
     <div>
     <p>Total</p>
     <input onkeyup="onTotalInputUpdated(this)" type="number" class="data-input-total-count">
     </div>
     </div>
     <div class="unit-input-container">
     <div>
     <p>Head</p>
     <input onkeyup="onHeadInputUpdated(this)" type="number" class="data-input-total-count-head">
     </div>
     </div>
     <button class="unit-input-accept-button">Accept</button>
     <button class="unit-input-accept-button">Cancel</button>
     </div>
     </div>
     */
}

//TODO programatically create input popup

createTableEntries();