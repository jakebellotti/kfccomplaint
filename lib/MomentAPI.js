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

}