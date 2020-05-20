<?php

namespace Rehub\Gutenberg\Blocks;

defined( 'ABSPATH' ) OR exit;

class OfferListing extends Basic {
	protected $name = 'offer-listing';

	protected $attributes = array(
		'offers' => array(
			'type'    => 'object',
			'default' => array(
				array(
					'score'        => 10,
					'thumbnail'    => array(
						'url' => '',
					),
					'title'        => 'Post name',
					'copy'         => 'Content',
					'currentPrice' => 100,
					'oldPrice'     => 200,
					'button'       => array(
						'text' => 'Buy this item',
						'url'  => ''
					),
					'coupon'       => 'coupon_code',
					'maskCoupon'   => false,
					'readMore'     => 'Read full review',
					'readMoreUrl'  => '',
					'disclaimer'   => 'Disclaimer text...'
				)
			),
		),
	);

	protected function render( $settings = array() ) {
		$html   = '';
		$offers = $settings['offers'];

		if ( empty( $offers ) || count( $offers ) === 0 ) {
			return;
		}

		$html .= '<div class="rh_list_builder rh-shadow4 disablemobileshadow">';
		foreach ( $offers as $offer ) {
			$button_classes = 'priced_block clearfix block_btnblock mobile_block_btnclock mb5';
			$mask_coupon    = $offer['maskCoupon'];

			if ( $mask_coupon ) {
				$button_classes .= ' reveal_enabled';
			}

			$html .= '<div class="top_table_list_item border-lightgrey whitebg">';
			$html .= '	<div class="rh-flex-eq-height mobileblockdisplay">';
			$html .= '		<div class="listbuild_image border-right listitem_column text-center rh-flex-center-align position-relative pt15 pb15 pr20 pl20">';
			$html .= '          <div class="colored_rate_bar abdposright mt15">';
			$html .= '              <div class="review-small-circle mb10 fontbold text-center whitecolor mr10 floatleft rtlml10 r_score_' . round( $offer['score'] ) . '">';
			$html .= '                  <div class="overall-score">';
			$html .= '                    <span class="overall">' . $offer['score'] . '</span>';
			$html .= '                  </div>';
			$html .= '              </div>';
			$html .= '          </div>';
			$html .= '           <figure class="position-relative margincenter">';
			$html .= '              <a class="img-centered-flex rh-flex-center-align rh-flex-justify-center" href="' . $offer['button']['url'] . '">';
			$html .= '                  <img src="' . $offer['thumbnail']['url'] . '" />';
			$html .= '              </a>';
			$html .= '           </figure>';
			$html .= '		</div>';
			$html .= '      <div class="rh-flex-grow1 border-right listitem_title listitem_column pt15 pb15 pr20 pl20">';
			$html .= '          <h3 class="font120 mb10 mt0">';
			$html .= '            <a href="' . $offer['button']['url'] . '" class="rehub-main-color">';
			$html .= '              ' . $offer['title'] . '';
			$html .= '            </a>';
			$html .= '          </h3>';
			$html .= '          <div class="lineheight20">' . $offer['copy'] . '</div>';
			$html .= '		</div>';
			$html .= '      <div class="listbuild_btn listitem_column text-center rh-flex-center-align pt15 pb15 pr20 pl20 rh-flex-justify-center">';
			$html .= '        <div>';
			$html .= '            <div class="' . $button_classes . '">';

			if ( $offer['currentPrice'] ) {
				$html .= '<span class="rh_price_wrapper">';
				$html .= '	<span class="price_count">';
				$html .= '      <span class="rh_regular_price">' . $offer['currentPrice'] . '</span>';

				if ( $offer['oldPrice'] && $offer['oldPrice'] !== $offer['currentPrice'] ) {
					$html .= '<del>' . $offer['oldPrice'] . '</del>';
				}

				$html .= '	</span>';
				$html .= '</span>';
			}

			if ( $offer['button']['url'] ) {
				$html .= '<span class="rh_button_wrapper">';
				$html .= '	<a href="' . $offer['button']['url'] . '" class="btn_offer_block re_track_btn" target="_blank" rel="nofollow sponsored">';

				if ( $offer['button']['text'] ) {
					$html .= $offer['button']['text'];
				} elseif ( rehub_option( 'rehub_btn_text' ) != '' ) {
					$html .= rehub_option( 'rehub_btn_text' );
				} else {
					$html .= esc_html_e( 'Buy It Now', 'rehub-theme' );
				}

				$html .= '	</a>';
				$html .= '</span>';
			}

			if ( $mask_coupon ) {
				$html .= '<div class="post_offer_anons">';
				wp_enqueue_script( 'zeroclipboard' );
				$html .= '	<span class="coupon_btn re_track_btn btn_offer_block rehub_offer_coupon masked_coupon"
								data-clipboard-text="' . $offer['coupon'] . '"
								data-codeid=""
								data-dest="' . $offer['button']['url'] . '">';

				if ( $offer['button']['text'] ) {
					$html .= $offer['button']['text'];
				} elseif ( rehub_option( 'rehub_mask_text' ) != '' ) {
					$html .= rehub_option( 'rehub_mask_text' );
				} else {
					$html .= esc_html_e( 'Reveal coupon', 'rehub-theme' );
				}

				$html .= '';
				$html .= '	</span>';
				$html .= '</div>';
			} elseif ( ! empty( $offer['coupon'] ) ) {
				wp_enqueue_script( 'zeroclipboard' );
				$html .= '<div class="rehub_offer_coupon not_masked_coupon
								data-clipboard-text="' . $offer['coupon'] . '">';
				$html .= '	<span class="coupon_text">' . $offer['coupon'] . '</span> <i class="fal fa-cut fa-rotate-180"></i>';
				$html .= '</div>';
			}

			if ( $offer['readMoreUrl'] ) {
				$html .= '<a href="' . $offer['readMoreUrl'] . '" class="read_full font85">';

				if ( $offer['readMore'] ) {
					$html .= $offer['readMore'];
				} elseif ( rehub_option( 'rehub_readmore_text' ) != '' ) {
					$html .= strip_tags( rehub_option( 'rehub_readmore_text' ) );
				} else {
					$html .= esc_html_e( 'READ MORE  +', 'rehub-theme' );
				}

				$html .= '</a>';
			}

			$html .= '            </div>';
			$html .= '        </div>';
			$html .= '      </div>';
			$html .= '	</div>';
			$html .= '</div>';

			if ( $offer['disclaimer'] ) {
				$html .= '<div class="rev_disclaimer lightbluebg font70 lineheight15 pt10 pb10 pl15 pr15 flowhidden">';
				$html .= wp_kses( $offer['disclaimer'], 'post' );
				$html .= '</div>';
			}
		}
		$html .= '</div>';

		echo $html;
	}
}