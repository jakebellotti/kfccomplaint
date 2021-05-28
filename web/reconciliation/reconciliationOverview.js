CloudDailyReconciliationAPI.initFirebase();

let weekStartDateInput = document.getElementById("week-start-date-input");

let tbody = document.getElementById("weekly-overview-table-body");

let dayTypeSelect = document.getElementById("day-type-select");
let createDayDateInput = document.getElementById("create-day-date-input");

let currentDate = new Date();
let mondayDate = MomentAPI.getMondayThisWeek();

weekStartDateInput.valueAsDate = mondayDate;

function createTDWithData(data) {
    let td = document.createElement("td");
    td.innerText = data;
    return td;
}

function buildButton(text) {
    let button = document.createElement("button");
    button.innerText = text;
    return button;
}

function createRowsEfficiently() {
    tbody.innerHTML = "";
    let weekStart = moment(weekStartDateInput.value).toDate();
    let weekEnd = moment(weekStartDateInput.value).add(6, 'days').toDate();

    ModalOverlay.showModalWindow("Loading...")
    CloudDailyReconciliationAPI.getDateRange(weekStart, weekEnd, function (list) {
        for (let i = 0; i < list.length; i++) {
            let row = document.createElement("tr");
            let date = moment(list[i].key, "DD-MM-YYYY");
            let data = list[i].value;
            let dateToString = date.format("DD-MM-YYYY");

            let isCurrentDay = (moment().format("DD-MM-YYYY") === date.format("DD-MM-YYYY"));
            if (isCurrentDay) {
                row.classList.add("current-day-row");
            }

            row.appendChild(createTDWithData(date.format('dddd')));
            row.appendChild(createTDWithData(date.format("DD/MM/YYYY")));
            row.appendChild(createTDWithData(data !== undefined));
            row.appendChild(createTDWithData(data === undefined ? "" : data.dayType));
            row.appendChild(createTDWithData(data === undefined ? "" : data.amManager));
            row.appendChild(createTDWithData(data === undefined ? "" : data.pmManager));

            let actionsTD = document.createElement("td");
            actionsTD.classList.add("actions-td");

            let createButton = buildButton("Create");
            createButton.classList.add("action-button");
            createButton.classList.add("create-button");
            createButton.onclick = function () {
                showCreateDayModalWindow(dateToString);
            };

            let viewButton = buildButton("View");
            viewButton.classList.add("action-button");
            viewButton.classList.add("view-button");
            viewButton.onclick = function () {
                window.open(`dailyRecon.html?openDate=${dateToString}`, "_target");
            };


            let deleteButton = buildButton("Delete");
            deleteButton.classList.add("action-button");
            deleteButton.classList.add("delete-button");

            deleteButton.onclick = function () {

                let result = confirm(`Are you sure that you want to delete reconciliation for ${dateToString}?`);
                if (!result) {
                    return;
                }
                ModalOverlay.showModalWindow("Deleting...");
                CloudDailyReconciliationAPI.deleteDay(dateToString, function () {
                    ModalOverlay.hideModalWindow();
                    alert("Deleted.");
                    createRowsEfficiently();
                });
            };

            if (!data) {
                actionsTD.appendChild(createButton);
            }
            if (data) {
                actionsTD.appendChild(viewButton);
                actionsTD.appendChild(deleteButton);
            }

            row.appendChild(actionsTD);
            tbody.appendChild(row);
        }
        ModalOverlay.hideModalWindow();
    });

}

function hideCreateDayModalWindow() {
    let overlay = document.querySelector(".modal-window-overlay");
    overlay.classList.remove("modal-window-overlay-shown");
}

function showCreateDayModalWindow(date) {
    let overlay = document.querySelector(".modal-window-overlay");
    overlay.classList.add("modal-window-overlay-shown");
    overlay.querySelector("input[type=date]").value = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
}

function populateCreateDayValues() {
    dayTypeSelect.innerHTML = "";
    for (const dayType of DailyReconciliationAPI.getDayTypes()) {
        let htmlOptionElement = document.createElement("option");
        htmlOptionElement.innerText = dayType.value;
        htmlOptionElement.value = dayType.key;
        dayTypeSelect.appendChild(htmlOptionElement);
    }
}

function weekStartInputChanged() {
    let newVal = weekStartDateInput.value;
    weekStartDateInput.valueAsDate = MomentAPI.getStartOfWeek(new Date(newVal));
    createRowsEfficiently();
}

function createDayButtonClicked() {
//    TODO make sure that everything is entered
//    TODO data validation, check that the date isn't already added
//    TODO insert the data and notify
//    TODO then once the data is added, we need to refresh the overview page
    let dayType = dayTypeSelect.value;
    let date = createDayDateInput.valueAsDate;

    //TODO loading indication

    ModalOverlay.showModalWindow("Creating day...");
    CloudDailyReconciliationAPI.createBlankDay(date, dayType, function () {
        hideCreateDayModalWindow();
        ModalOverlay.hideModalWindow();
        createRowsEfficiently();
    });
}

populateCreateDayValues();

createRowsEfficiently();

//TODO use date range to generate the list, show loading overlay
//TODO test getting a list of dates