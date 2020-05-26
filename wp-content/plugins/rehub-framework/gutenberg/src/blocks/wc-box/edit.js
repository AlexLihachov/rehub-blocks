/**
 * WordPress dependencies
 */
import {Component, Fragment, RawHTML, createRef} from '@wordpress/element';
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
import ContentColumn from "./ContentColumn";
import CtaColumn from "./CtaColumn";
import updateProductData from "./util/updateProductData";

class EditBlock extends Component {
	constructor() {
		super(...arguments);
		this.blockRef = createRef();
		updateProductData(this.props.attributes.productId, this.props.setAttributes);
	}

	componentDidMount() {
		const block = this.blockRef.current;
		const tabs = jQuery(block).find('.c-ws-box-tabs');

		tabs.on('click', 'li:not(.current)', function () {
			jQuery(this).addClass('current').siblings().removeClass('current');
			jQuery(block).find('.c-ws-box-tab').hide().eq(jQuery(this).index()).fadeIn(700);
		});
	}

	render() {
		const {className, isSelected, attributes} = this.props;
		const {
			      loading,
			      imageUrl,
			      description,
			      productAttributes,
			      isCouponExpired
		      } = attributes;
		const mainClasses = classnames([
			'c-ws-box',
			{
				'c-ws-box--loading': loading,
				'c-ws-box--expired': isCouponExpired
			}
		]);
		const showTabs = (productAttributes !== '');

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} />
						<Controls {...this.props} />
					</Fragment>
				)}

				<div className={className} ref={this.blockRef}>
					<ul className='c-ws-box-tabs'>
						{showTabs && (
							<Fragment>
								<li className='current'>
									{__('Product', 'rehub-theme-child')}
								</li>
								{attributes !== '' && (
									<li>
										{__('Specification', 'rehub-theme-child')}
									</li>
								)}
							</Fragment>
						)}
					</ul>
					<div className={mainClasses}>
						<Spinner/>
						<div className='c-ws-box-tab'>
							<div className="c-ws-box__wrapper">
								<div className="c-ws-box-image">
									<img src={imageUrl} alt=""/>
								</div>
								<ContentColumn {...this.props} />
								<div className="c-ws-box-content-desc">
									<RawHTML>{description}</RawHTML>
								</div>
								<CtaColumn {...this.props} />
							</div>
						</div>
						{productAttributes !== '' && (
							<div className="c-ws-box-tab d-none">
								<RawHTML>{productAttributes}</RawHTML>
							</div>
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);