<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class ReviewHeading extends Basic {
	protected $name = 'review-heading';

	protected $attributes = array(
		'includePosition' => array(
			'type'    => 'boolean',
			'default' => true,
		),
		'position'        => array(
			'type'    => 'string',
			'default' => '1',
		),
		'title'           => array(
			'type'    => 'string',
			'default' => 'Sample title',
		),
		'titleTag'        => array(
			'type'    => 'string',
			'default' => 'h2',
		),
		'subtitle'        => array(
			'type'    => 'string',
			'default' => 'Sample subtitle',
		),
		'includeImage'    => array(
			'type'    => 'boolean',
			'default' => true,
		),
		'image'           => array(
			'type'    => 'object',
			'default' => array(
				'id'     => '',
				'url'    => '',
				'width'  => '',
				'height' => '',
				'alt'    => '',
			),
		),
		'link'            => array(
			'type'    => 'string',
			'default' => '',
		),
	);

	protected function render( $settings = array(), $inner_content = '' ) {
		$html             = '';
		$include_position = $settings['includePosition'];
		$position         = $settings['position'];
		$title            = $settings['title'];
		$title_tag        = $settings['titleTag'];
		$subtitle         = $settings['subtitle'];
		$include_image    = $settings['includeImage'];
		$image            = $settings['image'];
		$link             = $settings['link'];

		$html .= '<div class="rh-review-heading rh-flex-center-align mb25">';

		if ( $include_position ) {
			$html .= '	<div class="rh-review-heading__position mr15 font150">';
			$html .= '		<span class="fontbold lightgreycolor font250">' . esc_html( $position ) . '</span>';
			$html .= '	</div>';
		}

		$html .= '	<div>';
		$html .= '		<' . $title_tag . ' class="mt0 mb0">' . do_shortcode( $title ) . '</' . $title_tag . '>';
		$html .= '		<div class="mt5 lineheight20 greycolor">' . do_shortcode( $subtitle ) . '</div>';
		$html .= '	</div>';

		if ( $include_image && ! empty( $image['url'] ) ) {
			$html .= '	<a class="rh-review-heading__logo rh-flex-right-align blockstyle" href="' . esc_url( $link ) . '">';
			$html .= '		<div class="rh-review-heading__logo-container">';
			$html .= '			<img src="' . esc_url( $image['url'] ) . '" alt="' . esc_attr( $image['alt'] ) . '"';
			$html .= '              width="' . esc_attr( $image['width'] ) . '" height="' . esc_attr( $image['height'] ) . '"/>';
			$html .= '		</div>';
			$html .= '	</a>';
		}

		$html .= '</div>';

		echo $html;
	}
}