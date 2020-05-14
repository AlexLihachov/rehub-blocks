import {__} from '@wordpress/i18n';

const schema = {
	title: {
		type: 'string',
		default: __('Awesome', 'rehub-theme-child')
	},
	description: {
		type: 'string',
		default: __('Place here Description for your reviewbox', 'rehub-theme-child')
	},
	score: {
		type: 'number',
		default: 10
	},
	mainColor: {
		type: 'string',
		default: '#E43917'
	},
	criterias: {
		type: 'array',
		default: []
	},
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
	uniqueClass: {
		type: 'string',
		default: ''
	}
};

export default schema;