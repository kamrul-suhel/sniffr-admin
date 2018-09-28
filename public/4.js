webpackJsonp([4],{

/***/ 304:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(309);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 309:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(318)
/* template */
var __vue_template__ = __webpack_require__(358)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/MailerComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e17fdc4", Component.options)
  } else {
    hotAPI.reload("data-v-6e17fdc4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {"object"==typeof navigator&&function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("Plyr",t):e.Plyr=t()}(this,function(){"use strict";var e=function(e){return null!=e?e.constructor:null},t=function(e,t){return Boolean(e&&t&&e instanceof t)},i=function(e){return null==e},n=function(t){return e(t)===Object},s=function(t){return e(t)===String},a=function(e){return Array.isArray(e)},o=function(e){return t(e,NodeList)},r=function(e){return i(e)||(s(e)||a(e)||o(e))&&!e.length||n(e)&&!Object.keys(e).length},l={nullOrUndefined:i,object:n,number:function(t){return e(t)===Number&&!Number.isNaN(t)},string:s,boolean:function(t){return e(t)===Boolean},function:function(t){return e(t)===Function},array:a,weakMap:function(e){return t(e,WeakMap)},nodeList:o,element:function(e){return t(e,Element)},textNode:function(t){return e(t)===Text},event:function(e){return t(e,Event)},keyboardEvent:function(e){return t(e,KeyboardEvent)},cue:function(e){return t(e,window.TextTrackCue)||t(e,window.VTTCue)},track:function(e){return t(e,TextTrack)||!i(e)&&s(e.kind)},url:function(e){if(t(e,window.URL))return!0;var i=e;e.startsWith("http://")&&e.startsWith("https://")||(i="http://"+e);try{return!r(new URL(i).hostname)}catch(e){return!1}},empty:r},c=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){return e=!0,null}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(e){}return e}();function u(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=this,a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(e&&"addEventListener"in e&&!l.empty(t)&&l.function(i)){var r=t.split(" "),u=o;c&&(u={passive:a,capture:o}),r.forEach(function(t){s&&s.eventListeners&&n&&s.eventListeners.push({element:e,type:t,callback:i,options:u}),e[n?"addEventListener":"removeEventListener"](t,i,u)})}}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=arguments.length>4&&void 0!==arguments[4]&&arguments[4];u.call(this,e,t,i,!0,n,s)}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=arguments.length>4&&void 0!==arguments[4]&&arguments[4];u.call(this,e,t,i,!1,n,s)}function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments[2],n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=arguments.length>4&&void 0!==arguments[4]&&arguments[4];u.call(this,e,t,function a(){h(e,t,a,n,s);for(var o=arguments.length,r=Array(o),l=0;l<o;l++)r[l]=arguments[l];i.apply(this,r)},!0,n,s)}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(l.element(e)&&!l.empty(t)){var s=new CustomEvent(t,{bubbles:i,detail:Object.assign({},n,{plyr:this})});e.dispatchEvent(s)}}var m=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},g=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),y=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e},v=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var i=[],n=!0,s=!1,a=void 0;try{for(var o,r=e[Symbol.iterator]();!(n=(o=r.next()).done)&&(i.push(o.value),!t||i.length!==t);n=!0);}catch(e){s=!0,a=e}finally{try{!n&&r.return&&r.return()}finally{if(s)throw a}}return i}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function b(e,t){var i=e.length?e:[e];Array.from(i).reverse().forEach(function(e,i){var n=i>0?t.cloneNode(!0):t,s=e.parentNode,a=e.nextSibling;n.appendChild(e),a?s.insertBefore(n,a):s.appendChild(n)})}function k(e,t){l.element(e)&&!l.empty(t)&&Object.entries(t).filter(function(e){var t=v(e,2)[1];return!l.nullOrUndefined(t)}).forEach(function(t){var i=v(t,2),n=i[0],s=i[1];return e.setAttribute(n,s)})}function w(e,t,i){var n=document.createElement(e);return l.object(t)&&k(n,t),l.string(i)&&(n.innerText=i),n}function T(e,t,i,n){l.element(t)&&t.appendChild(w(e,i,n))}function A(e){l.nodeList(e)||l.array(e)?Array.from(e).forEach(A):l.element(e)&&l.element(e.parentNode)&&e.parentNode.removeChild(e)}function E(e){if(l.element(e))for(var t=e.childNodes.length;t>0;)e.removeChild(e.lastChild),t-=1}function C(e,t){return l.element(t)&&l.element(t.parentNode)&&l.element(e)?(t.parentNode.replaceChild(e,t),e):null}function P(e,t){if(!l.string(e)||l.empty(e))return{};var i={},n=t;return e.split(",").forEach(function(e){var t=e.trim(),s=t.replace(".",""),a=t.replace(/[[\]]/g,"").split("="),o=a[0],r=a.length>1?a[1].replace(/["']/g,""):"";switch(t.charAt(0)){case".":l.object(n)&&l.string(n.class)&&(n.class+=" "+s),i.class=s;break;case"#":i.id=t.replace("#","");break;case"[":i[o]=r}}),i}function S(e,t){if(l.element(e)){var i=t;l.boolean(i)||(i=!e.hidden),i?e.setAttribute("hidden",""):e.removeAttribute("hidden")}}function M(e,t,i){if(l.nodeList(e))return Array.from(e).map(function(e){return M(e,t,i)});if(l.element(e)){var n="toggle";return void 0!==i&&(n=i?"add":"remove"),e.classList[n](t),e.classList.contains(t)}return!1}function N(e,t){return l.element(e)&&e.classList.contains(t)}function L(e,t){var i={Element:Element};return(i.matches||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||function(){return Array.from(document.querySelectorAll(t)).includes(this)}).call(e,t)}function x(e){return this.elements.container.querySelectorAll(e)}function _(e){return this.elements.container.querySelector(e)}function I(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];l.element(e)&&(e.focus(),t&&M(e,this.config.classNames.tabFocus))}var O,j,q,R=(O=document.createElement("span"),j={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},q=Object.keys(j).find(function(e){return void 0!==O.style[e]}),!!l.string(q)&&j[q]);function B(e){setTimeout(function(){try{S(e,!0),e.offsetHeight,S(e,!1)}catch(e){}},0)}var H,V={isIE:!!document.documentMode,isWebkit:"WebkitAppearance"in document.documentElement.style&&!/Edge/.test(navigator.userAgent),isIPhone:/(iPhone|iPod)/gi.test(navigator.platform),isIos:/(iPad|iPhone|iPod)/gi.test(navigator.platform)},D={"audio/ogg":"vorbis","audio/wav":"1","video/webm":"vp8, vorbis","video/mp4":"avc1.42E01E, mp4a.40.2","video/ogg":"theora"},F={audio:"canPlayType"in document.createElement("audio"),video:"canPlayType"in document.createElement("video"),check:function(e,t,i){var n=V.isIPhone&&i&&F.playsinline,s=F[e]||"html5"!==t;return{api:s,ui:s&&F.rangeInput&&("video"!==e||!V.isIPhone||n)}},pip:!V.isIPhone&&l.function(w("video").webkitSetPresentationMode),airplay:l.function(window.WebKitPlaybackTargetAvailabilityEvent),playsinline:"playsInline"in document.createElement("video"),mime:function(e){var t=e.split("/"),i=v(t,1)[0];if(!this.isHTML5||i!==this.type)return!1;var n=void 0;e&&e.includes("codecs=")?n=e:"audio/mpeg"===e?n="audio/mpeg;":e in D&&(n=e+'; codecs="'+D[e]+'"');try{return Boolean(n&&this.media.canPlayType(n).replace(/no/,""))}catch(e){return!1}},textTracks:"textTracks"in document.createElement("video"),rangeInput:(H=document.createElement("input"),H.type="range","range"===H.type),touch:"ontouchstart"in document.documentElement,transitions:!1!==R,reducedMotion:"matchMedia"in window&&window.matchMedia("(prefers-reduced-motion)").matches},U={getSources:function(){var e=this;return this.isHTML5?Array.from(this.media.querySelectorAll("source")).filter(function(t){return F.mime.call(e,t.getAttribute("type"))}):[]},getQualityOptions:function(){return U.getSources.call(this).map(function(e){return Number(e.getAttribute("size"))}).filter(Boolean)},extend:function(){if(this.isHTML5){var e=this;Object.defineProperty(e.media,"quality",{get:function(){var t=U.getSources.call(e).find(function(t){return t.getAttribute("src")===e.source});return t&&Number(t.getAttribute("size"))},set:function(t){var i=U.getSources.call(e).find(function(e){return Number(e.getAttribute("size"))===t});if(i){var n=e.media,s=n.currentTime,a=n.paused,o=n.preload,r=n.readyState;e.media.src=i.getAttribute("src"),("none"!==o||r)&&(e.once("loadedmetadata",function(){e.currentTime=s,a||e.play()}),e.media.load()),f.call(e,e.media,"qualitychange",!1,{quality:t}),e.storage.set({quality:t})}}})}},cancelRequests:function(){this.isHTML5&&(A(U.getSources.call(this)),this.media.setAttribute("src",this.config.blankVideo),this.media.load(),this.debug.log("Cancelled network requests"))}};function z(e){return l.array(e)?e.filter(function(t,i){return e.indexOf(t)===i}):e}function W(e,t){return t.split(".").reduce(function(e,t){return e&&e[t]},e)}function K(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length,i=Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];if(!i.length)return e;var s=i.shift();return l.object(s)?(Object.keys(s).forEach(function(t){l.object(s[t])?(Object.keys(e).includes(t)||Object.assign(e,y({},t,{})),K(e[t],s[t])):Object.assign(e,y({},t,s[t]))}),K.apply(void 0,[e].concat(i))):e}function Y(e){for(var t=arguments.length,i=Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];return l.empty(e)?e:e.toString().replace(/{(\d+)}/g,function(e,t){return i[t].toString()})}function J(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1"),"g"),i.toString())}function Q(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toString().replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}function $(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toString();return(e=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toString();return e=J(e,"-"," "),e=J(e,"_"," "),J(e=Q(e)," ","")}(e)).charAt(0).toLowerCase()+e.slice(1)}function G(e){var t=document.createElement("div");return t.appendChild(e),t.innerHTML}var X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(l.empty(e)||l.empty(t))return"";var i=W(t.i18n,e);if(l.empty(i))return"";var n={"{seektime}":t.seekTime,"{title}":t.title};return Object.entries(n).forEach(function(e){var t=v(e,2),n=t[0],s=t[1];i=J(i,n,s)}),i},Z=function(){function e(t){m(this,e),this.enabled=t.config.storage.enabled,this.key=t.config.storage.key}return g(e,[{key:"get",value:function(t){if(!e.supported||!this.enabled)return null;var i=window.localStorage.getItem(this.key);if(l.empty(i))return null;var n=JSON.parse(i);return l.string(t)&&t.length?n[t]:n}},{key:"set",value:function(t){if(e.supported&&this.enabled&&l.object(t)){var i=this.get();l.empty(i)&&(i={}),K(i,t),window.localStorage.setItem(this.key,JSON.stringify(i))}}}],[{key:"supported",get:function(){try{if(!("localStorage"in window))return!1;return window.localStorage.setItem("___test","___test"),window.localStorage.removeItem("___test"),!0}catch(e){return!1}}}]),e}();function ee(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text";return new Promise(function(i,n){try{var s=new XMLHttpRequest;if(!("withCredentials"in s))return;s.addEventListener("load",function(){if("text"===t)try{i(JSON.parse(s.responseText))}catch(e){i(s.responseText)}else i(s.response)}),s.addEventListener("error",function(){throw new Error(s.status)}),s.open("GET",e,!0),s.responseType=t,s.send()}catch(e){n(e)}})}function te(e,t){if(l.string(e)){var i=l.string(t),n=function(){return null!==document.getElementById(t)},s=function(e,t){e.innerHTML=t,i&&n()||document.body.insertAdjacentElement("afterbegin",e)};if(!i||!n()){var a=Z.supported,o=document.createElement("div");if(o.setAttribute("hidden",""),i&&o.setAttribute("id",t),a){var r=window.localStorage.getItem("cache-"+t);if(null!==r){var c=JSON.parse(r);s(o,c.content)}}ee(e).then(function(e){l.empty(e)||(a&&window.localStorage.setItem("cache-"+t,JSON.stringify({content:e})),s(o,e))}).catch(function(){})}}}var ie=function(e){return parseInt(e/60/60%60,10)},ne=function(e){return parseInt(e/60%60,10)},se=function(e){return parseInt(e%60,10)};function ae(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!l.number(e))return ae(null,t,i);var n=function(e){return("0"+e).slice(-2)},s=ie(e),a=ne(e),o=se(e);return t||s>0?s+=":":s="",(i&&e>0?"-":"")+s+n(a)+":"+n(o)}var oe={getIconUrl:function(){var e=new URL(this.config.iconUrl,window.location).host!==window.location.host||V.isIE&&!window.svg4everybody;return{url:this.config.iconUrl,cors:e}},findElements:function(){try{return this.elements.controls=_.call(this,this.config.selectors.controls.wrapper),this.elements.buttons={play:x.call(this,this.config.selectors.buttons.play),pause:_.call(this,this.config.selectors.buttons.pause),restart:_.call(this,this.config.selectors.buttons.restart),rewind:_.call(this,this.config.selectors.buttons.rewind),fastForward:_.call(this,this.config.selectors.buttons.fastForward),mute:_.call(this,this.config.selectors.buttons.mute),pip:_.call(this,this.config.selectors.buttons.pip),airplay:_.call(this,this.config.selectors.buttons.airplay),settings:_.call(this,this.config.selectors.buttons.settings),captions:_.call(this,this.config.selectors.buttons.captions),fullscreen:_.call(this,this.config.selectors.buttons.fullscreen)},this.elements.progress=_.call(this,this.config.selectors.progress),this.elements.inputs={seek:_.call(this,this.config.selectors.inputs.seek),volume:_.call(this,this.config.selectors.inputs.volume)},this.elements.display={buffer:_.call(this,this.config.selectors.display.buffer),currentTime:_.call(this,this.config.selectors.display.currentTime),duration:_.call(this,this.config.selectors.display.duration)},l.element(this.elements.progress)&&(this.elements.display.seekTooltip=this.elements.progress.querySelector("."+this.config.classNames.tooltip)),!0}catch(e){return this.debug.warn("It looks like there is a problem with your custom controls HTML",e),this.toggleNativeControls(!0),!1}},createIcon:function(e,t){var i=oe.getIconUrl.call(this),n=(i.cors?"":i.url)+"#"+this.config.iconPrefix,s=document.createElementNS("http://www.w3.org/2000/svg","svg");k(s,K(t,{role:"presentation",focusable:"false"}));var a=document.createElementNS("http://www.w3.org/2000/svg","use"),o=n+"-"+e;return"href"in a?a.setAttributeNS("http://www.w3.org/1999/xlink","href",o):a.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",o),s.appendChild(a),s},createLabel:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i={pip:"PIP",airplay:"AirPlay"}[e]||X(e,this.config);return w("span",Object.assign({},t,{class:[t.class,this.config.classNames.hidden].filter(Boolean).join(" ")}),i)},createBadge:function(e){if(l.empty(e))return null;var t=w("span",{class:this.config.classNames.menu.value});return t.appendChild(w("span",{class:this.config.classNames.menu.badge},e)),t},createButton:function(e,t){var i=w("button"),n=Object.assign({},t),s=$(e),a=!1,o=void 0,r=void 0,c=void 0,u=void 0;switch("type"in n||(n.type="button"),"class"in n?n.class.includes(this.config.classNames.control)||(n.class+=" "+this.config.classNames.control):n.class=this.config.classNames.control,e){case"play":a=!0,o="play",c="pause",r="play",u="pause";break;case"mute":a=!0,o="mute",c="unmute",r="volume",u="muted";break;case"captions":a=!0,o="enableCaptions",c="disableCaptions",r="captions-off",u="captions-on";break;case"fullscreen":a=!0,o="enterFullscreen",c="exitFullscreen",r="enter-fullscreen",u="exit-fullscreen";break;case"play-large":n.class+=" "+this.config.classNames.control+"--overlaid",s="play",o="play",r="play";break;default:o=s,r=e}return a?(i.appendChild(oe.createIcon.call(this,u,{class:"icon--pressed"})),i.appendChild(oe.createIcon.call(this,r,{class:"icon--not-pressed"})),i.appendChild(oe.createLabel.call(this,c,{class:"label--pressed"})),i.appendChild(oe.createLabel.call(this,o,{class:"label--not-pressed"}))):(i.appendChild(oe.createIcon.call(this,r)),i.appendChild(oe.createLabel.call(this,o))),K(n,P(this.config.selectors.buttons[s],n)),k(i,n),"play"===s?(l.array(this.elements.buttons[s])||(this.elements.buttons[s]=[]),this.elements.buttons[s].push(i)):this.elements.buttons[s]=i,i},createRange:function(e,t){var i=w("input",K(P(this.config.selectors.inputs[e]),{type:"range",min:0,max:100,step:.01,value:0,autocomplete:"off",role:"slider","aria-label":X(e,this.config),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0},t));return this.elements.inputs[e]=i,oe.updateRangeFill.call(this,i),i},createProgress:function(e,t){var i=w("progress",K(P(this.config.selectors.display[e]),{min:0,max:100,value:0,role:"presentation","aria-hidden":!0},t));if("volume"!==e){i.appendChild(w("span",null,"0"));var n={played:"played",buffer:"buffered"}[e],s=n?X(n,this.config):"";i.innerText="% "+s.toLowerCase()}return this.elements.display[e]=i,i},createTime:function(e){var t=P(this.config.selectors.display[e]),i=w("div",K(t,{class:(this.config.classNames.display.time+" "+(t.class?t.class:"")).trim(),"aria-label":X(e,this.config)}),"00:00");return this.elements.display[e]=i,i},bindMenuItemShortcuts:function(e,t){var i=this;d(e,"keydown keyup",function(n){if([32,38,39,40].includes(n.which)&&(n.preventDefault(),n.stopPropagation(),"keydown"!==n.type)){var s=L(e,'[role="menuitemradio"]');if(!s&&[32,39].includes(n.which))oe.showMenuPanel.call(i,t,!0);else{var a=void 0;32!==n.which&&(40===n.which||s&&39===n.which?(a=e.nextElementSibling,l.element(a)||(a=e.parentNode.firstElementChild)):(a=e.previousElementSibling,l.element(a)||(a=e.parentNode.lastElementChild)),I.call(i,a,!0))}}},!1),d(e,"keyup",function(e){13===e.which&&oe.focusFirstMenuItem.call(i,null,!0)})},createMenuItem:function(e){var t=this,i=e.value,n=e.list,s=e.type,a=e.title,o=e.badge,r=void 0===o?null:o,c=e.checked,u=void 0!==c&&c,d=P(this.config.selectors.inputs[s]),h=w("button",K(d,{type:"button",role:"menuitemradio",class:(this.config.classNames.control+" "+(d.class?d.class:"")).trim(),"aria-checked":u,value:i})),p=w("span");p.innerHTML=a,l.element(r)&&p.appendChild(r),h.appendChild(p),Object.defineProperty(h,"checked",{enumerable:!0,get:function(){return"true"===h.getAttribute("aria-checked")},set:function(e){e&&Array.from(h.parentNode.children).filter(function(e){return L(e,'[role="menuitemradio"]')}).forEach(function(e){return e.setAttribute("aria-checked","false")}),h.setAttribute("aria-checked",e?"true":"false")}}),this.listeners.bind(h,"click keyup",function(e){if(!l.keyboardEvent(e)||32===e.which){switch(e.preventDefault(),e.stopPropagation(),h.checked=!0,s){case"language":t.currentTrack=Number(i);break;case"quality":t.quality=i;break;case"speed":t.speed=parseFloat(i)}oe.showMenuPanel.call(t,"home",l.keyboardEvent(e))}},s,!1),oe.bindMenuItemShortcuts.call(this,h,s),n.appendChild(h)},formatTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return l.number(e)?ae(e,ie(this.duration)>0,t):e},updateTimeDisplay:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];l.element(e)&&l.number(t)&&(e.innerText=oe.formatTime(t,i))},updateVolume:function(){this.supported.ui&&(l.element(this.elements.inputs.volume)&&oe.setRange.call(this,this.elements.inputs.volume,this.muted?0:this.volume),l.element(this.elements.buttons.mute)&&(this.elements.buttons.mute.pressed=this.muted||0===this.volume))},setRange:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;l.element(e)&&(e.value=t,oe.updateRangeFill.call(this,e))},updateProgress:function(e){var t=this;if(this.supported.ui&&l.event(e)){var i,n,s=0;if(e)switch(e.type){case"timeupdate":case"seeking":case"seeked":i=this.currentTime,n=this.duration,s=0===i||0===n||Number.isNaN(i)||Number.isNaN(n)?0:(i/n*100).toFixed(2),"timeupdate"===e.type&&oe.setRange.call(this,this.elements.inputs.seek,s);break;case"playing":case"progress":!function(e,i){var n=l.number(i)?i:0,s=l.element(e)?e:t.elements.display.buffer;if(l.element(s)){s.value=n;var a=s.getElementsByTagName("span")[0];l.element(a)&&(a.childNodes[0].nodeValue=n)}}(this.elements.display.buffer,100*this.buffered)}}},updateRangeFill:function(e){var t=l.event(e)?e.target:e;if(l.element(t)&&"range"===t.getAttribute("type")){if(L(t,this.config.selectors.inputs.seek)){t.setAttribute("aria-valuenow",this.currentTime);var i=oe.formatTime(this.currentTime),n=oe.formatTime(this.duration),s=X("seekLabel",this.config);t.setAttribute("aria-valuetext",s.replace("{currentTime}",i).replace("{duration}",n))}else if(L(t,this.config.selectors.inputs.volume)){var a=100*t.value;t.setAttribute("aria-valuenow",a),t.setAttribute("aria-valuetext",a.toFixed(1)+"%")}else t.setAttribute("aria-valuenow",t.value);V.isWebkit&&t.style.setProperty("--value",t.value/t.max*100+"%")}},updateSeekTooltip:function(e){var t=this;if(this.config.tooltips.seek&&l.element(this.elements.inputs.seek)&&l.element(this.elements.display.seekTooltip)&&0!==this.duration){var i=0,n=this.elements.progress.getBoundingClientRect(),s=this.config.classNames.tooltip+"--visible",a=function(e){M(t.elements.display.seekTooltip,s,e)};if(this.touch)a(!1);else{if(l.event(e))i=100/n.width*(e.pageX-n.left);else{if(!N(this.elements.display.seekTooltip,s))return;i=parseFloat(this.elements.display.seekTooltip.style.left,10)}i<0?i=0:i>100&&(i=100),oe.updateTimeDisplay.call(this,this.elements.display.seekTooltip,this.duration/100*i),this.elements.display.seekTooltip.style.left=i+"%",l.event(e)&&["mouseenter","mouseleave"].includes(e.type)&&a("mouseenter"===e.type)}}},timeUpdate:function(e){var t=!l.element(this.elements.display.duration)&&this.config.invertTime;oe.updateTimeDisplay.call(this,this.elements.display.currentTime,t?this.duration-this.currentTime:this.currentTime,t),e&&"timeupdate"===e.type&&this.media.seeking||oe.updateProgress.call(this,e)},durationUpdate:function(){if(this.supported.ui&&(this.config.invertTime||!this.currentTime)){if(this.duration>=Math.pow(2,32))return S(this.elements.display.currentTime,!0),void S(this.elements.progress,!0);l.element(this.elements.inputs.seek)&&this.elements.inputs.seek.setAttribute("aria-valuemax",this.duration);var e=l.element(this.elements.display.duration);!e&&this.config.displayDuration&&this.paused&&oe.updateTimeDisplay.call(this,this.elements.display.currentTime,this.duration),e&&oe.updateTimeDisplay.call(this,this.elements.display.duration,this.duration),oe.updateSeekTooltip.call(this)}},toggleMenuButton:function(e,t){S(this.elements.settings.buttons[e],!t)},updateSetting:function(e,t,i){var n=this.elements.settings.panels[e],s=null,a=t;if("captions"===e)s=this.currentTrack;else{if(s=l.empty(i)?this[e]:i,l.empty(s)&&(s=this.config[e].default),!l.empty(this.options[e])&&!this.options[e].includes(s))return void this.debug.warn("Unsupported value of '"+s+"' for "+e);if(!this.config[e].options.includes(s))return void this.debug.warn("Disabled value of '"+s+"' for "+e)}if(l.element(a)||(a=n&&n.querySelector('[role="menu"]')),l.element(a)){this.elements.settings.buttons[e].querySelector("."+this.config.classNames.menu.value).innerHTML=oe.getLabel.call(this,e,s);var o=a&&a.querySelector('[value="'+s+'"]');l.element(o)&&(o.checked=!0)}},getLabel:function(e,t){switch(e){case"speed":return 1===t?X("normal",this.config):t+"&times;";case"quality":if(l.number(t)){var i=X("qualityLabel."+t,this.config);return i.length?i:t+"p"}return Q(t);case"captions":return ce.getLabel.call(this);default:return null}},setQualityMenu:function(e){var t=this;if(l.element(this.elements.settings.panels.quality)){var i=this.elements.settings.panels.quality.querySelector('[role="menu"]');l.array(e)&&(this.options.quality=z(e).filter(function(e){return t.config.quality.options.includes(e)}));var n=!l.empty(this.options.quality)&&this.options.quality.length>1;if(oe.toggleMenuButton.call(this,"quality",n),E(i),oe.checkMenu.call(this),n){this.options.quality.sort(function(e,i){var n=t.config.quality.options;return n.indexOf(e)>n.indexOf(i)?1:-1}).forEach(function(e){oe.createMenuItem.call(t,{value:e,list:i,type:"quality",title:oe.getLabel.call(t,"quality",e),badge:function(e){var i=X("qualityBadge."+e,t.config);return i.length?oe.createBadge.call(t,i):null}(e)})}),oe.updateSetting.call(this,"quality",i)}}},setCaptionsMenu:function(){var e=this;if(l.element(this.elements.settings.panels.captions)){var t=this.elements.settings.panels.captions.querySelector('[role="menu"]'),i=ce.getTracks.call(this),n=Boolean(i.length);if(oe.toggleMenuButton.call(this,"captions",n),E(t),oe.checkMenu.call(this),n){var s=i.map(function(i,n){return{value:n,checked:e.captions.toggled&&e.currentTrack===n,title:ce.getLabel.call(e,i),badge:i.language&&oe.createBadge.call(e,i.language.toUpperCase()),list:t,type:"language"}});s.unshift({value:-1,checked:!this.captions.toggled,title:X("disabled",this.config),list:t,type:"language"}),s.forEach(oe.createMenuItem.bind(this)),oe.updateSetting.call(this,"captions",t)}}},setSpeedMenu:function(e){var t=this;if(l.element(this.elements.settings.panels.speed)){var i=this.elements.settings.panels.speed.querySelector('[role="menu"]');l.array(e)?this.options.speed=e:(this.isHTML5||this.isVimeo)&&(this.options.speed=[.5,.75,1,1.25,1.5,1.75,2]),this.options.speed=this.options.speed.filter(function(e){return t.config.speed.options.includes(e)});var n=!l.empty(this.options.speed)&&this.options.speed.length>1;oe.toggleMenuButton.call(this,"speed",n),E(i),oe.checkMenu.call(this),n&&(this.options.speed.forEach(function(e){oe.createMenuItem.call(t,{value:e,list:i,type:"speed",title:oe.getLabel.call(t,"speed",e)})}),oe.updateSetting.call(this,"speed",i))}},checkMenu:function(){var e=this.elements.settings.buttons,t=!l.empty(e)&&Object.values(e).some(function(e){return!e.hidden});S(this.elements.settings.menu,!t)},focusFirstMenuItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!this.elements.settings.popup.hidden){var i=e;l.element(i)||(i=Object.values(this.elements.settings.panels).find(function(e){return!e.hidden}));var n=i.querySelector('[role^="menuitem"]');I.call(this,n,t)}},toggleMenu:function(e){var t=this.elements.settings.popup,i=this.elements.buttons.settings;if(l.element(t)&&l.element(i)){var n=t.hidden,s=n;if(l.boolean(e))s=e;else if(l.keyboardEvent(e)&&27===e.which)s=!1;else if(l.event(e)){var a=t.contains(e.target);if(a||!a&&e.target!==i&&s)return}i.setAttribute("aria-expanded",s),S(t,!s),M(this.elements.container,this.config.classNames.menu.open,s),s&&l.keyboardEvent(e)?oe.focusFirstMenuItem.call(this,null,!0):s||n||I.call(this,i,l.keyboardEvent(e))}},getMenuSize:function(e){var t=e.cloneNode(!0);t.style.position="absolute",t.style.opacity=0,t.removeAttribute("hidden"),e.parentNode.appendChild(t);var i=t.scrollWidth,n=t.scrollHeight;return A(t),{width:i,height:n}},showMenuPanel:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.getElementById("plyr-settings-"+this.id+"-"+t);if(l.element(n)){var s=n.parentNode,a=Array.from(s.children).find(function(e){return!e.hidden});if(F.transitions&&!F.reducedMotion){s.style.width=a.scrollWidth+"px",s.style.height=a.scrollHeight+"px";var o=oe.getMenuSize.call(this,n);d.call(this,s,R,function t(i){i.target===s&&["width","height"].includes(i.propertyName)&&(s.style.width="",s.style.height="",h.call(e,s,R,t))}),s.style.width=o.width+"px",s.style.height=o.height+"px"}S(a,!0),S(n,!1),oe.focusFirstMenuItem.call(this,n,i)}},create:function(e){var t=this,i=w("div",P(this.config.selectors.controls.wrapper));if(this.config.controls.includes("restart")&&i.appendChild(oe.createButton.call(this,"restart")),this.config.controls.includes("rewind")&&i.appendChild(oe.createButton.call(this,"rewind")),this.config.controls.includes("play")&&i.appendChild(oe.createButton.call(this,"play")),this.config.controls.includes("fast-forward")&&i.appendChild(oe.createButton.call(this,"fast-forward")),this.config.controls.includes("progress")){var n=w("div",P(this.config.selectors.progress));if(n.appendChild(oe.createRange.call(this,"seek",{id:"plyr-seek-"+e.id})),n.appendChild(oe.createProgress.call(this,"buffer")),this.config.tooltips.seek){var s=w("span",{class:this.config.classNames.tooltip},"00:00");n.appendChild(s),this.elements.display.seekTooltip=s}this.elements.progress=n,i.appendChild(this.elements.progress)}if(this.config.controls.includes("current-time")&&i.appendChild(oe.createTime.call(this,"currentTime")),this.config.controls.includes("duration")&&i.appendChild(oe.createTime.call(this,"duration")),this.config.controls.includes("mute")||this.config.controls.includes("volume")){var a=w("div",{class:"plyr__volume"});if(this.config.controls.includes("mute")&&a.appendChild(oe.createButton.call(this,"mute")),this.config.controls.includes("volume")){var o={max:1,step:.05,value:this.config.volume};a.appendChild(oe.createRange.call(this,"volume",K(o,{id:"plyr-volume-"+e.id}))),this.elements.volume=a}i.appendChild(a)}if(this.config.controls.includes("captions")&&i.appendChild(oe.createButton.call(this,"captions")),this.config.controls.includes("settings")&&!l.empty(this.config.settings)){var r=w("div",{class:"plyr__menu",hidden:""});r.appendChild(oe.createButton.call(this,"settings",{"aria-haspopup":!0,"aria-controls":"plyr-settings-"+e.id,"aria-expanded":!1}));var c=w("div",{class:"plyr__menu__container",id:"plyr-settings-"+e.id,hidden:""}),u=w("div"),h=w("div",{id:"plyr-settings-"+e.id+"-home"}),p=w("div",{role:"menu"});h.appendChild(p),u.appendChild(h),this.elements.settings.panels.home=h,this.config.settings.forEach(function(i){var n=w("button",K(P(t.config.selectors.buttons.settings),{type:"button",class:t.config.classNames.control+" "+t.config.classNames.control+"--forward",role:"menuitem","aria-haspopup":!0,hidden:""}));oe.bindMenuItemShortcuts.call(t,n,i),d(n,"click",function(){oe.showMenuPanel.call(t,i,!1)});var s=w("span",null,X(i,t.config)),a=w("span",{class:t.config.classNames.menu.value});a.innerHTML=e[i],s.appendChild(a),n.appendChild(s),p.appendChild(n);var o=w("div",{id:"plyr-settings-"+e.id+"-"+i,hidden:""}),r=w("button",{type:"button",class:t.config.classNames.control+" "+t.config.classNames.control+"--back"});r.appendChild(w("span",{"aria-hidden":!0},X(i,t.config))),r.appendChild(w("span",{class:t.config.classNames.hidden},X("menuBack",t.config))),d(o,"keydown",function(e){37===e.which&&(e.preventDefault(),e.stopPropagation(),oe.showMenuPanel.call(t,"home",!0))},!1),d(r,"click",function(){oe.showMenuPanel.call(t,"home",!1)}),o.appendChild(r),o.appendChild(w("div",{role:"menu"})),u.appendChild(o),t.elements.settings.buttons[i]=n,t.elements.settings.panels[i]=o}),c.appendChild(u),r.appendChild(c),i.appendChild(r),this.elements.settings.popup=c,this.elements.settings.menu=r}return this.config.controls.includes("pip")&&F.pip&&i.appendChild(oe.createButton.call(this,"pip")),this.config.controls.includes("airplay")&&F.airplay&&i.appendChild(oe.createButton.call(this,"airplay")),this.config.controls.includes("fullscreen")&&i.appendChild(oe.createButton.call(this,"fullscreen")),this.config.controls.includes("play-large")&&this.elements.container.appendChild(oe.createButton.call(this,"play-large")),this.elements.controls=i,this.isHTML5&&oe.setQualityMenu.call(this,U.getQualityOptions.call(this)),oe.setSpeedMenu.call(this),i},inject:function(){var e=this;if(this.config.loadSprite){var t=oe.getIconUrl.call(this);t.cors&&te(t.url,"sprite-plyr")}this.id=Math.floor(1e4*Math.random());var i=null;this.elements.controls=null;var n={id:this.id,seektime:this.config.seekTime,title:this.config.title},s=!0;l.function(this.config.controls)&&(this.config.controls=this.config.controls.call(this.props)),this.config.controls||(this.config.controls=[]),l.element(this.config.controls)||l.string(this.config.controls)?i=this.config.controls:(i=oe.create.call(this,{id:this.id,seektime:this.config.seekTime,speed:this.speed,quality:this.quality,captions:ce.getLabel.call(this)}),s=!1);var a=function(e){var t=e;return Object.entries(n).forEach(function(e){var i=v(e,2),n=i[0],s=i[1];t=J(t,"{"+n+"}",s)}),t};s&&(l.string(this.config.controls)?i=a(i):l.element(i)&&(i.innerHTML=a(i.innerHTML)));var o=void 0;if(l.string(this.config.selectors.controls.container)&&(o=document.querySelector(this.config.selectors.controls.container)),l.element(o)||(o=this.elements.container),o[l.element(i)?"insertAdjacentElement":"insertAdjacentHTML"]("afterbegin",i),l.element(this.elements.controls)||oe.findElements.call(this),!l.empty(this.elements.buttons)){var r=function(t){var i=e.config.classNames.controlPressed;Object.defineProperty(t,"pressed",{enumerable:!0,get:function(){return N(t,i)},set:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];M(t,i,e)}})};Object.values(this.elements.buttons).filter(Boolean).forEach(function(e){l.array(e)||l.nodeList(e)?Array.from(e).filter(Boolean).forEach(r):r(e)})}if(window.navigator.userAgent.includes("Edge")&&B(o),this.config.tooltips.controls){var c=this.config,u=c.classNames,d=c.selectors,h=d.controls.wrapper+" "+d.labels+" ."+u.hidden,p=x.call(this,h);Array.from(p).forEach(function(t){M(t,e.config.classNames.hidden,!1),M(t,e.config.classNames.tooltip,!0)})}}};function re(e){var t=e;if(!(arguments.length>1&&void 0!==arguments[1])||arguments[1]){var i=document.createElement("a");i.href=t,t=i.href}try{return new URL(t)}catch(e){return null}}function le(e){var t=new URLSearchParams;return l.object(e)&&Object.entries(e).forEach(function(e){var i=v(e,2),n=i[0],s=i[1];t.set(n,s)}),t}var ce={setup:function(){if(this.supported.ui)if(!this.isVideo||this.isYouTube||this.isHTML5&&!F.textTracks)l.array(this.config.controls)&&this.config.controls.includes("settings")&&this.config.settings.includes("captions")&&oe.setCaptionsMenu.call(this);else{var e,t;if(l.element(this.elements.captions)||(this.elements.captions=w("div",P(this.config.selectors.captions)),e=this.elements.captions,t=this.elements.wrapper,l.element(e)&&l.element(t)&&t.parentNode.insertBefore(e,t.nextSibling)),V.isIE&&window.URL){var i=this.media.querySelectorAll("track");Array.from(i).forEach(function(e){var t=e.getAttribute("src"),i=re(t);null!==i&&i.hostname!==window.location.href.hostname&&["http:","https:"].includes(i.protocol)&&ee(t,"blob").then(function(t){e.setAttribute("src",window.URL.createObjectURL(t))}).catch(function(){A(e)})})}var n=z((navigator.languages||[navigator.language||navigator.userLanguage||"en"]).map(function(e){return e.split("-")[0]})),s=(this.storage.get("language")||this.config.captions.language||"auto").toLowerCase();if("auto"===s)s=v(n,1)[0];var a=this.storage.get("captions");if(l.boolean(a)||(a=this.config.captions.active),Object.assign(this.captions,{toggled:!1,active:a,language:s,languages:n}),this.isHTML5){var o=this.config.captions.update?"addtrack removetrack":"removetrack";d.call(this,this.media.textTracks,o,ce.update.bind(this))}setTimeout(ce.update.bind(this),0)}},update:function(){var e=this,t=ce.getTracks.call(this,!0),i=this.captions,n=i.active,s=i.language,a=i.meta,o=i.currentTrackNode,r=Boolean(t.find(function(e){return e.language===s}));this.isHTML5&&this.isVideo&&t.filter(function(e){return!a.get(e)}).forEach(function(t){e.debug.log("Track added",t),a.set(t,{default:"showing"===t.mode}),t.mode="hidden",d.call(e,t,"cuechange",function(){return ce.updateCues.call(e)})}),(r&&this.language!==s||!t.includes(o))&&(ce.setLanguage.call(this,s),ce.toggle.call(this,n&&r)),M(this.elements.container,this.config.classNames.captions.enabled,!l.empty(t)),(this.config.controls||[]).includes("settings")&&this.config.settings.includes("captions")&&oe.setCaptionsMenu.call(this)},toggle:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this.supported.ui){var i=this.captions.toggled,n=this.config.classNames.captions.active,s=l.nullOrUndefined(e)?!i:e;if(s!==i){if(t||(this.captions.active=s,this.storage.set({captions:s})),!this.language&&s&&!t){var a=ce.getTracks.call(this),o=ce.findTrack.call(this,[this.captions.language].concat(function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}(this.captions.languages)),!0);return this.captions.language=o.language,void ce.set.call(this,a.indexOf(o))}this.elements.buttons.captions&&(this.elements.buttons.captions.pressed=s),M(this.elements.container,n,s),this.captions.toggled=s,oe.updateSetting.call(this,"captions"),f.call(this,this.media,s?"captionsenabled":"captionsdisabled")}}},set:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=ce.getTracks.call(this);if(-1!==e)if(l.number(e))if(e in i){if(this.captions.currentTrack!==e){this.captions.currentTrack=e;var n=i[e],s=(n||{}).language;this.captions.currentTrackNode=n,oe.updateSetting.call(this,"captions"),t||(this.captions.language=s,this.storage.set({language:s})),this.isVimeo&&this.embed.enableTextTrack(s),f.call(this,this.media,"languagechange")}ce.toggle.call(this,!0,t),this.isHTML5&&this.isVideo&&ce.updateCues.call(this)}else this.debug.warn("Track not found",e);else this.debug.warn("Invalid caption argument",e);else ce.toggle.call(this,!1,t)},setLanguage:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(l.string(e)){var i=e.toLowerCase();this.captions.language=i;var n=ce.getTracks.call(this),s=ce.findTrack.call(this,[i]);ce.set.call(this,n.indexOf(s),t)}else this.debug.warn("Invalid language argument",e)},getTracks:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Array.from((this.media||{}).textTracks||[]).filter(function(i){return!e.isHTML5||t||e.captions.meta.has(i)}).filter(function(e){return["captions","subtitles"].includes(e.kind)})},findTrack:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=ce.getTracks.call(this),s=function(e){return Number((t.captions.meta.get(e)||{}).default)},a=Array.from(n).sort(function(e,t){return s(t)-s(e)}),o=void 0;return e.every(function(e){return!(o=a.find(function(t){return t.language===e}))}),o||(i?a[0]:void 0)},getCurrentTrack:function(){return ce.getTracks.call(this)[this.currentTrack]},getLabel:function(e){var t=e;return!l.track(t)&&F.textTracks&&this.captions.toggled&&(t=ce.getCurrentTrack.call(this)),l.track(t)?l.empty(t.label)?l.empty(t.language)?X("enabled",this.config):e.language.toUpperCase():t.label:X("disabled",this.config)},updateCues:function(e){if(this.supported.ui)if(l.element(this.elements.captions))if(l.nullOrUndefined(e)||Array.isArray(e)){var t=e;if(!t){var i=ce.getCurrentTrack.call(this);t=Array.from((i||{}).activeCues||[]).map(function(e){return e.getCueAsHTML()}).map(G)}var n=t.map(function(e){return e.trim()}).join("\n");if(n!==this.elements.captions.innerHTML){E(this.elements.captions);var s=w("span",P(this.config.selectors.caption));s.innerHTML=n,this.elements.captions.appendChild(s),f.call(this,this.media,"cuechange")}}else this.debug.warn("updateCues: Invalid input",e);else this.debug.warn("No captions element to render to")}},ue={enabled:!0,title:"",debug:!1,autoplay:!1,autopause:!0,playsinline:!0,seekTime:10,volume:1,muted:!1,duration:null,displayDuration:!0,invertTime:!0,toggleInvert:!0,ratio:"16:9",clickToPlay:!0,hideControls:!0,resetOnEnd:!1,disableContextMenu:!0,loadSprite:!0,iconPrefix:"plyr",iconUrl:"https://cdn.plyr.io/3.3.12/plyr.svg",blankVideo:"https://cdn.plyr.io/static/blank.mp4",quality:{default:576,options:[4320,2880,2160,1440,1080,720,576,480,360,240]},loop:{active:!1},speed:{selected:1,options:[.5,.75,1,1.25,1.5,1.75,2]},keyboard:{focused:!0,global:!1},tooltips:{controls:!1,seek:!0},captions:{active:!1,language:"auto",update:!1},fullscreen:{enabled:!0,fallback:!0,iosNative:!1},storage:{enabled:!0,key:"plyr"},controls:["play-large","play","progress","current-time","mute","volume","captions","settings","pip","airplay","fullscreen"],settings:["captions","quality","speed"],i18n:{restart:"Restart",rewind:"Rewind {seektime}s",play:"Play",pause:"Pause",fastForward:"Forward {seektime}s",seek:"Seek",seekLabel:"{currentTime} of {duration}",played:"Played",buffered:"Buffered",currentTime:"Current time",duration:"Duration",volume:"Volume",mute:"Mute",unmute:"Unmute",enableCaptions:"Enable captions",disableCaptions:"Disable captions",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",frameTitle:"Player for {title}",captions:"Captions",settings:"Settings",menuBack:"Go back to previous menu",speed:"Speed",normal:"Normal",quality:"Quality",loop:"Loop",start:"Start",end:"End",all:"All",reset:"Reset",disabled:"Disabled",enabled:"Enabled",advertisement:"Ad",qualityBadge:{2160:"4K",1440:"HD",1080:"HD",720:"HD",576:"SD",480:"SD"}},urls:{vimeo:{sdk:"https://player.vimeo.com/api/player.js",iframe:"https://player.vimeo.com/video/{0}?{1}",api:"https://vimeo.com/api/v2/video/{0}.json"},youtube:{sdk:"https://www.youtube.com/iframe_api",api:"https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet"},googleIMA:{sdk:"https://imasdk.googleapis.com/js/sdkloader/ima3.js"}},listeners:{seek:null,play:null,pause:null,restart:null,rewind:null,fastForward:null,mute:null,volume:null,captions:null,fullscreen:null,pip:null,airplay:null,speed:null,quality:null,loop:null,language:null},events:["ended","progress","stalled","playing","waiting","canplay","canplaythrough","loadstart","loadeddata","loadedmetadata","timeupdate","volumechange","play","pause","error","seeking","seeked","emptied","ratechange","cuechange","enterfullscreen","exitfullscreen","captionsenabled","captionsdisabled","languagechange","controlshidden","controlsshown","ready","statechange","qualitychange","adsloaded","adscontentpause","adscontentresume","adstarted","adsmidpoint","adscomplete","adsallcomplete","adsimpression","adsclick"],selectors:{editable:"input, textarea, select, [contenteditable]",container:".plyr",controls:{container:null,wrapper:".plyr__controls"},labels:"[data-plyr]",buttons:{play:'[data-plyr="play"]',pause:'[data-plyr="pause"]',restart:'[data-plyr="restart"]',rewind:'[data-plyr="rewind"]',fastForward:'[data-plyr="fast-forward"]',mute:'[data-plyr="mute"]',captions:'[data-plyr="captions"]',fullscreen:'[data-plyr="fullscreen"]',pip:'[data-plyr="pip"]',airplay:'[data-plyr="airplay"]',settings:'[data-plyr="settings"]',loop:'[data-plyr="loop"]'},inputs:{seek:'[data-plyr="seek"]',volume:'[data-plyr="volume"]',speed:'[data-plyr="speed"]',language:'[data-plyr="language"]',quality:'[data-plyr="quality"]'},display:{currentTime:".plyr__time--current",duration:".plyr__time--duration",buffer:".plyr__progress__buffer",loop:".plyr__progress__loop",volume:".plyr__volume--display"},progress:".plyr__progress",captions:".plyr__captions",caption:".plyr__caption",menu:{quality:".js-plyr__menu__list--quality"}},classNames:{type:"plyr--{0}",provider:"plyr--{0}",video:"plyr__video-wrapper",embed:"plyr__video-embed",embedContainer:"plyr__video-embed__container",poster:"plyr__poster",posterEnabled:"plyr__poster-enabled",ads:"plyr__ads",control:"plyr__control",controlPressed:"plyr__control--pressed",playing:"plyr--playing",paused:"plyr--paused",stopped:"plyr--stopped",loading:"plyr--loading",hover:"plyr--hover",tooltip:"plyr__tooltip",cues:"plyr__cues",hidden:"plyr__sr-only",hideControls:"plyr--hide-controls",isIos:"plyr--is-ios",isTouch:"plyr--is-touch",uiSupported:"plyr--full-ui",noTransition:"plyr--no-transition",display:{time:"plyr__time"},menu:{value:"plyr__menu__value",badge:"plyr__badge",open:"plyr--menu-open"},captions:{enabled:"plyr--captions-enabled",active:"plyr--captions-active"},fullscreen:{enabled:"plyr--fullscreen-enabled",fallback:"plyr--fullscreen-fallback"},pip:{supported:"plyr--pip-supported",active:"plyr--pip-active"},airplay:{supported:"plyr--airplay-supported",active:"plyr--airplay-active"},tabFocus:"plyr__tab-focus"},attributes:{embed:{provider:"data-plyr-provider",id:"data-plyr-embed-id"}},keys:{google:null},ads:{enabled:!1,publisherId:""}},de={html5:"html5",youtube:"youtube",vimeo:"vimeo"},he={audio:"audio",video:"video"};var pe=function(){},fe=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];m(this,e),this.enabled=window.console&&t,this.enabled&&this.log("Debugging enabled")}return g(e,[{key:"log",get:function(){return this.enabled?Function.prototype.bind.call(console.log,console):pe}},{key:"warn",get:function(){return this.enabled?Function.prototype.bind.call(console.warn,console):pe}},{key:"error",get:function(){return this.enabled?Function.prototype.bind.call(console.error,console):pe}}]),e}();function me(){if(this.enabled){var e=this.player.elements.buttons.fullscreen;l.element(e)&&(e.pressed=this.active),f.call(this.player,this.target,this.active?"enterfullscreen":"exitfullscreen",!0),V.isIos||function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(l.element(e)){var i=x.call(this,"button:not(:disabled), input:not(:disabled), [tabindex]"),n=i[0],s=i[i.length-1];u.call(this,this.elements.container,"keydown",function(e){if("Tab"===e.key&&9===e.keyCode){var t=document.activeElement;t!==s||e.shiftKey?t===n&&e.shiftKey&&(s.focus(),e.preventDefault()):(n.focus(),e.preventDefault())}},t,!1)}}.call(this.player,this.target,this.active)}}function ge(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e?this.scrollPosition={x:window.scrollX||0,y:window.scrollY||0}:window.scrollTo(this.scrollPosition.x,this.scrollPosition.y),document.body.style.overflow=e?"hidden":"",M(this.target,this.player.config.classNames.fullscreen.fallback,e),me.call(this)}var ye=function(){function e(t){var i=this;m(this,e),this.player=t,this.prefix=e.prefix,this.property=e.property,this.scrollPosition={x:0,y:0},d.call(this.player,document,"ms"===this.prefix?"MSFullscreenChange":this.prefix+"fullscreenchange",function(){me.call(i)}),d.call(this.player,this.player.elements.container,"dblclick",function(e){l.element(i.player.elements.controls)&&i.player.elements.controls.contains(e.target)||i.toggle()}),this.update()}return g(e,[{key:"update",value:function(){this.enabled?this.player.debug.log((e.native?"Native":"Fallback")+" fullscreen enabled"):this.player.debug.log("Fullscreen not supported and fallback disabled"),M(this.player.elements.container,this.player.config.classNames.fullscreen.enabled,this.enabled)}},{key:"enter",value:function(){this.enabled&&(V.isIos&&this.player.config.fullscreen.iosNative?this.target.webkitEnterFullscreen():e.native?this.prefix?l.empty(this.prefix)||this.target[this.prefix+"Request"+this.property]():this.target.requestFullscreen():ge.call(this,!0))}},{key:"exit",value:function(){if(this.enabled)if(V.isIos&&this.player.config.fullscreen.iosNative)this.target.webkitExitFullscreen(),this.player.play();else if(e.native)if(this.prefix){if(!l.empty(this.prefix)){var t="moz"===this.prefix?"Cancel":"Exit";document[""+this.prefix+t+this.property]()}}else(document.cancelFullScreen||document.exitFullscreen).call(document);else ge.call(this,!1)}},{key:"toggle",value:function(){this.active?this.exit():this.enter()}},{key:"enabled",get:function(){return(e.native||this.player.config.fullscreen.fallback)&&this.player.config.fullscreen.enabled&&this.player.supported.ui&&this.player.isVideo}},{key:"active",get:function(){return!!this.enabled&&(e.native?(this.prefix?document[""+this.prefix+this.property+"Element"]:document.fullscreenElement)===this.target:N(this.target,this.player.config.classNames.fullscreen.fallback))}},{key:"target",get:function(){return V.isIos&&this.player.config.fullscreen.iosNative?this.player.media:this.player.elements.container}}],[{key:"native",get:function(){return!!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled)}},{key:"prefix",get:function(){if(l.function(document.exitFullscreen))return"";var e="";return["webkit","moz","ms"].some(function(t){return!(!l.function(document[t+"ExitFullscreen"])&&!l.function(document[t+"CancelFullScreen"]))&&(e=t,!0)}),e}},{key:"property",get:function(){return"moz"===this.prefix?"FullScreen":"Fullscreen"}}]),e}();function ve(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return new Promise(function(i,n){var s=new Image,a=function(){delete s.onload,delete s.onerror,(s.naturalWidth>=t?i:n)(s)};Object.assign(s,{onload:a,onerror:a,src:e})})}var be={addStyleHook:function(){M(this.elements.container,this.config.selectors.container.replace(".",""),!0),M(this.elements.container,this.config.classNames.uiSupported,this.supported.ui)},toggleNativeControls:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&this.isHTML5?this.media.setAttribute("controls",""):this.media.removeAttribute("controls")},build:function(){var e=this;if(this.listeners.media(),!this.supported.ui)return this.debug.warn("Basic support only for "+this.provider+" "+this.type),void be.toggleNativeControls.call(this,!0);l.element(this.elements.controls)||(oe.inject.call(this),this.listeners.controls()),be.toggleNativeControls.call(this),this.isHTML5&&ce.setup.call(this),this.volume=null,this.muted=null,this.speed=null,this.loop=null,this.quality=null,oe.updateVolume.call(this),oe.timeUpdate.call(this),be.checkPlaying.call(this),M(this.elements.container,this.config.classNames.pip.supported,F.pip&&this.isHTML5&&this.isVideo),M(this.elements.container,this.config.classNames.airplay.supported,F.airplay&&this.isHTML5),M(this.elements.container,this.config.classNames.isIos,V.isIos),M(this.elements.container,this.config.classNames.isTouch,this.touch),this.ready=!0,setTimeout(function(){f.call(e,e.media,"ready")},0),be.setTitle.call(this),this.poster&&be.setPoster.call(this,this.poster,!1).catch(function(){}),this.config.duration&&oe.durationUpdate.call(this)},setTitle:function(){var e=X("play",this.config);if(l.string(this.config.title)&&!l.empty(this.config.title)&&(e+=", "+this.config.title),Array.from(this.elements.buttons.play||[]).forEach(function(t){t.setAttribute("aria-label",e)}),this.isEmbed){var t=_.call(this,"iframe");if(!l.element(t))return;var i=l.empty(this.config.title)?"video":this.config.title,n=X("frameTitle",this.config);t.setAttribute("title",n.replace("{title}",i))}},togglePoster:function(e){M(this.elements.container,this.config.classNames.posterEnabled,e)},setPoster:function(e){var t=this;return arguments.length>1&&void 0!==arguments[1]&&!arguments[1]||!this.poster?(this.media.setAttribute("poster",e),function(){var e=this;return new Promise(function(t){return e.ready?setTimeout(t,0):d.call(e,e.elements.container,"ready",t)}).then(function(){})}.call(this).then(function(){return ve(e)}).catch(function(i){throw e===t.poster&&be.togglePoster.call(t,!1),i}).then(function(){if(e!==t.poster)throw new Error("setPoster cancelled by later call to setPoster")}).then(function(){return Object.assign(t.elements.poster.style,{backgroundImage:"url('"+e+"')",backgroundSize:""}),be.togglePoster.call(t,!0),e})):Promise.reject(new Error("Poster already set"))},checkPlaying:function(e){var t=this;M(this.elements.container,this.config.classNames.playing,this.playing),M(this.elements.container,this.config.classNames.paused,this.paused),M(this.elements.container,this.config.classNames.stopped,this.stopped),Array.from(this.elements.buttons.play||[]).forEach(function(e){e.pressed=t.playing}),l.event(e)&&"timeupdate"===e.type||be.toggleControls.call(this)},checkLoading:function(e){var t=this;this.loading=["stalled","waiting"].includes(e.type),clearTimeout(this.timers.loading),this.timers.loading=setTimeout(function(){M(t.elements.container,t.config.classNames.loading,t.loading),be.toggleControls.call(t)},this.loading?250:0)},toggleControls:function(e){var t=this.elements.controls;t&&this.config.hideControls&&this.toggleControls(Boolean(e||this.loading||this.paused||t.pressed||t.hover))}},ke=function(){function e(t){m(this,e),this.player=t,this.lastKey=null,this.focusTimer=null,this.lastKeyDown=null,this.handleKey=this.handleKey.bind(this),this.toggleMenu=this.toggleMenu.bind(this),this.setTabFocus=this.setTabFocus.bind(this),this.firstTouch=this.firstTouch.bind(this)}return g(e,[{key:"handleKey",value:function(e){var t=this.player,i=t.elements,n=e.keyCode?e.keyCode:e.which,s="keydown"===e.type,a=s&&n===this.lastKey;if(!(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)&&l.number(n)){if(s){var o=document.activeElement;if(l.element(o)){var r=t.config.selectors.editable;if(o!==i.inputs.seek&&L(o,r))return;if(32===e.which&&L(o,'button, [role^="menuitem"]'))return}switch([32,37,38,39,40,48,49,50,51,52,53,54,56,57,67,70,73,75,76,77,79].includes(n)&&(e.preventDefault(),e.stopPropagation()),n){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:a||(t.currentTime=t.duration/10*(n-48));break;case 32:case 75:a||t.togglePlay();break;case 38:t.increaseVolume(.1);break;case 40:t.decreaseVolume(.1);break;case 77:a||(t.muted=!t.muted);break;case 39:t.forward();break;case 37:t.rewind();break;case 70:t.fullscreen.toggle();break;case 67:a||t.toggleCaptions();break;case 76:t.loop=!t.loop}!t.fullscreen.enabled&&t.fullscreen.active&&27===n&&t.fullscreen.toggle(),this.lastKey=n}else this.lastKey=null}}},{key:"toggleMenu",value:function(e){oe.toggleMenu.call(this.player,e)}},{key:"firstTouch",value:function(){var e=this.player,t=e.elements;e.touch=!0,M(t.container,e.config.classNames.isTouch,!0)}},{key:"setTabFocus",value:function(e){var t=this.player,i=t.elements;if(clearTimeout(this.focusTimer),"keydown"!==e.type||9===e.which){"keydown"===e.type&&(this.lastKeyDown=e.timeStamp);var n,s=e.timeStamp-this.lastKeyDown<=20;if("focus"!==e.type||s)n=t.config.classNames.tabFocus,M(x.call(t,"."+n),n,!1),this.focusTimer=setTimeout(function(){var e=document.activeElement;i.container.contains(e)&&M(document.activeElement,t.config.classNames.tabFocus,!0)},10)}}},{key:"global",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=this.player;t.config.keyboard.global&&u.call(t,window,"keydown keyup",this.handleKey,e,!1),u.call(t,document.body,"click",this.toggleMenu,e),p.call(t,document.body,"touchstart",this.firstTouch),u.call(t,document.body,"keydown focus blur",this.setTabFocus,e,!1,!0)}},{key:"container",value:function(){var e=this.player,t=e.elements;!e.config.keyboard.global&&e.config.keyboard.focused&&d.call(e,t.container,"keydown keyup",this.handleKey,!1),d.call(e,t.container,"mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen",function(i){var n=t.controls;n&&"enterfullscreen"===i.type&&(n.pressed=!1,n.hover=!1);var s=0;["touchstart","touchmove","mousemove"].includes(i.type)&&(be.toggleControls.call(e,!0),s=e.touch?3e3:2e3),clearTimeout(e.timers.controls),e.timers.controls=setTimeout(function(){return be.toggleControls.call(e,!1)},s)})}},{key:"media",value:function(){var e=this.player,t=e.elements;if(d.call(e,e.media,"timeupdate seeking seeked",function(t){return oe.timeUpdate.call(e,t)}),d.call(e,e.media,"durationchange loadeddata loadedmetadata",function(t){return oe.durationUpdate.call(e,t)}),d.call(e,e.media,"canplay",function(){S(t.volume,!e.hasAudio),S(t.buttons.mute,!e.hasAudio)}),d.call(e,e.media,"ended",function(){e.isHTML5&&e.isVideo&&e.config.resetOnEnd&&e.restart()}),d.call(e,e.media,"progress playing seeking seeked",function(t){return oe.updateProgress.call(e,t)}),d.call(e,e.media,"volumechange",function(t){return oe.updateVolume.call(e,t)}),d.call(e,e.media,"playing play pause ended emptied timeupdate",function(t){return be.checkPlaying.call(e,t)}),d.call(e,e.media,"waiting canplay seeked playing",function(t){return be.checkLoading.call(e,t)}),d.call(e,e.media,"playing",function(){e.ads&&e.ads.enabled&&!e.ads.initialized&&e.ads.managerPromise.then(function(){return e.ads.play()}).catch(function(){return e.play()})}),e.supported.ui&&e.config.clickToPlay&&!e.isAudio){var i=_.call(e,"."+e.config.classNames.video);if(!l.element(i))return;d.call(e,t.container,"click touchstart",function(n){([t.container,i].includes(n.target)||i.contains(n.target))&&(e.config.hideControls&&e.touch&&N(t.container,e.config.classNames.hideControls)||(e.ended?(e.restart(),e.play()):e.togglePlay()))})}e.supported.ui&&e.config.disableContextMenu&&d.call(e,t.wrapper,"contextmenu",function(e){e.preventDefault()},!1),d.call(e,e.media,"volumechange",function(){e.storage.set({volume:e.volume,muted:e.muted})}),d.call(e,e.media,"ratechange",function(){oe.updateSetting.call(e,"speed"),e.storage.set({speed:e.speed})}),d.call(e,e.media,"qualitychange",function(t){oe.updateSetting.call(e,"quality",null,t.detail.quality)});var n=e.config.events.concat(["keyup","keydown"]).join(" ");d.call(e,e.media,n,function(i){var n=i.detail,s=void 0===n?{}:n;"error"===i.type&&(s=e.media.error),f.call(e,t.container,i.type,!0,s)})}},{key:"proxy",value:function(e,t,i){var n=this.player,s=n.config.listeners[i],a=!0;l.function(s)&&(a=s.call(n,e)),a&&l.function(t)&&t.call(n,e)}},{key:"bind",value:function(e,t,i,n){var s=this,a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],o=this.player,r=o.config.listeners[n],c=l.function(r);d.call(o,e,t,function(e){return s.proxy(e,i,n)},a&&!c)}},{key:"controls",value:function(){var e=this,t=this.player,i=t.elements,n=V.isIE?"change":"input";if(i.buttons.play&&Array.from(i.buttons.play).forEach(function(i){e.bind(i,"click",t.togglePlay,"play")}),this.bind(i.buttons.restart,"click",t.restart,"restart"),this.bind(i.buttons.rewind,"click",t.rewind,"rewind"),this.bind(i.buttons.fastForward,"click",t.forward,"fastForward"),this.bind(i.buttons.mute,"click",function(){t.muted=!t.muted},"mute"),this.bind(i.buttons.captions,"click",function(){return t.toggleCaptions()}),this.bind(i.buttons.fullscreen,"click",function(){t.fullscreen.toggle()},"fullscreen"),this.bind(i.buttons.pip,"click",function(){t.pip="toggle"},"pip"),this.bind(i.buttons.airplay,"click",t.airplay,"airplay"),this.bind(i.buttons.settings,"click",function(e){e.stopPropagation(),oe.toggleMenu.call(t,e)}),this.bind(i.buttons.settings,"keyup",function(e){var i=e.which;[13,32].includes(i)&&(13!==i?(e.preventDefault(),e.stopPropagation(),oe.toggleMenu.call(t,e)):oe.focusFirstMenuItem.call(t,null,!0))},null,!1),this.bind(i.settings.menu,"keydown",function(e){27===e.which&&oe.toggleMenu.call(t,e)}),this.bind(i.inputs.seek,"mousedown mousemove",function(e){var t=i.progress.getBoundingClientRect(),n=100/t.width*(e.pageX-t.left);e.currentTarget.setAttribute("seek-value",n)}),this.bind(i.inputs.seek,"mousedown mouseup keydown keyup touchstart touchend",function(e){var i=e.currentTarget,n=e.keyCode?e.keyCode:e.which;if(!l.keyboardEvent(e)||39===n||37===n){var s=i.hasAttribute("play-on-seeked"),a=["mouseup","touchend","keyup"].includes(e.type);s&&a?(i.removeAttribute("play-on-seeked"),t.play()):!a&&t.playing&&(i.setAttribute("play-on-seeked",""),t.pause())}}),V.isIos){var s=x.call(t,'input[type="range"]');Array.from(s).forEach(function(t){return e.bind(t,n,function(e){return B(e.target)})})}this.bind(i.inputs.seek,n,function(e){var i=e.currentTarget,n=i.getAttribute("seek-value");l.empty(n)&&(n=i.value),i.removeAttribute("seek-value"),t.currentTime=n/i.max*t.duration},"seek"),this.bind(i.progress,"mouseenter mouseleave mousemove",function(e){return oe.updateSeekTooltip.call(t,e)}),V.isWebkit&&Array.from(x.call(t,'input[type="range"]')).forEach(function(i){e.bind(i,"input",function(e){return oe.updateRangeFill.call(t,e.target)})}),t.config.toggleInvert&&!l.element(i.display.duration)&&this.bind(i.display.currentTime,"click",function(){0!==t.currentTime&&(t.config.invertTime=!t.config.invertTime,oe.timeUpdate.call(t))}),this.bind(i.inputs.volume,n,function(e){t.volume=e.target.value},"volume"),this.bind(i.controls,"mouseenter mouseleave",function(e){i.controls.hover=!t.touch&&"mouseenter"===e.type}),this.bind(i.controls,"mousedown mouseup touchstart touchend touchcancel",function(e){i.controls.pressed=["mousedown","touchstart"].includes(e.type)}),this.bind(i.controls,"focusin focusout",function(i){var n=t.config,s=t.elements,a=t.timers,o="focusin"===i.type;if(M(s.controls,n.classNames.noTransition,o),be.toggleControls.call(t,o),o){setTimeout(function(){M(s.controls,n.classNames.noTransition,!1)},0);var r=e.touch?3e3:4e3;clearTimeout(a.controls),a.controls=setTimeout(function(){return be.toggleControls.call(t,!1)},r)}}),this.bind(i.inputs.volume,"wheel",function(e){var i=e.webkitDirectionInvertedFromDevice,n=[e.deltaX,-e.deltaY].map(function(e){return i?-e:e}),s=v(n,2),a=s[0],o=s[1],r=Math.sign(Math.abs(a)>Math.abs(o)?a:o);t.increaseVolume(r/50);var l=t.media.volume;(1===r&&l<1||-1===r&&l>0)&&e.preventDefault()},"volume",!1)}}]),e}();"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var we,Te=(function(e,t){var i;i=function(){var e=function(){},t={},i={},n={};function s(e,t){if(e){var s=n[e];if(i[e]=t,s)for(;s.length;)s[0](e,t),s.splice(0,1)}}function a(t,i){t.call&&(t={success:t}),i.length?(t.error||e)(i):(t.success||e)(t)}function o(t,i,n,s){var a,r,l=document,c=n.async,u=(n.numRetries||0)+1,d=n.before||e,h=t.replace(/^(css|img)!/,"");s=s||0,/(^css!|\.css$)/.test(t)?(a=!0,(r=l.createElement("link")).rel="stylesheet",r.href=h):/(^img!|\.(png|gif|jpg|svg)$)/.test(t)?(r=l.createElement("img")).src=h:((r=l.createElement("script")).src=t,r.async=void 0===c||c),r.onload=r.onerror=r.onbeforeload=function(e){var l=e.type[0];if(a&&"hideFocus"in r)try{r.sheet.cssText.length||(l="e")}catch(e){l="e"}if("e"==l&&(s+=1)<u)return o(t,i,n,s);i(t,l,e.defaultPrevented)},!1!==d(t,r)&&l.head.appendChild(r)}function r(e,i,n){var r,l;if(i&&i.trim&&(r=i),l=(r?n:i)||{},r){if(r in t)throw"LoadJS";t[r]=!0}!function(e,t,i){var n,s,a=(e=e.push?e:[e]).length,r=a,l=[];for(n=function(e,i,n){if("e"==i&&l.push(e),"b"==i){if(!n)return;l.push(e)}--a||t(l)},s=0;s<r;s++)o(e[s],n,i)}(e,function(e){a(l,e),s(r,e)},l)}return r.ready=function(e,t){return function(e,t){e=e.push?e:[e];var s,a,o,r=[],l=e.length,c=l;for(s=function(e,i){i.length&&r.push(e),--c||t(r)};l--;)a=e[l],(o=i[a])?s(a,o):(n[a]=n[a]||[]).push(s)}(e,function(e){a(t,e)}),r},r.done=function(e){s(e,[])},r.reset=function(){t={},i={},n={}},r.isDefined=function(e){return e in t},r},e.exports=i()}(we={exports:{}},we.exports),we.exports);function Ae(e){return new Promise(function(t,i){Te(e,{success:t,error:i})})}function Ee(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,f.call(this,this.media,e?"play":"pause"))}var Ce={setup:function(){var e=this;M(this.elements.wrapper,this.config.classNames.embed,!0),Ce.setAspectRatio.call(this),l.object(window.Vimeo)?Ce.ready.call(this):Ae(this.config.urls.vimeo.sdk).then(function(){Ce.ready.call(e)}).catch(function(t){e.debug.warn("Vimeo API failed to load",t)})},setAspectRatio:function(e){var t=(l.string(e)?e:this.config.ratio).split(":"),i=v(t,2),n=100/i[0]*i[1];if(this.elements.wrapper.style.paddingBottom=n+"%",this.supported.ui){var s=(240-n)/4.8;this.media.style.transform="translateY(-"+s+"%)"}},ready:function(){var e=this,t=this,i=le({loop:t.config.loop.active,autoplay:t.autoplay,byline:!1,portrait:!1,title:!1,speed:!0,transparent:0,gesture:"media",playsinline:!this.config.fullscreen.iosNative}),n=t.media.getAttribute("src");l.empty(n)&&(n=t.media.getAttribute(t.config.attributes.embed.id));var s,a=(s=n,l.empty(s)?null:l.number(Number(s))?s:s.match(/^.*(vimeo.com\/|video\/)(\d+).*/)?RegExp.$2:s),o=w("iframe"),r=Y(t.config.urls.vimeo.iframe,a,i);o.setAttribute("src",r),o.setAttribute("allowfullscreen",""),o.setAttribute("allowtransparency",""),o.setAttribute("allow","autoplay");var c=w("div",{poster:t.poster,class:t.config.classNames.embedContainer});c.appendChild(o),t.media=C(c,t.media),ee(Y(t.config.urls.vimeo.api,a),"json").then(function(e){if(!l.empty(e)){var i=new URL(e[0].thumbnail_large);i.pathname=i.pathname.split("_")[0]+".jpg",be.setPoster.call(t,i.href).catch(function(){})}}),t.embed=new window.Vimeo.Player(o,{autopause:t.config.autopause,muted:t.muted}),t.media.paused=!0,t.media.currentTime=0,t.supported.ui&&t.embed.disableTextTrack(),t.media.play=function(){return Ee.call(t,!0),t.embed.play()},t.media.pause=function(){return Ee.call(t,!1),t.embed.pause()},t.media.stop=function(){t.pause(),t.currentTime=0};var u=t.media.currentTime;Object.defineProperty(t.media,"currentTime",{get:function(){return u},set:function(e){var i=t.embed,n=t.media,s=t.paused,a=t.volume,o=s&&!i.hasPlayed;n.seeking=!0,f.call(t,n,"seeking"),Promise.resolve(o&&i.setVolume(0)).then(function(){return i.setCurrentTime(e)}).then(function(){return o&&i.pause()}).then(function(){return o&&i.setVolume(a)}).catch(function(){})}});var d=t.config.speed.selected;Object.defineProperty(t.media,"playbackRate",{get:function(){return d},set:function(e){t.embed.setPlaybackRate(e).then(function(){d=e,f.call(t,t.media,"ratechange")}).catch(function(e){"Error"===e.name&&oe.setSpeedMenu.call(t,[])})}});var h=t.config.volume;Object.defineProperty(t.media,"volume",{get:function(){return h},set:function(e){t.embed.setVolume(e).then(function(){h=e,f.call(t,t.media,"volumechange")})}});var p=t.config.muted;Object.defineProperty(t.media,"muted",{get:function(){return p},set:function(e){var i=!!l.boolean(e)&&e;t.embed.setVolume(i?0:t.config.volume).then(function(){p=i,f.call(t,t.media,"volumechange")})}});var m=t.config.loop;Object.defineProperty(t.media,"loop",{get:function(){return m},set:function(e){var i=l.boolean(e)?e:t.config.loop.active;t.embed.setLoop(i).then(function(){m=i})}});var g=void 0;t.embed.getVideoUrl().then(function(e){g=e}).catch(function(t){e.debug.warn(t)}),Object.defineProperty(t.media,"currentSrc",{get:function(){return g}}),Object.defineProperty(t.media,"ended",{get:function(){return t.currentTime===t.duration}}),Promise.all([t.embed.getVideoWidth(),t.embed.getVideoHeight()]).then(function(t){var i=function(e,t){var i=function e(t,i){return 0===i?t:e(i,t%i)}(e,t);return e/i+":"+t/i}(t[0],t[1]);Ce.setAspectRatio.call(e,i)}),t.embed.setAutopause(t.config.autopause).then(function(e){t.config.autopause=e}),t.embed.getVideoTitle().then(function(i){t.config.title=i,be.setTitle.call(e)}),t.embed.getCurrentTime().then(function(e){u=e,f.call(t,t.media,"timeupdate")}),t.embed.getDuration().then(function(e){t.media.duration=e,f.call(t,t.media,"durationchange")}),t.embed.getTextTracks().then(function(e){t.media.textTracks=e,ce.setup.call(t)}),t.embed.on("cuechange",function(e){var i=e.cues,n=(void 0===i?[]:i).map(function(e){return t=e.text,i=document.createDocumentFragment(),n=document.createElement("div"),i.appendChild(n),n.innerHTML=t,i.firstChild.innerText;var t,i,n});ce.updateCues.call(t,n)}),t.embed.on("loaded",function(){(t.embed.getPaused().then(function(e){Ee.call(t,!e),e||f.call(t,t.media,"playing")}),l.element(t.embed.element)&&t.supported.ui)&&t.embed.element.setAttribute("tabindex",-1)}),t.embed.on("play",function(){Ee.call(t,!0),f.call(t,t.media,"playing")}),t.embed.on("pause",function(){Ee.call(t,!1)}),t.embed.on("timeupdate",function(e){t.media.seeking=!1,u=e.seconds,f.call(t,t.media,"timeupdate")}),t.embed.on("progress",function(e){t.media.buffered=e.percent,f.call(t,t.media,"progress"),1===parseInt(e.percent,10)&&f.call(t,t.media,"canplaythrough"),t.embed.getDuration().then(function(e){e!==t.media.duration&&(t.media.duration=e,f.call(t,t.media,"durationchange"))})}),t.embed.on("seeked",function(){t.media.seeking=!1,f.call(t,t.media,"seeked")}),t.embed.on("ended",function(){t.media.paused=!0,f.call(t,t.media,"ended")}),t.embed.on("error",function(e){t.media.error=e,f.call(t,t.media,"error")}),setTimeout(function(){return be.build.call(t)},0)}};function Pe(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,f.call(this,this.media,e?"play":"pause"))}var Se,Me={setup:function(){var e=this;M(this.elements.wrapper,this.config.classNames.embed,!0),Me.setAspectRatio.call(this),l.object(window.YT)&&l.function(window.YT.Player)?Me.ready.call(this):(Ae(this.config.urls.youtube.sdk).catch(function(t){e.debug.warn("YouTube API failed to load",t)}),window.onYouTubeReadyCallbacks=window.onYouTubeReadyCallbacks||[],window.onYouTubeReadyCallbacks.push(function(){Me.ready.call(e)}),window.onYouTubeIframeAPIReady=function(){window.onYouTubeReadyCallbacks.forEach(function(e){e()})})},getTitle:function(e){var t=this;if(l.function(this.embed.getVideoData)){var i=this.embed.getVideoData().title;if(l.empty(i))return this.config.title=i,void be.setTitle.call(this)}var n=this.config.keys.google;l.string(n)&&!l.empty(n)&&ee(Y(this.config.urls.youtube.api,e,n)).then(function(e){l.object(e)&&(t.config.title=e.items[0].snippet.title,be.setTitle.call(t))}).catch(function(){})},setAspectRatio:function(){var e=this.config.ratio.split(":");this.elements.wrapper.style.paddingBottom=100/e[0]*e[1]+"%"},ready:function(){var e=this,t=e.media.getAttribute("id");if(l.empty(t)||!t.startsWith("youtube-")){var i=e.media.getAttribute("src");l.empty(i)&&(i=e.media.getAttribute(this.config.attributes.embed.id));var n,s=(n=i,l.empty(n)?null:n.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)?RegExp.$2:n),a=e.provider+"-"+Math.floor(1e4*Math.random()),o=w("div",{id:a,poster:e.poster});e.media=C(o,e.media);var r=function(e){return"https://img.youtube.com/vi/"+s+"/"+e+"default.jpg"};ve(r("maxres"),121).catch(function(){return ve(r("sd"),121)}).catch(function(){return ve(r("hq"))}).then(function(t){return be.setPoster.call(e,t.src)}).then(function(t){t.includes("maxres")||(e.elements.poster.style.backgroundSize="cover")}).catch(function(){}),e.embed=new window.YT.Player(a,{videoId:s,playerVars:{autoplay:e.config.autoplay?1:0,hl:e.config.hl,controls:e.supported.ui?0:1,rel:0,showinfo:0,iv_load_policy:3,modestbranding:1,disablekb:1,playsinline:1,widget_referrer:window?window.location.href:null,cc_load_policy:e.captions.active?1:0,cc_lang_pref:e.config.captions.language},events:{onError:function(t){if(!e.media.error){var i=t.data,n={2:"The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",5:"The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",100:"The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",101:"The owner of the requested video does not allow it to be played in embedded players.",150:"The owner of the requested video does not allow it to be played in embedded players."}[i]||"An unknown error occured";e.media.error={code:i,message:n},f.call(e,e.media,"error")}},onPlaybackRateChange:function(t){var i=t.target;e.media.playbackRate=i.getPlaybackRate(),f.call(e,e.media,"ratechange")},onReady:function(t){if(!l.function(e.media.play)){var i=t.target;Me.getTitle.call(e,s),e.media.play=function(){Pe.call(e,!0),i.playVideo()},e.media.pause=function(){Pe.call(e,!1),i.pauseVideo()},e.media.stop=function(){i.stopVideo()},e.media.duration=i.getDuration(),e.media.paused=!0,e.media.currentTime=0,Object.defineProperty(e.media,"currentTime",{get:function(){return Number(i.getCurrentTime())},set:function(t){e.paused&&!e.embed.hasPlayed&&e.embed.mute(),e.media.seeking=!0,f.call(e,e.media,"seeking"),i.seekTo(t)}}),Object.defineProperty(e.media,"playbackRate",{get:function(){return i.getPlaybackRate()},set:function(e){i.setPlaybackRate(e)}});var n=e.config.volume;Object.defineProperty(e.media,"volume",{get:function(){return n},set:function(t){n=t,i.setVolume(100*n),f.call(e,e.media,"volumechange")}});var a=e.config.muted;Object.defineProperty(e.media,"muted",{get:function(){return a},set:function(t){var n=l.boolean(t)?t:a;a=n,i[n?"mute":"unMute"](),f.call(e,e.media,"volumechange")}}),Object.defineProperty(e.media,"currentSrc",{get:function(){return i.getVideoUrl()}}),Object.defineProperty(e.media,"ended",{get:function(){return e.currentTime===e.duration}}),e.options.speed=i.getAvailablePlaybackRates(),e.supported.ui&&e.media.setAttribute("tabindex",-1),f.call(e,e.media,"timeupdate"),f.call(e,e.media,"durationchange"),clearInterval(e.timers.buffering),e.timers.buffering=setInterval(function(){e.media.buffered=i.getVideoLoadedFraction(),(null===e.media.lastBuffered||e.media.lastBuffered<e.media.buffered)&&f.call(e,e.media,"progress"),e.media.lastBuffered=e.media.buffered,1===e.media.buffered&&(clearInterval(e.timers.buffering),f.call(e,e.media,"canplaythrough"))},200),setTimeout(function(){return be.build.call(e)},50)}},onStateChange:function(t){var i=t.target;switch(clearInterval(e.timers.playing),e.media.seeking&&[1,2].includes(t.data)&&(e.media.seeking=!1,f.call(e,e.media,"seeked")),t.data){case-1:f.call(e,e.media,"timeupdate"),e.media.buffered=i.getVideoLoadedFraction(),f.call(e,e.media,"progress");break;case 0:Pe.call(e,!1),e.media.loop?(i.stopVideo(),i.playVideo()):f.call(e,e.media,"ended");break;case 1:e.media.paused&&!e.embed.hasPlayed?e.media.pause():(Pe.call(e,!0),f.call(e,e.media,"playing"),e.timers.playing=setInterval(function(){f.call(e,e.media,"timeupdate")},50),e.media.duration!==i.getDuration()&&(e.media.duration=i.getDuration(),f.call(e,e.media,"durationchange")));break;case 2:e.muted||e.embed.unMute(),Pe.call(e,!1)}f.call(e,e.elements.container,"statechange",!1,{code:t.data})}}})}}},Ne={setup:function(){this.media?(M(this.elements.container,this.config.classNames.type.replace("{0}",this.type),!0),M(this.elements.container,this.config.classNames.provider.replace("{0}",this.provider),!0),this.isEmbed&&M(this.elements.container,this.config.classNames.type.replace("{0}","video"),!0),this.isVideo&&(this.elements.wrapper=w("div",{class:this.config.classNames.video}),b(this.media,this.elements.wrapper),this.elements.poster=w("div",{class:this.config.classNames.poster}),this.elements.wrapper.appendChild(this.elements.poster)),this.isHTML5?U.extend.call(this):this.isYouTube?Me.setup.call(this):this.isVimeo&&Ce.setup.call(this)):this.debug.warn("No media element found!")}},Le=function(){function e(t){var i=this;m(this,e),this.player=t,this.publisherId=t.config.ads.publisherId,this.playing=!1,this.initialized=!1,this.elements={container:null,displayContainer:null},this.manager=null,this.loader=null,this.cuePoints=null,this.events={},this.safetyTimer=null,this.countdownTimer=null,this.managerPromise=new Promise(function(e,t){i.on("loaded",e),i.on("error",t)}),this.load()}return g(e,[{key:"load",value:function(){var e=this;this.enabled&&(l.object(window.google)&&l.object(window.google.ima)?this.ready():Ae(this.player.config.urls.googleIMA.sdk).then(function(){e.ready()}).catch(function(){e.trigger("error",new Error("Google IMA SDK failed to load"))}))}},{key:"ready",value:function(){var e=this;this.startSafetyTimer(12e3,"ready()"),this.managerPromise.then(function(){e.clearSafetyTimer("onAdsManagerLoaded()")}),this.listeners(),this.setupIMA()}},{key:"setupIMA",value:function(){this.elements.container=w("div",{class:this.player.config.classNames.ads}),this.player.elements.container.appendChild(this.elements.container),google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED),google.ima.settings.setLocale(this.player.config.ads.language),this.elements.displayContainer=new google.ima.AdDisplayContainer(this.elements.container),this.requestAds()}},{key:"requestAds",value:function(){var e=this,t=this.player.elements.container;try{this.loader=new google.ima.AdsLoader(this.elements.displayContainer),this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,function(t){return e.onAdsManagerLoaded(t)},!1),this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,function(t){return e.onAdError(t)},!1);var i=new google.ima.AdsRequest;i.adTagUrl=this.tagUrl,i.linearAdSlotWidth=t.offsetWidth,i.linearAdSlotHeight=t.offsetHeight,i.nonLinearAdSlotWidth=t.offsetWidth,i.nonLinearAdSlotHeight=t.offsetHeight,i.forceNonLinearFullSlot=!1,i.setAdWillPlayMuted(!this.player.muted),this.loader.requestAds(i)}catch(e){this.onAdError(e)}}},{key:"pollCountdown",value:function(){var e=this;if(!(arguments.length>0&&void 0!==arguments[0]&&arguments[0]))return clearInterval(this.countdownTimer),void this.elements.container.removeAttribute("data-badge-text");this.countdownTimer=setInterval(function(){var t=ae(Math.max(e.manager.getRemainingTime(),0)),i=X("advertisement",e.player.config)+" - "+t;e.elements.container.setAttribute("data-badge-text",i)},100)}},{key:"onAdsManagerLoaded",value:function(e){var t=this;if(this.enabled){var i=new google.ima.AdsRenderingSettings;i.restoreCustomPlaybackStateOnAdBreakComplete=!0,i.enablePreloading=!0,this.manager=e.getAdsManager(this.player,i),this.cuePoints=this.manager.getCuePoints(),l.empty(this.cuePoints)||this.cuePoints.forEach(function(e){if(0!==e&&-1!==e&&e<t.player.duration){var i=t.player.elements.progress;if(l.element(i)){var n=100/t.player.duration*e,s=w("span",{class:t.player.config.classNames.cues});s.style.left=n.toString()+"%",i.appendChild(s)}}}),this.manager.setVolume(this.player.volume),this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,function(e){return t.onAdError(e)}),Object.keys(google.ima.AdEvent.Type).forEach(function(e){t.manager.addEventListener(google.ima.AdEvent.Type[e],function(e){return t.onAdEvent(e)})}),this.trigger("loaded")}}},{key:"onAdEvent",value:function(e){var t=this,i=this.player.elements.container,n=e.getAd(),s=function(e){var i="ads"+e.replace(/_/g,"").toLowerCase();f.call(t.player,t.player.media,i)};switch(e.type){case google.ima.AdEvent.Type.LOADED:this.trigger("loaded"),s(e.type),this.pollCountdown(!0),n.isLinear()||(n.width=i.offsetWidth,n.height=i.offsetHeight);break;case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:s(e.type),this.loadAds();break;case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:s(e.type),this.pauseContent();break;case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:s(e.type),this.pollCountdown(),this.resumeContent();break;case google.ima.AdEvent.Type.STARTED:case google.ima.AdEvent.Type.MIDPOINT:case google.ima.AdEvent.Type.COMPLETE:case google.ima.AdEvent.Type.IMPRESSION:case google.ima.AdEvent.Type.CLICK:s(e.type)}}},{key:"onAdError",value:function(e){this.cancel(),this.player.debug.warn("Ads error",e)}},{key:"listeners",value:function(){var e=this,t=this.player.elements.container,i=void 0;this.player.on("ended",function(){e.loader.contentComplete()}),this.player.on("seeking",function(){return i=e.player.currentTime}),this.player.on("seeked",function(){var t=e.player.currentTime;l.empty(e.cuePoints)||e.cuePoints.forEach(function(n,s){i<n&&n<t&&(e.manager.discardAdBreak(),e.cuePoints.splice(s,1))})}),window.addEventListener("resize",function(){e.manager&&e.manager.resize(t.offsetWidth,t.offsetHeight,google.ima.ViewMode.NORMAL)})}},{key:"play",value:function(){var e=this,t=this.player.elements.container;this.managerPromise||this.resumeContent(),this.managerPromise.then(function(){e.elements.displayContainer.initialize();try{e.initialized||(e.manager.init(t.offsetWidth,t.offsetHeight,google.ima.ViewMode.NORMAL),e.manager.start()),e.initialized=!0}catch(t){e.onAdError(t)}}).catch(function(){})}},{key:"resumeContent",value:function(){this.elements.container.style.zIndex="",this.playing=!1,this.player.currentTime<this.player.duration&&this.player.play()}},{key:"pauseContent",value:function(){this.elements.container.style.zIndex=3,this.playing=!0,this.player.pause()}},{key:"cancel",value:function(){this.initialized&&this.resumeContent(),this.trigger("error"),this.loadAds()}},{key:"loadAds",value:function(){var e=this;this.managerPromise.then(function(){e.manager&&e.manager.destroy(),e.managerPromise=new Promise(function(t){e.on("loaded",t),e.player.debug.log(e.manager)}),e.requestAds()}).catch(function(){})}},{key:"trigger",value:function(e){for(var t=this,i=arguments.length,n=Array(i>1?i-1:0),s=1;s<i;s++)n[s-1]=arguments[s];var a=this.events[e];l.array(a)&&a.forEach(function(e){l.function(e)&&e.apply(t,n)})}},{key:"on",value:function(e,t){return l.array(this.events[e])||(this.events[e]=[]),this.events[e].push(t),this}},{key:"startSafetyTimer",value:function(e,t){var i=this;this.player.debug.log("Safety timer invoked from: "+t),this.safetyTimer=setTimeout(function(){i.cancel(),i.clearSafetyTimer("startSafetyTimer()")},e)}},{key:"clearSafetyTimer",value:function(e){l.nullOrUndefined(this.safetyTimer)||(this.player.debug.log("Safety timer cleared from: "+e),clearTimeout(this.safetyTimer),this.safetyTimer=null)}},{key:"enabled",get:function(){return this.player.isHTML5&&this.player.isVideo&&this.player.config.ads.enabled&&!l.empty(this.publisherId)}},{key:"tagUrl",get:function(){return"https://go.aniview.com/api/adserver6/vast/?"+le({AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:this.publisherId})}}]),e}(),xe={insertElements:function(e,t){var i=this;l.string(t)?T(e,this.media,{src:t}):l.array(t)&&t.forEach(function(t){T(e,i.media,t)})},change:function(e){var t=this;W(e,"sources.length")?(U.cancelRequests.call(this),this.destroy.call(this,function(){t.options.quality=[],A(t.media),t.media=null,l.element(t.elements.container)&&t.elements.container.removeAttribute("class");var i=e.sources,n=e.type,s=v(i,1)[0],a=s.provider,o=void 0===a?de.html5:a,r=s.src,c="html5"===o?n:"div",u="html5"===o?{}:{src:r};Object.assign(t,{provider:o,type:n,supported:F.check(n,o,t.config.playsinline),media:w(c,u)}),t.elements.container.appendChild(t.media),l.boolean(e.autoplay)&&(t.config.autoplay=e.autoplay),t.isHTML5&&(t.config.crossorigin&&t.media.setAttribute("crossorigin",""),t.config.autoplay&&t.media.setAttribute("autoplay",""),l.empty(e.poster)||(t.poster=e.poster),t.config.loop.active&&t.media.setAttribute("loop",""),t.config.muted&&t.media.setAttribute("muted",""),t.config.playsinline&&t.media.setAttribute("playsinline","")),be.addStyleHook.call(t),t.isHTML5&&xe.insertElements.call(t,"source",i),t.config.title=e.title,Ne.setup.call(t),t.isHTML5&&("tracks"in e&&xe.insertElements.call(t,"track",e.tracks),t.media.load()),(t.isHTML5||t.isEmbed&&!t.supported.ui)&&be.build.call(t),t.fullscreen.update()},!0)):this.debug.warn("Invalid source format")}},_e=function(){function e(t,i){var n=this;if(m(this,e),this.timers={},this.ready=!1,this.loading=!1,this.failed=!1,this.touch=F.touch,this.media=t,l.string(this.media)&&(this.media=document.querySelectorAll(this.media)),(window.jQuery&&this.media instanceof jQuery||l.nodeList(this.media)||l.array(this.media))&&(this.media=this.media[0]),this.config=K({},ue,e.defaults,i||{},function(){try{return JSON.parse(n.media.getAttribute("data-plyr-config"))}catch(e){return{}}}()),this.elements={container:null,captions:null,buttons:{},display:{},progress:{},inputs:{},settings:{popup:null,menu:null,panels:{},buttons:{}}},this.captions={active:null,currentTrack:-1,meta:new WeakMap},this.fullscreen={active:!1},this.options={speed:[],quality:[]},this.debug=new fe(this.config.debug),this.debug.log("Config",this.config),this.debug.log("Support",F),!l.nullOrUndefined(this.media)&&l.element(this.media))if(this.media.plyr)this.debug.warn("Target already setup");else if(this.config.enabled)if(F.check().api){var s=this.media.cloneNode(!0);s.autoplay=!1,this.elements.original=s;var a=this.media.tagName.toLowerCase(),o=null,r=null;switch(a){case"div":if(o=this.media.querySelector("iframe"),l.element(o)){if(r=re(o.getAttribute("src")),this.provider=function(e){return/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(e)?de.youtube:/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e)?de.vimeo:null}(r.toString()),this.elements.container=this.media,this.media=o,this.elements.container.className="",r.search.length){var c=["1","true"];c.includes(r.searchParams.get("autoplay"))&&(this.config.autoplay=!0),c.includes(r.searchParams.get("loop"))&&(this.config.loop.active=!0),this.isYouTube?(this.config.playsinline=c.includes(r.searchParams.get("playsinline")),this.config.hl=r.searchParams.get("hl")):this.config.playsinline=!0}}else this.provider=this.media.getAttribute(this.config.attributes.embed.provider),this.media.removeAttribute(this.config.attributes.embed.provider);if(l.empty(this.provider)||!Object.keys(de).includes(this.provider))return void this.debug.error("Setup failed: Invalid provider");this.type=he.video;break;case"video":case"audio":this.type=a,this.provider=de.html5,this.media.hasAttribute("crossorigin")&&(this.config.crossorigin=!0),this.media.hasAttribute("autoplay")&&(this.config.autoplay=!0),(this.media.hasAttribute("playsinline")||this.media.hasAttribute("webkit-playsinline"))&&(this.config.playsinline=!0),this.media.hasAttribute("muted")&&(this.config.muted=!0),this.media.hasAttribute("loop")&&(this.config.loop.active=!0);break;default:return void this.debug.error("Setup failed: unsupported type")}this.supported=F.check(this.type,this.provider,this.config.playsinline),this.supported.api?(this.eventListeners=[],this.listeners=new ke(this),this.storage=new Z(this),this.media.plyr=this,l.element(this.elements.container)||(this.elements.container=w("div"),b(this.media,this.elements.container)),be.addStyleHook.call(this),Ne.setup.call(this),this.config.debug&&d.call(this,this.elements.container,this.config.events.join(" "),function(e){n.debug.log("event: "+e.type)}),(this.isHTML5||this.isEmbed&&!this.supported.ui)&&be.build.call(this),this.listeners.container(),this.listeners.global(),this.fullscreen=new ye(this),this.config.ads.enabled&&(this.ads=new Le(this)),this.config.autoplay&&this.play()):this.debug.error("Setup failed: no support")}else this.debug.error("Setup failed: no support");else this.debug.error("Setup failed: disabled by config");else this.debug.error("Setup failed: no suitable element passed")}return g(e,[{key:"play",value:function(){return l.function(this.media.play)?this.media.play():null}},{key:"pause",value:function(){this.playing&&l.function(this.media.pause)&&this.media.pause()}},{key:"togglePlay",value:function(e){(l.boolean(e)?e:!this.playing)?this.play():this.pause()}},{key:"stop",value:function(){this.isHTML5?(this.pause(),this.restart()):l.function(this.media.stop)&&this.media.stop()}},{key:"restart",value:function(){this.currentTime=0}},{key:"rewind",value:function(e){this.currentTime=this.currentTime-(l.number(e)?e:this.config.seekTime)}},{key:"forward",value:function(e){this.currentTime=this.currentTime+(l.number(e)?e:this.config.seekTime)}},{key:"increaseVolume",value:function(e){var t=this.media.muted?0:this.volume;this.volume=t+(l.number(e)?e:0)}},{key:"decreaseVolume",value:function(e){this.increaseVolume(-e)}},{key:"toggleCaptions",value:function(e){ce.toggle.call(this,e,!1)}},{key:"airplay",value:function(){F.airplay&&this.media.webkitShowPlaybackTargetPicker()}},{key:"toggleControls",value:function(e){if(this.supported.ui&&!this.isAudio){var t=N(this.elements.container,this.config.classNames.hideControls),i=void 0===e?void 0:!e,n=M(this.elements.container,this.config.classNames.hideControls,i);if(n&&this.config.controls.includes("settings")&&!l.empty(this.config.settings)&&oe.toggleMenu.call(this,!1),n!==t){var s=n?"controlshidden":"controlsshown";f.call(this,this.media,s)}return!n}return!1}},{key:"on",value:function(e,t){d.call(this,this.elements.container,e,t)}},{key:"once",value:function(e,t){p.call(this,this.elements.container,e,t)}},{key:"off",value:function(e,t){h(this.elements.container,e,t)}},{key:"destroy",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.ready){var n=function(){document.body.style.overflow="",t.embed=null,i?(Object.keys(t.elements).length&&(A(t.elements.buttons.play),A(t.elements.captions),A(t.elements.controls),A(t.elements.wrapper),t.elements.buttons.play=null,t.elements.captions=null,t.elements.controls=null,t.elements.wrapper=null),l.function(e)&&e()):(function(){this&&this.eventListeners&&(this.eventListeners.forEach(function(e){var t=e.element,i=e.type,n=e.callback,s=e.options;t.removeEventListener(i,n,s)}),this.eventListeners=[])}.call(t),C(t.elements.original,t.elements.container),f.call(t,t.elements.original,"destroyed",!0),l.function(e)&&e.call(t.elements.original),t.ready=!1,setTimeout(function(){t.elements=null,t.media=null},200))};this.stop(),this.isHTML5?(clearTimeout(this.timers.loading),be.toggleNativeControls.call(this,!0),n()):this.isYouTube?(clearInterval(this.timers.buffering),clearInterval(this.timers.playing),null!==this.embed&&l.function(this.embed.destroy)&&this.embed.destroy(),n()):this.isVimeo&&(null!==this.embed&&this.embed.unload().then(n),setTimeout(n,200))}}},{key:"supports",value:function(e){return F.mime.call(this,e)}},{key:"isHTML5",get:function(){return Boolean(this.provider===de.html5)}},{key:"isEmbed",get:function(){return Boolean(this.isYouTube||this.isVimeo)}},{key:"isYouTube",get:function(){return Boolean(this.provider===de.youtube)}},{key:"isVimeo",get:function(){return Boolean(this.provider===de.vimeo)}},{key:"isVideo",get:function(){return Boolean(this.type===he.video)}},{key:"isAudio",get:function(){return Boolean(this.type===he.audio)}},{key:"playing",get:function(){return Boolean(this.ready&&!this.paused&&!this.ended)}},{key:"paused",get:function(){return Boolean(this.media.paused)}},{key:"stopped",get:function(){return Boolean(this.paused&&0===this.currentTime)}},{key:"ended",get:function(){return Boolean(this.media.ended)}},{key:"currentTime",set:function(e){if(this.duration){var t=l.number(e)&&e>0;this.media.currentTime=t?Math.min(e,this.duration):0,this.debug.log("Seeking to "+this.currentTime+" seconds")}},get:function(){return Number(this.media.currentTime)}},{key:"buffered",get:function(){var e=this.media.buffered;return l.number(e)?e:e&&e.length&&this.duration>0?e.end(0)/this.duration:0}},{key:"seeking",get:function(){return Boolean(this.media.seeking)}},{key:"duration",get:function(){var e=parseFloat(this.config.duration),t=(this.media||{}).duration,i=l.number(t)&&t!==1/0?t:0;return e||i}},{key:"volume",set:function(e){var t=e;l.string(t)&&(t=Number(t)),l.number(t)||(t=this.storage.get("volume")),l.number(t)||(t=this.config.volume),t>1&&(t=1),t<0&&(t=0),this.config.volume=t,this.media.volume=t,!l.empty(e)&&this.muted&&t>0&&(this.muted=!1)},get:function(){return Number(this.media.volume)}},{key:"muted",set:function(e){var t=e;l.boolean(t)||(t=this.storage.get("muted")),l.boolean(t)||(t=this.config.muted),this.config.muted=t,this.media.muted=t},get:function(){return Boolean(this.media.muted)}},{key:"hasAudio",get:function(){return!this.isHTML5||(!!this.isAudio||(Boolean(this.media.mozHasAudio)||Boolean(this.media.webkitAudioDecodedByteCount)||Boolean(this.media.audioTracks&&this.media.audioTracks.length)))}},{key:"speed",set:function(e){var t=null;l.number(e)&&(t=e),l.number(t)||(t=this.storage.get("speed")),l.number(t)||(t=this.config.speed.selected),t<.1&&(t=.1),t>2&&(t=2),this.config.speed.options.includes(t)?(this.config.speed.selected=t,this.media.playbackRate=t):this.debug.warn("Unsupported speed ("+t+")")},get:function(){return Number(this.media.playbackRate)}},{key:"quality",set:function(e){var t=this.config.quality,i=this.options.quality;if(i.length){var n=[!l.empty(e)&&Number(e),this.storage.get("quality"),t.selected,t.default].find(l.number);if(!i.includes(n)){var s=function(e,t){return l.array(e)&&e.length?e.reduce(function(e,i){return Math.abs(i-t)<Math.abs(e-t)?i:e}):null}(i,n);this.debug.warn("Unsupported quality option: "+n+", using "+s+" instead"),n=s}t.selected=n,this.media.quality=n}},get:function(){return this.media.quality}},{key:"loop",set:function(e){var t=l.boolean(e)?e:this.config.loop.active;this.config.loop.active=t,this.media.loop=t},get:function(){return Boolean(this.media.loop)}},{key:"source",set:function(e){xe.change.call(this,e)},get:function(){return this.media.currentSrc}},{key:"poster",set:function(e){this.isVideo?be.setPoster.call(this,e,!1).catch(function(){}):this.debug.warn("Poster can only be set for video")},get:function(){return this.isVideo?this.media.getAttribute("poster"):null}},{key:"autoplay",set:function(e){var t=l.boolean(e)?e:this.config.autoplay;this.config.autoplay=t},get:function(){return Boolean(this.config.autoplay)}},{key:"currentTrack",set:function(e){ce.set.call(this,e,!1)},get:function(){var e=this.captions,t=e.toggled,i=e.currentTrack;return t?i:-1}},{key:"language",set:function(e){ce.setLanguage.call(this,e,!1)},get:function(){return(ce.getCurrentTrack.call(this)||{}).language}},{key:"pip",set:function(e){var t="picture-in-picture",i="inline";if(F.pip){var n=l.boolean(e)?e:this.pip===i;this.media.webkitSetPresentationMode(n?t:i)}},get:function(){return F.pip?this.media.webkitPresentationMode:null}}],[{key:"supported",value:function(e,t,i){return F.check(e,t,i)}},{key:"loadSprite",value:function(e,t){return te(e,t)}},{key:"setup",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null;return l.string(t)?n=Array.from(document.querySelectorAll(t)):l.nodeList(t)?n=Array.from(t):l.array(t)&&(n=t.filter(l.element)),l.empty(n)?null:n.map(function(t){return new e(t,i)})}}]),e}();return _e.defaults=(Se=ue,JSON.parse(JSON.stringify(Se))),_e});
//# sourceMappingURL=plyr.min.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var VideoDialogBoxEventBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    data: function data() {
        return {
            openVideoDialogBox: false
        };
    },

    methods: {
        openVideoDialog: function openVideoDialog(alpha_id) {
            this.openVideoDialogBox = true;
            this.$emit('videoDialogStateChange', alpha_id);
        },
        closeVideoDialog: function closeVideoDialog(video) {
            this.openVideoDialogBox = false;
            this.$emit('videoDialogBoxClose', video);
        },
        closeDialogByTagSearch: function closeDialogByTagSearch(tag) {
            this.openVideoDialogBox = false;
            this.$emit('videoDialogBoxCloseByTag', tag);
        },
        videoDialogNextButtonClick: function videoDialogNextButtonClick() {
            this.$emit('onDialogClickNext');
        },
        videoDialogPrevButtonClick: function videoDialogPrevButtonClick() {
            this.$emit('onDialogClickPrev');
        },
        onResetCurrentVideoIndialog: function onResetCurrentVideoIndialog() {
            this.$emit('onResetCurrentVideoIndialog');
        }
    }
});
/* harmony default export */ __webpack_exports__["a"] = (VideoDialogBoxEventBus);

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var StoryDialogBoxEventBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    data: function data() {
        return {
            openStoryDialogBox: false
        };
    },

    methods: {
        openStoryDialog: function openStoryDialog(alpha_id) {
            this.openStoryDialogBox = true;
            this.$emit('StoryDialogStateChange', alpha_id);
        },
        closeStoryDialog: function closeStoryDialog(Story) {
            this.openStoryDialogBox = false;
            this.$emit('StoryDialogBoxClose', Story);
        },
        storyDialogNextButtonClick: function storyDialogNextButtonClick() {
            this.$emit('onStoryDialogClickNext');
        },
        storyDialogPrevButtonClick: function storyDialogPrevButtonClick() {
            this.$emit('onStoryDialogClickPrev');
        },
        onResetCurrentStoryIndialog: function onResetCurrentStoryIndialog() {
            this.$emit('onResetCurrentStoryIndialog');
        }
    }
});
/* harmony default export */ __webpack_exports__["a"] = (StoryDialogBoxEventBus);

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(340)
/* template */
var __vue_template__ = __webpack_require__(346)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/component/VideoPlayerComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-98059184", Component.options)
  } else {
    hotAPI.reload("data-v-98059184", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var VideoPlayerDialogBoxEventBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    data: function data() {
        return {};
    },

    methods: {
        openPlayerDialogBox: function openPlayerDialogBox(asset) {
            this.$emit('openPlayerDialogBox', asset);
        },
        closePlayerDialogBox: function closePlayerDialogBox() {
            this.$emit('closePlayerDialogBox');
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (VideoPlayerDialogBoxEventBus);

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_VideosComponents__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_VideosComponents___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modules_VideosComponents__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StoriesComponents__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StoriesComponents___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modules_StoriesComponents__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_VideoInDialog__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_VideoInDialog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__modules_VideoInDialog__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_StoryDialog__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_StoryDialog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__modules_StoryDialog__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_VideoPlayerInDialog__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_VideoPlayerInDialog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__modules_VideoPlayerInDialog__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        mailerVideosComponent: __WEBPACK_IMPORTED_MODULE_0__modules_VideosComponents___default.a,
        mailerStoriesComponent: __WEBPACK_IMPORTED_MODULE_1__modules_StoriesComponents___default.a,
        videoInDialog: __WEBPACK_IMPORTED_MODULE_2__modules_VideoInDialog___default.a,
        storyInDialog: __WEBPACK_IMPORTED_MODULE_3__modules_StoryDialog___default.a,
        VideoPlayerInDialog: __WEBPACK_IMPORTED_MODULE_4__modules_VideoPlayerInDialog___default.a
    },

    data: function data() {
        return {
            active: null,
            dialog: false,

            notSelectedError: false,
            errorMessage: '',

            indeterminate: true,
            refreshTitle: 'Please wait while the stories update. This may take a few minutes.',
            refreshIcon: 'done',

            disableButton: true
        };
    },
    created: function created() {
        console.log('it is loading');
    },


    methods: {
        onCreateMailer: function onCreateMailer() {
            var _this = this;

            // get the selected stories
            var stories = this.$store.getters.getAllSelectedStories;
            var videos = this.$store.getters.getAllSelectedVideos;
            if (stories.length === 0 && videos.length === 0) {
                this.errorMessage = "Please select A story or video";
                this.notSelectedError = true;
                this.dialog = true;
                return;
            }

            var storiesId = [];
            var videosId = [];
            stories.forEach(function (story) {
                storiesId.push(story.id);
            });

            videos.forEach(function (video) {
                videosId.push(video.id);
            });

            var storiesString = JSON.stringify(storiesId);
            var videosString = JSON.stringify(videosId);

            // send the data to downloaded
            var url = '/admin/mailers/create?videos=' + videosString + '&stories=' + storiesString;

            axios.get(url).then(function (response) {
                if (response.data.status === 'success') {
                    window.location = '/admin/mailers/edit/' + response.data.mailer_id;
                } else {
                    _this.errorMessage = "Something went wrong";
                    _this.dialog = true;
                }
            }).catch(function (error) {});
        },
        onAddStories: function onAddStories() {
            window.location.href = '/admin/stories/create';
        }
    }
});

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(320)
/* template */
var __vue_template__ = __webpack_require__(328)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/modules/VideosComponents.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3186b7ca", Component.options)
  } else {
    hotAPI.reload("data-v-3186b7ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_VideoLoopComponent__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_VideoLoopComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_VideoLoopComponent__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        VideoLoopComponent: __WEBPACK_IMPORTED_MODULE_0__partials_VideoLoopComponent___default.a
    },

    data: function data() {
        return {
            page: 1,
            videos: {},
            totalPage: 0,
            searchTerm: ''
        };
    },


    watch: {
        page: function page() {
            this.getVideosData(this.getQueryObject());
        },
        searchTerm: function searchTerm() {
            this.page = 1;
            this.getVideosData(this.getQueryObject());
        }
    },

    created: function created() {
        this.getVideosData(this.getQueryObject());
    },


    methods: {
        getVideosData: function getVideosData() {
            var _this = this;

            var queryObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var url = '/api/search/videos';
            if (queryObject.page != null) {
                url += '?page=' + queryObject.page;
            }

            if (queryObject.searchTerm != '') {
                url += '&search=' + queryObject.searchTerm;
            }

            axios.post(url).then(function (videos) {
                _this.$store.commit('setVideoData', videos.data.videos);
                _this.videos = videos.data.videos;
                _this.totalPage = _this.videos.last_page;
            }, function (error) {
                return reject();
            });
        },
        getQueryObject: function getQueryObject() {
            return {
                page: this.page,
                searchTerm: this.searchTerm
            };
        }
    }
});

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(322)
}
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(326)
/* template */
var __vue_template__ = __webpack_require__(327)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/partials/VideoLoopComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e32e034", Component.options)
  } else {
    hotAPI.reload("data-v-2e32e034", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(323);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(324)("64f90d79", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e32e034\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VideoLoopComponent.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e32e034\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VideoLoopComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(304)(true);
// imports


// module
exports.push([module.i, "\n.mailer-videos .v-input {\n  margin: 0;\n  padding: 0;\n}\n", "", {"version":3,"sources":["/Users/kamrulahmed/Sites/sniffr-app/resources/assets/admin/scripts/pages/mailer/partials/VideoLoopComponent.vue"],"names":[],"mappings":";AAAA;EACE,UAAU;EACV,WAAW;CAAE","file":"VideoLoopComponent.vue","sourcesContent":[".mailer-videos .v-input {\n  margin: 0;\n  padding: 0; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(325)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 325:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__ = __webpack_require__(314);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            selected: false
        };
    },


    props: ['video', 'index'],
    watch: {
        selected: function selected(_selected) {
            if (_selected) {
                this.$store.commit('addVideo', this.video);
            } else {
                this.$store.commit('removeVideo', this.video);
            }
        }
    },

    created: function created() {
        var _this = this;

        var videos = this.$store.getters.getAllSelectedVideos;
        videos.forEach(function (video) {
            if (video.id === _this.video.id) {
                _this.selected = true;
            }
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('addedVideoFromDialog', function (addedVideo) {
            if (addedVideo === _this.video.id) {
                _this.selected = true;
            }
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('removeVideoFromDialog', function (removedVideo) {
            if (removedVideo === _this.video.id) {
                _this.selected = false;
            }
        });
    },


    methods: {
        getAuthor: function getAuthor() {
            return this.video.created_user ? this.video.created_user.username : '';
        },
        onOpenVideoDialog: function onOpenVideoDialog() {
            __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].openVideoDialog(this.video.alpha_id);
        }
    }
});

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-flex",
        { attrs: { xs12: "", sm6: "", md6: "", lg3: "", xl3: "" } },
        [
          _c(
            "v-card",
            { attrs: { flat: "", hover: "" } },
            [
              _c("v-card-media", {
                attrs: {
                  height: "200px",
                  src: _vm.video.thumb
                    ? _vm.video.thumb
                    : _vm.video.image
                      ? _vm.video.image
                      : "/assets/images/placeholder.png"
                },
                on: {
                  click: function($event) {
                    _vm.onOpenVideoDialog()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        {
          staticClass: "mailer-title",
          attrs: { xs12: "", sm6: "", md6: "", lg4: "", xl4: "" }
        },
        [
          _c(
            "h4",
            {
              on: {
                click: function($event) {
                  _vm.onOpenVideoDialog()
                }
              }
            },
            [_vm._v(_vm._s(_vm.video.title))]
          ),
          _vm._v(" "),
          _c("p", [
            _vm._v(_vm._s(_vm._f("readmore")(_vm.video.excerpt, 300, "...")))
          ])
        ]
      ),
      _vm._v(" "),
      _c("v-flex", { attrs: { xs6: "", sm6: "", md6: "", lg2: "", xl2: "" } }, [
        _vm._v("\n        " + _vm._s(_vm.getAuthor()) + "\n    ")
      ]),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { xs12: "", sm6: "", md6: "", lg2: "", xl2: "" } },
        [
          _vm._v(
            "\n        " +
              _vm._s(_vm._f("convertDate")(_vm.video.created_at)) +
              "\n    "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { xs6: "", sm6: "", md6: "", lg1: "", xl1: "" } },
        [
          _c("v-checkbox", {
            attrs: { color: "black" },
            model: {
              value: _vm.selected,
              callback: function($$v) {
                _vm.selected = $$v
              },
              expression: "selected"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("v-flex", { attrs: { xs12: "" } }, [_c("v-divider")], 1)
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2e32e034", module.exports)
  }
}

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "mailer-videos" },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { staticClass: "text-xs-right", attrs: { xs12: "" } },
            [
              _c("v-text-field", {
                attrs: {
                  color: "dark",
                  "append-icon": "search",
                  label: "Search"
                },
                model: {
                  value: _vm.searchTerm,
                  callback: function($$v) {
                    _vm.searchTerm = $$v
                  },
                  expression: "searchTerm"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { staticClass: "hidden-sm-and-down", attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm3: "", md3: "", lg3: "", xl3: "" } },
            [_c("strong", [_vm._v("Thumbnail")])]
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", sm3: "", md3: "", lg4: "", xl4: "" } },
            [_c("strong", [_vm._v("Title / Excerpt")])]
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs6: "", sm6: "", md6: "", lg2: "", xl2: "" } },
            [_c("strong", [_vm._v("Author")])]
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", sm6: "", md6: "", lg2: "", xl2: "" } },
            [_c("strong", [_vm._v("Updated At")])]
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", sm6: "", md6: "", lg1: "", xl1: "" } },
            [_c("strong", [_vm._v("Select")])]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [_c("v-divider", { staticClass: "header" })],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.videos.data, function(video, index) {
        return _c("video-loop-component", {
          key: video.id,
          attrs: { index: index, video: video }
        })
      }),
      _vm._v(" "),
      _vm.videos.total > _vm.videos.per_page
        ? _c(
            "div",
            { staticClass: "text-xs-center" },
            [
              _c("v-pagination", {
                attrs: {
                  length: _vm.totalPage,
                  "total-visible": 7,
                  dark: "",
                  color: "black"
                },
                model: {
                  value: _vm.page,
                  callback: function($$v) {
                    _vm.page = $$v
                  },
                  expression: "page"
                }
              })
            ],
            1
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3186b7ca", module.exports)
  }
}

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(330)
/* template */
var __vue_template__ = __webpack_require__(335)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/modules/StoriesComponents.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13e37c8c", Component.options)
  } else {
    hotAPI.reload("data-v-13e37c8c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_StoryLoopComponent__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_StoryLoopComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_StoryLoopComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_bus_mailer_event_bus__ = __webpack_require__(334);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        StoryLoopComponent: __WEBPACK_IMPORTED_MODULE_0__partials_StoryLoopComponent___default.a
    },
    data: function data() {
        return {
            page: 1,
            stories: '',
            totalPage: 0,
            searchTerm: ''
        };
    },


    watch: {
        page: function page() {
            this.getStoriesData(this.getQueryObject());
        },
        searchTerm: function searchTerm() {
            this.page = 1;
            this.getStoriesData(this.getQueryObject());
        }
    },

    created: function created() {
        var _this = this;

        this.getStoriesData(this.getQueryObject());

        __WEBPACK_IMPORTED_MODULE_1__event_bus_mailer_event_bus__["a" /* default */].$on('storiesUpdated', function () {
            setTimeout(function () {
                _this.getStoriesData();
            }, 1000);
        });
    },


    methods: {
        getStoriesData: function getStoriesData() {
            var _this2 = this;

            var queryObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { page: 1, searchTerm: '' };

            var url = '/api/search/stories';
            if (queryObject.page != null) {
                url += '?page=' + queryObject.page;
            }

            if (queryObject.searchTerm != '') {
                url += '&search=' + queryObject.searchTerm;
            }

            url += '&mailer=true';

            axios.post(url).then(function (response) {
                _this2.$store.commit('setStories', response.data.stories);
                _this2.totalPage = response.data.stories.last_page;
                _this2.stories = response.data.stories;
            }).catch(function (error) {
                console.log(error);
            });
        },
        getQueryObject: function getQueryObject() {
            return {
                page: this.page,
                searchTerm: this.searchTerm
            };
        }
    }
});

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(332)
/* template */
var __vue_template__ = __webpack_require__(333)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/partials/StoryLoopComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-199422a8", Component.options)
  } else {
    hotAPI.reload("data-v-199422a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__ = __webpack_require__(315);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            selected: false,
            currStory: ''
        };
    },


    props: ['story', 'index'],

    watch: {
        selected: function selected(_selected) {
            if (_selected) {
                this.$store.commit('addStory', this.currStory);
            } else {
                this.$store.commit('removeStory', this.currStory);
            }
        }
    },

    created: function created() {
        var _this = this;

        var stories = this.$store.getters.getAllSelectedStories;
        this.currStory = this.story;

        stories.forEach(function (story) {
            if (story.id === _this.story.id) {
                _this.selected = true;
            }
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('addedStoryFromDialog', function (addedStory) {
            if (addedStory === _this.currStory.id) {
                _this.selected = true;
            }
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('removedStoryFromDialog', function (removedStory) {
            if (removedStory === _this.currStory.id) {
                _this.selected = false;
            }
        });
    },


    methods: {
        onStorySelect: function onStorySelect() {
            console.log(this.selected);
        },
        onOpenStoryDialog: function onOpenStoryDialog() {
            this.$store.commit('setCurrentStoryAssets', this.story);
            __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].openStoryDialog(this.story.alpha_id);
        },
        onEditStories: function onEditStories() {
            window.location.href = '/admin/stories/edit/' + this.story.id;
        }
    }
});

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-flex",
        { attrs: { xs12: "", sm6: "", md4: "" } },
        [
          _c(
            "v-card",
            { attrs: { flat: "", hover: "" } },
            [
              _c(
                "v-card-media",
                {
                  attrs: {
                    height: "250px",
                    src: _vm.story.thumb
                      ? _vm.story.thumb
                      : "/assets/images/placeholder.png"
                  },
                  on: {
                    click: function($event) {
                      _vm.onOpenStoryDialog()
                    }
                  }
                },
                [
                  _vm.story.flagged === 1
                    ? _c("div", { staticClass: "hot-story" }, [
                        _c("div", { staticClass: "hot-story-content" }, [
                          _vm._v("HOT")
                        ])
                      ])
                    : _vm._e()
                ]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-flex", { attrs: { xs12: "", sm6: "", md4: "" } }, [
        _c("h4", { domProps: { innerHTML: _vm._s(_vm.story.title) } }),
        _vm._v(" "),
        _c("div", { domProps: { innerHTML: _vm._s(_vm.story.excerpt) } })
      ]),
      _vm._v(" "),
      _c("v-flex", { attrs: { xs6: "", sm6: "", md1: "" } }, [
        _vm._v("\n        " + _vm._s(_vm.story.author) + "\n    ")
      ]),
      _vm._v(" "),
      _c("v-flex", { attrs: { xs6: "", sm6: "", md1: "" } }, [
        _vm._v("\n        " + _vm._s(_vm.story.state) + "\n    ")
      ]),
      _vm._v(" "),
      _c("v-flex", { attrs: { xs12: "", sm6: "", md1: "" } }, [
        _vm._v(
          "\n        " +
            _vm._s(_vm._f("convertDate")(_vm.story.created_at)) +
            "\n    "
        )
      ]),
      _vm._v(" "),
      _c(
        "v-flex",
        { staticClass: "story-input", attrs: { xs6: "", sm6: "", md1: "" } },
        [
          _c("v-checkbox", {
            attrs: { color: "black" },
            model: {
              value: _vm.selected,
              callback: function($$v) {
                _vm.selected = $$v
              },
              expression: "selected"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("v-flex", { attrs: { xs12: "" } }, [_c("v-divider")], 1)
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-199422a8", module.exports)
  }
}

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var MailerEventBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    data: function data() {
        return {};
    },


    methods: {
        storiesUpdated: function storiesUpdated() {
            this.$emit('storiesUpdated');
        }
    }

});

/* harmony default export */ __webpack_exports__["a"] = (MailerEventBus);

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "mailer-stories" },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { staticClass: "text-xs-right", attrs: { xs12: "" } },
            [
              _c("v-text-field", {
                attrs: {
                  color: "dark",
                  "append-icon": "search",
                  label: "Search"
                },
                model: {
                  value: _vm.searchTerm,
                  callback: function($$v) {
                    _vm.searchTerm = $$v
                  },
                  expression: "searchTerm"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { staticClass: "hidden-sm-and-down", attrs: { row: "", wrap: "" } },
        [
          _c("v-flex", { attrs: { xs12: "", sm3: "", md4: "" } }, [
            _c("strong", [_vm._v("Thumbnail")])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { xs12: "", sm3: "", md4: "" } }, [
            _c("strong", [_vm._v("Details")])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { xs6: "", sm6: "", md1: "" } }, [
            _c("strong", [_vm._v("Author")])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { xs6: "", sm6: "", md1: "" } }, [
            _c("strong", [_vm._v("State")])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { xs12: "", sm6: "", md1: "" } }, [
            _c("strong", [_vm._v("Updated At")])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { xs12: "", sm6: "", md1: "" } }, [
            _c("strong", [_vm._v("Select")])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [_c("v-divider", { staticClass: "header" })],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.stories.data, function(story, index) {
        return _c("story-loop-component", {
          key: story.id,
          attrs: { index: index, story: story }
        })
      }),
      _vm._v(" "),
      _vm.stories.total > _vm.stories.per_page
        ? _c(
            "div",
            { staticClass: "text-xs-center" },
            [
              _c("v-pagination", {
                attrs: {
                  length: _vm.totalPage,
                  "total-visible": 7,
                  dark: "",
                  color: "black"
                },
                model: {
                  value: _vm.page,
                  callback: function($$v) {
                    _vm.page = $$v
                  },
                  expression: "page"
                }
              })
            ],
            1
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-13e37c8c", module.exports)
  }
}

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(337)
/* template */
var __vue_template__ = __webpack_require__(348)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/modules/VideoInDialog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-236df9aa", Component.options)
  } else {
    hotAPI.reload("data-v-236df9aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_VideoInDialogComponent__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_VideoInDialogComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__includes_VideoInDialogComponent__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            selected: false,
            current_video: '',
            video_dialog: false,
            margin_content: true,
            current_page: 0,

            nextPageExists: true,
            nextPageAlphaId: '',

            previousPageExists: true,
            previousPageAlphaId: '',
            swipeDirection: ''

        };
    },


    watch: {
        video_dialog: function video_dialog() {
            var _this = this;

            if (this.video_dialog === false) {
                var url = this.$store.getters.getEnterStateUrl;
                this.$router.push({ path: url });
                setTimeout(function () {
                    _this.$store.commit('setResetVideoDialogObject');
                }, 500);
            }
        }
    },

    components: {
        VideoDialogComponent: __WEBPACK_IMPORTED_MODULE_1__includes_VideoInDialogComponent___default.a
    },

    created: function created() {
        var _this2 = this;

        var current_device = this.$vuetify.breakpoint.name;
        if (current_device == 'sm' || current_device == 'xs') {
            this.margin_content = false;
        }

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('videoDialogStateChange', function (alpha_id) {
            _this2.video_dialog = __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].openVideoDialogBox;
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('setNextPrevButton', function () {
            _this2.nextPageAlphaId = _this2.$store.getters.getNextVideoAlphaId;
            _this2.previousPageAlphaId = _this2.$store.getters.getPrevVideoAlphaId;

            _this2.checkAlphaIdExists();
            _this2.current_video = _this2.$store.getters.getCurrentVideoForDialog;

            _this2.isVideoSelected();
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('videoDialogBoxClose', function (video) {
            _this2.video_dialog = false;
            setTimeout(function () {
                _this2.$router.push({ name: 'videos_detail', params: { id: video.alpha_id } });
            }, 500);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('videoDialogBoxCloseByTag', function (tag) {
            _this2.video_dialog = false;
            setTimeout(function () {
                _this2.$router.push({ name: 'videos_tag', params: { value: tag.name } });
            }, 500);
        });
    },


    methods: {
        swipe: function swipe(direction) {
            this.swipeDirection = direction;
            if (direction === 'Right') {
                this.onPreviousVideo();
            }

            if (direction === 'Left') {
                this.onNextVideo();
            }
        },
        onPreviousVideo: function onPreviousVideo() {

            __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].videoDialogPrevButtonClick();
        },
        onNextVideo: function onNextVideo() {

            __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].videoDialogNextButtonClick();
        },
        onVideoClick: function onVideoClick() {
            if (this.selected) {
                this.$store.commit('addVideo', this.current_video);
                __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$emit('addedVideoFromDialog', this.current_video.id);
            } else {
                __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$emit('removeVideoFromDialog', this.current_video.id);
                this.$store.commit('removeVideo', this.current_video);
            }
        },
        onCloseDialogBox: function onCloseDialogBox() {
            this.video_dialog = false;
        },
        checkAlphaIdExists: function checkAlphaIdExists() {
            if (!this.nextPageAlphaId) {
                this.nextPageExists = false;
            } else {
                this.nextPageExists = true;
            }

            if (!this.previousPageAlphaId) {
                this.previousPageExists = false;
            } else {
                this.previousPageExists = true;
            }
        },
        isVideoSelected: function isVideoSelected() {
            var _this3 = this;

            var videos = this.$store.getters.getAllSelectedVideos;

            //set initialize state
            this.selected = false;
            videos.forEach(function (video) {
                if (video.id === _this3.current_video.id) {
                    _this3.selected = true;
                }
            });
        }
    }
});

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(339)
/* template */
var __vue_template__ = __webpack_require__(347)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/includes/VideoInDialogComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d937ce84", Component.options)
  } else {
    hotAPI.reload("data-v-d937ce84", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent__);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        videoPlayer: __WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent___default.a
    },
    data: function data() {
        return {
            video_detail: '',
            tags: [],

            ready_to_show: true,

            content_padding: true
        };
    },


    watch: {
        '$route': function $route(to, from, next) {}
    },

    created: function created() {
        var _this = this;

        var breakpoint = this.$vuetify.breakpoint.name;
        if (breakpoint === 'sm' || breakpoint === 'xs') {
            this.content_padding = false;
        }

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('videoDialogStateChange', function (alpha_id) {
            _this.getVideoData(alpha_id);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('onDialogClickNext', function () {
            var alpha_id = _this.$store.getters.getNextVideoAlphaId;
            _this.getVideoData(alpha_id);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('onDialogClickPrev', function () {
            var alpha_id = _this.$store.getters.getPrevVideoAlphaId;
            _this.getVideoData(alpha_id);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$on('onResetCurrentVideoIndialog', function () {
            _this.video_detail = '';
        });
    },
    mounted: function mounted() {},


    methods: {
        getVideoData: function getVideoData(alpha_id) {
            var _this2 = this;

            this.$store.commit('setRouteObject', this.$route);

            this.$store.dispatch('getVideoNextAndPrevLink', { alpha_id: alpha_id }).then(function () {
                _this2.video_detail = _this2.$store.getters.getCurrentVideoForDialog;
                if (_this2.video_detail.tags.length > 0) {
                    var _tags;

                    (_tags = _this2.tags).push.apply(_tags, _toConsumableArray(_this2.video_detail.tags));
                } else {
                    _this2.tags = [];
                }

                __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$emit('setNextPrevButton');
            });
        },
        getRecommendedData: function getRecommendedData(alpha_id) {
            var _this3 = this;

            this.$store.commit('setRouteObject', this.$route);

            this.$store.dispatch('getVideoNextAndPrevLink', { alpha_id: alpha_id }).then(function () {
                _this3.video_detail = _this3.$store.getters.getCurrentRecommendedForDialog;
                if (_this3.video_detail.tags.length > 0) {
                    var _tags2;

                    (_tags2 = _this3.tags).push.apply(_tags2, _toConsumableArray(_this3.video_detail.tags));
                } else {
                    _this3.tags = [];
                }

                __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$emit('setNextPrevButton');
            });
        },
        getMailerVideoData: function getMailerVideoData(alpha_id) {
            var _this4 = this;

            this.$store.commit('setRouteObject', this.$route);

            this.$store.dispatch('getVideoNextAndPrevLink', { alpha_id: alpha_id }).then(function () {
                _this4.video_detail = _this4.$store.getters.getCurrentMailerVideoForDialog;
                if (_this4.video_detail.tags.length > 0) {
                    var _tags3;

                    (_tags3 = _this4.tags).push.apply(_tags3, _toConsumableArray(_this4.video_detail.tags));
                } else {
                    _this4.tags = [];
                }

                __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].$emit('setNextPrevButton');
            });
        },
        goToTagSearch: function goToTagSearch(tag) {
            __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].closeDialogByTagSearch(tag);
        },
        goToDetail: function goToDetail() {
            __WEBPACK_IMPORTED_MODULE_0__event_bus_video_dialog_box_event_bus__["a" /* default */].closeVideoDialog(this.video_detail);
        }
    },

    destroyed: function destroyed() {}
});

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_youtubeVideoPlayer__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_videoPlayer__ = __webpack_require__(345);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        PlyrYoutube: __WEBPACK_IMPORTED_MODULE_0__player_youtubeVideoPlayer__["a" /* PlyrYoutube */],
        PlyrVideo: __WEBPACK_IMPORTED_MODULE_1__player_videoPlayer__["a" /* PlyrVideo */]
    },

    data: function data() {
        return {
            defaultImage: '~/assets/images/placeholder.png',

            showVideo: false,

            s3_video: false,
            videos: [],

            youtubeID: '',
            youtubeVideo: false,

            vimeoVideo: false,
            vimeoId: '',

            socialVideo: false,

            youtubeVideoPlayerOption: {
                autoplay: true,
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'airplay', 'fullscreen'],
                loop: { active: true }
            }
        };
    },


    props: ['video'],

    watch: {
        video: function video() {
            this.showVideo = false;
        }
    },

    created: function created() {},


    methods: {
        getThnumbnail: function getThnumbnail() {
            var string = "instagram";
            if (this.video.image && this.video.image.indexOf(string) !== -1) {
                return this.defaultImage;
            }
            return this.video.image;
        },
        change: function change() {
            var _this = this;

            this.showVideo = true;
            this.resetShowVideo();

            if (this.video.file_watermark_dirty !== null) {
                // let video = {src: this.video.file_watermark_dirty};
                var promise = new Promise(function (resolve, reject) {
                    _this.s3_video = true;
                    resolve();
                });

                promise.then(function () {
                    setTimeout(function () {
                        _this.$refs.playerVideo.play();
                    }, 100);
                });
                return;
            }

            if (this.video.youtube_id != null && this.video.youtube_id != '') {
                this.youtubeID = this.video.youtube_id;
                this.youtubeVideo = true;
                setTimeout(function () {
                    $('.plyr__control.plyr__control--overlaid').click();
                }, 100);
            }

            if (new RegExp('instagram', 'i').test(this.video.url)) {

                var _promise = new Promise(function (resolve, reject) {
                    _this.socialVideo = true;
                    resolve();
                });
                setTimeout(function () {
                    _this.reloadInstagrm();
                }, 100);
            }

            if (new RegExp('twitter', 'i').test(this.video.url)) {
                var promise = new Promise(function (resolve, reject) {
                    _this.socialVideo = true;
                    resolve();
                });

                setTimeout(function () {
                    _this.reloadTwitter();
                }, 100);
            }

            if (new RegExp('facebook', 'i').test(this.video.url)) {
                this.socialVideo = true;
                var promise = new Promise(function (resolve, reject) {
                    _this.socialVideo = true;
                    resolve();
                });

                setTimeout(function () {
                    _this.reloadFacebook();
                }, 100);
            }
        },
        getVideoPurchased: function getVideoPurchased() {
            if (this.video.video_collections && this.video.video_collections.length > 0) {
                return true;
            }
            return false;
        },
        includes: function includes(value, url) {
            var regex = value;
            var str = url;
            var m = void 0;

            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }
        },
        resetShowVideo: function resetShowVideo() {
            this.s3_video = false;
            this.youtubeVideo = false;
            this.vimeoVideo = false;
            this.socialVideo = false;
            this.youtubeID = '';
            this.videos = [];
        },
        reloadFacebook: function reloadFacebook() {
            if (!document.getElementById('facebook-jssdk')) {
                (function (d, s, id) {
                    var js,
                        fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=151068855526504";
                    fjs.parentNode.insertBefore(js, fjs);
                })(document, 'script', 'facebook-jssdk');
            } else {
                setTimeout(function () {
                    window.FB.XFBML.parse();
                }, 100);
            }
        },
        reloadTwitter: function reloadTwitter() {
            TwitterWidgetsLoader.load(function (twttr) {
                var tweets = jQuery(".tweet");

                $(tweets).each(function (t, tweet) {
                    var id = jQuery(this).attr('id');
                    twttr.widgets.createVideo(id, tweet).then(function (el) {
                        widget_type = el;
                    });
                });
            });
        },
        reloadVideoJs: function reloadVideoJs() {

            var videojs = document.createElement('script');
            videojs.type = "text/javascript";
            videojs.src = "assets/scripts/plugin.js";
            $('body').append(videojs);
        },
        reloadInstagrm: function reloadInstagrm() {
            var src = '//platform.instagram.com/en_US/embeds.js';
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = src;
            s.async = true;

            setTimeout(function () {
                if (typeof window.instgrm !== 'undefined') {
                    $('body').append(s);
                    window.instgrm.Embeds.process();
                } else {
                    $('body').append(s);
                }
            }, 500);
        }
    }
});

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlyrYoutube; });
/* unused harmony export index */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_plyr__ = __webpack_require__(342);
// import Plyr from 'plyr'


var PlyrYoutube = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.pe ? _c('div', { staticClass: "plyr__youtube-embed", attrs: { "id": "js-player-yt-" + _vm.idNumber } }, [_c('iframe', { attrs: { "src": "http://www.youtube.com/embed/" + _vm.id, "allowfullscreen": "", "allowtransparency": "", "allow": "autoplay" } })]) : _c('div', { attrs: { "id": "js-player-yt-" + _vm.idNumber, "data-plyr-provider": "youtube", "data-plyr-embed-id": _vm.id } });
    }, staticRenderFns: [],
    name: 'PlyrYoutube',
    props: {
        /** Options object for plyr config. */
        options: {
            type: Object,
            required: false,
            default: function default$1() {
                return {};
            }
        },
        /** Array of events to emit from the plyr object */
        emit: {
            type: Array,
            required: false,
            default: function default$2() {
                return [];
            }
        },
        /** Link or ID of youtube video. */
        id: {
            type: String,
            required: true
        },
        /** Bool of whether to use progressive enhancement or not */
        pe: {
            type: Boolean,
            required: false,
            default: function default$3() {
                return true;
            }
        }
    },
    data: function data() {
        return {
            player: {}
        };
    },
    computed: {
        idNumber: function idNumber() {
            return Math.floor(Math.random() * (100000 - 1)) + 1;
        }
    },

    mounted: function mounted() {
        var this$1 = this;

        var Plyr = __webpack_require__(313);
        this.player = new Plyr(document.getElementById("js-player-yt-" + this.idNumber), this.options);
        this.emit.forEach(function (element) {
            this$1.player.on(element, this$1.emitPlayerEvent);
        });
    },

    created: function created() {},


    beforeDestroy: function beforeDestroy() {
        // this.player.destroy();
    },

    methods: {
        emitPlayerEvent: function emitPlayerEvent(event) {
            this.$emit(event.type, event);
        }
    }
};

var Components = [PlyrYoutube];

var index = function index(Vue) {
    Components.forEach(function (Component) {
        Vue.component(Component.name, Component);
    });
};




/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Plyr */
/* unused harmony export PlyrVideo */
/* unused harmony export PlyrAudio */
/* unused harmony export PlyrYoutube */
/* unused harmony export PlyrVimeo */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_plyr_dist_plyr_css__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_plyr_dist_plyr_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_plyr_dist_plyr_css__);


// import plyr from 'plyr'
var Plyr = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { attrs: { "id": ("plyr-container-" + (_vm.idNumber)) } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'Plyr',
  props: {
    /** Options object for plyr config. */
    options: {
      type: Object,
      required: false,
      default: function default$1() {
        return {};
      }
    },
    /** Array of events to emit from the plyr object */
    emit: {
      type: Array,
      required: false,
      default: function default$2() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      player: {}
    };
  },
  computed: {
    idNumber: function idNumber() {
      return Math.floor(Math.random() * (100000 - 1)) + 1;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var plyr = __webpack_require__(313);
    // noinspection JSPotentiallyInvalidConstructorUsage
    this.player = new plyr(document.getElementById(("plyr-container-" + (this.idNumber))).firstChild, this.options);
    this.emit.forEach(function (element) {
      this$1.player.on(element, this$1.emitPlayerEvent);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.player.destroy();
  },
  methods: {
    emitPlayerEvent: function emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }
  }
};

// import Plyr from 'plyr'
var PlyrVideo = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('video', { ref: "video", staticClass: "video", attrs: { "id": ("js-player-video-" + (_vm.idNumber)), "poster": _vm.poster, "crossorigin": _vm.crossorigin } }, [_vm._l(_vm.videos, function (vid, index) {
      return _c('source', { key: index, attrs: { "src": vid.src, "type": ("video/" + (vid.format)) } });
    }), _vm._v(" "), _vm._l(_vm.subtitles, function (subtitle) {
      return _c('track', { key: subtitle.src, attrs: { "kind": "captions", "label": subtitle.label, "src": subtitle.src, "srclang": subtitle.srclang, "default": subtitle.default } });
    })], 2);
  }, staticRenderFns: [],
  name: 'PlyrVideo',
  props: {
    /** Options object for plyr config. */
    options: {
      type: Object,
      required: false,
      default: function default$1() {
        return {};
      }
    },
    /** Array of events to emit from the plyr object */
    emit: {
      type: Array,
      required: false,
      default: function default$2() {
        return [];
      }
    },
    /** Link to poster to show when video hasn't played yet. */
    poster: {
      type: String,
      required: true
    },
    /** Array of videos to include in the video source. */
    videos: {
      type: Array,
      required: true,
      validator: function (value) {
        var valid = true;
        value.forEach(function (vid) {
          var hasProps = vid.hasOwnProperty('src') && vid.hasOwnProperty('format');
          if (!hasProps) {
            valid = false;
          }
        });
        return valid;
      }
    },
    /** Object for subtitles track. */
    subtitles: {
      type: Array,
      required: false,
      default: function () { return []; },
      validator: function (value) {
        var valid = true;
        value.forEach(function (track) {
          var hasProps = track.hasOwnProperty('label') && track.hasOwnProperty('src') && track.hasOwnProperty('srclang');
          if (!hasProps) {
            valid = false;
          }
        });
        return valid;
      }
    },
    /** Boolean for whether to put crossorigin attribute on the video element. */
    crossorigin: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      player: {}
    };
  },
  computed: {
    idNumber: function idNumber() {
      return Math.floor(Math.random() * (100000 - 1)) + 1;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var Plyr = __webpack_require__(313);
    this.player = new Plyr(document.getElementById(("js-player-video-" + (this.idNumber))), this.options);
    this.emit.forEach(function (element) {
      this$1.player.on(element, this$1.emitPlayerEvent);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.player.destroy();
  },
  methods: {
    emitPlayerEvent: function emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }
  }
};

// import Plyr from 'plyr'
var PlyrYoutube = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.pe ? _c('div', { staticClass: "plyr__youtube-embed", attrs: { "id": ("js-player-yt-" + (_vm.idNumber)) } }, [_c('iframe', { attrs: { "src": ("https://www.youtube.com/embed/" + (_vm.id)), "allowfullscreen": "", "allowtransparency": "", "allow": "autoplay" } })]) : _c('div', { attrs: { "id": ("js-player-yt-" + (_vm.idNumber)), "data-plyr-provider": "youtube", "data-plyr-embed-id": _vm.id } });
  }, staticRenderFns: [],
  name: 'PlyrYoutube',
  props: {
    /** Options object for plyr config. */
    options: {
      type: Object,
      required: false,
      default: function default$1() {
        return {};
      }
    },
    /** Array of events to emit from the plyr object */
    emit: {
      type: Array,
      required: false,
      default: function default$2() {
        return [];
      }
    },
    /** Link or ID of youtube video. */
    id: {
      type: String,
      required: true
    },
    /** Bool of whether to use progressive enhancement or not */
    pe: {
      type: Boolean,
      required: false,
      default: function default$3() {
        return true;
      }
    }
  },
  data: function data() {
    return {
      player: {}
    };
  },
  computed: {
    idNumber: function idNumber() {
      return Math.floor(Math.random() * (100000 - 1)) + 1;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var Plyr = __webpack_require__(313);
    this.player = new Plyr(document.getElementById(("js-player-yt-" + (this.idNumber))), this.options);
    this.emit.forEach(function (element) {
      this$1.player.on(element, this$1.emitPlayerEvent);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.player.destroy();
  },
  methods: {
    emitPlayerEvent: function emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }
  }
};

// import Plyr from 'plyr'
var PlyrVimeo = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.pe ? _c('div', { staticClass: "plyr__video-embed", attrs: { "id": ("js-player-vimeo-" + (_vm.idNumber)) } }, [_c('iframe', { attrs: { "src": ("https://player.vimeo.com/video/" + (_vm.id)), "allowfullscreen": "", "allowtransparency": "", "allow": "autoplay" } })]) : _c('div', { attrs: { "id": ("js-player-vimeo-" + (_vm.idNumber)), "data-plyr-provider": "vimeo", "data-plyr-embed-id": _vm.id } });
  }, staticRenderFns: [],
  name: 'PlyrVimeo',
  props: {
    /** Options object for plyr config. */
    options: {
      type: Object,
      required: false,
      default: function default$1() {
        return {};
      }
    },
    /** Array of events to emit from the plyr object */
    emit: {
      type: Array,
      required: false,
      default: function default$2() {
        return [];
      }
    },
    /** Link or ID of vimeo video. */
    id: {
      type: String,
      required: true
    },
    /** Bool of whether to use progressive enhancement or not */
    pe: {
      type: Boolean,
      required: false,
      default: function default$3() {
        return true;
      }
    }
  },
  data: function data() {
    return {
      player: {}
    };
  },
  computed: {
    idNumber: function idNumber() {
      return Math.floor(Math.random() * (100000 - 1)) + 1;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var Plyr = __webpack_require__(313);
    this.player = new Plyr(document.getElementById(("js-player-vimeo-" + (this.idNumber))), this.options);
    this.emit.forEach(function (element) {
      this$1.player.on(element, this$1.emitPlayerEvent);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.player.destroy();
  },
  methods: {
    emitPlayerEvent: function emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }
  }
};

// import Plyr from 'plyr'
var PlyrAudio = { render: function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('audio', { ref: "audio", attrs: { "id": ("js-player-audio-" + (_vm.idNumber)) } }, _vm._l(_vm.tracks, function (track, index) {
      return _c('source', { key: index, attrs: { "src": track.src, "type": ("audio/" + (track.format)) } });
    }));
  }, staticRenderFns: [],
  name: 'PlyrAudio',
  props: {
    /** Options object for plyr config. */
    options: {
      type: Object,
      required: false,
      default: function default$1() {
        return {};
      }
    },
    /** Array of events to emit from the plyr object */
    emit: {
      type: Array,
      required: false,
      default: function default$2() {
        return [];
      }
    },
    /** Array of audio tracks to include in the audio source. */
    tracks: {
      type: Array,
      required: true,
      validator: function (value) {
        var valid = true;
        value.forEach(function (vid) {
          var hasProps = vid.hasOwnProperty('src') && vid.hasOwnProperty('format');
          if (!hasProps) {
            valid = false;
          }
        });
        return valid;
      }
    }
  },
  data: function data() {
    return {
      player: {}
    };
  },
  computed: {
    idNumber: function idNumber() {
      return Math.floor(Math.random() * (100000 - 1)) + 1;
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var Plyr = __webpack_require__(313);
    this.player = new Plyr(document.getElementById(("js-player-audio-" + (this.idNumber))), this.options);
    this.emit.forEach(function (element) {
      this$1.player.on(element, this$1.emitPlayerEvent);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.player.destroy();
  },
  methods: {
    emitPlayerEvent: function emitPlayerEvent(event) {
      this.$emit(event.type, event);
    }
  }
};

var Components = [Plyr, PlyrVideo, PlyrYoutube, PlyrVimeo, PlyrAudio];

var index = (function (Vue) {
  Components.forEach(function (Component) {
    Vue.component(Component.name, Component);
  });
});


/* unused harmony default export */ var _unused_webpack_default_export = (index);


/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(344);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(308)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./plyr.css", function() {
			var newContent = require("!!../../css-loader/index.js!./plyr.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(304)(false);
// imports


// module
exports.push([module.i, "@keyframes plyr-progress{to{background-position:25px 0}}@keyframes plyr-popup{0%{opacity:.5;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes plyr-fade-in{from{opacity:0}to{opacity:1}}.plyr{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;direction:ltr;font-family:Avenir,\"Avenir Next\",\"Helvetica Neue\",\"Segoe UI\",Helvetica,Arial,sans-serif;font-variant-numeric:tabular-nums;font-weight:500;line-height:1.7;max-width:100%;min-width:200px;position:relative;text-shadow:none;transition:box-shadow .3s ease}.plyr audio,.plyr video{border-radius:inherit;height:auto;vertical-align:middle;width:100%}.plyr button{font:inherit;line-height:inherit;width:auto}.plyr:focus{outline:0}.plyr--full-ui{box-sizing:border-box}.plyr--full-ui *,.plyr--full-ui ::after,.plyr--full-ui ::before{box-sizing:inherit}.plyr--full-ui a,.plyr--full-ui button,.plyr--full-ui input,.plyr--full-ui label{touch-action:manipulation}.plyr__badge{background:#4f5b5f;border-radius:2px;color:#fff;font-size:9px;line-height:1;padding:3px 4px}.plyr--full-ui ::-webkit-media-text-track-container{display:none}.plyr__captions{animation:plyr-fade-in .3s ease;bottom:0;color:#fff;display:none;font-size:14px;left:0;padding:10px;position:absolute;text-align:center;transition:transform .4s ease-in-out;width:100%}.plyr__captions .plyr__caption{background:rgba(0,0,0,.8);border-radius:2px;-webkit-box-decoration-break:clone;box-decoration-break:clone;line-height:185%;padding:.2em .5em;white-space:pre-wrap}.plyr__captions .plyr__caption div{display:inline}.plyr__captions span:empty{display:none}@media (min-width:480px){.plyr__captions{font-size:16px;padding:20px}}@media (min-width:768px){.plyr__captions{font-size:18px}}.plyr--captions-active .plyr__captions{display:block}.plyr:not(.plyr--hide-controls) .plyr__controls:not(:empty)~.plyr__captions{transform:translateY(-40px)}.plyr__control{background:0 0;border:0;border-radius:3px;color:inherit;cursor:pointer;flex-shrink:0;overflow:visible;padding:7px;position:relative;transition:all .3s ease}.plyr__control svg{display:block;fill:currentColor;height:18px;pointer-events:none;width:18px}.plyr__control:focus{outline:0}.plyr__control.plyr__tab-focus{box-shadow:0 0 0 5px rgba(26,175,255,.5);outline:0}.plyr__control.plyr__control--pressed .icon--not-pressed,.plyr__control.plyr__control--pressed .label--not-pressed,.plyr__control:not(.plyr__control--pressed) .icon--pressed,.plyr__control:not(.plyr__control--pressed) .label--pressed{display:none}.plyr--audio .plyr__control.plyr__tab-focus,.plyr--audio .plyr__control:hover,.plyr--audio .plyr__control[aria-expanded=true]{background:#1aafff;color:#fff}.plyr--video .plyr__control svg{filter:drop-shadow(0 1px 1px rgba(0, 0, 0, .15))}.plyr--video .plyr__control.plyr__tab-focus,.plyr--video .plyr__control:hover,.plyr--video .plyr__control[aria-expanded=true]{background:#1aafff;color:#fff}.plyr__control--overlaid{background:rgba(26,175,255,.8);border:0;border-radius:100%;box-shadow:0 1px 1px rgba(0,0,0,.15);color:#fff;display:none;left:50%;padding:15px;position:absolute;top:50%;transform:translate(-50%,-50%);z-index:2}.plyr__control--overlaid svg{height:20px;left:2px;position:relative;width:20px}.plyr__control--overlaid:focus,.plyr__control--overlaid:hover{background:#1aafff}.plyr--playing .plyr__control--overlaid{opacity:0;visibility:hidden}.plyr--full-ui.plyr--video .plyr__control--overlaid{display:block}.plyr--full-ui ::-webkit-media-controls{display:none}.plyr__controls{align-items:center;display:flex;justify-content:flex-end;text-align:center}.plyr__controls .plyr__menu,.plyr__controls .plyr__progress,.plyr__controls .plyr__time,.plyr__controls .plyr__volume,.plyr__controls>.plyr__control{margin-left:5px}.plyr__controls .plyr__menu+.plyr__control,.plyr__controls .plyr__progress+.plyr__control,.plyr__controls>.plyr__control+.plyr__control,.plyr__controls>.plyr__control+.plyr__menu{margin-left:2px}.plyr__controls>.plyr__control:first-child,.plyr__controls>.plyr__control:first-child+[data-plyr=pause]{margin-left:0;margin-right:auto}.plyr__controls:empty{display:none}@media (min-width:480px){.plyr__controls .plyr__menu,.plyr__controls .plyr__progress,.plyr__controls .plyr__time,.plyr__controls .plyr__volume,.plyr__controls>.plyr__control{margin-left:10px}}.plyr--audio .plyr__controls{background:#fff;border-radius:inherit;color:#4f5b5f;padding:10px}.plyr--video .plyr__controls{background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.7));border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;bottom:0;color:#fff;left:0;padding:20px 5px 5px;position:absolute;right:0;transition:opacity .4s ease-in-out,transform .4s ease-in-out;z-index:3}@media (min-width:480px){.plyr--video .plyr__controls{padding:35px 10px 10px}}.plyr--video.plyr--hide-controls .plyr__controls{opacity:0;pointer-events:none;transform:translateY(100%)}.plyr [data-plyr=airplay],.plyr [data-plyr=captions],.plyr [data-plyr=fullscreen],.plyr [data-plyr=pip]{display:none}.plyr--airplay-supported [data-plyr=airplay],.plyr--captions-enabled [data-plyr=captions],.plyr--fullscreen-enabled [data-plyr=fullscreen],.plyr--pip-supported [data-plyr=pip]{display:inline-block}.plyr__video-embed{height:0;padding-bottom:56.25%;position:relative}.plyr__video-embed iframe{border:0;height:100%;left:0;position:absolute;top:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.plyr--full-ui .plyr__video-embed>.plyr__video-embed__container{padding-bottom:240%;position:relative;transform:translateY(-38.28125%)}.plyr__menu{display:flex;position:relative}.plyr__menu .plyr__control svg{transition:transform .3s ease}.plyr__menu .plyr__control[aria-expanded=true] svg{transform:rotate(90deg)}.plyr__menu .plyr__control[aria-expanded=true] .plyr__tooltip{display:none}.plyr__menu__container{animation:plyr-popup .2s ease;background:rgba(255,255,255,.9);border-radius:4px;bottom:100%;box-shadow:0 1px 2px rgba(0,0,0,.15);color:#4f5b5f;font-size:16px;margin-bottom:10px;position:absolute;right:-3px;text-align:left;white-space:nowrap;z-index:3}.plyr__menu__container>div{overflow:hidden;transition:height .35s cubic-bezier(.4,0,.2,1),width .35s cubic-bezier(.4,0,.2,1)}.plyr__menu__container::after{border:4px solid transparent;border-top-color:rgba(255,255,255,.9);content:'';height:0;position:absolute;right:15px;top:100%;width:0}.plyr__menu__container [role=menu]{padding:7px}.plyr__menu__container [role=menuitem],.plyr__menu__container [role=menuitemradio]{margin-top:2px}.plyr__menu__container [role=menuitem]:first-child,.plyr__menu__container [role=menuitemradio]:first-child{margin-top:0}.plyr__menu__container .plyr__control{align-items:center;color:#4f5b5f;display:flex;font-size:14px;padding:4px 11px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.plyr__menu__container .plyr__control>span{align-items:inherit;display:flex;width:100%}.plyr__menu__container .plyr__control::after{border:4px solid transparent;content:'';position:absolute;top:50%;transform:translateY(-50%)}.plyr__menu__container .plyr__control--forward{padding-right:28px}.plyr__menu__container .plyr__control--forward::after{border-left-color:rgba(79,91,95,.8);right:5px}.plyr__menu__container .plyr__control--forward.plyr__tab-focus::after,.plyr__menu__container .plyr__control--forward:hover::after{border-left-color:currentColor}.plyr__menu__container .plyr__control--back{font-weight:500;margin:7px;margin-bottom:3px;padding-left:28px;position:relative;width:calc(100% - 14px)}.plyr__menu__container .plyr__control--back::after{border-right-color:rgba(79,91,95,.8);left:7px}.plyr__menu__container .plyr__control--back::before{background:#b7c5cd;box-shadow:0 1px 0 #fff;content:'';height:1px;left:0;margin-top:4px;overflow:hidden;position:absolute;right:0;top:100%}.plyr__menu__container .plyr__control--back.plyr__tab-focus::after,.plyr__menu__container .plyr__control--back:hover::after{border-right-color:currentColor}.plyr__menu__container .plyr__control[role=menuitemradio]{padding-left:7px}.plyr__menu__container .plyr__control[role=menuitemradio]::after,.plyr__menu__container .plyr__control[role=menuitemradio]::before{border-radius:100%}.plyr__menu__container .plyr__control[role=menuitemradio]::before{background:rgba(0,0,0,.1);content:'';display:block;flex-shrink:0;height:16px;margin-right:10px;transition:all .3s ease;width:16px}.plyr__menu__container .plyr__control[role=menuitemradio]::after{background:#fff;border:0;height:6px;left:12px;opacity:0;top:50%;transform:translateY(-50%) scale(0);transition:transform .3s ease,opacity .3s ease;width:6px}.plyr__menu__container .plyr__control[role=menuitemradio][aria-checked=true]::before{background:#1aafff}.plyr__menu__container .plyr__control[role=menuitemradio][aria-checked=true]::after{opacity:1;transform:translateY(-50%) scale(1)}.plyr__menu__container .plyr__control[role=menuitemradio].plyr__tab-focus::before,.plyr__menu__container .plyr__control[role=menuitemradio]:hover::before{background:rgba(0,0,0,.1)}.plyr__menu__container .plyr__menu__value{align-items:center;display:flex;margin-left:auto;margin-right:-5px;overflow:hidden;padding-left:25px;pointer-events:none}.plyr--full-ui input[type=range]{-webkit-appearance:none;background:0 0;border:0;border-radius:28px;color:#1aafff;display:block;height:20px;margin:0;padding:0;transition:box-shadow .3s ease;width:100%}.plyr--full-ui input[type=range]::-webkit-slider-runnable-track{background:0 0;border:0;border-radius:3px;height:6px;transition:box-shadow .3s ease;-webkit-user-select:none;user-select:none;background-image:linear-gradient(to right,currentColor var(--value,0),transparent var(--value,0))}.plyr--full-ui input[type=range]::-webkit-slider-thumb{background:#fff;border:0;border-radius:100%;box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2);height:14px;position:relative;transition:all .2s ease;width:14px;-webkit-appearance:none;margin-top:-4px}.plyr--full-ui input[type=range]::-moz-range-track{background:0 0;border:0;border-radius:3px;height:6px;transition:box-shadow .3s ease;-moz-user-select:none;user-select:none}.plyr--full-ui input[type=range]::-moz-range-thumb{background:#fff;border:0;border-radius:100%;box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2);height:14px;position:relative;transition:all .2s ease;width:14px}.plyr--full-ui input[type=range]::-moz-range-progress{background:currentColor;border-radius:3px;height:6px}.plyr--full-ui input[type=range]::-ms-track{background:0 0;border:0;border-radius:3px;height:6px;transition:box-shadow .3s ease;-ms-user-select:none;user-select:none;color:transparent}.plyr--full-ui input[type=range]::-ms-fill-upper{background:0 0;border:0;border-radius:3px;height:6px;transition:box-shadow .3s ease;-ms-user-select:none;user-select:none}.plyr--full-ui input[type=range]::-ms-fill-lower{background:0 0;border:0;border-radius:3px;height:6px;transition:box-shadow .3s ease;-ms-user-select:none;user-select:none;background:currentColor}.plyr--full-ui input[type=range]::-ms-thumb{background:#fff;border:0;border-radius:100%;box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2);height:14px;position:relative;transition:all .2s ease;width:14px;margin-top:0}.plyr--full-ui input[type=range]::-ms-tooltip{display:none}.plyr--full-ui input[type=range]:focus{outline:0}.plyr--full-ui input[type=range]::-moz-focus-outer{border:0}.plyr--full-ui input[type=range].plyr__tab-focus::-webkit-slider-runnable-track{box-shadow:0 0 0 5px rgba(26,175,255,.5);outline:0}.plyr--full-ui input[type=range].plyr__tab-focus::-moz-range-track{box-shadow:0 0 0 5px rgba(26,175,255,.5);outline:0}.plyr--full-ui input[type=range].plyr__tab-focus::-ms-track{box-shadow:0 0 0 5px rgba(26,175,255,.5);outline:0}.plyr--full-ui.plyr--video input[type=range]::-webkit-slider-runnable-track{background-color:rgba(255,255,255,.25)}.plyr--full-ui.plyr--video input[type=range]::-moz-range-track{background-color:rgba(255,255,255,.25)}.plyr--full-ui.plyr--video input[type=range]::-ms-track{background-color:rgba(255,255,255,.25)}.plyr--full-ui.plyr--video input[type=range]:active::-webkit-slider-thumb{box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2),0 0 0 3px rgba(255,255,255,.5)}.plyr--full-ui.plyr--video input[type=range]:active::-moz-range-thumb{box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2),0 0 0 3px rgba(255,255,255,.5)}.plyr--full-ui.plyr--video input[type=range]:active::-ms-thumb{box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2),0 0 0 3px rgba(255,255,255,.5)}.plyr--full-ui.plyr--audio input[type=range]::-webkit-slider-runnable-track{background-color:rgba(183,197,205,.66)}.plyr--full-ui.plyr--audio input[type=range]::-moz-range-track{background-color:rgba(183,197,205,.66)}.plyr--full-ui.plyr--audio input[type=range]::-ms-track{background-color:rgba(183,197,205,.66)}.plyr--full-ui.plyr--audio input[type=range]:active::-webkit-slider-thumb{box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2),0 0 0 3px rgba(0,0,0,.1)}.plyr--full-ui.plyr--audio input[type=range]:active::-moz-range-thumb{box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2),0 0 0 3px rgba(0,0,0,.1)}.plyr--full-ui.plyr--audio input[type=range]:active::-ms-thumb{box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(47,52,61,.2),0 0 0 3px rgba(0,0,0,.1)}.plyr__poster{background-color:#000;background-position:50% 50%;background-repeat:no-repeat;background-size:contain;height:100%;left:0;opacity:0;position:absolute;top:0;transition:opacity .2s ease;width:100%;z-index:1}.plyr--stopped.plyr__poster-enabled .plyr__poster{opacity:1}.plyr__time{font-size:14px}.plyr__time+.plyr__time::before{content:'\\2044';margin-right:10px}@media (max-width:767px){.plyr__time+.plyr__time{display:none}}.plyr--video .plyr__time{text-shadow:0 1px 1px rgba(0,0,0,.15)}.plyr__tooltip{background:rgba(255,255,255,.9);border-radius:3px;bottom:100%;box-shadow:0 1px 2px rgba(0,0,0,.15);color:#4f5b5f;font-size:14px;font-weight:500;left:50%;line-height:1.3;margin-bottom:10px;opacity:0;padding:5px 7.5px;pointer-events:none;position:absolute;transform:translate(-50%,10px) scale(.8);transform-origin:50% 100%;transition:transform .2s .1s ease,opacity .2s .1s ease;white-space:nowrap;z-index:2}.plyr__tooltip::before{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(255,255,255,.9);bottom:-4px;content:'';height:0;left:50%;position:absolute;transform:translateX(-50%);width:0;z-index:2}.plyr .plyr__control.plyr__tab-focus .plyr__tooltip,.plyr .plyr__control:hover .plyr__tooltip,.plyr__tooltip--visible{opacity:1;transform:translate(-50%,0) scale(1)}.plyr .plyr__control:hover .plyr__tooltip{z-index:3}.plyr__controls>.plyr__control:first-child .plyr__tooltip,.plyr__controls>.plyr__control:first-child+.plyr__control .plyr__tooltip{left:0;transform:translate(0,10px) scale(.8);transform-origin:0 100%}.plyr__controls>.plyr__control:first-child .plyr__tooltip::before,.plyr__controls>.plyr__control:first-child+.plyr__control .plyr__tooltip::before{left:16px}.plyr__controls>.plyr__control:last-child .plyr__tooltip{left:auto;right:0;transform:translate(0,10px) scale(.8);transform-origin:100% 100%}.plyr__controls>.plyr__control:last-child .plyr__tooltip::before{left:auto;right:16px;transform:translateX(50%)}.plyr__controls>.plyr__control:first-child .plyr__tooltip--visible,.plyr__controls>.plyr__control:first-child+.plyr__control .plyr__tooltip--visible,.plyr__controls>.plyr__control:first-child+.plyr__control.plyr__tab-focus .plyr__tooltip,.plyr__controls>.plyr__control:first-child+.plyr__control:hover .plyr__tooltip,.plyr__controls>.plyr__control:first-child.plyr__tab-focus .plyr__tooltip,.plyr__controls>.plyr__control:first-child:hover .plyr__tooltip,.plyr__controls>.plyr__control:last-child .plyr__tooltip--visible,.plyr__controls>.plyr__control:last-child.plyr__tab-focus .plyr__tooltip,.plyr__controls>.plyr__control:last-child:hover .plyr__tooltip{transform:translate(0,0) scale(1)}.plyr--video{background:#000;overflow:hidden}.plyr--video.plyr--menu-open{overflow:visible}.plyr__video-wrapper{background:#000;border-radius:inherit;overflow:hidden;position:relative;z-index:0}.plyr__progress{flex:1;left:7px;margin-right:14px;position:relative}.plyr__progress input[type=range],.plyr__progress__buffer{margin-left:-7px;margin-right:-7px;width:calc(100% + 14px)}.plyr__progress input[type=range]{position:relative;z-index:2}.plyr__progress .plyr__tooltip{font-size:14px;left:0}.plyr__progress__buffer{-webkit-appearance:none;background:0 0;border:0;border-radius:100px;height:6px;left:0;margin-top:-3px;padding:0;position:absolute;top:50%}.plyr__progress__buffer::-webkit-progress-bar{background:0 0;transition:width .2s ease}.plyr__progress__buffer::-webkit-progress-value{background:currentColor;border-radius:100px;min-width:6px}.plyr__progress__buffer::-moz-progress-bar{background:currentColor;border-radius:100px;min-width:6px;transition:width .2s ease}.plyr__progress__buffer::-ms-fill{border-radius:100px;transition:width .2s ease}.plyr--video .plyr__progress__buffer{box-shadow:0 1px 1px rgba(0,0,0,.15);color:rgba(255,255,255,.25)}.plyr--audio .plyr__progress__buffer{color:rgba(183,197,205,.66)}.plyr--loading .plyr__progress__buffer{animation:plyr-progress 1s linear infinite;background-image:linear-gradient(-45deg,rgba(47,52,61,.6) 25%,transparent 25%,transparent 50%,rgba(47,52,61,.6) 50%,rgba(47,52,61,.6) 75%,transparent 75%,transparent);background-repeat:repeat-x;background-size:25px 25px;color:transparent}.plyr--video.plyr--loading .plyr__progress__buffer{background-color:rgba(255,255,255,.25)}.plyr--audio.plyr--loading .plyr__progress__buffer{background-color:rgba(183,197,205,.66)}.plyr__volume{align-items:center;display:flex;flex:1;position:relative}.plyr__volume input[type=range]{margin-left:5px;position:relative;z-index:2}@media (min-width:480px){.plyr__volume{max-width:90px}}@media (min-width:768px){.plyr__volume{max-width:110px}}.plyr--is-ios .plyr__volume{display:none!important}.plyr--is-ios.plyr--vimeo [data-plyr=mute]{display:none!important}.plyr:-webkit-full-screen{background:#000;border-radius:0!important;height:100%;margin:0;width:100%}.plyr:-moz-full-screen{background:#000;border-radius:0!important;height:100%;margin:0;width:100%}.plyr:-ms-fullscreen{background:#000;border-radius:0!important;height:100%;margin:0;width:100%}.plyr:fullscreen{background:#000;border-radius:0!important;height:100%;margin:0;width:100%}.plyr:-webkit-full-screen video{height:100%}.plyr:-moz-full-screen video{height:100%}.plyr:-ms-fullscreen video{height:100%}.plyr:fullscreen video{height:100%}.plyr:-webkit-full-screen .plyr__video-wrapper{height:100%;width:100%}.plyr:-moz-full-screen .plyr__video-wrapper{height:100%;width:100%}.plyr:-ms-fullscreen .plyr__video-wrapper{height:100%;width:100%}.plyr:fullscreen .plyr__video-wrapper{height:100%;width:100%}.plyr:-webkit-full-screen .plyr__video-embed{overflow:visible}.plyr:-moz-full-screen .plyr__video-embed{overflow:visible}.plyr:-ms-fullscreen .plyr__video-embed{overflow:visible}.plyr:fullscreen .plyr__video-embed{overflow:visible}.plyr:-webkit-full-screen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr:-moz-full-screen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr:-ms-fullscreen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr:fullscreen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr:-webkit-full-screen .plyr__control .icon--exit-fullscreen{display:block}.plyr:-moz-full-screen .plyr__control .icon--exit-fullscreen{display:block}.plyr:-ms-fullscreen .plyr__control .icon--exit-fullscreen{display:block}.plyr:fullscreen .plyr__control .icon--exit-fullscreen{display:block}.plyr:-webkit-full-screen .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr:-moz-full-screen .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr:-ms-fullscreen .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr:fullscreen .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr:-webkit-full-screen.plyr--hide-controls{cursor:none}.plyr:-moz-full-screen.plyr--hide-controls{cursor:none}.plyr:-ms-fullscreen.plyr--hide-controls{cursor:none}.plyr:fullscreen.plyr--hide-controls{cursor:none}@media (min-width:1024px){.plyr:-webkit-full-screen .plyr__captions{font-size:21px}.plyr:-moz-full-screen .plyr__captions{font-size:21px}.plyr:-ms-fullscreen .plyr__captions{font-size:21px}.plyr:fullscreen .plyr__captions{font-size:21px}}.plyr:-webkit-full-screen{background:#000;border-radius:0!important;height:100%;margin:0;width:100%}.plyr:-webkit-full-screen video{height:100%}.plyr:-webkit-full-screen .plyr__video-wrapper{height:100%;width:100%}.plyr:-webkit-full-screen .plyr__video-embed{overflow:visible}.plyr:-webkit-full-screen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr:-webkit-full-screen .plyr__control .icon--exit-fullscreen{display:block}.plyr:-webkit-full-screen .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr:-webkit-full-screen.plyr--hide-controls{cursor:none}@media (min-width:1024px){.plyr:-webkit-full-screen .plyr__captions{font-size:21px}}.plyr:-moz-full-screen{background:#000;border-radius:0!important;height:100%;margin:0;width:100%}.plyr:-moz-full-screen video{height:100%}.plyr:-moz-full-screen .plyr__video-wrapper{height:100%;width:100%}.plyr:-moz-full-screen .plyr__video-embed{overflow:visible}.plyr:-moz-full-screen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr:-moz-full-screen .plyr__control .icon--exit-fullscreen{display:block}.plyr:-moz-full-screen .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr:-moz-full-screen.plyr--hide-controls{cursor:none}@media (min-width:1024px){.plyr:-moz-full-screen .plyr__captions{font-size:21px}}.plyr:-ms-fullscreen{background:#000;border-radius:0!important;height:100%;margin:0;width:100%}.plyr:-ms-fullscreen video{height:100%}.plyr:-ms-fullscreen .plyr__video-wrapper{height:100%;width:100%}.plyr:-ms-fullscreen .plyr__video-embed{overflow:visible}.plyr:-ms-fullscreen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr:-ms-fullscreen .plyr__control .icon--exit-fullscreen{display:block}.plyr:-ms-fullscreen .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr:-ms-fullscreen.plyr--hide-controls{cursor:none}@media (min-width:1024px){.plyr:-ms-fullscreen .plyr__captions{font-size:21px}}.plyr--fullscreen-fallback{background:#000;border-radius:0!important;height:100%;margin:0;width:100%;bottom:0;left:0;position:fixed;right:0;top:0;z-index:10000000}.plyr--fullscreen-fallback video{height:100%}.plyr--fullscreen-fallback .plyr__video-wrapper{height:100%;width:100%}.plyr--fullscreen-fallback .plyr__video-embed{overflow:visible}.plyr--fullscreen-fallback.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;transform:translateY(-50%)}.plyr--fullscreen-fallback .plyr__control .icon--exit-fullscreen{display:block}.plyr--fullscreen-fallback .plyr__control .icon--exit-fullscreen+svg{display:none}.plyr--fullscreen-fallback.plyr--hide-controls{cursor:none}@media (min-width:1024px){.plyr--fullscreen-fallback .plyr__captions{font-size:21px}}.plyr__ads{border-radius:inherit;bottom:0;cursor:pointer;left:0;overflow:hidden;position:absolute;right:0;top:0;z-index:-1}.plyr__ads>div,.plyr__ads>div iframe{height:100%;position:absolute;width:100%}.plyr__ads::after{background:rgba(47,52,61,.8);border-radius:2px;bottom:10px;color:#fff;content:attr(data-badge-text);font-size:11px;padding:2px 6px;pointer-events:none;position:absolute;right:10px;z-index:3}.plyr__ads::after:empty{display:none}.plyr__cues{background:currentColor;display:block;height:6px;left:0;margin:-3px 0 0;opacity:.8;position:absolute;top:50%;width:3px;z-index:3}.plyr--no-transition{transition:none!important}.plyr__sr-only{clip:rect(1px,1px,1px,1px);overflow:hidden;border:0!important;height:1px!important;padding:0!important;position:absolute!important;width:1px!important}.plyr [hidden]{display:none!important}", ""]);

// exports


/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlyrVideo; });
/* unused harmony export index */
// import Plyr from 'plyr'
var PlyrVideo = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('video', { ref: "video", staticClass: "video", attrs: { "id": "js-player-video-" + _vm.idNumber, "poster": _vm.poster, "crossorigin": _vm.crossorigin } }, [_vm._l(_vm.videos, function (vid, index) {
            return _c('source', { key: index, attrs: { "src": vid.src, "type": "video/" + vid.format } });
        }), _vm._v(" "), _vm._l(_vm.subtitles, function (subtitle) {
            return _c('track', { key: subtitle.src, attrs: { "kind": "captions", "label": subtitle.label, "src": subtitle.src, "srclang": subtitle.srclang, "default": subtitle.default } });
        })], 2);
    }, staticRenderFns: [],
    name: 'PlyrVideo',
    props: {
        /** Options object for plyr config. */
        options: {
            type: Object,
            required: false,
            default: function default$1() {
                return {};
            }
        },
        /** Array of events to emit from the plyr object */
        emit: {
            type: Array,
            required: false,
            default: function default$2() {
                return [];
            }
        },
        /** Link to poster to show when video hasn't played yet. */
        poster: {
            type: String,
            required: true
        },
        /** Array of videos to include in the video source. */
        videos: {
            type: Array,
            required: true,
            validator: function validator(value) {
                var valid = true;
                value.forEach(function (vid) {
                    var hasProps = vid.hasOwnProperty('src') && vid.hasOwnProperty('format');
                    if (!hasProps) {
                        valid = false;
                    }
                });
                return valid;
            }
        },
        /** Object for subtitles track. */
        subtitles: {
            type: Array,
            required: false,
            default: function _default() {
                return [];
            },
            validator: function validator(value) {
                var valid = true;
                value.forEach(function (track) {
                    var hasProps = track.hasOwnProperty('label') && track.hasOwnProperty('src') && track.hasOwnProperty('srclang');
                    if (!hasProps) {
                        valid = false;
                    }
                });
                return valid;
            }
        },
        /** Boolean for whether to put crossorigin attribute on the video element. */
        crossorigin: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            player: {}
        };
    },
    computed: {
        idNumber: function idNumber() {
            return Math.floor(Math.random() * (100000 - 1)) + 1;
        }
    },
    mounted: function mounted() {
        var this$1 = this;

        var Plyr = __webpack_require__(313);
        this.player = new Plyr(document.getElementById("js-player-video-" + this.idNumber), this.options);
        this.emit.forEach(function (element) {
            this$1.player.on(element, this$1.emitPlayerEvent);
        });
    },
    beforeDestroy: function beforeDestroy() {
        // this.player.destroy();
    },
    methods: {
        emitPlayerEvent: function emitPlayerEvent(event) {
            this.$emit(event.type, event);
        }
    }
};

var Components = [PlyrVideo];

var index = function index(Vue) {
    Components.forEach(function (Component) {
        Vue.component(Component.name, Component);
    });
};




/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "video-player" }, [
    _vm.showVideo
      ? _c("div", [
          _vm.s3_video
            ? _c("div", { staticClass: "s3-video" }, [
                _c("video", { ref: "playerVideo", attrs: { controls: "" } }, [
                  _c("source", {
                    attrs: {
                      src: _vm.video.file_watermark_dirty,
                      type: "video/mp4"
                    }
                  }),
                  _vm._v(
                    "\n                Your browser does not support the video tag.\n            "
                  )
                ])
              ])
            : _vm.youtubeVideo
              ? _c(
                  "div",
                  { staticClass: "youtube-video" },
                  [
                    _c("plyr-youtube", {
                      attrs: {
                        id: this.youtubeID,
                        pe: false,
                        options: _vm.youtubeVideoPlayerOption
                      }
                    })
                  ],
                  1
                )
              : _vm.socialVideo
                ? _c("div", { staticClass: "social-video" }, [
                    _c("div", {
                      domProps: { innerHTML: _vm._s(_vm.video.iframe) }
                    })
                  ])
                : _vm.video.url === null &&
                  _vm.video.file_watermark_dirty !== null
                  ? _c("div", { staticClass: "video" }, [
                      _c("div", {
                        attrs: { id: "cdn_video" },
                        domProps: { innerHTML: _vm._s(_vm.video.iframe) }
                      })
                    ])
                  : _vm._e()
        ])
      : _c(
          "div",
          {
            class: {
              vertical: _vm.video.vertical ? _vm.video.vertical : "",
              horizontal: !_vm.video.vertical
            },
            attrs: { xs12: "", "align-content-center": "", sm12: "", md7: "" }
          },
          [
            _c(
              "v-card",
              { staticClass: "video-player-poster", attrs: { flat: "" } },
              [
                _vm.getVideoPurchased()
                  ? _c("span", { staticClass: "label label-licensed" }, [
                      _vm._v("Purchased")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("v-card-media", { attrs: { src: _vm.getThnumbnail() } }),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    staticClass: "dark player-play",
                    attrs: { dark: "", fab: "", medium: "" },
                    on: {
                      click: function($event) {
                        _vm.change()
                      }
                    }
                  },
                  [
                    _c("v-icon", { attrs: { large: "" } }, [
                      _vm._v("play_arrow")
                    ])
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-98059184", module.exports)
  }
}

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "video-dialog-content" },
    [
      _vm.video_detail
        ? _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", sm12: "", md7: "", lg7: "", xl7: "" } },
                [_c("video-player", { attrs: { video: _vm.video_detail } })],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                {
                  class: {
                    "pl-4": _vm.content_padding,
                    "pt-4": !_vm.content_padding
                  },
                  attrs: { xs12: "", sm12: "", md5: "", lg5: "", xl5: "" }
                },
                [
                  _c(
                    "v-layout",
                    {
                      staticClass: "video-detail-content",
                      attrs: { row: "", wrap: "" }
                    },
                    [
                      _c("v-flex", { attrs: { xs12: "" } }, [
                        _c("div", { attrs: { clas: "video-title" } }, [
                          _c("h2", [_vm._v(_vm._s(_vm.video_detail.title))]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "video-title-caption" },
                            [
                              _c(
                                "v-layout",
                                {
                                  attrs: {
                                    row: "",
                                    wrap: "",
                                    "justify-center": ""
                                  }
                                },
                                [
                                  _c(
                                    "v-flex",
                                    { attrs: { xs6: "" } },
                                    [
                                      _c("v-icon", { attrs: { small: "" } }, [
                                        _vm._v("alarm")
                                      ]),
                                      _vm._v(
                                        " " +
                                          _vm._s(
                                            _vm._f("convertTime")(
                                              _vm.video_detail.duration
                                            )
                                          ) +
                                          "\n                                "
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-spacer"),
                                  _vm._v(" "),
                                  _vm.video_detail.views
                                    ? _c(
                                        "v-flex",
                                        {
                                          staticClass: "text-xs-right",
                                          attrs: { xs6: "" }
                                        },
                                        [
                                          _c(
                                            "v-icon",
                                            { attrs: { small: "" } },
                                            [_vm._v("remove_red_eye")]
                                          ),
                                          _vm._v(
                                            " " +
                                              _vm._s(
                                                _vm.video_detail.views + 1
                                              ) +
                                              " views\n                                "
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ]),
                        _vm._v(" "),
                        _vm.video_detail.description != "null"
                          ? _c("div", { staticClass: "content-description" }, [
                              _c("p", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("readmore")(
                                      _vm.video_detail.description,
                                      300,
                                      "..."
                                    )
                                  )
                                )
                              ])
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("div", { staticClass: "read-more text-xs-right" }, [
                          _c(
                            "a",
                            {
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  _vm.goToDetail()
                                }
                              }
                            },
                            [
                              _c("v-icon", { attrs: { small: "" } }, [
                                _vm._v("keyboard_arrow_right")
                              ]),
                              _vm._v("\n                            Read more")
                            ],
                            1
                          )
                        ]),
                        _vm._v(" "),
                        _vm.tags.length > 0
                          ? _c("div", { staticClass: "video-detail-tags" }, [
                              _c("h3", { attrs: { id: "tags" } }, [
                                _vm._v("Tags:")
                              ]),
                              _vm._v(" "),
                              _c(
                                "ul",
                                _vm._l(_vm.video_detail.tags, function(tag) {
                                  return _c("li", [
                                    _c(
                                      "a",
                                      {
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation()
                                            _vm.goToTagSearch(tag)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    #" +
                                            _vm._s(tag.name) +
                                            "\n                                "
                                        )
                                      ]
                                    )
                                  ])
                                })
                              )
                            ])
                          : _vm._e()
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d937ce84", module.exports)
  }
}

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-dialog",
    {
      attrs: { scrollable: "", "content-class": "video-dialog-container" },
      model: {
        value: _vm.video_dialog,
        callback: function($$v) {
          _vm.video_dialog = $$v
        },
        expression: "video_dialog"
      }
    },
    [
      _c(
        "div",
        { staticClass: "dialog-box-switch prev" },
        [
          _c(
            "v-btn",
            {
              attrs: {
                color: "dark ma-0 hidden-xs-only",
                fab: "",
                small: "",
                dark: "",
                disabled: !_vm.previousPageExists
              },
              on: {
                click: function($event) {
                  _vm.onPreviousVideo()
                }
              }
            },
            [_c("v-icon", [_vm._v("chevron_left")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "dialog-box-switch next" },
        [
          _c(
            "v-btn",
            {
              attrs: {
                color: "dark ma-0 hidden-xs-only",
                fab: "",
                small: "",
                dark: "",
                disabled: !_vm.nextPageExists
              },
              on: {
                click: function($event) {
                  _vm.onNextVideo()
                }
              }
            },
            [_c("v-icon", [_vm._v("chevron_right")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card",
        [
          _c(
            "v-toolbar",
            { attrs: { card: "", dark: "", color: "dark" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { icon: "", dark: "" },
                  nativeOn: {
                    click: function($event) {
                      _vm.onCloseDialogBox()
                    }
                  }
                },
                [_c("v-icon", [_vm._v("close")])],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-toolbar-items",
                [
                  _c("div", { staticClass: "mailer-label" }, [
                    _vm._v(
                      "\n                    Add to mailer\n                "
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-checkbox", {
                    on: {
                      change: function($event) {
                        _vm.onVideoClick()
                      }
                    },
                    model: {
                      value: _vm.selected,
                      callback: function($$v) {
                        _vm.selected = $$v
                      },
                      expression: "selected"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-card-text",
            { staticClass: "video-dialog-box" },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c("div", { staticClass: "video-dialog-loading" }),
                  _vm._v(" "),
                  _c(
                    "v-container",
                    {
                      directives: [
                        {
                          name: "touch",
                          rawName: "v-touch",
                          value: {
                            left: function() {
                              return _vm.swipe("Left")
                            },
                            right: function() {
                              return _vm.swipe("Right")
                            }
                          },
                          expression:
                            "{\n                                  left: () => swipe('Left'),\n                                  right: () => swipe('Right')\n                            }"
                        }
                      ],
                      attrs: { "grid-list-xl": "", fluid: "" }
                    },
                    [_c("video-dialog-component")],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-236df9aa", module.exports)
  }
}

/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(350)
/* template */
var __vue_template__ = __webpack_require__(354)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/modules/StoryDialog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95c41cc0", Component.options)
  } else {
    hotAPI.reload("data-v-95c41cc0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_StoryInDialogComponent__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_StoryInDialogComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__includes_StoryInDialogComponent__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            selected: false,

            current_story: '',
            story_dialog: false,
            margin_content: true,
            current_page: 0,

            nextPageExists: true,
            nextPageAlphaId: '',

            previousPageExists: true,
            previousPageAlphaId: '',
            swipeDirection: ''

        };
    },


    watch: {
        story_dialog: function story_dialog() {
            var _this = this;

            if (this.story_dialog === false) {
                setTimeout(function () {
                    _this.$store.commit('setResetStoryDialogObject');
                    __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].onResetCurrentStoryIndialog();
                }, 500);
            }
        }
    },

    components: {
        StoryDialogComponent: __WEBPACK_IMPORTED_MODULE_1__includes_StoryInDialogComponent___default.a
    },

    created: function created() {
        var _this2 = this;

        var current_device = this.$vuetify.breakpoint.name;

        if (current_device == 'sm' || current_device == 'xs') {
            this.margin_content = false;
        }

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('StoryDialogStateChange', function (alpha_id) {
            _this2.story_dialog = __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].openStoryDialogBox;
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('setNextPrevButton', function () {
            _this2.nextPageAlphaId = _this2.$store.getters.getNextStoryAlphaId;
            _this2.previousPageAlphaId = _this2.$store.getters.getPrevStoryAlphaId;

            _this2.checkAlphaIdExists();
            _this2.current_story = _this2.$store.getters.getCurrentStoryForDialog;

            //check story is selected or not
            _this2.isStorySelected();
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('videoDialogBoxClose', function (video) {
            _this2.story_dialog = false;
            setTimeout(function () {
                _this2.$router.push({ name: 'videos_detail', params: { id: video.alpha_id } });
            }, 500);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('videoDialogBoxCloseByTag', function (tag) {
            _this2.story_dialog = false;
            setTimeout(function () {
                _this2.$router.push({ name: 'videos_tag', params: { value: tag.name } });
            }, 500);
        });
    },


    methods: {
        swipe: function swipe(direction) {
            this.swipeDirection = direction;
            if (direction === 'Right') {
                this.onPreviousVideo();
            }

            if (direction === 'Left') {
                this.onNextVideo();
            }
        },
        onPreviousStory: function onPreviousStory() {
            __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].storyDialogPrevButtonClick();
        },
        onNextStory: function onNextStory() {
            __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].storyDialogNextButtonClick();
        },
        onCloseDialogBox: function onCloseDialogBox() {
            this.story_dialog = false;
            this.$store.commit('setResetVideoDialogObject');
        },
        checkAlphaIdExists: function checkAlphaIdExists() {
            if (!this.nextPageAlphaId) {
                this.nextPageExists = false;
            } else {
                this.nextPageExists = true;
            }

            if (!this.previousPageAlphaId) {
                this.previousPageExists = false;
            } else {
                this.previousPageExists = true;
            }
        },
        onStoryClick: function onStoryClick() {

            if (this.selected) {
                this.$store.commit('addStory', this.current_story);
                __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$emit('addedStoryFromDialog', this.current_story.id);
            } else {
                __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$emit('removedStoryFromDialog', this.current_story.id);
                this.$store.commit('removeStory', this.current_story);
            }
        },
        isStorySelected: function isStorySelected() {
            var _this3 = this;

            var stories = this.$store.getters.getAllSelectedStories;

            //set initialize state
            this.selected = false;
            stories.forEach(function (story) {
                if (story.id === _this3.current_story.id) {
                    _this3.selected = true;
                }
            });
        }
    }
});

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(352)
/* template */
var __vue_template__ = __webpack_require__(353)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/includes/StoryInDialogComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15baa484", Component.options)
  } else {
    hotAPI.reload("data-v-15baa484", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_bus_video_player_dialog_box_event_bus__ = __webpack_require__(317);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        videoPlayer: __WEBPACK_IMPORTED_MODULE_1__component_VideoPlayerComponent___default.a
    },
    data: function data() {
        return {
            story_detail: '',
            defaultImage: '/assets/images/placeholder.png',
            assets: [],

            ready_to_show: true,

            content_padding: true
        };
    },


    watch: {},

    created: function created() {
        var _this = this;

        var breakpoint = this.$vuetify.breakpoint.name;
        if (breakpoint === 'sm' || breakpoint === 'xs') {
            this.content_padding = false;
        }

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('StoryDialogStateChange', function (alpha_id) {
            _this.getStoryData(alpha_id);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('onStoryDialogClickNext', function () {
            var alpha_id = _this.$store.getters.getNextStoryAlphaId;
            _this.getStoryData(alpha_id);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('onStoryDialogClickPrev', function () {
            var alpha_id = _this.$store.getters.getPrevStoryAlphaId;
            _this.getStoryData(alpha_id);
        });

        __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$on('onResetCurrentStoryIndialog', function () {
            _this.story_detail = '';
            _this.assets = [];
        });
    },
    mounted: function mounted() {},


    methods: {
        getStoryData: function getStoryData(alpha_id) {
            var _this2 = this;

            this.$store.dispatch('getStoryNextAndPrevLink', { alpha_id: alpha_id }).then(function () {
                _this2.story_detail = _this2.$store.getters.getCurrentStoryForDialog;
                if (_this2.story_detail.assets.length > 0) {
                    var _assets;

                    _this2.assets = [];
                    (_assets = _this2.assets).push.apply(_assets, _toConsumableArray(_this2.story_detail.assets));
                } else {
                    _this2.assets = [];
                }

                _this2.$store.commit('setCurrentStoryAssets', _this2.story_detail);
                __WEBPACK_IMPORTED_MODULE_0__event_bus_story_dialog_box_event_bus__["a" /* default */].$emit('setNextPrevButton');
            });
        },
        onAssetDialog: function onAssetDialog(asset) {
            this.$store.commit('setStoryAssetDialogBox', { open: true, id: asset.id });
        },
        getThumbImage: function getThumbImage(asset) {
            if (asset.mime_type === "video/mp4") {
                return asset.thumbnail;
            }

            return asset.url;
        },
        goToTagSearch: function goToTagSearch(tag) {
            VideoDialogBoxEventBus.closeDialogByTagSearch(tag);
        },
        goToDetail: function goToDetail() {
            VideoDialogBoxEventBus.closeVideoDialog(this.video_detail);
        },
        onIsMovie: function onIsMovie(asset) {
            if (asset.jw_player_code != null) {
                return true;
            }
            return false;
        }
    }
});

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "story-dialog-content" },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md7: "" } },
            [
              _c(
                "v-layout",
                {
                  staticClass: "video-detail-content",
                  attrs: { row: "", wrap: "" }
                },
                [
                  _c("v-flex", { attrs: { xs12: "" } }, [
                    _c(
                      "div",
                      { attrs: { clas: "video-title" } },
                      [
                        _vm.story_detail.flagged == 1
                          ? _c(
                              "v-badge",
                              {
                                attrs: {
                                  left: "",
                                  dark: "",
                                  color: "dark story-in-dialog-badge"
                                }
                              },
                              [
                                _c(
                                  "v-icon",
                                  {
                                    attrs: {
                                      slot: "badge",
                                      dark: "",
                                      small: "",
                                      color: "red"
                                    },
                                    slot: "badge"
                                  },
                                  [
                                    _vm._v(
                                      "whatshot\n                            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c("h2", {
                                  domProps: {
                                    innerHTML: _vm._s(_vm.story_detail.title)
                                  }
                                })
                              ],
                              1
                            )
                          : _c("h2", {
                              domProps: {
                                innerHTML: _vm._s(_vm.story_detail.title)
                              }
                            }),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "video-title-caption" },
                          [
                            _c(
                              "v-layout",
                              {
                                attrs: {
                                  row: "",
                                  wrap: "",
                                  "justify-center": ""
                                }
                              },
                              [
                                _c(
                                  "v-flex",
                                  { attrs: { xs6: "" } },
                                  [
                                    _c("v-icon", { attrs: { small: "" } }, [
                                      _vm._v("alarm")
                                    ]),
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(_vm.story_detail.date_ingested) +
                                        "\n                                "
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("v-spacer"),
                                _vm._v(" "),
                                _c(
                                  "v-flex",
                                  {
                                    staticClass: "text-xs-right",
                                    attrs: { xs6: "" }
                                  },
                                  [
                                    _c("v-icon", { attrs: { small: "" } }, [
                                      _vm._v("edit")
                                    ]),
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(_vm.story_detail.author) +
                                        "\n                                "
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "content-description" }, [
                      _c("div", {
                        domProps: {
                          innerHTML: _vm._s(_vm.story_detail.description)
                        }
                      })
                    ])
                  ])
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md5: "" } },
            [
              _c(
                "v-container",
                { attrs: { "grid-list-sm": "", fluid: "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    _vm._l(_vm.assets, function(asset) {
                      return _c(
                        "v-flex",
                        {
                          key: asset.id,
                          attrs: { xs12: "", sm12: "", md6: "" }
                        },
                        [
                          _c(
                            "v-card",
                            { attrs: { hover: "" } },
                            [
                              _c(
                                "v-card-media",
                                {
                                  staticClass: "asset-thumbnail",
                                  attrs: {
                                    src: _vm.getThumbImage(asset),
                                    height: "200px"
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.onAssetDialog(asset)
                                    }
                                  }
                                },
                                [
                                  asset.mime_type === "video/mp4"
                                    ? _c(
                                        "div",
                                        { staticClass: "video-icon" },
                                        [
                                          _c(
                                            "v-icon",
                                            {
                                              attrs: {
                                                color: "light",
                                                dark: ""
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "videocam\n                                    "
                                              )
                                            ]
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    })
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-15baa484", module.exports)
  }
}

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-dialog",
    {
      attrs: { scrollable: "", "content-class": "video-dialog-container" },
      model: {
        value: _vm.story_dialog,
        callback: function($$v) {
          _vm.story_dialog = $$v
        },
        expression: "story_dialog"
      }
    },
    [
      _c(
        "div",
        { staticClass: "dialog-box-switch prev" },
        [
          _c(
            "v-btn",
            {
              attrs: {
                fab: "",
                small: "",
                dark: "",
                color: "dark ma-0 hidden-xs-only",
                disabled: !_vm.previousPageExists
              },
              on: {
                click: function($event) {
                  _vm.onPreviousStory()
                }
              }
            },
            [_c("v-icon", [_vm._v("chevron_left")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "dialog-box-switch next" },
        [
          _c(
            "v-btn",
            {
              attrs: {
                fab: "",
                small: "",
                dark: "",
                color: "dark ma-0 hidden-xs-only",
                disabled: !_vm.nextPageExists
              },
              on: {
                click: function($event) {
                  _vm.onNextStory()
                }
              }
            },
            [_c("v-icon", [_vm._v("chevron_right")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card",
        [
          _c(
            "v-toolbar",
            { attrs: { card: "", dark: "", color: "dark" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { icon: "", dark: "" },
                  nativeOn: {
                    click: function($event) {
                      _vm.onCloseDialogBox()
                    }
                  }
                },
                [_c("v-icon", [_vm._v("close")])],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-toolbar-items",
                [
                  _c("div", { staticClass: "mailer-label" }, [
                    _vm._v(
                      "\n                    Add to mailer\n                "
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-checkbox", {
                    on: {
                      change: function($event) {
                        _vm.onStoryClick()
                      }
                    },
                    model: {
                      value: _vm.selected,
                      callback: function($$v) {
                        _vm.selected = $$v
                      },
                      expression: "selected"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-card-text",
            { staticClass: "video-dialog-box" },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c("div", { staticClass: "video-dialog-loading" }),
                  _vm._v(" "),
                  _c(
                    "v-container",
                    {
                      directives: [
                        {
                          name: "touch",
                          rawName: "v-touch",
                          value: {
                            left: function() {
                              return _vm.swipe("Left")
                            },
                            right: function() {
                              return _vm.swipe("Right")
                            }
                          },
                          expression:
                            "{\n                                  left: () => swipe('Left'),\n                                  right: () => swipe('Right')\n                            }"
                        }
                      ],
                      attrs: { "grid-list-xl": "", fluid: "" }
                    },
                    [_c("story-dialog-component")],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-95c41cc0", module.exports)
  }
}

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(14)
/* script */
var __vue_script__ = __webpack_require__(356)
/* template */
var __vue_template__ = __webpack_require__(357)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin/scripts/pages/mailer/modules/VideoPlayerInDialog.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6deedc2c", Component.options)
  } else {
    hotAPI.reload("data-v-6deedc2c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_bus_video_player_dialog_box_event_bus__ = __webpack_require__(317);
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            videoPlayerDialog: false,
            video: '',

            margin_content: true
        };
    },


    watch: {
        videoPlayerDialog: function videoPlayerDialog(val) {
            if (val === false) {
                this.$refs.video_player.pause();
                this.video = '';
            }
        }
    },

    created: function created() {
        var _this = this;

        __WEBPACK_IMPORTED_MODULE_0__event_bus_video_player_dialog_box_event_bus__["a" /* default */].$on('openPlayerDialogBox', function (asset) {
            _this.videoPlayerDialog = true;
            _this.video = asset;
        });

        var current_device = this.$vuetify.breakpoint.name;
        if (current_device == 'sm' || current_device == 'xs') {
            this.margin_content = false;
        }
    },


    methods: {}

});

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-dialog",
    {
      style: { "line-height": 0, overflow: "hidden" },
      attrs: { "max-width": "500px", "content-class": "admin-video-player" },
      model: {
        value: _vm.videoPlayerDialog,
        callback: function($$v) {
          _vm.videoPlayerDialog = $$v
        },
        expression: "videoPlayerDialog"
      }
    },
    [
      _c("video", {
        ref: "video_player",
        attrs: { autoplay: "", controls: "", src: _vm.video.url }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6deedc2c", module.exports)
  }
}

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "admin-mailer-section" },
    [
      _c("video-in-dialog"),
      _vm._v(" "),
      _c("story-in-dialog"),
      _vm._v(" "),
      _c("video-player-in-dialog"),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: {
            "max-width": "400",
            persistent: "",
            "content-class": "mailer-dialog-error"
          },
          model: {
            value: _vm.dialog,
            callback: function($$v) {
              _vm.dialog = $$v
            },
            expression: "dialog"
          }
        },
        [
          _vm.notSelectedError
            ? _c(
                "v-card",
                [
                  _c("v-card-text", [
                    _c(
                      "div",
                      { staticClass: "text-xs-center" },
                      [
                        _c(
                          "v-icon",
                          { attrs: { size: "80px", color: "black" } },
                          [_vm._v("error_outline\n                    ")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-xs-center" }, [
                      _c("h4", { staticClass: "text-uppercase" }, [
                        _vm._v(_vm._s(_vm.errorMessage))
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "black darken-1", flat: "flat" },
                          nativeOn: {
                            click: function($event) {
                              _vm.dialog = false
                            }
                          }
                        },
                        [_vm._v("Ok\n                ")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            : _c(
                "v-card",
                [
                  _c("v-card-text", [
                    _c(
                      "div",
                      { staticClass: "text-xs-center my-4" },
                      [
                        _c(
                          "v-progress-circular",
                          {
                            attrs: {
                              size: 50,
                              width: 4,
                              color: "black",
                              indeterminate: _vm.indeterminate,
                              value: !_vm.indeterminate ? 100 : 0
                            }
                          },
                          [
                            !_vm.indeterminate
                              ? _c("v-icon", { attrs: { color: "black" } }, [
                                  _vm._v("done")
                                ])
                              : _vm._e()
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-xs-center" }, [
                      _c("h4", { staticClass: "text-uppercase" }, [
                        _vm._v(_vm._s(_vm.refreshTitle))
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            color: "black darken-1",
                            flat: "flat",
                            disabled: _vm.disableButton
                          },
                          nativeOn: {
                            click: function($event) {
                              _vm.dialog = false
                            }
                          }
                        },
                        [_vm._v("Ok\n                ")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-container",
        { attrs: { "grid-list-lg": "", fluid: "" } },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c(
                "v-flex",
                { staticClass: "text-xs-left" },
                [
                  _c(
                    "v-btn",
                    {
                      on: {
                        click: function($event) {
                          _vm.onAddStories()
                        }
                      }
                    },
                    [
                      _c("v-icon", [_vm._v("add")]),
                      _vm._v(
                        "\n                    Add Stories\n                "
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { staticClass: "text-xs-right" },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { dark: "", raised: "" },
                      on: {
                        click: function($event) {
                          _vm.onCreateMailer()
                        }
                      }
                    },
                    [
                      _c("v-icon", [_vm._v("add")]),
                      _vm._v("Create Mailer\n                ")
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-container",
        { attrs: { fluid: "", "grid-list-lg": "" } },
        [
          _c(
            "v-tabs",
            {
              attrs: { color: "dark", dark: "", "slider-color": "black" },
              model: {
                value: _vm.active,
                callback: function($$v) {
                  _vm.active = $$v
                },
                expression: "active"
              }
            },
            [
              _c("v-tab", [_vm._v("\n                Stories\n            ")]),
              _vm._v(" "),
              _c(
                "v-tab-item",
                [
                  _c(
                    "v-card",
                    [_c("v-card-text", [_c("mailer-stories-component")], 1)],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("v-tab", [_vm._v("\n                Videos\n            ")]),
              _vm._v(" "),
              _c(
                "v-tab-item",
                [
                  _c(
                    "v-card",
                    [_c("v-card-text", [_c("mailer-videos-component")], 1)],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6e17fdc4", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9NYWlsZXJDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbHlyL2Rpc3QvcGx5ci5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2V2ZW50LWJ1cy92aWRlby1kaWFsb2ctYm94LWV2ZW50LWJ1cy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvZXZlbnQtYnVzL3N0b3J5LWRpYWxvZy1ib3gtZXZlbnQtYnVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9jb21wb25lbnQvVmlkZW9QbGF5ZXJDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9ldmVudC1idXMvdmlkZW8tcGxheWVyLWRpYWxvZy1ib3gtZXZlbnQtYnVzLmpzIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL01haWxlckNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvc0NvbXBvbmVudHMudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvVmlkZW9zQ29tcG9uZW50cy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9wYXJ0aWFscy9WaWRlb0xvb3BDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZT9jNmM4Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZT9kY2FkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9wYXJ0aWFscy9WaWRlb0xvb3BDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZT9kMGQ5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9WaWRlb3NDb21wb25lbnRzLnZ1ZT9hNDIyIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9TdG9yaWVzQ29tcG9uZW50cy52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9TdG9yaWVzQ29tcG9uZW50cy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9wYXJ0aWFscy9TdG9yeUxvb3BDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL3BhcnRpYWxzL1N0b3J5TG9vcENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9wYXJ0aWFscy9TdG9yeUxvb3BDb21wb25lbnQudnVlP2ZmNDciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2V2ZW50LWJ1cy9tYWlsZXItZXZlbnQtYnVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9TdG9yaWVzQ29tcG9uZW50cy52dWU/OTBkYyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvVmlkZW9JbkRpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9WaWRlb0luRGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvaW5jbHVkZXMvVmlkZW9JbkRpYWxvZ0NvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9pbmNsdWRlcy9WaWRlb0luRGlhbG9nQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2NvbXBvbmVudC9WaWRlb1BsYXllckNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2NvbXBvbmVudC9wbGF5ZXIveW91dHViZVZpZGVvUGxheWVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtcGx5ci9kaXN0L3Z1ZS1wbHlyLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbHlyL2Rpc3QvcGx5ci5jc3M/YjI2YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGx5ci9kaXN0L3BseXIuY3NzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9jb21wb25lbnQvcGxheWVyL3ZpZGVvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9jb21wb25lbnQvVmlkZW9QbGF5ZXJDb21wb25lbnQudnVlPzk2ZGMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2luY2x1ZGVzL1ZpZGVvSW5EaWFsb2dDb21wb25lbnQudnVlPzA4YmMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvSW5EaWFsb2cudnVlPzliMWIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1N0b3J5RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1N0b3J5RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlJbkRpYWxvZ0NvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUluRGlhbG9nQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlJbkRpYWxvZ0NvbXBvbmVudC52dWU/MmQ5NSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvU3RvcnlEaWFsb2cudnVlP2YzODYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvUGxheWVySW5EaWFsb2cudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvVmlkZW9QbGF5ZXJJbkRpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvUGxheWVySW5EaWFsb2cudnVlPzM1MTUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9NYWlsZXJDb21wb25lbnQudnVlP2IxNTUiXSwibmFtZXMiOlsiVmlkZW9EaWFsb2dCb3hFdmVudEJ1cyIsImRhdGEiLCJvcGVuVmlkZW9EaWFsb2dCb3giLCJtZXRob2RzIiwib3BlblZpZGVvRGlhbG9nIiwiYWxwaGFfaWQiLCIkZW1pdCIsImNsb3NlVmlkZW9EaWFsb2ciLCJ2aWRlbyIsImNsb3NlRGlhbG9nQnlUYWdTZWFyY2giLCJ0YWciLCJ2aWRlb0RpYWxvZ05leHRCdXR0b25DbGljayIsInZpZGVvRGlhbG9nUHJldkJ1dHRvbkNsaWNrIiwib25SZXNldEN1cnJlbnRWaWRlb0luZGlhbG9nIiwiU3RvcnlEaWFsb2dCb3hFdmVudEJ1cyIsIm9wZW5TdG9yeURpYWxvZ0JveCIsIm9wZW5TdG9yeURpYWxvZyIsImNsb3NlU3RvcnlEaWFsb2ciLCJTdG9yeSIsInN0b3J5RGlhbG9nTmV4dEJ1dHRvbkNsaWNrIiwic3RvcnlEaWFsb2dQcmV2QnV0dG9uQ2xpY2siLCJvblJlc2V0Q3VycmVudFN0b3J5SW5kaWFsb2ciLCJWaWRlb1BsYXllckRpYWxvZ0JveEV2ZW50QnVzIiwib3BlblBsYXllckRpYWxvZ0JveCIsImFzc2V0IiwiY2xvc2VQbGF5ZXJEaWFsb2dCb3giLCJNYWlsZXJFdmVudEJ1cyIsInN0b3JpZXNVcGRhdGVkIiwiUGx5cllvdXR1YmUiLCJyZW5kZXIiLCJfdm0iLCJfaCIsIiRjcmVhdGVFbGVtZW50IiwiX2MiLCJfc2VsZiIsInBlIiwic3RhdGljQ2xhc3MiLCJhdHRycyIsImlkTnVtYmVyIiwiaWQiLCJzdGF0aWNSZW5kZXJGbnMiLCJuYW1lIiwicHJvcHMiLCJvcHRpb25zIiwidHlwZSIsIk9iamVjdCIsInJlcXVpcmVkIiwiZGVmYXVsdCIsImRlZmF1bHQkMSIsImVtaXQiLCJBcnJheSIsImRlZmF1bHQkMiIsIlN0cmluZyIsIkJvb2xlYW4iLCJkZWZhdWx0JDMiLCJwbGF5ZXIiLCJjb21wdXRlZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1vdW50ZWQiLCJ0aGlzJDEiLCJQbHlyIiwicmVxdWlyZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb3JFYWNoIiwiZWxlbWVudCIsIm9uIiwiZW1pdFBsYXllckV2ZW50IiwiY3JlYXRlZCIsImJlZm9yZURlc3Ryb3kiLCJldmVudCIsIkNvbXBvbmVudHMiLCJpbmRleCIsIlZ1ZSIsIkNvbXBvbmVudCIsImNvbXBvbmVudCIsIlBseXJWaWRlbyIsInJlZiIsInBvc3RlciIsImNyb3Nzb3JpZ2luIiwiX2wiLCJ2aWRlb3MiLCJ2aWQiLCJrZXkiLCJzcmMiLCJmb3JtYXQiLCJfdiIsInN1YnRpdGxlcyIsInN1YnRpdGxlIiwibGFiZWwiLCJzcmNsYW5nIiwidmFsaWRhdG9yIiwidmFsdWUiLCJ2YWxpZCIsImhhc1Byb3BzIiwiaGFzT3duUHJvcGVydHkiLCJ0cmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdCQUFnQjtBQUNuRCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxjQUFjOztBQUVsRTtBQUNBOzs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQTJCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBOztBQUVBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDL1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4RkE7QUFDQTtBQUNBO0FBQ0EsNENBQXNSO0FBQ3RSO0FBQ0EsOENBQXNMO0FBQ3RMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7QUN4Q0Esd0ZBQTBDLDJGQUEwSSxpQkFBaUIsYUFBYSxrQkFBa0Isa0NBQWtDLGlCQUFpQixxQ0FBcUMsZUFBZSxlQUFlLGVBQWUscUJBQXFCLGVBQWUscUJBQXFCLGVBQWUsd0JBQXdCLGVBQWUscUJBQXFCLGVBQWUseUVBQXlFLElBQUksOENBQThDLHVDQUF1Qyw4QkFBOEIsc0JBQXNCLHNCQUFzQix1QkFBdUIsNkJBQTZCLG9CQUFvQixnQ0FBZ0Msb0JBQW9CLHNCQUFzQixtQkFBbUIsbUJBQW1CLGtCQUFrQiwyQkFBMkIsMEJBQTBCLGlCQUFpQixvREFBb0QsbUJBQW1CLHdDQUF3QyxpQkFBaUIsNEJBQTRCLFFBQVEsbUVBQW1FLElBQUksOEJBQThCLFNBQVMsVUFBVSxTQUFTLGNBQWMsU0FBUyxJQUFJLDhCQUE4QixZQUFZLGVBQWUsa0JBQWtCLEVBQUUsaUZBQWlGLFVBQVUsU0FBUyxHQUFHLGtCQUFrQiw0TEFBNEwsMERBQTBELHVCQUF1QixPQUFPLG9CQUFvQix3QkFBd0IsK0NBQStDLHNDQUFzQyx1REFBdUQsR0FBRyxjQUFjLHNNQUFzTSwwQkFBMEIsY0FBYyxzTUFBc00sMEJBQTBCLGNBQWMsc01BQXNNLDZCQUE2QixhQUFhLDBDQUEwQyxJQUFJLHNCQUFzQixnQkFBZ0IsU0FBUyxjQUFjLHNMQUFzTCw4QkFBOEIseUJBQXlCLGlDQUFpQyxJQUFJLFVBQVUsRUFBRSxFQUFFLG9CQUFvQixvQkFBb0IsOEVBQThFLGNBQWMsZ0JBQWdCLFlBQVksV0FBVyxLQUFLLFdBQVcsK0dBQStHLHVCQUF1Qix3Q0FBd0MscUJBQXFCLHlDQUF5QyxrREFBa0QsV0FBVyxjQUFjLHFCQUFxQiw2QkFBNkIscURBQXFELDRCQUE0QixJQUFJLGlDQUFpQywyREFBMkQsT0FBTyxTQUFTLFNBQVMsUUFBUSxJQUFJLHlCQUF5QixRQUFRLGNBQWMsU0FBUyxNQUFNLDZFQUE2RSxHQUFHLGdCQUFnQixxQkFBcUIsOENBQThDLDJEQUEyRCx3REFBd0QsRUFBRSxnQkFBZ0IsZ0VBQWdFLGdCQUFnQiw0QkFBNEIsc0JBQXNCLDJCQUEyQiwyQkFBMkIsRUFBRSxrQkFBa0IsZ0NBQWdDLDBEQUEwRCxvQkFBb0Isc0NBQXNDLGNBQWMsc0hBQXNILGNBQWMsOENBQThDLElBQUksaUNBQWlDLGdCQUFnQixtR0FBbUcsZ0JBQWdCLHFDQUFxQyxRQUFRLEtBQUssd0NBQXdDLHVIQUF1SCxvQkFBb0IsbUVBQW1FLE1BQU0sK0JBQStCLE1BQU0sZ0JBQWdCLElBQUksZ0JBQWdCLGlCQUFpQixRQUFRLHVGQUF1RixrQkFBa0Isc0RBQXNELGdCQUFnQixFQUFFLGlCQUFpQixlQUFlLGtGQUFrRixTQUFTLGdCQUFnQiw2Q0FBNkMsZ0JBQWdCLE9BQU8saUJBQWlCLGlHQUFpRywrREFBK0QsWUFBWSxjQUFjLG1EQUFtRCxjQUFjLGdEQUFnRCxhQUFhLDRIQUE0SCxrRUFBa0UsaURBQWlELDRJQUE0SSxtQ0FBbUMsMkJBQTJCLHVCQUF1QixjQUFjLHNCQUFzQixJQUFJLCtCQUErQixXQUFXLElBQUksU0FBUyx1T0FBdU8sSUFBSSwwSEFBMEgsSUFBSSxrSUFBa0ksdURBQXVELE9BQU8seURBQXlELGlOQUFpTiwrQkFBK0IseUNBQXlDLGFBQWEsNERBQTRELGlCQUFpQixxQkFBcUIsSUFBSSw4REFBOEQsU0FBUyxVQUFVLHdTQUF3UyxJQUFJLHNCQUFzQixXQUFXLHlGQUF5Riw2Q0FBNkMsS0FBSyw4QkFBOEIsK0NBQStDLHNDQUFzQyxrQkFBa0IsbUJBQW1CLGlCQUFpQixXQUFXLHlDQUF5QyxlQUFlLDRDQUE0Qyx3Q0FBd0MsRUFBRSx5Q0FBeUMsaUJBQWlCLDRDQUE0QywwQ0FBMEMsRUFBRSxNQUFNLG9FQUFvRSx1RkFBdUYsNEJBQTRCLHVEQUF1RCxVQUFVLGlCQUFpQixVQUFVLElBQUksR0FBRywyQkFBMkIsa0tBQWtLLGNBQWMseUNBQXlDLHdCQUF3QixJQUFJLGdCQUFnQix5Q0FBeUMsZUFBZSxJQUFJLGFBQWEsbUVBQW1FLDJDQUEyQyxJQUFJLHdCQUF3QixzQkFBc0IsZ0JBQWdCLHVEQUF1RCxnRUFBZ0UsS0FBSyxxQ0FBcUMsVUFBVSxtQ0FBbUMsY0FBYyxrREFBa0QsSUFBSSx3QkFBd0IsMkNBQTJDLE1BQU0saUJBQWlCLHVCQUF1QixFQUFFLGFBQWEsd0xBQXdMLCtEQUErRCwwQ0FBMEMsYUFBYSwwR0FBMEcsMkRBQTJELEVBQUUsYUFBYSw2RUFBNkUsb0JBQW9CLDZFQUE2RSxzREFBc0Qsd0NBQXdDLGNBQWMsb0NBQW9DLG9DQUFvQyxpQkFBaUIsNEhBQTRILG1DQUFtQyxrQkFBa0IsdUJBQXVCLE9BQU8sRUFBRSxTQUFTLGVBQWUsTUFBTSxXQUFXLDZDQUE2QywyQkFBMkIsV0FBVyxJQUFJLGNBQWMsY0FBYyw4RUFBOEUsYUFBYSw0QkFBNEIsMkNBQTJDLDRDQUE0QywwQkFBMEIsb0JBQW9CLHFDQUFxQyxFQUFFLDRCQUE0QiwyQ0FBMkMsaUJBQWlCLGlCQUFpQixtRUFBbUUsSUFBSSwrQkFBK0IsSUFBSSx1Q0FBdUMscUdBQXFHLFNBQVMsV0FBVyxLQUFLLEdBQUcsZUFBZSxvRUFBb0UsaUNBQWlDLElBQUkseUJBQXlCLG1DQUFtQyxxQ0FBcUMsa0JBQWtCLDhCQUE4QixTQUFTLGtCQUFrQixtQkFBbUIsd0NBQXdDLDBCQUEwQiwrQ0FBK0MsU0FBUyxNQUFNLEVBQUUsaUJBQWlCLGdCQUFnQiwrQkFBK0IseUNBQXlDLGlCQUFpQiwyRUFBMkUsYUFBYSxrREFBa0QsNERBQTRELDhDQUE4QyxhQUFhLG9CQUFvQixnQkFBZ0IsdUJBQXVCLHVFQUF1RSxVQUFVLFdBQVcsb0JBQW9CLElBQUksbUJBQW1CLCtCQUErQixnQkFBZ0IsNEJBQTRCLGdCQUFnQiwwQkFBMEIsY0FBYyxtTEFBbUwsb0NBQW9DLGtCQUFrQix3QkFBd0IseUJBQXlCLDBEQUEwRCxRQUFRLHNCQUFzQiw4R0FBOEcsT0FBTyxnQ0FBZ0MseUJBQXlCLElBQUkseUdBQXlHLGlvQkFBaW9CLDBGQUEwRiw0R0FBNEcsd0JBQXdCLHlMQUF5TCxvSkFBb0osU0FBUyw4SEFBOEgsMEJBQTBCLDZJQUE2SSxTQUFTLHNDQUFzQyxHQUFHLDZFQUE2RSw4SkFBOEoseUJBQXlCLCtEQUErRCxJQUFJLDRCQUE0QixzQkFBc0IsZ0NBQWdDLElBQUksd0VBQXdFLEtBQUsseUJBQXlCLDBCQUEwQixnQkFBZ0Isd0NBQXdDLEVBQUUsK0JBQStCLHdDQUF3QyxPQUFPLDRCQUE0QixvQ0FBb0Msb0RBQW9ELDJMQUEyTCxzREFBc0QsTUFBTSx5REFBeUQsTUFBTSw0RkFBNEYsTUFBTSxzR0FBc0csTUFBTSxxR0FBcUcsTUFBTSxnQkFBZ0IsbURBQW1ELHNCQUFzQiw0Q0FBNEMsMEJBQTBCLDZDQUE2Qyx1QkFBdUIsNkNBQTZDLDJCQUEyQix5UkFBeVIsMkJBQTJCLHNEQUFzRCxtS0FBbUssS0FBSyxtRUFBbUUsOEJBQThCLDBEQUEwRCwyREFBMkQsS0FBSyxpQkFBaUIsa0NBQWtDLE9BQU8sa0NBQWtDLDRCQUE0QixpQ0FBaUMsb0NBQW9DLHdCQUF3Qix5REFBeUQsMEdBQTBHLFdBQVcsb0NBQW9DLHFDQUFxQyxXQUFXLGdDQUFnQyxpR0FBaUcsb0NBQW9DLCtEQUErRCxLQUFLLGFBQWEsc05BQXNOLDZCQUE2QixvREFBb0QsRUFBRSw0QkFBNEIsa0tBQWtLLG1JQUFtSSxlQUFlLGlHQUFpRyw2QkFBNkIsOENBQThDLGlCQUFpQix3REFBd0QscUNBQXFDLHNCQUFzQiw4Q0FBOEMsbURBQW1ELGtEQUFrRCxzQ0FBc0MsOERBQThELHdDQUF3QyxNQUFNLDBCQUEwQixNQUFNLGtDQUFrQyxvREFBb0QsZ0VBQWdFLHVCQUF1Qix5SEFBeUgsaURBQWlELDhCQUE4Qix1TEFBdUwsNERBQTRELHlCQUF5QixpUEFBaVAsc0JBQXNCLCtEQUErRCwwREFBMEQsNEJBQTRCLFdBQVcsa0NBQWtDLFlBQVksb0JBQW9CLGlPQUFpTyxNQUFNLDRDQUE0QyxpRUFBaUUsaUJBQWlCLFVBQVUsd0NBQXdDLDZDQUE2QyxtREFBbUQsNkJBQTZCLDRCQUE0QixtREFBbUQsMkNBQTJDLGlEQUFpRCxrR0FBa0csNENBQTRDLFlBQVksZUFBZSxTQUFTLE1BQU0sa0RBQWtELGtCQUFrQixvRkFBb0YsNkNBQTZDLGtFQUFrRSwrQkFBK0IsV0FBVyxxSUFBcUksb0hBQW9ILHVDQUF1QyxvQkFBb0IsS0FBSyw2Q0FBNkMsS0FBSyxrREFBa0QsOERBQThELHFQQUFxUCx3QkFBd0IseUVBQXlFLG1NQUFtTSwyQkFBMkIsbUVBQW1FLGtIQUFrSCw0R0FBNEcsZ0RBQWdELCtPQUErTyxnQ0FBZ0Msd0NBQXdDLCtCQUErQixrREFBa0Qsc0NBQXNDLEtBQUssNExBQTRMLHVHQUF1Ryx1RUFBdUUsNEhBQTRILDRDQUE0Qyw4QkFBOEIsd0JBQXdCLFVBQVUsMkRBQTJELEVBQUUsOEJBQThCLHVDQUF1Qyx3QkFBd0IsWUFBWSw2Q0FBNkMscUJBQXFCLDRCQUE0QixXQUFXLHFEQUFxRCwyRUFBMkUsMERBQTBELDRDQUE0QyxHQUFHLG9FQUFvRSw4RUFBOEUsd0NBQXdDLCtCQUErQixzQ0FBc0Msc0JBQXNCLDBCQUEwQixzRkFBc0Ysb0NBQW9DLDhDQUE4QyxJQUFJLEVBQUUsNENBQTRDLDRCQUE0QixXQUFXLHNEQUFzRCwwSEFBMEgsK0VBQStFLDBCQUEwQixPQUFPLDZLQUE2SyxFQUFFLFdBQVcsK0ZBQStGLHFGQUFxRiwwQkFBMEIsV0FBVyxtREFBbUQseUVBQXlFLHVLQUF1SywwQ0FBMEMsRUFBRSxnRUFBZ0UsaUhBQWlILDBCQUEwQixnRUFBZ0UsRUFBRSwwQ0FBMEMsc0JBQXNCLHNGQUFzRixnQkFBZ0IsRUFBRSxrQ0FBa0MsZ0NBQWdDLDhEQUE4RCx5Q0FBeUMsUUFBUSwrRUFBK0UsZ0JBQWdCLEdBQUcsNENBQTRDLGtCQUFrQix3QkFBd0Isb0VBQW9FLCtCQUErQixtQkFBbUIsb0JBQW9CLDhDQUE4QyxvQkFBb0IsMkJBQTJCLGlDQUFpQyxnTkFBZ04seUJBQXlCLHNCQUFzQixzR0FBc0cscUNBQXFDLGFBQWEsa0JBQWtCLDBCQUEwQiwyTEFBMkwsaUJBQWlCLDZEQUE2RCxnQkFBZ0IsRUFBRSxvQ0FBb0Msb0VBQW9FLGtDQUFrQyw4QkFBOEIsZ0hBQWdILDBEQUEwRCxzREFBc0Qsb0JBQW9CLGdFQUFnRSx3YUFBd2EsaURBQWlELGtEQUFrRCxxQkFBcUIsbUZBQW1GLGdCQUFnQixxQ0FBcUMsVUFBVSxxREFBcUQsK0RBQStELHNSQUFzUixlQUFlLHFCQUFxQixFQUFFLG9JQUFvSSxPQUFPLHlDQUF5QyxxREFBcUQsdUJBQXVCLDJCQUEyQixpQkFBaUIsOEtBQThLLGVBQWUsNkJBQTZCLEVBQUUsb0RBQW9ELDRFQUE0RSxHQUFHLGVBQWUsaUVBQWlFLHdCQUF3QixpQ0FBaUMsYUFBYSxZQUFZLEVBQUUsZ0hBQWdILDJEQUEyRCx5SUFBeUksR0FBRyw0REFBNEQsOEJBQThCLEVBQUUsK0NBQStDLHFDQUFxQyxFQUFFLG9FQUFvRSxlQUFlLHlDQUF5QyxnQkFBZ0IseUZBQXlGLEVBQUUsd0JBQXdCLGlCQUFpQix5Q0FBeUMsaUNBQWlDLG9EQUFvRCwwRkFBMEYsNEJBQTRCLG1DQUFtQywwQ0FBMEMsWUFBWSxxRkFBcUYsa0hBQWtILDJpQkFBMmlCLG1CQUFtQixXQUFXLDJCQUEyQiwrQkFBK0IsZ0NBQWdDLHNDQUFzQyxXQUFXLDRCQUE0QixPQUFPLGlFQUFpRSxNQUFNLDhQQUE4UCwrR0FBK0csUUFBUSxrQkFBa0IsUUFBUSw2Q0FBNkMsMkJBQTJCLFFBQVEsTUFBTSxLQUFLLEtBQUssc0ZBQXNGLGFBQWEsa1ZBQWtWLGtCQUFrQix5Q0FBeUMsbUNBQW1DLDZCQUE2QixjQUFjLGdCQUFnQiw4REFBOEQsVUFBVSxHQUFHLHlFQUF5RSx3RUFBd0UsRUFBRSxvRkFBb0YsZ0hBQWdILGtDQUFrQyx1RUFBdUUsS0FBSyxlQUFlLFFBQVEsK0RBQStELGtDQUFrQyxrQkFBa0IsSUFBSSxrQkFBa0IsU0FBUyxhQUFhLGVBQWUsMEJBQTBCLDBEQUEwRCwyQkFBMkIsV0FBVyxJQUFJLFFBQVEsaUJBQWlCLHNPQUFzTyxLQUFLLFFBQVEsc1BBQXNQLDJDQUEyQyxrQ0FBa0Msb0NBQW9DLDZIQUE2SCxvREFBb0QsbUJBQW1CLEtBQUssRUFBRSxFQUFFLGtHQUFrRyx1QkFBdUIseUZBQXlGLDBCQUEwQixtQ0FBbUMsOEVBQThFLDJDQUEyQyxnQkFBZ0IsdUVBQXVFLDBEQUEwRCxvQ0FBb0MsbUJBQW1CLDJJQUEySSxzQkFBc0IsR0FBRyxpREFBaUQsZ0JBQWdCLHNCQUFzQixzQ0FBc0MsMkJBQTJCLG9EQUFvRCw2QkFBNkIsRUFBRSwyU0FBMlMsb0JBQW9CLGlFQUFpRSxzQkFBc0IsaUdBQWlHLFVBQVUsZ0RBQWdELFdBQVcsMEJBQTBCLG1HQUFtRyxxQkFBcUIsOEJBQThCLFdBQVcsY0FBYyxTQUFTLHFCQUFxQiwrQkFBK0IsNkVBQTZFLDBPQUEwTyxpQkFBaUIsMkZBQTJGLG9DQUFvQyxtQ0FBbUMsNkJBQTZCLG1CQUFtQixXQUFXLHVIQUF1SCxXQUFXLHdGQUF3RiwrRUFBK0UsMENBQTBDLG1EQUFtRCwrQkFBK0IseUJBQXlCLGlFQUFpRSxnQkFBZ0Isc0JBQXNCLHlCQUF5Qiw0REFBNEQsaUNBQWlDLG9EQUFvRCxzQkFBc0IscUVBQXFFLGlDQUFpQyxxQ0FBcUMsNENBQTRDLHFCQUFxQixnREFBZ0QsRUFBRSx1QkFBdUIsNkdBQTZHLHlDQUF5QyxXQUFXLG9DQUFvQyxpQkFBaUIsV0FBVywyQkFBMkIsNkJBQTZCLHNCQUFzQixHQUFHLHFCQUFxQiw0QkFBNEIsa0RBQWtELHNCQUFzQixRQUFRLDhOQUE4Tix3QkFBd0IscUdBQXFHLFFBQVEsT0FBTyxvQ0FBb0MsbUJBQW1CLGtDQUFrQyx3QkFBd0IsU0FBUyx3QkFBd0IsZ0JBQWdCLGFBQWEseUNBQXlDLDBCQUEwQixpREFBaUQseUZBQXlGLG9EQUFvRCwwREFBMEQsS0FBSywyWEFBMlgsbUVBQW1FLE9BQU8sVUFBVSxRQUFRLDhDQUE4QyxXQUFXLHFCQUFxQixXQUFXLG9CQUFvQixXQUFXLG9DQUFvQyxhQUFhLG9DQUFvQyxVQUFVLHNCQUFzQiwyS0FBMkssa0NBQWtDLFNBQVMsbURBQW1ELFNBQVMsMkJBQTJCLFlBQVksS0FBSyxTQUFTLGlTQUFpUyxNQUFNLGlRQUFpUSwwREFBMEQsT0FBTyxPQUFPLHFGQUFxRixFQUFFLEVBQUUsRUFBRSx1Q0FBdUMsRUFBRSxPQUFPLFVBQVUsK0ZBQStGLEVBQUUsTUFBTSxFQUFFLDRDQUE0QyxZQUFZLDBEQUEwRCxZQUFZLG1NQUFtTSx5aEJBQXloQixrRkFBa0YseUNBQXlDLCtCQUErQixtWEFBbVgsU0FBUyxzSkFBc0osVUFBVSxrS0FBa0ssc0ZBQXNGLHlDQUF5QyxhQUFhLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSw2akJBQTZqQixrQkFBa0IsT0FBTyxxRUFBcUUsV0FBVyxnRUFBZ0UsYUFBYSx3RUFBd0UsTUFBTSwwREFBMEQsVUFBVSxrRUFBa0UsNEJBQTRCLGFBQWEsT0FBTyx1REFBdUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLEtBQUssOENBQThDLEtBQUssNkJBQTZCLG1CQUFtQixlQUFlLGFBQWEsOERBQThELHFGQUFxRixhQUFhLHlCQUF5QiwwRUFBMEUsRUFBRSwwQkFBMEIsMkVBQTJFLEVBQUUsMkJBQTJCLDRFQUE0RSxLQUFLLEdBQUcsY0FBYyxpQkFBaUIsOENBQThDLDRJQUE0SSw0SEFBNEgsaUJBQWlCLG9HQUFvRywwREFBMEQsaUNBQWlDLDZCQUE2QixvR0FBb0csUUFBUSw0Q0FBNEMsY0FBYyw4REFBOEQsdUJBQXVCLHdDQUF3QywwTEFBMEwsa0JBQWtCLGNBQWMsV0FBVywyRkFBMkYsUUFBUSwrR0FBK0csV0FBVywyRUFBMkUsaUdBQWlHLGdCQUFnQixhQUFhLDhCQUE4QixrUUFBa1EsRUFBRSw2QkFBNkIscVBBQXFQLEVBQUUsNEJBQTRCLDBIQUEwSCxpQ0FBaUMsMEJBQTBCLDBDQUEwQyw0Q0FBNEMsd0VBQXdFLHVCQUF1QixFQUFFLDhCQUE4QixzQ0FBc0MsRUFBRSw2QkFBNkIsZ0pBQWdKLEVBQUUsNEJBQTRCLDJNQUEyTSxFQUFFLDRCQUE0QiwwR0FBMEcsSUFBSSw0QkFBNEIscUlBQXFJLEVBQUUsNEJBQTRCLGdEQUFnRCxTQUFTLDZDQUE2QywwR0FBMEcsS0FBSyxFQUFFLDhCQUE4QixxREFBcUQsS0FBSyxHQUFHLGVBQWUsK0RBQStELGlDQUFpQyw2QkFBNkIsNkRBQTZELGlCQUFpQix5QkFBeUIsRUFBRSxFQUFFLFFBQVEsd0JBQXdCLDhKQUE4SixpQ0FBaUMsb0pBQW9KLGtCQUFrQixXQUFXLHNLQUFzSyxpcUJBQWlxQiwwQkFBMEIsaUdBQWlHLHFEQUFxRCxxQkFBcUIsNEJBQTRCLHdKQUF3SiwrQkFBK0IsZ0JBQWdCLDRCQUE0Qix3QkFBd0IseUZBQXlGLG1DQUFtQyxNQUFNLE9BQU8sMEJBQTBCLGtFQUFrRSx1QkFBdUIsV0FBVyw4SEFBOEgsV0FBVywrQkFBK0Isd0VBQXdFLG1CQUFtQixFQUFFLDRCQUE0QixhQUFhLG9CQUFvQixpREFBaUQsa0JBQWtCLGtGQUFrRixrQkFBa0IsOENBQThDLGlEQUFpRCwrQkFBK0IsbURBQW1ELDBCQUEwQixXQUFXLGtSQUFrUixvQkFBb0Isa0VBQWtFLDBCQUEwQixXQUFXLGdJQUFnSSx3RkFBd0YscUJBQXFCLDRCQUE0Qiw2QkFBNkIsNkdBQTZHLGVBQWUsY0FBYyxpUUFBaVEsYUFBYSxrQ0FBa0Msd0dBQXdHLCtEQUErRCxNQUFNLDZCQUE2QixpQkFBaUIsa0NBQWtDLG9DQUFvQywwREFBMEQsaUlBQWlJLHdIQUF3SCxNQUFNLGtDQUFrQyxNQUFNLDZCQUE2QixNQUFNLDZCQUE2QixNQUFNLDhCQUE4QixNQUFNLG9CQUFvQixNQUFNLG1CQUFtQixNQUFNLDhCQUE4QixNQUFNLDhCQUE4QixNQUFNLHVCQUF1Qix5RkFBeUYseUJBQXlCLEVBQUUsbUNBQW1DLG1DQUFtQyxFQUFFLGtDQUFrQywrQkFBK0IsMERBQTBELEVBQUUsb0NBQW9DLCtCQUErQixrRUFBa0UsbURBQW1ELHlDQUF5QyxvSEFBb0gsNkJBQTZCLG1GQUFtRixPQUFPLEVBQUUsOEJBQThCLCtFQUErRSw2UEFBNlAsRUFBRSxpQ0FBaUMsK0JBQStCLDBOQUEwTixpQkFBaUIseURBQXlELFFBQVEsa0xBQWtMLG9DQUFvQyxJQUFJLEdBQUcsRUFBRSw2QkFBNkIsK0JBQStCLDREQUE0RCwrQkFBK0IsMEVBQTBFLG1DQUFtQyx3Q0FBd0Msc0RBQXNELHNDQUFzQyx1REFBdUQsaUVBQWlFLG1DQUFtQyw4Q0FBOEMsaUNBQWlDLDZFQUE2RSxpQ0FBaUMsZ0VBQWdFLGlDQUFpQyx3Q0FBd0MsK0VBQStFLG9CQUFvQixtQkFBbUIsZ0JBQWdCLEVBQUUsb0RBQW9ELDhDQUE4Qyx3QkFBd0Isb0RBQW9ELCtMQUErTCxFQUFFLDBGQUEwRixtQkFBbUIsZ0RBQWdELGVBQWUsOEJBQThCLEVBQUUsMkNBQTJDLGdEQUFnRCxjQUFjLEVBQUUsK0NBQStDLHlEQUF5RCxFQUFFLDREQUE0RCwrQkFBK0IsOEJBQThCLEdBQUcsc0VBQXNFLEdBQUcsRUFBRSxrQ0FBa0MsK0NBQStDLDhEQUE4RCxFQUFFLG1DQUFtQyw4SEFBOEgseUJBQXlCLHNCQUFzQixTQUFTLEVBQUUsZ0NBQWdDLGdFQUFnRSxrRUFBa0Usc0NBQXNDLDhOQUE4TixpQkFBaUIseURBQXlELDBCQUEwQixvREFBb0Qsc0JBQXNCLDBEQUEwRCxlQUFlLGtIQUFrSCw0Q0FBNEMsbURBQW1ELGNBQWMscUlBQXFJLDBEQUEwRCxzQ0FBc0MsNERBQTRELHdFQUF3RSw2Q0FBNkMsNEZBQTRGLG9EQUFvRCx3Q0FBd0MseUZBQXlGLG9IQUFvSCxXQUFXLHNDQUFzQyxrQ0FBa0MsOEJBQThCLG1CQUFtQixFQUFFLEVBQUUsc0NBQXNDLHFEQUFxRCx5RkFBeUYsNEVBQTRFLHNDQUFzQyw4RUFBOEUsNkJBQTZCLDJDQUEyQyxFQUFFLDRHQUE0RyxvRkFBb0YsMENBQTBDLHdCQUF3QixvRUFBb0UsaURBQWlELHVGQUF1RiwrREFBK0Qsc0RBQXNELDREQUE0RCw0RUFBNEUsc0JBQXNCLDJDQUEyQyxJQUFJLHNCQUFzQiwwREFBMEQsb0NBQW9DLEtBQUssZ0RBQWdELGlGQUFpRixjQUFjLGtFQUFrRSx1QkFBdUIscUJBQXFCLDhDQUE4QyxlQUFlLEtBQUssR0FBRyxtR0FBbUcseUJBQXlCLE1BQU0sYUFBYSxrQkFBa0IsS0FBSyxLQUFLLE1BQU0sZ0JBQWdCLE1BQU0sV0FBVyxpQkFBaUIsU0FBUywwQkFBMEIsZ0JBQWdCLFlBQVksVUFBVSw2Q0FBNkMsb0JBQW9CLCtGQUErRiwrUUFBK1EsZ0JBQWdCLDBCQUEwQixnQ0FBZ0MsU0FBUyxNQUFNLHNDQUFzQywwQkFBMEIsb0NBQW9DLGtCQUFrQixRQUFRLGlDQUFpQyxJQUFJLHdCQUF3QixRQUFRLGlCQUFpQiwyQ0FBMkMsc0JBQXNCLDZCQUE2QixhQUFhLFVBQVUsVUFBVSxLQUFLLElBQUksZ0JBQWdCLGVBQWUsY0FBYyxJQUFJLDZCQUE2QixxQkFBcUIsZUFBZSw4QkFBOEIsb0JBQW9CLCtCQUErQixJQUFJLGdEQUFnRCxlQUFlLE9BQU8sSUFBSSxvQkFBb0IsUUFBUSxvQkFBb0IsSUFBSSxLQUFLLE1BQU0seUJBQXlCLGNBQWMsR0FBRyxlQUFlLEtBQUssV0FBVyx5QkFBeUIsZUFBZSxpQ0FBaUMsTUFBTSxrQkFBa0IsRUFBRSxFQUFFLGVBQWUsMklBQTJJLFFBQVEsaUJBQWlCLFdBQVcsZ0xBQWdMLGlCQUFpQixvQkFBb0IsMkNBQTJDLEVBQUUsNEJBQTRCLDRFQUE0RSxzRUFBc0Usa0JBQWtCLGtEQUFrRCxrQkFBa0Isd0JBQXdCLGtLQUFrSyxnQ0FBZ0MsbUVBQW1FLDZKQUE2Six1SUFBdUksZUFBZSx5REFBeUQsRUFBRSwrRkFBK0YsZ0JBQWdCLG9DQUFvQyx5RkFBeUYsR0FBRyxxQ0FBcUMsMkNBQTJDLDZHQUE2RyxvQ0FBb0MsMEJBQTBCLHFDQUFxQyx5QkFBeUIsMkJBQTJCLDBCQUEwQiw2Q0FBNkMsZUFBZSxTQUFTLGlCQUFpQixnRUFBZ0Usc0ZBQXNGLDJCQUEyQixrQkFBa0Isb0JBQW9CLGtCQUFrQix5QkFBeUIsb0JBQW9CLEdBQUcsRUFBRSw4QkFBOEIsOENBQThDLGVBQWUsU0FBUyxpQkFBaUIsMkNBQTJDLG1DQUFtQyxvQkFBb0IsNkNBQTZDLEdBQUcsRUFBRSxzQkFBc0Isd0NBQXdDLGVBQWUsU0FBUyxpQkFBaUIscUNBQXFDLHFDQUFxQyxHQUFHLEVBQUUscUJBQXFCLHVDQUF1QyxlQUFlLFNBQVMsaUJBQWlCLHdCQUF3Qix1REFBdUQscUNBQXFDLEdBQUcsRUFBRSxvQkFBb0Isc0NBQXNDLGVBQWUsU0FBUyxpQkFBaUIsMENBQTBDLG1DQUFtQyxJQUFJLEdBQUcsRUFBRSxhQUFhLHVDQUF1QyxJQUFJLG9CQUFvQixnQkFBZ0IsOENBQThDLGVBQWUsVUFBVSx5Q0FBeUMsZUFBZSxtQ0FBbUMsbUZBQW1GLG9CQUFvQixzQkFBc0Isd0JBQXdCLE1BQU0sbUJBQW1CLFlBQVksNEJBQTRCLDREQUE0RCxxQkFBcUIsMkNBQTJDLHFDQUFxQyw0Q0FBNEMsbUNBQW1DLHlDQUF5QyxzREFBc0QsMkNBQTJDLHNDQUFzQyxxQ0FBcUMsaURBQWlELDBJQUEwSSxVQUFVLEVBQUUsd0JBQXdCLGlDQUFpQyxzQ0FBc0MsNkNBQTZDLDJGQUEyRiwrQkFBK0IsMENBQTBDLGdDQUFnQyxjQUFjLHNDQUFzQyw4REFBOEQsb0NBQW9DLDhKQUE4Siw4RUFBOEUsRUFBRSxpQ0FBaUMsOENBQThDLGdDQUFnQyw0Q0FBNEMsaUNBQWlDLDBDQUEwQyx3QkFBd0Isd0JBQXdCLE1BQU0sZUFBZSwySUFBMkksV0FBVyxpQkFBaUIsV0FBVyxnTkFBZ04sNkNBQTZDLG1IQUFtSCxpQkFBaUIsNENBQTRDLG1EQUFtRCxJQUFJLEVBQUUsRUFBRSxzQkFBc0IsV0FBVyx3Q0FBd0Msc0NBQXNDLHFFQUFxRSw4QkFBOEIsbUZBQW1GLDJFQUEyRSxvQkFBb0IsRUFBRSwyQkFBMkIsbUNBQW1DLDREQUE0RCxrQkFBa0Isd0NBQXdDLDBDQUEwQyxrQ0FBa0Msc0VBQXNFLDRLQUE0SyxxQkFBcUIsRUFBRSxxQkFBcUIsa0JBQWtCLDJEQUEyRCxxQ0FBcUMsdUJBQXVCLG1CQUFtQixtQkFBbUIsbUJBQW1CLGtDQUFrQyxtQkFBbUIsdUVBQXVFLG9CQUFvQixrQ0FBa0Msc0JBQXNCLHFSQUFxUixTQUFTLG9CQUFvQixtQkFBbUIsZ0JBQWdCLGlxQkFBaXFCLGdDQUFnQyxlQUFlLGlCQUFpQiw0QkFBNEIsa0NBQWtDLGVBQWUsd0VBQXdFLHFCQUFxQiw4QkFBOEIsZUFBZSw4Q0FBOEMsNEJBQTRCLDBCQUEwQiw2QkFBNkIseUJBQXlCLGNBQWMsdUhBQXVILGVBQWUsa0NBQWtDLGlCQUFpQix5R0FBeUcsZ0RBQWdELGVBQWUsMkJBQTJCLGlCQUFpQixzQkFBc0IsRUFBRSxzQkFBc0Isd0NBQXdDLGVBQWUsU0FBUyxpQkFBaUIseURBQXlELEVBQUUscUJBQXFCLHVDQUF1QyxlQUFlLFNBQVMsaUJBQWlCLHVCQUF1Qiw2REFBNkQsOENBQThDLGVBQWUsd0JBQXdCLHlDQUF5QyxlQUFlLG1DQUFtQyxrUEFBa1Asa1JBQWtSLDRCQUE0Qix3QkFBd0IsTUFBTSwyQkFBMkIsZUFBZSx3SUFBd0ksK0dBQStHLE1BQU0sMEZBQTBGLE1BQU0sNklBQTZJLCtCQUErQixnSEFBZ0gsTUFBTSwrQ0FBK0MsZ0RBQWdELFlBQVksSUFBSSxJQUFJLEtBQUssaUJBQWlCLDRFQUE0RSxFQUFFLHFGQUFxRixFQUFFLG1HQUFtRyxFQUFFLDZEQUE2RCxtQ0FBbUMsb0VBQW9FLG9DQUFvQyw4TUFBOE0sZUFBZSxjQUFjLFdBQVcscUhBQXFILHFDQUFxQyxzRUFBc0UsOEZBQThGLGlDQUFpQyxjQUFjLGFBQWEsNEJBQTRCLFdBQVcsMklBQTJJLFVBQVUsbUJBQW1CLDhEQUE4RCxJQUFJLEVBQUUsNkJBQTZCLFdBQVcsMEVBQTBFLDJDQUEyQyxvQ0FBb0MsRUFBRSxnQ0FBZ0MsaUNBQWlDLHdDQUF3QyxnVUFBZ1UsRUFBRSxrQ0FBa0MsNENBQTRDLElBQUksdUtBQXVLLCtCQUErQixvRkFBb0Ysc0JBQXNCLEtBQUssZ0NBQWdDLHdRQUF3USxTQUFTLG9CQUFvQixFQUFFLHFDQUFxQyxXQUFXLHdLQUF3SywyQ0FBMkMsZ0dBQWdHLHVEQUF1RCxPQUFPLEVBQUUsMkNBQTJDLFdBQVcsaUJBQWlCLDBDQUEwQywwTkFBME4sdUNBQXVDLGlDQUFpQyxpQkFBaUIsMENBQTBDLHNDQUFzQyxFQUFFLGlEQUFpRCw2SEFBNkgsc0JBQXNCLDJEQUEyRCxrRUFBa0Usc0JBQXNCLEVBQUUsMkJBQTJCLEVBQUUsa0NBQWtDLHNFQUFzRSw2Q0FBNkMsbUNBQW1DLGVBQWUsMEpBQTBKLE1BQU0sd0VBQXdFLE1BQU0sbUZBQW1GLE1BQU0sMEdBQTBHLE1BQU0sd01BQXdNLEVBQUUsa0NBQWtDLHFEQUFxRCxFQUFFLGlDQUFpQyxxREFBcUQsa0NBQWtDLDJCQUEyQixzQ0FBc0MsOEJBQThCLHFDQUFxQywyQkFBMkIsd0RBQXdELCtEQUErRCxFQUFFLDhDQUE4QyxxRkFBcUYsR0FBRyxFQUFFLDRCQUE0Qiw0Q0FBNEMsOEVBQThFLHlDQUF5QyxJQUFJLDRIQUE0SCxTQUFTLGdCQUFnQixvQkFBb0IsR0FBRyxFQUFFLHFDQUFxQywwSEFBMEgsRUFBRSxvQ0FBb0MsNEVBQTRFLEVBQUUsOEJBQThCLDZFQUE2RSxFQUFFLCtCQUErQixXQUFXLG9DQUFvQyx3RUFBd0UsK0NBQStDLGlCQUFpQixvQkFBb0IsR0FBRyxFQUFFLGdDQUFnQyx5REFBeUQsSUFBSSx3QkFBd0IscUJBQXFCLGtDQUFrQyw0QkFBNEIsR0FBRyxFQUFFLDZCQUE2QixpRkFBaUYsRUFBRSwyQ0FBMkMsV0FBVyw4RkFBOEYsb0RBQW9ELEtBQUssRUFBRSx5Q0FBeUMsb0pBQW9KLEVBQUUsNkJBQTZCLDZHQUE2RyxFQUFFLDRCQUE0Qix3REFBd0QscUxBQXFMLEdBQUcsS0FBSyxPQUFPLDZCQUE2QixXQUFXLDRCQUE0QixNQUFNLG9DQUFvQyxlQUFlLEVBQUUsb0JBQW9CLFdBQVcscUZBQXFGLDRIQUE0SCx3SEFBd0gsRUFBRSxPQUFPLGlCQUFpQiwyRUFBMkUsbXNCQUFtc0IsZ0RBQWdELGVBQWUsZ0JBQWdCLFdBQVcsMkJBQTJCLDhSQUE4UixvQkFBb0IsWUFBWSxJQUFJLDREQUE0RCxTQUFTLFVBQVUsbUJBQW1CLHVDQUF1QyxXQUFXLFlBQVksVUFBVSxXQUFXLDhCQUE4QixhQUFhLGdCQUFnQiw2Q0FBNkMsa0JBQWtCLFVBQVUsZUFBZSxvQkFBb0Isd05BQXdOLDhDQUE4QywrQkFBK0IsdUNBQXVDLHFEQUFxRCxVQUFVLGdFQUFnRSx5REFBeUQsMEhBQTBILElBQUksaUNBQWlDLHFIQUFxSCxtQkFBbUIsc1NBQXNTLG9KQUFvSixtSUFBbUksbUJBQW1CLE1BQU0sNGFBQTRhLE1BQU0sdUVBQXVFLHliQUF5Yiw4QkFBOEIseVJBQXlSLGtEQUFrRCwwREFBMEQsa0VBQWtFLGFBQWEsNEJBQTRCLDJEQUEyRCxFQUFFLDZCQUE2QixnRUFBZ0UsRUFBRSxtQ0FBbUMseURBQXlELEVBQUUsNEJBQTRCLDJGQUEyRixFQUFFLCtCQUErQixvQkFBb0IsRUFBRSwrQkFBK0Isd0VBQXdFLEVBQUUsZ0NBQWdDLHdFQUF3RSxFQUFFLHVDQUF1QyxxQ0FBcUMsaUNBQWlDLEVBQUUsdUNBQXVDLHlCQUF5QixFQUFFLHVDQUF1QywyQkFBMkIsRUFBRSwrQkFBK0Isd0RBQXdELEVBQUUsdUNBQXVDLHFDQUFxQywrSkFBK0osb0hBQW9ILHlDQUF5QywwQkFBMEIsU0FBUyxVQUFVLEVBQUUsNkJBQTZCLDBDQUEwQyxFQUFFLCtCQUErQiwwQ0FBMEMsRUFBRSw4QkFBOEIsZ0NBQWdDLEVBQUUsZ0NBQWdDLHFFQUFxRSxlQUFlLGlCQUFpQix3VEFBd1Qsb0VBQW9FLGtEQUFrRCw2QkFBNkIsMEJBQTBCLDhLQUE4Syw2QkFBNkIsUUFBUSwrVkFBK1YsRUFBRSxpQ0FBaUMsNEJBQTRCLEVBQUUsNkJBQTZCLDBDQUEwQyxFQUFFLDZCQUE2Qiw4Q0FBOEMsRUFBRSwrQkFBK0IsNENBQTRDLEVBQUUsNkJBQTZCLDBDQUEwQyxFQUFFLDZCQUE2QixzQ0FBc0MsRUFBRSw2QkFBNkIsc0NBQXNDLEVBQUUsNkJBQTZCLHVEQUF1RCxFQUFFLDRCQUE0QixtQ0FBbUMsRUFBRSw2QkFBNkIsbURBQW1ELEVBQUUsMkJBQTJCLGtDQUFrQyxFQUFFLGtDQUFrQyxrQkFBa0IsdUJBQXVCLGdIQUFnSCxnQkFBZ0IsdUNBQXVDLEVBQUUsOEJBQThCLDBCQUEwQiw0RUFBNEUsRUFBRSw2QkFBNkIsb0NBQW9DLEVBQUUsOEJBQThCLHdEQUF3RCxzQ0FBc0MsYUFBYSxFQUFFLDZCQUE2QixRQUFRLHdOQUF3TixnQkFBZ0Isa0NBQWtDLEVBQUUsNEJBQTRCLFFBQVEsdUhBQXVILGdCQUFnQixrQ0FBa0MsRUFBRSw4QkFBOEIsMkxBQTJMLEVBQUUsNEJBQTRCLFdBQVcsOFFBQThRLGdCQUFnQix3Q0FBd0MsRUFBRSw4QkFBOEIsaURBQWlELGFBQWEsK0ZBQStGLG1CQUFtQixvQkFBb0IsbURBQW1ELHVDQUF1QyxPQUFPLE1BQU0sOEVBQThFLG1DQUFtQyxnQkFBZ0IsMkJBQTJCLEVBQUUsMkJBQTJCLDZDQUE2Qyw0Q0FBNEMsZ0JBQWdCLGlDQUFpQyxFQUFFLDZCQUE2Qix1QkFBdUIsZ0JBQWdCLDhCQUE4QixFQUFFLDZCQUE2Qiw0REFBNEQsc0RBQXNELGdCQUFnQiw0REFBNEQsRUFBRSwrQkFBK0IsMENBQTBDLHVCQUF1QixnQkFBZ0Isc0NBQXNDLEVBQUUsbUNBQW1DLHVCQUF1QixnQkFBZ0IsaURBQWlELGVBQWUsRUFBRSwrQkFBK0IsK0JBQStCLGdCQUFnQix3Q0FBd0MsWUFBWSxFQUFFLDBCQUEwQixzQ0FBc0MsVUFBVSxrQ0FBa0MsNkNBQTZDLGdCQUFnQixxREFBcUQsSUFBSSxzQ0FBc0MsdUJBQXVCLEVBQUUscUNBQXFDLGdCQUFnQixFQUFFLDhCQUE4QiwrREFBK0QsUUFBUSxrS0FBa0ssa0JBQWtCLEdBQUcsS0FBSyxHQUFHLDZEQUE2RDtBQUMvMDRGOzs7Ozs7Ozs7Ozs7QUNEQTs7QUFFQSxJQUFNQSx5QkFBeUIsSUFBSSwyQ0FBSixDQUFRO0FBQ25DQyxRQURtQyxrQkFDNUI7QUFDTCxlQUFPO0FBQ0hDLGdDQUFxQjtBQURsQixTQUFQO0FBR0QsS0FMa0M7O0FBTW5DQyxhQUFTO0FBQ0xDLHVCQURLLDJCQUNXQyxRQURYLEVBQ29CO0FBQ3JCLGlCQUFLSCxrQkFBTCxHQUEwQixJQUExQjtBQUNBLGlCQUFLSSxLQUFMLENBQVcsd0JBQVgsRUFBcUNELFFBQXJDO0FBQ0gsU0FKSTtBQU1MRSx3QkFOSyw0QkFNWUMsS0FOWixFQU1rQjtBQUNuQixpQkFBS04sa0JBQUwsR0FBMEIsS0FBMUI7QUFDQSxpQkFBS0ksS0FBTCxDQUFXLHFCQUFYLEVBQWtDRSxLQUFsQztBQUNILFNBVEk7QUFXTEMsOEJBWEssa0NBV2tCQyxHQVhsQixFQVdzQjtBQUN6QixpQkFBS1Isa0JBQUwsR0FBMEIsS0FBMUI7QUFDQSxpQkFBS0ksS0FBTCxDQUFXLDBCQUFYLEVBQXVDSSxHQUF2QztBQUNELFNBZEk7QUFnQkxDLGtDQWhCSyx3Q0FnQnVCO0FBQ3hCLGlCQUFLTCxLQUFMLENBQVcsbUJBQVg7QUFDSCxTQWxCSTtBQW9CTE0sa0NBcEJLLHdDQW9CdUI7QUFDeEIsaUJBQUtOLEtBQUwsQ0FBVyxtQkFBWDtBQUNILFNBdEJJO0FBd0JMTyxtQ0F4QksseUNBd0J3QjtBQUN6QixpQkFBS1AsS0FBTCxDQUFXLDZCQUFYO0FBQ0g7QUExQkk7QUFOMEIsQ0FBUixDQUEvQjtBQW1DQSx5REFBZU4sc0JBQWYsRTs7Ozs7Ozs7OztBQ3JDQTs7QUFFQSxJQUFNYyx5QkFBeUIsSUFBSSwyQ0FBSixDQUFRO0FBQ25DYixRQURtQyxrQkFDNUI7QUFDTCxlQUFPO0FBQ0hjLGdDQUFxQjtBQURsQixTQUFQO0FBR0QsS0FMa0M7O0FBTW5DWixhQUFTO0FBQ0xhLHVCQURLLDJCQUNXWCxRQURYLEVBQ29CO0FBQ3JCLGlCQUFLVSxrQkFBTCxHQUEwQixJQUExQjtBQUNBLGlCQUFLVCxLQUFMLENBQVcsd0JBQVgsRUFBcUNELFFBQXJDO0FBQ0gsU0FKSTtBQU1MWSx3QkFOSyw0QkFNWUMsS0FOWixFQU1rQjtBQUNuQixpQkFBS0gsa0JBQUwsR0FBMEIsS0FBMUI7QUFDQSxpQkFBS1QsS0FBTCxDQUFXLHFCQUFYLEVBQWtDWSxLQUFsQztBQUNILFNBVEk7QUFXTEMsa0NBWEssd0NBV3VCO0FBQ3hCLGlCQUFLYixLQUFMLENBQVcsd0JBQVg7QUFDSCxTQWJJO0FBZUxjLGtDQWZLLHdDQWV1QjtBQUN4QixpQkFBS2QsS0FBTCxDQUFXLHdCQUFYO0FBQ0gsU0FqQkk7QUFtQkxlLG1DQW5CSyx5Q0FtQndCO0FBQ3pCLGlCQUFLZixLQUFMLENBQVcsNkJBQVg7QUFDSDtBQXJCSTtBQU4wQixDQUFSLENBQS9CO0FBOEJBLHlEQUFlUSxzQkFBZixFOzs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7O0FDeENBOztBQUVBLElBQU1RLCtCQUErQixJQUFJLDJDQUFKLENBQVE7QUFDekNyQixRQUR5QyxrQkFDbkM7QUFDRixlQUFPLEVBQVA7QUFHSCxLQUx3Qzs7QUFNekNFLGFBQVE7QUFDSm9CLDJCQURJLCtCQUNnQkMsS0FEaEIsRUFDc0I7QUFDdEIsaUJBQUtsQixLQUFMLENBQVcscUJBQVgsRUFBa0NrQixLQUFsQztBQUNILFNBSEc7QUFLSkMsNEJBTEksa0NBS2tCO0FBQ2xCLGlCQUFLbkIsS0FBTCxDQUFXLHNCQUFYO0FBQ0g7QUFQRztBQU5pQyxDQUFSLENBQXJDOztBQWlCQSx5REFBZWdCLDRCQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7K0RBRUE7QUFDQTtBQUNBLGdHQURBO0FBRUEsa0dBRkE7QUFHQSxxRkFIQTtBQUlBLG1GQUpBO0FBS0E7QUFMQSxLQURBOztBQVNBLFFBVEEsa0JBU0E7QUFDQTtBQUNBLHdCQURBO0FBRUEseUJBRkE7O0FBSUEsbUNBSkE7QUFLQSw0QkFMQTs7QUFPQSwrQkFQQTtBQVFBLDhGQVJBO0FBU0EsK0JBVEE7O0FBV0E7QUFYQTtBQWFBLEtBdkJBO0FBeUJBLFdBekJBLHFCQXlCQTtBQUNBO0FBQ0EsS0EzQkE7OztBQTZCQTtBQUVBLHNCQUZBLDRCQUVBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFGQTs7QUFJQTtBQUNBO0FBQ0EsYUFGQTs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkJBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQVJBLEVBU0EsS0FUQSxDQVNBLGtCQUVBLENBWEE7QUFZQSxTQXpDQTtBQTJDQSxvQkEzQ0EsMEJBMkNBO0FBQ0E7QUFDQTtBQTdDQTtBQTdCQSxHOzs7Ozs7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUF5TDtBQUN6TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNrQkE7O0FBRUE7QUFDQTtBQUNBO0FBREEsS0FEQTs7QUFLQSxRQUxBLGtCQUtBO0FBQ0E7QUFDQSxtQkFEQTtBQUVBLHNCQUZBO0FBR0Esd0JBSEE7QUFJQTtBQUpBO0FBTUEsS0FaQTs7O0FBY0E7QUFDQSxZQURBLGtCQUNBO0FBQ0E7QUFDQSxTQUhBO0FBS0Esa0JBTEEsd0JBS0E7QUFDQTtBQUNBO0FBQ0E7QUFSQSxLQWRBOztBQTBCQSxXQTFCQSxxQkEwQkE7QUFDQTtBQUNBLEtBNUJBOzs7QUE4QkE7QUFDQSxxQkFEQSwyQkFDQTtBQUFBOztBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQSw0QkFDQSxJQURBLENBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUxBLEVBTUE7QUFDQTtBQUNBLGFBUkE7QUFTQSxTQXJCQTtBQXVCQSxzQkF2QkEsNEJBdUJBO0FBQ0E7QUFDQSwrQkFEQTtBQUVBO0FBRkE7QUFJQTtBQTVCQTtBQTlCQSxHOzs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBLHlCQUE0TTtBQUM1TTtBQUNBO0FBQ0E7QUFDQSw0Q0FBc1I7QUFDdFI7QUFDQSw4Q0FBeUw7QUFDekw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQzVDQTs7QUFFQTtBQUNBLHFDQUFxUDtBQUNyUDtBQUNBO0FBQ0E7QUFDQSxvRUFBaUk7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrS0FBa0ssa0ZBQWtGO0FBQ3BQLDJLQUEySyxrRkFBa0Y7QUFDN1A7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esb0RBQXFELGNBQWMsZUFBZSxHQUFHLFVBQVUsa0tBQWtLLEtBQUssVUFBVSxVQUFVLGtGQUFrRixjQUFjLGVBQWUsRUFBRSxxQkFBcUI7O0FBRWhhOzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQTs7QUFFQTtBQUNBLFFBREEsa0JBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQSxLQUxBOzs7QUFPQSw2QkFQQTtBQVFBO0FBQ0EsZ0JBREEsb0JBQ0EsU0FEQSxFQUNBO0FBQ0E7QUFDQTtBQUNBLGFBRkEsTUFFQTtBQUNBO0FBQ0E7QUFDQTtBQVBBLEtBUkE7O0FBa0JBLFdBbEJBLHFCQWtCQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUpBOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FKQTs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBSkE7QUFLQSxLQXJDQTs7O0FBd0NBO0FBQ0EsaUJBREEsdUJBQ0E7QUFDQTtBQUNBLFNBSEE7QUFLQSx5QkFMQSwrQkFLQTtBQUNBO0FBQ0E7QUFQQTtBQXhDQSxHOzs7Ozs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssU0FBUyxvQkFBb0IsRUFBRTtBQUNwQztBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsK0NBQStDLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLHNCQUFzQixFQUFFO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUyw4Q0FBOEMsRUFBRTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLCtDQUErQyxFQUFFO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsOENBQThDLEVBQUU7QUFDbEU7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLFdBQVcsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSywrQkFBK0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLG9CQUFvQixFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGFBQWEsdUNBQXVDLFdBQVcsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDRDQUE0QyxvQkFBb0IsRUFBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsK0NBQStDLEVBQUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUywrQ0FBK0MsRUFBRTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLDhDQUE4QyxFQUFFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsK0NBQStDLEVBQUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUywrQ0FBK0MsRUFBRTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLG9CQUFvQixFQUFFO0FBQ3hDLDBCQUEwQix3QkFBd0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdDQUFnQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUF5TDtBQUN6TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3NCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQURBLEtBREE7QUFJQSxRQUpBLGtCQUlBO0FBQ0E7QUFDQSxtQkFEQTtBQUVBLHVCQUZBO0FBR0Esd0JBSEE7QUFJQTtBQUpBO0FBTUEsS0FYQTs7O0FBYUE7QUFDQSxZQURBLGtCQUNBO0FBQ0E7QUFDQSxTQUhBO0FBS0Esa0JBTEEsd0JBS0E7QUFDQTtBQUNBO0FBQ0E7QUFSQSxLQWJBOztBQXdCQSxXQXhCQSxxQkF3QkE7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUZBLEVBRUEsSUFGQTtBQUdBLFNBSkE7QUFLQSxLQWhDQTs7O0FBa0NBO0FBQ0Esc0JBREEsNEJBQ0E7QUFBQTs7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFMQSxFQU1BLEtBTkEsQ0FNQTtBQUNBO0FBQ0EsYUFSQTtBQVNBLFNBdEJBO0FBd0JBLHNCQXhCQSw0QkF3QkE7QUFDQTtBQUNBLCtCQURBO0FBRUE7QUFGQTtBQUlBO0FBN0JBO0FBbENBLEc7Ozs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0EsNENBQXNSO0FBQ3RSO0FBQ0EsOENBQXlMO0FBQ3pMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUE7QUFDQTtBQUNBLFFBREEsa0JBQ0E7QUFDQTtBQUNBLDJCQURBO0FBRUE7QUFGQTtBQUlBLEtBTkE7OztBQVFBLDZCQVJBOztBQVVBO0FBQ0EsZ0JBREEsb0JBQ0EsU0FEQSxFQUNBO0FBQ0E7QUFDQTtBQUNBLGFBRkEsTUFFQTtBQUNBO0FBQ0E7QUFDQTtBQVBBLEtBVkE7O0FBb0JBLFdBcEJBLHFCQW9CQTtBQUFBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUpBOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FKQTs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBSkE7QUFNQSxLQTFDQTs7O0FBNENBO0FBQ0EscUJBREEsMkJBQ0E7QUFDQTtBQUNBLFNBSEE7QUFLQSx5QkFMQSwrQkFLQTtBQUNBO0FBQ0E7QUFDQSxTQVJBO0FBVUEscUJBVkEsMkJBVUE7QUFDQTtBQUNBO0FBWkE7QUE1Q0EsRzs7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFNBQVMsb0JBQW9CLEVBQUU7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLDZCQUE2QixFQUFFO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxzQkFBc0IsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUNBQWlDLDJCQUEyQjtBQUM1RCxtQ0FBbUMsbUNBQW1DO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVMsNkJBQTZCLEVBQUU7QUFDNUQsa0JBQWtCLFlBQVkscUNBQXFDLEVBQUU7QUFDckU7QUFDQSxtQkFBbUIsWUFBWSx1Q0FBdUMsRUFBRTtBQUN4RTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVMsNEJBQTRCLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVMsNEJBQTRCLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVMsNkJBQTZCLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxxQ0FBcUMsNEJBQTRCLEVBQUU7QUFDNUU7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLFdBQVcsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUNyR0E7O0FBRUEsSUFBTUksaUJBQWlCLElBQUksMkNBQUosQ0FBUTtBQUMzQnpCLFFBRDJCLGtCQUNyQjtBQUNGLGVBQU8sRUFBUDtBQUdILEtBTDBCOzs7QUFPM0JFLGFBQVM7QUFDTHdCLHNCQURLLDRCQUNXO0FBQ1osaUJBQUtyQixLQUFMLENBQVcsZ0JBQVg7QUFDSDtBQUhJOztBQVBrQixDQUFSLENBQXZCOztBQWdCQSx5REFBZW9CLGNBQWYsRTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGdDQUFnQztBQUNyQztBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsb0JBQW9CLEVBQUU7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsYUFBYSx1Q0FBdUMsV0FBVyxFQUFFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsNENBQTRDLG9CQUFvQixFQUFFO0FBQzNFO0FBQ0Esd0JBQXdCLFNBQVMsNkJBQTZCLEVBQUU7QUFDaEU7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVMsNkJBQTZCLEVBQUU7QUFDaEU7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVMsNEJBQTRCLEVBQUU7QUFDL0Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVMsNEJBQTRCLEVBQUU7QUFDL0Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVMsNkJBQTZCLEVBQUU7QUFDaEU7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVMsNkJBQTZCLEVBQUU7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxvQkFBb0IsRUFBRTtBQUN4QywwQkFBMEIsd0JBQXdCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnQ0FBZ0M7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7OztBQ3RIQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBc1I7QUFDdFI7QUFDQSw4Q0FBeUw7QUFDekw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDb0JBO0FBQ0E7O0FBRUE7QUFDQSxRQURBLGtCQUNBO0FBQ0E7QUFDQSwyQkFEQTtBQUVBLDZCQUZBO0FBR0EsK0JBSEE7QUFJQSxnQ0FKQTtBQUtBLDJCQUxBOztBQU9BLGdDQVBBO0FBUUEsK0JBUkE7O0FBVUEsb0NBVkE7QUFXQSxtQ0FYQTtBQVlBOztBQVpBO0FBZUEsS0FqQkE7OztBQW1CQTtBQUNBLG9CQURBLDBCQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUZBLEVBRUEsR0FGQTtBQUdBO0FBQ0E7QUFUQSxLQW5CQTs7QUErQkE7QUFDQTtBQURBLEtBL0JBOztBQW1DQSxXQW5DQSxxQkFtQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FGQTs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUVBLFNBVEE7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUZBLEVBRUEsR0FGQTtBQUlBLFNBTkE7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUZBLEVBRUEsR0FGQTtBQUlBLFNBTkE7QUFRQSxLQXhFQTs7O0FBMEVBO0FBQ0EsYUFEQSxpQkFDQSxTQURBLEVBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQVZBO0FBWUEsdUJBWkEsNkJBWUE7O0FBRUE7QUFDQSxTQWZBO0FBaUJBLG1CQWpCQSx5QkFpQkE7O0FBRUE7QUFFQSxTQXJCQTtBQXVCQSxvQkF2QkEsMEJBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFIQSxNQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0EvQkE7QUFpQ0Esd0JBakNBLDhCQWlDQTtBQUNBO0FBQ0EsU0FuQ0E7QUFxQ0EsMEJBckNBLGdDQXFDQTtBQUNBO0FBQ0E7QUFDQSxhQUZBLE1BRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0EsU0FqREE7QUFtREEsdUJBbkRBLDZCQW1EQTtBQUFBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBSkE7QUFLQTtBQTdEQTtBQTFFQSxHOzs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN3QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFEQSxLQURBO0FBSUEsUUFKQSxrQkFJQTtBQUNBO0FBQ0EsNEJBREE7QUFFQSxvQkFGQTs7QUFJQSwrQkFKQTs7QUFNQTtBQU5BO0FBUUEsS0FiQTs7O0FBZUE7QUFDQSxnQkFEQSxrQkFDQSxFQURBLEVBQ0EsSUFEQSxFQUNBLElBREEsRUFDQSxDQUNBO0FBRkEsS0FmQTs7QUFvQkEsV0FwQkEscUJBb0JBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBRkE7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsU0FIQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQSxTQUhBOztBQUtBO0FBQ0E7QUFDQSxTQUZBO0FBSUEsS0E1Q0E7QUE4Q0EsV0E5Q0EscUJBOENBLENBQ0EsQ0EvQ0E7OztBQWlEQTtBQUNBLG9CQURBLHdCQUNBLFFBREEsRUFDQTtBQUFBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUFBOztBQUNBO0FBQ0EsaUJBRkEsTUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFFQSxhQVZBO0FBV0EsU0FmQTtBQWlCQSwwQkFqQkEsOEJBaUJBLFFBakJBLEVBaUJBO0FBQUE7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQSxpQkFGQSxNQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUVBLGFBVkE7QUFXQSxTQS9CQTtBQWlDQSwwQkFqQ0EsOEJBaUNBLFFBakNBLEVBaUNBO0FBQUE7O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQSxpQkFGQSxNQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUVBLGFBVkE7QUFXQSxTQS9DQTtBQWlEQSxxQkFqREEseUJBaURBLEdBakRBLEVBaURBO0FBQ0E7QUFDQSxTQW5EQTtBQXFEQSxrQkFyREEsd0JBcURBO0FBQ0E7QUFDQTtBQXZEQSxLQWpEQTs7QUEyR0EsYUEzR0EsdUJBMkdBLENBQ0E7QUE1R0EsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvR0FEQTtBQUVBO0FBRkEsS0FEQTs7QUFNQSxRQU5BLGtCQU1BO0FBQ0E7QUFDQSwyREFEQTs7QUFHQSw0QkFIQTs7QUFLQSwyQkFMQTtBQU1BLHNCQU5BOztBQVFBLHlCQVJBO0FBU0EsK0JBVEE7O0FBV0EsNkJBWEE7QUFZQSx1QkFaQTs7QUFjQSw4QkFkQTs7QUFpQkE7QUFDQSw4QkFEQTtBQUVBLG1JQUZBO0FBR0E7QUFIQTtBQWpCQTtBQXVCQSxLQTlCQTs7O0FBZ0NBLG9CQWhDQTs7QUFrQ0E7QUFDQSxhQURBLG1CQUNBO0FBQ0E7QUFDQTtBQUhBLEtBbENBOztBQXdDQSxXQXhDQSxxQkF3Q0EsQ0FDQSxDQXpDQTs7O0FBNENBO0FBQ0EscUJBREEsMkJBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FQQTtBQVVBLGNBVkEsb0JBVUE7QUFBQTs7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFIQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQSxxQkFGQSxFQUVBLEdBRkE7QUFJQSxpQkFMQTtBQU1BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUZBLEVBRUEsR0FGQTtBQUdBOztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUhBO0FBSUE7QUFDQTtBQUNBLGlCQUZBLEVBRUEsR0FGQTtBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBSEE7O0FBS0E7QUFDQTtBQUNBLGlCQUZBLEVBRUEsR0FGQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFIQTs7QUFLQTtBQUNBO0FBQ0EsaUJBRkEsRUFFQSxHQUZBO0FBSUE7QUFDQSxTQTFFQTtBQTRFQSx5QkE1RUEsK0JBNEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQWpGQTtBQW1GQSxnQkFuRkEsb0JBbUZBLEtBbkZBLEVBbUZBLEdBbkZBLEVBbUZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBOUZBO0FBZ0dBLHNCQWhHQSw0QkFnR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQXZHQTtBQXlHQSxzQkF6R0EsNEJBeUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBUEEsRUFPQSxRQVBBLEVBT0EsUUFQQSxFQU9BLGdCQVBBO0FBU0EsYUFWQSxNQVVBO0FBQ0E7QUFDQTtBQUNBLGlCQUZBLEVBRUEsR0FGQTtBQUlBO0FBQ0EsU0ExSEE7QUE0SEEscUJBNUhBLDJCQTRIQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFGQTtBQUdBLGlCQUxBO0FBTUEsYUFUQTtBQVVBLFNBdklBO0FBeUlBLHFCQXpJQSwyQkF5SUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQS9JQTtBQWlKQSxzQkFqSkEsNEJBaUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUhBLE1BR0E7QUFDQTtBQUNBO0FBQ0EsYUFQQSxFQU9BLEdBUEE7QUFRQTtBQWhLQTtBQTVDQSxHOzs7Ozs7Ozs7O0FDckRBO0FBQUE7QUFDQTs7QUFFQSxJQUFJRSxjQUFjLEVBQUVDLFFBQVEsa0JBQVk7QUFDaEMsWUFBSUMsTUFBTSxJQUFWLENBQWUsSUFBSUMsS0FBS0QsSUFBSUUsY0FBYixDQUE0QixJQUFJQyxLQUFLSCxJQUFJSSxLQUFKLENBQVVELEVBQVYsSUFBZ0JGLEVBQXpCLENBQTRCLE9BQU9ELElBQUlLLEVBQUosR0FBU0YsR0FBRyxLQUFILEVBQVUsRUFBRUcsYUFBYSxxQkFBZixFQUFzQ0MsT0FBTyxFQUFFLE1BQU8sa0JBQW1CUCxJQUFJUSxRQUFoQyxFQUE3QyxFQUFWLEVBQXVHLENBQUNMLEdBQUcsUUFBSCxFQUFhLEVBQUVJLE9BQU8sRUFBRSxPQUFRLGtDQUFtQ1AsSUFBSVMsRUFBakQsRUFBdUQsbUJBQW1CLEVBQTFFLEVBQThFLHFCQUFxQixFQUFuRyxFQUF1RyxTQUFTLFVBQWhILEVBQVQsRUFBYixDQUFELENBQXZHLENBQVQsR0FBMlFOLEdBQUcsS0FBSCxFQUFVLEVBQUVJLE9BQU8sRUFBRSxNQUFPLGtCQUFtQlAsSUFBSVEsUUFBaEMsRUFBNEMsc0JBQXNCLFNBQWxFLEVBQTZFLHNCQUFzQlIsSUFBSVMsRUFBdkcsRUFBVCxFQUFWLENBQWxSO0FBQzFFLEtBRmEsRUFFWEMsaUJBQWlCLEVBRk47QUFHZEMsVUFBTSxhQUhRO0FBSWRDLFdBQU87QUFDSDtBQUNBQyxpQkFBUztBQUNMQyxrQkFBTUMsTUFERDtBQUVMQyxzQkFBVSxLQUZMO0FBR0xDLHFCQUFTLFNBQVNDLFNBQVQsR0FBcUI7QUFDMUIsdUJBQU8sRUFBUDtBQUNIO0FBTEksU0FGTjtBQVNIO0FBQ0FDLGNBQU07QUFDRkwsa0JBQU1NLEtBREo7QUFFRkosc0JBQVUsS0FGUjtBQUdGQyxxQkFBUyxTQUFTSSxTQUFULEdBQXFCO0FBQzFCLHVCQUFPLEVBQVA7QUFDSDtBQUxDLFNBVkg7QUFpQkg7QUFDQVosWUFBSTtBQUNBSyxrQkFBTVEsTUFETjtBQUVBTixzQkFBVTtBQUZWLFNBbEJEO0FBc0JIO0FBQ0FYLFlBQUk7QUFDQVMsa0JBQU1TLE9BRE47QUFFQVAsc0JBQVUsS0FGVjtBQUdBQyxxQkFBUyxTQUFTTyxTQUFULEdBQXFCO0FBQzFCLHVCQUFPLElBQVA7QUFDSDtBQUxEO0FBdkJELEtBSk87QUFtQ2RyRCxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDbEIsZUFBTztBQUNIc0Qsb0JBQVE7QUFETCxTQUFQO0FBR0gsS0F2Q2E7QUF3Q2RDLGNBQVU7QUFDTmxCLGtCQUFVLFNBQVNBLFFBQVQsR0FBb0I7QUFDMUIsbUJBQU9tQixLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsTUFBaUIsU0FBUyxDQUExQixDQUFYLElBQTJDLENBQWxEO0FBQ0g7QUFISyxLQXhDSTs7QUE4Q2RDLGFBQVMsU0FBU0EsT0FBVCxHQUFtQjtBQUN4QixZQUFJQyxTQUFTLElBQWI7O0FBRUEsWUFBSUMsT0FBTyxtQkFBQUMsQ0FBUSxHQUFSLENBQVg7QUFDQSxhQUFLUixNQUFMLEdBQWMsSUFBSU8sSUFBSixDQUFTRSxTQUFTQyxjQUFULENBQXlCLGtCQUFtQixLQUFLM0IsUUFBakQsQ0FBVCxFQUF1RSxLQUFLSyxPQUE1RSxDQUFkO0FBQ0EsYUFBS00sSUFBTCxDQUFVaUIsT0FBVixDQUFrQixVQUFVQyxPQUFWLEVBQW1CO0FBQ2pDTixtQkFBT04sTUFBUCxDQUFjYSxFQUFkLENBQWlCRCxPQUFqQixFQUEwQk4sT0FBT1EsZUFBakM7QUFDSCxTQUZEO0FBR0gsS0F0RGE7O0FBd0RkQyxXQXhEYyxxQkF3REwsQ0FDUixDQXpEYTs7O0FBMkRkQyxtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3BDO0FBQ0gsS0E3RGE7O0FBK0RkcEUsYUFBUztBQUNMa0UseUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJHLEtBQXpCLEVBQWdDO0FBQzdDLGlCQUFLbEUsS0FBTCxDQUFXa0UsTUFBTTVCLElBQWpCLEVBQXVCNEIsS0FBdkI7QUFDSDtBQUhJO0FBL0RLLENBQWxCOztBQXNFQSxJQUFJQyxhQUFhLENBQUM3QyxXQUFELENBQWpCOztBQUVBLElBQUk4QyxRQUFTLFNBQVRBLEtBQVMsQ0FBVUMsR0FBVixFQUFlO0FBQ3hCRixlQUFXUCxPQUFYLENBQW1CLFVBQVVVLFNBQVYsRUFBcUI7QUFDcENELFlBQUlFLFNBQUosQ0FBY0QsVUFBVW5DLElBQXhCLEVBQThCbUMsU0FBOUI7QUFDSCxLQUZEO0FBR0gsQ0FKRDs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTtBQUNBLFlBQVk7QUFDWixtQkFBbUIsNEJBQTRCLDRCQUE0QixrQkFBa0IsU0FBUyw2Q0FBNkMsRUFBRTtBQUNySixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixtQkFBbUIsNEJBQTRCLDRCQUE0QixvQkFBb0IsNkNBQTZDLG9HQUFvRyxFQUFFO0FBQ2xQLDJCQUEyQixxQkFBcUIsb0RBQW9ELEVBQUU7QUFDdEcsS0FBSztBQUNMLDBCQUEwQiw0QkFBNEIsNkhBQTZILEVBQUU7QUFDckwsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFdBQVcsRUFBRTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkIsbUJBQW1CLDRCQUE0Qiw0QkFBNEIsMkJBQTJCLDZDQUE2QywyQ0FBMkMsRUFBRSxpQkFBaUIsU0FBUyw0SEFBNEgsRUFBRSxpQkFBaUIsU0FBUywwR0FBMEcsRUFBRTtBQUM5ZCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakIsbUJBQW1CLDRCQUE0Qiw0QkFBNEIsMkJBQTJCLDJDQUEyQyw4Q0FBOEMsRUFBRSxpQkFBaUIsU0FBUyw2SEFBNkgsRUFBRSxpQkFBaUIsU0FBUywyR0FBMkcsRUFBRTtBQUNqZSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakIsbUJBQW1CLDRCQUE0Qiw0QkFBNEIsb0JBQW9CLHVCQUF1Qiw4Q0FBOEMsRUFBRTtBQUN0SywyQkFBMkIscUJBQXFCLHdEQUF3RCxFQUFFO0FBQzFHLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVPO0FBQ1I7Ozs7Ozs7O0FDeFdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3pCQTtBQUNBOzs7QUFHQTtBQUNBLGtEQUFtRCxHQUFHLDRCQUE0QixzQkFBc0IsR0FBRyxXQUFXLDJCQUEyQixHQUFHLFVBQVUseUJBQXlCLHdCQUF3QixLQUFLLFVBQVUsR0FBRyxXQUFXLE1BQU0sa0NBQWtDLG1DQUFtQyxjQUFjLDhGQUE4RixrQ0FBa0MsZ0JBQWdCLGdCQUFnQixlQUFlLGdCQUFnQixrQkFBa0IsaUJBQWlCLCtCQUErQix3QkFBd0Isc0JBQXNCLFlBQVksc0JBQXNCLFdBQVcsYUFBYSxhQUFhLG9CQUFvQixXQUFXLFlBQVksVUFBVSxlQUFlLHNCQUFzQixnRUFBZ0UsbUJBQW1CLGlGQUFpRiwwQkFBMEIsYUFBYSxtQkFBbUIsa0JBQWtCLFdBQVcsY0FBYyxjQUFjLGdCQUFnQixvREFBb0QsYUFBYSxnQkFBZ0IsZ0NBQWdDLFNBQVMsV0FBVyxhQUFhLGVBQWUsT0FBTyxhQUFhLGtCQUFrQixrQkFBa0IscUNBQXFDLFdBQVcsK0JBQStCLDBCQUEwQixrQkFBa0IsbUNBQW1DLDJCQUEyQixpQkFBaUIsa0JBQWtCLHFCQUFxQixtQ0FBbUMsZUFBZSwyQkFBMkIsYUFBYSx5QkFBeUIsZ0JBQWdCLGVBQWUsY0FBYyx5QkFBeUIsZ0JBQWdCLGdCQUFnQix1Q0FBdUMsY0FBYyw0RUFBNEUsNEJBQTRCLGVBQWUsZUFBZSxTQUFTLGtCQUFrQixjQUFjLGVBQWUsY0FBYyxpQkFBaUIsWUFBWSxrQkFBa0Isd0JBQXdCLG1CQUFtQixjQUFjLGtCQUFrQixZQUFZLG9CQUFvQixXQUFXLHFCQUFxQixVQUFVLCtCQUErQix5Q0FBeUMsVUFBVSwwT0FBME8sYUFBYSw4SEFBOEgsbUJBQW1CLFdBQVcsZ0NBQWdDLGlEQUFpRCw4SEFBOEgsbUJBQW1CLFdBQVcseUJBQXlCLCtCQUErQixTQUFTLG1CQUFtQixxQ0FBcUMsV0FBVyxhQUFhLFNBQVMsYUFBYSxrQkFBa0IsUUFBUSwrQkFBK0IsVUFBVSw2QkFBNkIsWUFBWSxTQUFTLGtCQUFrQixXQUFXLDhEQUE4RCxtQkFBbUIsd0NBQXdDLFVBQVUsa0JBQWtCLG9EQUFvRCxjQUFjLHdDQUF3QyxhQUFhLGdCQUFnQixtQkFBbUIsYUFBYSx5QkFBeUIsa0JBQWtCLHFKQUFxSixnQkFBZ0IsbUxBQW1MLGdCQUFnQix3R0FBd0csY0FBYyxrQkFBa0Isc0JBQXNCLGFBQWEseUJBQXlCLHFKQUFxSixrQkFBa0IsNkJBQTZCLGdCQUFnQixzQkFBc0IsY0FBYyxhQUFhLDZCQUE2Qix5REFBeUQsa0NBQWtDLG1DQUFtQyxTQUFTLFdBQVcsT0FBTyxxQkFBcUIsa0JBQWtCLFFBQVEsNkRBQTZELFVBQVUseUJBQXlCLDZCQUE2Qix3QkFBd0IsaURBQWlELFVBQVUsb0JBQW9CLDJCQUEyQix3R0FBd0csYUFBYSxnTEFBZ0wscUJBQXFCLG1CQUFtQixTQUFTLHNCQUFzQixrQkFBa0IsMEJBQTBCLFNBQVMsWUFBWSxPQUFPLGtCQUFrQixNQUFNLHlCQUF5QixzQkFBc0IscUJBQXFCLGlCQUFpQixXQUFXLGdFQUFnRSxvQkFBb0Isa0JBQWtCLGlDQUFpQyxZQUFZLGFBQWEsa0JBQWtCLCtCQUErQiw4QkFBOEIsbURBQW1ELHdCQUF3Qiw4REFBOEQsYUFBYSx1QkFBdUIsOEJBQThCLGdDQUFnQyxrQkFBa0IsWUFBWSxxQ0FBcUMsY0FBYyxlQUFlLG1CQUFtQixrQkFBa0IsV0FBVyxnQkFBZ0IsbUJBQW1CLFVBQVUsMkJBQTJCLGdCQUFnQixrRkFBa0YsOEJBQThCLDZCQUE2QixzQ0FBc0MsV0FBVyxTQUFTLGtCQUFrQixXQUFXLFNBQVMsUUFBUSxtQ0FBbUMsWUFBWSxtRkFBbUYsZUFBZSwyR0FBMkcsYUFBYSxzQ0FBc0MsbUJBQW1CLGNBQWMsYUFBYSxlQUFlLGlCQUFpQix5QkFBeUIsc0JBQXNCLHFCQUFxQixpQkFBaUIsV0FBVywyQ0FBMkMsb0JBQW9CLGFBQWEsV0FBVyw2Q0FBNkMsNkJBQTZCLFdBQVcsa0JBQWtCLFFBQVEsMkJBQTJCLCtDQUErQyxtQkFBbUIsc0RBQXNELG9DQUFvQyxVQUFVLGtJQUFrSSwrQkFBK0IsNENBQTRDLGdCQUFnQixXQUFXLGtCQUFrQixrQkFBa0Isa0JBQWtCLHdCQUF3QixtREFBbUQscUNBQXFDLFNBQVMsb0RBQW9ELG1CQUFtQix3QkFBd0IsV0FBVyxXQUFXLE9BQU8sZUFBZSxnQkFBZ0Isa0JBQWtCLFFBQVEsU0FBUyw0SEFBNEgsZ0NBQWdDLDBEQUEwRCxpQkFBaUIsbUlBQW1JLG1CQUFtQixrRUFBa0UsMEJBQTBCLFdBQVcsY0FBYyxjQUFjLFlBQVksa0JBQWtCLHdCQUF3QixXQUFXLGlFQUFpRSxnQkFBZ0IsU0FBUyxXQUFXLFVBQVUsVUFBVSxRQUFRLG9DQUFvQywrQ0FBK0MsVUFBVSxxRkFBcUYsbUJBQW1CLG9GQUFvRixVQUFVLG9DQUFvQywwSkFBMEosMEJBQTBCLDBDQUEwQyxtQkFBbUIsYUFBYSxpQkFBaUIsa0JBQWtCLGdCQUFnQixrQkFBa0Isb0JBQW9CLGlDQUFpQyx3QkFBd0IsZUFBZSxTQUFTLG1CQUFtQixjQUFjLGNBQWMsWUFBWSxTQUFTLFVBQVUsK0JBQStCLFdBQVcsZ0VBQWdFLGVBQWUsU0FBUyxrQkFBa0IsV0FBVywrQkFBK0IseUJBQXlCLGlCQUFpQixrR0FBa0csdURBQXVELGdCQUFnQixTQUFTLG1CQUFtQixpRUFBaUUsWUFBWSxrQkFBa0Isd0JBQXdCLFdBQVcsd0JBQXdCLGdCQUFnQixtREFBbUQsZUFBZSxTQUFTLGtCQUFrQixXQUFXLCtCQUErQixzQkFBc0IsaUJBQWlCLG1EQUFtRCxnQkFBZ0IsU0FBUyxtQkFBbUIsaUVBQWlFLFlBQVksa0JBQWtCLHdCQUF3QixXQUFXLHNEQUFzRCx3QkFBd0Isa0JBQWtCLFdBQVcsNENBQTRDLGVBQWUsU0FBUyxrQkFBa0IsV0FBVywrQkFBK0IscUJBQXFCLGlCQUFpQixrQkFBa0IsaURBQWlELGVBQWUsU0FBUyxrQkFBa0IsV0FBVywrQkFBK0IscUJBQXFCLGlCQUFpQixpREFBaUQsZUFBZSxTQUFTLGtCQUFrQixXQUFXLCtCQUErQixxQkFBcUIsaUJBQWlCLHdCQUF3Qiw0Q0FBNEMsZ0JBQWdCLFNBQVMsbUJBQW1CLGlFQUFpRSxZQUFZLGtCQUFrQix3QkFBd0IsV0FBVyxhQUFhLDhDQUE4QyxhQUFhLHVDQUF1QyxVQUFVLG1EQUFtRCxTQUFTLGdGQUFnRix5Q0FBeUMsVUFBVSxtRUFBbUUseUNBQXlDLFVBQVUsNERBQTRELHlDQUF5QyxVQUFVLDRFQUE0RSx1Q0FBdUMsK0RBQStELHVDQUF1Qyx3REFBd0QsdUNBQXVDLDBFQUEwRSxnR0FBZ0csc0VBQXNFLGdHQUFnRywrREFBK0QsZ0dBQWdHLDRFQUE0RSx1Q0FBdUMsK0RBQStELHVDQUF1Qyx3REFBd0QsdUNBQXVDLDBFQUEwRSwwRkFBMEYsc0VBQXNFLDBGQUEwRiwrREFBK0QsMEZBQTBGLGNBQWMsc0JBQXNCLDRCQUE0Qiw0QkFBNEIsd0JBQXdCLFlBQVksT0FBTyxVQUFVLGtCQUFrQixNQUFNLDRCQUE0QixXQUFXLFVBQVUsa0RBQWtELFVBQVUsWUFBWSxlQUFlLGdDQUFnQyxpQkFBaUIsa0JBQWtCLHlCQUF5Qix3QkFBd0IsY0FBYyx5QkFBeUIsc0NBQXNDLGVBQWUsZ0NBQWdDLGtCQUFrQixZQUFZLHFDQUFxQyxjQUFjLGVBQWUsZ0JBQWdCLFNBQVMsZ0JBQWdCLG1CQUFtQixVQUFVLGtCQUFrQixvQkFBb0Isa0JBQWtCLHlDQUF5QywwQkFBMEIsdURBQXVELG1CQUFtQixVQUFVLHVCQUF1QixrQ0FBa0MsbUNBQW1DLDBDQUEwQyxZQUFZLFdBQVcsU0FBUyxTQUFTLGtCQUFrQiwyQkFBMkIsUUFBUSxVQUFVLHNIQUFzSCxVQUFVLHFDQUFxQywwQ0FBMEMsVUFBVSxtSUFBbUksT0FBTyxzQ0FBc0Msd0JBQXdCLG1KQUFtSixVQUFVLHlEQUF5RCxVQUFVLFFBQVEsc0NBQXNDLDJCQUEyQixpRUFBaUUsVUFBVSxXQUFXLDBCQUEwQixpcEJBQWlwQixrQ0FBa0MsYUFBYSxnQkFBZ0IsZ0JBQWdCLDZCQUE2QixpQkFBaUIscUJBQXFCLGdCQUFnQixzQkFBc0IsZ0JBQWdCLGtCQUFrQixVQUFVLGdCQUFnQixPQUFPLFNBQVMsa0JBQWtCLGtCQUFrQiwwREFBMEQsaUJBQWlCLGtCQUFrQix3QkFBd0Isa0NBQWtDLGtCQUFrQixVQUFVLCtCQUErQixlQUFlLE9BQU8sd0JBQXdCLHdCQUF3QixlQUFlLFNBQVMsb0JBQW9CLFdBQVcsT0FBTyxnQkFBZ0IsVUFBVSxrQkFBa0IsUUFBUSw4Q0FBOEMsZUFBZSwwQkFBMEIsZ0RBQWdELHdCQUF3QixvQkFBb0IsY0FBYywyQ0FBMkMsd0JBQXdCLG9CQUFvQixjQUFjLDBCQUEwQixrQ0FBa0Msb0JBQW9CLDBCQUEwQixxQ0FBcUMscUNBQXFDLDRCQUE0QixxQ0FBcUMsNEJBQTRCLHVDQUF1QywyQ0FBMkMsdUtBQXVLLDJCQUEyQiwwQkFBMEIsa0JBQWtCLG1EQUFtRCx1Q0FBdUMsbURBQW1ELHVDQUF1QyxjQUFjLG1CQUFtQixhQUFhLE9BQU8sa0JBQWtCLGdDQUFnQyxnQkFBZ0Isa0JBQWtCLFVBQVUseUJBQXlCLGNBQWMsZ0JBQWdCLHlCQUF5QixjQUFjLGlCQUFpQiw0QkFBNEIsdUJBQXVCLDJDQUEyQyx1QkFBdUIsMEJBQTBCLGdCQUFnQiwwQkFBMEIsWUFBWSxTQUFTLFdBQVcsdUJBQXVCLGdCQUFnQiwwQkFBMEIsWUFBWSxTQUFTLFdBQVcscUJBQXFCLGdCQUFnQiwwQkFBMEIsWUFBWSxTQUFTLFdBQVcsaUJBQWlCLGdCQUFnQiwwQkFBMEIsWUFBWSxTQUFTLFdBQVcsZ0NBQWdDLFlBQVksNkJBQTZCLFlBQVksMkJBQTJCLFlBQVksdUJBQXVCLFlBQVksK0NBQStDLFlBQVksV0FBVyw0Q0FBNEMsWUFBWSxXQUFXLDBDQUEwQyxZQUFZLFdBQVcsc0NBQXNDLFlBQVksV0FBVyw2Q0FBNkMsaUJBQWlCLDBDQUEwQyxpQkFBaUIsd0NBQXdDLGlCQUFpQixvQ0FBb0MsaUJBQWlCLDJEQUEyRCxTQUFTLFFBQVEsMkJBQTJCLHdEQUF3RCxTQUFTLFFBQVEsMkJBQTJCLHNEQUFzRCxTQUFTLFFBQVEsMkJBQTJCLGtEQUFrRCxTQUFTLFFBQVEsMkJBQTJCLGdFQUFnRSxjQUFjLDZEQUE2RCxjQUFjLDJEQUEyRCxjQUFjLHVEQUF1RCxjQUFjLG9FQUFvRSxhQUFhLGlFQUFpRSxhQUFhLCtEQUErRCxhQUFhLDJEQUEyRCxhQUFhLDhDQUE4QyxZQUFZLDJDQUEyQyxZQUFZLHlDQUF5QyxZQUFZLHFDQUFxQyxZQUFZLDBCQUEwQiwwQ0FBMEMsZUFBZSx1Q0FBdUMsZUFBZSxxQ0FBcUMsZUFBZSxpQ0FBaUMsZ0JBQWdCLDBCQUEwQixnQkFBZ0IsMEJBQTBCLFlBQVksU0FBUyxXQUFXLGdDQUFnQyxZQUFZLCtDQUErQyxZQUFZLFdBQVcsNkNBQTZDLGlCQUFpQiwyREFBMkQsU0FBUyxRQUFRLDJCQUEyQixnRUFBZ0UsY0FBYyxvRUFBb0UsYUFBYSw4Q0FBOEMsWUFBWSwwQkFBMEIsMENBQTBDLGdCQUFnQix1QkFBdUIsZ0JBQWdCLDBCQUEwQixZQUFZLFNBQVMsV0FBVyw2QkFBNkIsWUFBWSw0Q0FBNEMsWUFBWSxXQUFXLDBDQUEwQyxpQkFBaUIsd0RBQXdELFNBQVMsUUFBUSwyQkFBMkIsNkRBQTZELGNBQWMsaUVBQWlFLGFBQWEsMkNBQTJDLFlBQVksMEJBQTBCLHVDQUF1QyxnQkFBZ0IscUJBQXFCLGdCQUFnQiwwQkFBMEIsWUFBWSxTQUFTLFdBQVcsMkJBQTJCLFlBQVksMENBQTBDLFlBQVksV0FBVyx3Q0FBd0MsaUJBQWlCLHNEQUFzRCxTQUFTLFFBQVEsMkJBQTJCLDJEQUEyRCxjQUFjLCtEQUErRCxhQUFhLHlDQUF5QyxZQUFZLDBCQUEwQixxQ0FBcUMsZ0JBQWdCLDJCQUEyQixnQkFBZ0IsMEJBQTBCLFlBQVksU0FBUyxXQUFXLFNBQVMsT0FBTyxlQUFlLFFBQVEsTUFBTSxpQkFBaUIsaUNBQWlDLFlBQVksZ0RBQWdELFlBQVksV0FBVyw4Q0FBOEMsaUJBQWlCLDREQUE0RCxTQUFTLFFBQVEsMkJBQTJCLGlFQUFpRSxjQUFjLHFFQUFxRSxhQUFhLCtDQUErQyxZQUFZLDBCQUEwQiwyQ0FBMkMsZ0JBQWdCLFdBQVcsc0JBQXNCLFNBQVMsZUFBZSxPQUFPLGdCQUFnQixrQkFBa0IsUUFBUSxNQUFNLFdBQVcscUNBQXFDLFlBQVksa0JBQWtCLFdBQVcsa0JBQWtCLDZCQUE2QixrQkFBa0IsWUFBWSxXQUFXLDhCQUE4QixlQUFlLGdCQUFnQixvQkFBb0Isa0JBQWtCLFdBQVcsVUFBVSx3QkFBd0IsYUFBYSxZQUFZLHdCQUF3QixjQUFjLFdBQVcsT0FBTyxnQkFBZ0IsV0FBVyxrQkFBa0IsUUFBUSxVQUFVLFVBQVUscUJBQXFCLDBCQUEwQixlQUFlLDJCQUEyQixnQkFBZ0IsbUJBQW1CLHFCQUFxQixvQkFBb0IsNEJBQTRCLG9CQUFvQixlQUFlLHVCQUF1Qjs7QUFFOXF2Qjs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFDQSxJQUFJRSxZQUFZLEVBQUVqRCxRQUFRLGtCQUFZO0FBQzlCLFlBQUlDLE1BQU0sSUFBVixDQUFlLElBQUlDLEtBQUtELElBQUlFLGNBQWIsQ0FBNEIsSUFBSUMsS0FBS0gsSUFBSUksS0FBSixDQUFVRCxFQUFWLElBQWdCRixFQUF6QixDQUE0QixPQUFPRSxHQUFHLE9BQUgsRUFBWSxFQUFFOEMsS0FBSyxPQUFQLEVBQWdCM0MsYUFBYSxPQUE3QixFQUFzQ0MsT0FBTyxFQUFFLE1BQU8scUJBQXNCUCxJQUFJUSxRQUFuQyxFQUErQyxVQUFVUixJQUFJa0QsTUFBN0QsRUFBcUUsZUFBZWxELElBQUltRCxXQUF4RixFQUE3QyxFQUFaLEVBQWtLLENBQUNuRCxJQUFJb0QsRUFBSixDQUFPcEQsSUFBSXFELE1BQVgsRUFBbUIsVUFBVUMsR0FBVixFQUFlVixLQUFmLEVBQXNCO0FBQ3RSLG1CQUFPekMsR0FBRyxRQUFILEVBQWEsRUFBRW9ELEtBQUtYLEtBQVAsRUFBY3JDLE9BQU8sRUFBRSxPQUFPK0MsSUFBSUUsR0FBYixFQUFrQixRQUFTLFdBQVlGLElBQUlHLE1BQTNDLEVBQXJCLEVBQWIsQ0FBUDtBQUNILFNBRmdQLENBQUQsRUFFNU96RCxJQUFJMEQsRUFBSixDQUFPLEdBQVAsQ0FGNE8sRUFFL04xRCxJQUFJb0QsRUFBSixDQUFPcEQsSUFBSTJELFNBQVgsRUFBc0IsVUFBVUMsUUFBVixFQUFvQjtBQUN2RCxtQkFBT3pELEdBQUcsT0FBSCxFQUFZLEVBQUVvRCxLQUFLSyxTQUFTSixHQUFoQixFQUFxQmpELE9BQU8sRUFBRSxRQUFRLFVBQVYsRUFBc0IsU0FBU3FELFNBQVNDLEtBQXhDLEVBQStDLE9BQU9ELFNBQVNKLEdBQS9ELEVBQW9FLFdBQVdJLFNBQVNFLE9BQXhGLEVBQWlHLFdBQVdGLFNBQVMzQyxPQUFySCxFQUE1QixFQUFaLENBQVA7QUFDSCxTQUZnQixDQUYrTixDQUFsSyxFQUl6RSxDQUp5RSxDQUFQO0FBSzFFLEtBTlcsRUFNVFAsaUJBQWlCLEVBTlI7QUFPWkMsVUFBTSxXQVBNO0FBUVpDLFdBQU87QUFDSDtBQUNBQyxpQkFBUztBQUNMQyxrQkFBTUMsTUFERDtBQUVMQyxzQkFBVSxLQUZMO0FBR0xDLHFCQUFTLFNBQVNDLFNBQVQsR0FBcUI7QUFDMUIsdUJBQU8sRUFBUDtBQUNIO0FBTEksU0FGTjtBQVNIO0FBQ0FDLGNBQU07QUFDRkwsa0JBQU1NLEtBREo7QUFFRkosc0JBQVUsS0FGUjtBQUdGQyxxQkFBUyxTQUFTSSxTQUFULEdBQXFCO0FBQzFCLHVCQUFPLEVBQVA7QUFDSDtBQUxDLFNBVkg7QUFpQkg7QUFDQTZCLGdCQUFRO0FBQ0pwQyxrQkFBTVEsTUFERjtBQUVKTixzQkFBVTtBQUZOLFNBbEJMO0FBc0JIO0FBQ0FxQyxnQkFBUTtBQUNKdkMsa0JBQU1NLEtBREY7QUFFSkosc0JBQVUsSUFGTjtBQUdKK0MsdUJBQVcsbUJBQVVDLEtBQVYsRUFBaUI7QUFDeEIsb0JBQUlDLFFBQVEsSUFBWjtBQUNBRCxzQkFBTTVCLE9BQU4sQ0FBYyxVQUFVa0IsR0FBVixFQUFlO0FBQ3pCLHdCQUFJWSxXQUFXWixJQUFJYSxjQUFKLENBQW1CLEtBQW5CLEtBQTZCYixJQUFJYSxjQUFKLENBQW1CLFFBQW5CLENBQTVDO0FBQ0Esd0JBQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ1hELGdDQUFRLEtBQVI7QUFDSDtBQUNKLGlCQUxEO0FBTUEsdUJBQU9BLEtBQVA7QUFDSDtBQVpHLFNBdkJMO0FBcUNIO0FBQ0FOLG1CQUFXO0FBQ1A3QyxrQkFBTU0sS0FEQztBQUVQSixzQkFBVSxLQUZIO0FBR1BDLHFCQUFTLG9CQUFZO0FBQUUsdUJBQU8sRUFBUDtBQUFZLGFBSDVCO0FBSVA4Qyx1QkFBVyxtQkFBVUMsS0FBVixFQUFpQjtBQUN4QixvQkFBSUMsUUFBUSxJQUFaO0FBQ0FELHNCQUFNNUIsT0FBTixDQUFjLFVBQVVnQyxLQUFWLEVBQWlCO0FBQzNCLHdCQUFJRixXQUFXRSxNQUFNRCxjQUFOLENBQXFCLE9BQXJCLEtBQWlDQyxNQUFNRCxjQUFOLENBQXFCLEtBQXJCLENBQWpDLElBQWdFQyxNQUFNRCxjQUFOLENBQXFCLFNBQXJCLENBQS9FO0FBQ0Esd0JBQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ1hELGdDQUFRLEtBQVI7QUFDSDtBQUNKLGlCQUxEO0FBTUEsdUJBQU9BLEtBQVA7QUFDSDtBQWJNLFNBdENSO0FBcURIO0FBQ0FkLHFCQUFhO0FBQ1RyQyxrQkFBTVMsT0FERztBQUVUTixxQkFBUztBQUZBO0FBdERWLEtBUks7QUFtRVo5QyxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDbEIsZUFBTztBQUNIc0Qsb0JBQVE7QUFETCxTQUFQO0FBR0gsS0F2RVc7QUF3RVpDLGNBQVU7QUFDTmxCLGtCQUFVLFNBQVNBLFFBQVQsR0FBb0I7QUFDMUIsbUJBQU9tQixLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsTUFBaUIsU0FBUyxDQUExQixDQUFYLElBQTJDLENBQWxEO0FBQ0g7QUFISyxLQXhFRTtBQTZFWkMsYUFBUyxTQUFTQSxPQUFULEdBQW1CO0FBQ3hCLFlBQUlDLFNBQVMsSUFBYjs7QUFFQSxZQUFJQyxPQUFPLG1CQUFBQyxDQUFRLEdBQVIsQ0FBWDtBQUNBLGFBQUtSLE1BQUwsR0FBYyxJQUFJTyxJQUFKLENBQVNFLFNBQVNDLGNBQVQsQ0FBeUIscUJBQXNCLEtBQUszQixRQUFwRCxDQUFULEVBQTBFLEtBQUtLLE9BQS9FLENBQWQ7QUFDQSxhQUFLTSxJQUFMLENBQVVpQixPQUFWLENBQWtCLFVBQVVDLE9BQVYsRUFBbUI7QUFDakNOLG1CQUFPTixNQUFQLENBQWNhLEVBQWQsQ0FBaUJELE9BQWpCLEVBQTBCTixPQUFPUSxlQUFqQztBQUNILFNBRkQ7QUFHSCxLQXJGVztBQXNGWkUsbUJBQWUsU0FBU0EsYUFBVCxHQUF5QjtBQUNwQztBQUNILEtBeEZXO0FBeUZacEUsYUFBUztBQUNMa0UseUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJHLEtBQXpCLEVBQWdDO0FBQzdDLGlCQUFLbEUsS0FBTCxDQUFXa0UsTUFBTTVCLElBQWpCLEVBQXVCNEIsS0FBdkI7QUFDSDtBQUhJO0FBekZHLENBQWhCOztBQWdHQSxJQUFJQyxhQUFhLENBQUNLLFNBQUQsQ0FBakI7O0FBRUEsSUFBSUosUUFBUyxTQUFUQSxLQUFTLENBQVVDLEdBQVYsRUFBZTtBQUN4QkYsZUFBV1AsT0FBWCxDQUFtQixVQUFVVSxTQUFWLEVBQXFCO0FBQ3BDRCxZQUFJRSxTQUFKLENBQWNELFVBQVVuQyxJQUF4QixFQUE4Qm1DLFNBQTlCO0FBQ0gsS0FGRDtBQUdILENBSkQ7O0FBT0E7Ozs7Ozs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDhCQUE4QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsMEJBQTBCO0FBQ25ELDZCQUE2Qiw2QkFBNkIsZUFBZSxFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQkFBK0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsOEJBQThCO0FBQzNEO0FBQ0EsaUNBQWlDO0FBQ2pDLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsdUJBQXVCO0FBQ3REO0FBQ0EsZ0NBQWdDLGtCQUFrQjtBQUNsRCxtQ0FBbUM7QUFDbkMsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNkNBQTZDLFdBQVcsRUFBRTtBQUN6RTtBQUNBO0FBQ0EsZ0NBQWdDLHNDQUFzQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxTQUFTLDJCQUEyQixFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0NBQWdDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxrQ0FBa0MsU0FBUyxZQUFZLEVBQUU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssc0NBQXNDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLG9CQUFvQixFQUFFO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLGdEQUFnRCxFQUFFO0FBQzVFLHFDQUFxQyxTQUFTLDBCQUEwQixFQUFFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQiwwQkFBMEI7QUFDMUIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCO0FBQ0Esb0NBQW9DLFNBQVMsV0FBVyxFQUFFO0FBQzFELG1DQUFtQyxTQUFTLHNCQUFzQixFQUFFO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHFDQUFxQztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFNBQVMsVUFBVSxFQUFFO0FBQzFEO0FBQ0Esb0RBQW9ELFNBQVMsWUFBWSxFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xELHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsU0FBUyxZQUFZLEVBQUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMscUNBQXFDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUNBQXlDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDRDQUE0QyxTQUFTLFlBQVksRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsbUNBQW1DO0FBQzFFLHdDQUF3QyxTQUFTLGFBQWEsRUFBRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7OztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNERBQTREO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUyx3Q0FBd0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHdDQUF3QztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxvQ0FBb0MsRUFBRTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsOEJBQThCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQ0FBa0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsb0JBQW9CLEVBQUU7QUFDaEQ7QUFDQSw2QkFBNkIsc0NBQXNDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsOEJBQThCLDRKQUE0SjtBQUMxTDtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNuTEE7QUFDQTtBQUNBO0FBQ0EsNENBQXNSO0FBQ3RSO0FBQ0EsOENBQXlMO0FBQ3pMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDK0JBO0FBQ0E7O0FBRUE7QUFDQSxRQURBLGtCQUNBO0FBQ0E7QUFDQSwyQkFEQTs7QUFHQSw2QkFIQTtBQUlBLCtCQUpBO0FBS0EsZ0NBTEE7QUFNQSwyQkFOQTs7QUFRQSxnQ0FSQTtBQVNBLCtCQVRBOztBQVdBLG9DQVhBO0FBWUEsbUNBWkE7QUFhQTs7QUFiQTtBQWdCQSxLQWxCQTs7O0FBb0JBO0FBQ0Esb0JBREEsMEJBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUhBLEVBR0EsR0FIQTtBQUlBO0FBQ0E7QUFSQSxLQXBCQTs7QUErQkE7QUFDQTtBQURBLEtBL0JBOztBQW1DQSxXQW5DQSxxQkFtQ0E7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBRkE7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBVEE7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUZBLEVBRUEsR0FGQTtBQUdBLFNBTEE7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUZBLEVBRUEsR0FGQTtBQUlBLFNBTkE7QUFRQSxLQXhFQTs7O0FBMkVBO0FBQ0EsYUFEQSxpQkFDQSxTQURBLEVBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQVZBO0FBWUEsdUJBWkEsNkJBWUE7QUFDQTtBQUNBLFNBZEE7QUFnQkEsbUJBaEJBLHlCQWdCQTtBQUNBO0FBQ0EsU0FsQkE7QUFvQkEsd0JBcEJBLDhCQW9CQTtBQUNBO0FBQ0E7QUFDQSxTQXZCQTtBQXlCQSwwQkF6QkEsZ0NBeUJBO0FBQ0E7QUFDQTtBQUNBLGFBRkEsTUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBRkEsTUFFQTtBQUNBO0FBQ0E7QUFDQSxTQXJDQTtBQXVDQSxvQkF2Q0EsMEJBdUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBSEEsTUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBaERBO0FBa0RBLHVCQWxEQSw2QkFrREE7QUFBQTs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUpBO0FBS0E7QUE1REE7QUEzRUEsRzs7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBc1I7QUFDdFI7QUFDQSw4Q0FBbUw7QUFDbkw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNrQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQURBLEtBREE7QUFJQSxRQUpBLGtCQUlBO0FBQ0E7QUFDQSw0QkFEQTtBQUVBLDBEQUZBO0FBR0Esc0JBSEE7O0FBS0EsK0JBTEE7O0FBT0E7QUFQQTtBQVNBLEtBZEE7OztBQWdCQSxhQWhCQTs7QUFrQkEsV0FsQkEscUJBa0JBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBRkE7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsU0FIQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQSxTQUhBOztBQUtBO0FBQ0E7QUFDQTtBQUNBLFNBSEE7QUFLQSxLQTNDQTtBQTZDQSxXQTdDQSxxQkE2Q0EsQ0FDQSxDQTlDQTs7O0FBZ0RBO0FBQ0Esb0JBREEsd0JBQ0EsUUFEQSxFQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7QUFDQTtBQUNBLGlCQUpBLE1BSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQSxhQWJBO0FBY0EsU0FoQkE7QUFrQkEscUJBbEJBLHlCQWtCQSxLQWxCQSxFQWtCQTtBQUNBO0FBQ0EsU0FwQkE7QUFzQkEscUJBdEJBLHlCQXNCQSxLQXRCQSxFQXNCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBNUJBO0FBOEJBLHFCQTlCQSx5QkE4QkEsR0E5QkEsRUE4QkE7QUFDQTtBQUNBLFNBaENBO0FBa0NBLGtCQWxDQSx3QkFrQ0E7QUFDQTtBQUNBLFNBcENBO0FBc0NBLGlCQXRDQSxxQkFzQ0EsS0F0Q0EsRUFzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0NBO0FBaERBLEc7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxzQ0FBc0M7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLG9CQUFvQixFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyw4QkFBOEIsRUFBRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLGlCQUFpQjtBQUNqQjtBQUNBLGdDQUFnQyxTQUFTLFdBQVcsRUFBRTtBQUN0RDtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsc0JBQXNCLEVBQUU7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFDQUFxQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVMsVUFBVSxFQUFFO0FBQ3hEO0FBQ0Esa0RBQWtELFNBQVMsWUFBWSxFQUFFO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsbUNBQW1DO0FBQ25DO0FBQ0Esa0RBQWtELFNBQVMsWUFBWSxFQUFFO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IscUNBQXFDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsOEJBQThCLEVBQUU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsZ0NBQWdDLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVMsb0JBQW9CLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFNBQVMsWUFBWSxFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qyw0QkFBNEI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDREQUE0RDtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVMsd0NBQXdDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx3Q0FBd0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsb0NBQW9DLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDhCQUE4QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0NBQWtDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLG9CQUFvQixFQUFFO0FBQ2hEO0FBQ0EsNkJBQTZCLHNDQUFzQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLDhCQUE4Qiw0SkFBNEo7QUFDMUw7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUF5TDtBQUN6TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7O0FBRUE7QUFDQSxRQURBLGtCQUNBO0FBQ0E7QUFDQSxvQ0FEQTtBQUVBLHFCQUZBOztBQUlBO0FBSkE7QUFNQSxLQVJBOzs7QUFVQTtBQUNBLHlCQURBLDZCQUNBLEdBREEsRUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQSxLQVZBOztBQW1CQSxXQW5CQSxxQkFtQkE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUhBOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBR0EsS0FqQ0E7OztBQW1DQTs7QUFuQ0EsRzs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsdUNBQXVDO0FBQ3JELGNBQWMsOERBQThEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssc0NBQXNDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdDQUFnQztBQUN2RDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUywrQkFBK0IsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0NBQWdDO0FBQy9ELGdDQUFnQyxnQ0FBZ0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msd0NBQXdDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQ0FBcUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsOENBQThDLFNBQVMsaUJBQWlCLEVBQUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0NBQWdDO0FBQy9ELGdDQUFnQyxnQ0FBZ0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsZ0NBQWdDLEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLG9CQUFvQixFQUFFO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0JBQStCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHVCQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxnQ0FBZ0MsRUFBRTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtREFBbUQ7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDMwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMDhcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDMwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9NYWlsZXJDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02ZTE3ZmRjNFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL01haWxlckNvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9NYWlsZXJDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTZlMTdmZGM0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNmUxN2ZkYzRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvTWFpbGVyQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzEyXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIlwib2JqZWN0XCI9PXR5cGVvZiBuYXZpZ2F0b3ImJmZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJQbHlyXCIsdCk6ZS5QbHlyPXQoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPWZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lP2UuY29uc3RydWN0b3I6bnVsbH0sdD1mdW5jdGlvbihlLHQpe3JldHVybiBCb29sZWFuKGUmJnQmJmUgaW5zdGFuY2VvZiB0KX0saT1mdW5jdGlvbihlKXtyZXR1cm4gbnVsbD09ZX0sbj1mdW5jdGlvbih0KXtyZXR1cm4gZSh0KT09PU9iamVjdH0scz1mdW5jdGlvbih0KXtyZXR1cm4gZSh0KT09PVN0cmluZ30sYT1mdW5jdGlvbihlKXtyZXR1cm4gQXJyYXkuaXNBcnJheShlKX0sbz1mdW5jdGlvbihlKXtyZXR1cm4gdChlLE5vZGVMaXN0KX0scj1mdW5jdGlvbihlKXtyZXR1cm4gaShlKXx8KHMoZSl8fGEoZSl8fG8oZSkpJiYhZS5sZW5ndGh8fG4oZSkmJiFPYmplY3Qua2V5cyhlKS5sZW5ndGh9LGw9e251bGxPclVuZGVmaW5lZDppLG9iamVjdDpuLG51bWJlcjpmdW5jdGlvbih0KXtyZXR1cm4gZSh0KT09PU51bWJlciYmIU51bWJlci5pc05hTih0KX0sc3RyaW5nOnMsYm9vbGVhbjpmdW5jdGlvbih0KXtyZXR1cm4gZSh0KT09PUJvb2xlYW59LGZ1bmN0aW9uOmZ1bmN0aW9uKHQpe3JldHVybiBlKHQpPT09RnVuY3Rpb259LGFycmF5OmEsd2Vha01hcDpmdW5jdGlvbihlKXtyZXR1cm4gdChlLFdlYWtNYXApfSxub2RlTGlzdDpvLGVsZW1lbnQ6ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSxFbGVtZW50KX0sdGV4dE5vZGU6ZnVuY3Rpb24odCl7cmV0dXJuIGUodCk9PT1UZXh0fSxldmVudDpmdW5jdGlvbihlKXtyZXR1cm4gdChlLEV2ZW50KX0sa2V5Ym9hcmRFdmVudDpmdW5jdGlvbihlKXtyZXR1cm4gdChlLEtleWJvYXJkRXZlbnQpfSxjdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSx3aW5kb3cuVGV4dFRyYWNrQ3VlKXx8dChlLHdpbmRvdy5WVFRDdWUpfSx0cmFjazpmdW5jdGlvbihlKXtyZXR1cm4gdChlLFRleHRUcmFjayl8fCFpKGUpJiZzKGUua2luZCl9LHVybDpmdW5jdGlvbihlKXtpZih0KGUsd2luZG93LlVSTCkpcmV0dXJuITA7dmFyIGk9ZTtlLnN0YXJ0c1dpdGgoXCJodHRwOi8vXCIpJiZlLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKXx8KGk9XCJodHRwOi8vXCIrZSk7dHJ5e3JldHVybiFyKG5ldyBVUkwoaSkuaG9zdG5hbWUpfWNhdGNoKGUpe3JldHVybiExfX0sZW1wdHk6cn0sYz1mdW5jdGlvbigpe3ZhciBlPSExO3RyeXt2YXIgdD1PYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJwYXNzaXZlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBlPSEwLG51bGx9fSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsbnVsbCx0KSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRlc3RcIixudWxsLHQpfWNhdGNoKGUpe31yZXR1cm4gZX0oKTtmdW5jdGlvbiB1KGUsdCxpKXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdLHM9dGhpcyxhPSEoYXJndW1lbnRzLmxlbmd0aD40JiZ2b2lkIDAhPT1hcmd1bWVudHNbNF0pfHxhcmd1bWVudHNbNF0sbz1hcmd1bWVudHMubGVuZ3RoPjUmJnZvaWQgMCE9PWFyZ3VtZW50c1s1XSYmYXJndW1lbnRzWzVdO2lmKGUmJlwiYWRkRXZlbnRMaXN0ZW5lclwiaW4gZSYmIWwuZW1wdHkodCkmJmwuZnVuY3Rpb24oaSkpe3ZhciByPXQuc3BsaXQoXCIgXCIpLHU9bztjJiYodT17cGFzc2l2ZTphLGNhcHR1cmU6b30pLHIuZm9yRWFjaChmdW5jdGlvbih0KXtzJiZzLmV2ZW50TGlzdGVuZXJzJiZuJiZzLmV2ZW50TGlzdGVuZXJzLnB1c2goe2VsZW1lbnQ6ZSx0eXBlOnQsY2FsbGJhY2s6aSxvcHRpb25zOnV9KSxlW24/XCJhZGRFdmVudExpc3RlbmVyXCI6XCJyZW1vdmVFdmVudExpc3RlbmVyXCJdKHQsaSx1KX0pfX1mdW5jdGlvbiBkKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpcIlwiLGk9YXJndW1lbnRzWzJdLG49IShhcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSl8fGFyZ3VtZW50c1szXSxzPWFyZ3VtZW50cy5sZW5ndGg+NCYmdm9pZCAwIT09YXJndW1lbnRzWzRdJiZhcmd1bWVudHNbNF07dS5jYWxsKHRoaXMsZSx0LGksITAsbixzKX1mdW5jdGlvbiBoKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpcIlwiLGk9YXJndW1lbnRzWzJdLG49IShhcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSl8fGFyZ3VtZW50c1szXSxzPWFyZ3VtZW50cy5sZW5ndGg+NCYmdm9pZCAwIT09YXJndW1lbnRzWzRdJiZhcmd1bWVudHNbNF07dS5jYWxsKHRoaXMsZSx0LGksITEsbixzKX1mdW5jdGlvbiBwKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpcIlwiLGk9YXJndW1lbnRzWzJdLG49IShhcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSl8fGFyZ3VtZW50c1szXSxzPWFyZ3VtZW50cy5sZW5ndGg+NCYmdm9pZCAwIT09YXJndW1lbnRzWzRdJiZhcmd1bWVudHNbNF07dS5jYWxsKHRoaXMsZSx0LGZ1bmN0aW9uIGEoKXtoKGUsdCxhLG4scyk7Zm9yKHZhciBvPWFyZ3VtZW50cy5sZW5ndGgscj1BcnJheShvKSxsPTA7bDxvO2wrKylyW2xdPWFyZ3VtZW50c1tsXTtpLmFwcGx5KHRoaXMscil9LCEwLG4scyl9ZnVuY3Rpb24gZihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06XCJcIixpPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0sbj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106e307aWYobC5lbGVtZW50KGUpJiYhbC5lbXB0eSh0KSl7dmFyIHM9bmV3IEN1c3RvbUV2ZW50KHQse2J1YmJsZXM6aSxkZXRhaWw6T2JqZWN0LmFzc2lnbih7fSxuLHtwbHlyOnRoaXN9KX0pO2UuZGlzcGF0Y2hFdmVudChzKX19dmFyIG09ZnVuY3Rpb24oZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSxnPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKXt2YXIgbj10W2ldO24uZW51bWVyYWJsZT1uLmVudW1lcmFibGV8fCExLG4uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG4mJihuLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLmtleSxuKX19cmV0dXJuIGZ1bmN0aW9uKHQsaSxuKXtyZXR1cm4gaSYmZSh0LnByb3RvdHlwZSxpKSxuJiZlKHQsbiksdH19KCkseT1mdW5jdGlvbihlLHQsaSl7cmV0dXJuIHQgaW4gZT9PYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHt2YWx1ZTppLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6ZVt0XT1pLGV9LHY9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSx0KXtpZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBlO2lmKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoZSkpcmV0dXJuIGZ1bmN0aW9uKGUsdCl7dmFyIGk9W10sbj0hMCxzPSExLGE9dm9pZCAwO3RyeXtmb3IodmFyIG8scj1lW1N5bWJvbC5pdGVyYXRvcl0oKTshKG49KG89ci5uZXh0KCkpLmRvbmUpJiYoaS5wdXNoKG8udmFsdWUpLCF0fHxpLmxlbmd0aCE9PXQpO249ITApO31jYXRjaChlKXtzPSEwLGE9ZX1maW5hbGx5e3RyeXshbiYmci5yZXR1cm4mJnIucmV0dXJuKCl9ZmluYWxseXtpZihzKXRocm93IGF9fXJldHVybiBpfShlLHQpO3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpfX0oKTtmdW5jdGlvbiBiKGUsdCl7dmFyIGk9ZS5sZW5ndGg/ZTpbZV07QXJyYXkuZnJvbShpKS5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbihlLGkpe3ZhciBuPWk+MD90LmNsb25lTm9kZSghMCk6dCxzPWUucGFyZW50Tm9kZSxhPWUubmV4dFNpYmxpbmc7bi5hcHBlbmRDaGlsZChlKSxhP3MuaW5zZXJ0QmVmb3JlKG4sYSk6cy5hcHBlbmRDaGlsZChuKX0pfWZ1bmN0aW9uIGsoZSx0KXtsLmVsZW1lbnQoZSkmJiFsLmVtcHR5KHQpJiZPYmplY3QuZW50cmllcyh0KS5maWx0ZXIoZnVuY3Rpb24oZSl7dmFyIHQ9dihlLDIpWzFdO3JldHVybiFsLm51bGxPclVuZGVmaW5lZCh0KX0pLmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGk9dih0LDIpLG49aVswXSxzPWlbMV07cmV0dXJuIGUuc2V0QXR0cmlidXRlKG4scyl9KX1mdW5jdGlvbiB3KGUsdCxpKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KGUpO3JldHVybiBsLm9iamVjdCh0KSYmayhuLHQpLGwuc3RyaW5nKGkpJiYobi5pbm5lclRleHQ9aSksbn1mdW5jdGlvbiBUKGUsdCxpLG4pe2wuZWxlbWVudCh0KSYmdC5hcHBlbmRDaGlsZCh3KGUsaSxuKSl9ZnVuY3Rpb24gQShlKXtsLm5vZGVMaXN0KGUpfHxsLmFycmF5KGUpP0FycmF5LmZyb20oZSkuZm9yRWFjaChBKTpsLmVsZW1lbnQoZSkmJmwuZWxlbWVudChlLnBhcmVudE5vZGUpJiZlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSl9ZnVuY3Rpb24gRShlKXtpZihsLmVsZW1lbnQoZSkpZm9yKHZhciB0PWUuY2hpbGROb2Rlcy5sZW5ndGg7dD4wOyllLnJlbW92ZUNoaWxkKGUubGFzdENoaWxkKSx0LT0xfWZ1bmN0aW9uIEMoZSx0KXtyZXR1cm4gbC5lbGVtZW50KHQpJiZsLmVsZW1lbnQodC5wYXJlbnROb2RlKSYmbC5lbGVtZW50KGUpPyh0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGUsdCksZSk6bnVsbH1mdW5jdGlvbiBQKGUsdCl7aWYoIWwuc3RyaW5nKGUpfHxsLmVtcHR5KGUpKXJldHVybnt9O3ZhciBpPXt9LG49dDtyZXR1cm4gZS5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1lLnRyaW0oKSxzPXQucmVwbGFjZShcIi5cIixcIlwiKSxhPXQucmVwbGFjZSgvW1tcXF1dL2csXCJcIikuc3BsaXQoXCI9XCIpLG89YVswXSxyPWEubGVuZ3RoPjE/YVsxXS5yZXBsYWNlKC9bXCInXS9nLFwiXCIpOlwiXCI7c3dpdGNoKHQuY2hhckF0KDApKXtjYXNlXCIuXCI6bC5vYmplY3QobikmJmwuc3RyaW5nKG4uY2xhc3MpJiYobi5jbGFzcys9XCIgXCIrcyksaS5jbGFzcz1zO2JyZWFrO2Nhc2VcIiNcIjppLmlkPXQucmVwbGFjZShcIiNcIixcIlwiKTticmVhaztjYXNlXCJbXCI6aVtvXT1yfX0pLGl9ZnVuY3Rpb24gUyhlLHQpe2lmKGwuZWxlbWVudChlKSl7dmFyIGk9dDtsLmJvb2xlYW4oaSl8fChpPSFlLmhpZGRlbiksaT9lLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLFwiXCIpOmUucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpfX1mdW5jdGlvbiBNKGUsdCxpKXtpZihsLm5vZGVMaXN0KGUpKXJldHVybiBBcnJheS5mcm9tKGUpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gTShlLHQsaSl9KTtpZihsLmVsZW1lbnQoZSkpe3ZhciBuPVwidG9nZ2xlXCI7cmV0dXJuIHZvaWQgMCE9PWkmJihuPWk/XCJhZGRcIjpcInJlbW92ZVwiKSxlLmNsYXNzTGlzdFtuXSh0KSxlLmNsYXNzTGlzdC5jb250YWlucyh0KX1yZXR1cm4hMX1mdW5jdGlvbiBOKGUsdCl7cmV0dXJuIGwuZWxlbWVudChlKSYmZS5jbGFzc0xpc3QuY29udGFpbnModCl9ZnVuY3Rpb24gTChlLHQpe3ZhciBpPXtFbGVtZW50OkVsZW1lbnR9O3JldHVybihpLm1hdGNoZXN8fGkud2Via2l0TWF0Y2hlc1NlbGVjdG9yfHxpLm1vek1hdGNoZXNTZWxlY3Rvcnx8aS5tc01hdGNoZXNTZWxlY3Rvcnx8ZnVuY3Rpb24oKXtyZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHQpKS5pbmNsdWRlcyh0aGlzKX0pLmNhbGwoZSx0KX1mdW5jdGlvbiB4KGUpe3JldHVybiB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGUpfWZ1bmN0aW9uIF8oZSl7cmV0dXJuIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoZSl9ZnVuY3Rpb24gSSgpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpudWxsLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtsLmVsZW1lbnQoZSkmJihlLmZvY3VzKCksdCYmTShlLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMudGFiRm9jdXMpKX12YXIgTyxqLHEsUj0oTz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSxqPXtXZWJraXRUcmFuc2l0aW9uOlwid2Via2l0VHJhbnNpdGlvbkVuZFwiLE1velRyYW5zaXRpb246XCJ0cmFuc2l0aW9uZW5kXCIsT1RyYW5zaXRpb246XCJvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZFwiLHRyYW5zaXRpb246XCJ0cmFuc2l0aW9uZW5kXCJ9LHE9T2JqZWN0LmtleXMoaikuZmluZChmdW5jdGlvbihlKXtyZXR1cm4gdm9pZCAwIT09Ty5zdHlsZVtlXX0pLCEhbC5zdHJpbmcocSkmJmpbcV0pO2Z1bmN0aW9uIEIoZSl7c2V0VGltZW91dChmdW5jdGlvbigpe3RyeXtTKGUsITApLGUub2Zmc2V0SGVpZ2h0LFMoZSwhMSl9Y2F0Y2goZSl7fX0sMCl9dmFyIEgsVj17aXNJRTohIWRvY3VtZW50LmRvY3VtZW50TW9kZSxpc1dlYmtpdDpcIldlYmtpdEFwcGVhcmFuY2VcImluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSYmIS9FZGdlLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGlzSVBob25lOi8oaVBob25lfGlQb2QpL2dpLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSxpc0lvczovKGlQYWR8aVBob25lfGlQb2QpL2dpLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKX0sRD17XCJhdWRpby9vZ2dcIjpcInZvcmJpc1wiLFwiYXVkaW8vd2F2XCI6XCIxXCIsXCJ2aWRlby93ZWJtXCI6XCJ2cDgsIHZvcmJpc1wiLFwidmlkZW8vbXA0XCI6XCJhdmMxLjQyRTAxRSwgbXA0YS40MC4yXCIsXCJ2aWRlby9vZ2dcIjpcInRoZW9yYVwifSxGPXthdWRpbzpcImNhblBsYXlUeXBlXCJpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIiksdmlkZW86XCJjYW5QbGF5VHlwZVwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpLGNoZWNrOmZ1bmN0aW9uKGUsdCxpKXt2YXIgbj1WLmlzSVBob25lJiZpJiZGLnBsYXlzaW5saW5lLHM9RltlXXx8XCJodG1sNVwiIT09dDtyZXR1cm57YXBpOnMsdWk6cyYmRi5yYW5nZUlucHV0JiYoXCJ2aWRlb1wiIT09ZXx8IVYuaXNJUGhvbmV8fG4pfX0scGlwOiFWLmlzSVBob25lJiZsLmZ1bmN0aW9uKHcoXCJ2aWRlb1wiKS53ZWJraXRTZXRQcmVzZW50YXRpb25Nb2RlKSxhaXJwbGF5OmwuZnVuY3Rpb24od2luZG93LldlYktpdFBsYXliYWNrVGFyZ2V0QXZhaWxhYmlsaXR5RXZlbnQpLHBsYXlzaW5saW5lOlwicGxheXNJbmxpbmVcImluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKSxtaW1lOmZ1bmN0aW9uKGUpe3ZhciB0PWUuc3BsaXQoXCIvXCIpLGk9dih0LDEpWzBdO2lmKCF0aGlzLmlzSFRNTDV8fGkhPT10aGlzLnR5cGUpcmV0dXJuITE7dmFyIG49dm9pZCAwO2UmJmUuaW5jbHVkZXMoXCJjb2RlY3M9XCIpP249ZTpcImF1ZGlvL21wZWdcIj09PWU/bj1cImF1ZGlvL21wZWc7XCI6ZSBpbiBEJiYobj1lKyc7IGNvZGVjcz1cIicrRFtlXSsnXCInKTt0cnl7cmV0dXJuIEJvb2xlYW4obiYmdGhpcy5tZWRpYS5jYW5QbGF5VHlwZShuKS5yZXBsYWNlKC9uby8sXCJcIikpfWNhdGNoKGUpe3JldHVybiExfX0sdGV4dFRyYWNrczpcInRleHRUcmFja3NcImluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKSxyYW5nZUlucHV0OihIPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxILnR5cGU9XCJyYW5nZVwiLFwicmFuZ2VcIj09PUgudHlwZSksdG91Y2g6XCJvbnRvdWNoc3RhcnRcImluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCx0cmFuc2l0aW9uczohMSE9PVIscmVkdWNlZE1vdGlvbjpcIm1hdGNoTWVkaWFcImluIHdpbmRvdyYmd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbilcIikubWF0Y2hlc30sVT17Z2V0U291cmNlczpmdW5jdGlvbigpe3ZhciBlPXRoaXM7cmV0dXJuIHRoaXMuaXNIVE1MNT9BcnJheS5mcm9tKHRoaXMubWVkaWEucXVlcnlTZWxlY3RvckFsbChcInNvdXJjZVwiKSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiBGLm1pbWUuY2FsbChlLHQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSl9KTpbXX0sZ2V0UXVhbGl0eU9wdGlvbnM6ZnVuY3Rpb24oKXtyZXR1cm4gVS5nZXRTb3VyY2VzLmNhbGwodGhpcykubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBOdW1iZXIoZS5nZXRBdHRyaWJ1dGUoXCJzaXplXCIpKX0pLmZpbHRlcihCb29sZWFuKX0sZXh0ZW5kOmZ1bmN0aW9uKCl7aWYodGhpcy5pc0hUTUw1KXt2YXIgZT10aGlzO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLm1lZGlhLFwicXVhbGl0eVwiLHtnZXQ6ZnVuY3Rpb24oKXt2YXIgdD1VLmdldFNvdXJjZXMuY2FsbChlKS5maW5kKGZ1bmN0aW9uKHQpe3JldHVybiB0LmdldEF0dHJpYnV0ZShcInNyY1wiKT09PWUuc291cmNlfSk7cmV0dXJuIHQmJk51bWJlcih0LmdldEF0dHJpYnV0ZShcInNpemVcIikpfSxzZXQ6ZnVuY3Rpb24odCl7dmFyIGk9VS5nZXRTb3VyY2VzLmNhbGwoZSkuZmluZChmdW5jdGlvbihlKXtyZXR1cm4gTnVtYmVyKGUuZ2V0QXR0cmlidXRlKFwic2l6ZVwiKSk9PT10fSk7aWYoaSl7dmFyIG49ZS5tZWRpYSxzPW4uY3VycmVudFRpbWUsYT1uLnBhdXNlZCxvPW4ucHJlbG9hZCxyPW4ucmVhZHlTdGF0ZTtlLm1lZGlhLnNyYz1pLmdldEF0dHJpYnV0ZShcInNyY1wiKSwoXCJub25lXCIhPT1vfHxyKSYmKGUub25jZShcImxvYWRlZG1ldGFkYXRhXCIsZnVuY3Rpb24oKXtlLmN1cnJlbnRUaW1lPXMsYXx8ZS5wbGF5KCl9KSxlLm1lZGlhLmxvYWQoKSksZi5jYWxsKGUsZS5tZWRpYSxcInF1YWxpdHljaGFuZ2VcIiwhMSx7cXVhbGl0eTp0fSksZS5zdG9yYWdlLnNldCh7cXVhbGl0eTp0fSl9fX0pfX0sY2FuY2VsUmVxdWVzdHM6ZnVuY3Rpb24oKXt0aGlzLmlzSFRNTDUmJihBKFUuZ2V0U291cmNlcy5jYWxsKHRoaXMpKSx0aGlzLm1lZGlhLnNldEF0dHJpYnV0ZShcInNyY1wiLHRoaXMuY29uZmlnLmJsYW5rVmlkZW8pLHRoaXMubWVkaWEubG9hZCgpLHRoaXMuZGVidWcubG9nKFwiQ2FuY2VsbGVkIG5ldHdvcmsgcmVxdWVzdHNcIikpfX07ZnVuY3Rpb24geihlKXtyZXR1cm4gbC5hcnJheShlKT9lLmZpbHRlcihmdW5jdGlvbih0LGkpe3JldHVybiBlLmluZGV4T2YodCk9PT1pfSk6ZX1mdW5jdGlvbiBXKGUsdCl7cmV0dXJuIHQuc3BsaXQoXCIuXCIpLnJlZHVjZShmdW5jdGlvbihlLHQpe3JldHVybiBlJiZlW3RdfSxlKX1mdW5jdGlvbiBLKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PWFyZ3VtZW50cy5sZW5ndGgsaT1BcnJheSh0PjE/dC0xOjApLG49MTtuPHQ7bisrKWlbbi0xXT1hcmd1bWVudHNbbl07aWYoIWkubGVuZ3RoKXJldHVybiBlO3ZhciBzPWkuc2hpZnQoKTtyZXR1cm4gbC5vYmplY3Qocyk/KE9iamVjdC5rZXlzKHMpLmZvckVhY2goZnVuY3Rpb24odCl7bC5vYmplY3Qoc1t0XSk/KE9iamVjdC5rZXlzKGUpLmluY2x1ZGVzKHQpfHxPYmplY3QuYXNzaWduKGUseSh7fSx0LHt9KSksSyhlW3RdLHNbdF0pKTpPYmplY3QuYXNzaWduKGUseSh7fSx0LHNbdF0pKX0pLEsuYXBwbHkodm9pZCAwLFtlXS5jb25jYXQoaSkpKTplfWZ1bmN0aW9uIFkoZSl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgsaT1BcnJheSh0PjE/dC0xOjApLG49MTtuPHQ7bisrKWlbbi0xXT1hcmd1bWVudHNbbl07cmV0dXJuIGwuZW1wdHkoZSk/ZTplLnRvU3RyaW5nKCkucmVwbGFjZSgveyhcXGQrKX0vZyxmdW5jdGlvbihlLHQpe3JldHVybiBpW3RdLnRvU3RyaW5nKCl9KX1mdW5jdGlvbiBKKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOlwiXCIsdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06XCJcIixpPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcIlwiO3JldHVybiBlLnJlcGxhY2UobmV3IFJlZ0V4cCh0LnRvU3RyaW5nKCkucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFtcXF1cXC9cXFxcXSkvZyxcIlxcXFwkMVwiKSxcImdcIiksaS50b1N0cmluZygpKX1mdW5jdGlvbiBRKCl7cmV0dXJuKGFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpcIlwiKS50b1N0cmluZygpLnJlcGxhY2UoL1xcd1xcUyovZyxmdW5jdGlvbihlKXtyZXR1cm4gZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStlLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpfSl9ZnVuY3Rpb24gJCgpe3ZhciBlPShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJcIikudG9TdHJpbmcoKTtyZXR1cm4oZT1mdW5jdGlvbigpe3ZhciBlPShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJcIikudG9TdHJpbmcoKTtyZXR1cm4gZT1KKGUsXCItXCIsXCIgXCIpLGU9SihlLFwiX1wiLFwiIFwiKSxKKGU9UShlKSxcIiBcIixcIlwiKX0oZSkpLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpK2Uuc2xpY2UoMSl9ZnVuY3Rpb24gRyhlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiB0LmFwcGVuZENoaWxkKGUpLHQuaW5uZXJIVE1MfXZhciBYPWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOlwiXCIsdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e307aWYobC5lbXB0eShlKXx8bC5lbXB0eSh0KSlyZXR1cm5cIlwiO3ZhciBpPVcodC5pMThuLGUpO2lmKGwuZW1wdHkoaSkpcmV0dXJuXCJcIjt2YXIgbj17XCJ7c2Vla3RpbWV9XCI6dC5zZWVrVGltZSxcInt0aXRsZX1cIjp0LnRpdGxlfTtyZXR1cm4gT2JqZWN0LmVudHJpZXMobikuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD12KGUsMiksbj10WzBdLHM9dFsxXTtpPUooaSxuLHMpfSksaX0sWj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7bSh0aGlzLGUpLHRoaXMuZW5hYmxlZD10LmNvbmZpZy5zdG9yYWdlLmVuYWJsZWQsdGhpcy5rZXk9dC5jb25maWcuc3RvcmFnZS5rZXl9cmV0dXJuIGcoZSxbe2tleTpcImdldFwiLHZhbHVlOmZ1bmN0aW9uKHQpe2lmKCFlLnN1cHBvcnRlZHx8IXRoaXMuZW5hYmxlZClyZXR1cm4gbnVsbDt2YXIgaT13aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO2lmKGwuZW1wdHkoaSkpcmV0dXJuIG51bGw7dmFyIG49SlNPTi5wYXJzZShpKTtyZXR1cm4gbC5zdHJpbmcodCkmJnQubGVuZ3RoP25bdF06bn19LHtrZXk6XCJzZXRcIix2YWx1ZTpmdW5jdGlvbih0KXtpZihlLnN1cHBvcnRlZCYmdGhpcy5lbmFibGVkJiZsLm9iamVjdCh0KSl7dmFyIGk9dGhpcy5nZXQoKTtsLmVtcHR5KGkpJiYoaT17fSksSyhpLHQpLHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSxKU09OLnN0cmluZ2lmeShpKSl9fX1dLFt7a2V5Olwic3VwcG9ydGVkXCIsZ2V0OmZ1bmN0aW9uKCl7dHJ5e2lmKCEoXCJsb2NhbFN0b3JhZ2VcImluIHdpbmRvdykpcmV0dXJuITE7cmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fX3Rlc3RcIixcIl9fX3Rlc3RcIiksd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiX19fdGVzdFwiKSwhMH1jYXRjaChlKXtyZXR1cm4hMX19fV0pLGV9KCk7ZnVuY3Rpb24gZWUoZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOlwidGV4dFwiO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihpLG4pe3RyeXt2YXIgcz1uZXcgWE1MSHR0cFJlcXVlc3Q7aWYoIShcIndpdGhDcmVkZW50aWFsc1wiaW4gcykpcmV0dXJuO3MuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpe2lmKFwidGV4dFwiPT09dCl0cnl7aShKU09OLnBhcnNlKHMucmVzcG9uc2VUZXh0KSl9Y2F0Y2goZSl7aShzLnJlc3BvbnNlVGV4dCl9ZWxzZSBpKHMucmVzcG9uc2UpfSkscy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihzLnN0YXR1cyl9KSxzLm9wZW4oXCJHRVRcIixlLCEwKSxzLnJlc3BvbnNlVHlwZT10LHMuc2VuZCgpfWNhdGNoKGUpe24oZSl9fSl9ZnVuY3Rpb24gdGUoZSx0KXtpZihsLnN0cmluZyhlKSl7dmFyIGk9bC5zdHJpbmcodCksbj1mdW5jdGlvbigpe3JldHVybiBudWxsIT09ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodCl9LHM9ZnVuY3Rpb24oZSx0KXtlLmlubmVySFRNTD10LGkmJm4oKXx8ZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsZSl9O2lmKCFpfHwhbigpKXt2YXIgYT1aLnN1cHBvcnRlZCxvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aWYoby5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIixcIlwiKSxpJiZvLnNldEF0dHJpYnV0ZShcImlkXCIsdCksYSl7dmFyIHI9d2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2FjaGUtXCIrdCk7aWYobnVsbCE9PXIpe3ZhciBjPUpTT04ucGFyc2Uocik7cyhvLGMuY29udGVudCl9fWVlKGUpLnRoZW4oZnVuY3Rpb24oZSl7bC5lbXB0eShlKXx8KGEmJndpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNhY2hlLVwiK3QsSlNPTi5zdHJpbmdpZnkoe2NvbnRlbnQ6ZX0pKSxzKG8sZSkpfSkuY2F0Y2goZnVuY3Rpb24oKXt9KX19fXZhciBpZT1mdW5jdGlvbihlKXtyZXR1cm4gcGFyc2VJbnQoZS82MC82MCU2MCwxMCl9LG5lPWZ1bmN0aW9uKGUpe3JldHVybiBwYXJzZUludChlLzYwJTYwLDEwKX0sc2U9ZnVuY3Rpb24oZSl7cmV0dXJuIHBhcnNlSW50KGUlNjAsMTApfTtmdW5jdGlvbiBhZSgpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXSxpPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07aWYoIWwubnVtYmVyKGUpKXJldHVybiBhZShudWxsLHQsaSk7dmFyIG49ZnVuY3Rpb24oZSl7cmV0dXJuKFwiMFwiK2UpLnNsaWNlKC0yKX0scz1pZShlKSxhPW5lKGUpLG89c2UoZSk7cmV0dXJuIHR8fHM+MD9zKz1cIjpcIjpzPVwiXCIsKGkmJmU+MD9cIi1cIjpcIlwiKStzK24oYSkrXCI6XCIrbihvKX12YXIgb2U9e2dldEljb25Vcmw6ZnVuY3Rpb24oKXt2YXIgZT1uZXcgVVJMKHRoaXMuY29uZmlnLmljb25Vcmwsd2luZG93LmxvY2F0aW9uKS5ob3N0IT09d2luZG93LmxvY2F0aW9uLmhvc3R8fFYuaXNJRSYmIXdpbmRvdy5zdmc0ZXZlcnlib2R5O3JldHVybnt1cmw6dGhpcy5jb25maWcuaWNvblVybCxjb3JzOmV9fSxmaW5kRWxlbWVudHM6ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIHRoaXMuZWxlbWVudHMuY29udHJvbHM9Xy5jYWxsKHRoaXMsdGhpcy5jb25maWcuc2VsZWN0b3JzLmNvbnRyb2xzLndyYXBwZXIpLHRoaXMuZWxlbWVudHMuYnV0dG9ucz17cGxheTp4LmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5wbGF5KSxwYXVzZTpfLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5wYXVzZSkscmVzdGFydDpfLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5yZXN0YXJ0KSxyZXdpbmQ6Xy5jYWxsKHRoaXMsdGhpcy5jb25maWcuc2VsZWN0b3JzLmJ1dHRvbnMucmV3aW5kKSxmYXN0Rm9yd2FyZDpfLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5mYXN0Rm9yd2FyZCksbXV0ZTpfLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5tdXRlKSxwaXA6Xy5jYWxsKHRoaXMsdGhpcy5jb25maWcuc2VsZWN0b3JzLmJ1dHRvbnMucGlwKSxhaXJwbGF5Ol8uY2FsbCh0aGlzLHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zLmFpcnBsYXkpLHNldHRpbmdzOl8uY2FsbCh0aGlzLHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zLnNldHRpbmdzKSxjYXB0aW9uczpfLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5jYXB0aW9ucyksZnVsbHNjcmVlbjpfLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5mdWxsc2NyZWVuKX0sdGhpcy5lbGVtZW50cy5wcm9ncmVzcz1fLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMucHJvZ3Jlc3MpLHRoaXMuZWxlbWVudHMuaW5wdXRzPXtzZWVrOl8uY2FsbCh0aGlzLHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHMuc2Vlayksdm9sdW1lOl8uY2FsbCh0aGlzLHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHMudm9sdW1lKX0sdGhpcy5lbGVtZW50cy5kaXNwbGF5PXtidWZmZXI6Xy5jYWxsKHRoaXMsdGhpcy5jb25maWcuc2VsZWN0b3JzLmRpc3BsYXkuYnVmZmVyKSxjdXJyZW50VGltZTpfLmNhbGwodGhpcyx0aGlzLmNvbmZpZy5zZWxlY3RvcnMuZGlzcGxheS5jdXJyZW50VGltZSksZHVyYXRpb246Xy5jYWxsKHRoaXMsdGhpcy5jb25maWcuc2VsZWN0b3JzLmRpc3BsYXkuZHVyYXRpb24pfSxsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5wcm9ncmVzcykmJih0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXA9dGhpcy5lbGVtZW50cy5wcm9ncmVzcy5xdWVyeVNlbGVjdG9yKFwiLlwiK3RoaXMuY29uZmlnLmNsYXNzTmFtZXMudG9vbHRpcCkpLCEwfWNhdGNoKGUpe3JldHVybiB0aGlzLmRlYnVnLndhcm4oXCJJdCBsb29rcyBsaWtlIHRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHlvdXIgY3VzdG9tIGNvbnRyb2xzIEhUTUxcIixlKSx0aGlzLnRvZ2dsZU5hdGl2ZUNvbnRyb2xzKCEwKSwhMX19LGNyZWF0ZUljb246ZnVuY3Rpb24oZSx0KXt2YXIgaT1vZS5nZXRJY29uVXJsLmNhbGwodGhpcyksbj0oaS5jb3JzP1wiXCI6aS51cmwpK1wiI1wiK3RoaXMuY29uZmlnLmljb25QcmVmaXgscz1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwic3ZnXCIpO2socyxLKHQse3JvbGU6XCJwcmVzZW50YXRpb25cIixmb2N1c2FibGU6XCJmYWxzZVwifSkpO3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJ1c2VcIiksbz1uK1wiLVwiK2U7cmV0dXJuXCJocmVmXCJpbiBhP2Euc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXCJocmVmXCIsbyk6YS5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixcInhsaW5rOmhyZWZcIixvKSxzLmFwcGVuZENoaWxkKGEpLHN9LGNyZWF0ZUxhYmVsOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxpPXtwaXA6XCJQSVBcIixhaXJwbGF5OlwiQWlyUGxheVwifVtlXXx8WChlLHRoaXMuY29uZmlnKTtyZXR1cm4gdyhcInNwYW5cIixPYmplY3QuYXNzaWduKHt9LHQse2NsYXNzOlt0LmNsYXNzLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuaGlkZGVuXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIil9KSxpKX0sY3JlYXRlQmFkZ2U6ZnVuY3Rpb24oZSl7aWYobC5lbXB0eShlKSlyZXR1cm4gbnVsbDt2YXIgdD13KFwic3BhblwiLHtjbGFzczp0aGlzLmNvbmZpZy5jbGFzc05hbWVzLm1lbnUudmFsdWV9KTtyZXR1cm4gdC5hcHBlbmRDaGlsZCh3KFwic3BhblwiLHtjbGFzczp0aGlzLmNvbmZpZy5jbGFzc05hbWVzLm1lbnUuYmFkZ2V9LGUpKSx0fSxjcmVhdGVCdXR0b246ZnVuY3Rpb24oZSx0KXt2YXIgaT13KFwiYnV0dG9uXCIpLG49T2JqZWN0LmFzc2lnbih7fSx0KSxzPSQoZSksYT0hMSxvPXZvaWQgMCxyPXZvaWQgMCxjPXZvaWQgMCx1PXZvaWQgMDtzd2l0Y2goXCJ0eXBlXCJpbiBufHwobi50eXBlPVwiYnV0dG9uXCIpLFwiY2xhc3NcImluIG4/bi5jbGFzcy5pbmNsdWRlcyh0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmNvbnRyb2wpfHwobi5jbGFzcys9XCIgXCIrdGhpcy5jb25maWcuY2xhc3NOYW1lcy5jb250cm9sKTpuLmNsYXNzPXRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbCxlKXtjYXNlXCJwbGF5XCI6YT0hMCxvPVwicGxheVwiLGM9XCJwYXVzZVwiLHI9XCJwbGF5XCIsdT1cInBhdXNlXCI7YnJlYWs7Y2FzZVwibXV0ZVwiOmE9ITAsbz1cIm11dGVcIixjPVwidW5tdXRlXCIscj1cInZvbHVtZVwiLHU9XCJtdXRlZFwiO2JyZWFrO2Nhc2VcImNhcHRpb25zXCI6YT0hMCxvPVwiZW5hYmxlQ2FwdGlvbnNcIixjPVwiZGlzYWJsZUNhcHRpb25zXCIscj1cImNhcHRpb25zLW9mZlwiLHU9XCJjYXB0aW9ucy1vblwiO2JyZWFrO2Nhc2VcImZ1bGxzY3JlZW5cIjphPSEwLG89XCJlbnRlckZ1bGxzY3JlZW5cIixjPVwiZXhpdEZ1bGxzY3JlZW5cIixyPVwiZW50ZXItZnVsbHNjcmVlblwiLHU9XCJleGl0LWZ1bGxzY3JlZW5cIjticmVhaztjYXNlXCJwbGF5LWxhcmdlXCI6bi5jbGFzcys9XCIgXCIrdGhpcy5jb25maWcuY2xhc3NOYW1lcy5jb250cm9sK1wiLS1vdmVybGFpZFwiLHM9XCJwbGF5XCIsbz1cInBsYXlcIixyPVwicGxheVwiO2JyZWFrO2RlZmF1bHQ6bz1zLHI9ZX1yZXR1cm4gYT8oaS5hcHBlbmRDaGlsZChvZS5jcmVhdGVJY29uLmNhbGwodGhpcyx1LHtjbGFzczpcImljb24tLXByZXNzZWRcIn0pKSxpLmFwcGVuZENoaWxkKG9lLmNyZWF0ZUljb24uY2FsbCh0aGlzLHIse2NsYXNzOlwiaWNvbi0tbm90LXByZXNzZWRcIn0pKSxpLmFwcGVuZENoaWxkKG9lLmNyZWF0ZUxhYmVsLmNhbGwodGhpcyxjLHtjbGFzczpcImxhYmVsLS1wcmVzc2VkXCJ9KSksaS5hcHBlbmRDaGlsZChvZS5jcmVhdGVMYWJlbC5jYWxsKHRoaXMsbyx7Y2xhc3M6XCJsYWJlbC0tbm90LXByZXNzZWRcIn0pKSk6KGkuYXBwZW5kQ2hpbGQob2UuY3JlYXRlSWNvbi5jYWxsKHRoaXMscikpLGkuYXBwZW5kQ2hpbGQob2UuY3JlYXRlTGFiZWwuY2FsbCh0aGlzLG8pKSksSyhuLFAodGhpcy5jb25maWcuc2VsZWN0b3JzLmJ1dHRvbnNbc10sbikpLGsoaSxuKSxcInBsYXlcIj09PXM/KGwuYXJyYXkodGhpcy5lbGVtZW50cy5idXR0b25zW3NdKXx8KHRoaXMuZWxlbWVudHMuYnV0dG9uc1tzXT1bXSksdGhpcy5lbGVtZW50cy5idXR0b25zW3NdLnB1c2goaSkpOnRoaXMuZWxlbWVudHMuYnV0dG9uc1tzXT1pLGl9LGNyZWF0ZVJhbmdlOmZ1bmN0aW9uKGUsdCl7dmFyIGk9dyhcImlucHV0XCIsSyhQKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHNbZV0pLHt0eXBlOlwicmFuZ2VcIixtaW46MCxtYXg6MTAwLHN0ZXA6LjAxLHZhbHVlOjAsYXV0b2NvbXBsZXRlOlwib2ZmXCIscm9sZTpcInNsaWRlclwiLFwiYXJpYS1sYWJlbFwiOlgoZSx0aGlzLmNvbmZpZyksXCJhcmlhLXZhbHVlbWluXCI6MCxcImFyaWEtdmFsdWVtYXhcIjoxMDAsXCJhcmlhLXZhbHVlbm93XCI6MH0sdCkpO3JldHVybiB0aGlzLmVsZW1lbnRzLmlucHV0c1tlXT1pLG9lLnVwZGF0ZVJhbmdlRmlsbC5jYWxsKHRoaXMsaSksaX0sY3JlYXRlUHJvZ3Jlc3M6ZnVuY3Rpb24oZSx0KXt2YXIgaT13KFwicHJvZ3Jlc3NcIixLKFAodGhpcy5jb25maWcuc2VsZWN0b3JzLmRpc3BsYXlbZV0pLHttaW46MCxtYXg6MTAwLHZhbHVlOjAscm9sZTpcInByZXNlbnRhdGlvblwiLFwiYXJpYS1oaWRkZW5cIjohMH0sdCkpO2lmKFwidm9sdW1lXCIhPT1lKXtpLmFwcGVuZENoaWxkKHcoXCJzcGFuXCIsbnVsbCxcIjBcIikpO3ZhciBuPXtwbGF5ZWQ6XCJwbGF5ZWRcIixidWZmZXI6XCJidWZmZXJlZFwifVtlXSxzPW4/WChuLHRoaXMuY29uZmlnKTpcIlwiO2kuaW5uZXJUZXh0PVwiJSBcIitzLnRvTG93ZXJDYXNlKCl9cmV0dXJuIHRoaXMuZWxlbWVudHMuZGlzcGxheVtlXT1pLGl9LGNyZWF0ZVRpbWU6ZnVuY3Rpb24oZSl7dmFyIHQ9UCh0aGlzLmNvbmZpZy5zZWxlY3RvcnMuZGlzcGxheVtlXSksaT13KFwiZGl2XCIsSyh0LHtjbGFzczoodGhpcy5jb25maWcuY2xhc3NOYW1lcy5kaXNwbGF5LnRpbWUrXCIgXCIrKHQuY2xhc3M/dC5jbGFzczpcIlwiKSkudHJpbSgpLFwiYXJpYS1sYWJlbFwiOlgoZSx0aGlzLmNvbmZpZyl9KSxcIjAwOjAwXCIpO3JldHVybiB0aGlzLmVsZW1lbnRzLmRpc3BsYXlbZV09aSxpfSxiaW5kTWVudUl0ZW1TaG9ydGN1dHM6ZnVuY3Rpb24oZSx0KXt2YXIgaT10aGlzO2QoZSxcImtleWRvd24ga2V5dXBcIixmdW5jdGlvbihuKXtpZihbMzIsMzgsMzksNDBdLmluY2x1ZGVzKG4ud2hpY2gpJiYobi5wcmV2ZW50RGVmYXVsdCgpLG4uc3RvcFByb3BhZ2F0aW9uKCksXCJrZXlkb3duXCIhPT1uLnR5cGUpKXt2YXIgcz1MKGUsJ1tyb2xlPVwibWVudWl0ZW1yYWRpb1wiXScpO2lmKCFzJiZbMzIsMzldLmluY2x1ZGVzKG4ud2hpY2gpKW9lLnNob3dNZW51UGFuZWwuY2FsbChpLHQsITApO2Vsc2V7dmFyIGE9dm9pZCAwOzMyIT09bi53aGljaCYmKDQwPT09bi53aGljaHx8cyYmMzk9PT1uLndoaWNoPyhhPWUubmV4dEVsZW1lbnRTaWJsaW5nLGwuZWxlbWVudChhKXx8KGE9ZS5wYXJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSk6KGE9ZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLGwuZWxlbWVudChhKXx8KGE9ZS5wYXJlbnROb2RlLmxhc3RFbGVtZW50Q2hpbGQpKSxJLmNhbGwoaSxhLCEwKSl9fX0sITEpLGQoZSxcImtleXVwXCIsZnVuY3Rpb24oZSl7MTM9PT1lLndoaWNoJiZvZS5mb2N1c0ZpcnN0TWVudUl0ZW0uY2FsbChpLG51bGwsITApfSl9LGNyZWF0ZU1lbnVJdGVtOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsaT1lLnZhbHVlLG49ZS5saXN0LHM9ZS50eXBlLGE9ZS50aXRsZSxvPWUuYmFkZ2Uscj12b2lkIDA9PT1vP251bGw6byxjPWUuY2hlY2tlZCx1PXZvaWQgMCE9PWMmJmMsZD1QKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHNbc10pLGg9dyhcImJ1dHRvblwiLEsoZCx7dHlwZTpcImJ1dHRvblwiLHJvbGU6XCJtZW51aXRlbXJhZGlvXCIsY2xhc3M6KHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbCtcIiBcIisoZC5jbGFzcz9kLmNsYXNzOlwiXCIpKS50cmltKCksXCJhcmlhLWNoZWNrZWRcIjp1LHZhbHVlOml9KSkscD13KFwic3BhblwiKTtwLmlubmVySFRNTD1hLGwuZWxlbWVudChyKSYmcC5hcHBlbmRDaGlsZChyKSxoLmFwcGVuZENoaWxkKHApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShoLFwiY2hlY2tlZFwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVyblwidHJ1ZVwiPT09aC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWNoZWNrZWRcIil9LHNldDpmdW5jdGlvbihlKXtlJiZBcnJheS5mcm9tKGgucGFyZW50Tm9kZS5jaGlsZHJlbikuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBMKGUsJ1tyb2xlPVwibWVudWl0ZW1yYWRpb1wiXScpfSkuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNoZWNrZWRcIixcImZhbHNlXCIpfSksaC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNoZWNrZWRcIixlP1widHJ1ZVwiOlwiZmFsc2VcIil9fSksdGhpcy5saXN0ZW5lcnMuYmluZChoLFwiY2xpY2sga2V5dXBcIixmdW5jdGlvbihlKXtpZighbC5rZXlib2FyZEV2ZW50KGUpfHwzMj09PWUud2hpY2gpe3N3aXRjaChlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSxoLmNoZWNrZWQ9ITAscyl7Y2FzZVwibGFuZ3VhZ2VcIjp0LmN1cnJlbnRUcmFjaz1OdW1iZXIoaSk7YnJlYWs7Y2FzZVwicXVhbGl0eVwiOnQucXVhbGl0eT1pO2JyZWFrO2Nhc2VcInNwZWVkXCI6dC5zcGVlZD1wYXJzZUZsb2F0KGkpfW9lLnNob3dNZW51UGFuZWwuY2FsbCh0LFwiaG9tZVwiLGwua2V5Ym9hcmRFdmVudChlKSl9fSxzLCExKSxvZS5iaW5kTWVudUl0ZW1TaG9ydGN1dHMuY2FsbCh0aGlzLGgscyksbi5hcHBlbmRDaGlsZChoKX0sZm9ybWF0VGltZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gbC5udW1iZXIoZSk/YWUoZSxpZSh0aGlzLmR1cmF0aW9uKT4wLHQpOmV9LHVwZGF0ZVRpbWVEaXNwbGF5OmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOm51bGwsdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06MCxpPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07bC5lbGVtZW50KGUpJiZsLm51bWJlcih0KSYmKGUuaW5uZXJUZXh0PW9lLmZvcm1hdFRpbWUodCxpKSl9LHVwZGF0ZVZvbHVtZTpmdW5jdGlvbigpe3RoaXMuc3VwcG9ydGVkLnVpJiYobC5lbGVtZW50KHRoaXMuZWxlbWVudHMuaW5wdXRzLnZvbHVtZSkmJm9lLnNldFJhbmdlLmNhbGwodGhpcyx0aGlzLmVsZW1lbnRzLmlucHV0cy52b2x1bWUsdGhpcy5tdXRlZD8wOnRoaXMudm9sdW1lKSxsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5idXR0b25zLm11dGUpJiYodGhpcy5lbGVtZW50cy5idXR0b25zLm11dGUucHJlc3NlZD10aGlzLm11dGVkfHwwPT09dGhpcy52b2x1bWUpKX0sc2V0UmFuZ2U6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjA7bC5lbGVtZW50KGUpJiYoZS52YWx1ZT10LG9lLnVwZGF0ZVJhbmdlRmlsbC5jYWxsKHRoaXMsZSkpfSx1cGRhdGVQcm9ncmVzczpmdW5jdGlvbihlKXt2YXIgdD10aGlzO2lmKHRoaXMuc3VwcG9ydGVkLnVpJiZsLmV2ZW50KGUpKXt2YXIgaSxuLHM9MDtpZihlKXN3aXRjaChlLnR5cGUpe2Nhc2VcInRpbWV1cGRhdGVcIjpjYXNlXCJzZWVraW5nXCI6Y2FzZVwic2Vla2VkXCI6aT10aGlzLmN1cnJlbnRUaW1lLG49dGhpcy5kdXJhdGlvbixzPTA9PT1pfHwwPT09bnx8TnVtYmVyLmlzTmFOKGkpfHxOdW1iZXIuaXNOYU4obik/MDooaS9uKjEwMCkudG9GaXhlZCgyKSxcInRpbWV1cGRhdGVcIj09PWUudHlwZSYmb2Uuc2V0UmFuZ2UuY2FsbCh0aGlzLHRoaXMuZWxlbWVudHMuaW5wdXRzLnNlZWsscyk7YnJlYWs7Y2FzZVwicGxheWluZ1wiOmNhc2VcInByb2dyZXNzXCI6IWZ1bmN0aW9uKGUsaSl7dmFyIG49bC5udW1iZXIoaSk/aTowLHM9bC5lbGVtZW50KGUpP2U6dC5lbGVtZW50cy5kaXNwbGF5LmJ1ZmZlcjtpZihsLmVsZW1lbnQocykpe3MudmFsdWU9bjt2YXIgYT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3BhblwiKVswXTtsLmVsZW1lbnQoYSkmJihhLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlPW4pfX0odGhpcy5lbGVtZW50cy5kaXNwbGF5LmJ1ZmZlciwxMDAqdGhpcy5idWZmZXJlZCl9fX0sdXBkYXRlUmFuZ2VGaWxsOmZ1bmN0aW9uKGUpe3ZhciB0PWwuZXZlbnQoZSk/ZS50YXJnZXQ6ZTtpZihsLmVsZW1lbnQodCkmJlwicmFuZ2VcIj09PXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSl7aWYoTCh0LHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHMuc2Vlaykpe3Quc2V0QXR0cmlidXRlKFwiYXJpYS12YWx1ZW5vd1wiLHRoaXMuY3VycmVudFRpbWUpO3ZhciBpPW9lLmZvcm1hdFRpbWUodGhpcy5jdXJyZW50VGltZSksbj1vZS5mb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pLHM9WChcInNlZWtMYWJlbFwiLHRoaXMuY29uZmlnKTt0LnNldEF0dHJpYnV0ZShcImFyaWEtdmFsdWV0ZXh0XCIscy5yZXBsYWNlKFwie2N1cnJlbnRUaW1lfVwiLGkpLnJlcGxhY2UoXCJ7ZHVyYXRpb259XCIsbikpfWVsc2UgaWYoTCh0LHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHMudm9sdW1lKSl7dmFyIGE9MTAwKnQudmFsdWU7dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLXZhbHVlbm93XCIsYSksdC5zZXRBdHRyaWJ1dGUoXCJhcmlhLXZhbHVldGV4dFwiLGEudG9GaXhlZCgxKStcIiVcIil9ZWxzZSB0LnNldEF0dHJpYnV0ZShcImFyaWEtdmFsdWVub3dcIix0LnZhbHVlKTtWLmlzV2Via2l0JiZ0LnN0eWxlLnNldFByb3BlcnR5KFwiLS12YWx1ZVwiLHQudmFsdWUvdC5tYXgqMTAwK1wiJVwiKX19LHVwZGF0ZVNlZWtUb29sdGlwOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYodGhpcy5jb25maWcudG9vbHRpcHMuc2VlayYmbC5lbGVtZW50KHRoaXMuZWxlbWVudHMuaW5wdXRzLnNlZWspJiZsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5kaXNwbGF5LnNlZWtUb29sdGlwKSYmMCE9PXRoaXMuZHVyYXRpb24pe3ZhciBpPTAsbj10aGlzLmVsZW1lbnRzLnByb2dyZXNzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHM9dGhpcy5jb25maWcuY2xhc3NOYW1lcy50b29sdGlwK1wiLS12aXNpYmxlXCIsYT1mdW5jdGlvbihlKXtNKHQuZWxlbWVudHMuZGlzcGxheS5zZWVrVG9vbHRpcCxzLGUpfTtpZih0aGlzLnRvdWNoKWEoITEpO2Vsc2V7aWYobC5ldmVudChlKSlpPTEwMC9uLndpZHRoKihlLnBhZ2VYLW4ubGVmdCk7ZWxzZXtpZighTih0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXAscykpcmV0dXJuO2k9cGFyc2VGbG9hdCh0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXAuc3R5bGUubGVmdCwxMCl9aTwwP2k9MDppPjEwMCYmKGk9MTAwKSxvZS51cGRhdGVUaW1lRGlzcGxheS5jYWxsKHRoaXMsdGhpcy5lbGVtZW50cy5kaXNwbGF5LnNlZWtUb29sdGlwLHRoaXMuZHVyYXRpb24vMTAwKmkpLHRoaXMuZWxlbWVudHMuZGlzcGxheS5zZWVrVG9vbHRpcC5zdHlsZS5sZWZ0PWkrXCIlXCIsbC5ldmVudChlKSYmW1wibW91c2VlbnRlclwiLFwibW91c2VsZWF2ZVwiXS5pbmNsdWRlcyhlLnR5cGUpJiZhKFwibW91c2VlbnRlclwiPT09ZS50eXBlKX19fSx0aW1lVXBkYXRlOmZ1bmN0aW9uKGUpe3ZhciB0PSFsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5kaXNwbGF5LmR1cmF0aW9uKSYmdGhpcy5jb25maWcuaW52ZXJ0VGltZTtvZS51cGRhdGVUaW1lRGlzcGxheS5jYWxsKHRoaXMsdGhpcy5lbGVtZW50cy5kaXNwbGF5LmN1cnJlbnRUaW1lLHQ/dGhpcy5kdXJhdGlvbi10aGlzLmN1cnJlbnRUaW1lOnRoaXMuY3VycmVudFRpbWUsdCksZSYmXCJ0aW1ldXBkYXRlXCI9PT1lLnR5cGUmJnRoaXMubWVkaWEuc2Vla2luZ3x8b2UudXBkYXRlUHJvZ3Jlc3MuY2FsbCh0aGlzLGUpfSxkdXJhdGlvblVwZGF0ZTpmdW5jdGlvbigpe2lmKHRoaXMuc3VwcG9ydGVkLnVpJiYodGhpcy5jb25maWcuaW52ZXJ0VGltZXx8IXRoaXMuY3VycmVudFRpbWUpKXtpZih0aGlzLmR1cmF0aW9uPj1NYXRoLnBvdygyLDMyKSlyZXR1cm4gUyh0aGlzLmVsZW1lbnRzLmRpc3BsYXkuY3VycmVudFRpbWUsITApLHZvaWQgUyh0aGlzLmVsZW1lbnRzLnByb2dyZXNzLCEwKTtsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5pbnB1dHMuc2VlaykmJnRoaXMuZWxlbWVudHMuaW5wdXRzLnNlZWsuc2V0QXR0cmlidXRlKFwiYXJpYS12YWx1ZW1heFwiLHRoaXMuZHVyYXRpb24pO3ZhciBlPWwuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmRpc3BsYXkuZHVyYXRpb24pOyFlJiZ0aGlzLmNvbmZpZy5kaXNwbGF5RHVyYXRpb24mJnRoaXMucGF1c2VkJiZvZS51cGRhdGVUaW1lRGlzcGxheS5jYWxsKHRoaXMsdGhpcy5lbGVtZW50cy5kaXNwbGF5LmN1cnJlbnRUaW1lLHRoaXMuZHVyYXRpb24pLGUmJm9lLnVwZGF0ZVRpbWVEaXNwbGF5LmNhbGwodGhpcyx0aGlzLmVsZW1lbnRzLmRpc3BsYXkuZHVyYXRpb24sdGhpcy5kdXJhdGlvbiksb2UudXBkYXRlU2Vla1Rvb2x0aXAuY2FsbCh0aGlzKX19LHRvZ2dsZU1lbnVCdXR0b246ZnVuY3Rpb24oZSx0KXtTKHRoaXMuZWxlbWVudHMuc2V0dGluZ3MuYnV0dG9uc1tlXSwhdCl9LHVwZGF0ZVNldHRpbmc6ZnVuY3Rpb24oZSx0LGkpe3ZhciBuPXRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZWxzW2VdLHM9bnVsbCxhPXQ7aWYoXCJjYXB0aW9uc1wiPT09ZSlzPXRoaXMuY3VycmVudFRyYWNrO2Vsc2V7aWYocz1sLmVtcHR5KGkpP3RoaXNbZV06aSxsLmVtcHR5KHMpJiYocz10aGlzLmNvbmZpZ1tlXS5kZWZhdWx0KSwhbC5lbXB0eSh0aGlzLm9wdGlvbnNbZV0pJiYhdGhpcy5vcHRpb25zW2VdLmluY2x1ZGVzKHMpKXJldHVybiB2b2lkIHRoaXMuZGVidWcud2FybihcIlVuc3VwcG9ydGVkIHZhbHVlIG9mICdcIitzK1wiJyBmb3IgXCIrZSk7aWYoIXRoaXMuY29uZmlnW2VdLm9wdGlvbnMuaW5jbHVkZXMocykpcmV0dXJuIHZvaWQgdGhpcy5kZWJ1Zy53YXJuKFwiRGlzYWJsZWQgdmFsdWUgb2YgJ1wiK3MrXCInIGZvciBcIitlKX1pZihsLmVsZW1lbnQoYSl8fChhPW4mJm4ucXVlcnlTZWxlY3RvcignW3JvbGU9XCJtZW51XCJdJykpLGwuZWxlbWVudChhKSl7dGhpcy5lbGVtZW50cy5zZXR0aW5ncy5idXR0b25zW2VdLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdGhpcy5jb25maWcuY2xhc3NOYW1lcy5tZW51LnZhbHVlKS5pbm5lckhUTUw9b2UuZ2V0TGFiZWwuY2FsbCh0aGlzLGUscyk7dmFyIG89YSYmYS5xdWVyeVNlbGVjdG9yKCdbdmFsdWU9XCInK3MrJ1wiXScpO2wuZWxlbWVudChvKSYmKG8uY2hlY2tlZD0hMCl9fSxnZXRMYWJlbDpmdW5jdGlvbihlLHQpe3N3aXRjaChlKXtjYXNlXCJzcGVlZFwiOnJldHVybiAxPT09dD9YKFwibm9ybWFsXCIsdGhpcy5jb25maWcpOnQrXCImdGltZXM7XCI7Y2FzZVwicXVhbGl0eVwiOmlmKGwubnVtYmVyKHQpKXt2YXIgaT1YKFwicXVhbGl0eUxhYmVsLlwiK3QsdGhpcy5jb25maWcpO3JldHVybiBpLmxlbmd0aD9pOnQrXCJwXCJ9cmV0dXJuIFEodCk7Y2FzZVwiY2FwdGlvbnNcIjpyZXR1cm4gY2UuZ2V0TGFiZWwuY2FsbCh0aGlzKTtkZWZhdWx0OnJldHVybiBudWxsfX0sc2V0UXVhbGl0eU1lbnU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztpZihsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wYW5lbHMucXVhbGl0eSkpe3ZhciBpPXRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZWxzLnF1YWxpdHkucXVlcnlTZWxlY3RvcignW3JvbGU9XCJtZW51XCJdJyk7bC5hcnJheShlKSYmKHRoaXMub3B0aW9ucy5xdWFsaXR5PXooZSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiB0LmNvbmZpZy5xdWFsaXR5Lm9wdGlvbnMuaW5jbHVkZXMoZSl9KSk7dmFyIG49IWwuZW1wdHkodGhpcy5vcHRpb25zLnF1YWxpdHkpJiZ0aGlzLm9wdGlvbnMucXVhbGl0eS5sZW5ndGg+MTtpZihvZS50b2dnbGVNZW51QnV0dG9uLmNhbGwodGhpcyxcInF1YWxpdHlcIixuKSxFKGkpLG9lLmNoZWNrTWVudS5jYWxsKHRoaXMpLG4pe3RoaXMub3B0aW9ucy5xdWFsaXR5LnNvcnQoZnVuY3Rpb24oZSxpKXt2YXIgbj10LmNvbmZpZy5xdWFsaXR5Lm9wdGlvbnM7cmV0dXJuIG4uaW5kZXhPZihlKT5uLmluZGV4T2YoaSk/MTotMX0pLmZvckVhY2goZnVuY3Rpb24oZSl7b2UuY3JlYXRlTWVudUl0ZW0uY2FsbCh0LHt2YWx1ZTplLGxpc3Q6aSx0eXBlOlwicXVhbGl0eVwiLHRpdGxlOm9lLmdldExhYmVsLmNhbGwodCxcInF1YWxpdHlcIixlKSxiYWRnZTpmdW5jdGlvbihlKXt2YXIgaT1YKFwicXVhbGl0eUJhZGdlLlwiK2UsdC5jb25maWcpO3JldHVybiBpLmxlbmd0aD9vZS5jcmVhdGVCYWRnZS5jYWxsKHQsaSk6bnVsbH0oZSl9KX0pLG9lLnVwZGF0ZVNldHRpbmcuY2FsbCh0aGlzLFwicXVhbGl0eVwiLGkpfX19LHNldENhcHRpb25zTWVudTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYobC5lbGVtZW50KHRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZWxzLmNhcHRpb25zKSl7dmFyIHQ9dGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wYW5lbHMuY2FwdGlvbnMucXVlcnlTZWxlY3RvcignW3JvbGU9XCJtZW51XCJdJyksaT1jZS5nZXRUcmFja3MuY2FsbCh0aGlzKSxuPUJvb2xlYW4oaS5sZW5ndGgpO2lmKG9lLnRvZ2dsZU1lbnVCdXR0b24uY2FsbCh0aGlzLFwiY2FwdGlvbnNcIixuKSxFKHQpLG9lLmNoZWNrTWVudS5jYWxsKHRoaXMpLG4pe3ZhciBzPWkubWFwKGZ1bmN0aW9uKGksbil7cmV0dXJue3ZhbHVlOm4sY2hlY2tlZDplLmNhcHRpb25zLnRvZ2dsZWQmJmUuY3VycmVudFRyYWNrPT09bix0aXRsZTpjZS5nZXRMYWJlbC5jYWxsKGUsaSksYmFkZ2U6aS5sYW5ndWFnZSYmb2UuY3JlYXRlQmFkZ2UuY2FsbChlLGkubGFuZ3VhZ2UudG9VcHBlckNhc2UoKSksbGlzdDp0LHR5cGU6XCJsYW5ndWFnZVwifX0pO3MudW5zaGlmdCh7dmFsdWU6LTEsY2hlY2tlZDohdGhpcy5jYXB0aW9ucy50b2dnbGVkLHRpdGxlOlgoXCJkaXNhYmxlZFwiLHRoaXMuY29uZmlnKSxsaXN0OnQsdHlwZTpcImxhbmd1YWdlXCJ9KSxzLmZvckVhY2gob2UuY3JlYXRlTWVudUl0ZW0uYmluZCh0aGlzKSksb2UudXBkYXRlU2V0dGluZy5jYWxsKHRoaXMsXCJjYXB0aW9uc1wiLHQpfX19LHNldFNwZWVkTWVudTpmdW5jdGlvbihlKXt2YXIgdD10aGlzO2lmKGwuZWxlbWVudCh0aGlzLmVsZW1lbnRzLnNldHRpbmdzLnBhbmVscy5zcGVlZCkpe3ZhciBpPXRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZWxzLnNwZWVkLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwibWVudVwiXScpO2wuYXJyYXkoZSk/dGhpcy5vcHRpb25zLnNwZWVkPWU6KHRoaXMuaXNIVE1MNXx8dGhpcy5pc1ZpbWVvKSYmKHRoaXMub3B0aW9ucy5zcGVlZD1bLjUsLjc1LDEsMS4yNSwxLjUsMS43NSwyXSksdGhpcy5vcHRpb25zLnNwZWVkPXRoaXMub3B0aW9ucy5zcGVlZC5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIHQuY29uZmlnLnNwZWVkLm9wdGlvbnMuaW5jbHVkZXMoZSl9KTt2YXIgbj0hbC5lbXB0eSh0aGlzLm9wdGlvbnMuc3BlZWQpJiZ0aGlzLm9wdGlvbnMuc3BlZWQubGVuZ3RoPjE7b2UudG9nZ2xlTWVudUJ1dHRvbi5jYWxsKHRoaXMsXCJzcGVlZFwiLG4pLEUoaSksb2UuY2hlY2tNZW51LmNhbGwodGhpcyksbiYmKHRoaXMub3B0aW9ucy5zcGVlZC5mb3JFYWNoKGZ1bmN0aW9uKGUpe29lLmNyZWF0ZU1lbnVJdGVtLmNhbGwodCx7dmFsdWU6ZSxsaXN0OmksdHlwZTpcInNwZWVkXCIsdGl0bGU6b2UuZ2V0TGFiZWwuY2FsbCh0LFwic3BlZWRcIixlKX0pfSksb2UudXBkYXRlU2V0dGluZy5jYWxsKHRoaXMsXCJzcGVlZFwiLGkpKX19LGNoZWNrTWVudTpmdW5jdGlvbigpe3ZhciBlPXRoaXMuZWxlbWVudHMuc2V0dGluZ3MuYnV0dG9ucyx0PSFsLmVtcHR5KGUpJiZPYmplY3QudmFsdWVzKGUpLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIWUuaGlkZGVufSk7Uyh0aGlzLmVsZW1lbnRzLnNldHRpbmdzLm1lbnUsIXQpfSxmb2N1c0ZpcnN0TWVudUl0ZW06ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtpZighdGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wb3B1cC5oaWRkZW4pe3ZhciBpPWU7bC5lbGVtZW50KGkpfHwoaT1PYmplY3QudmFsdWVzKHRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZWxzKS5maW5kKGZ1bmN0aW9uKGUpe3JldHVybiFlLmhpZGRlbn0pKTt2YXIgbj1pLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlXj1cIm1lbnVpdGVtXCJdJyk7SS5jYWxsKHRoaXMsbix0KX19LHRvZ2dsZU1lbnU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wb3B1cCxpPXRoaXMuZWxlbWVudHMuYnV0dG9ucy5zZXR0aW5ncztpZihsLmVsZW1lbnQodCkmJmwuZWxlbWVudChpKSl7dmFyIG49dC5oaWRkZW4scz1uO2lmKGwuYm9vbGVhbihlKSlzPWU7ZWxzZSBpZihsLmtleWJvYXJkRXZlbnQoZSkmJjI3PT09ZS53aGljaClzPSExO2Vsc2UgaWYobC5ldmVudChlKSl7dmFyIGE9dC5jb250YWlucyhlLnRhcmdldCk7aWYoYXx8IWEmJmUudGFyZ2V0IT09aSYmcylyZXR1cm59aS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIscyksUyh0LCFzKSxNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMubWVudS5vcGVuLHMpLHMmJmwua2V5Ym9hcmRFdmVudChlKT9vZS5mb2N1c0ZpcnN0TWVudUl0ZW0uY2FsbCh0aGlzLG51bGwsITApOnN8fG58fEkuY2FsbCh0aGlzLGksbC5rZXlib2FyZEV2ZW50KGUpKX19LGdldE1lbnVTaXplOmZ1bmN0aW9uKGUpe3ZhciB0PWUuY2xvbmVOb2RlKCEwKTt0LnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIix0LnN0eWxlLm9wYWNpdHk9MCx0LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKSxlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodCk7dmFyIGk9dC5zY3JvbGxXaWR0aCxuPXQuc2Nyb2xsSGVpZ2h0O3JldHVybiBBKHQpLHt3aWR0aDppLGhlaWdodDpufX0sc2hvd01lbnVQYW5lbDpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJcIixpPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBseXItc2V0dGluZ3MtXCIrdGhpcy5pZCtcIi1cIit0KTtpZihsLmVsZW1lbnQobikpe3ZhciBzPW4ucGFyZW50Tm9kZSxhPUFycmF5LmZyb20ocy5jaGlsZHJlbikuZmluZChmdW5jdGlvbihlKXtyZXR1cm4hZS5oaWRkZW59KTtpZihGLnRyYW5zaXRpb25zJiYhRi5yZWR1Y2VkTW90aW9uKXtzLnN0eWxlLndpZHRoPWEuc2Nyb2xsV2lkdGgrXCJweFwiLHMuc3R5bGUuaGVpZ2h0PWEuc2Nyb2xsSGVpZ2h0K1wicHhcIjt2YXIgbz1vZS5nZXRNZW51U2l6ZS5jYWxsKHRoaXMsbik7ZC5jYWxsKHRoaXMscyxSLGZ1bmN0aW9uIHQoaSl7aS50YXJnZXQ9PT1zJiZbXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdLmluY2x1ZGVzKGkucHJvcGVydHlOYW1lKSYmKHMuc3R5bGUud2lkdGg9XCJcIixzLnN0eWxlLmhlaWdodD1cIlwiLGguY2FsbChlLHMsUix0KSl9KSxzLnN0eWxlLndpZHRoPW8ud2lkdGgrXCJweFwiLHMuc3R5bGUuaGVpZ2h0PW8uaGVpZ2h0K1wicHhcIn1TKGEsITApLFMobiwhMSksb2UuZm9jdXNGaXJzdE1lbnVJdGVtLmNhbGwodGhpcyxuLGkpfX0sY3JlYXRlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsaT13KFwiZGl2XCIsUCh0aGlzLmNvbmZpZy5zZWxlY3RvcnMuY29udHJvbHMud3JhcHBlcikpO2lmKHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKFwicmVzdGFydFwiKSYmaS5hcHBlbmRDaGlsZChvZS5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLFwicmVzdGFydFwiKSksdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJyZXdpbmRcIikmJmkuYXBwZW5kQ2hpbGQob2UuY3JlYXRlQnV0dG9uLmNhbGwodGhpcyxcInJld2luZFwiKSksdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJwbGF5XCIpJiZpLmFwcGVuZENoaWxkKG9lLmNyZWF0ZUJ1dHRvbi5jYWxsKHRoaXMsXCJwbGF5XCIpKSx0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcyhcImZhc3QtZm9yd2FyZFwiKSYmaS5hcHBlbmRDaGlsZChvZS5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLFwiZmFzdC1mb3J3YXJkXCIpKSx0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcyhcInByb2dyZXNzXCIpKXt2YXIgbj13KFwiZGl2XCIsUCh0aGlzLmNvbmZpZy5zZWxlY3RvcnMucHJvZ3Jlc3MpKTtpZihuLmFwcGVuZENoaWxkKG9lLmNyZWF0ZVJhbmdlLmNhbGwodGhpcyxcInNlZWtcIix7aWQ6XCJwbHlyLXNlZWstXCIrZS5pZH0pKSxuLmFwcGVuZENoaWxkKG9lLmNyZWF0ZVByb2dyZXNzLmNhbGwodGhpcyxcImJ1ZmZlclwiKSksdGhpcy5jb25maWcudG9vbHRpcHMuc2Vlayl7dmFyIHM9dyhcInNwYW5cIix7Y2xhc3M6dGhpcy5jb25maWcuY2xhc3NOYW1lcy50b29sdGlwfSxcIjAwOjAwXCIpO24uYXBwZW5kQ2hpbGQocyksdGhpcy5lbGVtZW50cy5kaXNwbGF5LnNlZWtUb29sdGlwPXN9dGhpcy5lbGVtZW50cy5wcm9ncmVzcz1uLGkuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50cy5wcm9ncmVzcyl9aWYodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJjdXJyZW50LXRpbWVcIikmJmkuYXBwZW5kQ2hpbGQob2UuY3JlYXRlVGltZS5jYWxsKHRoaXMsXCJjdXJyZW50VGltZVwiKSksdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJkdXJhdGlvblwiKSYmaS5hcHBlbmRDaGlsZChvZS5jcmVhdGVUaW1lLmNhbGwodGhpcyxcImR1cmF0aW9uXCIpKSx0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcyhcIm11dGVcIil8fHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKFwidm9sdW1lXCIpKXt2YXIgYT13KFwiZGl2XCIse2NsYXNzOlwicGx5cl9fdm9sdW1lXCJ9KTtpZih0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcyhcIm11dGVcIikmJmEuYXBwZW5kQ2hpbGQob2UuY3JlYXRlQnV0dG9uLmNhbGwodGhpcyxcIm11dGVcIikpLHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKFwidm9sdW1lXCIpKXt2YXIgbz17bWF4OjEsc3RlcDouMDUsdmFsdWU6dGhpcy5jb25maWcudm9sdW1lfTthLmFwcGVuZENoaWxkKG9lLmNyZWF0ZVJhbmdlLmNhbGwodGhpcyxcInZvbHVtZVwiLEsobyx7aWQ6XCJwbHlyLXZvbHVtZS1cIitlLmlkfSkpKSx0aGlzLmVsZW1lbnRzLnZvbHVtZT1hfWkuYXBwZW5kQ2hpbGQoYSl9aWYodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJjYXB0aW9uc1wiKSYmaS5hcHBlbmRDaGlsZChvZS5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLFwiY2FwdGlvbnNcIikpLHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKFwic2V0dGluZ3NcIikmJiFsLmVtcHR5KHRoaXMuY29uZmlnLnNldHRpbmdzKSl7dmFyIHI9dyhcImRpdlwiLHtjbGFzczpcInBseXJfX21lbnVcIixoaWRkZW46XCJcIn0pO3IuYXBwZW5kQ2hpbGQob2UuY3JlYXRlQnV0dG9uLmNhbGwodGhpcyxcInNldHRpbmdzXCIse1wiYXJpYS1oYXNwb3B1cFwiOiEwLFwiYXJpYS1jb250cm9sc1wiOlwicGx5ci1zZXR0aW5ncy1cIitlLmlkLFwiYXJpYS1leHBhbmRlZFwiOiExfSkpO3ZhciBjPXcoXCJkaXZcIix7Y2xhc3M6XCJwbHlyX19tZW51X19jb250YWluZXJcIixpZDpcInBseXItc2V0dGluZ3MtXCIrZS5pZCxoaWRkZW46XCJcIn0pLHU9dyhcImRpdlwiKSxoPXcoXCJkaXZcIix7aWQ6XCJwbHlyLXNldHRpbmdzLVwiK2UuaWQrXCItaG9tZVwifSkscD13KFwiZGl2XCIse3JvbGU6XCJtZW51XCJ9KTtoLmFwcGVuZENoaWxkKHApLHUuYXBwZW5kQ2hpbGQoaCksdGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wYW5lbHMuaG9tZT1oLHRoaXMuY29uZmlnLnNldHRpbmdzLmZvckVhY2goZnVuY3Rpb24oaSl7dmFyIG49dyhcImJ1dHRvblwiLEsoUCh0LmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5zZXR0aW5ncykse3R5cGU6XCJidXR0b25cIixjbGFzczp0LmNvbmZpZy5jbGFzc05hbWVzLmNvbnRyb2wrXCIgXCIrdC5jb25maWcuY2xhc3NOYW1lcy5jb250cm9sK1wiLS1mb3J3YXJkXCIscm9sZTpcIm1lbnVpdGVtXCIsXCJhcmlhLWhhc3BvcHVwXCI6ITAsaGlkZGVuOlwiXCJ9KSk7b2UuYmluZE1lbnVJdGVtU2hvcnRjdXRzLmNhbGwodCxuLGkpLGQobixcImNsaWNrXCIsZnVuY3Rpb24oKXtvZS5zaG93TWVudVBhbmVsLmNhbGwodCxpLCExKX0pO3ZhciBzPXcoXCJzcGFuXCIsbnVsbCxYKGksdC5jb25maWcpKSxhPXcoXCJzcGFuXCIse2NsYXNzOnQuY29uZmlnLmNsYXNzTmFtZXMubWVudS52YWx1ZX0pO2EuaW5uZXJIVE1MPWVbaV0scy5hcHBlbmRDaGlsZChhKSxuLmFwcGVuZENoaWxkKHMpLHAuYXBwZW5kQ2hpbGQobik7dmFyIG89dyhcImRpdlwiLHtpZDpcInBseXItc2V0dGluZ3MtXCIrZS5pZCtcIi1cIitpLGhpZGRlbjpcIlwifSkscj13KFwiYnV0dG9uXCIse3R5cGU6XCJidXR0b25cIixjbGFzczp0LmNvbmZpZy5jbGFzc05hbWVzLmNvbnRyb2wrXCIgXCIrdC5jb25maWcuY2xhc3NOYW1lcy5jb250cm9sK1wiLS1iYWNrXCJ9KTtyLmFwcGVuZENoaWxkKHcoXCJzcGFuXCIse1wiYXJpYS1oaWRkZW5cIjohMH0sWChpLHQuY29uZmlnKSkpLHIuYXBwZW5kQ2hpbGQodyhcInNwYW5cIix7Y2xhc3M6dC5jb25maWcuY2xhc3NOYW1lcy5oaWRkZW59LFgoXCJtZW51QmFja1wiLHQuY29uZmlnKSkpLGQobyxcImtleWRvd25cIixmdW5jdGlvbihlKXszNz09PWUud2hpY2gmJihlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSxvZS5zaG93TWVudVBhbmVsLmNhbGwodCxcImhvbWVcIiwhMCkpfSwhMSksZChyLFwiY2xpY2tcIixmdW5jdGlvbigpe29lLnNob3dNZW51UGFuZWwuY2FsbCh0LFwiaG9tZVwiLCExKX0pLG8uYXBwZW5kQ2hpbGQociksby5hcHBlbmRDaGlsZCh3KFwiZGl2XCIse3JvbGU6XCJtZW51XCJ9KSksdS5hcHBlbmRDaGlsZChvKSx0LmVsZW1lbnRzLnNldHRpbmdzLmJ1dHRvbnNbaV09bix0LmVsZW1lbnRzLnNldHRpbmdzLnBhbmVsc1tpXT1vfSksYy5hcHBlbmRDaGlsZCh1KSxyLmFwcGVuZENoaWxkKGMpLGkuYXBwZW5kQ2hpbGQociksdGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wb3B1cD1jLHRoaXMuZWxlbWVudHMuc2V0dGluZ3MubWVudT1yfXJldHVybiB0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcyhcInBpcFwiKSYmRi5waXAmJmkuYXBwZW5kQ2hpbGQob2UuY3JlYXRlQnV0dG9uLmNhbGwodGhpcyxcInBpcFwiKSksdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJhaXJwbGF5XCIpJiZGLmFpcnBsYXkmJmkuYXBwZW5kQ2hpbGQob2UuY3JlYXRlQnV0dG9uLmNhbGwodGhpcyxcImFpcnBsYXlcIikpLHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKFwiZnVsbHNjcmVlblwiKSYmaS5hcHBlbmRDaGlsZChvZS5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLFwiZnVsbHNjcmVlblwiKSksdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJwbGF5LWxhcmdlXCIpJiZ0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChvZS5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLFwicGxheS1sYXJnZVwiKSksdGhpcy5lbGVtZW50cy5jb250cm9scz1pLHRoaXMuaXNIVE1MNSYmb2Uuc2V0UXVhbGl0eU1lbnUuY2FsbCh0aGlzLFUuZ2V0UXVhbGl0eU9wdGlvbnMuY2FsbCh0aGlzKSksb2Uuc2V0U3BlZWRNZW51LmNhbGwodGhpcyksaX0saW5qZWN0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZih0aGlzLmNvbmZpZy5sb2FkU3ByaXRlKXt2YXIgdD1vZS5nZXRJY29uVXJsLmNhbGwodGhpcyk7dC5jb3JzJiZ0ZSh0LnVybCxcInNwcml0ZS1wbHlyXCIpfXRoaXMuaWQ9TWF0aC5mbG9vcigxZTQqTWF0aC5yYW5kb20oKSk7dmFyIGk9bnVsbDt0aGlzLmVsZW1lbnRzLmNvbnRyb2xzPW51bGw7dmFyIG49e2lkOnRoaXMuaWQsc2Vla3RpbWU6dGhpcy5jb25maWcuc2Vla1RpbWUsdGl0bGU6dGhpcy5jb25maWcudGl0bGV9LHM9ITA7bC5mdW5jdGlvbih0aGlzLmNvbmZpZy5jb250cm9scykmJih0aGlzLmNvbmZpZy5jb250cm9scz10aGlzLmNvbmZpZy5jb250cm9scy5jYWxsKHRoaXMucHJvcHMpKSx0aGlzLmNvbmZpZy5jb250cm9sc3x8KHRoaXMuY29uZmlnLmNvbnRyb2xzPVtdKSxsLmVsZW1lbnQodGhpcy5jb25maWcuY29udHJvbHMpfHxsLnN0cmluZyh0aGlzLmNvbmZpZy5jb250cm9scyk/aT10aGlzLmNvbmZpZy5jb250cm9sczooaT1vZS5jcmVhdGUuY2FsbCh0aGlzLHtpZDp0aGlzLmlkLHNlZWt0aW1lOnRoaXMuY29uZmlnLnNlZWtUaW1lLHNwZWVkOnRoaXMuc3BlZWQscXVhbGl0eTp0aGlzLnF1YWxpdHksY2FwdGlvbnM6Y2UuZ2V0TGFiZWwuY2FsbCh0aGlzKX0pLHM9ITEpO3ZhciBhPWZ1bmN0aW9uKGUpe3ZhciB0PWU7cmV0dXJuIE9iamVjdC5lbnRyaWVzKG4pLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIGk9dihlLDIpLG49aVswXSxzPWlbMV07dD1KKHQsXCJ7XCIrbitcIn1cIixzKX0pLHR9O3MmJihsLnN0cmluZyh0aGlzLmNvbmZpZy5jb250cm9scyk/aT1hKGkpOmwuZWxlbWVudChpKSYmKGkuaW5uZXJIVE1MPWEoaS5pbm5lckhUTUwpKSk7dmFyIG89dm9pZCAwO2lmKGwuc3RyaW5nKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5jb250cm9scy5jb250YWluZXIpJiYobz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5jb250cm9scy5jb250YWluZXIpKSxsLmVsZW1lbnQobyl8fChvPXRoaXMuZWxlbWVudHMuY29udGFpbmVyKSxvW2wuZWxlbWVudChpKT9cImluc2VydEFkamFjZW50RWxlbWVudFwiOlwiaW5zZXJ0QWRqYWNlbnRIVE1MXCJdKFwiYWZ0ZXJiZWdpblwiLGkpLGwuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmNvbnRyb2xzKXx8b2UuZmluZEVsZW1lbnRzLmNhbGwodGhpcyksIWwuZW1wdHkodGhpcy5lbGVtZW50cy5idXR0b25zKSl7dmFyIHI9ZnVuY3Rpb24odCl7dmFyIGk9ZS5jb25maWcuY2xhc3NOYW1lcy5jb250cm9sUHJlc3NlZDtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcInByZXNzZWRcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gTih0LGkpfSxzZXQ6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO00odCxpLGUpfX0pfTtPYmplY3QudmFsdWVzKHRoaXMuZWxlbWVudHMuYnV0dG9ucykuZmlsdGVyKEJvb2xlYW4pLmZvckVhY2goZnVuY3Rpb24oZSl7bC5hcnJheShlKXx8bC5ub2RlTGlzdChlKT9BcnJheS5mcm9tKGUpLmZpbHRlcihCb29sZWFuKS5mb3JFYWNoKHIpOnIoZSl9KX1pZih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkVkZ2VcIikmJkIobyksdGhpcy5jb25maWcudG9vbHRpcHMuY29udHJvbHMpe3ZhciBjPXRoaXMuY29uZmlnLHU9Yy5jbGFzc05hbWVzLGQ9Yy5zZWxlY3RvcnMsaD1kLmNvbnRyb2xzLndyYXBwZXIrXCIgXCIrZC5sYWJlbHMrXCIgLlwiK3UuaGlkZGVuLHA9eC5jYWxsKHRoaXMsaCk7QXJyYXkuZnJvbShwKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe00odCxlLmNvbmZpZy5jbGFzc05hbWVzLmhpZGRlbiwhMSksTSh0LGUuY29uZmlnLmNsYXNzTmFtZXMudG9vbHRpcCwhMCl9KX19fTtmdW5jdGlvbiByZShlKXt2YXIgdD1lO2lmKCEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV0pe3ZhciBpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO2kuaHJlZj10LHQ9aS5ocmVmfXRyeXtyZXR1cm4gbmV3IFVSTCh0KX1jYXRjaChlKXtyZXR1cm4gbnVsbH19ZnVuY3Rpb24gbGUoZSl7dmFyIHQ9bmV3IFVSTFNlYXJjaFBhcmFtcztyZXR1cm4gbC5vYmplY3QoZSkmJk9iamVjdC5lbnRyaWVzKGUpLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIGk9dihlLDIpLG49aVswXSxzPWlbMV07dC5zZXQobixzKX0pLHR9dmFyIGNlPXtzZXR1cDpmdW5jdGlvbigpe2lmKHRoaXMuc3VwcG9ydGVkLnVpKWlmKCF0aGlzLmlzVmlkZW98fHRoaXMuaXNZb3VUdWJlfHx0aGlzLmlzSFRNTDUmJiFGLnRleHRUcmFja3MpbC5hcnJheSh0aGlzLmNvbmZpZy5jb250cm9scykmJnRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKFwic2V0dGluZ3NcIikmJnRoaXMuY29uZmlnLnNldHRpbmdzLmluY2x1ZGVzKFwiY2FwdGlvbnNcIikmJm9lLnNldENhcHRpb25zTWVudS5jYWxsKHRoaXMpO2Vsc2V7dmFyIGUsdDtpZihsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5jYXB0aW9ucyl8fCh0aGlzLmVsZW1lbnRzLmNhcHRpb25zPXcoXCJkaXZcIixQKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5jYXB0aW9ucykpLGU9dGhpcy5lbGVtZW50cy5jYXB0aW9ucyx0PXRoaXMuZWxlbWVudHMud3JhcHBlcixsLmVsZW1lbnQoZSkmJmwuZWxlbWVudCh0KSYmdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHQubmV4dFNpYmxpbmcpKSxWLmlzSUUmJndpbmRvdy5VUkwpe3ZhciBpPXRoaXMubWVkaWEucXVlcnlTZWxlY3RvckFsbChcInRyYWNrXCIpO0FycmF5LmZyb20oaSkuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1lLmdldEF0dHJpYnV0ZShcInNyY1wiKSxpPXJlKHQpO251bGwhPT1pJiZpLmhvc3RuYW1lIT09d2luZG93LmxvY2F0aW9uLmhyZWYuaG9zdG5hbWUmJltcImh0dHA6XCIsXCJodHRwczpcIl0uaW5jbHVkZXMoaS5wcm90b2NvbCkmJmVlKHQsXCJibG9iXCIpLnRoZW4oZnVuY3Rpb24odCl7ZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIix3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCh0KSl9KS5jYXRjaChmdW5jdGlvbigpe0EoZSl9KX0pfXZhciBuPXooKG5hdmlnYXRvci5sYW5ndWFnZXN8fFtuYXZpZ2F0b3IubGFuZ3VhZ2V8fG5hdmlnYXRvci51c2VyTGFuZ3VhZ2V8fFwiZW5cIl0pLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5zcGxpdChcIi1cIilbMF19KSkscz0odGhpcy5zdG9yYWdlLmdldChcImxhbmd1YWdlXCIpfHx0aGlzLmNvbmZpZy5jYXB0aW9ucy5sYW5ndWFnZXx8XCJhdXRvXCIpLnRvTG93ZXJDYXNlKCk7aWYoXCJhdXRvXCI9PT1zKXM9dihuLDEpWzBdO3ZhciBhPXRoaXMuc3RvcmFnZS5nZXQoXCJjYXB0aW9uc1wiKTtpZihsLmJvb2xlYW4oYSl8fChhPXRoaXMuY29uZmlnLmNhcHRpb25zLmFjdGl2ZSksT2JqZWN0LmFzc2lnbih0aGlzLmNhcHRpb25zLHt0b2dnbGVkOiExLGFjdGl2ZTphLGxhbmd1YWdlOnMsbGFuZ3VhZ2VzOm59KSx0aGlzLmlzSFRNTDUpe3ZhciBvPXRoaXMuY29uZmlnLmNhcHRpb25zLnVwZGF0ZT9cImFkZHRyYWNrIHJlbW92ZXRyYWNrXCI6XCJyZW1vdmV0cmFja1wiO2QuY2FsbCh0aGlzLHRoaXMubWVkaWEudGV4dFRyYWNrcyxvLGNlLnVwZGF0ZS5iaW5kKHRoaXMpKX1zZXRUaW1lb3V0KGNlLnVwZGF0ZS5iaW5kKHRoaXMpLDApfX0sdXBkYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWNlLmdldFRyYWNrcy5jYWxsKHRoaXMsITApLGk9dGhpcy5jYXB0aW9ucyxuPWkuYWN0aXZlLHM9aS5sYW5ndWFnZSxhPWkubWV0YSxvPWkuY3VycmVudFRyYWNrTm9kZSxyPUJvb2xlYW4odC5maW5kKGZ1bmN0aW9uKGUpe3JldHVybiBlLmxhbmd1YWdlPT09c30pKTt0aGlzLmlzSFRNTDUmJnRoaXMuaXNWaWRlbyYmdC5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIWEuZ2V0KGUpfSkuZm9yRWFjaChmdW5jdGlvbih0KXtlLmRlYnVnLmxvZyhcIlRyYWNrIGFkZGVkXCIsdCksYS5zZXQodCx7ZGVmYXVsdDpcInNob3dpbmdcIj09PXQubW9kZX0pLHQubW9kZT1cImhpZGRlblwiLGQuY2FsbChlLHQsXCJjdWVjaGFuZ2VcIixmdW5jdGlvbigpe3JldHVybiBjZS51cGRhdGVDdWVzLmNhbGwoZSl9KX0pLChyJiZ0aGlzLmxhbmd1YWdlIT09c3x8IXQuaW5jbHVkZXMobykpJiYoY2Uuc2V0TGFuZ3VhZ2UuY2FsbCh0aGlzLHMpLGNlLnRvZ2dsZS5jYWxsKHRoaXMsbiYmcikpLE0odGhpcy5lbGVtZW50cy5jb250YWluZXIsdGhpcy5jb25maWcuY2xhc3NOYW1lcy5jYXB0aW9ucy5lbmFibGVkLCFsLmVtcHR5KHQpKSwodGhpcy5jb25maWcuY29udHJvbHN8fFtdKS5pbmNsdWRlcyhcInNldHRpbmdzXCIpJiZ0aGlzLmNvbmZpZy5zZXR0aW5ncy5pbmNsdWRlcyhcImNhcHRpb25zXCIpJiZvZS5zZXRDYXB0aW9uc01lbnUuY2FsbCh0aGlzKX0sdG9nZ2xlOmZ1bmN0aW9uKGUpe3ZhciB0PSEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV07aWYodGhpcy5zdXBwb3J0ZWQudWkpe3ZhciBpPXRoaXMuY2FwdGlvbnMudG9nZ2xlZCxuPXRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY2FwdGlvbnMuYWN0aXZlLHM9bC5udWxsT3JVbmRlZmluZWQoZSk/IWk6ZTtpZihzIT09aSl7aWYodHx8KHRoaXMuY2FwdGlvbnMuYWN0aXZlPXMsdGhpcy5zdG9yYWdlLnNldCh7Y2FwdGlvbnM6c30pKSwhdGhpcy5sYW5ndWFnZSYmcyYmIXQpe3ZhciBhPWNlLmdldFRyYWNrcy5jYWxsKHRoaXMpLG89Y2UuZmluZFRyYWNrLmNhbGwodGhpcyxbdGhpcy5jYXB0aW9ucy5sYW5ndWFnZV0uY29uY2F0KGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLGk9QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKWlbdF09ZVt0XTtyZXR1cm4gaX1yZXR1cm4gQXJyYXkuZnJvbShlKX0odGhpcy5jYXB0aW9ucy5sYW5ndWFnZXMpKSwhMCk7cmV0dXJuIHRoaXMuY2FwdGlvbnMubGFuZ3VhZ2U9by5sYW5ndWFnZSx2b2lkIGNlLnNldC5jYWxsKHRoaXMsYS5pbmRleE9mKG8pKX10aGlzLmVsZW1lbnRzLmJ1dHRvbnMuY2FwdGlvbnMmJih0aGlzLmVsZW1lbnRzLmJ1dHRvbnMuY2FwdGlvbnMucHJlc3NlZD1zKSxNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLG4scyksdGhpcy5jYXB0aW9ucy50b2dnbGVkPXMsb2UudXBkYXRlU2V0dGluZy5jYWxsKHRoaXMsXCJjYXB0aW9uc1wiKSxmLmNhbGwodGhpcyx0aGlzLm1lZGlhLHM/XCJjYXB0aW9uc2VuYWJsZWRcIjpcImNhcHRpb25zZGlzYWJsZWRcIil9fX0sc2V0OmZ1bmN0aW9uKGUpe3ZhciB0PSEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV0saT1jZS5nZXRUcmFja3MuY2FsbCh0aGlzKTtpZigtMSE9PWUpaWYobC5udW1iZXIoZSkpaWYoZSBpbiBpKXtpZih0aGlzLmNhcHRpb25zLmN1cnJlbnRUcmFjayE9PWUpe3RoaXMuY2FwdGlvbnMuY3VycmVudFRyYWNrPWU7dmFyIG49aVtlXSxzPShufHx7fSkubGFuZ3VhZ2U7dGhpcy5jYXB0aW9ucy5jdXJyZW50VHJhY2tOb2RlPW4sb2UudXBkYXRlU2V0dGluZy5jYWxsKHRoaXMsXCJjYXB0aW9uc1wiKSx0fHwodGhpcy5jYXB0aW9ucy5sYW5ndWFnZT1zLHRoaXMuc3RvcmFnZS5zZXQoe2xhbmd1YWdlOnN9KSksdGhpcy5pc1ZpbWVvJiZ0aGlzLmVtYmVkLmVuYWJsZVRleHRUcmFjayhzKSxmLmNhbGwodGhpcyx0aGlzLm1lZGlhLFwibGFuZ3VhZ2VjaGFuZ2VcIil9Y2UudG9nZ2xlLmNhbGwodGhpcywhMCx0KSx0aGlzLmlzSFRNTDUmJnRoaXMuaXNWaWRlbyYmY2UudXBkYXRlQ3Vlcy5jYWxsKHRoaXMpfWVsc2UgdGhpcy5kZWJ1Zy53YXJuKFwiVHJhY2sgbm90IGZvdW5kXCIsZSk7ZWxzZSB0aGlzLmRlYnVnLndhcm4oXCJJbnZhbGlkIGNhcHRpb24gYXJndW1lbnRcIixlKTtlbHNlIGNlLnRvZ2dsZS5jYWxsKHRoaXMsITEsdCl9LHNldExhbmd1YWdlOmZ1bmN0aW9uKGUpe3ZhciB0PSEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV07aWYobC5zdHJpbmcoZSkpe3ZhciBpPWUudG9Mb3dlckNhc2UoKTt0aGlzLmNhcHRpb25zLmxhbmd1YWdlPWk7dmFyIG49Y2UuZ2V0VHJhY2tzLmNhbGwodGhpcykscz1jZS5maW5kVHJhY2suY2FsbCh0aGlzLFtpXSk7Y2Uuc2V0LmNhbGwodGhpcyxuLmluZGV4T2YocyksdCl9ZWxzZSB0aGlzLmRlYnVnLndhcm4oXCJJbnZhbGlkIGxhbmd1YWdlIGFyZ3VtZW50XCIsZSl9LGdldFRyYWNrczpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3JldHVybiBBcnJheS5mcm9tKCh0aGlzLm1lZGlhfHx7fSkudGV4dFRyYWNrc3x8W10pLmZpbHRlcihmdW5jdGlvbihpKXtyZXR1cm4hZS5pc0hUTUw1fHx0fHxlLmNhcHRpb25zLm1ldGEuaGFzKGkpfSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybltcImNhcHRpb25zXCIsXCJzdWJ0aXRsZXNcIl0uaW5jbHVkZXMoZS5raW5kKX0pfSxmaW5kVHJhY2s6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcyxpPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sbj1jZS5nZXRUcmFja3MuY2FsbCh0aGlzKSxzPWZ1bmN0aW9uKGUpe3JldHVybiBOdW1iZXIoKHQuY2FwdGlvbnMubWV0YS5nZXQoZSl8fHt9KS5kZWZhdWx0KX0sYT1BcnJheS5mcm9tKG4pLnNvcnQoZnVuY3Rpb24oZSx0KXtyZXR1cm4gcyh0KS1zKGUpfSksbz12b2lkIDA7cmV0dXJuIGUuZXZlcnkoZnVuY3Rpb24oZSl7cmV0dXJuIShvPWEuZmluZChmdW5jdGlvbih0KXtyZXR1cm4gdC5sYW5ndWFnZT09PWV9KSl9KSxvfHwoaT9hWzBdOnZvaWQgMCl9LGdldEN1cnJlbnRUcmFjazpmdW5jdGlvbigpe3JldHVybiBjZS5nZXRUcmFja3MuY2FsbCh0aGlzKVt0aGlzLmN1cnJlbnRUcmFja119LGdldExhYmVsOmZ1bmN0aW9uKGUpe3ZhciB0PWU7cmV0dXJuIWwudHJhY2sodCkmJkYudGV4dFRyYWNrcyYmdGhpcy5jYXB0aW9ucy50b2dnbGVkJiYodD1jZS5nZXRDdXJyZW50VHJhY2suY2FsbCh0aGlzKSksbC50cmFjayh0KT9sLmVtcHR5KHQubGFiZWwpP2wuZW1wdHkodC5sYW5ndWFnZSk/WChcImVuYWJsZWRcIix0aGlzLmNvbmZpZyk6ZS5sYW5ndWFnZS50b1VwcGVyQ2FzZSgpOnQubGFiZWw6WChcImRpc2FibGVkXCIsdGhpcy5jb25maWcpfSx1cGRhdGVDdWVzOmZ1bmN0aW9uKGUpe2lmKHRoaXMuc3VwcG9ydGVkLnVpKWlmKGwuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmNhcHRpb25zKSlpZihsLm51bGxPclVuZGVmaW5lZChlKXx8QXJyYXkuaXNBcnJheShlKSl7dmFyIHQ9ZTtpZighdCl7dmFyIGk9Y2UuZ2V0Q3VycmVudFRyYWNrLmNhbGwodGhpcyk7dD1BcnJheS5mcm9tKChpfHx7fSkuYWN0aXZlQ3Vlc3x8W10pLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRDdWVBc0hUTUwoKX0pLm1hcChHKX12YXIgbj10Lm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS50cmltKCl9KS5qb2luKFwiXFxuXCIpO2lmKG4hPT10aGlzLmVsZW1lbnRzLmNhcHRpb25zLmlubmVySFRNTCl7RSh0aGlzLmVsZW1lbnRzLmNhcHRpb25zKTt2YXIgcz13KFwic3BhblwiLFAodGhpcy5jb25maWcuc2VsZWN0b3JzLmNhcHRpb24pKTtzLmlubmVySFRNTD1uLHRoaXMuZWxlbWVudHMuY2FwdGlvbnMuYXBwZW5kQ2hpbGQocyksZi5jYWxsKHRoaXMsdGhpcy5tZWRpYSxcImN1ZWNoYW5nZVwiKX19ZWxzZSB0aGlzLmRlYnVnLndhcm4oXCJ1cGRhdGVDdWVzOiBJbnZhbGlkIGlucHV0XCIsZSk7ZWxzZSB0aGlzLmRlYnVnLndhcm4oXCJObyBjYXB0aW9ucyBlbGVtZW50IHRvIHJlbmRlciB0b1wiKX19LHVlPXtlbmFibGVkOiEwLHRpdGxlOlwiXCIsZGVidWc6ITEsYXV0b3BsYXk6ITEsYXV0b3BhdXNlOiEwLHBsYXlzaW5saW5lOiEwLHNlZWtUaW1lOjEwLHZvbHVtZToxLG11dGVkOiExLGR1cmF0aW9uOm51bGwsZGlzcGxheUR1cmF0aW9uOiEwLGludmVydFRpbWU6ITAsdG9nZ2xlSW52ZXJ0OiEwLHJhdGlvOlwiMTY6OVwiLGNsaWNrVG9QbGF5OiEwLGhpZGVDb250cm9sczohMCxyZXNldE9uRW5kOiExLGRpc2FibGVDb250ZXh0TWVudTohMCxsb2FkU3ByaXRlOiEwLGljb25QcmVmaXg6XCJwbHlyXCIsaWNvblVybDpcImh0dHBzOi8vY2RuLnBseXIuaW8vMy4zLjEyL3BseXIuc3ZnXCIsYmxhbmtWaWRlbzpcImh0dHBzOi8vY2RuLnBseXIuaW8vc3RhdGljL2JsYW5rLm1wNFwiLHF1YWxpdHk6e2RlZmF1bHQ6NTc2LG9wdGlvbnM6WzQzMjAsMjg4MCwyMTYwLDE0NDAsMTA4MCw3MjAsNTc2LDQ4MCwzNjAsMjQwXX0sbG9vcDp7YWN0aXZlOiExfSxzcGVlZDp7c2VsZWN0ZWQ6MSxvcHRpb25zOlsuNSwuNzUsMSwxLjI1LDEuNSwxLjc1LDJdfSxrZXlib2FyZDp7Zm9jdXNlZDohMCxnbG9iYWw6ITF9LHRvb2x0aXBzOntjb250cm9sczohMSxzZWVrOiEwfSxjYXB0aW9uczp7YWN0aXZlOiExLGxhbmd1YWdlOlwiYXV0b1wiLHVwZGF0ZTohMX0sZnVsbHNjcmVlbjp7ZW5hYmxlZDohMCxmYWxsYmFjazohMCxpb3NOYXRpdmU6ITF9LHN0b3JhZ2U6e2VuYWJsZWQ6ITAsa2V5OlwicGx5clwifSxjb250cm9sczpbXCJwbGF5LWxhcmdlXCIsXCJwbGF5XCIsXCJwcm9ncmVzc1wiLFwiY3VycmVudC10aW1lXCIsXCJtdXRlXCIsXCJ2b2x1bWVcIixcImNhcHRpb25zXCIsXCJzZXR0aW5nc1wiLFwicGlwXCIsXCJhaXJwbGF5XCIsXCJmdWxsc2NyZWVuXCJdLHNldHRpbmdzOltcImNhcHRpb25zXCIsXCJxdWFsaXR5XCIsXCJzcGVlZFwiXSxpMThuOntyZXN0YXJ0OlwiUmVzdGFydFwiLHJld2luZDpcIlJld2luZCB7c2Vla3RpbWV9c1wiLHBsYXk6XCJQbGF5XCIscGF1c2U6XCJQYXVzZVwiLGZhc3RGb3J3YXJkOlwiRm9yd2FyZCB7c2Vla3RpbWV9c1wiLHNlZWs6XCJTZWVrXCIsc2Vla0xhYmVsOlwie2N1cnJlbnRUaW1lfSBvZiB7ZHVyYXRpb259XCIscGxheWVkOlwiUGxheWVkXCIsYnVmZmVyZWQ6XCJCdWZmZXJlZFwiLGN1cnJlbnRUaW1lOlwiQ3VycmVudCB0aW1lXCIsZHVyYXRpb246XCJEdXJhdGlvblwiLHZvbHVtZTpcIlZvbHVtZVwiLG11dGU6XCJNdXRlXCIsdW5tdXRlOlwiVW5tdXRlXCIsZW5hYmxlQ2FwdGlvbnM6XCJFbmFibGUgY2FwdGlvbnNcIixkaXNhYmxlQ2FwdGlvbnM6XCJEaXNhYmxlIGNhcHRpb25zXCIsZW50ZXJGdWxsc2NyZWVuOlwiRW50ZXIgZnVsbHNjcmVlblwiLGV4aXRGdWxsc2NyZWVuOlwiRXhpdCBmdWxsc2NyZWVuXCIsZnJhbWVUaXRsZTpcIlBsYXllciBmb3Ige3RpdGxlfVwiLGNhcHRpb25zOlwiQ2FwdGlvbnNcIixzZXR0aW5nczpcIlNldHRpbmdzXCIsbWVudUJhY2s6XCJHbyBiYWNrIHRvIHByZXZpb3VzIG1lbnVcIixzcGVlZDpcIlNwZWVkXCIsbm9ybWFsOlwiTm9ybWFsXCIscXVhbGl0eTpcIlF1YWxpdHlcIixsb29wOlwiTG9vcFwiLHN0YXJ0OlwiU3RhcnRcIixlbmQ6XCJFbmRcIixhbGw6XCJBbGxcIixyZXNldDpcIlJlc2V0XCIsZGlzYWJsZWQ6XCJEaXNhYmxlZFwiLGVuYWJsZWQ6XCJFbmFibGVkXCIsYWR2ZXJ0aXNlbWVudDpcIkFkXCIscXVhbGl0eUJhZGdlOnsyMTYwOlwiNEtcIiwxNDQwOlwiSERcIiwxMDgwOlwiSERcIiw3MjA6XCJIRFwiLDU3NjpcIlNEXCIsNDgwOlwiU0RcIn19LHVybHM6e3ZpbWVvOntzZGs6XCJodHRwczovL3BsYXllci52aW1lby5jb20vYXBpL3BsYXllci5qc1wiLGlmcmFtZTpcImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby97MH0/ezF9XCIsYXBpOlwiaHR0cHM6Ly92aW1lby5jb20vYXBpL3YyL3ZpZGVvL3swfS5qc29uXCJ9LHlvdXR1YmU6e3NkazpcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIixhcGk6XCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz9pZD17MH0ma2V5PXsxfSZmaWVsZHM9aXRlbXMoc25pcHBldCh0aXRsZSkpJnBhcnQ9c25pcHBldFwifSxnb29nbGVJTUE6e3NkazpcImh0dHBzOi8vaW1hc2RrLmdvb2dsZWFwaXMuY29tL2pzL3Nka2xvYWRlci9pbWEzLmpzXCJ9fSxsaXN0ZW5lcnM6e3NlZWs6bnVsbCxwbGF5Om51bGwscGF1c2U6bnVsbCxyZXN0YXJ0Om51bGwscmV3aW5kOm51bGwsZmFzdEZvcndhcmQ6bnVsbCxtdXRlOm51bGwsdm9sdW1lOm51bGwsY2FwdGlvbnM6bnVsbCxmdWxsc2NyZWVuOm51bGwscGlwOm51bGwsYWlycGxheTpudWxsLHNwZWVkOm51bGwscXVhbGl0eTpudWxsLGxvb3A6bnVsbCxsYW5ndWFnZTpudWxsfSxldmVudHM6W1wiZW5kZWRcIixcInByb2dyZXNzXCIsXCJzdGFsbGVkXCIsXCJwbGF5aW5nXCIsXCJ3YWl0aW5nXCIsXCJjYW5wbGF5XCIsXCJjYW5wbGF5dGhyb3VnaFwiLFwibG9hZHN0YXJ0XCIsXCJsb2FkZWRkYXRhXCIsXCJsb2FkZWRtZXRhZGF0YVwiLFwidGltZXVwZGF0ZVwiLFwidm9sdW1lY2hhbmdlXCIsXCJwbGF5XCIsXCJwYXVzZVwiLFwiZXJyb3JcIixcInNlZWtpbmdcIixcInNlZWtlZFwiLFwiZW1wdGllZFwiLFwicmF0ZWNoYW5nZVwiLFwiY3VlY2hhbmdlXCIsXCJlbnRlcmZ1bGxzY3JlZW5cIixcImV4aXRmdWxsc2NyZWVuXCIsXCJjYXB0aW9uc2VuYWJsZWRcIixcImNhcHRpb25zZGlzYWJsZWRcIixcImxhbmd1YWdlY2hhbmdlXCIsXCJjb250cm9sc2hpZGRlblwiLFwiY29udHJvbHNzaG93blwiLFwicmVhZHlcIixcInN0YXRlY2hhbmdlXCIsXCJxdWFsaXR5Y2hhbmdlXCIsXCJhZHNsb2FkZWRcIixcImFkc2NvbnRlbnRwYXVzZVwiLFwiYWRzY29udGVudHJlc3VtZVwiLFwiYWRzdGFydGVkXCIsXCJhZHNtaWRwb2ludFwiLFwiYWRzY29tcGxldGVcIixcImFkc2FsbGNvbXBsZXRlXCIsXCJhZHNpbXByZXNzaW9uXCIsXCJhZHNjbGlja1wiXSxzZWxlY3RvcnM6e2VkaXRhYmxlOlwiaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIFtjb250ZW50ZWRpdGFibGVdXCIsY29udGFpbmVyOlwiLnBseXJcIixjb250cm9sczp7Y29udGFpbmVyOm51bGwsd3JhcHBlcjpcIi5wbHlyX19jb250cm9sc1wifSxsYWJlbHM6XCJbZGF0YS1wbHlyXVwiLGJ1dHRvbnM6e3BsYXk6J1tkYXRhLXBseXI9XCJwbGF5XCJdJyxwYXVzZTonW2RhdGEtcGx5cj1cInBhdXNlXCJdJyxyZXN0YXJ0OidbZGF0YS1wbHlyPVwicmVzdGFydFwiXScscmV3aW5kOidbZGF0YS1wbHlyPVwicmV3aW5kXCJdJyxmYXN0Rm9yd2FyZDonW2RhdGEtcGx5cj1cImZhc3QtZm9yd2FyZFwiXScsbXV0ZTonW2RhdGEtcGx5cj1cIm11dGVcIl0nLGNhcHRpb25zOidbZGF0YS1wbHlyPVwiY2FwdGlvbnNcIl0nLGZ1bGxzY3JlZW46J1tkYXRhLXBseXI9XCJmdWxsc2NyZWVuXCJdJyxwaXA6J1tkYXRhLXBseXI9XCJwaXBcIl0nLGFpcnBsYXk6J1tkYXRhLXBseXI9XCJhaXJwbGF5XCJdJyxzZXR0aW5nczonW2RhdGEtcGx5cj1cInNldHRpbmdzXCJdJyxsb29wOidbZGF0YS1wbHlyPVwibG9vcFwiXSd9LGlucHV0czp7c2VlazonW2RhdGEtcGx5cj1cInNlZWtcIl0nLHZvbHVtZTonW2RhdGEtcGx5cj1cInZvbHVtZVwiXScsc3BlZWQ6J1tkYXRhLXBseXI9XCJzcGVlZFwiXScsbGFuZ3VhZ2U6J1tkYXRhLXBseXI9XCJsYW5ndWFnZVwiXScscXVhbGl0eTonW2RhdGEtcGx5cj1cInF1YWxpdHlcIl0nfSxkaXNwbGF5OntjdXJyZW50VGltZTpcIi5wbHlyX190aW1lLS1jdXJyZW50XCIsZHVyYXRpb246XCIucGx5cl9fdGltZS0tZHVyYXRpb25cIixidWZmZXI6XCIucGx5cl9fcHJvZ3Jlc3NfX2J1ZmZlclwiLGxvb3A6XCIucGx5cl9fcHJvZ3Jlc3NfX2xvb3BcIix2b2x1bWU6XCIucGx5cl9fdm9sdW1lLS1kaXNwbGF5XCJ9LHByb2dyZXNzOlwiLnBseXJfX3Byb2dyZXNzXCIsY2FwdGlvbnM6XCIucGx5cl9fY2FwdGlvbnNcIixjYXB0aW9uOlwiLnBseXJfX2NhcHRpb25cIixtZW51OntxdWFsaXR5OlwiLmpzLXBseXJfX21lbnVfX2xpc3QtLXF1YWxpdHlcIn19LGNsYXNzTmFtZXM6e3R5cGU6XCJwbHlyLS17MH1cIixwcm92aWRlcjpcInBseXItLXswfVwiLHZpZGVvOlwicGx5cl9fdmlkZW8td3JhcHBlclwiLGVtYmVkOlwicGx5cl9fdmlkZW8tZW1iZWRcIixlbWJlZENvbnRhaW5lcjpcInBseXJfX3ZpZGVvLWVtYmVkX19jb250YWluZXJcIixwb3N0ZXI6XCJwbHlyX19wb3N0ZXJcIixwb3N0ZXJFbmFibGVkOlwicGx5cl9fcG9zdGVyLWVuYWJsZWRcIixhZHM6XCJwbHlyX19hZHNcIixjb250cm9sOlwicGx5cl9fY29udHJvbFwiLGNvbnRyb2xQcmVzc2VkOlwicGx5cl9fY29udHJvbC0tcHJlc3NlZFwiLHBsYXlpbmc6XCJwbHlyLS1wbGF5aW5nXCIscGF1c2VkOlwicGx5ci0tcGF1c2VkXCIsc3RvcHBlZDpcInBseXItLXN0b3BwZWRcIixsb2FkaW5nOlwicGx5ci0tbG9hZGluZ1wiLGhvdmVyOlwicGx5ci0taG92ZXJcIix0b29sdGlwOlwicGx5cl9fdG9vbHRpcFwiLGN1ZXM6XCJwbHlyX19jdWVzXCIsaGlkZGVuOlwicGx5cl9fc3Itb25seVwiLGhpZGVDb250cm9sczpcInBseXItLWhpZGUtY29udHJvbHNcIixpc0lvczpcInBseXItLWlzLWlvc1wiLGlzVG91Y2g6XCJwbHlyLS1pcy10b3VjaFwiLHVpU3VwcG9ydGVkOlwicGx5ci0tZnVsbC11aVwiLG5vVHJhbnNpdGlvbjpcInBseXItLW5vLXRyYW5zaXRpb25cIixkaXNwbGF5Ont0aW1lOlwicGx5cl9fdGltZVwifSxtZW51Ont2YWx1ZTpcInBseXJfX21lbnVfX3ZhbHVlXCIsYmFkZ2U6XCJwbHlyX19iYWRnZVwiLG9wZW46XCJwbHlyLS1tZW51LW9wZW5cIn0sY2FwdGlvbnM6e2VuYWJsZWQ6XCJwbHlyLS1jYXB0aW9ucy1lbmFibGVkXCIsYWN0aXZlOlwicGx5ci0tY2FwdGlvbnMtYWN0aXZlXCJ9LGZ1bGxzY3JlZW46e2VuYWJsZWQ6XCJwbHlyLS1mdWxsc2NyZWVuLWVuYWJsZWRcIixmYWxsYmFjazpcInBseXItLWZ1bGxzY3JlZW4tZmFsbGJhY2tcIn0scGlwOntzdXBwb3J0ZWQ6XCJwbHlyLS1waXAtc3VwcG9ydGVkXCIsYWN0aXZlOlwicGx5ci0tcGlwLWFjdGl2ZVwifSxhaXJwbGF5OntzdXBwb3J0ZWQ6XCJwbHlyLS1haXJwbGF5LXN1cHBvcnRlZFwiLGFjdGl2ZTpcInBseXItLWFpcnBsYXktYWN0aXZlXCJ9LHRhYkZvY3VzOlwicGx5cl9fdGFiLWZvY3VzXCJ9LGF0dHJpYnV0ZXM6e2VtYmVkOntwcm92aWRlcjpcImRhdGEtcGx5ci1wcm92aWRlclwiLGlkOlwiZGF0YS1wbHlyLWVtYmVkLWlkXCJ9fSxrZXlzOntnb29nbGU6bnVsbH0sYWRzOntlbmFibGVkOiExLHB1Ymxpc2hlcklkOlwiXCJ9fSxkZT17aHRtbDU6XCJodG1sNVwiLHlvdXR1YmU6XCJ5b3V0dWJlXCIsdmltZW86XCJ2aW1lb1wifSxoZT17YXVkaW86XCJhdWRpb1wiLHZpZGVvOlwidmlkZW9cIn07dmFyIHBlPWZ1bmN0aW9uKCl7fSxmZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO20odGhpcyxlKSx0aGlzLmVuYWJsZWQ9d2luZG93LmNvbnNvbGUmJnQsdGhpcy5lbmFibGVkJiZ0aGlzLmxvZyhcIkRlYnVnZ2luZyBlbmFibGVkXCIpfXJldHVybiBnKGUsW3trZXk6XCJsb2dcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmFibGVkP0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoY29uc29sZS5sb2csY29uc29sZSk6cGV9fSx7a2V5Olwid2FyblwiLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVuYWJsZWQ/RnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChjb25zb2xlLndhcm4sY29uc29sZSk6cGV9fSx7a2V5OlwiZXJyb3JcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmFibGVkP0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoY29uc29sZS5lcnJvcixjb25zb2xlKTpwZX19XSksZX0oKTtmdW5jdGlvbiBtZSgpe2lmKHRoaXMuZW5hYmxlZCl7dmFyIGU9dGhpcy5wbGF5ZXIuZWxlbWVudHMuYnV0dG9ucy5mdWxsc2NyZWVuO2wuZWxlbWVudChlKSYmKGUucHJlc3NlZD10aGlzLmFjdGl2ZSksZi5jYWxsKHRoaXMucGxheWVyLHRoaXMudGFyZ2V0LHRoaXMuYWN0aXZlP1wiZW50ZXJmdWxsc2NyZWVuXCI6XCJleGl0ZnVsbHNjcmVlblwiLCEwKSxWLmlzSW9zfHxmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpudWxsLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtpZihsLmVsZW1lbnQoZSkpe3ZhciBpPXguY2FsbCh0aGlzLFwiYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBpbnB1dDpub3QoOmRpc2FibGVkKSwgW3RhYmluZGV4XVwiKSxuPWlbMF0scz1pW2kubGVuZ3RoLTFdO3UuY2FsbCh0aGlzLHRoaXMuZWxlbWVudHMuY29udGFpbmVyLFwia2V5ZG93blwiLGZ1bmN0aW9uKGUpe2lmKFwiVGFiXCI9PT1lLmtleSYmOT09PWUua2V5Q29kZSl7dmFyIHQ9ZG9jdW1lbnQuYWN0aXZlRWxlbWVudDt0IT09c3x8ZS5zaGlmdEtleT90PT09biYmZS5zaGlmdEtleSYmKHMuZm9jdXMoKSxlLnByZXZlbnREZWZhdWx0KCkpOihuLmZvY3VzKCksZS5wcmV2ZW50RGVmYXVsdCgpKX19LHQsITEpfX0uY2FsbCh0aGlzLnBsYXllcix0aGlzLnRhcmdldCx0aGlzLmFjdGl2ZSl9fWZ1bmN0aW9uIGdlKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtlP3RoaXMuc2Nyb2xsUG9zaXRpb249e3g6d2luZG93LnNjcm9sbFh8fDAseTp3aW5kb3cuc2Nyb2xsWXx8MH06d2luZG93LnNjcm9sbFRvKHRoaXMuc2Nyb2xsUG9zaXRpb24ueCx0aGlzLnNjcm9sbFBvc2l0aW9uLnkpLGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9ZT9cImhpZGRlblwiOlwiXCIsTSh0aGlzLnRhcmdldCx0aGlzLnBsYXllci5jb25maWcuY2xhc3NOYW1lcy5mdWxsc2NyZWVuLmZhbGxiYWNrLGUpLG1lLmNhbGwodGhpcyl9dmFyIHllPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0KXt2YXIgaT10aGlzO20odGhpcyxlKSx0aGlzLnBsYXllcj10LHRoaXMucHJlZml4PWUucHJlZml4LHRoaXMucHJvcGVydHk9ZS5wcm9wZXJ0eSx0aGlzLnNjcm9sbFBvc2l0aW9uPXt4OjAseTowfSxkLmNhbGwodGhpcy5wbGF5ZXIsZG9jdW1lbnQsXCJtc1wiPT09dGhpcy5wcmVmaXg/XCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIjp0aGlzLnByZWZpeCtcImZ1bGxzY3JlZW5jaGFuZ2VcIixmdW5jdGlvbigpe21lLmNhbGwoaSl9KSxkLmNhbGwodGhpcy5wbGF5ZXIsdGhpcy5wbGF5ZXIuZWxlbWVudHMuY29udGFpbmVyLFwiZGJsY2xpY2tcIixmdW5jdGlvbihlKXtsLmVsZW1lbnQoaS5wbGF5ZXIuZWxlbWVudHMuY29udHJvbHMpJiZpLnBsYXllci5lbGVtZW50cy5jb250cm9scy5jb250YWlucyhlLnRhcmdldCl8fGkudG9nZ2xlKCl9KSx0aGlzLnVwZGF0ZSgpfXJldHVybiBnKGUsW3trZXk6XCJ1cGRhdGVcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuZW5hYmxlZD90aGlzLnBsYXllci5kZWJ1Zy5sb2coKGUubmF0aXZlP1wiTmF0aXZlXCI6XCJGYWxsYmFja1wiKStcIiBmdWxsc2NyZWVuIGVuYWJsZWRcIik6dGhpcy5wbGF5ZXIuZGVidWcubG9nKFwiRnVsbHNjcmVlbiBub3Qgc3VwcG9ydGVkIGFuZCBmYWxsYmFjayBkaXNhYmxlZFwiKSxNKHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lcix0aGlzLnBsYXllci5jb25maWcuY2xhc3NOYW1lcy5mdWxsc2NyZWVuLmVuYWJsZWQsdGhpcy5lbmFibGVkKX19LHtrZXk6XCJlbnRlclwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5lbmFibGVkJiYoVi5pc0lvcyYmdGhpcy5wbGF5ZXIuY29uZmlnLmZ1bGxzY3JlZW4uaW9zTmF0aXZlP3RoaXMudGFyZ2V0LndlYmtpdEVudGVyRnVsbHNjcmVlbigpOmUubmF0aXZlP3RoaXMucHJlZml4P2wuZW1wdHkodGhpcy5wcmVmaXgpfHx0aGlzLnRhcmdldFt0aGlzLnByZWZpeCtcIlJlcXVlc3RcIit0aGlzLnByb3BlcnR5XSgpOnRoaXMudGFyZ2V0LnJlcXVlc3RGdWxsc2NyZWVuKCk6Z2UuY2FsbCh0aGlzLCEwKSl9fSx7a2V5OlwiZXhpdFwiLHZhbHVlOmZ1bmN0aW9uKCl7aWYodGhpcy5lbmFibGVkKWlmKFYuaXNJb3MmJnRoaXMucGxheWVyLmNvbmZpZy5mdWxsc2NyZWVuLmlvc05hdGl2ZSl0aGlzLnRhcmdldC53ZWJraXRFeGl0RnVsbHNjcmVlbigpLHRoaXMucGxheWVyLnBsYXkoKTtlbHNlIGlmKGUubmF0aXZlKWlmKHRoaXMucHJlZml4KXtpZighbC5lbXB0eSh0aGlzLnByZWZpeCkpe3ZhciB0PVwibW96XCI9PT10aGlzLnByZWZpeD9cIkNhbmNlbFwiOlwiRXhpdFwiO2RvY3VtZW50W1wiXCIrdGhpcy5wcmVmaXgrdCt0aGlzLnByb3BlcnR5XSgpfX1lbHNlKGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW58fGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKS5jYWxsKGRvY3VtZW50KTtlbHNlIGdlLmNhbGwodGhpcywhMSl9fSx7a2V5OlwidG9nZ2xlXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmFjdGl2ZT90aGlzLmV4aXQoKTp0aGlzLmVudGVyKCl9fSx7a2V5OlwiZW5hYmxlZFwiLGdldDpmdW5jdGlvbigpe3JldHVybihlLm5hdGl2ZXx8dGhpcy5wbGF5ZXIuY29uZmlnLmZ1bGxzY3JlZW4uZmFsbGJhY2spJiZ0aGlzLnBsYXllci5jb25maWcuZnVsbHNjcmVlbi5lbmFibGVkJiZ0aGlzLnBsYXllci5zdXBwb3J0ZWQudWkmJnRoaXMucGxheWVyLmlzVmlkZW99fSx7a2V5OlwiYWN0aXZlXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuISF0aGlzLmVuYWJsZWQmJihlLm5hdGl2ZT8odGhpcy5wcmVmaXg/ZG9jdW1lbnRbXCJcIit0aGlzLnByZWZpeCt0aGlzLnByb3BlcnR5K1wiRWxlbWVudFwiXTpkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCk9PT10aGlzLnRhcmdldDpOKHRoaXMudGFyZ2V0LHRoaXMucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLmZ1bGxzY3JlZW4uZmFsbGJhY2spKX19LHtrZXk6XCJ0YXJnZXRcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gVi5pc0lvcyYmdGhpcy5wbGF5ZXIuY29uZmlnLmZ1bGxzY3JlZW4uaW9zTmF0aXZlP3RoaXMucGxheWVyLm1lZGlhOnRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lcn19XSxbe2tleTpcIm5hdGl2ZVwiLGdldDpmdW5jdGlvbigpe3JldHVybiEhKGRvY3VtZW50LmZ1bGxzY3JlZW5FbmFibGVkfHxkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZHx8ZG9jdW1lbnQubW96RnVsbFNjcmVlbkVuYWJsZWR8fGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVuYWJsZWQpfX0se2tleTpcInByZWZpeFwiLGdldDpmdW5jdGlvbigpe2lmKGwuZnVuY3Rpb24oZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pKXJldHVyblwiXCI7dmFyIGU9XCJcIjtyZXR1cm5bXCJ3ZWJraXRcIixcIm1velwiLFwibXNcIl0uc29tZShmdW5jdGlvbih0KXtyZXR1cm4hKCFsLmZ1bmN0aW9uKGRvY3VtZW50W3QrXCJFeGl0RnVsbHNjcmVlblwiXSkmJiFsLmZ1bmN0aW9uKGRvY3VtZW50W3QrXCJDYW5jZWxGdWxsU2NyZWVuXCJdKSkmJihlPXQsITApfSksZX19LHtrZXk6XCJwcm9wZXJ0eVwiLGdldDpmdW5jdGlvbigpe3JldHVyblwibW96XCI9PT10aGlzLnByZWZpeD9cIkZ1bGxTY3JlZW5cIjpcIkZ1bGxzY3JlZW5cIn19XSksZX0oKTtmdW5jdGlvbiB2ZShlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06MTtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oaSxuKXt2YXIgcz1uZXcgSW1hZ2UsYT1mdW5jdGlvbigpe2RlbGV0ZSBzLm9ubG9hZCxkZWxldGUgcy5vbmVycm9yLChzLm5hdHVyYWxXaWR0aD49dD9pOm4pKHMpfTtPYmplY3QuYXNzaWduKHMse29ubG9hZDphLG9uZXJyb3I6YSxzcmM6ZX0pfSl9dmFyIGJlPXthZGRTdHlsZUhvb2s6ZnVuY3Rpb24oKXtNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLnNlbGVjdG9ycy5jb250YWluZXIucmVwbGFjZShcIi5cIixcIlwiKSwhMCksTSh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcix0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnVpU3VwcG9ydGVkLHRoaXMuc3VwcG9ydGVkLnVpKX0sdG9nZ2xlTmF0aXZlQ29udHJvbHM6ZnVuY3Rpb24oKXthcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdJiZ0aGlzLmlzSFRNTDU/dGhpcy5tZWRpYS5zZXRBdHRyaWJ1dGUoXCJjb250cm9sc1wiLFwiXCIpOnRoaXMubWVkaWEucmVtb3ZlQXR0cmlidXRlKFwiY29udHJvbHNcIil9LGJ1aWxkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZih0aGlzLmxpc3RlbmVycy5tZWRpYSgpLCF0aGlzLnN1cHBvcnRlZC51aSlyZXR1cm4gdGhpcy5kZWJ1Zy53YXJuKFwiQmFzaWMgc3VwcG9ydCBvbmx5IGZvciBcIit0aGlzLnByb3ZpZGVyK1wiIFwiK3RoaXMudHlwZSksdm9pZCBiZS50b2dnbGVOYXRpdmVDb250cm9scy5jYWxsKHRoaXMsITApO2wuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmNvbnRyb2xzKXx8KG9lLmluamVjdC5jYWxsKHRoaXMpLHRoaXMubGlzdGVuZXJzLmNvbnRyb2xzKCkpLGJlLnRvZ2dsZU5hdGl2ZUNvbnRyb2xzLmNhbGwodGhpcyksdGhpcy5pc0hUTUw1JiZjZS5zZXR1cC5jYWxsKHRoaXMpLHRoaXMudm9sdW1lPW51bGwsdGhpcy5tdXRlZD1udWxsLHRoaXMuc3BlZWQ9bnVsbCx0aGlzLmxvb3A9bnVsbCx0aGlzLnF1YWxpdHk9bnVsbCxvZS51cGRhdGVWb2x1bWUuY2FsbCh0aGlzKSxvZS50aW1lVXBkYXRlLmNhbGwodGhpcyksYmUuY2hlY2tQbGF5aW5nLmNhbGwodGhpcyksTSh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcix0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnBpcC5zdXBwb3J0ZWQsRi5waXAmJnRoaXMuaXNIVE1MNSYmdGhpcy5pc1ZpZGVvKSxNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuYWlycGxheS5zdXBwb3J0ZWQsRi5haXJwbGF5JiZ0aGlzLmlzSFRNTDUpLE0odGhpcy5lbGVtZW50cy5jb250YWluZXIsdGhpcy5jb25maWcuY2xhc3NOYW1lcy5pc0lvcyxWLmlzSW9zKSxNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuaXNUb3VjaCx0aGlzLnRvdWNoKSx0aGlzLnJlYWR5PSEwLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtmLmNhbGwoZSxlLm1lZGlhLFwicmVhZHlcIil9LDApLGJlLnNldFRpdGxlLmNhbGwodGhpcyksdGhpcy5wb3N0ZXImJmJlLnNldFBvc3Rlci5jYWxsKHRoaXMsdGhpcy5wb3N0ZXIsITEpLmNhdGNoKGZ1bmN0aW9uKCl7fSksdGhpcy5jb25maWcuZHVyYXRpb24mJm9lLmR1cmF0aW9uVXBkYXRlLmNhbGwodGhpcyl9LHNldFRpdGxlOmZ1bmN0aW9uKCl7dmFyIGU9WChcInBsYXlcIix0aGlzLmNvbmZpZyk7aWYobC5zdHJpbmcodGhpcy5jb25maWcudGl0bGUpJiYhbC5lbXB0eSh0aGlzLmNvbmZpZy50aXRsZSkmJihlKz1cIiwgXCIrdGhpcy5jb25maWcudGl0bGUpLEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5idXR0b25zLnBsYXl8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3Quc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLGUpfSksdGhpcy5pc0VtYmVkKXt2YXIgdD1fLmNhbGwodGhpcyxcImlmcmFtZVwiKTtpZighbC5lbGVtZW50KHQpKXJldHVybjt2YXIgaT1sLmVtcHR5KHRoaXMuY29uZmlnLnRpdGxlKT9cInZpZGVvXCI6dGhpcy5jb25maWcudGl0bGUsbj1YKFwiZnJhbWVUaXRsZVwiLHRoaXMuY29uZmlnKTt0LnNldEF0dHJpYnV0ZShcInRpdGxlXCIsbi5yZXBsYWNlKFwie3RpdGxlfVwiLGkpKX19LHRvZ2dsZVBvc3RlcjpmdW5jdGlvbihlKXtNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMucG9zdGVyRW5hYmxlZCxlKX0sc2V0UG9zdGVyOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiYhYXJndW1lbnRzWzFdfHwhdGhpcy5wb3N0ZXI/KHRoaXMubWVkaWEuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsZSksZnVuY3Rpb24oKXt2YXIgZT10aGlzO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbih0KXtyZXR1cm4gZS5yZWFkeT9zZXRUaW1lb3V0KHQsMCk6ZC5jYWxsKGUsZS5lbGVtZW50cy5jb250YWluZXIsXCJyZWFkeVwiLHQpfSkudGhlbihmdW5jdGlvbigpe30pfS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gdmUoZSl9KS5jYXRjaChmdW5jdGlvbihpKXt0aHJvdyBlPT09dC5wb3N0ZXImJmJlLnRvZ2dsZVBvc3Rlci5jYWxsKHQsITEpLGl9KS50aGVuKGZ1bmN0aW9uKCl7aWYoZSE9PXQucG9zdGVyKXRocm93IG5ldyBFcnJvcihcInNldFBvc3RlciBjYW5jZWxsZWQgYnkgbGF0ZXIgY2FsbCB0byBzZXRQb3N0ZXJcIil9KS50aGVuKGZ1bmN0aW9uKCl7cmV0dXJuIE9iamVjdC5hc3NpZ24odC5lbGVtZW50cy5wb3N0ZXIuc3R5bGUse2JhY2tncm91bmRJbWFnZTpcInVybCgnXCIrZStcIicpXCIsYmFja2dyb3VuZFNpemU6XCJcIn0pLGJlLnRvZ2dsZVBvc3Rlci5jYWxsKHQsITApLGV9KSk6UHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiUG9zdGVyIGFscmVhZHkgc2V0XCIpKX0sY2hlY2tQbGF5aW5nOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7TSh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcix0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnBsYXlpbmcsdGhpcy5wbGF5aW5nKSxNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMucGF1c2VkLHRoaXMucGF1c2VkKSxNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuc3RvcHBlZCx0aGlzLnN0b3BwZWQpLEFycmF5LmZyb20odGhpcy5lbGVtZW50cy5idXR0b25zLnBsYXl8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UucHJlc3NlZD10LnBsYXlpbmd9KSxsLmV2ZW50KGUpJiZcInRpbWV1cGRhdGVcIj09PWUudHlwZXx8YmUudG9nZ2xlQ29udHJvbHMuY2FsbCh0aGlzKX0sY2hlY2tMb2FkaW5nOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7dGhpcy5sb2FkaW5nPVtcInN0YWxsZWRcIixcIndhaXRpbmdcIl0uaW5jbHVkZXMoZS50eXBlKSxjbGVhclRpbWVvdXQodGhpcy50aW1lcnMubG9hZGluZyksdGhpcy50aW1lcnMubG9hZGluZz1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7TSh0LmVsZW1lbnRzLmNvbnRhaW5lcix0LmNvbmZpZy5jbGFzc05hbWVzLmxvYWRpbmcsdC5sb2FkaW5nKSxiZS50b2dnbGVDb250cm9scy5jYWxsKHQpfSx0aGlzLmxvYWRpbmc/MjUwOjApfSx0b2dnbGVDb250cm9sczpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmVsZW1lbnRzLmNvbnRyb2xzO3QmJnRoaXMuY29uZmlnLmhpZGVDb250cm9scyYmdGhpcy50b2dnbGVDb250cm9scyhCb29sZWFuKGV8fHRoaXMubG9hZGluZ3x8dGhpcy5wYXVzZWR8fHQucHJlc3NlZHx8dC5ob3ZlcikpfX0sa2U9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpe20odGhpcyxlKSx0aGlzLnBsYXllcj10LHRoaXMubGFzdEtleT1udWxsLHRoaXMuZm9jdXNUaW1lcj1udWxsLHRoaXMubGFzdEtleURvd249bnVsbCx0aGlzLmhhbmRsZUtleT10aGlzLmhhbmRsZUtleS5iaW5kKHRoaXMpLHRoaXMudG9nZ2xlTWVudT10aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKSx0aGlzLnNldFRhYkZvY3VzPXRoaXMuc2V0VGFiRm9jdXMuYmluZCh0aGlzKSx0aGlzLmZpcnN0VG91Y2g9dGhpcy5maXJzdFRvdWNoLmJpbmQodGhpcyl9cmV0dXJuIGcoZSxbe2tleTpcImhhbmRsZUtleVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMucGxheWVyLGk9dC5lbGVtZW50cyxuPWUua2V5Q29kZT9lLmtleUNvZGU6ZS53aGljaCxzPVwia2V5ZG93blwiPT09ZS50eXBlLGE9cyYmbj09PXRoaXMubGFzdEtleTtpZighKGUuYWx0S2V5fHxlLmN0cmxLZXl8fGUubWV0YUtleXx8ZS5zaGlmdEtleSkmJmwubnVtYmVyKG4pKXtpZihzKXt2YXIgbz1kb2N1bWVudC5hY3RpdmVFbGVtZW50O2lmKGwuZWxlbWVudChvKSl7dmFyIHI9dC5jb25maWcuc2VsZWN0b3JzLmVkaXRhYmxlO2lmKG8hPT1pLmlucHV0cy5zZWVrJiZMKG8scikpcmV0dXJuO2lmKDMyPT09ZS53aGljaCYmTChvLCdidXR0b24sIFtyb2xlXj1cIm1lbnVpdGVtXCJdJykpcmV0dXJufXN3aXRjaChbMzIsMzcsMzgsMzksNDAsNDgsNDksNTAsNTEsNTIsNTMsNTQsNTYsNTcsNjcsNzAsNzMsNzUsNzYsNzcsNzldLmluY2x1ZGVzKG4pJiYoZS5wcmV2ZW50RGVmYXVsdCgpLGUuc3RvcFByb3BhZ2F0aW9uKCkpLG4pe2Nhc2UgNDg6Y2FzZSA0OTpjYXNlIDUwOmNhc2UgNTE6Y2FzZSA1MjpjYXNlIDUzOmNhc2UgNTQ6Y2FzZSA1NTpjYXNlIDU2OmNhc2UgNTc6YXx8KHQuY3VycmVudFRpbWU9dC5kdXJhdGlvbi8xMCoobi00OCkpO2JyZWFrO2Nhc2UgMzI6Y2FzZSA3NTphfHx0LnRvZ2dsZVBsYXkoKTticmVhaztjYXNlIDM4OnQuaW5jcmVhc2VWb2x1bWUoLjEpO2JyZWFrO2Nhc2UgNDA6dC5kZWNyZWFzZVZvbHVtZSguMSk7YnJlYWs7Y2FzZSA3NzphfHwodC5tdXRlZD0hdC5tdXRlZCk7YnJlYWs7Y2FzZSAzOTp0LmZvcndhcmQoKTticmVhaztjYXNlIDM3OnQucmV3aW5kKCk7YnJlYWs7Y2FzZSA3MDp0LmZ1bGxzY3JlZW4udG9nZ2xlKCk7YnJlYWs7Y2FzZSA2NzphfHx0LnRvZ2dsZUNhcHRpb25zKCk7YnJlYWs7Y2FzZSA3Njp0Lmxvb3A9IXQubG9vcH0hdC5mdWxsc2NyZWVuLmVuYWJsZWQmJnQuZnVsbHNjcmVlbi5hY3RpdmUmJjI3PT09biYmdC5mdWxsc2NyZWVuLnRvZ2dsZSgpLHRoaXMubGFzdEtleT1ufWVsc2UgdGhpcy5sYXN0S2V5PW51bGx9fX0se2tleTpcInRvZ2dsZU1lbnVcIix2YWx1ZTpmdW5jdGlvbihlKXtvZS50b2dnbGVNZW51LmNhbGwodGhpcy5wbGF5ZXIsZSl9fSx7a2V5OlwiZmlyc3RUb3VjaFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wbGF5ZXIsdD1lLmVsZW1lbnRzO2UudG91Y2g9ITAsTSh0LmNvbnRhaW5lcixlLmNvbmZpZy5jbGFzc05hbWVzLmlzVG91Y2gsITApfX0se2tleTpcInNldFRhYkZvY3VzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5wbGF5ZXIsaT10LmVsZW1lbnRzO2lmKGNsZWFyVGltZW91dCh0aGlzLmZvY3VzVGltZXIpLFwia2V5ZG93blwiIT09ZS50eXBlfHw5PT09ZS53aGljaCl7XCJrZXlkb3duXCI9PT1lLnR5cGUmJih0aGlzLmxhc3RLZXlEb3duPWUudGltZVN0YW1wKTt2YXIgbixzPWUudGltZVN0YW1wLXRoaXMubGFzdEtleURvd248PTIwO2lmKFwiZm9jdXNcIiE9PWUudHlwZXx8cyluPXQuY29uZmlnLmNsYXNzTmFtZXMudGFiRm9jdXMsTSh4LmNhbGwodCxcIi5cIituKSxuLCExKSx0aGlzLmZvY3VzVGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7aS5jb250YWluZXIuY29udGFpbnMoZSkmJk0oZG9jdW1lbnQuYWN0aXZlRWxlbWVudCx0LmNvbmZpZy5jbGFzc05hbWVzLnRhYkZvY3VzLCEwKX0sMTApfX19LHtrZXk6XCJnbG9iYWxcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPSEoYXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0pfHxhcmd1bWVudHNbMF0sdD10aGlzLnBsYXllcjt0LmNvbmZpZy5rZXlib2FyZC5nbG9iYWwmJnUuY2FsbCh0LHdpbmRvdyxcImtleWRvd24ga2V5dXBcIix0aGlzLmhhbmRsZUtleSxlLCExKSx1LmNhbGwodCxkb2N1bWVudC5ib2R5LFwiY2xpY2tcIix0aGlzLnRvZ2dsZU1lbnUsZSkscC5jYWxsKHQsZG9jdW1lbnQuYm9keSxcInRvdWNoc3RhcnRcIix0aGlzLmZpcnN0VG91Y2gpLHUuY2FsbCh0LGRvY3VtZW50LmJvZHksXCJrZXlkb3duIGZvY3VzIGJsdXJcIix0aGlzLnNldFRhYkZvY3VzLGUsITEsITApfX0se2tleTpcImNvbnRhaW5lclwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wbGF5ZXIsdD1lLmVsZW1lbnRzOyFlLmNvbmZpZy5rZXlib2FyZC5nbG9iYWwmJmUuY29uZmlnLmtleWJvYXJkLmZvY3VzZWQmJmQuY2FsbChlLHQuY29udGFpbmVyLFwia2V5ZG93biBrZXl1cFwiLHRoaXMuaGFuZGxlS2V5LCExKSxkLmNhbGwoZSx0LmNvbnRhaW5lcixcIm1vdXNlbW92ZSBtb3VzZWxlYXZlIHRvdWNoc3RhcnQgdG91Y2htb3ZlIGVudGVyZnVsbHNjcmVlbiBleGl0ZnVsbHNjcmVlblwiLGZ1bmN0aW9uKGkpe3ZhciBuPXQuY29udHJvbHM7biYmXCJlbnRlcmZ1bGxzY3JlZW5cIj09PWkudHlwZSYmKG4ucHJlc3NlZD0hMSxuLmhvdmVyPSExKTt2YXIgcz0wO1tcInRvdWNoc3RhcnRcIixcInRvdWNobW92ZVwiLFwibW91c2Vtb3ZlXCJdLmluY2x1ZGVzKGkudHlwZSkmJihiZS50b2dnbGVDb250cm9scy5jYWxsKGUsITApLHM9ZS50b3VjaD8zZTM6MmUzKSxjbGVhclRpbWVvdXQoZS50aW1lcnMuY29udHJvbHMpLGUudGltZXJzLmNvbnRyb2xzPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gYmUudG9nZ2xlQ29udHJvbHMuY2FsbChlLCExKX0scyl9KX19LHtrZXk6XCJtZWRpYVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5wbGF5ZXIsdD1lLmVsZW1lbnRzO2lmKGQuY2FsbChlLGUubWVkaWEsXCJ0aW1ldXBkYXRlIHNlZWtpbmcgc2Vla2VkXCIsZnVuY3Rpb24odCl7cmV0dXJuIG9lLnRpbWVVcGRhdGUuY2FsbChlLHQpfSksZC5jYWxsKGUsZS5tZWRpYSxcImR1cmF0aW9uY2hhbmdlIGxvYWRlZGRhdGEgbG9hZGVkbWV0YWRhdGFcIixmdW5jdGlvbih0KXtyZXR1cm4gb2UuZHVyYXRpb25VcGRhdGUuY2FsbChlLHQpfSksZC5jYWxsKGUsZS5tZWRpYSxcImNhbnBsYXlcIixmdW5jdGlvbigpe1ModC52b2x1bWUsIWUuaGFzQXVkaW8pLFModC5idXR0b25zLm11dGUsIWUuaGFzQXVkaW8pfSksZC5jYWxsKGUsZS5tZWRpYSxcImVuZGVkXCIsZnVuY3Rpb24oKXtlLmlzSFRNTDUmJmUuaXNWaWRlbyYmZS5jb25maWcucmVzZXRPbkVuZCYmZS5yZXN0YXJ0KCl9KSxkLmNhbGwoZSxlLm1lZGlhLFwicHJvZ3Jlc3MgcGxheWluZyBzZWVraW5nIHNlZWtlZFwiLGZ1bmN0aW9uKHQpe3JldHVybiBvZS51cGRhdGVQcm9ncmVzcy5jYWxsKGUsdCl9KSxkLmNhbGwoZSxlLm1lZGlhLFwidm9sdW1lY2hhbmdlXCIsZnVuY3Rpb24odCl7cmV0dXJuIG9lLnVwZGF0ZVZvbHVtZS5jYWxsKGUsdCl9KSxkLmNhbGwoZSxlLm1lZGlhLFwicGxheWluZyBwbGF5IHBhdXNlIGVuZGVkIGVtcHRpZWQgdGltZXVwZGF0ZVwiLGZ1bmN0aW9uKHQpe3JldHVybiBiZS5jaGVja1BsYXlpbmcuY2FsbChlLHQpfSksZC5jYWxsKGUsZS5tZWRpYSxcIndhaXRpbmcgY2FucGxheSBzZWVrZWQgcGxheWluZ1wiLGZ1bmN0aW9uKHQpe3JldHVybiBiZS5jaGVja0xvYWRpbmcuY2FsbChlLHQpfSksZC5jYWxsKGUsZS5tZWRpYSxcInBsYXlpbmdcIixmdW5jdGlvbigpe2UuYWRzJiZlLmFkcy5lbmFibGVkJiYhZS5hZHMuaW5pdGlhbGl6ZWQmJmUuYWRzLm1hbmFnZXJQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gZS5hZHMucGxheSgpfSkuY2F0Y2goZnVuY3Rpb24oKXtyZXR1cm4gZS5wbGF5KCl9KX0pLGUuc3VwcG9ydGVkLnVpJiZlLmNvbmZpZy5jbGlja1RvUGxheSYmIWUuaXNBdWRpbyl7dmFyIGk9Xy5jYWxsKGUsXCIuXCIrZS5jb25maWcuY2xhc3NOYW1lcy52aWRlbyk7aWYoIWwuZWxlbWVudChpKSlyZXR1cm47ZC5jYWxsKGUsdC5jb250YWluZXIsXCJjbGljayB0b3VjaHN0YXJ0XCIsZnVuY3Rpb24obil7KFt0LmNvbnRhaW5lcixpXS5pbmNsdWRlcyhuLnRhcmdldCl8fGkuY29udGFpbnMobi50YXJnZXQpKSYmKGUuY29uZmlnLmhpZGVDb250cm9scyYmZS50b3VjaCYmTih0LmNvbnRhaW5lcixlLmNvbmZpZy5jbGFzc05hbWVzLmhpZGVDb250cm9scyl8fChlLmVuZGVkPyhlLnJlc3RhcnQoKSxlLnBsYXkoKSk6ZS50b2dnbGVQbGF5KCkpKX0pfWUuc3VwcG9ydGVkLnVpJiZlLmNvbmZpZy5kaXNhYmxlQ29udGV4dE1lbnUmJmQuY2FsbChlLHQud3JhcHBlcixcImNvbnRleHRtZW51XCIsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpfSwhMSksZC5jYWxsKGUsZS5tZWRpYSxcInZvbHVtZWNoYW5nZVwiLGZ1bmN0aW9uKCl7ZS5zdG9yYWdlLnNldCh7dm9sdW1lOmUudm9sdW1lLG11dGVkOmUubXV0ZWR9KX0pLGQuY2FsbChlLGUubWVkaWEsXCJyYXRlY2hhbmdlXCIsZnVuY3Rpb24oKXtvZS51cGRhdGVTZXR0aW5nLmNhbGwoZSxcInNwZWVkXCIpLGUuc3RvcmFnZS5zZXQoe3NwZWVkOmUuc3BlZWR9KX0pLGQuY2FsbChlLGUubWVkaWEsXCJxdWFsaXR5Y2hhbmdlXCIsZnVuY3Rpb24odCl7b2UudXBkYXRlU2V0dGluZy5jYWxsKGUsXCJxdWFsaXR5XCIsbnVsbCx0LmRldGFpbC5xdWFsaXR5KX0pO3ZhciBuPWUuY29uZmlnLmV2ZW50cy5jb25jYXQoW1wia2V5dXBcIixcImtleWRvd25cIl0pLmpvaW4oXCIgXCIpO2QuY2FsbChlLGUubWVkaWEsbixmdW5jdGlvbihpKXt2YXIgbj1pLmRldGFpbCxzPXZvaWQgMD09PW4/e306bjtcImVycm9yXCI9PT1pLnR5cGUmJihzPWUubWVkaWEuZXJyb3IpLGYuY2FsbChlLHQuY29udGFpbmVyLGkudHlwZSwhMCxzKX0pfX0se2tleTpcInByb3h5XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LGkpe3ZhciBuPXRoaXMucGxheWVyLHM9bi5jb25maWcubGlzdGVuZXJzW2ldLGE9ITA7bC5mdW5jdGlvbihzKSYmKGE9cy5jYWxsKG4sZSkpLGEmJmwuZnVuY3Rpb24odCkmJnQuY2FsbChuLGUpfX0se2tleTpcImJpbmRcIix2YWx1ZTpmdW5jdGlvbihlLHQsaSxuKXt2YXIgcz10aGlzLGE9IShhcmd1bWVudHMubGVuZ3RoPjQmJnZvaWQgMCE9PWFyZ3VtZW50c1s0XSl8fGFyZ3VtZW50c1s0XSxvPXRoaXMucGxheWVyLHI9by5jb25maWcubGlzdGVuZXJzW25dLGM9bC5mdW5jdGlvbihyKTtkLmNhbGwobyxlLHQsZnVuY3Rpb24oZSl7cmV0dXJuIHMucHJveHkoZSxpLG4pfSxhJiYhYyl9fSx7a2V5OlwiY29udHJvbHNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD10aGlzLnBsYXllcixpPXQuZWxlbWVudHMsbj1WLmlzSUU/XCJjaGFuZ2VcIjpcImlucHV0XCI7aWYoaS5idXR0b25zLnBsYXkmJkFycmF5LmZyb20oaS5idXR0b25zLnBsYXkpLmZvckVhY2goZnVuY3Rpb24oaSl7ZS5iaW5kKGksXCJjbGlja1wiLHQudG9nZ2xlUGxheSxcInBsYXlcIil9KSx0aGlzLmJpbmQoaS5idXR0b25zLnJlc3RhcnQsXCJjbGlja1wiLHQucmVzdGFydCxcInJlc3RhcnRcIiksdGhpcy5iaW5kKGkuYnV0dG9ucy5yZXdpbmQsXCJjbGlja1wiLHQucmV3aW5kLFwicmV3aW5kXCIpLHRoaXMuYmluZChpLmJ1dHRvbnMuZmFzdEZvcndhcmQsXCJjbGlja1wiLHQuZm9yd2FyZCxcImZhc3RGb3J3YXJkXCIpLHRoaXMuYmluZChpLmJ1dHRvbnMubXV0ZSxcImNsaWNrXCIsZnVuY3Rpb24oKXt0Lm11dGVkPSF0Lm11dGVkfSxcIm11dGVcIiksdGhpcy5iaW5kKGkuYnV0dG9ucy5jYXB0aW9ucyxcImNsaWNrXCIsZnVuY3Rpb24oKXtyZXR1cm4gdC50b2dnbGVDYXB0aW9ucygpfSksdGhpcy5iaW5kKGkuYnV0dG9ucy5mdWxsc2NyZWVuLFwiY2xpY2tcIixmdW5jdGlvbigpe3QuZnVsbHNjcmVlbi50b2dnbGUoKX0sXCJmdWxsc2NyZWVuXCIpLHRoaXMuYmluZChpLmJ1dHRvbnMucGlwLFwiY2xpY2tcIixmdW5jdGlvbigpe3QucGlwPVwidG9nZ2xlXCJ9LFwicGlwXCIpLHRoaXMuYmluZChpLmJ1dHRvbnMuYWlycGxheSxcImNsaWNrXCIsdC5haXJwbGF5LFwiYWlycGxheVwiKSx0aGlzLmJpbmQoaS5idXR0b25zLnNldHRpbmdzLFwiY2xpY2tcIixmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpLG9lLnRvZ2dsZU1lbnUuY2FsbCh0LGUpfSksdGhpcy5iaW5kKGkuYnV0dG9ucy5zZXR0aW5ncyxcImtleXVwXCIsZnVuY3Rpb24oZSl7dmFyIGk9ZS53aGljaDtbMTMsMzJdLmluY2x1ZGVzKGkpJiYoMTMhPT1pPyhlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSxvZS50b2dnbGVNZW51LmNhbGwodCxlKSk6b2UuZm9jdXNGaXJzdE1lbnVJdGVtLmNhbGwodCxudWxsLCEwKSl9LG51bGwsITEpLHRoaXMuYmluZChpLnNldHRpbmdzLm1lbnUsXCJrZXlkb3duXCIsZnVuY3Rpb24oZSl7Mjc9PT1lLndoaWNoJiZvZS50b2dnbGVNZW51LmNhbGwodCxlKX0pLHRoaXMuYmluZChpLmlucHV0cy5zZWVrLFwibW91c2Vkb3duIG1vdXNlbW92ZVwiLGZ1bmN0aW9uKGUpe3ZhciB0PWkucHJvZ3Jlc3MuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj0xMDAvdC53aWR0aCooZS5wYWdlWC10LmxlZnQpO2UuY3VycmVudFRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzZWVrLXZhbHVlXCIsbil9KSx0aGlzLmJpbmQoaS5pbnB1dHMuc2VlayxcIm1vdXNlZG93biBtb3VzZXVwIGtleWRvd24ga2V5dXAgdG91Y2hzdGFydCB0b3VjaGVuZFwiLGZ1bmN0aW9uKGUpe3ZhciBpPWUuY3VycmVudFRhcmdldCxuPWUua2V5Q29kZT9lLmtleUNvZGU6ZS53aGljaDtpZighbC5rZXlib2FyZEV2ZW50KGUpfHwzOT09PW58fDM3PT09bil7dmFyIHM9aS5oYXNBdHRyaWJ1dGUoXCJwbGF5LW9uLXNlZWtlZFwiKSxhPVtcIm1vdXNldXBcIixcInRvdWNoZW5kXCIsXCJrZXl1cFwiXS5pbmNsdWRlcyhlLnR5cGUpO3MmJmE/KGkucmVtb3ZlQXR0cmlidXRlKFwicGxheS1vbi1zZWVrZWRcIiksdC5wbGF5KCkpOiFhJiZ0LnBsYXlpbmcmJihpLnNldEF0dHJpYnV0ZShcInBsYXktb24tc2Vla2VkXCIsXCJcIiksdC5wYXVzZSgpKX19KSxWLmlzSW9zKXt2YXIgcz14LmNhbGwodCwnaW5wdXRbdHlwZT1cInJhbmdlXCJdJyk7QXJyYXkuZnJvbShzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLmJpbmQodCxuLGZ1bmN0aW9uKGUpe3JldHVybiBCKGUudGFyZ2V0KX0pfSl9dGhpcy5iaW5kKGkuaW5wdXRzLnNlZWssbixmdW5jdGlvbihlKXt2YXIgaT1lLmN1cnJlbnRUYXJnZXQsbj1pLmdldEF0dHJpYnV0ZShcInNlZWstdmFsdWVcIik7bC5lbXB0eShuKSYmKG49aS52YWx1ZSksaS5yZW1vdmVBdHRyaWJ1dGUoXCJzZWVrLXZhbHVlXCIpLHQuY3VycmVudFRpbWU9bi9pLm1heCp0LmR1cmF0aW9ufSxcInNlZWtcIiksdGhpcy5iaW5kKGkucHJvZ3Jlc3MsXCJtb3VzZWVudGVyIG1vdXNlbGVhdmUgbW91c2Vtb3ZlXCIsZnVuY3Rpb24oZSl7cmV0dXJuIG9lLnVwZGF0ZVNlZWtUb29sdGlwLmNhbGwodCxlKX0pLFYuaXNXZWJraXQmJkFycmF5LmZyb20oeC5jYWxsKHQsJ2lucHV0W3R5cGU9XCJyYW5nZVwiXScpKS5mb3JFYWNoKGZ1bmN0aW9uKGkpe2UuYmluZChpLFwiaW5wdXRcIixmdW5jdGlvbihlKXtyZXR1cm4gb2UudXBkYXRlUmFuZ2VGaWxsLmNhbGwodCxlLnRhcmdldCl9KX0pLHQuY29uZmlnLnRvZ2dsZUludmVydCYmIWwuZWxlbWVudChpLmRpc3BsYXkuZHVyYXRpb24pJiZ0aGlzLmJpbmQoaS5kaXNwbGF5LmN1cnJlbnRUaW1lLFwiY2xpY2tcIixmdW5jdGlvbigpezAhPT10LmN1cnJlbnRUaW1lJiYodC5jb25maWcuaW52ZXJ0VGltZT0hdC5jb25maWcuaW52ZXJ0VGltZSxvZS50aW1lVXBkYXRlLmNhbGwodCkpfSksdGhpcy5iaW5kKGkuaW5wdXRzLnZvbHVtZSxuLGZ1bmN0aW9uKGUpe3Qudm9sdW1lPWUudGFyZ2V0LnZhbHVlfSxcInZvbHVtZVwiKSx0aGlzLmJpbmQoaS5jb250cm9scyxcIm1vdXNlZW50ZXIgbW91c2VsZWF2ZVwiLGZ1bmN0aW9uKGUpe2kuY29udHJvbHMuaG92ZXI9IXQudG91Y2gmJlwibW91c2VlbnRlclwiPT09ZS50eXBlfSksdGhpcy5iaW5kKGkuY29udHJvbHMsXCJtb3VzZWRvd24gbW91c2V1cCB0b3VjaHN0YXJ0IHRvdWNoZW5kIHRvdWNoY2FuY2VsXCIsZnVuY3Rpb24oZSl7aS5jb250cm9scy5wcmVzc2VkPVtcIm1vdXNlZG93blwiLFwidG91Y2hzdGFydFwiXS5pbmNsdWRlcyhlLnR5cGUpfSksdGhpcy5iaW5kKGkuY29udHJvbHMsXCJmb2N1c2luIGZvY3Vzb3V0XCIsZnVuY3Rpb24oaSl7dmFyIG49dC5jb25maWcscz10LmVsZW1lbnRzLGE9dC50aW1lcnMsbz1cImZvY3VzaW5cIj09PWkudHlwZTtpZihNKHMuY29udHJvbHMsbi5jbGFzc05hbWVzLm5vVHJhbnNpdGlvbixvKSxiZS50b2dnbGVDb250cm9scy5jYWxsKHQsbyksbyl7c2V0VGltZW91dChmdW5jdGlvbigpe00ocy5jb250cm9scyxuLmNsYXNzTmFtZXMubm9UcmFuc2l0aW9uLCExKX0sMCk7dmFyIHI9ZS50b3VjaD8zZTM6NGUzO2NsZWFyVGltZW91dChhLmNvbnRyb2xzKSxhLmNvbnRyb2xzPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gYmUudG9nZ2xlQ29udHJvbHMuY2FsbCh0LCExKX0scil9fSksdGhpcy5iaW5kKGkuaW5wdXRzLnZvbHVtZSxcIndoZWVsXCIsZnVuY3Rpb24oZSl7dmFyIGk9ZS53ZWJraXREaXJlY3Rpb25JbnZlcnRlZEZyb21EZXZpY2Usbj1bZS5kZWx0YVgsLWUuZGVsdGFZXS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGk/LWU6ZX0pLHM9dihuLDIpLGE9c1swXSxvPXNbMV0scj1NYXRoLnNpZ24oTWF0aC5hYnMoYSk+TWF0aC5hYnMobyk/YTpvKTt0LmluY3JlYXNlVm9sdW1lKHIvNTApO3ZhciBsPXQubWVkaWEudm9sdW1lOygxPT09ciYmbDwxfHwtMT09PXImJmw+MCkmJmUucHJldmVudERlZmF1bHQoKX0sXCJ2b2x1bWVcIiwhMSl9fV0pLGV9KCk7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGY7dmFyIHdlLFRlPShmdW5jdGlvbihlLHQpe3ZhciBpO2k9ZnVuY3Rpb24oKXt2YXIgZT1mdW5jdGlvbigpe30sdD17fSxpPXt9LG49e307ZnVuY3Rpb24gcyhlLHQpe2lmKGUpe3ZhciBzPW5bZV07aWYoaVtlXT10LHMpZm9yKDtzLmxlbmd0aDspc1swXShlLHQpLHMuc3BsaWNlKDAsMSl9fWZ1bmN0aW9uIGEodCxpKXt0LmNhbGwmJih0PXtzdWNjZXNzOnR9KSxpLmxlbmd0aD8odC5lcnJvcnx8ZSkoaSk6KHQuc3VjY2Vzc3x8ZSkodCl9ZnVuY3Rpb24gbyh0LGksbixzKXt2YXIgYSxyLGw9ZG9jdW1lbnQsYz1uLmFzeW5jLHU9KG4ubnVtUmV0cmllc3x8MCkrMSxkPW4uYmVmb3JlfHxlLGg9dC5yZXBsYWNlKC9eKGNzc3xpbWcpIS8sXCJcIik7cz1zfHwwLC8oXmNzcyF8XFwuY3NzJCkvLnRlc3QodCk/KGE9ITAsKHI9bC5jcmVhdGVFbGVtZW50KFwibGlua1wiKSkucmVsPVwic3R5bGVzaGVldFwiLHIuaHJlZj1oKTovKF5pbWchfFxcLihwbmd8Z2lmfGpwZ3xzdmcpJCkvLnRlc3QodCk/KHI9bC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpKS5zcmM9aDooKHI9bC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKS5zcmM9dCxyLmFzeW5jPXZvaWQgMD09PWN8fGMpLHIub25sb2FkPXIub25lcnJvcj1yLm9uYmVmb3JlbG9hZD1mdW5jdGlvbihlKXt2YXIgbD1lLnR5cGVbMF07aWYoYSYmXCJoaWRlRm9jdXNcImluIHIpdHJ5e3Iuc2hlZXQuY3NzVGV4dC5sZW5ndGh8fChsPVwiZVwiKX1jYXRjaChlKXtsPVwiZVwifWlmKFwiZVwiPT1sJiYocys9MSk8dSlyZXR1cm4gbyh0LGksbixzKTtpKHQsbCxlLmRlZmF1bHRQcmV2ZW50ZWQpfSwhMSE9PWQodCxyKSYmbC5oZWFkLmFwcGVuZENoaWxkKHIpfWZ1bmN0aW9uIHIoZSxpLG4pe3ZhciByLGw7aWYoaSYmaS50cmltJiYocj1pKSxsPShyP246aSl8fHt9LHIpe2lmKHIgaW4gdCl0aHJvd1wiTG9hZEpTXCI7dFtyXT0hMH0hZnVuY3Rpb24oZSx0LGkpe3ZhciBuLHMsYT0oZT1lLnB1c2g/ZTpbZV0pLmxlbmd0aCxyPWEsbD1bXTtmb3Iobj1mdW5jdGlvbihlLGksbil7aWYoXCJlXCI9PWkmJmwucHVzaChlKSxcImJcIj09aSl7aWYoIW4pcmV0dXJuO2wucHVzaChlKX0tLWF8fHQobCl9LHM9MDtzPHI7cysrKW8oZVtzXSxuLGkpfShlLGZ1bmN0aW9uKGUpe2EobCxlKSxzKHIsZSl9LGwpfXJldHVybiByLnJlYWR5PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKGUsdCl7ZT1lLnB1c2g/ZTpbZV07dmFyIHMsYSxvLHI9W10sbD1lLmxlbmd0aCxjPWw7Zm9yKHM9ZnVuY3Rpb24oZSxpKXtpLmxlbmd0aCYmci5wdXNoKGUpLC0tY3x8dChyKX07bC0tOylhPWVbbF0sKG89aVthXSk/cyhhLG8pOihuW2FdPW5bYV18fFtdKS5wdXNoKHMpfShlLGZ1bmN0aW9uKGUpe2EodCxlKX0pLHJ9LHIuZG9uZT1mdW5jdGlvbihlKXtzKGUsW10pfSxyLnJlc2V0PWZ1bmN0aW9uKCl7dD17fSxpPXt9LG49e319LHIuaXNEZWZpbmVkPWZ1bmN0aW9uKGUpe3JldHVybiBlIGluIHR9LHJ9LGUuZXhwb3J0cz1pKCl9KHdlPXtleHBvcnRzOnt9fSx3ZS5leHBvcnRzKSx3ZS5leHBvcnRzKTtmdW5jdGlvbiBBZShlKXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24odCxpKXtUZShlLHtzdWNjZXNzOnQsZXJyb3I6aX0pfSl9ZnVuY3Rpb24gRWUoZSl7ZSYmIXRoaXMuZW1iZWQuaGFzUGxheWVkJiYodGhpcy5lbWJlZC5oYXNQbGF5ZWQ9ITApLHRoaXMubWVkaWEucGF1c2VkPT09ZSYmKHRoaXMubWVkaWEucGF1c2VkPSFlLGYuY2FsbCh0aGlzLHRoaXMubWVkaWEsZT9cInBsYXlcIjpcInBhdXNlXCIpKX12YXIgQ2U9e3NldHVwOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztNKHRoaXMuZWxlbWVudHMud3JhcHBlcix0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmVtYmVkLCEwKSxDZS5zZXRBc3BlY3RSYXRpby5jYWxsKHRoaXMpLGwub2JqZWN0KHdpbmRvdy5WaW1lbyk/Q2UucmVhZHkuY2FsbCh0aGlzKTpBZSh0aGlzLmNvbmZpZy51cmxzLnZpbWVvLnNkaykudGhlbihmdW5jdGlvbigpe0NlLnJlYWR5LmNhbGwoZSl9KS5jYXRjaChmdW5jdGlvbih0KXtlLmRlYnVnLndhcm4oXCJWaW1lbyBBUEkgZmFpbGVkIHRvIGxvYWRcIix0KX0pfSxzZXRBc3BlY3RSYXRpbzpmdW5jdGlvbihlKXt2YXIgdD0obC5zdHJpbmcoZSk/ZTp0aGlzLmNvbmZpZy5yYXRpbykuc3BsaXQoXCI6XCIpLGk9dih0LDIpLG49MTAwL2lbMF0qaVsxXTtpZih0aGlzLmVsZW1lbnRzLndyYXBwZXIuc3R5bGUucGFkZGluZ0JvdHRvbT1uK1wiJVwiLHRoaXMuc3VwcG9ydGVkLnVpKXt2YXIgcz0oMjQwLW4pLzQuODt0aGlzLm1lZGlhLnN0eWxlLnRyYW5zZm9ybT1cInRyYW5zbGF0ZVkoLVwiK3MrXCIlKVwifX0scmVhZHk6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9dGhpcyxpPWxlKHtsb29wOnQuY29uZmlnLmxvb3AuYWN0aXZlLGF1dG9wbGF5OnQuYXV0b3BsYXksYnlsaW5lOiExLHBvcnRyYWl0OiExLHRpdGxlOiExLHNwZWVkOiEwLHRyYW5zcGFyZW50OjAsZ2VzdHVyZTpcIm1lZGlhXCIscGxheXNpbmxpbmU6IXRoaXMuY29uZmlnLmZ1bGxzY3JlZW4uaW9zTmF0aXZlfSksbj10Lm1lZGlhLmdldEF0dHJpYnV0ZShcInNyY1wiKTtsLmVtcHR5KG4pJiYobj10Lm1lZGlhLmdldEF0dHJpYnV0ZSh0LmNvbmZpZy5hdHRyaWJ1dGVzLmVtYmVkLmlkKSk7dmFyIHMsYT0ocz1uLGwuZW1wdHkocyk/bnVsbDpsLm51bWJlcihOdW1iZXIocykpP3M6cy5tYXRjaCgvXi4qKHZpbWVvLmNvbVxcL3x2aWRlb1xcLykoXFxkKykuKi8pP1JlZ0V4cC4kMjpzKSxvPXcoXCJpZnJhbWVcIikscj1ZKHQuY29uZmlnLnVybHMudmltZW8uaWZyYW1lLGEsaSk7by5zZXRBdHRyaWJ1dGUoXCJzcmNcIixyKSxvLnNldEF0dHJpYnV0ZShcImFsbG93ZnVsbHNjcmVlblwiLFwiXCIpLG8uc2V0QXR0cmlidXRlKFwiYWxsb3d0cmFuc3BhcmVuY3lcIixcIlwiKSxvLnNldEF0dHJpYnV0ZShcImFsbG93XCIsXCJhdXRvcGxheVwiKTt2YXIgYz13KFwiZGl2XCIse3Bvc3Rlcjp0LnBvc3RlcixjbGFzczp0LmNvbmZpZy5jbGFzc05hbWVzLmVtYmVkQ29udGFpbmVyfSk7Yy5hcHBlbmRDaGlsZChvKSx0Lm1lZGlhPUMoYyx0Lm1lZGlhKSxlZShZKHQuY29uZmlnLnVybHMudmltZW8uYXBpLGEpLFwianNvblwiKS50aGVuKGZ1bmN0aW9uKGUpe2lmKCFsLmVtcHR5KGUpKXt2YXIgaT1uZXcgVVJMKGVbMF0udGh1bWJuYWlsX2xhcmdlKTtpLnBhdGhuYW1lPWkucGF0aG5hbWUuc3BsaXQoXCJfXCIpWzBdK1wiLmpwZ1wiLGJlLnNldFBvc3Rlci5jYWxsKHQsaS5ocmVmKS5jYXRjaChmdW5jdGlvbigpe30pfX0pLHQuZW1iZWQ9bmV3IHdpbmRvdy5WaW1lby5QbGF5ZXIobyx7YXV0b3BhdXNlOnQuY29uZmlnLmF1dG9wYXVzZSxtdXRlZDp0Lm11dGVkfSksdC5tZWRpYS5wYXVzZWQ9ITAsdC5tZWRpYS5jdXJyZW50VGltZT0wLHQuc3VwcG9ydGVkLnVpJiZ0LmVtYmVkLmRpc2FibGVUZXh0VHJhY2soKSx0Lm1lZGlhLnBsYXk9ZnVuY3Rpb24oKXtyZXR1cm4gRWUuY2FsbCh0LCEwKSx0LmVtYmVkLnBsYXkoKX0sdC5tZWRpYS5wYXVzZT1mdW5jdGlvbigpe3JldHVybiBFZS5jYWxsKHQsITEpLHQuZW1iZWQucGF1c2UoKX0sdC5tZWRpYS5zdG9wPWZ1bmN0aW9uKCl7dC5wYXVzZSgpLHQuY3VycmVudFRpbWU9MH07dmFyIHU9dC5tZWRpYS5jdXJyZW50VGltZTtPYmplY3QuZGVmaW5lUHJvcGVydHkodC5tZWRpYSxcImN1cnJlbnRUaW1lXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB1fSxzZXQ6ZnVuY3Rpb24oZSl7dmFyIGk9dC5lbWJlZCxuPXQubWVkaWEscz10LnBhdXNlZCxhPXQudm9sdW1lLG89cyYmIWkuaGFzUGxheWVkO24uc2Vla2luZz0hMCxmLmNhbGwodCxuLFwic2Vla2luZ1wiKSxQcm9taXNlLnJlc29sdmUobyYmaS5zZXRWb2x1bWUoMCkpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gaS5zZXRDdXJyZW50VGltZShlKX0pLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gbyYmaS5wYXVzZSgpfSkudGhlbihmdW5jdGlvbigpe3JldHVybiBvJiZpLnNldFZvbHVtZShhKX0pLmNhdGNoKGZ1bmN0aW9uKCl7fSl9fSk7dmFyIGQ9dC5jb25maWcuc3BlZWQuc2VsZWN0ZWQ7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQubWVkaWEsXCJwbGF5YmFja1JhdGVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGR9LHNldDpmdW5jdGlvbihlKXt0LmVtYmVkLnNldFBsYXliYWNrUmF0ZShlKS50aGVuKGZ1bmN0aW9uKCl7ZD1lLGYuY2FsbCh0LHQubWVkaWEsXCJyYXRlY2hhbmdlXCIpfSkuY2F0Y2goZnVuY3Rpb24oZSl7XCJFcnJvclwiPT09ZS5uYW1lJiZvZS5zZXRTcGVlZE1lbnUuY2FsbCh0LFtdKX0pfX0pO3ZhciBoPXQuY29uZmlnLnZvbHVtZTtPYmplY3QuZGVmaW5lUHJvcGVydHkodC5tZWRpYSxcInZvbHVtZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaH0sc2V0OmZ1bmN0aW9uKGUpe3QuZW1iZWQuc2V0Vm9sdW1lKGUpLnRoZW4oZnVuY3Rpb24oKXtoPWUsZi5jYWxsKHQsdC5tZWRpYSxcInZvbHVtZWNoYW5nZVwiKX0pfX0pO3ZhciBwPXQuY29uZmlnLm11dGVkO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0Lm1lZGlhLFwibXV0ZWRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHB9LHNldDpmdW5jdGlvbihlKXt2YXIgaT0hIWwuYm9vbGVhbihlKSYmZTt0LmVtYmVkLnNldFZvbHVtZShpPzA6dC5jb25maWcudm9sdW1lKS50aGVuKGZ1bmN0aW9uKCl7cD1pLGYuY2FsbCh0LHQubWVkaWEsXCJ2b2x1bWVjaGFuZ2VcIil9KX19KTt2YXIgbT10LmNvbmZpZy5sb29wO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0Lm1lZGlhLFwibG9vcFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbX0sc2V0OmZ1bmN0aW9uKGUpe3ZhciBpPWwuYm9vbGVhbihlKT9lOnQuY29uZmlnLmxvb3AuYWN0aXZlO3QuZW1iZWQuc2V0TG9vcChpKS50aGVuKGZ1bmN0aW9uKCl7bT1pfSl9fSk7dmFyIGc9dm9pZCAwO3QuZW1iZWQuZ2V0VmlkZW9VcmwoKS50aGVuKGZ1bmN0aW9uKGUpe2c9ZX0pLmNhdGNoKGZ1bmN0aW9uKHQpe2UuZGVidWcud2Fybih0KX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0Lm1lZGlhLFwiY3VycmVudFNyY1wiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZ319KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodC5tZWRpYSxcImVuZGVkXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0LmN1cnJlbnRUaW1lPT09dC5kdXJhdGlvbn19KSxQcm9taXNlLmFsbChbdC5lbWJlZC5nZXRWaWRlb1dpZHRoKCksdC5lbWJlZC5nZXRWaWRlb0hlaWdodCgpXSkudGhlbihmdW5jdGlvbih0KXt2YXIgaT1mdW5jdGlvbihlLHQpe3ZhciBpPWZ1bmN0aW9uIGUodCxpKXtyZXR1cm4gMD09PWk/dDplKGksdCVpKX0oZSx0KTtyZXR1cm4gZS9pK1wiOlwiK3QvaX0odFswXSx0WzFdKTtDZS5zZXRBc3BlY3RSYXRpby5jYWxsKGUsaSl9KSx0LmVtYmVkLnNldEF1dG9wYXVzZSh0LmNvbmZpZy5hdXRvcGF1c2UpLnRoZW4oZnVuY3Rpb24oZSl7dC5jb25maWcuYXV0b3BhdXNlPWV9KSx0LmVtYmVkLmdldFZpZGVvVGl0bGUoKS50aGVuKGZ1bmN0aW9uKGkpe3QuY29uZmlnLnRpdGxlPWksYmUuc2V0VGl0bGUuY2FsbChlKX0pLHQuZW1iZWQuZ2V0Q3VycmVudFRpbWUoKS50aGVuKGZ1bmN0aW9uKGUpe3U9ZSxmLmNhbGwodCx0Lm1lZGlhLFwidGltZXVwZGF0ZVwiKX0pLHQuZW1iZWQuZ2V0RHVyYXRpb24oKS50aGVuKGZ1bmN0aW9uKGUpe3QubWVkaWEuZHVyYXRpb249ZSxmLmNhbGwodCx0Lm1lZGlhLFwiZHVyYXRpb25jaGFuZ2VcIil9KSx0LmVtYmVkLmdldFRleHRUcmFja3MoKS50aGVuKGZ1bmN0aW9uKGUpe3QubWVkaWEudGV4dFRyYWNrcz1lLGNlLnNldHVwLmNhbGwodCl9KSx0LmVtYmVkLm9uKFwiY3VlY2hhbmdlXCIsZnVuY3Rpb24oZSl7dmFyIGk9ZS5jdWVzLG49KHZvaWQgMD09PWk/W106aSkubWFwKGZ1bmN0aW9uKGUpe3JldHVybiB0PWUudGV4dCxpPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaS5hcHBlbmRDaGlsZChuKSxuLmlubmVySFRNTD10LGkuZmlyc3RDaGlsZC5pbm5lclRleHQ7dmFyIHQsaSxufSk7Y2UudXBkYXRlQ3Vlcy5jYWxsKHQsbil9KSx0LmVtYmVkLm9uKFwibG9hZGVkXCIsZnVuY3Rpb24oKXsodC5lbWJlZC5nZXRQYXVzZWQoKS50aGVuKGZ1bmN0aW9uKGUpe0VlLmNhbGwodCwhZSksZXx8Zi5jYWxsKHQsdC5tZWRpYSxcInBsYXlpbmdcIil9KSxsLmVsZW1lbnQodC5lbWJlZC5lbGVtZW50KSYmdC5zdXBwb3J0ZWQudWkpJiZ0LmVtYmVkLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwtMSl9KSx0LmVtYmVkLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7RWUuY2FsbCh0LCEwKSxmLmNhbGwodCx0Lm1lZGlhLFwicGxheWluZ1wiKX0pLHQuZW1iZWQub24oXCJwYXVzZVwiLGZ1bmN0aW9uKCl7RWUuY2FsbCh0LCExKX0pLHQuZW1iZWQub24oXCJ0aW1ldXBkYXRlXCIsZnVuY3Rpb24oZSl7dC5tZWRpYS5zZWVraW5nPSExLHU9ZS5zZWNvbmRzLGYuY2FsbCh0LHQubWVkaWEsXCJ0aW1ldXBkYXRlXCIpfSksdC5lbWJlZC5vbihcInByb2dyZXNzXCIsZnVuY3Rpb24oZSl7dC5tZWRpYS5idWZmZXJlZD1lLnBlcmNlbnQsZi5jYWxsKHQsdC5tZWRpYSxcInByb2dyZXNzXCIpLDE9PT1wYXJzZUludChlLnBlcmNlbnQsMTApJiZmLmNhbGwodCx0Lm1lZGlhLFwiY2FucGxheXRocm91Z2hcIiksdC5lbWJlZC5nZXREdXJhdGlvbigpLnRoZW4oZnVuY3Rpb24oZSl7ZSE9PXQubWVkaWEuZHVyYXRpb24mJih0Lm1lZGlhLmR1cmF0aW9uPWUsZi5jYWxsKHQsdC5tZWRpYSxcImR1cmF0aW9uY2hhbmdlXCIpKX0pfSksdC5lbWJlZC5vbihcInNlZWtlZFwiLGZ1bmN0aW9uKCl7dC5tZWRpYS5zZWVraW5nPSExLGYuY2FsbCh0LHQubWVkaWEsXCJzZWVrZWRcIil9KSx0LmVtYmVkLm9uKFwiZW5kZWRcIixmdW5jdGlvbigpe3QubWVkaWEucGF1c2VkPSEwLGYuY2FsbCh0LHQubWVkaWEsXCJlbmRlZFwiKX0pLHQuZW1iZWQub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QubWVkaWEuZXJyb3I9ZSxmLmNhbGwodCx0Lm1lZGlhLFwiZXJyb3JcIil9KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIGJlLmJ1aWxkLmNhbGwodCl9LDApfX07ZnVuY3Rpb24gUGUoZSl7ZSYmIXRoaXMuZW1iZWQuaGFzUGxheWVkJiYodGhpcy5lbWJlZC5oYXNQbGF5ZWQ9ITApLHRoaXMubWVkaWEucGF1c2VkPT09ZSYmKHRoaXMubWVkaWEucGF1c2VkPSFlLGYuY2FsbCh0aGlzLHRoaXMubWVkaWEsZT9cInBsYXlcIjpcInBhdXNlXCIpKX12YXIgU2UsTWU9e3NldHVwOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztNKHRoaXMuZWxlbWVudHMud3JhcHBlcix0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmVtYmVkLCEwKSxNZS5zZXRBc3BlY3RSYXRpby5jYWxsKHRoaXMpLGwub2JqZWN0KHdpbmRvdy5ZVCkmJmwuZnVuY3Rpb24od2luZG93LllULlBsYXllcik/TWUucmVhZHkuY2FsbCh0aGlzKTooQWUodGhpcy5jb25maWcudXJscy55b3V0dWJlLnNkaykuY2F0Y2goZnVuY3Rpb24odCl7ZS5kZWJ1Zy53YXJuKFwiWW91VHViZSBBUEkgZmFpbGVkIHRvIGxvYWRcIix0KX0pLHdpbmRvdy5vbllvdVR1YmVSZWFkeUNhbGxiYWNrcz13aW5kb3cub25Zb3VUdWJlUmVhZHlDYWxsYmFja3N8fFtdLHdpbmRvdy5vbllvdVR1YmVSZWFkeUNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKCl7TWUucmVhZHkuY2FsbChlKX0pLHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeT1mdW5jdGlvbigpe3dpbmRvdy5vbllvdVR1YmVSZWFkeUNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UoKX0pfSl9LGdldFRpdGxlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYobC5mdW5jdGlvbih0aGlzLmVtYmVkLmdldFZpZGVvRGF0YSkpe3ZhciBpPXRoaXMuZW1iZWQuZ2V0VmlkZW9EYXRhKCkudGl0bGU7aWYobC5lbXB0eShpKSlyZXR1cm4gdGhpcy5jb25maWcudGl0bGU9aSx2b2lkIGJlLnNldFRpdGxlLmNhbGwodGhpcyl9dmFyIG49dGhpcy5jb25maWcua2V5cy5nb29nbGU7bC5zdHJpbmcobikmJiFsLmVtcHR5KG4pJiZlZShZKHRoaXMuY29uZmlnLnVybHMueW91dHViZS5hcGksZSxuKSkudGhlbihmdW5jdGlvbihlKXtsLm9iamVjdChlKSYmKHQuY29uZmlnLnRpdGxlPWUuaXRlbXNbMF0uc25pcHBldC50aXRsZSxiZS5zZXRUaXRsZS5jYWxsKHQpKX0pLmNhdGNoKGZ1bmN0aW9uKCl7fSl9LHNldEFzcGVjdFJhdGlvOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5jb25maWcucmF0aW8uc3BsaXQoXCI6XCIpO3RoaXMuZWxlbWVudHMud3JhcHBlci5zdHlsZS5wYWRkaW5nQm90dG9tPTEwMC9lWzBdKmVbMV0rXCIlXCJ9LHJlYWR5OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUubWVkaWEuZ2V0QXR0cmlidXRlKFwiaWRcIik7aWYobC5lbXB0eSh0KXx8IXQuc3RhcnRzV2l0aChcInlvdXR1YmUtXCIpKXt2YXIgaT1lLm1lZGlhLmdldEF0dHJpYnV0ZShcInNyY1wiKTtsLmVtcHR5KGkpJiYoaT1lLm1lZGlhLmdldEF0dHJpYnV0ZSh0aGlzLmNvbmZpZy5hdHRyaWJ1dGVzLmVtYmVkLmlkKSk7dmFyIG4scz0obj1pLGwuZW1wdHkobik/bnVsbDpuLm1hdGNoKC9eLiooeW91dHUuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18JnY9KShbXiMmP10qKS4qLyk/UmVnRXhwLiQyOm4pLGE9ZS5wcm92aWRlcitcIi1cIitNYXRoLmZsb29yKDFlNCpNYXRoLnJhbmRvbSgpKSxvPXcoXCJkaXZcIix7aWQ6YSxwb3N0ZXI6ZS5wb3N0ZXJ9KTtlLm1lZGlhPUMobyxlLm1lZGlhKTt2YXIgcj1mdW5jdGlvbihlKXtyZXR1cm5cImh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpL1wiK3MrXCIvXCIrZStcImRlZmF1bHQuanBnXCJ9O3ZlKHIoXCJtYXhyZXNcIiksMTIxKS5jYXRjaChmdW5jdGlvbigpe3JldHVybiB2ZShyKFwic2RcIiksMTIxKX0pLmNhdGNoKGZ1bmN0aW9uKCl7cmV0dXJuIHZlKHIoXCJocVwiKSl9KS50aGVuKGZ1bmN0aW9uKHQpe3JldHVybiBiZS5zZXRQb3N0ZXIuY2FsbChlLHQuc3JjKX0pLnRoZW4oZnVuY3Rpb24odCl7dC5pbmNsdWRlcyhcIm1heHJlc1wiKXx8KGUuZWxlbWVudHMucG9zdGVyLnN0eWxlLmJhY2tncm91bmRTaXplPVwiY292ZXJcIil9KS5jYXRjaChmdW5jdGlvbigpe30pLGUuZW1iZWQ9bmV3IHdpbmRvdy5ZVC5QbGF5ZXIoYSx7dmlkZW9JZDpzLHBsYXllclZhcnM6e2F1dG9wbGF5OmUuY29uZmlnLmF1dG9wbGF5PzE6MCxobDplLmNvbmZpZy5obCxjb250cm9sczplLnN1cHBvcnRlZC51aT8wOjEscmVsOjAsc2hvd2luZm86MCxpdl9sb2FkX3BvbGljeTozLG1vZGVzdGJyYW5kaW5nOjEsZGlzYWJsZWtiOjEscGxheXNpbmxpbmU6MSx3aWRnZXRfcmVmZXJyZXI6d2luZG93P3dpbmRvdy5sb2NhdGlvbi5ocmVmOm51bGwsY2NfbG9hZF9wb2xpY3k6ZS5jYXB0aW9ucy5hY3RpdmU/MTowLGNjX2xhbmdfcHJlZjplLmNvbmZpZy5jYXB0aW9ucy5sYW5ndWFnZX0sZXZlbnRzOntvbkVycm9yOmZ1bmN0aW9uKHQpe2lmKCFlLm1lZGlhLmVycm9yKXt2YXIgaT10LmRhdGEsbj17MjpcIlRoZSByZXF1ZXN0IGNvbnRhaW5zIGFuIGludmFsaWQgcGFyYW1ldGVyIHZhbHVlLiBGb3IgZXhhbXBsZSwgdGhpcyBlcnJvciBvY2N1cnMgaWYgeW91IHNwZWNpZnkgYSB2aWRlbyBJRCB0aGF0IGRvZXMgbm90IGhhdmUgMTEgY2hhcmFjdGVycywgb3IgaWYgdGhlIHZpZGVvIElEIGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycywgc3VjaCBhcyBleGNsYW1hdGlvbiBwb2ludHMgb3IgYXN0ZXJpc2tzLlwiLDU6XCJUaGUgcmVxdWVzdGVkIGNvbnRlbnQgY2Fubm90IGJlIHBsYXllZCBpbiBhbiBIVE1MNSBwbGF5ZXIgb3IgYW5vdGhlciBlcnJvciByZWxhdGVkIHRvIHRoZSBIVE1MNSBwbGF5ZXIgaGFzIG9jY3VycmVkLlwiLDEwMDpcIlRoZSB2aWRlbyByZXF1ZXN0ZWQgd2FzIG5vdCBmb3VuZC4gVGhpcyBlcnJvciBvY2N1cnMgd2hlbiBhIHZpZGVvIGhhcyBiZWVuIHJlbW92ZWQgKGZvciBhbnkgcmVhc29uKSBvciBoYXMgYmVlbiBtYXJrZWQgYXMgcHJpdmF0ZS5cIiwxMDE6XCJUaGUgb3duZXIgb2YgdGhlIHJlcXVlc3RlZCB2aWRlbyBkb2VzIG5vdCBhbGxvdyBpdCB0byBiZSBwbGF5ZWQgaW4gZW1iZWRkZWQgcGxheWVycy5cIiwxNTA6XCJUaGUgb3duZXIgb2YgdGhlIHJlcXVlc3RlZCB2aWRlbyBkb2VzIG5vdCBhbGxvdyBpdCB0byBiZSBwbGF5ZWQgaW4gZW1iZWRkZWQgcGxheWVycy5cIn1baV18fFwiQW4gdW5rbm93biBlcnJvciBvY2N1cmVkXCI7ZS5tZWRpYS5lcnJvcj17Y29kZTppLG1lc3NhZ2U6bn0sZi5jYWxsKGUsZS5tZWRpYSxcImVycm9yXCIpfX0sb25QbGF5YmFja1JhdGVDaGFuZ2U6ZnVuY3Rpb24odCl7dmFyIGk9dC50YXJnZXQ7ZS5tZWRpYS5wbGF5YmFja1JhdGU9aS5nZXRQbGF5YmFja1JhdGUoKSxmLmNhbGwoZSxlLm1lZGlhLFwicmF0ZWNoYW5nZVwiKX0sb25SZWFkeTpmdW5jdGlvbih0KXtpZighbC5mdW5jdGlvbihlLm1lZGlhLnBsYXkpKXt2YXIgaT10LnRhcmdldDtNZS5nZXRUaXRsZS5jYWxsKGUscyksZS5tZWRpYS5wbGF5PWZ1bmN0aW9uKCl7UGUuY2FsbChlLCEwKSxpLnBsYXlWaWRlbygpfSxlLm1lZGlhLnBhdXNlPWZ1bmN0aW9uKCl7UGUuY2FsbChlLCExKSxpLnBhdXNlVmlkZW8oKX0sZS5tZWRpYS5zdG9wPWZ1bmN0aW9uKCl7aS5zdG9wVmlkZW8oKX0sZS5tZWRpYS5kdXJhdGlvbj1pLmdldER1cmF0aW9uKCksZS5tZWRpYS5wYXVzZWQ9ITAsZS5tZWRpYS5jdXJyZW50VGltZT0wLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLm1lZGlhLFwiY3VycmVudFRpbWVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIE51bWJlcihpLmdldEN1cnJlbnRUaW1lKCkpfSxzZXQ6ZnVuY3Rpb24odCl7ZS5wYXVzZWQmJiFlLmVtYmVkLmhhc1BsYXllZCYmZS5lbWJlZC5tdXRlKCksZS5tZWRpYS5zZWVraW5nPSEwLGYuY2FsbChlLGUubWVkaWEsXCJzZWVraW5nXCIpLGkuc2Vla1RvKHQpfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLm1lZGlhLFwicGxheWJhY2tSYXRlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBpLmdldFBsYXliYWNrUmF0ZSgpfSxzZXQ6ZnVuY3Rpb24oZSl7aS5zZXRQbGF5YmFja1JhdGUoZSl9fSk7dmFyIG49ZS5jb25maWcudm9sdW1lO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLm1lZGlhLFwidm9sdW1lXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBufSxzZXQ6ZnVuY3Rpb24odCl7bj10LGkuc2V0Vm9sdW1lKDEwMCpuKSxmLmNhbGwoZSxlLm1lZGlhLFwidm9sdW1lY2hhbmdlXCIpfX0pO3ZhciBhPWUuY29uZmlnLm11dGVkO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLm1lZGlhLFwibXV0ZWRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGF9LHNldDpmdW5jdGlvbih0KXt2YXIgbj1sLmJvb2xlYW4odCk/dDphO2E9bixpW24/XCJtdXRlXCI6XCJ1bk11dGVcIl0oKSxmLmNhbGwoZSxlLm1lZGlhLFwidm9sdW1lY2hhbmdlXCIpfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLm1lZGlhLFwiY3VycmVudFNyY1wiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaS5nZXRWaWRlb1VybCgpfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLm1lZGlhLFwiZW5kZWRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGUuY3VycmVudFRpbWU9PT1lLmR1cmF0aW9ufX0pLGUub3B0aW9ucy5zcGVlZD1pLmdldEF2YWlsYWJsZVBsYXliYWNrUmF0ZXMoKSxlLnN1cHBvcnRlZC51aSYmZS5tZWRpYS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLC0xKSxmLmNhbGwoZSxlLm1lZGlhLFwidGltZXVwZGF0ZVwiKSxmLmNhbGwoZSxlLm1lZGlhLFwiZHVyYXRpb25jaGFuZ2VcIiksY2xlYXJJbnRlcnZhbChlLnRpbWVycy5idWZmZXJpbmcpLGUudGltZXJzLmJ1ZmZlcmluZz1zZXRJbnRlcnZhbChmdW5jdGlvbigpe2UubWVkaWEuYnVmZmVyZWQ9aS5nZXRWaWRlb0xvYWRlZEZyYWN0aW9uKCksKG51bGw9PT1lLm1lZGlhLmxhc3RCdWZmZXJlZHx8ZS5tZWRpYS5sYXN0QnVmZmVyZWQ8ZS5tZWRpYS5idWZmZXJlZCkmJmYuY2FsbChlLGUubWVkaWEsXCJwcm9ncmVzc1wiKSxlLm1lZGlhLmxhc3RCdWZmZXJlZD1lLm1lZGlhLmJ1ZmZlcmVkLDE9PT1lLm1lZGlhLmJ1ZmZlcmVkJiYoY2xlYXJJbnRlcnZhbChlLnRpbWVycy5idWZmZXJpbmcpLGYuY2FsbChlLGUubWVkaWEsXCJjYW5wbGF5dGhyb3VnaFwiKSl9LDIwMCksc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBiZS5idWlsZC5jYWxsKGUpfSw1MCl9fSxvblN0YXRlQ2hhbmdlOmZ1bmN0aW9uKHQpe3ZhciBpPXQudGFyZ2V0O3N3aXRjaChjbGVhckludGVydmFsKGUudGltZXJzLnBsYXlpbmcpLGUubWVkaWEuc2Vla2luZyYmWzEsMl0uaW5jbHVkZXModC5kYXRhKSYmKGUubWVkaWEuc2Vla2luZz0hMSxmLmNhbGwoZSxlLm1lZGlhLFwic2Vla2VkXCIpKSx0LmRhdGEpe2Nhc2UtMTpmLmNhbGwoZSxlLm1lZGlhLFwidGltZXVwZGF0ZVwiKSxlLm1lZGlhLmJ1ZmZlcmVkPWkuZ2V0VmlkZW9Mb2FkZWRGcmFjdGlvbigpLGYuY2FsbChlLGUubWVkaWEsXCJwcm9ncmVzc1wiKTticmVhaztjYXNlIDA6UGUuY2FsbChlLCExKSxlLm1lZGlhLmxvb3A/KGkuc3RvcFZpZGVvKCksaS5wbGF5VmlkZW8oKSk6Zi5jYWxsKGUsZS5tZWRpYSxcImVuZGVkXCIpO2JyZWFrO2Nhc2UgMTplLm1lZGlhLnBhdXNlZCYmIWUuZW1iZWQuaGFzUGxheWVkP2UubWVkaWEucGF1c2UoKTooUGUuY2FsbChlLCEwKSxmLmNhbGwoZSxlLm1lZGlhLFwicGxheWluZ1wiKSxlLnRpbWVycy5wbGF5aW5nPXNldEludGVydmFsKGZ1bmN0aW9uKCl7Zi5jYWxsKGUsZS5tZWRpYSxcInRpbWV1cGRhdGVcIil9LDUwKSxlLm1lZGlhLmR1cmF0aW9uIT09aS5nZXREdXJhdGlvbigpJiYoZS5tZWRpYS5kdXJhdGlvbj1pLmdldER1cmF0aW9uKCksZi5jYWxsKGUsZS5tZWRpYSxcImR1cmF0aW9uY2hhbmdlXCIpKSk7YnJlYWs7Y2FzZSAyOmUubXV0ZWR8fGUuZW1iZWQudW5NdXRlKCksUGUuY2FsbChlLCExKX1mLmNhbGwoZSxlLmVsZW1lbnRzLmNvbnRhaW5lcixcInN0YXRlY2hhbmdlXCIsITEse2NvZGU6dC5kYXRhfSl9fX0pfX19LE5lPXtzZXR1cDpmdW5jdGlvbigpe3RoaXMubWVkaWE/KE0odGhpcy5lbGVtZW50cy5jb250YWluZXIsdGhpcy5jb25maWcuY2xhc3NOYW1lcy50eXBlLnJlcGxhY2UoXCJ7MH1cIix0aGlzLnR5cGUpLCEwKSxNKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLHRoaXMuY29uZmlnLmNsYXNzTmFtZXMucHJvdmlkZXIucmVwbGFjZShcInswfVwiLHRoaXMucHJvdmlkZXIpLCEwKSx0aGlzLmlzRW1iZWQmJk0odGhpcy5lbGVtZW50cy5jb250YWluZXIsdGhpcy5jb25maWcuY2xhc3NOYW1lcy50eXBlLnJlcGxhY2UoXCJ7MH1cIixcInZpZGVvXCIpLCEwKSx0aGlzLmlzVmlkZW8mJih0aGlzLmVsZW1lbnRzLndyYXBwZXI9dyhcImRpdlwiLHtjbGFzczp0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnZpZGVvfSksYih0aGlzLm1lZGlhLHRoaXMuZWxlbWVudHMud3JhcHBlciksdGhpcy5lbGVtZW50cy5wb3N0ZXI9dyhcImRpdlwiLHtjbGFzczp0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnBvc3Rlcn0pLHRoaXMuZWxlbWVudHMud3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRzLnBvc3RlcikpLHRoaXMuaXNIVE1MNT9VLmV4dGVuZC5jYWxsKHRoaXMpOnRoaXMuaXNZb3VUdWJlP01lLnNldHVwLmNhbGwodGhpcyk6dGhpcy5pc1ZpbWVvJiZDZS5zZXR1cC5jYWxsKHRoaXMpKTp0aGlzLmRlYnVnLndhcm4oXCJObyBtZWRpYSBlbGVtZW50IGZvdW5kIVwiKX19LExlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0KXt2YXIgaT10aGlzO20odGhpcyxlKSx0aGlzLnBsYXllcj10LHRoaXMucHVibGlzaGVySWQ9dC5jb25maWcuYWRzLnB1Ymxpc2hlcklkLHRoaXMucGxheWluZz0hMSx0aGlzLmluaXRpYWxpemVkPSExLHRoaXMuZWxlbWVudHM9e2NvbnRhaW5lcjpudWxsLGRpc3BsYXlDb250YWluZXI6bnVsbH0sdGhpcy5tYW5hZ2VyPW51bGwsdGhpcy5sb2FkZXI9bnVsbCx0aGlzLmN1ZVBvaW50cz1udWxsLHRoaXMuZXZlbnRzPXt9LHRoaXMuc2FmZXR5VGltZXI9bnVsbCx0aGlzLmNvdW50ZG93blRpbWVyPW51bGwsdGhpcy5tYW5hZ2VyUHJvbWlzZT1uZXcgUHJvbWlzZShmdW5jdGlvbihlLHQpe2kub24oXCJsb2FkZWRcIixlKSxpLm9uKFwiZXJyb3JcIix0KX0pLHRoaXMubG9hZCgpfXJldHVybiBnKGUsW3trZXk6XCJsb2FkXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMuZW5hYmxlZCYmKGwub2JqZWN0KHdpbmRvdy5nb29nbGUpJiZsLm9iamVjdCh3aW5kb3cuZ29vZ2xlLmltYSk/dGhpcy5yZWFkeSgpOkFlKHRoaXMucGxheWVyLmNvbmZpZy51cmxzLmdvb2dsZUlNQS5zZGspLnRoZW4oZnVuY3Rpb24oKXtlLnJlYWR5KCl9KS5jYXRjaChmdW5jdGlvbigpe2UudHJpZ2dlcihcImVycm9yXCIsbmV3IEVycm9yKFwiR29vZ2xlIElNQSBTREsgZmFpbGVkIHRvIGxvYWRcIikpfSkpfX0se2tleTpcInJlYWR5XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMuc3RhcnRTYWZldHlUaW1lcigxMmUzLFwicmVhZHkoKVwiKSx0aGlzLm1hbmFnZXJQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtlLmNsZWFyU2FmZXR5VGltZXIoXCJvbkFkc01hbmFnZXJMb2FkZWQoKVwiKX0pLHRoaXMubGlzdGVuZXJzKCksdGhpcy5zZXR1cElNQSgpfX0se2tleTpcInNldHVwSU1BXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcj13KFwiZGl2XCIse2NsYXNzOnRoaXMucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLmFkc30pLHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciksZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRWcGFpZE1vZGUoZ29vZ2xlLmltYS5JbWFTZGtTZXR0aW5ncy5WcGFpZE1vZGUuRU5BQkxFRCksZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUodGhpcy5wbGF5ZXIuY29uZmlnLmFkcy5sYW5ndWFnZSksdGhpcy5lbGVtZW50cy5kaXNwbGF5Q29udGFpbmVyPW5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcih0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciksdGhpcy5yZXF1ZXN0QWRzKCl9fSx7a2V5OlwicmVxdWVzdEFkc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PXRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lcjt0cnl7dGhpcy5sb2FkZXI9bmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuZWxlbWVudHMuZGlzcGxheUNvbnRhaW5lciksdGhpcy5sb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxmdW5jdGlvbih0KXtyZXR1cm4gZS5vbkFkc01hbmFnZXJMb2FkZWQodCl9LCExKSx0aGlzLmxvYWRlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsZnVuY3Rpb24odCl7cmV0dXJuIGUub25BZEVycm9yKHQpfSwhMSk7dmFyIGk9bmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdDtpLmFkVGFnVXJsPXRoaXMudGFnVXJsLGkubGluZWFyQWRTbG90V2lkdGg9dC5vZmZzZXRXaWR0aCxpLmxpbmVhckFkU2xvdEhlaWdodD10Lm9mZnNldEhlaWdodCxpLm5vbkxpbmVhckFkU2xvdFdpZHRoPXQub2Zmc2V0V2lkdGgsaS5ub25MaW5lYXJBZFNsb3RIZWlnaHQ9dC5vZmZzZXRIZWlnaHQsaS5mb3JjZU5vbkxpbmVhckZ1bGxTbG90PSExLGkuc2V0QWRXaWxsUGxheU11dGVkKCF0aGlzLnBsYXllci5tdXRlZCksdGhpcy5sb2FkZXIucmVxdWVzdEFkcyhpKX1jYXRjaChlKXt0aGlzLm9uQWRFcnJvcihlKX19fSx7a2V5OlwicG9sbENvdW50ZG93blwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZighKGFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0pKXJldHVybiBjbGVhckludGVydmFsKHRoaXMuY291bnRkb3duVGltZXIpLHZvaWQgdGhpcy5lbGVtZW50cy5jb250YWluZXIucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWRnZS10ZXh0XCIpO3RoaXMuY291bnRkb3duVGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXt2YXIgdD1hZShNYXRoLm1heChlLm1hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpLDApKSxpPVgoXCJhZHZlcnRpc2VtZW50XCIsZS5wbGF5ZXIuY29uZmlnKStcIiAtIFwiK3Q7ZS5lbGVtZW50cy5jb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1iYWRnZS10ZXh0XCIsaSl9LDEwMCl9fSx7a2V5Olwib25BZHNNYW5hZ2VyTG9hZGVkXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztpZih0aGlzLmVuYWJsZWQpe3ZhciBpPW5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzO2kucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZT0hMCxpLmVuYWJsZVByZWxvYWRpbmc9ITAsdGhpcy5tYW5hZ2VyPWUuZ2V0QWRzTWFuYWdlcih0aGlzLnBsYXllcixpKSx0aGlzLmN1ZVBvaW50cz10aGlzLm1hbmFnZXIuZ2V0Q3VlUG9pbnRzKCksbC5lbXB0eSh0aGlzLmN1ZVBvaW50cyl8fHRoaXMuY3VlUG9pbnRzLmZvckVhY2goZnVuY3Rpb24oZSl7aWYoMCE9PWUmJi0xIT09ZSYmZTx0LnBsYXllci5kdXJhdGlvbil7dmFyIGk9dC5wbGF5ZXIuZWxlbWVudHMucHJvZ3Jlc3M7aWYobC5lbGVtZW50KGkpKXt2YXIgbj0xMDAvdC5wbGF5ZXIuZHVyYXRpb24qZSxzPXcoXCJzcGFuXCIse2NsYXNzOnQucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLmN1ZXN9KTtzLnN0eWxlLmxlZnQ9bi50b1N0cmluZygpK1wiJVwiLGkuYXBwZW5kQ2hpbGQocyl9fX0pLHRoaXMubWFuYWdlci5zZXRWb2x1bWUodGhpcy5wbGF5ZXIudm9sdW1lKSx0aGlzLm1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLGZ1bmN0aW9uKGUpe3JldHVybiB0Lm9uQWRFcnJvcihlKX0pLE9iamVjdC5rZXlzKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QubWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlW2VdLGZ1bmN0aW9uKGUpe3JldHVybiB0Lm9uQWRFdmVudChlKX0pfSksdGhpcy50cmlnZ2VyKFwibG9hZGVkXCIpfX19LHtrZXk6XCJvbkFkRXZlbnRcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLGk9dGhpcy5wbGF5ZXIuZWxlbWVudHMuY29udGFpbmVyLG49ZS5nZXRBZCgpLHM9ZnVuY3Rpb24oZSl7dmFyIGk9XCJhZHNcIitlLnJlcGxhY2UoL18vZyxcIlwiKS50b0xvd2VyQ2FzZSgpO2YuY2FsbCh0LnBsYXllcix0LnBsYXllci5tZWRpYSxpKX07c3dpdGNoKGUudHlwZSl7Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ6dGhpcy50cmlnZ2VyKFwibG9hZGVkXCIpLHMoZS50eXBlKSx0aGlzLnBvbGxDb3VudGRvd24oITApLG4uaXNMaW5lYXIoKXx8KG4ud2lkdGg9aS5vZmZzZXRXaWR0aCxuLmhlaWdodD1pLm9mZnNldEhlaWdodCk7YnJlYWs7Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDpzKGUudHlwZSksdGhpcy5sb2FkQWRzKCk7YnJlYWs7Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDpzKGUudHlwZSksdGhpcy5wYXVzZUNvbnRlbnQoKTticmVhaztjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRDpzKGUudHlwZSksdGhpcy5wb2xsQ291bnRkb3duKCksdGhpcy5yZXN1bWVDb250ZW50KCk7YnJlYWs7Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVEOmNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQ6Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURTpjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLklNUFJFU1NJT046Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSzpzKGUudHlwZSl9fX0se2tleTpcIm9uQWRFcnJvclwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY2FuY2VsKCksdGhpcy5wbGF5ZXIuZGVidWcud2FybihcIkFkcyBlcnJvclwiLGUpfX0se2tleTpcImxpc3RlbmVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PXRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lcixpPXZvaWQgMDt0aGlzLnBsYXllci5vbihcImVuZGVkXCIsZnVuY3Rpb24oKXtlLmxvYWRlci5jb250ZW50Q29tcGxldGUoKX0pLHRoaXMucGxheWVyLm9uKFwic2Vla2luZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIGk9ZS5wbGF5ZXIuY3VycmVudFRpbWV9KSx0aGlzLnBsYXllci5vbihcInNlZWtlZFwiLGZ1bmN0aW9uKCl7dmFyIHQ9ZS5wbGF5ZXIuY3VycmVudFRpbWU7bC5lbXB0eShlLmN1ZVBvaW50cyl8fGUuY3VlUG9pbnRzLmZvckVhY2goZnVuY3Rpb24obixzKXtpPG4mJm48dCYmKGUubWFuYWdlci5kaXNjYXJkQWRCcmVhaygpLGUuY3VlUG9pbnRzLnNwbGljZShzLDEpKX0pfSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbigpe2UubWFuYWdlciYmZS5tYW5hZ2VyLnJlc2l6ZSh0Lm9mZnNldFdpZHRoLHQub2Zmc2V0SGVpZ2h0LGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKX0pfX0se2tleTpcInBsYXlcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD10aGlzLnBsYXllci5lbGVtZW50cy5jb250YWluZXI7dGhpcy5tYW5hZ2VyUHJvbWlzZXx8dGhpcy5yZXN1bWVDb250ZW50KCksdGhpcy5tYW5hZ2VyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7ZS5lbGVtZW50cy5kaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTt0cnl7ZS5pbml0aWFsaXplZHx8KGUubWFuYWdlci5pbml0KHQub2Zmc2V0V2lkdGgsdC5vZmZzZXRIZWlnaHQsZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpLGUubWFuYWdlci5zdGFydCgpKSxlLmluaXRpYWxpemVkPSEwfWNhdGNoKHQpe2Uub25BZEVycm9yKHQpfX0pLmNhdGNoKGZ1bmN0aW9uKCl7fSl9fSx7a2V5OlwicmVzdW1lQ29udGVudFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5lbGVtZW50cy5jb250YWluZXIuc3R5bGUuekluZGV4PVwiXCIsdGhpcy5wbGF5aW5nPSExLHRoaXMucGxheWVyLmN1cnJlbnRUaW1lPHRoaXMucGxheWVyLmR1cmF0aW9uJiZ0aGlzLnBsYXllci5wbGF5KCl9fSx7a2V5OlwicGF1c2VDb250ZW50XCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5zdHlsZS56SW5kZXg9Myx0aGlzLnBsYXlpbmc9ITAsdGhpcy5wbGF5ZXIucGF1c2UoKX19LHtrZXk6XCJjYW5jZWxcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaW5pdGlhbGl6ZWQmJnRoaXMucmVzdW1lQ29udGVudCgpLHRoaXMudHJpZ2dlcihcImVycm9yXCIpLHRoaXMubG9hZEFkcygpfX0se2tleTpcImxvYWRBZHNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy5tYW5hZ2VyUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7ZS5tYW5hZ2VyJiZlLm1hbmFnZXIuZGVzdHJveSgpLGUubWFuYWdlclByb21pc2U9bmV3IFByb21pc2UoZnVuY3Rpb24odCl7ZS5vbihcImxvYWRlZFwiLHQpLGUucGxheWVyLmRlYnVnLmxvZyhlLm1hbmFnZXIpfSksZS5yZXF1ZXN0QWRzKCl9KS5jYXRjaChmdW5jdGlvbigpe30pfX0se2tleTpcInRyaWdnZXJcIix2YWx1ZTpmdW5jdGlvbihlKXtmb3IodmFyIHQ9dGhpcyxpPWFyZ3VtZW50cy5sZW5ndGgsbj1BcnJheShpPjE/aS0xOjApLHM9MTtzPGk7cysrKW5bcy0xXT1hcmd1bWVudHNbc107dmFyIGE9dGhpcy5ldmVudHNbZV07bC5hcnJheShhKSYmYS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2wuZnVuY3Rpb24oZSkmJmUuYXBwbHkodCxuKX0pfX0se2tleTpcIm9uXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbC5hcnJheSh0aGlzLmV2ZW50c1tlXSl8fCh0aGlzLmV2ZW50c1tlXT1bXSksdGhpcy5ldmVudHNbZV0ucHVzaCh0KSx0aGlzfX0se2tleTpcInN0YXJ0U2FmZXR5VGltZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBpPXRoaXM7dGhpcy5wbGF5ZXIuZGVidWcubG9nKFwiU2FmZXR5IHRpbWVyIGludm9rZWQgZnJvbTogXCIrdCksdGhpcy5zYWZldHlUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5jYW5jZWwoKSxpLmNsZWFyU2FmZXR5VGltZXIoXCJzdGFydFNhZmV0eVRpbWVyKClcIil9LGUpfX0se2tleTpcImNsZWFyU2FmZXR5VGltZXJcIix2YWx1ZTpmdW5jdGlvbihlKXtsLm51bGxPclVuZGVmaW5lZCh0aGlzLnNhZmV0eVRpbWVyKXx8KHRoaXMucGxheWVyLmRlYnVnLmxvZyhcIlNhZmV0eSB0aW1lciBjbGVhcmVkIGZyb206IFwiK2UpLGNsZWFyVGltZW91dCh0aGlzLnNhZmV0eVRpbWVyKSx0aGlzLnNhZmV0eVRpbWVyPW51bGwpfX0se2tleTpcImVuYWJsZWRcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wbGF5ZXIuaXNIVE1MNSYmdGhpcy5wbGF5ZXIuaXNWaWRlbyYmdGhpcy5wbGF5ZXIuY29uZmlnLmFkcy5lbmFibGVkJiYhbC5lbXB0eSh0aGlzLnB1Ymxpc2hlcklkKX19LHtrZXk6XCJ0YWdVcmxcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm5cImh0dHBzOi8vZ28uYW5pdmlldy5jb20vYXBpL2Fkc2VydmVyNi92YXN0Lz9cIitsZSh7QVZfUFVCTElTSEVSSUQ6XCI1OGMyNWJiMDA3M2VmNDQ4YjEwODdhZDZcIixBVl9DSEFOTkVMSUQ6XCI1YTA0NThkYzI4YTA2MTQ1ZTQ1MTlkMjFcIixBVl9VUkw6d2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLGNiOkRhdGUubm93KCksQVZfV0lEVEg6NjQwLEFWX0hFSUdIVDo0ODAsQVZfQ0RJTTI6dGhpcy5wdWJsaXNoZXJJZH0pfX1dKSxlfSgpLHhlPXtpbnNlcnRFbGVtZW50czpmdW5jdGlvbihlLHQpe3ZhciBpPXRoaXM7bC5zdHJpbmcodCk/VChlLHRoaXMubWVkaWEse3NyYzp0fSk6bC5hcnJheSh0KSYmdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe1QoZSxpLm1lZGlhLHQpfSl9LGNoYW5nZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzO1coZSxcInNvdXJjZXMubGVuZ3RoXCIpPyhVLmNhbmNlbFJlcXVlc3RzLmNhbGwodGhpcyksdGhpcy5kZXN0cm95LmNhbGwodGhpcyxmdW5jdGlvbigpe3Qub3B0aW9ucy5xdWFsaXR5PVtdLEEodC5tZWRpYSksdC5tZWRpYT1udWxsLGwuZWxlbWVudCh0LmVsZW1lbnRzLmNvbnRhaW5lcikmJnQuZWxlbWVudHMuY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO3ZhciBpPWUuc291cmNlcyxuPWUudHlwZSxzPXYoaSwxKVswXSxhPXMucHJvdmlkZXIsbz12b2lkIDA9PT1hP2RlLmh0bWw1OmEscj1zLnNyYyxjPVwiaHRtbDVcIj09PW8/bjpcImRpdlwiLHU9XCJodG1sNVwiPT09bz97fTp7c3JjOnJ9O09iamVjdC5hc3NpZ24odCx7cHJvdmlkZXI6byx0eXBlOm4sc3VwcG9ydGVkOkYuY2hlY2sobixvLHQuY29uZmlnLnBsYXlzaW5saW5lKSxtZWRpYTp3KGMsdSl9KSx0LmVsZW1lbnRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0Lm1lZGlhKSxsLmJvb2xlYW4oZS5hdXRvcGxheSkmJih0LmNvbmZpZy5hdXRvcGxheT1lLmF1dG9wbGF5KSx0LmlzSFRNTDUmJih0LmNvbmZpZy5jcm9zc29yaWdpbiYmdC5tZWRpYS5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLFwiXCIpLHQuY29uZmlnLmF1dG9wbGF5JiZ0Lm1lZGlhLnNldEF0dHJpYnV0ZShcImF1dG9wbGF5XCIsXCJcIiksbC5lbXB0eShlLnBvc3Rlcil8fCh0LnBvc3Rlcj1lLnBvc3RlciksdC5jb25maWcubG9vcC5hY3RpdmUmJnQubWVkaWEuc2V0QXR0cmlidXRlKFwibG9vcFwiLFwiXCIpLHQuY29uZmlnLm11dGVkJiZ0Lm1lZGlhLnNldEF0dHJpYnV0ZShcIm11dGVkXCIsXCJcIiksdC5jb25maWcucGxheXNpbmxpbmUmJnQubWVkaWEuc2V0QXR0cmlidXRlKFwicGxheXNpbmxpbmVcIixcIlwiKSksYmUuYWRkU3R5bGVIb29rLmNhbGwodCksdC5pc0hUTUw1JiZ4ZS5pbnNlcnRFbGVtZW50cy5jYWxsKHQsXCJzb3VyY2VcIixpKSx0LmNvbmZpZy50aXRsZT1lLnRpdGxlLE5lLnNldHVwLmNhbGwodCksdC5pc0hUTUw1JiYoXCJ0cmFja3NcImluIGUmJnhlLmluc2VydEVsZW1lbnRzLmNhbGwodCxcInRyYWNrXCIsZS50cmFja3MpLHQubWVkaWEubG9hZCgpKSwodC5pc0hUTUw1fHx0LmlzRW1iZWQmJiF0LnN1cHBvcnRlZC51aSkmJmJlLmJ1aWxkLmNhbGwodCksdC5mdWxsc2NyZWVuLnVwZGF0ZSgpfSwhMCkpOnRoaXMuZGVidWcud2FybihcIkludmFsaWQgc291cmNlIGZvcm1hdFwiKX19LF9lPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LGkpe3ZhciBuPXRoaXM7aWYobSh0aGlzLGUpLHRoaXMudGltZXJzPXt9LHRoaXMucmVhZHk9ITEsdGhpcy5sb2FkaW5nPSExLHRoaXMuZmFpbGVkPSExLHRoaXMudG91Y2g9Ri50b3VjaCx0aGlzLm1lZGlhPXQsbC5zdHJpbmcodGhpcy5tZWRpYSkmJih0aGlzLm1lZGlhPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5tZWRpYSkpLCh3aW5kb3cualF1ZXJ5JiZ0aGlzLm1lZGlhIGluc3RhbmNlb2YgalF1ZXJ5fHxsLm5vZGVMaXN0KHRoaXMubWVkaWEpfHxsLmFycmF5KHRoaXMubWVkaWEpKSYmKHRoaXMubWVkaWE9dGhpcy5tZWRpYVswXSksdGhpcy5jb25maWc9Syh7fSx1ZSxlLmRlZmF1bHRzLGl8fHt9LGZ1bmN0aW9uKCl7dHJ5e3JldHVybiBKU09OLnBhcnNlKG4ubWVkaWEuZ2V0QXR0cmlidXRlKFwiZGF0YS1wbHlyLWNvbmZpZ1wiKSl9Y2F0Y2goZSl7cmV0dXJue319fSgpKSx0aGlzLmVsZW1lbnRzPXtjb250YWluZXI6bnVsbCxjYXB0aW9uczpudWxsLGJ1dHRvbnM6e30sZGlzcGxheTp7fSxwcm9ncmVzczp7fSxpbnB1dHM6e30sc2V0dGluZ3M6e3BvcHVwOm51bGwsbWVudTpudWxsLHBhbmVsczp7fSxidXR0b25zOnt9fX0sdGhpcy5jYXB0aW9ucz17YWN0aXZlOm51bGwsY3VycmVudFRyYWNrOi0xLG1ldGE6bmV3IFdlYWtNYXB9LHRoaXMuZnVsbHNjcmVlbj17YWN0aXZlOiExfSx0aGlzLm9wdGlvbnM9e3NwZWVkOltdLHF1YWxpdHk6W119LHRoaXMuZGVidWc9bmV3IGZlKHRoaXMuY29uZmlnLmRlYnVnKSx0aGlzLmRlYnVnLmxvZyhcIkNvbmZpZ1wiLHRoaXMuY29uZmlnKSx0aGlzLmRlYnVnLmxvZyhcIlN1cHBvcnRcIixGKSwhbC5udWxsT3JVbmRlZmluZWQodGhpcy5tZWRpYSkmJmwuZWxlbWVudCh0aGlzLm1lZGlhKSlpZih0aGlzLm1lZGlhLnBseXIpdGhpcy5kZWJ1Zy53YXJuKFwiVGFyZ2V0IGFscmVhZHkgc2V0dXBcIik7ZWxzZSBpZih0aGlzLmNvbmZpZy5lbmFibGVkKWlmKEYuY2hlY2soKS5hcGkpe3ZhciBzPXRoaXMubWVkaWEuY2xvbmVOb2RlKCEwKTtzLmF1dG9wbGF5PSExLHRoaXMuZWxlbWVudHMub3JpZ2luYWw9czt2YXIgYT10aGlzLm1lZGlhLnRhZ05hbWUudG9Mb3dlckNhc2UoKSxvPW51bGwscj1udWxsO3N3aXRjaChhKXtjYXNlXCJkaXZcIjppZihvPXRoaXMubWVkaWEucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKSxsLmVsZW1lbnQobykpe2lmKHI9cmUoby5nZXRBdHRyaWJ1dGUoXCJzcmNcIikpLHRoaXMucHJvdmlkZXI9ZnVuY3Rpb24oZSl7cmV0dXJuL14oaHR0cHM/OlxcL1xcLyk/KHd3d1xcLik/KHlvdXR1YmVcXC5jb218eW91dHVcXC4/YmUpXFwvLiskLy50ZXN0KGUpP2RlLnlvdXR1YmU6L15odHRwcz86XFwvXFwvcGxheWVyLnZpbWVvLmNvbVxcL3ZpZGVvXFwvXFxkezAsOX0oPz1cXGJ8XFwvKS8udGVzdChlKT9kZS52aW1lbzpudWxsfShyLnRvU3RyaW5nKCkpLHRoaXMuZWxlbWVudHMuY29udGFpbmVyPXRoaXMubWVkaWEsdGhpcy5tZWRpYT1vLHRoaXMuZWxlbWVudHMuY29udGFpbmVyLmNsYXNzTmFtZT1cIlwiLHIuc2VhcmNoLmxlbmd0aCl7dmFyIGM9W1wiMVwiLFwidHJ1ZVwiXTtjLmluY2x1ZGVzKHIuc2VhcmNoUGFyYW1zLmdldChcImF1dG9wbGF5XCIpKSYmKHRoaXMuY29uZmlnLmF1dG9wbGF5PSEwKSxjLmluY2x1ZGVzKHIuc2VhcmNoUGFyYW1zLmdldChcImxvb3BcIikpJiYodGhpcy5jb25maWcubG9vcC5hY3RpdmU9ITApLHRoaXMuaXNZb3VUdWJlPyh0aGlzLmNvbmZpZy5wbGF5c2lubGluZT1jLmluY2x1ZGVzKHIuc2VhcmNoUGFyYW1zLmdldChcInBsYXlzaW5saW5lXCIpKSx0aGlzLmNvbmZpZy5obD1yLnNlYXJjaFBhcmFtcy5nZXQoXCJobFwiKSk6dGhpcy5jb25maWcucGxheXNpbmxpbmU9ITB9fWVsc2UgdGhpcy5wcm92aWRlcj10aGlzLm1lZGlhLmdldEF0dHJpYnV0ZSh0aGlzLmNvbmZpZy5hdHRyaWJ1dGVzLmVtYmVkLnByb3ZpZGVyKSx0aGlzLm1lZGlhLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmNvbmZpZy5hdHRyaWJ1dGVzLmVtYmVkLnByb3ZpZGVyKTtpZihsLmVtcHR5KHRoaXMucHJvdmlkZXIpfHwhT2JqZWN0LmtleXMoZGUpLmluY2x1ZGVzKHRoaXMucHJvdmlkZXIpKXJldHVybiB2b2lkIHRoaXMuZGVidWcuZXJyb3IoXCJTZXR1cCBmYWlsZWQ6IEludmFsaWQgcHJvdmlkZXJcIik7dGhpcy50eXBlPWhlLnZpZGVvO2JyZWFrO2Nhc2VcInZpZGVvXCI6Y2FzZVwiYXVkaW9cIjp0aGlzLnR5cGU9YSx0aGlzLnByb3ZpZGVyPWRlLmh0bWw1LHRoaXMubWVkaWEuaGFzQXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIikmJih0aGlzLmNvbmZpZy5jcm9zc29yaWdpbj0hMCksdGhpcy5tZWRpYS5oYXNBdHRyaWJ1dGUoXCJhdXRvcGxheVwiKSYmKHRoaXMuY29uZmlnLmF1dG9wbGF5PSEwKSwodGhpcy5tZWRpYS5oYXNBdHRyaWJ1dGUoXCJwbGF5c2lubGluZVwiKXx8dGhpcy5tZWRpYS5oYXNBdHRyaWJ1dGUoXCJ3ZWJraXQtcGxheXNpbmxpbmVcIikpJiYodGhpcy5jb25maWcucGxheXNpbmxpbmU9ITApLHRoaXMubWVkaWEuaGFzQXR0cmlidXRlKFwibXV0ZWRcIikmJih0aGlzLmNvbmZpZy5tdXRlZD0hMCksdGhpcy5tZWRpYS5oYXNBdHRyaWJ1dGUoXCJsb29wXCIpJiYodGhpcy5jb25maWcubG9vcC5hY3RpdmU9ITApO2JyZWFrO2RlZmF1bHQ6cmV0dXJuIHZvaWQgdGhpcy5kZWJ1Zy5lcnJvcihcIlNldHVwIGZhaWxlZDogdW5zdXBwb3J0ZWQgdHlwZVwiKX10aGlzLnN1cHBvcnRlZD1GLmNoZWNrKHRoaXMudHlwZSx0aGlzLnByb3ZpZGVyLHRoaXMuY29uZmlnLnBsYXlzaW5saW5lKSx0aGlzLnN1cHBvcnRlZC5hcGk/KHRoaXMuZXZlbnRMaXN0ZW5lcnM9W10sdGhpcy5saXN0ZW5lcnM9bmV3IGtlKHRoaXMpLHRoaXMuc3RvcmFnZT1uZXcgWih0aGlzKSx0aGlzLm1lZGlhLnBseXI9dGhpcyxsLmVsZW1lbnQodGhpcy5lbGVtZW50cy5jb250YWluZXIpfHwodGhpcy5lbGVtZW50cy5jb250YWluZXI9dyhcImRpdlwiKSxiKHRoaXMubWVkaWEsdGhpcy5lbGVtZW50cy5jb250YWluZXIpKSxiZS5hZGRTdHlsZUhvb2suY2FsbCh0aGlzKSxOZS5zZXR1cC5jYWxsKHRoaXMpLHRoaXMuY29uZmlnLmRlYnVnJiZkLmNhbGwodGhpcyx0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcix0aGlzLmNvbmZpZy5ldmVudHMuam9pbihcIiBcIiksZnVuY3Rpb24oZSl7bi5kZWJ1Zy5sb2coXCJldmVudDogXCIrZS50eXBlKX0pLCh0aGlzLmlzSFRNTDV8fHRoaXMuaXNFbWJlZCYmIXRoaXMuc3VwcG9ydGVkLnVpKSYmYmUuYnVpbGQuY2FsbCh0aGlzKSx0aGlzLmxpc3RlbmVycy5jb250YWluZXIoKSx0aGlzLmxpc3RlbmVycy5nbG9iYWwoKSx0aGlzLmZ1bGxzY3JlZW49bmV3IHllKHRoaXMpLHRoaXMuY29uZmlnLmFkcy5lbmFibGVkJiYodGhpcy5hZHM9bmV3IExlKHRoaXMpKSx0aGlzLmNvbmZpZy5hdXRvcGxheSYmdGhpcy5wbGF5KCkpOnRoaXMuZGVidWcuZXJyb3IoXCJTZXR1cCBmYWlsZWQ6IG5vIHN1cHBvcnRcIil9ZWxzZSB0aGlzLmRlYnVnLmVycm9yKFwiU2V0dXAgZmFpbGVkOiBubyBzdXBwb3J0XCIpO2Vsc2UgdGhpcy5kZWJ1Zy5lcnJvcihcIlNldHVwIGZhaWxlZDogZGlzYWJsZWQgYnkgY29uZmlnXCIpO2Vsc2UgdGhpcy5kZWJ1Zy5lcnJvcihcIlNldHVwIGZhaWxlZDogbm8gc3VpdGFibGUgZWxlbWVudCBwYXNzZWRcIil9cmV0dXJuIGcoZSxbe2tleTpcInBsYXlcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBsLmZ1bmN0aW9uKHRoaXMubWVkaWEucGxheSk/dGhpcy5tZWRpYS5wbGF5KCk6bnVsbH19LHtrZXk6XCJwYXVzZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5wbGF5aW5nJiZsLmZ1bmN0aW9uKHRoaXMubWVkaWEucGF1c2UpJiZ0aGlzLm1lZGlhLnBhdXNlKCl9fSx7a2V5OlwidG9nZ2xlUGxheVwiLHZhbHVlOmZ1bmN0aW9uKGUpeyhsLmJvb2xlYW4oZSk/ZTohdGhpcy5wbGF5aW5nKT90aGlzLnBsYXkoKTp0aGlzLnBhdXNlKCl9fSx7a2V5Olwic3RvcFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5pc0hUTUw1Pyh0aGlzLnBhdXNlKCksdGhpcy5yZXN0YXJ0KCkpOmwuZnVuY3Rpb24odGhpcy5tZWRpYS5zdG9wKSYmdGhpcy5tZWRpYS5zdG9wKCl9fSx7a2V5OlwicmVzdGFydFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5jdXJyZW50VGltZT0wfX0se2tleTpcInJld2luZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY3VycmVudFRpbWU9dGhpcy5jdXJyZW50VGltZS0obC5udW1iZXIoZSk/ZTp0aGlzLmNvbmZpZy5zZWVrVGltZSl9fSx7a2V5OlwiZm9yd2FyZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY3VycmVudFRpbWU9dGhpcy5jdXJyZW50VGltZSsobC5udW1iZXIoZSk/ZTp0aGlzLmNvbmZpZy5zZWVrVGltZSl9fSx7a2V5OlwiaW5jcmVhc2VWb2x1bWVcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLm1lZGlhLm11dGVkPzA6dGhpcy52b2x1bWU7dGhpcy52b2x1bWU9dCsobC5udW1iZXIoZSk/ZTowKX19LHtrZXk6XCJkZWNyZWFzZVZvbHVtZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuaW5jcmVhc2VWb2x1bWUoLWUpfX0se2tleTpcInRvZ2dsZUNhcHRpb25zXCIsdmFsdWU6ZnVuY3Rpb24oZSl7Y2UudG9nZ2xlLmNhbGwodGhpcyxlLCExKX19LHtrZXk6XCJhaXJwbGF5XCIsdmFsdWU6ZnVuY3Rpb24oKXtGLmFpcnBsYXkmJnRoaXMubWVkaWEud2Via2l0U2hvd1BsYXliYWNrVGFyZ2V0UGlja2VyKCl9fSx7a2V5OlwidG9nZ2xlQ29udHJvbHNcIix2YWx1ZTpmdW5jdGlvbihlKXtpZih0aGlzLnN1cHBvcnRlZC51aSYmIXRoaXMuaXNBdWRpbyl7dmFyIHQ9Tih0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcix0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmhpZGVDb250cm9scyksaT12b2lkIDA9PT1lP3ZvaWQgMDohZSxuPU0odGhpcy5lbGVtZW50cy5jb250YWluZXIsdGhpcy5jb25maWcuY2xhc3NOYW1lcy5oaWRlQ29udHJvbHMsaSk7aWYobiYmdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoXCJzZXR0aW5nc1wiKSYmIWwuZW1wdHkodGhpcy5jb25maWcuc2V0dGluZ3MpJiZvZS50b2dnbGVNZW51LmNhbGwodGhpcywhMSksbiE9PXQpe3ZhciBzPW4/XCJjb250cm9sc2hpZGRlblwiOlwiY29udHJvbHNzaG93blwiO2YuY2FsbCh0aGlzLHRoaXMubWVkaWEscyl9cmV0dXJuIW59cmV0dXJuITF9fSx7a2V5Olwib25cIix2YWx1ZTpmdW5jdGlvbihlLHQpe2QuY2FsbCh0aGlzLHRoaXMuZWxlbWVudHMuY29udGFpbmVyLGUsdCl9fSx7a2V5Olwib25jZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7cC5jYWxsKHRoaXMsdGhpcy5lbGVtZW50cy5jb250YWluZXIsZSx0KX19LHtrZXk6XCJvZmZcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2godGhpcy5lbGVtZW50cy5jb250YWluZXIsZSx0KX19LHtrZXk6XCJkZXN0cm95XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcyxpPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07aWYodGhpcy5yZWFkeSl7dmFyIG49ZnVuY3Rpb24oKXtkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiXCIsdC5lbWJlZD1udWxsLGk/KE9iamVjdC5rZXlzKHQuZWxlbWVudHMpLmxlbmd0aCYmKEEodC5lbGVtZW50cy5idXR0b25zLnBsYXkpLEEodC5lbGVtZW50cy5jYXB0aW9ucyksQSh0LmVsZW1lbnRzLmNvbnRyb2xzKSxBKHQuZWxlbWVudHMud3JhcHBlciksdC5lbGVtZW50cy5idXR0b25zLnBsYXk9bnVsbCx0LmVsZW1lbnRzLmNhcHRpb25zPW51bGwsdC5lbGVtZW50cy5jb250cm9scz1udWxsLHQuZWxlbWVudHMud3JhcHBlcj1udWxsKSxsLmZ1bmN0aW9uKGUpJiZlKCkpOihmdW5jdGlvbigpe3RoaXMmJnRoaXMuZXZlbnRMaXN0ZW5lcnMmJih0aGlzLmV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIHQ9ZS5lbGVtZW50LGk9ZS50eXBlLG49ZS5jYWxsYmFjayxzPWUub3B0aW9uczt0LnJlbW92ZUV2ZW50TGlzdGVuZXIoaSxuLHMpfSksdGhpcy5ldmVudExpc3RlbmVycz1bXSl9LmNhbGwodCksQyh0LmVsZW1lbnRzLm9yaWdpbmFsLHQuZWxlbWVudHMuY29udGFpbmVyKSxmLmNhbGwodCx0LmVsZW1lbnRzLm9yaWdpbmFsLFwiZGVzdHJveWVkXCIsITApLGwuZnVuY3Rpb24oZSkmJmUuY2FsbCh0LmVsZW1lbnRzLm9yaWdpbmFsKSx0LnJlYWR5PSExLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LmVsZW1lbnRzPW51bGwsdC5tZWRpYT1udWxsfSwyMDApKX07dGhpcy5zdG9wKCksdGhpcy5pc0hUTUw1PyhjbGVhclRpbWVvdXQodGhpcy50aW1lcnMubG9hZGluZyksYmUudG9nZ2xlTmF0aXZlQ29udHJvbHMuY2FsbCh0aGlzLCEwKSxuKCkpOnRoaXMuaXNZb3VUdWJlPyhjbGVhckludGVydmFsKHRoaXMudGltZXJzLmJ1ZmZlcmluZyksY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVycy5wbGF5aW5nKSxudWxsIT09dGhpcy5lbWJlZCYmbC5mdW5jdGlvbih0aGlzLmVtYmVkLmRlc3Ryb3kpJiZ0aGlzLmVtYmVkLmRlc3Ryb3koKSxuKCkpOnRoaXMuaXNWaW1lbyYmKG51bGwhPT10aGlzLmVtYmVkJiZ0aGlzLmVtYmVkLnVubG9hZCgpLnRoZW4obiksc2V0VGltZW91dChuLDIwMCkpfX19LHtrZXk6XCJzdXBwb3J0c1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBGLm1pbWUuY2FsbCh0aGlzLGUpfX0se2tleTpcImlzSFRNTDVcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLnByb3ZpZGVyPT09ZGUuaHRtbDUpfX0se2tleTpcImlzRW1iZWRcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLmlzWW91VHViZXx8dGhpcy5pc1ZpbWVvKX19LHtrZXk6XCJpc1lvdVR1YmVcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLnByb3ZpZGVyPT09ZGUueW91dHViZSl9fSx7a2V5OlwiaXNWaW1lb1wiLGdldDpmdW5jdGlvbigpe3JldHVybiBCb29sZWFuKHRoaXMucHJvdmlkZXI9PT1kZS52aW1lbyl9fSx7a2V5OlwiaXNWaWRlb1wiLGdldDpmdW5jdGlvbigpe3JldHVybiBCb29sZWFuKHRoaXMudHlwZT09PWhlLnZpZGVvKX19LHtrZXk6XCJpc0F1ZGlvXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIEJvb2xlYW4odGhpcy50eXBlPT09aGUuYXVkaW8pfX0se2tleTpcInBsYXlpbmdcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLnJlYWR5JiYhdGhpcy5wYXVzZWQmJiF0aGlzLmVuZGVkKX19LHtrZXk6XCJwYXVzZWRcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLm1lZGlhLnBhdXNlZCl9fSx7a2V5Olwic3RvcHBlZFwiLGdldDpmdW5jdGlvbigpe3JldHVybiBCb29sZWFuKHRoaXMucGF1c2VkJiYwPT09dGhpcy5jdXJyZW50VGltZSl9fSx7a2V5OlwiZW5kZWRcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLm1lZGlhLmVuZGVkKX19LHtrZXk6XCJjdXJyZW50VGltZVwiLHNldDpmdW5jdGlvbihlKXtpZih0aGlzLmR1cmF0aW9uKXt2YXIgdD1sLm51bWJlcihlKSYmZT4wO3RoaXMubWVkaWEuY3VycmVudFRpbWU9dD9NYXRoLm1pbihlLHRoaXMuZHVyYXRpb24pOjAsdGhpcy5kZWJ1Zy5sb2coXCJTZWVraW5nIHRvIFwiK3RoaXMuY3VycmVudFRpbWUrXCIgc2Vjb25kc1wiKX19LGdldDpmdW5jdGlvbigpe3JldHVybiBOdW1iZXIodGhpcy5tZWRpYS5jdXJyZW50VGltZSl9fSx7a2V5OlwiYnVmZmVyZWRcIixnZXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLm1lZGlhLmJ1ZmZlcmVkO3JldHVybiBsLm51bWJlcihlKT9lOmUmJmUubGVuZ3RoJiZ0aGlzLmR1cmF0aW9uPjA/ZS5lbmQoMCkvdGhpcy5kdXJhdGlvbjowfX0se2tleTpcInNlZWtpbmdcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLm1lZGlhLnNlZWtpbmcpfX0se2tleTpcImR1cmF0aW9uXCIsZ2V0OmZ1bmN0aW9uKCl7dmFyIGU9cGFyc2VGbG9hdCh0aGlzLmNvbmZpZy5kdXJhdGlvbiksdD0odGhpcy5tZWRpYXx8e30pLmR1cmF0aW9uLGk9bC5udW1iZXIodCkmJnQhPT0xLzA/dDowO3JldHVybiBlfHxpfX0se2tleTpcInZvbHVtZVwiLHNldDpmdW5jdGlvbihlKXt2YXIgdD1lO2wuc3RyaW5nKHQpJiYodD1OdW1iZXIodCkpLGwubnVtYmVyKHQpfHwodD10aGlzLnN0b3JhZ2UuZ2V0KFwidm9sdW1lXCIpKSxsLm51bWJlcih0KXx8KHQ9dGhpcy5jb25maWcudm9sdW1lKSx0PjEmJih0PTEpLHQ8MCYmKHQ9MCksdGhpcy5jb25maWcudm9sdW1lPXQsdGhpcy5tZWRpYS52b2x1bWU9dCwhbC5lbXB0eShlKSYmdGhpcy5tdXRlZCYmdD4wJiYodGhpcy5tdXRlZD0hMSl9LGdldDpmdW5jdGlvbigpe3JldHVybiBOdW1iZXIodGhpcy5tZWRpYS52b2x1bWUpfX0se2tleTpcIm11dGVkXCIsc2V0OmZ1bmN0aW9uKGUpe3ZhciB0PWU7bC5ib29sZWFuKHQpfHwodD10aGlzLnN0b3JhZ2UuZ2V0KFwibXV0ZWRcIikpLGwuYm9vbGVhbih0KXx8KHQ9dGhpcy5jb25maWcubXV0ZWQpLHRoaXMuY29uZmlnLm11dGVkPXQsdGhpcy5tZWRpYS5tdXRlZD10fSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLm1lZGlhLm11dGVkKX19LHtrZXk6XCJoYXNBdWRpb1wiLGdldDpmdW5jdGlvbigpe3JldHVybiF0aGlzLmlzSFRNTDV8fCghIXRoaXMuaXNBdWRpb3x8KEJvb2xlYW4odGhpcy5tZWRpYS5tb3pIYXNBdWRpbyl8fEJvb2xlYW4odGhpcy5tZWRpYS53ZWJraXRBdWRpb0RlY29kZWRCeXRlQ291bnQpfHxCb29sZWFuKHRoaXMubWVkaWEuYXVkaW9UcmFja3MmJnRoaXMubWVkaWEuYXVkaW9UcmFja3MubGVuZ3RoKSkpfX0se2tleTpcInNwZWVkXCIsc2V0OmZ1bmN0aW9uKGUpe3ZhciB0PW51bGw7bC5udW1iZXIoZSkmJih0PWUpLGwubnVtYmVyKHQpfHwodD10aGlzLnN0b3JhZ2UuZ2V0KFwic3BlZWRcIikpLGwubnVtYmVyKHQpfHwodD10aGlzLmNvbmZpZy5zcGVlZC5zZWxlY3RlZCksdDwuMSYmKHQ9LjEpLHQ+MiYmKHQ9MiksdGhpcy5jb25maWcuc3BlZWQub3B0aW9ucy5pbmNsdWRlcyh0KT8odGhpcy5jb25maWcuc3BlZWQuc2VsZWN0ZWQ9dCx0aGlzLm1lZGlhLnBsYXliYWNrUmF0ZT10KTp0aGlzLmRlYnVnLndhcm4oXCJVbnN1cHBvcnRlZCBzcGVlZCAoXCIrdCtcIilcIil9LGdldDpmdW5jdGlvbigpe3JldHVybiBOdW1iZXIodGhpcy5tZWRpYS5wbGF5YmFja1JhdGUpfX0se2tleTpcInF1YWxpdHlcIixzZXQ6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5jb25maWcucXVhbGl0eSxpPXRoaXMub3B0aW9ucy5xdWFsaXR5O2lmKGkubGVuZ3RoKXt2YXIgbj1bIWwuZW1wdHkoZSkmJk51bWJlcihlKSx0aGlzLnN0b3JhZ2UuZ2V0KFwicXVhbGl0eVwiKSx0LnNlbGVjdGVkLHQuZGVmYXVsdF0uZmluZChsLm51bWJlcik7aWYoIWkuaW5jbHVkZXMobikpe3ZhciBzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGwuYXJyYXkoZSkmJmUubGVuZ3RoP2UucmVkdWNlKGZ1bmN0aW9uKGUsaSl7cmV0dXJuIE1hdGguYWJzKGktdCk8TWF0aC5hYnMoZS10KT9pOmV9KTpudWxsfShpLG4pO3RoaXMuZGVidWcud2FybihcIlVuc3VwcG9ydGVkIHF1YWxpdHkgb3B0aW9uOiBcIituK1wiLCB1c2luZyBcIitzK1wiIGluc3RlYWRcIiksbj1zfXQuc2VsZWN0ZWQ9bix0aGlzLm1lZGlhLnF1YWxpdHk9bn19LGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1lZGlhLnF1YWxpdHl9fSx7a2V5OlwibG9vcFwiLHNldDpmdW5jdGlvbihlKXt2YXIgdD1sLmJvb2xlYW4oZSk/ZTp0aGlzLmNvbmZpZy5sb29wLmFjdGl2ZTt0aGlzLmNvbmZpZy5sb29wLmFjdGl2ZT10LHRoaXMubWVkaWEubG9vcD10fSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gQm9vbGVhbih0aGlzLm1lZGlhLmxvb3ApfX0se2tleTpcInNvdXJjZVwiLHNldDpmdW5jdGlvbihlKXt4ZS5jaGFuZ2UuY2FsbCh0aGlzLGUpfSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tZWRpYS5jdXJyZW50U3JjfX0se2tleTpcInBvc3RlclwiLHNldDpmdW5jdGlvbihlKXt0aGlzLmlzVmlkZW8/YmUuc2V0UG9zdGVyLmNhbGwodGhpcyxlLCExKS5jYXRjaChmdW5jdGlvbigpe30pOnRoaXMuZGVidWcud2FybihcIlBvc3RlciBjYW4gb25seSBiZSBzZXQgZm9yIHZpZGVvXCIpfSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pc1ZpZGVvP3RoaXMubWVkaWEuZ2V0QXR0cmlidXRlKFwicG9zdGVyXCIpOm51bGx9fSx7a2V5OlwiYXV0b3BsYXlcIixzZXQ6ZnVuY3Rpb24oZSl7dmFyIHQ9bC5ib29sZWFuKGUpP2U6dGhpcy5jb25maWcuYXV0b3BsYXk7dGhpcy5jb25maWcuYXV0b3BsYXk9dH0sZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIEJvb2xlYW4odGhpcy5jb25maWcuYXV0b3BsYXkpfX0se2tleTpcImN1cnJlbnRUcmFja1wiLHNldDpmdW5jdGlvbihlKXtjZS5zZXQuY2FsbCh0aGlzLGUsITEpfSxnZXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmNhcHRpb25zLHQ9ZS50b2dnbGVkLGk9ZS5jdXJyZW50VHJhY2s7cmV0dXJuIHQ/aTotMX19LHtrZXk6XCJsYW5ndWFnZVwiLHNldDpmdW5jdGlvbihlKXtjZS5zZXRMYW5ndWFnZS5jYWxsKHRoaXMsZSwhMSl9LGdldDpmdW5jdGlvbigpe3JldHVybihjZS5nZXRDdXJyZW50VHJhY2suY2FsbCh0aGlzKXx8e30pLmxhbmd1YWdlfX0se2tleTpcInBpcFwiLHNldDpmdW5jdGlvbihlKXt2YXIgdD1cInBpY3R1cmUtaW4tcGljdHVyZVwiLGk9XCJpbmxpbmVcIjtpZihGLnBpcCl7dmFyIG49bC5ib29sZWFuKGUpP2U6dGhpcy5waXA9PT1pO3RoaXMubWVkaWEud2Via2l0U2V0UHJlc2VudGF0aW9uTW9kZShuP3Q6aSl9fSxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gRi5waXA/dGhpcy5tZWRpYS53ZWJraXRQcmVzZW50YXRpb25Nb2RlOm51bGx9fV0sW3trZXk6XCJzdXBwb3J0ZWRcIix2YWx1ZTpmdW5jdGlvbihlLHQsaSl7cmV0dXJuIEYuY2hlY2soZSx0LGkpfX0se2tleTpcImxvYWRTcHJpdGVcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3JldHVybiB0ZShlLHQpfX0se2tleTpcInNldHVwXCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGk9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG49bnVsbDtyZXR1cm4gbC5zdHJpbmcodCk/bj1BcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodCkpOmwubm9kZUxpc3QodCk/bj1BcnJheS5mcm9tKHQpOmwuYXJyYXkodCkmJihuPXQuZmlsdGVyKGwuZWxlbWVudCkpLGwuZW1wdHkobik/bnVsbDpuLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gbmV3IGUodCxpKX0pfX1dKSxlfSgpO3JldHVybiBfZS5kZWZhdWx0cz0oU2U9dWUsSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShTZSkpKSxfZX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGx5ci5taW4uanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wbHlyL2Rpc3QvcGx5ci5taW4uanNcbi8vIG1vZHVsZSBpZCA9IDMxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbmNvbnN0IFZpZGVvRGlhbG9nQm94RXZlbnRCdXMgPSBuZXcgVnVlKHtcbiAgICBkYXRhKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcGVuVmlkZW9EaWFsb2dCb3ggOiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBvcGVuVmlkZW9EaWFsb2coYWxwaGFfaWQpe1xuICAgICAgICAgICAgdGhpcy5vcGVuVmlkZW9EaWFsb2dCb3ggPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgndmlkZW9EaWFsb2dTdGF0ZUNoYW5nZScsIGFscGhhX2lkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbG9zZVZpZGVvRGlhbG9nKHZpZGVvKXtcbiAgICAgICAgICAgIHRoaXMub3BlblZpZGVvRGlhbG9nQm94ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCd2aWRlb0RpYWxvZ0JveENsb3NlJywgdmlkZW8pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsb3NlRGlhbG9nQnlUYWdTZWFyY2godGFnKXtcbiAgICAgICAgICB0aGlzLm9wZW5WaWRlb0RpYWxvZ0JveCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuJGVtaXQoJ3ZpZGVvRGlhbG9nQm94Q2xvc2VCeVRhZycsIHRhZyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmlkZW9EaWFsb2dOZXh0QnV0dG9uQ2xpY2soKXtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ29uRGlhbG9nQ2xpY2tOZXh0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmlkZW9EaWFsb2dQcmV2QnV0dG9uQ2xpY2soKXtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ29uRGlhbG9nQ2xpY2tQcmV2Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZXNldEN1cnJlbnRWaWRlb0luZGlhbG9nKCl7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdvblJlc2V0Q3VycmVudFZpZGVvSW5kaWFsb2cnKTtcbiAgICAgICAgfVxuICAgIH1cbn0pXG5leHBvcnQgZGVmYXVsdCBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9ldmVudC1idXMvdmlkZW8tZGlhbG9nLWJveC1ldmVudC1idXMuanMiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbmNvbnN0IFN0b3J5RGlhbG9nQm94RXZlbnRCdXMgPSBuZXcgVnVlKHtcbiAgICBkYXRhKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcGVuU3RvcnlEaWFsb2dCb3ggOiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBvcGVuU3RvcnlEaWFsb2coYWxwaGFfaWQpe1xuICAgICAgICAgICAgdGhpcy5vcGVuU3RvcnlEaWFsb2dCb3ggPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnU3RvcnlEaWFsb2dTdGF0ZUNoYW5nZScsIGFscGhhX2lkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbG9zZVN0b3J5RGlhbG9nKFN0b3J5KXtcbiAgICAgICAgICAgIHRoaXMub3BlblN0b3J5RGlhbG9nQm94ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdTdG9yeURpYWxvZ0JveENsb3NlJywgU3RvcnkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN0b3J5RGlhbG9nTmV4dEJ1dHRvbkNsaWNrKCl7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdvblN0b3J5RGlhbG9nQ2xpY2tOZXh0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcnlEaWFsb2dQcmV2QnV0dG9uQ2xpY2soKXtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ29uU3RvcnlEaWFsb2dDbGlja1ByZXYnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlc2V0Q3VycmVudFN0b3J5SW5kaWFsb2coKXtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ29uUmVzZXRDdXJyZW50U3RvcnlJbmRpYWxvZycpO1xuICAgICAgICB9XG4gICAgfVxufSlcbmV4cG9ydCBkZWZhdWx0IFN0b3J5RGlhbG9nQm94RXZlbnRCdXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2V2ZW50LWJ1cy9zdG9yeS1kaWFsb2ctYm94LWV2ZW50LWJ1cy5qcyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1ZpZGVvUGxheWVyQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTgwNTkxODRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9WaWRlb1BsYXllckNvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2NvbXBvbmVudC9WaWRlb1BsYXllckNvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtOTgwNTkxODRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi05ODA1OTE4NFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2NvbXBvbmVudC9WaWRlb1BsYXllckNvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDMxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbmNvbnN0IFZpZGVvUGxheWVyRGlhbG9nQm94RXZlbnRCdXMgPSBuZXcgVnVlKHtcbiAgICBkYXRhKCl7XG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczp7XG4gICAgICAgIG9wZW5QbGF5ZXJEaWFsb2dCb3goYXNzZXQpe1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnb3BlblBsYXllckRpYWxvZ0JveCcsIGFzc2V0KVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsb3NlUGxheWVyRGlhbG9nQm94KCl7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZVBsYXllckRpYWxvZ0JveCcpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvUGxheWVyRGlhbG9nQm94RXZlbnRCdXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2V2ZW50LWJ1cy92aWRlby1wbGF5ZXItZGlhbG9nLWJveC1ldmVudC1idXMuanMiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImFkbWluLW1haWxlci1zZWN0aW9uXCI+XG4gICAgICAgIDwhLS0gVmlkZW8gZGlhbG9ncyAtLT5cbiAgICAgICAgPHZpZGVvLWluLWRpYWxvZz48L3ZpZGVvLWluLWRpYWxvZz5cblxuICAgICAgICA8IS0tIFN0b3J5IGRpYWxvZ3MgLS0+XG4gICAgICAgIDxzdG9yeS1pbi1kaWFsb2c+PC9zdG9yeS1pbi1kaWFsb2c+XG5cbiAgICAgICAgPCEtLSBWaWRlb1BsYXllciBkaWFsb2dib3ggZGlhbG9ncyAtLT5cbiAgICAgICAgPHZpZGVvLXBsYXllci1pbi1kaWFsb2c+PC92aWRlby1wbGF5ZXItaW4tZGlhbG9nPlxuXG5cbiAgICAgICAgPHYtZGlhbG9nXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRpYWxvZ1wiXG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoPVwiNDAwXCJcbiAgICAgICAgICAgICAgICBwZXJzaXN0ZW50XG4gICAgICAgICAgICAgICAgY29udGVudC1jbGFzcz1cIm1haWxlci1kaWFsb2ctZXJyb3JcIj5cbiAgICAgICAgICAgIDwhLS0gTWFpbCBlbXB0eSBjYXJkIC0tPlxuICAgICAgICAgICAgPHYtY2FyZCB2LWlmPVwibm90U2VsZWN0ZWRFcnJvclwiPlxuICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIHNpemU9XCI4MHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJibGFja1wiPmVycm9yX291dGxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQteHMtY2VudGVyXCI+PGg0IGNsYXNzPVwidGV4dC11cHBlcmNhc2VcIj57e2Vycm9yTWVzc2FnZX19PC9oND48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuXG4gICAgICAgICAgICAgICAgPHYtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiYmxhY2sgZGFya2VuLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdD1cImZsYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlXCI+T2tcbiAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgICAgICA8IS0tIEVuZCBtYWlsIGVtcHR5IGNhcmQgLS0+XG5cbiAgICAgICAgICAgIDwhLS0gUmVmcmVzaCBzdG9yaWVzIGNhcmQgLS0+XG4gICAgICAgICAgICA8di1jYXJkIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8di1jYXJkLXRleHQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlciBteS00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1wcm9ncmVzcy1jaXJjdWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c2l6ZT1cIjUwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOndpZHRoPVwiNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aW5kZXRlcm1pbmF0ZT1cImluZGV0ZXJtaW5hdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dmFsdWU9XCIhaW5kZXRlcm1pbmF0ZSA/IDEwMCA6IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIGNvbG9yPVwiYmxhY2tcIiB2LWlmPVwiIWluZGV0ZXJtaW5hdGVcIj5kb25lPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtcHJvZ3Jlc3MtY2lyY3VsYXI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwidGV4dC11cHBlcmNhc2VcIj57eyByZWZyZXNoVGl0bGUgfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuXG4gICAgICAgICAgICAgICAgPHYtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiYmxhY2sgZGFya2VuLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdD1cImZsYXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cImRpc2FibGVCdXR0b25cIj5Pa1xuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkLWFjdGlvbnM+XG4gICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgPC92LWRpYWxvZz5cbiAgICAgICAgPCEtLSBFbmQgcmVmcmVzaCBzdG9yaWVzIGRpYWxvZ3MgYm94IC0tPlxuXG4gICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgZmx1aWQ+XG4gICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgPHYtZmxleCBjbGFzcz1cInRleHQteHMtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gQGNsaWNrPVwib25BZGRTdG9yaWVzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+YWRkPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICBBZGQgU3Rvcmllc1xuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgPHYtZmxleCBjbGFzcz1cInRleHQteHMtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGRhcmsgcmFpc2VkIEBjbGljaz1cIm9uQ3JlYXRlTWFpbGVyKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+YWRkPC92LWljb24+Q3JlYXRlIE1haWxlclxuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWNvbnRhaW5lcj5cblxuICAgICAgICA8di1jb250YWluZXIgZmx1aWQgZ3JpZC1saXN0LWxnPlxuICAgICAgICAgICAgPHYtdGFic1xuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXItY29sb3I9XCJibGFja1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHYtdGFiPlxuICAgICAgICAgICAgICAgICAgICBTdG9yaWVzXG4gICAgICAgICAgICAgICAgPC92LXRhYj5cbiAgICAgICAgICAgICAgICA8di10YWItaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPHYtY2FyZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFpbGVyLXN0b3JpZXMtY29tcG9uZW50PjwvbWFpbGVyLXN0b3JpZXMtY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgICAgICAgICAgPC92LXRhYi1pdGVtPlxuXG4gICAgICAgICAgICAgICAgPHYtdGFiPlxuICAgICAgICAgICAgICAgICAgICBWaWRlb3NcbiAgICAgICAgICAgICAgICA8L3YtdGFiPlxuICAgICAgICAgICAgICAgIDx2LXRhYi1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8di1jYXJkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtY2FyZC10ZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYWlsZXItdmlkZW9zLWNvbXBvbmVudD48L21haWxlci12aWRlb3MtY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgICAgICAgICAgPC92LXRhYi1pdGVtPlxuICAgICAgICAgICAgPC92LXRhYnM+XG4gICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBNYWlsZXJWaWRlb3NDb21wb25lbnQgZnJvbSAnLi9tb2R1bGVzL1ZpZGVvc0NvbXBvbmVudHMnO1xuICAgIGltcG9ydCBNYWlsZXJTdG9yaWVzQ29tcG9uZW50IGZyb20gJy4vbW9kdWxlcy9TdG9yaWVzQ29tcG9uZW50cyc7XG4gICAgaW1wb3J0IFZpZGVvSW5EaWFsb2cgZnJvbSAnLi9tb2R1bGVzL1ZpZGVvSW5EaWFsb2cnO1xuICAgIGltcG9ydCBTdG9yeUluRGlhbG9nIGZyb20gJy4vbW9kdWxlcy9TdG9yeURpYWxvZyc7XG4gICAgaW1wb3J0IFZpZGVvUGxheWVySW5EaWFsb2cgZnJvbSAnLi9tb2R1bGVzL1ZpZGVvUGxheWVySW5EaWFsb2cnXG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIG1haWxlclZpZGVvc0NvbXBvbmVudDogTWFpbGVyVmlkZW9zQ29tcG9uZW50LFxuICAgICAgICAgICAgbWFpbGVyU3Rvcmllc0NvbXBvbmVudDogTWFpbGVyU3Rvcmllc0NvbXBvbmVudCxcbiAgICAgICAgICAgIHZpZGVvSW5EaWFsb2c6IFZpZGVvSW5EaWFsb2csXG4gICAgICAgICAgICBzdG9yeUluRGlhbG9nOiBTdG9yeUluRGlhbG9nLFxuICAgICAgICAgICAgVmlkZW9QbGF5ZXJJbkRpYWxvZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBkaWFsb2c6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgbm90U2VsZWN0ZWRFcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAnJyxcblxuICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVmcmVzaFRpdGxlOiAnUGxlYXNlIHdhaXQgd2hpbGUgdGhlIHN0b3JpZXMgdXBkYXRlLiBUaGlzIG1heSB0YWtlIGEgZmV3IG1pbnV0ZXMuJyxcbiAgICAgICAgICAgICAgICByZWZyZXNoSWNvbjogJ2RvbmUnLFxuXG4gICAgICAgICAgICAgICAgZGlzYWJsZUJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0IGlzIGxvYWRpbmcnKVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgb25DcmVhdGVNYWlsZXIoKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBzZWxlY3RlZCBzdG9yaWVzXG4gICAgICAgICAgICAgICAgbGV0IHN0b3JpZXMgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEFsbFNlbGVjdGVkU3RvcmllcztcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9zID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRBbGxTZWxlY3RlZFZpZGVvcztcbiAgICAgICAgICAgICAgICBpZiAoc3Rvcmllcy5sZW5ndGggPT09IDAgJiYgdmlkZW9zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IFwiUGxlYXNlIHNlbGVjdCBBIHN0b3J5IG9yIHZpZGVvXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90U2VsZWN0ZWRFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBzdG9yaWVzSWQgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9zSWQgPSBbXTtcbiAgICAgICAgICAgICAgICBzdG9yaWVzLmZvckVhY2goKHN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JpZXNJZC5wdXNoKHN0b3J5LmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZpZGVvcy5mb3JFYWNoKCh2aWRlbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2aWRlb3NJZC5wdXNoKHZpZGVvLmlkKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBzdG9yaWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoc3Rvcmllc0lkKTtcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9zU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmlkZW9zSWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2VuZCB0aGUgZGF0YSB0byBkb3dubG9hZGVkXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICcvYWRtaW4vbWFpbGVycy9jcmVhdGU/dmlkZW9zPScgKyB2aWRlb3NTdHJpbmcgKyAnJnN0b3JpZXM9JyArIHN0b3JpZXNTdHJpbmc7XG5cbiAgICAgICAgICAgICAgICBheGlvcy5nZXQodXJsKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9hZG1pbi9tYWlsZXJzL2VkaXQvJyArIHJlc3BvbnNlLmRhdGEubWFpbGVyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkFkZFN0b3JpZXMoKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2FkbWluL3N0b3JpZXMvY3JlYXRlJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9NYWlsZXJDb21wb25lbnQudnVlIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vVmlkZW9zQ29tcG9uZW50cy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTMxODZiN2NhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vVmlkZW9zQ29tcG9uZW50cy52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvc0NvbXBvbmVudHMudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTMxODZiN2NhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMzE4NmI3Y2FcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9WaWRlb3NDb21wb25lbnRzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzE5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwibWFpbGVyLXZpZGVvc1wiPlxuICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hUZXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU2VhcmNoXCI+XG5cbiAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcCBjbGFzcz1cImhpZGRlbi1zbS1hbmQtZG93blwiPlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMyBtZDMgbGczIHhsMz5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlRodW1ibmFpbDwvc3Ryb25nPlxuICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTMgbWQzIGxnNCB4bDQ+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5UaXRsZSAvIEV4Y2VycHQ8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8di1mbGV4IHhzNiBzbTYgbWQ2IGxnMiB4bDI+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5BdXRob3I8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc202IG1kNiBsZzIgeGwyPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+VXBkYXRlZCBBdDwvc3Ryb25nPlxuICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTYgbWQ2IGxnMSB4bDE+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5TZWxlY3Q8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgIDx2LWRpdmlkZXIgY2xhc3M9XCJoZWFkZXJcIj48L3YtZGl2aWRlcj5cbiAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICA8dmlkZW8tbG9vcC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICB2LWZvcj1cIih2aWRlbywgaW5kZXgpICBpbiB2aWRlb3MuZGF0YVwiXG4gICAgICAgICAgICAgICAgOmtleT1cInZpZGVvLmlkXCJcbiAgICAgICAgICAgICAgICA6aW5kZXg9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgOnZpZGVvPVwidmlkZW9cIj5cbiAgICAgICAgPC92aWRlby1sb29wLWNvbXBvbmVudD5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIiB2LWlmPVwidmlkZW9zLnRvdGFsID4gdmlkZW9zLnBlcl9wYWdlXCI+XG4gICAgICAgICAgICA8di1wYWdpbmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIDpsZW5ndGg9XCJ0b3RhbFBhZ2VcIlxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGFnZVwiXG4gICAgICAgICAgICAgICAgICAgIDp0b3RhbC12aXNpYmxlPVwiN1wiXG4gICAgICAgICAgICAgICAgICAgIGRhcmsgY29sb3I9XCJibGFja1wiPjwvdi1wYWdpbmF0aW9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IFZpZGVvTG9vcENvbXBvbmVudCBmcm9tICcuLi9wYXJ0aWFscy9WaWRlb0xvb3BDb21wb25lbnQnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBWaWRlb0xvb3BDb21wb25lbnRcbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgICAgIHZpZGVvczoge30sXG4gICAgICAgICAgICAgICAgdG90YWxQYWdlOiAwLFxuICAgICAgICAgICAgICAgIHNlYXJjaFRlcm06JydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgcGFnZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFZpZGVvc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCgpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNlYXJjaFRlcm0oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VmlkZW9zRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0VmlkZW9zRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGdldFZpZGVvc0RhdGEocXVlcnlPYmplY3QgPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICcvYXBpL3NlYXJjaC92aWRlb3MnO1xuICAgICAgICAgICAgICAgIGlmIChxdWVyeU9iamVjdC5wYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICc/cGFnZT0nICsgcXVlcnlPYmplY3QucGFnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihxdWVyeU9iamVjdC5zZWFyY2hUZXJtICE9ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICcmc2VhcmNoPScrIHF1ZXJ5T2JqZWN0LnNlYXJjaFRlcm07XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZpZGVvcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFZpZGVvRGF0YScsIHZpZGVvcy5kYXRhLnZpZGVvcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9zID0gdmlkZW9zLmRhdGEudmlkZW9zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUGFnZSA9IHRoaXMudmlkZW9zLmxhc3RfcGFnZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRRdWVyeU9iamVjdCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiAge1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFRlcm06IHRoaXMuc2VhcmNoVGVybVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvc0NvbXBvbmVudHMudnVlIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTMyZTAzNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9WaWRlb0xvb3BDb21wb25lbnQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1ZpZGVvTG9vcENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTJlMzJlMDM0XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9wYXJ0aWFscy9WaWRlb0xvb3BDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTJlMzJlMDM0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMmUzMmUwMzRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzIxXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTMyZTAzNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9WaWRlb0xvb3BDb21wb25lbnQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCI2NGY5MGQ3OVwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMmUzMmUwMzRcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi0yZTMyZTAzNFxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9WaWRlb0xvb3BDb21wb25lbnQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTJlMzJlMDM0XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzIyXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ubWFpbGVyLXZpZGVvcyAudi1pbnB1dCB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL2thbXJ1bGFobWVkL1NpdGVzL3NuaWZmci1hcHAvcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9wYXJ0aWFscy9WaWRlb0xvb3BDb21wb25lbnQudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLFVBQVU7RUFDVixXQUFXO0NBQUVcIixcImZpbGVcIjpcIlZpZGVvTG9vcENvbXBvbmVudC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm1haWxlci12aWRlb3MgLnYtaW5wdXQge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi0yZTMyZTAzNFwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL3BhcnRpYWxzL1ZpZGVvTG9vcENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDMyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxudmFyIG9wdGlvbnMgPSBudWxsXG52YXIgc3NySWRLZXkgPSAnZGF0YS12dWUtc3NyLWlkJ1xuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbiwgX29wdGlvbnMpIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlWycgKyBzc3JJZEtleSArICd+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuICBpZiAob3B0aW9ucy5zc3JJZCkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoc3NySWRLZXksIG9iai5pZClcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAzMjRcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMjVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiPHRlbXBsYXRlPlxuICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtNiBtZDYgbGczIHhsMz5cbiAgICAgICAgICAgIDx2LWNhcmQgZmxhdCBob3Zlcj5cbiAgICAgICAgICAgICAgICA8di1jYXJkLW1lZGlhXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyMDBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3JjPVwidmlkZW8udGh1bWIgPyB2aWRlby50aHVtYiA6ICAodmlkZW8uaW1hZ2UgPyB2aWRlby5pbWFnZSA6ICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbk9wZW5WaWRlb0RpYWxvZygpXCJcbiAgICAgICAgICAgICAgICA+PC92LWNhcmQtbWVkaWE+XG4gICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtNiBtZDYgbGc0IHhsNCBjbGFzcz1cIm1haWxlci10aXRsZVwiPlxuICAgICAgICAgICAgPGg0IEBjbGljaz1cIm9uT3BlblZpZGVvRGlhbG9nKClcIj57eyB2aWRlby50aXRsZSB9fTwvaDQ+XG4gICAgICAgICAgICA8cD57eyB2aWRlby5leGNlcnB0IHwgcmVhZG1vcmUoMzAwLCAnLi4uJykgfX08L3A+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHM2IHNtNiBtZDYgbGcyIHhsMj5cbiAgICAgICAgICAgIHt7IGdldEF1dGhvcigpfX1cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtNiBtZDYgbGcyIHhsMj5cbiAgICAgICAgICAgIHt7IHZpZGVvLmNyZWF0ZWRfYXQgfCBjb252ZXJ0RGF0ZSB9fVxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzNiBzbTYgbWQ2IGxnMSB4bDE+XG4gICAgICAgICAgICA8di1jaGVja2JveFxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgID48L3YtY2hlY2tib3g+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgIDx2LWRpdmlkZXI+PC92LWRpdmlkZXI+XG4gICAgICAgIDwvdi1mbGV4PlxuICAgIDwvdi1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzIGZyb20gJy4uLy4uLy4uL2V2ZW50LWJ1cy92aWRlby1kaWFsb2ctYm94LWV2ZW50LWJ1cyc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wczogWyd2aWRlbycsICdpbmRleCddLFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgc2VsZWN0ZWQoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdhZGRWaWRlbycsIHRoaXMudmlkZW8pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgncmVtb3ZlVmlkZW8nLCB0aGlzLnZpZGVvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIGxldCB2aWRlb3MgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEFsbFNlbGVjdGVkVmlkZW9zO1xuICAgICAgICAgICAgdmlkZW9zLmZvckVhY2goKHZpZGVvKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvLmlkID09PSB0aGlzLnZpZGVvLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLiRvbignYWRkZWRWaWRlb0Zyb21EaWFsb2cnLCAoYWRkZWRWaWRlbyk9PiB7XG4gICAgICAgICAgICAgICAgaWYoYWRkZWRWaWRlbyA9PT0gdGhpcy52aWRlby5pZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuJG9uKCdyZW1vdmVWaWRlb0Zyb21EaWFsb2cnLCAocmVtb3ZlZFZpZGVvKT0+IHtcbiAgICAgICAgICAgICAgICBpZihyZW1vdmVkVmlkZW8gPT09IHRoaXMudmlkZW8uaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGdldEF1dGhvcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52aWRlby5jcmVhdGVkX3VzZXIgPyB0aGlzLnZpZGVvLmNyZWF0ZWRfdXNlci51c2VybmFtZSA6ICcnO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25PcGVuVmlkZW9EaWFsb2coKSB7XG4gICAgICAgICAgICAgICAgVmlkZW9EaWFsb2dCb3hFdmVudEJ1cy5vcGVuVmlkZW9EaWFsb2codGhpcy52aWRlby5hbHBoYV9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG4gICAgLm1haWxlci12aWRlb3Mge1xuICAgICAgICAudi1pbnB1dCB7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBwYWRkaW5nOiAwXG4gICAgICAgIH1cbiAgICB9XG48L3N0eWxlPlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxheW91dFwiLFxuICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTY6IFwiXCIsIG1kNjogXCJcIiwgbGczOiBcIlwiLCB4bDM6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyBmbGF0OiBcIlwiLCBob3ZlcjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1jYXJkLW1lZGlhXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjIwMHB4XCIsXG4gICAgICAgICAgICAgICAgICBzcmM6IF92bS52aWRlby50aHVtYlxuICAgICAgICAgICAgICAgICAgICA/IF92bS52aWRlby50aHVtYlxuICAgICAgICAgICAgICAgICAgICA6IF92bS52aWRlby5pbWFnZVxuICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLnZpZGVvLmltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgOiBcIi9hc3NldHMvaW1hZ2VzL3BsYWNlaG9sZGVyLnBuZ1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0ub25PcGVuVmlkZW9EaWFsb2coKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWFpbGVyLXRpdGxlXCIsXG4gICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiwgc202OiBcIlwiLCBtZDY6IFwiXCIsIGxnNDogXCJcIiwgeGw0OiBcIlwiIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJoNFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5vbk9wZW5WaWRlb0RpYWxvZygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnZpZGVvLnRpdGxlKSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicFwiLCBbXG4gICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcInJlYWRtb3JlXCIpKF92bS52aWRlby5leGNlcnB0LCAzMDAsIFwiLi4uXCIpKSlcbiAgICAgICAgICBdKVxuICAgICAgICBdXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHM2OiBcIlwiLCBzbTY6IFwiXCIsIG1kNjogXCJcIiwgbGcyOiBcIlwiLCB4bDI6IFwiXCIgfSB9LCBbXG4gICAgICAgIF92bS5fdihcIlxcbiAgICAgICAgXCIgKyBfdm0uX3MoX3ZtLmdldEF1dGhvcigpKSArIFwiXFxuICAgIFwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc202OiBcIlwiLCBtZDY6IFwiXCIsIGxnMjogXCJcIiwgeGwyOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgIFwiXFxuICAgICAgICBcIiArXG4gICAgICAgICAgICAgIF92bS5fcyhfdm0uX2YoXCJjb252ZXJ0RGF0ZVwiKShfdm0udmlkZW8uY3JlYXRlZF9hdCkpICtcbiAgICAgICAgICAgICAgXCJcXG4gICAgXCJcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgeHM2OiBcIlwiLCBzbTY6IFwiXCIsIG1kNjogXCJcIiwgbGcxOiBcIlwiLCB4bDE6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LWNoZWNrYm94XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcImJsYWNrXCIgfSxcbiAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICBfdm0uc2VsZWN0ZWQgPSAkJHZcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWxlY3RlZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbX2MoXCJ2LWRpdmlkZXJcIildLCAxKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTJlMzJlMDM0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yZTMyZTAzNFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvVmlkZW9Mb29wQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzI3XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcIm1haWxlci12aWRlb3NcIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1yaWdodFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogXCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoVGVybSxcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnNlYXJjaFRlcm0gPSAkJHZcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlYXJjaFRlcm1cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaGlkZGVuLXNtLWFuZC1kb3duXCIsIGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMzogXCJcIiwgbWQzOiBcIlwiLCBsZzM6IFwiXCIsIHhsMzogXCJcIiB9IH0sXG4gICAgICAgICAgICBbX2MoXCJzdHJvbmdcIiwgW192bS5fdihcIlRodW1ibmFpbFwiKV0pXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMzogXCJcIiwgbWQzOiBcIlwiLCBsZzQ6IFwiXCIsIHhsNDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbX2MoXCJzdHJvbmdcIiwgW192bS5fdihcIlRpdGxlIC8gRXhjZXJwdFwiKV0pXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzNjogXCJcIiwgc202OiBcIlwiLCBtZDY6IFwiXCIsIGxnMjogXCJcIiwgeGwyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtfYyhcInN0cm9uZ1wiLCBbX3ZtLl92KFwiQXV0aG9yXCIpXSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc202OiBcIlwiLCBtZDY6IFwiXCIsIGxnMjogXCJcIiwgeGwyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtfYyhcInN0cm9uZ1wiLCBbX3ZtLl92KFwiVXBkYXRlZCBBdFwiKV0pXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtNjogXCJcIiwgbWQ2OiBcIlwiLCBsZzE6IFwiXCIsIHhsMTogXCJcIiB9IH0sXG4gICAgICAgICAgICBbX2MoXCJzdHJvbmdcIiwgW192bS5fdihcIlNlbGVjdFwiKV0pXVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgIFtfYyhcInYtZGl2aWRlclwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRlclwiIH0pXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uX2woX3ZtLnZpZGVvcy5kYXRhLCBmdW5jdGlvbih2aWRlbywgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIF9jKFwidmlkZW8tbG9vcC1jb21wb25lbnRcIiwge1xuICAgICAgICAgIGtleTogdmlkZW8uaWQsXG4gICAgICAgICAgYXR0cnM6IHsgaW5kZXg6IGluZGV4LCB2aWRlbzogdmlkZW8gfVxuICAgICAgICB9KVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnZpZGVvcy50b3RhbCA+IF92bS52aWRlb3MucGVyX3BhZ2VcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXBhZ2luYXRpb25cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBsZW5ndGg6IF92bS50b3RhbFBhZ2UsXG4gICAgICAgICAgICAgICAgICBcInRvdGFsLXZpc2libGVcIjogNyxcbiAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogXCJibGFja1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYWdlLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0ucGFnZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGFnZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0zMTg2YjdjYVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMzE4NmI3Y2FcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvVmlkZW9zQ29tcG9uZW50cy52dWVcbi8vIG1vZHVsZSBpZCA9IDMyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TdG9yaWVzQ29tcG9uZW50cy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTEzZTM3YzhjXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU3Rvcmllc0NvbXBvbmVudHMudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9TdG9yaWVzQ29tcG9uZW50cy52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMTNlMzdjOGNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0xM2UzN2M4Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1N0b3JpZXNDb21wb25lbnRzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzI5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwibWFpbGVyLXN0b3JpZXNcIj5cbiAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1yaWdodFwiPlxuICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoVGVybVwiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU2VhcmNoXCI+XG5cbiAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcCBjbGFzcz1cImhpZGRlbi1zbS1hbmQtZG93blwiPlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMyBtZDQ+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5UaHVtYm5haWw8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20zIG1kND5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPkRldGFpbHM8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8di1mbGV4IHhzNiBzbTYgbWQxPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+QXV0aG9yPC9zdHJvbmc+XG4gICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgPHYtZmxleCB4czYgc202IG1kMT5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPlN0YXRlPC9zdHJvbmc+XG4gICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtNiBtZDE+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5VcGRhdGVkIEF0PC9zdHJvbmc+XG4gICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtNiBtZDE+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5TZWxlY3Q8L3N0cm9uZz5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgIDx2LWRpdmlkZXIgY2xhc3M9XCJoZWFkZXJcIj48L3YtZGl2aWRlcj5cbiAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICA8c3RvcnktbG9vcC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICB2LWZvcj1cIihzdG9yeSwgaW5kZXgpICBpbiBzdG9yaWVzLmRhdGFcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJzdG9yeS5pZFwiXG4gICAgICAgICAgICAgICAgOmluZGV4PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgIDpzdG9yeT1cInN0b3J5XCI+PC9zdG9yeS1sb29wLWNvbXBvbmVudD5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIiB2LWlmPVwic3Rvcmllcy50b3RhbCA+IHN0b3JpZXMucGVyX3BhZ2VcIj5cbiAgICAgICAgICAgIDx2LXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgOmxlbmd0aD1cInRvdGFsUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgOnRvdGFsLXZpc2libGU9XCI3XCJcbiAgICAgICAgICAgICAgICAgICAgZGFyayBjb2xvcj1cImJsYWNrXCI+XG4gICAgICAgICAgICA8L3YtcGFnaW5hdGlvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBTdG9yeUxvb3BDb21wb25lbnQgZnJvbSAnLi4vcGFydGlhbHMvU3RvcnlMb29wQ29tcG9uZW50JztcbiAgICBpbXBvcnQgTWFpbGVyRXZlbnRCdXMgZnJvbSAnLi4vLi4vLi4vZXZlbnQtYnVzL21haWxlci1ldmVudC1idXMnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBTdG9yeUxvb3BDb21wb25lbnRcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICAgICAgICBzdG9yaWVzOiAnJyxcbiAgICAgICAgICAgICAgICB0b3RhbFBhZ2U6IDAsXG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybTonJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBwYWdlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3Rvcmllc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCgpKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNlYXJjaFRlcm0oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3Rvcmllc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5nZXRTdG9yaWVzRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KCkpO1xuXG4gICAgICAgICAgICBNYWlsZXJFdmVudEJ1cy4kb24oJ3N0b3JpZXNVcGRhdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFN0b3JpZXNEYXRhKCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGdldFN0b3JpZXNEYXRhKHF1ZXJ5T2JqZWN0ID0ge3BhZ2U6IDEsIHNlYXJjaFRlcm06ICcnfSkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAnL2FwaS9zZWFyY2gvc3Rvcmllcyc7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5T2JqZWN0LnBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJz9wYWdlPScgKyBxdWVyeU9iamVjdC5wYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHF1ZXJ5T2JqZWN0LnNlYXJjaFRlcm0gIT0gJycpe1xuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJyZzZWFyY2g9JysgcXVlcnlPYmplY3Quc2VhcmNoVGVybTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB1cmwgKz0gJyZtYWlsZXI9dHJ1ZSc7XG5cbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRTdG9yaWVzJywgcmVzcG9uc2UuZGF0YS5zdG9yaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxQYWdlID0gcmVzcG9uc2UuZGF0YS5zdG9yaWVzLmxhc3RfcGFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmllcyA9IHJlc3BvbnNlLmRhdGEuc3RvcmllcztcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFF1ZXJ5T2JqZWN0KCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoVGVybTogdGhpcy5zZWFyY2hUZXJtXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvU3Rvcmllc0NvbXBvbmVudHMudnVlIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3RvcnlMb29wQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTk5NDIyYThcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TdG9yeUxvb3BDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvU3RvcnlMb29wQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0xOTk0MjJhOFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTE5OTQyMmE4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL3BhcnRpYWxzL1N0b3J5TG9vcENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDMzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCI8dGVtcGxhdGU+XG4gICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICA8di1mbGV4IHhzMTIgc202IG1kND5cbiAgICAgICAgICAgIDx2LWNhcmQgZmxhdCBob3Zlcj5cbiAgICAgICAgICAgICAgICA8di1jYXJkLW1lZGlhXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyNTBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3JjPVwic3RvcnkudGh1bWIgPyBzdG9yeS50aHVtYiA6ICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uT3BlblN0b3J5RGlhbG9nKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdC1zdG9yeVwiIHYtaWY9XCJzdG9yeS5mbGFnZ2VkID09PSAxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG90LXN0b3J5LWNvbnRlbnRcIj5IT1Q8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQtbWVkaWE+XG4gICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtNiBtZDQ+XG4gICAgICAgICAgICA8aDQgdi1odG1sPVwic3RvcnkudGl0bGVcIj48L2g0PlxuICAgICAgICAgICAgPGRpdiB2LWh0bWw9XCJzdG9yeS5leGNlcnB0XCI+PC9kaXY+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHM2IHNtNiBtZDE+XG4gICAgICAgICAgICB7eyBzdG9yeS5hdXRob3IgfX1cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czYgc202IG1kMT5cbiAgICAgICAgICAgIHt7IHN0b3J5LnN0YXRlIH19XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTYgbWQxPlxuICAgICAgICAgICAge3sgc3RvcnkuY3JlYXRlZF9hdCB8IGNvbnZlcnREYXRlIH19XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHM2IHNtNiBtZDEgY2xhc3M9XCJzdG9yeS1pbnB1dFwiPlxuICAgICAgICAgICAgPHYtY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICA+PC92LWNoZWNrYm94PlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICA8di1kaXZpZGVyPjwvdi1kaXZpZGVyPlxuICAgICAgICA8L3YtZmxleD5cbiAgICA8L3YtbGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cyBmcm9tICcuLi8uLi8uLi9ldmVudC1idXMvc3RvcnktZGlhbG9nLWJveC1ldmVudC1idXMnO1xuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGN1cnJTdG9yeTogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wczogWydzdG9yeScsICdpbmRleCddLFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBzZWxlY3RlZChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2FkZFN0b3J5JywgdGhpcy5jdXJyU3RvcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgncmVtb3ZlU3RvcnknLCB0aGlzLmN1cnJTdG9yeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICBsZXQgc3RvcmllcyA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0QWxsU2VsZWN0ZWRTdG9yaWVzO1xuICAgICAgICAgICAgdGhpcy5jdXJyU3RvcnkgPSB0aGlzLnN0b3J5O1xuXG4gICAgICAgICAgICBzdG9yaWVzLmZvckVhY2goKHN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3J5LmlkID09PSB0aGlzLnN0b3J5LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRvbignYWRkZWRTdG9yeUZyb21EaWFsb2cnLCAoYWRkZWRTdG9yeSk9PiB7XG4gICAgICAgICAgICAgICAgaWYoYWRkZWRTdG9yeSA9PT0gdGhpcy5jdXJyU3RvcnkuaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRvbigncmVtb3ZlZFN0b3J5RnJvbURpYWxvZycsIChyZW1vdmVkU3RvcnkpPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlbW92ZWRTdG9yeSA9PT0gdGhpcy5jdXJyU3RvcnkuaWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIG9uU3RvcnlTZWxlY3QoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbk9wZW5TdG9yeURpYWxvZygpe1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0Q3VycmVudFN0b3J5QXNzZXRzJywgdGhpcy5zdG9yeSk7XG4gICAgICAgICAgICAgICAgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cy5vcGVuU3RvcnlEaWFsb2codGhpcy5zdG9yeS5hbHBoYV9pZCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkVkaXRTdG9yaWVzKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbi9zdG9yaWVzL2VkaXQvJyt0aGlzLnN0b3J5LmlkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvcGFydGlhbHMvU3RvcnlMb29wQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxheW91dFwiLFxuICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTY6IFwiXCIsIG1kNDogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGZsYXQ6IFwiXCIsIGhvdmVyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmQtbWVkaWFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMjUwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBfdm0uc3RvcnkudGh1bWJcbiAgICAgICAgICAgICAgICAgICAgICA/IF92bS5zdG9yeS50aHVtYlxuICAgICAgICAgICAgICAgICAgICAgIDogXCIvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmdcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ub25PcGVuU3RvcnlEaWFsb2coKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uc3RvcnkuZmxhZ2dlZCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaG90LXN0b3J5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJob3Qtc3RvcnktY29udGVudFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiSE9UXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc202OiBcIlwiLCBtZDQ6IFwiXCIgfSB9LCBbXG4gICAgICAgIF9jKFwiaDRcIiwgeyBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0uc3RvcnkudGl0bGUpIH0gfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5LmV4Y2VycHQpIH0gfSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHM2OiBcIlwiLCBzbTY6IFwiXCIsIG1kMTogXCJcIiB9IH0sIFtcbiAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgICBcIiArIF92bS5fcyhfdm0uc3RvcnkuYXV0aG9yKSArIFwiXFxuICAgIFwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czY6IFwiXCIsIHNtNjogXCJcIiwgbWQxOiBcIlwiIH0gfSwgW1xuICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgIFwiICsgX3ZtLl9zKF92bS5zdG9yeS5zdGF0ZSkgKyBcIlxcbiAgICBcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc202OiBcIlwiLCBtZDE6IFwiXCIgfSB9LCBbXG4gICAgICAgIF92bS5fdihcbiAgICAgICAgICBcIlxcbiAgICAgICAgXCIgK1xuICAgICAgICAgICAgX3ZtLl9zKF92bS5fZihcImNvbnZlcnREYXRlXCIpKF92bS5zdG9yeS5jcmVhdGVkX2F0KSkgK1xuICAgICAgICAgICAgXCJcXG4gICAgXCJcbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic3RvcnktaW5wdXRcIiwgYXR0cnM6IHsgeHM2OiBcIlwiLCBzbTY6IFwiXCIsIG1kMTogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInYtY2hlY2tib3hcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwiYmxhY2tcIiB9LFxuICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZCA9ICQkdlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlbGVjdGVkXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sIFtfYyhcInYtZGl2aWRlclwiKV0sIDEpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMTk5NDIyYThcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTE5OTQyMmE4XCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9wYXJ0aWFscy9TdG9yeUxvb3BDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSAzMzNcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5cbmNvbnN0IE1haWxlckV2ZW50QnVzID0gbmV3IFZ1ZSh7XG4gICAgZGF0YSgpe1xuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICBzdG9yaWVzVXBkYXRlZCgpe1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnc3Rvcmllc1VwZGF0ZWQnKVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE1haWxlckV2ZW50QnVzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9ldmVudC1idXMvbWFpbGVyLWV2ZW50LWJ1cy5qcyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcIm1haWxlci1zdG9yaWVzXCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtcmlnaHRcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlYXJjaFRlcm0sXG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS5zZWFyY2hUZXJtID0gJCR2XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2hUZXJtXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImhpZGRlbi1zbS1hbmQtZG93blwiLCBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTM6IFwiXCIsIG1kNDogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgIF9jKFwic3Ryb25nXCIsIFtfdm0uX3YoXCJUaHVtYm5haWxcIildKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTM6IFwiXCIsIG1kNDogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgIF9jKFwic3Ryb25nXCIsIFtfdm0uX3YoXCJEZXRhaWxzXCIpXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHM2OiBcIlwiLCBzbTY6IFwiXCIsIG1kMTogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgIF9jKFwic3Ryb25nXCIsIFtfdm0uX3YoXCJBdXRob3JcIildKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czY6IFwiXCIsIHNtNjogXCJcIiwgbWQxOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgX2MoXCJzdHJvbmdcIiwgW192bS5fdihcIlN0YXRlXCIpXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc202OiBcIlwiLCBtZDE6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICBfYyhcInN0cm9uZ1wiLCBbX3ZtLl92KFwiVXBkYXRlZCBBdFwiKV0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtNjogXCJcIiwgbWQxOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgX2MoXCJzdHJvbmdcIiwgW192bS5fdihcIlNlbGVjdFwiKV0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgIFtfYyhcInYtZGl2aWRlclwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRlclwiIH0pXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uX2woX3ZtLnN0b3JpZXMuZGF0YSwgZnVuY3Rpb24oc3RvcnksIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfYyhcInN0b3J5LWxvb3AtY29tcG9uZW50XCIsIHtcbiAgICAgICAgICBrZXk6IHN0b3J5LmlkLFxuICAgICAgICAgIGF0dHJzOiB7IGluZGV4OiBpbmRleCwgc3Rvcnk6IHN0b3J5IH1cbiAgICAgICAgfSlcbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5zdG9yaWVzLnRvdGFsID4gX3ZtLnN0b3JpZXMucGVyX3BhZ2VcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXBhZ2luYXRpb25cIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBsZW5ndGg6IF92bS50b3RhbFBhZ2UsXG4gICAgICAgICAgICAgICAgICBcInRvdGFsLXZpc2libGVcIjogNyxcbiAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogXCJibGFja1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYWdlLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICBfdm0ucGFnZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGFnZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0xM2UzN2M4Y1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMTNlMzdjOGNcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvU3Rvcmllc0NvbXBvbmVudHMudnVlXG4vLyBtb2R1bGUgaWQgPSAzMzVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vVmlkZW9JbkRpYWxvZy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTIzNmRmOWFhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vVmlkZW9JbkRpYWxvZy52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvSW5EaWFsb2cudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTIzNmRmOWFhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjM2ZGY5YWFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9WaWRlb0luRGlhbG9nLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzM2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIjx0ZW1wbGF0ZT5cbiAgICA8IS0tIERpYWxvZyBib3ggLS0+XG4gICAgPHYtZGlhbG9nXG4gICAgICAgICAgICB2LW1vZGVsPVwidmlkZW9fZGlhbG9nXCJcbiAgICAgICAgICAgIHNjcm9sbGFibGVcbiAgICAgICAgICAgIGNvbnRlbnQtY2xhc3M9XCJ2aWRlby1kaWFsb2ctY29udGFpbmVyXCJcbiAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctYm94LXN3aXRjaCBwcmV2XCI+XG4gICAgICAgICAgICA8di1idG4gY29sb3I9XCJkYXJrIG1hLTAgaGlkZGVuLXhzLW9ubHlcIiBmYWIgc21hbGwgIGRhcmsgQGNsaWNrPVwib25QcmV2aW91c1ZpZGVvKClcIiA6ZGlzYWJsZWQ9XCIhcHJldmlvdXNQYWdlRXhpc3RzXCIgPlxuICAgICAgICAgICAgICAgIDx2LWljb24+Y2hldnJvbl9sZWZ0PC92LWljb24+XG4gICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWJveC1zd2l0Y2ggbmV4dFwiPlxuICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiZGFyayBtYS0wIGhpZGRlbi14cy1vbmx5XCIgZmFiIHNtYWxsICBkYXJrIEBjbGljaz1cIm9uTmV4dFZpZGVvKClcIiA6ZGlzYWJsZWQ9XCIhbmV4dFBhZ2VFeGlzdHNcIiA+XG4gICAgICAgICAgICAgICAgPHYtaWNvbj5jaGV2cm9uX3JpZ2h0PC92LWljb24+XG4gICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8di1jYXJkPlxuICAgICAgICAgICAgPHYtdG9vbGJhciBjYXJkIGRhcmsgY29sb3I9XCJkYXJrXCI+XG4gICAgICAgICAgICAgICAgPHYtYnRuIGljb24gZGFyayBAY2xpY2submF0aXZlPVwib25DbG9zZURpYWxvZ0JveCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+Y2xvc2U8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG5cbiAgICAgICAgICAgICAgICA8di10b29sYmFyLWl0ZW1zPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbGVyLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBBZGQgdG8gbWFpbGVyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8di1jaGVja2JveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cIm9uVmlkZW9DbGljaygpXCJcbiAgICAgICAgICAgICAgICAgICAgPjwvdi1jaGVja2JveD5cbiAgICAgICAgICAgICAgICA8L3YtdG9vbGJhci1pdGVtcz5cblxuICAgICAgICAgICAgPC92LXRvb2xiYXI+XG5cbiAgICAgICAgICAgIDx2LWNhcmQtdGV4dCBjbGFzcz1cInZpZGVvLWRpYWxvZy1ib3hcIj5cbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1kaWFsb2ctbG9hZGluZ1wiPjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QteGwgZmx1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtdG91Y2g9XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICgpID0+IHN3aXBlKCdMZWZ0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAoKSA9PiBzd2lwZSgnUmlnaHQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHZpZGVvLWRpYWxvZy1jb21wb25lbnQ+PC92aWRlby1kaWFsb2ctY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuXG5cbiAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgPC92LWNhcmQ+XG4gICAgPC92LWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IFZpZGVvRGlhbG9nQm94RXZlbnRCdXMgZnJvbSAnLi4vLi4vLi4vZXZlbnQtYnVzL3ZpZGVvLWRpYWxvZy1ib3gtZXZlbnQtYnVzJztcbiAgICBpbXBvcnQgVmlkZW9EaWFsb2dDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vaW5jbHVkZXMvVmlkZW9JbkRpYWxvZ0NvbXBvbmVudCc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOmZhbHNlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRfdmlkZW86ICcnLFxuICAgICAgICAgICAgICAgIHZpZGVvX2RpYWxvZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWFyZ2luX2NvbnRlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY3VycmVudF9wYWdlOiAwLFxuXG4gICAgICAgICAgICAgICAgbmV4dFBhZ2VFeGlzdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgbmV4dFBhZ2VBbHBoYUlkOiAnJyxcblxuICAgICAgICAgICAgICAgIHByZXZpb3VzUGFnZUV4aXN0czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c1BhZ2VBbHBoYUlkOiAnJyxcbiAgICAgICAgICAgICAgICBzd2lwZURpcmVjdGlvbjonJyxcblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICB2aWRlb19kaWFsb2coKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy52aWRlb19kaWFsb2cgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0RW50ZXJTdGF0ZVVybDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe3BhdGg6IHVybH0pO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0UmVzZXRWaWRlb0RpYWxvZ09iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFZpZGVvRGlhbG9nQ29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50X2RldmljZSA9IHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC5uYW1lO1xuICAgICAgICAgICAgaWYoY3VycmVudF9kZXZpY2UgPT0gJ3NtJyB8fCBjdXJyZW50X2RldmljZSA9PSAneHMnKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmdpbl9jb250ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuJG9uKCd2aWRlb0RpYWxvZ1N0YXRlQ2hhbmdlJywgKGFscGhhX2lkKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb19kaWFsb2cgPSBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLm9wZW5WaWRlb0RpYWxvZ0JveDtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuJG9uKCdzZXROZXh0UHJldkJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRQYWdlQWxwaGFJZCA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0TmV4dFZpZGVvQWxwaGFJZDtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFnZUFscGhhSWQgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFByZXZWaWRlb0FscGhhSWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQWxwaGFJZEV4aXN0cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF92aWRlbyA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFZpZGVvRm9yRGlhbG9nO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pc1ZpZGVvU2VsZWN0ZWQoKVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLiRvbigndmlkZW9EaWFsb2dCb3hDbG9zZScsICh2aWRlbykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fZGlhbG9nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICd2aWRlb3NfZGV0YWlsJywgcGFyYW1zIDoge2lkIDogdmlkZW8uYWxwaGFfaWR9fSk7XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuJG9uKCd2aWRlb0RpYWxvZ0JveENsb3NlQnlUYWcnLCAodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb19kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICd2aWRlb3NfdGFnJywgcGFyYW1zOiB7dmFsdWU6IHRhZy5uYW1lfX0pO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgc3dpcGUgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVEaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnUmlnaHQnKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzVmlkZW8oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdMZWZ0Jyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25OZXh0VmlkZW8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblByZXZpb3VzVmlkZW8oKXtcblxuICAgICAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMudmlkZW9EaWFsb2dQcmV2QnV0dG9uQ2xpY2soKVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25OZXh0VmlkZW8oKXtcblxuICAgICAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMudmlkZW9EaWFsb2dOZXh0QnV0dG9uQ2xpY2soKVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblZpZGVvQ2xpY2soKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2FkZFZpZGVvJywgdGhpcy5jdXJyZW50X3ZpZGVvKTtcbiAgICAgICAgICAgICAgICAgICAgVmlkZW9EaWFsb2dCb3hFdmVudEJ1cy4kZW1pdCgnYWRkZWRWaWRlb0Zyb21EaWFsb2cnLCB0aGlzLmN1cnJlbnRfdmlkZW8uaWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuJGVtaXQoJ3JlbW92ZVZpZGVvRnJvbURpYWxvZycsIHRoaXMuY3VycmVudF92aWRlby5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgncmVtb3ZlVmlkZW8nLCB0aGlzLmN1cnJlbnRfdmlkZW8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uQ2xvc2VEaWFsb2dCb3goKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb19kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNoZWNrQWxwaGFJZEV4aXN0cygpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dFBhZ2VBbHBoYUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFBhZ2VFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0UGFnZUV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZpb3VzUGFnZUFscGhhSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1BhZ2VFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1BhZ2VFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGlzVmlkZW9TZWxlY3RlZCgpe1xuICAgICAgICAgICAgICAgIGxldCB2aWRlb3MgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEFsbFNlbGVjdGVkVmlkZW9zO1xuXG4gICAgICAgICAgICAgICAgLy9zZXQgaW5pdGlhbGl6ZSBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2aWRlb3MuZm9yRWFjaCgodmlkZW8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvLmlkID09PSB0aGlzLmN1cnJlbnRfdmlkZW8uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9WaWRlb0luRGlhbG9nLnZ1ZSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1ZpZGVvSW5EaWFsb2dDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1kOTM3Y2U4NFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1ZpZGVvSW5EaWFsb2dDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9pbmNsdWRlcy9WaWRlb0luRGlhbG9nQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kOTM3Y2U4NFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQ5MzdjZTg0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvaW5jbHVkZXMvVmlkZW9JbkRpYWxvZ0NvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDMzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInZpZGVvLWRpYWxvZy1jb250ZW50XCI+XG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWlmPVwidmlkZW9fZGV0YWlsXCI+XG5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNyBsZzcgeGw3PlxuICAgICAgICAgICAgICAgIDx2aWRlby1wbGF5ZXIgOnZpZGVvPVwidmlkZW9fZGV0YWlsXCI+PC92aWRlby1wbGF5ZXI+XG4gICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ1IGxnNSB4bDUgOmNsYXNzPVwieydwbC00JyA6IGNvbnRlbnRfcGFkZGluZywgJ3B0LTQnOiAhY29udGVudF9wYWRkaW5nfVwiPlxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcCBjbGFzcz1cInZpZGVvLWRldGFpbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhcz1cInZpZGVvLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPnt7IHZpZGVvX2RldGFpbC50aXRsZSB9fTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvLXRpdGxlLWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwIGp1c3RpZnktY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzbWFsbD5hbGFybTwvdi1pY29uPiB7e3ZpZGVvX2RldGFpbC5kdXJhdGlvbiB8IGNvbnZlcnRUaW1lfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHM2IGNsYXNzPVwidGV4dC14cy1yaWdodFwiIHYtaWY9XCJ2aWRlb19kZXRhaWwudmlld3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIHNtYWxsID5yZW1vdmVfcmVkX2V5ZTwvdi1pY29uPiB7eyB2aWRlb19kZXRhaWwudmlld3MgKyAxfX0gdmlld3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cInZpZGVvX2RldGFpbC5kZXNjcmlwdGlvbiAhPSAnbnVsbCdcIiBjbGFzcz1cImNvbnRlbnQtZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57eyB2aWRlb19kZXRhaWwuZGVzY3JpcHRpb24gfCByZWFkbW9yZSgzMDAsICcuLi4nKX19PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWFkLW1vcmUgdGV4dC14cy1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIEBjbGljay5zdG9wPVwiZ29Ub0RldGFpbCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24gc21hbGw+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhZCBtb3JlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1kZXRhaWwtdGFnc1wiIHYtaWY9XCJ0YWdzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgaWQ9XCJ0YWdzXCI+VGFnczo8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwidGFnIGluIHZpZGVvX2RldGFpbC50YWdzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBAY2xpY2suc3RvcD1cImdvVG9UYWdTZWFyY2godGFnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICN7eyB0YWcubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLTx2LWZsZXggeHMxMj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08di1sYXlvdXQgY29sdW1uIHdyYXAgYWxpZ24tZW5kIGNsYXNzPVwidmlkZW8tZGV0YWlsLXNpZGViYXJcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInZpZGVvLWRldGFpbC1zb2NpYWwtc2hhcmVcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx2LWJ0biBkYXJrIGJsb2NrIGNsYXNzPVwiZGFya1wiPkdldCBRdW90ZTwvdi1idG4+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvdi1sYXlvdXQ+LS0+XG4gICAgICAgICAgICAgICAgICAgIDwhLS08L3YtZmxleD4tLT5cblxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgPC92LWxheW91dD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IFZpZGVvRGlhbG9nQm94RXZlbnRCdXMgZnJvbSAnLi4vZXZlbnQtYnVzL3ZpZGVvLWRpYWxvZy1ib3gtZXZlbnQtYnVzJztcbiAgICBpbXBvcnQgVmlkZW9QbGF5ZXIgZnJvbSAnLi4vY29tcG9uZW50L1ZpZGVvUGxheWVyQ29tcG9uZW50JztcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICB2aWRlb1BsYXllcjogVmlkZW9QbGF5ZXJcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmlkZW9fZGV0YWlsOiAnJyxcbiAgICAgICAgICAgICAgICB0YWdzOiBbXSxcblxuICAgICAgICAgICAgICAgIHJlYWR5X3RvX3Nob3c6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBjb250ZW50X3BhZGRpbmc6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgICckcm91dGUnKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIGxldCBicmVha3BvaW50ID0gdGhpcy4kdnVldGlmeS5icmVha3BvaW50Lm5hbWU7XG4gICAgICAgICAgICBpZiAoYnJlYWtwb2ludCA9PT0gJ3NtJyB8fCBicmVha3BvaW50ID09PSAneHMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50X3BhZGRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVmlkZW9EaWFsb2dCb3hFdmVudEJ1cy4kb24oJ3ZpZGVvRGlhbG9nU3RhdGVDaGFuZ2UnLCAoYWxwaGFfaWQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFZpZGVvRGF0YShhbHBoYV9pZCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLiRvbignb25EaWFsb2dDbGlja05leHQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFscGhhX2lkID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXROZXh0VmlkZW9BbHBoYUlkO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VmlkZW9EYXRhKGFscGhhX2lkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLiRvbignb25EaWFsb2dDbGlja1ByZXYnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFscGhhX2lkID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRQcmV2VmlkZW9BbHBoYUlkO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VmlkZW9EYXRhKGFscGhhX2lkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLiRvbignb25SZXNldEN1cnJlbnRWaWRlb0luZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fZGV0YWlsID0gJyc7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBnZXRWaWRlb0RhdGEoYWxwaGFfaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFJvdXRlT2JqZWN0JywgdGhpcy4kcm91dGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2dldFZpZGVvTmV4dEFuZFByZXZMaW5rJywge2FscGhhX2lkOiBhbHBoYV9pZH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX2RldGFpbCA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFZpZGVvRm9yRGlhbG9nO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aWRlb19kZXRhaWwudGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ3MucHVzaCguLi50aGlzLnZpZGVvX2RldGFpbC50YWdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgVmlkZW9EaWFsb2dCb3hFdmVudEJ1cy4kZW1pdCgnc2V0TmV4dFByZXZCdXR0b24nKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0UmVjb21tZW5kZWREYXRhKGFscGhhX2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSb3V0ZU9iamVjdCcsIHRoaXMuJHJvdXRlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdnZXRWaWRlb05leHRBbmRQcmV2TGluaycsIHthbHBoYV9pZDogYWxwaGFfaWR9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb19kZXRhaWwgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRSZWNvbW1lbmRlZEZvckRpYWxvZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlkZW9fZGV0YWlsLnRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzLnB1c2goLi4udGhpcy52aWRlb19kZXRhaWwudGFncyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuJGVtaXQoJ3NldE5leHRQcmV2QnV0dG9uJyk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldE1haWxlclZpZGVvRGF0YShhbHBoYV9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0Um91dGVPYmplY3QnLCB0aGlzLiRyb3V0ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ2V0VmlkZW9OZXh0QW5kUHJldkxpbmsnLCB7YWxwaGFfaWQ6IGFscGhhX2lkfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fZGV0YWlsID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRDdXJyZW50TWFpbGVyVmlkZW9Gb3JEaWFsb2c7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZGVvX2RldGFpbC50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFncy5wdXNoKC4uLnRoaXMudmlkZW9fZGV0YWlsLnRhZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLiRlbWl0KCdzZXROZXh0UHJldkJ1dHRvbicpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnb1RvVGFnU2VhcmNoKHRhZykge1xuICAgICAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuY2xvc2VEaWFsb2dCeVRhZ1NlYXJjaCh0YWcpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ29Ub0RldGFpbCgpIHtcbiAgICAgICAgICAgICAgICBWaWRlb0RpYWxvZ0JveEV2ZW50QnVzLmNsb3NlVmlkZW9EaWFsb2codGhpcy52aWRlb19kZXRhaWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3llZCgpIHtcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9pbmNsdWRlcy9WaWRlb0luRGlhbG9nQ29tcG9uZW50LnZ1ZSIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwidmlkZW8tcGxheWVyXCI+XG4gICAgICAgIDxkaXYgdi1pZj1cInNob3dWaWRlb1wiPlxuICAgICAgICAgICAgPCEtLSBTMyBsaW4gLS0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiczMtdmlkZW9cIiB2LWlmPVwiczNfdmlkZW9cIj5cbiAgICAgICAgICAgICAgICA8dmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHNcbiAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicGxheWVyVmlkZW9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSA6c3JjPVwidmlkZW8uZmlsZV93YXRlcm1hcmtfZGlydHlcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSB2aWRlbyB0YWcuXG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwieW91dHViZS12aWRlb1wiIHYtZWxzZS1pZj1cInlvdXR1YmVWaWRlb1wiPlxuICAgICAgICAgICAgICAgIDxwbHlyLXlvdXR1YmUgOmlkPVwidGhpcy55b3V0dWJlSURcIiA6cGU9XCJmYWxzZVwiIDpvcHRpb25zPVwieW91dHViZVZpZGVvUGxheWVyT3B0aW9uXCIvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb2NpYWwtdmlkZW9cIiB2LWVsc2UtaWY9XCJzb2NpYWxWaWRlb1wiPlxuICAgICAgICAgICAgICAgIDwhLS08di1wcm9ncmVzcy1jaXJjdWxhci0tPlxuICAgICAgICAgICAgICAgIDwhLS06c2l6ZT1cIjQwXCItLT5cbiAgICAgICAgICAgICAgICA8IS0tY29sb3I9XCJkYXJrXCItLT5cbiAgICAgICAgICAgICAgICA8IS0taW5kZXRlcm1pbmF0ZS0tPlxuICAgICAgICAgICAgICAgIDwhLS0mZ3Q7PC92LXByb2dyZXNzLWNpcmN1bGFyPi0tPlxuICAgICAgICAgICAgICAgIDxkaXYgdi1odG1sPVwidmlkZW8uaWZyYW1lXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvXCIgdi1lbHNlLWlmPVwidmlkZW8udXJsID09PSBudWxsICYmIHZpZGVvLmZpbGVfd2F0ZXJtYXJrX2RpcnR5ICE9PSBudWxsXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImNkbl92aWRlb1wiIHYtaHRtbD1cInZpZGVvLmlmcmFtZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgeHMxMiB2LWVsc2VcbiAgICAgICAgICAgICA6Y2xhc3M9XCJ7J3ZlcnRpY2FsJzogdmlkZW8udmVydGljYWw/IHZpZGVvLnZlcnRpY2FsIDogJycsICdob3Jpem9udGFsJzogIXZpZGVvLnZlcnRpY2FsfVwiXG4gICAgICAgICAgICAgYWxpZ24tY29udGVudC1jZW50ZXJcbiAgICAgICAgICAgICBzbTEyIG1kNz5cblxuICAgICAgICAgICAgPHYtY2FyZCBmbGF0IGNsYXNzPVwidmlkZW8tcGxheWVyLXBvc3RlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtbGljZW5zZWRcIiB2LWlmPVwiZ2V0VmlkZW9QdXJjaGFzZWQoKVwiPlB1cmNoYXNlZDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgIDx2LWNhcmQtbWVkaWEgOnNyYz1cImdldFRobnVtYm5haWwoKVwiPjwvdi1jYXJkLW1lZGlhPlxuICAgICAgICAgICAgICAgIDx2LWJ0biBAY2xpY2s9XCJjaGFuZ2UoKVwiIGNsYXNzPVwiZGFyayBwbGF5ZXItcGxheVwiIGRhcmsgZmFiIG1lZGl1bT5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBsYXJnZT5wbGF5X2Fycm93PC92LWljb24+XG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQge1BseXJZb3V0dWJlfSBmcm9tICcuL3BsYXllci95b3V0dWJlVmlkZW9QbGF5ZXInXG4gICAgaW1wb3J0IHtQbHlyVmlkZW99IGZyb20gJy4vcGxheWVyL3ZpZGVvUGxheWVyJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBQbHlyWW91dHViZSxcbiAgICAgICAgICAgIFBseXJWaWRlb1xuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRJbWFnZTogJ34vYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnLFxuXG4gICAgICAgICAgICAgICAgc2hvd1ZpZGVvOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIHMzX3ZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb3M6IFtdLFxuXG4gICAgICAgICAgICAgICAgeW91dHViZUlEOiAnJyxcbiAgICAgICAgICAgICAgICB5b3V0dWJlVmlkZW86IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgdmltZW9WaWRlbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmltZW9JZDogJycsXG5cbiAgICAgICAgICAgICAgICBzb2NpYWxWaWRlbzogZmFsc2UsXG5cblxuICAgICAgICAgICAgICAgIHlvdXR1YmVWaWRlb1BsYXllck9wdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHM6IFsncGxheS1sYXJnZScsICdwbGF5JywgJ3Byb2dyZXNzJywgJ2N1cnJlbnQtdGltZScsICdtdXRlJywgJ3ZvbHVtZScsICdzZXR0aW5ncycsICdhaXJwbGF5JywgJ2Z1bGxzY3JlZW4nXSxcbiAgICAgICAgICAgICAgICAgICAgbG9vcDoge2FjdGl2ZTogdHJ1ZX1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcHM6Wyd2aWRlbyddLFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICB2aWRlbygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBnZXRUaG51bWJuYWlsKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcgPSBcImluc3RhZ3JhbVwiO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZGVvLmltYWdlICYmIHRoaXMudmlkZW8uaW1hZ2UuaW5kZXhPZihzdHJpbmcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0SW1hZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52aWRlby5pbWFnZTtcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgY2hhbmdlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U2hvd1ZpZGVvKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aWRlby5maWxlX3dhdGVybWFya19kaXJ0eSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdmlkZW8gPSB7c3JjOiB0aGlzLnZpZGVvLmZpbGVfd2F0ZXJtYXJrX2RpcnR5fTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnMzX3ZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucGxheWVyVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZGVvLnlvdXR1YmVfaWQgIT0gbnVsbCAmJiB0aGlzLnZpZGVvLnlvdXR1YmVfaWQgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55b3V0dWJlSUQgPSB0aGlzLnZpZGVvLnlvdXR1YmVfaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMueW91dHViZVZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucGx5cl9fY29udHJvbC5wbHlyX19jb250cm9sLS1vdmVybGFpZCcpLmNsaWNrKClcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKCdpbnN0YWdyYW0nLCAnaScpLnRlc3QodGhpcy52aWRlby51cmwpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2lhbFZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRJbnN0YWdybSgpXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKCd0d2l0dGVyJywgJ2knKS50ZXN0KHRoaXMudmlkZW8udXJsKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29jaWFsVmlkZW8gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkVHdpdHRlcigpXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3IFJlZ0V4cCgnZmFjZWJvb2snLCAnaScpLnRlc3QodGhpcy52aWRlby51cmwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29jaWFsVmlkZW8gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29jaWFsVmlkZW8gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRGYWNlYm9vaygpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRWaWRlb1B1cmNoYXNlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aWRlby52aWRlb19jb2xsZWN0aW9ucyAmJiB0aGlzLnZpZGVvLnZpZGVvX2NvbGxlY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGluY2x1ZGVzKHZhbHVlLCB1cmwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWdleCA9IHZhbHVlXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RyID0gdXJsO1xuICAgICAgICAgICAgICAgIGxldCBtO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKChtID0gcmVnZXguZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSB0byBhdm9pZCBpbmZpbml0ZSBsb29wcyB3aXRoIHplcm8td2lkdGggbWF0Y2hlc1xuICAgICAgICAgICAgICAgICAgICBpZiAobS5pbmRleCA9PT0gcmVnZXgubGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleC5sYXN0SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc2V0U2hvd1ZpZGVvKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuczNfdmlkZW8gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnlvdXR1YmVWaWRlbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmltZW9WaWRlbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc29jaWFsVmlkZW8gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnlvdXR1YmVJRCA9ICcnXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb3MgPSBbXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbG9hZEZhY2Vib29rKCkge1xuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2Vib29rLWpzc2RrJykpIHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChkLCBzLCBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuZ2V0RWxlbWVudEJ5SWQoaWQpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzLmlkID0gaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBqcy5zcmMgPSBcImh0dHBzOi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fR0Ivc2RrLmpzI3hmYm1sPTEmdmVyc2lvbj12Mi4xMSZhcHBJZD0xNTEwNjg4NTU1MjY1MDRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICAgICAgICAgICAgICAgICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LkZCLlhGQk1MLnBhcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZWxvYWRUd2l0dGVyKCkge1xuICAgICAgICAgICAgICAgIFR3aXR0ZXJXaWRnZXRzTG9hZGVyLmxvYWQoZnVuY3Rpb24gKHR3dHRyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0d2VldHMgPSBqUXVlcnkoXCIudHdlZXRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0d2VldHMpLmVhY2goZnVuY3Rpb24gKHQsIHR3ZWV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBqUXVlcnkodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3dHRyLndpZGdldHMuY3JlYXRlVmlkZW8oaWQsIHR3ZWV0KS50aGVuKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldF90eXBlID0gZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbG9hZFZpZGVvSnMoKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9qcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHZpZGVvanMudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgICAgICAgICAgICAgdmlkZW9qcy5zcmMgPSBcImFzc2V0cy9zY3JpcHRzL3BsdWdpbi5qc1wiO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQodmlkZW9qcyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZWxvYWRJbnN0YWdybSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3JjID0gJy8vcGxhdGZvcm0uaW5zdGFncmFtLmNvbS9lbl9VUy9lbWJlZHMuanMnO1xuICAgICAgICAgICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgICAgICBzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgICAgICAgICAgIHMuc3JjID0gc3JjO1xuICAgICAgICAgICAgICAgIHMuYXN5bmMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmluc3Rncm0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lmluc3Rncm0uRW1iZWRzLnByb2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQocyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2NvbXBvbmVudC9WaWRlb1BsYXllckNvbXBvbmVudC52dWUiLCIvLyBpbXBvcnQgUGx5ciBmcm9tICdwbHlyJ1xuaW1wb3J0IHtQbHlyLCBQbHlyQXVkaW8sIFBseXJWaWRlbywgUGx5clZpbWVvfSBmcm9tIFwidnVlLXBseXJcIjtcblxudmFyIFBseXJZb3V0dWJlID0geyByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX3ZtLnBlID8gX2MoJ2RpdicsIHsgc3RhdGljQ2xhc3M6IFwicGx5cl9feW91dHViZS1lbWJlZFwiLCBhdHRyczogeyBcImlkXCI6IChcImpzLXBsYXllci15dC1cIiArIChfdm0uaWROdW1iZXIpKSB9IH0sIFtfYygnaWZyYW1lJywgeyBhdHRyczogeyBcInNyY1wiOiAoXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiICsgKF92bS5pZCkpLCBcImFsbG93ZnVsbHNjcmVlblwiOiBcIlwiLCBcImFsbG93dHJhbnNwYXJlbmN5XCI6IFwiXCIsIFwiYWxsb3dcIjogXCJhdXRvcGxheVwiIH0gfSldKSA6IF9jKCdkaXYnLCB7IGF0dHJzOiB7IFwiaWRcIjogKFwianMtcGxheWVyLXl0LVwiICsgKF92bS5pZE51bWJlcikpLCBcImRhdGEtcGx5ci1wcm92aWRlclwiOiBcInlvdXR1YmVcIiwgXCJkYXRhLXBseXItZW1iZWQtaWRcIjogX3ZtLmlkIH0gfSk7XG4gICAgfSwgc3RhdGljUmVuZGVyRm5zOiBbXSxcbiAgICBuYW1lOiAnUGx5cllvdXR1YmUnLFxuICAgIHByb3BzOiB7XG4gICAgICAgIC8qKiBPcHRpb25zIG9iamVjdCBmb3IgcGx5ciBjb25maWcuICovXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKiBBcnJheSBvZiBldmVudHMgdG8gZW1pdCBmcm9tIHRoZSBwbHlyIG9iamVjdCAqL1xuICAgICAgICBlbWl0OiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKiBMaW5rIG9yIElEIG9mIHlvdXR1YmUgdmlkZW8uICovXG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAvKiogQm9vbCBvZiB3aGV0aGVyIHRvIHVzZSBwcm9ncmVzc2l2ZSBlbmhhbmNlbWVudCBvciBub3QgKi9cbiAgICAgICAgcGU6IHtcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiBkZWZhdWx0JDMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwbGF5ZXI6IHt9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBpZE51bWJlcjogZnVuY3Rpb24gaWROdW1iZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMDAwMCAtIDEpKSArIDE7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgdmFyIFBseXIgPSByZXF1aXJlKCdwbHlyJyk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBseXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKFwianMtcGxheWVyLXl0LVwiICsgKHRoaXMuaWROdW1iZXIpKSksIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZW1pdC5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzJDEucGxheWVyLm9uKGVsZW1lbnQsIHRoaXMkMS5lbWl0UGxheWVyRXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY3JlYXRlZCgpe1xuICAgIH0sXG5cbiAgICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAvLyB0aGlzLnBsYXllci5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZW1pdFBsYXllckV2ZW50OiBmdW5jdGlvbiBlbWl0UGxheWVyRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIENvbXBvbmVudHMgPSBbUGx5cllvdXR1YmVdO1xuXG52YXIgaW5kZXggPSAoZnVuY3Rpb24gKFZ1ZSkge1xuICAgIENvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoQ29tcG9uZW50KSB7XG4gICAgICAgIFZ1ZS5jb21wb25lbnQoQ29tcG9uZW50Lm5hbWUsIENvbXBvbmVudCk7XG4gICAgfSk7XG59KTtcblxuXG5leHBvcnQgeyBQbHlyWW91dHViZSB9O1xuZXhwb3J0IHsgaW5kZXggfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvY29tcG9uZW50L3BsYXllci95b3V0dWJlVmlkZW9QbGF5ZXIuanMiLCJpbXBvcnQgJ3BseXIvZGlzdC9wbHlyLmNzcyc7XG5cbi8vIGltcG9ydCBwbHlyIGZyb20gJ3BseXInXG52YXIgUGx5ciA9IHsgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX2MoJ2RpdicsIHsgYXR0cnM6IHsgXCJpZFwiOiAoXCJwbHlyLWNvbnRhaW5lci1cIiArIChfdm0uaWROdW1iZXIpKSB9IH0sIFtfdm0uX3QoXCJkZWZhdWx0XCIpXSwgMik7XG4gIH0sIHN0YXRpY1JlbmRlckZuczogW10sXG4gIG5hbWU6ICdQbHlyJyxcbiAgcHJvcHM6IHtcbiAgICAvKiogT3B0aW9ucyBvYmplY3QgZm9yIHBseXIgY29uZmlnLiAqL1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMSgpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIEFycmF5IG9mIGV2ZW50cyB0byBlbWl0IGZyb20gdGhlIHBseXIgb2JqZWN0ICovXG4gICAgZW1pdDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbiBkZWZhdWx0JDIoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjoge31cbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlkTnVtYmVyOiBmdW5jdGlvbiBpZE51bWJlcigpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwMDAwIC0gMSkpICsgMTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgcGx5ciA9IHJlcXVpcmUoJ3BseXInKTtcbiAgICAvLyBub2luc3BlY3Rpb24gSlNQb3RlbnRpYWxseUludmFsaWRDb25zdHJ1Y3RvclVzYWdlXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgcGx5cihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgoXCJwbHlyLWNvbnRhaW5lci1cIiArICh0aGlzLmlkTnVtYmVyKSkpLmZpcnN0Q2hpbGQsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5lbWl0LmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMkMS5wbGF5ZXIub24oZWxlbWVudCwgdGhpcyQxLmVtaXRQbGF5ZXJFdmVudCk7XG4gICAgfSk7XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5wbGF5ZXIuZGVzdHJveSgpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZW1pdFBsYXllckV2ZW50OiBmdW5jdGlvbiBlbWl0UGxheWVyRXZlbnQoZXZlbnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gaW1wb3J0IFBseXIgZnJvbSAncGx5cidcbnZhciBQbHlyVmlkZW8gPSB7IHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdm0gPSB0aGlzO3ZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2g7cmV0dXJuIF9jKCd2aWRlbycsIHsgcmVmOiBcInZpZGVvXCIsIHN0YXRpY0NsYXNzOiBcInZpZGVvXCIsIGF0dHJzOiB7IFwiaWRcIjogKFwianMtcGxheWVyLXZpZGVvLVwiICsgKF92bS5pZE51bWJlcikpLCBcInBvc3RlclwiOiBfdm0ucG9zdGVyLCBcImNyb3Nzb3JpZ2luXCI6IF92bS5jcm9zc29yaWdpbiB9IH0sIFtfdm0uX2woX3ZtLnZpZGVvcywgZnVuY3Rpb24gKHZpZCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBfYygnc291cmNlJywgeyBrZXk6IGluZGV4LCBhdHRyczogeyBcInNyY1wiOiB2aWQuc3JjLCBcInR5cGVcIjogKFwidmlkZW8vXCIgKyAodmlkLmZvcm1hdCkpIH0gfSk7XG4gICAgfSksIF92bS5fdihcIiBcIiksIF92bS5fbChfdm0uc3VidGl0bGVzLCBmdW5jdGlvbiAoc3VidGl0bGUpIHtcbiAgICAgIHJldHVybiBfYygndHJhY2snLCB7IGtleTogc3VidGl0bGUuc3JjLCBhdHRyczogeyBcImtpbmRcIjogXCJjYXB0aW9uc1wiLCBcImxhYmVsXCI6IHN1YnRpdGxlLmxhYmVsLCBcInNyY1wiOiBzdWJ0aXRsZS5zcmMsIFwic3JjbGFuZ1wiOiBzdWJ0aXRsZS5zcmNsYW5nLCBcImRlZmF1bHRcIjogc3VidGl0bGUuZGVmYXVsdCB9IH0pO1xuICAgIH0pXSwgMik7XG4gIH0sIHN0YXRpY1JlbmRlckZuczogW10sXG4gIG5hbWU6ICdQbHlyVmlkZW8nLFxuICBwcm9wczoge1xuICAgIC8qKiBPcHRpb25zIG9iamVjdCBmb3IgcGx5ciBjb25maWcuICovXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24gZGVmYXVsdCQxKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiogQXJyYXkgb2YgZXZlbnRzIHRvIGVtaXQgZnJvbSB0aGUgcGx5ciBvYmplY3QgKi9cbiAgICBlbWl0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMigpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIExpbmsgdG8gcG9zdGVyIHRvIHNob3cgd2hlbiB2aWRlbyBoYXNuJ3QgcGxheWVkIHlldC4gKi9cbiAgICBwb3N0ZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICAvKiogQXJyYXkgb2YgdmlkZW9zIHRvIGluY2x1ZGUgaW4gdGhlIHZpZGVvIHNvdXJjZS4gKi9cbiAgICB2aWRlb3M6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uICh2aWQpIHtcbiAgICAgICAgICB2YXIgaGFzUHJvcHMgPSB2aWQuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZpZC5oYXNPd25Qcm9wZXJ0eSgnZm9ybWF0Jyk7XG4gICAgICAgICAgaWYgKCFoYXNQcm9wcykge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiogT2JqZWN0IGZvciBzdWJ0aXRsZXMgdHJhY2suICovXG4gICAgc3VidGl0bGVzOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9LFxuICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAodHJhY2spIHtcbiAgICAgICAgICB2YXIgaGFzUHJvcHMgPSB0cmFjay5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSAmJiB0cmFjay5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdHJhY2suaGFzT3duUHJvcGVydHkoJ3NyY2xhbmcnKTtcbiAgICAgICAgICBpZiAoIWhhc1Byb3BzKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8qKiBCb29sZWFuIGZvciB3aGV0aGVyIHRvIHB1dCBjcm9zc29yaWdpbiBhdHRyaWJ1dGUgb24gdGhlIHZpZGVvIGVsZW1lbnQuICovXG4gICAgY3Jvc3NvcmlnaW46IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGxheWVyOiB7fVxuICAgIH07XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaWROdW1iZXI6IGZ1bmN0aW9uIGlkTnVtYmVyKCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAwMDAgLSAxKSkgKyAxO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBQbHlyID0gcmVxdWlyZSgncGx5cicpO1xuICAgIHRoaXMucGxheWVyID0gbmV3IFBseXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKFwianMtcGxheWVyLXZpZGVvLVwiICsgKHRoaXMuaWROdW1iZXIpKSksIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5lbWl0LmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHRoaXMkMS5wbGF5ZXIub24oZWxlbWVudCwgdGhpcyQxLmVtaXRQbGF5ZXJFdmVudCk7XG4gICAgfSk7XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3k6IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5wbGF5ZXIuZGVzdHJveSgpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZW1pdFBsYXllckV2ZW50OiBmdW5jdGlvbiBlbWl0UGxheWVyRXZlbnQoZXZlbnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gaW1wb3J0IFBseXIgZnJvbSAncGx5cidcbnZhciBQbHlyWW91dHViZSA9IHsgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX3ZtLnBlID8gX2MoJ2RpdicsIHsgc3RhdGljQ2xhc3M6IFwicGx5cl9feW91dHViZS1lbWJlZFwiLCBhdHRyczogeyBcImlkXCI6IChcImpzLXBsYXllci15dC1cIiArIChfdm0uaWROdW1iZXIpKSB9IH0sIFtfYygnaWZyYW1lJywgeyBhdHRyczogeyBcInNyY1wiOiAoXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIiArIChfdm0uaWQpKSwgXCJhbGxvd2Z1bGxzY3JlZW5cIjogXCJcIiwgXCJhbGxvd3RyYW5zcGFyZW5jeVwiOiBcIlwiLCBcImFsbG93XCI6IFwiYXV0b3BsYXlcIiB9IH0pXSkgOiBfYygnZGl2JywgeyBhdHRyczogeyBcImlkXCI6IChcImpzLXBsYXllci15dC1cIiArIChfdm0uaWROdW1iZXIpKSwgXCJkYXRhLXBseXItcHJvdmlkZXJcIjogXCJ5b3V0dWJlXCIsIFwiZGF0YS1wbHlyLWVtYmVkLWlkXCI6IF92bS5pZCB9IH0pO1xuICB9LCBzdGF0aWNSZW5kZXJGbnM6IFtdLFxuICBuYW1lOiAnUGx5cllvdXR1YmUnLFxuICBwcm9wczoge1xuICAgIC8qKiBPcHRpb25zIG9iamVjdCBmb3IgcGx5ciBjb25maWcuICovXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24gZGVmYXVsdCQxKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiogQXJyYXkgb2YgZXZlbnRzIHRvIGVtaXQgZnJvbSB0aGUgcGx5ciBvYmplY3QgKi9cbiAgICBlbWl0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMigpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIExpbmsgb3IgSUQgb2YgeW91dHViZSB2aWRlby4gKi9cbiAgICBpZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIC8qKiBCb29sIG9mIHdoZXRoZXIgdG8gdXNlIHByb2dyZXNzaXZlIGVuaGFuY2VtZW50IG9yIG5vdCAqL1xuICAgIHBlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24gZGVmYXVsdCQzKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjoge31cbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlkTnVtYmVyOiBmdW5jdGlvbiBpZE51bWJlcigpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwMDAwIC0gMSkpICsgMTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgUGx5ciA9IHJlcXVpcmUoJ3BseXInKTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbHlyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKChcImpzLXBsYXllci15dC1cIiArICh0aGlzLmlkTnVtYmVyKSkpLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuZW1pdC5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB0aGlzJDEucGxheWVyLm9uKGVsZW1lbnQsIHRoaXMkMS5lbWl0UGxheWVyRXZlbnQpO1xuICAgIH0pO1xuICB9LFxuICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMucGxheWVyLmRlc3Ryb3koKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGVtaXRQbGF5ZXJFdmVudDogZnVuY3Rpb24gZW1pdFBsYXllckV2ZW50KGV2ZW50KSB7XG4gICAgICB0aGlzLiRlbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGltcG9ydCBQbHlyIGZyb20gJ3BseXInXG52YXIgUGx5clZpbWVvID0geyByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3ZtID0gdGhpczt2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oO3JldHVybiBfdm0ucGUgPyBfYygnZGl2JywgeyBzdGF0aWNDbGFzczogXCJwbHlyX192aWRlby1lbWJlZFwiLCBhdHRyczogeyBcImlkXCI6IChcImpzLXBsYXllci12aW1lby1cIiArIChfdm0uaWROdW1iZXIpKSB9IH0sIFtfYygnaWZyYW1lJywgeyBhdHRyczogeyBcInNyY1wiOiAoXCJodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vXCIgKyAoX3ZtLmlkKSksIFwiYWxsb3dmdWxsc2NyZWVuXCI6IFwiXCIsIFwiYWxsb3d0cmFuc3BhcmVuY3lcIjogXCJcIiwgXCJhbGxvd1wiOiBcImF1dG9wbGF5XCIgfSB9KV0pIDogX2MoJ2RpdicsIHsgYXR0cnM6IHsgXCJpZFwiOiAoXCJqcy1wbGF5ZXItdmltZW8tXCIgKyAoX3ZtLmlkTnVtYmVyKSksIFwiZGF0YS1wbHlyLXByb3ZpZGVyXCI6IFwidmltZW9cIiwgXCJkYXRhLXBseXItZW1iZWQtaWRcIjogX3ZtLmlkIH0gfSk7XG4gIH0sIHN0YXRpY1JlbmRlckZuczogW10sXG4gIG5hbWU6ICdQbHlyVmltZW8nLFxuICBwcm9wczoge1xuICAgIC8qKiBPcHRpb25zIG9iamVjdCBmb3IgcGx5ciBjb25maWcuICovXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24gZGVmYXVsdCQxKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiogQXJyYXkgb2YgZXZlbnRzIHRvIGVtaXQgZnJvbSB0aGUgcGx5ciBvYmplY3QgKi9cbiAgICBlbWl0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMigpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIExpbmsgb3IgSUQgb2YgdmltZW8gdmlkZW8uICovXG4gICAgaWQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICAvKiogQm9vbCBvZiB3aGV0aGVyIHRvIHVzZSBwcm9ncmVzc2l2ZSBlbmhhbmNlbWVudCBvciBub3QgKi9cbiAgICBwZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwbGF5ZXI6IHt9XG4gICAgfTtcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBpZE51bWJlcjogZnVuY3Rpb24gaWROdW1iZXIoKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMDAwMCAtIDEpKSArIDE7XG4gICAgfVxuICB9LFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIFBseXIgPSByZXF1aXJlKCdwbHlyJyk7XG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGx5cihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgoXCJqcy1wbGF5ZXItdmltZW8tXCIgKyAodGhpcy5pZE51bWJlcikpKSwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLmVtaXQuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdGhpcyQxLnBsYXllci5vbihlbGVtZW50LCB0aGlzJDEuZW1pdFBsYXllckV2ZW50KTtcbiAgICB9KTtcbiAgfSxcbiAgYmVmb3JlRGVzdHJveTogZnVuY3Rpb24gYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLnBsYXllci5kZXN0cm95KCk7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBlbWl0UGxheWVyRXZlbnQ6IGZ1bmN0aW9uIGVtaXRQbGF5ZXJFdmVudChldmVudCkge1xuICAgICAgdGhpcy4kZW1pdChldmVudC50eXBlLCBldmVudCk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBpbXBvcnQgUGx5ciBmcm9tICdwbHlyJ1xudmFyIFBseXJBdWRpbyA9IHsgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX2MoJ2F1ZGlvJywgeyByZWY6IFwiYXVkaW9cIiwgYXR0cnM6IHsgXCJpZFwiOiAoXCJqcy1wbGF5ZXItYXVkaW8tXCIgKyAoX3ZtLmlkTnVtYmVyKSkgfSB9LCBfdm0uX2woX3ZtLnRyYWNrcywgZnVuY3Rpb24gKHRyYWNrLCBpbmRleCkge1xuICAgICAgcmV0dXJuIF9jKCdzb3VyY2UnLCB7IGtleTogaW5kZXgsIGF0dHJzOiB7IFwic3JjXCI6IHRyYWNrLnNyYywgXCJ0eXBlXCI6IChcImF1ZGlvL1wiICsgKHRyYWNrLmZvcm1hdCkpIH0gfSk7XG4gICAgfSkpO1xuICB9LCBzdGF0aWNSZW5kZXJGbnM6IFtdLFxuICBuYW1lOiAnUGx5ckF1ZGlvJyxcbiAgcHJvcHM6IHtcbiAgICAvKiogT3B0aW9ucyBvYmplY3QgZm9yIHBseXIgY29uZmlnLiAqL1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIGRlZmF1bHQkMSgpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIEFycmF5IG9mIGV2ZW50cyB0byBlbWl0IGZyb20gdGhlIHBseXIgb2JqZWN0ICovXG4gICAgZW1pdDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbiBkZWZhdWx0JDIoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8qKiBBcnJheSBvZiBhdWRpbyB0cmFja3MgdG8gaW5jbHVkZSBpbiB0aGUgYXVkaW8gc291cmNlLiAqL1xuICAgIHRyYWNrczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRvcjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciB2YWxpZCA9IHRydWU7XG4gICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKHZpZCkge1xuICAgICAgICAgIHZhciBoYXNQcm9wcyA9IHZpZC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmlkLmhhc093blByb3BlcnR5KCdmb3JtYXQnKTtcbiAgICAgICAgICBpZiAoIWhhc1Byb3BzKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjoge31cbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlkTnVtYmVyOiBmdW5jdGlvbiBpZE51bWJlcigpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwMDAwIC0gMSkpICsgMTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgUGx5ciA9IHJlcXVpcmUoJ3BseXInKTtcbiAgICB0aGlzLnBsYXllciA9IG5ldyBQbHlyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKChcImpzLXBsYXllci1hdWRpby1cIiArICh0aGlzLmlkTnVtYmVyKSkpLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuZW1pdC5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB0aGlzJDEucGxheWVyLm9uKGVsZW1lbnQsIHRoaXMkMS5lbWl0UGxheWVyRXZlbnQpO1xuICAgIH0pO1xuICB9LFxuICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMucGxheWVyLmRlc3Ryb3koKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGVtaXRQbGF5ZXJFdmVudDogZnVuY3Rpb24gZW1pdFBsYXllckV2ZW50KGV2ZW50KSB7XG4gICAgICB0aGlzLiRlbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBDb21wb25lbnRzID0gW1BseXIsIFBseXJWaWRlbywgUGx5cllvdXR1YmUsIFBseXJWaW1lbywgUGx5ckF1ZGlvXTtcblxudmFyIGluZGV4ID0gKGZ1bmN0aW9uIChWdWUpIHtcbiAgQ29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChDb21wb25lbnQpIHtcbiAgICBWdWUuY29tcG9uZW50KENvbXBvbmVudC5uYW1lLCBDb21wb25lbnQpO1xuICB9KTtcbn0pO1xuXG5leHBvcnQgeyBQbHlyLCBQbHlyVmlkZW8sIFBseXJBdWRpbywgUGx5cllvdXR1YmUsIFBseXJWaW1lbyB9O1xuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtcGx5ci9kaXN0L3Z1ZS1wbHlyLmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNDJcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9wbHlyLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcGx5ci5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9wbHlyLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcGx5ci9kaXN0L3BseXIuY3NzXG4vLyBtb2R1bGUgaWQgPSAzNDNcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBrZXlmcmFtZXMgcGx5ci1wcm9ncmVzc3t0b3tiYWNrZ3JvdW5kLXBvc2l0aW9uOjI1cHggMH19QGtleWZyYW1lcyBwbHlyLXBvcHVwezAle29wYWNpdHk6LjU7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMTBweCl9dG97b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApfX1Aa2V5ZnJhbWVzIHBseXItZmFkZS1pbntmcm9te29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fS5wbHlyey1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkO2RpcmVjdGlvbjpsdHI7Zm9udC1mYW1pbHk6QXZlbmlyLFxcXCJBdmVuaXIgTmV4dFxcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixcXFwiU2Vnb2UgVUlcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtdmFyaWFudC1udW1lcmljOnRhYnVsYXItbnVtcztmb250LXdlaWdodDo1MDA7bGluZS1oZWlnaHQ6MS43O21heC13aWR0aDoxMDAlO21pbi13aWR0aDoyMDBweDtwb3NpdGlvbjpyZWxhdGl2ZTt0ZXh0LXNoYWRvdzpub25lO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgZWFzZX0ucGx5ciBhdWRpbywucGx5ciB2aWRlb3tib3JkZXItcmFkaXVzOmluaGVyaXQ7aGVpZ2h0OmF1dG87dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjEwMCV9LnBseXIgYnV0dG9ue2ZvbnQ6aW5oZXJpdDtsaW5lLWhlaWdodDppbmhlcml0O3dpZHRoOmF1dG99LnBseXI6Zm9jdXN7b3V0bGluZTowfS5wbHlyLS1mdWxsLXVpe2JveC1zaXppbmc6Ym9yZGVyLWJveH0ucGx5ci0tZnVsbC11aSAqLC5wbHlyLS1mdWxsLXVpIDo6YWZ0ZXIsLnBseXItLWZ1bGwtdWkgOjpiZWZvcmV7Ym94LXNpemluZzppbmhlcml0fS5wbHlyLS1mdWxsLXVpIGEsLnBseXItLWZ1bGwtdWkgYnV0dG9uLC5wbHlyLS1mdWxsLXVpIGlucHV0LC5wbHlyLS1mdWxsLXVpIGxhYmVse3RvdWNoLWFjdGlvbjptYW5pcHVsYXRpb259LnBseXJfX2JhZGdle2JhY2tncm91bmQ6IzRmNWI1Zjtib3JkZXItcmFkaXVzOjJweDtjb2xvcjojZmZmO2ZvbnQtc2l6ZTo5cHg7bGluZS1oZWlnaHQ6MTtwYWRkaW5nOjNweCA0cHh9LnBseXItLWZ1bGwtdWkgOjotd2Via2l0LW1lZGlhLXRleHQtdHJhY2stY29udGFpbmVye2Rpc3BsYXk6bm9uZX0ucGx5cl9fY2FwdGlvbnN7YW5pbWF0aW9uOnBseXItZmFkZS1pbiAuM3MgZWFzZTtib3R0b206MDtjb2xvcjojZmZmO2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTRweDtsZWZ0OjA7cGFkZGluZzoxMHB4O3Bvc2l0aW9uOmFic29sdXRlO3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246dHJhbnNmb3JtIC40cyBlYXNlLWluLW91dDt3aWR0aDoxMDAlfS5wbHlyX19jYXB0aW9ucyAucGx5cl9fY2FwdGlvbntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjgpO2JvcmRlci1yYWRpdXM6MnB4Oy13ZWJraXQtYm94LWRlY29yYXRpb24tYnJlYWs6Y2xvbmU7Ym94LWRlY29yYXRpb24tYnJlYWs6Y2xvbmU7bGluZS1oZWlnaHQ6MTg1JTtwYWRkaW5nOi4yZW0gLjVlbTt3aGl0ZS1zcGFjZTpwcmUtd3JhcH0ucGx5cl9fY2FwdGlvbnMgLnBseXJfX2NhcHRpb24gZGl2e2Rpc3BsYXk6aW5saW5lfS5wbHlyX19jYXB0aW9ucyBzcGFuOmVtcHR5e2Rpc3BsYXk6bm9uZX1AbWVkaWEgKG1pbi13aWR0aDo0ODBweCl7LnBseXJfX2NhcHRpb25ze2ZvbnQtc2l6ZToxNnB4O3BhZGRpbmc6MjBweH19QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5wbHlyX19jYXB0aW9uc3tmb250LXNpemU6MThweH19LnBseXItLWNhcHRpb25zLWFjdGl2ZSAucGx5cl9fY2FwdGlvbnN7ZGlzcGxheTpibG9ja30ucGx5cjpub3QoLnBseXItLWhpZGUtY29udHJvbHMpIC5wbHlyX19jb250cm9sczpub3QoOmVtcHR5KX4ucGx5cl9fY2FwdGlvbnN7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTQwcHgpfS5wbHlyX19jb250cm9se2JhY2tncm91bmQ6MCAwO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6M3B4O2NvbG9yOmluaGVyaXQ7Y3Vyc29yOnBvaW50ZXI7ZmxleC1zaHJpbms6MDtvdmVyZmxvdzp2aXNpYmxlO3BhZGRpbmc6N3B4O3Bvc2l0aW9uOnJlbGF0aXZlO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlfS5wbHlyX19jb250cm9sIHN2Z3tkaXNwbGF5OmJsb2NrO2ZpbGw6Y3VycmVudENvbG9yO2hlaWdodDoxOHB4O3BvaW50ZXItZXZlbnRzOm5vbmU7d2lkdGg6MThweH0ucGx5cl9fY29udHJvbDpmb2N1c3tvdXRsaW5lOjB9LnBseXJfX2NvbnRyb2wucGx5cl9fdGFiLWZvY3Vze2JveC1zaGFkb3c6MCAwIDAgNXB4IHJnYmEoMjYsMTc1LDI1NSwuNSk7b3V0bGluZTowfS5wbHlyX19jb250cm9sLnBseXJfX2NvbnRyb2wtLXByZXNzZWQgLmljb24tLW5vdC1wcmVzc2VkLC5wbHlyX19jb250cm9sLnBseXJfX2NvbnRyb2wtLXByZXNzZWQgLmxhYmVsLS1ub3QtcHJlc3NlZCwucGx5cl9fY29udHJvbDpub3QoLnBseXJfX2NvbnRyb2wtLXByZXNzZWQpIC5pY29uLS1wcmVzc2VkLC5wbHlyX19jb250cm9sOm5vdCgucGx5cl9fY29udHJvbC0tcHJlc3NlZCkgLmxhYmVsLS1wcmVzc2Vke2Rpc3BsYXk6bm9uZX0ucGx5ci0tYXVkaW8gLnBseXJfX2NvbnRyb2wucGx5cl9fdGFiLWZvY3VzLC5wbHlyLS1hdWRpbyAucGx5cl9fY29udHJvbDpob3ZlciwucGx5ci0tYXVkaW8gLnBseXJfX2NvbnRyb2xbYXJpYS1leHBhbmRlZD10cnVlXXtiYWNrZ3JvdW5kOiMxYWFmZmY7Y29sb3I6I2ZmZn0ucGx5ci0tdmlkZW8gLnBseXJfX2NvbnRyb2wgc3Zne2ZpbHRlcjpkcm9wLXNoYWRvdygwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAuMTUpKX0ucGx5ci0tdmlkZW8gLnBseXJfX2NvbnRyb2wucGx5cl9fdGFiLWZvY3VzLC5wbHlyLS12aWRlbyAucGx5cl9fY29udHJvbDpob3ZlciwucGx5ci0tdmlkZW8gLnBseXJfX2NvbnRyb2xbYXJpYS1leHBhbmRlZD10cnVlXXtiYWNrZ3JvdW5kOiMxYWFmZmY7Y29sb3I6I2ZmZn0ucGx5cl9fY29udHJvbC0tb3ZlcmxhaWR7YmFja2dyb3VuZDpyZ2JhKDI2LDE3NSwyNTUsLjgpO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6MTAwJTtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4xNSk7Y29sb3I6I2ZmZjtkaXNwbGF5Om5vbmU7bGVmdDo1MCU7cGFkZGluZzoxNXB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6Mn0ucGx5cl9fY29udHJvbC0tb3ZlcmxhaWQgc3Zne2hlaWdodDoyMHB4O2xlZnQ6MnB4O3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjIwcHh9LnBseXJfX2NvbnRyb2wtLW92ZXJsYWlkOmZvY3VzLC5wbHlyX19jb250cm9sLS1vdmVybGFpZDpob3ZlcntiYWNrZ3JvdW5kOiMxYWFmZmZ9LnBseXItLXBsYXlpbmcgLnBseXJfX2NvbnRyb2wtLW92ZXJsYWlke29wYWNpdHk6MDt2aXNpYmlsaXR5OmhpZGRlbn0ucGx5ci0tZnVsbC11aS5wbHlyLS12aWRlbyAucGx5cl9fY29udHJvbC0tb3ZlcmxhaWR7ZGlzcGxheTpibG9ja30ucGx5ci0tZnVsbC11aSA6Oi13ZWJraXQtbWVkaWEtY29udHJvbHN7ZGlzcGxheTpub25lfS5wbHlyX19jb250cm9sc3thbGlnbi1pdGVtczpjZW50ZXI7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpmbGV4LWVuZDt0ZXh0LWFsaWduOmNlbnRlcn0ucGx5cl9fY29udHJvbHMgLnBseXJfX21lbnUsLnBseXJfX2NvbnRyb2xzIC5wbHlyX19wcm9ncmVzcywucGx5cl9fY29udHJvbHMgLnBseXJfX3RpbWUsLnBseXJfX2NvbnRyb2xzIC5wbHlyX192b2x1bWUsLnBseXJfX2NvbnRyb2xzPi5wbHlyX19jb250cm9se21hcmdpbi1sZWZ0OjVweH0ucGx5cl9fY29udHJvbHMgLnBseXJfX21lbnUrLnBseXJfX2NvbnRyb2wsLnBseXJfX2NvbnRyb2xzIC5wbHlyX19wcm9ncmVzcysucGx5cl9fY29udHJvbCwucGx5cl9fY29udHJvbHM+LnBseXJfX2NvbnRyb2wrLnBseXJfX2NvbnRyb2wsLnBseXJfX2NvbnRyb2xzPi5wbHlyX19jb250cm9sKy5wbHlyX19tZW51e21hcmdpbi1sZWZ0OjJweH0ucGx5cl9fY29udHJvbHM+LnBseXJfX2NvbnRyb2w6Zmlyc3QtY2hpbGQsLnBseXJfX2NvbnRyb2xzPi5wbHlyX19jb250cm9sOmZpcnN0LWNoaWxkK1tkYXRhLXBseXI9cGF1c2Vde21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OmF1dG99LnBseXJfX2NvbnRyb2xzOmVtcHR5e2Rpc3BsYXk6bm9uZX1AbWVkaWEgKG1pbi13aWR0aDo0ODBweCl7LnBseXJfX2NvbnRyb2xzIC5wbHlyX19tZW51LC5wbHlyX19jb250cm9scyAucGx5cl9fcHJvZ3Jlc3MsLnBseXJfX2NvbnRyb2xzIC5wbHlyX190aW1lLC5wbHlyX19jb250cm9scyAucGx5cl9fdm9sdW1lLC5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbHttYXJnaW4tbGVmdDoxMHB4fX0ucGx5ci0tYXVkaW8gLnBseXJfX2NvbnRyb2xze2JhY2tncm91bmQ6I2ZmZjtib3JkZXItcmFkaXVzOmluaGVyaXQ7Y29sb3I6IzRmNWI1ZjtwYWRkaW5nOjEwcHh9LnBseXItLXZpZGVvIC5wbHlyX19jb250cm9sc3tiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDApLHJnYmEoMCwwLDAsLjcpKTtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOmluaGVyaXQ7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6aW5oZXJpdDtib3R0b206MDtjb2xvcjojZmZmO2xlZnQ6MDtwYWRkaW5nOjIwcHggNXB4IDVweDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RyYW5zaXRpb246b3BhY2l0eSAuNHMgZWFzZS1pbi1vdXQsdHJhbnNmb3JtIC40cyBlYXNlLWluLW91dDt6LWluZGV4OjN9QG1lZGlhIChtaW4td2lkdGg6NDgwcHgpey5wbHlyLS12aWRlbyAucGx5cl9fY29udHJvbHN7cGFkZGluZzozNXB4IDEwcHggMTBweH19LnBseXItLXZpZGVvLnBseXItLWhpZGUtY29udHJvbHMgLnBseXJfX2NvbnRyb2xze29wYWNpdHk6MDtwb2ludGVyLWV2ZW50czpub25lO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDEwMCUpfS5wbHlyIFtkYXRhLXBseXI9YWlycGxheV0sLnBseXIgW2RhdGEtcGx5cj1jYXB0aW9uc10sLnBseXIgW2RhdGEtcGx5cj1mdWxsc2NyZWVuXSwucGx5ciBbZGF0YS1wbHlyPXBpcF17ZGlzcGxheTpub25lfS5wbHlyLS1haXJwbGF5LXN1cHBvcnRlZCBbZGF0YS1wbHlyPWFpcnBsYXldLC5wbHlyLS1jYXB0aW9ucy1lbmFibGVkIFtkYXRhLXBseXI9Y2FwdGlvbnNdLC5wbHlyLS1mdWxsc2NyZWVuLWVuYWJsZWQgW2RhdGEtcGx5cj1mdWxsc2NyZWVuXSwucGx5ci0tcGlwLXN1cHBvcnRlZCBbZGF0YS1wbHlyPXBpcF17ZGlzcGxheTppbmxpbmUtYmxvY2t9LnBseXJfX3ZpZGVvLWVtYmVke2hlaWdodDowO3BhZGRpbmctYm90dG9tOjU2LjI1JTtwb3NpdGlvbjpyZWxhdGl2ZX0ucGx5cl9fdmlkZW8tZW1iZWQgaWZyYW1le2JvcmRlcjowO2hlaWdodDoxMDAlO2xlZnQ6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7d2lkdGg6MTAwJX0ucGx5ci0tZnVsbC11aSAucGx5cl9fdmlkZW8tZW1iZWQ+LnBseXJfX3ZpZGVvLWVtYmVkX19jb250YWluZXJ7cGFkZGluZy1ib3R0b206MjQwJTtwb3NpdGlvbjpyZWxhdGl2ZTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtMzguMjgxMjUlKX0ucGx5cl9fbWVudXtkaXNwbGF5OmZsZXg7cG9zaXRpb246cmVsYXRpdmV9LnBseXJfX21lbnUgLnBseXJfX2NvbnRyb2wgc3Zne3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcyBlYXNlfS5wbHlyX19tZW51IC5wbHlyX19jb250cm9sW2FyaWEtZXhwYW5kZWQ9dHJ1ZV0gc3Zne3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpfS5wbHlyX19tZW51IC5wbHlyX19jb250cm9sW2FyaWEtZXhwYW5kZWQ9dHJ1ZV0gLnBseXJfX3Rvb2x0aXB7ZGlzcGxheTpub25lfS5wbHlyX19tZW51X19jb250YWluZXJ7YW5pbWF0aW9uOnBseXItcG9wdXAgLjJzIGVhc2U7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC45KTtib3JkZXItcmFkaXVzOjRweDtib3R0b206MTAwJTtib3gtc2hhZG93OjAgMXB4IDJweCByZ2JhKDAsMCwwLC4xNSk7Y29sb3I6IzRmNWI1Zjtmb250LXNpemU6MTZweDttYXJnaW4tYm90dG9tOjEwcHg7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LTNweDt0ZXh0LWFsaWduOmxlZnQ7d2hpdGUtc3BhY2U6bm93cmFwO3otaW5kZXg6M30ucGx5cl9fbWVudV9fY29udGFpbmVyPmRpdntvdmVyZmxvdzpoaWRkZW47dHJhbnNpdGlvbjpoZWlnaHQgLjM1cyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKSx3aWR0aCAuMzVzIGN1YmljLWJlemllciguNCwwLC4yLDEpfS5wbHlyX19tZW51X19jb250YWluZXI6OmFmdGVye2JvcmRlcjo0cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC45KTtjb250ZW50OicnO2hlaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjE1cHg7dG9wOjEwMCU7d2lkdGg6MH0ucGx5cl9fbWVudV9fY29udGFpbmVyIFtyb2xlPW1lbnVde3BhZGRpbmc6N3B4fS5wbHlyX19tZW51X19jb250YWluZXIgW3JvbGU9bWVudWl0ZW1dLC5wbHlyX19tZW51X19jb250YWluZXIgW3JvbGU9bWVudWl0ZW1yYWRpb117bWFyZ2luLXRvcDoycHh9LnBseXJfX21lbnVfX2NvbnRhaW5lciBbcm9sZT1tZW51aXRlbV06Zmlyc3QtY2hpbGQsLnBseXJfX21lbnVfX2NvbnRhaW5lciBbcm9sZT1tZW51aXRlbXJhZGlvXTpmaXJzdC1jaGlsZHttYXJnaW4tdG9wOjB9LnBseXJfX21lbnVfX2NvbnRhaW5lciAucGx5cl9fY29udHJvbHthbGlnbi1pdGVtczpjZW50ZXI7Y29sb3I6IzRmNWI1ZjtkaXNwbGF5OmZsZXg7Zm9udC1zaXplOjE0cHg7cGFkZGluZzo0cHggMTFweDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7d2lkdGg6MTAwJX0ucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sPnNwYW57YWxpZ24taXRlbXM6aW5oZXJpdDtkaXNwbGF5OmZsZXg7d2lkdGg6MTAwJX0ucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sOjphZnRlcntib3JkZXI6NHB4IHNvbGlkIHRyYW5zcGFyZW50O2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0ucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sLS1mb3J3YXJke3BhZGRpbmctcmlnaHQ6MjhweH0ucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sLS1mb3J3YXJkOjphZnRlcntib3JkZXItbGVmdC1jb2xvcjpyZ2JhKDc5LDkxLDk1LC44KTtyaWdodDo1cHh9LnBseXJfX21lbnVfX2NvbnRhaW5lciAucGx5cl9fY29udHJvbC0tZm9yd2FyZC5wbHlyX190YWItZm9jdXM6OmFmdGVyLC5wbHlyX19tZW51X19jb250YWluZXIgLnBseXJfX2NvbnRyb2wtLWZvcndhcmQ6aG92ZXI6OmFmdGVye2JvcmRlci1sZWZ0LWNvbG9yOmN1cnJlbnRDb2xvcn0ucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sLS1iYWNre2ZvbnQtd2VpZ2h0OjUwMDttYXJnaW46N3B4O21hcmdpbi1ib3R0b206M3B4O3BhZGRpbmctbGVmdDoyOHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOmNhbGMoMTAwJSAtIDE0cHgpfS5wbHlyX19tZW51X19jb250YWluZXIgLnBseXJfX2NvbnRyb2wtLWJhY2s6OmFmdGVye2JvcmRlci1yaWdodC1jb2xvcjpyZ2JhKDc5LDkxLDk1LC44KTtsZWZ0OjdweH0ucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sLS1iYWNrOjpiZWZvcmV7YmFja2dyb3VuZDojYjdjNWNkO2JveC1zaGFkb3c6MCAxcHggMCAjZmZmO2NvbnRlbnQ6Jyc7aGVpZ2h0OjFweDtsZWZ0OjA7bWFyZ2luLXRvcDo0cHg7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjEwMCV9LnBseXJfX21lbnVfX2NvbnRhaW5lciAucGx5cl9fY29udHJvbC0tYmFjay5wbHlyX190YWItZm9jdXM6OmFmdGVyLC5wbHlyX19tZW51X19jb250YWluZXIgLnBseXJfX2NvbnRyb2wtLWJhY2s6aG92ZXI6OmFmdGVye2JvcmRlci1yaWdodC1jb2xvcjpjdXJyZW50Q29sb3J9LnBseXJfX21lbnVfX2NvbnRhaW5lciAucGx5cl9fY29udHJvbFtyb2xlPW1lbnVpdGVtcmFkaW9de3BhZGRpbmctbGVmdDo3cHh9LnBseXJfX21lbnVfX2NvbnRhaW5lciAucGx5cl9fY29udHJvbFtyb2xlPW1lbnVpdGVtcmFkaW9dOjphZnRlciwucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sW3JvbGU9bWVudWl0ZW1yYWRpb106OmJlZm9yZXtib3JkZXItcmFkaXVzOjEwMCV9LnBseXJfX21lbnVfX2NvbnRhaW5lciAucGx5cl9fY29udHJvbFtyb2xlPW1lbnVpdGVtcmFkaW9dOjpiZWZvcmV7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4xKTtjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7ZmxleC1zaHJpbms6MDtoZWlnaHQ6MTZweDttYXJnaW4tcmlnaHQ6MTBweDt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZTt3aWR0aDoxNnB4fS5wbHlyX19tZW51X19jb250YWluZXIgLnBseXJfX2NvbnRyb2xbcm9sZT1tZW51aXRlbXJhZGlvXTo6YWZ0ZXJ7YmFja2dyb3VuZDojZmZmO2JvcmRlcjowO2hlaWdodDo2cHg7bGVmdDoxMnB4O29wYWNpdHk6MDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHNjYWxlKDApO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcyBlYXNlLG9wYWNpdHkgLjNzIGVhc2U7d2lkdGg6NnB4fS5wbHlyX19tZW51X19jb250YWluZXIgLnBseXJfX2NvbnRyb2xbcm9sZT1tZW51aXRlbXJhZGlvXVthcmlhLWNoZWNrZWQ9dHJ1ZV06OmJlZm9yZXtiYWNrZ3JvdW5kOiMxYWFmZmZ9LnBseXJfX21lbnVfX2NvbnRhaW5lciAucGx5cl9fY29udHJvbFtyb2xlPW1lbnVpdGVtcmFkaW9dW2FyaWEtY2hlY2tlZD10cnVlXTo6YWZ0ZXJ7b3BhY2l0eToxO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHNjYWxlKDEpfS5wbHlyX19tZW51X19jb250YWluZXIgLnBseXJfX2NvbnRyb2xbcm9sZT1tZW51aXRlbXJhZGlvXS5wbHlyX190YWItZm9jdXM6OmJlZm9yZSwucGx5cl9fbWVudV9fY29udGFpbmVyIC5wbHlyX19jb250cm9sW3JvbGU9bWVudWl0ZW1yYWRpb106aG92ZXI6OmJlZm9yZXtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjEpfS5wbHlyX19tZW51X19jb250YWluZXIgLnBseXJfX21lbnVfX3ZhbHVle2FsaWduLWl0ZW1zOmNlbnRlcjtkaXNwbGF5OmZsZXg7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6LTVweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZy1sZWZ0OjI1cHg7cG9pbnRlci1ldmVudHM6bm9uZX0ucGx5ci0tZnVsbC11aSBpbnB1dFt0eXBlPXJhbmdlXXstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6MDtib3JkZXItcmFkaXVzOjI4cHg7Y29sb3I6IzFhYWZmZjtkaXNwbGF5OmJsb2NrO2hlaWdodDoyMHB4O21hcmdpbjowO3BhZGRpbmc6MDt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjNzIGVhc2U7d2lkdGg6MTAwJX0ucGx5ci0tZnVsbC11aSBpbnB1dFt0eXBlPXJhbmdlXTo6LXdlYmtpdC1zbGlkZXItcnVubmFibGUtdHJhY2t7YmFja2dyb3VuZDowIDA7Ym9yZGVyOjA7Ym9yZGVyLXJhZGl1czozcHg7aGVpZ2h0OjZweDt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjNzIGVhc2U7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsY3VycmVudENvbG9yIHZhcigtLXZhbHVlLDApLHRyYW5zcGFyZW50IHZhcigtLXZhbHVlLDApKX0ucGx5ci0tZnVsbC11aSBpbnB1dFt0eXBlPXJhbmdlXTo6LXdlYmtpdC1zbGlkZXItdGh1bWJ7YmFja2dyb3VuZDojZmZmO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6MTAwJTtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4xNSksMCAwIDAgMXB4IHJnYmEoNDcsNTIsNjEsLjIpO2hlaWdodDoxNHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RyYW5zaXRpb246YWxsIC4ycyBlYXNlO3dpZHRoOjE0cHg7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7bWFyZ2luLXRvcDotNHB4fS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbW96LXJhbmdlLXRyYWNre2JhY2tncm91bmQ6MCAwO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6M3B4O2hlaWdodDo2cHg7dHJhbnNpdGlvbjpib3gtc2hhZG93IC4zcyBlYXNlOy1tb3otdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbW96LXJhbmdlLXRodW1ie2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6MDtib3JkZXItcmFkaXVzOjEwMCU7Ym94LXNoYWRvdzowIDFweCAxcHggcmdiYSgwLDAsMCwuMTUpLDAgMCAwIDFweCByZ2JhKDQ3LDUyLDYxLC4yKTtoZWlnaHQ6MTRweDtwb3NpdGlvbjpyZWxhdGl2ZTt0cmFuc2l0aW9uOmFsbCAuMnMgZWFzZTt3aWR0aDoxNHB4fS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbW96LXJhbmdlLXByb2dyZXNze2JhY2tncm91bmQ6Y3VycmVudENvbG9yO2JvcmRlci1yYWRpdXM6M3B4O2hlaWdodDo2cHh9LnBseXItLWZ1bGwtdWkgaW5wdXRbdHlwZT1yYW5nZV06Oi1tcy10cmFja3tiYWNrZ3JvdW5kOjAgMDtib3JkZXI6MDtib3JkZXItcmFkaXVzOjNweDtoZWlnaHQ6NnB4O3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgZWFzZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2NvbG9yOnRyYW5zcGFyZW50fS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbXMtZmlsbC11cHBlcntiYWNrZ3JvdW5kOjAgMDtib3JkZXI6MDtib3JkZXItcmFkaXVzOjNweDtoZWlnaHQ6NnB4O3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgZWFzZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbXMtZmlsbC1sb3dlcntiYWNrZ3JvdW5kOjAgMDtib3JkZXI6MDtib3JkZXItcmFkaXVzOjNweDtoZWlnaHQ6NnB4O3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgZWFzZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2JhY2tncm91bmQ6Y3VycmVudENvbG9yfS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbXMtdGh1bWJ7YmFja2dyb3VuZDojZmZmO2JvcmRlcjowO2JvcmRlci1yYWRpdXM6MTAwJTtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4xNSksMCAwIDAgMXB4IHJnYmEoNDcsNTIsNjEsLjIpO2hlaWdodDoxNHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RyYW5zaXRpb246YWxsIC4ycyBlYXNlO3dpZHRoOjE0cHg7bWFyZ2luLXRvcDowfS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbXMtdG9vbHRpcHtkaXNwbGF5Om5vbmV9LnBseXItLWZ1bGwtdWkgaW5wdXRbdHlwZT1yYW5nZV06Zm9jdXN7b3V0bGluZTowfS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdOjotbW96LWZvY3VzLW91dGVye2JvcmRlcjowfS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdLnBseXJfX3RhYi1mb2N1czo6LXdlYmtpdC1zbGlkZXItcnVubmFibGUtdHJhY2t7Ym94LXNoYWRvdzowIDAgMCA1cHggcmdiYSgyNiwxNzUsMjU1LC41KTtvdXRsaW5lOjB9LnBseXItLWZ1bGwtdWkgaW5wdXRbdHlwZT1yYW5nZV0ucGx5cl9fdGFiLWZvY3VzOjotbW96LXJhbmdlLXRyYWNre2JveC1zaGFkb3c6MCAwIDAgNXB4IHJnYmEoMjYsMTc1LDI1NSwuNSk7b3V0bGluZTowfS5wbHlyLS1mdWxsLXVpIGlucHV0W3R5cGU9cmFuZ2VdLnBseXJfX3RhYi1mb2N1czo6LW1zLXRyYWNre2JveC1zaGFkb3c6MCAwIDAgNXB4IHJnYmEoMjYsMTc1LDI1NSwuNSk7b3V0bGluZTowfS5wbHlyLS1mdWxsLXVpLnBseXItLXZpZGVvIGlucHV0W3R5cGU9cmFuZ2VdOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFja3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjI1KX0ucGx5ci0tZnVsbC11aS5wbHlyLS12aWRlbyBpbnB1dFt0eXBlPXJhbmdlXTo6LW1vei1yYW5nZS10cmFja3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjI1KX0ucGx5ci0tZnVsbC11aS5wbHlyLS12aWRlbyBpbnB1dFt0eXBlPXJhbmdlXTo6LW1zLXRyYWNre2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMjUpfS5wbHlyLS1mdWxsLXVpLnBseXItLXZpZGVvIGlucHV0W3R5cGU9cmFuZ2VdOmFjdGl2ZTo6LXdlYmtpdC1zbGlkZXItdGh1bWJ7Ym94LXNoYWRvdzowIDFweCAxcHggcmdiYSgwLDAsMCwuMTUpLDAgMCAwIDFweCByZ2JhKDQ3LDUyLDYxLC4yKSwwIDAgMCAzcHggcmdiYSgyNTUsMjU1LDI1NSwuNSl9LnBseXItLWZ1bGwtdWkucGx5ci0tdmlkZW8gaW5wdXRbdHlwZT1yYW5nZV06YWN0aXZlOjotbW96LXJhbmdlLXRodW1ie2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjE1KSwwIDAgMCAxcHggcmdiYSg0Nyw1Miw2MSwuMiksMCAwIDAgM3B4IHJnYmEoMjU1LDI1NSwyNTUsLjUpfS5wbHlyLS1mdWxsLXVpLnBseXItLXZpZGVvIGlucHV0W3R5cGU9cmFuZ2VdOmFjdGl2ZTo6LW1zLXRodW1ie2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjE1KSwwIDAgMCAxcHggcmdiYSg0Nyw1Miw2MSwuMiksMCAwIDAgM3B4IHJnYmEoMjU1LDI1NSwyNTUsLjUpfS5wbHlyLS1mdWxsLXVpLnBseXItLWF1ZGlvIGlucHV0W3R5cGU9cmFuZ2VdOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFja3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTgzLDE5NywyMDUsLjY2KX0ucGx5ci0tZnVsbC11aS5wbHlyLS1hdWRpbyBpbnB1dFt0eXBlPXJhbmdlXTo6LW1vei1yYW5nZS10cmFja3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTgzLDE5NywyMDUsLjY2KX0ucGx5ci0tZnVsbC11aS5wbHlyLS1hdWRpbyBpbnB1dFt0eXBlPXJhbmdlXTo6LW1zLXRyYWNre2JhY2tncm91bmQtY29sb3I6cmdiYSgxODMsMTk3LDIwNSwuNjYpfS5wbHlyLS1mdWxsLXVpLnBseXItLWF1ZGlvIGlucHV0W3R5cGU9cmFuZ2VdOmFjdGl2ZTo6LXdlYmtpdC1zbGlkZXItdGh1bWJ7Ym94LXNoYWRvdzowIDFweCAxcHggcmdiYSgwLDAsMCwuMTUpLDAgMCAwIDFweCByZ2JhKDQ3LDUyLDYxLC4yKSwwIDAgMCAzcHggcmdiYSgwLDAsMCwuMSl9LnBseXItLWZ1bGwtdWkucGx5ci0tYXVkaW8gaW5wdXRbdHlwZT1yYW5nZV06YWN0aXZlOjotbW96LXJhbmdlLXRodW1ie2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjE1KSwwIDAgMCAxcHggcmdiYSg0Nyw1Miw2MSwuMiksMCAwIDAgM3B4IHJnYmEoMCwwLDAsLjEpfS5wbHlyLS1mdWxsLXVpLnBseXItLWF1ZGlvIGlucHV0W3R5cGU9cmFuZ2VdOmFjdGl2ZTo6LW1zLXRodW1ie2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjE1KSwwIDAgMCAxcHggcmdiYSg0Nyw1Miw2MSwuMiksMCAwIDAgM3B4IHJnYmEoMCwwLDAsLjEpfS5wbHlyX19wb3N0ZXJ7YmFja2dyb3VuZC1jb2xvcjojMDAwO2JhY2tncm91bmQtcG9zaXRpb246NTAlIDUwJTtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47aGVpZ2h0OjEwMCU7bGVmdDowO29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt0cmFuc2l0aW9uOm9wYWNpdHkgLjJzIGVhc2U7d2lkdGg6MTAwJTt6LWluZGV4OjF9LnBseXItLXN0b3BwZWQucGx5cl9fcG9zdGVyLWVuYWJsZWQgLnBseXJfX3Bvc3RlcntvcGFjaXR5OjF9LnBseXJfX3RpbWV7Zm9udC1zaXplOjE0cHh9LnBseXJfX3RpbWUrLnBseXJfX3RpbWU6OmJlZm9yZXtjb250ZW50OidcXFxcMjA0NCc7bWFyZ2luLXJpZ2h0OjEwcHh9QG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpey5wbHlyX190aW1lKy5wbHlyX190aW1le2Rpc3BsYXk6bm9uZX19LnBseXItLXZpZGVvIC5wbHlyX190aW1le3RleHQtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4xNSl9LnBseXJfX3Rvb2x0aXB7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC45KTtib3JkZXItcmFkaXVzOjNweDtib3R0b206MTAwJTtib3gtc2hhZG93OjAgMXB4IDJweCByZ2JhKDAsMCwwLC4xNSk7Y29sb3I6IzRmNWI1Zjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDA7bGVmdDo1MCU7bGluZS1oZWlnaHQ6MS4zO21hcmdpbi1ib3R0b206MTBweDtvcGFjaXR5OjA7cGFkZGluZzo1cHggNy41cHg7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsMTBweCkgc2NhbGUoLjgpO3RyYW5zZm9ybS1vcmlnaW46NTAlIDEwMCU7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIC4xcyBlYXNlLG9wYWNpdHkgLjJzIC4xcyBlYXNlO3doaXRlLXNwYWNlOm5vd3JhcDt6LWluZGV4OjJ9LnBseXJfX3Rvb2x0aXA6OmJlZm9yZXtib3JkZXItbGVmdDo0cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjRweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItdG9wOjRweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC45KTtib3R0b206LTRweDtjb250ZW50OicnO2hlaWdodDowO2xlZnQ6NTAlO3Bvc2l0aW9uOmFic29sdXRlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpO3dpZHRoOjA7ei1pbmRleDoyfS5wbHlyIC5wbHlyX19jb250cm9sLnBseXJfX3RhYi1mb2N1cyAucGx5cl9fdG9vbHRpcCwucGx5ciAucGx5cl9fY29udHJvbDpob3ZlciAucGx5cl9fdG9vbHRpcCwucGx5cl9fdG9vbHRpcC0tdmlzaWJsZXtvcGFjaXR5OjE7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLDApIHNjYWxlKDEpfS5wbHlyIC5wbHlyX19jb250cm9sOmhvdmVyIC5wbHlyX190b29sdGlwe3otaW5kZXg6M30ucGx5cl9fY29udHJvbHM+LnBseXJfX2NvbnRyb2w6Zmlyc3QtY2hpbGQgLnBseXJfX3Rvb2x0aXAsLnBseXJfX2NvbnRyb2xzPi5wbHlyX19jb250cm9sOmZpcnN0LWNoaWxkKy5wbHlyX19jb250cm9sIC5wbHlyX190b29sdGlwe2xlZnQ6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsMTBweCkgc2NhbGUoLjgpO3RyYW5zZm9ybS1vcmlnaW46MCAxMDAlfS5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbDpmaXJzdC1jaGlsZCAucGx5cl9fdG9vbHRpcDo6YmVmb3JlLC5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbDpmaXJzdC1jaGlsZCsucGx5cl9fY29udHJvbCAucGx5cl9fdG9vbHRpcDo6YmVmb3Jle2xlZnQ6MTZweH0ucGx5cl9fY29udHJvbHM+LnBseXJfX2NvbnRyb2w6bGFzdC1jaGlsZCAucGx5cl9fdG9vbHRpcHtsZWZ0OmF1dG87cmlnaHQ6MDt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsMTBweCkgc2NhbGUoLjgpO3RyYW5zZm9ybS1vcmlnaW46MTAwJSAxMDAlfS5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbDpsYXN0LWNoaWxkIC5wbHlyX190b29sdGlwOjpiZWZvcmV7bGVmdDphdXRvO3JpZ2h0OjE2cHg7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoNTAlKX0ucGx5cl9fY29udHJvbHM+LnBseXJfX2NvbnRyb2w6Zmlyc3QtY2hpbGQgLnBseXJfX3Rvb2x0aXAtLXZpc2libGUsLnBseXJfX2NvbnRyb2xzPi5wbHlyX19jb250cm9sOmZpcnN0LWNoaWxkKy5wbHlyX19jb250cm9sIC5wbHlyX190b29sdGlwLS12aXNpYmxlLC5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbDpmaXJzdC1jaGlsZCsucGx5cl9fY29udHJvbC5wbHlyX190YWItZm9jdXMgLnBseXJfX3Rvb2x0aXAsLnBseXJfX2NvbnRyb2xzPi5wbHlyX19jb250cm9sOmZpcnN0LWNoaWxkKy5wbHlyX19jb250cm9sOmhvdmVyIC5wbHlyX190b29sdGlwLC5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbDpmaXJzdC1jaGlsZC5wbHlyX190YWItZm9jdXMgLnBseXJfX3Rvb2x0aXAsLnBseXJfX2NvbnRyb2xzPi5wbHlyX19jb250cm9sOmZpcnN0LWNoaWxkOmhvdmVyIC5wbHlyX190b29sdGlwLC5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbDpsYXN0LWNoaWxkIC5wbHlyX190b29sdGlwLS12aXNpYmxlLC5wbHlyX19jb250cm9scz4ucGx5cl9fY29udHJvbDpsYXN0LWNoaWxkLnBseXJfX3RhYi1mb2N1cyAucGx5cl9fdG9vbHRpcCwucGx5cl9fY29udHJvbHM+LnBseXJfX2NvbnRyb2w6bGFzdC1jaGlsZDpob3ZlciAucGx5cl9fdG9vbHRpcHt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsMCkgc2NhbGUoMSl9LnBseXItLXZpZGVve2JhY2tncm91bmQ6IzAwMDtvdmVyZmxvdzpoaWRkZW59LnBseXItLXZpZGVvLnBseXItLW1lbnUtb3BlbntvdmVyZmxvdzp2aXNpYmxlfS5wbHlyX192aWRlby13cmFwcGVye2JhY2tncm91bmQ6IzAwMDtib3JkZXItcmFkaXVzOmluaGVyaXQ7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MH0ucGx5cl9fcHJvZ3Jlc3N7ZmxleDoxO2xlZnQ6N3B4O21hcmdpbi1yaWdodDoxNHB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5wbHlyX19wcm9ncmVzcyBpbnB1dFt0eXBlPXJhbmdlXSwucGx5cl9fcHJvZ3Jlc3NfX2J1ZmZlcnttYXJnaW4tbGVmdDotN3B4O21hcmdpbi1yaWdodDotN3B4O3dpZHRoOmNhbGMoMTAwJSArIDE0cHgpfS5wbHlyX19wcm9ncmVzcyBpbnB1dFt0eXBlPXJhbmdlXXtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjJ9LnBseXJfX3Byb2dyZXNzIC5wbHlyX190b29sdGlwe2ZvbnQtc2l6ZToxNHB4O2xlZnQ6MH0ucGx5cl9fcHJvZ3Jlc3NfX2J1ZmZlcnstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6MDtib3JkZXItcmFkaXVzOjEwMHB4O2hlaWdodDo2cHg7bGVmdDowO21hcmdpbi10b3A6LTNweDtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJX0ucGx5cl9fcHJvZ3Jlc3NfX2J1ZmZlcjo6LXdlYmtpdC1wcm9ncmVzcy1iYXJ7YmFja2dyb3VuZDowIDA7dHJhbnNpdGlvbjp3aWR0aCAuMnMgZWFzZX0ucGx5cl9fcHJvZ3Jlc3NfX2J1ZmZlcjo6LXdlYmtpdC1wcm9ncmVzcy12YWx1ZXtiYWNrZ3JvdW5kOmN1cnJlbnRDb2xvcjtib3JkZXItcmFkaXVzOjEwMHB4O21pbi13aWR0aDo2cHh9LnBseXJfX3Byb2dyZXNzX19idWZmZXI6Oi1tb3otcHJvZ3Jlc3MtYmFye2JhY2tncm91bmQ6Y3VycmVudENvbG9yO2JvcmRlci1yYWRpdXM6MTAwcHg7bWluLXdpZHRoOjZweDt0cmFuc2l0aW9uOndpZHRoIC4ycyBlYXNlfS5wbHlyX19wcm9ncmVzc19fYnVmZmVyOjotbXMtZmlsbHtib3JkZXItcmFkaXVzOjEwMHB4O3RyYW5zaXRpb246d2lkdGggLjJzIGVhc2V9LnBseXItLXZpZGVvIC5wbHlyX19wcm9ncmVzc19fYnVmZmVye2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjE1KTtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC4yNSl9LnBseXItLWF1ZGlvIC5wbHlyX19wcm9ncmVzc19fYnVmZmVye2NvbG9yOnJnYmEoMTgzLDE5NywyMDUsLjY2KX0ucGx5ci0tbG9hZGluZyAucGx5cl9fcHJvZ3Jlc3NfX2J1ZmZlcnthbmltYXRpb246cGx5ci1wcm9ncmVzcyAxcyBsaW5lYXIgaW5maW5pdGU7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHJnYmEoNDcsNTIsNjEsLjYpIDI1JSx0cmFuc3BhcmVudCAyNSUsdHJhbnNwYXJlbnQgNTAlLHJnYmEoNDcsNTIsNjEsLjYpIDUwJSxyZ2JhKDQ3LDUyLDYxLC42KSA3NSUsdHJhbnNwYXJlbnQgNzUlLHRyYW5zcGFyZW50KTtiYWNrZ3JvdW5kLXJlcGVhdDpyZXBlYXQteDtiYWNrZ3JvdW5kLXNpemU6MjVweCAyNXB4O2NvbG9yOnRyYW5zcGFyZW50fS5wbHlyLS12aWRlby5wbHlyLS1sb2FkaW5nIC5wbHlyX19wcm9ncmVzc19fYnVmZmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuMjUpfS5wbHlyLS1hdWRpby5wbHlyLS1sb2FkaW5nIC5wbHlyX19wcm9ncmVzc19fYnVmZmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgxODMsMTk3LDIwNSwuNjYpfS5wbHlyX192b2x1bWV7YWxpZ24taXRlbXM6Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4OjE7cG9zaXRpb246cmVsYXRpdmV9LnBseXJfX3ZvbHVtZSBpbnB1dFt0eXBlPXJhbmdlXXttYXJnaW4tbGVmdDo1cHg7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoyfUBtZWRpYSAobWluLXdpZHRoOjQ4MHB4KXsucGx5cl9fdm9sdW1le21heC13aWR0aDo5MHB4fX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LnBseXJfX3ZvbHVtZXttYXgtd2lkdGg6MTEwcHh9fS5wbHlyLS1pcy1pb3MgLnBseXJfX3ZvbHVtZXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5wbHlyLS1pcy1pb3MucGx5ci0tdmltZW8gW2RhdGEtcGx5cj1tdXRlXXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fS5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW57YmFja2dyb3VuZDojMDAwO2JvcmRlci1yYWRpdXM6MCFpbXBvcnRhbnQ7aGVpZ2h0OjEwMCU7bWFyZ2luOjA7d2lkdGg6MTAwJX0ucGx5cjotbW96LWZ1bGwtc2NyZWVue2JhY2tncm91bmQ6IzAwMDtib3JkZXItcmFkaXVzOjAhaW1wb3J0YW50O2hlaWdodDoxMDAlO21hcmdpbjowO3dpZHRoOjEwMCV9LnBseXI6LW1zLWZ1bGxzY3JlZW57YmFja2dyb3VuZDojMDAwO2JvcmRlci1yYWRpdXM6MCFpbXBvcnRhbnQ7aGVpZ2h0OjEwMCU7bWFyZ2luOjA7d2lkdGg6MTAwJX0ucGx5cjpmdWxsc2NyZWVue2JhY2tncm91bmQ6IzAwMDtib3JkZXItcmFkaXVzOjAhaW1wb3J0YW50O2hlaWdodDoxMDAlO21hcmdpbjowO3dpZHRoOjEwMCV9LnBseXI6LXdlYmtpdC1mdWxsLXNjcmVlbiB2aWRlb3toZWlnaHQ6MTAwJX0ucGx5cjotbW96LWZ1bGwtc2NyZWVuIHZpZGVve2hlaWdodDoxMDAlfS5wbHlyOi1tcy1mdWxsc2NyZWVuIHZpZGVve2hlaWdodDoxMDAlfS5wbHlyOmZ1bGxzY3JlZW4gdmlkZW97aGVpZ2h0OjEwMCV9LnBseXI6LXdlYmtpdC1mdWxsLXNjcmVlbiAucGx5cl9fdmlkZW8td3JhcHBlcntoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5wbHlyOi1tb3otZnVsbC1zY3JlZW4gLnBseXJfX3ZpZGVvLXdyYXBwZXJ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0ucGx5cjotbXMtZnVsbHNjcmVlbiAucGx5cl9fdmlkZW8td3JhcHBlcntoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5wbHlyOmZ1bGxzY3JlZW4gLnBseXJfX3ZpZGVvLXdyYXBwZXJ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0ucGx5cjotd2Via2l0LWZ1bGwtc2NyZWVuIC5wbHlyX192aWRlby1lbWJlZHtvdmVyZmxvdzp2aXNpYmxlfS5wbHlyOi1tb3otZnVsbC1zY3JlZW4gLnBseXJfX3ZpZGVvLWVtYmVke292ZXJmbG93OnZpc2libGV9LnBseXI6LW1zLWZ1bGxzY3JlZW4gLnBseXJfX3ZpZGVvLWVtYmVke292ZXJmbG93OnZpc2libGV9LnBseXI6ZnVsbHNjcmVlbiAucGx5cl9fdmlkZW8tZW1iZWR7b3ZlcmZsb3c6dmlzaWJsZX0ucGx5cjotd2Via2l0LWZ1bGwtc2NyZWVuLnBseXItLXZpbWVvIC5wbHlyX192aWRlby13cmFwcGVye2hlaWdodDowO3RvcDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LnBseXI6LW1vei1mdWxsLXNjcmVlbi5wbHlyLS12aW1lbyAucGx5cl9fdmlkZW8td3JhcHBlcntoZWlnaHQ6MDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5wbHlyOi1tcy1mdWxsc2NyZWVuLnBseXItLXZpbWVvIC5wbHlyX192aWRlby13cmFwcGVye2hlaWdodDowO3RvcDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LnBseXI6ZnVsbHNjcmVlbi5wbHlyLS12aW1lbyAucGx5cl9fdmlkZW8td3JhcHBlcntoZWlnaHQ6MDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4gLnBseXJfX2NvbnRyb2wgLmljb24tLWV4aXQtZnVsbHNjcmVlbntkaXNwbGF5OmJsb2NrfS5wbHlyOi1tb3otZnVsbC1zY3JlZW4gLnBseXJfX2NvbnRyb2wgLmljb24tLWV4aXQtZnVsbHNjcmVlbntkaXNwbGF5OmJsb2NrfS5wbHlyOi1tcy1mdWxsc2NyZWVuIC5wbHlyX19jb250cm9sIC5pY29uLS1leGl0LWZ1bGxzY3JlZW57ZGlzcGxheTpibG9ja30ucGx5cjpmdWxsc2NyZWVuIC5wbHlyX19jb250cm9sIC5pY29uLS1leGl0LWZ1bGxzY3JlZW57ZGlzcGxheTpibG9ja30ucGx5cjotd2Via2l0LWZ1bGwtc2NyZWVuIC5wbHlyX19jb250cm9sIC5pY29uLS1leGl0LWZ1bGxzY3JlZW4rc3Zne2Rpc3BsYXk6bm9uZX0ucGx5cjotbW96LWZ1bGwtc2NyZWVuIC5wbHlyX19jb250cm9sIC5pY29uLS1leGl0LWZ1bGxzY3JlZW4rc3Zne2Rpc3BsYXk6bm9uZX0ucGx5cjotbXMtZnVsbHNjcmVlbiAucGx5cl9fY29udHJvbCAuaWNvbi0tZXhpdC1mdWxsc2NyZWVuK3N2Z3tkaXNwbGF5Om5vbmV9LnBseXI6ZnVsbHNjcmVlbiAucGx5cl9fY29udHJvbCAuaWNvbi0tZXhpdC1mdWxsc2NyZWVuK3N2Z3tkaXNwbGF5Om5vbmV9LnBseXI6LXdlYmtpdC1mdWxsLXNjcmVlbi5wbHlyLS1oaWRlLWNvbnRyb2xze2N1cnNvcjpub25lfS5wbHlyOi1tb3otZnVsbC1zY3JlZW4ucGx5ci0taGlkZS1jb250cm9sc3tjdXJzb3I6bm9uZX0ucGx5cjotbXMtZnVsbHNjcmVlbi5wbHlyLS1oaWRlLWNvbnRyb2xze2N1cnNvcjpub25lfS5wbHlyOmZ1bGxzY3JlZW4ucGx5ci0taGlkZS1jb250cm9sc3tjdXJzb3I6bm9uZX1AbWVkaWEgKG1pbi13aWR0aDoxMDI0cHgpey5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4gLnBseXJfX2NhcHRpb25ze2ZvbnQtc2l6ZToyMXB4fS5wbHlyOi1tb3otZnVsbC1zY3JlZW4gLnBseXJfX2NhcHRpb25ze2ZvbnQtc2l6ZToyMXB4fS5wbHlyOi1tcy1mdWxsc2NyZWVuIC5wbHlyX19jYXB0aW9uc3tmb250LXNpemU6MjFweH0ucGx5cjpmdWxsc2NyZWVuIC5wbHlyX19jYXB0aW9uc3tmb250LXNpemU6MjFweH19LnBseXI6LXdlYmtpdC1mdWxsLXNjcmVlbntiYWNrZ3JvdW5kOiMwMDA7Ym9yZGVyLXJhZGl1czowIWltcG9ydGFudDtoZWlnaHQ6MTAwJTttYXJnaW46MDt3aWR0aDoxMDAlfS5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4gdmlkZW97aGVpZ2h0OjEwMCV9LnBseXI6LXdlYmtpdC1mdWxsLXNjcmVlbiAucGx5cl9fdmlkZW8td3JhcHBlcntoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4gLnBseXJfX3ZpZGVvLWVtYmVke292ZXJmbG93OnZpc2libGV9LnBseXI6LXdlYmtpdC1mdWxsLXNjcmVlbi5wbHlyLS12aW1lbyAucGx5cl9fdmlkZW8td3JhcHBlcntoZWlnaHQ6MDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4gLnBseXJfX2NvbnRyb2wgLmljb24tLWV4aXQtZnVsbHNjcmVlbntkaXNwbGF5OmJsb2NrfS5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4gLnBseXJfX2NvbnRyb2wgLmljb24tLWV4aXQtZnVsbHNjcmVlbitzdmd7ZGlzcGxheTpub25lfS5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4ucGx5ci0taGlkZS1jb250cm9sc3tjdXJzb3I6bm9uZX1AbWVkaWEgKG1pbi13aWR0aDoxMDI0cHgpey5wbHlyOi13ZWJraXQtZnVsbC1zY3JlZW4gLnBseXJfX2NhcHRpb25ze2ZvbnQtc2l6ZToyMXB4fX0ucGx5cjotbW96LWZ1bGwtc2NyZWVue2JhY2tncm91bmQ6IzAwMDtib3JkZXItcmFkaXVzOjAhaW1wb3J0YW50O2hlaWdodDoxMDAlO21hcmdpbjowO3dpZHRoOjEwMCV9LnBseXI6LW1vei1mdWxsLXNjcmVlbiB2aWRlb3toZWlnaHQ6MTAwJX0ucGx5cjotbW96LWZ1bGwtc2NyZWVuIC5wbHlyX192aWRlby13cmFwcGVye2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LnBseXI6LW1vei1mdWxsLXNjcmVlbiAucGx5cl9fdmlkZW8tZW1iZWR7b3ZlcmZsb3c6dmlzaWJsZX0ucGx5cjotbW96LWZ1bGwtc2NyZWVuLnBseXItLXZpbWVvIC5wbHlyX192aWRlby13cmFwcGVye2hlaWdodDowO3RvcDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSl9LnBseXI6LW1vei1mdWxsLXNjcmVlbiAucGx5cl9fY29udHJvbCAuaWNvbi0tZXhpdC1mdWxsc2NyZWVue2Rpc3BsYXk6YmxvY2t9LnBseXI6LW1vei1mdWxsLXNjcmVlbiAucGx5cl9fY29udHJvbCAuaWNvbi0tZXhpdC1mdWxsc2NyZWVuK3N2Z3tkaXNwbGF5Om5vbmV9LnBseXI6LW1vei1mdWxsLXNjcmVlbi5wbHlyLS1oaWRlLWNvbnRyb2xze2N1cnNvcjpub25lfUBtZWRpYSAobWluLXdpZHRoOjEwMjRweCl7LnBseXI6LW1vei1mdWxsLXNjcmVlbiAucGx5cl9fY2FwdGlvbnN7Zm9udC1zaXplOjIxcHh9fS5wbHlyOi1tcy1mdWxsc2NyZWVue2JhY2tncm91bmQ6IzAwMDtib3JkZXItcmFkaXVzOjAhaW1wb3J0YW50O2hlaWdodDoxMDAlO21hcmdpbjowO3dpZHRoOjEwMCV9LnBseXI6LW1zLWZ1bGxzY3JlZW4gdmlkZW97aGVpZ2h0OjEwMCV9LnBseXI6LW1zLWZ1bGxzY3JlZW4gLnBseXJfX3ZpZGVvLXdyYXBwZXJ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0ucGx5cjotbXMtZnVsbHNjcmVlbiAucGx5cl9fdmlkZW8tZW1iZWR7b3ZlcmZsb3c6dmlzaWJsZX0ucGx5cjotbXMtZnVsbHNjcmVlbi5wbHlyLS12aW1lbyAucGx5cl9fdmlkZW8td3JhcHBlcntoZWlnaHQ6MDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS5wbHlyOi1tcy1mdWxsc2NyZWVuIC5wbHlyX19jb250cm9sIC5pY29uLS1leGl0LWZ1bGxzY3JlZW57ZGlzcGxheTpibG9ja30ucGx5cjotbXMtZnVsbHNjcmVlbiAucGx5cl9fY29udHJvbCAuaWNvbi0tZXhpdC1mdWxsc2NyZWVuK3N2Z3tkaXNwbGF5Om5vbmV9LnBseXI6LW1zLWZ1bGxzY3JlZW4ucGx5ci0taGlkZS1jb250cm9sc3tjdXJzb3I6bm9uZX1AbWVkaWEgKG1pbi13aWR0aDoxMDI0cHgpey5wbHlyOi1tcy1mdWxsc2NyZWVuIC5wbHlyX19jYXB0aW9uc3tmb250LXNpemU6MjFweH19LnBseXItLWZ1bGxzY3JlZW4tZmFsbGJhY2t7YmFja2dyb3VuZDojMDAwO2JvcmRlci1yYWRpdXM6MCFpbXBvcnRhbnQ7aGVpZ2h0OjEwMCU7bWFyZ2luOjA7d2lkdGg6MTAwJTtib3R0b206MDtsZWZ0OjA7cG9zaXRpb246Zml4ZWQ7cmlnaHQ6MDt0b3A6MDt6LWluZGV4OjEwMDAwMDAwfS5wbHlyLS1mdWxsc2NyZWVuLWZhbGxiYWNrIHZpZGVve2hlaWdodDoxMDAlfS5wbHlyLS1mdWxsc2NyZWVuLWZhbGxiYWNrIC5wbHlyX192aWRlby13cmFwcGVye2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9LnBseXItLWZ1bGxzY3JlZW4tZmFsbGJhY2sgLnBseXJfX3ZpZGVvLWVtYmVke292ZXJmbG93OnZpc2libGV9LnBseXItLWZ1bGxzY3JlZW4tZmFsbGJhY2sucGx5ci0tdmltZW8gLnBseXJfX3ZpZGVvLXdyYXBwZXJ7aGVpZ2h0OjA7dG9wOjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0ucGx5ci0tZnVsbHNjcmVlbi1mYWxsYmFjayAucGx5cl9fY29udHJvbCAuaWNvbi0tZXhpdC1mdWxsc2NyZWVue2Rpc3BsYXk6YmxvY2t9LnBseXItLWZ1bGxzY3JlZW4tZmFsbGJhY2sgLnBseXJfX2NvbnRyb2wgLmljb24tLWV4aXQtZnVsbHNjcmVlbitzdmd7ZGlzcGxheTpub25lfS5wbHlyLS1mdWxsc2NyZWVuLWZhbGxiYWNrLnBseXItLWhpZGUtY29udHJvbHN7Y3Vyc29yOm5vbmV9QG1lZGlhIChtaW4td2lkdGg6MTAyNHB4KXsucGx5ci0tZnVsbHNjcmVlbi1mYWxsYmFjayAucGx5cl9fY2FwdGlvbnN7Zm9udC1zaXplOjIxcHh9fS5wbHlyX19hZHN7Ym9yZGVyLXJhZGl1czppbmhlcml0O2JvdHRvbTowO2N1cnNvcjpwb2ludGVyO2xlZnQ6MDtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDt6LWluZGV4Oi0xfS5wbHlyX19hZHM+ZGl2LC5wbHlyX19hZHM+ZGl2IGlmcmFtZXtoZWlnaHQ6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlfS5wbHlyX19hZHM6OmFmdGVye2JhY2tncm91bmQ6cmdiYSg0Nyw1Miw2MSwuOCk7Ym9yZGVyLXJhZGl1czoycHg7Ym90dG9tOjEwcHg7Y29sb3I6I2ZmZjtjb250ZW50OmF0dHIoZGF0YS1iYWRnZS10ZXh0KTtmb250LXNpemU6MTFweDtwYWRkaW5nOjJweCA2cHg7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxMHB4O3otaW5kZXg6M30ucGx5cl9fYWRzOjphZnRlcjplbXB0eXtkaXNwbGF5Om5vbmV9LnBseXJfX2N1ZXN7YmFja2dyb3VuZDpjdXJyZW50Q29sb3I7ZGlzcGxheTpibG9jaztoZWlnaHQ6NnB4O2xlZnQ6MDttYXJnaW46LTNweCAwIDA7b3BhY2l0eTouODtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3dpZHRoOjNweDt6LWluZGV4OjN9LnBseXItLW5vLXRyYW5zaXRpb257dHJhbnNpdGlvbjpub25lIWltcG9ydGFudH0ucGx5cl9fc3Itb25seXtjbGlwOnJlY3QoMXB4LDFweCwxcHgsMXB4KTtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjAhaW1wb3J0YW50O2hlaWdodDoxcHghaW1wb3J0YW50O3BhZGRpbmc6MCFpbXBvcnRhbnQ7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O3dpZHRoOjFweCFpbXBvcnRhbnR9LnBseXIgW2hpZGRlbl17ZGlzcGxheTpub25lIWltcG9ydGFudH1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3BseXIvZGlzdC9wbHlyLmNzc1xuLy8gbW9kdWxlIGlkID0gMzQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vIGltcG9ydCBQbHlyIGZyb20gJ3BseXInXG52YXIgUGx5clZpZGVvID0geyByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF92bSA9IHRoaXM7dmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaDtyZXR1cm4gX2MoJ3ZpZGVvJywgeyByZWY6IFwidmlkZW9cIiwgc3RhdGljQ2xhc3M6IFwidmlkZW9cIiwgYXR0cnM6IHsgXCJpZFwiOiAoXCJqcy1wbGF5ZXItdmlkZW8tXCIgKyAoX3ZtLmlkTnVtYmVyKSksIFwicG9zdGVyXCI6IF92bS5wb3N0ZXIsIFwiY3Jvc3NvcmlnaW5cIjogX3ZtLmNyb3Nzb3JpZ2luIH0gfSwgW192bS5fbChfdm0udmlkZW9zLCBmdW5jdGlvbiAodmlkLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKCdzb3VyY2UnLCB7IGtleTogaW5kZXgsIGF0dHJzOiB7IFwic3JjXCI6IHZpZC5zcmMsIFwidHlwZVwiOiAoXCJ2aWRlby9cIiArICh2aWQuZm9ybWF0KSkgfSB9KTtcbiAgICAgICAgfSksIF92bS5fdihcIiBcIiksIF92bS5fbChfdm0uc3VidGl0bGVzLCBmdW5jdGlvbiAoc3VidGl0bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfYygndHJhY2snLCB7IGtleTogc3VidGl0bGUuc3JjLCBhdHRyczogeyBcImtpbmRcIjogXCJjYXB0aW9uc1wiLCBcImxhYmVsXCI6IHN1YnRpdGxlLmxhYmVsLCBcInNyY1wiOiBzdWJ0aXRsZS5zcmMsIFwic3JjbGFuZ1wiOiBzdWJ0aXRsZS5zcmNsYW5nLCBcImRlZmF1bHRcIjogc3VidGl0bGUuZGVmYXVsdCB9IH0pO1xuICAgICAgICB9KV0sIDIpO1xuICAgIH0sIHN0YXRpY1JlbmRlckZuczogW10sXG4gICAgbmFtZTogJ1BseXJWaWRlbycsXG4gICAgcHJvcHM6IHtcbiAgICAgICAgLyoqIE9wdGlvbnMgb2JqZWN0IGZvciBwbHlyIGNvbmZpZy4gKi9cbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gZGVmYXVsdCQxKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqIEFycmF5IG9mIGV2ZW50cyB0byBlbWl0IGZyb20gdGhlIHBseXIgb2JqZWN0ICovXG4gICAgICAgIGVtaXQ6IHtcbiAgICAgICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gZGVmYXVsdCQyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqIExpbmsgdG8gcG9zdGVyIHRvIHNob3cgd2hlbiB2aWRlbyBoYXNuJ3QgcGxheWVkIHlldC4gKi9cbiAgICAgICAgcG9zdGVyOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAvKiogQXJyYXkgb2YgdmlkZW9zIHRvIGluY2x1ZGUgaW4gdGhlIHZpZGVvIHNvdXJjZS4gKi9cbiAgICAgICAgdmlkZW9zOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKHZpZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzUHJvcHMgPSB2aWQuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZpZC5oYXNPd25Qcm9wZXJ0eSgnZm9ybWF0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKiBPYmplY3QgZm9yIHN1YnRpdGxlcyB0cmFjay4gKi9cbiAgICAgICAgc3VidGl0bGVzOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9LFxuICAgICAgICAgICAgdmFsaWRhdG9yOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKHRyYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNQcm9wcyA9IHRyYWNrLmhhc093blByb3BlcnR5KCdsYWJlbCcpICYmIHRyYWNrLmhhc093blByb3BlcnR5KCdzcmMnKSAmJiB0cmFjay5oYXNPd25Qcm9wZXJ0eSgnc3JjbGFuZycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Byb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvKiogQm9vbGVhbiBmb3Igd2hldGhlciB0byBwdXQgY3Jvc3NvcmlnaW4gYXR0cmlidXRlIG9uIHRoZSB2aWRlbyBlbGVtZW50LiAqL1xuICAgICAgICBjcm9zc29yaWdpbjoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwbGF5ZXI6IHt9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBpZE51bWJlcjogZnVuY3Rpb24gaWROdW1iZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMDAwMCAtIDEpKSArIDE7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgIHZhciBQbHlyID0gcmVxdWlyZSgncGx5cicpO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbHlyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKChcImpzLXBsYXllci12aWRlby1cIiArICh0aGlzLmlkTnVtYmVyKSkpLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmVtaXQuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcyQxLnBsYXllci5vbihlbGVtZW50LCB0aGlzJDEuZW1pdFBsYXllckV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAvLyB0aGlzLnBsYXllci5kZXN0cm95KCk7XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGVtaXRQbGF5ZXJFdmVudDogZnVuY3Rpb24gZW1pdFBsYXllckV2ZW50KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBDb21wb25lbnRzID0gW1BseXJWaWRlb107XG5cbnZhciBpbmRleCA9IChmdW5jdGlvbiAoVnVlKSB7XG4gICAgQ29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChDb21wb25lbnQpIHtcbiAgICAgICAgVnVlLmNvbXBvbmVudChDb21wb25lbnQubmFtZSwgQ29tcG9uZW50KTtcbiAgICB9KTtcbn0pO1xuXG5cbmV4cG9ydCB7IFBseXJWaWRlbyB9O1xuZXhwb3J0IHtpbmRleH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2NvbXBvbmVudC9wbGF5ZXIvdmlkZW9QbGF5ZXIuanMiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidmlkZW8tcGxheWVyXCIgfSwgW1xuICAgIF92bS5zaG93VmlkZW9cbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF92bS5zM192aWRlb1xuICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInMzLXZpZGVvXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwidmlkZW9cIiwgeyByZWY6IFwicGxheWVyVmlkZW9cIiwgYXR0cnM6IHsgY29udHJvbHM6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInNvdXJjZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgc3JjOiBfdm0udmlkZW8uZmlsZV93YXRlcm1hcmtfZGlydHksXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ2aWRlby9tcDRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy5cXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICA6IF92bS55b3V0dWJlVmlkZW9cbiAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInlvdXR1YmUtdmlkZW9cIiB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcInBseXIteW91dHViZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnlvdXR1YmVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IF92bS55b3V0dWJlVmlkZW9QbGF5ZXJPcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBfdm0uc29jaWFsVmlkZW9cbiAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic29jaWFsLXZpZGVvXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnZpZGVvLmlmcmFtZSkgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICA6IF92bS52aWRlby51cmwgPT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgIF92bS52aWRlby5maWxlX3dhdGVybWFya19kaXJ0eSAhPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInZpZGVvXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcImNkbl92aWRlb1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0udmlkZW8uaWZyYW1lKSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSlcbiAgICAgIDogX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICB2ZXJ0aWNhbDogX3ZtLnZpZGVvLnZlcnRpY2FsID8gX3ZtLnZpZGVvLnZlcnRpY2FsIDogXCJcIixcbiAgICAgICAgICAgICAgaG9yaXpvbnRhbDogIV92bS52aWRlby52ZXJ0aWNhbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwiYWxpZ24tY29udGVudC1jZW50ZXJcIjogXCJcIiwgc20xMjogXCJcIiwgbWQ3OiBcIlwiIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInZpZGVvLXBsYXllci1wb3N0ZXJcIiwgYXR0cnM6IHsgZmxhdDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfdm0uZ2V0VmlkZW9QdXJjaGFzZWQoKVxuICAgICAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJsYWJlbCBsYWJlbC1saWNlbnNlZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJQdXJjaGFzZWRcIilcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInYtY2FyZC1tZWRpYVwiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLmdldFRobnVtYm5haWwoKSB9IH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRhcmsgcGxheWVyLXBsYXlcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGFyazogXCJcIiwgZmFiOiBcIlwiLCBtZWRpdW06IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uY2hhbmdlKClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgbGFyZ2U6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwicGxheV9hcnJvd1wiKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi05ODA1OTE4NFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOTgwNTkxODRcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvY29tcG9uZW50L1ZpZGVvUGxheWVyQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcInZpZGVvLWRpYWxvZy1jb250ZW50XCIgfSxcbiAgICBbXG4gICAgICBfdm0udmlkZW9fZGV0YWlsXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDc6IFwiXCIsIGxnNzogXCJcIiwgeGw3OiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJ2aWRlby1wbGF5ZXJcIiwgeyBhdHRyczogeyB2aWRlbzogX3ZtLnZpZGVvX2RldGFpbCB9IH0pXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJwbC00XCI6IF92bS5jb250ZW50X3BhZGRpbmcsXG4gICAgICAgICAgICAgICAgICAgIFwicHQtNFwiOiAhX3ZtLmNvbnRlbnRfcGFkZGluZ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kNTogXCJcIiwgbGc1OiBcIlwiLCB4bDU6IFwiXCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInZpZGVvLWRldGFpbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgYXR0cnM6IHsgY2xhczogXCJ2aWRlby10aXRsZVwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS52aWRlb19kZXRhaWwudGl0bGUpKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidmlkZW8tdGl0bGUtY2FwdGlvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqdXN0aWZ5LWNlbnRlclwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czY6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHNtYWxsOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImFsYXJtXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjb252ZXJ0VGltZVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW9fZGV0YWlsLmR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW9fZGV0YWlsLnZpZXdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHM2OiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHNtYWxsOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcInJlbW92ZV9yZWRfZXllXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlb19kZXRhaWwudmlld3MgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgdmlld3NcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW9fZGV0YWlsLmRlc2NyaXB0aW9uICE9IFwibnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50LWRlc2NyaXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcInJlYWRtb3JlXCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW9fZGV0YWlsLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJlYWQtbW9yZSB0ZXh0LXhzLXJpZ2h0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmdvVG9EZXRhaWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHNtYWxsOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJrZXlib2FyZF9hcnJvd19yaWdodFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhZCBtb3JlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS50YWdzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInZpZGVvLWRldGFpbC10YWdzXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoM1wiLCB7IGF0dHJzOiB7IGlkOiBcInRhZ3NcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiVGFnczpcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0udmlkZW9fZGV0YWlsLnRhZ3MsIGZ1bmN0aW9uKHRhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImxpXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZ29Ub1RhZ1NlYXJjaCh0YWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3ModGFnLm5hbWUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LWQ5MzdjZTg0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1kOTM3Y2U4NFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9pbmNsdWRlcy9WaWRlb0luRGlhbG9nQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWRpYWxvZ1wiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7IHNjcm9sbGFibGU6IFwiXCIsIFwiY29udGVudC1jbGFzc1wiOiBcInZpZGVvLWRpYWxvZy1jb250YWluZXJcIiB9LFxuICAgICAgbW9kZWw6IHtcbiAgICAgICAgdmFsdWU6IF92bS52aWRlb19kaWFsb2csXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICBfdm0udmlkZW9fZGlhbG9nID0gJCR2XG4gICAgICAgIH0sXG4gICAgICAgIGV4cHJlc3Npb246IFwidmlkZW9fZGlhbG9nXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImRpYWxvZy1ib3gtc3dpdGNoIHByZXZcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiZGFyayBtYS0wIGhpZGRlbi14cy1vbmx5XCIsXG4gICAgICAgICAgICAgICAgZmFiOiBcIlwiLFxuICAgICAgICAgICAgICAgIHNtYWxsOiBcIlwiLFxuICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0ucHJldmlvdXNQYWdlRXhpc3RzXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLm9uUHJldmlvdXNWaWRlbygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJjaGV2cm9uX2xlZnRcIildKV0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImRpYWxvZy1ib3gtc3dpdGNoIG5leHRcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IFwiZGFyayBtYS0wIGhpZGRlbi14cy1vbmx5XCIsXG4gICAgICAgICAgICAgICAgZmFiOiBcIlwiLFxuICAgICAgICAgICAgICAgIHNtYWxsOiBcIlwiLFxuICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0ubmV4dFBhZ2VFeGlzdHNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0ub25OZXh0VmlkZW8oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiY2hldnJvbl9yaWdodFwiKV0pXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi10b29sYmFyXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGNhcmQ6IFwiXCIsIGRhcms6IFwiXCIsIGNvbG9yOiBcImRhcmtcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBpY29uOiBcIlwiLCBkYXJrOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uQ2xvc2VEaWFsb2dCb3goKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNsb3NlXCIpXSldLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LXRvb2xiYXItaXRlbXNcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1haWxlci1sYWJlbFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBBZGQgdG8gbWFpbGVyXFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1jaGVja2JveFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vblZpZGVvQ2xpY2soKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWxlY3RlZCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ2aWRlby1kaWFsb2ctYm94XCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInZpZGVvLWRpYWxvZy1sb2FkaW5nXCIgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b3VjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdG91Y2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc3dpcGUoXCJMZWZ0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnN3aXBlKFwiUmlnaHRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICgpID0+IHN3aXBlKCdMZWZ0JyksXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAoKSA9PiBzd2lwZSgnUmlnaHQnKVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwiZ3JpZC1saXN0LXhsXCI6IFwiXCIsIGZsdWlkOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW19jKFwidmlkZW8tZGlhbG9nLWNvbXBvbmVudFwiKV0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0yMzZkZjlhYVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMjM2ZGY5YWFcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvVmlkZW9JbkRpYWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDM0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TdG9yeURpYWxvZy52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTk1YzQxY2MwXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU3RvcnlEaWFsb2cudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9TdG9yeURpYWxvZy52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtOTVjNDFjYzBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi05NWM0MWNjMFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1N0b3J5RGlhbG9nLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIjx0ZW1wbGF0ZT5cbiAgICA8di1kaWFsb2dcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzdG9yeV9kaWFsb2dcIlxuICAgICAgICAgICAgc2Nyb2xsYWJsZVxuICAgICAgICAgICAgY29udGVudC1jbGFzcz1cInZpZGVvLWRpYWxvZy1jb250YWluZXJcIlxuICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1ib3gtc3dpdGNoIHByZXZcIj5cbiAgICAgICAgICAgIDx2LWJ0biBmYWJcbiAgICAgICAgICAgICAgICAgICBzbWFsbFxuICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmsgbWEtMCBoaWRkZW4teHMtb25seVwiXG4gICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25QcmV2aW91c1N0b3J5KClcIlxuICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cIiFwcmV2aW91c1BhZ2VFeGlzdHNcIiA+XG4gICAgICAgICAgICAgICAgPHYtaWNvbj5jaGV2cm9uX2xlZnQ8L3YtaWNvbj5cbiAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctYm94LXN3aXRjaCBuZXh0XCI+XG4gICAgICAgICAgICA8di1idG4gZmFiXG4gICAgICAgICAgICAgICAgICAgc21hbGxcbiAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25OZXh0U3RvcnkoKVwiXG4gICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrIG1hLTAgaGlkZGVuLXhzLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cIiFuZXh0UGFnZUV4aXN0c1wiID5cbiAgICAgICAgICAgICAgICA8di1pY29uPmNoZXZyb25fcmlnaHQ8L3YtaWNvbj5cbiAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDx2LWNhcmQ+XG4gICAgICAgICAgICA8di10b29sYmFyIGNhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIj5cbiAgICAgICAgICAgICAgICA8di1idG4gaWNvblxuICAgICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgIEBjbGljay5uYXRpdmU9XCJvbkNsb3NlRGlhbG9nQm94KClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5jbG9zZTwvdi1pY29uPlxuICAgICAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgICAgICA8di1zcGFjZXI+PC92LXNwYWNlcj5cblxuICAgICAgICAgICAgICAgIDx2LXRvb2xiYXItaXRlbXM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWlsZXItbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFkZCB0byBtYWlsZXJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVwib25TdG9yeUNsaWNrKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3YtY2hlY2tib3g+XG4gICAgICAgICAgICAgICAgPC92LXRvb2xiYXItaXRlbXM+XG4gICAgICAgICAgICA8L3YtdG9vbGJhcj5cblxuICAgICAgICAgICAgPHYtY2FyZC10ZXh0IGNsYXNzPVwidmlkZW8tZGlhbG9nLWJveFwiPlxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvLWRpYWxvZy1sb2FkaW5nXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC14bCBmbHVpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi10b3VjaD1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKCkgPT4gc3dpcGUoJ0xlZnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICgpID0+IHN3aXBlKCdSaWdodCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdG9yeS1kaWFsb2ctY29tcG9uZW50Pjwvc3RvcnktZGlhbG9nLWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cblxuXG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICAgIDwvdi1jYXJkPlxuICAgIDwvdi1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBTdG9yeURpYWxvZ0JveEV2ZW50QnVzIGZyb20gJy4uLy4uLy4uL2V2ZW50LWJ1cy9zdG9yeS1kaWFsb2ctYm94LWV2ZW50LWJ1cyc7XG4gICAgaW1wb3J0IFN0b3J5RGlhbG9nQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL2luY2x1ZGVzL1N0b3J5SW5EaWFsb2dDb21wb25lbnQnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBjdXJyZW50X3N0b3J5OiAnJyxcbiAgICAgICAgICAgICAgICBzdG9yeV9kaWFsb2c6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1hcmdpbl9jb250ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRfcGFnZTogMCxcblxuICAgICAgICAgICAgICAgIG5leHRQYWdlRXhpc3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5leHRQYWdlQWxwaGFJZDogJycsXG5cbiAgICAgICAgICAgICAgICBwcmV2aW91c1BhZ2VFeGlzdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldmlvdXNQYWdlQWxwaGFJZDogJycsXG4gICAgICAgICAgICAgICAgc3dpcGVEaXJlY3Rpb246JycsXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgc3RvcnlfZGlhbG9nKCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RvcnlfZGlhbG9nID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSZXNldFN0b3J5RGlhbG9nT2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLm9uUmVzZXRDdXJyZW50U3RvcnlJbmRpYWxvZygpO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFN0b3J5RGlhbG9nQ29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50X2RldmljZSA9IHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC5uYW1lO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50X2RldmljZSA9PSAnc20nIHx8IGN1cnJlbnRfZGV2aWNlID09ICd4cycpe1xuICAgICAgICAgICAgICAgIHRoaXMubWFyZ2luX2NvbnRlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cy4kb24oJ1N0b3J5RGlhbG9nU3RhdGVDaGFuZ2UnLCAoYWxwaGFfaWQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5X2RpYWxvZyA9IFN0b3J5RGlhbG9nQm94RXZlbnRCdXMub3BlblN0b3J5RGlhbG9nQm94O1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cy4kb24oJ3NldE5leHRQcmV2QnV0dG9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dFBhZ2VBbHBoYUlkID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXROZXh0U3RvcnlBbHBoYUlkO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNQYWdlQWxwaGFJZCA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0UHJldlN0b3J5QWxwaGFJZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBbHBoYUlkRXhpc3RzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X3N0b3J5ID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRDdXJyZW50U3RvcnlGb3JEaWFsb2c7XG5cbiAgICAgICAgICAgICAgICAvL2NoZWNrIHN0b3J5IGlzIHNlbGVjdGVkIG9yIG5vdFxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdG9yeVNlbGVjdGVkKCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRvbigndmlkZW9EaWFsb2dCb3hDbG9zZScsICh2aWRlbykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlfZGlhbG9nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICd2aWRlb3NfZGV0YWlsJywgcGFyYW1zIDoge2lkIDogdmlkZW8uYWxwaGFfaWR9fSk7XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRvbigndmlkZW9EaWFsb2dCb3hDbG9zZUJ5VGFnJywgKHRhZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlfZGlhbG9nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOiAndmlkZW9zX3RhZycsIHBhcmFtczoge3ZhbHVlOiB0YWcubmFtZX19KTtcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgc3dpcGUgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVEaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnUmlnaHQnKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzVmlkZW8oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdMZWZ0Jyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25OZXh0VmlkZW8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblByZXZpb3VzU3RvcnkoKXtcbiAgICAgICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLnN0b3J5RGlhbG9nUHJldkJ1dHRvbkNsaWNrKClcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uTmV4dFN0b3J5KCl7XG4gICAgICAgICAgICAgICAgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cy5zdG9yeURpYWxvZ05leHRCdXR0b25DbGljaygpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkNsb3NlRGlhbG9nQm94KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlfZGlhbG9nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSZXNldFZpZGVvRGlhbG9nT2JqZWN0Jyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjaGVja0FscGhhSWRFeGlzdHMoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5leHRQYWdlQWxwaGFJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRQYWdlRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFBhZ2VFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmV2aW91c1BhZ2VBbHBoYUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNQYWdlRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNQYWdlRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblN0b3J5Q2xpY2soKXtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnYWRkU3RvcnknLCB0aGlzLmN1cnJlbnRfc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRlbWl0KCdhZGRlZFN0b3J5RnJvbURpYWxvZycsIHRoaXMuY3VycmVudF9zdG9yeS5pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cy4kZW1pdCgncmVtb3ZlZFN0b3J5RnJvbURpYWxvZycsIHRoaXMuY3VycmVudF9zdG9yeS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgncmVtb3ZlU3RvcnknLCB0aGlzLmN1cnJlbnRfc3RvcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGlzU3RvcnlTZWxlY3RlZCgpe1xuICAgICAgICAgICAgICAgIGxldCBzdG9yaWVzID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRBbGxTZWxlY3RlZFN0b3JpZXM7XG5cbiAgICAgICAgICAgICAgICAvL3NldCBpbml0aWFsaXplIHN0YXRlXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN0b3JpZXMuZm9yRWFjaCgoc3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3J5LmlkID09PSB0aGlzLmN1cnJlbnRfc3RvcnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9TdG9yeURpYWxvZy52dWUiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TdG9yeUluRGlhbG9nQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTViYWE0ODRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TdG9yeUluRGlhbG9nQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlJbkRpYWxvZ0NvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMTViYWE0ODRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0xNWJhYTQ4NFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5SW5EaWFsb2dDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSAzNTFcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJzdG9yeS1kaWFsb2ctY29udGVudFwiPlxuICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDc+XG4gICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidmlkZW8tZGV0YWlsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzPVwidmlkZW8tdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1iYWRnZSBsZWZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFyayBzdG9yeS1pbi1kaWFsb2ctYmFkZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzdG9yeV9kZXRhaWwuZmxhZ2dlZCA9PSAxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24gZGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJiYWRnZVwiPndoYXRzaG90XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwic3RvcnlfZGV0YWlsLnRpdGxlXCI+PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYmFkZ2U+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwic3RvcnlfZGV0YWlsLnRpdGxlXCIgdi1lbHNlPjwvaDI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW8tdGl0bGUtY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnktY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzbWFsbD5hbGFybTwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHN0b3J5X2RldGFpbC5kYXRlX2luZ2VzdGVkIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNiBjbGFzcz1cInRleHQteHMtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIHNtYWxsPmVkaXQ8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBzdG9yeV9kZXRhaWwuYXV0aG9yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1odG1sPVwic3RvcnlfZGV0YWlsLmRlc2NyaXB0aW9uXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDU+XG4gICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC1zbSBmbHVpZD5cbiAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiYXNzZXQgaW4gYXNzZXRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImFzc2V0LmlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtY2FyZCBob3Zlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtY2FyZC1tZWRpYSA6c3JjPVwiZ2V0VGh1bWJJbWFnZShhc3NldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYXNzZXQtdGh1bWJuYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyMDBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25Bc3NldERpYWxvZyhhc3NldClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cImFzc2V0Lm1pbWVfdHlwZSA9PT0gJ3ZpZGVvL21wNCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIGNvbG9yPVwibGlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyaz52aWRlb2NhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkLW1lZGlhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cyBmcm9tICcuLi9ldmVudC1idXMvc3RvcnktZGlhbG9nLWJveC1ldmVudC1idXMnO1xuICAgIGltcG9ydCBWaWRlb1BsYXllciBmcm9tICcuLi9jb21wb25lbnQvVmlkZW9QbGF5ZXJDb21wb25lbnQnO1xuICAgIGltcG9ydCBWaWRlb1BsYXllckRpYWxvZ0JveEV2ZW50QnVzIGZyb20gJy4uL2V2ZW50LWJ1cy92aWRlby1wbGF5ZXItZGlhbG9nLWJveC1ldmVudC1idXMnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICB2aWRlb1BsYXllcjogVmlkZW9QbGF5ZXJcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RvcnlfZGV0YWlsOiAnJyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0SW1hZ2U6ICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnLFxuICAgICAgICAgICAgICAgIGFzc2V0czogW10sXG5cbiAgICAgICAgICAgICAgICByZWFkeV90b19zaG93OiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgY29udGVudF9wYWRkaW5nOiB0cnVlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7fSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgbGV0IGJyZWFrcG9pbnQgPSB0aGlzLiR2dWV0aWZ5LmJyZWFrcG9pbnQubmFtZTtcbiAgICAgICAgICAgIGlmIChicmVha3BvaW50ID09PSAnc20nIHx8IGJyZWFrcG9pbnQgPT09ICd4cycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRfcGFkZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRvbignU3RvcnlEaWFsb2dTdGF0ZUNoYW5nZScsIChhbHBoYV9pZCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RvcnlEYXRhKGFscGhhX2lkKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIFN0b3J5RGlhbG9nQm94RXZlbnRCdXMuJG9uKCdvblN0b3J5RGlhbG9nQ2xpY2tOZXh0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhbHBoYV9pZCA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0TmV4dFN0b3J5QWxwaGFJZDtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN0b3J5RGF0YShhbHBoYV9pZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cy4kb24oJ29uU3RvcnlEaWFsb2dDbGlja1ByZXYnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFscGhhX2lkID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRQcmV2U3RvcnlBbHBoYUlkO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RvcnlEYXRhKGFscGhhX2lkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRvbignb25SZXNldEN1cnJlbnRTdG9yeUluZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlfZGV0YWlsID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldHMgPSBbXTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGdldFN0b3J5RGF0YShhbHBoYV9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdnZXRTdG9yeU5leHRBbmRQcmV2TGluaycsIHthbHBoYV9pZDogYWxwaGFfaWR9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yeV9kZXRhaWwgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldEN1cnJlbnRTdG9yeUZvckRpYWxvZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RvcnlfZGV0YWlsLmFzc2V0cy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0cy5wdXNoKC4uLnRoaXMuc3RvcnlfZGV0YWlsLmFzc2V0cyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRDdXJyZW50U3RvcnlBc3NldHMnLCB0aGlzLnN0b3J5X2RldGFpbCk7XG4gICAgICAgICAgICAgICAgICAgIFN0b3J5RGlhbG9nQm94RXZlbnRCdXMuJGVtaXQoJ3NldE5leHRQcmV2QnV0dG9uJyk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uQXNzZXREaWFsb2coYXNzZXQpIHtcbiAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0U3RvcnlBc3NldERpYWxvZ0JveCcsIHtvcGVuOiB0cnVlLCBpZDogYXNzZXQuaWR9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFRodW1iSW1hZ2UoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQubWltZV90eXBlID09PSBcInZpZGVvL21wNFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NldC50aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzc2V0LnVybDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdvVG9UYWdTZWFyY2godGFnKSB7XG4gICAgICAgICAgICAgICAgVmlkZW9EaWFsb2dCb3hFdmVudEJ1cy5jbG9zZURpYWxvZ0J5VGFnU2VhcmNoKHRhZyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnb1RvRGV0YWlsKCkge1xuICAgICAgICAgICAgICAgIFZpZGVvRGlhbG9nQm94RXZlbnRCdXMuY2xvc2VWaWRlb0RpYWxvZyh0aGlzLnZpZGVvX2RldGFpbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbklzTW92aWUoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQuandfcGxheWVyX2NvZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5SW5EaWFsb2dDb21wb25lbnQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwic3RvcnktZGlhbG9nLWNvbnRlbnRcIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ3OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInZpZGVvLWRldGFpbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgY2xhczogXCJ2aWRlby10aXRsZVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uc3RvcnlfZGV0YWlsLmZsYWdnZWQgPT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJhZGdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmsgc3RvcnktaW4tZGlhbG9nLWJhZGdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImJhZGdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYmFkZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndoYXRzaG90XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5X2RldGFpbC50aXRsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcImgyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKF92bS5zdG9yeV9kZXRhaWwudGl0bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidmlkZW8tdGl0bGUtY2FwdGlvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImp1c3RpZnktY2VudGVyXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzNjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBzbWFsbDogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiYWxhcm1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnN0b3J5X2RldGFpbC5kYXRlX2luZ2VzdGVkKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHM2OiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgc21hbGw6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImVkaXRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnN0b3J5X2RldGFpbC5hdXRob3IpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50LWRlc2NyaXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKF92bS5zdG9yeV9kZXRhaWwuZGVzY3JpcHRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ1OiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJncmlkLWxpc3Qtc21cIjogXCJcIiwgZmx1aWQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5hc3NldHMsIGZ1bmN0aW9uKGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBhc3NldC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ2OiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBob3ZlcjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLW1lZGlhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhc3NldC10aHVtYm5haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBfdm0uZ2V0VGh1bWJJbWFnZShhc3NldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMjAwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uQXNzZXREaWFsb2coYXNzZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQubWltZV90eXBlID09PSBcInZpZGVvL21wNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ2aWRlby1pY29uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJsaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlkZW9jYW1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMTViYWE0ODRcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTE1YmFhNDg0XCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5SW5EaWFsb2dDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSAzNTNcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtZGlhbG9nXCIsXG4gICAge1xuICAgICAgYXR0cnM6IHsgc2Nyb2xsYWJsZTogXCJcIiwgXCJjb250ZW50LWNsYXNzXCI6IFwidmlkZW8tZGlhbG9nLWNvbnRhaW5lclwiIH0sXG4gICAgICBtb2RlbDoge1xuICAgICAgICB2YWx1ZTogX3ZtLnN0b3J5X2RpYWxvZyxcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgIF92bS5zdG9yeV9kaWFsb2cgPSAkJHZcbiAgICAgICAgfSxcbiAgICAgICAgZXhwcmVzc2lvbjogXCJzdG9yeV9kaWFsb2dcIlxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZGlhbG9nLWJveC1zd2l0Y2ggcHJldlwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBmYWI6IFwiXCIsXG4gICAgICAgICAgICAgICAgc21hbGw6IFwiXCIsXG4gICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrIG1hLTAgaGlkZGVuLXhzLW9ubHlcIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5wcmV2aW91c1BhZ2VFeGlzdHNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0ub25QcmV2aW91c1N0b3J5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNoZXZyb25fbGVmdFwiKV0pXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZGlhbG9nLWJveC1zd2l0Y2ggbmV4dFwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBmYWI6IFwiXCIsXG4gICAgICAgICAgICAgICAgc21hbGw6IFwiXCIsXG4gICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrIG1hLTAgaGlkZGVuLXhzLW9ubHlcIixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5uZXh0UGFnZUV4aXN0c1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5vbk5leHRTdG9yeSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJjaGV2cm9uX3JpZ2h0XCIpXSldLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LXRvb2xiYXJcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgY2FyZDogXCJcIiwgZGFyazogXCJcIiwgY29sb3I6IFwiZGFya1wiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IFwiXCIsIGRhcms6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ub25DbG9zZURpYWxvZ0JveCgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiY2xvc2VcIildKV0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtdG9vbGJhci1pdGVtc1wiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibWFpbGVyLWxhYmVsXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIEFkZCB0byBtYWlsZXJcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWNoZWNrYm94XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uU3RvcnlDbGljaygpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdGVkID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInZpZGVvLWRpYWxvZy1ib3hcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidmlkZW8tZGlhbG9nLWxvYWRpbmdcIiB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRvdWNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi10b3VjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zd2lwZShcIkxlZnRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc3dpcGUoXCJSaWdodFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIntcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogKCkgPT4gc3dpcGUoJ0xlZnQnKSxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICgpID0+IHN3aXBlKCdSaWdodCcpXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJncmlkLWxpc3QteGxcIjogXCJcIiwgZmx1aWQ6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX2MoXCJzdG9yeS1kaWFsb2ctY29tcG9uZW50XCIpXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTk1YzQxY2MwXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi05NWM0MWNjMFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9TdG9yeURpYWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDM1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9WaWRlb1BsYXllckluRGlhbG9nLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNmRlZWRjMmNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9WaWRlb1BsYXllckluRGlhbG9nLnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvVmlkZW9QbGF5ZXJJbkRpYWxvZy52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNmRlZWRjMmNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi02ZGVlZGMyY1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9hZG1pbi9zY3JpcHRzL3BhZ2VzL21haWxlci9tb2R1bGVzL1ZpZGVvUGxheWVySW5EaWFsb2cudnVlXG4vLyBtb2R1bGUgaWQgPSAzNTVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiPHRlbXBsYXRlPlxuICAgIDwhLS0gRGlhbG9nIGJveCAtLT5cbiAgICA8di1kaWFsb2dcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ2aWRlb1BsYXllckRpYWxvZ1wiXG4gICAgICAgICAgICBtYXgtd2lkdGg9XCI1MDBweFwiXG4gICAgICAgICAgICBjb250ZW50LWNsYXNzPVwiYWRtaW4tdmlkZW8tcGxheWVyXCJcbiAgICAgICAgICAgIDpzdHlsZT1cInsnbGluZS1oZWlnaHQnOjAsIG92ZXJmbG93OidoaWRkZW4nfVwiXG4gICAgPlxuICAgICAgICAgICAgPHZpZGVvIHJlZj1cInZpZGVvX3BsYXllclwiIGF1dG9wbGF5IGNvbnRyb2xzIDpzcmM9XCJ2aWRlby51cmxcIj5cbiAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgPC92LWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IFZpZGVvUGxheWVyRGlhbG9nQm94RXZlbnRCdXMgZnJvbSAnLi4vLi4vLi4vZXZlbnQtYnVzL3ZpZGVvLXBsYXllci1kaWFsb2ctYm94LWV2ZW50LWJ1cyc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZpZGVvUGxheWVyRGlhbG9nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlbzogJycsXG5cbiAgICAgICAgICAgICAgICBtYXJnaW5fY29udGVudDogdHJ1ZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgdmlkZW9QbGF5ZXJEaWFsb2codmFsKXtcbiAgICAgICAgICAgICAgICBpZih2YWwgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy52aWRlb19wbGF5ZXIucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlbyA9ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG5cbiAgICAgICAgICAgIFZpZGVvUGxheWVyRGlhbG9nQm94RXZlbnRCdXMuJG9uKCdvcGVuUGxheWVyRGlhbG9nQm94JywgKGFzc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb1BsYXllckRpYWxvZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlbyA9IGFzc2V0O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRfZGV2aWNlID0gdGhpcy4kdnVldGlmeS5icmVha3BvaW50Lm5hbWU7XG4gICAgICAgICAgICBpZiAoY3VycmVudF9kZXZpY2UgPT0gJ3NtJyB8fCBjdXJyZW50X2RldmljZSA9PSAneHMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJnaW5fY29udGVudCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7fSxcblxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvbW9kdWxlcy9WaWRlb1BsYXllckluRGlhbG9nLnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWRpYWxvZ1wiLFxuICAgIHtcbiAgICAgIHN0eWxlOiB7IFwibGluZS1oZWlnaHRcIjogMCwgb3ZlcmZsb3c6IFwiaGlkZGVuXCIgfSxcbiAgICAgIGF0dHJzOiB7IFwibWF4LXdpZHRoXCI6IFwiNTAwcHhcIiwgXCJjb250ZW50LWNsYXNzXCI6IFwiYWRtaW4tdmlkZW8tcGxheWVyXCIgfSxcbiAgICAgIG1vZGVsOiB7XG4gICAgICAgIHZhbHVlOiBfdm0udmlkZW9QbGF5ZXJEaWFsb2csXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICBfdm0udmlkZW9QbGF5ZXJEaWFsb2cgPSAkJHZcbiAgICAgICAgfSxcbiAgICAgICAgZXhwcmVzc2lvbjogXCJ2aWRlb1BsYXllckRpYWxvZ1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcInZpZGVvXCIsIHtcbiAgICAgICAgcmVmOiBcInZpZGVvX3BsYXllclwiLFxuICAgICAgICBhdHRyczogeyBhdXRvcGxheTogXCJcIiwgY29udHJvbHM6IFwiXCIsIHNyYzogX3ZtLnZpZGVvLnVybCB9XG4gICAgICB9KVxuICAgIF1cbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi02ZGVlZGMyY1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNmRlZWRjMmNcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2FkbWluL3NjcmlwdHMvcGFnZXMvbWFpbGVyL21vZHVsZXMvVmlkZW9QbGF5ZXJJbkRpYWxvZy52dWVcbi8vIG1vZHVsZSBpZCA9IDM1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJhZG1pbi1tYWlsZXItc2VjdGlvblwiIH0sXG4gICAgW1xuICAgICAgX2MoXCJ2aWRlby1pbi1kaWFsb2dcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJzdG9yeS1pbi1kaWFsb2dcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ2aWRlby1wbGF5ZXItaW4tZGlhbG9nXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtZGlhbG9nXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgXCJtYXgtd2lkdGhcIjogXCI0MDBcIixcbiAgICAgICAgICAgIHBlcnNpc3RlbnQ6IFwiXCIsXG4gICAgICAgICAgICBcImNvbnRlbnQtY2xhc3NcIjogXCJtYWlsZXItZGlhbG9nLWVycm9yXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICB2YWx1ZTogX3ZtLmRpYWxvZyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgX3ZtLmRpYWxvZyA9ICQkdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfdm0ubm90U2VsZWN0ZWRFcnJvclxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1jYXJkLXRleHRcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHNpemU6IFwiODBweFwiLCBjb2xvcjogXCJibGFja1wiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcImVycm9yX291dGxpbmVcXG4gICAgICAgICAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImg0XCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC11cHBlcmNhc2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5lcnJvck1lc3NhZ2UpKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtYWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXNwYWNlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJibGFjayBkYXJrZW4tMVwiLCBmbGF0OiBcImZsYXRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kaWFsb2cgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJPa1xcbiAgICAgICAgICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtY2FyZC10ZXh0XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyIG15LTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtcHJvZ3Jlc3MtY2lyY3VsYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV0ZXJtaW5hdGU6IF92bS5pbmRldGVybWluYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICFfdm0uaW5kZXRlcm1pbmF0ZSA/IDEwMCA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhX3ZtLmluZGV0ZXJtaW5hdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBjb2xvcjogXCJibGFja1wiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImRvbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDRcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXVwcGVyY2FzZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnJlZnJlc2hUaXRsZSkpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1hY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiYmxhY2sgZGFya2VuLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcImZsYXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmRpc2FibGVCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiT2tcXG4gICAgICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgeyBhdHRyczogeyBcImdyaWQtbGlzdC1sZ1wiOiBcIlwiLCBmbHVpZDogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtbGVmdFwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkFkZFN0b3JpZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJhZGRcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgQWRkIFN0b3JpZXNcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtcmlnaHRcIiB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkYXJrOiBcIlwiLCByYWlzZWQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ub25DcmVhdGVNYWlsZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJhZGRcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJDcmVhdGUgTWFpbGVyXFxuICAgICAgICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZmx1aWQ6IFwiXCIsIFwiZ3JpZC1saXN0LWxnXCI6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtdGFic1wiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJkYXJrXCIsIGRhcms6IFwiXCIsIFwic2xpZGVyLWNvbG9yXCI6IFwiYmxhY2tcIiB9LFxuICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWN0aXZlLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5hY3RpdmUgPSAkJHZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRhYlwiLCBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgIFN0b3JpZXNcXG4gICAgICAgICAgICBcIildKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LXRhYi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgIFtfYyhcInYtY2FyZC10ZXh0XCIsIFtfYyhcIm1haWxlci1zdG9yaWVzLWNvbXBvbmVudFwiKV0sIDEpXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcInYtdGFiXCIsIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgVmlkZW9zXFxuICAgICAgICAgICAgXCIpXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi10YWItaXRlbVwiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICBbX2MoXCJ2LWNhcmQtdGV4dFwiLCBbX2MoXCJtYWlsZXItdmlkZW9zLWNvbXBvbmVudFwiKV0sIDEpXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTZlMTdmZGM0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02ZTE3ZmRjNFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvYWRtaW4vc2NyaXB0cy9wYWdlcy9tYWlsZXIvTWFpbGVyQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzU4XG4vLyBtb2R1bGUgY2h1bmtzID0gNCJdLCJzb3VyY2VSb290IjoiIn0=