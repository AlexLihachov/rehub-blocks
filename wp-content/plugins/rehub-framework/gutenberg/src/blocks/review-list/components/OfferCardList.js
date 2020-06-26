/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component, Fragment} from '@wordpress/element'
import {
	TextControl,
	TextareaControl,
	PanelBody,
	Button,
	BaseControl,
	ToggleControl,
	ColorPicker
} from '@wordpress/components';

/**
 * External dependencies
 */
import {cloneDeep} from "lodash";
import {SortableContainer, SortableElement} from "react-sortable-hoc";

/**
 * Internal dependencies
 */
import AdvancedRangeControl from "../../../components/advanced-range-control";

const SortableItem = SortableElement((props) => {
	const {attributes, setAttributes, sortIndex} = props;
	const {offers} = attributes;
	const cloneItems = cloneDeep(offers);
	const {
		      title,
		      button,
		      copy,
		      score,
		      currentPrice,
		      oldPrice,
		      disclaimer,
		      readMore,
		      readMoreUrl,
		      enableBadge,
		      customBadge
	      } = offers[sortIndex];

	const handleClose = (index) => {
		cloneItems.splice(index, 1);
		setAttributes({
			offers: cloneItems
		});
	};

	return (
		<li className='components-card-list__item'>
			<PanelBody title={title ? title : __('Post Name', 'rehub-theme-child')} initialOpen={false}>
				<TextControl
					label={__('Title', 'rehub-theme-child')}
					value={title}
					onChange={(value) => {
						cloneItems[sortIndex].title = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<TextControl
					label={__('Offer url', 'rehub-theme-child')}
					value={button.url}
					onChange={(value) => {
						cloneItems[sortIndex].button.url = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<TextareaControl
					label={__('Copy', 'rehub-theme-child')}
					value={copy}
					onChange={(value) => {
						cloneItems[sortIndex].copy = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<AdvancedRangeControl
					label={__('Score', 'rehub-theme-child')}
					value={score}
					min="0"
					max="10"
					step={0.5}
					onChange={(value) => {
						cloneItems[sortIndex].score = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<ToggleControl
					label={__('Include Badge?', 'rehub-theme-child')}
					checked={enableBadge}
					onChange={() => {
						cloneItems[sortIndex].enableBadge = !enableBadge;
						setAttributes({offers: cloneItems});
					}}
				/>
				{enableBadge && (
					<Fragment>
						<TextControl
							label={__('Badge Label', 'rehub-theme-child')}
							value={customBadge.text}
							onChange={(value) => {
								cloneItems[sortIndex].customBadge.text = value;
								setAttributes({offers: cloneItems});
							}}
						/>
						<BaseControl label={__('Badge Label color:', 'rehub-theme-child')}>
							<ColorPicker
								color={customBadge.textColor}
								onChangeComplete={(value) => {
									cloneItems[sortIndex].customBadge.textColor = value.hex;
									setAttributes({offers: cloneItems});
								}}
								disableAlpha
							/>
						</BaseControl>
						<BaseControl label={__('Badge Background-color:', 'rehub-theme-child')}>
							<ColorPicker
								color={customBadge.backgroundColor}
								onChangeComplete={(value) => {
									cloneItems[sortIndex].customBadge.backgroundColor = value.hex;
									setAttributes({offers: cloneItems});
								}}
								disableAlpha
							/>
						</BaseControl>
					</Fragment>
				)}
				<TextControl
					label={__('Offer sale price', 'rehub-theme-child')}
					value={currentPrice}
					onChange={(value) => {
						cloneItems[sortIndex].currentPrice = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<TextControl
					label={__('Offer old price', 'rehub-theme-child')}
					value={oldPrice}
					onChange={(value) => {
						cloneItems[sortIndex].oldPrice = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<TextControl
					label={__('Button text', 'rehub-theme-child')}
					value={button.text}
					onChange={(value) => {
						cloneItems[sortIndex].button.text = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				{/*<TextControl*/}
				{/*	label={__('Set coupon code', 'rehub-theme-child')}*/}
				{/*	value={coupon}*/}
				{/*	onChange={(value) => {*/}
				{/*		cloneItems[sortIndex].coupon = value;*/}
				{/*		setAttributes({*/}
				{/*			offers: cloneItems*/}
				{/*		});*/}
				{/*	}}*/}
				{/*/>*/}
				{/*<ToggleControl*/}
				{/*	label={__('Mask coupon code?', 'rehub-theme-child')}*/}
				{/*	checked={maskCoupon}*/}
				{/*	onChange={() => {*/}
				{/*		cloneItems[sortIndex].maskCoupon = !maskCoupon;*/}
				{/*		setAttributes({*/}
				{/*			offers: cloneItems*/}
				{/*		});*/}
				{/*	}}*/}
				{/*/>*/}
				<TextareaControl
					label={__('Disclaimer', 'rehub-theme-child')}
					value={disclaimer}
					onChange={(value) => {
						cloneItems[sortIndex].disclaimer = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<TextControl
					label={__('Read More custom text', 'rehub-theme-child')}
					value={readMore}
					onChange={(value) => {
						cloneItems[sortIndex].readMore = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<TextControl
					label={__('Read More Url', 'rehub-theme-child')}
					value={readMoreUrl}
					onChange={(value) => {
						cloneItems[sortIndex].readMoreUrl = value;
						setAttributes({
							offers: cloneItems
						});
					}}
				/>
				<BaseControl className='text-center'>
					<Button isSecondary onClick={() => handleClose(sortIndex)}>
						{__('Remove item', 'rehub-theme-child')}
					</Button>
				</BaseControl>
			</PanelBody>
		</li>
	);
});

const SortableList = SortableContainer((props) => {
	const {attributes, setAttributes} = props;
	const {offers} = attributes;

	return (
		<ul className='components-card-list'>
			{offers.map((value, index) => {
				return (
					<SortableItem
						key={`item-${index}`}
						index={index}
						sortIndex={index}
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				);
			})}
		</ul>
	);
});

export default class OfferCardList extends Component {
	constructor(props) {
		super(props);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.shouldCancelStart = this.shouldCancelStart.bind(this);
	}

	onSortEnd({oldIndex, newIndex}) {
		const {attributes, setAttributes} = this.props;
		const cloneItems = cloneDeep(attributes.offers);
		cloneItems.splice(newIndex, 0, cloneItems.splice(oldIndex, 1)[0]);

		setAttributes({
			offers: cloneItems
		});
	}

	shouldCancelStart(ev) {
		if (ev.target.className !== 'components-panel__body-title') {
			return true;
		}
	}

	render() {
		return (
			<SortableList
				lockAxis='y'
				distance={10}
				attributes={this.props.attributes}
				setAttributes={this.props.setAttributes}
				onSortEnd={this.onSortEnd}
				shouldCancelStart={this.shouldCancelStart}
			/>
		);
	}
}