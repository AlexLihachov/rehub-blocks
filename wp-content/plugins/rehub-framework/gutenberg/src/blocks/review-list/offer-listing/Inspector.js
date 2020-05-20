/**
 * Internal dependencies
 */
import OfferCardList from "../components/OfferCardList";

/**
 * External dependencies
 */
import {cloneDeep} from "lodash";

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element'
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, Button, BaseControl} from '@wordpress/components';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const {setAttributes, attributes} = this.props;
		const {offers} = attributes;
		const offersClone = cloneDeep(offers);

		offersClone.push({
			score: 10,
			thumbnail: {
				id: '',
				url: `${window.RehubGutenberg.pluginDirUrl}/gutenberg/src/icons/noimage-placeholder.png`,
				width: '',
				height: ''
			},
			title: __('Post name', 'rehub-theme-child'),
			copy: __('Content', 'rehub-theme-child'),
			currentPrice: 100,
			oldPrice: 200,
			button: {
				text: __('Buy this item', 'rehub-theme-child'),
				url: '',
				newTab: false,
				noFollow: false
			},
			coupon: 'coupon_code',
			maskCoupon: false,
			readMore: __('Read full review', 'rehub-theme-child'),
			readMoreUrl: '',
			disclaimer: __('Disclaimer text....', 'rehub-theme-child')
		});

		setAttributes({
			offers: offersClone
		});
	}

	render() {
		return (
			<InspectorControls>
				<PanelBody title={__('Manual Fields', 'rehub-theme-child')} initialOpen={true}>
					<OfferCardList {...this.props}/>
				</PanelBody>
				<BaseControl className='text-center'>
					<Button isPrimary onClick={this.handleClick}>
						{__('Add item', 'rehub-theme-child')}
					</Button>
				</BaseControl>
			</InspectorControls>
		);
	}
}