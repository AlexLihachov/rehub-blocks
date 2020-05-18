/**
 * WordPress dependencies
 */
import {Component} from '@wordpress/element';
import {InspectorControls} from '@wordpress/block-editor';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		return (
			<InspectorControls>
				<p>Inspector</p>
			</InspectorControls>
		);
	}
}