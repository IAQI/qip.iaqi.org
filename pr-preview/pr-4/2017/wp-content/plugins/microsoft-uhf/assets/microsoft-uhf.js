var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/**
 * Scripting to initialize Microsoft UHF.
 *
 * @package Microsoft-UHF
 */

/* global microsoftUhfSettings */

/* Microsoft UHF requires that jQuery be available via the `$` shortcut. */
if ( 'undefined' === typeof $ && jQuery ) {
	$ = jQuery;
}

(function ($) {
	'use strict';

	/**
	 * Attempt to determine the ID of the current menu item based on its URL.
	 *
	 * @return string
	 */
	var getCurrentMenuItemId = function () {
		var pathname = window.location.pathname,
			links    = $( '#headerArea a[href*="' + trimSlashes( pathname ) + '"]' ),
		    linkId   = '';

		if ( isHomepage() ) {
			linkId = 'c-logo';
		} else if ( 0 < links.length ) {
			linkId = links.last().attr( 'id' );
		}

		// Remove the "-mobile" suffix, as Compass will handle this automatically.
		if ( linkId && '-mobile' === linkId.substr( -7 ) ) {
			linkId = linkId.substr( 0, linkId.length - 7 );
		}

		return linkId;
	},

	/**
	 * Determine if we're currently on the homepage.
	 *
	 * @return boolean
	 */
	isHomepage = function () {
		return trimSlashes( microsoftUhfSettings.homePath ) === trimSlashes( window.location.pathname );
	},

	// Callback to initialize UHF.
	loadShell = function () {
		var settings = {
			currentMenuItemId: getCurrentMenuItemId()
		};

		if ( microsoftUhfSettings.loginUrl || microsoftUhfSettings.logoutUrl ) {
			settings.meControlOptions = {
				rpData: {
					msaInfo: {
						signInUrl: microsoftUhfSettings.loginUrl,
						signOutUrl: microsoftUhfSettings.logoutUrl
					}
				}
			};
		}

		window.onShellReadyToLoad = null;
		window.msCommonShell.load( settings );
	},

	/**
	 * Inject or run scripts that require cookie consent
	 */
	needsConsent = function( ){
		if( microsoftUhfSettings.scripts.length > 0 ){
			microsoftUhfSettings.scripts.forEach( function( script ) {
				var s = document.createElement('script');
				s.type = 'text/javascript';
				s.src = script.src;
				var x = document.getElementsByTagName('script')[0];
				x.parentNode.insertBefore(s, x);
			});
		}
		if( microsoftUhfSettings.inline.length > 0 ){
			microsoftUhfSettings.inline.forEach( function( method ) {
				if( typeof window[method] !== 'undefined' ){
					window[method]();
				}
			});
		}
	},

	/**
	 * Trim slashes from the beginning and end of a string.
	 *
	 * @param string str The string to remove leading and trailing slashes from.
	 * @return string The value of str minus leading/trailing slashes.
	 */
	trimSlashes = function ( str ) {
		if ( '/' === str.substr( 0, 1 ) ) {
			str = str.substr( 1 );
		}

		if ( '/' === str.substr( -1, 1 ) ) {
			str = str.substr( 0, str.length - 1 );
		}

		return str;
	};

	if ( window.msCommonShell ) {
		loadShell();
	} else {
		window.onShellReadyToLoad = loadShell;
	}

	if (  'undefined' === typeof mscc || mscc.hasConsent()) {
		needsConsent();
	} else if (mscc) {
		mscc.on('consent', needsConsent);
	}

})(jQuery, undefined);

}

/*
     FILE ARCHIVED ON 15:22:15 Sep 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:24:04 Jan 26, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.785
  exclusion.robots: 0.102
  exclusion.robots.policy: 0.094
  esindex: 0.008
  cdx.remote: 10.648
  LoadShardBlock: 678.233 (6)
  PetaboxLoader3.resolve: 159.007 (4)
  PetaboxLoader3.datanode: 586.18 (7)
  load_resource: 226.988
*/