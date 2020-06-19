/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {BaseControl, ColorPicker, PanelBody, TextareaControl} from '@wordpress/components';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {title, subtitle, backgroundColor} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('General', 'rehub-theme-child')} initialOpen={true}>
					<TextareaControl
						label={__('Title', 'rehub-theme-child')}
						value={title}
						onChange={(value) => {
							setAttributes({title: value});
						}}
					/>
					<TextareaControl
						label={__('Subtitle', 'rehub-theme-child')}
						value={subtitle}
						onChange={(value) => {
							setAttributes({subtitle: value});
						}}
					/>
					<BaseControl label={__('Background-color :', 'rehub-theme-child')}>
						<ColorPicker
							color={backgroundColor}
							onChangeComplete={(value) => {
								setAttributes({backgroundColor: value.hex})
							}}
							disableAlpha
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}
