/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {cloneDeep} from "lodash";

/**
 * Internal dependencies
 */
import UrlInputPopover from "../../../components/url-input-popover";
import Coupon from "./Coupon";

const ContentColumn = (props) => {
	const {attributes, setAttributes, onButtonClick, openUrlPopover, onButtonChange} = props;
	const {
		      name,
		      rating,
		      sale_price,
		      old_price,
		      disclaimer,
		      button,
		      coupon_code,
		      mask_coupon_code,
		      mask_coupon_text,
		      expiration_date,
		      offer_is_expired,
		      description
	      } = attributes;

	return (
		<div className="c-offer-box__column">
			<RichText
				placeholder={__('Product Name', 'rehub-theme-child')}
				tagName="h2"
				className="c-offer-box__title"
				value={name}
				onChange={(value) => {
					setAttributes({
						name: value
					});
				}}
				keepPlaceholderOnFocus/>
			{+rating > 0 && (
				<div className="c-offer-box__rating">
					{[...Array(+rating).keys()].map((item) => {
						return <span key={item}>&#x2605;</span>;
					})}
					{[...Array(5 - rating).keys()].map((item) => {
						return <span key={item}>☆</span>;
					})}
				</div>
			)}
			<div className="c-offer-box__price">
				<RichText
					placeholder={__('50', 'rehub-theme-child')}
					tagName="span"
					value={sale_price}
					onChange={(value) => {
						setAttributes({
							sale_price: value
						});
					}}
					keepPlaceholderOnFocus/>
				<span className="retail-old">
					<RichText
						placeholder={__('100', 'rehub-theme-child')}
						tagName="strike"
						value={old_price}
						onChange={(value) => {
							setAttributes({
								old_price: value
							});
						}}
						keepPlaceholderOnFocus/>
				</span>
			</div>
			<div className="c-offer-box__disclaimer">
				<RichText
					placeholder={__('Disclaimer', 'rehub-theme-child')}
					tagName="span"
					value={disclaimer}
					onChange={(value) => {
						setAttributes({
							disclaimer: value
						});
					}}
					keepPlaceholderOnFocus/>
			</div>
			<div onClick={onButtonClick}>
				<div className="c-offer-box__button">
					<RichText
						placeholder={__('Buy this item', 'rehub-theme-child')}
						tagName="span"
						value={button.text}
						onChange={(value) => {
							const buttonClone = cloneDeep(button);
							buttonClone.text = value;
							setAttributes({
								button: buttonClone
							});
						}}
						keepPlaceholderOnFocus/>
				</div>
				{openUrlPopover && (
					<UrlInputPopover
						value={button.url}
						newTab={button.newTab}
						noFollow={button.noFollow}
						onChange={value => onButtonChange(value, 'url')}
						onChangeNewTab={value => onButtonChange(value, 'newTab')}
						onChangeNoFollow={value => onButtonChange(value, 'noFollow')}/>
				)}
			</div>
			<Coupon
				coupon_code={coupon_code}
				mask_coupon_code={mask_coupon_code}
				mask_coupon_text={mask_coupon_text}
				setAttributes={setAttributes}
				expiration_date={expiration_date}
				offer_is_expired={offer_is_expired}/>
			<div className="c-offer-box__desc">
				<RichText
					placeholder={__('Description', 'rehub-theme-child')}
					tagName="span"
					value={description}
					onChange={(value) => {
						setAttributes({
							description: value
						});
					}}
					keepPlaceholderOnFocus
				/>
			</div>
		</div>
	);
};

export default ContentColumn;