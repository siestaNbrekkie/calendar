import React from "react";
import Discount from "./discount.jsx";
import Calendar from "./calendar.jsx";
const axios = require("axios");
var moment = require("moment");

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookedDates: [],
			dateRestrictions: {},
			discount_measure: undefined,
			discount_rate: undefined,
			month1: moment(),
			month2: moment().add(1, "M")
		};
	}

	componentDidMount() {
		var parts = document.URL.split("/");
		var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash

		axios
			.get(`http://localhost:3000/${lastSegment}`)
			.then(res => {
				this.setState({
					bookedDates: res.data.bookedDates,
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
				<div className="title">Availability</div>
				<Discount
					rate={this.state.discount_rate}
					measure={this.state.discount_measure}
				/>
				<Calendar month={this.state.month1} />
				<Calendar month={this.state.month2} />
				<button>Clear dates</button>
			</div>
		);
	}
}

export default App;
