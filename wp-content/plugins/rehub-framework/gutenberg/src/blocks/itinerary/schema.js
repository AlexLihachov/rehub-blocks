/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const schema = {
	items: {
		type: 'array',
		default: [
			{
				icon: 'fa fa-circle',
				color: '#409cd1',
				content: __('Box Content', 'rehub-theme-child')
			},
			{
				icon: 'fa fa-circle',
				color: '#409cd1',
				content: __('Box Content', 'rehub-theme-child')
			},
			{
				icon: 'fa fa-circle',
				color: '#409cd1',
				content: __('Box Content', 'rehub-theme-child')
			}
		]
	}
};
export default schema;