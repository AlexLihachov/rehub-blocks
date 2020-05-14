/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component, Fragment} from '@wordpress/element'
import {PanelBody, TextControl, BaseControl, Button} from '@wordpress/components';

/**
 * Internal dependencies
 */
import CardList from '../card-list';

/**
 * External dependencies
 */
import {cloneDeep} from 'lodash';

export default class ConsProsInspector extends Component {
	render() {
		const {setAttributes, prosTitle, positives, consTitle, negatives} = this.props;

		return (
			<Fragment>
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
			</Fragment>
		);
	}
}