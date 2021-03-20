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
        let isCurrentDay = (moment().format("DD/MM/YYYY") === date.format("DD/MM/YYYY"));
        if (isCurrentDay) {
            row.classList.add("current-day-row");
        }

        row.appendChild(createTDWithData(date.format('dddd')));
        row.appendChild(createTDWithData(date.format('DD/MM/YYYY')));

        tbody.appendChild(row);
    }
}

// console.log(currentDate);
// console.log(mondayDate);

createRows();

DailyReconciliationAPI.dayExists("20/03/2021");