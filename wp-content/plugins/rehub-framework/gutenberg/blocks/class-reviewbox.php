<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class ReviewBox extends Basic {
	protected $name = 'reviewbox';

	protected function render( $settings = array() ) {
		return '<h1>Review Box render from php</h1>';
	}
}