const schema = {
	title: {
		type: 'string',
		default: ''
	},
	description: {
		type: 'string',
		default: ''
	},
	score: {
		type: 'number',
		default: 1
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
		default: ''
	},
	positives: {
		type: 'array',
		default: []
	},
	consTitle: {
		type: 'string',
		default: ''
	},
	negatives: {
		type: 'array',
		default: []
	},
};

export default schema;