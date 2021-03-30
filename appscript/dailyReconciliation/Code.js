//TODO warn when count day is not equal to the latest day
let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");


function createDay(date, dayType) {

    let exists = dayExists(date);
//  TODO only allow specific day types
//  TODO only if day does not exist

}

function getDay(date) {
    let exists = dayExists(date);

    if (exists.rowIndex > -1) {

        //  TODO get the data
    }

    return response().json({
        exists: exists.found
    });
}

function dayExists(date) {
    //let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
    let found = sheet.getRange(1, 1, sheet.getLastRow()).createTextFinder(date).matchCase(false).findNext();

    return response().json({
        found: (found !== null),
        rowIndex: (found === null) ? -1 : found.getRow()
    });
}

function newRow() {
    //TODO date to DD/MM/YYYY
    let spreadSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
    spreadSheet.getRange((spreadSheet.getLastRow() + 1), 1, 1, 3).setValues([
        [new Date(), "2", "3"]
    ]);
}

//TODO get all with date between range

function getAll() {
    let spreadSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");


    let startColumnIndex = 1;
    let startRowIndex = 2;
    let numberOfColumns = 3;

    let data = spreadSheet.getRange(startRowIndex, startColumnIndex, spreadSheet.getLastRow(), numberOfColumns).getValues();
    //TODO can we remove null entries?
    return response().json({
        data: data
    });
    // return JSON.stringify(data);
}

function insertToday() {
    console.log("hey");
    let spreadSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");


    let startColumnIndex = 1;
    let startRowIndex = 2;
    let numberOfColumns = 3;

    let data = spreadSheet.getRange(startRowIndex, startColumnIndex, spreadSheet.getLastRow(), numberOfColumns).getValues();
    console.log(JSON.stringify(data));

//TODO implement
}

function getLatestDay() {
    return null;
}

function doGet(req) {

    let action = req.parameters["action"];
    if (action) {
        let actionValue = action[0];

        switch (actionValue) {
            case "getAll":
                return getAll();
            case "dayExists":
                return dayExists(req.parameters["dayString"][0]);
        }
    }

//  TODO handle get and set

//  TODO spreadsheet information
    return response().json({
        rows: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data").getLastRow(),
        parameters: req.parameters,
    });
}

function response() {
    return {
        json: function (data) {
            return ContentService
                .createTextOutput(JSON.stringify(data))
                .setMimeType(ContentService.MimeType.JSON);
        }
    }
}