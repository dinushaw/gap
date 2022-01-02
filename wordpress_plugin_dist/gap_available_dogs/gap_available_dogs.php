<?php
/*
Plugin Name: GAP-Available-Dogs
Plugin URI: http://www.grv.org.au
Description: a plugin to list available dogs on Greyhound Adoption Program Use the shortcode <strong>[available-dogs]</strong> to display all the dogs
Version: 2.0
Author: Dinusha Withanage [dinushawithanage@gmail.com]
License: GPL2
*/

function func_load_vuescripts()
{
   
    wp_register_script('wpvue_vuejs', plugin_dir_url( __FILE__ ).'dist/assets/js/app.js', true);
    wp_register_script('wpvue_vuejs1', plugin_dir_url( __FILE__ ).'dist/assets/js/chunk-vendors.js', true);

    wp_register_style('stylesheet',plugin_dir_url( __FILE__ ).'dist/assets/css/app.css',true);
    wp_register_style('stylesheet2',plugin_dir_url( __FILE__ ).'dist/assets/css/chunk-vendors.css',true);
}

add_action('wp_enqueue_scripts', 'func_load_vuescripts');

 //Add shortscode
 function func_wp_vue(){
     wp_enqueue_script('wpvue_vuejs');
     wp_enqueue_script('wpvue_vuejs1');
     wp_enqueue_style('stylesheet');
     wp_enqueue_style('stylesheet2');

     $str= "<div id='app'>"
           ."Loading... "
           ."</div>";
     return $str;
 } // end function

  add_shortcode( 'available-dogs', 'func_wp_vue' );
?>