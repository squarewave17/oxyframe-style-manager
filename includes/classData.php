<?php

/**
 * Process Oxy Class Data.
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
    public $oxyPosts;

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
        $this->oxyPosts = array();

        // $this->Get_Posts($this->query);
    }

    public function process_posts($obj, $mode, $data)
    {
        if ($obj->have_posts()) {
            while ($obj->have_posts()) {
                $obj->the_post();
                if ($mode == 'class-list') {
                    $this->get_Classes(json_decode(get_post_meta(get_the_ID(), 'ct_builder_json', true)));
                } elseif ($mode == 'replace') {
                    foreach ($data as $value) {
                        $this->replace_classes($value[0], $value[1]);
                    }
                    return;
                } else {
                    return;
                }
            }
        }
    }

    public function get_classes($obj)
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
                $this->get_classes($child);
            }
        }
    }

    public function replace_classes($class, $newClass)
    {
        //for each array value, do a function call to replace the class name with the new class name


    }

    public function class_replace($replacements)
    {
        $this->process_posts($this->query, 'class-list', $replacements);
        return;
    }

    public function get_used()
    {
        $this->process_posts($this->query, 'class-list', null);
        return $this->classList;
    }
}
