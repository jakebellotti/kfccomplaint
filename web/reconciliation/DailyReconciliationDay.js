class DailyReconciliationDay {

    //TODO implement helper methods

    /*
    *         localData.push({
            date: dateAsString,
            dayType: dayType,
            amManager: null,
            pmManager: null,
            data: []
        });
    * */


    constructor(date, dayType) {
        this._date = date;
        this._dayType = dayType;
    }

    calculateSold(itemIdentifier) {
        for (const d of this._data) {
            if (d.identifier === itemIdentifier) {
                if (d.openQuantity !== null && d.closeQuantity !== null) {
                    let open = d.openQuantity;
                    if (d.wastedQuantity !== null) {
                        open = (open - d.wastedQuantity);
                    }
                    if (open < 0) {
                        open = 0;
                    }
                    if (d.receivedQuantity !== null) {
                        open += d.receivedQuantity;
                    }
                    return (open - d.closeQuantity);
                }
            }
        }
        return null;
    }

    static constructFromJSON(jsonObj) {
        if (!jsonObj) {
            return null;
        }
        //TODO double check that the object contains all of the needed variables
        let obj = new DailyReconciliationDay(jsonObj.date, jsonObj.dayType);
        obj._amManager = jsonObj.amManager;
        obj._pmManager = jsonObj.pmManager;
        obj._sales = jsonObj.sales;
        obj._notes = jsonObj.notes;
        obj._data = jsonObj.data;
        obj._cashVariance = jsonObj.cashVariance;
        obj._customerCount = jsonObj.customerCount;
        return obj;
    }

    toJSON() {
        return JSON.stringify(this);
    }

}