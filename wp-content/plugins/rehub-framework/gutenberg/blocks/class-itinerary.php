<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class Itinerary extends Basic {
	protected $name = 'itinerary';

	protected $attributes = array();

	protected function render( $settings = array(), $content = '' ) {
		echo 'Itinerary template';
		echo '<pre>';
		var_dump( $content );
		echo '</pre>';
	}
}