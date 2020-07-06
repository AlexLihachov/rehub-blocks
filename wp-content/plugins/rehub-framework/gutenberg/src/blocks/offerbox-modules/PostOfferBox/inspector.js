/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element'
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {updateOfferData} from "../utils/fetchService";
import Select2 from "../../../components/Select2";
import Select from "./Select";

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {selectedPost} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('Copy data from Posts', 'rehub-theme-child')} initialOpen={true}>
					{/*<Select2*/}
					{/*	label={__('Post name', 'rehub-theme-child')}*/}
					{/*	setAttributes={setAttributes}*/}
					{/*	selectedPost={selectedPost}*/}
					{/*	onChange={(value) => {*/}
					{/*		updateOfferData(value, setAttributes, attributes);*/}
					{/*	}}*/}
					{/*/>*/}
					<Select
						label={__('Choose post', 'rehub-theme-child')}
						multiple={true}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
