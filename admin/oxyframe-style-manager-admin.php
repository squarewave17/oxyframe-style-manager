<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.oxyframe.com/
 * @since      0.1.1
 *
 * @package    Oxyframe_Style_Manager
 * @subpackage Oxyframe_Style_Manager/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * @package    Oxyframe
 * @subpackage Oxyframe/admin
 * @author     Paul Ryder <paul@oxyframe.com>
 */
class Oxyframe_Style_Manager_Admin
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    0.1.1
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    0.1.1
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    0.1.1
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->load_dependencies();
	}
	/**
	 *
	 *
	 * @since    0.1.1
	 * @access   private
	 */
	private function load_dependencies()
	{
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    0.1.1
	 */
	public function enqueue_styles($hook)
	{
		if ($hook !== 'oxygen_page_oxyframe-style-manager') {
			return;
		}

		wp_enqueue_style('of-style-manager-css', plugin_dir_url(__FILE__) . 'interface/dist/css/app.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    0.1.1
	 */
	public function enqueue_scripts($hook)
	{
		if ($hook !== 'oxygen_page_oxyframe-style-manager') {
			return;
		}

		wp_enqueue_script('of-style-manager-vendors', plugin_dir_url(__FILE__) . 'interface/dist/js/chunk-vendors.js', [],  $this->version, true);
		wp_enqueue_script('of-style-manager-app', plugin_dir_url(__FILE__) . 'interface/dist/js/app.js', [], $this->version, true);
		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/oxyframe-admin.js', [], $this->version, false);
		wp_localize_script($this->plugin_name, 'wpApiSettings', array(
			'root' => esc_url_raw(rest_url()),
			'nonce' => wp_create_nonce('wp_rest')
		));
	}
}
