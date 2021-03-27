class DailyReconciliationAPI {
    static baseURL = "https://script.google.com/macros/s/AKfycbwnofpZmLJJNQkcc3SIU11vBTh-ksGslBI66FW8kjj3ATsMLPz7/exec?";

    static buildRequestURL(parameters) {
        let requestURL = this.baseURL;

        for (const param of parameters) {
            requestURL = requestURL.concat(param.key).concat("=").concat(param.value).concat("&");
        }

        return requestURL;
    }

    static dayExists(dayString, callback) {
        let url = this.buildRequestURL([
            {
                key: "action",
                value: "dayExists"
            },
            {
                key: "dayString",
                value: dayString
            }
        ]);
        fetch(url).then(data => {
            return data.json();
        }).then(res => {
            callback(res);
        });
    }

}