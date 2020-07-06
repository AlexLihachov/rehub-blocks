/**
 * WordPress dependencies
 */
import {Component, createRef} from '@wordpress/element';
import {SelectControl, Spinner} from '@wordpress/components';
import {withSelect} from '@wordpress/data';

/**
 * External dependencies
 */
import select2 from 'select2';

class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentValue: []
		};
		this.ref = createRef();
		this.isInit = false;
		this.handleChange = this.handleChange.bind(this);
		this.initSelect2 = this.initSelect2.bind(this);
	}

	handleChange(value) {
		this.setState({
			currentValue: value
		});
	}

	initSelect2() {
		this.isInitied = true;
		jQuery(this.ref.current).find('select').select2();
	}

	componentDidUpdate() {
		const {posts} = this.props;
		if (posts && posts.length && this.isInit === false) {
			this.initSelect2();
		}
	}

	render() {
		const {label, posts, multiple} = this.props;
		let selectData = null;

		if (posts && posts.length) {
			selectData = posts.map((post) => {
				return {
					label: post.title.rendered,
					value: post.id
				};
			});
		}

		if (selectData) {
			return (
				<div ref={this.ref}>
					<SelectControl
						multiple={multiple}
						label={label}
						value={this.state.currentValue}
						options={selectData}
						onChange={this.handleChange}
					/>
				</div>
			);
		}

		return <Spinner/>;
	}
}


export default withSelect(
	(select) => {
		return {
			posts: select('core').getEntityRecords('postType', 'post', {per_page: -1})
		};
	}
)(Select);
