let tbody = document.getElementById("weekly-overview-table-body");

let currentDate = new Date();
let mondayDate = moment().subtract((currentDate.getDay() - 1), 'days').toDate();

//TODO fill with data from recon google sheets

function createTDWithData(data) {
    let td = document.createElement("td");
    td.innerText = data;
    return td;
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

        row.appendChild(createTDWithData(date.format('dddd')));
        row.appendChild(createTDWithData(dateToString));

        //TODO button to view it

        DailyReconciliationAPI.dayExists(dateToString, function (res) {
            row.appendChild(createTDWithData(res.found));
        });

        tbody.appendChild(row);
    }
}

// console.log(currentDate);
// console.log(mondayDate);

createRows();