const Disclaimer = (props) => {
	const {offer, writable} = props;
	const {disclaimer} = offer;

	return (
		<div className='c-offer-listing-disclaimer'>
			{writable === false && (
				<span>{disclaimer}</span>
			)}
		</div>
	);
};

export default Disclaimer;