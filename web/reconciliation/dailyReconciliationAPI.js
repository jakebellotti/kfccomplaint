class DailyReconciliationAPI {

    //TODO redo this aha
    //TODO do temporarily in local storage, then implement this with Firebase.

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

    static dayExists(dayString, callback) {
        let data = this.getLocalData();

        // console.log(data);
        for (const day of data) {
            if (day.date === dayString) {
                callback(day);
                return;
            }
        }

        //TODO correctly find
        callback(null);
    }

    //TODO add the option to create from the previous day so that ending count can be transferred to open figure
    static createBlankDay(date, dayType) {
        let localData = this.getLocalData();

        let dateAsString = moment(date).format("DD/MM/YYYY");

        localData.push({
            date: dateAsString,
            dayType: dayType,
            amManager: null,
            pmManager: null,
            data: []
        });
        //TODO data integrity, check if exists first
        this.setLocalData(localData);
        //    TODO insert the data
    }

}