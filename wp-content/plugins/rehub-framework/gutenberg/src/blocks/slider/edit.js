/**
 * WordPress dependencies
 */
import {Component, Fragment, createRef} from '@wordpress/element';
import {withFocusOutside} from '@wordpress/components';
import {compose} from "@wordpress/compose";

/**
 * External dependencies
 */
import classnames from "classnames";
import {cloneDeep} from "lodash";

/**
 * Internal dependencies
 */
import Inspector from "./Inspector";
import Controls from './Controls';
import ImageUploadPlaceholder from "../../components/image-upload-placeholder";

class EditBlock extends Component {
	constructor(props) {
		super(props);
		this.sliderRef = createRef();
		this.sliderObject = null;
	}
	componentDidMount() {
		const sliderNode = this.sliderRef.current;

		if (typeof window.rehubSlider !== 'function') {
			return false;
		}

		this.sliderObject = new window.rehubSlider(sliderNode);
		this.sliderObject.init();
	}

	componentDidUpdate(prevProps) {
		const prevSlides = prevProps.attributes.slides;
		const currentSlides = this.props.attributes.slides;

		if (prevSlides.length !== currentSlides.length) {
			this.sliderObject.update();
		}
	}

	componentWillUnmount() {
		this.sliderObject.destroy();
	}

	render() {
		const {className, isSelected, attributes, setAttributes} = this.props;
		const {slides} = attributes;
		const slidesClone = cloneDeep(slides);
		const mainClasses = classnames([className, 'rh-slider']);

		return (
			<Fragment>
				{isSelected && (
					<Fragment>
						<Inspector {...this.props} sliderObject={this.sliderObject} />
						<Controls {...this.props} />
					</Fragment>
				)}
				<div className={mainClasses} ref={this.sliderRef}>
					<div className='rh-slider__inner'>
						{slides.map((slide, index) => {
							const {image} = slide;
							const {id, url} = image;

							return (
								<div className='rh-slider-item' key={id}>
									<ImageUploadPlaceholder
										imageID={id}
										imageURL={url}
										onRemove={() => {
											slidesClone[index].image.id = '';
											slidesClone[index].image.url = '';
											slidesClone[index].image.width = '';
											slidesClone[index].image.height = '';
											slidesClone[index].image.alt = '';
											setAttributes({slides: slidesClone});
										}}
										onChange={image => {
											slidesClone[index].image.id = image.id;
											slidesClone[index].image.url = image.url;
											slidesClone[index].image.width = image.width;
											slidesClone[index].image.height = image.height;
											slidesClone[index].image.alt = image.alt;
											setAttributes({slides: slidesClone});
										}}
									/>
								</div>
							);
						})}
						<div className='rh-slider-arrow rh-slider-arrow--prev'>
							<i className="fas fa-chevron-left"/>
						</div>
						<div className='rh-slider-arrow rh-slider-arrow--next'>
							<i className="fas fa-chevron-right"/>
						</div>
					</div>
					<div className='rh-slider-thumbs'>
						<div className="rh-slider-thumbs__row">
							{slides.map((slide) => {
								const {image} = slide;
								const {id, url, alt} = image;

								return (
									<div className='rh-slider-thumbs-item' key={id}>
										<img src={url} alt={alt}/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withFocusOutside
)(EditBlock);