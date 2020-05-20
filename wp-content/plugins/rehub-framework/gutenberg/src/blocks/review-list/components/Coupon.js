/**
 * External dependencies
 */
import {cloneDeep} from "lodash";

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';

const Coupon = (props) => {
	const {attributes, setAttributes, index, writable} = props;
	const {offers} = attributes;
	const {coupon, maskCoupon} = offers[index];

	if (writable === false && coupon === '') {
		return null;
	}

	if (maskCoupon) {
		return null;
	}

	return (
		<div className='c-offer-listing-coupon'>
			{writable && (
				<RichText
					placeholder={__('coupon', 'rehub-theme-child')}
					tagName="span"
					value={coupon}
					onChange={(value) => {
						const offersClone = cloneDeep(offers);
						offersClone[index].coupon = value;
						setAttributes({
							offers: offersClone
						});
					}}
					keepPlaceholderOnFocus
				/>
			)}
			{writable === false && (
				<span>{coupon}</span>
			)}
			<i className="fal fa-cut fa-rotate-180"/>
		</div>
	);
};

export default Coupon;