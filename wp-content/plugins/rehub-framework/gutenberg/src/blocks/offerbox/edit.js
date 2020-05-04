/**
 * External dependencies
 */
import classnames from 'classnames';
import {cloneDeep} from 'lodash';

/**
 * WordPress dependencies
 */
import {Fragment, Component} from '@wordpress/element';
import {compose} from '@wordpress/compose';
import {withFocusOutside, Spinner} from '@wordpress/components';
import {RichText} from '@wordpress/block-editor';

const {__} = wp.i18n;

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import ImageUploadPlaceholder from "../../components/image-upload-placeholder";
import UrlInputPopover from "../../components/url-input-popover";

class EditBlock extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			openUrlPopover: false
		};
		this.handleFocusOutside = this.handleFocusOutside.bind(this);
		this.handleButtonChange = this.handleButtonChange.bind(this);
	}

	handleFocusOutside() {
		this.setState({
			openUrlPopover: null,
		});
	}

	handleButtonChange(value, type) {
		const {attributes, setAttributes} = this.props;
		const buttonClone = cloneDeep(attributes.button);
		buttonClone[type] = value;
		setAttributes({
			button: buttonClone
		});
	}

	render() {
		const {className, isSelected, attributes, setAttributes} = this.props;
		const {
			      thumbnail,
			      name,
			      old_price,
			      sale_price,
			      disclaimer,
			      button,
			      coupon_code,
			      mask_coupon_code,
			      description,
			      expiration_date,
			      offer_is_expired,
			      rating,
			      discount_tag,
			      discount,
			      loading
		      } = attributes;
		const mainClasses = classnames([
			className,
			'c-offer-box',
			{'c-offer-box--loading': loading}
		]);
		const couponClasses = classnames([
			'c-offer-box__coupon',
			{'c-offer-box__coupon--masked': mask_coupon_code,}
		]);

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

		// Process discount label render
		let discount_html = null;

		if (discount_tag && !discount) {
			discount_html = (
				<span className='c-offer-box__discount'>{discount_tag}%</span>
			);
		} else if (discount) {
			discount_html = (
				<span className='c-offer-box__discount'>{discount}</span>
			);
		}

		return (
			<Fragment>
				{isSelected && <Fragment>
					<Inspector {...this.props} />
					<Controls {...this.props} />
				</Fragment>}
				<div className={mainClasses}>
					<Spinner/>
					<div className="c-offer-box__wrapper">
						<div className="c-offer-box__column c-offer-box__image">
							<ImageUploadPlaceholder
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
								onChange={image => {
									const thumbnailClone = cloneDeep(thumbnail);
									thumbnailClone.id = image.id;
									thumbnailClone.url = image.url;
									setAttributes({
										thumbnail: thumbnailClone
									});
								}}
							/>
							{discount_html}
						</div>
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
								keepPlaceholderOnFocus
							/>
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
									keepPlaceholderOnFocus
								/>
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
											keepPlaceholderOnFocus
										/>
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
									keepPlaceholderOnFocus
								/>
							</div>
							<div onClick={() => this.setState({openUrlPopover: true})}>
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
										keepPlaceholderOnFocus
									/>
								</div>
								{this.state.openUrlPopover && (
									<UrlInputPopover
										value={button.url}
										newTab={button.newTab}
										noFollow={button.noFollow}
										onChange={value => this.handleButtonChange(value, 'url')}
										onChangeNewTab={value => this.handleButtonChange(value, 'newTab')}
										onChangeNoFollow={value => this.handleButtonChange(value, 'noFollow')}
									/>
								)}
							</div>
							{coupon_code && (
								<div>
									<div className={couponClasses}>
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
							)}
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
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);
