<form class="mk-searchform" method="get" id="searchform" action="<?php echo home_url('/'); ?>">
	<label stlye="display:none" for="s">Search site</label>
	<input type="text" class="text-input" placeholder="<?php _e('Search site', 'mk_framework'); ?>" value="<?php if(!empty($_GET['s'])) echo get_search_query(); ?>" name="s" id="s" />
	<em><input value="" type="submit" class="search-button" type="submit" /><?php Mk_SVG_Icons::get_svg_icon_by_class_name(true, 'mk-icon-search',16); ?></em>
</form> 