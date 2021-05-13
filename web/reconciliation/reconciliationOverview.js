let tbody = document.getElementById("weekly-overview-table-body");

let dayTypeSelect = document.getElementById("day-type-select");
let createDayDateInput = document.getElementById("create-day-date-input");

let currentDate = new Date();
let mondayDate = moment().subtract((currentDate.getDay() - 1), 'days').toDate();

//TODO fill with data from recon google sheets

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

function createRows() {
    tbody.innerHTML = "";

    for (let i = 0; i < 7; i++) {
        let row = document.createElement("tr");
        let date = moment(mondayDate).add(i, 'days');
        let dateToString = date.format("DD/MM/YYYY");

        let isCurrentDay = (moment().format("DD/MM/YYYY") === dateToString);
        if (isCurrentDay) {
            row.classList.add("current-day-row");
        }


        //TODO create each row fully

        //TODO button to view it

        DailyReconciliationAPI.dayExists(dateToString, function (res) {
            //TODO make sure this works from localstorage first
            row.appendChild(createTDWithData(date.format('dddd')));
            row.appendChild(createTDWithData(dateToString));
            row.appendChild(createTDWithData(res !== null));
            row.appendChild(createTDWithData(res === null ? "" : res.dayType));
            //TODO include this data if the row is actually present
            row.appendChild(createTDWithData(res == null ? "" : res.amManager));
            row.appendChild(createTDWithData(res == null ? "" : res.pmManager));

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
                //    TODO open in new tab, pass date param
            };

            let deleteButton = buildButton("Delete");
            deleteButton.classList.add("action-button");
            deleteButton.classList.add("delete-button");

            deleteButton.onclick = function () {
                //    TODO implement this
                //    TODO ask for confirmation first
                let deleteResult = DailyReconciliationAPI.deleteDay(dateToString);
                alert(deleteResult ? "Day deleted successfully." : "Error deleting the day.");
                createRows();
            };

            if (res === null) {
                actionsTD.appendChild(createButton);
                //TODO show the add page with the date, insert and then update
                //    TODO add to database, on callback update this view, then open the reconciliation page
            }
            if (res !== null) {
                actionsTD.appendChild(viewButton);
                actionsTD.appendChild(deleteButton);
            }
            //TODO onclick


            //TODO delete button maybe
            row.appendChild(actionsTD);
            tbody.appendChild(row);
        });


    }
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

function createDayButtonClicked() {
//    TODO make sure that everything is entered
//    TODO data validation, check that the date isn't already added
//    TODO insert the data and notify
//    TODO then once the data is added, we need to refresh the overview page
    let dayType = dayTypeSelect.value;
    let date = createDayDateInput.valueAsDate;

    DailyReconciliationAPI.createBlankDay(date, dayType);
    hideCreateDayModalWindow();
    createRows();
}

populateCreateDayValues();
createRows();