import React from "react";
import Discount from "./discount.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div>Availability</div>
				<Discount rate={0.1} measure={14} />
			</div>
		);
	}
}

export default App;
