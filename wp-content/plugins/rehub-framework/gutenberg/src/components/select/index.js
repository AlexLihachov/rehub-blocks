/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {Spinner, BaseControl} from '@wordpress/components';
import {withSelect} from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * External dependencies
 */
import debounce from "debounce-promise";
import {trim} from 'lodash';
import AsyncSelect from 'react-select/async';

function mapPosts(posts, postType) {
	let data = [];

	for (let i = 0; i < posts.length; i++) {
		if (posts[i].type !== postType) {
			continue;
		}

		data.push({
			label: posts[i].title.rendered,
			value: posts[i].id
		});
	}

	return data;
}

// function valueFromId(opts, id) {
// 	return opts.find(o => o.value === +id);
// }


class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.getPosts = this.getPosts.bind(this);
		this.getPostsDebounced = debounce(this.getPosts, 500);
	}

	handleChange(value) {
		this.setState({selectedOption: value});
		this.props.onChange(value);
	}

	getPosts(inputValue, callback) {
		if (!inputValue) {
			return callback([]);
		}

		return apiFetch({
			path: `/wp/v2/posts?search=${trim(inputValue)}`,
			method: 'GET'
		}).then((response) => {
			callback(mapPosts(response, this.props.type));
		});
	}

	render() {
		const {label, posts, multiple, type} = this.props;
		let defaultOption = null;

		if (posts && posts.length) {
			defaultOption = mapPosts(posts, type);

			// if (currentValue) {
			// 	console.log(currentValue);
			//
			// 	if (multiple) {
			// 		defaultValue = currentValue.map(post => {
			// 			return {
			// 				label: valueFromId(defaultOption, post),
			// 				value: post
			// 			};
			// 		});
			// 	} else {
			// 		defaultValue = {
			// 			label: valueFromId(defaultOption, currentValue),
			// 			value: currentValue
			// 		};
			// 	}
			// }
		}

		if (defaultOption) {
			return (
				<BaseControl label={label}>
					<AsyncSelect
						cacheOptions
						defaultOptions={defaultOption}
						loadOptions={this.getPostsDebounced}
						onChange={this.handleChange}
						isMulti={multiple}
						value={this.state.selectedOption}
						className='react-select'
					/>
				</BaseControl>
			);
		}

		return <Spinner/>;
	}
}

Select.defaultProps = {
	multiple: false,
	type: 'post',
	label: __('Label', 'rehub-theme-child'),
	onChange: () => {
	},
	posts: [],
	currentValue: ''
};

const ProductSelect = withSelect(
	(select) => {
		return {
			posts: select('core').getEntityRecords('postType', 'product', {per_page: 10})
		};
	}
)(Select);

export {ProductSelect};

export default withSelect(
	(select) => {
		return {
			posts: select('core').getEntityRecords('postType', 'post', {per_page: 10})
		};
	}
)(Select);
