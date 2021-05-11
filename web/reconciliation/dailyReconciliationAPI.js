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

    static getLocalData() {
        let ls = localStorage.getItem("daily_recon_test_data");
        if (ls) {
            return JSON.parse(ls);
        }
        return {};
    }

    static dayExists(dayString, callback) {
        let data = this.getLocalData();
        if (data.days) {
            callback(data.days[dayString]);
        }
        callback(null);
    }

}