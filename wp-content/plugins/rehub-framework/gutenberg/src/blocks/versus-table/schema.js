/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const schema = {
	heading: {
		type: 'string',
		default: __('Versus Title', 'rehub-theme-child')
	},
	subheading: {
		type: 'string',
		default: __('Versus subline', 'rehub-theme-child')
	},
	type: {
		type: 'string',
		default: 'two'
	},
	bg: {
		type: 'string',
		default: ''
	},
	color: {
		type: 'string',
		default: ''
	},
	firstColumn: {
		type: 'object',
		default: {
			type: 'text',
			isGrey: false,
			content: __('Value 1', 'rehub-theme-child'),
			image: '',
			imageId: ''
		}
	},
	secondColumn: {
		type: 'object',
		default: {
			type: 'text',
			isGrey: false,
			content: __('Value 2', 'rehub-theme-child'),
			image: '',
			imageId: ''
		}
	},
	thirdColumn: {
		type: 'object',
		default: {
			type: 'text',
			isGrey: false,
			content: __('Value 3', 'rehub-theme-child'),
			image: '',
			imageId: ''
		}
	},
};
export default schema;