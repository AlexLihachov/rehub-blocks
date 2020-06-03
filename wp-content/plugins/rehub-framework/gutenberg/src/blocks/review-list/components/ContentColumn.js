/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {Fragment, RawHTML} from "@wordpress/element";

/**
 * External dependencies
 */
import {cloneDeep} from "lodash";

const ContentColumn = (props) => {
	const {attributes, setAttributes, index, writable} = props;
	const {offers} = attributes;
	const {title, copy, badge} = offers[index];

	return (
		<div className="c-offer-listing-content">
			{writable && (
				<Fragment>
					<RichText
						placeholder={__('Post name', 'rehub-theme-child')}
						tagName="h3"
						className="c-offer-listing__title"
						value={title}
						onChange={(value) => {
							const offersClone = cloneDeep(offers);
							offersClone[index].title = value;
							setAttributes({
								offers: offersClone
							});
						}}
						keepPlaceholderOnFocus
					/>
					<div className='c-offer-listing__copy'>
						<RichText
							placeholder={__('Content', 'rehub-theme-child')}
							tagName="span"
							value={copy}
							onChange={(value) => {
								const offersClone = cloneDeep(offers);
								offersClone[index].copy = value;
								setAttributes({
									offers: offersClone
								});
							}}
							keepPlaceholderOnFocus
						/>
					</div>
				</Fragment>
			)}
			{writable === false && (
				<Fragment>
					<h3 className='c-offer-listing__title'>
						{title}
						{badge !== '' && (
							<RawHTML>{badge}</RawHTML>
						)}
					</h3>
					<div className='c-offer-listing__copy'>{copy}</div>
				</Fragment>
			)}
		</div>
	);
};

export default ContentColumn;