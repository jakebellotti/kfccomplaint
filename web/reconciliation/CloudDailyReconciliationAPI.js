class CloudDailyReconciliationAPI {

    static initFirebase() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBbdMJFKUbHYf-ZnTaOA8duLA466C55GG8',
            authDomain: 'kfc-cloud-wastage.firebaseapp.com',
            projectId: 'kfc-cloud-wastage'
        });
    }

    //TODO no need to pass collection

    static getDateRange(startDate, endDate, callback) {
        let momentStart = moment(startDate, "DD-MM-YYYY");
        let momentEnd = moment(endDate, "DD-MM-YYYY");

        let dateList = [];
        let dataList = [];

        for (let i = 0; true; i++) {
            let newDate = moment(momentStart).add(i, "days");
            dateList.push(newDate.format("DD-MM-YYYY"));

            if (newDate.format("DD-MM-YYYY") === momentEnd.format("DD-MM-YYYY")) {
                break;
            }
        }

        let requestsLeft = dateList.length;

        //TODO account for errors too
        for (const date of dateList) {
            firebase.firestore().collection("dailyReconciliation").doc(date).get().then(data => {
                requestsLeft = (requestsLeft - 1);
                dataList.push({
                    key: date,
                    value: data.data()
                });
                if (requestsLeft === 0) {
                    dataList.sort((a, b) => {
                        return moment(a.key, "DD-MM-YYYY") > moment(b.key, "DD-MM-YYYY") ? 0 : -1;
                    });
                    callback(dataList);
                }
            });
        }

        // firebase.firestore().collection("dailyReconciliation").where("date", "==", dateList).get().then(
        //     (querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             console.log(doc);
        //         });
        //     }
        // );

        //TODO check the distance between the range and make sure start is really start
        //TODO then build array of acceptable values
        // citiesRef.where('country', 'not-in', ['USA', 'Japan']);
    }

    static previousDayExists(todayString, callback) {
        CloudDailyReconciliationAPI.dayExists(moment(todayString, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY"), callback);
    }

    static nextDayExists(todayString, callback) {
        CloudDailyReconciliationAPI.dayExists(moment(todayString, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY"), callback);
    }

    static saveDay(day, onCompletionCallback) {
        //TODO do we need to check if the day exists here

        let collection = firebase.firestore().collection("dailyReconciliation");
        collection.doc(day.date).set(day).then(() => {
            onCompletionCallback();
        });
    }

    static deleteDay(dayString, callback) {
        let collection = firebase.firestore().collection("dailyReconciliation");
        collection.doc(dayString).delete().then(() => {
            callback();
        });
    }

    static createNextDay(todayString, openDay, wastedData, defrostedData, callback) {
        let collection = firebase.firestore().collection("dailyReconciliation");

        let nextDayDate = moment(todayString, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY");

        //TODO defaults to store open, should that ever be a problem? idk?

        let dateData = [];

        for (const day of openDay.data) {
            let active = ItemData.isItemActive(ItemData.getDataForIdentifier(day.identifier));
            if (!active) {
                continue;
            }
            dateData.push({
                identifier: day.identifier,
                openQuantity: day.closeQuantity,
                receivedQuantity: null,
                wastedQuantity: null,
                closeQuantity: null
            });
        }

        let newDate = {
            date: nextDayDate,
            dayType: "store_open",
            amManager: null,
            pmManager: null,
            sales: null,
            customerCount: null,
            cashVariance: null,
            notes: null,
            data: dateData
        };

        collection.doc(nextDayDate).set(newDate).then(() => {
            callback(newDate);
        });
    }

    static dayExists(dayString, callback) {
        let collection = firebase.firestore().collection("dailyReconciliation");
        collection.doc(dayString).get().then(
            (doc) => {
                callback(doc.data());
            }
        );
    }

    static createBlankDay(date, dayType, callback) {
        let collection = firebase.firestore().collection("dailyReconciliation");

        let dateAsString = moment(date).format("DD-MM-YYYY");

        collection.doc(dateAsString).set({
            date: dateAsString,
            dayType: dayType,
            amManager: null,
            pmManager: null,
            sales: null,
            customerCount: null,
            cashVariance: null,
            notes: null,
            data: []
        }).then((docRef) => {
            callback();
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

}