let viewRangeStartDate = document.getElementById("view-range-start-date");
let viewRangeEndDate = document.getElementById("view-range-end-date");

let soldProductTableHeader = document.getElementById("sold-product-table-header");
let soldProductsTbody = document.getElementById("sold-products-tbody");

let showOnlyProductColumnsCheckBox = document.getElementById("show-only-product-columns-checkbox");
let selectDaySelect = document.getElementById("select-day-select");

let resizeToViewportButton = document.getElementById("resize-to-viewport-button");

CloudDailyReconciliationAPI.initFirebase();

function resizeToViewportButtonClicked() {
//    TODO if no items shown, return
//    TODO if we are already resized, reset it
    let viewportWidth = window.innerWidth;
    let productsTable = document.getElementById("sold-products-table");
    let tableWidth = productsTable.offsetWidth;
    let newWidthPercentage = (((100 / tableWidth) * viewportWidth) / 100);

    if (productsTable.style.transform !== "") {
        productsTable.style.transform = "";
        return;
    }

    productsTable.style.transform = `scale(${newWidthPercentage})`;
}


function createElementWithInnerText(element, text, classes) {
    let toReturn = document.createElement(element);
    toReturn.innerText = text;

    if (classes) {
        for (const className of classes) {
            toReturn.classList.add(className);
        }
    }

    return toReturn;
}

function getUniqueItemIdentifiersFromData(data) {
    let uniqueItemIdentifiers = [];

    for (const day of data) {
        if (day.value !== undefined) {
            for (const item of day.value.data) {
                if (!uniqueItemIdentifiers.includes(item.identifier)) {
                    uniqueItemIdentifiers.push(item.identifier);
                }
            }
        }
    }

    return uniqueItemIdentifiers;
}

function selectDaySelectChanged() {
    for (const row of document.querySelectorAll(".highlighted-day-row")) {
        row.classList.remove("highlighted-day-row");
    }

    let selected = selectDaySelect.value;
    if (selected === "none") {
        return;
    }


    for (const row of document.querySelectorAll(`.row-day-${selected}`)) {
        row.classList.add("highlighted-day-row");
    }
}

function updateSoldItemsData(data) {
    let uniqueIdentifiers = getUniqueItemIdentifiersFromData(data);
//TODO then order them however we would like first

    soldProductTableHeader.innerHTML = "";
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Day", ["min-width-td"]));
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Date", ["min-width-td"]));
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Managers", ["min-width-td", "non-product-data"]));
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Sales", ["min-width-td", "non-product-data"]));
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Sales Acc", ["min-width-td", "non-product-data"]));
    for (const ui of uniqueIdentifiers) {
        let itemData = ItemData.getDataForIdentifier(ui);
        soldProductTableHeader.appendChild(createElementWithInnerText("th", itemData.itemNamePref, ["min-width-td"]));
    }
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Cash", ["min-width-td", "non-product-data"]));
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Customers", ["min-width-td", "non-product-data"]));
    soldProductTableHeader.appendChild(createElementWithInnerText("th", "Notes", ["min-width-td", "non-product-data"]));

    //TODO add spacer at bottom of every sunday

    soldProductsTbody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const day = data[i];
        // for (const day of data) {
        let tr = document.createElement("tr");

        let momentDate = moment(day.key, "DD-MM-YYYY");
        let dayAsString = momentDate.format("dddd").toLowerCase();

        tr.classList.add(`row-day-${dayAsString}`);
        //TODO don't show null or empty strings
        //TODO if the day.value is null, make opacity lower?

        tr.appendChild(createElementWithInnerText("td", momentDate.format("dddd"), ["min-width-td"]));
        tr.appendChild(createElementWithInnerText("td", momentDate.format("DD/MM/YYYY"), ["min-width-td"]));
        tr.appendChild(createElementWithInnerText("td", day.value ? `${day.value.amManager} | ${day.value.pmManager}` : "", ["min-width-td", "non-product-data"]));
        //TODO format currency
        tr.appendChild(createElementWithInnerText("td", day.value ? day.value.sales : "", ["min-width-td", "non-product-data"]));
        //TODO calculate this
        tr.appendChild(createElementWithInnerText("td", "", ["min-width-td", "non-product-data"]));

        let dayObj = DailyReconciliationDay.constructFromJSON(day.value);
        //TODO this may be null

        for (const ui of uniqueIdentifiers) {
            let itemData = ItemData.getDataForIdentifier(ui);
            if (dayObj !== null) {
                let sold = dayObj.calculateSold(ui);
                tr.appendChild(createElementWithInnerText("td", sold ? sold : "", ["min-width-td"]));
            } else {
                tr.appendChild(createElementWithInnerText("td", "", ["min-width-td"]));
            }
        }
        tr.appendChild(createElementWithInnerText("td", day.value ? day.value.cashVariance : "", ["min-width-td", "non-product-data"]));
        tr.appendChild(createElementWithInnerText("td", day.value ? day.value.customerCount : "", ["min-width-td", "non-product-data"]));
        tr.appendChild(createElementWithInnerText("td", day.value ? day.value.notes : "", ["min-width-td", "non-product-data"]));

        soldProductsTbody.appendChild(tr);

        if (dayAsString === "sunday" && (i !== (data.length - 1))) {

            let spacerRow = document.createElement("tr");
            spacerRow.classList.add("spacer-tr");
            soldProductsTbody.appendChild(spacerRow);
        }
        //    TODO if the day is sunday, add a custom row spacer
    }

    showOnlyProductColumnsChanged();
    selectDaySelectChanged();
}

function updateViewingRange() {
//    TODO do the query, display the data
//     updateSoldItemsData(testData);
    let startDateString = moment(viewRangeStartDate.value, "YYYY-MM-DD").format("DD-MM-YYYY");
    let endDateString = moment(viewRangeEndDate.value, "YYYY-MM-DD").format("DD-MM-YYYY");

    ModalOverlay.showModalWindow(`Loading data range ${startDateString} - ${endDateString}`);
    CloudDailyReconciliationAPI.getDateRange(startDateString, endDateString, function (list) {
        updateSoldItemsData(list);
        ModalOverlay.hideModalWindow();
    });
}

function showOnlyProductColumnsChanged() {
    for (const element of document.querySelectorAll(".hide-data")) {
        element.classList.remove("hide-data");
    }

    if (showOnlyProductColumnsCheckBox.checked) {
        for (const nonProduct of document.querySelectorAll(".non-product-data")) {
            nonProduct.classList.add("hide-data");
        }
    }
}

//TODO don't hardcode this, instead make it 'this week' preset
// viewRangeStartDate.value = "2021-05-24";
// viewRangeEndDate.value = "2021-05-30";

let weekStart = moment(MomentAPI.getMondayThisWeek());
let weekEnd = moment(weekStart).add(6, "days");

viewRangeStartDate.value = weekStart.format("YYYY-MM-DD");
viewRangeEndDate.value = weekEnd.format("YYYY-MM-DD");

// updateSoldItemsData(testData);

//TODO now insert data

//TODO take test data, match it to the item config, render the table

//TODO set default data, then update sold items