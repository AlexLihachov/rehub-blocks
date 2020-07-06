/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

export default function updateProductData(value, setAttributes) {
	if (value && value.length === 0) {
		return false;
	}

	setAttributes({
		loading: true,
		productId: value,
		parseError: '',
		parseSuccess: ''
	});

	wp.apiFetch({
		path: `/rehub/v2/product/${value[0]}`,
		method: 'GET',
	}).then(response => {
		const data = JSON.parse(response);

		setAttributes({
			loading: false,
			parseError: '',
			parseSuccess: __('Fields updated', 'rehub-theme-child'),
			...data
		});
	}).catch(error => {
		setAttributes({
			loading: false,
			parseError: error.message,
			parseSuccess: ''
		});
	});
}