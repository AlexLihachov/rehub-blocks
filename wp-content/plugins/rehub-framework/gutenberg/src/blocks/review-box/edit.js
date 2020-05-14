/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {RichText} from '@wordpress/block-editor';
import {Component, Fragment} from '@wordpress/element';
import {withFocusOutside} from '@wordpress/components';
import {compose} from "@wordpress/compose";

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from './Controls';
import Criteria from "./Criteria";
import ConsPros from "./ConsProp";

class EditBlock extends Component {
	render() {
		const {className, isSelected, attributes, setAttributes} = this.props;
		const {title, description, score, mainColor, criterias, prosTitle, positives, consTitle, negatives} = attributes;
		const mainClasses = classnames([className, 'c-review-box']);

		const scoreStyles = {
			backgroundColor: mainColor
		};

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} />
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses}>
					<div className='c-review-box__wrapper'>
						<div className="review-top">
							<div className="overall-score" style={scoreStyles}>
								<span className='overall'>{score}</span>
								<span className='overall-text'>{__('Expert Score', 'rehub-theme-child')}</span>
							</div>
							<div className="review-text">
								<RichText
									placeholder={__('Awesome', 'rehub-theme-child')}
									tagName="span"
									className="review-header"
									value={title}
									onChange={(value) => {
										setAttributes({
											title: value
										});
									}}
									keepPlaceholderOnFocus
								/>
								<RichText
									placeholder={__('Place here Description for your reviewbox', 'rehub-theme-child')}
									tagName="p"
									value={description}
									onChange={(value) => {
										setAttributes({
											description: value
										});
									}}
									keepPlaceholderOnFocus
								/>
							</div>
						</div>
						<Criteria
							setAttributes={setAttributes}
							criterias={criterias}
							mainColor={mainColor}
						/>
						<ConsPros
							setAttributes={setAttributes}
							prosTitle={prosTitle}
							consTitle={consTitle}
							positives={positives}
							negatives={negatives}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);