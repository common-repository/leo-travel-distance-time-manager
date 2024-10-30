<?php
/*
 Plugin Name: Leo Travel Distance Time Manager
 Description: This is small plugin to calculates time and distance between source,destination and stops addresses.
 Version: 1.0
 Plugin URI: http://leosoftsolutions.com/
 Author: Leo Soft Solutions
 Author URI: http://leosoftsolutions.com/
 License: GNU General Public License v3 or later
*/
define('ABSPATH', dirname(__FILE__) . '/');
function leo_fare_scripts(){	
	if(!is_admin())
	{  
		$google_map_api = 'https://maps.google.com/maps/api/js?sensor=true&libraries=places&language=en-AU';
        wp_enqueue_script('google-places', $google_map_api);
		wp_register_style('leo_style', plugins_url('css/leo_style.css',__FILE__));
        wp_enqueue_style('leo_style');
        wp_register_style('leo_bootstrap', plugins_url('css/bootstrap.min.css',__FILE__));
        wp_enqueue_style('leo_bootstrap');
       	wp_register_script('leo_script', plugins_url('js/leo_timedest.js', __FILE__ ),array('jquery'));
        wp_enqueue_script('leo_script');
	}
}
add_action('wp_enqueue_scripts', 'leo_fare_scripts');
include 'leo_dist_main.php';
?>