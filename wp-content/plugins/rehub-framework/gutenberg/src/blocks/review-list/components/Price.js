/**
 * WordPress dependencies
 */
import {Fragment} from "@wordpress/element";

const Price = (props) => {
	const {offer, writable} = props;
	const {currentPrice, oldPrice} = offer;

	return (
		<div className='c-offer-listing-price'>
			{writable === false && (
				<Fragment>
					<span>{currentPrice}</span>
					<del>{oldPrice}</del>
				</Fragment>
			)}
		</div>
	);
};

export default Price;