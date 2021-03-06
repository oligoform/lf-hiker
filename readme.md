# Lf Hiker 
[![Contributor: Elisabeth Pointal](https://github.com/epointal/lf-hiker/blob/master/assets/svg/contributor2.svg)](http://elisabeth.pointal.org)
[![License GPL 2](https://github.com/epointal/lf-hiker/blob/master/assets/svg/license.svg)](http://www.gnu.org/licenses/gpl-2.0.html )
[![Version 1.13.0](https://github.com/epointal/lf-hiker/blob/master/assets/svg/version1.13.0.svg)](https://github.com/epointal/lf-hiker/archive/1.13.0.zip) 

Plugin site web: [Lf Hiker](http://elisabeth.pointal.org/lf-hiker/en/about/ )  
Requires Wordpress version: 4.7.3  
Tested up to: Wordpress 4.9  
Stable version: 1.0    




**Lf Hiker** is a wordpress plugin for quickly display your gpx tracks with their profile elevation on an interactive map.
**Lf Hiker** is responsive, mobile friendly and customizable.
 


Description
-------------
### Main Utilisation
Simply upload your gpx file with the wordpress media manager, complete its informations and insert  it in your post/page (shortcode).  
Display the post/page : you have an interactive view of your track.  
The trail is displayed on an OSM map by default, and have its own information window with: 
* title
* description
* interactive **profile elevation**  according to path
* distance of the track
* maximum elevation
* minimum elevation
* elevation loss
* elevation gain 
* duration
* download link to gpx file

![Lf Hiker Front](http://elisabeth.pointal.org/lf-hiker/wp-content/uploads/2017/04/screenshot-8.png) 

### List of Features
**Lf Hiker** allows displaying too:
* few gpx files in the same map
* markers on the map
* few maps on the same post/page


For gpx track you can custom:
* title
* description
* stroke color
* stroke width
* display button download gpx file  
And only with shortcode:
* the elevation unit
* the distance unit
* the minimum step on elevation axis (in meter)

**Lf Hiker** included an helper for edit map and add markers. 
You can choose
#### for the map:
 * the tiles layer ( among OSM, OSM_FR , stamen watercolor, arcgis world topo)
 * fullscreen button or not
 * map's view  or let **lf Hiker** find automatically the best view
 * reset button  or not
 * list of layers button or not
 * size of the map
 * classname for the map ( including your custom class)
 * to zoom on mousewheel or not
 * to start with profile elevation displayed
 * to display the description always under the map
 
#### for the markers:
 * color of icon marker
 * symbol in the icon
 * title
 * popup
 * visibility according to zoom or not
 * independant window with formated description

You can do all this with the helpers or directly using shortcodes  
You can choose to unactive the helper.  

**Lf Hiker** allows you to customize the css in admin configuration (colors of information window, button and selected path)  

For more information see [Lf Hiker site](http://elisabeth.pointal.org/lf-hiker/ ) 

----------------------------------------  
#### IMPORTANT    
If you think you found a bug in **Lf Hiker** or have any problem/question concerning the plugin, do not hesitate to [contact me](http://elisabeth.pointal.org/lf-hiker/en/contact-me). 

------------------------------------------
## Supported languages 
 * Fran&ccedil;ais (fr_FR) 
 * English (en_US) 
 * Deutsch (de_DE)  by [Kristof Kling](https://lg-buggingen.de/bugginger-feierabendlauf/strecke/)  
 * Greek (el) by [Pol Gkitsas](http://eoskarditsas.gr) 
 * Dutch (nl-BE)  
 * Spanish (es-ES) by [Miguel Angel](http://www.rutasyviajes.net)
 
 If you need language for **Lf Hiker** which is not included. You can easily translate with poedit from the file :    
    `lf-hiker/languages/lfh-default.po`.   
	
 I will be happy to add your translation to **Lf Hiker**.  
If you have any questions about the method, do not hesitate to [contact me](http://elisabeth.pointal.org/lf-hiker/en/contact-me).  
 If you find errors in my english translation do not hesitate to [contact me](http://elisabeth.pointal.org/lf-hiker/en/contact-me).
 

## Installation   


### Minimum requirements.  
*   Wordpress 4.7.x  
*   PHP 5.6  
*   MySQL 5.x  


### Perform a new installation  

After downloading the ZIP file [lf-hiker-1.13.0.zip](https://github.com/epointal/lf-hiker/archive/1.13.0.zip)   

1. Unzip `lf-hiker.zip` 
2. Put the folder `lf-hiker` in directory `wp-content/plugins`
3. Log in to the administrator panel.   
4. Go to Plugins Tab: **Lf Hiker** is among the plugins     
5. Click `Activate` button for activate **Lf Hiker**.    
6. If the activation does not succeed, please [contact me](http://elisabeth.pointal.org/lf-hiker/en/contact-me).


### Browsers
 Tested with
* Firefox 52.0
* Chrome 57.0
* Microsoft Edge
* Internet Explorer 11
* Safari 5 (windows)
* Opera 44

### Use
* [leaflet](http://leafletjs.com) an open-source JavaScript library for mobile-friendly interactive maps
* [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx) a leaflet plugin for the analysis and parsing of a GPX track 
* [font-awesome](http://fontawesome.io/) for iconic font
* [awesome-marker](https://github.com/lvoogdt) Colorful, iconic  markers by Lennard Voogdt
* [Shortcode Empty Paragraph](https://wordpress.org/plugins/shortcode-empty-paragraph-fix/) little worpress plugin fix issue shortcode by [Johann Heyne](http://www.johannheyne.de/)



## Changelog 
### 1.13.0 ###
 * Evolution: add spanish language
 
### 1.12.0 ###
 * Evolution: add empty marker
 * Evolution: add dutch language
 * Fixed: error twice class for label in profile svg
 
### 1.11.0 ###
 * Evolution: Ability to always display the caption under the map
 * Evolution: Helper - Ability to add marker with its coordinates
 * Evolution: Add greek translation
 * Fixed: duration is not displayed
 * Fixed: choose center and zoom is not working
 
### 1.10.0 ###
 * Fixed: lf hiker is destroying the AMP pages
 * Fixed: bug with tabby-responsive-tabs plugin
 * Evolution: gpx buttons are ordered in list as the gpx files in post/page
 * Evolution: Ability to choose the leaflet host
 
### 1.9.0 ###
 * Fixed: trouble position of gpx dom block, marker block and list block
 * Fixed: trouble with map when tabs (map only on top left corner)
 * Evolution: Add open Topo Map tiles
 
### 1.8.1 ###
 * Fixed: no icon for way point
 
### 1.8.0 ###
 * Evolution: Add black in color path
 * Evolution: Enable all hexadecimal color for path
 * Evolution: Little dots at ends for path with width less than 3px
 * Fixed: german translation
 
### 1.7.0 ###
 * Fixed: no path displayed with mesmerize theme
 * Evolution: add tiles Stamen Terrain
 * Evolution: add german translation
 * Fixed: conflict with divi theme and option Grab the first post image
 * Fixed: function boolval do not exists (version php <5.5)
 
### 1.6.0 ###
 * Ability to choose the default map tiles
 * Display minimum elevation under profile
 * Display maximum elevation under profile
 * Add parameter step_min for gpx profile elevation 
 * Ability to choose the default step_min for elevation step in settings
 * Disable map pan with one finger
 * Fixed: path and marker button too high in little view
 
### 1.5.0 ###
 * Ability to start with profile elevation displayed
 * Ability to manage (hide/show) button download gpx
 * Ability to show/hide gpx path when more than 2 paths
 * Ability to globally configure default settings: fullscreen, button download, start with profile displayed, add checkbox to display/hide gpx
 * Fixed: some points without elevation value
 * Fixed: button list always displayed when parameter list is false
 * Fixed: move line on profile not visible on little screen
 
### 1.4.2 ###
 * fixed : issue 2 maps when the first floating the second is in stucks
 * fixed : issue no icon on button
 
### 1.4.1 ###
 * fixed map at top (return previous version)
 
### 1.4.0 ###
 * fixed issue with custom field ACF dit not do shortcode
 
### 1.3.9 ###
 * fixed fullscreen button to false not working
 
### 1.3.8 ###
 * fixed display button add marker in event editor
 
### 1.3.7 ###
 * fixed error on activation with PHP5.5
 
### 1.3.6 ###
 * smooth profile when lot of points
 * profile with height difference minimum 40 meters 
 * fixed:  characters not center in buttons list and fullscreen
 * modify track name filter
 
### 1.3.5 ###
 * fixed : too long gpx title
 * fixed : url gpx with special character trigger file not found error
 * disabled : map first center on Paris
 
### 1.3.4 ###
 * fixed : https for tiles
 * fixed : gpx url for https
 
### 1.3.3 ###
 * fixed : On small screens, for three buttons, the elements are not centered
 * fixed : Conflict with the bootstrap themes on hidden elements
 * fixed : list button too big
 
### 1.3.2 ###
 * default value attribute visibility set to always for marker
 * update modules for gulp
 * add icons and create files only with used icons
 * fixed : color of the buttons is applied only to the first one on the large screens
 * fixed : added unwanted tag p arround shortcode
 * fixed : no event on button marker when only markers elements
 * fixed : helper, button add marker no event (same issue than previous)
 * fixed : title height issue with some theme
 * fixed : only four buttons visible on small sreens
 * fixed : mousewheel disabled on element window
 
### 1.3.1 ###
 * fixed : issue color title h1 h2 h3 overwrite general style
 
### 1.3 ###
 * More responsive
 * Mobile friendly
 * More customizable
 
### 1.2.1
 * issue map center on Paris when no title attribute in shortcode lfh-marker
 * issue no map or map center on Paris conflict with AccessPress Instagram Feed
 
### 1.2
 * Add foot for elevation unit
 * issue for popup when click for a marker from list of elements

### 1.1 
 * Add picture for about page in back office
 * Add milles distance unit for profile elevation
 * issue when shortcode [lfh-map ] without attributes
 
### 1.0.4 
 * issue when no  mapquest key. 
 * loading asynchrone js and default intialisation for the helper
 * readme file
 
### 1.0.3 
first stable version


## Frequently Asked Questions  
 

**1. How add separate map for a second gpx file in the same post**

----------------------
You can create a second map with adding shortcode `[lfh-map]` before your gpx file shortcode `[lfh-gpx src="..."][/lfh-gpx]`.

Example:  
```
   [lfh-map]     
   [lfh-gpx src=http://url_of_gpx_file1.gpx ]description[/lfh-gpx]   
   [lfh-map]    
   [lfh-gpx src=http://url_of_gpx_file2.gpx ]description[/lfh-gpx]  
```
  
-----------------------

**2. Where can I create a gpx file ?**

--------------------
You can find a website list for do this in the page [Track drawing websites](http://wiki.openstreetmap.org/wiki/Track_drawing_websites)   
[Openrunner](http://www.openrunner.com/) is the best one for me and the most important: this website automatically add the elevation data needed to create the profile.  
You can find on this site a quantity of already registered tracks.  

You can also try the tools on [www.mygpsfiles.com](http://www.mygpsfiles.com/app/), easier to use

-------------------------
**3. I have a blank page in place of the marker editor**

------------------------------------------
This trouble come from conflict with multiple `x-frame options` directive in your server. Look at whether the plugin succeeded in writing this following lines in the `.htaccess` of your wordpress application if you can:
```	
    # BEGIN Lf-hiker plugin
    <IfModule mod_headers.c>
    Header set X-Frame-Options SAMEORIGIN
    </IfModule>
    # END Lf-hiker plugin 
```
It resolve the trouble for me.   
You can find more information about this trouble in wordpress support [Multiple 'X-Frame-Options' headers with conflicting values](https://wordpress.org/support/topic/multiple-x-frame-options-headers-with-conflicting-values-sameorigin-deny/)

-------------------------
**4. The route is not displayed**

-------------------
If you use WP media library other than the default WP - LF Hiker will not display routes