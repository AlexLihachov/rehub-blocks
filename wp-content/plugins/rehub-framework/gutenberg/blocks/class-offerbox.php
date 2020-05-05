<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

use Elementor\Widget_Wpsm_Box;
use WP_REST_Request;
use WP_REST_Server;

class Offerbox extends Basic {
	protected $name = 'offerbox';

	protected $attributes = array(
		'name'             => array(
			'type'    => 'string',
			'default' => '',
		),
		'description'      => array(
			'type'    => 'string',
			'default' => '',
		),
		'disclaimer'       => array(
			'type'    => 'string',
			'default' => '',
		),
		'old_price'        => array(
			'type'    => 'string',
			'default' => '',
		),
		'sale_price'       => array(
			'type'    => 'string',
			'default' => '',
		),
		'coupon_code'      => array(
			'type'    => 'string',
			'default' => '',
		),
		'expiration_date'  => array(
			'type'    => 'string',
			'default' => '',
		),
		'mask_coupon_code' => array(
			'default' => false,
		),
		'mask_coupon_text' => array(
			'default' => '',
		),
		'offer_is_expired' => array(
			'default' => false,
		),
		'button'           => array(
			'default' => array(
				'text'     => 'Buy this item',
				'url'      => '',
				'newTab'   => false,
				'noFollow' => false,
			),
		),
		'thumbnail'        => array(
			'default' => array(
				'id'  => '',
				'url' => '',
			),
		),
		'brand_logo_url'   => array(
			'type'    => 'string',
			'default' => '',
		),
		'discount_tag'     => array(
			'type' => 'number'
		),
		'rating'           => array(
			'type'    => 'number',
			'default' => 0,
		),
		'postId'           => array(
			'type'    => 'string',
			'default' => '',
		),
	);


	protected function render( $settings = array() ) {
		if ( ! empty( $settings['postId'] ) ) {

		} else {
			$offer_post_url         = $settings['button']['url'];
			$offer_url              = $settings['button']['url'];
			$offer_price            = $settings['sale_price'];
			$offer_price_old        = $settings['old_price'];
			$offer_title            = $settings['name'];
			$offer_thumb            = $settings['thumbnail']['url'];
			$offer_btn_text         = $settings['button']['text'];
			$offer_coupon           = $settings['coupon_code'];
			$offer_coupon_date      = $settings['expiration_date'];
			$offer_coupon_mask      = $settings['mask_coupon_code'];
			$offer_desc             = $settings['description'];
			$disclaimer             = $settings['disclaimer'];
			$rating                 = $settings['rating'];
			$percentageSaved        = $settings['discount_tag'];
			$offer_coupon_mask_text = $settings['mask_coupon_text'];
		}

		require_once( rh_locate_template( 'inc/parts/offerbigpart.php' ) );
	}
}
