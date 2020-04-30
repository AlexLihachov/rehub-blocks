const schema = {
	name: {
		type: 'string',
		default: ''
	},
	description: {
		type: 'string',
		default: ''
	},
	disclaimer: {
		type: 'string',
		default: ''
	},
	old_price: {
		type: 'string',
		default: ''
	},
	sale_price: {
		type: 'string',
		default: ''
	},
	coupon_code: {
		type: 'string',
		default: ''
	},
	expiration_date: {
		type: 'string',
		default: ''
	},
	mask_coupon_code: {
		type: 'boolean',
		default: true
	},
	offer_is_expired: {
		type: 'boolean',
		default: false
	},
	button: {
		type: 'object',
		default: {
			text: '',
			url: '',
			newTab: false,
			noFollow: false
		}
	},
	thumbnail: {
		type: 'object',
		default: {
			id: '',
			url: ''
		}
	},
	brand_logo_url: {
		type: 'string',
		default: ''
	},
	discount_tag: {
		type: 'string',
		default: ''
	},
	rating: {
		type: 'number',
		default: 0
	},
	postId: {
		type: 'string',
		default: '',
	},
	loading: {
		type: 'boolean',
		default: false
	}
};

export default schema;
