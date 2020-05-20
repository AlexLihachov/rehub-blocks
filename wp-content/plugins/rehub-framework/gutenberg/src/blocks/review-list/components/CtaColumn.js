/**
 * Internal dependencies
 */
import Price from "./Price";
import Button from "./Button";
import Coupon from "./Coupon";

/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';

/**
 * External dependencies
 */
import {cloneDeep} from "lodash";

const CtaColumn = (props) => {
	const {attributes, setAttributes, index, writable} = props;
	const {offers} = attributes;
	const {readMore} = offers[index];

	return (
		<div className='c-offer-listing-cta'>
			<Price {...props}/>
			<Button {...props}/>
			<Coupon {...props} />
			{writable && (
				<RichText
					placeholder={__('Read full review', 'rehub-theme-child')}
					tagName="span"
					className='c-offer-listing__read-more'
					value={readMore}
					onChange={(value) => {
						const offersClone = cloneDeep(offers);
						offersClone[index].readMore = value;
						setAttributes({
							offers: offersClone
						});
					}}
				/>
			)}
			{writable === false && (
				<span className='c-offer-listing__read-more'>{readMore}</span>
			)}
		</div>
	);
};

export default CtaColumn;