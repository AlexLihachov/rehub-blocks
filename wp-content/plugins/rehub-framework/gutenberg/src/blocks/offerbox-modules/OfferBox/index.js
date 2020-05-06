/**
 * BLOCK: Offerbox.
 */


/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import schema from '../schema';
import edit from './edit';
import {OfferBoxIcon} from '../../../icons';

const blockProperty = {
	title: __('OfferBox', 'rehub-theme-child'),
	description: __('Woo Box description', 'rehub-theme-child'),
	icon: OfferBoxIcon,
	category: 'helpler-modules',
	keywords: [],
	supports: {
		align: ['wide', 'full'],
		customClassName: false,
		html: false,
	},
	example: {},
	attributes: schema,
	save: () => null,
	edit
};

export default {
	slug: `rehub/offerbox`,
	blockProperty,
};
