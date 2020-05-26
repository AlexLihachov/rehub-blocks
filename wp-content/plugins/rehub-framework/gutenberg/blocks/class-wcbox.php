<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class WCBox extends Basic {
	protected $name = 'wc-box';

	protected function render( $settings = array() ) {
		echo 'WooCommerce Box Template';
	}
}