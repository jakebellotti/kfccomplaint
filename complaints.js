let loadedData = null;

//TODO add this data by default, but allow our own custom list
let defaultManagerList = [
    "Ian Keogh",
    "Jake Bellotti",
    "Thomas Lilford",
    "Andrew Oboh",
    "Taeleisha Hammond",
    "Susan Lilford"
];

let defaultComplaintNatureList = [
    "Missing Product",
    "Wrong Product",
    "Product Quality",
    "Foreign Object",
    "Long Wait/Bad Service",
    "Hygiene"
];

//TODO add values, make sure they are ordered alpabetically too
let defaultStaffList = [];

let shownComplaintsTBody = document.getElementById("shown-complaints-tbody");

let resolveComplaintWindow = document.getElementById("resolve-complaint-window");

//Add complaint window
let complaintDateInput = document.getElementById("add-complaint-date");
let complaintTimeInput = document.getElementById("add-complaint-time");
let customerNameInput = document.getElementById("add-complaint-customer-name");
let customerNumberInput = document.getElementById("add-complaint-customer-number");
let complaintNatureSelect = document.getElementById("add-complaint-nature-select");
let creditOfferedBySelect = document.getElementById("add-complaint-credit-offered-by-select");
let orderDescriptionTextArea = document.getElementById("add-complaint-order-description");
let creditDescriptionTextArea = document.getElementById("add-complaint-credit-description");
//TODO maybe rename to include that it is the name iof the staff
let staffInvolvedSelect = document.getElementById("staff-involved-select");
let staffInvolvedRoleSelect = document.getElementById("staff-involved-role-select");
let staffInvolvedTBody = document.getElementById("staff-involved-tbody");

//Resolve complaint window
let resolveComplaintClosedBySelect = document.getElementById("resolve-complaint-closed-by-select");
let resolveComplaintPromoFreeInput = document.getElementById("resolve-complaint-promo-free");

let openComplaint = null;

let filterButtons = document.querySelectorAll("#show-complaints-buttons button");


//Edit list window
let editListWindowModalWindow = document.getElementById("edit-list-modal-window");
let editListWindowHeaderSpan = document.getElementById("edit-list-span");
let editListWindowSelect = document.getElementById("edit-list-select");
let editListWindowSaveButton = document.getElementById("edit-list-save-button");
let editListWindowCancelButton = document.getElementById("edit-list-cancel-button");
let editListWindowInput = document.getElementById("edit-list-input");


/**
 * Gets the type of filter we are applying. Open, closed or all.
 * @returns {null|*}
 */
function getComplaintsFilterType() {
    for (const filterButton of filterButtons) {
        if (filterButton.classList.contains("blue")) {
            return filterButton.innerText;
        }
    }
    return null;
}

function clearAllFilterButtons() {
    for (const filterButton of filterButtons) {
        filterButton.classList.remove("blue");
    }
}

function filterButtonClicked(e) {
    clearAllFilterButtons();
    e.classList.add("blue");
    showComplaints();
}

function getTimeStringFromDate(date) {
    let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return hour + ":" + minutes;
}

function showAddComplaintWindow() {
    addComplaintWindowClearInputs();
    complaintDateInput.valueAsDate = new Date();
    complaintTimeInput.value = getTimeStringFromDate(new Date());

    document.getElementById("add-complaint-modal").style.display = "block";
    customerNameInput.focus();
}

function addComplaintWindowClearInputs() {
    complaintDateInput.value = "";
    complaintTimeInput.value = "";
    customerNameInput.value = "";
    customerNumberInput.value = "";
    complaintNatureSelect.selectedIndex = -1;
    creditOfferedBySelect.selectedIndex = -1;
    orderDescriptionTextArea.value = "";
    creditDescriptionTextArea.value = "";
    staffInvolvedTBody.innerHTML = "";
}

function getData() {

    let item = localStorage.getItem("complaintData");
    if (item == null) {
        loadedData = {
            complaints: [],
            complaintNatureList: [],
            managerList: [],
            staffList: []
        };

        for (const string of defaultComplaintNatureList) {
            loadedData.complaintNatureList.push(string);
        }

        for (const string of defaultManagerList) {
            loadedData.managerList.push(string);
        }

        for (const string of defaultStaffList) {
            loadedData.staffList.push(string);
        }

        return;
    }
    loadedData = JSON.parse(item);
}

function saveData(data) {
    localStorage.setItem("complaintData", JSON.stringify(data));
}

function getSelectValues(element) {
    let result = [];
    for (let i = 0; i < element.options.length; i++) {
        let currentOption = element.options[i];
        if (currentOption.selected) {
            result.push(currentOption.value);
        }
    }
    return result;
}

function addComplaintWindow_AddButtonClicked() {
    let complaintDate = complaintDateInput.value;
    if (complaintDate === null || complaintDate.length === 0) {
        alert("You must enter a date!");
        complaintDateInput.focus();
        return;
    }

    let complaintTime = complaintTimeInput.value;
    if (complaintTime === null || complaintTime === undefined || complaintTime.length === 0) {
        alert("You must enter the time of the complaint!");
        complaintTimeInput.focus();
        return;
    }

    let customerName = customerNameInput.value.trim();
    if (customerName === null || customerName.length === 0) {
        alert("You must enter a customer name!")
        customerNameInput.focus();
        return;
    }

    let customerNumber = customerNumberInput.value.trim();
    if (customerNumber === null || customerNumber.length === 0) {
        alert("You must enter a customer number!");
        customerNumberInput.focus();
        return;
    }

    let complaintNatureValues = getSelectValues(complaintNatureSelect);
    if (complaintNatureValues.length === 0) {
        alert("You must select the nature of complaint!");
        return;
    }

    let creditOfferedByValues = getSelectValues(creditOfferedBySelect);
    if (creditOfferedByValues.length === 0) {
        alert("You must specify who offered the credit!");
        return;
    }

    let orderDescription = orderDescriptionTextArea.value.trim();
    if (orderDescription.length === 0) {
        alert("You must enter an order description!");
        return;
    }

    let creditDescription = creditDescriptionTextArea.value.trim();
    if (creditDescription.length === 0) {
        alert("You must enter a description of the credit!");
        return;
    }

    hideAddComplaintWindow();
    loadedData.complaints.push({
        complaintDate: complaintDate,
        complaintTime: complaintTime,
        customerName: customerName,
        customerNumber: customerNumber,
        natureOfComplaint: complaintNatureValues,
        creditOfferedBy: creditOfferedByValues[0],
        staffInvolved: getValuesFromStaffInvolvedTable(),
        orderDescription: orderDescription,
        creditDescription: creditDescription,
        resolutionDate: null,
        resolvedBy: null,
        creditReceiptNumber: null
    });
    saveData(loadedData);

    showComplaints();
}

function hideAddComplaintWindow() {
    document.getElementById("add-complaint-modal").style.display = "none";
}

function addComplaintWindow_CancelButtonClicked() {
    hideAddComplaintWindow();
}

function createTextAreaTD(innerData) {
    let td = document.createElement("td");
    let textArea = document.createElement("textarea");
    textArea.onclick = function () {
        alert(innerData);
    };

    textArea.classList.add("table-textarea");
    textArea.readOnly = true;
    textArea.innerText = innerData;

    td.appendChild(textArea);
    return td;
}

function createTD(innerData) {
    let td = document.createElement("td");
    td.innerText = innerData;
    return td;
}


function createButton(text) {
    let buttonElement = document.createElement("button");
    buttonElement.classList.add("waves-light");
    buttonElement.classList.add("btn");
    buttonElement.innerText = text;
    return buttonElement;
}

function dateToYMD(date) {
    if (typeof date === "string") {
        date = new Date(date);
    }

    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}

function createSelectMultiple() {
    let htmlSelectElement = document.createElement("select");
    htmlSelectElement.classList.add("show-select");
    htmlSelectElement.classList.add("select-multiple-display-only");
    htmlSelectElement.setAttribute("multiple", "true");

    return htmlSelectElement;
}

function formatTime(time) {
    let split = time.split(":");
    let hours = parseInt(split[0]);
    let minutes = parseInt(split[1]);


    return (hours > 12 ? (hours - 12) : hours) + ":" + (minutes < 10 ? "0" : "") + minutes +" " + (hours >= 12 ? "PM" : "AM");
}

function createComplaintTableRow(complaint) {
    let tr = document.createElement("tr");

    let filterType = getComplaintsFilterType();
    //TODO change depending on filter type

    let dateTimeTD = document.createElement("td");
    dateTimeTD.appendChild(createP(dateToYMD(complaint.complaintDate)));
    dateTimeTD.appendChild(createP(formatTime(complaint.complaintTime)));
    tr.appendChild(dateTimeTD);

    tr.appendChild(createTD(capitalizeTheFirstLetterOfEachWord(complaint.customerName)));
    tr.appendChild(createTD(complaint.customerNumber));

    let cnSelect = createSelectMultiple();
    let cnTD = document.createElement("td");
    for (const natureOfComplaintElement of complaint.natureOfComplaint) {
        let htmlOptionElement = document.createElement("option");
        htmlOptionElement.innerText = natureOfComplaintElement;
        cnSelect.appendChild(htmlOptionElement);
    }

    cnTD.appendChild(cnSelect);
    tr.appendChild(cnTD);

    let siSelect = createSelectMultiple();
    for (const staffInvolvedElement of complaint.staffInvolved) {
        let siOption = document.createElement("option");
        siOption.innerText = staffInvolvedElement.staffName + "  @ " + staffInvolvedElement.staffRole;
        siSelect.appendChild(siOption);
    }
    let siTD = document.createElement("td");
    siTD.appendChild(siSelect);

    // tr.appendChild(createTD(complaint.staffInvolved));
    tr.appendChild(siTD);

    tr.appendChild(createTextAreaTD(complaint.orderDescription));
    tr.appendChild(createTextAreaTD(complaint.creditDescription));
    tr.appendChild(createTD(complaint.creditOfferedBy));

    let resolutionString = "-";

    if (complaint.resolutionDate !== null) {
        resolutionString = `${dateToYMD(complaint.resolutionDate)} by ${complaint.resolvedBy}`;
    }
    tr.appendChild(createTD(resolutionString));

    let actionsTD = document.createElement("td");
    actionsTD.classList.add("actions-td");

    if (complaint.resolutionDate === null) {
        let resolveButton = createButton("Resolve");
        resolveButton.classList.add("btn-small");
        resolveButton.onclick = function () {
            openComplaint = complaint;
            showResolveComplaintWindow();
        };
        actionsTD.appendChild(resolveButton);
    }

    let deleteButton = createButton("Delete");
    deleteButton.classList.add("red");
    deleteButton.classList.add("darken-3");
    deleteButton.classList.add("btn-small");
    deleteButton.onclick = function () {
        let indexOf = loadedData.complaints.indexOf(complaint);

        let shouldDelete = confirm("Are you sure that you want to delete this complaint?");
        if (shouldDelete) {
            loadedData.complaints.splice(indexOf, 1);
            saveData(loadedData);
            showComplaints();
        }
    };
    actionsTD.appendChild(deleteButton);

    tr.appendChild(actionsTD);
    return tr;
}

function textEqualsCaseInsensitive(text1, text2) {
    return text1.toLowerCase() === text2.toLowerCase();
}

function textContainsCaseInsensitive(search, text2) {
    search = search.toLowerCase();
    text2 = text2.toLowerCase();
    return text2.toLowerCase().indexOf(search.toLowerCase()) >= 0;
}

function updateResultsAccordingToSearch() {
    showComplaints();
}

function getComplaintsMatchingSearchCriteria() {
    //TODO do proper filtering
    //TODO if no search, ignore
    let filterType = getComplaintsFilterType().toLowerCase();

    let results = [];

    let searchInput = document.getElementById("show-complaints-filter-search-name-input").value;

    for (const complaint of loadedData.complaints) {
        let nameMatch = textContainsCaseInsensitive(searchInput, complaint.customerName);
        let numberMatch = textContainsCaseInsensitive(searchInput, complaint.customerNumber);
        let filterMatch = textEqualsCaseInsensitive(filterType, "all");

        if (textEqualsCaseInsensitive(filterType, "open")) {
            filterMatch = complaint.resolutionDate === null;
        } else if (textEqualsCaseInsensitive(filterType, "closed")) {
            filterMatch = complaint.resolutionDate !== null;
        }

        // if (nameMatch && filterMatch) {
        if (filterMatch && (nameMatch || numberMatch)) {
            results.push(complaint);
        }
    }

    // return loadedData.complaints;
    return results;
}

function showComplaints() {
//    TODO allow filtering etc
//    TODO use document fragments

    shownComplaintsTBody.innerHTML = "";

    //TODO make sure to order correctly by date

    let matching = getComplaintsMatchingSearchCriteria();
    document.getElementById("total-results-text").innerText = `Showing ${matching.length} of ${loadedData.complaints.length} results`;

    for (const complaint of matching) {
        shownComplaintsTBody.appendChild(createComplaintTableRow(complaint));
    }

}

function showSettingsWindow() {
    document.getElementById("settings-window").style.display = "block";
}

function hideSettingsWindow() {
    document.getElementById("settings-window").style.display = "none";
}

function settings_backupDataButtonClicked() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([localStorage.getItem("complaintData")], {
        type: "text/plain"
    }));
    a.setAttribute("download", "kfccomplaintsbackup.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function createOptionWithData(text) {
    let htmlOptionElement = document.createElement("option");
    htmlOptionElement.value = text;
    htmlOptionElement.innerText = text;
    return htmlOptionElement;
}

function clearSelectOptions(select) {
    select.innerHTML = "";
}

function addOptionsToComplaintNatureSelect() {
    clearSelectOptions(complaintNatureSelect);
    for (const string of loadedData.complaintNatureList) {
        complaintNatureSelect.appendChild(createOptionWithData(capitalizeTheFirstLetterOfEachWord(string)));
    }
}

function addOptionsToCreditOfferedBySelect() {
    for (const e of document.querySelectorAll(".credit-offered-by-select")) {
        clearSelectOptions(e);
        for (const string of loadedData.managerList) {
            e.appendChild(createOptionWithData(capitalizeTheFirstLetterOfEachWord(string)));
        }
    }
}

function showResolveComplaintWindow() {
    resolveComplaintClosedBySelect.selectedIndex = -1;
    resolveComplaintPromoFreeInput.value = "";

    resolveComplaintWindow.style.display = "block";
}

function hideShowResolveComplaintWindow() {
    openComplaint = null;
    resolveComplaintWindow.style.display = "none";
}

function resolveComplaint_SaveButtonClicked() {
    let creditClosedByValues = getSelectValues(resolveComplaintClosedBySelect);
    if (creditClosedByValues.length === 0) {
        alert("You must select who the complaint was closed by!");
        return;
    }

    let promoFreeNumber = resolveComplaintPromoFreeInput.value.trim();
    if (promoFreeNumber.length === 0) {
        let result = confirm("No receipt number has been entered for Promo Free. Any credit items should be put through the tills. If this is unnecessary, press OK, or cancel to enter the receipt number.");
        if (result === false) {
            return;
        }
    }

    let indexOf = loadedData.complaints.indexOf(openComplaint);
    if (indexOf === -1) {
        alert("Error occurred when resolving complaint. Contact Jake.");
        return;
    }

    loadedData.complaints[indexOf].resolutionDate = new Date();
    loadedData.complaints[indexOf].resolvedBy = creditClosedByValues[0];
    loadedData.complaints[indexOf].creditReceiptNumber = promoFreeNumber.length > 0 ? promoFreeNumber : null;
    saveData(loadedData);
    hideShowResolveComplaintWindow();
    showComplaints();
}

function showReportsWindow() {
    addDataToReports();
    document.getElementById("reports-window").style.display = "block";
}

function hideReportsWindow() {
    document.getElementById("reports-window").style.display = "none";
}

function createReportHeader(text) {
    let p = document.createElement("p");
    p.classList.add("report-header");
    p.innerText = text;
    return p;
}

function createP(text) {
    let htmlParagraphElement = document.createElement("p");
    htmlParagraphElement.innerText = text;
    return htmlParagraphElement;
}

function addIncidentsPerCategoryReportData(resultsContainer) {
    resultsContainer.appendChild(createReportHeader("Incidents Per Complaint Type"));
    //TODO order by highest first
    let data = new Map();

    for (const complaint of loadedData.complaints) {
        for (const natureOfComplaint of complaint.natureOfComplaint) {
            if (!data.has(natureOfComplaint)) {
                data.set(natureOfComplaint, 1);
            } else {
                data.set(natureOfComplaint, data.get(natureOfComplaint) + 1);
            }
        }
    }

    for (const datum of data) {
        let p = document.createElement("p");
        p.innerText = `${datum[0]}: ${datum[1]}`;
        resultsContainer.appendChild(p);
    }
}

function addIncidentsPerTimeFrame(resultsContainer) {
    resultsContainer.appendChild(createReportHeader("Incidents Per Timeframe"));

    resultsContainer.appendChild(createP("Incidents this Week:"));
    resultsContainer.appendChild(createP("Incidents last 30 days:"));
}

function addIncidentsPerStaffMemberReportData(resultsContainer) {
    resultsContainer.appendChild(createReportHeader("Incidents Per Staff Member"));

    let data = new Map();

    for (const complaint of loadedData.complaints) {
        for (const staff of complaint.staffInvolved) {
            if (!data.has(staff.staffName)) {
                data.set(staff.staffName, 1);
            } else {
                data.set(staff.staffName, data.get(staff.staffName) + 1);
            }
        }
    }

    for (const datum of data) {
        let p = document.createElement("p");
        p.innerText = `${datum[0]}: ${datum[1]}`;
        resultsContainer.appendChild(p);
    }
}

function addDataToReports() {
    //TODO more reports
    //TODO incidents in the last week, month, year
    let resultsContainer = document.getElementById("reports-window-results-container");
    resultsContainer.innerHTML = "";
    addIncidentsPerCategoryReportData(resultsContainer);
    addIncidentsPerStaffMemberReportData(resultsContainer);
    addIncidentsPerTimeFrame(resultsContainer);
}

function getValuesFromStaffInvolvedTable() {
    let values = [];
    for (const tr of staffInvolvedTBody.querySelectorAll("tr")) {
        values.push({
            staffName: tr.childNodes[0].innerText,
            staffRole: tr.childNodes[1].innerText
        });
    }
    return values;
}

function createStaffInvolvedTR(staffName, role) {
    let tr = document.createElement("tr");
    tr.appendChild(createTD(staffName));
    tr.appendChild(createTD(role));

    let buttonTD = document.createElement("td");
    let deleteButton = createButton("Delete");
    deleteButton.classList.add("btn-small");
    deleteButton.classList.add("red");
    deleteButton.classList.add("darken-3");
    deleteButton.onclick = function () {
        tr.parentElement.removeChild(tr);
    }

    buttonTD.appendChild(deleteButton);
    tr.appendChild(buttonTD);

    return tr;
}

function staffInvolvedAddButtonClicked() {
    let staffName = staffInvolvedSelect.value;
    if (staffName === null || staffName.length === 0) {
        return;
    }

    let staffRole = staffInvolvedRoleSelect.value;

    let valuesFromStaffInvolvedTable = getValuesFromStaffInvolvedTable();
    for (const v of valuesFromStaffInvolvedTable) {
        if (textEqualsCaseInsensitive(staffName, v.staffName)) {
            alert("This staff member has already been added.");
            return;
        }
    }

    let tr = createStaffInvolvedTR(staffName, staffRole);
    let staffInvolvedTbody = document.getElementById("staff-involved-tbody");
    staffInvolvedTbody.appendChild(tr);
}

function showAboutWindow() {
    alert("Version 1.0 created by Jake Bellotti, KFC Albany");
}

function closeEditListWindow() {
    let window = document.getElementById("edit-list-modal-window");
    window.style.display = "none";
}

function editListWindowAddButtonClicked(verifyFunction, data, saveFunction) {
    let input = document.getElementById("edit-list-input");

    let value = input.value.trim();
    let result = verifyFunction(value);
    if (result === undefined) {
        result = true;
    }

    if (!result) {
        return;
    }

    data.push(value);
    input.value = "";
    saveFunction(data);
    addDataToShowEditListWindow(data, verifyFunction, saveFunction);
}

function addDataToShowEditListWindow(data, verifyFunction, saveFunction) {
    //TODO delete button maybe

    editListWindowSelect.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.innerText = capitalizeTheFirstLetterOfEachWord(data[i]);
        option.onclick = function () {
            editListWindowSaveButton.innerText = "Update";
            editListWindowInput.value = data[i];
            editListWindowCancelButton.style.display = "inline-block";
            editListWindowSaveButton.onclick = function () {
                let value = editListWindowInput.value.trim();
                let result = verifyFunction(value);
                if (result === false) {
                    return;
                }
                data[i] = value;
                option.innerText = capitalizeTheFirstLetterOfEachWord(value);
                saveFunction(data);
            };

            editListWindowCancelButton.onclick = function () {
                editListWindowCancelButton.style.display = "none";
                editListWindowSaveButton.innerText = "Add";
                editListWindowSelect.selectedIndex = -1;
                editListWindowInput.value = "";
                editListWindowInput.focus();
                editListWindowSaveButton.onclick = function () {
                    editListWindowAddButtonClicked(verifyFunction, data, saveFunction);
                };
            };
        };
        editListWindowSelect.appendChild(option);
    }
}

function stringIsNullOrEmpty(text) {
    if (text === null || text === undefined) {
        return true;
    } else if (text.trim().length === 0) {
        return true;
    }
    return false;
}

function showEditListWindow(title, data, verifyFunction, saveFunction) {
    editListWindowModalWindow.style.display = "block";
    editListWindowHeaderSpan.innerText = title;

    editListWindowCancelButton.style.display = "none";
    editListWindowSaveButton.innerText = "Add";
    editListWindowInput.value = "";

    editListWindowSaveButton.onclick = function () {
        editListWindowAddButtonClicked(verifyFunction, data, saveFunction);
    };

    addDataToShowEditListWindow(data, verifyFunction, saveFunction);
}

function showEditComplaintNatureWindow() {
    let verifyFunction = function (text) {
        if (stringIsNullOrEmpty(text)) {
            alert("You need to enter something!");
            return false;
        }
        for (let i = 0; i < loadedData.complaintNatureList.length; i++) {
            if (textEqualsCaseInsensitive(text, loadedData.complaintNatureList[i])) {
                alert("That entry already exists!");
                return false;
            }
        }
    };
    let saveFunction = function (data) {
        loadedData.complaintNatureList = data;
        //TODO maybe just when we retrieve the data we should format it nicely rather than on entry
        saveData(loadedData);
        addOptionsToComplaintNatureSelect();
    };
    showEditListWindow("Complaint Nature", loadedData.complaintNatureList, verifyFunction, saveFunction);
}

function showEditStaffListWindow() {
    let verifyFunction = function (text) {
        if (stringIsNullOrEmpty(text)) {
            alert("You need to enter something!");
            return false;
        }
        for (let i = 0; i < loadedData.staffList.length; i++) {
            if (textEqualsCaseInsensitive(text, loadedData.staffList[i])) {
                alert("That staff member already exists!");
                return false;
            }
        }

        if (text.split(" ").length === 1) {
            alert("You need to enter a first name and a surname!");
            return false;
        }
    };
    let saveFunction = function (data) {
        loadedData.staffList = data;
        saveData(loadedData);
        addOptionsToStaffInvolvedSelect();
    };
    showEditListWindow("Staff List", loadedData.staffList, verifyFunction, saveFunction);
}

function showEditManagerListWindow() {
    let verifyFunction = function (text) {
        if (stringIsNullOrEmpty(text)) {
            alert("You need to enter something!");
            return false;
        }
        for (let i = 0; i < loadedData.managerList.length; i++) {
            if (textEqualsCaseInsensitive(text, loadedData.managerList[i])) {
                alert("That manager already exists!");
                return false;
            }
        }

        if (text.split(" ").length === 1) {
            alert("You need to enter a first name and a surname!");
            return false;
        }
    };

    let saveFunction = function (data) {
        loadedData.managerList = data;
        saveData(loadedData);
        addOptionsToCreditOfferedBySelect();
    };

    showEditListWindow("Manager List", loadedData.managerList, verifyFunction, saveFunction);
}

function capitalizeTheFirstLetterOfEachWord(words) {
    let separateWord = words.toLowerCase().split(' ');
    for (let i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
            separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}

function addOptionsToStaffInvolvedSelect() {
    staffInvolvedSelect.innerHTML = "";
    for (let i = 0; i < loadedData.staffList.length; i++) {
        let option = document.createElement("option");
        option.innerText = capitalizeTheFirstLetterOfEachWord(loadedData.staffList[i]);
        staffInvolvedSelect.appendChild(option);
    }
}

//Loads the data
getData();

addOptionsToComplaintNatureSelect();
addOptionsToCreditOfferedBySelect();
addOptionsToStaffInvolvedSelect();

//Select the default filter, trigger the display of the complaints
filterButtonClicked(document.getElementById("filter-button-open"));

// showEditManagerListWindow();
