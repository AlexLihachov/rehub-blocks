<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class VersusTable extends Basic {
	protected $name = 'versus-table';

	//	protected $attributes = array(

	//	);

	protected function render( $settings = array() ) {
		echo 'Versus Table Template';
	}
}