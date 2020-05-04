<?php

namespace Rehub\Gutenberg;

use WP_REST_Request;
use WP_REST_Server;

defined('ABSPATH') OR exit;

class REST {
	private $rest_namespace = 'rehub/v2/';


	private static $instance = null;

	/** @return Assets */
	public static function instance(){
		if(is_null(static::$instance)) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	private function __construct(){
		add_action('rest_api_init', array( $this, 'action_rest_api_init_trait' ));
	}

	public function action_rest_api_init_trait(){
//		if(!((is_user_logged_in() && is_admin()))) {
//			return;
//		}

		register_rest_route($this->rest_namespace.'posts',
			'/get',
			array(
				array(
					'methods'  => WP_REST_Server::CREATABLE,
//					'permission_callback' => array( Settings::class, 'is_user_can' ),
					'callback' => array( $this, 'rest_get_posts' ),
				)
			)
		);

		register_rest_route(
			$this->rest_namespace,
			"/offer-data/(?P<id>\d+)",
			array(
				'methods'  => WP_REST_Server::READABLE,
				'callback' => array( $this, 'rest_offer_data_handler' ),
			)
		);
	}

	public function rest_get_posts(WP_REST_Request $request){
		$params    = array_merge(
			array(
				's'         => '',
				'include'   => '',
				'exclude'   => '',
				'page'      => 1,
				'post_type' => 'post',
			), $request->get_params()
		);
		$isSelect2 = ($request->get_param('typeQuery') === 'select2');

		$args = array(
			'post_status'    => 'publish',
			'posts_per_page' => 5,
			'post_type'      => $params['post_type'],
			'paged'          => $params['page'],
		);

		if(!empty($params['s'])) {
			$args['s'] = $params['s'];
		}
		if(!empty($params['include'])) {
			$args['post__in'] = is_array($params['include']) ? $params['include'] : array( $params['include'] );
		}
		if(!empty($params['exclude'])) {
			$args['post__not_in'] = is_array($params['exclude']) ? $params['exclude'] : array( $params['exclude'] );
		}

		$response_array = array();
		$keys           = $isSelect2 ?
			[ 'label' => 'text', 'value' => 'id' ] :
			[ 'label' => 'label', 'value' => 'value' ];

		$posts = new \WP_Query($args);
		if($posts->post_count > 0) {
			/* @var \WP_Post $gallery */
			foreach($posts->posts as $_post) {
				$response_array[] = array(
					$keys['label'] => !empty($_post->post_title) ? $_post->post_title : __('No Title', ''),
					$keys['value'] => $_post->ID,
				);
			}
		}
		wp_reset_postdata();

		$return = array(
			'results'    => $response_array,
			'pagination' => array(
				'more' => $posts->max_num_pages >= ++$params['page'],
			)
		);

		return rest_ensure_response($return);
	}

	public function rest_offer_data_handler( WP_REST_Request $request ) {
		$id = $request->get_params()['id'];

		$product_url       = get_post_meta( $id, 'rehub_offer_product_url', true );
		$offer_post_url    = apply_filters( 'rehub_create_btn_url', $product_url );
		$offer_url         = apply_filters( 'rh_post_offer_url_filter', $offer_post_url );
		$offer_price       = get_post_meta( $id, 'rehub_offer_product_price', true );
		$offer_price_old   = get_post_meta( $id, 'rehub_offer_product_price_old', true );
		$offer_title       = get_post_meta( $id, 'rehub_offer_name', true );
		$offer_thumb       = get_post_meta( $id, 'rehub_offer_product_thumb', true );
		$offer_btn_text    = get_post_meta( $id, 'rehub_offer_btn_text', true );
		$offer_coupon      = get_post_meta( $id, 'rehub_offer_product_coupon', true );
		$offer_coupon_date = get_post_meta( $id, 'rehub_offer_coupon_date', true );
		$offer_coupon_mask = get_post_meta( $id, 'rehub_offer_coupon_mask', true );
		$offer_desc        = get_post_meta( $id, 'rehub_offer_product_desc', true );
		$disclaimer        = get_post_meta( $id, 'rehub_offer_disclaimer', true );
		$rating            = get_post_meta( $id, 'rehub_review_overall_score', true );
		$discount          = get_post_meta( $id, 'rehub_offer_discount', true );

		$data = array(
			'name'             => $offer_title,
			'description'      => $offer_desc,
			'disclaimer'       => $disclaimer,
			'old_price'        => $offer_price_old,
			'sale_price'       => $offer_price,
			'coupon_code'      => $offer_coupon,
			'expiration_date'  => $offer_coupon_date,
			'mask_coupon_code' => $offer_coupon_mask,
			'button_url'       => $offer_post_url,
			'button_text'      => $offer_btn_text,
			'thumbnail_url'    => $offer_thumb,
			'rating'           => $rating,
			'discount'         => $discount
		);
		return rest_ensure_response( $data );
	}
}
