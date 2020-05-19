/**
 * Internal dependencies
 */
import ImageColumn from "./ImageColumn";
import ContentColumn from "./ContentColumn";
import CtaColumn from "./CtaColumn";
import Disclaimer from "./Disclaimer";

const OfferItem = (props) => {
	const {attributes, setAttributes, index, writable} = props;
	const {offers} = attributes;

	return (
		<div className='c-offer-listing-item'>
			<div className="c-offer-listing-item__wrapper">
				<ImageColumn
					offer={offers[index]}
					setAttributes={setAttributes}
					index={index}
					writable={writable}
				/>
				<ContentColumn
					offer={offers[index]}
					setAttributes={setAttributes}
					index={index}
					writable={writable}
				/>
				<CtaColumn
					offer={offers[index]}
					setAttributes={setAttributes}
					index={index}
					writable={writable}
				/>
			</div>
			<Disclaimer
				offer={offers[index]}
				setAttributes={setAttributes}
				index={index}
				writable={writable}/>
		</div>
	);
};

export default OfferItem;