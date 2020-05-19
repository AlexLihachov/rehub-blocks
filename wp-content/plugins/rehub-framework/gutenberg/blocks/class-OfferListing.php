<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class OfferListing extends Basic {
	protected $name = 'offer-listing';

	protected function render( $settings = array() ) {
		echo '<h3>Offer Listing class</h3>';
	}
}