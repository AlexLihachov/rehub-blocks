/**
 * External dependencies
 */
import classnames from 'classnames';
import {cloneDeep} from 'lodash';

/**
 * WordPress dependencies
 */
import {Fragment, Component} from '@wordpress/element';
import {compose} from '@wordpress/compose';
import {withFocusOutside, Spinner} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from '../editor-components/controls';
import ImageColumn from "../components/ImageColumn";
import ContentColumn from "../components/ContentColumn";


class EditBlock extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			openUrlPopover: false
		};
		this.handleFocusOutside = this.handleFocusOutside.bind(this);
		this.handleButtonChange = this.handleButtonChange.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	componentDidMount() {
		const {setAttributes} = this.props;
		setAttributes({
			parseError: '',
			parseSuccess: ''
		});
	}

	handleFocusOutside() {
		this.setState({
			openUrlPopover: null,
		});
	}

	handleButtonChange(value, type) {
		const {attributes, setAttributes} = this.props;
		const buttonClone = cloneDeep(attributes.button);
		buttonClone[type] = value;
		setAttributes({
			button: buttonClone,
			parseError: '',
			parseSuccess: ''
		});
	}

	handleButtonClick() {
		this.setState({openUrlPopover: true});
	}

	render() {
		const {className, isSelected, attributes} = this.props;
		const {
			      borderColor,
			      loading,
		      } = attributes;
		const mainClasses = classnames([
			className,
			'c-offer-box',
			{'c-offer-box--loading': loading}
		]);

		const styles = {
			border: borderColor ? '2px solid' : '',
			borderColor: borderColor
		};

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} writable/>
						<Controls {...this.props} writable/>
					</Fragment>
				)}
				<div className={mainClasses} style={styles}>
					<Spinner/>
					<div className="c-offer-box__wrapper">
						<ImageColumn {...this.props} writable/>
						<ContentColumn
							{...this.props}
							onButtonClick={this.handleButtonClick}
							openUrlPopover={this.state.openUrlPopover}
							onButtonChange={this.handleButtonChange}
							writable
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);
