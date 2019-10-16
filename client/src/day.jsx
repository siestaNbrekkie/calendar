import React from "react";
import styles from "../styles/calendar.css";
import cx from "classnames";
var moment = require("moment");

function Day(props) {
	return (
		<td
			key={props.day}
			className={determineClassName(
				props.day,
				props.bookedDates,
				props.selectedFirstDate,
				props.selectedSecDate,
				props.hoveredDate,
				props.dateRestrictions
			)}
			onClick={
				hasClick(
					props.day,
					props.bookedDates,
					props.selectedFirstDate,
					props.selectedSecDate,
					props.hoveredDate,
					props.dateRestrictions
				)
					? () => props.handleDateClick(props.day)
					: null
			}
			onMouseEnter={
				hasMouseEnter(
					props.day,
					props.selectedFirstDate,
					props.selectedSecDate,
					props.hoveredDate,
					props.dateRestrictions
				)
					? () => props.handleHover(props.day)
					: null
			}
		>
			{displayValue(props.day)}
		</td>
	);
}

function determineClassName(
	day,
	bookedDates,
	checkIn,
	checkOut,
	hoveredDate,
	dateRestrictions
) {
	//not a valid day
	if (!day) {
		return cx(styles.td, styles.invalidDate);
	}
	//day before current date
	if (moment(day).isBefore(moment(), "day")) {
		return cx(styles.td, styles.unavailable);
	}

	//day is a Booked Date
	if (bookedDates.has(day)) {
		return cx(styles.td, styles.unavailable);
	}

	//checkIn is selected and is current day
	if (moment(day).isSame(checkIn)) {
		return cx(styles.td, styles.selected);
	}

	//checkIn and checkOut is selected
	if (checkIn && checkOut) {
		if (moment(day).isBetween(checkIn, checkOut, null, [])) {
			return cx(styles.td, styles.selected);
		} else {
			return cx(styles.td, styles.available);
		}
	}

	//checkIn is selected, and hover is active
	if (checkIn && hoveredDate) {
		var totalDays = moment(checkIn).diff(day, "days");
		if (moment(day).isBetween(checkIn, hoveredDate, null, [])) {
			return cx(styles.td, styles.hoverMinDays);
		} else if (totalDays < dateRestrictions.max_days * -1) {
			return cx(styles.td, styles.unavailable);
		} else if (totalDays > 0) {
			return cx(styles.td, styles.unavailable);
		} else {
			return cx(styles.td, styles.available);
		}
	}

	//checkIn is selected, no hover
	if (checkIn && !checkOut) {
		var totalDays = moment(checkIn).diff(day, "days");
		var minDays =
			dateRestrictions[
				moment(checkIn)
					.format("dddd")
					.toLowerCase()
					.concat("_min")
			];
		if (totalDays > 0) {
			return cx(styles.td, styles.unavailable);
		} else if (totalDays < dateRestrictions.max_days * -1) {
			return cx(styles.td, styles.unavailable);
		} else if (totalDays <= 0 && totalDays >= minDays * -1) {
			return cx(styles.td, styles.hoverMinDays);
		} else {
			return cx(styles.td, styles.selectedAvailable);
		}
	}

	//default to available style
	return cx(styles.td, styles.available);
}

function hasClick(
	day,
	bookedDates,
	checkIn,
	checkOut,
	hoveredDate,
	dateRestrictions
) {
	var maxDate = undefined;
	if (dateRestrictions.max_days) {
		maxDate = moment(checkIn).add(dateRestrictions.max_days, "days");
	}

	//all dates between checkIn and maximum stay have clicks
	if ((checkIn && !checkOut) || (checkIn && hoveredDate)) {
		if (moment(day).isBetween(checkIn, maxDate, null, [])) {
			return true;
		} else {
			//in in a checkIn or hover state, but not between dates, no click
			return false;
		}
	}

	//no selection state - days with no booked conflicts are have click
	if (day || !bookedDates.has(day) || !moment(day).isSame(checkIn)) {
		return true;
	}

	return false;
}

function hasMouseEnter(day, checkIn, checkOut, hoveredDate, dateRestrictions) {
	var maxDate = undefined;

	if (dateRestrictions.max_days) {
		maxDate = moment(checkIn).add(dateRestrictions.max_days, "days");
	}
	//all dates between checkIn and maximum stay have hover
	if ((checkIn && !checkOut) || (checkIn && hoveredDate)) {
		if (moment(day).isBetween(checkIn, maxDate, null, [])) {
			return true;
		} else {
			//in in a checkIn or hover state, but not between dates, no hover
			return false;
		}
	}
	return false;
}

function displayValue(day) {
	if (!day) {
		return "";
	} else {
		return moment(day).date();
	}
}

export default Day;
