/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {cloneDeep} from "lodash";
import {Fragment} from "@wordpress/element";

/**
 * Internal dependencies
 */
import UrlInputPopover from "../../../components/url-input-popover";
import Coupon from "./Coupon";

const ContentColumn = (props) => {
	const {attributes, setAttributes, onButtonClick, openUrlPopover, onButtonChange, writable} = props;
	const {
		      name,
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

	const rating = parseInt(attributes.rating);

	return (
		<div className="c-offer-box__column">
			{/* Title */}
			{writable && (
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
			)}
			{writable === false && (
				<h2 className='c-offer-box__title'>{name ? name : __('Product name', 'rehub-theme-child')}</h2>
			)}
			{rating > 0 && (
				<div className="c-offer-box__rating">
					{[...Array(rating).keys()].map((item) => {
						return <span key={item}>&#x2605;</span>;
					})}
					{[...Array(5 - rating).keys()].map((item) => {
						return <span key={item}>☆</span>;
					})}
				</div>
			)}

			{/* Price */}
			<div className="c-offer-box__price">
				{writable && (
					<Fragment>
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
					</Fragment>
				)}
				{writable === false && (
					<Fragment>
						<span>{sale_price}</span>
						<span className='retail-old'><strike>{old_price}</strike></span>
					</Fragment>
				)}
			</div>

			{/* Disclaimer */}
			<div className="c-offer-box__disclaimer">
				{writable && (
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
				)}
				{writable === false && (
					<span>{disclaimer}</span>
				)}
			</div>

			{/* CTA */}
			{writable && (
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
			)}
			{writable === false && (
				<div>
					<div className='c-offer-box__button'>
						<span>{button.text}</span>
					</div>
				</div>
			)}
			<Coupon
				coupon_code={coupon_code}
				mask_coupon_code={mask_coupon_code}
				mask_coupon_text={mask_coupon_text}
				setAttributes={setAttributes}
				expiration_date={expiration_date}
				offer_is_expired={offer_is_expired}
				writable={writable}/>

			{/* Description	*/}
			<div className="c-offer-box__desc">
				{writable && (
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
				)}
				{writable === false && (
					<span>{description}</span>
				)}
			</div>
		</div>
	);
};

export default ContentColumn;