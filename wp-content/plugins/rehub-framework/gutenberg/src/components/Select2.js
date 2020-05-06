import ReactSelect2Wrapper from 'react-select2-wrapper';
import {Component} from '@wordpress/element';
import {BaseControl} from "@wordpress/components";
import {Fragment} from '@wordpress/element';

class Select2 extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			loaded: false,
			selectedPost: null,
			posts: []
		};
		this.getOptions = this.getOptions.bind(this);
		this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
	}

	getOptions() {
		wp.apiFetch({path: '/wp/v2/posts/?filter[post_type]=post'}).then((posts) => {
			const selectData = posts.map((post) => {
				return {
					text: post.title.rendered,
					id: post.id
				};
			});

			this.setState({
				posts: selectData,
				loaded: true
			});
		});
	}

	onChangeSelectPost(value) {
		this.setState({selectedPost: parseInt(value)});
		this.props.onChange(value);
	}

	componentDidMount() {
		this.getOptions();
	}

	render() {
		const {label} = this.props;
		const {posts, selectedPost} = this.state;

		return (
			<Fragment>
				<BaseControl label={label}>
					<ReactSelect2Wrapper
						value={selectedPost}
						data={posts}
						onChange={(event) => {
							const value = jQuery(event.currentTarget).val();
							if (value !== null && value.length) {
								this.onChangeSelectPost(value);
							}
						}}
					/>
				</BaseControl>
			</Fragment>
		);
	}

}

export default Select2;
