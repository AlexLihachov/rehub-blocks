/**
 * WordPress dependencies
 */
import {Component, Fragment} from "@wordpress/element";
import {compose} from "@wordpress/compose";
import {withFocusOutside} from "@wordpress/components";

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from "../components/Controls";

class EditBlock extends Component {
	render() {
		const {isSelected} = this.props;

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} writable={false}/>
						<Controls {...this.props} />
					</Fragment>
				)}
				<div>
					Edit Offer Listing
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside,
)(EditBlock);
