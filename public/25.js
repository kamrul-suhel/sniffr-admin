webpackJsonp([25],{

/***/ 527:
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

var listToStyles = __webpack_require__(666)

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

/***/ 666:
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

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(735)
}
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(737)
/* template */
var __vue_template__ = __webpack_require__(738)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/contract/ContractComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aa68baee", Component.options)
  } else {
    hotAPI.reload("data-v-aa68baee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(736);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(527)("0577055b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-aa68baee\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContractComponent.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-aa68baee\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ContractComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(78)(true);
// imports


// module
exports.push([module.i, "\nbody::-webkit-scrollbar {\n    width: 1em;\n}\nbody::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n}\nbody::-webkit-scrollbar-thumb {\n    background-color: darkgrey;\n    outline: 1px solid slategrey;\n}\n", "", {"version":3,"sources":["/Users/kamrulahmed/Sites/sniffr-app/resources/assets/frontend/scripts/pages/contract/resources/assets/frontend/scripts/pages/contract/ContractComponent.vue"],"names":[],"mappings":";AAsHA;IACA,WAAA;CACA;AAEA;IACA,kDAAA;CACA;AAEA;IACA,2BAAA;IACA,6BAAA;CACA","file":"ContractComponent.vue","sourcesContent":["<template>\n    <v-container grid-list-lg fill-height class=\"section-space\">\n        <v-layout align-center justify-center v-if=\"display_thank_you\">\n            <div v-if=\"signed\" class=\"headline text-xs-center\">\n                Thank you for signing the contract. We have sent you an email confirmation which includes a link to download the contract that you just accepted.\n            </div>\n            <v-form ref=\"contract_accept_form\" @submit.prevent=\"onContractAcceptSubmit()\" v-else>\n                <v-card>\n                    <v-card-text>\n                        <v-flex xs12 align-center>\n                            <h2 class=\"text-xs-center\">LICENSE AND RELEASE</h2>\n                        </v-flex>\n\n                        <v-flex xs12>\n                            <input type=\"hidden\" name=\"token\" id=\"token\" v-model=\"token\">\n                            <div name=\"contract\" title=\"contract\" rows=\"14\" style=\"width: 100%\"\n                                      disabled=\"disabled\" v-html=\"contract\"></div>\n                        </v-flex>\n\n                        <v-flex xs12 class=\"text-center\">\n                            <v-btn\n                                    raised\n                                    dark\n                                    :loading=\"loading\"\n                                    :disabled=\"loading || buttonDisable\"\n                                    @click=\"onContractAcceptSubmit()\"\n                            >ACCEPT CONTRACT\n                            </v-btn>\n                        </v-flex>\n\n                        <v-flex xs12 text-xs-center>\n                            <span v-if=\"showMessage\" :class=\"[error ? 'red--text' : 'green--text']\">{{message}}</span>\n                        </v-flex>\n                    </v-card-text>\n                </v-card>\n            </v-form>\n        </v-layout>\n\n        <v-layout align-center justify-center v-else>\n            <v-card width=\"800\">\n                <v-card-text>\n                    <v-flex xs12 text-xs-center>\n                        <span v-if=\"showMessage\" :class=\"[error ? 'red--text' : 'green--text','text-uppercase']\">{{message}}</span>\n                    </v-flex>\n                </v-card-text>\n            </v-card>\n        </v-layout>\n\n    </v-container>\n</template>\n<script>\n    export default {\n        data() {\n            return {\n                token: '',\n                counter: 30,\n                //Loading button\n                loading: false,\n                loader: null,\n                buttonDisable: false,\n                showMessage: false,\n                message: '',\n                contract: null,\n                signed: true,\n                display_thank_you: false,\n                error: false\n            }\n        },\n\n        created() {\n            this.token = this.$route.params.token;\n\n            axios.get('/contract/' + this.token + '/accept')\n                .then(response => {\n\n                    if(!response.data.error){\n                        this.contract = response.data.contract\n                        this.video = response.data.video\n                        this.signed = response.data.signed\n                        this.display_thank_you = true\n                    }else{\n                        this.error = true;\n                        this.showMessage = true;\n                        this.message = response.data.error_message;\n                    }\n\n                })\n        },\n\n        methods: {\n            onContractAcceptSubmit() {\n                //collect form data\n                let contractAcceptForm = new FormData();\n                contractAcceptForm.append('token', this.token);\n\n                //send request\n                let requestUrl = '/contract/' + this.token + '/sign';\n                axios.post(requestUrl, contractAcceptForm)\n                    .then(response => {\n                        this.showMessage = true;\n                        this.buttonDisable = true;\n                        if (!response.data.error) {\n                            this.message = response.data.success_message;\n                            this.signed = response.data.signed\n                            this.display_thank_you = true\n                        } else {\n                            this.error = true;\n                            this.message = response.data.error_message;\n                        }\n                    })\n                    .catch(error => {\n                        console.log(error);\n                    });\n            }\n        }\n    }\n</script>\n<style>\n    body::-webkit-scrollbar {\n        width: 1em;\n    }\n\n    body::-webkit-scrollbar-track {\n        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n    }\n\n    body::-webkit-scrollbar-thumb {\n        background-color: darkgrey;\n        outline: 1px solid slategrey;\n    }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            token: '',
            counter: 30,
            //Loading button
            loading: false,
            loader: null,
            buttonDisable: false,
            showMessage: false,
            message: '',
            contract: null,
            signed: true,
            display_thank_you: false,
            error: false
        };
    },
    created: function created() {
        var _this = this;

        this.token = this.$route.params.token;

        axios.get('/contract/' + this.token + '/accept').then(function (response) {

            if (!response.data.error) {
                _this.contract = response.data.contract;
                _this.video = response.data.video;
                _this.signed = response.data.signed;
                _this.display_thank_you = true;
            } else {
                _this.error = true;
                _this.showMessage = true;
                _this.message = response.data.error_message;
            }
        });
    },


    methods: {
        onContractAcceptSubmit: function onContractAcceptSubmit() {
            var _this2 = this;

            //collect form data
            var contractAcceptForm = new FormData();
            contractAcceptForm.append('token', this.token);

            //send request
            var requestUrl = '/contract/' + this.token + '/sign';
            axios.post(requestUrl, contractAcceptForm).then(function (response) {
                _this2.showMessage = true;
                _this2.buttonDisable = true;
                if (!response.data.error) {
                    _this2.message = response.data.success_message;
                    _this2.signed = response.data.signed;
                    _this2.display_thank_you = true;
                } else {
                    _this2.error = true;
                    _this2.message = response.data.error_message;
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});

/***/ }),

/***/ 738:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    {
      staticClass: "section-space",
      attrs: { "grid-list-lg": "", "fill-height": "" }
    },
    [
      _vm.display_thank_you
        ? _c(
            "v-layout",
            { attrs: { "align-center": "", "justify-center": "" } },
            [
              _vm.signed
                ? _c("div", { staticClass: "headline text-xs-center" }, [
                    _vm._v(
                      "\n            Thank you for signing the contract. We have sent you an email confirmation which includes a link to download the contract that you just accepted.\n        "
                    )
                  ])
                : _c(
                    "v-form",
                    {
                      ref: "contract_accept_form",
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          _vm.onContractAcceptSubmit()
                        }
                      }
                    },
                    [
                      _c(
                        "v-card",
                        [
                          _c(
                            "v-card-text",
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", "align-center": "" } },
                                [
                                  _c("h2", { staticClass: "text-xs-center" }, [
                                    _vm._v("LICENSE AND RELEASE")
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c("v-flex", { attrs: { xs12: "" } }, [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.token,
                                      expression: "token"
                                    }
                                  ],
                                  attrs: {
                                    type: "hidden",
                                    name: "token",
                                    id: "token"
                                  },
                                  domProps: { value: _vm.token },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.token = $event.target.value
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("div", {
                                  staticStyle: { width: "100%" },
                                  attrs: {
                                    name: "contract",
                                    title: "contract",
                                    rows: "14",
                                    disabled: "disabled"
                                  },
                                  domProps: { innerHTML: _vm._s(_vm.contract) }
                                })
                              ]),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  staticClass: "text-center",
                                  attrs: { xs12: "" }
                                },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        raised: "",
                                        dark: "",
                                        loading: _vm.loading,
                                        disabled:
                                          _vm.loading || _vm.buttonDisable
                                      },
                                      on: {
                                        click: function($event) {
                                          _vm.onContractAcceptSubmit()
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "ACCEPT CONTRACT\n                        "
                                      )
                                    ]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", "text-xs-center": "" } },
                                [
                                  _vm.showMessage
                                    ? _c(
                                        "span",
                                        {
                                          class: [
                                            _vm.error
                                              ? "red--text"
                                              : "green--text"
                                          ]
                                        },
                                        [_vm._v(_vm._s(_vm.message))]
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
                    ],
                    1
                  )
            ],
            1
          )
        : _c(
            "v-layout",
            { attrs: { "align-center": "", "justify-center": "" } },
            [
              _c(
                "v-card",
                { attrs: { width: "800" } },
                [
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-flex",
                        { attrs: { xs12: "", "text-xs-center": "" } },
                        [
                          _vm.showMessage
                            ? _c(
                                "span",
                                {
                                  class: [
                                    _vm.error ? "red--text" : "green--text",
                                    "text-uppercase"
                                  ]
                                },
                                [_vm._v(_vm._s(_vm.message))]
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
    require("vue-hot-reload-api")      .rerender("data-v-aa68baee", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NvbnRyYWN0L0NvbnRyYWN0Q29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY29udHJhY3QvQ29udHJhY3RDb21wb25lbnQudnVlPzdjNTEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NvbnRyYWN0L0NvbnRyYWN0Q29tcG9uZW50LnZ1ZT9jYThkIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY29udHJhY3QvQ29udHJhY3RDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jb250cmFjdC9Db250cmFjdENvbXBvbmVudC52dWU/MjA1MSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFF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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsMkNBQTJDLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsZUFBZSxFQUFFO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixTQUFTLGlDQUFpQyxFQUFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cbnZhciBvcHRpb25zID0gbnVsbFxudmFyIHNzcklkS2V5ID0gJ2RhdGEtdnVlLXNzci1pZCdcblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24sIF9vcHRpb25zKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICBvcHRpb25zID0gX29wdGlvbnMgfHwge31cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVsnICsgc3NySWRLZXkgKyAnfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cbiAgaWYgKG9wdGlvbnMuc3NySWQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKHNzcklkS2V5LCBvYmouaWQpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNTI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyNSIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyNSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYWE2OGJhZWVcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ29udHJhY3RDb21wb25lbnQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0NvbnRyYWN0Q29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYWE2OGJhZWVcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Db250cmFjdENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jb250cmFjdC9Db250cmFjdENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtYWE2OGJhZWVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1hYTY4YmFlZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NvbnRyYWN0L0NvbnRyYWN0Q29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMjUiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYWE2OGJhZWVcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ29udHJhY3RDb21wb25lbnQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIwNTc3MDU1YlwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYWE2OGJhZWVcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vQ29udHJhY3RDb21wb25lbnQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWFhNjhiYWVlXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0NvbnRyYWN0Q29tcG9uZW50LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1hYTY4YmFlZVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NvbnRyYWN0L0NvbnRyYWN0Q29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMjUiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICB3aWR0aDogMWVtO1xcbn1cXG5ib2R5Ojotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsMCwwLDAuMyk7XFxufVxcbmJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZXk7XFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCBzbGF0ZWdyZXk7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMva2FtcnVsYWhtZWQvU2l0ZXMvc25pZmZyLWFwcC9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY29udHJhY3QvcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NvbnRyYWN0L0NvbnRyYWN0Q29tcG9uZW50LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBc0hBO0lBQ0EsV0FBQTtDQUNBO0FBRUE7SUFDQSxrREFBQTtDQUNBO0FBRUE7SUFDQSwyQkFBQTtJQUNBLDZCQUFBO0NBQ0FcIixcImZpbGVcIjpcIkNvbnRyYWN0Q29tcG9uZW50LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI8dGVtcGxhdGU+XFxuICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgZmlsbC1oZWlnaHQgY2xhc3M9XFxcInNlY3Rpb24tc3BhY2VcXFwiPlxcbiAgICAgICAgPHYtbGF5b3V0IGFsaWduLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB2LWlmPVxcXCJkaXNwbGF5X3RoYW5rX3lvdVxcXCI+XFxuICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJzaWduZWRcXFwiIGNsYXNzPVxcXCJoZWFkbGluZSB0ZXh0LXhzLWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgICAgIFRoYW5rIHlvdSBmb3Igc2lnbmluZyB0aGUgY29udHJhY3QuIFdlIGhhdmUgc2VudCB5b3UgYW4gZW1haWwgY29uZmlybWF0aW9uIHdoaWNoIGluY2x1ZGVzIGEgbGluayB0byBkb3dubG9hZCB0aGUgY29udHJhY3QgdGhhdCB5b3UganVzdCBhY2NlcHRlZC5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8di1mb3JtIHJlZj1cXFwiY29udHJhY3RfYWNjZXB0X2Zvcm1cXFwiIEBzdWJtaXQucHJldmVudD1cXFwib25Db250cmFjdEFjY2VwdFN1Ym1pdCgpXFxcIiB2LWVsc2U+XFxuICAgICAgICAgICAgICAgIDx2LWNhcmQ+XFxuICAgICAgICAgICAgICAgICAgICA8di1jYXJkLXRleHQ+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGFsaWduLWNlbnRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ0ZXh0LXhzLWNlbnRlclxcXCI+TElDRU5TRSBBTkQgUkVMRUFTRTwvaDI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJ0b2tlblxcXCIgaWQ9XFxcInRva2VuXFxcIiB2LW1vZGVsPVxcXCJ0b2tlblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbmFtZT1cXFwiY29udHJhY3RcXFwiIHRpdGxlPVxcXCJjb250cmFjdFxcXCIgcm93cz1cXFwiMTRcXFwiIHN0eWxlPVxcXCJ3aWR0aDogMTAwJVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPVxcXCJkaXNhYmxlZFxcXCIgdi1odG1sPVxcXCJjb250cmFjdFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0blxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bG9hZGluZz1cXFwibG9hZGluZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XFxcImxvYWRpbmcgfHwgYnV0dG9uRGlzYWJsZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XFxcIm9uQ29udHJhY3RBY2NlcHRTdWJtaXQoKVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPkFDQ0VQVCBDT05UUkFDVFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcblxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiB0ZXh0LXhzLWNlbnRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cXFwic2hvd01lc3NhZ2VcXFwiIDpjbGFzcz1cXFwiW2Vycm9yID8gJ3JlZC0tdGV4dCcgOiAnZ3JlZW4tLXRleHQnXVxcXCI+e3ttZXNzYWdlfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XFxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxcbiAgICAgICAgICAgICAgICA8L3YtY2FyZD5cXG4gICAgICAgICAgICA8L3YtZm9ybT5cXG4gICAgICAgIDwvdi1sYXlvdXQ+XFxuXFxuICAgICAgICA8di1sYXlvdXQgYWxpZ24tY2VudGVyIGp1c3RpZnktY2VudGVyIHYtZWxzZT5cXG4gICAgICAgICAgICA8di1jYXJkIHdpZHRoPVxcXCI4MDBcXFwiPlxcbiAgICAgICAgICAgICAgICA8di1jYXJkLXRleHQ+XFxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cXFwic2hvd01lc3NhZ2VcXFwiIDpjbGFzcz1cXFwiW2Vycm9yID8gJ3JlZC0tdGV4dCcgOiAnZ3JlZW4tLXRleHQnLCd0ZXh0LXVwcGVyY2FzZSddXFxcIj57e21lc3NhZ2V9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxcbiAgICAgICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxcbiAgICAgICAgICAgIDwvdi1jYXJkPlxcbiAgICAgICAgPC92LWxheW91dD5cXG5cXG4gICAgPC92LWNvbnRhaW5lcj5cXG48L3RlbXBsYXRlPlxcbjxzY3JpcHQ+XFxuICAgIGV4cG9ydCBkZWZhdWx0IHtcXG4gICAgICAgIGRhdGEoKSB7XFxuICAgICAgICAgICAgcmV0dXJuIHtcXG4gICAgICAgICAgICAgICAgdG9rZW46ICcnLFxcbiAgICAgICAgICAgICAgICBjb3VudGVyOiAzMCxcXG4gICAgICAgICAgICAgICAgLy9Mb2FkaW5nIGJ1dHRvblxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcXG4gICAgICAgICAgICAgICAgbG9hZGVyOiBudWxsLFxcbiAgICAgICAgICAgICAgICBidXR0b25EaXNhYmxlOiBmYWxzZSxcXG4gICAgICAgICAgICAgICAgc2hvd01lc3NhZ2U6IGZhbHNlLFxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJyxcXG4gICAgICAgICAgICAgICAgY29udHJhY3Q6IG51bGwsXFxuICAgICAgICAgICAgICAgIHNpZ25lZDogdHJ1ZSxcXG4gICAgICAgICAgICAgICAgZGlzcGxheV90aGFua195b3U6IGZhbHNlLFxcbiAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2VcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9LFxcblxcbiAgICAgICAgY3JlYXRlZCgpIHtcXG4gICAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcm91dGUucGFyYW1zLnRva2VuO1xcblxcbiAgICAgICAgICAgIGF4aW9zLmdldCgnL2NvbnRyYWN0LycgKyB0aGlzLnRva2VuICsgJy9hY2NlcHQnKVxcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XFxuXFxuICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5lcnJvcil7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cmFjdCA9IHJlc3BvbnNlLmRhdGEuY29udHJhY3RcXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvID0gcmVzcG9uc2UuZGF0YS52aWRlb1xcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmVkID0gcmVzcG9uc2UuZGF0YS5zaWduZWRcXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlfdGhhbmtfeW91ID0gdHJ1ZVxcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZSA9IHRydWU7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzcG9uc2UuZGF0YS5lcnJvcl9tZXNzYWdlO1xcbiAgICAgICAgICAgICAgICAgICAgfVxcblxcbiAgICAgICAgICAgICAgICB9KVxcbiAgICAgICAgfSxcXG5cXG4gICAgICAgIG1ldGhvZHM6IHtcXG4gICAgICAgICAgICBvbkNvbnRyYWN0QWNjZXB0U3VibWl0KCkge1xcbiAgICAgICAgICAgICAgICAvL2NvbGxlY3QgZm9ybSBkYXRhXFxuICAgICAgICAgICAgICAgIGxldCBjb250cmFjdEFjY2VwdEZvcm0gPSBuZXcgRm9ybURhdGEoKTtcXG4gICAgICAgICAgICAgICAgY29udHJhY3RBY2NlcHRGb3JtLmFwcGVuZCgndG9rZW4nLCB0aGlzLnRva2VuKTtcXG5cXG4gICAgICAgICAgICAgICAgLy9zZW5kIHJlcXVlc3RcXG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3RVcmwgPSAnL2NvbnRyYWN0LycgKyB0aGlzLnRva2VuICsgJy9zaWduJztcXG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdChyZXF1ZXN0VXJsLCBjb250cmFjdEFjY2VwdEZvcm0pXFxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZSA9IHRydWU7XFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25EaXNhYmxlID0gdHJ1ZTtcXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmRhdGEuZXJyb3IpIHtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzcG9uc2UuZGF0YS5zdWNjZXNzX21lc3NhZ2U7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmVkID0gcmVzcG9uc2UuZGF0YS5zaWduZWRcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5X3RoYW5rX3lvdSA9IHRydWVcXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gdHJ1ZTtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzcG9uc2UuZGF0YS5lcnJvcl9tZXNzYWdlO1xcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgICAgIH0pXFxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcXG4gICAgICAgICAgICAgICAgICAgIH0pO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcbjwvc2NyaXB0PlxcbjxzdHlsZT5cXG4gICAgYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICAgICAgd2lkdGg6IDFlbTtcXG4gICAgfVxcblxcbiAgICBib2R5Ojotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XFxuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwwLjMpO1xcbiAgICB9XFxuXFxuICAgIGJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmV5O1xcbiAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIHNsYXRlZ3JleTtcXG4gICAgfVxcbjwvc3R5bGU+XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWFhNjhiYWVlXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY29udHJhY3QvQ29udHJhY3RDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3MzZcbi8vIG1vZHVsZSBjaHVua3MgPSAyNSIsIjx0ZW1wbGF0ZT5cbiAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LWxnIGZpbGwtaGVpZ2h0IGNsYXNzPVwic2VjdGlvbi1zcGFjZVwiPlxuICAgICAgICA8di1sYXlvdXQgYWxpZ24tY2VudGVyIGp1c3RpZnktY2VudGVyIHYtaWY9XCJkaXNwbGF5X3RoYW5rX3lvdVwiPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwic2lnbmVkXCIgY2xhc3M9XCJoZWFkbGluZSB0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIFRoYW5rIHlvdSBmb3Igc2lnbmluZyB0aGUgY29udHJhY3QuIFdlIGhhdmUgc2VudCB5b3UgYW4gZW1haWwgY29uZmlybWF0aW9uIHdoaWNoIGluY2x1ZGVzIGEgbGluayB0byBkb3dubG9hZCB0aGUgY29udHJhY3QgdGhhdCB5b3UganVzdCBhY2NlcHRlZC5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHYtZm9ybSByZWY9XCJjb250cmFjdF9hY2NlcHRfZm9ybVwiIEBzdWJtaXQucHJldmVudD1cIm9uQ29udHJhY3RBY2NlcHRTdWJtaXQoKVwiIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8di1jYXJkPlxuICAgICAgICAgICAgICAgICAgICA8di1jYXJkLXRleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgYWxpZ24tY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQteHMtY2VudGVyXCI+TElDRU5TRSBBTkQgUkVMRUFTRTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInRva2VuXCIgaWQ9XCJ0b2tlblwiIHYtbW9kZWw9XCJ0b2tlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgbmFtZT1cImNvbnRyYWN0XCIgdGl0bGU9XCJjb250cmFjdFwiIHJvd3M9XCIxNFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD1cImRpc2FibGVkXCIgdi1odG1sPVwiY29udHJhY3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwibG9hZGluZyB8fCBidXR0b25EaXNhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uQ29udHJhY3RBY2NlcHRTdWJtaXQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPkFDQ0VQVCBDT05UUkFDVFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHRleHQteHMtY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaWY9XCJzaG93TWVzc2FnZVwiIDpjbGFzcz1cIltlcnJvciA/ICdyZWQtLXRleHQnIDogJ2dyZWVuLS10ZXh0J11cIj57e21lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICAgICAgPC92LWZvcm0+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgPHYtbGF5b3V0IGFsaWduLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB2LWVsc2U+XG4gICAgICAgICAgICA8di1jYXJkIHdpZHRoPVwiODAwXCI+XG4gICAgICAgICAgICAgICAgPHYtY2FyZC10ZXh0PlxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWlmPVwic2hvd01lc3NhZ2VcIiA6Y2xhc3M9XCJbZXJyb3IgPyAncmVkLS10ZXh0JyA6ICdncmVlbi0tdGV4dCcsJ3RleHQtdXBwZXJjYXNlJ11cIj57e21lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgPC92LWNvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICcnLFxuICAgICAgICAgICAgICAgIGNvdW50ZXI6IDMwLFxuICAgICAgICAgICAgICAgIC8vTG9hZGluZyBidXR0b25cbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2FkZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgYnV0dG9uRGlzYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd01lc3NhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICAgICAgICAgIGNvbnRyYWN0OiBudWxsLFxuICAgICAgICAgICAgICAgIHNpZ25lZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5X3RoYW5rX3lvdTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRyb3V0ZS5wYXJhbXMudG9rZW47XG5cbiAgICAgICAgICAgIGF4aW9zLmdldCgnL2NvbnRyYWN0LycgKyB0aGlzLnRva2VuICsgJy9hY2NlcHQnKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5lcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyYWN0ID0gcmVzcG9uc2UuZGF0YS5jb250cmFjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlbyA9IHJlc3BvbnNlLmRhdGEudmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbmVkID0gcmVzcG9uc2UuZGF0YS5zaWduZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheV90aGFua195b3UgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3BvbnNlLmRhdGEuZXJyb3JfbWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvbkNvbnRyYWN0QWNjZXB0U3VibWl0KCkge1xuICAgICAgICAgICAgICAgIC8vY29sbGVjdCBmb3JtIGRhdGFcbiAgICAgICAgICAgICAgICBsZXQgY29udHJhY3RBY2NlcHRGb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgY29udHJhY3RBY2NlcHRGb3JtLmFwcGVuZCgndG9rZW4nLCB0aGlzLnRva2VuKTtcblxuICAgICAgICAgICAgICAgIC8vc2VuZCByZXF1ZXN0XG4gICAgICAgICAgICAgICAgbGV0IHJlcXVlc3RVcmwgPSAnL2NvbnRyYWN0LycgKyB0aGlzLnRva2VuICsgJy9zaWduJztcbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KHJlcXVlc3RVcmwsIGNvbnRyYWN0QWNjZXB0Rm9ybSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkRpc2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gcmVzcG9uc2UuZGF0YS5zdWNjZXNzX21lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduZWQgPSByZXNwb25zZS5kYXRhLnNpZ25lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheV90aGFua195b3UgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3BvbnNlLmRhdGEuZXJyb3JfbWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cbjxzdHlsZT5cbiAgICBib2R5Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIHdpZHRoOiAxZW07XG4gICAgfVxuXG4gICAgYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLDAsMCwwLjMpO1xuICAgIH1cblxuICAgIGJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZXk7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCBzbGF0ZWdyZXk7XG4gICAgfVxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY29udHJhY3QvQ29udHJhY3RDb21wb25lbnQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtY29udGFpbmVyXCIsXG4gICAge1xuICAgICAgc3RhdGljQ2xhc3M6IFwic2VjdGlvbi1zcGFjZVwiLFxuICAgICAgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiwgXCJmaWxsLWhlaWdodFwiOiBcIlwiIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF92bS5kaXNwbGF5X3RoYW5rX3lvdVxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyBcImFsaWduLWNlbnRlclwiOiBcIlwiLCBcImp1c3RpZnktY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uc2lnbmVkXG4gICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRsaW5lIHRleHQteHMtY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICBUaGFuayB5b3UgZm9yIHNpZ25pbmcgdGhlIGNvbnRyYWN0LiBXZSBoYXZlIHNlbnQgeW91IGFuIGVtYWlsIGNvbmZpcm1hdGlvbiB3aGljaCBpbmNsdWRlcyBhIGxpbmsgdG8gZG93bmxvYWQgdGhlIGNvbnRyYWN0IHRoYXQgeW91IGp1c3QgYWNjZXB0ZWQuXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mb3JtXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiY29udHJhY3RfYWNjZXB0X2Zvcm1cIixcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uQ29udHJhY3RBY2NlcHRTdWJtaXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwiYWxpZ24tY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiTElDRU5TRSBBTkQgUkVMRUFTRVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidG9rZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRva2VuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0b2tlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRva2VuID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb250cmFjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiY29udHJhY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiMTRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5jb250cmFjdCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHhzMTI6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ubG9hZGluZyB8fCBfdm0uYnV0dG9uRGlzYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkNvbnRyYWN0QWNjZXB0U3VibWl0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFDQ0VQVCBDT05UUkFDVFxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgXCJ0ZXh0LXhzLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zaG93TWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwicmVkLS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiZ3JlZW4tLXRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLm1lc3NhZ2UpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJhbGlnbi1jZW50ZXJcIjogXCJcIiwgXCJqdXN0aWZ5LWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHdpZHRoOiBcIjgwMFwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInRleHQteHMtY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2hvd01lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZXJyb3IgPyBcInJlZC0tdGV4dFwiIDogXCJncmVlbi0tdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0ubWVzc2FnZSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtYWE2OGJhZWVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWFhNjhiYWVlXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NvbnRyYWN0L0NvbnRyYWN0Q29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjUiXSwic291cmNlUm9vdCI6IiJ9