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
					'currentPrice' => '',
					'oldPrice'     => '',
					'button'       => array(
						'text' => 'Buy this item',
						'url'  => ''
					),
					'readMore'     => 'Read full review',
					'readMoreUrl'  => '',
					'disclaimer'   => 'Disclaimer text...'
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

		$html .= '<div class="rh_list_builder rh-shadow4 disablemobileshadow">';

		foreach ( $offers as $offer ) {
			$score          = $offer['score'];
			$offer_url      = $offer['button']['url'];
			$image_url      = $offer['thumbnail']['url'];
			$title          = $offer['title'];
			$copy           = $offer['copy'];
			$current_price  = $offer['currentPrice'];
			$old_price      = $offer['oldPrice'];
			$button_text    = $offer['button']['text'];
			$read_more_text = $offer['readMore'];
			$read_more_url  = $offer['readMoreUrl'];
			$disclaimer     = $offer['disclaimer'];

			if ( empty( $image_url ) ) {
				$image_url = plugin_dir_url( __DIR__ ) . '/src/icons/noimage-placeholder.png';
			}

			$html .= '<div class="top_table_list_item border-lightgrey whitebg">';
			$html .= '	<div class="rh-flex-eq-height mobileblockdisplay">';
			$html .= '		<div class="listbuild_image border-right listitem_column text-center rh-flex-center-align position-relative pt15 pb15 pr20 pl20">';
			$html .= '          <div class="colored_rate_bar abdposright mt15">';
			$html .= '              <div class="review-small-circle mb10 fontbold text-center whitecolor mr10 floatleft rtlml10 r_score_' . round( $offer['score'] ) . '">';
			$html .= '                  <div class="overall-score">';
			$html .= '                    <span class="overall">' . esc_html( $score ) . '</span>';
			$html .= '                  </div>';
			$html .= '              </div>';
			$html .= '          </div>';
			$html .= '           <figure class="position-relative margincenter">';
			$html .= '              <a class="img-centered-flex rh-flex-center-align rh-flex-justify-center" href="' . esc_url( $offer_url ) . '">';
			$html .= '                  <img src="' . esc_url( $image_url ) . '" />';
			$html .= '              </a>';
			$html .= '           </figure>';
			$html .= '		</div>';
			$html .= '      <div class="rh-flex-grow1 border-right listitem_title listitem_column pt15 pb15 pr20 pl20">';
			$html .= '          <h3 class="font120 mb10 mt0">';
			$html .= '            <a href="' . esc_url( $offer_url ) . '" class="rehub-main-color">';
			$html .= '              ' . esc_html( trim( $title ) ) . '';
			$html .= '            </a>';
			$html .= '          </h3>';
			$html .= '          <div class="lineheight20">' . esc_html( trim( $copy ) ) . '</div>';
			$html .= '		</div>';
			$html .= '      <div class="listbuild_btn listitem_column text-center rh-flex-center-align pt15 pb15 pr20 pl20 rh-flex-justify-center">';
			$html .= '        <div>';
			$html .= '            <div class="priced_block clearfix block_btnblock mobile_block_btnclock mb5">';

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