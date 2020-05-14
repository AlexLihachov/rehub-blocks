/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element'
import {InspectorControls} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ColorPicker,
	BaseControl,
	Button
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import AdvancedRangeControl from '../../components/advanced-range-control';
import CardList from '../../components/card-list';

/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {title, description, score, mainColor, criterias, prosTitle, positives, consTitle, negatives} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('General', 'rehub-theme-child')} initialOpen={true}>
					<TextControl
						label={__('Title', 'rehub-theme-child')}
						value={title}
						placeholder={__('Awesome', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({title: value})
						}}
					/>
					<TextareaControl
						label={__('Description', 'rehub-theme-child')}
						placeholder={__('Place here Description for your reviewbox', 'rehub-theme-child')}
						value={description}
						onChange={(value) => {
							setAttributes({description: value})
						}}
					/>
					<AdvancedRangeControl
						label={__('Score Value', 'rehub-theme-child')}
						value={score}
						min="0"
						max="10"
						step={0.5}
						onChange={(value) => {
							setAttributes({score: value})
						}}
					/>
					<BaseControl
						className='rri-advanced-range-control'
						label={__('Set background color or leave blank', 'rehub-theme-child')}>
						<ColorPicker
							color={mainColor}
							onChangeComplete={(value) => {
								setAttributes({mainColor: value.hex})
							}}
							disableAlpha
						/>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Criterias', 'rehub-theme-child')} initialOpen={false}>
					<CardList
						items={criterias}
						propName='criterias'
						setAttributes={setAttributes}
						titlePlaceholder={__('Criteria name', 'rehub-theme-child')}
						includeValueField
					/>
					<BaseControl className='rri-advanced-range-control text-center'>
						<Button isSecondary onClick={() => {
							const criteriasClone = cloneDeep(criterias);
							criteriasClone.push({
								title: __('Criteria name', 'rehub-theme-child'),
								value: 10
							});
							setAttributes({criterias: criteriasClone})
						}}>
							{__('Add Item', 'rehub-theme-child')}
						</Button>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Positives', 'rehub-theme-child')} initialOpen={false}>
					<TextControl
						label={__('Pros Title', 'rehub-theme-child')}
						value={prosTitle}
						placeholder={__('Positive', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({prosTitle: value})
						}}
					/>
					<BaseControl
						className='rri-advanced-range-control'
						label={__('Positives', 'rehub-theme-child')}>
						<CardList
							items={positives}
							propName='positives'
							setAttributes={setAttributes}
							titlePlaceholder={__('Positive', 'rehub-theme-child')}
							includeValueField={false}
						/>
					</BaseControl>
					<BaseControl className='rri-advanced-range-control text-center'>
						<Button isSecondary onClick={() => {
							const positivesClone = cloneDeep(positives);
							positivesClone.push({
								title: 'Positive'
							});
							setAttributes({positives: positivesClone})
						}}>
							{__('Add Item', 'rehub-theme-child')}
						</Button>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__('Negatives', 'rehub-theme-child')} initialOpen={false}>
					<TextControl
						label={__('Cons Title', 'rehub-theme-child')}
						value={consTitle}
						placeholder={__('Negatives', 'rehub-theme-child')}
						onChange={(value) => {
							setAttributes({consTitle: value})
						}}
					/>
					<BaseControl
						className='rri-advanced-range-control'
						label={__('Negatives', 'rehub-theme-child')}>
						<CardList
							items={negatives}
							propName='negatives'
							setAttributes={setAttributes}
							titlePlaceholder={__('Negative', 'rehub-theme-child')}
							includeValueField={false}
						/>
					</BaseControl>
					<BaseControl className='rri-advanced-range-control text-center'>
						<Button isSecondary onClick={() => {
							const negativesClone = cloneDeep(negatives);
							negativesClone.push({
								title: 'Negative'
							});
							setAttributes({negatives: negativesClone})
						}}>
							{__('Add Item', 'rehub-theme-child')}
						</Button>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}