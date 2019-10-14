import React from "react";
import Week from "./week.jsx";
const path = require("path");
import monthData from "../helpers/calendarCreater.js";
var moment = require("moment");

function Calendar(props) {
	var month = monthData(props.month);

	var weeks = month.map((days, index) => (
		<Week days={days} weekNum={index} />
	));

	return (
		<table>
			<caption>
				{props.month
					.format("MMMM")
					.concat(" ")
					.concat(props.month.format("YYYY"))}
			</caption>
			<thead>
				<tr>
					<th>Sunday</th>
					<th>Monday</th>
					<th>Tuesday</th>
					<th>Wednesday</th>
					<th>Thursday</th>
					<th>Friday</th>
					<th>Saturday</th>
				</tr>
			</thead>
			<tbody>{weeks}</tbody>
		</table>
	);
}

export default Calendar;
