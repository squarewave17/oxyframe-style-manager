<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       oxyframe.com
 * @since      1.0.0
 *
 * @package    Oxyframe_Style_Manager
 * @subpackage Oxyframe_Style_Manager/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Oxyframe_Style_Manager
 * @subpackage Oxyframe_Style_Manager/includes
 * @author     Paul Ryder <info@oxyframe.com>
 */
class Oxyframe_Style_Manager
{

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Oxyframe_Style_Manager_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct()
	{
		if (defined('OXYFRAME_STYLE_MANAGER')) {
			$this->version = OXYFRAME_STYLE_MANAGER;
		} else {
			$this->version = '0.0.1';
		}
		$this->plugin_name = 'oxyframe-style-manager';

		$this->load_dependencies();
		$this->set_locale();
		$this->register_of_api();
		$this->define_admin_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Oxyframe_Style_Manager_Loader. Orchestrates the hooks of the plugin.
	 * - Oxyframe_Style_Manager_i18n. Defines internationalization functionality.
	 * - Oxyframe_Style_Manager_Admin. Defines all hooks for the admin area.
	 * - Oxyframe_Style_Manager_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies()
	{

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/oxyframe-style-manager-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/oxyframe-style-manager-i18n.php';
		/**
		 * Base class
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/base.php';
		/**
		 * REST Controller class
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'api/Rest_Settings.php';
		/**
		 * The class responsible for outputting used class data.
		 * 
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'includes/classData.php';
		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/oxyframe-style-manager-admin.php';

		$this->loader = new Oxyframe_Style_Manager_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Oxyframe_Style_Manager_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale()
	{

		$plugin_i18n = new Oxyframe_Style_Manager_i18n();

		$this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
	}

	/**
	 * Initialize Rest API
	 *
	 * @since    0.0.1
	 * @access   private
	 */
	private function register_of_api()
	{
		$of_rest_api = new Rest_Settings_sm();
		$this->loader->add_action('rest_api_init', $of_rest_api, 'register_routes');
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks()
	{
		$plugin_admin = new Oxyframe_Style_Manager_Admin($this->get_plugin_name(), $this->get_version());
		// Create Oxyframe Menu
		add_action('admin_menu', function () {
			add_submenu_page(
				'ct_dashboard_page',
				'Style Manager',
				'Style Manager',
				'manage_options',
				'oxyframe-style-manager',
				function () {
					echo '<div id="oxyframe-style-manager"></div>';
				},
			);
		}, 20);

		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
		$this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run()
	{
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name()
	{
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Oxyframe_Style_Manager_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader()
	{
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version()
	{
		return $this->version;
	}
}
