/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element'
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, ToggleControl, TextControl, DateTimePicker, TextareaControl, Button} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {updateOfferData} from "./fetchService";
import populateOfferFields from './populate-offer-fields';
import Select2 from "../../components/Select2";
import ImageControl from "../../components/image-control";

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
			      thumbnail,
			      discount_tag,
			      rating
		      } = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('Data query', 'rehub-theme-child')} initialOpen={true}>
					<label className="components-base-control__label">
						{__('Post name', 'rehub-theme-child')}
					</label>
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
				<PanelBody title={__('Manual Fields', 'rehub-theme-child')} initialOpen={false}>
					<TextControl
						label={__('Offer url', 'rehub-theme-child')}
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
						label={__('Title', 'rehub-theme-child')}
						value={name}
						onChange={(value) => {
							setAttributes({
								name: value
							});
						}}
					/>
					<TextareaControl
						label={__('Description', 'rehub-theme-child')}
						value={description}
						onChange={(value) => {
							setAttributes({
								description: value
							});
						}}
					/>
					<TextareaControl
						label={__('Disclaimer', 'rehub-theme-child')}
						value={disclaimer}
						onChange={(value) => {
							setAttributes({
								disclaimer: value
							});
						}}
					/>
					<TextControl
						label={__('Regular price', 'rehub-theme-child')}
						value={old_price}
						onChange={(value) => {
							setAttributes({
								old_price: value
							});
						}}
					/>
					<TextControl
						label={__('Sale price', 'rehub-theme-child')}
						value={sale_price}
						onChange={(value) => {
							setAttributes({
								sale_price: value
							});
						}}
					/>
					<TextControl
						label={__('Discount (%)', 'rehub-theme-child')}
						value={discount_tag}
						type='number'
						onChange={(value) => {
							if (value > 100) return;
							setAttributes({
								discount_tag: value,
								discount: ''
							});
						}}
					/>
					<TextControl
						label={__('Star rating', 'rehub-theme-child')}
						value={rating}
						type='number'
						onChange={(value) => {
							if (value > 5) return;
							setAttributes({
								rating: value
							});
						}}
					/>
					<TextControl
						label={__('Coupon code', 'rehub-theme-child')}
						value={coupon_code}
						onChange={(value) => {
							setAttributes({
								coupon_code: value
							});
						}}
					/>
					<div>
						<label className="components-base-control__label">
							{__('Choose date of finish', 'rehub-theme-child')}
						</label>
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
						checked={mask_coupon_code}
						onChange={() => {
							setAttributes({
								mask_coupon_code: !mask_coupon_code
							});
						}}
					/>
					{/*<ToggleControl*/}
					{/*	label={__('Offer is expired?', 'rehub-theme-child')}*/}
					{/*	help={__('This option depends on expiration date field, but you can also enable expiration if you have not expiration date', 'rehub-theme-child')}*/}
					{/*	checked={offer_is_expired}*/}
					{/*	onChange={() => {*/}
					{/*		setAttributes({*/}
					{/*			offer_is_expired: !offer_is_expired*/}
					{/*		});*/}
					{/*	}}*/}
					{/*/>*/}
					<TextControl
						label={__('Button Text', 'rehub-theme-child')}
						value={button.text}
						onChange={(value) => {
							const buttonClone = cloneDeep(button);
							buttonClone.text = value;
							setAttributes({
								button: buttonClone
							});
						}}
					/>
					<ImageControl
						label={__('Image', 'rehub-theme-child')}
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
					{/*<TextControl*/}
					{/*	label={__('Brand logo url', 'rehub-theme-child')}*/}
					{/*	help={__('Fallback for brand logo (better to add brand logo in Affiliate store fields)', 'rehub-theme-child')}*/}
					{/*	value={brand_logo_url}*/}
					{/*	placeholder={__('https://', 'rehub-theme-child')}*/}
					{/*	onChange={(value) => {*/}
					{/*		setAttributes({*/}
					{/*			brand_logo_url: value*/}
					{/*		});*/}
					{/*	}}*/}
					{/*/>*/}
					<div style={{marginTop: 20}}>
						<Button isSecondary onClick={() => populateOfferFields(this.props)}>
							{__('Autopopulate data to Post offer fields', 'rehub-theme-child')}
						</Button>
					</div>
				</PanelBody>
			</InspectorControls>
		);
	}
}
