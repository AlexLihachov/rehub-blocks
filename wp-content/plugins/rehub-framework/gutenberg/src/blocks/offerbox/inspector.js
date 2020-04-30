/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
const {Component} = wp.element;
const {InspectorControls} = wp.blockEditor || wp.editor;
import {
	PanelBody,
	ToggleControl,
	TextControl,
	DateTimePicker
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {updateOfferData} from "./fetchService";
import Select2 from "../../components/Select2";
import ImageControl from "../../components/image-control";
import AdvancedRangeControl from "../../components/advanced-range-control";

/**s
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {
			      postId,
			      name,
			      button,
			      description,
			      disclaimer,
			      old_price,
			      sale_price,
			      coupon_code,
			      expiration_date,
			      mask_coupon_code,
			      offer_is_expired,
			      thumbnail,
			      brand_logo_url,
			      discount_tag,
			      rating
		      } = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('Post Select', 'rehub-theme-child')} initialOpen={true}>
					<Select2
						rest={true}
						restPath={'rehub/v2/posts/get'}
						post_type={['product', 'post', 'blog']}
						value={postId}
						onChange={(value) => {
							updateOfferData(value, setAttributes, attributes);
						}}
					/>
				</PanelBody>
				<PanelBody title={__('General', 'rehub-theme-child')} initialOpen={false}>
					<TextControl
						label={__('Offer url', 'rehub-theme-child')}
						help={__('Insert url of offer', 'rehub-theme-child')}
						value={button.url}
						placeholder={__('https://', 'rehub-theme-child')}
						onChange={(value) => {
							const buttonClone = cloneDeep(button);
							buttonClone.url = value;
							setAttributes({
								button: buttonClone
							});
						}}
					/>
					<TextControl
						label={__('Name of product', 'rehub-theme-child')}
						help={__('Insert title or leave blank', 'rehub-theme-child')}
						value={name}
						placeholder={__('name...', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								name: value
							});
						}}
					/>
					<TextControl
						label={__('Short description of product', 'rehub-theme-child')}
						help={__('Enter description of product or leave blank', 'rehub-theme-child')}
						value={description}
						placeholder={__('description...', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								description: value
							});
						}}
					/>
					<TextControl
						label={__('Disclaimer', 'rehub-theme-child')}
						help={__('Optional. It works in [quick_offer] and [wpsm_top] shortcodes', 'rehub-theme-child')}
						value={disclaimer}
						placeholder={__('text...', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								disclaimer: value
							});
						}}
					/>
					<TextControl
						label={__('Offer old price', 'rehub-theme-child')}
						help={__('Insert old price of offer or leave blank', 'rehub-theme-child')}
						value={old_price}
						placeholder={__('100', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								old_price: value
							});
						}}
					/>
					<TextControl
						label={__('Offer sale price', 'rehub-theme-child')}
						help={__('Insert sale price of offer (example, $55). Please, choose your price pattern in theme options - localizations', 'rehub-theme-child')}
						value={sale_price}
						placeholder={__('50', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								sale_price: value
							});
						}}
					/>
					<TextControl
						label={__('Set coupon code', 'rehub-theme-child')}
						help={__('Set coupon code or leave blank', 'rehub-theme-child')}
						value={coupon_code}
						placeholder={__('coupon_code', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								coupon_code: value
							});
						}}
					/>
					<div>
						<label className="components-base-control__label">
							{__('Expiration Date', 'rehub-theme-child')}
						</label>
						<p className="components-base-control__help">
							{__('Choose expiration date or leave blank', 'rehub-theme-child')}
						</p>
						<DateTimePicker
							currentDate={expiration_date}
							onChange={(value) => {
								setAttributes({
									expiration_date: value
								});
							}}
							is12Hour={false}
						/>
					</div>
					<ToggleControl
						label={__('Mask coupon code?', 'rehub-theme-child')}
						help={__('If this option is enabled, coupon code will be hidden.', 'rehub-theme-child')}
						checked={mask_coupon_code}
						onChange={() => {
							setAttributes({
								mask_coupon_code: !mask_coupon_code
							});
						}}
					/>
					<ToggleControl
						label={__('Offer is expired?', 'rehub-theme-child')}
						help={__('This option depends on expiration date field, but you can also enable expiration if you have not expiration date', 'rehub-theme-child')}
						checked={offer_is_expired}
						onChange={() => {
							setAttributes({
								offer_is_expired: !offer_is_expired
							});
						}}
					/>
					<TextControl
						label={__('Button text', 'rehub-theme-child')}
						help={__('Insert text on button or leave blank to use default text. Use short names (not more than 14 symbols)', 'rehub-theme-child')}
						value={button.text}
						placeholder={__('Buy this item', 'rehub-theme-child')}
						onChange={(value) => {
							const buttonClone = cloneDeep(button);
							buttonClone.text = value;
							setAttributes({
								button: buttonClone
							});
						}}
					/>
					<ImageControl
						label={__('Upload thumbnail', 'rehub-theme-child')}
						help={__('Upload thumbnail of product or leave blank to use post thumbnail', 'rehub-theme-child')}
						imageID={thumbnail.id}
						imageURL={thumbnail.url}
						onRemove={() => {
							const thumbnailClone = cloneDeep(thumbnail);
							thumbnailClone.id = '';
							thumbnailClone.url = '';
							setAttributes({
								thumbnail: thumbnailClone
							});
						}}
						onChange={(media) => {
							const thumbnailClone = cloneDeep(thumbnail);
							thumbnailClone.id = media.id;
							thumbnailClone.url = media.url;
							setAttributes({
								thumbnail: thumbnailClone
							});
						}}
					/>
					<TextControl
						label={__('Brand logo url', 'rehub-theme-child')}
						help={__('Fallback for brand logo (better to add brand logo in Affiliate store fields)', 'rehub-theme-child')}
						value={brand_logo_url}
						placeholder={__('https://', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								brand_logo_url: value
							});
						}}
					/>
					<TextControl
						label={__('Discount Tag', 'rehub-theme-child')}
						help={__('Will be visible in deal, coupon list instead featured image. It shows maximum 5 symbols. Example: 50% or $20\n', 'rehub-theme-child')}
						value={discount_tag}
						placeholder={__('50%', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({
								discount_tag: value
							});
						}}
					/>
					<AdvancedRangeControl
						label={__('Rating', 'rehub-theme-child')}
						value={rating}
						onChange={(value) => {
							setAttributes({
								rating: value
							});
						}}
						min={0}
						max={5}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
