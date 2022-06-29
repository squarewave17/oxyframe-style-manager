<?php

/**
 *
 * @link              oxyframe.com
 * @since             1.0.0
 * @package           Style-Manager
 * @author            Oxyframe
 * @copyright         2021 Oxyframe
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Style Manager
 * Plugin URI:        oxyframe.com
 * Description:       Advanced style management for Oxygen.
 * Version:           1.0.2
 * Author:            Oxyframe
 * Author URI:        oxyframe.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       oxyframe-style-manager
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

// Set some global paths
define('OF_SM_DIR', plugin_dir_path(__FILE__));



/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('OXYFRAME_STYLE_MANAGER', '1.0.2');



/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-oxyframe-style-manager-activator.php
 */
function activate_oxyframe_style_manager()
{ // Check for Oxygen
	if (!defined('CT_PLUGIN_MAIN_FILE')) {
		die('<p>Oxygen must be installed to activate this plugin</p>');
	}
	require_once plugin_dir_path(__FILE__) . 'includes/oxyframe-style-manager-activator.php';
	Oxyframe_Style_Manager_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-oxyframe-style-manager-deactivator.php
 */
function deactivate_oxyframe_style_manager()
{
	require_once plugin_dir_path(__FILE__) . 'includes/oxyframe-style-manager-deactivator.php';
	Oxyframe_Style_Manager_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_oxyframe_style_manager');
register_deactivation_hook(__FILE__, 'deactivate_oxyframe_style_manager');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/oxyframe-style-manager.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_oxyframe_style_manager()
{
	$plugin = new Oxyframe_Style_Manager();
	$plugin->run();
}
run_oxyframe_style_manager();
