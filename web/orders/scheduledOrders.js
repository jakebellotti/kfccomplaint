//TODO add receiving info

let orderData = {
    monday: [
        {
            name: "Salad",
            cutOff: "9:00AM"
        },
        {
            name: "Inghams (Chicken)",
            cutOff: "10:00AM"
        },
        {
            name: "Sands Fridge (Cheese)",
            cutOff: "16:00PM"
        },
        {
            name: "Sands Frozen",
            cutOff: "16:00PM"
        },
        {
            name: "Uniforms / Rewards / Diversey (Monthly)",
            cutOff: "23:59PM"
        }
    ],
    tuesday: [
        {
            name: "Tip-Top (Bread)",
            cutOff: "14:30PM"
        },
        {
            name: "Schweppes (Drinks)",
            cutOff: "22:00PM"
        },
        {
            name: "Winc (Stationary) - Fortnightly",
            cutOff: "23:59PM"
        }
    ],
    wednesday: [
        {
            name: "Salad",
            cutOff: "9:00AM"
        },
        {
            name: "Inghams (Chicken)",
            cutOff: "10:00AM"
        },
        {
            name: "Tip-Top (Bread)",
            cutOff: "14:00PM"
        },
        {
            name: "Sands All (Paper, Frozen, Cheese)",
            cutOff: "16:00PM"
        }
    ],
    thursday: [
        {
            name: "Inghams (Chicken)",
            cutOff: "10:00AM"
        },
        {
            name: "Tip-Top (Bread)",
            cutOff: "14:00PM"
        },
        {
            name: "Sands All (Paper, Frozen, Cheese)",
            cutOff: "16:00PM"
        }
    ],
    friday: [
        {
            name: "Salad",
            cutOff: "9:00AM"
        },
        {
            name: "Schweppes (Drinks)",
            cutOff: "22:00PM"
        }
    ],
    saturday: [
        {
            name: "Tip-Top (Bread)",
            cutOff: "14:00PM"
        }
    ],
    sunday: [
        {
            name: "Tip-Top (Bread)",
            cutOff: "14:00PM"
        }
    ]
};

class Order {

    constructor(order, orderDateTime) {
        this.order = order;
        this.orderDateTime = orderDateTime;
    }

    getTimeDifferenceString() {
        let differenceString = moment(this.orderDateTime).from(new Date());

        return differenceString;
    }

    getCutoffProgressBarData() {
        let todayDate = new Date();
        todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0);

        let totalSteps = moment(this.orderDateTime).diff(moment(todayDate), "minutes");

        let currentSteps = moment(new Date()).diff(moment(todayDate), "minutes");
        if (currentSteps > totalSteps) {
            currentSteps = totalSteps;
        }

        return {currentSteps: currentSteps, totalSteps: totalSteps};
    }
}

class ScheduledOrders {

    static getOrdersForDay(dayName) {
        return orderData[dayName];
    }

    static getTimesForTodaysOrders() {
        let today = new Date();
        let dayName = moment(today).format("dddd").toLowerCase();
        return this.getTimesForOrders(dayName);
    }

    static getTimesForOrders(dayName) {
        let toReturn = [];
        let currentDay = new Date();
        let todaysOrders = this.getOrdersForDay(dayName);

        for (const order of todaysOrders) {
            let orderTimeString = order.cutOff.toLowerCase().replaceAll("am", "").replaceAll("pm", "");
            let tsSplit = orderTimeString.split(":");
            let orderDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), parseInt(tsSplit[0]), parseInt(tsSplit[1]), 0, 0);

            toReturn.push(new Order(order, orderDate));
        }

        return toReturn;
    }

//    TODO everything
}