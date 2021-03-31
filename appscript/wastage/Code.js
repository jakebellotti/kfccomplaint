let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Wastage");

function returnJSON(data) {
    return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

function doPost(req) {
    return returnJSON({
        rows: sheet.getLastRow(),
        parameters: req.parameters,
        message: "No action found",
    });
}

function doGet(req) {
    let action = req.parameters["action"];
    if (action) {
        let actionValue = action[0];

        switch (actionValue) {
            case "getWastageForDay":
                return getWastageForDate(req.parameters["dateAsString"][0]);
            case "setWastageForDay":
                return setWastageForDate(req.parameters["dateAsString"][0], req.parameters["dataAsJSON"][0]);
        }
    }

    return returnJSON({
        rows: sheet.getLastRow(),
        parameters: req.parameters,
        message: "No action found",
    });
}

function getWastageForDate(dateAsText) {
    let found = sheet.getRange(1, 1, sheet.getLastRow()).createTextFinder(dateAsText).matchCase(false).findNext();

    return returnJSON({
        rowIndex: found == null ? -1 : found.getRow(),
        data: found == null ? null : JSON.stringify(
            sheet.getRange(2, found.getRow()).getValue()
        )
    });
}

function getIndexForDate(dateAsText) {
    let found = sheet.getRange(1, 1, sheet.getLastRow()).createTextFinder(dateAsText).matchCase(false).findNext();
    return found == null ? -1 : found.getRow();
}

function setWastageForDate(dateAsText, data) {
    let found = sheet.getRange(1, 1, sheet.getLastRow()).createTextFinder(dateAsText).matchCase(false).findNext();
    let updateIndex = -1;
    let newRow = true;

    if (found !== null) {
        updateIndex = found.getRow();
        newRow = false;
    }

    if (updateIndex === -1) {
        sheet.appendRow([dateAsText, data]);
        updateIndex = getIndexForDate(dateAsText);
    } else {
        sheet.getRange(updateIndex, 2).setValue(data);
    }

    return returnJSON({
        rowIndex: updateIndex,
        newRow: newRow
    });

//    TODO if found, update on that index. If not, insert new row.
//TODO return JSON providing the result
}