function Discount(props) {
	var rate = props.rate * 100;
	var measure = props.measure;
	var discountOffer = `This host offers ${rate} if you stay for ${measure} days.`;

	return <div>yo</div>;
}

export default Discount;
