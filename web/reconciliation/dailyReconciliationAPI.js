class DailyReconciliationAPI {

    //TODO make this an interface, so we can switch between local storage and database storage (firebase).
    //TODO redo this aha
    //TODO do temporarily in local storage, then implement this with Firebase.
    //TODO create days as an object
    //TODO day string will always be DD/MM/YYYY

    static getDayTypes() {
        return [
            {
                key: "store_open",
                value: "Normal Day"
            },
            {
                key: "store_closed",
                value: "Store Closure"
            }
        ];
    }

    static setLocalData(data) {
        localStorage.setItem("daily_recon_test_data", JSON.stringify(data));
    }

    static getLocalData() {
        let ls = localStorage.getItem("daily_recon_test_data");
        if (ls) {
            return JSON.parse(ls);
        }
        return [];
    }

    //TODO day is complete function (return the errors found and return in a result)
    static isCompleteDay() {

    }

    /**
     * Gets the reconciliation day based on today's date, and upon completion, executes the callback. If no day is found, it will return null.
     */
    static getToday(callback) {
        this.dayExists(moment().format("DD/MM/YYYY"), callback);
    }

    //TODO get previous day and next day functions

    static dayExists(dayString, callback) {
        let data = this.getLocalData();

        for (let i = 0; i < data.length; i++) {
            const day = data[i];
            if (day.date === dayString) {
                callback(day, i);
                return;
            }
        }
        callback(null, null);
    }

    static deleteDay(dayString) {
        let localData = this.getLocalData();
        for (const day of localData) {
            if (day.date === dayString) {
                localData.splice(localData.indexOf(day), 1);
                this.setLocalData(localData);
                return true;
            }
        }
        return false;
    }

    /**
     * Saves the day data (If if exists). If you need to create a day, use the create blank day function as this only updates a record and does not insert anything new.
     * @param day
     */
    static saveDay(day, onCompletionCallback) {
        this.dayExists(day.date, function (foundData, index) {
            let localData = DailyReconciliationAPI.getLocalData();
            localData[index] = day;
            DailyReconciliationAPI.setLocalData(localData);
            onCompletionCallback();
        });
    }

    //TODO add the option to create from the previous day so that ending count can be transferred to open figure
    static createBlankDay(date, dayType) {
        let localData = this.getLocalData();

        let dateAsString = moment(date).format("DD/MM/YYYY");


        //TODO create object, call toJSON func
        localData.push({
            date: dateAsString,
            dayType: dayType,
            amManager: null,
            pmManager: null,
            sales: null,
            customerCount: null,
            cashVariance: null,
            notes: null,
            data: []
        });
        //TODO data integrity, check if exists first
        this.setLocalData(localData);
        //    TODO insert the data
    }

}