class DateUtils {

    /**
     * Returns a Date object that is Monday of this week.
     * @returns {*}
     */
    static getMondayDate() {
        let currentDate = new Date();
        return moment().subtract(((currentDate.getDay() === 0 ? 7 : currentDate.getDay()) - 1), 'days').toDate();
    }

}