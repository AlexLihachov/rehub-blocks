const Discount = (props) => {
	const {discount_tag, discount} = props;

	if (discount_tag && !discount) {
		return (
			<span className='c-offer-box__discount'>{discount_tag}%</span>
		);
	} else if (discount) {
		return (
			<span className='c-offer-box__discount'>{discount}</span>
		);
	} else {
		return null;
	}
};

export default Discount;