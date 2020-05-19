const Coupon = (props) => {
	const {offer, writable} = props;
	const {coupon} = offer;

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