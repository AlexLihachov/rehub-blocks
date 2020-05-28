/**
 * WordPress dependencies
 */
import {Component, Fragment} from '@wordpress/element';
import {compose} from "@wordpress/compose";
import {withFocusOutside} from "@wordpress/components";
import {InnerBlocks} from "@wordpress/block-editor";

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
		const {className, isSelected, attributes} = this.props;
		const mainClasses = classnames([className, 'wpsm-itinerary']);
		const {items} = attributes;

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} />
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses}>
					{items.map((item, index) => {
						const {color, icon, content} = item;
						const iconStyles = {backgroundColor: color};

						return (
							<div className="wpsm-itinerary-item" key={index}>
								<div className="wpsm-itinerary-icon">
										<span style={iconStyles}>
											<i className={icon}/>
										</span>
								</div>
								<div className="wpsm-itinerary-content">
									<div>{content}</div>
								</div>
							</div>
						)
					})}
					<InnerBlocks/>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);