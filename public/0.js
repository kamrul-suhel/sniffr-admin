webpackJsonp([0],{

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(6)
/* script */
var __vue_script__ = __webpack_require__(667)
/* template */
var __vue_template__ = __webpack_require__(668)
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
Component.options.__file = "resources/assets/frontend/scripts/includes/SearchComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-354fd7fe", Component.options)
  } else {
    hotAPI.reload("data-v-354fd7fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(6)
/* script */
var __vue_script__ = __webpack_require__(669)
/* template */
var __vue_template__ = __webpack_require__(670)
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
Component.options.__file = "resources/assets/frontend/scripts/includes/PaginationComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c66814f", Component.options)
  } else {
    hotAPI.reload("data-v-6c66814f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(6)
/* script */
var __vue_script__ = __webpack_require__(797)
/* template */
var __vue_template__ = __webpack_require__(801)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/stories/StoriesComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-93f7113e", Component.options)
  } else {
    hotAPI.reload("data-v-93f7113e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 667:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			value: ''
		};
	},

	props: ['searchOption'],
	created: function created() {},

	methods: {
		onSearchActive: function onSearchActive() {
			if (this.$route.name === 'stories') {
				this.$router.push({ name: 'stories', query: { search: this.value, page: 1 } });
			} else {
				this.$router.push({ name: 'videos', query: { search: this.value, page: 1 } });
			}
		}
	}
});

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "videos-filter-section" }, [
    _c(
      "div",
      { staticClass: "videos-filter-form" },
      [
        _c(
          "v-container",
          { attrs: { "grid-list-lg": "", "pt-2": "", "pb-2": "" } },
          [
            _c(
              "v-layout",
              { attrs: { row: "", wrap: "" } },
              [
                _c("v-flex", { attrs: { xs12: "" } }, [
                  _c(
                    "div",
                    { staticClass: "form-group" },
                    [
                      _c("v-text-field", {
                        attrs: {
                          type: "text",
                          name: "value",
                          color: "dark",
                          label: "Search",
                          "append-icon": "search",
                          "aria-describedby": "filterhelp",
                          autocomplete: "off"
                        },
                        on: {
                          change: _vm.onSearchActive,
                          keyup: function($event) {
                            if (
                              !("button" in $event) &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            return _vm.onSearchActive($event)
                          }
                        },
                        model: {
                          value: _vm.value,
                          callback: function($$v) {
                            _vm.value = $$v
                          },
                          expression: "value"
                        }
                      })
                    ],
                    1
                  )
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
    require("vue-hot-reload-api")      .rerender("data-v-354fd7fe", module.exports)
  }
}

/***/ }),

/***/ 669:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            current_page: this.$route.query.page ? Number(this.$route.query.page) : 1,
            total_visible: 10
        };
    },


    props: ['pagination', 'page'],

    watch: {
        pagination: function pagination() {
            this.current_page = this.pagination.current_page;
            return this.pagination;
        },
        current_page: function current_page() {
            this.$vuetify.goTo('.s-pagination-goto', { duration: 1, easing: 'easeInCubic' });

            if (this.page === 'video') {
                this.$router.push({
                    path: '/videos',
                    query: { page: this.current_page, search: this.$route.query.search }
                });
            }

            if (this.page === 'stories') {
                var value = this.$route.query.search;
                var page = this.current_page;
                this.$router.push({ name: 'stories', query: { search: value, page: page } });
            }
        }
    },

    created: function created() {
        //this.current_page = Number(this.$route.query.page);
        var device = this.$vuetify.breakpoint.name;

        if (device === 'xs') {
            this.total_visible = 5;
        }
    },


    methods: {}
});

/***/ }),

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "text-xs-center pagination-section" },
    [
      _c(
        "v-container",
        { staticClass: "py-0 mb-5", attrs: { "grid-list-lg": "" } },
        [
          _c(
            "v-layout",
            { attrs: { "justify-center": "" } },
            [
              _c(
                "v-flex",
                { staticClass: "pa-0", attrs: { xs12: "" } },
                [
                  _c("v-pagination", {
                    staticClass: "dark",
                    attrs: {
                      color: "black",
                      length: _vm.pagination.last_page,
                      "total-visible": _vm.total_visible
                    },
                    model: {
                      value: _vm.current_page,
                      callback: function($$v) {
                        _vm.current_page = $$v
                      },
                      expression: "current_page"
                    }
                  })
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
    require("vue-hot-reload-api")      .rerender("data-v-6c66814f", module.exports)
  }
}

/***/ }),

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_SearchComponent__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_SearchComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__includes_SearchComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StoryLoopComponent__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StoryLoopComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modules_StoryLoopComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_PaginationComponent__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_PaginationComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__includes_PaginationComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(26);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        SearchComponent: __WEBPACK_IMPORTED_MODULE_0__includes_SearchComponent___default.a,
        StoryLoopComponent: __WEBPACK_IMPORTED_MODULE_1__modules_StoryLoopComponent___default.a,
        PaginationComponent: __WEBPACK_IMPORTED_MODULE_2__includes_PaginationComponent___default.a
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])({
        client_logged_in: 'getClientLogin',
        stories: 'getStories',
        paginate: 'getStoriesPaginateObject',
        mailerStories: 'getMailerStories'
    })),

    data: function data() {
        return {};
    },


    watch: {
        '$route': function $route(to, from, next) {
            this.fetchStories(this.getQueryObject());
        }
    },

    created: function created() {
        this.fetchStories(this.getQueryObject());
    },


    methods: {
        fetchStories: function fetchStories(query) {
            this.$store.dispatch('fetchStories', query);
        },
        getQueryObject: function getQueryObject() {
            return {
                page: this.$route.query.page,
                search: this.$route.query.search
            };
        }
    },

    destroyed: function destroyed() {
        //reset stories store
        this.$store.commit('setResetStories');
    }
});

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(6)
/* script */
var __vue_script__ = __webpack_require__(799)
/* template */
var __vue_template__ = __webpack_require__(800)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/stories/modules/StoryLoopComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-063455fa", Component.options)
  } else {
    hotAPI.reload("data-v-063455fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_BuyQuoteButtonComponent__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_BuyQuoteButtonComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__includes_BuyQuoteButtonComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(26);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        BuyQuoteButtonComponent: __WEBPACK_IMPORTED_MODULE_0__includes_BuyQuoteButtonComponent___default.a
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])({
        client_login: 'getClientLogin'
    })),

    data: function data() {
        return {
            purchased: false
        };
    },


    props: {
        story: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: false
        }
    },

    created: function created() {
        this.getIsPurchasedAsset();
    },


    methods: {
        getFilterText: function getFilterText(text, length) {
            if (text == null) return "";
            var tmp = document.createElement("DIV");
            tmp.innerHTML = text;
            return tmp.textContent.substring(0, length) || tmp.innerText.substring(0, length) || "";
        },
        onStoryDetail: function onStoryDetail() {
            this.$router.push({ name: 'stories_detail', params: { 'alpha_id': this.story.alpha_id } });
        },
        getIsPurchasedAsset: function getIsPurchasedAsset() {
            if (this.story.story_collections && this.story.story_collections.length > 0) {
                this.purchased = true;
                return;
            }

            this.purchased = false;
        }
    }
});

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-flex",
    {
      staticClass: "story-content pb-3",
      attrs: { "d-flex": "", xs12: "", sm12: "", md6: "", lg6: "", xl6: "" }
    },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "", sm5: "", md5: "", lg5: "", xl5: "" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "story-media-thumbnail",
                  attrs: { contain: "" }
                },
                [
                  _c(
                    "v-card-media",
                    { attrs: { src: _vm.story.thumb, height: "100%" } },
                    [
                      _vm.purchased
                        ? _c("span", { staticClass: "label label-licensed" }, [
                            _vm._v("Purchased")
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
          _c(
            "v-flex",
            {
              staticClass: "py-2",
              attrs: { xs12: "", sm7: "", md7: "", lg7: "", xl7: "" }
            },
            [
              _c("h2", {
                domProps: {
                  innerHTML: _vm._s(_vm.getFilterText(_vm.story.title, 50))
                }
              }),
              _vm._v(" "),
              _c("div", {
                staticClass: "description",
                domProps: {
                  innerHTML: _vm._s(
                    _vm.getFilterText(_vm.story.description, 220)
                  )
                }
              }),
              _vm._v(" "),
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "", "align-end": "" } },
                [
                  _c(
                    "v-flex",
                    [
                      _c("buy-quote-button-component", {
                        attrs: { type: "story", asset: _vm.story }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mb-0",
                          attrs: {
                            dark: "",
                            color: "dark",
                            raised: "",
                            block: ""
                          },
                          on: { click: _vm.onStoryDetail }
                        },
                        [_vm._v("View\n                    ")]
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
    require("vue-hot-reload-api")      .rerender("data-v-063455fa", module.exports)
  }
}

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "stories-component" },
    [
      _c(
        "section",
        { staticClass: "stories-section section-space" },
        [
          _vm.client_logged_in && Object.keys(_vm.mailerStories).length > 0
            ? _c(
                "v-container",
                {
                  staticClass: "stories pt-0 pb-5",
                  attrs: { "grid-list-lg": "" }
                },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    [
                      _c(
                        "v-flex",
                        { staticClass: "text-center", attrs: { xs12: "" } },
                        [
                          _c("h2", { staticClass: "text-uppercase" }, [
                            _vm._v("Your Suggested Stories")
                          ]),
                          _vm._v(" "),
                          _c("p", [
                            _vm._v(
                              "We've gone ahead and procured a list of stories we think you will love!"
                            )
                          ])
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-layout",
                    {
                      staticStyle: { "overflow-x": "scroll" },
                      attrs: { "align-content-center": "" }
                    },
                    _vm._l(_vm.mailerStories, function(mailer) {
                      return _c("story-loop-component", {
                        key: mailer.alpha_id,
                        attrs: { story: mailer }
                      })
                    })
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-container",
            { staticClass: "py-0", attrs: { "grid-lig-lg": "" } },
            [
              _c(
                "v-layout",
                {
                  staticClass: "s-pagination-goto",
                  attrs: { row: "", wrap: "" }
                },
                [
                  _c(
                    "v-flex",
                    { staticClass: "pt-0 mb-0", attrs: { xs12: "" } },
                    [
                      _c("h2", { staticClass: "text-center text-uppercase" }, [
                        _vm._v("All Stories")
                      ])
                    ]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.stories.length > 0
            ? _c("search-component", {
                on: {
                  searchOption: function($event) {
                    _vm.searchOption($event)
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.stories.length > 0
            ? _c(
                "v-container",
                { staticClass: "stories pt-0", attrs: { "grid-list-lg": "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    _vm._l(_vm.stories, function(story) {
                      return _c("story-loop-component", {
                        key: story.id,
                        attrs: { story: story }
                      })
                    })
                  )
                ],
                1
              )
            : _c(
                "v-container",
                { staticClass: "stories pt-0", attrs: { "grid-list-lg": "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    [
                      _c(
                        "v-flex",
                        { staticClass: "text-center", attrs: { xs12: "" } },
                        [_c("h2", [_vm._v("Sorry no story found")])]
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
      _vm.paginate.last_page > 1
        ? _c("pagination-component", {
            attrs: { pagination: _vm.paginate, page: "stories" }
          })
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
    require("vue-hot-reload-api")      .rerender("data-v-93f7113e", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU2VhcmNoQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvUGFnaW5hdGlvbkNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3Rvcmllc0NvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TZWFyY2hDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TZWFyY2hDb21wb25lbnQudnVlP2RlZGUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9QYWdpbmF0aW9uQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvUGFnaW5hdGlvbkNvbXBvbmVudC52dWU/MjA0NSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3Rvcmllc0NvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9tb2R1bGVzL1N0b3J5TG9vcENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQudnVlPzA2NzkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3Rvcmllc0NvbXBvbmVudC52dWU/NmI4ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7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O0FBQzlFO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTLG9CQUFvQixFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxQ0FBcUMsV0FBVyxFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TZWFyY2hDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0zNTRmZDdmZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1NlYXJjaENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1NlYXJjaENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMzU0ZmQ3ZmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0zNTRmZDdmZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1NlYXJjaENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDUzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1BhZ2luYXRpb25Db21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02YzY2ODE0ZlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1BhZ2luYXRpb25Db21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9QYWdpbmF0aW9uQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02YzY2ODE0ZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTZjNjY4MTRmXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvUGFnaW5hdGlvbkNvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDUzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1N0b3JpZXNDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi05M2Y3MTEzZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1N0b3JpZXNDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3JpZXNDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTkzZjcxMTNlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOTNmNzExM2VcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3JpZXNDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA1Mzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiPHRlbXBsYXRlPlxuXHQ8c2VjdGlvbiBjbGFzcz1cInZpZGVvcy1maWx0ZXItc2VjdGlvblwiPlxuXHQgICAgPGRpdiAgY2xhc3M9XCJ2aWRlb3MtZmlsdGVyLWZvcm1cIj5cblx0ICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LWxnIHB0LTIgcGItMj5cblx0ICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuXHQgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuXHQgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInZhbHVlXCJcblx0XHRcdFx0XHRcdFx0XHRcdHYtbW9kZWw9XCJ2YWx1ZVwiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlNlYXJjaFwiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJzZWFyY2hcIlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJmaWx0ZXJoZWxwXCJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2hhbmdlPVwib25TZWFyY2hBY3RpdmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0QGtleXVwLmVudGVyPVwib25TZWFyY2hBY3RpdmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0YXV0b2NvbXBsZXRlPVwib2ZmXCI+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cdCAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cdCAgICAgICAgPC92LWNvbnRhaW5lcj5cblx0ICAgIDwvZGl2PlxuXHQ8L3NlY3Rpb24+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cblx0ZXhwb3J0IGRlZmF1bHQge1xuXHRcdGRhdGEoKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR2YWx1ZSA6ICcnXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRwcm9wczogW1xuXHRcdCAgICAnc2VhcmNoT3B0aW9uJ1xuXHRcdF0sXG5cdFx0Y3JlYXRlZCgpe1xuXG5cdFx0fSxcblx0XHRtZXRob2RzOntcbiAgICAgICAgICAgIG9uU2VhcmNoQWN0aXZlKCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kcm91dGUubmFtZSA9PT0gJ3N0b3JpZXMnKXtcblx0XHRcdFx0XHR0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ3N0b3JpZXMnLCBxdWVyeTogeyBzZWFyY2g6IHRoaXMudmFsdWUsIHBhZ2U6IDF9fSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOiAndmlkZW9zJywgcXVlcnk6IHsgc2VhcmNoOiB0aGlzLnZhbHVlLCBwYWdlOiAxfX0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU2VhcmNoQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJzZWN0aW9uXCIsIHsgc3RhdGljQ2xhc3M6IFwidmlkZW9zLWZpbHRlci1zZWN0aW9uXCIgfSwgW1xuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwidmlkZW9zLWZpbHRlci1mb3JtXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgIHsgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiwgXCJwdC0yXCI6IFwiXCIsIFwicGItMlwiOiBcIlwiIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IFwiZmlsdGVyaGVscFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IFwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IF92bS5vblNlYXJjaEFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5dXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEoXCJidXR0b25cIiBpbiAkZXZlbnQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5rZXlDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQua2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkVudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25TZWFyY2hBY3RpdmUoJGV2ZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52YWx1ZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMzU0ZmQ3ZmVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTM1NGZkN2ZlXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1NlYXJjaENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDY2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC14cy1jZW50ZXIgcGFnaW5hdGlvbi1zZWN0aW9uXCI+XG4gICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgY2xhc3M9XCJweS0wIG1iLTVcIj5cbiAgICAgICAgICAgIDx2LWxheW91dCBqdXN0aWZ5LWNlbnRlcj5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJwYS0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpsZW5ndGg9XCJwYWdpbmF0aW9uLmxhc3RfcGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImN1cnJlbnRfcGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRvdGFsLXZpc2libGU9XCJ0b3RhbF92aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgPjwvdi1wYWdpbmF0aW9uPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50X3BhZ2U6IHRoaXMuJHJvdXRlLnF1ZXJ5LnBhZ2UgPyBOdW1iZXIodGhpcy4kcm91dGUucXVlcnkucGFnZSk6IDEsXG4gICAgICAgICAgICAgICAgdG90YWxfdmlzaWJsZTogMTAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcHM6IFtcbiAgICAgICAgICAgICdwYWdpbmF0aW9uJyxcbiAgICAgICAgICAgICdwYWdlJ1xuICAgICAgICBdLFxuXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIHBhZ2luYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X3BhZ2UgPSB0aGlzLnBhZ2luYXRpb24uY3VycmVudF9wYWdlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhZ2luYXRpb247XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjdXJyZW50X3BhZ2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdnVldGlmeS5nb1RvKCcucy1wYWdpbmF0aW9uLWdvdG8nLCB7ZHVyYXRpb246IDEsIGVhc2luZzogJ2Vhc2VJbkN1YmljJ30pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiAnL3ZpZGVvcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeToge3BhZ2U6IHRoaXMuY3VycmVudF9wYWdlLCBzZWFyY2g6IHRoaXMuJHJvdXRlLnF1ZXJ5LnNlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gJ3N0b3JpZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJHJvdXRlLnF1ZXJ5LnNlYXJjaDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLmN1cnJlbnRfcGFnZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICdzdG9yaWVzJywgcXVlcnk6IHtzZWFyY2g6IHZhbHVlLCBwYWdlOiBwYWdlfX0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICAvL3RoaXMuY3VycmVudF9wYWdlID0gTnVtYmVyKHRoaXMuJHJvdXRlLnF1ZXJ5LnBhZ2UpO1xuICAgICAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuJHZ1ZXRpZnkuYnJlYWtwb2ludC5uYW1lO1xuXG4gICAgICAgICAgICBpZiAoZGV2aWNlID09PSAneHMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbF92aXNpYmxlID0gNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7fVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvUGFnaW5hdGlvbkNvbXBvbmVudC52dWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlciBwYWdpbmF0aW9uLXNlY3Rpb25cIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHktMCBtYi01XCIsIGF0dHJzOiB7IFwiZ3JpZC1saXN0LWxnXCI6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IFwianVzdGlmeS1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYS0wXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1wYWdpbmF0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBfdm0ucGFnaW5hdGlvbi5sYXN0X3BhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbC12aXNpYmxlXCI6IF92bS50b3RhbF92aXNpYmxlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXJyZW50X3BhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRfcGFnZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjdXJyZW50X3BhZ2VcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTZjNjY4MTRmXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi02YzY2ODE0ZlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9QYWdpbmF0aW9uQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJzdG9yaWVzLWNvbXBvbmVudFwiPlxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInN0b3JpZXMtc2VjdGlvbiBzZWN0aW9uLXNwYWNlXCI+XG5cbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgY2xhc3M9XCJzdG9yaWVzIHB0LTAgcGItNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cImNsaWVudF9sb2dnZWRfaW4gJiYgT2JqZWN0LmtleXMobWFpbGVyU3RvcmllcykubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQtdXBwZXJjYXNlXCI+WW91ciBTdWdnZXN0ZWQgU3RvcmllczwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5XZSd2ZSBnb25lIGFoZWFkIGFuZCBwcm9jdXJlZCBhIGxpc3Qgb2Ygc3RvcmllcyB3ZSB0aGluayB5b3Ugd2lsbCBsb3ZlITwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgICAgIDx2LWxheW91dCBhbGlnbi1jb250ZW50LWNlbnRlciBzdHlsZT1cIm92ZXJmbG93LXg6c2Nyb2xsO1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3RvcnktbG9vcC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihtYWlsZXIpIGluIG1haWxlclN0b3JpZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzdG9yeT1cIm1haWxlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cIm1haWxlci5hbHBoYV9pZFwiXG4gICAgICAgICAgICAgICAgICAgID48L3N0b3J5LWxvb3AtY29tcG9uZW50PlxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saWctbGcgY2xhc3M9XCJweS0wXCI+XG4gICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwIGNsYXNzPVwicy1wYWdpbmF0aW9uLWdvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwicHQtMCBtYi0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LXVwcGVyY2FzZVwiPkFsbCBTdG9yaWVzPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxzZWFyY2gtY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIEBzZWFyY2hPcHRpb249XCJzZWFyY2hPcHRpb24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzdG9yaWVzLmxlbmd0aCA+IDBcIj48L3NlYXJjaC1jb21wb25lbnQ+XG5cbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgY2xhc3M9XCJzdG9yaWVzIHB0LTBcIiB2LWlmPVwic3Rvcmllcy5sZW5ndGggPiAwXCI+XG4gICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgICAgICA8c3RvcnktbG9vcC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInN0b3J5IGluIHN0b3JpZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzdG9yeT1cInN0b3J5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwic3RvcnkuaWRcIlxuICAgICAgICAgICAgICAgICAgICA+PC9zdG9yeS1sb29wLWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC1sZyBjbGFzcz1cInN0b3JpZXMgcHQtMFwiIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+U29ycnkgbm8gc3RvcnkgZm91bmQ8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIDxwYWdpbmF0aW9uLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgIDpwYWdpbmF0aW9uPVwicGFnaW5hdGVcIlxuICAgICAgICAgICAgICAgIDpwYWdlPVwiJ3N0b3JpZXMnXCJcbiAgICAgICAgICAgICAgICB2LWlmPVwicGFnaW5hdGUubGFzdF9wYWdlID4gMVwiXG4gICAgICAgID48L3BhZ2luYXRpb24tY29tcG9uZW50PlxuXG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBTZWFyY2hDb21wb25lbnQgZnJvbSAnLi4vLi4vaW5jbHVkZXMvU2VhcmNoQ29tcG9uZW50JztcbiAgICBpbXBvcnQgU3RvcnlMb29wQ29tcG9uZW50IGZyb20gJy4vbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQnO1xuICAgIGltcG9ydCBQYWdpbmF0aW9uQ29tcG9uZW50IGZyb20gJy4uLy4uL2luY2x1ZGVzL1BhZ2luYXRpb25Db21wb25lbnQnO1xuICAgIGltcG9ydCB7bWFwR2V0dGVyc30gZnJvbSAndnVleCc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFNlYXJjaENvbXBvbmVudCxcbiAgICAgICAgICAgIFN0b3J5TG9vcENvbXBvbmVudCxcbiAgICAgICAgICAgIFBhZ2luYXRpb25Db21wb25lbnRcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgLi4ubWFwR2V0dGVycyh7XG4gICAgICAgICAgICAgICAgY2xpZW50X2xvZ2dlZF9pbjogJ2dldENsaWVudExvZ2luJyxcbiAgICAgICAgICAgICAgICBzdG9yaWVzOiAnZ2V0U3RvcmllcycsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGU6ICdnZXRTdG9yaWVzUGFnaW5hdGVPYmplY3QnLFxuICAgICAgICAgICAgICAgIG1haWxlclN0b3JpZXM6ICdnZXRNYWlsZXJTdG9yaWVzJ1xuICAgICAgICAgICAgfSksXG5cbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgICckcm91dGUnKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaFN0b3JpZXModGhpcy5nZXRRdWVyeU9iamVjdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaFN0b3JpZXModGhpcy5nZXRRdWVyeU9iamVjdCgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBmZXRjaFN0b3JpZXMocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hTdG9yaWVzJywgcXVlcnkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0UXVlcnlPYmplY3QoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy4kcm91dGUucXVlcnkucGFnZSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiB0aGlzLiRyb3V0ZS5xdWVyeS5zZWFyY2hcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3llZCgpIHtcbiAgICAgICAgICAgIC8vcmVzZXQgc3RvcmllcyBzdG9yZVxuICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSZXNldFN0b3JpZXMnKTtcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3JpZXNDb21wb25lbnQudnVlIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3RvcnlMb29wQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMDYzNDU1ZmFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TdG9yeUxvb3BDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL21vZHVsZXMvU3RvcnlMb29wQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0wNjM0NTVmYVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTA2MzQ1NWZhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9tb2R1bGVzL1N0b3J5TG9vcENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCI8dGVtcGxhdGU+XG4gICAgPHYtZmxleCBkLWZsZXggeHMxMiBzbTEyIG1kNiBsZzYgeGw2IGNsYXNzPVwic3RvcnktY29udGVudCBwYi0zXCI+XG4gICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTUgbWQ1IGxnNSB4bDU+XG4gICAgICAgICAgICAgICAgPHYtY2FyZCBjb250YWluIGNsYXNzPVwic3RvcnktbWVkaWEtdGh1bWJuYWlsXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtbWVkaWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c3JjPVwic3RvcnkudGh1bWJcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLWxpY2Vuc2VkXCIgdi1pZj1cInB1cmNoYXNlZFwiPlB1cmNoYXNlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtbWVkaWE+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtNyBtZDcgbGc3IHhsNyBjbGFzcz1cInB5LTJcIj5cbiAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwiZ2V0RmlsdGVyVGV4dChzdG9yeS50aXRsZSwgNTApXCI+PC9oMj5cbiAgICAgICAgICAgICAgICA8ZGl2IHYtaHRtbD1cImdldEZpbHRlclRleHQoc3RvcnkuZGVzY3JpcHRpb24sIDIyMClcIiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwIGFsaWduLWVuZD5cbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXktcXVvdGUtYnV0dG9uLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHlwZT1cIidzdG9yeSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXNzZXQ9XCJzdG9yeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9idXktcXVvdGUtYnV0dG9uLWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1iLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvblN0b3J5RGV0YWlsXCI+Vmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgIDwvdi1mbGV4PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgQnV5UXVvdGVCdXR0b25Db21wb25lbnQgZnJvbSAnLi4vLi4vLi4vaW5jbHVkZXMvQnV5UXVvdGVCdXR0b25Db21wb25lbnQnXG4gICAgaW1wb3J0IHttYXBHZXR0ZXJzfSBmcm9tICd2dWV4J1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBCdXlRdW90ZUJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgLi4ubWFwR2V0dGVycyh7XG4gICAgICAgICAgICAgICAgY2xpZW50X2xvZ2luOiAnZ2V0Q2xpZW50TG9naW4nXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwdXJjaGFzZWQ6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHN0b3J5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmdldElzUHVyY2hhc2VkQXNzZXQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBnZXRGaWx0ZXJUZXh0KHRleHQsIGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0ID09IG51bGwpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgICAgICAgIHRtcC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0bXAudGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIGxlbmd0aCkgfHwgdG1wLmlubmVyVGV4dC5zdWJzdHJpbmcoMCwgbGVuZ3RoKSB8fCBcIlwiO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25TdG9yeURldGFpbCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ3N0b3JpZXNfZGV0YWlsJywgcGFyYW1zOiB7J2FscGhhX2lkJzogdGhpcy5zdG9yeS5hbHBoYV9pZH19KVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0SXNQdXJjaGFzZWRBc3NldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdG9yeS5zdG9yeV9jb2xsZWN0aW9ucyAmJiB0aGlzLnN0b3J5LnN0b3J5X2NvbGxlY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL21vZHVsZXMvU3RvcnlMb29wQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWZsZXhcIixcbiAgICB7XG4gICAgICBzdGF0aWNDbGFzczogXCJzdG9yeS1jb250ZW50IHBiLTNcIixcbiAgICAgIGF0dHJzOiB7IFwiZC1mbGV4XCI6IFwiXCIsIHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kNjogXCJcIiwgbGc2OiBcIlwiLCB4bDY6IFwiXCIgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTU6IFwiXCIsIG1kNTogXCJcIiwgbGc1OiBcIlwiLCB4bDU6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3J5LW1lZGlhLXRodW1ibmFpbFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29udGFpbjogXCJcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtbWVkaWFcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBzcmM6IF92bS5zdG9yeS50aHVtYiwgaGVpZ2h0OiBcIjEwMCVcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ucHVyY2hhc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImxhYmVsIGxhYmVsLWxpY2Vuc2VkXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIlB1cmNoYXNlZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHktMlwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiLCBzbTc6IFwiXCIsIG1kNzogXCJcIiwgbGc3OiBcIlwiLCB4bDc6IFwiXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7XG4gICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKF92bS5nZXRGaWx0ZXJUZXh0KF92bS5zdG9yeS50aXRsZSwgNTApKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmdldEZpbHRlclRleHQoX3ZtLnN0b3J5LmRlc2NyaXB0aW9uLCAyMjApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiLCBcImFsaWduLWVuZFwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYnV5LXF1b3RlLWJ1dHRvbi1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJzdG9yeVwiLCBhc3NldDogX3ZtLnN0b3J5IH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IF92bS5vblN0b3J5RGV0YWlsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiVmlld1xcbiAgICAgICAgICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTA2MzQ1NWZhXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wNjM0NTVmYVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL21vZHVsZXMvU3RvcnlMb29wQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gODAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcInN0b3JpZXMtY29tcG9uZW50XCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJzZWN0aW9uXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic3Rvcmllcy1zZWN0aW9uIHNlY3Rpb24tc3BhY2VcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLmNsaWVudF9sb2dnZWRfaW4gJiYgT2JqZWN0LmtleXMoX3ZtLm1haWxlclN0b3JpZXMpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JpZXMgcHQtMCBwYi01XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBcImdyaWQtbGlzdC1sZ1wiOiBcIlwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXJcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXVwcGVyY2FzZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJZb3VyIFN1Z2dlc3RlZCBTdG9yaWVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiV2UndmUgZ29uZSBhaGVhZCBhbmQgcHJvY3VyZWQgYSBsaXN0IG9mIHN0b3JpZXMgd2UgdGhpbmsgeW91IHdpbGwgbG92ZSFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IFwib3ZlcmZsb3cteFwiOiBcInNjcm9sbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJhbGlnbi1jb250ZW50LWNlbnRlclwiOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5tYWlsZXJTdG9yaWVzLCBmdW5jdGlvbihtYWlsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJzdG9yeS1sb29wLWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG1haWxlci5hbHBoYV9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHN0b3J5OiBtYWlsZXIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHktMFwiLCBhdHRyczogeyBcImdyaWQtbGlnLWxnXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicy1wYWdpbmF0aW9uLWdvdG9cIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwdC0wIG1iLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXIgdGV4dC11cHBlcmNhc2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJBbGwgU3Rvcmllc1wiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLnN0b3JpZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyBfYyhcInNlYXJjaC1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBzZWFyY2hPcHRpb246IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uc2VhcmNoT3B0aW9uKCRldmVudClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLnN0b3JpZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzdG9yaWVzIHB0LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnN0b3JpZXMsIGZ1bmN0aW9uKHN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwic3RvcnktbG9vcC1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBzdG9yeS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHN0b3J5OiBzdG9yeSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzdG9yaWVzIHB0LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlclwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcImgyXCIsIFtfdm0uX3YoXCJTb3JyeSBubyBzdG9yeSBmb3VuZFwiKV0pXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnBhZ2luYXRlLmxhc3RfcGFnZSA+IDFcbiAgICAgICAgPyBfYyhcInBhZ2luYXRpb24tY29tcG9uZW50XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHBhZ2luYXRpb246IF92bS5wYWdpbmF0ZSwgcGFnZTogXCJzdG9yaWVzXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi05M2Y3MTEzZVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOTNmNzExM2VcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yaWVzQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gODAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=