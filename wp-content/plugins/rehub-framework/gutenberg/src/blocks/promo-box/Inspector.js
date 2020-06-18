/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component, Fragment} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {
	PanelBody,
	ColorPicker,
	BaseControl,
	ToggleControl,
	SelectControl,
	TextControl,
	TextareaControl
} from '@wordpress/components';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {
			      backgroundColor,
			      showBorder,
			      borderSize,
			      borderColor,
			      showHighlightBorder,
			      highlightColor,
			      highlightPosition,
			      showButton,
			      buttonLink,
			      buttonText,
			      title,
			      content
		      } = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('General', 'rehub-theme-child')} initialOpen={true}>
					<BaseControl label={__('Background-color :', 'rehub-theme-child')}>
						<ColorPicker
							color={backgroundColor}
							onChangeComplete={(value) => {
								setAttributes({backgroundColor: value.hex})
							}}
							disableAlpha
						/>
					</BaseControl>

					{/* Border */}
					<ToggleControl
						label={__('Show border?', 'rehub-theme-child')}
						checked={showBorder}
						onChange={() => {
							setAttributes({
								showBorder: !showBorder
							});
						}}
					/>
					{showBorder && (
						<Fragment>
							<SelectControl
								label={__('Border size :', 'rehub-theme-child')}
								value={borderSize}
								options={[
									{label: __('1px', 'rehub-theme-child'), value: 1},
									{label: __('2px', 'rehub-theme-child'), value: 2},
									{label: __('3px', 'rehub-theme-child'), value: 3},
									{label: __('4px', 'rehub-theme-child'), value: 4},
									{label: __('5px', 'rehub-theme-child'), value: 5},
								]}
								onChange={(value) => {
									setAttributes({
										borderSize: value
									});
								}}
							/>
							<BaseControl label={__('Border color :', 'rehub-theme-child')}>
								<ColorPicker
									color={borderColor}
									onChangeComplete={(value) => {
										setAttributes({borderColor: value.hex})
									}}
									disableAlpha
								/>
							</BaseControl>
						</Fragment>
					)}

					{/*	Highlight */}
					<ToggleControl
						label={__('Show highlight border?', 'rehub-theme-child')}
						checked={showHighlightBorder}
						onChange={() => {
							setAttributes({
								showHighlightBorder: !showHighlightBorder
							});
						}}
					/>
					{showHighlightBorder && (
						<Fragment>
							<BaseControl label={__('Highlight color :', 'rehub-theme-child')}>
								<ColorPicker
									color={highlightColor}
									onChangeComplete={(value) => {
										setAttributes({highlightColor: value.hex})
									}}
									disableAlpha
								/>
							</BaseControl>
							<SelectControl
								label={__('Highlight position :', 'rehub-theme-child')}
								value={highlightPosition}
								options={[
									{label: __('Left', 'rehub-theme-child'), value: 'Left'},
									{label: __('Top', 'rehub-theme-child'), value: 'Top'},
									{label: __('Right', 'rehub-theme-child'), value: 'Right'},
									{label: __('Bottom', 'rehub-theme-child'), value: 'Bottom'}
								]}
								onChange={(value) => {
									setAttributes({
										highlightPosition: value
									});
								}}
							/>
						</Fragment>
					)}

					{/*	Button */}
					<ToggleControl
						label={__('Show button?', 'rehub-theme-child')}
						checked={showButton}
						onChange={() => {
							setAttributes({
								showButton: !showButton
							});
						}}
					/>
					{showButton && (
						<Fragment>
							<TextControl
								label={__('Button link :', 'rehub-theme-child')}
								value={buttonLink}
								onChange={(value) => {
									setAttributes({
										buttonLink: value
									});
								}}
							/>
							<TextControl
								label={__('Button text :', 'rehub-theme-child')}
								value={buttonText}
								onChange={(value) => {
									setAttributes({
										buttonText: value
									});
								}}
							/>
						</Fragment>
					)}

					{/* Content */}
					<TextControl
						label={__('Title of box :', 'rehub-theme-child')}
						value={title}
						onChange={(value) => {
							setAttributes({
								title: value
							});
						}}
					/>
					<TextareaControl
						label={__('Text', 'rehub-theme-child')}
						value={content}
						onChange={(value) => {
							setAttributes({content: value});
						}}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
