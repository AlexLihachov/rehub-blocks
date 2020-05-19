const ContentColumn = (props) => {
	const {offer, writable} = props;
	const {title, copy} = offer;

	return (
		<div className="c-offer-listing-content">
			{writable === false && (
				<h3 className='c-offer-listing__title'>{title}</h3>
			)}
			{writable === false && (
				<div className='c-offer-listing__copy'>{copy}</div>
			)}
		</div>
	);
};

export default ContentColumn;