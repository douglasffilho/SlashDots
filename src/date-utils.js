const now = () => {
    return new Date(new Date().toUTCString());
}

const DateUtils = {
    now() {
        return now();
    },

    dateIsBeforeThat(date1, date2, millisecondsToCheck) {
        return (date2.getTime() - date1.getTime()) > millisecondsToCheck;
    },

    dateIsBeforeNow(date, millisecondsToCheck) {
        return (this.now().getTime() - date.getTime()) > millisecondsToCheck;
    }
}

export default DateUtils;