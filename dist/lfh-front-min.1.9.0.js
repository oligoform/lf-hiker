!function(e,t,n){"use strict";L.AwesomeMarkers={},L.AwesomeMarkers.version="2.0.1",L.AwesomeMarkers.Icon=L.Icon.extend({options:{iconSize:[35,45],iconAnchor:[17,42],popupAnchor:[1,-32],shadowAnchor:[10,12],shadowSize:[36,16],className:"awesome-marker",prefix:"glyphicon",spinClass:"fa-spin",extraClasses:"",icon:"home",markerColor:"blue",iconColor:"white"},initialize:function(e){e=L.Util.setOptions(this,e)},createIcon:function(){var e=t.createElement("div"),n=this.options;return n.icon&&(e.innerHTML=this._createInner()),n.bgPos&&(e.style.backgroundPosition=-n.bgPos.x+"px "+-n.bgPos.y+"px"),this._setIconStyles(e,"icon-"+n.markerColor),e},_createInner:function(){var e,t="",n="",o="",i=this.options;return e=i.icon.slice(0,i.prefix.length+1)===i.prefix+"-"?i.icon:i.prefix+"-"+i.icon,i.spin&&"string"==typeof i.spinClass&&(t=i.spinClass),i.iconColor&&("white"===i.iconColor||"black"===i.iconColor?n="icon-"+i.iconColor:o="style='color: "+i.iconColor+"' "),"<i "+o+"class='"+i.extraClasses+" "+i.prefix+" "+e+" "+t+" "+n+"'></i>"},_setIconStyles:function(e,t){var n,o=this.options,i=L.point(o["shadow"===t?"shadowSize":"iconSize"]);n="shadow"===t?L.point(o.shadowAnchor||o.iconAnchor):L.point(o.iconAnchor),!n&&i&&(n=i.divideBy(2,!0)),e.className="awesome-marker-"+t+" "+o.className,n&&(e.style.marginLeft=-n.x+"px",e.style.marginTop=-n.y+"px"),i&&(e.style.width=i.x+"px",e.style.height=i.y+"px")},createShadow:function(){var e=t.createElement("div");return this._setIconStyles(e,"shadow"),e}}),L.AwesomeMarkers.icon=function(e){return new L.AwesomeMarkers.Icon(e)}}(0,document);var L=L||require("leaflet"),_MAX_POINT_INTERVAL_MS=15e3,_SECOND_IN_MILLIS=1e3,_MINUTE_IN_MILLIS=60*_SECOND_IN_MILLIS,_HOUR_IN_MILLIS=60*_MINUTE_IN_MILLIS,_DAY_IN_MILLIS=24*_HOUR_IN_MILLIS,_DEFAULT_MARKER_OPTS={startIconUrl:"pin-icon-start.png",endIconUrl:"pin-icon-end.png",shadowUrl:lfh.ICON_URL+"icons/pin-shadow.png",wptIconUrls:{"":lfh.ICON_URL+"icons/pin-icon-wpt.png"},iconSize:[26,41],shadowSize:[41,41],iconAnchor:[13,41],shadowAnchor:[10,41],clickable:!1},_DEFAULT_POLYLINE_OPTS={color:"blue"},_DEFAULT_GPX_OPTS={parseElements:["track","route","waypoint"]};L.GPX=L.FeatureGroup.extend({initialize:function(e,t){t.max_point_interval=t.max_point_interval||_MAX_POINT_INTERVAL_MS,t.marker_options=this._merge_objs(_DEFAULT_MARKER_OPTS,t.marker_options||{}),t.polyline_options=this._merge_objs(_DEFAULT_POLYLINE_OPTS,t.polyline_options||{}),t.gpx_options=this._merge_objs(_DEFAULT_GPX_OPTS,t.gpx_options||{}),L.Util.setOptions(this,t),L.GPXTrackIcon=L.Icon.extend({options:t.marker_options}),this._gpx=e,this._layers={},this._info={name:null,length:0,elevation:{gain:0,loss:0,max:0,min:1/0,_points:[]},hr:{avg:0,_total:0,_points:[]},duration:{start:null,end:null,moving:0,total:0}},e&&this._parse(e,t,this.options.async)},get_duration_string:function(e,t){var n="";e>=_DAY_IN_MILLIS&&(n+=Math.floor(e/_DAY_IN_MILLIS)+"d ",e%=_DAY_IN_MILLIS),e>=_HOUR_IN_MILLIS&&(n+=Math.floor(e/_HOUR_IN_MILLIS)+":",e%=_HOUR_IN_MILLIS);var o=Math.floor(e/_MINUTE_IN_MILLIS);e%=_MINUTE_IN_MILLIS,o<10&&(n+="0"),n+=o+"'";var i=Math.floor(e/_SECOND_IN_MILLIS);return e%=_SECOND_IN_MILLIS,i<10&&(n+="0"),n+=i,n+=!t&&e>0?"."+Math.round(1e3*Math.floor(e))/1e3:'"'},to_miles:function(e){return e/1.60934},to_ft:function(e){return 3.28084*e},m_to_km:function(e){return e/1e3},m_to_mi:function(e){return e/1609.34},get_name:function(){return this._info.name},get_desc:function(){return this._info.desc},get_author:function(){return this._info.author},get_copyright:function(){return this._info.copyright},get_distance:function(){return this._info.length},get_distance_imp:function(){return this.to_miles(this.m_to_km(this.get_distance()))},get_start_time:function(){return this._info.duration.start},get_end_time:function(){return this._info.duration.end},get_moving_time:function(){return this._info.duration.moving},get_total_time:function(){return this._info.duration.total},get_moving_pace:function(){return this.get_moving_time()/this.m_to_km(this.get_distance())},get_moving_pace_imp:function(){return this.get_moving_time()/this.get_distance_imp()},get_moving_speed:function(){return this.m_to_km(this.get_distance())/(this.get_moving_time()/36e5)},get_moving_speed_imp:function(){return this.to_miles(this.m_to_km(this.get_distance()))/(this.get_moving_time()/36e5)},get_total_speed:function(){return this.m_to_km(this.get_distance())/(this.get_total_time()/36e5)},get_total_speed_imp:function(){return this.to_miles(this.m_to_km(this.get_distance()))/(this.get_total_time()/36e5)},get_elevation_gain:function(){return this._info.elevation.gain},get_elevation_loss:function(){return this._info.elevation.loss},get_elevation_gain_imp:function(){return this.to_ft(this.get_elevation_gain())},get_elevation_loss_imp:function(){return this.to_ft(this.get_elevation_loss())},get_elevation_data:function(){var e=this;return this._info.elevation._points.map(function(t){return e._prepare_data_point(t,e.m_to_km,null,function(e,t){return null==e||null==t?null:e.toFixed(2)+" km, "+t.toFixed(0)+" m"})})},get_elevation_data_imp:function(){var e=this;return this._info.elevation._points.map(function(t){return e._prepare_data_point(t,e.m_to_mi,e.to_ft,function(e,t){return e.toFixed(2)+" mi, "+t.toFixed(0)+" ft"})})},get_elevation_max:function(){return this._info.elevation.max},get_elevation_min:function(){return this._info.elevation.min},get_elevation_max_imp:function(){return this.to_ft(this.get_elevation_max())},get_elevation_min_imp:function(){return this.to_ft(this.get_elevation_min())},get_average_hr:function(){return this._info.hr.avg},get_heartrate_data:function(){var e=this;return this._info.hr._points.map(function(t){return e._prepare_data_point(t,e.m_to_km,null,function(e,t){return e.toFixed(2)+" km, "+t.toFixed(0)+" bpm"})})},get_heartrate_data_imp:function(){var e=this;return this._info.hr._points.map(function(t){return e._prepare_data_point(t,e.m_to_mi,null,function(e,t){return e.toFixed(2)+" mi, "+t.toFixed(0)+" bpm"})})},get_options:function(){return this.getLayers()[0].getLayers()[0].options},reload:function(){this.clearLayers(),this._parse(this._gpx,this.options,this.options.async)},get_markers:function(){return this._markers},_merge_objs:function(e,t){var n={};for(var o in e)n[o]=e[o];for(var o in t)n[o]=t[o];return n},_prepare_data_point:function(e,t,n,o){var i=[t&&t(e[0])||e[0],n&&n(e[1])||e[1]];return i.push(o&&o(i[0],i[1])||i[0]+": "+i[1]),i},_load_xml:function(e,t,n,o){void 0==o&&(o=this.options.async),void 0==n&&(n=this.options);var i=new window.XMLHttpRequest;i.open("GET",e,o);try{i.overrideMimeType("text/xml")}catch(e){}var r=this;i.onreadystatechange=function(){4==i.readyState&&(200==i.status?t(i.responseXML,n):r.options.isLoaded=!0)},i.send(null)},_parse:function(e,t,n){var o=this,i=function(e,t){var n=o._parse_gpx_data(e,t);if(!n)return void(o.options.isLoaded=!0);o.addLayer(n),o.fire("loaded")};if("<"===e.substr(0,1)){var r=new DOMParser;n?setTimeout(function(){i(r.parseFromString(e,"text/xml"),t)}):i(r.parseFromString(e,"text/xml"),t)}else this._load_xml(e,i,t,n)},_markers:[],_parse_gpx_data:function(e,t){var n,o,i,r=[],a=[],l=t.gpx_options.parseElements;l.indexOf("route")>-1&&a.push(["rte","rtept"]),l.indexOf("track")>-1&&a.push(["trkseg","trkpt"]);var s=e.getElementsByTagName("name");s.length>0&&(this._info.name=s[0].textContent);var c=e.getElementsByTagName("desc");c.length>0&&(this._info.desc=c[0].textContent);var h=e.getElementsByTagName("author");h.length>0&&(this._info.author=h[0].textContent);var f=e.getElementsByTagName("copyright");for(f.length>0&&(this._info.copyright=f[0].textContent),n=0;n<a.length;n++)for(i=e.getElementsByTagName(a[n][0]),o=0;o<i.length;o++){var d=this._parse_trkseg(i[o],e,t,a[n][1]);if(0!==d.length){var u=new L.Polyline(d,t.polyline_options);if(this.fire("addline",{line:u}),r.push(u),t.marker_options.startIcon||t.marker_options.startIconUrl){var _=new L.Marker(d[0],{clickable:t.marker_options.clickable,icon:t.marker_options.startIcon||new L.GPXTrackIcon({iconUrl:t.marker_options.startIconUrl})});this._markers.push(_),this.fire("addpoint",{point:_,point_type:"start"}),r.push(_)}(t.marker_options.endIcon||t.marker_options.endIconUrl)&&(_=new L.Marker(d[d.length-1],{clickable:t.marker_options.clickable,icon:t.marker_options.endIcon||new L.GPXTrackIcon({iconUrl:t.marker_options.endIconUrl})}),this._markers.push(_),this.fire("addpoint",{point:_,point_type:"end"}),r.push(_))}}if(this._info.hr.avg=Math.round(this._info.hr._total/this._info.hr._points.length),l.indexOf("waypoint")>-1)for(i=e.getElementsByTagName("wpt"),o=0;o<i.length;o++){var m=new L.LatLng(i[o].getAttribute("lat"),i[o].getAttribute("lon")),p=i[o].getElementsByTagName("name"),s="";p.length>0&&(s=p[0].textContent);var g=i[o].getElementsByTagName("desc"),c="";g.length>0&&(c=g[0].textContent);var v=i[o].getElementsByTagName("sym"),y="";v.length>0&&(y=v[0].textContent);var x;if(t.marker_options.wptIcons&&t.marker_options.wptIcons[y])x=t.marker_options.wptIcons[y];else{if(!t.marker_options.wptIconUrls||!t.marker_options.wptIconUrls[y]){console.log('No icon or icon URL configured for symbol type "'+y+'"; ignoring waypoint.');continue}x=new L.GPXTrackIcon({iconUrl:t.marker_options.wptIconUrls[y]})}var I=new L.Marker(m,{clickable:!0,title:s,icon:x});I.bindPopup("<b>"+s+"</b>"+(c.length>0?"<br>"+c:"")).openPopup(),this.fire("addpoint",{point:I,point_type:"waypoint"}),r.push(I)}return r.length>1?new L.FeatureGroup(r):1==r.length?r[0]:void 0},_parse_trkseg:function(e,t,n,o){var i=e.getElementsByTagName(o);if(!i.length)return[];for(var r=[],a=null,l=0;l<i.length;l++){var s,c=new L.LatLng(i[l].getAttribute("lat"),i[l].getAttribute("lon"));if(c.meta={time:null,ele:null,hr:null},s=i[l].getElementsByTagName("time"),s.length>0&&(c.meta.time=new Date(Date.parse(s[0].textContent))),s=i[l].getElementsByTagName("ele"),s.length>0&&(c.meta.ele=parseFloat(s[0].textContent)),s=i[l].getElementsByTagNameNS("*","hr"),s.length>0&&(c.meta.hr=parseInt(s[0].textContent),this._info.hr._points.push([this._info.length,c.meta.hr]),this._info.hr._total+=c.meta.hr),c.meta.ele>this._info.elevation.max&&(this._info.elevation.max=c.meta.ele),c.meta.ele<this._info.elevation.min&&(this._info.elevation.min=c.meta.ele),this._info.elevation._points.push([this._info.length,c.meta.ele]),this._info.duration.end=c.meta.time,null!=a){this._info.length+=this._dist3d(a,c);var h=c.meta.ele-a.meta.ele;h>0?this._info.elevation.gain+=h:this._info.elevation.loss+=Math.abs(h),h=Math.abs(c.meta.time-a.meta.time),this._info.duration.total+=h,h<n.max_point_interval&&(this._info.duration.moving+=h)}else this._info.duration.start=c.meta.time;a=c,r.push(c)}return r},_dist2d:function(e,t){var n=this._deg2rad(t.lat-e.lat),o=this._deg2rad(t.lng-e.lng),i=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this._deg2rad(e.lat))*Math.cos(this._deg2rad(t.lat))*Math.sin(o/2)*Math.sin(o/2);return 2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i))*6371e3},_dist3d:function(e,t){var n=this._dist2d(e,t),o=Math.abs(t.meta.ele-e.meta.ele);return Math.sqrt(Math.pow(n,2)+Math.pow(o,2))},_deg2rad:function(e){return e*Math.PI/180}}),"object"==typeof module&&"object"==typeof module.exports?module.exports=L:"function"==typeof define&&define.amd&&define(L),function(){String.prototype.addslashes=function(){return this.replace(/[\\"']/g,"\\$&").replace(/\u0000/g,"\\0")},String.prototype.stripslashes=function(){return this.replace(/\\(.?)/g,function(e,t){switch(t){case"\\":return"\\";case"0":return"\0";case"":return"";default:return t}})},String.prototype.replaceAll=function(e,t){return this.replace(new RegExp(e,"g"),t)},void 0===lfh.Util&&(lfh.Util={}),lfh.Util.step_round=function(e){var t=Math.round(Math.log(e)/Math.log(10)),n=Math.pow(10,t),o=Math.ceil(e/n)*n;return o/2>=e?o/2:o},lfh.ZOOM_LIMIT=11,lfh.ICON_MOVE=L.icon({iconUrl:lfh.ICON_URL+"markers/move.png",iconSize:[15,15],shadowSize:[0,0],iconAnchor:[7,7],shadowAnchor:[7,7],popupAnchor:[7,7]}),lfh.POINT_ICON=L.icon({iconUrl:lfh.ICON_URL+"markers/pointS000063.png",iconSize:[10,10],shadowSize:[0,0],iconAnchor:[5,5],shadowAnchor:[5,5],popupAnchor:[5,5]}),lfh.MINI_POINT_ICON=L.icon({iconUrl:lfh.ICON_URL+"markers/pointS6.png",iconSize:[6,6],shadowSize:[0,0],iconAnchor:[3,3],shadowAnchor:[3,3],popupAnchor:[3,3]}),lfh.WIDTH_LIMIT=620,lfh.HEIGHT=170,lfh.WIDTH=280,lfh.NUMBER_GPX_FOR_CHECK||(lfh.NUMBER_GPX_FOR_CHECK=3),lfh.initialize_map=function(e){"function"!=typeof lfh.data[e]&&(lfh.all[e]=new lfh.Map(e))},lfh.all=new Array,lfh.initialize=function(e){if(e<lfh.data.length){lfh.initialize_map(e);var t=function(){lfh.initialize(e+1)};setTimeout(t,0)}},lfh.count_step=function(e){var t=lfh.treatment_description(e),n=e.querySelector(".lfh-description");return n?(n.innerHTML="",[].forEach.call(t,function(e){n.appendChild(e)}),t.length):0},lfh.treatment_description=function(e){var t=e.querySelectorAll("img");[].forEach.call(t,function(e){e.parentNode.className.indexOf("wp-caption")>=0&&(e.style.maxWidth=lfh.WIDTH-10+"px",e.style.maxHeight=lfh.HEIGHT-60+"px",e.setAttribute("srcset",""),e.parentNode.style.maxWidth=lfh.WIDTH+"px",e.parentNode.style.maxHeight=lfh.HEIGHT+"px",e.parentNode.style.width=lfh.WIDTH+"px",e.parentNode.style.height=lfh.HEIGHT+"px"),"p"===e.parentNode.tagName.toLowerCase()&&e.parentNode.parentNode.insertBefore(e,e.parentNode)});var n=e.querySelector(".lfh-description");return null===n?[]:lfh.treatment_node(n)},lfh.treatment_node=function(e){var t=e.childNodes,n=new Array,o="scelerisque massa pretium sed. Vivamus est ".length,i=document.createElement("div"),r=0;return[].forEach.call(t,function(e){switch(e.nodeType){case Node.ELEMENT_NODE:switch(e.tagName.toLowerCase()){case"h1":case"h2":case"h3":case"h4":case"h5":var t=document.createElement("h5");t.innerHTML=e.textContent,r+3>13&&(n.push(i),i=document.createElement("div"),r=0),i.appendChild(t),r+=2;break;case"a":case"span":if(e.textContent.trim().length>0){var t=e.textContent.trim().length/o;r+a>13&&(n.push(i),i=document.createElement("div"),r=0),i.appendChild(e.cloneNode(!0)),r+=a}break;case"p":if(e.textContent.trim().length>0){var a=4+e.textContent.trim().length/o;r+a>13&&(n.push(i),i=document.createElement("div"),r=0),i.appendChild(e.cloneNode(!0)),r+=a}break;case"img":r>0&&(n.push(i),i=document.createElement("div"),r=0);var l=document.createElement("div");l.appendChild(e.cloneNode(!0)),n.push(l);break;case"ul":case"ol":var a=0,s=e.querySelectorAll("li");[].forEach.call(s,function(e){a+=1+e.textContent.trim().length/o}),r+a>13&&r>0&&(n.push(i),i=document.createElement("div"),r=0),i.appendChild(e.cloneNode(!0)),r+=a;break;case"div":r>0&&n.push(i);var l=e.cloneNode(!0);n.push(l),i=document.createElement("div"),r=0}break;case Node.TEXT_NODE:if(e.nodeValue.trim().length>0){var a=e.nodeValue.trim().length/o;r+a>13&&(n.push(i),i=document.createElement("div"),r=0),i.appendChild(e.cloneNode(!0)),r+=a}}}),r>0&&n.push(i),n},lfh.ResetControl=L.Control.extend({options:{position:"topleft"},_center:null,_zoom:13,initialize:function(e,t){this._center=e,this._zoom=t},onAdd:function(e){var t=L.DomUtil.create("div","leaflet-bar leaflet-control lfh-control-refresh lfhicon lfhicon-reset"),n=this._center,o=this._zoom;return t.onclick=function(){e.setView(n,o)},t}}),lfh.TopControl=L.Control.extend({options:{position:"topright"},_fullscreen:!0,_list:!0,_selected:null,initialize:function(e,t){this._fullscreen=e.fullscreen,this._list=e.list,this._index=e.i,this._selected=t},onAdd:function(e){var t=L.DomUtil.create("div","lfh-container-fullscreen");if(this._fullscreen){var n=L.DomUtil.create("div","leaflet-bar leaflet-control lfh-control-fullscreen");t.appendChild(n),n.onclick=function(){var t=e._container.id,n=L.DomUtil.get("lfh-fade"),o=L.DomUtil.get(t+"-fadable");this.className.indexOf("actived")>=0?(L.DomUtil.get(t+"-skin").appendChild(o),this.className=this.className.replace(" actived",""),n.className=n.className.replace(" actived",""),e._container.style.height=e._container.h0,e.options.mousewheel||e.scrollWheelZoom.disable()):(n.appendChild(o),this.className+=" actived",n.className=n.className+" actived",e.scrollWheelZoom.enable(),e._container.h0=e._container.style.height,e._container.style.height="100%"),lfh.resize_all_map()}}if(this._list)var o=L.DomUtil.create("div","leaflet-bar leaflet-control lfh-control-list");else var o=L.DomUtil.create("div","leaflet-bar leaflet-control lfh-control-list lfh-hidden");t.appendChild(o);new lfh.Link(e,o,"lfh-list-"+this._index,this._selected,null,null,null,null);return t}}),lfh.resize_content=function(e){var t=document.querySelector("#"+e.id+"-data"),n=t.offsetHeight;if(!(e.parentNode.parentNode.className.indexOf("lfh-min")<0)){n=220;var o=t.querySelectorAll(".lfh-section.lfh-hidden");return void[].forEach.call(o,function(e){var t=e.className;t.indexOf("disabled")>=0||t.indexOf("lfh-hidden")>=0&&(e.className=t.replaceAll(" lfh-hidden",""))})}n-=70;for(var i=t.getElementsByClassName("lfh-element"),r=0;r<i.length;r++)i.item(r).style.maxHeight=n+"px",i.item(r).querySelector(".lfh-element-content").style.maxHeight=n-40+"px"},lfh.map_resize=function(e){var t=e.getContainer().offsetWidth,n=e.getContainer().parentNode.parentNode;if(t<=lfh.WIDTH_LIMIT)n.className+=" lfh-min",_large=!1;else if(t>lfh.WIDTH_LIMIT){var o=n.className;n.className=o.replaceAll(" lfh-min",""),_large=!0}if("lfh-fade"==e.getContainer().parentNode.parentNode.id)if(_large)e.getContainer().style.height="100%";else{var i=document.querySelector(".lfh-nav");e.getContainer().style.height=n.offsetHeight-i.offsetHeight+2+"px"}return e.invalidateSize(),_large},lfh.reset_all_map=function(){[].forEach.call(lfh.all,function(e){e.reset()})},lfh.resize_all_map=function(){[].forEach.call(lfh.all,function(e){lfh.map_resize(e)})},L.DomEvent.addListener(window,"resize",function(e){lfh.resize_all_map()}),lfh.handle_tab_event=function(){var e=document.querySelectorAll("[role='tab'], [data-tab]");[].forEach.call(e,function(e){L.DomEvent.addListener(e,"click",function(e){setTimeout(lfh.reset_all_map,1e3)})})},lfh.toggle_next=function(e,t,n){if(e){var o=e.step,i=o+t;e.step=i,e.className=e.className.replace("step"+o,"step"+i),e.step_max<=e.step+1?document.querySelector("#"+n+"-nav .lfh-next").style.display="none":document.querySelector("#"+n+"-nav .lfh-next").style.display="block"}},lfh.Selected=function(e,t,n){this.map_id=e;var o=n,t=t;this.id=null,this.layer=null,this.dom=null,this.title=document.querySelector("#"+e+"-data div.lfh-nav .lfh-trackname").textContent,this.close=function(n){if(document.querySelector("#"+this.map_id+"-nav .lfh-next").style.display="none",null!=this.id){var i=this.dom.className;if(this.dom.className=i+" lfh-hidden",this.layer instanceof L.GPX){var r=this.layer.get_options();this.layer.setStyle({color:r.realColor}),t.removeLayer(o)}}var a=document.querySelector("#"+e+"-fadable .lfh-list");lfh.toggle_next(a,0,this.map_id)},this.set=function(e){for(var t in e)this[t]=e[t]}},L.Map.include({_center0:[0,0],_zoom0:2,_bounds:null,reset:function(){this.invalidateSize(),null==this._bounds?this.setView(this._center0,this._zoom0):this.fitBounds(this._bounds)}}),lfh.Map=function(t){function n(e){"mapquest"==e?MQ.mapLayer().addTo(m):L.tileLayer(lfh.tiles[e].url,{attribution:lfh.tiles[e].attribution,minZoom:1,maxZoom:lfh.tiles[e].max_zoom}).addTo(m)}function o(e){m.addControl(new lfh.TopControl(e,b)),!C&&e.reset&&m.addControl(new lfh.ResetControl(x,I))}function i(){w=L.layerGroup(),I>=N&&w.addTo(m);for(var e in v.markers)"function"!=typeof v.markers[e]&&c(e)}function r(){for(var e in v.gpx)"function"!=typeof v.gpx[t]&&u(e)}function a(){m.on("zoomend",function(){m.getZoom()<N?this.hasLayer(w)&&this.removeLayer(w):this.hasLayer(w)||w.addTo(this)}),m.on("resize",function(){var e=lfh.map_resize(this);if(lfh.resize_content(this.getContainer()),!e&&b.id&&b.id.indexOf("lfh-list")>=0){var t=b.layer,n=document.createEvent("MouseEvents");n.initEvent("click",!0,!0),t.dispatchEvent(n)}if(null==b.dom&&!e){var o=document.querySelector("#"+p+"-fadable .lfh-list");lfh.toggle_next(o,0,p)}})}function l(){var e=document.querySelector("#"+p+"-nav .lfh-close");L.DomEvent.addListener(e,"click",function(e){b.layer.fire("click")});var t=document.querySelector("#"+p+"-nav .lfh-back");L.DomEvent.addListener(t,"click",function(e){if(b.dom)lfh.toggle_next(b.dom,-1,p);else{var t=m.getContainer().parentNode.querySelector(".lfh-list");lfh.toggle_next(t,-1,p)}});var n=document.querySelector("#"+p+"-nav .lfh-next");L.DomEvent.addListener(n,"click",function(e){if(b.dom)lfh.toggle_next(b.dom,1,p);else{var t=m.getContainer().parentNode.querySelector(".lfh-list");lfh.toggle_next(t,1,p)}})}function s(e){M=L.marker(e,{icon:lfh.ICON_MOVE})}function c(e){var t=v.markers[e],n="marker-"+g+"-"+e;return E[e]=L.marker([t.lat,t.lng],{elem_id:n,icon:L.AwesomeMarkers.icon({icon:t.icon,prefix:"lfhicon",markerColor:t.color}),title:t.title.stripslashes(),visibility:"zoom"}),t.popup=t.popup+"",t.popup.length>0&&E[e].bindPopup(t.popup.stripslashes()),"zoom"==t.visibility?w.addLayer(E[e]):E[e].addTo(m),T.push([t.lat,t.lng]),new lfh.Link(m,E[e],n,b,null)}function h(e,t){var n=document.createElement("div");n.className="lfh-button lfhicon";var o=document.createElement("span");o.textContent="  "+e.options.title,n.appendChild(o),t.appendChild(n),L.DomEvent.addListener(o,"click",function(t){e.fire("click"),t.stopPropagation()})}function f(e,t,n){var o=document.createElement("div");o.className="lfh-button lfhicon";var i=document.createElement("span");if(n>lfh.NUMBER_GPX_FOR_CHECK&&(i.className="lfh-short-button"),i.textContent="  "+document.querySelector("#"+e.options.elem_id+" span.lfh-trackname").textContent,o.appendChild(i),n>lfh.NUMBER_GPX_FOR_CHECK){var r=document.createElement("input");r.setAttribute("type","checkbox"),r.checked=!0,L.DomEvent.addListener(r,"change",function(t){e.get_markers();this.checked?e.addTo(m):m.removeLayer(e),t.stopPropagation()}),o.appendChild(r)}t.insertBefore(o,t.firstChild),L.DomEvent.addListener(i,"click",function(t){e.fire("click"),t.stopPropagation()})}function d(e){var t=1;for(var n in v.gpx)"function"!=typeof v.gpx[n]&&(t*=void 0!==S[n]&&S[n].options.isLoaded);t?(T.length>0&&(m._bounds=T,m.fitBounds(T)),x=m.getCenter(),I=m.getZoom(),this.center=x,this.zoom=I,lfh.tiles[v.map.tile].max_zoom<I&&(I=lfh.tiles[v.map.tile].max_zoom,m.setZoom(I)),e&&m.addControl(new lfh.ResetControl(x,I)),lfh.resize_content(m.getContainer()),C=!0,setTimeout(_,0)):setTimeout(function(){d(e)},500)}function u(t){var n="track-"+g+"-"+t;S[t]=new L.GPX(v.gpx[t].src,{async:!0,isLoaded:!1,elem_id:n,marker_options:{startIcon:v.gpx[t].width>2?lfh.POINT_ICON:lfh.MINI_POINT_ICON,endIcon:v.gpx[t].width>2?lfh.POINT_ICON:lfh.MINI_POINT_ICON}}).on("loaded",function(e){if(e.target.options.isLoaded=!0,e.target.setStyle({color:v.gpx[t].color,weight:v.gpx[t].width}),C){var o=e.target.getBounds();T.push([o.getNorth(),o.getEast()]),T.push([o.getSouth(),o.getWest()])}new lfh.Link(m,e.target,n,b,M,v.gpx[t].unit,v.gpx[t].unit_h,v.gpx[t].step_min)}).on("failed",function(){e.target.options.isLoaded=!0,console.log("failed")}).addTo(m)}function _(){var e=0,t=0,n=document.querySelector("#lfh-list-"+g),o=n.querySelector("div.lfh-description"),i=null;[].forEach.call(S,function(n){e%3==0&&(i=document.createElement("div"),i.className="lfh-content",o.appendChild(i),t++),f(n,i,S.length),e++}),[].forEach.call(E,function(n){e%3==0&&(i=document.createElement("div"),i.className="lfh-content",o.appendChild(i),t++),h(n,i),e++}),n.step=0,n.step_max=t,1==n.step_max&&(n.className=n.className+" lfh-small-content"),lfh.toggle_next(n,0,p),S.length>0&&y&&S[1].fire("click")}var m=null,p="lfh-"+t,g=t,v=lfh.data[t],y=!1,x=[0,0],I=13,N=lfh.ZOOM_LIMIT,C=!0,k=!1,S=new Array,E=new Array,M=null,w=null,T=new Array,b=null;return function(e){v=lfh.data[e];var t=lfh.data[e].map;y=t.open,t.i=e,C=t.autocenter,k=t.list,x=[t.lat,t.lng],I=Math.min(t.zoom,lfh.tiles[t.tile].max_zoom),m=L.map(p,{dragging:!L.Browser.mobile,tap:!L.Browser.mobile}),m._center0=x,m._zoom0=I,C||m.setView(x,I),n(t.tile),m.options.mousewheel=t.mousewheel,t.mousewheel||m.scrollWheelZoom.disable(),m.touchZoom.enable(),s(x),b=new lfh.Selected(p,m,M),i(),r(),a(),d(t.reset),l(),o(t),lfh.map_resize(m),e==lfh.data.length-1&&lfh.handle_tab_event()}(t),m},lfh.Link=function(e,t,n,o,i,r,a,l){function s(t){if(p.close(t),null==p.id||p.id!=d){if(_.className=_.className.replaceAll(" lfh-hidden",""),u instanceof L.GPX){var n=u.get_options();u.setStyle({realColor:n.color,color:lfh.SELECTED_COLOR}),g.addTo(e)}u instanceof L.Marker&&u.openPopup(),p.set({id:d,layer:u,dom:_}),c(),lfh.toggle_next(p.dom,0,m.getContainer().id)}else p.set({id:null,layer:null,dom:null}),u instanceof L.Marker&&u.closePopup(),h()}function c(){var e=document.querySelector("#"+m.getContainer().id+"-data div.lfh-nav");e.querySelector(".lfh-trackname").textContent=p.dom.querySelector(".lfh-trackname").textContent;var t=e.querySelector(".lfh-gpx-file");if(null!=t&&t.parentNode.removeChild(t),p.layer instanceof L.GPX&&p.dom.querySelector(".lfh-gpx-file")){var t=p.dom.querySelector(".lfh-gpx-file").cloneNode(!0);e.querySelector(".lfh-title").appendChild(t)}}function h(){var e=document.querySelector("#"+m.getContainer().id+"-data div.lfh-nav");e.querySelector(".lfh-trackname").textContent=p.title;var t=e.querySelector(".lfh-gpx-file");null!=t&&t.parentNode.removeChild(t)}function f(){var e=_.querySelectorAll(".lfh-element .lfh-header");[].forEach.call(e,function(e){L.DomEvent.addListener(e,"click",function(t){t.preventDefault();var n=e.parentNode,o=n.className;o.indexOf("disabled")>=0||(o.indexOf("lfh-hidden")>=0?n.className=o.replaceAll(" lfh-hidden",""):n.className+=" lfh-hidden",t.stopPropagation())})}),L.DomEvent.addListener(_,"mousemove",function(e){e.stopPropagation()}),L.DomEvent.addListener(_,"mousewheel",function(e){e.stopPropagation()});var t=_.querySelector(".lfh-close");u instanceof L.Layer?(u.on("click",function(e){s(!1)}),L.DomEvent.addListener(t,"click",function(e){u.fire("click")})):(L.DomEvent.addListener(u,"click",function(e){s(!1)}),L.DomEvent.addListener(t,"click",function(e){s(!0)}))}var d=n,u=t,_=L.DomUtil.get(n),m=e,p=o,g=i,v=r,y=a,x=l;return function(){if(void 0===u.options&&(u.options={}),u.options.elem_id=n,null!=_){if(_.step=0,_.className.indexOf("lfh-list")<0){var e=document.querySelector("#"+m.getContainer().id+"-data"),t=e.querySelector(".lfh-nav");e.insertBefore(_,t),_.step_max=lfh.count_step(_)}else _.step_max=0;u instanceof L.GPX&&(_.step_max+=2),1==_.step_max&&_.className.indexOf("lfh-list")<0&&(_.className=_.className+" lfh-small-content"),f(),u instanceof L.GPX&&new lfh.Profile(m,u,_,g,v,y,x)}}(),{dom:_,layer:u,id:d}},lfh.Profile=function(e,t,n,o,i,r,a){function l(e){return 220*e/(M*p)}function s(e){return 200-40*(e/g-b)/w}function c(){for(var e="M ",t=parseInt(N.length/150)+1,n=N.length,o=0;null===N[o][1];)o++;e+=Math.round(l(N[o][0]))+","+Math.round(s(N[o][1]))+" L ";for(var i=o;i<n-t;i+=t){for(var r=0,a=0,c=0;c<t&&i+c<n;c++){var h=0;null!=N[i+c][1]&&(r+=l(N[i+c][0]),a+=s(N[i+c][1]),h++)}0!=h&&(e+=Math.round(r/t)+","+Math.round(a/t)+" L ")}return null!=N[n-1][1]&&(e+=l(N[n-1][0])+","+s(N[n-1][1])),e}function h(){if(C){var e=c();x.querySelector(".lfh-profile-line").setAttribute("d",e);for(var t=1;t<5;t++)x.querySelector(".h"+t).textContent=b+t*w;for(var t=1;t<4;t++){var n=x.querySelector(".v"+t),o=Math.round(t*O*220/M);if(n.setAttribute("transform","translate("+o+", 0)"),o>220)n.setAttribute("stroke-opacity",0),n.querySelector("text").textContent="";else{var i=1;O<1&&(i=100),n.querySelector("text").textContent=Math.round(t*O*i)/i}}x.querySelector(".lfh-gpx-min-elevation").textContent=Math.round(y.get_elevation_min()/g)+" "+lfh.HEIGHT_UNIT[_].code,x.querySelector(".lfh-gpx-max-elevation").textContent=Math.round(y.get_elevation_max()/g)+" "+lfh.HEIGHT_UNIT[_].code,x.querySelector(".lfh-gpx-elevation-gain").textContent=Math.round(y.get_elevation_gain()/g)+" "+lfh.HEIGHT_UNIT[_].code,x.querySelector(".lfh-gpx-elevation-loss").textContent=Math.round(y.get_elevation_loss()/g)+" "+lfh.HEIGHT_UNIT[_].code,L.DomEvent.addListener(x.querySelector("svg"),"click mousemove",function(e){f(e)},!1),x.querySelector("svg").addEventListener("touchmove",function(e){f(e.touches[0])})}else{x.querySelector("svg").parentNode.removeChild(x.querySelector("svg"));var r=y.get_total_time();r&&(x.querySelector(".lfh-gpx-duration").textContent=y.get_duration_string(r))}x.querySelector(".lfh-gpx-name").textContent=y.get_name(),x.querySelector(".lfh-gpx-distance").textContent=(Math.round(y.get_distance()/(100*p))/10).toString().replace(".",",")+" "+lfh.DISTANCE_UNIT[u].code}function f(e){var t=x.querySelector("svg"),n=t.getBoundingClientRect(),o=290/n.width,i=e.pageX-n.left-window.pageXOffset;i=i*o-50,i<0&&(i=0),i>220&&(i=220),i=parseInt(i),x.querySelector(".lfh-move-line").setAttribute("transform","translate("+i+",0)");var r=i*M/220,n=d(r);v.setLatLng(I[n])}function d(e){for(var e=e*p,t=!1,n=0,o=N.length-1;!t&&o-n>1;){var i=Math.ceil((n+o)/2);t=N[i]==e,N[i][0]>e?o=i:n=i}return n}var u=i,_=r,m=a;if("km"==u)var p=1;else var p=1.60934;if("m"==_)var g=1;else var g=.3048;var v=o,y=t,x=n,I=y.getLayers()[0].getLayers()[0].getLatLngs(),N=y.get_elevation_data();if(0!=y.get_elevation_max()){for(var C=!0,k=y.get_elevation_max()/g,S=y.get_elevation_min()/g,E=N.length-1;E>0&&null===N[E][1];)E--;var M=N[E][0]/p,w=lfh.Util.step_round((k-S)/3.5);w<m/g&&(w=lfh.Util.step_round(m/g),_middle=Math.ceil((k+S)/2),k=_middle+2*w);var T=Math.ceil(k/w)*w,b=T-5*w,O=lfh.Util.step_round(M/4)}else var C=!1;return h(),{draw:h}},lfh.initialize(1)}();