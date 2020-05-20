/**
 * External dependencies
 */
import classnames from "classnames";

const Button = (props) => {
	const {offer, writable} = props;
	const {button, maskCoupon} = offer;
	const classes = classnames([
		'c-offer-listing-btn',
		{'c-offer-listing-btn--masked': maskCoupon}
	]);

	if (writable === false && button.url === '') {
		return null;
	}

	return (
		<div className={classes}>
			{writable === false && (
				<span>{button.text}</span>
			)}
		</div>
	);
};

export default Button;