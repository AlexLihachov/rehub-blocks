/**
 * WordPress dependencies
 */
import {Component, Fragment} from '@wordpress/element';
import {compose} from "@wordpress/compose";
import {withFocusOutside} from "@wordpress/components";

/**
 * External dependencies
 */
import classnames from "classnames";


/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from './Controls';

class EditBlock extends Component {
	render() {
		const {className, isSelected} = this.props;
		const mainClasses = classnames([className, 'c-versus-table']);

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} />
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses}>
					<h3>Versus table</h3>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);