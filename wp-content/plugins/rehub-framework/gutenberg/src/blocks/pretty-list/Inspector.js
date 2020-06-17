/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {BaseControl, Button, PanelBody, SelectControl} from '@wordpress/components';

/**
 * Internal dependencies
 */
import ItemSettings from "./ItemSettings";

/**
 * External dependencies
 */
import {cloneDeep} from "lodash";

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {type, items} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('General', 'rehub-theme-child')} initialOpen={true}>
					<SelectControl
						label={__('Type', 'rehub-theme-child')}
						value={type}
						options={[
							{label: __('Arrow', 'rehub-theme-child'), value: 'arrow'},
							{label: __('Check', 'rehub-theme-child'), value: 'check'},
							{label: __('Star', 'rehub-theme-child'), value: 'star'},
							{label: __('Bullet', 'rehub-theme-child'), value: 'bullet'},
						]}
						onChange={(value) => {
							setAttributes({type: value});
						}}
					/>
				</PanelBody>
				<PanelBody title={__('Items', 'rehub-theme-child')} initialOpen={false}>
					<ItemSettings
						items={items}
						setAttributes={setAttributes}
						propName='items'
					/>
					<BaseControl className='text-center'>
						<Button isPrimary onClick={() => {
							const itemsClone = cloneDeep(items);
							itemsClone.push({text: __('Sample Item', 'rehub-theme-child')});
							setAttributes({items: itemsClone})
						}}>
							{__('Add item', 'rehub-theme-child')}
						</Button>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}

