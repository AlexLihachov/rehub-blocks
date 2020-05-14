import {__} from '@wordpress/i18n';

const schema = {
	prosTitle: {
		type: 'string',
		default: __('Positive', 'rehub-theme-child')
	},
	positives: {
		type: 'array',
		default: []
	},
	consTitle: {
		type: 'string',
		default: __('Negatives', 'rehub-theme-child')
	},
	negatives: {
		type: 'array',
		default: []
	},
};

export default schema;