/**
 * @license RequireJS domReady 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */

/* ========================================================================
 * Bootstrap: tab.js v3.0.3
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

timely.define("domReady",[],function(){function u(e){var t;for(t=0;t<e.length;t++)e[t](n)}function a(){var e=r;t&&e.length&&(r=[],u(e))}function f(){t||(t=!0,o&&clearInterval(o),a())}function c(e){return t?e(n):r.push(e),c}var e=typeof window!="undefined"&&window.document,t=!e,n=e?document:null,r=[],i,s,o;if(e){if(document.addEventListener)document.addEventListener("DOMContentLoaded",f,!1),window.addEventListener("load",f,!1);else if(window.attachEvent){window.attachEvent("onload",f),s=document.createElement("div");try{i=window.frameElement===null}catch(l){}s.doScroll&&i&&window.external&&(o=setInterval(function(){try{s.doScroll(),f()}catch(e){}},30))}(document.readyState==="complete"||document.readyState==="interactive")&&f()}return c.version="2.0.0",c.load=function(e,t,n,r){r.isBuild?n(null):c(n)},c}),timely.define("external_libs/bootstrap/tab",["jquery_timely"],function(e){var t=function(t){this.element=e(t)};t.prototype.show=function(){var t=this.element,n=t.closest("ul:not(.ai1ec-dropdown-menu)"),r=t.data("target");r||(r=t.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));if(t.parent("li").hasClass("ai1ec-active"))return;var i=n.find(".ai1ec-active:last a")[0],s=e.Event("show.bs.tab",{relatedTarget:i});t.trigger(s);if(s.isDefaultPrevented())return;var o=e(r);this.activate(t.parent("li"),n),this.activate(o,o.parent(),function(){t.trigger({type:"shown.bs.tab",relatedTarget:i})})},t.prototype.activate=function(t,n,r){function o(){i.removeClass("ai1ec-active").find("> .ai1ec-dropdown-menu > .ai1ec-active").removeClass("ai1ec-active"),t.addClass("ai1ec-active"),s?(t[0].offsetWidth,t.addClass("ai1ec-in")):t.removeClass("ai1ec-fade"),t.parent(".ai1ec-dropdown-menu")&&t.closest("li.ai1ec-dropdown").addClass("ai1ec-active"),r&&r()}var i=n.find("> .ai1ec-active"),s=r&&e.support.transition&&i.hasClass("ai1ec-fade");s?i.one(e.support.transition.end,o).emulateTransitionEnd(150):o(),i.removeClass("ai1ec-in")};var n=e.fn.tab;e.fn.tab=function(n){return this.each(function(){var r=e(this),i=r.data("bs.tab");i||r.data("bs.tab",i=new t(this)),typeof n=="string"&&i[n]()})},e.fn.tab.Constructor=t,e.fn.tab.noConflict=function(){return e.fn.tab=n,this},e(document).on("click.bs.tab.data-api",'[data-toggle="ai1ec-tab"], [data-toggle="ai1ec-pill"]',function(t){t.preventDefault(),e(this).tab("show")})}),timely.define("libs/utils",["jquery_timely","external_libs/bootstrap/tab"],function(e){var t=function(){return{is_float:function(e){return!isNaN(parseFloat(e))},is_valid_coordinate:function(e,t){var n=t?90:180;return this.is_float(e)&&Math.abs(e)<n},convert_comma_to_dot:function(e){return e.replace(",",".")},field_has_value:function(t){var n="#"+t,r=e(n),i=!1;return r.length===1&&(i=e.trim(r.val())!==""),i},make_alert:function(t,n,r){var i="";switch(n){case"error":i="ai1ec-alert ai1ec-alert-danger";break;case"success":i="ai1ec-alert ai1ec-alert-success";break;default:i="ai1ec-alert ai1ec-alert-info"}var s=e("<div />",{"class":i,html:t});if(!r){var o=e("<button>",{type:"button","class":"ai1ec-close","data-dismiss":"ai1ec-alert",text:"×"});s.prepend(o)}return s},alert:function(t,n){$document=e(document.body),$one_shot_popup=e("#ai1ec-show-popup-alert",$document),0===$one_shot_popup.length&&($div=e('<div class="timely"/>'),$div.html('<div id="ai1ec-show-popup-alert" class="timely ai1ec-modal ai1ec-fade"role="dialog" aria-hidden="true" style="display: none;"><div class="ai1ec-modal-dialog"><div class="ai1ec-modal-content"><div class="ai1ec-modal-header"><button type="button" class="ai1ec-close"data-dismiss="ai1ec-modal" aria-hidden="true">×</button><h4 class="ai1ec-modal-title" id="ai1ec-one-shot-popup-title"></h4></div><div class="ai1ec-modal-body"><p id="ai1ec-one-shot-popup-text"></p></div></div></div></div>').appendTo($document),$one_shot_popup=e("#ai1ec-show-popup-alert",$document));var r=e(this).closest("a");e("#ai1ec-one-shot-popup-title",$one_shot_popup).text(t),e("#ai1ec-one-shot-popup-text",$one_shot_popup).text(n),$one_shot_popup.modal("show")},make_popup_content_link:function(t,n,r){return'<div class="timely"><a href="#" class="timely ai1ec-link"data-toggle="ai1ec-modal" data-target="#popupMoreInfoInline">'+e("<div />").text(t).html()+"</a>"+'<div id="popupMoreInfoInline" class="timely ai1ec-modal ai1ec-fade"'+'role="dialog" aria-hidden="true" style="display: none;">'+'<div class="ai1ec-modal-dialog">'+'<div class="ai1ec-modal-content">'+'<div class="ai1ec-modal-header">'+'<button type="button" class="ai1ec-close"'+'data-dismiss="ai1ec-modal" aria-hidden="true">×</button>'+"<strong>"+e("<div />").text(n).html()+"</strong>"+"</div>"+'<div class="ai1ec-modal-body ai1ec-clearfix">'+'<textarea class="ai1ec-form-control code" rows="8" cols="40">'+e("<div />").text(r).html()+"</textarea>"+"</div>"+"</div>"+"</div>"+"</div>"+"</div>"},get_ajax_url:function(){return typeof window.ajaxurl=="undefined"?"http://localhost/wordpress/wp-admin/admin-ajax.php":window.ajaxurl},isUrl:function(e){var t=/(http|https|webcal):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)},isValidUrl:function(e,t){if(!0===t){var n=/^(http|https):\/\//;return n.test(e)}return!0},isValidEmail:function(e){var t=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)},activate_saved_tab_on_page_load:function(t){null===t||undefined===t?e("ul.ai1ec-nav a:first").tab("show"):e("ul.ai1ec-nav a[href="+t+"]").tab("show")},add_query_arg:function(e,t){if("string"!=typeof e)return!1;var n=e.indexOf("?")===-1?"?":"&";return-1!==e.indexOf(n+t[0]+"=")?e:e+n+t[0]+"="+t[1]},create_ai1ec_to_send:function(t){var n=e(t),r=[],i=["action","cat_ids","auth_ids","tag_ids","exact_date","display_filters","no_navigation","events_limit"];return n.each(function(){e.each(this.attributes,function(){this.specified&&this.value&&this.name.match(/^data-/)&&(-1<e.inArray(this.name.replace(/^data\-/,""),i)||this.name.match(/_ids$/))&&r.push(this.name.replace(/^data\-/,"")+"~"+this.value)})}),r.join("|")},init_autoselect:function(){e(document).on("click",".ai1ec-autoselect",function(t){if(e(this).data("clicked")&&t.originalEvent.detail<2)return;e(this).data("clicked",!0);var n;document.body.createTextRange?(n=document.body.createTextRange(),n.moveToElementText(this),n.select()):window.getSelection&&(selection=window.getSelection(),n=document.createRange(),n.selectNodeContents(this),selection.removeAllRanges(),selection.addRange(n))})}}}();return t}),timely.define("external_libs/bootstrap_colorpicker",["jquery_timely"],function(e){var t=function(e){this.value={h:1,s:1,b:1,a:1},this.setColor(e)};t.prototype={constructor:t,setColor:function(t){t=t.toLowerCase();var n=this;e.each(r.stringParsers,function(e,i){var s=i.re.exec(t),o=s&&i.parse(s),u=i.space||"rgba";if(o)return u=="hsla"?n.value=r.RGBtoHSB.apply(null,r.HSLtoRGB.apply(null,o)):n.value=r.RGBtoHSB.apply(null,o),!1})},setHue:function(e){this.value.h=1-e},setSaturation:function(e){this.value.s=e},setLightness:function(e){this.value.b=1-e},setAlpha:function(e){this.value.a=parseInt((1-e)*100,10)/100},toRGB:function(e,t,n,r){e||(e=this.value.h,t=this.value.s,n=this.value.b),e*=360;var i,s,o,u,a;return e=e%360/60,a=n*t,u=a*(1-Math.abs(e%2-1)),i=s=o=n-a,e=~~e,i+=[a,u,0,0,u,a][e],s+=[u,a,a,u,0,0][e],o+=[0,0,u,a,a,u][e],{r:Math.round(i*255),g:Math.round(s*255),b:Math.round(o*255),a:r||this.value.a}},toHex:function(e,t,n,r){var i=this.toRGB(e,t,n,r);return"#"+(1<<24|parseInt(i.r)<<16|parseInt(i.g)<<8|parseInt(i.b)).toString(16).substr(1)},toHSL:function(e,t,n,r){e||(e=this.value.h,t=this.value.s,n=this.value.b);var i=e,s=(2-t)*n,o=t*n;return s>0&&s<=1?o/=s:o/=2-s,s/=2,o>1&&(o=1),{h:i,s:o,l:s,a:r||this.value.a}}};var n=function(t,n){this.element=e(t);var i=n.format||this.element.data("color-format")||"hex";this.format=r.translateFormats[i],this.isInput=this.element.is("input"),this.component=this.element.is(".color")?this.element.find(".ai1ec-input-group-addon"):!1,this.picker=e(r.template).appendTo("body").on("mousedown",e.proxy(this.mousedown,this)),this.isInput?this.element.on({focus:e.proxy(this.show,this),keyup:e.proxy(this.update,this)}):this.component?this.component.on({click:e.proxy(this.show,this)}):this.element.on({click:e.proxy(this.show,this)});if(i=="rgba"||i=="hsla")this.picker.addClass("alpha"),this.alpha=this.picker.find(".colorpicker-alpha")[0].style;this.component?(this.picker.find(".colorpicker-color").hide(),this.preview=this.element.find("i")[0].style):this.preview=this.picker.find("div:last")[0].style,this.base=this.picker.find("div:first")[0].style,this.update()};n.prototype={constructor:n,show:function(t){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.place(),e(window).on("resize",e.proxy(this.place,this)),this.isInput||t&&(t.stopPropagation(),t.preventDefault()),e(document).on({mousedown:e.proxy(this.hide,this)}),this.element.trigger({type:"show",color:this.color})},update:function(){this.color=new t(this.isInput?this.element.prop("value"):this.element.data("color")),this.picker.find("i").eq(0).css({left:this.color.value.s*100,top:100-this.color.value.b*100}).end().eq(1).css("top",100*(1-this.color.value.h)).end().eq(2).css("top",100*(1-this.color.value.a)),this.previewColor()},hide:function(){this.picker.hide(),e(window).off("resize",this.place),this.isInput?this.element.prop("value",this.format.call(this)):(e(document).off({mousedown:this.hide}),this.component&&this.element.find("input").prop("value",this.format.call(this)),this.element.data("color",this.format.call(this))),this.element.trigger({type:"hide",color:this.color})},place:function(){var e=this.component?this.component.offset():this.element.offset();this.picker.css({top:e.top+this.height,left:e.left})},previewColor:function(){this.preview.backgroundColor=this.format.call(this),this.base.backgroundColor=this.color.toHex(this.color.value.h,1,1,1),this.alpha&&(this.alpha.backgroundColor=this.color.toHex())},pointer:null,slider:null,mousedown:function(t){t.stopPropagation(),t.preventDefault();var n=e(t.target),i=n.closest("div");if(!i.is(".colorpicker")){i.is(".colorpicker-saturation")?this.slider=e.extend({},r.sliders.saturation):i.is(".colorpicker-hue")?this.slider=e.extend({},r.sliders.hue):i.is(".colorpicker-alpha")&&(this.slider=e.extend({},r.sliders.alpha));var s=i.offset();this.slider.knob=i.find("i")[0].style,this.slider.left=t.pageX-s.left,this.slider.top=t.pageY-s.top,this.pointer={left:t.pageX,top:t.pageY},e(document).on({mousemove:e.proxy(this.mousemove,this),mouseup:e.proxy(this.mouseup,this)}).trigger("mousemove")}return!1},mousemove:function(e){e.stopPropagation(),e.preventDefault();var t=Math.max(0,Math.min(this.slider.maxLeft,this.slider.left+((e.pageX||this.pointer.left)-this.pointer.left))),n=Math.max(0,Math.min(this.slider.maxTop,this.slider.top+((e.pageY||this.pointer.top)-this.pointer.top)));return this.slider.knob.left=t+"px",this.slider.knob.top=n+"px",this.slider.callLeft&&this.color[this.slider.callLeft].call(this.color,t/100),this.slider.callTop&&this.color[this.slider.callTop].call(this.color,n/100),this.previewColor(),this.element.trigger({type:"changeColor",color:this.color}),!1},mouseup:function(t){return t.stopPropagation(),t.preventDefault(),e(document).off({mousemove:this.mousemove,mouseup:this.mouseup}),!1}},e.fn.colorpicker=function(t){return this.each(function(){var r=e(this),i=r.data("colorpicker"),s=typeof t=="object"&&t;i||r.data("colorpicker",i=new n(this,e.extend({},e.fn.colorpicker.defaults,s))),typeof t=="string"&&i[t]()})},e.fn.colorpicker.defaults={},e.fn.colorpicker.Constructor=n;var r={translateFormats:{rgb:function(){var e=this.color.toRGB();return"rgb("+e.r+","+e.g+","+e.b+")"},rgba:function(){var e=this.color.toRGB();return"rgba("+e.r+","+e.g+","+e.b+","+e.a+")"},hsl:function(){var e=this.color.toHSL();return"hsl("+Math.round(e.h*360)+","+Math.round(e.s*100)+"%,"+Math.round(e.l*100)+"%)"},hsla:function(){var e=this.color.toHSL();return"hsla("+Math.round(e.h*360)+","+Math.round(e.s*100)+"%,"+Math.round(e.l*100)+"%,"+e.a+")"},hex:function(){return this.color.toHex()}},sliders:{saturation:{maxLeft:100,maxTop:100,callLeft:"setSaturation",callTop:"setLightness"},hue:{maxLeft:0,maxTop:100,callLeft:!1,callTop:"setHue"},alpha:{maxLeft:0,maxTop:100,callLeft:!1,callTop:"setAlpha"}},RGBtoHSB:function(e,t,n,r){e/=255,t/=255,n/=255;var i,s,o,u;return o=Math.max(e,t,n),u=o-Math.min(e,t,n),i=u==0?null:o==e?(t-n)/u:o==t?(n-e)/u+2:(e-t)/u+4,i=(i+360)%6*60/360,s=u==0?0:u/o,{h:i||1,s:s,b:o,a:r||1}},HueToRGB:function(e,t,n){return n<0?n+=1:n>1&&(n-=1),n*6<1?e+(t-e)*n*6:n*2<1?t:n*3<2?e+(t-e)*(2/3-n)*6:e},HSLtoRGB:function(e,t,n,i){t<0&&(t=0);if(n<=.5)var s=n*(1+t);else var s=n+t-n*t;var o=2*n-s,u=e+1/3,a=e,f=e-1/3,l=Math.round(r.HueToRGB(o,s,u)*255),c=Math.round(r.HueToRGB(o,s,a)*255),h=Math.round(r.HueToRGB(o,s,f)*255);return[l,c,h,i||1]},stringParsers:[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1]/360,e[2]/100,e[3]/100,e[4]]}}],template:'<div class="colorpicker ai1ec-dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><em></em></div><div class="colorpicker-alpha"><em></em></div><div class="colorpicker-color"><div /></div></div>'}}),timely.define("external_libs/jquery_cookie",["jquery_timely"],function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function r(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function s(e){e.indexOf('"')===0&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(t," ")),u.json?JSON.parse(e):e}catch(n){}}function o(t,n){var r=u.raw?t:s(t);return e.isFunction(n)?n(r):r}var t=/\+/g,u=e.cookie=function(t,s,a){if(s!==undefined&&!e.isFunction(s)){a=e.extend({},u.defaults,a);if(typeof a.expires=="number"){var f=a.expires,l=a.expires=new Date;l.setTime(+l+f*864e5)}return document.cookie=[n(t),"=",i(s),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=t?undefined:{},h=document.cookie?document.cookie.split("; "):[];for(var p=0,d=h.length;p<d;p++){var v=h[p].split("="),m=r(v.shift()),g=v.join("=");if(t&&t===m){c=o(g,s);break}!t&&(g=o(g))!==undefined&&(c[m]=g)}return c};u.defaults={},e.removeCookie=function(t,n){return e.cookie(t)===undefined?!1:(e.cookie(t,"",e.extend({},n,{expires:-1})),!e.cookie(t))}}),timely.define("scripts/less_variables_editing",["jquery_timely","domReady","ai1ec_config","libs/utils","external_libs/bootstrap_colorpicker","external_libs/bootstrap/tab","external_libs/jquery_cookie"],function(e,t,n,r){var i=function(t){var n=e(this).attr("href");e.cookie("less_variables_active_tab",n)},s=function(t){t===null?e("ul.ai1ec-nav a:first").tab("show"):e("ul.ai1ec-nav a[href="+t+"]").tab("show")},o=function(){e(this).val()==="custom"?e(this).closest(".ai1ec-form-group").find(".ai1ec-custom-font").removeClass("ai1ec-hide"):e(this).closest(".ai1ec-form-group").find(".ai1ec-custom-font").addClass("ai1ec-hide")},u=function(){return window.confirm(n.confirm_reset_theme)},a=function(){var t=!0;return e(".ai1ec-less-variable-size").each(function(){var r=e(this),i=r.closest(".ai1ec-form-group"),s=e.trim(r.val());i.removeClass("ai1ec-has-warning");if(""===s)return;var o=/^auto$|^[+-]?[0-9]+\.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)?$/ig;if(!o.test(s)){t=!1;var u=i.closest(".ai1ec-tab-pane").attr("id");return i.closest(".ai1ec-tabbable").find('a[data-toggle="ai1ec-tab"][href="#'+u+'"]').trigger("click"),i.addClass("ai1ec-has-warning"),window.alert(n.size_less_variable_not_ok),r.trigger("focus"),!1}}),t};t(function(){e(".colorpickers").colorpicker(),r.activate_saved_tab_on_page_load(e.cookie("less_variables_active_tab")),e(document).on("click","ul.ai1ec-nav a",i).on("click","#ai1ec_reset_themes_options",u).on("change",".ai1ec_font",o),e("#ai1ec_save_themes_options").closest("form").on("submit",a)})}),timely.require(["scripts/less_variables_editing"]),timely.define("pages/less_variables_editing",function(){});