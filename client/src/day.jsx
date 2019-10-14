import React from "react";

class Day extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<td key={this.props.day} className="day">
				{this.props.day}
			</td>
		);
	}
}

export default Day;
