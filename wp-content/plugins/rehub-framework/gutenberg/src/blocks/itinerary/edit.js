/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component, Fragment} from '@wordpress/element';
import {compose} from "@wordpress/compose";
import {withFocusOutside} from "@wordpress/components";
import {RichText} from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from "classnames";
import {cloneDeep} from "lodash";

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from './Controls';

class EditBlock extends Component {
	render() {
		const {className, isSelected, attributes, setAttributes} = this.props;
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
									<RichText
										placeholder={__('Box Content', 'rehub-theme-child')}
										tagName="div"
										value={content}
										onChange={(value) => {
											const itemsClone = cloneDeep(items);
											itemsClone[index].content = value;
											setAttributes({items: itemsClone});
										}}
										keepPlaceholderOnFocus
									/>
								</div>
							</div>
						)
					})}
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);