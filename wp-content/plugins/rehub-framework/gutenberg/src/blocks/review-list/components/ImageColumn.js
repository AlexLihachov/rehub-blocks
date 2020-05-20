/**
 * WordPress dependencies
 */
import {Fragment} from "@wordpress/element";

const ImageColumn = (props) => {
	const {offer, writable} = props;
	const {score, thumbnail} = offer;

	return (
		<div className='c-offer-listing-image'>
			<div className="c-offer-listing-score">
				{score && (
					<Fragment>
						{writable === false && (
							<span className={`score--${Math.round(+score)}`}>{score}</span>
						)}
					</Fragment>
				)}

			</div>
			<figure>
				<img src={thumbnail.url} alt=""/>
			</figure>
		</div>
	);
};

export default ImageColumn;