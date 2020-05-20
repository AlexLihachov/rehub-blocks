/**
 * Internal dependencies
 */
import Price from "./Price";
import Button from "./Button";
import Coupon from "./Coupon";

const CtaColumn = (props) => {
	const {attributes, index, writable} = props;
	const {offers} = attributes;
	const {readMore} = offers[index];

	return (
		<div className='c-offer-listing-cta'>
			<Price {...props}/>
			<Button {...props}/>
			<Coupon {...props} />
			{writable === false && (
				<span className='c-offer-listing__read-more'>{readMore}</span>
			)}
		</div>
	);
};

export default CtaColumn;