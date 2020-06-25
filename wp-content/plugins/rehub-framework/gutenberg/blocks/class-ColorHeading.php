<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class ColorHeading extends Basic {
	protected $name = 'color-heading';

	protected $attributes = array(
		'title'           => array(
			'type'    => 'string',
			'default' => 'Sample title',
		),
		'subtitle'        => array(
			'type'    => 'string',
			'default' => 'Sample subtitle',
		),
		'backgroundColor' => array(
			'type'    => 'string',
			'default' => '#8035be',
		),
		'titleColor'      => array(
			'type'    => 'string',
			'default' => '#f2f2f2'
		),
		'subtitleColor'   => array(
			'type'    => 'string',
			'default' => '#f2f2f2'
		),
	);

	protected function render( $settings = array(), $inner_content = '' ) {
		$html            = '';
		$title           = $settings['title'];
		$subtitle        = $settings['subtitle'];
		$styles          = 'background-color:' . $settings['backgroundColor'] . ';';
		$title_styles    = 'color:' . $settings['titleColor'] . ';';
		$subtitle_styles = 'color:' . $settings['subtitleColor'] . ';';

		if ( empty( $title ) && empty( $subtitle ) ) {
			return;
		}

		$html .= '<div class="rh-color-heading alignfull pt30 pb30 blackcolor" style="' . esc_attr( $styles ) . '">';
		$html .= '	<div class="rh-container">';
		$html .= '		<div class="rh-flex-columns rh-flex-column">';
		$html .= '			<h2 class="mt0 mb0 font200 flex-3col-2" style="' . esc_attr( $title_styles ) . '">';
		$html .= '			' . do_shortcode( $title ) . '';
		$html .= '			</h2>';
		$html .= '			<p class="mb15 font130" style="' . esc_attr( $subtitle_styles ) . '">';
		$html .= '			' . do_shortcode( $subtitle ) . '';
		$html .= '			</p>';
		$html .= '		</div>';
		$html .= '	</div>';
		$html .= '</div>';

		echo $html;
	}
}