/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

export function updateOfferData(selectedPost, setAttribute, attributes) {
	if (selectedPost) {
		setAttribute({
			loading: true
		});

		wp.apiFetch({path: `/rehub/v2/offer-data/${selectedPost}`}).then(post => {
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