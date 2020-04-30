/**
 * BLOCK: Offerbox.
 */

/**
 * External dependencies
 */
const {__} = wp.i18n;

/**
 * Internal dependencies
 */
import schema from './schema';
import edit from './edit';

const blockProperty = {
	title: __('OfferBox (dev)', 'rehub-theme-child'),
	description: __('Woo Box description', 'rehub-theme-child'),
	icon: {
		src: 'info',
	},
	category: 'helpler-modules',
	keywords: [],
	supports: {
		align: ['wide', 'full'],
		customClassName: false,
		html: false,
	},
	attributes: schema,
	save: () => null,
	edit
};

export default {
	slug: `rehub/offerbox`,
	blockProperty,
};
