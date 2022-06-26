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
    }

    public function get_posts($obj)
    {
        if ($obj->have_posts()) {
            while ($obj->have_posts()) {
                $obj->the_post();
                $postID = get_the_ID();
                //add each post to $oxyPosts array as a key with the post ID as the value
                $this->oxyPosts[$postID] = json_decode(get_post_meta($postID, 'ct_builder_json', true));
            }
        }
    }

    public function process_posts($obj, $mode, $data)
    {
        if ($obj->have_posts()) {
            while ($obj->have_posts()) {
                $obj->the_post();
                $postID = get_the_ID();
                if ($mode == 'class-list') {
                    $this->get_Classes(json_decode(get_post_meta($postID, 'ct_builder_json', true)));
                } elseif ($mode == 'replace') {
                    if (!empty($postID)) {
                        update_post_meta($postID, 'ct_builder_json',  $this->oxyPosts[$postID]);
                    }
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

    // Update all post
    public function update_all_posts()
    {
        $args = array(
            'post_type' => array('page', 'ct_template'),
            'numberposts' => -1
        );
        $all_posts = get_posts($args);
        foreach ($all_posts as $single_post) {
            $single_post->post_title = $single_post->post_title . '';
            wp_update_post($single_post);
        }
    }
    public function replace_classes($data)
    {

        // $oxySave = new OXY_VSB_Connection();
        foreach ($data as $key => $value) {
            update_post_meta($key, 'ct_builder_json', addslashes(json_encode($value)));
            // $oxySave->ct_connection_metabox_save($key);
            ct_shortcodes_save_meta_box($key);
        }
        $this->update_all_posts();
    }



    public function class_replace($replacements)
    {
        $this->replace_classes($replacements);
        return;
    }

    public function get_oxy_json()
    {
        $this->get_posts($this->query);
        return $this->oxyPosts;
    }

    // public function class_replace($replacements)
    // {
    //     $this->process_posts($this->query, 'replace', $replacements);
    //     return;
    // }

    public function get_used()
    {
        $this->process_posts($this->query, 'class-list', null);
        return $this->classList;
    }
}
