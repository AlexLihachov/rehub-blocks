/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const schema = {
	title: {
		type: 'string',
		default: __('Sample title', 'rehub-theme-child')
	},
	subtitle: {
		type: 'string',
		default: __('Sample subtitle', 'rehub-theme-child')
	},
	backgroundColor: {
		type: 'string',
		default: '#8035be'
	}
};
export default schema;