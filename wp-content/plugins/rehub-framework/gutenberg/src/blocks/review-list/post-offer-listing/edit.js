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
import OfferItem from '../components/OfferItem';

/**
 * External dependencies
 */
import classnames from "classnames";

class EditBlock extends Component {
	render() {
		const {isSelected, className, attributes} = this.props;
		const {loading} = attributes;
		const mainClasses = classnames([
			className,
			'c-offer-listing',
			{'c-offer-listing--loading': loading}
		]);

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} writable={false}/>
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses}>
					<OfferItem {...this.props} index={0} writable={false}/>
					<OfferItem {...this.props} index={1} writable={false}/>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside,
)(EditBlock);
