//TODO replace anything date related that is done multiple times with the static utility functions found in this class

class MomentAPI {

    /**
     * Returns a date object that is the first day of this week (Monday).
     * @returns {*}
     */
    static getMondayThisWeek() {
        let currentDate = new Date();
        return moment().subtract((currentDate.getDay() - 1), 'days').toDate();
    }

}