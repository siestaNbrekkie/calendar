import React from "react";
import Week from "./week.jsx";
import styles from "../styles/calendar.css";
const path = require("path");
import monthData from "../helpers/calendarCreater.js";
var moment = require("moment");

function Calendar(props) {
	var month = monthData(props.month);

	var weeks = month.map((days, index) => (
		<Week days={days} weekNum={index} />
	));

	return (
		<table key="calendar" className={styles.table}>
			<caption>
				{props.backButton ? (
					<button onClick={props.handleBackClick}>
						<svg width="10" height="10" viewBox="0 0 40 40">
							<path d="M25 0 L15 0 L0 20 L15 40 L25 40 L10 20 Z"></path>
							<path d="M8 15 L40 15 L40 25 L8 25 Z"></path>
						</svg>
					</button>
				) : null}
				{props.month
					.format("MMMM")
					.concat(" ")
					.concat(props.month.format("YYYY"))}
				{props.fwdButton ? (
					<button onClick={props.handleFwdClick}>
						<svg width="10" height="10" viewBox="0 0 40 40">
							<path d="M5 0 L15 0 L30 20 L15 40 L5 40 L20 20 Z"></path>
							<path d="M0 15 L22 15 L22 25 L0 25 Z"></path>
						</svg>
					</button>
				) : null}
			</caption>
			<thead>
				<tr>
					<th>Su</th>
					<th>Mo</th>
					<th>Tu</th>
					<th>We</th>
					<th>Th</th>
					<th>Fr</th>
					<th>Sa</th>
				</tr>
			</thead>
			<tbody>{weeks}</tbody>
		</table>
	);
}

export default Calendar;
