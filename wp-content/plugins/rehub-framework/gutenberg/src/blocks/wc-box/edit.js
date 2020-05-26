/**
 * WordPress dependencies
 */
import {Component, Fragment, RawHTML} from '@wordpress/element';
import {compose} from "@wordpress/compose";
import {withFocusOutside, Spinner} from "@wordpress/components";
import {__} from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from './Controls';
import CtaColumn from "./CtaColumn";
import updateProductData from "./util/updateProductData";

class EditBlock extends Component {
	constructor() {
		super(...arguments);
		updateProductData(this.props.attributes.productId, this.props.setAttributes);
	}

	render() {
		const {className, isSelected, attributes} = this.props;
		const {
			      loading,
			      imageUrl,
			      productName,
			      description,
			      codeZone,
			      currencySymbol,
			      regularPrice,
			      salePrice,
			      priceLabel,
			      isExpired,
			      isCouponExpired
		      } = attributes;
		const mainClasses = classnames([
			className,
			'c-ws-box',
			{
				'c-ws-box--loading': loading,
				'c-ws-box--expired': isCouponExpired
			}
		]);

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} />
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses}>
					<Spinner/>
					<div className="c-ws-box__wrapper">
						<div className="c-ws-box-image">
							<img src={imageUrl} alt=""/>
						</div>
						<div className="c-ws-box-content">
							<h3 className='c-ws-box-title'>
								{isExpired && (
									<span className="rh-expired-notice">{__('Expired', 'rehub-theme-child')}</span>
								)}
								{productName}
							</h3>
							{codeZone !== '' && (
								<div className='c-ws-box-content__code-zone'>
									<RawHTML>{codeZone}</RawHTML>
								</div>
							)}
							{+regularPrice > 0 && (
								<Fragment>
									<span className='c-ws-box-price'>
										{+salePrice > 0 && (
											<Fragment>
												<del><RawHTML>{currencySymbol}</RawHTML>{regularPrice}</del>
												<ins><RawHTML>{currencySymbol}</RawHTML>{salePrice}</ins>
											</Fragment>
										)}
										{+salePrice === 0 && (
											<ins><RawHTML>{currencySymbol}</RawHTML>{regularPrice}</ins>
										)}
									</span>
								</Fragment>
							)}
							{priceLabel && (
								<span className='c-ws-box-price__label'>{priceLabel}</span>
							)}
							<div className="clearfix"/>
						</div>
						<div className="c-ws-box-content-desc">
							<RawHTML>{description}</RawHTML>
						</div>
						<CtaColumn {...this.props} />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);