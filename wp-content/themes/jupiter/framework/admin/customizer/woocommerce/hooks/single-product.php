<?php
/**
 * WooCommerce single product hooks actions and filters.
 *
 * @package Jupiter
 * @subpackage MK_Customizer
 * @since 5.9.4
 */

$image_ratio = mk_cz_get_option( 'sh_pp_sty_img_image_ratio', '1_by_1' );
$product_layout = mk_cz_get_option( 'sh_pp_set_layout', '1' );

// Add badges section before title.
add_action(
	'woocommerce_single_product_summary', function() {
	?>
		<div class="mk-single-product-badges">
			<?php do_action( 'mk_single_product_badges' ); ?>
		</div>
	<?php
	}, 4
);

// Add Out of Stock badge before title.
add_action(
	'mk_single_product_badges', function() {
		global $product;

		if ( ! $product->is_in_stock() || 'variable' === $product->get_type() ) {
			$style = ('variable' === $product->get_type()) ? 'display:none;' : '';
			echo '<span class="mk-out-of-stock" style="' . esc_attr( $style ) . '">' . esc_html__( 'Out of Stock', 'mk_framework' ) . '</span>';
		}
	}
);

// Remove Sale bage then add it before title.
remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash' );
add_action( 'mk_single_product_badges', 'woocommerce_show_product_sale_flash' );

// Show rating after price.
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating' );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 11 );

// Show meta after rating.
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 12 );

/**
 * Remove Tabs then add Accordions under Add to Cart button.
 *
 * @since 6.0.1
 */
if ( '5' === $product_layout || '6' === $product_layout ) {
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
	add_action( 'woocommerce_single_product_summary', function() {
		wc_get_template( 'single-product/accordions.php' );
	}, 40 );
}

// Filter the price variation separator.
add_filter(
	'woocommerce_get_price_html', function( $price, $product ) {
		if ( 'product' === get_post_type() && is_singular() ) {
			$has_price = $product->get_price();
			$is_variable_product = $product->is_type( 'variable' );
			$is_on_sale = $product->is_on_sale();
			$price_has_range = strpos( $price, '&ndash;' ) !== false;
			if ( $has_price && $is_on_sale && $price_has_range && $is_variable_product ) {
				$price = '<ins>' . $price . '</ins>';
			}
			return str_replace( '&ndash;', '<span class="mk-price-variation-seprator">&ndash;</span>', $price );
		}
		return $price;
	}, 100, 2
);

add_action(
	'woocommerce_share', function() {
		global $product;

		$networks = array(
			'facebook',
			'twitter',
			'pinterest',
			'linkedin',
			'googleplus',
			'reddit',
			'digg',
			'email',
		);

		$image_src_array = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full', true );

		echo '<div class="social-share">';
		echo '<ul>';
		foreach ( $networks as $network ) {
			echo '<li class="share-by share-by-' . esc_attr( $network ) . '">';
			switch ( $network ) {
				case 'facebook':
				case 'twitter':
				case 'pinterest':
				case 'linkedin':
				case 'googleplus':
				case 'reddit':
				case 'digg':
					$icon_class = 'mk-jupiter-icon-simple-' . $network;
					$href = '#';
					break;
				case 'email':
					$icon_class = 'mk-moon-envelop-2';
					$href = 'mailto:?Subject=' . urldecode( get_the_title() ) . '&Body=' . urldecode( get_the_excerpt() );
					break;
			}

			echo '<a class="' . esc_attr( $network ) . '-share" data-title="' . the_title_attribute(
				array(
					'echo' => false,
				)
			) . '" data-url="' . esc_url( get_permalink() ) . '" data-desc="' . esc_attr( get_the_excerpt() ) . '" data-image="' . esc_url( $image_src_array[0] ) . '" href="' . esc_attr( $href ) . '" rel="nofollow">';

			Mk_SVG_Icons::get_svg_icon_by_class_name( true, $icon_class, 18 );

			echo '</a>';
			echo '</li>';
		}// End foreach().
		echo '</ul>';
		echo '</div>';

	}
);

// Filter the add to cart button text and add icon.
add_filter(
	'woocommerce_product_single_add_to_cart_text', function( $text, $product ) {
		// No icons for external products, for now.
		if ( 'external' !== $product->get_type() ) {
			$typography = mk_maybe_json_decode( mk_cz_get_option( 'sh_pp_sty_atc_btn_typography' ) );

			echo '<span class="mk-button-icon">';
			Mk_SVG_Icons::get_svg_icon_by_class_name(
				true,
				'mk-moon-cart-2',
				( ! empty( $typography->size ) ) ? $typography->size : '12'
			);
			echo '</span>';
			$text = mk_cz_get_option( 'sh_pp_sty_atc_btn_text', $text );
		}

		return $text;
	}, 10, 2
);

add_action(
	'wp_enqueue_scripts', function() {

		// Filter the Product Lightbox status.
		add_filter(
			'woocommerce_single_product_photoswipe_enabled', function( $enabled ) {

				$enabled = ( mk_cz_get_option( 'sh_pp_set_photoswipe_enabled', 'true' ) === 'true' );

				return $enabled;

			}
		);

		// Filter the Product Magnifier status.
		add_filter(
			'woocommerce_single_product_zoom_enabled', function( $enabled ) {

				$enabled = ( mk_cz_get_option( 'sh_pp_set_zoom_enabled', 'true' ) === 'true' );

				return $enabled;

			}
		);

	}, 0
);



// Filter body css class based on selected layout.
add_filter(
	'body_class', function( $classes ) {

		if ( is_product() ) {
			return array_merge( $classes, array( 'mk-product-layout-' . mk_cz_get_option( 'sh_pp_set_layout', '1' ) ) );
		}

		return $classes;

	}
);

// Add Gallery orientation class to product post.
add_filter(
	'post_class', function( $classes ) {

		if ( is_product() ) {
			return array_merge(
				$classes,
				array( 'mk-product-orientation-' . mk_cz_get_option( 'sh_pp_sty_img_orientation', 'horizontal' ) )
			);
		}

		return $classes;

	}
);

// Turn on directionNav for single product flexslider.
add_filter(
	'woocommerce_single_product_carousel_options', function( $options ) {
		$options['directionNav'] = true;

		return $options;
	}
);

// Modify WooCommerece shop_single image size.
if ( 'default' !== $image_ratio ) {

	add_filter( 'woocommerce_get_image_size_shop_single', function( $size ) use ( $image_ratio, $product_layout ) {

		$width = 700;

		// Other layout need to be checked in future.
		if ( '7' === $product_layout ) {
			$width = 1240; // later get grid_width from theme options.
		}

		switch ( $image_ratio ) {
			case '16_by_9':
				$height = round( ($width * 9) / 16 );
				break;
			case '3_by_2':
				$height = round( ($width * 2) / 3 );
				break;
			case '2_by_3':
				$height = round( ($width * 3) / 2 );
				break;
			case '9_by_16':
				$height = round( ($width * 16) / 9 );
				break;
			default:
				$height = $width;
				break;
		}

		$size = array(
			'width'  => $width,
			'height' => $height,
			'crop'   => 1, // We may need to add an extra option for this later.
		);

		return $size;

	} );

} // End if().

// Configure sidebar.
add_action( 'wp', function() {
	if ( is_product() ) {
		global $mk_options;

		// We need another solution.
		$mk_options['woocommerce_single_layout'] = mk_cz_get_option( 'sh_pp_set_sidebar', 'full' );
	}
} );

if ( ! is_customize_preview() ) {
	// Related Products.
	$related_products = mk_cz_get_option( 'sh_pp_set_related_products_enabled', 'true' );
	if ( 'true' !== $related_products ) {
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
	}

	// Up-Sells.
	$up_sells = mk_cz_get_option( 'sh_pp_set_up_sells_enabled', 'true' );
	if ( 'true' !== $up_sells ) {
		remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15 );
	}

	// Product Info Tabs.
	add_filter(
		'woocommerce_product_tabs', function( $tabs ) {
			$product_info = mk_cz_get_option( 'sh_pp_set_product_info' );
			$description_tab = '.woocommerce-tabs #tab-title-description|.woocommerce-tabs #tab-description';
			$reviews_tab = '.woocommerce-tabs #tab-title-reviews|.woocommerce-tabs #tab-reviews';
			$additional_info_tab = '.woocommerce-tabs #tab-title-additional_information|.woocommerce-tabs #tab-additional_information';

			if ( false === $product_info ) {
				return $tabs;
			}

			if ( strpos( $product_info, $description_tab ) === false ) {
				unset( $tabs['description'] );
			}

			if ( strpos( $product_info, $reviews_tab ) === false ) {
				unset( $tabs['reviews'] );
			}

			if ( strpos( $product_info, $additional_info_tab ) === false ) {
				unset( $tabs['additional_information'] );
			}

			return $tabs;
		}, 98
	);

} // End if().

/**
 * Show variation price under the quantity.
 *
 * @since 6.0.1
 */
remove_action( 'woocommerce_single_variation', 'woocommerce_single_variation', 10 );
add_action( 'woocommerce_after_add_to_cart_quantity', 'woocommerce_single_variation', 10 );
