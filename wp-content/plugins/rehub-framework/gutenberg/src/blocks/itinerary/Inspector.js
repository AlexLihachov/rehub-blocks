/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {BaseControl, Button, PanelBody} from '@wordpress/components';

/**
 * Internal dependencies
 */
import SettingsList from "./SettingsList";

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
		const {items} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('General', 'rehub-theme-child')} initialOpen={true}>
					<SettingsList
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<BaseControl className='rri-advanced-range-control text-center'>
						<Button isSecondary onClick={() => {
							const cloneItems = cloneDeep(items);
							cloneItems.push({
								icon: 'fa fa-circle',
								color: '#409cd1',
								content: __('Box Content', 'rehub-theme-child')
							});
							setAttributes({items: cloneItems})
						}}>
							{__('Add Item', 'rehub-theme-child')}
						</Button>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}

