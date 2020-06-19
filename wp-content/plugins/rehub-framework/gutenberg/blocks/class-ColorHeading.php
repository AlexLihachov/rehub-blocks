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
	);

	protected function render( $settings = array(), $inner_content = '' ) {
		$html     = '';
		$title    = $settings['title'];
		$subtitle = $settings['subtitle'];
		$styles   = 'background-color:' . $settings['backgroundColor'] . ';';

		if ( empty( $title ) && empty( $subtitle ) ) {
			return;
		}

		$html .= '<div class="rh-color-heading alignfull pt30 pb30 blackcolor" style="' . esc_attr( $styles ) . '">';
		$html .= '	<div class="rh-container">';
		$html .= '		<div class="rh-flex-columns rh-flex-column">';
		$html .= '			<h2 class="mt0 mb0 font200 flex-3col-2">' . do_shortcode( $title ) . '</h2>';
		$html .= '			<p class="mb15 font130">' . do_shortcode( $subtitle ) . '</p>';
		$html .= '		</div>';
		$html .= '	</div>';
		$html .= '</div>';

		echo $html;
	}
}