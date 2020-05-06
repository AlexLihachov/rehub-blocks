import ReactSelect2Wrapper from 'react-select2-wrapper';
import {Component} from '@wordpress/element';
import {BaseControl} from "@wordpress/components";
import {Fragment} from '@wordpress/element';

class Select2 extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			loaded: false,
			posts: [],
			initialSetup: true
		};
		this.defaultValue = this.props.selectedPost;
		this.getOptions = this.getOptions.bind(this);
		this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
	}

	getOptions() {
		if (this.state.posts.length === 0 && this.state.initialSetup) {
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
	}

	onChangeSelectPost(value) {
		this.setState({currentPost: parseInt(value)});
		this.props.onChange(value);
	}

	componentDidMount() {
		this.getOptions();
	}

	render() {
		const {label} = this.props;
		const {posts, currentPost} = this.state;

		return (
			<Fragment>
				<BaseControl label={label}>
					<ReactSelect2Wrapper
						defaultValue={this.defaultValue}
						value={currentPost}
						data={posts}
						onChange={(event) => {
							const value = jQuery(event.currentTarget).val();

							if (value !== null && value.length) {
								if (this.state.initialSetup) {
									this.setState({initialSetup: false})
								} else {
									this.onChangeSelectPost(value);
								}
							}
						}}
					/>
				</BaseControl>
			</Fragment>
		);
	}

}

export default Select2;
