(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MovaiReact"] = factory();
	else
		root["MovaiReact"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: Button, AbstractModal, ConfirmAlertModal, Drawer, Collapse, VerticalBar, ContextMenu, Table, Tabs, Text, Themes, Toggle, SearchInput, Breadcrumb, SceneViewer, Select, snackbar, Style */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Components_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Components/Button */ "./src/Components/Button.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _src_Components_Button__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_Components_Modal_AbstractModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Components/Modal/AbstractModal */ "./src/Components/Modal/AbstractModal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractModal", function() { return _src_Components_Modal_AbstractModal__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _src_Components_Modal_ConfirmAlertModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Components/Modal/ConfirmAlertModal */ "./src/Components/Modal/ConfirmAlertModal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfirmAlertModal", function() { return _src_Components_Modal_ConfirmAlertModal__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _src_Components_Drawer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/Components/Drawer */ "./src/Components/Drawer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drawer", function() { return _src_Components_Drawer__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _src_Components_Collapse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Components/Collapse */ "./src/Components/Collapse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collapse", function() { return _src_Components_Collapse__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _src_Components_VerticalBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Components/VerticalBar */ "./src/Components/VerticalBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VerticalBar", function() { return _src_Components_VerticalBar__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _src_Components_ContextMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Components/ContextMenu */ "./src/Components/ContextMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return _src_Components_ContextMenu__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _src_Components_Table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/Components/Table */ "./src/Components/Table.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _src_Components_Table__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _src_Components_Tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/Components/Tabs */ "./src/Components/Tabs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return _src_Components_Tabs__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _src_Components_Text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/Components/Text */ "./src/Components/Text.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return _src_Components_Text__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _src_Components_Toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/Components/Toggle */ "./src/Components/Toggle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toggle", function() { return _src_Components_Toggle__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _src_Components_SearchInput__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/Components/SearchInput */ "./src/Components/SearchInput.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchInput", function() { return _src_Components_SearchInput__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _src_Components_Breadcrumb__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./src/Components/Breadcrumb */ "./src/Components/Breadcrumb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Breadcrumb", function() { return _src_Components_Breadcrumb__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _src_Components_Viewer_SceneViewer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./src/Components/Viewer/SceneViewer */ "./src/Components/Viewer/SceneViewer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SceneViewer", function() { return _src_Components_Viewer_SceneViewer__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _src_Components_Select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./src/Components/Select */ "./src/Components/Select.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Select", function() { return _src_Components_Select__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _src_Components_Snackbar_Snackbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./src/Components/Snackbar/Snackbar */ "./src/Components/Snackbar/Snackbar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "snackbar", function() { return _src_Components_Snackbar_Snackbar__WEBPACK_IMPORTED_MODULE_15__["snackbar"]; });

/* harmony import */ var _src_styles_Themes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./src/styles/Themes */ "./src/styles/Themes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Themes", function() { return _src_styles_Themes__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _src_styles_Style__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./src/styles/Style */ "./src/styles/Style.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return _src_styles_Style__WEBPACK_IMPORTED_MODULE_17__["default"]; });





















/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/Components/Snackbar/Snackbar.css":
/*!************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/Components/Snackbar/Snackbar.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body.react-confirm-alert-body-element {\n  overflow: hidden;\n}\n\n.react-confirm-alert-blur {\n  filter: url(#gaussian-blur);\n  filter: blur(2px);\n  -webkit-filter: blur(2px);\n}\n\n.react-confirm-alert-overlay {\n  position: fixed;\n  top: calc(100vh - 300px);\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flex;\n  display: -o-flex;\n  display: flex;\n  justify-content: flex-start;\n  -ms-align-items: center;\n  align-items: flex-end;\n  opacity: 1;\n}\n\n.react-confirm-alert-body {\n  width: 400px;\n  padding: 30px;\n}\n\n.react-confirm-alert-svg {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.react-confirm-alert-body > h1 {\n  margin-top: 0;\n}\n\n.react-confirm-alert-body > h3 {\n  margin: 0;\n  font-size: 16px;\n}\n\n.react-confirm-alert-button-group {\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flex;\n  display: -o-flex;\n  display: flex;\n  justify-content: flex-start;\n  margin-top: 20px;\n}\n\n.react-confirm-alert-button-group > button {\n  outline: none;\n  background: #333;\n  border: none;\n  display: inline-block;\n  padding: 6px 18px;\n  color: #eee;\n  margin-right: 10px;\n  border-radius: 5px;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.icon-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.icon-container:hover {\n  cursor: pointer;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/Components/Breadcrumb.js":
/*!**************************************!*\
  !*** ./src/Components/Breadcrumb.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Breadcrumbs */ "@material-ui/core/Breadcrumbs");
/* harmony import */ var _material_ui_core_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/NavigateNext */ "@material-ui/icons/NavigateNext");
/* harmony import */ var _material_ui_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);






var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(function (theme) {
  return {
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2)
      }
    },
    link: {
      fontSize: "24px",
      fontWeight: 800,
      fontFamily: "Avenir",
      "&:hover": {
        cursor: "pointer",
        textDecoration: "underline"
      }
    },
    lastLabel: {
      fontSize: "24px",
      fontWeight: 800,
      fontFamily: "Avenir"
    }
  };
});

var Breadcrumb = function Breadcrumb(props) {
  var classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Breadcrumbs__WEBPACK_IMPORTED_MODULE_2___default.a, {
    separator: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_3___default.a, {
      fontSize: "small"
    }),
    "aria-label": "breadcrumb",
    style: props.style
  }, props.pathList.map(function (element, index) {
    if (props.pathList.length - 1 !== index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
        key: index,
        color: "primary",
        variant: "inherit",
        className: classes.link,
        onClick: element["function"]
      }, element.label);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
    color: "textPrimary",
    className: classes.lastLabel
  }, props.pathList[props.pathList.length - 1].label)));
};

Breadcrumb.propTypes = {
  pathList: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
Breadcrumb.defaultProps = {
  pathList: [{
    label: "Mov.ai",
    "function": function _function() {
      return console.log("pth1/");
    }
  }, {
    label: "User",
    "function": function _function() {
      return console.log("path1/path2");
    }
  }, {
    label: "John Doe"
  }]
};
/* harmony default export */ __webpack_exports__["default"] = (Breadcrumb);

/***/ }),

/***/ "./src/Components/Button.js":
/*!**********************************!*\
  !*** ./src/Components/Button.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




var Button = function Button(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: props.className,
    style: props.style,
    onClick: props.onClick,
    color: props.color,
    variant: props.variant,
    size: props.size,
    startIcon: props.startIcon,
    disabled: props.disabled
  }, props.children);
};

Button.propTypes = {
  style: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  color: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  variant: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  size: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  startIcon: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.element,
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
};
Button.defaultProps = {
  style: {},
  onClick: function onClick() {
    return console.log("Click MOV.AI button");
  },
  color: "default",
  // default, inherit, primary or secondary
  variant: "contained",
  // text, outlined, contained
  size: "medium",
  // small, medium, large
  startIcon: undefined,
  children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null),
  disabled: false
};
/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/Components/Collapse.js":
/*!************************************!*\
  !*** ./src/Components/Collapse.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "@babel/runtime/helpers/esm/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/ChevronRight */ "@material-ui/icons/ChevronRight");
/* harmony import */ var _material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "@material-ui/icons/ExpandMore");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Collapse */ "@material-ui/core/Collapse");
/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








var Collapse = function Collapse(props) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(props.open),
      _React$useState2 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {
    if (props.open !== open) {
      setOpen(props.open);
    }
  }, [props.open]);

  var handleClickFactory = function handleClickFactory(clickLambda) {
    return function () {
      setOpen(!open);
      clickLambda();
    };
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["List"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["ListItem"], {
    button: true,
    onClick: handleClickFactory(props.onClick)
  }, open ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_4___default.a, {
    style: _objectSpread({}, props.iconStyle)
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_3___default.a, {
    style: _objectSpread({}, props.iconStyle)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      width: "100%"
    }
  }, props.item)), props.divided ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Divider"], null) : [], /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6___default.a, {
    className: props.className,
    style: props.style,
    "in": open
  }, props.children));
};

Collapse.propTypes = {
  item: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,
  open: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,
  divided: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,
  iconStyle: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object
};
Collapse.defaultProps = {
  item: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null),
  onClick: function onClick() {},
  open: false,
  divided: false,
  style: {},
  iconStyle: {}
};
/* harmony default export */ __webpack_exports__["default"] = (Collapse);

/***/ }),

/***/ "./src/Components/ContextMenu.js":
/*!***************************************!*\
  !*** ./src/Components/ContextMenu.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "@babel/runtime/helpers/esm/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Menu */ "@material-ui/core/Menu");
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4__);






var ContextMenu = function ContextMenu(props) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(null),
      _React$useState2 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.cloneElement(props.element, {
    onClick: function onClick(evt) {
      if (props.element.props.onClick !== undefined) {
        props.element.props.onClick(); // If user defined a onClick
      }

      handleClick(evt); // opens the contextMenu
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "simple-menu",
    anchorEl: anchorEl,
    keepMounted: true,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, props.menuList.reduce(function (result, item, index) {
    console.log("item", item);

    if (item && typeof item !== "function") {
      result.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4___default.a, {
        onClick: function onClick() {
          item.onClick();

          if (item.onClose || item.onClose === undefined) {
            handleClose();
          }
        },
        key: index
      }, item.element));
    }

    return result;
  }, [])));
};

ContextMenu.propTypes = {
  element: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,
  navigationList: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  lowerElement: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  backgroundColor: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
ContextMenu.defaultProps = {
  element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "Ahaha"),
  menuList: [{
    onClick: function onClick() {
      return console.log("clicked 1");
    },
    element: "Profile",
    onClose: true
  }],
  lowerElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null),
  width: "68px",
  backgroundColor: "#424242"
};
/* harmony default export */ __webpack_exports__["default"] = (ContextMenu);

/***/ }),

/***/ "./src/Components/Drawer.js":
/*!**********************************!*\
  !*** ./src/Components/Drawer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Drawer */ "@material-ui/core/Drawer");
/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_2__);




var Drawer = function Drawer(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_2___default.a, {
    style: props.style,
    anchor: props.anchor,
    open: props.open,
    onClose: props.onClose
  }, props.children);
};

Drawer.propTypes = {
  style: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  anchor: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
Drawer.defaultProps = {
  style: {},
  anchor: "left",
  open: false,
  children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null)
};
Drawer.ANCHOR = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom"
};
/* harmony default export */ __webpack_exports__["default"] = (Drawer);

/***/ }),

/***/ "./src/Components/Modal/AbstractModal.js":
/*!***********************************************!*\
  !*** ./src/Components/Modal/AbstractModal.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Button */ "./src/Components/Button.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var style = {
  margin: "auto",
  position: "absolute",
  overflow: "auto",
  display: "flex",
  flexDirection: "column"
};

var AbstractModal = function AbstractModal(props) {
  var onKeyPress = function onKeyPress(e) {
    if (e.key === "Enter") {
      submit();
    }
  };

  var submit = function submit() {
    props.onSubmit();
  };

  var cancel = function cancel() {
    props.onCancel();
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
    onKeyPress: onKeyPress,
    open: props.open,
    onClose: cancel,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Card"], {
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: props.width,
      height: props.height,
      minWidth: "260px",
      minHeight: "280px"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["CardContent"], {
    style: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
    variant: "h5",
    style: {
      padding: "12px 0px 12px 6px",
      fontWeight: 600
    }
  }, props.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      paddingLeft: "6px",
      flexGrow: 1,
      overflow: "auto",
      minHeight: 0
    }
  }, props.children)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Divider"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["CardActions"], {
    style: {
      alignSelf: "flex-end"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: cancel,
    variant: "outlined",
    color: props.cancelColor
  }, props.cancelText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: props.submitColor,
    onClick: submit
  }, props.submitText))));
};

AbstractModal.propTypes = {
  onSubmit: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  onCancel: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  open: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  submitText: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  submitColor: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  cancelText: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  cancelColor: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  height: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
AbstractModal.defaultProps = {
  onSubmit: function onSubmit() {},
  onCancel: function onCancel() {},
  open: false,
  title: "New",
  submitText: "Confirm",
  submitColor: "primary",
  cancelText: "Cancel",
  cancelColor: "inherit",
  width: "25%",
  height: "25%"
};
/* harmony default export */ __webpack_exports__["default"] = (AbstractModal);

/***/ }),

/***/ "./src/Components/Modal/ConfirmAlertModal.js":
/*!***************************************************!*\
  !*** ./src/Components/Modal/ConfirmAlertModal.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AbstractModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractModal */ "./src/Components/Modal/AbstractModal.js");




var ConfirmAlertModal = function ConfirmAlertModal(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AbstractModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onSubmit: props.onSubmit,
    onCancel: props.onCancel,
    open: props.open,
    title: props.title,
    submitText: props.submitText,
    submitColor: props.submitColor,
    cancelText: props.cancelText,
    cancelColor: props.cancelColor
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, props.message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, props.children));
};

ConfirmAlertModal.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onSubmit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onCancel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  submitText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  submitColor: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  cancelText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  cancelColor: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
ConfirmAlertModal.defaultProps = {
  title: "Insert Text here",
  message: "Are you sure?",
  onSubmit: function onSubmit() {},
  onCancel: function onCancel() {},
  open: false,
  submitText: "Delete",
  submitColor: "secondary",
  cancelText: "Cancel",
  cancelColor: "primary"
};
/* harmony default export */ __webpack_exports__["default"] = (ConfirmAlertModal);

/***/ }),

/***/ "./src/Components/SearchInput.js":
/*!***************************************!*\
  !*** ./src/Components/SearchInput.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/InputBase */ "@material-ui/core/InputBase");
/* harmony import */ var _material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Search */ "@material-ui/icons/Search");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }







var styles = function styles(theme) {
  return {
    search: _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["fade"])(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["fade"])(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%"
    }, theme.breakpoints.up("sm"), {
      marginLeft: theme.spacing(3),
      width: "auto"
    }),
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%"
    }, theme.breakpoints.up("md"), {
      width: 200
    })
  };
};

var SearchInput = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SearchInput, _Component);

  var _super = _createSuper(SearchInput);

  function SearchInput() {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SearchInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "searchInput", undefined);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "timer", undefined);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "handleChange", function (evt) {
      _this.searchInput = evt.target.value;

      if (_this.props.enableTimeout) {
        if (_this.timer) {
          clearTimeout(_this.timer);
        }

        _this.timer = setTimeout(_this.handleSearch, _this.props.time);
      } else {
        _this.handleSearch();
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "handleSearch", function () {
      if (_this.searchInput !== undefined) _this.props.onChange(_this.searchInput);
    });

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SearchInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          style = _this$props.style,
          placeholder = _this$props.placeholder;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classes.search,
        style: style
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classes.searchIcon
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_10___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_9___default.a, {
        ref: this.setSearchInput,
        placeholder: placeholder,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        inputProps: {
          "aria-label": "search"
        },
        onChange: this.handleChange
      }));
    }
  }]);

  return SearchInput;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

SearchInput.propTypes = {
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,
  time: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.number,
  enableTimeout: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,
  style: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.object
};
SearchInput.defaultProps = {
  placeholder: "Search...",
  onChange: function onChange(input) {
    console.log(input);
  },
  time: 250,
  enableTimeout: true,
  style: {}
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(styles, {
  withTheme: true
})(SearchInput));

/***/ }),

/***/ "./src/Components/Select.js":
/*!**********************************!*\
  !*** ./src/Components/Select.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "@material-ui/core/InputLabel");
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/FormControl */ "@material-ui/core/FormControl");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Select */ "@material-ui/core/Select");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);







var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(function (theme) {
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  };
});

var Select = function Select(props) {
  var classes = useStyles();
  var noneOption = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null);

  if (props.noneOption) {
    noneOption = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3___default.a, {
      value: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "None"));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: props.variant,
    className: classes.formControl,
    style: props.style,
    hiddenLabel: props.label === undefined ? true : false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "movai-react-select"
  }, props.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5___default.a, {
    labelId: "movai-react-select",
    id: props.id,
    value: props.value,
    onChange: props.onChange,
    inputProps: props.inputProps
  }, noneOption, props.options.map(function (element, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_3___default.a, {
      key: index,
      value: element
    }, element);
  })));
};

Select.propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  options: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.array,
  noneOption: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  label: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  variant: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  style: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,
  id: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  inputProps: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object
};
Select.defaultProps = {
  value: "option2",
  options: ["option1", "option2", "option3"],
  variant: "filled",
  noneOption: true,
  onChange: function onChange(evt) {
    return console.log(evt.target.value);
  },
  id: "movai-react-select"
};
/* harmony default export */ __webpack_exports__["default"] = (Select);

/***/ }),

/***/ "./src/Components/Snackbar/Alert/Alert.js":
/*!************************************************!*\
  !*** ./src/Components/Snackbar/Alert/Alert.js ***!
  \************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "@babel/runtime/helpers/esm/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "clsx");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/utils */ "@material-ui/core/utils");
/* harmony import */ var _material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./svg-icons/svgIcons */ "./src/Components/Snackbar/Alert/svg-icons/svgIcons.js");









var styles = function styles() {
  return {
    /* Styles applied to the root element. */
    root: {
      // borderRadius: theme.shape.borderRadius,
      backgroundColor: "transparent",
      display: "flex",
      padding: "6px 16px"
    },

    /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
    filledSuccess: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#4caf50"
    },

    /* Styles applied to the root element if `variant="filled"` and `color="info"`. */
    filledInfo: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#2196f3"
    },

    /* Styles applied to the root element if `variant="filled"` and `color="warning"`. */
    filledWarning: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#ff9800"
    },

    /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
    filledError: {
      color: "#fff",
      // fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "#f44336"
    },

    /* Styles applied to the icon wrapper element. */
    icon: {
      marginRight: 12,
      padding: "7px 0",
      display: "flex",
      fontSize: 22,
      opacity: 0.9
    },

    /* Styles applied to the message wrapper element. */
    message: {
      padding: "8px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },

    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      paddingLeft: 16,
      marginRight: -8
    }
  };
};
var defaultIconMapping = {
  success: _svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_8__["svgIcons"].SuccessOutlined,
  warning: _svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_8__["svgIcons"].ReportProblemOutlined,
  error: _svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_8__["svgIcons"].ErrorOutline,
  info: _svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_8__["svgIcons"].InfoOutlined
};

var Alert = function Alert(props) {
  var action = props.action,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$closeText = props.closeText,
      closeText = _props$closeText === void 0 ? "Close" : _props$closeText,
      color = props.color,
      icon = props.icon,
      _props$iconMapping = props.iconMapping,
      iconMapping = _props$iconMapping === void 0 ? defaultIconMapping : _props$iconMapping,
      onClose = props.onClose,
      _props$role = props.role,
      role = _props$role === void 0 ? "alert" : _props$role,
      _props$severity = props.severity,
      severity = _props$severity === void 0 ? "success" : _props$severity,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? "standard" : _props$variant,
      theme = props.theme,
      other = _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, ["action", "children", "classes", "className", "closeText", "color", "icon", "iconMapping", "onClose", "role", "severity", "variant", "theme"]);

  console.log("action", action);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()(classes.root, classes["".concat(variant).concat(Object(_material_ui_core_utils__WEBPACK_IMPORTED_MODULE_7__["capitalize"])(color || severity))], className)
  }, other), icon !== false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.icon
  }, icon || iconMapping[severity] || defaultIconMapping[severity]) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.message
  }, children), action != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.action
  }, action) : null, action == null && onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: classes.action
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6___default.a, {
    size: "small",
    "aria-label": closeText,
    title: closeText,
    color: "inherit",
    onClick: onClose
  }, _svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_8__["svgIcons"].Close)) : null);
};

Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * The content of the component.
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(["error", "info", "success", "warning"]),

  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    error: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,
    info: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,
    success: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,
    warning: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node
  }),

  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /**
   * The ARIA role attribute of the element.
   */
  role: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(["error", "info", "success", "warning"]),

  /**
   * The variant to use.
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(["filled", "outlined", "standard"])
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles, {
  name: "MuiAlert"
})(Alert));

/***/ }),

/***/ "./src/Components/Snackbar/Alert/svg-icons/CreateSVGIcon.js":
/*!******************************************************************!*\
  !*** ./src/Components/Snackbar/Alert/svg-icons/CreateSVGIcon.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// import * as React from "react";
// import SvgIcon from "@material-ui/core/SvgIcon";
// export default function createSvgIcon({
//   path = "",
//   style = {},
//   fill = "#fff",
//   width = "100%",
//   className = "",
//   height = "100%",
//   viewBox = "0 0 32 32"
// }) {
//   return (
//     <svg
//       width={width}
//       style={style}
//       height={height}
//       viewBox={viewBox}
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//     >
//       <path d={path} fill={fill} />
//     </svg>
//   );
// }
// export default function createSvgIcon(path, displayName) {
//   const Component = React.memo(
//     React.forwardRef((props, ref) => (
//       <SvgIcon data-mui-test={`${displayName}Icon`} ref={ref} {...props}>
//         {path}
//       </SvgIcon>
//       <SvgIcon>
//         {path}
//       </SvgIcon>
//     ))
//   );
//   if (process.env.NODE_ENV !== "production") {
//     Component.displayName = `${displayName}Icon`;
//   }
//   Component.muiName = SvgIcon.muiName;
//   return Component;
// }


var CreateSVGIcon = function CreateSVGIcon(_ref) {
  var _ref$path = _ref.path,
      path = _ref$path === void 0 ? "" : _ref$path,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? "#fff" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? "100%" : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? "100%" : _ref$height,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === void 0 ? "0 0 24 24" : _ref$viewBox;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    width: width,
    style: style,
    height: height,
    viewBox: viewBox,
    xmlns: "http://www.w3.org/2000/svg",
    className: "svg-icon ".concat(className || ""),
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    fill: fill,
    d: path
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (CreateSVGIcon);

/***/ }),

/***/ "./src/Components/Snackbar/Alert/svg-icons/svgIcons.js":
/*!*************************************************************!*\
  !*** ./src/Components/Snackbar/Alert/svg-icons/svgIcons.js ***!
  \*************************************************************/
/*! exports provided: svgIcons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgIcons", function() { return svgIcons; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CreateSVGIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateSVGIcon */ "./src/Components/Snackbar/Alert/svg-icons/CreateSVGIcon.js");


var svgIcons = {
  Close: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateSVGIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    width: 24,
    path: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  }),
  ErrorOutline: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateSVGIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    width: 24,
    path: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }),
  InfoOutlined: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateSVGIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    width: 24,
    path: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
  }),
  ReportProblemOutlined: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateSVGIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    width: 24,
    path: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
  }),
  SuccessOutlined: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateSVGIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
    width: 24,
    path: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
  })
};

/***/ }),

/***/ "./src/Components/Snackbar/Snackbar.css":
/*!**********************************************!*\
  !*** ./src/Components/Snackbar/Snackbar.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./Snackbar.css */ "./node_modules/css-loader/dist/cjs.js!./src/Components/Snackbar/Snackbar.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/Components/Snackbar/Snackbar.js":
/*!*********************************************!*\
  !*** ./src/Components/Snackbar/Snackbar.js ***!
  \*********************************************/
/*! exports provided: snackbar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snackbar", function() { return snackbar; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Alert_Alert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Alert/Alert */ "./src/Components/Snackbar/Alert/Alert.js");
/* harmony import */ var _Snackbar_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Snackbar.css */ "./src/Components/Snackbar/Snackbar.css");
/* harmony import */ var _Snackbar_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_Snackbar_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _Alert_svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Alert/svg-icons/svgIcons */ "./src/Components/Snackbar/Alert/svg-icons/svgIcons.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// Inspired from https://github.com/GA-MO/react-confirm-alert


 // import { Alert } from "@material-ui/lab";





var ReactConfirmAlert = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ReactConfirmAlert, _Component);

  var _super = _createSuper(ReactConfirmAlert);

  function ReactConfirmAlert() {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ReactConfirmAlert);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "autoClose", null);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "handleClickButton", function (button) {
      if (button.onClick) button.onClick();

      _this.close();
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "handleClickOverlay", function (e) {
      var _this$props = _this.props,
          closeOnClickOutside = _this$props.closeOnClickOutside,
          onClickOutside = _this$props.onClickOutside;
      var isClickOutside = e.target === _this.overlay;

      if (closeOnClickOutside && isClickOutside) {
        onClickOutside();

        _this.close();
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "close", function () {
      removeBodyClass();
      removeElementReconfirm();
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "keyboardClose", function (event) {
      var _this$props2 = _this.props,
          closeOnEscape = _this$props2.closeOnEscape,
          onKeypressEscape = _this$props2.onKeypressEscape;
      var isKeyCodeEscape = event.keyCode === 27;

      if (closeOnEscape && isKeyCodeEscape) {
        onKeypressEscape(event);

        _this.close();
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "componentDidMount", function () {
      document.addEventListener("keydown", _this.keyboardClose, false);
      _this.autoClose = setTimeout(function () {
        if (document.getElementById("react-confirm-alert") || document.getElementById("react-confirm-alert-body-element")) {
          _this.close();
        }
      }, _this.props.autoHideDuration);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "componentWillUnmount", function () {
      document.removeEventListener("keydown", _this.keyboardClose, false);
      clearTimeout(_this.autoClose);

      _this.props.willUnmount();
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "renderCustomUI", function () {
      var _this$props3 = _this.props,
          title = _this$props3.title,
          message = _this$props3.message,
          customUI = _this$props3.customUI;
      var dataCustomUI = {
        title: title,
        message: message,
        onClose: _this.close
      };
      return customUI(dataCustomUI);
    });

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ReactConfirmAlert, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          message = _this$props4.message,
          customUI = _this$props4.customUI,
          severity = _this$props4.severity,
          closeText = _this$props4.closeText,
          closable = _this$props4.closable,
          theme = _this$props4.theme;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "react-confirm-alert-overlay",
        ref: function ref(dom) {
          return _this2.overlay = dom;
        },
        onClick: this.handleClickOverlay
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "react-confirm-alert"
      }, customUI ? this.renderCustomUI() : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "react-confirm-alert-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Alert_Alert__WEBPACK_IMPORTED_MODULE_11__["default"], {
        theme: theme,
        elevation: 6,
        variant: "filled",
        severity: severity,
        closeText: closeText,
        action: closable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          className: "icon-container",
          onClick: function onClick() {
            return _this2.close();
          }
        }, _Alert_svg_icons_svgIcons__WEBPACK_IMPORTED_MODULE_13__["svgIcons"].Close) : undefined
      }, message))));
    }
  }]);

  return ReactConfirmAlert;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(ReactConfirmAlert, "propTypes", {
  message: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  customUI: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  closeOnClickOutside: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  closeOnEscape: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  willUnmount: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  onClickOutside: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  onKeypressEscape: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  // new props
  severity: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  closeText: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  autoHideDuration: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.number,
  closable: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(ReactConfirmAlert, "defaultProps", {
  closeOnClickOutside: true,
  closeOnEscape: true,
  willUnmount: function willUnmount() {
    return null;
  },
  onClickOutside: function onClickOutside() {
    return null;
  },
  onKeypressEscape: function onKeypressEscape() {
    return null;
  },
  // new props
  severity: "info",
  // error, warning, info or success
  closeText: "Close",
  autoHideDuration: 6000,
  closable: true
});

function createElementReconfirm(properties, theme) {
  var divTarget = document.getElementById("react-confirm-alert");

  if (divTarget) {
    // Rerender - the mounted ReactConfirmAlert
    Object(react_dom__WEBPACK_IMPORTED_MODULE_10__["render"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ReactConfirmAlert, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, properties, {
      theme: theme
    })), divTarget);
  } else {
    // Mount the ReactConfirmAlert component
    document.body.children[0].classList.add("react-confirm-alert-blur");
    divTarget = document.createElement("div");
    divTarget.id = "react-confirm-alert";
    document.body.appendChild(divTarget);
    Object(react_dom__WEBPACK_IMPORTED_MODULE_10__["render"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(ReactConfirmAlert, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, properties, {
      theme: theme
    })), divTarget);
  }
}

function removeElementReconfirm() {
  var target = document.getElementById("react-confirm-alert");
  Object(react_dom__WEBPACK_IMPORTED_MODULE_10__["unmountComponentAtNode"])(target);
  target.parentNode.removeChild(target);
}

function addBodyClass() {
  document.body.classList.add("react-confirm-alert-body-element");
}

function removeBodyClass() {
  document.body.classList.remove("react-confirm-alert-body-element");
}

function snackbar(properties, theme) {
  addBodyClass();
  createElementReconfirm(properties, theme);
}
/* harmony default export */ __webpack_exports__["default"] = (ReactConfirmAlert);

/***/ }),

/***/ "./src/Components/Table.js":
/*!*********************************!*\
  !*** ./src/Components/Table.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! material-table */ "material-table");
/* harmony import */ var material_table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(material_table__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_AddBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/AddBox */ "@material-ui/icons/AddBox");
/* harmony import */ var _material_ui_icons_AddBox__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AddBox__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_ArrowDownward__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/ArrowDownward */ "@material-ui/icons/ArrowDownward");
/* harmony import */ var _material_ui_icons_ArrowDownward__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ArrowDownward__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Check */ "@material-ui/icons/Check");
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/ChevronLeft */ "@material-ui/icons/ChevronLeft");
/* harmony import */ var _material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/ChevronRight */ "@material-ui/icons/ChevronRight");
/* harmony import */ var _material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/Clear */ "@material-ui/icons/Clear");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_DeleteOutline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/DeleteOutline */ "@material-ui/icons/DeleteOutline");
/* harmony import */ var _material_ui_icons_DeleteOutline__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DeleteOutline__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Edit */ "@material-ui/icons/Edit");
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_FilterList__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/FilterList */ "@material-ui/icons/FilterList");
/* harmony import */ var _material_ui_icons_FilterList__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_FilterList__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_FirstPage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/FirstPage */ "@material-ui/icons/FirstPage");
/* harmony import */ var _material_ui_icons_FirstPage__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_FirstPage__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_icons_LastPage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/LastPage */ "@material-ui/icons/LastPage");
/* harmony import */ var _material_ui_icons_LastPage__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LastPage__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/Remove */ "@material-ui/icons/Remove");
/* harmony import */ var _material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_SaveAlt__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/SaveAlt */ "@material-ui/icons/SaveAlt");
/* harmony import */ var _material_ui_icons_SaveAlt__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_SaveAlt__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/Search */ "@material-ui/icons/Search");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_icons_ViewColumn__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/ViewColumn */ "@material-ui/icons/ViewColumn");
/* harmony import */ var _material_ui_icons_ViewColumn__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ViewColumn__WEBPACK_IMPORTED_MODULE_18__);




















var tableIcons = {
  Add: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_AddBox__WEBPACK_IMPORTED_MODULE_4___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  Check: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_6___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  Clear: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_9___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  Delete: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_DeleteOutline__WEBPACK_IMPORTED_MODULE_10___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  DetailPanel: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_8___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  Edit: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_11___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  Export: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_SaveAlt__WEBPACK_IMPORTED_MODULE_16___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  Filter: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_FilterList__WEBPACK_IMPORTED_MODULE_12___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  FirstPage: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_FirstPage__WEBPACK_IMPORTED_MODULE_13___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  LastPage: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_LastPage__WEBPACK_IMPORTED_MODULE_14___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  NextPage: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_8___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  PreviousPage: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_7___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  ResetSearch: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_9___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  Search: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_17___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  SortArrow: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ArrowDownward__WEBPACK_IMPORTED_MODULE_5___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  ThirdStateCheck: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Remove__WEBPACK_IMPORTED_MODULE_15___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  }),
  ViewColumn: /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ViewColumn__WEBPACK_IMPORTED_MODULE_18___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      ref: ref
    }));
  })
}; // More information in: https://material-table.com/#/docs/all-props

var Table = function Table(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(material_table__WEBPACK_IMPORTED_MODULE_3___default.a, {
    style: props.style,
    title: props.title,
    columns: props.columns,
    data: props.data,
    icons: tableIcons,
    actions: props.actions,
    options: props.options,
    components: props.components,
    localization: props.localization
  });
};

Table.propTypes = {
  style: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  columns: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  data: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  actions: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  options: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  components: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  localization: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
};
Table.defaultProps = {
  style: {},
  title: "",
  columns: [],
  data: [],
  actions: [],
  options: {
    actionsColumnIndex: -1,
    draggable: false,
    grouping: false,
    search: false,
    toolbar: false,
    searchFieldAlignment: "left",
    paging: false
  },
  components: {}
};
/* harmony default export */ __webpack_exports__["default"] = (Table);

/***/ }),

/***/ "./src/Components/Tabs.js":
/*!********************************!*\
  !*** ./src/Components/Tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tabs; });
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "@babel/runtime/helpers/esm/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "@babel/runtime/helpers/esm/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Tabs */ "@material-ui/core/Tabs");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tab */ "@material-ui/core/Tab");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);










function TabPanel(props) {
  var children = props.children,
      selectedTab = props.selectedTab,
      index = props.index,
      other = _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(props, ["children", "selectedTab", "index"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1___default()({
    component: "div",
    role: "tabpanel",
    hidden: selectedTab !== index,
    id: "tabpanel-".concat(index),
    "aria-labelledby": "tab-".concat(index)
  }, other), selectedTab === index && children);
}

TabPanel.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,
  index: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any.isRequired,
  selectedTab: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any.isRequired
};

function a11yProps(index) {
  return {
    id: "tab-".concat(index),
    "aria-controls": "tabpanel-".concat(index)
  };
}

var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["makeStyles"])(function (theme) {
  return {
    root: {
      flexGrow: 1,
      height: "100%"
    },
    tabPanel: {
      flexGrow: 1,
      minHeight: 0,
      height: "calc(100% - 48px)",
      overflowY: "auto"
    }
  };
});
function Tabs(props) {
  var classes = useStyles();

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(props.selectedTab),
      _React$useState2 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),
      selectedTab = _React$useState2[0],
      setSelectedTab = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_3___default.a.useEffect(function () {
    if (props.selectedTab !== selectedTab) {
      setSelectedTab(props.selectedTab);
    }
  }, [props.selectedTab]);

  var handleChange = function handleChange(event, newSelectedTab) {
    setSelectedTab(newSelectedTab);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_6___default.a, {
    value: selectedTab,
    onChange: handleChange,
    indicatorColor: "primary",
    textColor: "primary"
  }, props.tabList.map(function (tab, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_7___default.a, _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      key: index,
      label: tab.label
    }, a11yProps(index)));
  })), props.tabList.map(function (tab, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(TabPanel, {
      key: index,
      selectedTab: selectedTab,
      index: index,
      className: props.scrollable ? classes.tabPanel : undefined
    }, tab.component);
  }));
}
Tabs.propTypes = {
  tabList: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array,
  selectedTab: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,
  scrollable: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
};
Tabs.defaultProps = {
  tabList: [{
    label: "Tab 1",
    component: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, "Component 1")
  }, {
    label: "Tab 2",
    component: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
  }, {
    label: "Tab 3",
    component: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, "Component 3")
  }],
  selectedTab: 0,
  scrollable: true
};

/***/ }),

/***/ "./src/Components/Text.js":
/*!********************************!*\
  !*** ./src/Components/Text.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




var Text = function Text(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_1___default.a, props);
};

Text.propTypes = {};
Text.defaultProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Text);

/***/ }),

/***/ "./src/Components/Toggle.js":
/*!**********************************!*\
  !*** ./src/Components/Toggle.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "@material-ui/core/FormControlLabel");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Switch */ "@material-ui/core/Switch");
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/colors */ "@material-ui/core/colors");
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["makeStyles"])(function (theme) {
  return {
    label: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      marginLeft: 0,
      marginRight: 0
    }
  };
});

var Toggle = function Toggle(props) {
  var classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_2___default.a, {
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_3___default.a, {
      checked: props.toggle,
      onChange: props.onToggle,
      color: props.color,
      disabled: props.disabled,
      hidden: props.hidden
    }),
    labelPlacement: props.labelPlacement,
    label: props.label,
    classes: {
      label: classes.label
    },
    style: _objectSpread(_objectSpread({}, props.style), {}, {
      marginLeft: 0,
      marginRight: 0
    })
  });
};

Toggle.propTypes = {
  toggle: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
  onToggle: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,
  label: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  color: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  labelPlacement: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  // 'end', 'start', 'top', 'bottom'
  style: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object
};
Toggle.defaultProps = {
  color: "primary" // or secondary

};
/* harmony default export */ __webpack_exports__["default"] = (Toggle);

/***/ }),

/***/ "./src/Components/VerticalBar.js":
/*!***************************************!*\
  !*** ./src/Components/VerticalBar.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);



var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(function (theme) {
  return {
    container: {
      height: "100%",
      backgroundColor: function backgroundColor(props) {
        return props.backgroundColor;
      },
      width: function width(props) {
        return props.width;
      },
      display: "flex",
      flexDirection: "column"
    },
    logoArea: {
      padding: "17px",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center"
    },
    navigationArea: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      //justifyContent: "center",
      alignItems: "center"
    },
    accountArea: {
      padding: "17px",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center"
    }
  };
});

var VerticalBar = function VerticalBar(props) {
  var classes = useStyles(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.container
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.logoArea
  }, props.upperElement), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.navigationArea
  }, props.navigationList.map(function (element, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: index,
      style: {
        padding: "15px 0px"
      }
    }, element);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.accountArea
  }, props.lowerElement));
};

VerticalBar.propTypes = {
  upperElement: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,
  navigationList: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  lowerElement: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  backgroundColor: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
VerticalBar.defaultProps = {
  upperElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null),
  navigationList: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null)],
  lowerElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null),
  width: "68px",
  backgroundColor: "#424242"
};
/* harmony default export */ __webpack_exports__["default"] = (VerticalBar);

/***/ }),

/***/ "./src/Components/Viewer/Actions/Action.js":
/*!*************************************************!*\
  !*** ./src/Components/Viewer/Actions/Action.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);



var Action = /*#__PURE__*/function () {
  function Action() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Action);

    this.memory = {};
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Action, [{
    key: "action",
    value: function action(parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        memory.gizmoManager.attachedMesh = null;
        memory.camera.attachControl(memory.canvas, true);
      });
      parentView.highlightNodeInTree && parentView.highlightNodeInTree();
      parentView.highlightNodeInScene && parentView.highlightNodeInScene();
      parentView.closeContextDial && parentView.closeContextDial();
      parentView.setContextActionIndex && parentView.setContextActionIndex();
    }
  }]);

  return Action;
}();

/* harmony default export */ __webpack_exports__["default"] = (Action);

/***/ }),

/***/ "./src/Components/Viewer/Actions/AddKeyPointAction.js":
/*!************************************************************!*\
  !*** ./src/Components/Viewer/Actions/AddKeyPointAction.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _NodeItem_KeyPoint__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../NodeItem/KeyPoint */ "./src/Components/Viewer/NodeItem/KeyPoint.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _MouseKeysAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./MouseKeysAction */ "./src/Components/Viewer/Actions/MouseKeysAction.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_15__);










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var instance = null;
var TEMP_KEY_POINT_NAME = "temp_key_point";

var AddKeyPointAction = /*#__PURE__*/function (_MouseKeysAction) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AddKeyPointAction, _MouseKeysAction);

  var _super = _createSuper(AddKeyPointAction);

  function AddKeyPointAction() {
    var _thisSuper, _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AddKeyPointAction);

    if (instance) return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(_this, instance);
    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "createKeyPoint", function (position, name, scene, parentView) {
      var is2addInServer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_15__["Color3"].Gray();
      var rootMesh = parentView.getRootNode().item.mesh;
      var keyPoint = _NodeItem_KeyPoint__WEBPACK_IMPORTED_MODULE_10__["default"].ofDict(scene, {
        name: name,
        color: [color.r, color.g, color.b]
      });
      var mesh = keyPoint.mesh;
      mesh.parent = rootMesh;
      var localPosition = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].computeLocalCoordinatesFromMesh({
        parent: rootMesh
      }, _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].ofBabylon(position)).toBabylon();
      mesh.setPositionWithLocalVector(localPosition.add(_babylonjs_core__WEBPACK_IMPORTED_MODULE_15__["Axis"].Z.scale(_NodeItem_KeyPoint__WEBPACK_IMPORTED_MODULE_10__["default"].DEFAULT_SIZE)));

      if (is2addInServer) {
        parentView.addNodeItem2Tree(keyPoint, rootMesh.name, is2addInServer);
      }

      return mesh;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(AddKeyPointAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView);

      parentView.setSelectedAction(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerDown", function (evt, parentView) {
      if (evt.button !== 0) {
        return;
      }

      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene,
            ground = memory.ground,
            camera = memory.camera;
        _this.maybeMousePos = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getGroundPosition(scene, ground);

        _this.maybeMousePos.forEach(function (mousePos) {
          camera.detachControl(memory.canvas);
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerMove", function (evt, parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;
        var ground = memory.ground;
        var maybeCurrent = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getGroundPosition(scene, ground);
        maybeCurrent.forEach(function (current) {
          _this.maybeMousePos.forEach(function (oldMousePos) {
            if (_this.tempMesh) _this.tempMesh.dispose();
            _this.tempMesh = _this.createKeyPoint(current, TEMP_KEY_POINT_NAME, scene, parentView, false);
          });
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerUp", function (parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;
        var camera = memory.camera;
        var ground = memory.ground;
        var maybeCurrent = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getGroundPosition(scene, ground);
        maybeCurrent.forEach(function (current) {
          _this.maybeMousePos.forEach(function (oldMousePos) {
            if (_this.tempMesh) _this.tempMesh.dispose();
            var name = "KeyPoint".concat(Math.floor(Math.random() * 1e3));

            _this.createKeyPoint(current, name, scene, parentView, true, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_15__["Color3"](Math.random(), Math.random(), Math.random()));

            parentView.setPropertiesWithName(name);
          });
        });
        _this.maybeMousePos = monet__WEBPACK_IMPORTED_MODULE_12__["Maybe"].none();
        camera.attachControl(memory.canvas, true);
      });
    });

    _this.key = "addKeyPoint";
    _this.name = "Add Key Point [K]";
    _this.maybeMousePos = monet__WEBPACK_IMPORTED_MODULE_12__["Maybe"].none();
    _this.tempMesh = null;

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-map-marker"
      }, props));
    };

    instance = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AddKeyPointAction, null, [{
    key: "getInstance",
    value: function getInstance() {
      return new AddKeyPointAction();
    }
  }]);

  return AddKeyPointAction;
}(_MouseKeysAction__WEBPACK_IMPORTED_MODULE_14__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (AddKeyPointAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/AddMapAction.js":
/*!*******************************************************!*\
  !*** ./src/Components/Viewer/Actions/AddMapAction.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "@babel/runtime/helpers/esm/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Action */ "./src/Components/Viewer/Actions/Action.js");
/* harmony import */ var _NodeItem_Map__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../NodeItem/Map */ "./src/Components/Viewer/NodeItem/Map.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../NodeItem/GlobalRef */ "./src/Components/Viewer/NodeItem/GlobalRef.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../Utils/DefaultScene */ "./src/Components/Viewer/Utils/DefaultScene.js");
/* harmony import */ var _MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../MainView/MainViewActions */ "./src/Components/Viewer/MainView/MainViewActions.js");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var _AssetsManager_MapLoader__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../AssetsManager/MapLoader */ "./src/Components/Viewer/AssetsManager/MapLoader.js");












function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }















var AddMapAction = /*#__PURE__*/function (_Action) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7___default()(AddMapAction, _Action);

  var _super = _createSuper(AddMapAction);

  function AddMapAction(name, mapLoader) {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, AddMapAction);

    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getType", function () {
      return AddMapAction.TYPE;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "deleteAsset", function () {});

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "download", /*#__PURE__*/_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var _yield$_this$mapLoade, textureSrc, yamlSrc, downloadLinks;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.mapLoader.load();

            case 2:
              _yield$_this$mapLoade = _context.sent;
              textureSrc = _yield$_this$mapLoade.textureSrc;
              yamlSrc = _this.mapLoader.yamlSrc;
              downloadLinks = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
                style: {
                  display: "flex",
                  flexDirection: "column"
                }
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
                style: {
                  display: "flex",
                  flexDirection: "row"
                }
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
                style: {
                  marginRight: "5px"
                }
              }, "Image:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("a", {
                href: textureSrc,
                download: true
              }, textureSrc)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
                style: {
                  display: "flex",
                  flexDirection: "row"
                }
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("div", {
                style: {
                  marginRight: "5px"
                }
              }, "Yaml:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("a", {
                href: _AssetsManager_MapLoader__WEBPACK_IMPORTED_MODULE_23__["default"].getMapUrl(yamlSrc),
                download: true
              }, yamlSrc)));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _this.name = name;
    _this.key = "addMap".concat(name);
    _this.mapLoader = mapLoader;

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        className: "fas fa-map"
      }));
    };

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default()(AddMapAction, [{
    key: "addMap",
    value: function addMap(parentView) {
      var _this2 = this;

      var rootNodeMaybe = monet__WEBPACK_IMPORTED_MODULE_15__["Maybe"].fromNull(parentView.getRootNode());
      parentView.getSceneMemory().forEach( /*#__PURE__*/function () {
        var _ref2 = _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(memory) {
          var scene, camera, _yield$_this2$mapLoad, textureSrc, resolution, origin, imageSize, width, height, mesh, originPos, map, is2sendServer;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  scene = memory.scene;
                  camera = memory.camera;
                  _context2.next = 4;
                  return _this2.mapLoader.load();

                case 4:
                  _yield$_this2$mapLoad = _context2.sent;
                  textureSrc = _yield$_this2$mapLoad.textureSrc;
                  resolution = _yield$_this2$mapLoad.resolution;
                  origin = _yield$_this2$mapLoad.origin;
                  imageSize = _yield$_this2$mapLoad.imageSize;
                  width = resolution * imageSize[0];
                  height = resolution * imageSize[1];
                  mesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_11__["default"].groundBuilder(scene).name(monet__WEBPACK_IMPORTED_MODULE_15__["Maybe"].fromNull(_this2.memory["name"]).orSome(_this2.name)).width(width).height(height).textureSrc(textureSrc).build();
                  originPos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].of([-width / 2, -height / 2, 0]).sub(_Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].of(origin));
                  rootNodeMaybe.forEach(function (rootNode) {
                    var parent = rootNode.item.mesh.parent;
                    parent.position = _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_17__["default"].inverseCoordinates(originPos.toBabylon());
                    camera.setTarget(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_18__["Vector3"](parent.position.x, parent.position.y, parent.position.z));
                  });
                  map = new _NodeItem_Map__WEBPACK_IMPORTED_MODULE_14__["default"](mesh, [width, height], _this2.textureSrc, monet__WEBPACK_IMPORTED_MODULE_15__["Maybe"].fromNull(_this2.memory["assetName"]).orSome(_this2.name));
                  is2sendServer = monet__WEBPACK_IMPORTED_MODULE_15__["Maybe"].fromNull(_this2.memory["isImport"]).map(function (x) {
                    return !x;
                  }).orSome(true);
                  parentView.addNodeItem2Tree(map, null, is2sendServer);
                  memory.ground.dispose();
                  memory.ground = _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_19__["default"].createMeshGround(scene, width, height);

                case 19:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "action",
    value: function action(parentView) {
      var _this3 = this;

      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(AddMapAction.prototype), "action", this).call(this, parentView);

      var maybeNode = parentView.getNodeFromTree(this.name);
      maybeNode.forEach(function (node) {});
      maybeNode.orElseRun(function () {
        if (parentView.getObjectTree().length < 2) {
          return _this3.addMap(parentView);
        } else {// empty
        }
      });
      parentView.setSelectedAction(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_20__["ACTIONS"].orbit);
    }
  }]);

  return AddMapAction;
}(_Action__WEBPACK_IMPORTED_MODULE_13__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(AddMapAction, "TYPE", "AddMapAction");

/* harmony default export */ __webpack_exports__["default"] = (AddMapAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/AddMeshAction.js":
/*!********************************************************!*\
  !*** ./src/Components/Viewer/Actions/AddMeshAction.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "@babel/runtime/helpers/esm/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Action */ "./src/Components/Viewer/Actions/Action.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var _MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../MainView/MainViewActions */ "./src/Components/Viewer/MainView/MainViewActions.js");
/* harmony import */ var _Utils_MeshLoader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Utils/MeshLoader */ "./src/Components/Viewer/Utils/MeshLoader.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _NodeItem_Mesh__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../NodeItem/Mesh */ "./src/Components/Viewer/NodeItem/Mesh.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_19__);












function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }











var AddMeshAction = /*#__PURE__*/function (_Action) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7___default()(AddMeshAction, _Action);

  var _super = _createSuper(AddMeshAction);

  function AddMeshAction(_mesh) {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, AddMeshAction);

    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "addMesh", function (parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;

        var actionMemoryClone = _objectSpread({}, _this.memory);

        _Utils_MeshLoader__WEBPACK_IMPORTED_MODULE_16__["default"].of(scene).load(_this.key).then(_this.transformMesh(parentView, scene, actionMemoryClone)).then(_this.addMesh2Scene(parentView, scene, actionMemoryClone));
      });
      _this.memory["isImport"] = false;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "transformMesh", function (parentView, scene, memory) {
      return function (mesh) {
        var parentMesh = _this.getParentMesh(parentView);

        mesh.parent = parentMesh;
        mesh.createNormals();
        var isImport = monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].fromNull(memory["isImport"]).orSome(false);
        var maybeDict = monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].fromNull(memory["nodeItemDict"]);
        mesh.position = maybeDict.flatMap(function (d) {
          return isImport ? monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].some(d.position) : monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].none();
        }).map(_babylonjs_core__WEBPACK_IMPORTED_MODULE_19__["Vector3"].FromArray).orSome(_babylonjs_core__WEBPACK_IMPORTED_MODULE_19__["Vector3"].Zero());
        mesh.rotationQuaternion = maybeDict.flatMap(function (d) {
          return isImport ? monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].some(d.quaternion) : monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].none();
        }).map(function (quaternion) {
          return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_19__["Quaternion"](quaternion[1], quaternion[2], quaternion[3], quaternion[0]);
        }).orSome(_babylonjs_core__WEBPACK_IMPORTED_MODULE_19__["Quaternion"].Identity());
        var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_19__["StandardMaterial"]("Mesh".concat(mesh.name), scene);
        var color = maybeDict.flatMap(function (d) {
          return isImport ? monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].some(d.color) : monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].none();
        }).map(_babylonjs_core__WEBPACK_IMPORTED_MODULE_19__["Color3"].FromArray).orSome(_babylonjs_core__WEBPACK_IMPORTED_MODULE_19__["Color3"].Gray());
        material.diffuseColor = color;
        material.emissiveColor = color;
        mesh.material = material;
        return mesh;
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "addMesh2Scene", function (parentView, scene, memory) {
      return function (mesh) {
        var parentMesh = _this.getParentMesh(parentView);

        var isImport = monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].fromNull(memory["isImport"]).orSome(false);
        var finalName = monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].fromNull(memory["nodeItemDict"]).flatMap(function (d) {
          return isImport ? monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].some(d.name) : monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].none();
        }).orSome("".concat(_this.name).concat(Math.floor(Math.random() * 100)));
        mesh.name = finalName;
        var meshItem = new _NodeItem_Mesh__WEBPACK_IMPORTED_MODULE_18__["default"](mesh, _this.name, monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].fromNull(memory["nodeItemDict"]).flatMap(function (x) {
          return isImport ? monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].some(x.keyValueMap) : monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].none();
        }).orSome({}));
        parentView.addNodeItem2Tree(meshItem, parentMesh.name, !isImport);
        parentView.renderMenus();
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getParentMesh", function (parentView) {
      return monet__WEBPACK_IMPORTED_MODULE_17__["Maybe"].fromNull(_this.memory["parentObj"]).map(function (parentObj) {
        return parentObj.parent;
      }).flatMap(function (parentName) {
        return parentView.getNodeFromTree(parentName);
      }).map(function (treeNode) {
        return treeNode.item.mesh;
      }).orSome(parentView.getRootNode().item.mesh);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getType", function () {
      return AddMeshAction.TYPE;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "deleteAsset", function () {});

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "download", /*#__PURE__*/_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var downloadLinks;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              downloadLinks = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
                style: {
                  display: "flex",
                  flexDirection: "column"
                }
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
                style: {
                  display: "flex",
                  flexDirection: "row"
                }
              }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
                style: {
                  marginRight: "5px"
                }
              }, "Mesh:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("a", {
                href: _Utils_MeshLoader__WEBPACK_IMPORTED_MODULE_16__["default"].getMeshUrl(_this.key),
                download: true
              }, _this.key)));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _this.key = _mesh.id;
    _this.name = _mesh.name;

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        className: "fas fa-draw-polygon"
      }));
    };

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default()(AddMeshAction, [{
    key: "action",
    value: function action(parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(AddMeshAction.prototype), "action", this).call(this, parentView);

      console.log("Mesh ".concat(this.key, " : ").concat(this.name), this.memory);
      this.addMesh(parentView);
      parentView.setSelectedAction(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_15__["ACTIONS"].dragObjects);
    }
  }]);

  return AddMeshAction;
}(_Action__WEBPACK_IMPORTED_MODULE_11__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(AddMeshAction, "TYPE", "AddMeshAction");

/* harmony default export */ __webpack_exports__["default"] = (AddMeshAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/BoxRegionAction.js":
/*!**********************************************************!*\
  !*** ./src/Components/Viewer/Actions/BoxRegionAction.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _MouseKeysAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MouseKeysAction */ "./src/Components/Viewer/Actions/MouseKeysAction.js");
/* harmony import */ var _NodeItem_BoxRegion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../NodeItem/BoxRegion */ "./src/Components/Viewer/NodeItem/BoxRegion.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_15__);










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var BoxRegionAction = /*#__PURE__*/function (_MouseKeysAction) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(BoxRegionAction, _MouseKeysAction);

  var _super = _createSuper(BoxRegionAction);

  function BoxRegionAction() {
    var _thisSuper, _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, BoxRegionAction);

    if (instance) return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(_this, instance);
    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(BoxRegionAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView);

      parentView.setSelectedAction(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerDown", function (evt, parentView) {
      if (!(evt.buttons === 1)) return;
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;
        var ground = memory.ground;
        var camera = memory.camera;
        var maybeMousePos = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_13__["default"].getGroundPosition(scene, ground);
        _this.maybeMousePos = maybeMousePos;
        maybeMousePos.forEach(function (mousePos) {
          camera.detachControl(memory.canvas);
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerMove", function (evt, parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;
        var ground = memory.ground;
        var maybeCurrent = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_13__["default"].getGroundPosition(scene, ground);
        maybeCurrent.forEach(function (current) {
          _this.maybeMousePos.forEach(function (oldMousePos) {
            if (_this.tempMesh) _this.tempMesh.dispose();
            _this.tempMesh = _this.createBoxRegion([oldMousePos, current], TEMP_BOX_REGION_NAME, scene, parentView, false);
          });
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerUp", function (parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;
        var camera = memory.camera;
        var ground = memory.ground;
        var maybeCurrent = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_13__["default"].getGroundPosition(scene, ground);
        maybeCurrent.forEach(function (current) {
          _this.maybeMousePos.forEach(function (oldMousePos) {
            _this.tempMesh.dispose();

            var name = "BoxRegion".concat(Math.floor(Math.random() * 1e3));

            _this.createBoxRegion([oldMousePos, current], name, scene, parentView, true);

            parentView.setPropertiesWithName(name);
          });
        });
        _this.maybeMousePos = monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].none();
        camera.attachControl(memory.canvas, true);
        parentView.renderMenus();
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "createBoxRegion", function (region, name, scene, parentView) {
      var is2addInServer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_15__["Color3"].Red();
      var height = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
      var rootMesh = parentView.getRootNode().item.mesh;
      var localRegion = region.map(function (r) {
        return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_13__["default"].computeLocalCoordinatesFromMesh({
          parent: rootMesh
        }, _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].ofBabylon(r));
      });
      localRegion[1] = localRegion[1].add(_Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].of([0, 0, height]));
      var middlePoint = localRegion[0].add(localRegion[1]).scale(0.5);
      var centeredRegion = localRegion.map(function (r) {
        return r.sub(middlePoint);
      });
      var boxRegionItem = _NodeItem_BoxRegion__WEBPACK_IMPORTED_MODULE_11__["default"].ofDict(scene, {
        name: name,
        position: middlePoint.toArray(),
        color: [color.r, color.g, color.b],
        corners: centeredRegion.map(function (x) {
          return x.toArray();
        })
      }, parentView);
      boxRegionItem.mesh.parent = rootMesh;

      if (is2addInServer) {
        parentView.addNodeItem2Tree(boxRegionItem, rootMesh.name, is2addInServer);
      }

      return boxRegionItem.mesh;
    });

    _this.key = "drawBoxRegion";
    _this.name = "Draw Box Region [B]";
    _this.maybeMousePos = monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].none();
    _this.tempMesh = null;

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-square"
      }, props));
    };

    instance = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(BoxRegionAction, null, [{
    key: "getInstance",
    value: function getInstance() {
      return new BoxRegionAction();
    }
  }]);

  return BoxRegionAction;
}(_MouseKeysAction__WEBPACK_IMPORTED_MODULE_10__["default"]);

var instance = null;
var TEMP_BOX_REGION_NAME = "temp_box_region";
/* harmony default export */ __webpack_exports__["default"] = (BoxRegionAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/DragObjectsAction.js":
/*!************************************************************!*\
  !*** ./src/Components/Viewer/Actions/DragObjectsAction.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _MouseKeysAction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./MouseKeysAction */ "./src/Components/Viewer/Actions/MouseKeysAction.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _Utils_Clipboard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Utils/Clipboard */ "./src/Components/Viewer/Utils/Clipboard.js");










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }










var DragObjectsAction = /*#__PURE__*/function (_MouseKeysAction) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(DragObjectsAction, _MouseKeysAction);

  var _super = _createSuper(DragObjectsAction);

  function DragObjectsAction() {
    var _thisSuper, _thisSuper2, _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DragObjectsAction);

    if (instance) return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(_this, instance);
    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(DragObjectsAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView);

      parentView.setSelectedAction(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerDown", function (evt, parentView) {
      if (!(evt.buttons === 1 || evt.buttons === 2)) return;
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene,
            ground = memory.ground,
            camera = memory.camera,
            canvas = memory.canvas;
        _this.maybeSelectedMesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].pickMesh(scene, ground);

        _this.maybeSelectedMesh.forEach(function (currentMesh) {
          camera.detachControl(canvas);
          _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getGroundPosition(scene, ground).forEach(function (groundPosition) {
            var groundPositionInLocalCoordinates = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].computeLocalCoordinatesFromMesh(currentMesh, _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(groundPosition));
            _this.mousePointInLocal = groundPositionInLocalCoordinates;
            _this.clickPointInLocal = groundPositionInLocalCoordinates;
            _this.shiftFromCenterOfMass = groundPositionInLocalCoordinates.sub(_Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(currentMesh.position));
            currentMesh.onClick ? currentMesh.onClick() : parentView.closeContextDial();

            _this.handleMeshRightClick(evt, parentView, currentMesh);

            parentView.addGizmo(currentMesh.name);
            parentView.highlightNodeInTree(currentMesh.name);
            parentView.highlightMeshInScene([currentMesh]);

            _this.setProperties(parentView, currentMesh.name);
          });
        });

        _this.maybeSelectedMesh.orLazy(function () {
          return parentView.getMouseCoordinatesFromRoot().forEach(function (mousePosRoot) {
            return _this.handleRightClickWithoutMesh(evt, parentView, mousePosRoot);
          });
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "handleMeshRightClick", function (evt, parentView, mesh) {
      if (!(evt.buttons === 2)) return;
      if (!mesh || !mesh.getMouseContextActions) return;
      parentView.setMouseContextActions(evt, mesh.getMouseContextActions(parentView));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "handleRightClickWithoutMesh", function (evt, parentView, mousePosFromRoot) {
      if (!(evt.buttons === 2)) return;
      parentView.setMouseContextActions(evt, [{
        title: "Paste",
        onClick: _this.getPasteOnClick(mousePosFromRoot, parentView)
      }]);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getPasteOnClick", function (mousePosFromRoot, parentView) {
      return function () {
        var pasteAction = _Utils_Clipboard__WEBPACK_IMPORTED_MODULE_16__["default"].paste();

        if (pasteAction && typeof pasteAction === "function") {
          pasteAction(mousePosFromRoot, parentView);
        }
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerMove", function (evt, parentView) {
      if (!(evt.buttons === 1)) return;
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene,
            ground = memory.ground;
        var maybeGroundPosition = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getGroundPosition(scene, ground);
        maybeGroundPosition.forEach(function (current) {
          _this.maybeSelectedMesh.forEach(function (selectedMesh) {
            var currentLocal = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].computeLocalCoordinatesFromMesh(selectedMesh, _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(current));
            var v = currentLocal.sub(_this.shiftFromCenterOfMass);
            selectedMesh.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"](v.getX(), v.getY(), selectedMesh.position.z);

            _this.notifyObservers(selectedMesh, false, currentLocal.sub(_this.mousePointInLocal));

            _this.mousePointInLocal = currentLocal;
          });
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerUp", function (parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var camera = memory.camera,
            scene = memory.scene,
            ground = memory.ground,
            canvas = memory.canvas;

        _this.maybeSelectedMesh.forEach(function (selectedMesh) {
          _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getGroundPosition(scene, ground).forEach(function (groundPos) {
            var groundPosInLocal = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].computeLocalCoordinatesFromMesh(selectedMesh, _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(groundPos));
            var bigDisplacement = groundPosInLocal.sub(_this.clickPointInLocal);

            _this.notifyObservers(selectedMesh, true, _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ZERO);

            _this.setProperties(parentView, selectedMesh.name);

            parentView.updateNodeInServer(selectedMesh.name);

            _this.undoManager.addIt(_this.getUndoAbleAction(selectedMesh, bigDisplacement, parentView));
          });
        });

        _this.maybeSelectedMesh = monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].none();
        _this.shiftFromCenterOfMass = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ZERO;
        _this.mousePointInLocal = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ZERO;
        camera.attachControl(canvas, true);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onKeyDown", function (evt, parentView) {
      var defaultAction = function defaultAction() {
        return _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper2 = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(DragObjectsAction.prototype)), "onKeyDown", _thisSuper2).call(_thisSuper2, evt, parentView);
      };

      var predicateActionList = [{
        predicate: function predicate(e) {
          return ["Backspace", "Delete"].includes(e.code);
        },
        action: _this.getDeleteButtonAction(parentView)
      }, {
        predicate: function predicate(e) {
          return e.ctrlKey && !e.shiftKey && e.code === "KeyZ";
        },
        action: function action() {
          return _this.undoManager.undo();
        }
      }, {
        predicate: function predicate(e) {
          return e.ctrlKey && e.shiftKey && e.code === "KeyZ";
        },
        action: function action() {
          return _this.undoManager.redo();
        }
      }, {
        predicate: function predicate(e) {
          return e.ctrlKey && e.code === "KeyC";
        },
        action: function action() {
          return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(parentView.getHighlightedNodeName()).forEach(function (name) {
            return parentView.getNodeFromTree(name).forEach(function (_ref) {
              var item = _ref.item;
              var mesh = item.mesh;
              mesh.getMouseContextActions && mesh.getMouseContextActions(parentView)[0].onClick();
            });
          });
        }
      }, {
        predicate: function predicate(e) {
          return e.ctrlKey && e.code === "KeyV";
        },
        action: function action() {
          parentView.getMouseCoordinatesFromRoot().forEach(function (mousePosRoot) {
            return _this.getPasteOnClick(mousePosRoot, parentView)();
          });
        }
      }, {
        predicate: function predicate(e) {
          return true;
        },
        action: defaultAction
      }];

      for (var i = 0; i < predicateActionList.length; i++) {
        var predicateAction = predicateActionList[i];

        if (predicateAction.predicate(evt)) {
          predicateAction.action();
          break;
        }
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "setProperties", function (parentView, name) {
      return setTimeout(function () {
        return parentView.setPropertiesWithName(name);
      }, 100);
    });

    _this.key = "dragObject";
    _this.name = "Grab Objects [G]";

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-mouse-pointer"
      }, props));
    };

    _this.maybeSelectedMesh = monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].none();
    _this.shiftFromCenterOfMass = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ZERO;
    _this.mousePointInLocal = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ZERO;
    _this.clickPointInLocal = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ZERO;
    _this.undoManager = new mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15__["UndoManager"]();
    instance = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DragObjectsAction, [{
    key: "getDeleteButtonAction",
    value: function getDeleteButtonAction(parentView) {
      return function () {
        return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(parentView.getHighlightedNodeName()).forEach(function (nodeName) {
          var maybeNode = parentView.getNodeFromTree(nodeName);
          maybeNode.forEach(function () {
            return parentView.onDeleteNode(nodeName);
          });
          maybeNode.orElseRun(function () {
            var contextActions = parentView.getContextActions();
            contextActions[0].action(parentView);
          });
        });
      };
    }
  }, {
    key: "notifyObservers",
    value: function notifyObservers(mesh, is2updateServer, displacement) {
      monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(mesh.observers).forEach(function (obs) {
        return obs.notifyObservers({
          updatedPointMesh: mesh,
          is2updateServer: is2updateServer,
          displacement: displacement.toBabylon()
        });
      });
    }
  }, {
    key: "getUndoAbleAction",

    /**
     *
     * @param {*} selectedMesh: babylon js Mesh
     * @param {*} displacement: Vec3
     * @param {*} parentView: mainView instance
     */
    value: function getUndoAbleAction(selectedMesh, displacement, parentView) {
      var _this2 = this;

      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15__["UndoManager"].actionBuilder().doAction(function () {
        var newPos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(selectedMesh.position).add(displacement);
        selectedMesh.position = newPos.toBabylon();

        _this2.notifyObservers(selectedMesh, true, displacement);

        parentView.updateNodeInServer(selectedMesh.name);
      }).undoAction(function () {
        var invertDisplacement = displacement.scale(-1);
        var newPos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(selectedMesh.position).add(invertDisplacement);
        selectedMesh.position = newPos.toBabylon();

        _this2.notifyObservers(selectedMesh, true, invertDisplacement);

        parentView.updateNodeInServer(selectedMesh.name);
      }).build();
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new DragObjectsAction();
    }
  }]);

  return DragObjectsAction;
}(_MouseKeysAction__WEBPACK_IMPORTED_MODULE_12__["default"]);

var instance = null;
/* harmony default export */ __webpack_exports__["default"] = (DragObjectsAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/DrawGraphAction.js":
/*!**********************************************************!*\
  !*** ./src/Components/Viewer/Actions/DrawGraphAction.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _MouseKeysAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MouseKeysAction */ "./src/Components/Viewer/Actions/MouseKeysAction.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../NodeItem/GraphItem */ "./src/Components/Viewer/NodeItem/GraphItem.js");
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var DrawGraphAction = /*#__PURE__*/function (_MouseKeysAction) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5___default()(DrawGraphAction, _MouseKeysAction);

  var _super = _createSuper(DrawGraphAction);

  function DrawGraphAction() {
    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, DrawGraphAction);

    if (instance) return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(_this, instance);
    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_7___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(DrawGraphAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView);

      parentView.setSelectedAction(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));

      var contextActions = _this.getContextActions();

      parentView.setContextActions(contextActions);
      parentView.setContextActionIndex(contextActions.findIndex(function (ca) {
        return ca.mode === _this.mode;
      }));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onPointerDown", function (evt, parentView) {
      if (!(evt.buttons === 1)) return;

      _this.mousePosConsumer(parentView)(function (mousePos, memory) {
        var _handlePointerDownByM;

        var handlePointerDownByMode = (_handlePointerDownByM = {}, _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_handlePointerDownByM, MODES.line, _this.onPointerDownLine), _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_handlePointerDownByM, MODES.curve, _this.onPointerDownCurve), _handlePointerDownByM);

        handlePointerDownByMode[_this.mode](mousePos, memory, parentView);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onPointerMove", function (evt, parentView) {
      _this.mousePosConsumer(parentView)(function (mousePos, memory) {
        var _handlePointerMoveByM;

        var scene = memory.scene,
            ground = memory.ground;
        _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].pickMesh(scene, ground).cata(function () {
          return parentView.highlightMeshInScene();
        }, function (pickedMesh) {
          return parentView.highlightMeshInScene([pickedMesh], _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Green());
        });
        if (_this.mouseCurve.length === 0) return;
        var handlePointerMoveByMode = (_handlePointerMoveByM = {}, _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_handlePointerMoveByM, MODES.line, _this.onPointerMoveLine), _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_handlePointerMoveByM, MODES.curve, _this.onPointerMoveCurve), _handlePointerMoveByM);

        handlePointerMoveByMode[_this.mode](mousePos, memory, parentView);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onPointerUp", function (parentView) {
      parentView.getGraph().forEach(function (graphNode) {
        return parentView.setPropertiesWithName(graphNode.item.name);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onKeyDown", function (evt, parentView) {
      var keyCodeActionMap = {
        Delete: function Delete() {
          return _this.escapeAction(evt, parentView);
        },
        Backspace: function Backspace() {
          return _this.escapeAction(evt, parentView);
        },
        Escape: function Escape() {
          return _this.escapeAction(evt, parentView);
        }
      };

      if (evt.code in keyCodeActionMap) {
        keyCodeActionMap[evt.code]();
      } else {
        _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_7___default()((_thisSuper2 = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(DrawGraphAction.prototype)), "onKeyDown", _thisSuper2).call(_thisSuper2, evt, parentView);
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "escapeAction", function (evt, parentView) {
      if (_this.mouseCurve.length > 0) {
        _this.deletePreviewMeshes();

        _this.mouseCurve = [];
      } else {
        _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_7___default()((_thisSuper3 = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(DrawGraphAction.prototype)), "onKeyDown", _thisSuper3).call(_thisSuper3, evt, parentView);
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "deletePreviewMeshes", function () {
      _this.previewMeshes.forEach(function (mesh) {
        return mesh.dispose();
      });

      _this.previewMeshes = [];
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "mousePosConsumer", function (parentView) {
      return function (lambda) {
        parentView.getSceneMemory().forEach(function (memory) {
          var scene = memory.scene;
          var ground = memory.ground;
          var maybeCurrent = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].getGroundPosition(scene, ground);
          maybeCurrent.forEach(function (mousePos) {
            return lambda(mousePos, memory);
          });
        });
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "createGraphItemIfNone", function (scene, parentView) {
      return parentView.getGraph().orElseRun(function () {
        var graphItem = new _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_15__["default"](scene, parentView);
        graphItem.mesh.parent = parentView.getRootNode().item.mesh;
        parentView.addNodeItem2Tree(graphItem);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onPointerDownLine", function (mousePos, memory, parentView) {
      var camera = memory.camera,
          canvas = memory.canvas,
          scene = memory.scene;
      camera.detachControl(canvas);

      if (_this.mouseCurve.length === 0) {
        _this.mouseCurve.push(mousePos);
      } else {
        //mouseCurve.length > 0
        _this.createEdge([_this.mouseCurve[0], mousePos], scene, parentView, function (graphItem) {
          return function (edge) {
            return graphItem.addEdge(edge);
          };
        });

        _this.mouseCurve = [];
        camera.attachControl(canvas, true);
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onPointerMoveLine", function (mousePos, memory, parentView) {
      // preview line
      var visibility = 0.25;
      var scene = memory.scene;
      var rootMesh = parentView.getRootNode().item.mesh;
      var edgeEmbedding = toLocalCoordinates(parentView)([_this.mouseCurve[0], mousePos]);

      _this.deletePreviewMeshes();

      _this.previewMeshes = _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_15__["default"].getEdgeWithVertexMeshes(scene, edgeEmbedding, _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Blue(), _Utils_Constants__WEBPACK_IMPORTED_MODULE_16__["default"].RADIUS / 2);

      _this.previewMeshes.forEach(function (mesh) {
        mesh.visibility = visibility;
        mesh.parent = rootMesh;
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onPointerDownCurve", function (mousePos, memory, parentView) {
      var camera = memory.camera,
          canvas = memory.canvas,
          scene = memory.scene;
      camera.detachControl(canvas);

      if (_this.mouseCurve.length <= 1) {
        _this.mouseCurve.push(mousePos);
      } else {
        //mouseCurve.length > 1
        _this.createEdge([_this.mouseCurve[0], _this.mouseCurve[1], mousePos], scene, parentView, function (graphItem) {
          return function (edge) {
            return graphItem.addCurveEdge(edge);
          };
        });

        _this.mouseCurve = [];
        camera.attachControl(canvas, true);
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onPointerMoveCurve", function (mousePos, memory, parentView) {
      if (_this.mouseCurve.length < 2) {
        _this.onPointerMoveLine(mousePos, memory, parentView);
      } else {
        // mouse curve >= 2
        var visibility = 0.25;
        var scene = memory.scene;
        var rootMesh = parentView.getRootNode().item.mesh;
        var edgeEmbedding = toLocalCoordinates(parentView)([].concat(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(_this.mouseCurve), [mousePos]));

        _this.deletePreviewMeshes();

        _this.previewMeshes = _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_15__["default"].getCurveEdgeWithVertexMeshes(scene, edgeEmbedding, _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Green(), _Utils_Constants__WEBPACK_IMPORTED_MODULE_16__["default"].RADIUS / 2).concat(_NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_15__["default"].getEdgeWithVertexMeshes(scene, [edgeEmbedding[0], edgeEmbedding[1]], _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Blue(), _Utils_Constants__WEBPACK_IMPORTED_MODULE_16__["default"].RADIUS / 2)).concat(_NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_15__["default"].getEdgeWithVertexMeshes(scene, [edgeEmbedding[1], edgeEmbedding[2]], _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Blue(), _Utils_Constants__WEBPACK_IMPORTED_MODULE_16__["default"].RADIUS / 2));

        _this.previewMeshes.forEach(function (mesh) {
          mesh.visibility = visibility;
          mesh.parent = rootMesh;
        });
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "createEdge", function (edgeInWorldCoordinate, scene, parentView, drawMethod) {
      var edge = toLocalCoordinates(parentView)(edgeInWorldCoordinate);

      _this.createGraphItemIfNone(scene, parentView);

      parentView.getGraph().forEach(function (graphNode) {
        var graphItem = graphNode.item;
        drawMethod(graphItem)(edge);
        parentView.updateNodeInServer(graphItem.name);
      });

      _this.deletePreviewMeshes();
    });

    _this.key = "drawGraph";
    _this.name = "Draw Graph [C]";

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-project-diagram"
      }, props));
    };

    _this.mouseCurve = [];
    _this.previewMeshes = [];
    _this.mode = MODES.line;
    instance = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default()(DrawGraphAction, [{
    key: "getContextActions",
    value: function getContextActions() {
      var _this2 = this;

      return [{
        icon: function icon(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            className: "fas fa-grip-lines-vertical"
          }, props));
        },
        action: function action(parentView) {
          parentView.setContextActionIndex(0);
          _this2.mode = MODES.line;
          _this2.mouseCurve = [];

          _this2.previewMeshes.forEach(function (mesh) {
            return mesh.dispose();
          });

          _this2.previewMeshes = [];
        },
        name: "Line Mode",
        mode: MODES.line
      }, {
        icon: function icon(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            className: "fas fa-bezier-curve"
          }, props));
        },
        action: function action(parentView) {
          parentView.setContextActionIndex(1);
          _this2.mode = MODES.curve;
          _this2.mouseCurve = [];

          _this2.previewMeshes.forEach(function (mesh) {
            return mesh.dispose();
          });

          _this2.previewMeshes = [];
        },
        name: "Curve Mode",
        mode: MODES.curve
      }];
    } //========================================================================================

    /*                                                                                      *
     *                                       Line Edge                                      *
     *                                                                                      */
    //========================================================================================

  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new DrawGraphAction();
    } //========================================================================================

    /*                                                                                      *
     *                            Mouse Key Action Implementation                           *
     *                                                                                      */
    //========================================================================================

  }]);

  return DrawGraphAction;
}(_MouseKeysAction__WEBPACK_IMPORTED_MODULE_10__["default"]);

var instance = null;
var MODES = {
  line: "line",
  curve: "curve",
  free: "free"
};

var toLocalCoordinates = function toLocalCoordinates(parentView) {
  var rootMesh = parentView.getRootNode().item.mesh;
  return function (arrayOfVector3) {
    return arrayOfVector3.map(function (p) {
      return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].computeLocalCoordinatesFromMesh({
        parent: rootMesh
      }, _Math_Vec3__WEBPACK_IMPORTED_MODULE_14__["default"].ofBabylon(p)).toBabylon();
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (DrawGraphAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/DrawPathAction.js":
/*!*********************************************************!*\
  !*** ./src/Components/Viewer/Actions/DrawPathAction.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _NodeItem_Path__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../NodeItem/Path */ "./src/Components/Viewer/NodeItem/Path.js");
/* harmony import */ var _MouseKeysAction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./MouseKeysAction */ "./src/Components/Viewer/Actions/MouseKeysAction.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_14__);










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var DrawPathAction = /*#__PURE__*/function (_MouseKeysAction) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(DrawPathAction, _MouseKeysAction);

  var _super = _createSuper(DrawPathAction);

  function DrawPathAction() {
    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DrawPathAction);

    if (instance) return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(_this, instance);
    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(DrawPathAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView);

      parentView.setSelectedAction(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerDown", function (evt, parentView) {
      if (!(evt.buttons === 1)) return;
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene,
            ground = memory.ground,
            camera = memory.camera,
            canvas = memory.canvas;
        var maybeMousePos = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getGroundPosition(scene, ground);
        maybeMousePos.forEach(function (mousePos) {
          camera.detachControl(canvas);

          _this.mouseCurve.push(mousePos);

          var drawPathPoints = _this.mouseCurve.length === 1 ? [_this.mouseCurve[0], _this.mouseCurve[0]] : _this.mouseCurve;

          _this.createCurve(drawPathPoints, TEMP_PATH_NAME, scene, parentView, false);

          parentView.setContextActions(_this.getDrawPathContextAction(camera, canvas, scene));
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerMove", function (evt, parentView) {// empty
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerUp", function (parentView) {// empty
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onKeyDown", function (evt, parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene,
            camera = memory.camera,
            canvas = memory.canvas;

        var contextActions = _this.getDrawPathContextAction(camera, canvas, scene);

        var keyCodeActionMap = {
          Enter: function Enter() {
            return contextActions[1].action(parentView);
          },
          Delete: function Delete() {
            return contextActions[0].action(parentView);
          },
          Backspace: function Backspace() {
            return contextActions[0].action(parentView);
          },
          Escape: function Escape() {
            if (_this.mouseCurve.length === 0) {
              _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper2 = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(DrawPathAction.prototype)), "onKeyDown", _thisSuper2).call(_thisSuper2, evt, parentView);
            }

            contextActions[0].action(parentView);
          }
        };

        if (evt.code in keyCodeActionMap) {
          keyCodeActionMap[evt.code]();
        } else {
          _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper3 = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(DrawPathAction.prototype)), "onKeyDown", _thisSuper3).call(_thisSuper3, evt, parentView);
        }
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "createCurve", function (curve, name, scene, parentView) {
      var is2addInServer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Color3"].Gray();
      var rootMesh = parentView.getRootNode().item.mesh;
      var localCurve = curve.map(function (w) {
        return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].computeLocalCoordinatesFromMesh({
          parent: rootMesh
        }, _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(w)).toBabylon();
      });
      var middlePoint = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].pointAverage(localCurve);
      var centeredCurve = localCurve.map(function (w) {
        return w.subtract(middlePoint);
      });
      var pathItem = _NodeItem_Path__WEBPACK_IMPORTED_MODULE_11__["default"].ofDict(scene, {
        name: name,
        position: _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(middlePoint).toArray(),
        color: [color.r, color.g, color.b],
        localPath: centeredCurve.map(function (z) {
          return _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(z).toArray();
        })
      }, parentView);
      pathItem.mesh.parent = rootMesh;
      parentView.addNodeItem2Tree(pathItem, rootMesh.name, is2addInServer);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getDrawPathContextAction", function (camera, canvas, scene) {
      var ans = [];
      ans.push({
        icon: function icon(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            className: "fas fa-trash"
          }, props));
        },
        action: function action(parentView) {
          camera.attachControl(canvas, true);
          parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
          _this.mouseCurve = [];
          parentView.closeContextDial();
        },
        name: "Clear Path [ESC | DEL | Backspace]"
      });

      if (_this.mouseCurve.length > 1) {
        ans.push({
          icon: function icon(props) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
              className: "fas fa-check"
            }, props));
          },
          action: function action(parentView) {
            camera.attachControl(canvas, true);
            parentView.deleteNodeFromTreeUsingName(TEMP_PATH_NAME, false);
            var name = "Path".concat(Math.floor(Math.random() * 1e3));

            _this.createCurve(_this.mouseCurve, name, scene, parentView, true);

            _this.mouseCurve = [];
            parentView.setPropertiesWithName(name);
            parentView.closeContextDial();
          },
          name: "Create Path [Enter]"
        });
      }

      return ans;
    });

    _this.key = "drawPath";
    _this.name = "Draw Path [P]";
    _this.mouseCurve = [];

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-bezier-curve"
      }, props));
    };

    instance = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DrawPathAction, null, [{
    key: "getInstance",
    value: function getInstance() {
      return new DrawPathAction();
    }
  }]);

  return DrawPathAction;
}(_MouseKeysAction__WEBPACK_IMPORTED_MODULE_12__["default"]);

var instance = null;
var TEMP_PATH_NAME = "temp_curve";
/* harmony default export */ __webpack_exports__["default"] = (DrawPathAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/MouseKeysAction.js":
/*!**********************************************************!*\
  !*** ./src/Components/Viewer/Actions/MouseKeysAction.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Action */ "./src/Components/Viewer/Actions/Action.js");
/* harmony import */ var _MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MainView/MainViewActions */ "./src/Components/Viewer/MainView/MainViewActions.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var MouseKeysAction = /*#__PURE__*/function (_Action) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2___default()(MouseKeysAction, _Action);

  var _super = _createSuper(MouseKeysAction);

  function MouseKeysAction() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MouseKeysAction);

    return _super.call(this);
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MouseKeysAction, [{
    key: "onPointerDown",
    value: function onPointerDown(evt, parentView) {// to be implemented on sub classes
    }
  }, {
    key: "onPointerMove",
    value: function onPointerMove(evt, parentView) {// to be implemented on sub classes
    }
  }, {
    key: "onPointerUp",
    value: function onPointerUp(parentView) {// to be implemented on sub classes
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(evt, parentView) {
      var codeActionDict = {
        Escape: buttonActionFactory(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].orbit),
        KeyG: buttonActionFactory(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].dragObjects),
        KeyP: buttonActionFactory(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].drawPath),
        KeyB: buttonActionFactory(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].drawBoxRegion),
        KeyR: buttonActionFactory(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].drawRegion),
        KeyK: buttonActionFactory(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].addKeyPoint),
        KeyC: buttonActionFactory(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_6__["ACTIONS"].drawGraph)
      };

      if (evt.code in codeActionDict) {
        codeActionDict[evt.code](parentView);
      }
    }
  }]);

  return MouseKeysAction;
}(_Action__WEBPACK_IMPORTED_MODULE_5__["default"]);

var buttonActionFactory = function buttonActionFactory(action) {
  return function (parentView) {
    action.action(parentView);
    parentView.setSelectedAction(action);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (MouseKeysAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/OrbitAction.js":
/*!******************************************************!*\
  !*** ./src/Components/Viewer/Actions/OrbitAction.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _MouseKeysAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MouseKeysAction */ "./src/Components/Viewer/Actions/MouseKeysAction.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var OrbitAction = /*#__PURE__*/function (_MouseKeysAction) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(OrbitAction, _MouseKeysAction);

  var _super = _createSuper(OrbitAction);

  function OrbitAction() {
    var _thisSuper, _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, OrbitAction);

    if (instance) return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(_this, instance);
    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(OrbitAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView);

      parentView.setSelectedAction(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerDown", function (evt, parentView) {});

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerMove", function (evt, parentView) {});

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerUp", function (parentView) {});

    _this.key = "orbit";
    _this.name = "Orbit [ESC]";
    _this.maybeSelectedMesh = monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].none();

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-globe"
      }, props));
    };

    instance = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(OrbitAction, null, [{
    key: "getInstance",
    value: function getInstance() {
      return new OrbitAction();
    }
  }]);

  return OrbitAction;
}(_MouseKeysAction__WEBPACK_IMPORTED_MODULE_10__["default"]);

var instance = null;
/* harmony default export */ __webpack_exports__["default"] = (OrbitAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/PolygonRegionAction.js":
/*!**************************************************************!*\
  !*** ./src/Components/Viewer/Actions/PolygonRegionAction.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _MouseKeysAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MouseKeysAction */ "./src/Components/Viewer/Actions/MouseKeysAction.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _NodeItem_PolygonRegion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../NodeItem/PolygonRegion */ "./src/Components/Viewer/NodeItem/PolygonRegion.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_14__);










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }







var instance = null;
var TEMP_POLYGON_REGION_NAME = "temp_polygon_region"; // Similar 2 Draw Action Path

var PolygonRegionAction = /*#__PURE__*/function (_MouseKeysAction) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(PolygonRegionAction, _MouseKeysAction);

  var _super = _createSuper(PolygonRegionAction);

  function PolygonRegionAction() {
    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PolygonRegionAction);

    if (instance) return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(_this, instance);
    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(PolygonRegionAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView);

      parentView.setSelectedAction(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getDrawPolygonContextAction", function (camera, canvas, scene) {
      var ans = [];
      ans.push({
        icon: function icon(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            className: "fas fa-trash"
          }, props));
        },
        action: function action(parentView) {
          camera.attachControl(canvas, true);
          parentView.deleteNodeFromTreeUsingName(TEMP_POLYGON_REGION_NAME, false);
          _this.mouseCurve = [];
          parentView.closeContextDial();
        },
        name: "Clear Polygon [ESC | DEL | Backspace]"
      });

      if (_this.mouseCurve.length > 2) {
        ans.push({
          icon: function icon(props) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
              className: "fas fa-check"
            }, props));
          },
          action: function action(parentView) {
            camera.attachControl(canvas, true);
            parentView.deleteNodeFromTreeUsingName(TEMP_POLYGON_REGION_NAME, false);
            var name = "PolygonRegion".concat(Math.floor(Math.random() * 1e3));

            _this.createPolygonRegion(_this.mouseCurve, name, scene, parentView, true);

            _this.mouseCurve = [];
            parentView.setPropertiesWithName(name);
            parentView.closeContextDial();
          },
          name: "Create Polygon [Enter]"
        });
      }

      return ans;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerDown", function (evt, parentView) {
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;
        var ground = memory.ground;
        var camera = memory.camera;
        var maybeMousePos = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_11__["default"].getGroundPosition(scene, ground);
        maybeMousePos.forEach(function (mousePos) {
          camera.detachControl(memory.canvas);

          _this.mouseCurve.push(mousePos);

          var drawPolyPoints = _this.mouseCurve.length === 1 ? [_this.mouseCurve[0], _this.mouseCurve[0]] : _this.mouseCurve;

          _this.createPolygonRegion(drawPolyPoints, TEMP_POLYGON_REGION_NAME, scene, parentView, false);

          parentView.setContextActions(_this.getDrawPolygonContextAction(camera, memory.canvas, scene));
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerMove", function (evt, parentView) {// empty
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onPointerUp", function (parentView) {// empty
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "onKeyDown", function (evt, parentView) {
      // Warning: code duplication with PathAction
      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;
        var camera = memory.camera;

        var contextActions = _this.getDrawPolygonContextAction(camera, memory.canvas, scene);

        var keyCodeActionMap = {
          Enter: function Enter() {
            return contextActions[1].action(parentView);
          },
          Delete: function Delete() {
            return contextActions[0].action(parentView);
          },
          Backspace: function Backspace() {
            return contextActions[0].action(parentView);
          },
          Escape: function Escape() {
            if (_this.mouseCurve.length === 0) {
              _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper2 = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(PolygonRegionAction.prototype)), "onKeyDown", _thisSuper2).call(_thisSuper2, evt, parentView);
            }

            contextActions[0].action(parentView);
          }
        };

        if (evt.code in keyCodeActionMap) {
          keyCodeActionMap[evt.code]();
        } else {
          _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper3 = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(PolygonRegionAction.prototype)), "onKeyDown", _thisSuper3).call(_thisSuper3, evt, parentView);
        }
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "createPolygonRegion", function (region, name, scene, parentView) {
      var is2addInServer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Color3"].Yellow();
      var height = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
      var rootMesh = parentView.getRootNode().item.mesh;
      var localRegion = region.map(function (r) {
        return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_11__["default"].computeLocalCoordinatesFromMesh({
          parent: rootMesh
        }, _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(r));
      });
      var middlePoint = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_11__["default"].pointAverageVec3(localRegion);
      var centeredRegion = localRegion.map(function (r) {
        return r.sub(middlePoint);
      });
      var polygonRegionItem = _NodeItem_PolygonRegion__WEBPACK_IMPORTED_MODULE_13__["default"].ofDict(scene, {
        name: name,
        position: middlePoint.toArray(),
        color: [color.r, color.g, color.b],
        localPolygon: centeredRegion.map(function (x) {
          return x.toArray();
        }),
        height: height
      }, parentView);
      polygonRegionItem.mesh.parent = rootMesh;
      parentView.addNodeItem2Tree(polygonRegionItem, rootMesh.name, is2addInServer);
    });

    _this.key = "drawPolygonRegion";
    _this.name = "Draw Polygon Region [R]";
    _this.mouseCurve = [];

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-draw-polygon"
      }, props));
    };

    instance = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PolygonRegionAction, null, [{
    key: "getInstance",
    value: function getInstance() {
      return new PolygonRegionAction();
    }
  }]);

  return PolygonRegionAction;
}(_MouseKeysAction__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PolygonRegionAction);

/***/ }),

/***/ "./src/Components/Viewer/Actions/RobotAction.js":
/*!******************************************************!*\
  !*** ./src/Components/Viewer/Actions/RobotAction.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _NodeItem_Robot__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../NodeItem/Robot */ "./src/Components/Viewer/NodeItem/Robot.js");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Action */ "./src/Components/Viewer/Actions/Action.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _NodeItem_PointCloud__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../NodeItem/PointCloud */ "./src/Components/Viewer/NodeItem/PointCloud.js");
/* harmony import */ var _MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../MainView/MainViewActions */ "./src/Components/Viewer/MainView/MainViewActions.js");
/* harmony import */ var _Utils_MeshLoader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Utils/MeshLoader */ "./src/Components/Viewer/Utils/MeshLoader.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var RobotAction = /*#__PURE__*/function (_Action) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RobotAction, _Action);

  var _super = _createSuper(RobotAction);

  function RobotAction(_robot) {
    var _thisSuper, _this;

    var robotAnimatorFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (robot, parentView) {
      return _NodeItem_Robot__WEBPACK_IMPORTED_MODULE_9__["default"].getDefaultAnimator(parentView);
    };

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, RobotAction);

    _this = _super.call(this);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "action", function (parentView) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()((_thisSuper = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(RobotAction.prototype)), "action", _thisSuper).call(_thisSuper, parentView); // if robot already exists, do nothing


      parentView.getNodeFromTree(_this.robot.name).orElseRun(function () {
        return _this.addRobot(parentView);
      });
      parentView.setSelectedAction(_MainView_MainViewActions__WEBPACK_IMPORTED_MODULE_14__["ACTIONS"].dragObjects);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getRobot", function (scene, mesh, parentMesh) {
      var meshTree = _NodeItem_Robot__WEBPACK_IMPORTED_MODULE_9__["default"].createRobotMeshTree(_this.robot.robotTree, mesh, scene);
      var dict = monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(_this.memory["nodeItemDict"]);
      return _NodeItem_Robot__WEBPACK_IMPORTED_MODULE_9__["default"].builder().id(_this.robot.id).name(monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(_this.memory["name"]).orSome(_this.robot.name)).assetName(monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(_this.memory["assetName"]).orSome(_this.robot.name)).meshTree(meshTree).parentMesh(parentMesh).scene(scene).keyValueMap(dict.map(function (x) {
        return x.keyValueMap;
      }).orSome({})).build();
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getCloudPoint", function (scene, parentView, robot) {
      var cloudPoint = _NodeItem_PointCloud__WEBPACK_IMPORTED_MODULE_13__["default"].ofDict(scene, {
        name: _this.robot.name,
        id: _this.robot.id
      }, parentView);
      cloudPoint.mesh.parent = robot.mesh;
      return cloudPoint;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getParentMesh", function (parentView) {
      return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(_this.memory["parentObj"]).map(function (parentObj) {
        return parentObj.parent;
      }).flatMap(function (parentName) {
        return parentView.getNodeFromTree(parentName);
      }).map(function (treeNode) {
        return treeNode.item.mesh;
      }).orSome(parentView.getRootNode().item.mesh);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getType", function () {
      return RobotAction.TYPE;
    });

    _this.robot = _robot;
    _this.key = "robotAction".concat(_robot.name);
    _this.name = _robot.name;
    _this.robotAnimatorFactory = robotAnimatorFactory;

    _this.icon = function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        className: "fas fa-robot"
      }, props));
    };

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(RobotAction, [{
    key: "addRobot",
    value: function addRobot(parentView) {
      var _this2 = this;

      parentView.getSceneMemory().forEach(function (memory) {
        var scene = memory.scene;

        var actionMemoryClone = _objectSpread({}, _this2.memory);

        _Utils_MeshLoader__WEBPACK_IMPORTED_MODULE_15__["default"].of(scene).load(_NodeItem_Robot__WEBPACK_IMPORTED_MODULE_9__["default"].ROBOT_MESH_NAME, function (mesh) {
          return _NodeItem_Robot__WEBPACK_IMPORTED_MODULE_9__["default"].transformMesh(mesh, scene);
        }).then(function (mesh) {
          return _this2.createRobotFromMesh(mesh, scene, parentView, actionMemoryClone);
        });
      });
      this.memory["isImport"] = false;
    }
  }, {
    key: "createRobotFromMesh",
    value: function createRobotFromMesh(mesh, scene, parentView, memory) {
      var parentMesh = this.getParentMesh(parentView);
      var robot = this.getRobot(scene, mesh, parentMesh);
      robot.animate(this.robotAnimatorFactory(robot, parentView));
      var isImport = monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(memory["isImport"]).orSome(false);
      parentView.addNodeItem2Tree(robot, parentMesh.name, !isImport);
      var cloudPoint = this.getCloudPoint(scene, parentView, robot);
      parentView.addNodeItem2Tree(cloudPoint, robot.name, false);
      parentView.renderMenus();
    }
  }]);

  return RobotAction;
}(_Action__WEBPACK_IMPORTED_MODULE_10__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(RobotAction, "TYPE", "RobotAction");

/* harmony default export */ __webpack_exports__["default"] = (RobotAction);

/***/ }),

/***/ "./src/Components/Viewer/AssetsManager/AssetsManager.js":
/*!**************************************************************!*\
  !*** ./src/Components/Viewer/AssetsManager/AssetsManager.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "@babel/runtime/helpers/esm/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Utils_AssetsTypesFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/AssetsTypesFactory */ "./src/Components/Viewer/Utils/AssetsTypesFactory.js");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _MapLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MapLoader */ "./src/Components/Viewer/AssetsManager/MapLoader.js");









/**
 *  Graphic Assets Manager, retrieves and manages the assets that are in DB.
 */

var AssetsManager = /*#__PURE__*/function () {
  function AssetsManager() {
    var _this = this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AssetsManager);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getAssets", function () {
      return _this.assets;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getAssetsActionMap", function () {
      return _this.assetsActionMap;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "load", /*#__PURE__*/_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.retrieveAssetsFromDb();

            case 2:
              return _context.abrupt("return", _this);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "signalObservers", function () {
      return _this.observers.forEach(function (obs) {
        return obs(_this);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "subs", [function (resolve) {
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_7__["MasterDB"].subscribe({
        Scope: "Robot",
        Name: "*",
        RobotName: "*"
      }, _this.getRobotNameUpdate(), _this.getRobotNameSub(function (_ref2) {
        var value = _ref2.value;
        return value;
      }, resolve));
    }, function (resolve) {
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_7__["MasterDB"].subscribe({
        Scope: "Package",
        File: "*",
        Name: "maps",
        FileLabel: "*"
      }, _this.getMapUpdater(function (_ref3) {
        var key = _ref3.key;
        return key;
      }, _this.signalObservers), _this.getMapSubscriber(function (_ref4) {
        var value = _ref4.value;
        return value;
      }, function () {
        return _this.finishSub("Maps", resolve);
      }));
    }, function (resolve) {
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_7__["MasterDB"].subscribe({
        Scope: "Package",
        File: "*",
        Name: "meshes",
        FileLabel: "*"
      }, _this.getMeshUpdater(), _this.getMeshSubscriber(function (_ref5) {
        var value = _ref5.value;
        return value;
      }, function () {
        return _this.finishSub("Meshes", resolve);
      }));
    }]);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "finishSub", function (place, resolve) {
      console.log("FINISH SUB ", place, _this.finishInitialSubscribers);

      if (++_this.finishInitialSubscribers > _this.subs.length - 1) {
        _this.afterLoad.forEach(function (f) {
          return f(_this);
        });

        resolve(true);
      }
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "deleteRobot", function (id) {
      _this.delAsset(_this.robots[id].name);

      if (id in _this.robots) delete _this.robots[id];
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getMapSubscriber", function (dataGetter) {
      var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      return function (data) {
        return _this.getMapFileData(dataGetter, data).forEach(function (fileName) {
          Object.keys(fileName).filter(function (f) {
            return f.includes(".yaml");
          }).forEach(_this.addMap);
          after();
        });
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getMapUpdater", function (dataGetter) {
      var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var actionMap = {
        del: function del(data) {
          _this.getMapFileData(dataGetter, data).forEach(function (f) {
            var filename = Object.keys(f)[0];
            filename = filename.split(".")[0];
            delete _this.assets[filename];
            delete _this.assetsActionMap[filename];
          });

          after();
        },
        set: _this.getMapSubscriber(dataGetter, after),
        subscribe: _this.getMapSubscriber(dataGetter, after)
      };
      return function (data) {
        console.log("MAP UPDATE", data);
        actionMap[data.event](data);
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "addMap", function (yamlSrc) {
      var map = {
        name: yamlSrc.split(".")[0],
        loader: new _MapLoader__WEBPACK_IMPORTED_MODULE_8__["default"](yamlSrc),
        type: _Utils_AssetsTypesFactory__WEBPACK_IMPORTED_MODULE_6__["ASSETS_TYPES"].Map
      };

      _this.addAsset(map.name, map);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getMapFileData", function (dataGetter, data) {
      return ofNull(dataGetter(data)).flatMap(maybeGet("Package")).flatMap(maybeGet("maps")).flatMap(maybeGet("File"));
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getMeshSubscriber", function (dataGetter) {
      var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      return function (data) {
        _this.getMeshFileData(dataGetter, data).forEach(function (d) {
          return Object.keys(d).forEach(function (id) {
            var mesh = {
              id: id,
              name: d[id].FileLabel,
              type: _Utils_AssetsTypesFactory__WEBPACK_IMPORTED_MODULE_6__["ASSETS_TYPES"].Mesh
            };

            _this.addAsset(mesh.name, mesh);
          });
        });

        after();
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getMeshUpdater", function () {
      var actionMap = {
        del: function del(data) {
          _this.getMeshFileData(function (d) {
            return d.key;
          }, data).forEach(function (f) {
            var filename = Object.keys(f)[0];
            delete _this.assets[filename];
            delete _this.assetsActionMap[filename];
          });

          _this.signalObservers();
        },
        set: _this.getMeshSubscriber(function (d) {
          return d.key;
        }, _this.signalObservers),
        subscribe: _this.getMeshSubscriber(function (d) {
          return d.key;
        }, _this.signalObservers)
      };
      return function (data) {
        return actionMap[data.event](data);
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "getMeshFileData", function (dataGetter, data) {
      return ofNull(dataGetter(data)).flatMap(maybeGet("Package")).flatMap(maybeGet("meshes")).flatMap(maybeGet("File"));
    });

    if (instance) return instance;
    instance = this;
    this.assets = {};
    this.assetsActionMap = {};
    this.robots = {};
    this.observers = [];
    this.afterLoad = [];
    this.finishInitialSubscribers = 0;
  } //========================================================================================

  /*                                                                                      *
   *                                  Getters and Setters                                 *
   *                                                                                      */
  //========================================================================================


  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default()(AssetsManager, [{
    key: "addAfterLoad",
    value: function addAfterLoad(afterLoad) {
      this.afterLoad.push(afterLoad);
      return this;
    }
  }, {
    key: "addObserver",
    value: function addObserver(observer) {
      this.observers.push(observer);
      return this;
    }
  }, {
    key: "addAsset",
    value: function addAsset(assetKey, asset) {
      try {
        this.assets[assetKey] = asset;
        this.assetsActionMap[assetKey] = _Utils_AssetsTypesFactory__WEBPACK_IMPORTED_MODULE_6__["AssetsTypesFactory"][asset.type](asset);
      } catch (e) {
        console.log("Caught exception while adding asset", e);
        throw Error("Caught exception while adding asset ".concat(e));
      }
    }
  }, {
    key: "delAsset",
    value: function delAsset(assetKey) {
      if (assetKey in this.assets) delete this.assets[assetKey];
      if (assetKey in this.assetsActionMap) delete this.assetsActionMap[assetKey];
      this.signalObservers();
    } //========================================================================================

    /*                                                                                      *
     *                                      Subscribers                                     *
     *                                                                                      */
    //========================================================================================

  }, {
    key: "retrieveAssetsFromDb",
    value: function retrieveAssetsFromDb() {
      var _this2 = this;

      return new Promise(function (re, rej) {
        _this2.subs.forEach(function (f) {
          return f(re);
        });
      });
    } //========================================================================================

    /*                                                                                      *
     *                                         Utils                                        *
     *                                                                                      */
    //========================================================================================

  }, {
    key: "addRobot",
    value: function addRobot(id) {
      var _this3 = this;

      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!(id in this.robots)) {
        this.robots[id] = {
          id: id,
          name: null
        };
      }

      ofNull(name).forEach(function (name) {
        return _this3.robots[id].name = name;
      });

      if (Object.values(this.robots[id]).every(function (x) {
        return x !== null;
      })) {
        var localRobot = this.robots[id];
        this.addAsset(localRobot.name, {
          name: localRobot.name,
          id: id,
          type: _Utils_AssetsTypesFactory__WEBPACK_IMPORTED_MODULE_6__["ASSETS_TYPES"].Robot,
          robotTree: {
            name: localRobot.name,
            position: {
              x: 0,
              y: 0,
              z: 0
            },
            orientation: {
              w: 1,
              x: 0,
              y: 0,
              z: 0
            },
            child: []
          }
        });
      }
    }
  }, {
    key: "getRobotNameSub",
    value: function getRobotNameSub(getter, resolve) {
      var _this4 = this;

      return function (data) {
        ofNull(getter(data)).flatMap(maybeGet("Robot")).forEach(function (r) {
          return Object.keys(r).forEach(function (id) {
            return _this4.addRobot(id, r[id].RobotName);
          });
        });

        _this4.finishSub("RobotName", resolve);
      };
    }
  }, {
    key: "getRobotNameUpdate",
    value: function getRobotNameUpdate() {
      var _this5 = this;

      var actionMap = {
        del: function del(data) {
          return ofNull(data.key).flatMap(maybeGet("Robot")).forEach(function (r) {
            return Object.keys(r).forEach(_this5.deleteRobot);
          });
        },
        set: this.getRobotNameSub(function (_ref6) {
          var key = _ref6.key;
          return key;
        })
      };
      return function (data) {
        console.log("Robot NAME UPDATE", data);
        actionMap[data.event](data);
      };
    } //========================================================================================

    /*                                                                                      *
     *                                         Maps                                         *
     *                                                                                      */
    //========================================================================================

  }], [{
    key: "getInstance",
    //========================================================================================

    /*                                                                                      *
     *                                        static                                        *
     *                                                                                      */
    //========================================================================================
    value: function getInstance() {
      return new AssetsManager();
    }
  }]);

  return AssetsManager;
}(); // private variable


var instance = null; // auxiliary functions

var ofNull = monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].fromNull;

var get = function get(prop) {
  return function (obj) {
    return obj[prop];
  };
};

var dot = function dot(f) {
  return function (g) {
    return function (x) {
      return f(g(x));
    };
  };
};

var maybeGet = function maybeGet(prop) {
  return dot(ofNull)(get(prop));
};

/* harmony default export */ __webpack_exports__["default"] = (AssetsManager);

/***/ }),

/***/ "./src/Components/Viewer/AssetsManager/MapLoader.js":
/*!**********************************************************!*\
  !*** ./src/Components/Viewer/AssetsManager/MapLoader.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MapLoader; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "@babel/runtime/helpers/esm/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4__);






var MapLoader = /*#__PURE__*/function () {
  function MapLoader(yamlSrc) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MapLoader);

    this.yamlSrc = yamlSrc;
    this.cachedMap = null;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default()(MapLoader, [{
    key: "load",
    value: function () {
      var _load = _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response, map, ans;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.cachedMap) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", this.cachedMap);

              case 2:
                _context.next = 4;
                return fetch(MapLoader.getMapUrl(this.yamlSrc));

              case 4:
                response = _context.sent;
                _context.t0 = this;
                _context.next = 8;
                return response.text();

              case 8:
                _context.t1 = _context.sent;
                _context.next = 11;
                return _context.t0.parseYaml.call(_context.t0, _context.t1);

              case 11:
                map = _context.sent;
                ans = {
                  textureSrc: map.image,
                  resolution: map.resolution,
                  origin: map.origin,
                  imageSize: map.size
                };
                this.cachedMap = ans;
                return _context.abrupt("return", ans);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "parseYaml",
    value: function () {
      var _parseYaml = _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(yamlTxt) {
        var ans, actionDict;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ans = {};
                actionDict = {
                  image: function image(k, v) {
                    return ans[k] = MapLoader.getMapUrl(v);
                  },
                  resolution: function resolution(k, v) {
                    return ans[k] = Number.parseFloat(v);
                  },
                  origin: function origin(k, v) {
                    return ans[k] = JSON.parse(v);
                  }
                };
                console.log("Yaml text", yamlTxt);
                yamlTxt.split("\n").map(function (s) {
                  return s.split(": ");
                }).filter(function (split) {
                  return split.length >= 2;
                }).filter(function (split) {
                  return split[0] in actionDict;
                }).forEach(function (split) {
                  return actionDict[split[0]](split[0], split[1]);
                });
                _context2.next = 6;
                return this.getImageSize(ans["image"]);

              case 6:
                ans["size"] = _context2.sent;
                return _context2.abrupt("return", ans);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function parseYaml(_x) {
        return _parseYaml.apply(this, arguments);
      }

      return parseYaml;
    }()
  }, {
    key: "getImageSize",
    value: function getImageSize(src) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;

        img.onload = function () {
          return resolve([img.naturalWidth, img.naturalHeight]);
        };
      });
    }
  }]);

  return MapLoader;
}();

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(MapLoader, "getMapUrl", function (src) {
  return "/static/maps/".concat(src);
});



/***/ }),

/***/ "./src/Components/Viewer/BaseViewer/BaseViewer.js":
/*!********************************************************!*\
  !*** ./src/Components/Viewer/BaseViewer/BaseViewer.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "@babel/runtime/helpers/esm/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "@babel/runtime/helpers/esm/objectWithoutProperties");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-resize-detector */ "react-resize-detector");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_resize_detector__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//========================================================================================

/*                                                                                      *
 *         Based from https://doc.babylonjs.com/resources/babylonjs_and_reactjs         *
 *                                                                                      */
//========================================================================================




var FLEX_STYLE = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
};

var BaseViewer = function BaseViewer(props) {
  var reactCanvas = Object(react__WEBPACK_IMPORTED_MODULE_5__["useRef"])(null);

  var antialias = props.antialias,
      engineOptions = props.engineOptions,
      adaptToDeviceRatio = props.adaptToDeviceRatio,
      sceneOptions = props.sceneOptions,
      onRender = props.onRender,
      onSceneReady = props.onSceneReady,
      is2render = props.is2render,
      sceneFactory = props.sceneFactory,
      rest = _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(props, ["antialias", "engineOptions", "adaptToDeviceRatio", "sceneOptions", "onRender", "onSceneReady", "is2render", "sceneFactory"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      _useState2 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      _useState4 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      scene = _useState4[0],
      setScene = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])({
    width: 100,
    height: 100
  }),
      _useState6 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState5, 2),
      size = _useState6[0],
      setSize = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    if (!loaded) {
      setLoaded(true);
      var engine = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_4__["Engine"](reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);

      var _scene = sceneFactory ? sceneFactory(engine) : new _babylonjs_core__WEBPACK_IMPORTED_MODULE_4__["Scene"](engine, sceneOptions);

      setScene(_scene);

      if (_scene.isReady()) {
        props.onSceneReady(_scene);
      } else {
        _scene.onReadyObservable.addOnce(function (scene) {
          return props.onSceneReady(scene);
        });
      }

      if (!is2render) return;
      engine.runRenderLoop(function () {
        if (typeof onRender === "function") {
          onRender(_scene);
        }

        _scene.render();
      });
    }

    return function () {
      if (scene !== null) scene.dispose();
    };
  }, [reactCanvas]);

  var onResize = function onResize(width, height) {
    setSize({
      width: width,
      height: height <= window.innerHeight ? height : window.innerHeight * 0.85
    });
    scene && scene.getEngine().resize();
  };

  loaded && reactCanvas.current.focus();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
    style: _objectSpread({}, FLEX_STYLE)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("canvas", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    ref: reactCanvas,
    width: size.width,
    height: size.height
  }, rest)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_resize_detector__WEBPACK_IMPORTED_MODULE_6___default.a, {
    handleWidth: true,
    handleHeight: true,
    onResize: onResize
  }));
};

BaseViewer.propTypes = {
  antialias: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  engineOptions: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  adaptToDeviceRatio: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  sceneOptions: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  onSceneReady: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  onRender: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  is2render: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  sceneFactory: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};
BaseViewer.defaultProps = {
  antialias: true,
  onSceneReady: function onSceneReady(scene) {},
  is2render: true
};
/* harmony default export */ __webpack_exports__["default"] = (BaseViewer);

/***/ }),

/***/ "./src/Components/Viewer/Graph/Graph.js":
/*!**********************************************!*\
  !*** ./src/Components/Viewer/Graph/Graph.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classPrivateFieldSet */ "@babel/runtime/helpers/esm/classPrivateFieldSet");
/* harmony import */ var _babel_runtime_helpers_esm_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classPrivateFieldGet */ "@babel/runtime/helpers/esm/classPrivateFieldGet");
/* harmony import */ var _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_5__);






/**
 * Undirected Graph data structure
 */

var _adjMap = new WeakMap();

var _vertices = new WeakMap();

var _edges = new WeakMap();

var Graph = /*#__PURE__*/function () {
  function Graph() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Graph);

    _adjMap.set(this, {
      writable: true,
      value: {}
    });

    _vertices.set(this, {
      writable: true,
      value: {}
    });

    _edges.set(this, {
      writable: true,
      value: {}
    });
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Graph, [{
    key: "addVertex",
    //========================================================================================

    /*                                                                                      *
     *                                      Public API                                      *
     *                                                                                      */
    //========================================================================================
    value: function addVertex(i) {
      if (!(i in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices))) {
        _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices)[i] = {};
        _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[i] = {};
      }
    }
  }, {
    key: "delVertex",
    value: function delVertex(i) {
      var _this = this;

      if (i in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices)) {
        delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices)[i]; // delete neighbors edge properties

        Object.keys(_babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[i]).forEach(function (j) {
          delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(_this, _edges)[Graph.edgeKey(i, j)];
          delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(_this, _edges)[Graph.edgeKey(j, i)];
        });
        delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[i];
        Object.keys(_babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)).forEach(function (j) {
          if (i in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(_this, _adjMap)[j]) {
            delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(_this, _adjMap)[j][i];
          }
        });
      }
    }
    /**
     *
     * If edge already exists, this function overwrites previous edge
     *
     * @param {*} i: vertex id
     * @param {*} j: vertex id
     */

  }, {
    key: "addEdge",
    value: function addEdge(i, j) {
      this.addVertex(i);
      this.addVertex(j);
      _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)[Graph.edgeKey(i, j)] = {};
      _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)[Graph.edgeKey(j, i)] = {};
      _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[i][j] = true;
      _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[j][i] = true;
      return this;
    }
  }, {
    key: "delEdge",
    value: function delEdge(i, j) {
      var ijKey = Graph.edgeKey(i, j);
      var jiKey = Graph.edgeKey(j, i);

      if (ijKey in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges) || jiKey in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)) {
        delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)[ijKey];
        delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)[jiKey];
        delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[i][j];
        delete _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[j][i];
      }
    }
  }, {
    key: "hasEdge",
    value: function hasEdge(i, j) {
      return this.getEdgeProp(i, j).isSome();
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(i) {
      if (i in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)) return Object.keys(_babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap)[i]);
      return [];
    }
  }, {
    key: "getEdgeProp",
    value: function getEdgeProp(i, j) {
      var edgeKey = Graph.edgeKey(i, j);

      if (edgeKey in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)) {
        return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].some(_babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)[edgeKey]);
      }

      return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].none();
    }
  }, {
    key: "setEdgeProp",
    value: function setEdgeProp(i, j, props) {
      var edgeKey = Graph.edgeKey(i, j);

      if (edgeKey in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)) {
        _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges)[edgeKey] = props;
      }

      return this;
    }
  }, {
    key: "getVertexProp",
    value: function getVertexProp(i) {
      if (i in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices)) {
        return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].some(_babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices)[i]);
      }

      return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].none();
    }
  }, {
    key: "setVertexProp",
    value: function setVertexProp(i, props) {
      if (i in _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices)) {
        _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices)[i] = props;
      }

      return this;
    }
  }, {
    key: "getEdges",
    value: function getEdges() {
      return _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _edges);
    }
  }, {
    key: "getVertices",
    value: function getVertices() {
      return _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _vertices);
    }
  }, {
    key: "getAdjMap",
    value: function getAdjMap() {
      return _babel_runtime_helpers_esm_classPrivateFieldGet__WEBPACK_IMPORTED_MODULE_4___default()(this, _adjMap);
    }
  }, {
    key: "setAdjacentMap",
    value: function setAdjacentMap(adjMap) {
      _babel_runtime_helpers_esm_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3___default()(this, _adjMap, adjMap);
    }
  }, {
    key: "setVertices",
    value: function setVertices(vertices) {
      _babel_runtime_helpers_esm_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3___default()(this, _vertices, vertices);
    }
  }, {
    key: "setEdges",
    value: function setEdges(edges) {
      _babel_runtime_helpers_esm_classPrivateFieldSet__WEBPACK_IMPORTED_MODULE_3___default()(this, _edges, edges);
    }
  }]);

  return Graph;
}();

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Graph, "edgeKey", function (i, j) {
  return "".concat(i, "_").concat(j);
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Graph, "key2Edge", function (key) {
  return key.split("_");
});

/* harmony default export */ __webpack_exports__["default"] = (Graph);

/***/ }),

/***/ "./src/Components/Viewer/Graph/GraphEmbedding.js":
/*!*******************************************************!*\
  !*** ./src/Components/Viewer/Graph/GraphEmbedding.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GraphEmbedding; });
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "@babel/runtime/helpers/esm/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Graph */ "./src/Components/Viewer/Graph/Graph.js");
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rbush */ "rbush");
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(rbush__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








var GraphEmbedding = /*#__PURE__*/function () {
  function GraphEmbedding() {
    var _this = this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, GraphEmbedding);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(this, "getVertexByIndex", function (index) {
      return _this.graph.getVertexProp(index).flatMap(function (vertexProp) {
        return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(vertexProp[GraphEmbedding.NAMESPACES.vertex]);
      });
    });

    this.graph = new _Graph__WEBPACK_IMPORTED_MODULE_8__["default"]();
    this.rTreeVertices = new RTreeVertices();
    this.rTreeEdges = new RTreeEdges();
    this.vertexGenerator = 0;
  } //========================================================================================

  /*                                                                                      *
   *                                      Public API                                      *
   *                                                                                      */
  //========================================================================================


  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6___default()(GraphEmbedding, [{
    key: "getAbstractGraph",
    value: function getAbstractGraph() {
      return this.graph;
    }
  }, {
    key: "getAdjMap",
    value: function getAdjMap() {
      return this.graph.getAdjMap();
    }
    /**
     *
     * @param {*} i: Vector3
     * @param {*} iIndex: integer representing index of vertex i (can be undefined)
     *
     */

  }, {
    key: "addVertex",
    value: function addVertex(i, iIndex) {
      var _this2 = this;

      var isCurve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var maybeVertexI = this.getVertex(i);
      maybeVertexI.orElseRun(function () {
        var vertexI = new RVertex(i, iIndex ? iIndex : _this2.vertexGenerator++, isCurve);

        _this2.rTreeVertices.insert(vertexI);

        _this2.graph.addVertex(vertexI.id);

        _this2.graph.setVertexProp(vertexI.id, _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()({}, GraphEmbedding.NAMESPACES.vertex, vertexI));
      });
    }
    /**
     *
     * @param {*} i: Vector3
     */

  }, {
    key: "delVertex",
    value: function delVertex(i) {
      var _this3 = this;

      this.getVertex(i).forEach(function (rVertex) {
        var id = rVertex.id;

        _this3.rTreeVertices.remove(rVertex);

        _this3.graph.delVertex(id);
      });
    }
  }, {
    key: "addEdge",
    value: function addEdge(edge) {
      var _this4 = this;

      var edgeIndexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var _edge = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(edge, 2),
          i = _edge[0],
          j = _edge[1];

      var _edgeIndexes = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(edgeIndexes, 2),
          iIndex = _edgeIndexes[0],
          jIndex = _edgeIndexes[1];

      this.addVertex(i, iIndex);
      this.addVertex(j, jIndex);
      this.getVertex(i).forEach(function (rVertexI) {
        return _this4.getVertex(j).forEach(function (rVertexJ) {
          var edgeIJ = _this4.getEdgeByIndex(rVertexI.id, rVertexJ.id).orLazy(function () {
            return new REdge(rVertexI, rVertexJ);
          });

          var edgeJI = _this4.getEdgeByIndex(rVertexJ.id, rVertexI.id).orLazy(function () {
            return new REdge(rVertexJ, rVertexI);
          });

          _this4.rTreeEdges.remove(edgeIJ, function (a, b) {
            return a.equals(b);
          });

          _this4.rTreeEdges.insert(edgeIJ);

          _this4.graph.addEdge(rVertexI.id, rVertexJ.id); //add edge properties


          _this4.graph.setEdgeProp(rVertexI.id, rVertexJ.id, _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()({}, GraphEmbedding.NAMESPACES.edge, edgeIJ));

          _this4.graph.setEdgeProp(rVertexJ.id, rVertexI.id, _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()({}, GraphEmbedding.NAMESPACES.edge, edgeJI));
        });
      });
      return this;
    }
    /**
     *
     * @param {*} i: Vector3 Position of vertex
     * @param {*} j: Vector3 Position of vertex
     */

  }, {
    key: "delEdge",
    value: function delEdge(i, j) {
      var _this5 = this;

      this.getEdge(i, j).forEach(function (rEdge) {
        var _this5$graph;

        var indexes = rEdge.edge.map(function (v) {
          return v.id;
        });

        (_this5$graph = _this5.graph).delEdge.apply(_this5$graph, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3___default()(indexes));

        _this5.rTreeEdges.remove(rEdge, function (a, b) {
          return a.equals(b);
        });
      });
    }
    /**
     *
     * @param {*} i: Vector3 Position of vertex
     * @param {*} j: Vector3 Position of vertex
     */

  }, {
    key: "hasEdge",
    value: function hasEdge(i, j) {
      var _this6 = this;

      return this.getVertex(i).flatMap(function (rVertexI) {
        return _this6.getVertex(j).map(function (rVertexJ) {
          return _this6.graph.hasEdge(rVertexI.id, rVertexJ.id);
        });
      }).orSome(false);
    }
    /**
     *
     * @param {*} i: Vector3 Position of vertex
     */

  }, {
    key: "getVertex",
    value: function getVertex(i) {
      var queryArray = this.rTreeVertices.search(RVertex.of(i).toBBox());

      if (queryArray.length > 0) {
        return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].some(queryArray.length > 1 ? this.getMinDistanceVertex(queryArray, i) : queryArray[0]);
      }

      return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].none();
    }
  }, {
    key: "getNeighbors",

    /**
     *
     * @param {*} i: Vector3 Position of vertex
     *
     * Returns Array<RVertex>
     */
    value: function getNeighbors(i) {
      var _this7 = this;

      var neighbors = [];
      this.getVertex(i).forEach(function (rVertex) {
        _this7.graph.getNeighbors(rVertex.id).forEach(function (jId) {
          _this7.graph.getVertexProp(jId).forEach(function (vProp) {
            neighbors.push(vProp[GraphEmbedding.NAMESPACES.vertex]);
          });
        });
      });
      return neighbors;
    }
  }, {
    key: "updateVertex",
    value: function updateVertex(vertexIndex, position) {
      var _this8 = this;

      this.graph.getVertexProp(vertexIndex).forEach(function (prop) {
        var rVertex = prop[GraphEmbedding.NAMESPACES.vertex];
        rVertex.position = position;

        _this8.rTreeVertices.remove(rVertex);

        _this8.rTreeVertices.insert(rVertex);

        _this8.graph.getNeighbors(vertexIndex).forEach(function (j) {
          _this8.graph.getEdgeProp(vertexIndex, j).forEach(function (propEdge) {
            var rEdge = propEdge[GraphEmbedding.NAMESPACES.edge];

            _this8.rTreeEdges.remove(rEdge, function (a, b) {
              return a.equals(b);
            }); // rEdge has a pointer to the already altered rVertex


            _this8.rTreeEdges.insert(rEdge);
          });
        });
      });
    }
    /**
     *
     * @param {*} i: Vector3 Position of vertex
     * @param {*} j: Vector3 Position of vertex
     */

  }, {
    key: "getEdge",
    value: function getEdge(i, j) {
      var queryPoint = j ? i.add(j).scale(0.5) : i;
      var queryArray = this.rTreeEdges.search(RVertex.of(queryPoint).toBBox());

      if (queryArray.length > 0) {
        return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].some(queryArray.length > 1 ? this.getMinDistanceEdge(queryArray, queryPoint) : queryArray[0]);
      }

      return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].none();
    }
  }, {
    key: "getEdgeByIndex",
    value: function getEdgeByIndex(iIndex, jIndex) {
      return this.graph.getEdgeProp(iIndex, jIndex).map(function (edgeProp) {
        return edgeProp[GraphEmbedding.NAMESPACES.edge];
      });
    }
    /**
     *
     * @param {*} rEdges: Array<REdge>
     * @param {*} queryPoint: Vector3
     */

  }, {
    key: "getMinDistanceEdge",
    value: function getMinDistanceEdge(rEdges, queryPoint) {
      var minDist = Number.MAX_VALUE;
      var minDistIndex = -1;
      rEdges.forEach(function (rEdge, i) {
        var edge = rEdge.edge.map(function (v) {
          return v.position;
        }).map(_Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].ofBabylon);
        var e = edge[1].sub(edge[0]);
        var x = _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].ofBabylon(queryPoint).sub(edge[0]);
        var dot = e.dot(x) / e.dot(e);
        var dist = x.sub(e.scale(dot)).length();

        if (minDist > dist) {
          minDist = dist;
          minDistIndex = i;
        }
      });
      return rEdges[minDistIndex];
    }
  }, {
    key: "getMinDistanceVertex",
    value: function getMinDistanceVertex(rVertices, queryPoint) {
      var minDist = Number.MAX_VALUE;
      var minDistIndex = -1;
      rVertices.forEach(function (rVertex, i) {
        var vp = _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].ofBabylon(rVertex.position);
        var x = _Math_Vec3__WEBPACK_IMPORTED_MODULE_12__["default"].ofBabylon(queryPoint);
        var dist = vp.sub(x).length();

        if (minDist > dist) {
          minDist = dist;
          minDistIndex = i;
        }
      });
      return rVertices[minDistIndex];
    }
  }, {
    key: "getVertices",
    value: function getVertices() {
      return this.graph.getVertices();
    }
  }, {
    key: "getEdges",
    value: function getEdges() {
      return this.graph.getEdges();
    }
    /**
     *
     * @param {*} data: {adjMap, vertices, edges}
     */

  }, {
    key: "importData",
    value: function importData(data) {
      var _this9 = this;

      var adjMap = data.adjMap; // add vertices data
      // add edges data

      var vertices = _objectSpread({}, data.vertices);

      var edges = _objectSpread({}, data.edges);

      Object.keys(adjMap).forEach(function (i) {
        Object.keys(adjMap[i]).forEach(function (j) {
          var dataVertexI = vertices[i];
          var dataVertexJ = vertices[j];
          var dataEdgeIJ = edges[_Graph__WEBPACK_IMPORTED_MODULE_8__["default"].edgeKey(i, j)];

          _this9.graph.getVertexProp(i).forEach(function (prop) {
            prop[GraphEmbedding.NAMESPACES.vertex].keyValueMap = dataVertexI.keyValueMap;
          });

          _this9.graph.getVertexProp(j).forEach(function (prop) {
            prop[GraphEmbedding.NAMESPACES.vertex].keyValueMap = dataVertexJ.keyValueMap;
          });

          _this9.graph.getEdgeProp(i, j).forEach(function (prop) {
            var rEdge = prop[GraphEmbedding.NAMESPACES.edge];
            rEdge.keyValueMap = dataEdgeIJ.keyValueMap;
            rEdge.weight = dataEdgeIJ.weight;
          });
        });
      });
      this.vertexGenerator = data.vertexGenerator;
    } //========================================================================================

    /*                                                                                      *
     *                                   Static Functions                                   *
     *                                                                                      */
    //========================================================================================

  }]);

  return GraphEmbedding;
}();
/**
 * Should be Immutable vertex object
 */


_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(GraphEmbedding, "NAMESPACES", {
  vertex: "rVertex",
  edge: "rEdge"
});



var RVertex = /*#__PURE__*/function () {
  function RVertex(vertexPosition, vertexId, isCurve) {
    var keyValueMap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, RVertex);

    this.position = vertexPosition;
    this.id = vertexId;
    this.keyValueMap = keyValueMap;
    this.isCurve = isCurve;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6___default()(RVertex, [{
    key: "toBBox",
    value: function toBBox() {
      var position = this.position;
      return {
        minX: position.x - _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4,
        minY: position.y - _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4,
        maxX: position.x + _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4,
        maxY: position.y + _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4
      };
    }
  }], [{
    key: "of",
    value: function of(position) {
      return new RVertex(position);
    }
  }]);

  return RVertex;
}();

var RTreeVertices = /*#__PURE__*/function (_RBush) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_0___default()(RTreeVertices, _RBush);

  var _super = _createSuper(RTreeVertices);

  function RTreeVertices() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, RTreeVertices);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6___default()(RTreeVertices, [{
    key: "toBBox",
    value: function toBBox(rVertex) {
      return rVertex.toBBox();
    }
  }, {
    key: "compareMinX",
    value: function compareMinX(a, b) {
      return a.position.x - b.position.x;
    }
  }, {
    key: "compareMinY",
    value: function compareMinY(a, b) {
      return a.position.y - b.position.y;
    }
  }]);

  return RTreeVertices;
}(rbush__WEBPACK_IMPORTED_MODULE_9___default.a);

var REdge = /*#__PURE__*/function () {
  function REdge(rVertexI, rVertexJ) {
    var keyValueMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, REdge);

    this.edge = [rVertexI, rVertexJ];
    this.keyValueMap = keyValueMap;
    this.weight = 1.0;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6___default()(REdge, [{
    key: "equals",
    value: function equals(b) {
      if (!(b instanceof REdge)) return false;
      var bEdgeIds = b.edge.map(function (v) {
        return v.id;
      });
      return this.edge.map(function (v) {
        return v.id;
      }).map(function (id) {
        return bEdgeIds.includes(id);
      }).every(function (x) {
        return x;
      });
    }
  }, {
    key: "toBBox",
    value: function toBBox() {
      var edge = this.edge;
      return {
        minX: edge.reduce(function (e, v) {
          return Math.min(e, v.position.x - _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4);
        }, Number.MAX_VALUE),
        minY: edge.reduce(function (e, v) {
          return Math.min(e, v.position.y - _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4);
        }, Number.MAX_VALUE),
        maxX: edge.reduce(function (e, v) {
          return Math.max(e, v.position.x + _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4);
        }, Number.MIN_VALUE),
        maxY: edge.reduce(function (e, v) {
          return Math.max(e, v.position.y + _Utils_Constants__WEBPACK_IMPORTED_MODULE_10__["default"].RADIUS / 4);
        }, Number.MIN_VALUE)
      };
    }
  }], [{
    key: "of",
    value: function of(vertexPosI, vertexPosJ) {
      return new REdge(RVertex.of(vertexPosI), RVertex.of(vertexPosJ));
    }
  }]);

  return REdge;
}();

var RTreeEdges = /*#__PURE__*/function (_RBush2) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_0___default()(RTreeEdges, _RBush2);

  var _super2 = _createSuper(RTreeEdges);

  function RTreeEdges() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, RTreeEdges);

    return _super2.apply(this, arguments);
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_6___default()(RTreeEdges, [{
    key: "toBBox",
    value: function toBBox(rEdge) {
      return rEdge.toBBox();
    }
  }, {
    key: "compareMinX",
    value: function compareMinX(a, b) {
      var aMin = a.toBBox().minX;
      var bMin = b.toBBox().minX;
      return aMin - bMin;
    }
  }, {
    key: "compareMinY",
    value: function compareMinY(a, b) {
      var aMin = a.toBBox().minY;
      var bMin = b.toBBox().minY;
      return aMin - bMin;
    }
  }]);

  return RTreeEdges;
}(rbush__WEBPACK_IMPORTED_MODULE_9___default.a);

/***/ }),

/***/ "./src/Components/Viewer/MainView/MainViewActions.js":
/*!***********************************************************!*\
  !*** ./src/Components/Viewer/MainView/MainViewActions.js ***!
  \***********************************************************/
/*! exports provided: ACTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIONS", function() { return ACTIONS; });
/* harmony import */ var _Actions_DragObjectsAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actions/DragObjectsAction */ "./src/Components/Viewer/Actions/DragObjectsAction.js");
/* harmony import */ var _Actions_AddKeyPointAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Actions/AddKeyPointAction */ "./src/Components/Viewer/Actions/AddKeyPointAction.js");
/* harmony import */ var _Actions_BoxRegionAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Actions/BoxRegionAction */ "./src/Components/Viewer/Actions/BoxRegionAction.js");
/* harmony import */ var _Actions_DrawPathAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Actions/DrawPathAction */ "./src/Components/Viewer/Actions/DrawPathAction.js");
/* harmony import */ var _Actions_PolygonRegionAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Actions/PolygonRegionAction */ "./src/Components/Viewer/Actions/PolygonRegionAction.js");
/* harmony import */ var _Actions_OrbitAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Actions/OrbitAction */ "./src/Components/Viewer/Actions/OrbitAction.js");
/* harmony import */ var _Actions_DrawGraphAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Actions/DrawGraphAction */ "./src/Components/Viewer/Actions/DrawGraphAction.js");




 // import DrawWallAction from "../Actions/DrawWallAction";
// import RobotAction from "../Actions/RobotAction";



var ACTIONS = {
  orbit: _Actions_OrbitAction__WEBPACK_IMPORTED_MODULE_5__["default"].getInstance(),
  dragObjects: _Actions_DragObjectsAction__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance(),
  drawPath: _Actions_DrawPathAction__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance(),
  drawBoxRegion: _Actions_BoxRegionAction__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance(),
  addKeyPoint: _Actions_AddKeyPointAction__WEBPACK_IMPORTED_MODULE_1__["default"].getInstance(),
  drawRegion: _Actions_PolygonRegionAction__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance(),
  drawGraph: _Actions_DrawGraphAction__WEBPACK_IMPORTED_MODULE_6__["default"].getInstance() // drawWalls: DrawWallAction.getInstance()
  // addRobot: new RobotAction({
  //   id: "Test",
  //   name: "Test",
  //   robotTree: {
  //     name: "Test",
  //     position: { x: 0, y: 0, z: 0 },
  //     orientation: {
  //       w: 1,
  //       x: 0,
  //       y: 0,
  //       z: 0
  //     },
  //     child: [
  //       {
  //         name: "TestTF",
  //         position: { x: 1, y: 0, z: 1 },
  //         orientation: {
  //           w: Math.cos(-Math.PI / 4),
  //           x: 0,
  //           y: Math.sin(-Math.PI / 4),
  //           z: 0
  //         },
  //         child: []
  //       }
  //     ]
  //   }
  // })

};

/***/ }),

/***/ "./src/Components/Viewer/MainView/MainViewRetriever.js":
/*!*************************************************************!*\
  !*** ./src/Components/Viewer/MainView/MainViewRetriever.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NodeItem/GlobalRef */ "./src/Components/Viewer/NodeItem/GlobalRef.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Utils_AssetsTypesFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utils/AssetsTypesFactory */ "./src/Components/Viewer/Utils/AssetsTypesFactory.js");
/* harmony import */ var _NodeItemFactoryMap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NodeItemFactoryMap */ "./src/Components/Viewer/MainView/NodeItemFactoryMap.js");







var MainViewRetriever = /*#__PURE__*/function () {
  function MainViewRetriever() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MainViewRetriever);
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MainViewRetriever, null, [{
    key: "importScene",
    value: function importScene(mainView) {
      var serverScene = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      console.log("Importing scene...", mainView, serverScene);
      var errors = [];

      if (serverScene.length > 0) {
        importSceneRecursive(mainView, serverScene, parent, errors);
      } else {
        importDefaultScene(mainView);
      }

      console.log("End Importing scene");
      return errors;
    }
  }, {
    key: "importNodeItem",
    value: function importNodeItem(mainView, nodeDict, parent) {
      var is2addInServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var nodeItemClass = _NodeItemFactoryMap__WEBPACK_IMPORTED_MODULE_5__["default"][nodeDict.type]; //retrieve default export

      if (nodeItemClass) {
        mainView.getSceneMemory().forEach(function (_ref) {
          var scene = _ref.scene;
          var nodeItem = nodeItemClass.ofDict(scene, nodeDict, mainView); // pseudo lazy migration of isVisible prop

          var isVisible = nodeDict.isVisible === undefined ? true : nodeDict.isVisible;
          nodeItem.mesh.setEnabled(isVisible);
          mainView.getNodeFromTree(parent).forEach(function (treeNode) {
            nodeItem.mesh.parent = treeNode.item.mesh;
          });
          mainView.addNodeItem2Tree(nodeItem, parent, is2addInServer, isVisible, false);
        });
      }
    }
  }]);

  return MainViewRetriever;
}();

function isAsset(nodeDict) {
  return nodeDict.type in _Utils_AssetsTypesFactory__WEBPACK_IMPORTED_MODULE_4__["ASSETS_TYPES"];
}

function importAsset(mainView, nodeDict, parent, errors) {
  var assetType = nodeDict.type;
  var assetName = monet__WEBPACK_IMPORTED_MODULE_3__["Maybe"].fromNull(nodeDict.assetName).orSome(nodeDict.name);
  var assetActionMap = mainView.getAssetsActionMap(); // legacy

  var retrievedAction = monet__WEBPACK_IMPORTED_MODULE_3__["Maybe"].fromNull(assetActionMap[assetName]).orLazy(function () {
    return assetActionMap[assetName.split(".")[0]];
  });

  if (!retrievedAction) {
    errors.push({
      cause: "Asset of type ".concat(assetType, " with name ").concat(assetName, ", was not found"),
      solution: "please upload ".concat(assetType, " ").concat(assetName)
    });
    return;
  }

  retrievedAction.memory["parentObj"] = {
    parent: parent
  };
  retrievedAction.memory["nodeItemDict"] = nodeDict;
  retrievedAction.memory["assetName"] = assetName;
  retrievedAction.memory["name"] = nodeDict.name;
  retrievedAction.memory["isImport"] = true;
  retrievedAction.memory["isVisible"] = nodeDict.isVisible === undefined ? true : nodeDict.isVisible;
  retrievedAction.action(mainView);
}

function importSceneRecursive(mainView, arrayTree) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var errors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  if (!arrayTree) return;
  var sortArrayTree = arrayTree.sort(function (a, b) {
    if (a.item.type === "GlobalRef") return -1;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  sortArrayTree.forEach(function (node) {
    if (isAsset(node.item)) {
      importAsset(mainView, node.item, parent, errors);
    } else {
      MainViewRetriever.importNodeItem(mainView, node.item, parent);
    }

    if (node.children.length > 0) {
      importSceneRecursive(mainView, node.children, node.name, errors);
    }
  });
}

function importDefaultScene(mainView) {
  mainView.getSceneMemory().forEach(function (memory) {
    var scene = memory.scene;
    var send2server = true;
    mainView.addNodeItem2Tree(_NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_2__["default"].ofDict(scene), null, send2server);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (MainViewRetriever);

/***/ }),

/***/ "./src/Components/Viewer/MainView/NodeItemFactoryMap.js":
/*!**************************************************************!*\
  !*** ./src/Components/Viewer/MainView/NodeItemFactoryMap.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NodeItem/GlobalRef */ "./src/Components/Viewer/NodeItem/GlobalRef.js");
/* harmony import */ var _NodeItem_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../NodeItem/Box */ "./src/Components/Viewer/NodeItem/Box.js");
/* harmony import */ var _NodeItem_KeyPoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NodeItem/KeyPoint */ "./src/Components/Viewer/NodeItem/KeyPoint.js");
/* harmony import */ var _NodeItem_Path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NodeItem/Path */ "./src/Components/Viewer/NodeItem/Path.js");
/* harmony import */ var _NodeItem_Wall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../NodeItem/Wall */ "./src/Components/Viewer/NodeItem/Wall.js");
/* harmony import */ var _NodeItem_BoxRegion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../NodeItem/BoxRegion */ "./src/Components/Viewer/NodeItem/BoxRegion.js");
/* harmony import */ var _NodeItem_PolygonRegion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../NodeItem/PolygonRegion */ "./src/Components/Viewer/NodeItem/PolygonRegion.js");
/* harmony import */ var _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../NodeItem/GraphItem */ "./src/Components/Viewer/NodeItem/GraphItem.js");








var NODE_ITEM_FACTORY_MAP = {
  GlobalRef: _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_0__["default"],
  Box: _NodeItem_Box__WEBPACK_IMPORTED_MODULE_1__["default"],
  KeyPoint: _NodeItem_KeyPoint__WEBPACK_IMPORTED_MODULE_2__["default"],
  Path: _NodeItem_Path__WEBPACK_IMPORTED_MODULE_3__["default"],
  Wall: _NodeItem_Wall__WEBPACK_IMPORTED_MODULE_4__["default"],
  BoxRegion: _NodeItem_BoxRegion__WEBPACK_IMPORTED_MODULE_5__["default"],
  PolygonRegion: _NodeItem_PolygonRegion__WEBPACK_IMPORTED_MODULE_6__["default"],
  GraphItem: _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_7__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (NODE_ITEM_FACTORY_MAP);

/***/ }),

/***/ "./src/Components/Viewer/Math/Mat3.js":
/*!********************************************!*\
  !*** ./src/Components/Viewer/Math/Mat3.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Vec3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_3__);





var Mat3 = /*#__PURE__*/function () {
  function Mat3(v1, v2, v3) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Mat3);

    var v = [v1, v2, v3];

    for (var i = 0; i < v.length; i++) {
      if (v[i].constructor !== Array || v[i].length < 3) throw Error("One of the inputs is not a array");
    }

    this.mat3 = v.map(function (x) {
      return new _Vec3__WEBPACK_IMPORTED_MODULE_2__["default"](x);
    });
  }
  /**
   * Matrix prod with  3-vector
   * @param {*} v: 3-vector
   *
   * returns 3-vector
   */


  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Mat3, [{
    key: "prodVec",
    value: function prodVec(v) {
      var ans = new _Vec3__WEBPACK_IMPORTED_MODULE_2__["default"]([0, 0, 0]);

      for (var i = 0; i < this.mat3.length; i++) {
        ans = ans.add(this.mat3[i].scale(v.vec3[i]));
      }

      return ans;
    }
    /**
     * Matrix transpose prod with 3-vec
     * @param {*} v : 3-vector
     */

  }, {
    key: "dotVec",
    value: function dotVec(v) {
      var ans = [0, 0, 0];

      for (var i = 0; i < this.mat3.length; i++) {
        ans[i] = this.mat3[i].dot(v);
      }

      return new _Vec3__WEBPACK_IMPORTED_MODULE_2__["default"](ans);
    }
  }, {
    key: "prod",
    value: function prod(m) {
      var u = this.prodVec(m.mat3[0]);
      var v = this.prodVec(m.mat3[1]);
      var w = this.prodVec(m.mat3[2]);
      return new Mat3(u.vec3, v.vec3, w.vec3);
    }
  }, {
    key: "dot",
    value: function dot(m) {
      var u = this.dotVec(m.mat3[0]);
      var v = this.dotVec(m.mat3[1]);
      var w = this.dotVec(m.mat3[2]);
      return new Mat3(u.vec3, v.vec3, w.vec3);
    }
  }, {
    key: "map",
    value: function map(f) {
      var u = this.mat3[0].map(f);
      var v = this.mat3[1].map(f);
      var w = this.mat3[2].map(f);
      return new Mat3(u.vec3, v.vec3, w.vec3);
    }
  }, {
    key: "equals",
    value: function equals(mat) {
      if (mat.constructor !== this.constructor) return false;
      return this.mat3.map(function (v, index) {
        return v.equals(mat.mat3[index]);
      }).reduce(function (e, v) {
        return e && v;
      }, true);
    }
  }], [{
    key: "ofBabylonMatrix",
    value: function ofBabylonMatrix(babylonMat) {
      var arrayMat = _babylonjs_core__WEBPACK_IMPORTED_MODULE_3__["Matrix"].GetAsMatrix3x3(babylonMat);
      var u = [arrayMat[0], arrayMat[1], arrayMat[2]];
      var v = [arrayMat[3], arrayMat[4], arrayMat[5]];
      var w = [arrayMat[6], arrayMat[7], arrayMat[8]];
      return new Mat3(u, v, w);
    }
  }, {
    key: "of",
    value: function of(v1, v2, v3) {
      return new Mat3(v1, v2, v3);
    }
  }, {
    key: "eye",
    value: function eye() {
      return new Mat3([1, 0, 0], [0, 1, 0], [0, 0, 1]);
    }
  }]);

  return Mat3;
}();

/* harmony default export */ __webpack_exports__["default"] = (Mat3);

/***/ }),

/***/ "./src/Components/Viewer/Math/Vec2.js":
/*!********************************************!*\
  !*** ./src/Components/Viewer/Math/Vec2.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);




//immutable class, not managing exceptions
var Vec2 = /*#__PURE__*/function () {
  function Vec2(x, y) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Vec2);

    this.vec = [x, y].map(function (z) {
      return z ? z : 0;
    });
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Vec2, [{
    key: "toArray",
    value: function toArray() {
      return this.vec;
    }
  }, {
    key: "add",
    value: function add(y) {
      return this.op(y, function (a, b) {
        return a + b;
      });
    }
  }, {
    key: "sub",
    value: function sub(y) {
      return this.op(y, function (a, b) {
        return a - b;
      });
    }
  }, {
    key: "mul",
    value: function mul(y) {
      return this.op(y, function (a, b) {
        return a * b;
      });
    }
  }, {
    key: "div",
    value: function div(y) {
      return this.op(y, function (a, b) {
        return a / b;
      });
    }
  }, {
    key: "dot",
    value: function dot(y) {
      return this.vec.reduce(function (acc, v, i) {
        return acc + v * y.vec[i];
      }, 0);
    }
  }, {
    key: "prod",
    value: function prod(y) {
      return new Vec2(this.x * y.x - this.y * y.y, this.x * y.y + this.y * y.x);
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.dot(this));
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.scale(1 / this.length());
    }
  }, {
    key: "dual",
    value: function dual() {
      return new Vec2(-this.y, this.x);
    }
  }, {
    key: "sym",
    value: function sym() {
      return this.scale(-1);
    }
  }, {
    key: "conj",
    value: function conj() {
      return new Vec2(this.x, -this.y);
    }
  }, {
    key: "scale",
    value: function scale(r) {
      return this.map(function (z) {
        return z * r;
      });
    }
  }, {
    key: "map",
    value: function map(lambda) {
      return Vec2.fromArray(this.vec.map(lambda));
    }
    /**
     * Returns a vec2 from the operation function bilambda
     * @param {*} y
     * @param {*} biLambda
     */

  }, {
    key: "op",
    value: function op(y, biLambda) {
      return Vec2.fromArray(this.vec.map(function (v, i) {
        return biLambda(v, y.vec[i]);
      }));
    }
  }, {
    key: "reduce",
    value: function reduce(fold, initial) {
      return this.vec.reduce(fold, initial);
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        x: this.x,
        y: this.y
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return "{x: ".concat(this.x, ", y:").concat(this.y, "}");
    }
  }, {
    key: "x",
    get: function get() {
      return this.vec[0];
    }
  }, {
    key: "y",
    get: function get() {
      return this.vec[1];
    }
  }], [{
    key: "fromArray",
    value: function fromArray(array) {
      if (array.length < 2) throw new Error("array must have size > 2");
      return new Vec2(array[0], array[1]);
    }
  }, {
    key: "of",
    value: function of(x, y) {
      return new Vec2(x, y);
    }
  }]);

  return Vec2;
}();

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Vec2, "ZERO", new Vec2(0, 0));

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Vec2, "e1", new Vec2(1, 0));

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Vec2, "e2", new Vec2(0, 1));

/* harmony default export */ __webpack_exports__["default"] = (Vec2);

/***/ }),

/***/ "./src/Components/Viewer/Math/Vec3.js":
/*!********************************************!*\
  !*** ./src/Components/Viewer/Math/Vec3.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Vec2 */ "./src/Components/Viewer/Math/Vec2.js");






/**
 * Class that describes immutable 3-vectors
 */

var Vec3 = /*#__PURE__*/function () {
  //no for's because performance
  function Vec3(array) {
    var _this = this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Vec3);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "normalize", function () {
      var l = _this.length();

      if (l === 0) throw new Error("You can't normalize a zero norm vector");
      return _this.scale(1 / l);
    });

    if (array.constructor !== Array || array.length < 3) throw new Error("".concat(array, " is not a valid 3-vector"));
    this.vec3 = _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(array);
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Vec3, [{
    key: "add",
    value: function add(x) {
      return this.op(x, function (a, b) {
        return a + b;
      });
    }
  }, {
    key: "sub",
    value: function sub(x) {
      return this.op(x, function (a, b) {
        return a - b;
      });
    }
  }, {
    key: "mul",
    value: function mul(x) {
      return this.op(x, function (a, b) {
        return a * b;
      });
    }
  }, {
    key: "op",
    value: function op(x, operation) {
      var ans = [];
      ans[0] = operation(this.vec3[0], x.vec3[0]);
      ans[1] = operation(this.vec3[1], x.vec3[1]);
      ans[2] = operation(this.vec3[2], x.vec3[2]);
      return new Vec3(ans);
    }
  }, {
    key: "scale",
    value: function scale(r) {
      return this.map(function (x) {
        return x * r;
      });
    }
  }, {
    key: "dot",
    value: function dot(x) {
      return this.vec3[0] * x.vec3[0] + this.vec3[1] * x.vec3[1] + this.vec3[2] * x.vec3[2];
    }
  }, {
    key: "map",
    value: function map(f) {
      return new Vec3(this.vec3.map(f));
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.dot(this));
    }
  }, {
    key: "toBabylon",
    value: function toBabylon() {
      return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_4__["Vector3"](this.vec3[0], this.vec3[1], this.vec3[2]);
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.vec3;
    }
  }, {
    key: "toVec2",
    value: function toVec2() {
      return new _Vec2__WEBPACK_IMPORTED_MODULE_5__["default"](this.x, this.y);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      if (v.constructor !== this.constructor) return false;
      return v.vec3.map(function (x, index) {
        return v.vec3[index] === x;
      }).reduce(function (e, v) {
        return e && v;
      }, true);
    }
  }, {
    key: "reduce",
    value: function reduce(binary, initialValue) {
      return this.vec3.reduce(binary, initialValue);
    }
  }, {
    key: "getMax",
    value: function getMax() {
      return this.reduce(function (a, b) {
        return Math.max(a, b);
      }, -Number.MAX_VALUE);
    }
  }, {
    key: "getMin",
    value: function getMin() {
      return this.reduce(function (a, b) {
        return Math.min(a, b);
      }, Number.MAX_VALUE);
    }
  }, {
    key: "someNaNOrInfinite",
    value: function someNaNOrInfinite() {
      return this.vec3.some(function (x) {
        return isNaN(x) || !isFinite(x);
      });
    }
  }, {
    key: "x",
    get: function get() {
      return this.vec3[0];
    }
  }, {
    key: "y",
    get: function get() {
      return this.vec3[1];
    }
  }, {
    key: "z",
    get: function get() {
      return this.vec3[2];
    }
  }], [{
    key: "ofBabylon",
    value: function ofBabylon(babylon) {
      return new Vec3([babylon.x, babylon.y, babylon.z]);
    }
  }, {
    key: "of",
    value: function of(array) {
      return array ? new Vec3(array) : new Vec3([0, 0, 0]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      return Vec3.of(array);
    }
  }, {
    key: "random",
    value: function random() {
      return new Vec3([1, 2, 3].map(Math.random()));
    }
    /**
     *
     * @param {*} u: Vec3
     */

  }, {
    key: "orthogonalBasisFromVector",
    value: function orthogonalBasisFromVector(u) {
      var identityMatrix = [Vec3.e1, Vec3.e2, Vec3.e3]; //choose pivot

      var pivot = 0;

      for (var i = 0; i < 3; i++) {
        if (u.vec3[i] !== 0) {
          pivot = i;
          break;
        }
      }

      var v = identityMatrix[(pivot + 1) % 3].add(identityMatrix[pivot].scale(-u.vec3[(pivot + 1) % 3] / u.vec3[pivot]));
      v = v.normalize();
      var w = identityMatrix[(pivot + 2) % 3].add(identityMatrix[pivot].scale(-u.vec3[(pivot + 2) % 3] / u.vec3[pivot]));
      w = w.normalize();
      w = w.sub(v.scale(v.dot(w)));
      return {
        u: u.normalize(),
        v: v,
        w: w.normalize()
      };
    }
  }]);

  return Vec3;
}();

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Vec3, "ONES", Vec3.of([1, 1, 1]));

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Vec3, "ZERO", Vec3.of([0, 0, 0]));

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Vec3, "e1", new Vec3([1, 0, 0]));

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Vec3, "e2", new Vec3([0, 1, 0]));

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Vec3, "e3", new Vec3([0, 0, 1]));

/* harmony default export */ __webpack_exports__["default"] = (Vec3);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/AssetNodeItem.js":
/*!*********************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/AssetNodeItem.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var AssetNodeItem = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3___default()(AssetNodeItem, _NodeItem);

  var _super = _createSuper(AssetNodeItem);

  function AssetNodeItem(mesh, assetName) {
    var _this;

    var keyValueMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AssetNodeItem);

    _this = _super.call(this, mesh, keyValueMap);
    _this.assetName = assetName;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AssetNodeItem, [{
    key: "toDict",
    value: function toDict() {
      var ans = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(AssetNodeItem.prototype), "toDict", this).call(this);

      ans.assetName = this.assetName;
      return ans;
    }
  }]);

  return AssetNodeItem;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (AssetNodeItem);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/Box.js":
/*!***********************************************!*\
  !*** ./src/Components/Viewer/NodeItem/Box.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_11__);









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var Box = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Box, _NodeItem);

  var _super = _createSuper(Box);

  function Box(mesh) {
    var _this;

    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Box.DEFAULT_SIZE;
    var keyValueMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Box);

    _this = _super.call(this, mesh, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getType", function () {
      return Box.TYPE;
    });

    _this.size = size;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Box, [{
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Box.prototype), "toDict", this).call(this);

      dict.size = this.size;
      return dict;
    }
  }, {
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return Box.ofDict(scene, dict, mainView);
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var maybeDict = monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].fromNull(dict);
      var size = maybeDict.flatMap(function (z) {
        return monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].fromNull(z.size);
      }).orSome(Box.DEFAULT_SIZE);
      var name = maybeDict.flatMap(function (z) {
        return monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].fromNull(z.name);
      }).orSome("Box".concat(Math.floor(Math.random() * 1e3)));
      var keyValueMap = maybeDict.flatMap(function (d) {
        return monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].fromNull(d.keyValueMap);
      }).orUndefined();
      var boxMesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].createBox(scene, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_11__["Color3"](Math.random(), Math.random(), Math.random()), size, name);
      _NodeItem__WEBPACK_IMPORTED_MODULE_8__["default"].mapDict2Mesh(dict, boxMesh);
      return new Box(boxMesh, size, keyValueMap);
    }
  }]);

  return Box;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Box, "DEFAULT_SIZE", 0.5);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Box, "TYPE", "Box");

/* harmony default export */ __webpack_exports__["default"] = (Box);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/BoxRegion.js":
/*!*****************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/BoxRegion.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lodash.isequal */ "lodash.isequal");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_15__);










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var BoxRegion = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5___default()(BoxRegion, _NodeItem);

  var _super = _createSuper(BoxRegion);

  function BoxRegion(mesh, corners, keyPoints) {
    var _this;

    var keyValueMap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, BoxRegion);

    _this = _super.call(this, mesh, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getType", function () {
      return BoxRegion.TYPE;
    });

    _this.corners = corners; // in local coordinates, in relation to center of mass

    _this.keyPoints = keyPoints;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(BoxRegion, [{
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(BoxRegion.prototype), "toDict", this).call(this);

      dict.corners = this.corners;
      return dict;
    }
  }, {
    key: "toForm",
    value: function toForm() {
      var schema = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(BoxRegion.prototype), "toForm", this).call(this);

      schema.jsonSchema.properties["dimensions"] = {
        type: "object",
        title: "Dimensions",
        properties: {
          lower: {
            type: "object",
            title: "Lower Corner",
            properties: {
              x: {
                type: "number",
                title: "x"
              },
              y: {
                type: "number",
                title: "y"
              }
            }
          },
          size: {
            type: "object",
            title: "Size",
            properties: {
              scaleX: {
                type: "number",
                title: "scale-X"
              },
              scaleY: {
                type: "number",
                title: "scale-Y"
              }
            }
          }
        }
      };
      schema.uiSchema["dimensions"] = {
        "ui:widget": "collapse"
      }; // global ref coordinates

      var worldCorners = this.keyPoints.map(function (x) {
        return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].getWorldCoordinates(x, x.position);
      }).map(function (x) {
        return x.toArray();
      });
      schema.data["dimensions"] = {
        lower: {
          x: worldCorners[0][0],
          y: worldCorners[0][1]
        },
        size: {
          // TODO: warning, doesn't take into account possible scaling
          scaleX: this.corners[1][0] - this.corners[0][0],
          scaleY: this.corners[1][1] - this.corners[0][1]
        }
      };
      return schema;
    }
  }, {
    key: "ofForm",
    value: function ofForm(form) {
      var oldForm = this.toForm();
      var oldDimensions = oldForm.data.dimensions;

      if (lodash_isequal__WEBPACK_IMPORTED_MODULE_15___default()(oldDimensions, form.dimensions)) {
        _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(BoxRegion.prototype), "ofForm", this).call(this, form);
      } else {
        this.ofFormDimensions(form);
      }
    }
  }, {
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return BoxRegion.ofDict(scene, dict, mainView);
    }
  }, {
    key: "ofFormDimensions",
    value: function ofFormDimensions(form) {
      var _this2 = this;

      var newLowerPositionInWorldCoordinates = _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"].FromArray([form.dimensions.lower.x, form.dimensions.lower.y, 0].map(Number.parseFloat));
      var newLocalDimensions = [form.dimensions.size.scaleX, form.dimensions.size.scaleY].map(Number.parseFloat);
      var localLowerPosition = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].getLocalCoordinatesFromWorld(this.keyPoints[0], newLowerPositionInWorldCoordinates).toArray();

      var notify = function notify(i) {
        return _this2.keyPoints[i].observers.notifyObservers({
          updatedPointMesh: _this2.keyPoints[i],
          is2updateServer: false
        });
      };

      this.keyPoints[0].position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"](localLowerPosition[0], localLowerPosition[1], this.keyPoints[0].position.z);
      notify(0);
      this.keyPoints[1].position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"](localLowerPosition[0] + newLocalDimensions[0], localLowerPosition[1] + newLocalDimensions[1], this.keyPoints[1].position.z);
      notify(1);
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!dict) throw "null dictionary describing Box region";
      var name = monet__WEBPACK_IMPORTED_MODULE_12__["Maybe"].fromNull(dict.name).orSome("BoxRegion".concat(Math.floor(Math.random() * 1e3)));
      var mesh = createBoxRegionMesh(dict, name, scene);
      var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["StandardMaterial"]("BoxRegionMaterial".concat(name), scene);
      var color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Color3"](dict.color[0], dict.color[1], dict.color[2]);
      material.diffuseColor = color;
      material.emissiveColor = color;
      material.backFaceCulling = false;
      mesh.material = material;
      mesh.visibility = 0.25;
      monet__WEBPACK_IMPORTED_MODULE_12__["Maybe"].fromNull(dict.quaternion).forEach(function (quaternion) {
        var babylonQuaternion = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Quaternion"](quaternion[1], quaternion[2], quaternion[3], quaternion[0]);
        mesh.rotationQuaternion = babylonQuaternion.normalize();
      });
      var keyPoints = createPlaceHolderKeyPoints(scene, dict.corners.map(function (x) {
        return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
      }), mesh, mainView);
      return new BoxRegion(mesh, dict.corners, keyPoints, dict.keyValueMap);
    }
  }]);

  return BoxRegion;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_9__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(BoxRegion, "TYPE", "BoxRegion");

var RADIUS = _Utils_Constants__WEBPACK_IMPORTED_MODULE_13__["default"].RADIUS;
var FACES = [[0, 1, 2], [2, 3, 0], [4, 5, 6], [6, 7, 4], [0, 1, 5], [5, 4, 0], [3, 2, 6], [6, 7, 3], [1, 2, 6], [6, 5, 1], [0, 3, 7], [7, 4, 0]];
/**
 * @param boxRegion: {position: 3-array, corners: array of 3-arrays }
 */

function createBoxRegionMesh(boxRegion, name, scene) {
  // centered corners vec
  var corners = boxRegion.corners.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
  });
  var d = corners[1].subtract(corners[0]);
  var middlePoint = _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(boxRegion.position).toBabylon();
  var shape = [corners[0], corners[0].add(_babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Axis"].X.scale(d.x)), corners[0].add(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"](d.x, d.y, 0)), corners[0].add(_babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Axis"].Y.scale(d.y))];
  var h = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"](0, 0, d.z);
  var boxRegionMesh = {
    positions: [shape[0], shape[1], shape[2], shape[3], shape[0].add(h), shape[1].add(h), shape[2].add(h), shape[3].add(h)],
    faces: FACES
  };
  var mesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].meshFromPositionAndFaces(name, scene, boxRegionMesh.positions, boxRegionMesh.faces);
  mesh.position = middlePoint;
  return mesh;
}

function createNewMeshFromOldUsingNewBox(newBox, scene, mesh, item) {
  var average = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].pointAverageVec3(newBox.corners.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x);
  }));
  newBox.position = average.toArray();
  newBox.corners = newBox.corners.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).sub(average).toArray();
  });
  var newMesh = createBoxRegionMesh(newBox, mesh.name, scene);
  newMesh.position = mesh.position;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.locallyTranslate(average.toBabylon());
  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.parent = mesh.parent;
  item.mesh = newMesh;
  item.corners = newBox.corners;

  var childrenCopy = _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(mesh._children);

  childrenCopy.forEach(function (c) {
    mesh.removeChild(c);
    c.parent = newMesh;
  });
  item.keyPoints.forEach(function (k, j) {
    k.position = _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(newBox.corners[j]).toBabylon();
  }); // dispose old mesh

  mesh.dispose();
}

var getKeyPointObserverFunction = function getKeyPointObserverFunction(mainView, scene) {
  return function (_ref) {
    var updatedPointMesh = _ref.updatedPointMesh,
        is2updateServer = _ref.is2updateServer;
    mainView.getNodeFromTree(updatedPointMesh.parent.name).forEach(function (boxRegionTreeNode) {
      var index = updatedPointMesh.index;
      var item = boxRegionTreeNode.item;
      var mesh = item.mesh;
      var name = mesh.name;
      var newBox = {
        position: _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].ofBabylon(mesh.position).toArray(),
        corners: item.corners
      };
      newBox.corners[index] = _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].ofBabylon(updatedPointMesh.position).toArray();
      createNewMeshFromOldUsingNewBox(newBox, scene, mesh, item);
      mainView.addGizmo();

      if (is2updateServer) {
        mainView.updateNodeInServer(name);
        mainView.getNodeFromTree(name).forEach(function (node) {
          mainView.setProperties(node.item.toForm());
        });
      }
    });
  };
};

var createPlaceHolderKeyPoints = function createPlaceHolderKeyPoints(scene, corners, boxRegionMesh, mainView) {
  var keyPoints = [];
  corners.forEach(function (corner, i) {
    var p = corner;
    var keyPoint = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].createSphere(scene, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Color3"](0.25, 0.25, 0.25), RADIUS, "".concat(boxRegionMesh.name, "keyPoint").concat(i), true);
    keyPoint.parent = boxRegionMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Observable"]();
    keyPoint.observers.add(getKeyPointObserverFunction(mainView, scene));
    keyPoints.push(keyPoint);
  });
  return keyPoints;
};

/* harmony default export */ __webpack_exports__["default"] = (BoxRegion);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/GlobalRef.js":
/*!*****************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/GlobalRef.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_12__);









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





 // ROS/RVIZ default referential

var THETA = -Math.PI / 2;
var ROS_ORIGIN = {
  position: [0, 0, 0],
  scaling: [1, -1, 1],
  quaternion: [Math.cos(THETA / 2), Math.sin(THETA / 2), 0, 0]
};

var GlobalRef = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(GlobalRef, _NodeItem);

  var _super = _createSuper(GlobalRef);

  function GlobalRef(mesh) {
    var _this;

    var keyValueMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GlobalRef);

    _this = _super.call(this, mesh, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getType", function () {
      return GlobalRef.TYPE;
    });

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GlobalRef, [{
    key: "toForm",
    value: function toForm() {
      var form = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(GlobalRef.prototype), "toForm", this).call(this);

      form.uiSchema.name = {
        "ui:disabled": true
      };
      return form;
    }
  }, {
    key: "getMouseContextActions",
    value: function getMouseContextActions() {
      return [];
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var rosOrigin = GlobalRef.getRosOrigin(scene);
      var globalRefMesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].referentialBuilder(scene).name(GlobalRef.NAME).isPickable(true).boxParams({
        isVisible: true,
        size: 0.25
      }).build();
      globalRefMesh.parent = rosOrigin;
      _NodeItem__WEBPACK_IMPORTED_MODULE_8__["default"].mapDict2Mesh(dict, globalRefMesh);
      return new GlobalRef(globalRefMesh, monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(dict).flatMap(function (d) {
        return monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(d.keyValueMap);
      }).orUndefined());
    }
  }, {
    key: "getRosOrigin",
    value: function getRosOrigin(scene) {
      var rosOrigin = _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["MeshBuilder"].CreateBox("ROS_ORIGIN", {
        size: 1e-3
      }, scene);
      rosOrigin.isVisible = false;
      rosOrigin.isPickable = false;
      rosOrigin.position = _Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].of(ROS_ORIGIN.position).toBabylon();
      rosOrigin.scaling = _Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].of(ROS_ORIGIN.scaling).toBabylon();
      var quaternion = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Quaternion"](ROS_ORIGIN.quaternion[1], ROS_ORIGIN.quaternion[2], ROS_ORIGIN.quaternion[3], ROS_ORIGIN.quaternion[0]);
      rosOrigin.rotationQuaternion = quaternion.normalize();
      return rosOrigin;
    }
    /**
     *
     * @param {*} x: Babylon Vector3 in World coordinates
     *
     * returns Babylon Vector3 vector in ROS coordinates
     */

  }, {
    key: "inverseCoordinates",
    value: function inverseCoordinates(x) {
      /**
       * Solves RS\eta + p = x
       *
       * \eta = S^(⁻1)R^T(x-p)
       */
      var quaternion = ROS_ORIGIN.quaternion;
      var rotationMatrix = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].getRotationMatrix({
        rotationQuaternion: new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Quaternion"](quaternion[1], quaternion[2], quaternion[3], quaternion[0])
      });
      var scaling = _Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].of(ROS_ORIGIN.scaling).map(function (z) {
        return 1 / z;
      });
      var pos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].of(ROS_ORIGIN.position);
      var result = scaling.mul(rotationMatrix.dotVec(_Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].ofBabylon(x).sub(pos)));
      return result.map(function (z) {
        return Math.abs(z) < 1e-5 ? 0 : z;
      }).toBabylon();
    }
    /**
     *
     * @param {*} x: Babylon Vector3 in ROS coordinates
     *
     * returns Babylon Vector3 vector in World coordinates
     */

  }, {
    key: "forwardCoordinates",
    value: function forwardCoordinates(x) {
      /**
       * computes RS\eta + p = x
       */
      var quaternion = ROS_ORIGIN.quaternion;
      var rotationMatrix = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_10__["default"].getRotationMatrix({
        rotationQuaternion: new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Quaternion"](quaternion[1], quaternion[2], quaternion[3], quaternion[0])
      });
      var scaling = _Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].of(ROS_ORIGIN.scaling);
      var pos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].of(ROS_ORIGIN.position);
      var result = rotationMatrix.prodVec(scaling.mul(_Math_Vec3__WEBPACK_IMPORTED_MODULE_9__["default"].ofBabylon(x))).add(pos);
      return result.map(function (z) {
        return Math.abs(z) < 1e-5 ? 0 : z;
      }).toBabylon();
    }
  }]);

  return GlobalRef;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(GlobalRef, "TYPE", "GlobalRef");

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(GlobalRef, "NAME", "Global ref");

/* harmony default export */ __webpack_exports__["default"] = (GlobalRef);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/GraphItem.js":
/*!*****************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/GraphItem.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "@babel/runtime/helpers/esm/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ "@babylonjs/core/Maths/math");
/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _Graph_GraphEmbedding__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Graph/GraphEmbedding */ "./src/Components/Viewer/Graph/GraphEmbedding.js");
/* harmony import */ var _Graph_Graph__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Graph/Graph */ "./src/Components/Viewer/Graph/Graph.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_22__);












function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }













/**
 * One graph per scene
 */

var GraphItem = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7___default()(GraphItem, _NodeItem);

  var _super = _createSuper(GraphItem);

  function GraphItem(scene, mainView) {
    var _this;

    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : GraphItem.NAME;
    var keyValueMap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, GraphItem);

    var sceneId = scene.getUniqueId(); // super() must be called before using _this_.

    if (sceneId in graphItemInstances && !graphItemInstances[sceneId].mesh.isDisposed()) {
      return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(_this, graphItemInstances[sceneId]);
    }

    var graphPlaceHolder = getGraphPlaceHolder(scene, name);

    graphPlaceHolder.onClick = function () {
      return _this.graphFormMapper = _this.getDefaultFormMapper();
    };

    _this = _super.call(this, graphPlaceHolder, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getType", function () {
      return GraphItem.TYPE;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "createVertexMesh", function (rVertex) {
      var isCurve = rVertex.isCurve;
      var vertexMesh = GraphItem.getVertexMesh(_this.scene, rVertex.position, isCurve ? _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Blue() : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray(), isCurve ? 2 * _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS / 3 : _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS);
      vertexMesh.parent = _this.mesh;
      vertexMesh.vertexId = rVertex.id;

      _this.addObserver2VertexMesh(vertexMesh);

      _this.addOnClickVertex(vertexMesh);

      _this.meshByVertexId[rVertex.id] = vertexMesh;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getVertexObs", function () {
      return function (_ref) {
        var updatedPointMesh = _ref.updatedPointMesh,
            is2updateServer = _ref.is2updateServer;
        var position = updatedPointMesh.position;
        var id = updatedPointMesh.vertexId;

        _this.updateVertexPosition(id, position, is2updateServer);

        _this.updateCurvedNeighbors([id], is2updateServer);

        if (is2updateServer) {
          _this.graphFormMapper = _this.getToFormVertex(updatedPointMesh);

          _this.mainView.setProperties(_this.toForm());
        }
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getEdgeObs", function () {
      return function (_ref2) {
        var updatedPointMesh = _ref2.updatedPointMesh,
            is2updateServer = _ref2.is2updateServer,
            displacement = _ref2.displacement;
        var edgeIndexes = updatedPointMesh.edgeIndexes;
        var edgePos = edgeIndexes.map(function (i) {
          return _this.meshByVertexId[i].position;
        }).map(_Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon);
        var v = _Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon(displacement);
        edgePos.forEach(function (vertexPos, i) {
          return _this.updateVertexPosition(edgeIndexes[i], vertexPos.add(v).toBabylon(), is2updateServer, edgeIndexes);
        });

        _this.updateCurvedNeighbors(edgeIndexes, is2updateServer);

        if (is2updateServer) {
          _this.graphFormMapper = _this.getToFormEdge(updatedPointMesh);

          _this.mainView.setProperties(_this.toForm());
        }
      };
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getOnClickEdge", function (edgeMesh) {
      return function () {
        var actions = [];
        actions.push({
          icon: function icon(props) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2___default()({
              className: "fas fa-trash"
            }, props));
          },
          action: function action() {
            _this.mainView.getUndoManager().doIt(_this.getUndoDeleteEdge(edgeMesh));
          },
          name: "Delete Edge [Del]"
        });

        _this.mainView.setContextActions(actions);
      };
    });

    graphItemInstances[sceneId] = _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this); // object properties

    _this.graph = new _Graph_GraphEmbedding__WEBPACK_IMPORTED_MODULE_16__["default"]();
    _this.scene = scene;
    _this.mainView = mainView;
    _this.meshByEdgeId = {};
    _this.meshByVertexId = {};
    _this.graphFormMapper = _this.getDefaultFormMapper();
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default()(GraphItem, [{
    key: "toDict",
    value: function toDict() {
      var _this2 = this;

      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(GraphItem.prototype), "toDict", this).call(this);

      var adjMap = this.graph.getAdjMap();

      var vertices = _objectSpread({}, this.graph.getVertices());

      var edges = _objectSpread({}, this.graph.getEdges());

      Object.keys(vertices).forEach(function (k) {
        _this2.graph.getVertexByIndex(k).forEach(function (_ref3) {
          var position = _ref3.position,
              id = _ref3.id,
              keyValueMap = _ref3.keyValueMap;
          vertices[k] = {
            position: _Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon(position).toArray(),
            id: id,
            keyValueMap: keyValueMap
          };
        });
      });
      Object.keys(edges).forEach(function (k) {
        var _this2$graph;

        var ids = _Graph_Graph__WEBPACK_IMPORTED_MODULE_17__["default"].key2Edge(k);

        (_this2$graph = _this2.graph).getEdgeByIndex.apply(_this2$graph, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(ids)).forEach(function (_ref4) {
          var edge = _ref4.edge,
              keyValueMap = _ref4.keyValueMap,
              weight = _ref4.weight;
          edges[k] = {
            ids: ids,
            positions: edge.map(function (_ref5) {
              var position = _ref5.position;
              return _Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon(position).toArray();
            }),
            keyValueMap: keyValueMap,
            weight: weight,
            isCurve: edge.map(function (v) {
              return v.isCurve;
            })
          };
        });
      });
      dict["adjMap"] = adjMap;
      dict["vertices"] = vertices;
      dict["edges"] = edges;
      dict["vertexGenerator"] = this.graph.vertexGenerator;
      return dict;
    }
  }, {
    key: "toForm",
    value: function toForm() {
      var form = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(GraphItem.prototype), "toForm", this).call(this);

      delete form.jsonSchema.properties.position;
      delete form.jsonSchema.properties.quaternion;
      delete form.jsonSchema.properties.color;
      delete form.uiSchema.position;
      delete form.uiSchema.quaternion;
      delete form.uiSchema.color;
      delete form.data.position;
      delete form.data.quaternion;
      delete form.data.color;
      return this.graphFormMapper.toForm(form);
    }
  }, {
    key: "ofForm",
    value: function ofForm(form) {
      this.name = form.name;
      this.mesh.name = form.name;
      this.graphFormMapper.ofForm(form);
    }
  }, {
    key: "getDefaultFormMapper",
    value: function getDefaultFormMapper() {
      var _this3 = this;

      return {
        toForm: function toForm(form) {
          return form;
        },
        ofForm: function ofForm(form) {
          return _this3.keyValueMap = _objectSpread({}, form.annotations);
        }
      };
    }
  }, {
    key: "getToFormVertex",
    value: function getToFormVertex(vertexMesh) {
      var _this4 = this;

      return {
        toForm: function toForm(form) {
          return _this4.graph.getVertex(vertexMesh.position).map(function (rVertex) {
            form.jsonSchema.properties["positionVertex"] = {
              type: "object",
              title: "Position Vertex ".concat(rVertex.id),
              properties: {
                x: {
                  type: "number",
                  title: "x"
                },
                y: {
                  type: "number",
                  title: "y"
                },
                z: {
                  type: "number",
                  title: "z"
                }
              }
            };
            form.uiSchema["positionVertex"] = {
              "ui:widget": "collapse"
            };
            form.data["positionVertex"] = {
              x: vertexMesh.position.x,
              y: vertexMesh.position.y,
              z: vertexMesh.position.z
            };
            _NodeItem__WEBPACK_IMPORTED_MODULE_11__["default"].setAnnotations2Form(form, rVertex.keyValueMap);
            form.jsonSchema.properties["annotations"].title = "Annotations Vertex ".concat(rVertex.id);
            return form;
          }).orSome(form);
        },
        ofForm: function ofForm(form) {
          var position = lodash__WEBPACK_IMPORTED_MODULE_21___default.a.get(form, "positionVertex", vertexMesh.position);
          position = [position.x, position.y, position.z].map(Number.parseFloat);

          _this4.graph.getVertex(vertexMesh.position).forEach(function (rVertex) {
            return rVertex.keyValueMap = _objectSpread({}, lodash__WEBPACK_IMPORTED_MODULE_21___default.a.get(form, "annotations", {}));
          });

          _this4.updateVertexPosition(vertexMesh.vertexId, _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].FromArray(position), false);
        }
      };
    }
  }, {
    key: "getToFormEdge",
    value: function getToFormEdge(edgeMesh) {
      var _this5 = this;

      return {
        toForm: function toForm(form) {
          var edgePositions = edgeMesh.edgeIndexes.map(function (index) {
            return monet__WEBPACK_IMPORTED_MODULE_19__["Maybe"].fromNull(_this5.meshByVertexId[index]).map(function (mesh) {
              return mesh.position;
            });
          }).filter(function (maybe) {
            return maybe.isSome();
          }).map(function (maybe) {
            return maybe.some();
          });
          console.log("FORM2EDGE", edgePositions);
          if (edgePositions.length === 0) return form;
          return _this5.graph.getEdge(edgePositions[0], edgePositions[1]).map(function (rEdge) {
            form.jsonSchema.properties["positionEdge"] = {
              type: "object",
              title: "Position Edge ".concat(edgeMesh.edgeIndexes),
              properties: {
                x: {
                  type: "number",
                  title: "x"
                },
                y: {
                  type: "number",
                  title: "y"
                },
                z: {
                  type: "number",
                  title: "z"
                }
              }
            };
            form.jsonSchema.properties["weight"] = {
              type: "number",
              title: "Weight"
            };
            form.uiSchema["positionEdge"] = {
              "ui:widget": "collapse"
            };
            var meanPoint = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].pointAverage(edgePositions);
            form.data["positionEdge"] = {
              x: meanPoint.x,
              y: meanPoint.y,
              z: meanPoint.z
            };
            form.data["weight"] = rEdge.weight;
            _NodeItem__WEBPACK_IMPORTED_MODULE_11__["default"].setAnnotations2Form(form, rEdge.keyValueMap);
            form.jsonSchema.properties["annotations"].title = "Annotations Edge ".concat(edgeMesh.edgeIndexes);
            return form;
          }).orSome(form);
        },
        ofForm: function ofForm(form) {
          var edgeIndexes = edgeMesh.edgeIndexes; //update edges positions

          var edgePositions = edgeIndexes.map(function (index) {
            return _this5.meshByVertexId[index].position;
          });
          var edgePosition = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].pointAverage(edgePositions);
          var newEdgePosition = lodash__WEBPACK_IMPORTED_MODULE_21___default.a.get(form, "positionEdge", edgePosition);
          newEdgePosition = [newEdgePosition.x, newEdgePosition.y, newEdgePosition.z].map(Number.parseFloat);
          newEdgePosition = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].FromArray(newEdgePosition);
          edgePositions.forEach(function (vertexPos, i) {
            return _this5.updateVertexPosition(edgeIndexes[i], vertexPos.add(newEdgePosition.subtract(edgePosition)), false);
          });

          var updateEdgeFromForm = function updateEdgeFromForm(rEdge) {
            rEdge.keyValueMap = _objectSpread({}, lodash__WEBPACK_IMPORTED_MODULE_21___default.a.get(form, "annotations", {}));
            rEdge.weight = Number.parseFloat(form.weight);
          };

          _this5.graph.getEdgeByIndex(edgeIndexes[0], edgeIndexes[1]).forEach(updateEdgeFromForm);

          _this5.graph.getEdgeByIndex(edgeIndexes[1], edgeIndexes[0]).forEach(updateEdgeFromForm);
        }
      };
    } //========================================================================================

    /*                                                                                      *
     *                                   Graph Operations                                   *
     *                                                                                      */
    //========================================================================================

  }, {
    key: "addEdge",
    value: function addEdge(edge) {
      var edgeIndexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var isEdgeCurve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [false, false];

      var _edge = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(edge, 2),
          i = _edge[0],
          j = _edge[1];

      var _edgeIndexes = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(edgeIndexes, 2),
          iIndex = _edgeIndexes[0],
          jIndex = _edgeIndexes[1];

      var _isEdgeCurve = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(isEdgeCurve, 2),
          iIsCurve = _isEdgeCurve[0],
          jIsCurve = _isEdgeCurve[1];

      if (this.hasEdge(i, j)) return;
      this.buildVertex(i, iIndex, iIsCurve);
      this.buildVertex(j, jIndex, jIsCurve);
      this.buildEdge(i, j);
      return this;
    }
  }, {
    key: "addCurveEdge",
    value: function addCurveEdge(edge) {
      var points = GraphItem.getCurveEdgePoints(edge, 0.75);

      for (var i = 0; i < points.length - 1; i++) {
        var partialEdge = [points[i], points[i + 1]];
        this.addEdge(partialEdge, [], [i !== 0, i !== points.length - 2]);
      }

      return this;
    }
  }, {
    key: "delEdge",
    value: function delEdge(i, j) {
      var _this6 = this;

      //Warning: multiple call of getEdge, check for optimization
      this.graph.getEdge(i, j).forEach(function (_ref6) {
        var _this6$graph;

        var edge = _ref6.edge;
        var ids = edge.map(function (v) {
          return v.id;
        });
        var ijKey = _Graph_Graph__WEBPACK_IMPORTED_MODULE_17__["default"].edgeKey(ids[0], ids[1]);
        var jiKey = _Graph_Graph__WEBPACK_IMPORTED_MODULE_17__["default"].edgeKey(ids[1], ids[0]);
        monet__WEBPACK_IMPORTED_MODULE_19__["Maybe"].fromNull(_this6.meshByEdgeId[ijKey]).forEach(function (mesh) {
          return mesh.dispose();
        });
        delete _this6.meshByEdgeId[ijKey];
        delete _this6.meshByEdgeId[jiKey];

        (_this6$graph = _this6.graph).delEdge.apply(_this6$graph, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(edge.map(function (e) {
          return e.position;
        }))); // remove vertex if have no neighbors


        var abstractGraph = _this6.graph.getAbstractGraph();

        edge.forEach(function (_ref7) {
          var id = _ref7.id,
              position = _ref7.position;
          var neighbors = abstractGraph.getNeighbors(id);

          if (neighbors.length === 0) {
            _this6.delVertex(position);
          }
        });
      });
    }
  }, {
    key: "delCurveEdge",
    value: function delCurveEdge(edge) {
      var points = GraphItem.getCurveEdgePoints(edge, 0.75);

      for (var k = 0; k < points.length - 1; k++) {
        var _ref8 = [points[k], points[k + 1]],
            i = _ref8[0],
            j = _ref8[1];
        this.delEdge(i, j);
      }

      return this;
    }
    /**
     *
     * @param {*} i: Vector3
     * @param {*} j: Vector3
     */

  }, {
    key: "hasEdge",
    value: function hasEdge(i, j) {
      return this.graph.hasEdge(i, j);
    } //========================================================================================

    /*                                                                                      *
     *                                    Private Methods                                   *
     *                                                                                      */
    //========================================================================================

    /**
     *
     * @param {*} vertex: Vector3
     * @param {*} vertexIndex: integer representing index of vertex (can be undefined)
     *
     */

  }, {
    key: "buildVertex",
    value: function buildVertex(vertex, vertexIndex) {
      var isCurve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.doesVertexCollideWithEdge(vertex)) {
        this.resolveVertexEdgeCollision(vertex);
      }

      this.buildSimpleVertex(vertex, vertexIndex, isCurve);
    }
  }, {
    key: "buildSimpleVertex",
    value: function buildSimpleVertex(vertex, vertexIndex) {
      var _this7 = this;

      var isCurve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var maybeVertex = this.graph.getVertex(vertex);
      maybeVertex.forEach(function (rVertex) {
        var isCurve = rVertex.isCurve,
            id = rVertex.id;

        if (isCurve) {
          var degree = _this7.graph.getAbstractGraph().getNeighbors(id).length;

          if (degree >= 2) {
            rVertex.isCurve = false;

            _this7.meshByVertexId[rVertex.id].dispose();

            _this7.createVertexMesh(rVertex);
          }
        }
      });
      maybeVertex.orElseRun(function () {
        // if vertex doesn't exist
        _this7.graph.addVertex(vertex, vertexIndex, isCurve);

        _this7.graph.getVertex(vertex).forEach(_this7.createVertexMesh);
      });
    }
  }, {
    key: "addObserver2VertexMesh",

    /**
     * Side effect function beware
     */
    value: function addObserver2VertexMesh(vertexMesh) {
      vertexMesh.observers = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Observable"]();
      vertexMesh.observers.add(this.getVertexObs());
    }
  }, {
    key: "updateCurvedNeighbors",
    value: function updateCurvedNeighbors(movedVertexIds, is2updateServer) {
      var _this8 = this;

      this.getCurvedNeighbors(movedVertexIds).map(function (_ref9) {
        var id = _ref9.id,
            position = _ref9.position;
        return {
          id: id,
          position: _this8.heatFlow(id, position)
        };
      }).forEach(function (_ref10) {
        var id = _ref10.id,
            position = _ref10.position;
        return _this8.updateVertexPosition(id, position, is2updateServer);
      });
    }
  }, {
    key: "getCurvedNeighbors",
    value: function getCurvedNeighbors(vertexIds) {
      var result = [];
      var visitedVertex = {};
      vertexIds.forEach(function (id) {
        return visitedVertex[id] = true;
      });
      var abstractGraph = this.graph.getAbstractGraph();
      var vertexStack = vertexIds.map(function (id) {
        return abstractGraph.getNeighbors(id);
      }).flatMap(function (n) {
        return n;
      }).filter(function (id) {
        return !(id in visitedVertex);
      });

      while (vertexStack.length > 0) {
        var u = vertexStack.pop();
        visitedVertex[u] = true;
        this.graph.getVertexByIndex(u).forEach(function (rVertex) {
          var isCurve = rVertex.isCurve,
              id = rVertex.id;

          if (isCurve) {
            result.push(rVertex);
            vertexStack.push.apply(vertexStack, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(abstractGraph.getNeighbors(id).filter(function (j) {
              return !(j in visitedVertex);
            })));
          }
        });
      }

      return result;
    }
  }, {
    key: "heatFlow",
    value: function heatFlow(id, position) {
      var dt = 0.1;
      var abstractGraph = this.graph.getAbstractGraph();
      var neighbors = abstractGraph.getNeighbors(id).map(this.graph.getVertexByIndex).filter(function (m) {
        return m.isSome();
      }).map(function (m) {
        return m.some();
      }).map(function (v) {
        return v.position;
      });
      var x = position;
      var df = x.scale(neighbors.length).subtract(neighbors.reduce(function (e, v) {
        return e.add(v);
      }, _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Zero()));
      return x.add(df.scale(-dt));
    }
  }, {
    key: "addOnClickVertex",
    value: function addOnClickVertex(vertexMesh) {
      var _this9 = this;

      vertexMesh.onClick = function () {
        var actions = [];
        actions.push({
          icon: function icon(props) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2___default()({
              className: "fas fa-trash"
            }, props));
          },
          action: function action() {
            _this9.mainView.getUndoManager().doIt(_this9.getUndoDeleteVertex(vertexMesh));
          },
          name: "Delete Node [Del]"
        });

        _this9.mainView.setContextActions(actions);
      };
    }
  }, {
    key: "getUndoDeleteVertex",
    value: function getUndoDeleteVertex(vertexMesh) {
      var _this10 = this;

      var p = vertexMesh.position;
      var id = vertexMesh.vertexId;
      var rVertex = this.graph.getVertexByIndex(id).some();
      var isCurve = rVertex.isCurve;
      var neigh = this.graph.getNeighbors(rVertex.position);
      var simpleNeigh = neigh.filter(function (x) {
        return !x.isCurve;
      });
      var curveNeigh = neigh.filter(function (x) {
        return x.isCurve;
      });
      var curvedPaths = curveNeigh.map(function (v) {
        return _this10.graph.getCurvedPathFromVertex(v.position);
      });
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_22__["UndoManager"].actionBuilder().doAction(function () {
        if (!isCurve) simpleNeigh.forEach(function (v) {
          _this10.delEdge(p, v.position);
        });
        curvedPaths.forEach(function (path) {
          for (var i = 0; i < path.length - 1; i++) {
            _this10.delEdge(path[i].position, path[i + 1].position);
          }
        });

        _this10.mainView.closeContextDial();

        _this10.mainView.updateNodeInServer(_this10.name);
      }).undoAction(function () {
        if (!isCurve) simpleNeigh.forEach(function (v) {
          _this10.addEdge([p, v.position], [id, v.id]);
        });
        curvedPaths.forEach(function (path) {
          for (var i = 0; i < path.length - 1; i++) {
            var edge = [path[i], path[i + 1]];
            var edgeIndexes = edge.map(function (_ref11) {
              var id = _ref11.id;
              return id;
            });
            var edgePos = edge.map(function (_ref12) {
              var position = _ref12.position;
              return position;
            });
            var edgeIsCurve = edge.map(function (_ref13) {
              var isCurve = _ref13.isCurve;
              return isCurve;
            });

            _this10.addEdge(edgePos, edgeIndexes, edgeIsCurve);
          }
        });

        _this10.mainView.updateNodeInServer(_this10.name);
      }).build();
    }
  }, {
    key: "highlightCurveEdge",
    value: function highlightCurveEdge(vertexId) {
      var _this11 = this;

      var meshes = this.getCurvedNeighbors([vertexId]).map(function (_ref14) {
        var id = _ref14.id;
        return _this11.meshByVertexId[id];
      });
      this.mainView.highlightMeshesInScene(meshes);
    }
  }, {
    key: "delVertex",
    value: function delVertex(i) {
      var _this12 = this;

      this.graph.getVertex(i).forEach(function (_ref15) {
        var id = _ref15.id;

        var neighbors = _this12.graph.getNeighbors(i);

        neighbors.forEach(function (_ref16) {
          var position = _ref16.position;
          return _this12.delEdge(i, position);
        });
        monet__WEBPACK_IMPORTED_MODULE_19__["Maybe"].fromNull(_this12.meshByVertexId[id]).forEach(function (mesh) {
          return mesh.dispose();
        });
        delete _this12.meshByVertexId[id];

        _this12.graph.delVertex(i); // delete neighbor if belong to curve


        neighbors.filter(function (_ref17) {
          var isCurve = _ref17.isCurve;
          return isCurve;
        }).forEach(function (_ref18) {
          var position = _ref18.position;
          return _this12.delVertex(position);
        });
      });
    }
    /**
     *
     * @param {*} id: vertex to be updated id
     * @param {*} newPosition: Vector3, new vertex position
     * @param {*} is2updateServer: is to update in server boolean var
     * @param {*} protectEdge: Pair<Int> with vertex indices
     */

  }, {
    key: "updateVertexPosition",
    value: function updateVertexPosition(id, newPosition) {
      var _this13 = this;

      var is2updateServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var protectEdge = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      this.meshByVertexId[id].position = newPosition; // redundant when called from addObserver2VertexMesh

      this.graph.updateVertex(id, newPosition);
      this.graph.getNeighbors(newPosition).forEach(function (rVertex) {
        var i = id;
        var j = rVertex.id;

        if (!_this13.isEdgeInPair(i, j, protectEdge)) {
          _this13.meshByEdgeId[_Graph_Graph__WEBPACK_IMPORTED_MODULE_17__["default"].edgeKey(i, j)].dispose();

          _this13.graph.getEdgeByIndex(i, j).forEach(function (rEdge) {
            _this13.buildEdge(newPosition, rVertex.position);
          });
        }

        if (is2updateServer) _this13.mainView.updateNodeInServer(_this13.name);
      });
    }
  }, {
    key: "isEdgeInPair",
    value: function isEdgeInPair(iIndex, jIndex, edgeIndexes) {
      return edgeIndexes.length > 0 && edgeIndexes.includes(iIndex) && edgeIndexes.includes(jIndex);
    }
    /**
     *
     * @param {*} vertex: Vector3
     */

  }, {
    key: "doesVertexCollideWithEdge",
    value: function doesVertexCollideWithEdge(vertex) {
      var _this14 = this;

      var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS / 4;

      /**
       * if collides with vertex return false
       * else compute distance from edge, if close enough return true else false
       */
      return this.graph.getVertex(vertex).cata(function () {
        return _this14.graph.getEdge(vertex).map(function (rEdge) {
          var edge = rEdge.edge.map(function (v) {
            return v.position;
          }).map(_Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon);
          var e = edge[1].sub(edge[0]);
          var x = _Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon(vertex).sub(edge[0]);
          var dot = e.dot(x) / e.dot(e);
          if (dot < 0 || dot > 1) return false;
          var dist = x.sub(e.scale(dot)).length();
          return dist <= radius;
        });
      }, function (rVertex) {
        return monet__WEBPACK_IMPORTED_MODULE_19__["Maybe"].none();
      }).orSome(false);
    }
    /**
     * Deletes colliding edge and create 2 new edge with the split
     *
     * @param {*} vertex: Vector3
     */

  }, {
    key: "resolveVertexEdgeCollision",
    value: function resolveVertexEdgeCollision(vertex) {
      var _this15 = this;

      this.graph.getEdge(vertex).forEach(function (rEdge) {
        var edgeVec3 = rEdge.edge.map(function (_ref19) {
          var position = _ref19.position;
          return position;
        }).map(_Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon);
        var edgeBabylon = rEdge.edge.map(function (v) {
          return v.position;
        }); // compute intersection

        var e = edgeVec3[1].sub(edgeVec3[0]).normalize();
        var x = _Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].ofBabylon(vertex).sub(edgeVec3[0]);
        var proj = e.scale(x.dot(e));
        var vertexInEdge = edgeVec3[0].add(proj).toBabylon(); // split operation

        _this15.delEdge(edgeBabylon[0], edgeBabylon[1]);

        _this15.addEdge([edgeBabylon[0], vertexInEdge]);

        _this15.addEdge([vertexInEdge, edgeBabylon[1]]); //import features


        _this15.importFeatures2Edge(rEdge, edgeBabylon[0], vertexInEdge);

        _this15.importFeatures2Edge(rEdge, vertexInEdge, edgeBabylon[1]);

        _this15.graph.getEdge(edgeBabylon[0], vertexInEdge).forEach(function (leftEdge) {
          _this15.graph.getEdge(vertexInEdge, edgeBabylon[1]).forEach(function (rightEdge) {
            _this15.mainView.getUndoManager().addIt(_this15.getUndoResolveVertexEdgeCollision(rEdge, leftEdge, rightEdge));
          });
        });
      });
    }
  }, {
    key: "getUndoResolveVertexEdgeCollision",
    value: function getUndoResolveVertexEdgeCollision(oldEdge, leftEdge, rightEdge) {
      var _this16 = this;

      var oldEdgePositions = oldEdge.edge.map(function (_ref20) {
        var position = _ref20.position;
        return position;
      });
      var oldEdgeIndex = oldEdge.edge.map(function (_ref21) {
        var id = _ref21.id;
        return id;
      });
      var leftEdgePositions = leftEdge.edge.map(function (_ref22) {
        var position = _ref22.position;
        return position;
      });
      var leftEdgeIndex = leftEdge.edge.map(function (_ref23) {
        var id = _ref23.id;
        return id;
      });
      var rightEdgePositions = rightEdge.edge.map(function (_ref24) {
        var position = _ref24.position;
        return position;
      });
      var rightEdgeIndex = rightEdge.edge.map(function (_ref25) {
        var id = _ref25.id;
        return id;
      });
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_22__["UndoManager"].actionBuilder().doAction(function () {
        // split operation
        _this16.delEdge.apply(_this16, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(oldEdgePositions));

        _this16.addEdge(leftEdgePositions, leftEdgeIndex);

        _this16.addEdge(rightEdgePositions, rightEdgeIndex); //import features


        _this16.importFeatures2Edge.apply(_this16, [oldEdge].concat(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(leftEdgePositions)));

        _this16.importFeatures2Edge.apply(_this16, [oldEdge].concat(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(rightEdgePositions)));
      }).undoAction(function () {
        // split operation
        _this16.delEdge.apply(_this16, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(leftEdgePositions));

        _this16.delEdge.apply(_this16, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(rightEdgePositions));

        _this16.addEdge(oldEdgePositions, oldEdgeIndex); //import features


        _this16.importFeatures2Edge.apply(_this16, [oldEdge].concat(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(oldEdgePositions)));
      }).build();
    }
    /**
     * Copy feature data of rEdgeWithData to edge (i,j)
     * @param {*} rEdgeWithData
     * @param {*} i
     * @param {*} j
     */

  }, {
    key: "importFeatures2Edge",
    value: function importFeatures2Edge(rEdgeWithData, i, j) {
      var _this17 = this;

      this.graph.getEdge(i, j).forEach(function (_ref26) {
        var edge = _ref26.edge;

        var _edge$map = edge.map(function (_ref27) {
          var id = _ref27.id;
          return id;
        }),
            _edge$map2 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_edge$map, 2),
            uId = _edge$map2[0],
            vId = _edge$map2[1];

        _this17.graph.getEdgeByIndex(uId, vId).forEach(function (rEdgePlus) {
          return rEdgePlus.importFeatures(rEdgeWithData);
        });

        _this17.graph.getEdgeByIndex(vId, uId).forEach(function (rEdgeMinus) {
          return rEdgeMinus.importFeatures(rEdgeWithData);
        });
      });
    }
    /**
     *
     * @param {*} i: Vector3
     * @param {*} j: Vector3
     */

  }, {
    key: "buildEdge",
    value: function buildEdge(i, j) {
      var _this18 = this;

      var graph = this.graph;
      graph.addEdge([i, j]);
      graph.getVertex(i).forEach(function (rVertexI) {
        return graph.getVertex(j).forEach(function (rVertexJ) {
          var edgeMesh = GraphItem.getEdgeMesh(_this18.scene, [rVertexI.position, rVertexJ.position]);
          edgeMesh.parent = _this18.mesh;
          var iIndex = rVertexI.id;
          var jIndex = rVertexJ.id;
          edgeMesh.edgeIndexes = [iIndex, jIndex];

          _this18.addObserver2EdgeMesh(edgeMesh);

          _this18.addOnClickEdge(edgeMesh);

          _this18.meshByEdgeId[_Graph_Graph__WEBPACK_IMPORTED_MODULE_17__["default"].edgeKey(iIndex, jIndex)] = edgeMesh;
          _this18.meshByEdgeId[_Graph_Graph__WEBPACK_IMPORTED_MODULE_17__["default"].edgeKey(jIndex, iIndex)] = edgeMesh;
        });
      });
    }
  }, {
    key: "addObserver2EdgeMesh",
    value: function addObserver2EdgeMesh(edgeMesh) {
      edgeMesh.observers = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Observable"]();
      edgeMesh.observers.add(this.getEdgeObs());
    }
  }, {
    key: "addOnClickEdge",
    value: function addOnClickEdge(edgeMesh) {
      edgeMesh.onClick = this.getOnClickEdge(edgeMesh);
    }
  }, {
    key: "getUndoDeleteEdge",
    value: function getUndoDeleteEdge(edgeMesh) {
      var _this19 = this;

      var edgeIndexes = edgeMesh.edgeIndexes;
      var edgeVertex = edgeIndexes.map(function (i) {
        return _this19.graph.getVertexByIndex(i);
      }).map(function (maybeV) {
        return maybeV.some();
      });
      var edgeIsCurve = edgeVertex.some(function (v) {
        return v.isCurve;
      });
      return edgeIsCurve ? this.getUndoDelCurveEdge(edgeVertex) : this.getUndoDelLineEdge(edgeVertex);
    }
  }, {
    key: "getUndoDelCurveEdge",
    value: function getUndoDelCurveEdge(edgeVertex) {
      var _this20 = this;

      // there should be at least one vertex is curve
      var curvedVertex = edgeVertex.filter(function (v) {
        return v.isCurve;
      })[0].position;
      var curvePath = this.graph.getCurvedPathFromVertex(curvedVertex);
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_22__["UndoManager"].actionBuilder().doAction(function () {
        for (var i = 0; i < curvePath.length - 1; i++) {
          _this20.delEdge(curvePath[i].position, curvePath[i + 1].position);
        }

        _this20.mainView.closeContextDial();

        _this20.mainView.updateNodeInServer(_this20.name);
      }).undoAction(function () {
        for (var i = 0; i < curvePath.length - 1; i++) {
          var edge = [curvePath[i], curvePath[i + 1]];
          var edgeIndexes = edge.map(function (_ref28) {
            var id = _ref28.id;
            return id;
          });
          var edgePos = edge.map(function (_ref29) {
            var position = _ref29.position;
            return position;
          });
          var edgeIsCurve = edge.map(function (_ref30) {
            var isCurve = _ref30.isCurve;
            return isCurve;
          });

          _this20.addEdge(edgePos, edgeIndexes, edgeIsCurve);
        }

        _this20.mainView.updateNodeInServer(_this20.name);
      }).build();
    }
  }, {
    key: "getUndoDelLineEdge",
    value: function getUndoDelLineEdge(edgeVertex) {
      var _this21 = this;

      var edgeIndexes = edgeVertex.map(function (_ref31) {
        var id = _ref31.id;
        return id;
      });
      var edgePos = edgeVertex.map(function (_ref32) {
        var position = _ref32.position;
        return position;
      });
      var edgeIsCurve = edgeVertex.map(function (_ref33) {
        var isCurve = _ref33.isCurve;
        return isCurve;
      });
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_22__["UndoManager"].actionBuilder().doAction(function () {
        _this21.delEdge.apply(_this21, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(edgePos));

        _this21.mainView.closeContextDial();

        _this21.mainView.updateNodeInServer(_this21.name);
      }).undoAction(function () {
        _this21.addEdge(edgePos, edgeIndexes, edgeIsCurve);

        _this21.mainView.updateNodeInServer(_this21.name);
      }).build();
    } //========================================================================================

    /*                                                                                      *
     *                             Static Methods and Variables                             *
     *                                                                                      */
    //========================================================================================

  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var graphItem = new GraphItem(scene, mainView, dict.name, dict.keyValueMap);
      var adjMap = dict.adjMap,
          edges = dict.edges; // create mesh of graph using addEdge

      Object.keys(adjMap).forEach(function (i) {
        Object.keys(adjMap[i]).forEach(function (j) {
          if (i < j) {
            var edge = edges[_Graph_Graph__WEBPACK_IMPORTED_MODULE_17__["default"].edgeKey(i, j)];
            var posIJ = edge.positions.map(_Math_Vec3__WEBPACK_IMPORTED_MODULE_18__["default"].of).map(function (p) {
              return p.toBabylon();
            });
            graphItem.addEdge(posIJ, [i, j], edge.isCurve);
          }
        });
      }); //import dict data to graph Embedding structure

      graphItem.graph.importData(dict);
      return graphItem;
    }
    /**
     *
     * @param {*} scene: Babylon js scene
     * @param {*} edgePositions: Array<Vector3>
     * @param {*} color: Color3
     */

  }, {
    key: "getEdgeWithVertexMeshes",
    value: function getEdgeWithVertexMeshes(scene, edgePositions) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
      var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS;
      var ans = edgePositions.map(function (p) {
        return GraphItem.getVertexMesh(scene, p, color, radius);
      });
      ans.push(GraphItem.getEdgeMesh(scene, edgePositions, color, radius));
      return ans;
    }
  }, {
    key: "getCurveEdgeWithVertexMeshes",
    value: function getCurveEdgeWithVertexMeshes(scene, edgePositions) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
      var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS;
      var ans = [];
      var i = edgePositions[0];
      var j = edgePositions[2];
      ans.push(GraphItem.getVertexMesh(scene, i, color, radius));
      ans.push(GraphItem.getVertexMesh(scene, j, color, radius));
      ans.push(GraphItem.getCurveEdgeMesh(scene, edgePositions, color, radius));
      return ans;
    }
  }, {
    key: "getVertexMesh",
    value: function getVertexMesh(scene, vertexPosition) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
      var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS;
      var sphere = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createSphere(scene, color, radius);
      sphere.position = vertexPosition;
      return sphere;
    }
  }, {
    key: "getEdgeMesh",
    value: function getEdgeMesh(scene, edge) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
      var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS;
      return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createTubeFromPoints(scene, edge, color, radius / 4);
    }
  }, {
    key: "getCurveEdgeMesh",
    value: function getCurveEdgeMesh(scene, edge) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
      var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Utils_Constants__WEBPACK_IMPORTED_MODULE_14__["default"].RADIUS;
      var error = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.25;
      return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createTubeFromPoints(scene, GraphItem.getCurveEdgePoints(edge, error), color, radius / 4);
    }
  }, {
    key: "getCurveEdgePoints",
    value: function getCurveEdgePoints(edge) {
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.25;

      var _edge2 = _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(edge, 3),
          i = _edge2[0],
          k = _edge2[1],
          j = _edge2[2];

      var halfD2x = i.subtract(k.scale(2)).add(j);
      var halfD2xNorm = halfD2x.length();
      var numberOfPoints = halfD2xNorm < 1e-3 ? 2 : halfD2xNorm / Math.max(1e-6, error);
      numberOfPoints = Math.floor(numberOfPoints); // console.log("NUMBER OF POINTS", numberOfPoints, halfD2x.length());

      return _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Curve3"].CreateQuadraticBezier(i, k, j, numberOfPoints).getPoints();
    }
  }]);

  return GraphItem;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_11__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(GraphItem, "TYPE", "GraphItem");

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(GraphItem, "NAME", "Roads");

var graphItemInstances = {};

var getGraphPlaceHolder = function getGraphPlaceHolder(scene, name) {
  var graphPlaceHolder = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createSphere(scene, _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray(), Number.MIN_VALUE, name, false);
  graphPlaceHolder.position = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Zero();
  graphPlaceHolder.scaling = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].One();
  graphPlaceHolder.rotationQuaternion = _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_15__["Quaternion"].Identity();
  graphPlaceHolder.visibility = 0.0;
  return graphPlaceHolder;
};

/* harmony default export */ __webpack_exports__["default"] = (GraphItem);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/KeyPoint.js":
/*!****************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/KeyPoint.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_10__);








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var KeyPoint = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3___default()(KeyPoint, _NodeItem);

  var _super = _createSuper(KeyPoint);

  function KeyPoint(mesh, keyValueMap) {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, KeyPoint);

    _this = _super.call(this, mesh, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getType", function () {
      return KeyPoint.TYPE;
    });

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(KeyPoint, [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KeyPoint.ofDict(scene, dict, mainView);
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var name = monet__WEBPACK_IMPORTED_MODULE_9__["Maybe"].fromNull(dict).map(function (x) {
        return x.name;
      }).orSome("KeyPoint".concat(Math.floor(Math.random() * 1e3)));
      var mesh = _babylonjs_core__WEBPACK_IMPORTED_MODULE_10__["MeshBuilder"].CreatePolyhedron(name, {
        custom: TRIANGULAR_ANTIPRISM,
        size: KeyPoint.DEFAULT_SIZE
      }, scene);
      var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_10__["StandardMaterial"]("KeyPointMaterial".concat(name), scene);
      mesh.material = material;
      mesh.convertToFlatShadedMesh();
      var axis = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_8__["default"].referentialBuilder(scene).isPickable(false).boxParams({
        isVisible: false,
        size: 0.1 * KeyPoint.DEFAULT_SIZE
      }).name("".concat(name, "Axis")).build();
      axis.parent = mesh;
      _NodeItem__WEBPACK_IMPORTED_MODULE_7__["default"].mapDict2Mesh(dict, mesh);
      return new KeyPoint(mesh, dict.keyValueMap);
    }
  }]);

  return KeyPoint;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_7__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(KeyPoint, "TYPE", "KeyPoint");

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(KeyPoint, "DEFAULT_SIZE", 0.25);

var TRIANGULAR_ANTIPRISM = {
  name: "Triangular Antiprism (Octahedron)",
  category: ["Antiprism"],
  vertex: [[0, 0, 1.414214], [1.414214, 0, 0], [0, 1.414214, 0], [-1.414214, 0, 0], [0, -1.414214, 0], [0, 0, -1.414214]],
  face: [[0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], [1, 4, 5], [1, 5, 2], [2, 5, 3], [3, 5, 4]]
};
/* harmony default export */ __webpack_exports__["default"] = (KeyPoint);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/Map.js":
/*!***********************************************!*\
  !*** ./src/Components/Viewer/NodeItem/Map.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _AssetNodeItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AssetNodeItem */ "./src/Components/Viewer/NodeItem/AssetNodeItem.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var Map = /*#__PURE__*/function (_AssetNodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Map, _AssetNodeItem);

  var _super = _createSuper(Map);

  function Map(mesh, size, textureSrc, assetName) {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Map);

    _this = _super.call(this, mesh, assetName);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getType", function () {
      return Map.TYPE;
    });

    _this.size = size;
    _this.textureSrc = textureSrc;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Map, [{
    key: "dispose",
    value: function dispose() {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Map.prototype), "dispose", this).call(this);
    }
  }, {
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Map.prototype), "toDict", this).call(this);

      dict["size"] = this.size;
      dict["textureSrc"] = this.textureSrc;
      return dict;
    }
  }, {
    key: "toForm",
    value: function toForm() {
      var info = this.toDict();
      var schema = {
        jsonSchema: {
          type: "object",
          properties: {
            oldName: {
              type: "string"
            },
            name: {
              type: "string",
              title: "Name"
            },
            type: {
              type: "string",
              title: "Type"
            },
            assetName: {
              type: "string",
              title: "Asset Name"
            }
          }
        },
        uiSchema: {
          type: {
            "ui:disabled": true
          },
          assetName: {
            "ui:disabled": true
          },
          oldName: {
            "ui:widget": "hidden"
          }
        },
        data: {
          oldName: info.name,
          name: info.name,
          type: info.type,
          assetName: info.assetName
        }
      };
      return schema;
    }
  }, {
    key: "ofForm",
    value: function ofForm(form) {
      this.name = form.name;
      this.mesh.name = form.name;
      this.keyValueMap = _objectSpread({}, form.annotations);
    }
  }]);

  return Map;
}(_AssetNodeItem__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Map, "TYPE", "Map");

/* harmony default export */ __webpack_exports__["default"] = (Map);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/Mesh.js":
/*!************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/Mesh.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _AssetNodeItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AssetNodeItem */ "./src/Components/Viewer/NodeItem/AssetNodeItem.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var Mesh = /*#__PURE__*/function (_AssetNodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Mesh, _AssetNodeItem);

  var _super = _createSuper(Mesh);

  function Mesh(mesh, assetName) {
    var _this;

    var keyValueMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Mesh);

    _this = _super.call(this, mesh, assetName, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getType", function () {
      return Mesh.TYPE;
    });

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Mesh, [{
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Mesh.prototype), "toDict", this).call(this);

      return dict;
    }
  }, {
    key: "toForm",
    value: function toForm() {
      var schema = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Mesh.prototype), "toForm", this).call(this);

      schema.jsonSchema.properties = {
        oldName: schema.jsonSchema.properties.oldName,
        name: schema.jsonSchema.properties.name,
        type: schema.jsonSchema.properties.type,
        assetName: {
          type: "string",
          title: "Asset Name"
        },
        position: schema.jsonSchema.properties.position,
        quaternion: schema.jsonSchema.properties.quaternion,
        color: schema.jsonSchema.properties.color,
        annotations: schema.jsonSchema.properties.annotations
      };
      schema.uiSchema["assetName"] = {
        "ui:disabled": true
      };
      schema.data["assetName"] = this.assetName;
      return schema;
    }
  }, {
    key: "getMouseContextActions",
    value: function getMouseContextActions(mainView) {
      return _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Mesh.prototype), "getMouseContextActions", this).call(this, mainView).filter(function (x) {
        return x.title === "Delete";
      });
    }
  }]);

  return Mesh;
}(_AssetNodeItem__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Mesh, "TYPE", "Mesh");

/* harmony default export */ __webpack_exports__["default"] = (Mesh);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/NodeItem.js":
/*!****************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/NodeItem.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Utils_AnnotationManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/AnnotationManager */ "./src/Components/Viewer/Utils/AnnotationManager.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Utils_Clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Utils/Clipboard */ "./src/Components/Viewer/Utils/Clipboard.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var capitalize = mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_5__["Utils"].capitalize;

var NodeItem = /*#__PURE__*/function () {
  function NodeItem(mesh) {
    var keyValueMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, NodeItem);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "getType", function () {
      return NodeItem.TYPE;
    });

    this.name = mesh.name;
    this.mesh = mesh;
    this.mesh.getMouseContextActions = this.getMouseContextActions;
    this.mesh.nodeItem = this;
    this.keyValueMap = keyValueMap; //Hack to load annotations

    _Utils_AnnotationManager__WEBPACK_IMPORTED_MODULE_6__["default"].getInstance();
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(NodeItem, [{
    key: "dispose",
    value: function dispose() {
      this.mesh.dispose();
    }
  }, {
    key: "toDict",
    value: function toDict() {
      var _this = this;

      return {
        name: this.name,
        type: this.getType(),
        position: _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(this.mesh.position).toArray(),
        quaternion: monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(this.mesh.rotationQuaternion).map(function (x) {
          return [x.w, x.x, x.y, x.z];
        }).orLazy(function () {
          var q = _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Quaternion"].RotationYawPitchRoll(_this.mesh.rotation.y, _this.mesh.rotation.x, _this.mesh.rotation.z);
          return [q.w, q.x, q.y, q.z];
        }),
        color: monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(this.mesh.material).flatMap(function (x) {
          return monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(x.diffuseColor).map(function (z) {
            return [z.r, z.g, z.b];
          });
        }).orSome([0, 0, 0]),
        keyValueMap: this.keyValueMap,
        isVisible: this.mesh.isEnabled()
      };
    }
    /**
     * Generates json based on https://github.com/rjsf-team/react-jsonschema-form
     */

  }, {
    key: "toForm",
    value: function toForm() {
      var info = this.toDict();
      var color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Color3"](info.color[0], info.color[1], info.color[2]);
      var schema = {
        jsonSchema: {
          type: "object",
          properties: {
            oldName: {
              type: "string"
            },
            name: {
              type: "string",
              title: "Name"
            },
            type: {
              type: "string",
              title: "Type"
            },
            position: {
              type: "object",
              title: "Position",
              properties: {
                x: {
                  type: "number",
                  title: "x"
                },
                y: {
                  type: "number",
                  title: "y"
                },
                z: {
                  type: "number",
                  title: "z"
                }
              }
            },
            quaternion: {
              type: "object",
              title: "Orientation",
              properties: {
                w: {
                  type: "number",
                  title: "w"
                },
                x: {
                  type: "number",
                  title: "x"
                },
                y: {
                  type: "number",
                  title: "y"
                },
                z: {
                  type: "number",
                  title: "z"
                }
              }
            },
            color: {
              type: "string",
              title: "Color"
            }
          }
        },
        uiSchema: {
          type: {
            "ui:disabled": true
          },
          color: {
            "ui:widget": "color"
          },
          oldName: {
            "ui:widget": "hidden"
          },
          position: {
            "ui:widget": "collapse"
          },
          quaternion: {
            "ui:widget": "collapse"
          }
        },
        data: {
          oldName: info.name,
          name: info.name,
          type: info.type,
          position: {
            x: info.position[0],
            y: info.position[1],
            z: info.position[2]
          },
          quaternion: {
            w: info.quaternion[0],
            x: info.quaternion[1],
            y: info.quaternion[2],
            z: info.quaternion[3]
          },
          color: color.toHexString()
        }
      };
      NodeItem.setAnnotations2Form(schema, this.keyValueMap);
      return schema;
    }
    /**
     * Changes NodeItem based on a form
     *
     * Warning: side effect function
     * @param {*} form
     */

  }, {
    key: "ofForm",
    value: function ofForm(form) {
      var _this2 = this;

      this.name = form.name;
      this.mesh.name = form.name;
      monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(form.position).forEach(function (position) {
        _this2.mesh.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Vector3"](position.x, position.y, position.z);
      });
      monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(form.quaternion).forEach(function (quaternion) {
        _this2.mesh.rotationQuaternion = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Quaternion"](quaternion.x, quaternion.y, quaternion.z, quaternion.w).normalize();
      });

      if (this.mesh.material) {
        this.mesh.material.diffuseColor = _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Color3"].FromHexString(form.color);
        this.mesh.material.emissiveColor = _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Color3"].FromHexString(form.color);
      }

      this.keyValueMap = _objectSpread({}, form.annotations);
    }
  }, {
    key: "getMouseContextActions",
    value: function getMouseContextActions(mainView) {
      var _this3 = this;

      return [{
        title: "Copy",
        onClick: function onClick() {
          return (// mousePosFromRoot : Vector3
            _Utils_Clipboard__WEBPACK_IMPORTED_MODULE_8__["default"].copy(function (mousePosFromRoot, someMainView) {
              return (// "this" comes from the mesh
                someMainView.getSceneMemory().forEach(function (_ref) {
                  var scene = _ref.scene;

                  var _someMainView$getRoot = someMainView.getRootNode(),
                      rootItem = _someMainView$getRoot.item;

                  var item = _this3.nodeItem;
                  var copyDict = item.toDict();
                  copyDict.name += "*";
                  var newPosArray = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(mousePosFromRoot).toArray(); // preserves z-coordinate

                  newPosArray[2] = copyDict.position[2];
                  copyDict.position = newPosArray;
                  var copiedNodeItem = item.ofDict(scene, copyDict, someMainView);
                  var copiedMesh = copiedNodeItem.mesh;
                  copiedMesh.parent = rootItem.mesh;
                  someMainView.addNodeItem2Tree(copiedNodeItem);
                })
              );
            })
          );
        }
      }, {
        title: "Delete",
        onClick: function onClick() {
          return mainView.deleteNodeFromTreeUsingName(_this3.name);
        }
      }];
    }
  }], [{
    key: "mapDict2Mesh",
    // side-effect function
    value: function mapDict2Mesh(dict, mesh) {
      if (!mesh) throw "can't map a null mesh";
      monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(dict).forEach(function (someDict) {
        monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(dict.name).forEach(function (name) {
          return mesh.name = name;
        });
        monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(someDict.position).forEach(function (position) {
          return mesh.position = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].of(position).toBabylon();
        });
        monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(someDict.quaternion).forEach(function (quaternion) {
          var babylonQuaternion = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Quaternion"](quaternion[1], quaternion[2], quaternion[3], quaternion[0]);
          mesh.rotationQuaternion = babylonQuaternion.normalize();
        });
        monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(someDict.color).forEach(function (color) {
          var babylonColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_7__["Color3"](color[0], color[1], color[2]);
          monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(mesh.material).forEach(function (material) {
            monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(material.diffuseColor).forEach(function (z) {
              return mesh.material.diffuseColor = babylonColor;
            });
            monet__WEBPACK_IMPORTED_MODULE_4__["Maybe"].fromNull(material.emissiveColor).forEach(function (z) {
              return mesh.material.emissiveColor = babylonColor;
            });
          });
        });
      });
      return mesh;
    } // side effect function

  }, {
    key: "setAnnotations2Form",
    value: function setAnnotations2Form(schema) {
      var keyValueMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      schema.jsonSchema.properties.annotations = {
        title: "Annotations",
        type: "object",
        properties: {}
      };
      schema.uiSchema.annotations = {
        "ui:widget": "collapse"
      };
      schema.data["annotations"] = _objectSpread({}, keyValueMap);
      var annotations = _Utils_AnnotationManager__WEBPACK_IMPORTED_MODULE_6__["default"].getAnnotations();
      Object.keys(annotations).forEach(function (annotation) {
        if (annotations[annotation].labels.length > 0) {
          schema.jsonSchema.properties.annotations.properties[annotation] = {
            title: capitalize(annotation),
            type: "string",
            enumNames: annotations[annotation].labels,
            "enum": annotations[annotation].names
          };
        }
      });
    }
  }]);

  return NodeItem;
}();

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(NodeItem, "TYPE", "NodeItem");

/* harmony default export */ __webpack_exports__["default"] = (NodeItem);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/Path.js":
/*!************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/Path.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_16__);











function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var RADIUS = _Utils_Constants__WEBPACK_IMPORTED_MODULE_15__["default"].RADIUS;

var Path = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Path, _NodeItem);

  var _super = _createSuper(Path);

  /**
   * @param {*} mesh
   * @param {*} localPath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} keyPoints: are the keyPoints meshes array
   * @param {*} splinePath: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   */
  function Path(mesh, localPath, keyPoints, splinePath) {
    var _this;

    var keyValueMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Path);

    _this = _super.call(this, mesh, keyValueMap); // Array<Vector3> points in relation to its mean

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "getType", function () {
      return Path.TYPE;
    });

    _this.localPath = localPath; // Array<Meshes> representing key points of the curve

    _this.keyPoints = keyPoints; // spline points from local path

    _this.splinePath = splinePath;
    _this.selectedKeyPointIndex = -1;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Path, [{
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Path.prototype), "toDict", this).call(this);

      dict.localPath = this.localPath;
      dict.splinePath = this.splinePath;
      return dict;
    }
  }, {
    key: "toForm",
    value: function toForm() {
      var schema = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Path.prototype), "toForm", this).call(this);

      if (this.selectedKeyPointIndex >= 0) {
        schema.jsonSchema.properties["selectedKeyPoint"] = {
          type: "object",
          title: "KeyPoint ".concat(this.selectedKeyPointIndex),
          properties: {
            x: {
              type: "number",
              title: "x"
            },
            y: {
              type: "number",
              title: "y"
            },
            z: {
              type: "number",
              title: "z"
            }
          }
        };
        schema.uiSchema["selectedKeyPoint"] = {
          "ui:widget": "collapse"
        };
        schema.uiSchema["position"] = {
          "ui:widget": "hidden"
        };
        schema.uiSchema["quaternion"] = {
          "ui:widget": "hidden"
        };
        schema.uiSchema["color"] = {
          "ui:widget": "hidden"
        };
        schema.uiSchema["annotations"] = {
          "ui:widget": "hidden"
        };
        var selectedMesh = this.keyPoints[this.selectedKeyPointIndex];
        var position = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].getWorldCoordinates(selectedMesh, selectedMesh.position).toArray();
        schema.data["selectedKeyPoint"] = {
          x: position[0],
          y: position[1],
          z: position[2]
        };
        return schema;
      }

      return schema;
    }
  }, {
    key: "ofForm",
    value: function ofForm(form) {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Path.prototype), "ofForm", this).call(this, form);

      if (this.selectedKeyPointIndex >= 0) {
        var selectedKeyPoint = this.keyPoints[this.selectedKeyPointIndex];
        var formPosition = form.selectedKeyPoint;
        var newPosInWorldCoordinates = _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Vector3"].FromArray([formPosition.x, formPosition.y, formPosition.z].map(Number.parseFloat));
        var localPos = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].getLocalCoordinatesFromWorld(selectedKeyPoint, newPosInWorldCoordinates).toArray();
        selectedKeyPoint.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Vector3"](localPos[0], localPos[1], localPos[2]);
        selectedKeyPoint.observers.notifyObservers({
          updatedPointMesh: selectedKeyPoint,
          is2updateServer: false
        });
      }
    }
  }, {
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return Path.ofDict(scene, dict, mainView);
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!dict || !mainView) throw "null dictionary describing path or null mainView";
      var name = dict.name;
      var curve = dict.localPath.map(function (z) {
        return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(z).toBabylon();
      });
      var spline = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].getSplineFromCurve(curve);
      var points = spline.points;
      var mesh = null; //hack

      if (points.length === 1) {
        mesh = _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["MeshBuilder"].CreateLines(name, {
          points: points,
          updatable: true
        }, scene);
      } else {
        mesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createTubeFromPoints(scene, points, _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Color3"].Gray(), RADIUS / 8, name);
      }

      mesh.position = _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(dict.position).toBabylon();
      mesh.material = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].getMaterialFromColor(_babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Color3"].FromArray(dict.color), scene, "PathMaterial".concat(name));
      mesh.rotationQuaternion = monet__WEBPACK_IMPORTED_MODULE_14__["Maybe"].fromNull(dict.quaternion).map(function (quaternion) {
        return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Quaternion"](quaternion[1], quaternion[2], quaternion[3], quaternion[0]).normalize();
      }).orSome(_babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Quaternion"].Identity());
      var splinePath = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].splineObj2redis(spline);
      var keyPoints = createPlaceHolderKeyPoints(scene, _objectSpread(_objectSpread({}, dict), {}, {
        mesh: mesh,
        splinePath: splinePath
      }), mainView);
      var path2return = new Path(mesh, curve.map(function (point) {
        return [point.x, point.y, point.z];
      }), keyPoints, splinePath, dict.keyValueMap);
      mesh.onClick = getMeshOnClick(mainView, path2return);
      return path2return;
    }
  }]);

  return Path;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_10__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(Path, "TYPE", "Path");

/* harmony default export */ __webpack_exports__["default"] = (Path);

var getMeshOnClick = function getMeshOnClick(mainView, nodeItem) {
  return function () {
    mainView.closeContextDial();
    mainView.getNodeFromTree(nodeItem.name).forEach(function (node) {
      return node.item.selectedKeyPointIndex = -1;
    });
  };
};

function defaultKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when keypoint is updated
  var childrenCopy = _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(oldMesh._children);

  var spline = item.splinePath.map(function (z) {
    return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Vector3"](z[0], z[1], 0);
  });
  childrenCopy.forEach(function (c) {
    c.parent = item.mesh;
  });
  return item.keyPoints.map(function (k, i) {
    k.index = i;
    k.name = "".concat(oldMesh.name, "keyPointSpline").concat(i);
    k.position = _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(item.localPath[i]).toBabylon();
    k.rotationQuaternion = _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Quaternion"].Identity();

    if (i > 0 && i < item.keyPoints.length - 1) {
      k._children.forEach(function (kChild) {
        return kChild.dispose();
      });

      var c = getConeMesh(scene, k.material.diffuseColor, item.mesh, i, spline, k.position)();
      c.parent = k;
    }

    return k;
  });
}

function createNewMeshFromOldUsingNewPoints(newPoints, scene, oldMesh, item, mainView) {
  var keyPointUpdateFunction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultKeyPointUpdate;
  var average = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].pointAverage(newPoints);
  newPoints = newPoints.map(function (x) {
    return x.subtract(average);
  });
  var spline = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].getSplineFromCurve(newPoints); // const newMesh = MeshBuilder.CreateLines(
  //   oldMesh.name,
  //   { points: spline.points, updatable: true },
  //   scene
  // );

  var newMesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createTubeFromPoints(scene, spline.points, _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Color3"].Gray(), RADIUS / 8, oldMesh.name);
  newMesh.position = oldMesh.position;
  newMesh.rotationQuaternion = oldMesh.rotationQuaternion;
  newMesh.locallyTranslate(average);
  newMesh.material = oldMesh.material;
  newMesh.visibility = oldMesh.visibility;
  newMesh.parent = oldMesh.parent;
  newMesh.onClick = oldMesh.onClick;
  item.localPath = newPoints.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].ofBabylon(x).toArray();
  });
  item.splinePath = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].splineObj2redis(spline);
  item.mesh = newMesh;
  item.keyPoints = keyPointUpdateFunction(scene, mainView, oldMesh, item);
  oldMesh.dispose();
  return newPoints;
}

var getKeyPointObserverFunction = function getKeyPointObserverFunction(scene, mainView) {
  return function (_ref) {
    var updatedPointMesh = _ref.updatedPointMesh,
        is2updateServer = _ref.is2updateServer;
    if (!updatedPointMesh.parent) return;
    mainView.getNodeFromTree(updatedPointMesh.parent.name).forEach(function (pathTreeNode) {
      var index = updatedPointMesh.index;
      var item = pathTreeNode.item;
      var mesh = item.mesh;
      var newPoints = item.localPath.map(function (x) {
        return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
      });
      newPoints[index] = updatedPointMesh.position;
      createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView);

      if (index > 0 && index < newPoints.length - 1) {
        // we know by construction that this keyPoint has children
        mainView.highlightMeshInScene([item.keyPoints[index]._children[0]]);
      }

      if (is2updateServer) {
        mainView.updateNodeInServer(mesh.name);
        mainView.getNodeFromTree(mesh.name).forEach(function (node) {
          node.item.selectedKeyPointIndex = index;
          mainView.setProperties(node.item.toForm());
        });
      }
    });
  };
};

var deleteKeyPoint = function deleteKeyPoint(scene, keyPointMesh, mainView) {
  var index = keyPointMesh.index;
  var name = keyPointMesh.parent.name;
  mainView.getNodeFromTree(name).forEach(function (pathTreeNode) {
    var item = pathTreeNode.item;
    var mesh = item.mesh;
    var newPoints = item.localPath.map(function (x) {
      return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
    });
    newPoints.splice(index, 1);
    item.keyPoints.splice(index, 1)[0].dispose();
    createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView, onAddNewPointKeyPointUpdate);
    mainView.updateNodeInServer(name);
  });
};

function onAddNewPointKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when new keypoint is added
  return createPlaceHolderKeyPoints(scene, item, mainView);
}
/**
 *
 * @param {*} scene
 * @param {*} keyPointMesh
 * @param {*} curveMesh
 * @param {*} mainView
 * @param {*} orientation: it belongs to the set {-1,1}, represents orientation
 */


var addKeyPointInBetween = function addKeyPointInBetween(scene, keyPointMesh, mainView, orientation) {
  var index = keyPointMesh.index;
  var name = keyPointMesh.parent.name;
  mainView.getNodeFromTree(name).forEach(function (pathTreeNode) {
    var nextIndex = index + orientation;
    var item = pathTreeNode.item;
    var numberOfPoints = item.localPath.length;
    var mesh = item.mesh;
    var newPoints = [];
    var oldPoints = item.localPath.map(function (x) {
      return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
    });

    if (nextIndex < 0) {
      newPoints = [oldPoints[0].scale(3).subtract(oldPoints[1]).scale(0.5)].concat(oldPoints);
    } else if (nextIndex > numberOfPoints - 1) {
      newPoints = oldPoints.concat([oldPoints[numberOfPoints - 1].scale(3).subtract(oldPoints[numberOfPoints - 2]).scale(0.5)]);
    } else {
      var specialIndex = index + Math.max(0, orientation);

      for (var i = 0; i < specialIndex; i++) {
        newPoints.push(oldPoints[i]);
      }

      newPoints.push(oldPoints[nextIndex].add(oldPoints[index]).scale(0.5));

      for (var _i = specialIndex; _i < numberOfPoints; _i++) {
        newPoints.push(oldPoints[_i]);
      }
    }

    createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView, onAddNewPointKeyPointUpdate);
    mainView.updateNodeInServer(name);
  });
};

var getKeyPointActions = function getKeyPointActions(scene, keyPointMesh, mainView) {
  var actions = [];
  mainView.getNodeFromTree(keyPointMesh.parent.name).forEach(function (pathTreeNode) {
    var item = pathTreeNode.item;
    var curve = item.localPath;

    if (curve.length !== 2) {
      actions.push({
        icon: function icon(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            className: "fas fa-trash"
          }, props));
        },
        action: function action(parentView) {
          deleteKeyPoint(scene, keyPointMesh, parentView);
          parentView.closeContextDial();
        },
        name: "Delete node [DEL]"
      });
    }

    actions.push({
      icon: function icon(props) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
          className: "fas fa-less-than"
        }, props));
      },
      action: function action(parentView) {
        addKeyPointInBetween(scene, keyPointMesh, parentView, -1);
        parentView.closeContextDial();
      },
      name: "Add previous"
    });
    actions.push({
      icon: function icon(props) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
          className: "fas fa-greater-than"
        }, props));
      },
      action: function action(parentView) {
        addKeyPointInBetween(scene, keyPointMesh, parentView, 1);
        parentView.closeContextDial();
      },
      name: "Add next"
    });
  });
  return actions;
};

var createPlaceHolderKeyPoints = function createPlaceHolderKeyPoints(scene, item, mainView) {
  var color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Color3"](0.25, 0.25, 0.25);
  var keyPoints = [];
  var curve = item.localPath.map(function (z) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(z).toBabylon();
  });
  var spline = item.splinePath.map(function (z) {
    return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Vector3"](z[0], z[1], 0);
  });
  var curveMesh = item.mesh;
  curve.forEach(function (p, i) {
    var sphere = getSphereMesh(scene, color, curveMesh, i);

    var cone = function cone() {
      var c = getConeMesh(scene, color, curveMesh, i, spline, p)();
      var s = getSphereMesh(scene, color, curveMesh, i)();
      s.visibility = 0.1;
      c.parent = s;
      return s;
    };

    var keyPoint = i === 0 || i === curve.length - 1 ? sphere() : cone();
    keyPoint.parent = curveMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_16__["Observable"]();
    keyPoints.push(keyPoint);
    keyPoint.observers.add(getKeyPointObserverFunction(scene, mainView));
  });
  keyPoints.forEach(function (x) {
    x.onClick = function () {
      mainView.setContextActions(getKeyPointActions(scene, x, mainView));
    };
  });
  return keyPoints;
};

function getConeMesh(scene, color, curveMesh, i, spline, p) {
  return function () {
    var index = spline.map(function (z) {
      return p.subtract(z).length();
    }).reduce(function (e, x, i) {
      return e.value < x ? e : {
        value: x,
        index: i
      };
    }, {
      value: Number.MAX_VALUE,
      index: -1
    }).index;
    var u = spline[index + 1].subtract(spline[index]).normalize().scale(RADIUS);
    var c = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createOrientedCone(scene, u, color, "".concat(curveMesh.name, "keyPointCone").concat(i), false);
    return c;
  };
}

function getSphereMesh(scene, color, curveMesh, i) {
  return function () {
    return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createSphere(scene, color, RADIUS, "".concat(curveMesh.name, "keyPointSpline").concat(i), true);
  };
}

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/PointCloud.js":
/*!******************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/PointCloud.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_11__);









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var ofNull = mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_11__["Utils"].ofNull;

var PointCloud = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(PointCloud, _NodeItem);

  var _super = _createSuper(PointCloud);

  /**
   *
   * @param {*} mesh
   * @param {*} robot: {name: string, id: string} representing a robot
   */
  function PointCloud(mesh, robot) {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PointCloud);

    _this = _super.call(this, mesh);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getType", function () {
      return PointCloud.TYPE;
    });

    _this.robot = robot;

    _this.pointCloudSubscribe();

    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PointCloud, [{
    key: "pointCloudSubscribe",
    value: function pointCloudSubscribe() {
      var _this2 = this;

      mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_11__["MasterDB"].subscribe({
        Scope: "Robot",
        Name: this.robot.id,
        Parameter: "front_lidar"
      }, function (data) {
        monet__WEBPACK_IMPORTED_MODULE_10__["Maybe"].fromNull(data).flatMap(function (d) {
          return ofNull(d.key);
        }).flatMap(function (k) {
          return ofNull(k.Robot[_this2.robot.id]);
        }).flatMap(function (r) {
          return ofNull(r.Parameter);
        }).flatMap(function (p) {
          return ofNull(p.front_lidar);
        }).flatMap(function (f) {
          return ofNull(f.Value);
        }).flatMap(function (v) {
          return ofNull(v.points);
        }).forEach(function (points) {
          return _this2.updatePointCloud(points);
        });
      }, function (data) {
        monet__WEBPACK_IMPORTED_MODULE_10__["Maybe"].fromNull(data.value).flatMap(function (v) {
          return ofNull(v.Robot);
        }).flatMap(function (r) {
          return ofNull(r[_this2.robot.id]);
        }).flatMap(function (r) {
          return ofNull(r.Parameter);
        }).flatMap(function (p) {
          return ofNull(p.front_lidar);
        }).flatMap(function (f) {
          return ofNull(f.Value);
        }).flatMap(function (v) {
          return ofNull(v.points);
        }).forEach(function (points) {
          return _this2.updatePointCloud(points);
        });
      });
    }
    /**
     *
     * @param {*} points: Array<3-Array>
     */

  }, {
    key: "updatePointCloud",
    value: function updatePointCloud(points) {
      var vertexData = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_9__["VertexData"](); //Assign positions

      vertexData.positions = points.flatMap(function (x) {
        return x;
      });
      var colors = new Array(4 * points.length);
      vertexData.colors = colors.fill(1.0); //Apply vertexData to custom mesh

      vertexData.applyToMesh(this.mesh, true);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(PointCloud.prototype), "dispose", this).call(this);

      mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_11__["MasterDB"].unsubscribe({
        Scope: "Robot",
        Name: this.robot.id,
        Parameter: "front_lidar"
      });
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!dict || !mainView) throw "null dictionary describing point cloud or null mainView";
      var pointCloudMesh = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_9__["Mesh"]("cloudPoint".concat(dict.name), scene);
      var mat = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_9__["StandardMaterial"]("cloudPoint".concat(dict.name, "Material"), scene);
      mat.emissiveColor = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_9__["Color3"](1, 1, 1);
      mat.disableLighting = true;
      mat.pointsCloud = true;
      mat.pointSize = 2;
      pointCloudMesh.material = mat;
      return new PointCloud(pointCloudMesh, dict);
    }
  }]);

  return PointCloud;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_8__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(PointCloud, "TYPE", "PointCloud");

/* harmony default export */ __webpack_exports__["default"] = (PointCloud);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/PolygonRegion.js":
/*!*********************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/PolygonRegion.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "@babel/runtime/helpers/esm/extends");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_17__);











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









var RADIUS = _Utils_Constants__WEBPACK_IMPORTED_MODULE_16__["default"].RADIUS;
var positiveMod = mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_15__["Utils"].mod;

var PolygonRegion = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6___default()(PolygonRegion, _NodeItem);

  var _super = _createSuper(PolygonRegion);

  /**
   * @param {*} mesh
   * @param {*} localPolygon: is an array of 3-arrays of numbers of the local coordinates in relation to mesh.position and quaternion
   * @param {*} keyPoints: are the keyPoints meshes array
   */
  function PolygonRegion(mesh, localPolygon, height, keyPoints) {
    var _this;

    var keyValueMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PolygonRegion);

    _this = _super.call(this, mesh, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "getType", function () {
      return PolygonRegion.TYPE;
    });

    _this.localPolygon = localPolygon;
    _this.height = height;
    _this.keyPoints = keyPoints;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3___default()(PolygonRegion, [{
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(PolygonRegion.prototype), "toDict", this).call(this);

      dict.localPolygon = this.localPolygon;
      dict.height = this.height;
      return dict;
    }
  }, {
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return PolygonRegion.ofDict(scene, dict, mainView);
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!dict || !mainView) throw "null dictionary describing polygon or null mainView";
      var polygon = dict.localPolygon.map(function (z) {
        return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(z).toBabylon();
      });
      var middlePoint = _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(dict.position).toBabylon();
      var mesh = createExtrudedPolygonMesh(scene, polygon, dict.height, dict.name);
      mesh.position = middlePoint;
      var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__["StandardMaterial"]("PolygonMaterial".concat(dict.name), scene);
      var color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__["Color3"](dict.color[0], dict.color[1], dict.color[2]);
      material.diffuseColor = color;
      material.emissiveColor = color;
      mesh.material = material;
      mesh.visibility = 0.5;
      monet__WEBPACK_IMPORTED_MODULE_13__["Maybe"].fromNull(dict.quaternion).forEach(function (quaternion) {
        var babylonQuaternion = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__["Quaternion"](quaternion[1], quaternion[2], quaternion[3], quaternion[0]);
        mesh.rotationQuaternion = babylonQuaternion.normalize();
      });
      var keypoints = createPlaceHolderKeyPoints(scene, polygon, mesh, mainView);
      return new PolygonRegion(mesh, polygon.map(function (point) {
        return [point.x, point.y, point.z];
      }), dict.height, keypoints, dict.keyValueMap);
    }
  }]);

  return PolygonRegion;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_10__["default"]);
/**
 *
 * @param {*} polygon: boundary as babylonjs vec3
 */


_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(PolygonRegion, "TYPE", "PolygonRegion");

var stitchingBoundaries = function stitchingBoundaries(polygon) {
  var n = polygon.length;
  var orientation = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].computeOrientation(polygon);
  var ans = [];

  for (var i = 0; i < n; i++) {
    var modi = (i + 1) % n;
    ans.push([i, n + modi, modi]);
    ans.push([i, n + i, n + modi]);
  }

  return orientation > 0 ? ans : ans.map(reverseOrientation);
};

var reverseOrientation = function reverseOrientation(triangleIndice) {
  var ans = [];
  ans.push(triangleIndice[1]);
  ans.push(triangleIndice[0]);
  ans.push(triangleIndice[2]);
  return ans;
};
/**
 *
 * @param {*} scene
 * @param {*} polygon array of babylon js vector3
 * @param {*} height
 * @param {*} name
 */


var createExtrudedPolygonMesh = function createExtrudedPolygonMesh(scene, polygon, height, name) {
  var h = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__["Vector3"](0, 0, height);
  var polygonRegionMesh = {
    positions: [],
    faces: []
  };
  polygonRegionMesh.positions = _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(polygon);

  for (var i = 0; i < polygon.length; i++) {
    polygonRegionMesh.positions.push(polygon[i].add(h));
  }

  var n = polygon.length;
  var lowerTriangulation = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].triangulatePolygon(polygon);
  var upperTriangulation = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].triangulatePolygon(polygonRegionMesh.positions.slice(n)).map(function (x) {
    return x.map(function (z) {
      return z + n;
    });
  }).map(reverseOrientation);
  var stitchTriangulation = stitchingBoundaries(polygon);
  polygonRegionMesh.faces = lowerTriangulation.concat(upperTriangulation).concat(stitchTriangulation);
  var mesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].meshFromPositionAndFaces(name, scene, polygonRegionMesh.positions, polygonRegionMesh.faces);
  return mesh;
};

function defaultKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when keypoint is updated or deleted
  var childrenCopy = _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(oldMesh._children);

  childrenCopy.forEach(function (c) {
    oldMesh.removeChild(c);
    c.parent = item.mesh;
  });
  return item.keyPoints.map(function (k, i) {
    k.observers = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__["Observable"]();
    k.observers.add(getKeyPointObserverFunction(scene, mainView));
    k.index = i;
    k.name = "".concat(oldMesh.name, "keyPoint").concat(i);
    k.position = _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(item.localPolygon[i]).toBabylon();
    return k;
  });
}

function createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView) {
  var keyPointUpdateFunction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaultKeyPointUpdate;
  var average = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].pointAverage(newPoints);
  newPoints = newPoints.map(function (x) {
    return x.subtract(average);
  }); // update mesh

  var newMesh = createExtrudedPolygonMesh(scene, newPoints, item.height, mesh.name);
  newMesh.position = mesh.position;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.locallyTranslate(average);
  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.parent = mesh.parent;
  item.localPolygon = newPoints.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].ofBabylon(x).toArray();
  });
  item.mesh = newMesh;
  item.keyPoints = keyPointUpdateFunction(scene, mainView, mesh, item); // dispose old mesh

  mesh.dispose();
  return newPoints;
}

var getKeyPointObserverFunction = function getKeyPointObserverFunction(scene, mainView) {
  return function (_ref) {
    var updatedPointMesh = _ref.updatedPointMesh,
        is2updateServer = _ref.is2updateServer;
    if (!updatedPointMesh.parent) return;
    mainView.getNodeFromTree(updatedPointMesh.parent.name).forEach(function (polygonTreeNode) {
      var index = updatedPointMesh.index;
      var item = polygonTreeNode.item;
      var mesh = item.mesh;
      var name = mesh.name;
      var newPoints = item.localPolygon.map(function (x) {
        return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
      });
      newPoints[index] = updatedPointMesh.position;
      createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView);

      if (is2updateServer) {
        mainView.updateNodeInServer(name);
      }
    });
  };
};

function onAddNewPointKeyPointUpdate(scene, mainView, oldMesh, item) {
  // used when new keypoint is added
  return createPlaceHolderKeyPoints(scene, item.localPolygon.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
  }), item.mesh, mainView);
}
/**
 *
 * @param {*} scene
 * @param {*} keyPointMesh
 * @param {*} curveMesh
 * @param {*} mainView
 * @param {*} orientation: it belongs to the set {-1,1}, represents orientation
 */


var addKeyPointInBetween = function addKeyPointInBetween(scene, keyPointMesh, mainView, orientation) {
  var index = keyPointMesh.index;
  var name = keyPointMesh.parent.name;
  mainView.getNodeFromTree(name).forEach(function (pathTreeNode) {
    var item = pathTreeNode.item;
    var numberOfPoints = item.localPolygon.length;
    var nextIndex = positiveMod(index + orientation, numberOfPoints);
    var mesh = item.mesh;
    var oldPoints = item.localPolygon.map(function (x) {
      return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
    });
    var newPoints = [];
    var specialIndex = index + Math.max(0, orientation);

    for (var i = 0; i < specialIndex; i++) {
      newPoints.push(oldPoints[i]);
    }

    newPoints.push(oldPoints[nextIndex].add(oldPoints[index]).scale(0.5));

    for (var _i = specialIndex; _i < numberOfPoints; _i++) {
      newPoints.push(oldPoints[_i]);
    }

    createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView, onAddNewPointKeyPointUpdate); // mainView.updateNodeInServer(name);
  });
};

var deleteKeyPoint = function deleteKeyPoint(scene, keyPointMesh, mainView) {
  var index = keyPointMesh.index;
  var name = keyPointMesh.parent.name;
  mainView.getNodeFromTree(name).forEach(function (pathTreeNode) {
    var item = pathTreeNode.item;
    var mesh = item.mesh;
    var newPoints = item.localPolygon.map(function (x) {
      return _Math_Vec3__WEBPACK_IMPORTED_MODULE_11__["default"].of(x).toBabylon();
    });
    newPoints.splice(index, 1);
    item.keyPoints.splice(index, 1)[0].dispose();
    createNewMeshFromOldUsingNewPoints(newPoints, scene, mesh, item, mainView);
    mainView.updateNodeInServer(name);
  });
};

var getKeyPointActions = function getKeyPointActions(scene, keyPointMesh, mainView) {
  var actions = [];
  mainView.getNodeFromTree(keyPointMesh.parent.name).forEach(function (pathTreeNode) {
    var item = pathTreeNode.item;
    var polygon = item.localPolygon;

    if (polygon.length > 3) {
      actions.push({
        icon: function icon(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
            className: "fas fa-trash"
          }, props));
        },
        action: function action(parentView) {
          deleteKeyPoint(scene, keyPointMesh, parentView);
          parentView.closeContextDial();
        },
        name: "Delete node [DEL]"
      });
    }

    actions.push({
      icon: function icon(props) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
          className: "fas fa-less-than"
        }, props));
      },
      action: function action(parentView) {
        addKeyPointInBetween(scene, keyPointMesh, parentView, -1);
        parentView.closeContextDial();
      },
      name: "Add previous"
    });
    actions.push({
      icon: function icon(props) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("i", _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0___default()({
          className: "fas fa-greater-than"
        }, props));
      },
      action: function action(parentView) {
        addKeyPointInBetween(scene, keyPointMesh, parentView, 1);
        parentView.closeContextDial();
      },
      name: "Add next"
    });
  });
  return actions;
};

var createPlaceHolderKeyPoints = function createPlaceHolderKeyPoints(scene, polygon, polygonMesh, mainView) {
  var keyPoints = [];
  polygon.forEach(function (p, i) {
    var color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__["Color3"](0.25, 0.25, 0.25);
    var keyPoint = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createSphere(scene, color, RADIUS, "".concat(polygonMesh.name, "keyPointPolygon").concat(i), true);
    keyPoint.parent = polygonMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_17__["Observable"]();
    keyPoints.push(keyPoint);
    keyPoint.observers.add(getKeyPointObserverFunction(scene, mainView));
  });
  keyPoints.forEach(function (x) {
    x.onClick = function () {
      mainView.setContextActions(getKeyPointActions(scene, x, mainView));
    };
  });
  return keyPoints;
};

/* harmony default export */ __webpack_exports__["default"] = (PolygonRegion);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/Robot.js":
/*!*************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/Robot.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _AssetNodeItem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./AssetNodeItem */ "./src/Components/Viewer/NodeItem/AssetNodeItem.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_12__);









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }







var Robot = /*#__PURE__*/function (_AssetNodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Robot, _AssetNodeItem);

  var _super = _createSuper(Robot);

  function Robot(meshTree, assetName) {
    var _this;

    var keyValueMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Robot);

    _this = _super.call(this, meshTree.mesh, assetName, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "updateRobot", function (robot, oldTimeInMillis, robotAnimator) {
      var time = new Date().getTime();
      var dt = 1e-3 * (time - oldTimeInMillis);
      robotAnimator(robot, dt);
      _this.requestAnimationFrameId = requestAnimationFrame(function () {
        return _this.updateRobot(robot, time, robotAnimator);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "animate", function (robotAnimator) {
      _this.requestAnimationFrameId = requestAnimationFrame(function () {
        return _this.updateRobot(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), new Date().getTime(), robotAnimator);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getType", function () {
      return Robot.TYPE;
    });

    _this.requestAnimationFrameId = null;
    _this.meshTree = meshTree;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Robot, [{
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Robot.prototype), "toDict", this).call(this);

      return dict;
    }
  }, {
    key: "toForm",
    value: function toForm() {
      var schema = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Robot.prototype), "toForm", this).call(this);

      schema.jsonSchema.properties = {
        oldName: schema.jsonSchema.properties.oldName,
        name: schema.jsonSchema.properties.name,
        type: schema.jsonSchema.properties.type,
        assetName: {
          type: "string",
          title: "Asset Name"
        },
        position: schema.jsonSchema.properties.position,
        quaternion: schema.jsonSchema.properties.quaternion,
        color: schema.jsonSchema.properties.color,
        annotations: schema.jsonSchema.properties.annotations
      };
      schema.uiSchema["assetName"] = {
        "ui:disabled": true
      };
      schema.data["assetName"] = this.assetName;
      return schema;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Robot.prototype), "dispose", this).call(this);

      mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_10__["MasterDB"].unsubscribe({
        Scope: "Robot",
        Name: this.meshTree.id,
        Parameter: "tf"
      });
      window.cancelAnimationFrame(this.requestAnimationFrameId);
    }
  }], [{
    key: "updateRobotMeshTree",
    value: function updateRobotMeshTree(newRobotTf, robot) {
      robot.mesh.position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Vector3"](newRobotTf.position.x, newRobotTf.position.y, newRobotTf.position.z);
      var quaternion = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Quaternion"](newRobotTf.orientation.x, newRobotTf.orientation.y, newRobotTf.orientation.z, newRobotTf.orientation.w);
      robot.mesh.rotationQuaternion = quaternion.normalize();
    }
  }, {
    key: "transformMesh",

    /**
     * Side effect function
     */
    value: function transformMesh(mesh, scene) {
      var thetaX = Math.PI / 2;
      var translate = 0.25;
      var boundScale = 1.9;
      var boundingSphere = mesh.getBoundingInfo().boundingSphere;
      mesh.position.set(-boundingSphere.center.x, -boundingSphere.center.y, -boundingSphere.center.z);
      var tfSphereMesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].createSphere(scene, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Color3"](0.0, 0.0, 0.0), 0.5 * boundingSphere.radius, "tfsphere".concat(mesh.name), false);
      tfSphereMesh.visibility = 0.25;
      tfSphereMesh.scaling = _Math_Vec3__WEBPACK_IMPORTED_MODULE_8__["default"].ONES.scale(1 / boundingSphere.radius).toBabylon();
      tfSphereMesh.addRotation(thetaX, 0, 0);
      tfSphereMesh.position.set(0, 0, translate);
      var spherePlaceHolder = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].createSphere(scene, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Color3"](0.0, 0.0, 0.0), boundScale, mesh.name, true);
      spherePlaceHolder.visibility = 0.1;
      mesh.parent = tfSphereMesh;
      tfSphereMesh.parent = spherePlaceHolder;
      return spherePlaceHolder;
    }
  }, {
    key: "createRobotMeshTreeRecursive",
    value: function createRobotMeshTreeRecursive(node, mesh, parent, scene) {
      var _this2 = this;

      if (!mesh) {
        mesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].createSphere(scene, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Color3"](0.0, 0.0, 0.0), 0.5, node.name, false);
      }

      var meshTree = {
        mesh: mesh,
        children: []
      };
      var position = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Vector3"](node.position.x, node.position.y, node.position.z);
      var quaternion = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Quaternion"](node.orientation.x, node.orientation.y, node.orientation.z, node.orientation.w);
      mesh.position = position;
      mesh.rotationQuaternion = quaternion;

      if (parent) {
        mesh.parent = parent;
      }

      meshTree["children"] = node.child.map(function (child) {
        _this2.createRobotMeshTreeRecursive(child, _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].referentialBuilder(scene).boxParams({
          isVisible: false,
          size: 0.1
        }).build(), mesh, scene);
      });
      return meshTree;
    }
  }, {
    key: "createRobotMeshTree",
    value: function createRobotMeshTree(robotTree, robotMesh, scene) {
      return Robot.createRobotMeshTreeRecursive(robotTree, robotMesh, null, scene);
    }
  }, {
    key: "builder",
    value: function builder() {
      return new RobotBuilder();
    }
  }]);

  return Robot;
}(_AssetNodeItem__WEBPACK_IMPORTED_MODULE_11__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Robot, "ROBOT_MESH_NAME", "Tugbot.stl");

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Robot, "TYPE", "Robot");

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Robot, "getDefaultAnimator", function (parentView) {
  return function (robot, dt) {
    var mesh = robot.mesh;
    var speed = 3;
    var vel = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].getRotationMatrix(mesh).prodVec(new _Math_Vec3__WEBPACK_IMPORTED_MODULE_8__["default"]([speed, 0, 0])).toBabylon();
    mesh.position = mesh.position.add(vel.scale(dt));
    mesh.rotate(_babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Axis"].Z, -Math.PI / 2 * dt, _babylonjs_core__WEBPACK_IMPORTED_MODULE_12__["Space"].LOCAL);
    if (Math.random() < 0.01) parentView.updateNodeInServer(mesh.name);
  };
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(Robot, "getSocketAnimator", function (robot, parentView) {
  mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_10__["MasterDB"].subscribe({
    Scope: "Robot",
    Name: robot.meshTree.id,
    Parameter: "tf"
  }, function (data) {
    var tf = data.key.Robot[robot.meshTree.id].Parameter.tf.Value;

    if (tf) {
      console.log("ROBOT TF UPDATE...", tf);
      Robot.updateRobotMeshTree(tf, robot);
      console.log("Updating robot ", robot);
      if (Math.random() < 0.01) parentView.updateNodeInServer(robot.name);
    }
  }, function (data) {
    console.log("ROBOT INIT SUB...", data.value);
    var tf = data.value.Robot[robot.meshTree.id].Parameter.tf.Value;
    Robot.updateRobotMeshTree(tf, robot);
    console.log("Updating robot ", robot);
    parentView.updateNodeInServer(robot.name);
  });
  return function (robot2Animate, dt) {// empty animation
  };
});

var RobotBuilder = /*#__PURE__*/function () {
  function RobotBuilder() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RobotBuilder);

    this._name = null;
    this._meshTree = null;
    this._parentMesh = null;
    this._scene = null;
    this._isPickable = true;
    this._id = null;
    this._keyValueMap = {};
    this._assetName = null;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RobotBuilder, [{
    key: "name",
    value: function name(_name) {
      this._name = _name;
      return this;
    }
  }, {
    key: "meshTree",
    value: function meshTree(_meshTree) {
      this._meshTree = _meshTree;
      return this;
    }
  }, {
    key: "parentMesh",
    value: function parentMesh(_parentMesh) {
      this._parentMesh = _parentMesh;
      return this;
    }
  }, {
    key: "scene",
    value: function scene(_scene) {
      this._scene = _scene;
      return this;
    }
  }, {
    key: "isPickable",
    value: function isPickable(_isPickable) {
      this._isPickable = _isPickable;
      return this;
    }
  }, {
    key: "id",
    value: function id(_id) {
      this._id = _id;
      return this;
    }
  }, {
    key: "keyValueMap",
    value: function keyValueMap(_keyValueMap) {
      this._keyValueMap = _keyValueMap;
      return this;
    }
  }, {
    key: "assetName",
    value: function assetName(_assetName) {
      this._assetName = _assetName;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var _this3 = this;

      var variables = Object.keys(this).filter(function (x) {
        return x !== "_parentMesh";
      }).map(function (x) {
        return _this3[x];
      });
      variables.forEach(function (x) {
        if (x === null) throw "There are missing variables to build a robot, e.g ".concat(x);
      });
      this._meshTree.id = this._id;
      this._meshTree.name = this._name;
      this._meshTree.mesh.name = this._name;
      this._meshTree.mesh.isPickable = this._isPickable;
      this._meshTree.mesh.parent = this._parentMesh;
      var baseAxis = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_9__["default"].referentialBuilder(this._scene).isPickable(false).boxParams({
        isVisible: false,
        size: 0.1
      }).name("".concat(this._name, "Axis")).build();
      baseAxis.parent = this._meshTree.mesh;
      return new Robot(this._meshTree, this._assetName, this._keyValueMap);
    }
  }]);

  return RobotBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (Robot);

/***/ }),

/***/ "./src/Components/Viewer/NodeItem/Wall.js":
/*!************************************************!*\
  !*** ./src/Components/Viewer/NodeItem/Wall.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/get */ "@babel/runtime/helpers/esm/get");
/* harmony import */ var _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _NodeItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NodeItem */ "./src/Components/Viewer/NodeItem/NodeItem.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Utils/Constants */ "./src/Components/Viewer/Utils/Constants.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_14__);










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var Wall = /*#__PURE__*/function (_NodeItem) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Wall, _NodeItem);

  var _super = _createSuper(Wall);

  function Wall(mesh, localWall, size) {
    var _this;

    var keyPoints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var keyValueMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Wall);

    _this = _super.call(this, mesh, keyValueMap);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "getType", function () {
      return Wall.TYPE;
    });

    _this.localWall = localWall;
    _this.size = size;
    _this.keyPoints = keyPoints;
    return _this;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Wall, [{
    key: "toDict",
    value: function toDict() {
      var dict = _babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Wall.prototype), "toDict", this).call(this);

      dict.localWall = this.localWall;
      dict.size = this.size;
      return dict;
    }
  }, {
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return Wall.ofDict(scene, dict, mainView);
    }
  }], [{
    key: "ofDict",
    value: function ofDict(scene) {
      var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var mainView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!dict) throw "null dictionary describing wall";
      var name = monet__WEBPACK_IMPORTED_MODULE_11__["Maybe"].fromNull(dict.name).orSome("Wall".concat(Math.floor(Math.random() * 1e3)));
      var mesh = createWallMesh(dict, name, scene);
      var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["StandardMaterial"]("WallMaterial".concat(name), scene);
      var color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Color3"](dict.color[0], dict.color[1], dict.color[2]);
      material.diffuseColor = color;
      material.emissiveColor = color;
      mesh.material = material; // babylonjs highlight shader flickers when floor intersect

      mesh.position.z += 1e-3;
      var keypoints = createPlaceHolderKeyPoints(scene, dict.localWall.map(function (x) {
        return _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].of(x).toBabylon();
      }), mesh, mainView);
      return new Wall(mesh, dict.localWall, dict.size, keypoints, dict.keyValueMap);
    }
  }]);

  return Wall;
}(_NodeItem__WEBPACK_IMPORTED_MODULE_9__["default"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(Wall, "TYPE", "Wall");

var RADIUS = _Utils_Constants__WEBPACK_IMPORTED_MODULE_13__["default"].RADIUS;
var FACES = [[0, 1, 2], [2, 3, 0], [4, 6, 5], [6, 4, 7], [0, 5, 1], [5, 0, 4], [3, 2, 6], [6, 7, 3], [1, 6, 2], [6, 1, 5], [0, 3, 7], [7, 4, 0]];

function createWallMesh(dict, name, scene) {
  var centeredWall = dict.localWall.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].of(x).toBabylon();
  });
  var middlePoint = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].of(dict.position).toBabylon();
  var tangent = centeredWall[1].subtract(centeredWall[0]).normalize();
  var normal = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"](-tangent.y, tangent.x, 0);
  var shape = [centeredWall[0].add(normal.scale(dict.size.width)), centeredWall[0].subtract(normal.scale(dict.size.width)), centeredWall[1].subtract(normal.scale(dict.size.width)), centeredWall[1].add(normal.scale(dict.size.width))];
  var h = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Vector3"](0, 0, dict.size.height);
  var wallMesh = {
    positions: [shape[0], shape[1], shape[2], shape[3], shape[0].add(h), shape[1].add(h), shape[2].add(h), shape[3].add(h)],
    faces: FACES
  };
  var mesh = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].meshFromPositionAndFaces(name, scene, wallMesh.positions, wallMesh.faces);
  mesh.position = middlePoint;
  return mesh;
}

function createNewMeshFromOldUsingNewPoints(newWall, scene, mesh, item) {
  var average = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].pointAverageVec3(newWall.localWall.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].of(x);
  }));
  newWall.position = average.toArray();
  newWall.localWall = newWall.localWall.map(function (x) {
    return _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].of(x).sub(average).toArray();
  });
  var newMesh = createWallMesh(newWall, mesh.name, scene);
  newMesh.position = mesh.position;
  newMesh.rotationQuaternion = mesh.rotationQuaternion;
  newMesh.locallyTranslate(average.toBabylon());
  newMesh.material = mesh.material;
  newMesh.visibility = mesh.visibility;
  newMesh.parent = mesh.parent;
  item.mesh = newMesh;
  item.localWall = newWall.localWall;

  var childrenCopy = _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(mesh._children);

  childrenCopy.forEach(function (c) {
    mesh.removeChild(c);
    c.parent = newMesh;
  });
  item.keyPoints.forEach(function (k, j) {
    k.position = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].of(newWall.localWall[j]).toBabylon();
  }); // dispose old mesh

  mesh.dispose();
}

var getKeyPointObserverFunction = function getKeyPointObserverFunction(mainView, scene) {
  return function (_ref) {
    var updatedPointMesh = _ref.updatedPointMesh,
        is2updateServer = _ref.is2updateServer;
    mainView.getNodeFromTree(updatedPointMesh.parent.name).forEach(function (wallNode) {
      var index = updatedPointMesh.index;
      var item = wallNode.item;
      var mesh = item.mesh;
      var newWall = {
        position: _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(mesh.position).toArray(),
        localWall: item.localWall,
        size: item.size
      };
      newWall.localWall[index] = _Math_Vec3__WEBPACK_IMPORTED_MODULE_10__["default"].ofBabylon(updatedPointMesh.position).toArray();
      createNewMeshFromOldUsingNewPoints(newWall, scene, mesh, item);

      if (is2updateServer) {
        mainView.updateNodeInServer(mesh.name);
      }
    });
  };
};

var createPlaceHolderKeyPoints = function createPlaceHolderKeyPoints(scene, wall, wallMesh, mainView) {
  var keyPoints = [];
  wall.forEach(function (p, i) {
    var keyPoint = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_12__["default"].createSphere(scene, new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Color3"](0.25, 0.25, 0.25), RADIUS, "".concat(wallMesh.name, "keyPointWall").concat(i), true);
    keyPoint.parent = wallMesh;
    keyPoint.position = p;
    keyPoint.index = i;
    keyPoint.observers = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_14__["Observable"]();
    keyPoint.observers.add(getKeyPointObserverFunction(mainView, scene));
    keyPoints.push(keyPoint);
  });
  return keyPoints;
};

/* harmony default export */ __webpack_exports__["default"] = (Wall);

/***/ }),

/***/ "./src/Components/Viewer/SceneViewer.js":
/*!**********************************************!*\
  !*** ./src/Components/Viewer/SceneViewer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "@babel/runtime/helpers/esm/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "@babel/runtime/helpers/esm/toConsumableArray");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "@babel/runtime/helpers/esm/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "@babel/runtime/helpers/esm/inherits");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "@babel/runtime/helpers/esm/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "@babel/runtime/helpers/esm/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _BaseViewer_BaseViewer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./BaseViewer/BaseViewer */ "./src/Components/Viewer/BaseViewer/BaseViewer.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _MainView_MainViewRetriever__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./MainView/MainViewRetriever */ "./src/Components/Viewer/MainView/MainViewRetriever.js");
/* harmony import */ var _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Utils/DefaultScene */ "./src/Components/Viewer/Utils/DefaultScene.js");
/* harmony import */ var _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./NodeItem/GlobalRef */ "./src/Components/Viewer/NodeItem/GlobalRef.js");
/* harmony import */ var _Utils_SceneServerUtils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Utils/SceneServerUtils */ "./src/Components/Viewer/Utils/SceneServerUtils.js");
/* harmony import */ var _Utils_TreeServerUtils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Utils/TreeServerUtils */ "./src/Components/Viewer/Utils/TreeServerUtils.js");
/* harmony import */ var _AssetsManager_AssetsManager__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./AssetsManager/AssetsManager */ "./src/Components/Viewer/AssetsManager/AssetsManager.js");
/* harmony import */ var _TreeObject_TreeObject__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./TreeObject/TreeObject */ "./src/Components/Viewer/TreeObject/TreeObject.js");
/* harmony import */ var _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./NodeItem/GraphItem */ "./src/Components/Viewer/NodeItem/GraphItem.js");
/* harmony import */ var _Utils_DefaultMouseEvents__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Utils/DefaultMouseEvents */ "./src/Components/Viewer/Utils/DefaultMouseEvents.js");
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! react-resize-detector */ "react-resize-detector");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(react_resize_detector__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _Modal_ConfirmAlertModal__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../Modal/ConfirmAlertModal */ "./src/Components/Modal/ConfirmAlertModal.js");











function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


















 //========================================================================================

/*                                                                                      *
 *                                      SceneViewer                                     *
 *                                                                                      */
//========================================================================================

var SceneViewer = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6___default()(SceneViewer, _Component);

  var _super = _createSuper(SceneViewer);

  function SceneViewer(props) {
    var _this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, SceneViewer);

    _this = _super.call(this, props);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getSceneMemory", function () {
      return _this.sceneMemory;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getAssetsActionMap", function () {
      return _AssetsManager_AssetsManager__WEBPACK_IMPORTED_MODULE_20__["default"].getInstance().getAssetsActionMap();
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getRootNode", function () {
      var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(_this.objectTree);
      return tree.filter(function (x) {
        return x.title === _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_17__["default"].NAME;
      })[0];
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getObjectTree", function () {
      return _this.objectTree;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "setSelectedAction", function () {
      /* empty */
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "getNodeFromTree", function (name) {
      var objectTree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(_this.objectTree);
      return _Utils_TreeServerUtils__WEBPACK_IMPORTED_MODULE_19__["default"].ofScene(_this.sceneName).getNodeFromTree(name, objectTree);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "deleteNodeFromTreeUsingName", function () {
      throw new Error("Delete Node in viewer Exception");
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "updateNodeInServer", function (name) {
      var oldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (_this.props.focusObject.Value === name) _this.setCameraToTarget();
      _Utils_TreeServerUtils__WEBPACK_IMPORTED_MODULE_19__["default"].ofScene(_this.sceneName).updateNodeInServer(name, _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(_this.objectTree), oldName);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "addNodeItem2Tree", function (nodeItem) {
      var parentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_17__["default"].NAME;
      var is2addInServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var isVisible = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var newObjectTree = _Utils_TreeServerUtils__WEBPACK_IMPORTED_MODULE_19__["default"].ofScene(_this.sceneName).addNodeItem2Tree(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(_this.objectTree), nodeItem, parentName, is2addInServer, isVisible);
      _this.objectTree = newObjectTree;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "setCameraToTarget", function () {
      _this.sceneMemory.forEach(function (_ref) {
        var camera = _ref.camera;
        var focusObject = _this.props.focusObject.Value;

        _this.getNodeFromTree(focusObject).cata(function () {
          console.log("Set Camera", _this.getRootNode().item.mesh._absolutePosition);
          camera.setTarget(_this.getRootNode().item.mesh._absolutePosition.clone());
        }, function (x) {
          console.log("Set Camera, Found Object", x.item.mesh);
          camera.setTarget(x.item.mesh._absolutePosition.clone());
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onPointerDown", function (evt) {
      _Utils_DefaultMouseEvents__WEBPACK_IMPORTED_MODULE_23__["default"].onPointerDown(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this))(evt);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onPointerUp", function (evt) {
      _Utils_DefaultMouseEvents__WEBPACK_IMPORTED_MODULE_23__["default"].onPointerUp(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this))(evt);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onPointerMove", function (evt) {
      _Utils_DefaultMouseEvents__WEBPACK_IMPORTED_MODULE_23__["default"].onPointerMove(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this))(evt);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onResize", function (w, h) {
      if (w === 0 && h === 0) return;

      _this.getSceneMemory().forEach(function (_ref2) {
        var mouseLocationText = _ref2.mouseLocationText;
        mouseLocationText.left = -w / 2 + w / 17;
        mouseLocationText.top = -h / 2 + h / 30;
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "retrieveSceneFromServer", function () {
      var afterLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      _Utils_SceneServerUtils__WEBPACK_IMPORTED_MODULE_18__["default"].retrieveScene(_this.sceneName, function (data) {
        var errorList = _MainView_MainViewRetriever__WEBPACK_IMPORTED_MODULE_15__["default"].importScene(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), data.result);

        _this.setState({
          errorList: errorList
        });

        afterLoading();
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "loadAssets", /*#__PURE__*/_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _AssetsManager_AssetsManager__WEBPACK_IMPORTED_MODULE_20__["default"].getInstance().load();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "loadScene", /*#__PURE__*/_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.loadAssets();

            case 2:
              _this.retrieveSceneFromServer(_this.renderScene);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "renderScene", function () {
      _this.getSceneMemory().forEach(function (_ref5) {
        var engine = _ref5.engine,
            scene = _ref5.scene;
        return engine.runRenderLoop(function () {
          return scene.render();
        });
      });

      _this.setCameraToTarget();
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "onSceneReady", function (scene) {
      var engine = scene.getEngine();
      var canvas = engine.getRenderingCanvas();

      _this.addCanvasEventListeners(canvas);

      var mouseLocationText = _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_16__["default"].createMouseLocationText(scene);
      _this.sceneMemory = monet__WEBPACK_IMPORTED_MODULE_14__["Maybe"].some({
        engine: engine,
        canvas: canvas,
        scene: scene,
        camera: _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_16__["default"].createCamera(scene, canvas),
        light: _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_16__["default"].createLight(scene),
        ground: _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_16__["default"].createMeshGround(scene),
        gizmoManager: _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_16__["default"].createGizmo(scene),
        highlightLayer: {
          hl: new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["HighlightLayer"]("hl1", scene),
          lastHlMeshes: []
        },
        mouseLocationText: mouseLocationText
      });
      return scene;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "renderMenus", function () {// to implement interface of MainView
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "componentDidUpdate", function (prevProps) {
      var predicateAction = [{
        propVar: function propVar(x) {
          return x.sceneName.Value;
        },
        action: function action() {
          return _this.sceneName = _this.props.sceneName.Value;
        }
      }, {
        propVar: function propVar(x) {
          return x.focusObject.Value;
        },
        action: _this.setCameraToTarget
      }];
      predicateAction.forEach(function (_ref6) {
        var propVar = _ref6.propVar,
            action = _ref6.action;

        if (propVar(_this.props) !== propVar(prevProps)) {
          action();
        }
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "componentDidMount", function () {
      console.log("SceneViewer Did Mount!! ");

      _this.loadScene();
    });

    _this.state = {
      errorList: []
    };
    _this.sceneName = props.sceneName.Value;
    _this.sceneMemory = monet__WEBPACK_IMPORTED_MODULE_14__["Maybe"].none();
    _this.objectTree = [];
    return _this;
  } //========================================================================================

  /*                                                                                      *
   *                                   Getters & Setters                                  *
   *                                                                                      */
  //========================================================================================


  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4___default()(SceneViewer, [{
    key: "getGraph",
    value: function getGraph() {
      return new _TreeObject_TreeObject__WEBPACK_IMPORTED_MODULE_21__["default"](this.objectTree).getNode(function (x) {
        return _NodeItem_GraphItem__WEBPACK_IMPORTED_MODULE_22__["default"].TYPE === x.item.getType();
      });
    } //========================================================================================

    /*                                                                                      *
     *                                    Utils functions                                   *
     *                                                                                      */
    //========================================================================================

  }, {
    key: "addCanvasEventListeners",
    value: function addCanvasEventListeners(canvas) {
      var _this2 = this;

      var events = [{
        name: "pointerdown",
        "function": function _function(evt) {
          return _this2.onPointerDown(evt);
        }
      }, {
        name: "pointerup",
        "function": function _function(evt) {
          return _this2.onPointerUp(evt);
        }
      }, {
        name: "pointermove",
        "function": function _function(evt) {
          return _this2.onPointerMove(evt);
        }
      }];
      events.forEach(function (event) {
        return canvas.addEventListener(event.name, event["function"], false);
      });
    }
  }, {
    key: "getMouseCoordinatesFromRoot",
    value: function getMouseCoordinatesFromRoot() {
      var _this3 = this;

      return this.sceneMemory.flatMap(function (_ref7) {
        var scene = _ref7.scene,
            ground = _ref7.ground;
        var maybeCurrent = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_24__["default"].getGroundPosition(scene, ground);
        return maybeCurrent.flatMap(function (current) {
          return monet__WEBPACK_IMPORTED_MODULE_14__["Maybe"].fromNull(_this3.getRootNode()).map(function (rootNode) {
            return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_24__["default"].computeLocalCoordinatesFromMesh(rootNode.item.mesh, _Math_Vec3__WEBPACK_IMPORTED_MODULE_25__["default"].ofBabylon(current)).toBabylon();
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var errorList = this.state.errorList;

      var resetErrorList = function resetErrorList() {
        return _this4.setState({
          errorList: []
        });
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        style: {
          display: "flex",
          flexGrow: 1
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_BaseViewer_BaseViewer__WEBPACK_IMPORTED_MODULE_11__["default"], {
        onSceneReady: this.onSceneReady,
        is2render: false,
        sceneFactory: _Utils_DefaultScene__WEBPACK_IMPORTED_MODULE_16__["default"].createScene
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_Modal_ConfirmAlertModal__WEBPACK_IMPORTED_MODULE_27__["default"], {
        onSubmit: resetErrorList,
        onCancel: resetErrorList,
        open: (errorList === null || errorList === void 0 ? void 0 : errorList.length) > 0,
        title: "Scene Viewer",
        message: "An error occurred while loading the scene",
        submitText: "OK",
        submitColor: "primary",
        cancelText: "Cancel",
        cancelColor: "secondary"
      }, getErrorSolutionList(errorList)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_resize_detector__WEBPACK_IMPORTED_MODULE_26___default.a, {
        handleWidth: true,
        handleHeight: true,
        onResize: this.onResize
      }));
    } //========================================================================================

    /*                                                                                      *
     *                                   Static functions                                   *
     *                                                                                      */
    //========================================================================================

  }], [{
    key: "getComponentFactory",
    value: function getComponentFactory(sceneName) {
      return function (masterProps) {
        var augmentProps = _objectSpread({
          sceneName: sceneName
        }, masterProps);

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(SceneViewer, augmentProps);
      };
    }
  }]);

  return SceneViewer;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(SceneViewer, "EXTENSION", ".3d");

SceneViewer.propTypes = {
  sceneName: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.shape({
    Value: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string
  }),
  focusObject: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.shape({
    Value: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string
  })
};
SceneViewer.defaultProps = {
  sceneName: {
    Value: "Pedro"
  },
  focusObject: {
    Value: ""
  }
};

function getErrorSolutionList(errorList) {
  return !errorList ? [] : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("ul", null, errorList.map(function (_ref8, i) {
    var cause = _ref8.cause,
        solution = _ref8.solution;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("li", {
      key: "error" + i
    }, "".concat(cause, ", ").concat(solution));
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SceneViewer);

/***/ }),

/***/ "./src/Components/Viewer/TreeObject/TreeNode.js":
/*!******************************************************!*\
  !*** ./src/Components/Viewer/TreeObject/TreeNode.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);



var TreeNode = /*#__PURE__*/function () {
  function TreeNode(title, item, children, expanded, isVisible) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TreeNode);

    this.title = title;
    this.item = item;
    this.children = children;
    this.expanded = expanded;
    this.isVisible = isVisible;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TreeNode, null, [{
    key: "dispose",
    value: function dispose(node) {
      /*
       * function must be defined here, otherwise it wouldn't work on the UI Tree change method
       */
      node.item.dispose();
      node.children.forEach(function (child) {
        TreeNode.dispose(child);
      });
    }
    /**
     *
     * @param {*} node
     */

  }, {
    key: "toDict",
    value: function toDict(node) {
      /*
       * function must be defined here, otherwise it wouldn't work on the UI Tree change method
       */
      return {
        name: node.title,
        item: node.item.toDict(),
        children: node.children.map(function (child) {
          return TreeNode.toDict(child);
        })
      };
    }
  }, {
    key: "builder",
    value: function builder() {
      return new TreeNodeBuilder();
    }
  }]);

  return TreeNode;
}();

var TreeNodeBuilder = /*#__PURE__*/function () {
  function TreeNodeBuilder() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TreeNodeBuilder);

    this._title = null;
    this._item = {};
    this._children = [];
    this._expanded = true;
    this._isVisible = true;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TreeNodeBuilder, [{
    key: "title",
    value: function title(_title) {
      this._title = _title;
      return this;
    }
  }, {
    key: "item",
    value: function item(_item) {
      this._item = _item;
      return this;
    }
  }, {
    key: "children",
    value: function children(_children) {
      this._children = _children;
      return this;
    }
  }, {
    key: "expanded",
    value: function expanded(_expanded) {
      this._expanded = _expanded;
      return this;
    }
  }, {
    key: "isVisible",
    value: function isVisible(_isVisible) {
      this._isVisible = _isVisible;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      Object.values(this).forEach(function (value) {
        if (value === null) throw "There are missing variables to build a TreeNode, e.g ".concat(value);
      });
      return new TreeNode(this._title, this._item, this._children, this._expanded, this._isVisible);
    }
  }]);

  return TreeNodeBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (TreeNode);

/***/ }),

/***/ "./src/Components/Viewer/TreeObject/TreeObject.js":
/*!********************************************************!*\
  !*** ./src/Components/Viewer/TreeObject/TreeObject.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_3__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



function getNodeRecursive(tree, predicate) {
  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];
    if (predicate(node)) return monet__WEBPACK_IMPORTED_MODULE_3__["Maybe"].some(node);
    var answer = getNodeRecursive(node.children, predicate);
    if (answer.isSome()) return answer;
  }

  return monet__WEBPACK_IMPORTED_MODULE_3__["Maybe"].none();
}

function getParentNodeRecursive(tree, predicate, parent) {
  var foundChild = tree.map(function (x) {
    return predicate(x);
  }).reduce(function (e, x) {
    return e || x;
  }, false);
  if (foundChild) return monet__WEBPACK_IMPORTED_MODULE_3__["Maybe"].fromNull(parent);

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];
    var answer = getParentNodeRecursive(node.children, predicate, node);
    if (answer.isSome()) return answer;
  }

  return monet__WEBPACK_IMPORTED_MODULE_3__["Maybe"].none();
}

function compareTreesRecursive(treeA, treeB, nodeEquality) {
  if (treeA.length === treeB.length) {
    var ans = true;

    for (var i = 0; i < treeA.length; i++) {
      var nodeA = treeA[i];
      var nodeB = treeB[i];

      if (nodeEquality(nodeA, nodeB)) {
        ans = ans && compareTreesRecursive(nodeA.children, nodeB.children, nodeEquality);
      } else {
        return false;
      }
    }

    return ans;
  }

  return false;
}

function mapRecursive(tree, newTree, map) {
  tree.forEach(function (nod) {
    var node = _objectSpread({}, nod);

    var mappedNode = map(node);
    mappedNode.children = mapRecursive(node.children, [], map);
    newTree.push(mappedNode);
  });
  return newTree;
}

function forEachRecursive() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var forEach = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  tree.forEach(function (node) {
    forEach(node);
    forEachRecursive(node.children, forEach);
  });
}

function expand(node) {
  node.expanded = true;
  return node;
}

function filterTree() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (node) {
    return true;
  };
  if (!tree || tree.length === 0) return [];
  var result = [];
  tree.forEach(function (nod) {
    var node = _objectSpread({}, nod);

    if (predicate(node)) {
      var expanded = expand(node);
      expanded.children = filterTree(expanded.children, predicate);
      result.push(expanded);
    } else if (node.children) {
      var children = filterTree(node.children, predicate);

      if (children.length !== 0) {
        node.children = children;
        result.push(expand(node));
      }
    }
  });
  return result;
}

function _flatten() {
  var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (node) {
    return true;
  };
  if (!tree || tree.length === 0) return [];
  var result = [];
  tree.forEach(function (nod) {
    var node = _objectSpread({}, nod);

    if (predicate(node)) result.push(node);
    result = result.concat(_flatten(node.children, predicate));
  });
  return result;
}
/**
 * General purpose tree
 *
 * It just need a basic structure as input:
 *  Tree: Array<Node>
 *  Node: {children: Array<Node>}
 */


var TreeObject = /*#__PURE__*/function () {
  function TreeObject(tree) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TreeObject);

    this.tree = tree;
  }
  /**
   * Return maybe node based on predicate
   * @param {*} predicate
   */


  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TreeObject, [{
    key: "getNode",
    value: function getNode(predicate) {
      return getNodeRecursive(this.tree, predicate);
    }
    /**
     * return maybe parent node based on the child predicate
     * @param {*} childPredicate
     */

  }, {
    key: "getParentNode",
    value: function getParentNode(childPredicate) {
      return getParentNodeRecursive(this.tree, childPredicate, null);
    }
  }, {
    key: "equals",
    value: function equals(tree) {
      var nodeEquality = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
        return a === b;
      };

      if (tree.constructor === TreeObject) {
        return compareTreesRecursive(this.tree, tree.tree, nodeEquality);
      }

      return compareTreesRecursive(this.tree, tree, nodeEquality);
    }
  }, {
    key: "map",
    value: function map(nodeMap) {
      return new TreeObject(mapRecursive(this.tree, [], nodeMap));
    }
  }, {
    key: "filter",
    value: function filter() {
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (node) {
        return true;
      };
      return new TreeObject(filterTree(this.tree, predicate));
    }
    /**
     *
     * @param {*} predicate: node => Boolean
     * @returns Array with flattened tree while filtering values with predicate
     */

  }, {
    key: "flatten",
    value: function flatten() {
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (node) {
        return true;
      };
      return _flatten(this.tree, predicate);
    }
  }, {
    key: "forEach",
    value: function forEach(map) {
      forEachRecursive(this.tree, map);
    }
  }]);

  return TreeObject;
}();

/* harmony default export */ __webpack_exports__["default"] = (TreeObject);

/***/ }),

/***/ "./src/Components/Viewer/Util3d/CameraBuilder.js":
/*!*******************************************************!*\
  !*** ./src/Components/Viewer/Util3d/CameraBuilder.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);




var CameraBuilder = /*#__PURE__*/function () {
  function CameraBuilder(scene) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CameraBuilder);

    this._scene = scene;
    this._sphericalCoordinates = null;
    this._target = null;
    this._name = "camera".concat(Math.floor(Math.random() * 1e3));
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CameraBuilder, [{
    key: "name",
    value: function name(_name) {
      this._name = _name;
      return this;
    }
  }, {
    key: "sphericalCoordinates",
    value: function sphericalCoordinates(_sphericalCoordinates) {
      this._sphericalCoordinates = _sphericalCoordinates;
      return this;
    }
  }, {
    key: "target",
    value: function target(_target) {
      this._target = _target;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var variables = Object.values(this);
      variables.forEach(function (x) {
        if (x === null) throw "There are missing variables to build a camera, e.g ".concat(x);
      });
      return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["ArcRotateCamera"](this._name, this._sphericalCoordinates.x, this._sphericalCoordinates.y, this._sphericalCoordinates.z, this._target, this._scene);
    }
  }]);

  return CameraBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (CameraBuilder);

/***/ }),

/***/ "./src/Components/Viewer/Util3d/DirectionalLightBuilder.js":
/*!*****************************************************************!*\
  !*** ./src/Components/Viewer/Util3d/DirectionalLightBuilder.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);




var DirectionalLightBuilder = /*#__PURE__*/function () {
  function DirectionalLightBuilder(scene) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DirectionalLightBuilder);

    this._scene = scene;
    this._direction = null;
    this._name = "Dlight".concat(Math.floor(Math.random() * 1e3));
    this._intensity = 1;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DirectionalLightBuilder, [{
    key: "direction",
    value: function direction(_direction) {
      this._direction = _direction;
      return this;
    }
  }, {
    key: "name",
    value: function name(_name) {
      this._name = _name;
      return this;
    }
  }, {
    key: "intensity",
    value: function intensity(_intensity) {
      this._intensity = _intensity;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var variables = Object.values(this);
      variables.forEach(function (x) {
        if (x === null) throw "There are missing variables to build a light, e.g ".concat(x);
      });
      var light = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["DirectionalLight"](this._name, this._direction.normalize(), this._scene);
      light.intensity = this._intensity;
      return light;
    }
  }]);

  return DirectionalLightBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (DirectionalLightBuilder);

/***/ }),

/***/ "./src/Components/Viewer/Util3d/GizmoManagerBuilder.js":
/*!*************************************************************!*\
  !*** ./src/Components/Viewer/Util3d/GizmoManagerBuilder.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);




var GizmoManagerBuilder = /*#__PURE__*/function () {
  function GizmoManagerBuilder(scene) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GizmoManagerBuilder);

    this._scene = scene;
    this._isPosition = false;
    this._isRotation = false;
    this._isBoundingBox = false;
    this._isScale = false;
    this._usePointerToAttachGizmos = false;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GizmoManagerBuilder, [{
    key: "isPosition",
    value: function isPosition(v) {
      this._isPosition = v;
      return this;
    }
  }, {
    key: "isRotation",
    value: function isRotation(v) {
      this._isRotation = v;
      return this;
    }
  }, {
    key: "isBoundingBox",
    value: function isBoundingBox(v) {
      this._isBoundingBox = v;
      return this;
    }
  }, {
    key: "isScale",
    value: function isScale(v) {
      this._isScale = v;
      return this;
    }
  }, {
    key: "usePointerToAttachGizmos",
    value: function usePointerToAttachGizmos(v) {
      this._usePointerToAttachGizmos = v;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var gizmoManager = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["GizmoManager"](this._scene);
      gizmoManager.positionGizmoEnabled = this._isPosition;
      gizmoManager.rotationGizmoEnabled = this._isRotation;
      gizmoManager.boundingBoxGizmoEnabled = this._isBoundingBox;
      gizmoManager.scaleGizmoEnabled = this._isScale;
      gizmoManager.usePointerToAttachGizmos = this._usePointerToAttachGizmos;
      return gizmoManager;
    }
  }]);

  return GizmoManagerBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (GizmoManagerBuilder);

/***/ }),

/***/ "./src/Components/Viewer/Util3d/GroundBuilder.js":
/*!*******************************************************!*\
  !*** ./src/Components/Viewer/Util3d/GroundBuilder.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);




var GroundBuilder = /*#__PURE__*/function () {
  function GroundBuilder(scene) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GroundBuilder);

    this._scene = scene;
    this._name = "camera".concat(Math.floor(Math.random() * 1e3));
    this._width = 1;
    this._height = 1;
    this._textureSrc = null;
    this._isPickable = false;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GroundBuilder, [{
    key: "name",
    value: function name(_name) {
      this._name = _name;
      return this;
    }
  }, {
    key: "width",
    value: function width(_width) {
      this._width = _width;
      return this;
    }
  }, {
    key: "height",
    value: function height(_height) {
      this._height = _height;
      return this;
    }
  }, {
    key: "textureSrc",
    value: function textureSrc(_textureSrc) {
      this._textureSrc = _textureSrc;
      return this;
    }
  }, {
    key: "isPickable",
    value: function isPickable(_isPickable) {
      this._isPickable = _isPickable;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var ground = _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Mesh"].CreateGround(this._name, this._width, this._height, 1, this._scene);
      ground.translate(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, -1, 0), 1e-1, _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Space"].WORLD);

      if (this._textureSrc) {
        ground.material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["StandardMaterial"]("Texture".concat(this._name), this._scene);
        ground.material.ambientTexture = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Texture"](this._textureSrc, this._scene);
        ground.material.ambientTexture.uScale = 1;
        ground.material.ambientTexture.vScale = 1;
      }

      ground.isPickable = this._isPickable;
      return ground;
    }
  }]);

  return GroundBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (GroundBuilder);

/***/ }),

/***/ "./src/Components/Viewer/Util3d/PositionalLightBuilder.js":
/*!****************************************************************!*\
  !*** ./src/Components/Viewer/Util3d/PositionalLightBuilder.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);




var PositionalLightBuilder = /*#__PURE__*/function () {
  function PositionalLightBuilder(scene) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PositionalLightBuilder);

    this._scene = scene;
    this._position = null;
    this._name = "light".concat(Math.floor(Math.random() * 1e3));
    this._intensity = 1;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PositionalLightBuilder, [{
    key: "position",
    value: function position(_position) {
      this._position = _position;
      return this;
    }
  }, {
    key: "name",
    value: function name(_name) {
      this._name = _name;
      return this;
    }
  }, {
    key: "intensity",
    value: function intensity(_intensity) {
      this._intensity = _intensity;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var variables = Object.values(this);
      variables.forEach(function (x) {
        if (x === null) throw "There are missing variables to build a light, e.g ".concat(x);
      });
      var light = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["PointLight"](this._name, this._position, this._scene);
      light.intensity = this._intensity;
      return light;
    }
  }]);

  return PositionalLightBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (PositionalLightBuilder);

/***/ }),

/***/ "./src/Components/Viewer/Util3d/ReferentialBuilder.js":
/*!************************************************************!*\
  !*** ./src/Components/Viewer/Util3d/ReferentialBuilder.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);




var ReferentialBuilder = /*#__PURE__*/function () {
  function ReferentialBuilder(scene) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ReferentialBuilder);

    this._scene = scene;
    this._name = "referential".concat(Math.floor(Math.random() * 1e3));
    this._isPickable = true;
    this._boxParams = {
      isVisible: true,
      size: 0.25
    };
    this._size = 1;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ReferentialBuilder, [{
    key: "name",
    value: function name(_name) {
      this._name = _name;
      return this;
    }
  }, {
    key: "isPickable",
    value: function isPickable(_isPickable) {
      this._isPickable = _isPickable;
      return this;
    }
  }, {
    key: "boxParams",
    value: function boxParams(_boxParams) {
      this._boxParams = _boxParams;
      return this;
    }
  }, {
    key: "size",
    value: function size(_size) {
      this._size = _size;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var size = this._size;
      var axisX = _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Mesh"].CreateLines("axisX".concat(this._name), [new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"].Zero(), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](size, 0, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](size * 0.95, 0.05 * size, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](size, 0, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](size * 0.95, -0.05 * size, 0)], this._scene);
      axisX.color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Color3"](1, 0, 0);
      axisX.isPickable = false;
      var axisY = _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Mesh"].CreateLines("axisY".concat(this._name), [new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"].Zero(), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, size, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](-0.05 * size, size * 0.95, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, size, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0.05 * size, size * 0.95, 0)], this._scene);
      axisY.color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Color3"](0, 1, 0);
      axisY.isPickable = false;
      var axisZ = _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Mesh"].CreateLines("axisZ".concat(this._name), [new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"].Zero(), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, 0, size), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, -0.05 * size, size * 0.95), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, 0, size), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, 0.05 * size, size * 0.95)], this._scene);
      axisZ.color = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Color3"](0, 0, 1);
      axisZ.isPickable = false;
      var localOrigin = _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["MeshBuilder"].CreateBox(this._name, {
        size: this._boxParams.size
      }, this._scene);
      localOrigin.isVisible = this._boxParams.isVisible;
      localOrigin.isPickable = this._isPickable;
      axisX.parent = localOrigin;
      axisY.parent = localOrigin;
      axisZ.parent = localOrigin;
      return localOrigin;
    }
  }]);

  return ReferentialBuilder;
}();

/* harmony default export */ __webpack_exports__["default"] = (ReferentialBuilder);

/***/ }),

/***/ "./src/Components/Viewer/Util3d/Util3d.js":
/*!************************************************!*\
  !*** ./src/Components/Viewer/Util3d/Util3d.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Math/Vec3 */ "./src/Components/Viewer/Math/Vec3.js");
/* harmony import */ var _Math_Mat3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Math/Mat3 */ "./src/Components/Viewer/Math/Mat3.js");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _GizmoManagerBuilder_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GizmoManagerBuilder.js */ "./src/Components/Viewer/Util3d/GizmoManagerBuilder.js");
/* harmony import */ var _CameraBuilder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CameraBuilder */ "./src/Components/Viewer/Util3d/CameraBuilder.js");
/* harmony import */ var _PositionalLightBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PositionalLightBuilder */ "./src/Components/Viewer/Util3d/PositionalLightBuilder.js");
/* harmony import */ var _ReferentialBuilder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ReferentialBuilder */ "./src/Components/Viewer/Util3d/ReferentialBuilder.js");
/* harmony import */ var _GroundBuilder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./GroundBuilder */ "./src/Components/Viewer/Util3d/GroundBuilder.js");
/* harmony import */ var _DirectionalLightBuilder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DirectionalLightBuilder */ "./src/Components/Viewer/Util3d/DirectionalLightBuilder.js");
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! earcut */ "earcut");
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(earcut__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../NodeItem/GlobalRef */ "./src/Components/Viewer/NodeItem/GlobalRef.js");
/* harmony import */ var _NodeItem_Box__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../NodeItem/Box */ "./src/Components/Viewer/NodeItem/Box.js");

















var Util3d = /*#__PURE__*/function () {
  function Util3d() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Util3d);
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Util3d, null, [{
    key: "getWorldCoordinates",
    value: function getWorldCoordinates(mesh, localPosition) {
      if (mesh.parent && mesh.parent.name === _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_14__["default"].NAME) return _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(localPosition);
      var meshParent = mesh.parent;
      var meshParentPos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(meshParent.position);
      var meshParentRotMat = Util3d.getRotationMatrix(meshParent);
      var meshParentScaling = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(meshParent.scaling);
      return meshParentRotMat.prodVec(meshParentScaling.mul(Util3d.getWorldCoordinates(mesh.parent, localPosition))).add(meshParentPos);
    }
  }, {
    key: "getBabylonCoordinates",
    value: function getBabylonCoordinates(positionInWorld) {
      return _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_14__["default"].forwardCoordinates(positionInWorld);
    }
    /**
     *
     * @param {*} mesh
     * @param {*} worldPosition: Vector3
     */

  }, {
    key: "getLocalCoordinatesFromWorld",
    value: function getLocalCoordinatesFromWorld(mesh, worldPosition) {
      if (mesh.parent && mesh.parent.name === _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_14__["default"].NAME) return _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(worldPosition);
      var meshParent = mesh.parent;
      var meshParentPos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(meshParent.position);
      var meshParentRotMat = Util3d.getRotationMatrix(meshParent);
      var meshParentScaling = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(meshParent.scaling);
      return meshParentScaling.map(function (z) {
        return 1 / z;
      }).mul(meshParentRotMat.dotVec(Util3d.getLocalCoordinatesFromWorld(meshParent, worldPosition).sub(meshParentPos)));
    }
    /**
     *
     * @param {*} mesh
     * @param {*} worldPosition: Vec3
     */

  }, {
    key: "computeLocalCoordinatesFromMesh",
    value: function computeLocalCoordinatesFromMesh(mesh, worldPosition) {
      /// WARNING: very similar with getLocalCoordinatesFromWorld
      if (!mesh.parent) {
        return worldPosition;
      }

      var meshParent = mesh.parent;
      var meshParentPos = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(meshParent.position);
      var meshParentRotMat = Util3d.getRotationMatrix(meshParent);
      var meshParentScaling = _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(meshParent.scaling); // assume scaling != 0

      var inverseScaling = meshParentScaling.map(function (x) {
        return 1.0 / x;
      });
      return inverseScaling.mul(meshParentRotMat.dotVec(Util3d.computeLocalCoordinatesFromMesh(meshParent, worldPosition).sub(meshParentPos)));
    }
    /**
     *
     * @param {*} parentView: MainView
     */

  }, {
    key: "getRotationMatrix",
    value: function getRotationMatrix(mesh) {
      var localRotationMatrix = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Matrix"]();
      var maybeQuaternion = monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].fromNull(mesh.rotationQuaternion);
      maybeQuaternion.forEach(function (quaternion) {
        return quaternion.toRotationMatrix(localRotationMatrix);
      });
      maybeQuaternion.orElseRun(function () {
        var quaternion = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Quaternion"].RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z);
        quaternion.toRotationMatrix(localRotationMatrix);
      });
      return _Math_Mat3__WEBPACK_IMPORTED_MODULE_4__["default"].ofBabylonMatrix(localRotationMatrix);
    }
  }, {
    key: "showNormals",
    value: function showNormals(scene, mesh) {
      var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Red();
      var normals = mesh.getVerticesData(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["VertexBuffer"].NormalKind);
      var positions = mesh.getVerticesData(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["VertexBuffer"].PositionKind);
      var lines = [];

      for (var i = 0; i < normals.length; i += 3) {
        var v1 = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].FromArray(positions, i);
        var v2 = v1.add(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].FromArray(normals, i).scaleInPlace(size));
        lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
      }

      var normalLines = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["MeshBuilder"].CreateLineSystem("normalLines", {
        lines: lines
      }, scene);
      normalLines.color = color;
      normalLines.parent = mesh;
      return normalLines;
    }
  }, {
    key: "orthogonalBasisFromVector",
    value: function orthogonalBasisFromVector(u) {
      var identityMatrix = [new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"](1, 0, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"](0, 1, 0), new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"](0, 0, 1)];
      var uArray = [u.x, u.y, u.z]; // choose pivot

      var pivot = 0;

      for (var i = 0; i < 3; i++) {
        if (uArray[i] !== 0) {
          pivot = i;
          break;
        }
      }

      var v = identityMatrix[(pivot + 1) % 3].add(identityMatrix[pivot].scale(-uArray[(pivot + 1) % 3] / uArray[pivot]));
      v = v.normalize();
      var w = identityMatrix[(pivot + 2) % 3].add(identityMatrix[pivot].scale(-uArray[(pivot + 2) % 3] / uArray[pivot]));
      w = w.normalize();
      w = w.subtract(v.scale(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Dot(v, w)));
      return {
        u: _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].FromArray(uArray).normalize(),
        v: v,
        w: w.normalize()
      };
    }
  }, {
    key: "cameraBuilder",
    value: function cameraBuilder(scene) {
      return new _CameraBuilder__WEBPACK_IMPORTED_MODULE_7__["default"](scene);
    }
  }, {
    key: "gizmoManagerBuilder",
    value: function gizmoManagerBuilder(scene) {
      return new _GizmoManagerBuilder_js__WEBPACK_IMPORTED_MODULE_6__["default"](scene);
    }
  }, {
    key: "meshFromPositionAndFaces",
    value: function meshFromPositionAndFaces(name, scene, positions, faces) {
      var updatable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var vertexData = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["VertexData"]();
      vertexData.positions = positions.flatMap(function (z) {
        return [z.x, z.y, z.z];
      });
      vertexData.indices = faces.flatMap(function (z) {
        return z;
      });
      var mesh = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Mesh"](name, scene);
      vertexData.applyToMesh(mesh, updatable); // mesh.createNormals();

      return mesh;
    }
    /**
     *
     * @param {*} polygon: Array of babylonjs vector3, representing a boundary of a polygon
     */

  }, {
    key: "triangulatePolygon",
    value: function triangulatePolygon(polygon) {
      var triangulation = earcut__WEBPACK_IMPORTED_MODULE_12___default()(polygon.map(function (x) {
        return [x.x, x.y, x.z];
      }).flatMap(function (x) {
        return x;
      }), null, 3);
      var len = triangulation.length / 3;
      var ans = [];

      for (var i = 0; i < len; i++) {
        var i3 = 3 * i;
        ans.push([triangulation[i3], triangulation[i3 + 1], triangulation[i3 + 2]]);
      }

      return ans;
    }
    /**
     *
     * @param {*} polygon: Array of babylonjs vector3, representing a boundary of a polygon
     * Returns a real number representing the orientation of the curve, if positive represents a counterclockwise orientation, clockwise otherwise.
     */

  }, {
    key: "computeOrientation",
    value: function computeOrientation(polygon) {
      var n = polygon.length;
      var vec3Poly = polygon.map(function (x) {
        return _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(x);
      });
      var orientation = 0;
      vec3Poly.forEach(function (a, i) {
        var modi = (i + 1) % n;
        var edge = vec3Poly[modi].sub(vec3Poly[i]);
        orientation += _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].of([-a.y, a.x, a.z]).dot(edge);
      });
      return orientation / 2;
    }
    /**
     * @param {*} arrayOfPoints: array of babylon vec3
     * Returns the average
     */

  }, {
    key: "pointAverage",
    value: function pointAverage(arrayOfPoints) {
      if (!arrayOfPoints || arrayOfPoints.length === 0) return _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Zero();
      return arrayOfPoints.reduce(function (e, x) {
        return e.add(x);
      }, _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Zero()).scale(1 / arrayOfPoints.length);
    }
  }, {
    key: "pointAverageVec3",
    value: function pointAverageVec3(arrayOfPoints) {
      if (!arrayOfPoints || arrayOfPoints.length === 0) return _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ZERO;
      return arrayOfPoints.reduce(function (e, x) {
        return e.add(x);
      }, _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ZERO).scale(1 / arrayOfPoints.length);
    }
  }, {
    key: "randomVector3",
    value: function randomVector3(a, b) {
      return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].FromArray([0, 0, 0].map(function (x) {
        return a + (b - a) * Math.random();
      }));
    }
  }, {
    key: "getMaterialFromColor",
    value: function getMaterialFromColor(color, scene) {
      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "MaterialFromColor".concat(randomDigits());
      var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["StandardMaterial"](name, scene);
      material.diffuseColor = color;
      material.emissiveColor = color;
      return material;
    }
  }]);

  return Util3d;
}();

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "toLocalCoordinates", function (parentView) {
  var rootMesh = parentView.getRootNode().item.mesh;
  return function (arrayOfVector3) {
    var transform = function transform(p) {
      return Util3d.computeLocalCoordinatesFromMesh({
        parent: rootMesh
      }, _Math_Vec3__WEBPACK_IMPORTED_MODULE_3__["default"].ofBabylon(p)).toBabylon();
    };

    if (Array.isArray(arrayOfVector3)) {
      return arrayOfVector3.map(transform);
    }

    return transform(arrayOfVector3);
  };
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "createOrientedCone", function (scene) {
  var u = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"](1, 0, 0);
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
  var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "OrientedCone".concat(randomDigits());
  var isPickable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var segments = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 16;
  var surface = {
    positions: [],
    faces: []
  };
  var d = u.length() / 3;
  var mat3 = Util3d.orthogonalBasisFromVector(u);
  var v = mat3.v;
  var w = mat3.w;
  var orientation = Math.sign(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Dot(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Cross(v, w), u)); // positions

  for (var i = 0; i < segments; i++) {
    var theta = orientation * (2 * Math.PI / segments) * i;
    surface.positions.push(v.scale(d * Math.cos(theta)).add(w.scale(d * Math.sin(theta))));
  }

  surface.positions.push(_babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Vector3"].Zero());
  surface.positions.push(u);
  var zeroIndex = surface.positions.length - 1;
  var uIndex = surface.positions.length - 2;

  for (var _i = 0; _i < segments; _i++) {
    // bottom faces
    surface.faces.push([zeroIndex, (_i + 1) % segments, _i]); // cone faces

    surface.faces.push([uIndex, _i, (_i + 1) % segments]);
  } // mesh


  var mesh = Util3d.meshFromPositionAndFaces(name, scene, surface.positions, surface.faces);
  mesh.convertToFlatShadedMesh();
  var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["StandardMaterial"]("OrientedConeMaterial".concat(name), scene);
  material.diffuseColor = color;
  material.emissiveColor = color;
  mesh.material = material;
  mesh.isPickable = isPickable;
  return mesh;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "createSphere", function (scene) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
  var diameter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Sphere".concat(randomDigits());
  var isPickable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var sphere = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Mesh"].CreateSphere(name, 16, diameter, scene);
  var material = Util3d.getMaterialFromColor(color, scene, "SphereMaterial".concat(name));
  sphere.material = material;
  sphere.isPickable = isPickable;
  return sphere;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "createBox", function (scene) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _NodeItem_Box__WEBPACK_IMPORTED_MODULE_15__["default"].DEFAULT_SIZE;
  var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Box".concat(randomDigits());
  var isPickable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var box = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Mesh"].CreateBox(name, size, scene);
  var material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["StandardMaterial"]("BoxMaterial".concat(name), scene);
  material.diffuseColor = color;
  material.emissiveColor = color;
  box.material = material;
  box.isPickable = isPickable;
  return box;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "createTubeFromPoints", function (scene, points) {
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Color3"].Gray();
  var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var name = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "Tube".concat(randomDigits());
  var isPickable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  var mesh = _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["MeshBuilder"].CreateTube(name, {
    path: points,
    radius: radius,
    sideOrientation: _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Mesh"].DOUBLESIDE,
    updatable: true
  }, scene);
  mesh.material = Util3d.getMaterialFromColor(color, scene, "Material".concat(name));
  mesh.isPickable = isPickable;
  return mesh;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "positionalLightBuilder", function (scene) {
  return new _PositionalLightBuilder__WEBPACK_IMPORTED_MODULE_8__["default"](scene);
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "directionalLightBuilder", function (scene) {
  return new _DirectionalLightBuilder__WEBPACK_IMPORTED_MODULE_11__["default"](scene);
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "referentialBuilder", function (scene) {
  return new _ReferentialBuilder__WEBPACK_IMPORTED_MODULE_9__["default"](scene);
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "getGroundPosition", function (scene, ground) {
  // Use a predicate to get position on the ground
  var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
    return mesh === ground;
  });
  if (pickInfo.hit) return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].some(pickInfo.pickedPoint);
  return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].none();
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "pickMesh", function (scene, ground) {
  var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
    return mesh !== ground && mesh.isEnabled();
  });

  if (pickInfo.hit && pickInfo.pickedMesh.isPickable) {
    return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].some(pickInfo.pickedMesh);
  }

  return monet__WEBPACK_IMPORTED_MODULE_5__["Maybe"].none();
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "groundBuilder", function (scene) {
  return new _GroundBuilder__WEBPACK_IMPORTED_MODULE_10__["default"](scene);
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "piecewiseCurveDistance", function (curve) {
  var distance = 0;

  for (var i = 0; i < curve.length - 1; i++) {
    var v = curve[i + 1].subtract(curve[i]);
    distance += v.length();
  }

  return distance;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "getCurveOrientations", function (curve) {
  var orientations = [];

  for (var i = 0; i < curve.length - 1; i++) {
    var v = curve[i + 1].subtract(curve[i]);
    orientations.push(Math.atan2(v.y, v.x));
  }

  orientations.push(orientations[orientations.length - 1]);
  return orientations;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "getSplineFromCurve", function (curve) {
  var nbPoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;
  var closed = false;
  return {
    points: _babylonjs_core__WEBPACK_IMPORTED_MODULE_13__["Curve3"].CreateCatmullRomSpline(curve, nbPoints, closed).getPoints()
  };
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Util3d, "splineObj2redis", function (splineObj) {
  var orientations = Util3d.getCurveOrientations(splineObj.points);
  return splineObj.points.map(function (x, i) {
    return [x.x, x.y, orientations[i]];
  });
});

var randomDigits = function randomDigits() {
  return Math.floor(Math.random() * 1e3);
};

/* harmony default export */ __webpack_exports__["default"] = (Util3d);

/***/ }),

/***/ "./src/Components/Viewer/Utils/Animator.js":
/*!*************************************************!*\
  !*** ./src/Components/Viewer/Utils/Animator.js ***!
  \*************************************************/
/*! exports provided: Animator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return Animator; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);


var Animator = /*#__PURE__*/function () {
  function Animator(state, next, doWhile) {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Animator);

    this.state = state;
    this.next = next;
    this["while"] = doWhile;
    this.requestAnimeId = null;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Animator, [{
    key: "play",
    value: function play() {
      var _this = this;

      this.requestAnimeId = requestAnimationFrame(function () {
        if (!_this["while"](_this.state)) return _this.stop();
        _this.state = _this.next(_this.state);

        _this.play();
      });
      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      cancelAnimationFrame(this.requestAnimeId);
      return this;
    }
  }], [{
    key: "builder",
    value: function builder() {
      return new AnimatorBuilder();
    }
  }]);

  return Animator;
}();

var AnimatorBuilder = /*#__PURE__*/function () {
  function AnimatorBuilder() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AnimatorBuilder);

    this._state = null;
    this._next = null;
    this._end = null;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AnimatorBuilder, [{
    key: "initialState",
    value: function initialState(state) {
      this._state = state;
      return this;
    }
  }, {
    key: "nextState",
    value: function nextState(next) {
      this._next = next;
      return this;
    }
  }, {
    key: "while",
    value: function _while(end) {
      this._end = end;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var someAreEmpty = [this._state, this._next, this._end].some(function (x) {
        return x === null || x === undefined;
      });
      if (someAreEmpty) throw "Animator properties are missing";
      return new Animator(this._state, this._next, this._end);
    }
  }]);

  return AnimatorBuilder;
}();

/***/ }),

/***/ "./src/Components/Viewer/Utils/AnnotationManager.js":
/*!**********************************************************!*\
  !*** ./src/Components/Viewer/Utils/AnnotationManager.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_3__);





var AnnotationManager = /*#__PURE__*/function () {
  function AnnotationManager() {
    var _this = this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AnnotationManager);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "getAnnotations", function () {
      return _this.annotations;
    });

    if (instance) return instance;
    instance = this;
    this.annotations = {};
    this.observers = [];
  } //========================================================================================

  /*                                                                                      *
   *                                   Getters & Setters                                  *
   *                                                                                      */
  //========================================================================================


  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AnnotationManager, [{
    key: "load",
    value: function load() {
      this.retrieveAnnotationsFromDb();
      return this;
    }
    /**
     *
     * @param {*} lambda: AnnotationManager -> {}
     */

  }, {
    key: "pushObserver",
    value: function pushObserver(lambda) {
      this.observers.push(lambda);
      return this;
    } //========================================================================================

    /*                                                                                      *
     *                                         Utils                                        *
     *                                                                                      */
    //========================================================================================

  }, {
    key: "retrieveAnnotationsFromDb",
    value: function retrieveAnnotationsFromDb() {
      var _this2 = this;

      mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_3__["MasterDB"].subscribe({
        Scope: "Annotation",
        Name: "*"
      }, function (data) {
        console.log("Annotation update", data);
        var actionMap = {
          del: function del(annotation) {
            return _this2.delAnnotation(annotation);
          },
          set: function set(annotation) {
            return _this2.addAnnotation(annotation);
          }
        };
        var annotation = data.key.Annotation;

        if (data.event in actionMap) {
          actionMap[data.event](annotation);

          _this2.observers.forEach(function (f) {
            return f(_this2);
          });
        }
      }, function (data) {
        console.log("Annotation start", data);
        var annotation = data.value.Annotation;

        _this2.addAnnotation(annotation);
      });
    }
  }, {
    key: "delAnnotation",
    value: function delAnnotation(annotation) {
      var _this3 = this;

      if (!annotation) return;
      var names2delete = Object.keys(annotation).reduce(function (e, x) {
        e.push(x);
        return e;
      }, []);
      Object.keys(this.annotations).forEach(function (annotationType) {
        var value = _this3.annotations[annotationType];
        value.names = value.names.filter(function (x) {
          return !names2delete.includes(x);
        });
        value.labels = value.labels.filter(function (x) {
          return !names2delete.includes(x);
        });
      });
    }
  }, {
    key: "addAnnotation",
    value: function addAnnotation(annotation) {
      var _this4 = this;

      if (!annotation) return;
      Object.keys(annotation).forEach(function (name) {
        var annotationObj = annotation[name];
        if (!annotationObj.Type) return;
        var type = annotationObj.Type.toLowerCase();
        var label = annotationObj.Label;

        if (!(type in _this4.annotations)) {
          _this4.annotations[type] = {
            names: [],
            labels: []
          };
        }

        _this4.annotations[type].names.push(name);

        _this4.annotations[type].labels.push(label ? label : name);
      });
    } //========================================================================================

    /*                                                                                      *
     *                                        Static                                        *
     *                                                                                      */
    //========================================================================================

  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new AnnotationManager();
    }
  }, {
    key: "getAnnotations",
    value: function getAnnotations() {
      return AnnotationManager.getInstance().getAnnotations();
    }
  }]);

  return AnnotationManager;
}();

var instance = null;
/* harmony default export */ __webpack_exports__["default"] = (AnnotationManager);

/***/ }),

/***/ "./src/Components/Viewer/Utils/AssetsTypesFactory.js":
/*!***********************************************************!*\
  !*** ./src/Components/Viewer/Utils/AssetsTypesFactory.js ***!
  \***********************************************************/
/*! exports provided: ASSETS_TYPES, AssetsTypesFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSETS_TYPES", function() { return ASSETS_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetsTypesFactory", function() { return AssetsTypesFactory; });
/* harmony import */ var _Actions_AddMapAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actions/AddMapAction */ "./src/Components/Viewer/Actions/AddMapAction.js");
/* harmony import */ var _Actions_RobotAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Actions/RobotAction */ "./src/Components/Viewer/Actions/RobotAction.js");
/* harmony import */ var _NodeItem_Robot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NodeItem/Robot */ "./src/Components/Viewer/NodeItem/Robot.js");
/* harmony import */ var _Actions_AddMeshAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Actions/AddMeshAction */ "./src/Components/Viewer/Actions/AddMeshAction.js");




var ASSETS_TYPES = {
  Map: "Map",
  Robot: "Robot",
  Mesh: "Mesh"
};
var AssetsTypesFactory = {
  Map: function Map(map) {
    return new _Actions_AddMapAction__WEBPACK_IMPORTED_MODULE_0__["default"](map.name, map.loader);
  },
  Robot: function Robot(robot) {
    return new _Actions_RobotAction__WEBPACK_IMPORTED_MODULE_1__["default"](robot, _NodeItem_Robot__WEBPACK_IMPORTED_MODULE_2__["default"].getSocketAnimator);
  },
  Mesh: function Mesh(mesh) {
    return new _Actions_AddMeshAction__WEBPACK_IMPORTED_MODULE_3__["default"](mesh);
  }
};

/***/ }),

/***/ "./src/Components/Viewer/Utils/Clipboard.js":
/*!**************************************************!*\
  !*** ./src/Components/Viewer/Utils/Clipboard.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Clipboard; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__);



var SCENE_CONTEXT = "scene";

var Clipboard = /*#__PURE__*/function () {
  function Clipboard() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Clipboard);
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Clipboard, null, [{
    key: "copy",
    value: function copy(value) {
      mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__["Clipboard"].write(SCENE_CONTEXT, value);
    }
  }, {
    key: "paste",
    value: function paste() {
      return mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__["Clipboard"].read(SCENE_CONTEXT);
    }
  }]);

  return Clipboard;
}();



/***/ }),

/***/ "./src/Components/Viewer/Utils/Constants.js":
/*!**************************************************!*\
  !*** ./src/Components/Viewer/Utils/Constants.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Constants = {
  RADIUS: 0.4,
  POINTS_DENSITY: 2,
  CLOUD_FUNCTION_NAME: "backend.viewer"
};
/* harmony default export */ __webpack_exports__["default"] = (Constants);

/***/ }),

/***/ "./src/Components/Viewer/Utils/DefaultMouseEvents.js":
/*!***********************************************************!*\
  !*** ./src/Components/Viewer/Utils/DefaultMouseEvents.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultMouseEvents; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");
/* harmony import */ var _Animator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Animator */ "./src/Components/Viewer/Utils/Animator.js");






var DefaultMouseEvents = function DefaultMouseEvents() {
  _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DefaultMouseEvents);
};

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultMouseEvents, "onPointerDown", function (mainView) {
  return function (evt) {
    mainView.mousePosClick = mainView.getMouseCoordinatesFromRoot().orSome(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"].Zero());
    mainView.mousePosMove = mainView.mousePosClick;
    mainView.sceneMemory.forEach(function (_ref) {
      var camera = _ref.camera,
          canvas = _ref.canvas;

      if (evt.buttons === 2 || evt.buttons === 4 || evt.ctrlKey) {
        camera.detachControl(canvas);
      }
    });
  };
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultMouseEvents, "onPointerUp", function (mainView) {
  return function (evt) {
    mainView.sceneMemory.forEach(function (_ref2) {
      var camera = _ref2.camera,
          canvas = _ref2.canvas;
      camera.attachControl(canvas, true);
    });
  };
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultMouseEvents, "onPointerMove", function (mainView) {
  return function (evt) {
    mainView.sceneMemory.forEach(function (_ref3) {
      var mouseLocationText = _ref3.mouseLocationText,
          camera = _ref3.camera;
      mainView.getMouseCoordinatesFromRoot().forEach(function (currentLocal) {
        setMouseLocationTxt(mouseLocationText, currentLocal);

        var panCamera = function panCamera() {
          var v = currentLocal.subtract(mainView.mousePosMove);
          var vBabylon = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_3__["default"].getBabylonCoordinates(v).scale(-1);
          animateCamera(camera, vBabylon);
          mainView.mousePosMove = currentLocal;
        };

        var mouseButtonActions = [{
          predicate: evt.ctrlKey && evt.buttons === 1,
          action: panCamera
        }, {
          predicate: evt.buttons === 4,
          action: panCamera
        }];
        var filterActions = mouseButtonActions.filter(function (_ref4) {
          var predicate = _ref4.predicate;
          return predicate;
        });
        if (filterActions.length > 0) filterActions[0].action();
      });
    });
  };
});



function animateCamera(camera, v) {
  _Animator__WEBPACK_IMPORTED_MODULE_4__["Animator"].builder().initialState({
    camera: camera,
    time: 0,
    T: new Date().getTime()
  }).nextState(function (s) {
    var camera = s.camera,
        time = s.time;
    var dt = 0.1; //(new Date().getTime() - T) / 1000;

    var vdt = v.scale(dt);
    camera.position = camera.position.add(vdt);
    camera.setTarget(camera.target.add(vdt));
    return {
      camera: camera,
      time: time + dt,
      T: new Date().getTime()
    };
  })["while"](function (s) {
    return s.time <= 1;
  }).build().play();
}

function setMouseLocationTxt(mouseLocationText, currentLocal) {
  mouseLocationText.text = "x: ".concat(currentLocal.x.toFixed(2), ", y: ").concat(currentLocal.y.toFixed(2));
}

/***/ }),

/***/ "./src/Components/Viewer/Utils/DefaultScene.js":
/*!*****************************************************!*\
  !*** ./src/Components/Viewer/Utils/DefaultScene.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babylonjs_gui_2D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babylonjs/gui/2D */ "@babylonjs/gui/2D");
/* harmony import */ var _babylonjs_gui_2D__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_gui_2D__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Util3d/Util3d */ "./src/Components/Viewer/Util3d/Util3d.js");




 // import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";

var DefaultScene = function DefaultScene() {
  _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DefaultScene);
};

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultScene, "createGizmo", function (scene) {
  var gizmoManager = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["RotationGizmo"](new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["UtilityLayerRenderer"](scene));
  gizmoManager.xGizmo.dragBehavior.detach();
  gizmoManager.xGizmo.scaleRatio = 0.0;
  gizmoManager.yGizmo.dragBehavior.detach();
  gizmoManager.yGizmo.scaleRatio = 0.0;
  return gizmoManager;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultScene, "createCamera", function (scene, canvas) {
  var forEach = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (camera) {};
  var COLLISION_RADIUS = 1;
  var camera = _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_4__["default"].cameraBuilder(scene).sphericalCoordinates(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, 0, 14)).target(_babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"].Zero()).name("camera").build();
  camera.attachControl(canvas, false);
  camera.inertia = 0.7;
  camera.collisionRadius = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](COLLISION_RADIUS, COLLISION_RADIUS, COLLISION_RADIUS);
  camera.panningInertia = 0.5;
  camera.checkCollisions = true;
  camera.panningSensibility = 0;
  camera.lowerRadiusLimit = 2;
  forEach(camera);
  return camera;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultScene, "createLight", function (scene) {
  return _Util3d_Util3d__WEBPACK_IMPORTED_MODULE_4__["default"].directionalLightBuilder(scene).name("light").direction(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, -1, 0)).intensity(0.35).build();
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultScene, "createMeshGround", function (scene) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
  var ground = _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Mesh"].CreateGround("groundMesh", width, height, 20, scene);
  ground.translate(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, -1, 0), 1e-2, _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Space"].WORLD);
  ground.material = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["StandardMaterial"]("wireframe", scene);
  ground.material.wireframe = true;
  ground.isPickable = false;
  ground.checkCollisions = true;
  return ground;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultScene, "createScene", function (engine) {
  var scene = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Scene"](engine);
  scene.clearColor = _babylonjs_core__WEBPACK_IMPORTED_MODULE_2__["Color3"].Black;
  scene.collisionsEnabled = true;
  scene._uid = scene.getUniqueId(); // scene.debugLayer.show();

  return scene;
});

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(DefaultScene, "createMouseLocationText", function (scene) {
  var advancedTexture = _babylonjs_gui_2D__WEBPACK_IMPORTED_MODULE_3__["AdvancedDynamicTexture"].CreateFullscreenUI("UI", true, scene);
  var text = new _babylonjs_gui_2D__WEBPACK_IMPORTED_MODULE_3__["TextBlock"]();
  text.text = "";
  text.color = "white";
  text.fontSize = 17;
  text.left = -560;
  text.top = -145;
  advancedTexture.addControl(text);
  return text;
});

/* harmony default export */ __webpack_exports__["default"] = (DefaultScene);

/***/ }),

/***/ "./src/Components/Viewer/Utils/MeshCache.js":
/*!**************************************************!*\
  !*** ./src/Components/Viewer/Utils/MeshCache.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! monet */ "monet");
/* harmony import */ var monet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(monet__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Mesh cache for each scene.
 *
 * Each mesh is associated with a scene therefore we must have a cache per scene.
 *
 */

var MeshCache = /*#__PURE__*/function () {
  function MeshCache() {
    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MeshCache);

    if (instance) return instance;
    instance = this;
    this.meshCacheBySceneId = {};
    this.count = 0;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MeshCache, [{
    key: "hasKey",
    value: function hasKey(key, scene) {
      var sceneId = scene._uid;
      return monet__WEBPACK_IMPORTED_MODULE_2__["Maybe"].fromNull(this.meshCacheBySceneId[sceneId]).flatMap(function (meshCache) {
        return ofNull(meshCache[key]);
      }).cata(function () {
        return false;
      }, function () {
        return true;
      });
    }
  }, {
    key: "put",
    value: function put(key, scene, mesh) {
      var sceneId = scene._uid;

      if (!(sceneId in this.meshCacheBySceneId)) {
        this.meshCacheBySceneId[sceneId] = {};
      }

      this.meshCacheBySceneId[sceneId][key] = mesh;
      mesh.setEnabled(false);
      return this;
    }
  }, {
    key: "get",
    value: function get(key, scene) {
      var _this = this;

      var sceneId = scene._uid;
      return monet__WEBPACK_IMPORTED_MODULE_2__["Maybe"].fromNull(this.meshCacheBySceneId[sceneId]).flatMap(function (meshCache) {
        return ofNull(meshCache[key]);
      }).map(function (mesh) {
        console.log("#Mesh: Found Mesh in cache, retrieving copy number", _this.count);
        var cloneMesh = mesh.clone("".concat(key).concat(_this.count++));
        console.log("#Mesh:", cloneMesh);
        return cloneMesh;
      }).orNull();
    }
  }, {
    key: "del",
    value: function del(scene) {
      var sceneId = scene._uid;

      if (sceneId in this.meshCacheBySceneId) {
        delete this.meshCacheBySceneId[sceneId];
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new MeshCache();
    }
  }]);

  return MeshCache;
}();

var ofNull = function ofNull(x) {
  return monet__WEBPACK_IMPORTED_MODULE_2__["Maybe"].fromNull(x);
}; // private instance


var instance = null;
/* harmony default export */ __webpack_exports__["default"] = (MeshCache);

/***/ }),

/***/ "./src/Components/Viewer/Utils/MeshLoader.js":
/*!***************************************************!*\
  !*** ./src/Components/Viewer/Utils/MeshLoader.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MeshCache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MeshCache */ "./src/Components/Viewer/Utils/MeshCache.js");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babylonjs/core */ "@babylonjs/core");
/* harmony import */ var _babylonjs_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babylonjs_loaders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babylonjs/loaders */ "@babylonjs/loaders");
/* harmony import */ var _babylonjs_loaders__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babylonjs_loaders__WEBPACK_IMPORTED_MODULE_5__);







var MeshLoader = /*#__PURE__*/function () {
  function MeshLoader(scene) {
    var _this = this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MeshLoader);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "load", function (meshName) {
      var mapFunction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (mesh) {
        return mesh;
      };
      return new Promise(function (re, rej) {
        var meshCache = _MeshCache__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance();

        if (meshCache.hasKey(meshName, _this.scene)) {
          console.log("Found Mesh ".concat(meshName, " in cache for scene ").concat(_this.scene));
          re(mapFunction(meshCache.get(meshName, _this.scene)));
        } else {
          console.log("Loading mesh....");
          var assetsManager = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_4__["AssetsManager"](_this.scene);
          var meshTask = assetsManager.addMeshTask("", "", MESH_URL, meshName);

          meshTask.onSuccess = function (task) {
            console.log("Load Success", meshName);
            var mesh = task.loadedMeshes[0];
            mesh.name = meshName;
            meshCache.put(meshName, _this.scene, mesh);
          };

          meshTask.onError = function (task, message, exception) {
            return rej({
              message: message,
              exception: exception
            });
          };

          assetsManager.onFinish = function (task) {
            console.log("Load finish ");
            re(mapFunction(meshCache.get(meshName, _this.scene)));
          };

          assetsManager.load();
        }
      });
    });

    this.scene = scene;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MeshLoader, null, [{
    key: "of",
    value: function of(scene) {
      return new MeshLoader(scene);
    }
  }]);

  return MeshLoader;
}();

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(MeshLoader, "getMeshUrl", function (src) {
  return "".concat(MESH_URL).concat(src);
});

var MESH_URL = "/static/meshes/";
/* harmony default export */ __webpack_exports__["default"] = (MeshLoader);

/***/ }),

/***/ "./src/Components/Viewer/Utils/SceneServerUtils.js":
/*!*********************************************************!*\
  !*** ./src/Components/Viewer/Utils/SceneServerUtils.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./src/Components/Viewer/Utils/Constants.js");





var SceneServerUtils = function SceneServerUtils() {
  _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SceneServerUtils);
};

_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(SceneServerUtils, "retrieveScene", function (sceneName) {
  var successCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_SUCCESS;
  var failCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_FAILURE("retrieving scene");
  mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__["MasterDB"].cloudFunction(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CLOUD_FUNCTION_NAME, "retrieveScene", sceneName, function (data) {
    return successFailIf(data, successCallback, failCallback);
  });
});

var DEFAULT_FAILURE = function DEFAULT_FAILURE(failureLocation) {
  return function (data) {
    throw "" + "Exception caught in ".concat(failureLocation, ": ").concat(data.error);
  };
};

var DEFAULT_SUCCESS = function DEFAULT_SUCCESS(data) {};

var successFailIf = function successFailIf(data, successCallback, failCallback) {
  if (data.success) {
    successCallback(data);
  } else {
    failCallback(data);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (SceneServerUtils);

/***/ }),

/***/ "./src/Components/Viewer/Utils/TreeServerUtils.js":
/*!********************************************************!*\
  !*** ./src/Components/Viewer/Utils/TreeServerUtils.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "@babel/runtime/helpers/esm/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "@babel/runtime/helpers/esm/createClass");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _TreeObject_TreeObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TreeObject/TreeObject */ "./src/Components/Viewer/TreeObject/TreeObject.js");
/* harmony import */ var _TreeObject_TreeNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TreeObject/TreeNode */ "./src/Components/Viewer/TreeObject/TreeNode.js");
/* harmony import */ var _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../NodeItem/GlobalRef */ "./src/Components/Viewer/NodeItem/GlobalRef.js");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Constants */ "./src/Components/Viewer/Utils/Constants.js");








var CLOUD_FUNCTION_NAME = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].CLOUD_FUNCTION_NAME;

var TreeServerUtils = /*#__PURE__*/function () {
  function TreeServerUtils(sceneName) {
    var _this = this;

    _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TreeServerUtils);

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "getNodeFromTree", function (name, objectTree) {
      return new _TreeObject_TreeObject__WEBPACK_IMPORTED_MODULE_3__["default"](objectTree).getNode(function (x) {
        return name === x.title;
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "getParentFromChild", function (childName, objectTree) {
      return new _TreeObject_TreeObject__WEBPACK_IMPORTED_MODULE_3__["default"](objectTree).getParentNode(function (x) {
        return childName === x.title;
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "deleteNodeFromTreeUsingName", function (name, objectTree) {
      var is2delInServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      _this.getNodeFromTree(name, objectTree).forEach(function (node) {
        // destroy treeNode
        _TreeObject_TreeNode__WEBPACK_IMPORTED_MODULE_4__["default"].dispose(node);

        if (is2delInServer) {
          _this.deleteNodeInServer(name);
        }

        var maybeParent = _this.getParentFromChild(name, objectTree);

        maybeParent.forEach(function (parentNode) {
          parentNode.children = parentNode.children.filter(function (x) {
            return x.title !== name;
          });
        });
        objectTree = objectTree.filter(function (x) {
          return x.title !== name;
        });
      });

      return objectTree;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "getNodeFromTreeWithPredicate", function (predicate, objectTree) {
      return new _TreeObject_TreeObject__WEBPACK_IMPORTED_MODULE_3__["default"](objectTree).getNode(predicate);
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "addNodeItem2Tree", function (objectTree, nodeItem) {
      var parentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _NodeItem_GlobalRef__WEBPACK_IMPORTED_MODULE_5__["default"].NAME;
      var is2addInServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var isVisible = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      // delete if already exist
      _this.deleteNodeFromTreeUsingName(nodeItem.name, objectTree, is2addInServer);

      var node2Add = _TreeObject_TreeNode__WEBPACK_IMPORTED_MODULE_4__["default"].builder().title(nodeItem.name).item(nodeItem).isVisible(isVisible).build();

      if (parentName) {
        var maybeParentNode = _this.getNodeFromTree(parentName, objectTree);

        maybeParentNode.forEach(function (parentNode) {
          if (is2addInServer) _this.addNodeItem2Server(node2Add, parentNode.title);
          parentNode.children.push(node2Add);
        });
      } else {
        objectTree.push(node2Add);
        if (is2addInServer) _this.addNodeItem2Server(node2Add, null);
      }

      return objectTree;
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "updateNodeInServer", function (name, objectTree) {
      var oldName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      console.log("updateNodeInServer!", _this.sceneName);

      _this.getNodeFromTree(name, objectTree).forEach(function (node) {
        var parentName = _this.getParentFromChild(name, objectTree).map(function (x) {
          return x.title;
        }).orNull();

        mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_6__["MasterDB"].cloudFunction(CLOUD_FUNCTION_NAME, "updateNode", [_TreeObject_TreeNode__WEBPACK_IMPORTED_MODULE_4__["default"].toDict(node), parentName, oldName, _this.sceneName], function (data) {
          console.log("Update node with success?", data.success);
        });
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "addNodeItem2Server", function (treeNode, parentName) {
      mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_6__["MasterDB"].cloudFunction(CLOUD_FUNCTION_NAME, "addNodeItem", [_TreeObject_TreeNode__WEBPACK_IMPORTED_MODULE_4__["default"].toDict(treeNode), parentName, _this.sceneName], function (data) {
        console.log("Add node with success?", data.success);
      });
    });

    _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "deleteNodeInServer", function (name) {
      mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_6__["MasterDB"].cloudFunction(CLOUD_FUNCTION_NAME, "deleteNodeByName", [name, _this.sceneName], function (data) {
        console.log("Deleted node with success?", data.success);
      });
    });

    this.sceneName = sceneName;
  }

  _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TreeServerUtils, null, [{
    key: "ofScene",
    value: function ofScene(sceneName) {
      return new TreeServerUtils(sceneName);
    } //========================================================================================

    /*                                                                                      *
     *                                    Util functions                                    *
     *                                                                                      */
    //========================================================================================

  }]);

  return TreeServerUtils;
}();

/* harmony default export */ __webpack_exports__["default"] = (TreeServerUtils);

/***/ }),

/***/ "./src/styles/Style.js":
/*!*****************************!*\
  !*** ./src/styles/Style.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/taggedTemplateLiteral */ "@babel/runtime/helpers/esm/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mov-fe-lib-core */ "mov-fe-lib-core");
/* harmony import */ var mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__);


function _templateObject() {
  var data = _babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var Style = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["createGlobalStyle"])(_templateObject(), mov_fe_lib_core__WEBPACK_IMPORTED_MODULE_2__["Style"]);
/* harmony default export */ __webpack_exports__["default"] = (Style);

/***/ }),

/***/ "./src/styles/Themes.js":
/*!******************************!*\
  !*** ./src/styles/Themes.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "@babel/runtime/helpers/esm/defineProperty");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var themeFactory = function themeFactory(particular) {
  return _objectSpread(_objectSpread({}, particular), {}, {
    typography: {
      fontFamily: "Roboto",
      h1: {
        fontFamily: "Avenir"
      },
      h2: {
        fontFamily: "Avenir"
      },
      h3: {
        fontFamily: "Avenir"
      },
      h4: {
        fontFamily: "Avenir"
      },
      h5: {
        fontFamily: "Avenir"
      },
      h6: {
        fontFamily: "Avenir"
      },
      body1: {
        fontFamily: "Roboto"
      }
    }
  });
};

var Themes = {
  dark: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["createMuiTheme"])(themeFactory({
    label: "dark",
    backgroundColor: "linear-gradient(114.01deg, #212121 0%, #050505 100.43%)",
    bottomNavigation: {
      background: "#212121"
    },
    globalStats: {
      borderColor: "#474747",
      subTextColor: "#CDCDCD",
      upperTextColor: "#E6E6E6"
    },
    palette: {
      type: "dark",
      // Switching the dark mode on, is a single property value change.
      primary: {
        main: "#36b5e6"
      },
      secondary: {
        main: "#CF6679"
      },
      green: {
        main: "#03DAC5"
      }
    },
    overrides: {
      MuiButton: {
        outlined: {
          margin: "8px"
        },
        text: {
          margin: "8px"
        },
        contained: {
          margin: "8px"
        },
        containedPrimary: {
          color: "inherit",
          margin: "8px"
        },
        containedSecondary: {
          color: "inherit",
          margin: "8px"
        }
      },
      MuiButtonGroup: {
        root: {
          margin: "0"
        },
        groupedContainedPrimary: {
          margin: "0"
        },
        groupedOutlined: {
          margin: "0"
        },
        groupedText: {
          margin: "0"
        }
      },
      MuiIconButton: {
        root: {
          color: "#36b5e6"
        }
      },
      MuiListItem: {
        button: {
          "&:hover": {
            backgroundColor: "rgba(54,181,230, 0.15)"
          }
        }
      },
      MuiFormControlLabel: {
        label: {
          color: "rgba(255,255,255,0.8)"
        }
      },
      MuiInputBase: {
        input: {
          font: "Roboto"
        }
      },
      MuiFilledInput: {
        root: {
          border: "4px"
        },
        underline: {
          "&::before": {
            borderRadius: "4px"
          }
        }
      }
    }
  })),
  light: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["createMuiTheme"])(themeFactory({
    label: "light",
    backgroundColor: "linear-gradient(122.19deg, #FFFFFF 2.58%, #FFFFFF 76.23%)",
    // it was white before
    bottomNavigation: {
      background: "#c3c3c3"
    },
    globalStats: {
      borderColor: "#E6E6E6",
      subTextColor: "#717171",
      upperTextColor: "#474747"
    },
    palette: {
      primary: {
        main: "#007197"
      },
      secondary: {
        main: "#BE2424"
      },
      green: {
        main: "#03DAC5"
      }
    },
    overrides: {
      MuiButton: {
        outlined: {
          margin: "8px"
        },
        text: {
          margin: "8px"
        },
        contained: {
          margin: "8px"
        },
        containedPrimary: {
          color: "white",
          margin: "8px"
        },
        containedSecondary: {
          color: "white",
          margin: "8px"
        }
      },
      MuiButtonGroup: {
        root: {
          margin: "0"
        },
        groupedContainedPrimary: {
          margin: "0"
        },
        groupedOutlined: {
          margin: "0"
        },
        groupedText: {
          margin: "0"
        }
      },
      MuiIconButton: {
        root: {
          color: "#007197"
        }
      },
      MuiListItem: {
        button: {
          "&:hover": {
            backgroundColor: "rgba(0,113,151, 0.15)"
          }
        }
      },
      MuiFormControlLabel: {
        label: {
          color: "rgba(0,0,0,0.8)"
        }
      },
      MuiInputBase: {
        input: {
          font: "Roboto"
        }
      },
      MuiFilledInput: {
        root: {
          border: "4px"
        },
        underline: {
          "&::before": {
            borderRadius: "4px"
          }
        }
      }
    }
  }))
};

Themes.getTheme = function () {
  var theme = window.localStorage.getItem("movai.theme"); // dark or light

  return theme ? theme : "dark";
};

Themes.setTheme = function (value) {
  window.localStorage.setItem("movai.theme", value);
};

/* harmony default export */ __webpack_exports__["default"] = (Themes);

/***/ }),

/***/ "@babel/runtime/helpers/esm/assertThisInitialized":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/assertThisInitialized" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/assertThisInitialized");

/***/ }),

/***/ "@babel/runtime/helpers/esm/asyncToGenerator":
/*!**************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/asyncToGenerator" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/esm/classCallCheck":
/*!************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/classCallCheck" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/esm/classPrivateFieldGet":
/*!******************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/classPrivateFieldGet" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/classPrivateFieldGet");

/***/ }),

/***/ "@babel/runtime/helpers/esm/classPrivateFieldSet":
/*!******************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/classPrivateFieldSet" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/classPrivateFieldSet");

/***/ }),

/***/ "@babel/runtime/helpers/esm/createClass":
/*!*********************************************************!*\
  !*** external "@babel/runtime/helpers/esm/createClass" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/esm/defineProperty":
/*!************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/defineProperty" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/esm/extends":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/esm/extends" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/extends");

/***/ }),

/***/ "@babel/runtime/helpers/esm/get":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/esm/get" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/get");

/***/ }),

/***/ "@babel/runtime/helpers/esm/getPrototypeOf":
/*!************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/getPrototypeOf" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/esm/inherits":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/esm/inherits" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/esm/objectWithoutProperties":
/*!*********************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/objectWithoutProperties" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/objectWithoutProperties");

/***/ }),

/***/ "@babel/runtime/helpers/esm/possibleConstructorReturn":
/*!***********************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/possibleConstructorReturn" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/esm/slicedToArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/esm/slicedToArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/esm/taggedTemplateLiteral":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/taggedTemplateLiteral" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/taggedTemplateLiteral");

/***/ }),

/***/ "@babel/runtime/helpers/esm/toConsumableArray":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/esm/toConsumableArray" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/esm/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "@babylonjs/core":
/*!**********************************!*\
  !*** external "@babylonjs/core" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babylonjs/core");

/***/ }),

/***/ "@babylonjs/core/Maths/math":
/*!*********************************************!*\
  !*** external "@babylonjs/core/Maths/math" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babylonjs/core/Maths/math");

/***/ }),

/***/ "@babylonjs/gui/2D":
/*!************************************!*\
  !*** external "@babylonjs/gui/2D" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babylonjs/gui/2D");

/***/ }),

/***/ "@babylonjs/loaders":
/*!*************************************!*\
  !*** external "@babylonjs/loaders" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babylonjs/loaders");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/Breadcrumbs":
/*!************************************************!*\
  !*** external "@material-ui/core/Breadcrumbs" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Breadcrumbs");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Collapse":
/*!*********************************************!*\
  !*** external "@material-ui/core/Collapse" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Collapse");

/***/ }),

/***/ "@material-ui/core/Drawer":
/*!*******************************************!*\
  !*** external "@material-ui/core/Drawer" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Drawer");

/***/ }),

/***/ "@material-ui/core/FormControl":
/*!************************************************!*\
  !*** external "@material-ui/core/FormControl" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/FormControl");

/***/ }),

/***/ "@material-ui/core/FormControlLabel":
/*!*****************************************************!*\
  !*** external "@material-ui/core/FormControlLabel" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/FormControlLabel");

/***/ }),

/***/ "@material-ui/core/IconButton":
/*!***********************************************!*\
  !*** external "@material-ui/core/IconButton" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),

/***/ "@material-ui/core/InputBase":
/*!**********************************************!*\
  !*** external "@material-ui/core/InputBase" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputBase");

/***/ }),

/***/ "@material-ui/core/InputLabel":
/*!***********************************************!*\
  !*** external "@material-ui/core/InputLabel" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputLabel");

/***/ }),

/***/ "@material-ui/core/Menu":
/*!*****************************************!*\
  !*** external "@material-ui/core/Menu" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Menu");

/***/ }),

/***/ "@material-ui/core/MenuItem":
/*!*********************************************!*\
  !*** external "@material-ui/core/MenuItem" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/MenuItem");

/***/ }),

/***/ "@material-ui/core/Select":
/*!*******************************************!*\
  !*** external "@material-ui/core/Select" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Select");

/***/ }),

/***/ "@material-ui/core/Switch":
/*!*******************************************!*\
  !*** external "@material-ui/core/Switch" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Switch");

/***/ }),

/***/ "@material-ui/core/Tab":
/*!****************************************!*\
  !*** external "@material-ui/core/Tab" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tab");

/***/ }),

/***/ "@material-ui/core/Tabs":
/*!*****************************************!*\
  !*** external "@material-ui/core/Tabs" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tabs");

/***/ }),

/***/ "@material-ui/core/TextField":
/*!**********************************************!*\
  !*** external "@material-ui/core/TextField" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/TextField");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/colors":
/*!*******************************************!*\
  !*** external "@material-ui/core/colors" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/core/utils":
/*!******************************************!*\
  !*** external "@material-ui/core/utils" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/utils");

/***/ }),

/***/ "@material-ui/icons/AddBox":
/*!********************************************!*\
  !*** external "@material-ui/icons/AddBox" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/AddBox");

/***/ }),

/***/ "@material-ui/icons/ArrowDownward":
/*!***************************************************!*\
  !*** external "@material-ui/icons/ArrowDownward" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ArrowDownward");

/***/ }),

/***/ "@material-ui/icons/Check":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Check" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Check");

/***/ }),

/***/ "@material-ui/icons/ChevronLeft":
/*!*************************************************!*\
  !*** external "@material-ui/icons/ChevronLeft" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ChevronLeft");

/***/ }),

/***/ "@material-ui/icons/ChevronRight":
/*!**************************************************!*\
  !*** external "@material-ui/icons/ChevronRight" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ChevronRight");

/***/ }),

/***/ "@material-ui/icons/Clear":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Clear" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Clear");

/***/ }),

/***/ "@material-ui/icons/DeleteOutline":
/*!***************************************************!*\
  !*** external "@material-ui/icons/DeleteOutline" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/DeleteOutline");

/***/ }),

/***/ "@material-ui/icons/Edit":
/*!******************************************!*\
  !*** external "@material-ui/icons/Edit" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Edit");

/***/ }),

/***/ "@material-ui/icons/ExpandMore":
/*!************************************************!*\
  !*** external "@material-ui/icons/ExpandMore" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ExpandMore");

/***/ }),

/***/ "@material-ui/icons/FilterList":
/*!************************************************!*\
  !*** external "@material-ui/icons/FilterList" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/FilterList");

/***/ }),

/***/ "@material-ui/icons/FirstPage":
/*!***********************************************!*\
  !*** external "@material-ui/icons/FirstPage" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/FirstPage");

/***/ }),

/***/ "@material-ui/icons/LastPage":
/*!**********************************************!*\
  !*** external "@material-ui/icons/LastPage" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LastPage");

/***/ }),

/***/ "@material-ui/icons/NavigateNext":
/*!**************************************************!*\
  !*** external "@material-ui/icons/NavigateNext" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/NavigateNext");

/***/ }),

/***/ "@material-ui/icons/Remove":
/*!********************************************!*\
  !*** external "@material-ui/icons/Remove" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Remove");

/***/ }),

/***/ "@material-ui/icons/SaveAlt":
/*!*********************************************!*\
  !*** external "@material-ui/icons/SaveAlt" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/SaveAlt");

/***/ }),

/***/ "@material-ui/icons/Search":
/*!********************************************!*\
  !*** external "@material-ui/icons/Search" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Search");

/***/ }),

/***/ "@material-ui/icons/ViewColumn":
/*!************************************************!*\
  !*** external "@material-ui/icons/ViewColumn" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ViewColumn");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("clsx");

/***/ }),

/***/ "earcut":
/*!*************************!*\
  !*** external "earcut" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("earcut");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "lodash.isequal":
/*!*********************************!*\
  !*** external "lodash.isequal" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.isequal");

/***/ }),

/***/ "material-table":
/*!*********************************!*\
  !*** external "material-table" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("material-table");

/***/ }),

/***/ "monet":
/*!************************!*\
  !*** external "monet" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("monet");

/***/ }),

/***/ "mov-fe-lib-core":
/*!**********************************!*\
  !*** external "mov-fe-lib-core" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mov-fe-lib-core");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "rbush":
/*!************************!*\
  !*** external "rbush" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rbush");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-resize-detector":
/*!****************************************!*\
  !*** external "react-resize-detector" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-resize-detector");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map