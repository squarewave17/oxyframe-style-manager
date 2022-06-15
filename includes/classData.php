<?php

/**
 * Process stylesheets.
 *
 *
 * @package    Oxyframe-style-manager
 * @subpackage Oxyframe-style-manager/includes
 * @author     Paul Ryder <paul@oxyframe.com>
 */

class ClassData
{
    public $query;
    public $classList;

    public function __construct()
    {
        $args = array(
            'post_type' => array('page', 'ct_template'),
            'post_status' => 'any',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => 'ct_builder_json',
                    'compare' => 'EXISTS'
                )
            )
        );
        $this->query = new WP_Query($args);
        $this->classList = array();
        $this->Process_Posts($this->query);
    }

    public function Process_Posts($obj)
    {
        if ($obj->have_posts()) {
            while ($obj->have_posts()) {
                $obj->the_post();
                $this->get_Classes(json_decode(get_post_meta(get_the_ID(), 'ct_builder_json', true)));
            }
        }
    }

    public function get_Classes($obj)
    {
        if (isset($obj->options)) {
            if (isset($obj->options->classes)) {
                foreach ($obj->options->classes as $class) {
                    if (is_string($class) && !in_array($class, $this->classList)) {
                        $this->classList[] = $class;
                    }
                }
            }
        }
        if (isset($obj->children)) {
            foreach ($obj->children as $child) {
                $this->get_Classes($child);
            }
        }
    }

    public function get_used()
    {
        return $this->classList;
    }
}
