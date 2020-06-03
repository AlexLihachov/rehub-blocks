<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class Slider extends Basic {
	protected $name = 'slider';

	protected function render( $settings = array(), $inner_content = '' ) {
		echo 'Slider php template';
	}
}