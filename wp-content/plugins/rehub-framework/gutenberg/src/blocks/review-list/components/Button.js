/**
 * WordPress dependencies
 */
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from "classnames";
import {cloneDeep} from "lodash";

/**
 * Internal dependencies
 */
import UrlInputPopover from "../../../components/url-input-popover";

const Button = (props) => {
	const {attributes, setAttributes, index, writable, handleButtonChange, handleButtonClick, openUrlPopover} = props;
	const {offers} = attributes;
	const {button, maskCoupon} = offers[index];
	const classes = classnames([
		'c-offer-listing-btn',
		{'c-offer-listing-btn--masked': maskCoupon}
	]);

	if (writable === false && button.url === '') {
		return null;
	}

	return (
		<div className={classes} onClick={() => handleButtonClick(index)}>
			{writable && (
				<RichText
					placeholder={__('Buy this item', 'rehub-theme-child')}
					tagName="span"
					className='c-offer-listing-btn__text'
					value={button.text}
					onChange={(value) => {
						const offersClone = cloneDeep(offers);
						offersClone[index].button.text = value;
						setAttributes({
							offers: offersClone
						});
					}}
					keepPlaceholderOnFocus
				/>
			)}
			{openUrlPopover === index && (
				<UrlInputPopover
					value={button.url}
					newTab={button.newTab}
					noFollow={button.noFollow}
					onChange={value => handleButtonChange(value, 'url', index)}
					onChangeNewTab={value => handleButtonChange(value, 'newTab', index)}
					onChangeNoFollow={value => handleButtonChange(value, 'noFollow', index)}
				/>
			)}
			{writable === false && (
				<span className='c-offer-listing-btn__text'>{button.text}</span>
			)}
		</div>
	);
};

export default Button;