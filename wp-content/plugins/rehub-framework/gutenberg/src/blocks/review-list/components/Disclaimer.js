const Disclaimer = (props) => {
	const {offer, writable} = props;
	const {disclaimer} = offer;

	if (writable === false && disclaimer === '') {
		return null;
	}

	return (
		<div className='c-offer-listing-disclaimer'>
			{writable === false && (
				<span>{disclaimer}</span>
			)}
		</div>
	);
};

export default Disclaimer;