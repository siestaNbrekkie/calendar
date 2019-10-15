import React from "react";
import styles from "../styles/calendar.css";

class Day extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (!this.props.day) {
			return (
				<td
					key={this.props.day}
					className={(styles.td, styles.invalidDate)}
				>
					{this.props.day}
				</td>
			);
		}
		return <td key={this.props.day}>{this.props.day}</td>;
	}
}

export default Day;
