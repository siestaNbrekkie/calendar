import React from "react";
import styles from "../styles/discount.css";

function discount(props) {
	var rate = props.rate * 100;
	var measure = props.measure;
	var discountOffer = `This host offers ${rate}% off if you stay for ${measure} days.`;
	return (
		<div className={styles.discount}>
			<p>{discountOffer}</p>
		</div>
	);
}

export default discount;
