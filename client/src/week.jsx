import React from "react";
import Day from "./day.jsx";

function week(props) {
	var days = props.days.map(day => (
		<Day day={day} bookedDates={props.bookedDates} />
	));

	return (
		<tr key={props.index} className="week">
			{days}
		</tr>
	);
}

export default week;
