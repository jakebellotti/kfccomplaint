let tbody = document.getElementById("weekly-overview-table-body");

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
            //TODO include this data if the row is actually present
            row.appendChild(createTDWithData(""));
            row.appendChild(createTDWithData(""));

            let actionsTD = document.createElement("td");
            let createButton = buildButton("Create");
            createButton.onclick = function () {
                showCreateDayModalWindow(dateToString);
            };

            let viewButton = buildButton("View");

            if (res === null) {
                actionsTD.appendChild(createButton);
                //    TODO add to database, on callback update this view, then open the reconciliation page
            }
            if (res !== null) {
                actionsTD.appendChild(viewButton);
            }
            //TODO onclick


            row.appendChild(actionsTD);
            tbody.appendChild(row);
        });


    }
}

function showCreateDayModalWindow(date) {
//    TODO don't create manually, just write in HTML lol

//    TODO create and then show a modal window, there will be multiple

    let modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-window-overlay");

    let modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-window");

    let headerText = document.createElement("p");
    headerText.innerText = "Create Day";
    modalWindow.appendChild(headerText);
    //TODO create the option

    modalOverlay.appendChild(modalWindow);
    document.body.appendChild(modalOverlay);
}

// console.log(currentDate);
// console.log(mondayDate);

createRows();