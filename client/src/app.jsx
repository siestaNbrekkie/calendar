import React from "react";
import Discount from "./discount.jsx";
import Calendar from "./calendar.jsx";
import styles from "../styles/app.css";
const axios = require("axios");
var moment = require("moment");

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookedDates: new Set(),
			dateRestrictions: {},
			discount_measure: undefined,
			discount_rate: undefined,
			month1: moment(),
			month2: moment().add(1, "M")
		};

		this.handleFwdClick = () => {
			this.setState({
				month1: this.state.month2,
				month2: moment(this.state.month2).add(1, "M")
			});
		};

		this.handleBackClick = () => {
			this.setState({
				month1: moment(this.state.month1).subtract(1, "M"),
				month2: this.state.month1
			});
		};
	}

	componentDidMount() {
		var parts = document.URL.split("/");
		var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash

		axios
			.get(`http://localhost:3000/${lastSegment}`)
			.then(res => {
				this.setState({
					bookedDates: new Set(res.data.bookedDates),
					dateRestrictions: res.data.dateRestrictions,
					discount_measure: res.data.discount_measure,
					discount_rate: res.data.discount_rate
				});
			})
			.catch(err => {
				console.log("err.. did not set state", err);
			});
	}

	render() {
		return (
			<div>
				<h1 className={styles.h1}>Availability</h1>
				<Discount
					rate={this.state.discount_rate}
					measure={this.state.discount_measure}
				/>
				<div className={styles.calendar}>
					<Calendar
						month={this.state.month1}
						backButton={true}
						fwdButton={false}
						handleFwdClick={this.handleFwdClick}
						handleBackClick={this.handleBackClick}
						bookedDates={this.state.bookedDates}
					/>
					<Calendar
						month={this.state.month2}
						backButton={false}
						fwdButton={true}
						handleFwdClick={this.handleFwdClick}
						handleBackClick={this.handleBackClick}
						bookedDates={this.state.bookedDates}
					/>
				</div>
				<button className={styles.button}>Clear dates</button>
			</div>
		);
	}
}

export default App;
