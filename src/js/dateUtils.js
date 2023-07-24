class DateUtils {
  static formatDateMonth(date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}`;
  }

  static getCurrentDate() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }
}

export default DateUtils;
