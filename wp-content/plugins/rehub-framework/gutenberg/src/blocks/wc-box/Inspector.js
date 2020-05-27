/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, Notice, BaseControl} from '@wordpress/components';

/**
 * Internal dependencies
 */
import ProductsSelect from "../../components/ProductsSelect";
import updateProductData from "./util/updateProductData";

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {productId, parseError, parseSuccess} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('Data query', 'rehub-theme-child')} initialOpen={true}>
					<ProductsSelect
						label={__('Product name', 'rehub-theme-child')}
						setAttributes={setAttributes}
						selectedPost={productId}
						onChange={(value) => {
							updateProductData(value, setAttributes);
						}}
					/>
					<BaseControl className='rri-advanced-range-control'>
						{parseError && (
							<Notice status="error" onRemove={() => setAttributes({parseError: ''})}>
								{parseError}
							</Notice>
						)}
						{(parseSuccess && !parseError) && (
							<Notice status="success" onRemove={() => setAttributes({parseSuccess: ''})}>
								{parseSuccess}
							</Notice>
						)}
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		);
	}
}

