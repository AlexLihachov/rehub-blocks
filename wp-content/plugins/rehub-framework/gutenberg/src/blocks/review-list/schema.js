const schema = {
	selectedPosts: {
		type: 'array',
		default: ''
	},
	loading: {
		type: 'boolean',
		default: false
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
			},
			{
				score: 4.5,
				thumbnail: {
					id: '',
					url: 'https://local.rehub.com/wp-content/uploads/thumbs_dir/photo-1503023345310-bd7c1de61c7d-1wlraslscv999jwn0b09fbus8jzbrg7w5hh5ld15fdt8.jpeg',
					width: '',
					height: ''
				},
				title: 'Post name 1',
				copy: 'Post content excerpt 1',
				currentPrice: 101,
				oldPrice: 201,
				button: {
					text: 'Buy this item1',
					url: '',
					newTab: false,
					noFollow: false
				},
				coupon: 'coupon_code1',
				maskCoupon: false,
				readMore: 'Read full review1',
				readMoreUrl: 'local.com',
				disclaimer: 'disclaimer text1....'
			}
		]
	}
};

export default schema;