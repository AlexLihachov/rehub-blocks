import {__} from '@wordpress/i18n';

const schema = {
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

	productId: {
		type: 'string',
		default: ''
	},
	productUrl: {
		type: 'string',
		default: ''
	},
	productType: {
		type: 'string',
		default: 'simple'
	},
	imageUrl: {
		type: 'string',
		default: `${window.RehubGutenberg.pluginDirUrl}/gutenberg/src/icons/noimage-placeholder.png`
	},
	productName: {
		type: 'string',
		default: __('Product name', 'rehub-theme-child')
	},
	description: {
		type: 'string',
		default: __('Description', 'rehub-theme-child')
	},
	codeZone: {
		type: 'string',
		default: ''
	},

	currencySymbol: {
		type: 'string',
		default: '$'
	},
	regularPrice: {
		type: 'string',
		default: '100'
	},
	salePrice: {
		type: 'string',
		default: '50'
	},
	priceLabel: {
		type: 'string',
		default: '-50%'
	},
	coupon: {
		type: 'string',
		default: ''
	},
	addToCartText: {
		type: 'string',
		default: __('Add to cart', 'rehub-theme-child')
	},
	maskText: {
		type: 'string',
		default: __('Reveal coupon', 'rehub-theme-child')
	},
	couponExpiredDate: {
		type: 'string',
		default: ''
	},
	brandList: {
		type: 'string',
		default: ''
	},

	isExpired: {
		type: 'boolean',
		default: false
	},
	couponMasked: {
		type: 'boolean',
		default: false
	},
	isCouponExpired: {
		type: 'boolean',
		default: false
	},
	isCompareEnabled: {
		type: 'boolean',
		default: false
	},
	isItemSyncEnabled: {
		type: 'boolean',
		default: false
	},
	productInStock: {
		type: 'boolean',
		default: true
	}
};
export default schema;