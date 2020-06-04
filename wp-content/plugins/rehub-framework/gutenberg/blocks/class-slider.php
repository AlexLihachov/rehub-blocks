<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class Slider extends Basic {
	protected $name = 'slider';

	protected $attributes = array(
		'slides' => array(
			'type'    => 'object',
			'default' => array(
				array(
					'image' => array(
						'id'     => '',
						'url'    => '',
						'width'  => '',
						'height' => '',
						'alt'    => ''
					),
				),
			),
		),
	);

	protected function render( $settings = array(), $inner_content = '' ) {
		$html   = '';
		$slides = $settings['slides'];

		if ( empty( $slides ) ) {
			return;
		}

		$html .= '<div class="rh-slider js-hook__slider">';
		$html .= '	<div class="rh-slider__inner">';


		foreach ( $slides as $slide ) {
			$url = $slide['image']['url'];
			$alt = $slide['image']['alt'];

			if ( empty( $url ) ) {
				$url = plugin_dir_url( __DIR__ ) . '/src/icons/noimage-placeholder.png';
			}

			$html .= '<div class="rh-slider-item">';
			$html .= '  <img src="' . esc_attr( $url ) . '" alt="' . esc_attr( $alt ) . '" />';
			$html .= '</div>';
		}

		$html .= '	<div class="rh-slider-arrow rh-slider-arrow--prev"><i class="fas fa-chevron-left"></i></div>';
		$html .= '	<div class="rh-slider-arrow rh-slider-arrow--next"><i class="fas fa-chevron-right"></i></div>';
		$html .= '	</div>';
		$html .= '	<div class="rh-slider-thumbs">';
		$html .= '		<div class="rh-slider-thumbs__row">';

		foreach ( $slides as $slide ) {
			$url = $slide['image']['url'];
			$alt = $slide['image']['alt'];

			if ( empty( $url ) ) {
				$url = plugin_dir_url( __DIR__ ) . '/src/icons/noimage-placeholder.png';
			}

			$html .= '<div class="rh-slider-thumbs-item">';
			$html .= '	<img src="' . esc_attr( $url ) . '" alt="' . esc_attr( $alt ) . '"  />';
			$html .= '</div>';
		}

		$html .= '		</div>';
		$html .= '	</div>';
		$html .= '</div>';

		echo $html;


	}
}