const Coupon = (props) => {
	const {offer, writable} = props;
	const {coupon, maskCoupon} = offer;

	if (writable === false && coupon === '') {
		return null;
	}

	if (maskCoupon) {
		return null;
	}

	return (
		<div className='c-offer-listing-coupon'>
			{writable === false && (
				<span>{coupon}</span>
			)}
			<i className="fal fa-cut fa-rotate-180"/>
		</div>
	);
};

export default Coupon;