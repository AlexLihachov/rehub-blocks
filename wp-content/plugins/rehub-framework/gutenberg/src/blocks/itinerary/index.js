/**
 * BLOCK: Itinerary Box.
 */

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {ItineraryIcon} from "../../icons";
import edit from './edit';
import schema from "./schema";

const blockProperty = {
	title: __('Itinerary', 'rehub-theme-child'),
	description: __('Itinerary list with icons', 'rehub-theme-child'),
	icon: ItineraryIcon,
	category: 'helpler-modules',
	keywords: [
		'rehub',
		'itinerary',
		'travel',
		'list',
		'icon'
	],
	supports: {
		customClassName: false,
		html: false,
	},
	example: {},
	attributes: schema,
	save: () => null,
	edit
};


export default {
	slug: `rehub/itinerary`,
	blockProperty,
};