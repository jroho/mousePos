/* =============================================================================
 * Mouse Position
 * =============================================================================
 * Copyright 2012 Jesse Rohowetz
 *
 * MIT License - http://www.opensource.org/licenses/mit-license.php
 * -----------------------------------------------------------------------------
 * js scriptlet that uses jQuery to toggle a container showing mouse cursor
 * position as page[ X, Y ]offset. Meant to be used as a bookmarklet in a
 * web browser.
 *
 * How to create bookmarklet: 
 * 1. Create bookmark in browser
 * 2. Enter the line below as the URL:
 * "javascript:(function(){document.body.appendChild(document.createElement('script')).src='[URL]/js/mousepos.js';})();"
 */

function MousePos(){
	var me = this;
	
	if (typeof(window.jQuery) === "undefined" || jQuery().jquery.match(/^1\.3/) === null){
		window.jQuery=undefined;
		var scriptEl=document.createElement("script");
		scriptEl.type="text/javascript";
		scriptEl.src="http://code.jquery.com/jquery-1.7.1.min.js";
		document.body.appendChild(scriptEl);
	}

	me.toggleMousePos = function () {
		jQuery('#mousePos').slideToggle('slow');
	};

	me.setupMousePos = function () {
		jQuery(document).ready(function(){
			$('<div id="mousePos" style="z-index:9999;background:#fff;padding:0.5em 1em;color:#000;font-size:24px;font-weight:bold;position:fixed;top:0;left:0;border:1px solid black;">0, 0</div>').appendTo('body');
			$(document).mousemove(function(e){$('#mousePos').text(e.pageX + ', ' + e.pageY);});
		});
	};
}

var checkJQuery = function () {
	if (typeof(window.jQuery) === "undefined") {
		setTimeout(function () {
			checkJQuery();
		}, 10);
	}
	else {
		window.mousePos.setupMousePos();
	}
};

if (typeof(window.mousePos) === "undefined") {
	window.mousePos = new MousePos();
	checkJQuery();
}
else {
	window.mousePos.toggleMousePos();
}