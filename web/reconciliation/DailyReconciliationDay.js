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
        this._amManager = null;
        this._pmManager = null;
        this._data = [];
    }

    static constructFromJSON(jsonObj) {
        //TODO implement
        //TODO error check the object
        let obj = new DailyReconciliationDay(jsonObj.date, jsonObj.dayType);
        obj._amManager = jsonObj.amManager;
        obj._pmManager = jsonObj.pmManager;
        obj._data = jsonObj._data;
        return obj;
    }

    toJSON() {
        return JSON.stringify(this);
    }

}