/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, BaseControl, Button} from '@wordpress/components';

/**
 * Internal dependencies
 */
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
		const {setAttributes, attributes} = this.props;
		const {tabs} = attributes;
		return (
			<InspectorControls>
				<PanelBody title={__('Tabs', 'rehub-theme-child')} initialOpen>
					<CardList
						items={tabs}
						propName='tabs'
						setAttributes={setAttributes}
						titlePlaceholder={__('Sample title', 'rehub-theme-child')}
						contentPlaceholder={__('Sample content', 'rehub-theme-child')}
						includeContentField
					/>
					<BaseControl className='rri-advanced-range-control text-center'>
						<Button isSecondary onClick={() => {
							const tabsClone = cloneDeep(tabs);
							tabsClone.push({
								title: __('Sample title', 'rehub-theme-child'),
								content: __('Sample content', 'rehub-theme-child')
							});

							setAttributes({
								tabs: tabsClone
							});
						}}>
							{__('Add Accordition', 'rehub-theme-child')}
						</Button>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}