var moment = require("moment");

function createMonth(date) {
	var startOfMonth = moment(date)
		.startOf("month")
		.format("YYYY-MM-DD");

	var dayOf1st = moment(startOfMonth).day();

	var endOfMonth = moment(date)
		.endOf("month")
		.format("D");

	var datesInMonth = [];
	var day = 1;
	var month = moment(date).month();

	var week = Array.apply(null, Array(7));
	var count = dayOf1st;
	for (var i = dayOf1st; i <= parseInt(endOfMonth) + dayOf1st; i++) {
		if (count >= 6 || day === parseInt(endOfMonth)) {
			week[count] = moment()
				.month(month)
				.date(day)
				.format("YYYY-MM-DD");
			datesInMonth.push(week);
			week = Array.apply(null, Array(7));
			count = 0;
		} else {
			if (datesInMonth.length === 0 && count === 0) {
				count = dayOf1st;
			}
			week[count] = moment()
				.month(month)
				.date(day)
				.format("YYYY-MM-DD");
			count++;
		}
		day++;
	}
	return datesInMonth;
}

export default createMonth;
