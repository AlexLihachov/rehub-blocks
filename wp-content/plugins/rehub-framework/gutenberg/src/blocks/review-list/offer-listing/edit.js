/**
 * WordPress dependencies
 */
import {Component, Fragment} from "@wordpress/element";
import {compose} from "@wordpress/compose";
import {withFocusOutside} from "@wordpress/components";

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from "../components/Controls";
import OfferItem from '../components/OfferItem';

/**
 * External dependencies
 */
import classnames from "classnames";
import {cloneDeep} from "lodash";

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

	handleFocusOutside() {
		this.setState({
			openUrlPopover: null,
		});
	}

	handleButtonChange(value, type, index) {
		const {attributes, setAttributes} = this.props;
		const {offers} = attributes;
		const offersClone = cloneDeep(offers);
		offersClone[index].button[type] = value;

		setAttributes({
			offers: offersClone
		});
	}

	handleButtonClick(index) {
		this.setState({openUrlPopover: index});
	}

	render() {
		const {isSelected, className, attributes} = this.props;
		const {offers} = attributes;
		const mainClasses = classnames([className, 'c-offer-listing']);

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} writable={false}/>
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses}>
					{offers.map((offer, index) => {
						return (
							<OfferItem
								{...this.props}
								index={index}
								key={index}
								writable
								handleButtonChange={this.handleButtonChange}
								handleButtonClick={this.handleButtonClick}
								openUrlPopover={this.state.openUrlPopover}
							/>
						);
					})}
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside,
)(EditBlock);
