/**
 * WordPress dependencies
 */
import {Component, Fragment} from '@wordpress/element';
import {withFocusOutside} from '@wordpress/components';
import {compose} from "@wordpress/compose";

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from "./Controls";

class EditBlock extends Component {
	render() {
		const {isSelected} = this.props;

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} />
						<Controls {...this.props} />
					</Fragment>
				)}
				<div>
					<h1>Edit</h1>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);