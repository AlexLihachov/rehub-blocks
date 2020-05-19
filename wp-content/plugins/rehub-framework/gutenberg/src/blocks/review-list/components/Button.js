const Button = (props) => {
	const {offer, writable} = props;
	const {button} = offer;

	return (
		<div className='c-offer-listing-btn'>
			{writable === false && (
				<span>{button.text}</span>
			)}
		</div>
	);
};

export default Button;