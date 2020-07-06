/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element'
import {InspectorControls} from '@wordpress/block-editor';
import {PanelBody, Notice, BaseControl} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Select from "../../../components/select";
import {fetchReviewData} from '../utils/fetchReviewData';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {attributes, setAttributes} = this.props;
		const {selectedPosts, parseError, parseSuccess} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={__('Data query', 'rehub-theme-child')} initialOpen>
					<Select
						label={__('Post name', 'rehub-theme-child')}
						multiple={true}
						currentValues={selectedPosts}
						onChange={(value) => {
							if (value && value.length) {
								fetchReviewData(value.map(item => item.id), setAttributes);
							}
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