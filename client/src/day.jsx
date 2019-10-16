import React from "react";
import styles from "../styles/calendar.css";
import cx from "classnames";
var moment = require("moment");

class Day extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: this.props.day
		};
	}

	static getDerivedStateFromProps(props, state) {
		return {
			date: props.day
		};
	}

	render() {
		var className = cx(styles.td, styles.available);

		if (!this.props.day) {
			//check if day is not a valid date in the month
			return (
				<td
					key={this.props.day}
					className={(styles.td, styles.invalidDate)}
				>
					{this.props.day}
				</td>
			);
		} else if (this.props.bookedDates.has(this.props.day)) {
			//check if date is a booked date
			className = cx(styles.td, styles.unavailable);
			return (
				<td key={this.props.day} className={className}>
					{moment(this.props.day).date()}
				</td>
			);
		} else if (
			moment(this.props.day).isSame(this.props.selectedFirstDate)
		) {
			var minDays = this.props.dateRestrictions[
				moment(this.props.selectedFirstDate)
					.format("dddd")
					.toLowerCase()
					.concat("_min")
			];
			//check if is the selected first date
			//no click
			className = cx(styles.td, styles.selected);
			return (
				<td
					key={this.props.day}
					className={className}
					title={`${minDays} night minimum stay`}
				>
					{moment(this.props.day).date()}
				</td>
			);
		} else if (this.props.selectedFirstDate && this.props.selectedSecDate) {
			//both the first date and second date are selected
			if (
				moment(this.props.day).isBetween(
					this.props.selectedFirstDate,
					this.props.selectedSecDate,
					null,
					[]
				)
			) {
				console.log("inclusive: ", this.props.day);
				//date is part of the check-in through checkout date
				className = cx(styles.td, styles.selected);
				return (
					<td
						key={this.props.day}
						className={className}
						title={`${minDays} night minimum stay`}
					>
						{moment(this.props.day).date()}
					</td>
				);
			} else {
				//date is available
				return (
					<td
						key={this.props.day}
						className={className}
						onClick={() =>
							this.props.handleDateClick(this.state.date)
						}
					>
						{moment(this.props.day).date()}
					</td>
				);
			}
		} else if (
			this.props.selectedFirstDate !== undefined &&
			this.props.selectedSecDate === undefined
		) {
			//locate min num days
			var minDays =
				this.props.dateRestrictions[
					moment(this.props.selectedFirstDate)
						.format("dddd")
						.toLowerCase()
						.concat("_min")
				] * -1;

			if (
				moment(this.props.selectedFirstDate).diff(
					this.props.day,
					"days"
				) > 0
			) {
				//first date is selected and date is prior to selected
				//no click
				className = cx(styles.td, styles.unavailable);
				return (
					<td key={this.props.day} className={className}>
						{moment(this.props.day).date()}
					</td>
				);
			} else if (
				moment(this.props.selectedFirstDate).diff(
					this.props.day,
					"days"
				) <= 0 &&
				moment(this.props.selectedFirstDate).diff(
					this.props.day,
					"days"
				) >= minDays
			) {
				//first date is selected and is within min date range
				//no click
				className = cx(styles.td, styles.hoverSelected);
				return (
					<td key={this.props.day} className={className}>
						{moment(this.props.day).date()}
					</td>
				);
			} else {
				//first date is selected and 2nd is out of min date range
				return (
					<td
						key={this.props.day}
						className={className}
						onClick={() => {
							this.props.handleDateClick(this.state.date);
						}}
					>
						{moment(this.props.day).date()}
					</td>
				);
			}
		} else {
			//availble date with click
			return (
				<td
					key={this.props.day}
					className={className}
					onClick={() => this.props.handleDateClick(this.state.date)}
				>
					{moment(this.props.day).date()}
				</td>
			);
		}
	}
}

export default Day;
