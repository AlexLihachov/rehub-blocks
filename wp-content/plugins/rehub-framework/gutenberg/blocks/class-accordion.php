<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class Accordion extends Basic {
	protected $name = 'accordion';

	protected function render( $settings = array() ) {
		$html = '<h1>Accordion</h1>';
		echo $html;
	}
}