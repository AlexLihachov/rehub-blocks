const ImageColumn = (props) => {
	const {offer, writable} = props;
	const {score, thumbnail} = offer;

	return (
		<div className='c-offer-listing-image'>
			<div className="c-offer-listing-score">
				{writable === false && (
					<span>{score}</span>
				)}
			</div>
			<figure>
				<img src={thumbnail.url} alt=""/>
			</figure>
		</div>
	);
};

export default ImageColumn;