/**
 * BLOCK: Slider.
 */

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {SliderIcon} from "../../icons";
import edit from './edit';
import schema from "./schema";

const blockProperty = {
	title: __('Slider', 'rehub-theme-child'),
	description: __('Rehub slider', 'rehub-theme-child'),
	icon: SliderIcon,
	category: 'helpler-modules',
	keywords: [
		'rehub',
		'slider'
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
	slug: `rehub/slider`,
	blockProperty,
};