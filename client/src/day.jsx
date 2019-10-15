import React from "react";
import styles from "../styles/calendar.css";
import cx from "classnames";
var moment = require("moment");

class Day extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		var className = cx(styles.td, styles.available);

		if (!this.props.day) {
			return (
				<td
					key={this.props.day}
					className={(styles.td, styles.invalidDate)}
				>
					{this.props.day}
				</td>
			);
		} else {
			if (
				moment(this.props.day).diff(
					moment(this.props.bookedDates[i]),
					"days"
				) >= 0
			) {
				for (var i = 0; i < this.props.bookedDates.length; i++) {
					if (
						moment(this.props.day).isSame(
							moment(this.props.bookedDates[i])
						)
					) {
						className = cx(styles.td, styles.unavailable);
					}
				}
			}
		}
		return (
			<td key={this.props.day} className={className}>
				{moment(this.props.day).date()}
			</td>
		);
	}
}

export default Day;
