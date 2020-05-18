/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

const schema = {
	tabs: {
		type: 'array',
		default: [
			{
				title: __('Sample title', 'rehub-theme-child'),
				content: __('Sample content', 'rehub-theme-child')
			}
		]
	}
};
export default schema;