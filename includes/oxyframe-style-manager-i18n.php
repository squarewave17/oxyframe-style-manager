<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       oxyframe.com
 * @since      1.0.0
 *
 * @package    Oxyframe_Style_Manager
 * @subpackage Oxyframe_Style_Manager/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Oxyframe_Style_Manager
 * @subpackage Oxyframe_Style_Manager/includes
 * @author     Paul Ryder <info@oxyframe.com>
 */
class Oxyframe_Style_Manager_i18n
{


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain()
	{

		load_plugin_textdomain(
			'oxyframe-style-manager',
			false,
			dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
		);
	}
}
