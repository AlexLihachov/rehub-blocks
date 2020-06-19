/**
 * BLOCK: Color Heading.
 */

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {ReviewHeadingIcon} from "../../icons";
import edit from './edit';
import schema from "./schema";

const blockProperty = {
	title: __('Color Heading', 'rehub-theme-child'),
	description: __('Simple heading with select of background color', 'rehub-theme-child'),
	icon: ReviewHeadingIcon,
	category: 'helpler-modules',
	keywords: [
		'rehub',
		'color',
		'heading',
		'header'
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
	slug: `rehub/color-heading`,
	blockProperty,
};