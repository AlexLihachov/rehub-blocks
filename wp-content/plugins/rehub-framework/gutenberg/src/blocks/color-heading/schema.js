/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const schema = {
	align: {
		type: 'string',
		default: 'full'
	},
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
	},
	titleColor: {
		type: 'string',
		default: '#f2f2f2'
	},
	subtitleColor: {
		type: 'string',
		default: '#f2f2f2'
	}
};
export default schema;