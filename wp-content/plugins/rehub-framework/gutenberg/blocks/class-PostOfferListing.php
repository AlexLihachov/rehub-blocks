<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class PostOfferListing extends Basic {
	protected $name = 'post-offer-listing';

	protected function render( $settings = array() ) {
		echo '<h3>Post Offer Listing class</h3>';
	}
}