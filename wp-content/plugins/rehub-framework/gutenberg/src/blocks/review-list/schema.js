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
				score: 3.5,
				thumbnail: {
					id: '',
					url: 'https://local.rehub.com/wp-content/uploads/thumbs_dir/photo-1503023345310-bd7c1de61c7d-1wlraslscv999jwn0b09fbus8jzbrg7w5hh5ld15fdt8.jpeg',
					width: '',
					height: ''
				},
				title: 'Post name',
				copy: 'Post content excerpt',
				currentPrice: 100,
				oldPrice: 200,
				button: {
					text: 'Buy this item',
					url: '',
					newTab: false,
					noFollow: false
				},
				coupon: 'coupon_code',
				maskCoupon: false,
				readMore: 'Read full review',
				readMoreUrl: 'local.com',
				disclaimer: 'disclaimer text....'
			}
		]
	}
};

export default schema;