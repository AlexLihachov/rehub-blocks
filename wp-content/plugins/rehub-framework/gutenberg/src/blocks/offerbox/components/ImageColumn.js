/**
 * Internal dependencies
 */
import ImageUploadPlaceholder from "../../../components/image-upload-placeholder";
import {cloneDeep} from "lodash";
import Discount from "./Discount";


const ImageColumn = (props) => {
	const {attributes, setAttributes} = props;
	const {thumbnail, discount_tag, discount} = attributes;

	return (
		<div className="c-offer-box__column c-offer-box__image">
			<ImageUploadPlaceholder
				imageID={thumbnail.id}
				imageURL={thumbnail.url}
				onRemove={() => {
					const thumbnailClone = cloneDeep(thumbnail);
					thumbnailClone.id = '';
					thumbnailClone.url = '';
					setAttributes({
						thumbnail: thumbnailClone
					});
				}}
				onChange={image => {
					const thumbnailClone = cloneDeep(thumbnail);
					thumbnailClone.id = image.id;
					thumbnailClone.url = image.url;
					setAttributes({
						thumbnail: thumbnailClone
					});
				}}
			/>
			<Discount
				discount_tag={discount_tag}
				discount={discount}/>
		</div>
	);

};

export default ImageColumn;
