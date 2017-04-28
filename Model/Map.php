<?php

Class Lfh_Model_Map{
    public static $default = array(
            'stroke_color' => 'blue',
            'stroke_width' => 5,
    );
 
    public static $colors_marker = array('red', 'blue', 'green', 'purple', 'orange', 'darkred', 'lightred',  
        'darkblue', 'darkgreen', 'cadetblue', 'darkpurple',   'lightblue', 'lightgreen',
        'gray', 'black', 'lightgray');
    
    public static $icons_marker =  array('circle', 'square', 'dot-circle-o', 'circle-o', 'asterisk', 'star', 'bolt', 'sun-o', 'cube', 'bullseye', 'eye', 'heart','flag','leaf',
        'key','music', 'cloud', 'close', 'tree', 'smile-o', 'snowflake-o', 'binoculars', 'shopping-basket', 'plane', 'cab',
        'bicycle', 'bed', 'shower', 'cutlery', 'coffee', 'beer', 'glass', 'spoon', 'bell',
        'home', 'wheelchair', 'child', 'female', 'male',   'bank', 'industry');
    
    public static $colors_path = array('red', 'blue', 'purple', 'orange', 'darkred', 'darkblue', 'darkgreen');
    
    public static $class_map = array('simple-border', 'thick-border',
                                    'simple-border-round', 'thick-border-round',
                                    'left', 'right', 'center'
    );
    
    public static $tiles = array(
            'osm'         => array( 
                        'url'           => '//{s}.tile.osm.org/{z}/{x}/{y}.png',
                        'attribution'   => ' &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                        'min_zoom'      => 1, 
                        'max_zoom'      => 18,
                        'need_key'      => false),
            'osm_fr'      => array(
                        'url'           => '//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
                        'attribution'   => 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                        'min_zoom'      => 1,
                        'max_zoom'      => 20,
                        'need_key'      => false),
            'arcgis_topo' => array(
                        'url'           => 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                        'attribution'   => 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                        'max_zoom'      => 18,
                        'need_key'      => false),
            'stamen_water'=> array(
                        'url'           =>  '//{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
                        'attribution'   => '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>Contributors & <a href="http://stamen.com">Stamen Design</a>',
                        'max_zoom'      => 13,
                        'need_key'      => false)
    );
    
  
   public static  function map_parameters()
   {
     return   array(
  
            'autocenter' => array(
                'type'    => 'checkbox',
                'label'   => __('Position auto', 'lfh'),
                'default' => true,
                'filter'    => FILTER_CALLBACK,
                'options'   => 'Lfh_Model_Map::validate_boolean'),
            'lat'   => array(
                'type'      => 'custom',
                'label'     => 'Lat',
                'filter'    => FILTER_VALIDATE_FLOAT,
                'options' => array(
                       'default'   => 48.866667
                ),
                'dependency'=> array('autocenter')),
            'lng'   => array(
                'type'      => 'hidden',
                'label'     => 'Lng',
                'filter'    => FILTER_VALIDATE_FLOAT,
                'options'   => array(
                        'default'   => 2.333333 )),
            'zoom'  => array(
                'type'      => 'hidden',
                'label'     => 'Zoom',
                'filter'    =>  FILTER_VALIDATE_INT,
                'options'   => array(
                       'default'   => 13,
                       'min_range' => 1,
                       'max_range' => 20 )),
            'width' => array(
                'type'      => 'number',
                'label'     => __('Width', 'lfh'),
                'filter'    => FILTER_VALIDATE_INT,
                'options'   => array(
                       'default'   => 100,
                       'min_range' => 30,
                       'max_range' => 100,
                       'step_range'=> 5),
                'after'    => ' %'),
            'height' => array(
                'type'      => 'number',
                'label'     => __('Height', 'lfh'),
                'filter'    => FILTER_VALIDATE_INT,
                'options'   => array(
                       'default'   => 500,
                       'min_range' => 100,
                       'max_range' => 1000 ,
                        'step_range'=> 50),
                'after'   => ' px'),
            'class' => array(
                 'type'      => 'datalist',
                 'label'     => 'classname',
                 'list'      => self::$class_map,
                 'default'   => '',
                 'filter'    => FILTER_CALLBACK,
                 'options'   => 'Lfh_Model_Map::valid_class'),

            'fullscreen' => array(
                'type'      => 'checkbox',
                'label'     => __('Fullscreen', 'lfh'),
                'default'   => true,
                 'filter'   => FILTER_CALLBACK,
                'options'   => 'Lfh_Model_Map::validate_boolean'
                ),
            'reset' => array(
                'type'      => 'checkbox',
                'label'     => __('Reset', 'lfh'),
                'default'   => true,
                'filter'    => FILTER_CALLBACK,
                'options'   => 'Lfh_Model_Map::validate_boolean'
                ),
            'list' => array(
                'type'      => 'checkbox',
                'label'     => __('List' , 'lfh'),
                'default'   => false,
                'filter'    => FILTER_VALIDATE_BOOLEAN,
                'flags'     => FILTER_NULL_ON_FAILURE,
                ),
            'mousewheel' => array(
                'type'      => 'checkbox',
                'label'     => __('Zoom on wheel', 'lfh'),
                'default'   => false,
                'filter'  => FILTER_VALIDATE_BOOLEAN,
                'flags'   => FILTER_NULL_ON_FAILURE),
            'tile' => array(
                 'type'      => 'select',
                 'label'     => __('Tiles', 'lfh'),
                 'default'   => 'osm',
                 'list'      => self::get_valide_tiles(),
                 'filter'    => FILTER_CALLBACK,
                 'options'   => 'Lfh_Model_Map::valid_tile'
                 )
        );
   }
  
  
    public static function to_string($lat)
    {
        $num = abs($lat);
        $size = 2- intval( log10( $num )); //useless align right do the work
        $str = str_repeat(' ',$size) . ($lat<0 ? '-':' ').intval($num).'° ';
        $num = ($num - intval($num))*60;
        $size = 1- intval( log10 ( $num));
        $str .= str_repeat('0',$size).intval($num).'\' ';
        $num = ($num - intval($num))*60;$size = 1- intval( log10 ( $num));
        $str .= str_repeat('0',$size). intval($num).'\"';
        return stripslashes($str);
        
    }
    
    public static function filter_map_data($atts)
    {
      
        $args = self::map_parameters();
       //add key if not exists
        $first = filter_var_array($atts, $args, true);
        //put default value where null, use this solution
        //because trouble with default true when null for boolean
        array_walk($first, 'Lfh_Model_Map::set_default', $args);
        return $first;
    }
    
    public static function filter_gpx_data($atts)
    {
        if ($atts) {
            extract($atts);
        }
        if(!isset($src) || empty($src)){
            return null;
        }
        $options = array(
                'src'        => $src,
                'title'       => isset($title)? $title: '',
                'color'      => isset($color) ? $color: self::$default['stroke_color'],
                'width'      => isset($width) ? $width: self::$default['stroke_width']
        );
        $args = array(
                'src'   => array(
                        'filter'    => FILTER_SANITIZE_URL | FILTER_VALIDATE_URL,
                        'default'   => NULL),
                'title'   => array(
                        'filter'    => FILTER_SANITIZE_STRING,
                        'default'   => ''),
                'color' => array(
                        'filter'    => FILTER_CALLBACK,
                        'options'   => 'Lfh_Model_Map::is_path_color'),
                'width' => array(
                        'filter'    => FILTER_VALIDATE_INT,
                        'options'   => array(
                                'default'   => self::$default['stroke_width'],
                                'min_range' => 1,
                                'max_range' => 10 )
                )
        );
        $options = filter_var_array($options,$args);
        if(is_null($options)){
            return NULL;
        }else{
            return $options;
        }
        
    }
    public static function filter_marker_data($atts)
    {
        if (!empty($atts)) extract($atts);
        
        //without position return null
        if(!isset($lat) || !isset($lng)){
            return null;
        }

        $options = array(
                'lat'   => $lat,
                'lng'   => $lng,
                'title' => isset($title) ? $title : NULL,
                'visibility' => isset($visibility) ? $visibility : 'zoom',
                'color' => isset($color) ? $color : 'red',
                'icon'  => isset($icon) ? $icon : 'circle',
                'popup' => isset($popup) ? $popup : NULL
        );
        
        $args = array(
                'lat'   => FILTER_VALIDATE_FLOAT,
                'lng'   => FILTER_VALIDATE_FLOAT,
                'title' => array(
                        'filter'    => FILTER_CALLBACK,
                        'options'   => 'Lfh_Model_Map::clean_string'
                ),
                'visibility' => array(
                        'filter'    =>  FILTER_CALLBACK,
                        'options'   => 'Lfh_Model_Map::is_visibility'
                ),
                'color' => array(
                        'filter'    =>  FILTER_CALLBACK,
                        'options'   => 'Lfh_Model_Map::is_color_marker'
                ),
                'icon'  => array(
                        'filter'    =>  FILTER_CALLBACK,
                        'options'   => 'Lfh_Model_Map::is_icon_marker'
                ),
                'popup' =>  array(
                        'filter'    => FILTER_CALLBACK,
                        'options'   => 'Lfh_Model_Map::clean_string'
                )
        );
        if (!function_exists('remove_null')) {
            function remove_null ($var) {
                return $var !== null;
            }
        }
        
        $arr = array_filter($options, 'remove_null');
        
        $args = array_intersect_key($args, $arr);
        $arr = filter_var_array($arr, $args);
        return $arr;
    }
    private static function validate_boolean( $bool){
        if( is_null($bool)){
            return true;
        }else{
            return boolval($bool);
        }
    }
   //Specific filters for map data
    private static function is_color_marker($var)
    {
        if(in_array(strtolower($var), self::$colors_marker)){
            return strtolower($var);
        }else{
            return 'red';
        }
    }
    
    private static function is_icon_marker($var)
    {
        if(in_array(strtolower($var), self::$icons_marker)){
            return strtolower($var);
        }else{
            return 'circle';
        }
    }
    
    private static function is_path_color($var)
    {
        if(in_array(strtolower($var), self::$colors_path)){
            return strtolower($var);
        }else{
            return self::$default['stroke_width'];
        }
    }
    private static function clean_string($var)
    {
        return addslashes(stripslashes($var));
    }
    
    private static function valid_class($var)
    {
        return stripslashes($var);
    }
    private static function get_valide_tiles()
    {
        $tiles = array_keys(self::$tiles);
        if( !empty(get_option('lfh_mapquest_key'))){
            $tiles[] = 'mapquest';
        }
        return $tiles;
    }
    private static function valid_tile($var)
    {
        if(in_array(strtolower($var), self::get_valide_tiles())){
            return strtolower($var);
        }else{
            return 'osm';
        }
    }
    private static function is_visibility($var)
    {
        if(strtolower($var) === 'always'){
            return 'always';
        }else{
            return 'zoom';
        }
    }
    private static function set_default(&$value, $key ,&$args)
    {
        if(is_null($value)){
            if(isset($args[$key]['default'])){
                $value = $args[$key]['default'];
            }elseif(isset($args[$key]['options']['default'])){
                $value = $args[$key]['options']['default'];
            }
        }
    }
   
}