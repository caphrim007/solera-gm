/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window,jQuery,php,GM_log,Solera,GM_registerMenuCommand,GM_getResourceURL,GM_getResourceText*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

// ==UserScript==
// @name solera.framework

// @namespace http://www.soleranetworks.com/

// @include	*

// @require http://caphrim.net/portfolio/solera-gm/gm/js/jquery.min.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/jquery-ui-min.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/php.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/solera.logger.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/solera.config.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/solera.util.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/solera.layout.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/solera.tuple.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/solera.tuplelayout.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/jquery.spin.js
// @require http://caphrim.net/portfolio/solera-gm/gm/js/date.js

// @resource solera_css		http://caphrim.net/portfolio/solera-gm/gm/css/solera.css
// @resource jquery_ui_css	http://caphrim.net/portfolio/solera-gm/gm/css/jquery-ui-1.7.3.custom.css

// @resource html_config	http://caphrim.net/portfolio/solera-gm/gm/html/config.html
// @resource html_carbon	http://caphrim.net/portfolio/solera-gm/gm/html/carbon_rod.html

// @resource img_inspect	http://caphrim.net/portfolio/solera-gm/gm/images/inspect.png
// @resource img_spin_up	http://caphrim.net/portfolio/solera-gm/gm/images/spin_up.gif
// @resource img_spin_down	http://caphrim.net/portfolio/solera-gm/gm/images/spin_down.gif
// @resource img_spin_button	http://caphrim.net/portfolio/solera-gm/gm/images/spin_button.gif
// @resource img_maximize	http://caphrim.net/portfolio/solera-gm/gm/images/maximize.png
// @resource img_minimize	http://caphrim.net/portfolio/solera-gm/gm/images/minimize.png

// ==/UserScript==
var focusedParams, customParams, soleraPopup, fieldReady,
	whichField, logger, currentEvent, lastEvent,
	styles, j, globalImageSrc, menuSwitch, searchTimeout,
	highlightInterval, iCounter, head, style, css;

j = jQuery.noConflict();

/**
* This ensures that the script does not run in frames
* or iframes.
*
* window.top is the "topmost window"
* window.self is the "current window"
*
* If they are different, then there is a good chance that
* you're in a frame of some sort and if that is the case,
* return early to prevent loading everything again and
* again.
*
* @see http://www.w3schools.com/jsref/prop_win_self.asp
*/
if (window.top !== window.self) {
	/**
	* This is needed to inject the CSS stylesheet into
	* the frames so that outlining and background coloring
	* of elements will actually occur because I have removed
	* the static setting of the elements style in javascript
	* in favor of CSS styles in the solera.css file
	*/
	head = document.getElementsByTagName('head')[0];
	style = document.createElement('style');
	style.type = 'text/css';
 
	css = GM_getResourceText('solera_css');

	style.innerHTML = css;
	head.appendChild(style);
	return;
}

focusedParams = {};
customParams = {};
globalImageSrc = {};
iCounter = 0;

currentEvent = undefined;
lastEvent = undefined;
menuSwitch = undefined;
searchTimeout = undefined;


/**
* Load UI Styles
* @see http://strd6.com/2009/02/how-to-load-jquery-ui-css-in-greasemonkey/
*/
(function () {
	var resources, head, style, css;

	resources = {
		'inspect.png': GM_getResourceURL('img_inspect')
	};

	head = document.getElementsByTagName('head')[0];
	style = document.createElement('style');
	style.type = 'text/css';
 
	css = GM_getResourceText('solera_css');
	j.each(resources, function (resourceName, resourceUrl) {
		css = css.replaceAll('images/' + resourceName, resourceUrl);
	});

	style.innerHTML = css;
	head.appendChild(style);

	globalImageSrc.spinBtnImageSrc = GM_getResourceURL('img_spin_button');
	globalImageSrc.spinUpImageSrc = GM_getResourceURL('img_spin_up');
	globalImageSrc.spinDownImageSrc = GM_getResourceURL('img_spin_down');
	globalImageSrc.maximizeSrc = GM_getResourceURL('img_maximize');
	globalImageSrc.minimizeSrc = GM_getResourceURL('img_minimize');
}());

j(document).ready(function () {
	var configDiag, checkBody, checkHtml;

	configDiag = j('#configDiag');
	checkBody = j('body').size();
	checkHtml = j('html').size();

	if (checkBody > 0) {
		if (configDiag.length === 0) {
			j('body').append(GM_getResourceText("html_config"));
			Solera.Logger.log('Loaded config modal window');
		}

		j('body').append(GM_getResourceText('html_carbon'));
	} else if (checkHtml > 0) {
		if (configDiag.length === 0) {
			j('html').prepend(GM_getResourceText("html_config"));
			Solera.Logger.log('Loaded config modal window');
		}

		j('html').prepend(GM_getResourceText('html_carbon'));
	}

	Solera.Config.initialize();
	Solera.Config.addHandlers();

	j('#mask').hide();
	j('#soleraAddIpBox, #soleraAddDateBox, #soleraAddTimeBox, #soleraAddTimeAmBox').hide();
	j('#soleraAddDateTimeBox').hide();

	j('#configuration input[type=button]').click(function () {
		Solera.Config.save();
	});

	j('#soleraButton img').attr('src', GM_getResourceURL('img_inspect'));

	// Triggers for the drop menu
	j('.trigger').click(function (event) {
		j('.submenu').hide();
		var itemPositionable = '#' + this.id.replace('Button', 'Block');

		Solera.Logger.log('menuSwitch is ' + menuSwitch);
		Solera.Logger.log('itemPositionable is ' + itemPositionable);

		if (menuSwitch === itemPositionable) {
			Solera.Logger.log('Menu switch and item positionable are equal. Hiding the submenu');
			j(itemPositionable).hide();
			menuSwitch = undefined;
		} else {
			Solera.Logger.log('Menu switch and item positionable are different. Showing the submenu');
			menuSwitch = itemPositionable;
			j(itemPositionable).show();
			Solera.Layout.positionTupleSubmenu(itemPositionable);
		}
		
		/**
		* This is needed to stop the click event from bubbling up
		* to the document click handler which closes the menu
		*/
		event.stopPropagation();
	});

	j('.submenu, .addmenu').click(function (event) {
		menuSwitch = undefined;
		event.stopPropagation();
	});

	/**
	* This will cause the submenus to be hidden automatically
	* when a user clicks outside of the submenu
	*/
	j(document).click(function () {
		menuSwitch = undefined;
		j('.submenu, .addmenu').hide();
	});

	Solera.Layout.initialize();
	Solera.Layout.addHandlers();

	// Displays the solera bar
	Solera.Layout.hideTupleSubmenus();
	Solera.Layout.maximizeBar();

	highlightInterval = setInterval(function () {
		Solera.Layout.initAddressOutline();
	}, 2000);

	Solera.Logger.log('Document is ready');
});

function showConfig() {
	Solera.Logger.log('Opening configuration dialog');

	j('#configDiag, #mask').toggle();

	Solera.Logger.log('Configuration dialog opened');
}

GM_registerMenuCommand('Configure Solera Search', showConfig);
