/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';

const Coupon = (props) => {
	const {
		      coupon_code,
		      mask_coupon_code,
		      mask_coupon_text,
		      expiration_date,
		      offer_is_expired,
		      setAttributes
	      } = props;

	// Calculate expires days and process render html
	let expires_html = null;

	if (expiration_date) {
		const currentTimestamp = Date.now();
		const expiredTimestamp = Date.parse(expiration_date);
		const difference = (expiredTimestamp - currentTimestamp);
		const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

		if (daysDifference < 0) {
			expires_html = <div className="time_offer">{__('Expired', 'rehub-theme-child')}</div>;
		} else if (daysDifference === 0) {
			expires_html = <div className="time_offer">{__('Last day', 'rehub-theme-child')}</div>;
		} else if (daysDifference >= 1) {
			expires_html =
				<div className="time_offer">{daysDifference} {__('days left', 'rehub-theme-child')}</div>;
		}
	}

	if (offer_is_expired) {
		expires_html = <div className="time_offer">Expired</div>;
	}

	if (coupon_code) {
		if (mask_coupon_code) {
			return (
				<div>
					<div className='c-offer-box__coupon c-offer-box__coupon--masked'>
						<RichText
							placeholder={__('Reveal', 'rehub-theme-child')}
							tagName="span"
							className="coupon_text"
							value={mask_coupon_text}
							onChange={(value) => {
								setAttributes({
									mask_coupon_text: value
								});
							}}
							keepPlaceholderOnFocus
						/>
						<i className="far fa-external-link-square"/>
					</div>
					{expires_html}
				</div>
			);
		} else {
			return (
				<div>
					<div className='c-offer-box__coupon'>
						<i className="fal fa-cut fa-rotate-180"/>
						<RichText
							placeholder={__('code_of_coupon', 'rehub-theme-child')}
							tagName="span"
							className="coupon_text"
							value={coupon_code}
							onChange={(value) => {
								setAttributes({
									coupon_code: value
								});
							}}
							keepPlaceholderOnFocus
						/>
					</div>
					{expires_html}
				</div>
			);
		}
	} else {
		return null;
	}
};

export default Coupon;