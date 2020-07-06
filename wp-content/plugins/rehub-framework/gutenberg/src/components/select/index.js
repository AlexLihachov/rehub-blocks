/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component, createRef} from '@wordpress/element';
import {Spinner, Notice, BaseControl} from '@wordpress/components';
import {withSelect} from '@wordpress/data';

class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showNotice: false
		};
		this.ref = createRef();
		this.isInit = false;
		this.handleChange = this.handleChange.bind(this);
		this.initSelect2 = this.initSelect2.bind(this);
	}

	handleChange(value) {
		this.props.onChange(value);
	}

	initSelect2() {
		this.isInit = true;

		if (typeof jQuery.fn.select2 !== 'function') {
			this.setState({
				showNotice: true
			});
			return;
		}

		jQuery(this.ref.current).select2();
		jQuery(this.ref.current).on('change.select2', () => {
			this.handleChange(jQuery(this.ref.current).select2('data'));
		});
	}

	componentDidMount() {
		const {posts} = this.props;
		if (posts && posts.length && !this.isInit) {
			this.initSelect2();
		}
	}

	componentDidUpdate() {
		const {posts} = this.props;
		if (posts && posts.length && !this.isInit) {
			this.initSelect2();
		}
	}

	render() {
		const {label, posts, multiple, currentValues} = this.props;
		let selectData = null;

		if (posts && posts.length) {
			selectData = posts.map((post) => {
				const item = {
					label: post.title.rendered,
					value: post.id,
					selected: false
				};

				if (currentValues && currentValues.length) {
					item.selected = currentValues.some(element => +element === +post.id);
				}

				return item;
			});
		}

		if (this.state.showNotice) {
			return (
				<Notice status="error">
					{__('Select2 is not installed', 'rehub-theme-child')}
				</Notice>
			);
		}

		if (selectData) {
			return (
				<BaseControl label={label}>
					<select multiple={multiple} ref={this.ref}>
						{selectData.map((item) => {
							const {value, label, selected} = item;
							return (
								<option value={value} key={value} selected={selected}>{label}</option>
							);
						})}
					</select>
				</BaseControl>
			);
		}

		return <Spinner/>;
	}
}

Select.defaultProps = {
	multiple: false,
	label: __('Label', 'rehub-theme-child'),
	onChange: () => {
	},
	posts: [],
	currentValues: []
};

const ProductSelect = withSelect(
	(select) => {
		return {
			posts: select('core').getEntityRecords('postType', 'product')
		};
	}
)(Select);

export {ProductSelect};

export default withSelect(
	(select) => {
		return {
			posts: select('core').getEntityRecords('postType', 'post', {per_page: -1})
		};
	}
)(Select);
