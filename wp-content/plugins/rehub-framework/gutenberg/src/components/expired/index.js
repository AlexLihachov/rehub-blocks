/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {calculateExpiredDays} from "../../util";

class Expired extends Component {
	render() {
		const {offerExpired, expirationDate} = this.props;

		if (offerExpired) {
			return (
				<div className="time_offer">{__('Expired', 'rehub-theme-child')}</div>
			);
		}

		if (!expirationDate) {
			return null;
		}

		let text = '';
		const daysDifference = calculateExpiredDays(expirationDate);

		if (daysDifference < 0) {
			text = __('Expired', 'rehub-theme-child');
		} else if (daysDifference === 0) {
			text = __('Last day', 'rehub-theme-child');
		} else if (daysDifference >= 1) {
			text = daysDifference + ' ' +  __('days left', 'rehub-theme-child');
		}

		return (
			<div className="time_offer">{text}</div>
		);
	}
}

export default Expired;
