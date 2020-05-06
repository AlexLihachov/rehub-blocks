/**
 * Internal dependencies
 */
import ImageUploadPlaceholder from "../../../components/image-upload-placeholder";
import {cloneDeep} from "lodash";
import Discount from "./Discount";


const ImageColumn = (props) => {
	const {attributes, setAttributes} = props;
	const {thumbnail, discount_tag, discount} = attributes;
	const styles = {
		paddingTop: thumbnail.height / thumbnail.width * 100 + '%'
	};

	return (
		<div className="c-offer-box__column c-offer-box__column--image">
			<div className='c-offer-box__image' style={styles}>
				<ImageUploadPlaceholder

					imageID={thumbnail.id}
					imageURL={thumbnail.url}
					onRemove={() => {
						const thumbnailClone = cloneDeep(thumbnail);
						thumbnailClone.id = '';
						thumbnailClone.url = '';
						thumbnailClone.width = '';
						thumbnailClone.height = '';

						setAttributes({
							thumbnail: thumbnailClone
						});
					}}
					onChange={image => {
						const thumbnailClone = cloneDeep(thumbnail);
						thumbnailClone.id = image.id;
						thumbnailClone.url = image.url;
						thumbnailClone.width = image.width;
						thumbnailClone.height = image.height;

						setAttributes({
							thumbnail: thumbnailClone
						});
					}}
				/>
				<Discount
					discount_tag={discount_tag}
					discount={discount}/>
			</div>
		</div>
	);

};

export default ImageColumn;
