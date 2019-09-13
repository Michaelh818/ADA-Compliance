<?php
/**
 * Single Product title
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
// todo: this used to be h1 so you need to add a class to your h3 tag to make it look like h1 
?>

<h3 class="product-title product_title entry-title">
	<?php the_title(); ?>
</h3>

<?php if(get_theme_mod('product_title_divider', 1)) { ?>
	<div class="is-divider small"></div>
<?php } ?>
