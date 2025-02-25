/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component, Fragment} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, TextControl, ToggleControl, TextareaControl} from '@wordpress/components';

/**
 * Internal dependencies
 */
import HeadingButtonsControl from "../../components/heading-buttons-control";
import ImageControl from "../../components/image-control";

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
		const {includePosition, position, title, titleTag, subtitle, includeImage, image, link} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('General', 'rehub-theme-child')} initialOpen={true}>
					<ToggleControl
						label={__('Include Position Number?', 'rehub-theme-child')}
						checked={includePosition}
						onChange={() => {
							setAttributes({includePosition: !includePosition});
						}}
					/>
					<ToggleControl
						label={__('Include Image?', 'rehub-theme-child')}
						checked={includeImage}
						onChange={() => {
							setAttributes({includeImage: !includeImage});
						}}
					/>
					{includePosition && (
						<TextControl
							label={__('Position', 'rehub-theme-child')}
							value={position}
							onChange={(value) => {
								setAttributes({position: value});
							}}
						/>
					)}
					<TextareaControl
						label={__('Title', 'rehub-theme-child')}
						value={title}
						onChange={(value) => {
							setAttributes({title: value});
						}}
					/>
					<HeadingButtonsControl
						value={titleTag}
						onChange={titleTag => setAttributes({titleTag})}
					/>
					<TextareaControl
						label={__('Subtitle', 'rehub-theme-child')}
						value={subtitle}
						onChange={(value) => {
							setAttributes({subtitle: value});
						}}
					/>
					{includeImage && (
						<Fragment>
							<ImageControl
								label={__('Upload Image', 'rehub-theme-child')}
								allowedTypes={['image']}
								imageID={image.id}
								imageURL={image.url}
								onRemove={() => {
									const imageClone = cloneDeep(image);
									imageClone.id = '';
									imageClone.url = '';
									imageClone.width = '';
									imageClone.height = '';
									imageClone.alt = '';
									setAttributes({image: imageClone});
								}}
								onChange={media => {
									const imageClone = cloneDeep(image);
									imageClone.id = media.id;
									imageClone.url = media.url;
									imageClone.width = media.width;
									imageClone.height = media.height;
									imageClone.alt = media.alt;
									setAttributes({image: imageClone});
								}}
							/>
							<TextControl
								label={__('Image Target Link', 'rehub-theme-child')}
								value={link}
								onChange={(value) => {
									setAttributes({link: value});
								}}
							/>
						</Fragment>
					)}
				</PanelBody>
			</InspectorControls>
		);
	}
}
