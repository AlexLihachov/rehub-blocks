/**
 * WordPress dependencies
 */
import {Component} from '@wordpress/element';
import {withFocusOutside} from '@wordpress/components';
import {compose} from "@wordpress/compose";

class EditBlock extends Component {
	render() {
		return (
			<div>
				<h1>Review Box</h1>
			</div>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);