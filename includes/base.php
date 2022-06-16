<?php

/**
 * Data controller
 *
 * @link       https://www.oxyframe.com/
 * @since      0.1.1
 *
 * @package    Oxyframe
 * @subpackage Oxyframe/includes
 * @author     Paul Ryder <paul@oxyframe.com>
 */

class Base_sm
{

    /**
     * The stylesheets currently in the database.
     *
     * @since    0.1.1
     * @access   public
     * @var      array    The stylesheets currently in the database.
     */
    public $db_style_sheets;

    public function __construct()
    {
        $this->db_style_sheets = get_option('ct_style_sheets');
        $this->oxy_max_screen = oxygen_vsb_get_page_width($only_global = false);
        $this->oxy_tab_screen = oxygen_vsb_get_breakpoint_width('tablet');
        $this->oxy_landscape_screen = oxygen_vsb_get_breakpoint_width('phone-landscape');
        $this->oxy_min_screen = oxygen_vsb_get_breakpoint_width('phone-portrait');
    }

    public function getStylesheets()
    {
        $output = $this->db_style_sheets;
        return $output;
    }

    public function getMinMax()
    {
        $output = array("max" => $this->oxy_max_screen, "min" => $this->oxy_min_screen);
        return $output;
    }
    public function getOxyBreakpoints()
    {
        $output = array(
            "page-width" => $this->oxy_max_screen,
            "tablet" => $this->oxy_tab_screen,
            "phone-landscape" => $this->oxy_landscape_screen,
            "phone-portrait" => $this->oxy_min_screen,
        );
        return $output;
    }
    public function getStylesheetIndex($args)
    {
        $sheets = $this->db_style_sheets;
        $i = array_search($args, array_column($sheets, 'name'));
        return $i;
    }
}
