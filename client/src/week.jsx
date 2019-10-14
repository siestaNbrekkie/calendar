import React from "react";
import Day from "./day.jsx";
var moment = require("moment");

function week(props) {
	var days = props.days.map(day => <Day day={day} />);
	return (
		<tr key={props.index} className="week">
			{days}
		</tr>
	);
}

export default week;
