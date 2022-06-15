<?php

/**
 * Create REST API
 *
 * @link       https://www.oxyframe.com/
 * @since      0.1.1
 *
 * @package    Oxyframe-style-manager
 * @subpackage Oxyframe-style-manager/api
 */

//use WP_REST_Controller;

class Rest_Settings extends WP_Rest_Controller
{

    protected $namespace;
    protected $rest_base;

    public function __construct()
    {

        $this->namespace = 'oxyframe-style-manager/v2';
        $this->rest_base = '/settings';
    }

    public function register_routes()
    {

        register_rest_route(
            $this->namespace,
            $this->rest_base,
            [
                [
                    'methods' => \WP_Rest_Server::READABLE,
                    'callback' => [$this, 'get_settings'],
                    'permission_callback' => [$this, 'get_route_access']
                ],
                [
                    'methods' => \WP_Rest_Server::CREATABLE,
                    'callback' => [$this, 'save_settings'],
                    'permission_callback' => [$this, 'get_route_access']
                ]
            ]
        );
    }

    /**
     * Get Route Access
     */

    public function get_route_access($request)
    {

        // get nonce
        $nonce = isset($_SERVER['HTTP_X_WP_NONCE']) ? $_SERVER['HTTP_X_WP_NONCE'] : '';

        // verfiy nonce
        $nonce = wp_verify_nonce($nonce, 'wp_rest');

        // return
        return $nonce;
        // return true;
    }

    /**
     * Get Settings Response
     */

    public function get_settings($request)
    {
        $meta_query = new ClassData();
        $base_set = new Base();
        $components_classes = get_option("ct_components_classes");
        $style_folders = get_option("ct_style_folders");
        $style_sets = get_option("ct_style_sets");
        $custom_selectors = get_option("ct_custom_selectors");
        $style_sheets = get_option('ct_style_sheets');
        $response = array(
            'breakpoints' => $base_set->getOxyBreakpoints(),
            'componentsClasses' => $components_classes,
            'styleFolders' => $style_folders,
            'styleSets' => $style_sets,
            'customSelectors' => $custom_selectors,
            'styleSheets' => $style_sheets,
            'usedClasses' => $meta_query->get_used()
        );
        return rest_ensure_response($response);
    }

    public function save_settings($request)
    {
        $components_classes = $request->get_json_params()["componentsClasses"];
        $style_folders = $request->get_json_params()["styleFolders"];
        $style_sets = $request->get_json_params()["styleSets"];
        $custom_selectors = $request->get_json_params()["customSelectors"];
        $style_sheets = $request->get_json_params()["styleSheets"];
        update_option('ct_components_classes', $components_classes);
        update_option('ct_style_folders', $style_folders);
        update_option('ct_style_sets', $style_sets);
        update_option('ct_custom_selectors', $custom_selectors);
        update_option('ct_style_sheets', $style_sheets);
        $postUpdate = new Of_styles;
        $postUpdate->updateOxyCache();
        // Send Success response
        $response = true;
        return rest_ensure_response($response);
    }
}
