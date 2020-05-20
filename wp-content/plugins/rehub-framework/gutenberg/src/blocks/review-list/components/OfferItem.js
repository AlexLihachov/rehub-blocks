/**
 * Internal dependencies
 */
import ImageColumn from "./ImageColumn";
import ContentColumn from "./ContentColumn";
import CtaColumn from "./CtaColumn";
import Disclaimer from "./Disclaimer";

const OfferItem = (props) => {
	const {attributes, setAttributes, index, writable, handleButtonChange, handleButtonClick, openUrlPopover} = props;

	return (
		<div className='c-offer-listing-item'>
			<div className="c-offer-listing-item__wrapper">
				<ImageColumn
					attributes={attributes}
					setAttributes={setAttributes}
					index={index}
					writable={writable}
				/>
				<ContentColumn
					attributes={attributes}
					setAttributes={setAttributes}
					index={index}
					writable={writable}
				/>
				<CtaColumn
					attributes={attributes}
					setAttributes={setAttributes}
					index={index}
					writable={writable}
					handleButtonChange={handleButtonChange}
					handleButtonClick={handleButtonClick}
					openUrlPopover={openUrlPopover}
				/>
			</div>
			<Disclaimer
				attributes={attributes}
				setAttributes={setAttributes}
				index={index}
				writable={writable}
			/>
		</div>
	);
};

export default OfferItem;