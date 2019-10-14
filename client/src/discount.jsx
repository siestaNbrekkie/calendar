import React from "react";

function discount(props) {
	var rate = props.rate * 100;
	var measure = props.measure;
	var discountOffer = `This host offers ${rate}% off if you stay for ${measure} days.`;
	return (
		<div>
			<p className="discount">{discountOffer}</p>
		</div>
	);
}

export default discount;
