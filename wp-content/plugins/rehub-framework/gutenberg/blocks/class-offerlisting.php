<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) or exit;

class OfferListing extends Basic {
	protected $name = 'offer-listing';

	protected $attributes = array(
		'offers' => array(
			'type'    => 'object',
			'default' => array(
				array(
					'score'          => 10,
					'enableBadge'    => true,
					'enableScore'    => true,
					'thumbnail'      => array(
						'url'    => '',
						'width'  => '',
						'height' => '',
						'alt'    => '',
					),
					'title'          => 'Post name',
					'copy'           => 'Content',
					'customBadge'    => array(
						'text'            => 'Best Values',
						'textColor'       => '#fff',
						'backgroundColor' => '#77B21D'
					),
					'currentPrice'   => '',
					'oldPrice'       => '',
					'button'         => array(
						'text' => 'Buy this item',
						'url'  => ''
					),
					'coupon'         => '',
					'maskCoupon'     => false,
					'maskCouponText' => '',
					'expirationDate' => '',
					'offerExpired'   => false,
					'readMore'       => 'Read full review',
					'readMoreUrl'    => '',
					'disclaimer'     => 'Disclaimer text...'
				)
			),
		),
	);

	protected function render( $settings = array(), $inner_content = '' ) {
		$html   = '';
		$offers = $settings['offers'];

		if ( empty( $offers ) || count( $offers ) === 0 ) {
			return;
		}

		$html .= '<div class="rh_list_builder rh-shadow4 disablemobileshadow mb25">';

		foreach ( $offers as $offer ) {
			$score             = $offer['score'];
			$offer_url         = $offer['button']['url'];
			$image             = $offer['thumbnail'];
			$image_url         = $offer['thumbnail']['url'];
			$title             = $offer['title'];
			$copy              = $offer['copy'];
			$current_price     = $offer['currentPrice'];
			$old_price         = $offer['oldPrice'];
			$button_text       = $offer['button']['text'];
			$read_more_text    = $offer['readMore'];
			$read_more_url     = $offer['readMoreUrl'];
			$disclaimer        = $offer['disclaimer'];
			$enable_badge      = $offer['enableBadge'];
			$enable_score      = $offer['enableScore'];
			$badge             = $offer['customBadge'];
			$badge_styles      = 'background-color:' . $badge['backgroundColor'] . '; color:' . $badge['textColor'] . ';';
			$offer_coupon      = $offer['coupon'];
			$offer_coupon_date = $offer['expirationDate'];
			$offer_coupon_mask = $offer['maskCoupon'];
			$mask_text         = $offer['maskCouponText'];
			$coupon_style      = '';
			$expired           = '';

			if ( empty( $image_url ) ) {
				$image_url = plugin_dir_url( __DIR__ ) . '/src/icons/noimage-placeholder.png';
			}

			if ( ! empty( $offer_coupon_date ) ) {
				$timestamp1 = strtotime( $offer_coupon_date ) + 86399;
				$seconds    = $timestamp1 - (int) current_time( 'timestamp', 0 );
				$days       = floor( $seconds / 86400 );
				$seconds    %= 86400;

				if ( $days > 0 ) {
					$coupon_style = '';
					$expired      = 'no';
				} elseif ( $days == 0 ) {
					$coupon_style = '';
					$expired      = 'no';
				} else {
					$coupon_text  = esc_html__( 'Expired', 'rehub-theme' );
					$coupon_style = ' expired_coupon';
					$expired      = '1';
				}
			}

			$coupon_mask_enabled = ( ! empty( $offer_coupon ) && $offer_coupon_mask && $expired != '1' ) ? '1' : '';
			$reveal_enabled      = ( $coupon_mask_enabled == '1' ) ? ' reveal_enabled' : '';

			$html .= '<div class="top_table_list_item border-lightgrey whitebg">';
			$html .= '	<div class="rh-flex-eq-height mobileblockdisplay">';
			$html .= '		<div class="listbuild_image border-right listitem_column text-center rh-flex-center-align position-relative pt15 pb15 pr20 pl20">';

			if ( $enable_score ) {
				$html .= '         <div class="colored_rate_bar abdposright mt15">';
				$html .= '             <div class="review-small-circle mb10 fontbold text-center whitecolor mr10 floatleft rtlml10 r_score_' . round( $offer['score'] ) . '">';
				$html .= '                 <div class="overall-score">';
				$html .= '                   <span class="overall">' . esc_html( $score ) . '</span>';
				$html .= '                 </div>';
				$html .= '             </div>';
				$html .= '         </div>';
			}

			$html .= '           <figure class="position-relative margincenter">';
			$html .= '              <a class="img-centered-flex rh-flex-center-align rh-flex-justify-center" href="' . esc_url( $offer_url ) . '">';
			$html .= '                  <img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image['alt'] ) . '"';
			$html .= '                       width="' . esc_attr( $image['width'] ) . '" height="' . esc_attr( $image['height'] ) . '"/>';
			$html .= '              </a>';
			$html .= '           </figure>';
			$html .= '		</div>';
			$html .= '      <div class="rh-flex-grow1 border-right listitem_title listitem_column pt15 pb15 pr20 pl20">';
			$html .= '          <h3 class="font120 mb10 mt0">';
			$html .= '            <a href="' . esc_url( $offer_url ) . '" class="rehub-main-color">';
			$html .= '              ' . esc_html( trim( $title ) ) . '';
			$html .= '            </a>';

			if ( $enable_badge ) {
				$html .= '<span class="blockstyle">';
				$html .= '	<span class="re-line-badge re-line-badge--default" style="' . esc_attr( $badge_styles ) . '">';
				$html .= '      <span>' . esc_html( $badge['text'] ) . '</span>';
				$html .= '	</span>';
				$html .= '</span>';
			}

			$html .= '          </h3>';
			$html .= '          <div class="lineheight20">' . esc_html( trim( $copy ) ) . '</div>';
			$html .= '		</div>';
			$html .= '      <div class="listbuild_btn listitem_column text-center rh-flex-center-align pt15 pb15 pr20 pl20 rh-flex-justify-center">';
			$html .= '        <div class="width-100p">';
			$html .= '            <div class="priced_block clearfix block_btnblock mobile_block_btnclock mb5 ' . esc_attr( $reveal_enabled ) . ' ' . esc_attr( $coupon_style ) . '">';

			if ( $current_price ) {
				$html .= '<span class="rh_price_wrapper">';
				$html .= '	<span class="price_count">';
				$html .= '      <span class="rh_regular_price">' . esc_html( trim( $current_price ) ) . '</span>';

				if ( $old_price && $old_price !== $current_price ) {
					$html .= '<del>' . esc_html( trim( $old_price ) ) . '</del>';
				}

				$html .= '	</span>';
				$html .= '</span>';
			}

			if ( $offer_url ) {
				$html .= '<span class="rh_button_wrapper">';
				$html .= '	<a href="' . esc_url( $offer_url ) . '" class="btn_offer_block re_track_btn" target="_blank" rel="nofollow sponsored">';

				if ( $button_text ) {
					$html .= esc_html( trim( $button_text ) );
				} elseif ( rehub_option( 'rehub_btn_text' ) != '' ) {
					$html .= rehub_option( 'rehub_btn_text' );
				} else {
					$html .= esc_html( 'Buy It Now' );
				}

				$html .= '	</a>';
				$html .= '</span>';
			}

			if ( $coupon_mask_enabled == '1' ) {
				$html .= '<div class="post_offer_anons">';
				$html .= '	<span class="coupon_btn re_track_btn btn_offer_block rehub_offer_coupon masked_coupon ';

				if ( ! empty( $offer_coupon_date ) ) {
					$html .= $coupon_style;
				}

				$html .= '">';

				if ( ! empty( $mask_text ) ) {
					$html .= esc_html( $mask_text );
				} elseif ( rehub_option( 'rehub_mask_text' ) != '' ) {
					$html = rehub_option( 'rehub_mask_text' );
				} else {
					$html .= esc_html__( 'Reveal coupon', 'rehub-theme' );
				}

				$html .= '	</span>';
				$html .= '</div>';
			} else {
				if ( ! empty( $offer_coupon ) ) {
					$html .= '<div class="rehub_offer_coupon not_masked_coupon';
					if ( ! empty( $offer_coupon_date ) ) {
						$html .= $coupon_style;
					}
					$html .= '">';
					$html .= '<span class="coupon_text">'. esc_html($offer_coupon) .'</span>';
					$html .= '<i class="fal fa-cut fa-rotate-180"></i>';
					$html .= '</div>';
				}
			}

			if ( $read_more_url ) {
				$html .= '<a href="' . esc_url( $read_more_url ) . '" class="read_full font85">';

				if ( $read_more_text ) {
					$html .= esc_html( trim( $read_more_text ) );
				} elseif ( rehub_option( 'rehub_readmore_text' ) != '' ) {
					$html .= strip_tags( rehub_option( 'rehub_readmore_text' ) );
				} else {
					$html .= esc_html( 'Read full review' );
				}

				$html .= '</a>';
			}

			$html .= '            </div>';
			$html .= '        </div>';
			$html .= '      </div>';
			$html .= '	</div>';
			$html .= '</div>';

			if ( $disclaimer ) {
				$html .= '<div class="rev_disclaimer lightbluebg font70 lineheight15 pt10 pb10 pl15 pr15 flowhidden">';
				$html .= wp_kses( $offer['disclaimer'], 'post' );
				$html .= '</div>';
			}
		}
		$html .= '</div>';

		echo $html;
	}
}
