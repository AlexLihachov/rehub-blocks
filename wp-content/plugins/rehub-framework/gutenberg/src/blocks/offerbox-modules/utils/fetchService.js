/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

function validURL(userInput) {
	const res = userInput.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/igm);
	return res !== null;
}

export function updateOfferData(selectedPost, setAttribute, attributes) {
	if (selectedPost && selectedPost.length) {
		setAttribute({
			loading: true
		});

		wp.apiFetch({path: `/rehub/v2/offer-data/${selectedPost[0]}`}).then(post => {
			const buttonClone = cloneDeep(attributes.button);
			const thumbnailClone = cloneDeep(attributes.thumbnail);

			buttonClone.url = post.button_url;
			buttonClone.text = post.button_text;
			thumbnailClone.url = post.thumbnail_url;

			setAttribute({
				selectedPost: selectedPost,
				name: post.name,
				description: post.description,
				disclaimer: post.disclaimer,
				old_price: post.old_price,
				sale_price: post.sale_price,
				coupon_code: post.coupon_code,
				expiration_date: post.expiration_date,
				mask_coupon_code: post.mask_coupon_code !== '',
				button: buttonClone,
				thumbnail: thumbnailClone,
				rating: post.rating,
				loading: false
			});
		});
	}
}

export function parseOfferData(url, setAttributes, attributes) {
	if (validURL(url) === false) {
		setAttributes({
			parseError: __('Url is not valid', 'rehub-theme-child')
		});
		return false;
	}

	setAttributes({
		loading: true
	});

	wp.apiFetch({
		path: '/rehub/v2/parse-offer/',
		method: 'POST',
		data: {
			url
		}
	}).then(response => {
		const data = JSON.parse(response);
		const {items} = data;
		const updatedData = {};
		const thumbnailClone = cloneDeep(attributes.thumbnail);
		let product = null;

		// Check if nothing found
		if (items.length === 0) {
			setAttributes({
				loading: false,
				parseError: __('Not found matching data', 'rehub-theme-child')
			});

			return;
		}

		items.forEach(item => {
			if (item.type[0].indexOf('Product') !== -1) {
				product = item.properties;
			}
		});

		// Check if have product schema
		if (product === null) {
			setAttributes({
				loading: false,
				parseError: __('Not found matching data', 'rehub-theme-child')
			});

			return;
		}

		if ('image' in product && product.image[0] !== '') {
			thumbnailClone.url = product.image[0];
			updatedData.thumbnail = thumbnailClone;
		}

		if ('name' in product && product.name[0] !== '') {
			updatedData.name = product.name[0];
		}

		if ('description' in product && product.description[0] !== '') {
			updatedData.description = product.description[0];
		}

		if ('offers' in product && product.offers[0].properties.price[0] !== '') {
			updatedData.old_price = product.offers[0].properties.price[0];
		}


		// Success updating
		setAttributes({
			...updatedData,
			loading: false,
			parseError: '',
			parseSuccess: __('Fields updated', 'rehub-theme-child')
		});

	}).catch(error => {
		setAttributes({
			loading: false,
			parseError: error.message
		});
	});
}