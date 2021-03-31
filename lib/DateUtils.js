class DateUtils {

    /**
     * Returns a Date object that is Monday of this week.
     * @returns {*}
     */
    static getMondayDate() {
        let currentDate = new Date();
        return moment().subtract(((currentDate.getDay() === 0 ? 7 : currentDate.getDay()) - 1), 'days').toDate();
    }

    static getMondayDateFromDate(currentDate) {
        return moment(currentDate).subtract(((currentDate.getDay() === 0 ? 7 : currentDate.getDay()) - 1), 'days').toDate();
    }

    /**
     * Get a string that states how long ago, or in the future another date is. Strips the time to show only the day difference.
     * @param date
     * @returns {string}
     */
    static getDaysFromNow(date) {
        let dayDiff = moment(new Date(date.toDateString())).diff(moment(new Date(new Date().toDateString())), "days");
        if (dayDiff === 0) {
            return "today";
        }
        if (dayDiff < 0) {
            dayDiff = dayDiff * -1;
            return `${dayDiff} day${dayDiff === 1 ? "" : "s"} ago`;
        }
        if (dayDiff > 0) {
            return `in ${dayDiff} day${dayDiff === 1 ? "" : "s"}`
        }
    }

}