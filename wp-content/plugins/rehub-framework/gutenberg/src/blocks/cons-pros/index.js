/**
 * BLOCK: Const Pros.
 */

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {ProsAndCons} from "../../icons";
import edit from './edit';
import schema from "./schema";

const blockProperty = {
	title: __('Cons Pros', 'rehub-theme-child'),
	description: __('Box with positive and negative items', 'rehub-theme-child'),
	icon: ProsAndCons,
	category: 'helpler-modules',
	keywords: [
		'rehub',
		'positive',
		'negative',
		'pros',
		'cons'
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
	slug: `rehub/conspros`,
	blockProperty,
};