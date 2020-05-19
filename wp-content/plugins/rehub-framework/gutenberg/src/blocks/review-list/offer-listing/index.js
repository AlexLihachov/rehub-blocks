/**
 * BLOCK: Offer Listing.
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
import {ReviewListIcon} from "../../../icons";

const blockProperty = {
	title: __('Offer Listing', 'rehub-theme-child'),
	description: __('Offer Listing description...', 'rehub-theme-child'),
	icon: ReviewListIcon,
	category: 'helpler-modules',
	keywords: [
		'rehub',
		'offer',
		'review',
		'listing',
		'list',
		'table'
	],
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
	slug: `rehub/offer-listing`,
	blockProperty,
};