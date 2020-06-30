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
import {
	PanelBody,
	ToggleControl,
	TextControl,
	DateTimePicker,
	TextareaControl,
	Button,
	BaseControl,
	Notice
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import populateOfferFields from '../utils/populate-offer-fields';
import {parseOfferData} from '../utils/fetchService';
import ImageControl from "../../../components/image-control";
import ColorPaletteControl from '../../../components/ColorPaletteControl';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {
			      name,
			      button,
			      description,
			      disclaimer,
			      old_price,
			      sale_price,
			      coupon_code,
			      expiration_date,
			      mask_coupon_code,
			      mask_coupon_text,
			      thumbnail,
			      discount_tag,
			      rating,
			      borderColor,
			      parseError,
			      parseSuccess
		      } = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('Manual Fields', 'rehub-theme-child')} initialOpen={true}>
					<BaseControl className='rri-advanced-range-control'>
						<TextControl
							label={__('Offer url', 'rehub-theme-child')}
							value={button.url}
							placeholder={__('https://', 'rehub-theme-child')}
							onChange={(value) => {
								const buttonClone = cloneDeep(button);
								buttonClone.url = value;
								setAttributes({
									button: buttonClone,
									parseError: '',
									parseSuccess: ''
								});
							}}
						/>
						<div className="text-center">
							<Button isSecondary onClick={() => parseOfferData(button.url, setAttributes, attributes)}>
								{__('Try to parse offer data', 'rehub-theme-child')}
							</Button>
						</div>
						{parseError && (
							<Notice status="error" onRemove={() => setAttributes({parseError: ''})}>
								{parseError}
							</Notice>
						)}
						{(parseSuccess && !parseError) && (
							<Notice status="success" onRemove={() => setAttributes({parseSuccess: ''})}>
								{parseSuccess}
							</Notice>
						)}
					</BaseControl>
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
						label={__('Disclaimer or additional information', 'rehub-theme-child')}
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
								discount_tag: +value,
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
								rating: +value
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
					<TextControl
						label={__('Mask Text', 'rehub-theme-child')}
						value={mask_coupon_text}
						onChange={(value) => {
							setAttributes({
								mask_coupon_text: value
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
							thumbnailClone.width = '';
							thumbnailClone.height = '';
							setAttributes({
								thumbnail: thumbnailClone
							});
						}}
						onChange={(media) => {
							const thumbnailClone = cloneDeep(thumbnail);
							thumbnailClone.id = media.id;
							thumbnailClone.url = media.url;
							thumbnailClone.width = media.width;
							thumbnailClone.height = media.height;
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
					<ColorPaletteControl
						label={__('Border color', 'rehub-theme-child')}
						value={borderColor}
						onChange={(value) => {
							setAttributes({
								borderColor: value
							});
						}}
					/>
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
