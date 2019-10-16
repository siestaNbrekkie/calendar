import React from "react";
import Day from "./day.jsx";

function week(props) {
	var days = props.days.map(day => (
		<Day
			day={day}
			bookedDates={props.bookedDates}
			handleDateClick={props.handleDateClick}
			dateRestrictions={props.dateRestrictions}
			selectedFirstDate={props.selectedFirstDate}
			selectedSecDate={props.selectedSecDate}
		/>
	));

	return (
		<tr key={props.index} className="week">
			{days}
		</tr>
	);
}

export default week;
