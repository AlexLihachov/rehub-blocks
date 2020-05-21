/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const schema = {
	selectedPosts: {
		type: 'array',
		default: ''
	},
	loading: {
		type: 'boolean',
		default: false
	},
	parseError: {
		type: 'string',
		default: ''
	},
	parseSuccess: {
		type: 'string',
		default: ''
	},
	offers: {
		type: 'array',
		default: [
			{
				score: 10,
				thumbnail: {
					id: '',
					url: `${window.RehubGutenberg.pluginDirUrl}/gutenberg/src/icons/noimage-placeholder.png`,
					width: '',
					height: ''
				},
				title: __('Post name', 'rehub-theme-child'),
				copy: __('Content', 'rehub-theme-child'),
				currentPrice: '',
				oldPrice: '',
				button: {
					text: __('Buy this item', 'rehub-theme-child'),
					url: '',
					newTab: false,
					noFollow: false
				},
				coupon: '',
				maskCoupon: false,
				readMore: __('Read full review', 'rehub-theme-child'),
				readMoreUrl: '',
				disclaimer: __('Disclaimer text...', 'rehub-theme-child')
			}
		]
	}
};

export default schema;