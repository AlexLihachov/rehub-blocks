/**
 * BLOCK: Review Heading.
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
	title: __('Review Heading', 'rehub-theme-child'),
	description: __('Heading', 'rehub-theme-child'),
	icon: ReviewHeadingIcon,
	category: 'helpler-modules',
	keywords: [
		'rehub',
		'review',
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
	slug: `rehub/review-heading`,
	blockProperty,
};