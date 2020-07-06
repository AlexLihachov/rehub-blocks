<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class WCBox extends Basic {
	protected $name = 'wc-box';

	protected $attributes = array(
		'productId' => array(
			'type'    => 'object',
			'default' => array(),
		),
	);

	protected function render( $settings = array(), $inner_content = '' ) {
		$selected_product = $settings['productId'];

		if ( empty( $selected_product ) ) {
			return '';
		}

		$id = (int) $selected_product[0];

		if ( function_exists( 'wpsm_woobox_shortcode' ) ) {
			echo wpsm_woobox_shortcode( array( 'id' => $id ) );
		}
	}
}