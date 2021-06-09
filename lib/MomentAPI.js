//TODO replace anything date related that is done multiple times with the static utility functions found in this class

class MomentAPI {

    /**
     * Returns a date object that is the first day of this week (Monday).
     * @returns {*}
     */
    static getMondayThisWeek() {
        return this.getStartOfWeek(new Date());
    }

    static getStartOfWeek(date) {
        let modifier = date.getDay();
        return moment(date).subtract((modifier === 0 ? 6 : modifier - 1), 'days').toDate();
    }

    static momentIsBetweenRange(testing, startMoment, endMoment) {
        //    TODO is between, is same as start, or end
        testing = testing.startOf("day");
        startMoment = startMoment.startOf("day");
        endMoment = endMoment.startOf("day");

        let isBetween = testing.isBetween(startMoment, endMoment);
        let sameStart = testing.isSame(startMoment);
        let sameEnd = testing.isSame(endMoment);

        return (isBetween || sameStart || sameEnd);
    }

}