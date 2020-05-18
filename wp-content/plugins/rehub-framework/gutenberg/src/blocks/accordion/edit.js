/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component, Fragment, createRef} from '@wordpress/element';
import {withFocusOutside} from '@wordpress/components';
import {compose} from "@wordpress/compose";
import {RichText} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from "./Controls";

/**
 * External dependencies
 */
import classnames from "classnames";
import {cloneDeep} from 'lodash';

class EditBlock extends Component {
	constructor() {
		super(...arguments);
		this.accordionRef = createRef();
	}

	componentDidMount() {
		const items = this.accordionRef.current.getElementsByClassName('c-accordion-item');
		const triggers = this.accordionRef.current.getElementsByClassName('c-accordion-item__title');

		for (let i = 0; i < triggers.length; i++) {

			triggers[i].addEventListener('click', function () {
				let itemClass = this.parentNode.className;

				for (let k = 0; k < items.length; k++) {
					items[k].className = 'c-accordion-item close';
				}

				if (itemClass === 'c-accordion-item close') {
					this.parentNode.className = 'c-accordion-item open';
					this.nextSibling.classList.add('stuckMoveDownOpacity');
				}

			}, false);
		}
	}

	render() {
		const {isSelected, className, attributes, setAttributes} = this.props;
		const mainClasses = classnames([className, 'c-accordion']);
		const {tabs} = attributes;

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} />
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses} ref={this.accordionRef}>
					{tabs.map((tab, index) => {
						const {title, content} = tab;

						return (
							<div className='c-accordion-item close' key={index}>
								<RichText
									placeholder={__('Sample title', 'rehub-theme-child')}
									tagName="h3"
									className="c-accordion-item__title"
									value={title}
									onChange={(value) => {
										const tabsClone = cloneDeep(tabs);
										tabsClone[index].title = value;

										setAttributes({
											tabs: tabsClone
										});
									}}
								/>
								<div className='c-accordion-item__content'>
									<RichText
										placeholder={__('Sample content', 'rehub-theme-child')}
										tagName="div"
										className="c-accordion-item__text"
										value={content}
										onChange={(value) => {
											const tabsClone = cloneDeep(tabs);
											tabsClone[index].content = value;

											setAttributes({
												tabs: tabsClone
											});
										}}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);