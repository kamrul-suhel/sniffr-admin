webpackJsonp([22],{

/***/ 719:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(805)
/* template */
var __vue_template__ = __webpack_require__(809)
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

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(778)
/* template */
var __vue_template__ = __webpack_require__(779)
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

/***/ 778:
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

/***/ 779:
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

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(781)
/* template */
var __vue_template__ = __webpack_require__(782)
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

/***/ 781:
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

/***/ 782:
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

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_SearchComponent__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_SearchComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__includes_SearchComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StoryLoopComponent__ = __webpack_require__(806);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_StoryLoopComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modules_StoryLoopComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_PaginationComponent__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_PaginationComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__includes_PaginationComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(55);
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

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(807)
/* template */
var __vue_template__ = __webpack_require__(808)
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

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_BuyQuoteButtonComponent__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_BuyQuoteButtonComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__includes_BuyQuoteButtonComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(55);
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

/***/ 808:
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

/***/ 809:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yaWVzQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU2VhcmNoQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1NlYXJjaENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1NlYXJjaENvbXBvbmVudC52dWU/ZGVkZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvUGFnaW5hdGlvbkNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9QYWdpbmF0aW9uQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvUGFnaW5hdGlvbkNvbXBvbmVudC52dWU/MjA0NSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3Rvcmllc0NvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9tb2R1bGVzL1N0b3J5TG9vcENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQudnVlPzA2NzkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3Rvcmllc0NvbXBvbmVudC52dWU/NmI4ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBLEtBREEsa0JBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQSxFQUxBOztBQU1BLFNBQ0EsY0FEQSxDQU5BO0FBU0EsUUFUQSxxQkFTQSxDQUVBLENBWEE7O0FBWUE7QUFDQSxnQkFEQSw0QkFDQTtBQUNBO0FBQ0E7QUFDQSxJQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVpBLEc7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Is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O0FBQzlFO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTLG9CQUFvQixFQUFFO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxQ0FBcUMsV0FBVyxFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3Rvcmllc0NvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTkzZjcxMTNlXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU3Rvcmllc0NvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3Rvcmllc0NvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtOTNmNzExM2VcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi05M2Y3MTEzZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3Rvcmllc0NvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDcxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIyIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU2VhcmNoQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMzU0ZmQ3ZmVcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TZWFyY2hDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TZWFyY2hDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTM1NGZkN2ZlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMzU0ZmQ3ZmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TZWFyY2hDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiAyNCIsIjx0ZW1wbGF0ZT5cblx0PHNlY3Rpb24gY2xhc3M9XCJ2aWRlb3MtZmlsdGVyLXNlY3Rpb25cIj5cblx0ICAgIDxkaXYgIGNsYXNzPVwidmlkZW9zLWZpbHRlci1mb3JtXCI+XG5cdCAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC1sZyBwdC0yIHBiLTI+XG5cdCAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cblx0ICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cblx0ICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ2YWx1ZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHR2LW1vZGVsPVwidmFsdWVcIlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2hcIlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwic2VhcmNoXCJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwiZmlsdGVyaGVscFwiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cIm9uU2VhcmNoQWN0aXZlXCJcblx0XHRcdFx0XHRcdFx0XHRcdEBrZXl1cC5lbnRlcj1cIm9uU2VhcmNoQWN0aXZlXCJcblx0XHRcdFx0XHRcdFx0XHRcdGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cblx0ICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblx0ICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXHQgICAgICAgICAgICA8L3YtbGF5b3V0PlxuXHQgICAgICAgIDwvdi1jb250YWluZXI+XG5cdCAgICA8L2Rpdj5cblx0PC9zZWN0aW9uPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG5cdGV4cG9ydCBkZWZhdWx0IHtcblx0XHRkYXRhKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dmFsdWUgOiAnJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cHJvcHM6IFtcblx0XHQgICAgJ3NlYXJjaE9wdGlvbidcblx0XHRdLFxuXHRcdGNyZWF0ZWQoKXtcblxuXHRcdH0sXG5cdFx0bWV0aG9kczp7XG4gICAgICAgICAgICBvblNlYXJjaEFjdGl2ZSgpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuJHJvdXRlLm5hbWUgPT09ICdzdG9yaWVzJyl7XG5cdFx0XHRcdFx0dGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICdzdG9yaWVzJywgcXVlcnk6IHsgc2VhcmNoOiB0aGlzLnZhbHVlLCBwYWdlOiAxfX0pO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ3ZpZGVvcycsIHF1ZXJ5OiB7IHNlYXJjaDogdGhpcy52YWx1ZSwgcGFnZTogMX19KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1NlYXJjaENvbXBvbmVudC52dWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwic2VjdGlvblwiLCB7IHN0YXRpY0NsYXNzOiBcInZpZGVvcy1maWx0ZXItc2VjdGlvblwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcInZpZGVvcy1maWx0ZXItZm9ybVwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IFwiZ3JpZC1saXN0LWxnXCI6IFwiXCIsIFwicHQtMlwiOiBcIlwiLCBcInBiLTJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWx1ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiBcImZpbHRlcmhlbHBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBfdm0ub25TZWFyY2hBY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleXVwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKFwiYnV0dG9uXCIgaW4gJGV2ZW50KSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9rKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQua2V5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9uU2VhcmNoQWN0aXZlKCRldmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmFsdWUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTM1NGZkN2ZlXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0zNTRmZDdmZVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TZWFyY2hDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3Nzlcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiAyNCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1BhZ2luYXRpb25Db21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi02YzY2ODE0ZlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1BhZ2luYXRpb25Db21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9QYWdpbmF0aW9uQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi02YzY2ODE0ZlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTZjNjY4MTRmXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvUGFnaW5hdGlvbkNvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIyIDI0IiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlciBwYWdpbmF0aW9uLXNlY3Rpb25cIj5cbiAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC1sZyBjbGFzcz1cInB5LTAgbWItNVwiPlxuICAgICAgICAgICAgPHYtbGF5b3V0IGp1c3RpZnktY2VudGVyPlxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInBhLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxlbmd0aD1cInBhZ2luYXRpb24ubGFzdF9wYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiY3VycmVudF9wYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG90YWwtdmlzaWJsZT1cInRvdGFsX3Zpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICA+PC92LXBhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRfcGFnZTogdGhpcy4kcm91dGUucXVlcnkucGFnZSA/IE51bWJlcih0aGlzLiRyb3V0ZS5xdWVyeS5wYWdlKTogMSxcbiAgICAgICAgICAgICAgICB0b3RhbF92aXNpYmxlOiAxMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wczogW1xuICAgICAgICAgICAgJ3BhZ2luYXRpb24nLFxuICAgICAgICAgICAgJ3BhZ2UnXG4gICAgICAgIF0sXG5cblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgcGFnaW5hdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IHRoaXMucGFnaW5hdGlvbi5jdXJyZW50X3BhZ2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFnaW5hdGlvbjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGN1cnJlbnRfcGFnZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiR2dWV0aWZ5LmdvVG8oJy5zLXBhZ2luYXRpb24tZ290bycsIHtkdXJhdGlvbjogMSwgZWFzaW5nOiAnZWFzZUluQ3ViaWMnfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICcvdmlkZW9zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB7cGFnZTogdGhpcy5jdXJyZW50X3BhZ2UsIHNlYXJjaDogdGhpcy4kcm91dGUucXVlcnkuc2VhcmNofVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSAnc3RvcmllcycpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy4kcm91dGUucXVlcnkuc2VhcmNoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMuY3VycmVudF9wYWdlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ3N0b3JpZXMnLCBxdWVyeToge3NlYXJjaDogdmFsdWUsIHBhZ2U6IHBhZ2V9fSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIC8vdGhpcy5jdXJyZW50X3BhZ2UgPSBOdW1iZXIodGhpcy4kcm91dGUucXVlcnkucGFnZSk7XG4gICAgICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy4kdnVldGlmeS5icmVha3BvaW50Lm5hbWU7XG5cbiAgICAgICAgICAgIGlmIChkZXZpY2UgPT09ICd4cycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsX3Zpc2libGUgPSA1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHt9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9QYWdpbmF0aW9uQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyIHBhZ2luYXRpb24tc2VjdGlvblwiIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJweS0wIG1iLTVcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJqdXN0aWZ5LWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBhLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXBhZ2luYXRpb25cIiwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IF92bS5wYWdpbmF0aW9uLmxhc3RfcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsLXZpc2libGVcIjogX3ZtLnRvdGFsX3Zpc2libGVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1cnJlbnRfcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudF9wYWdlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImN1cnJlbnRfcGFnZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNmM2NjgxNGZcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTZjNjY4MTRmXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1BhZ2luYXRpb25Db21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODJcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiAyNCIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwic3Rvcmllcy1jb21wb25lbnRcIj5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJzdG9yaWVzLXNlY3Rpb24gc2VjdGlvbi1zcGFjZVwiPlxuXG4gICAgICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LWxnIGNsYXNzPVwic3RvcmllcyBwdC0wIHBiLTVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJjbGllbnRfbG9nZ2VkX2luICYmIE9iamVjdC5rZXlzKG1haWxlclN0b3JpZXMpLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0ZXh0LXVwcGVyY2FzZVwiPllvdXIgU3VnZ2VzdGVkIFN0b3JpZXM8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+V2UndmUgZ29uZSBhaGVhZCBhbmQgcHJvY3VyZWQgYSBsaXN0IG9mIHN0b3JpZXMgd2UgdGhpbmsgeW91IHdpbGwgbG92ZSE8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgYWxpZ24tY29udGVudC1jZW50ZXIgc3R5bGU9XCJvdmVyZmxvdy14OnNjcm9sbDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0b3J5LWxvb3AtY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIobWFpbGVyKSBpbiBtYWlsZXJTdG9yaWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c3Rvcnk9XCJtYWlsZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJtYWlsZXIuYWxwaGFfaWRcIlxuICAgICAgICAgICAgICAgICAgICA+PC9zdG9yeS1sb29wLWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgPC92LWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlnLWxnIGNsYXNzPVwicHktMFwiPlxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcCBjbGFzcz1cInMtcGFnaW5hdGlvbi1nb3RvXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInB0LTAgbWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC11cHBlcmNhc2VcIj5BbGwgU3RvcmllczwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8c2VhcmNoLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBAc2VhcmNoT3B0aW9uPVwic2VhcmNoT3B0aW9uKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICB2LWlmPVwic3Rvcmllcy5sZW5ndGggPiAwXCI+PC9zZWFyY2gtY29tcG9uZW50PlxuXG4gICAgICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LWxnIGNsYXNzPVwic3RvcmllcyBwdC0wXCIgdi1pZj1cInN0b3JpZXMubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgPHN0b3J5LWxvb3AtY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJzdG9yeSBpbiBzdG9yaWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c3Rvcnk9XCJzdG9yeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cInN0b3J5LmlkXCJcbiAgICAgICAgICAgICAgICAgICAgPjwvc3RvcnktbG9vcC1jb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgY2xhc3M9XCJzdG9yaWVzIHB0LTBcIiB2LWVsc2U+XG4gICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlNvcnJ5IG5vIHN0b3J5IGZvdW5kPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICA8cGFnaW5hdGlvbi1jb21wb25lbnRcbiAgICAgICAgICAgICAgICA6cGFnaW5hdGlvbj1cInBhZ2luYXRlXCJcbiAgICAgICAgICAgICAgICA6cGFnZT1cIidzdG9yaWVzJ1wiXG4gICAgICAgICAgICAgICAgdi1pZj1cInBhZ2luYXRlLmxhc3RfcGFnZSA+IDFcIlxuICAgICAgICA+PC9wYWdpbmF0aW9uLWNvbXBvbmVudD5cblxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgU2VhcmNoQ29tcG9uZW50IGZyb20gJy4uLy4uL2luY2x1ZGVzL1NlYXJjaENvbXBvbmVudCc7XG4gICAgaW1wb3J0IFN0b3J5TG9vcENvbXBvbmVudCBmcm9tICcuL21vZHVsZXMvU3RvcnlMb29wQ29tcG9uZW50JztcbiAgICBpbXBvcnQgUGFnaW5hdGlvbkNvbXBvbmVudCBmcm9tICcuLi8uLi9pbmNsdWRlcy9QYWdpbmF0aW9uQ29tcG9uZW50JztcbiAgICBpbXBvcnQge21hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBTZWFyY2hDb21wb25lbnQsXG4gICAgICAgICAgICBTdG9yeUxvb3BDb21wb25lbnQsXG4gICAgICAgICAgICBQYWdpbmF0aW9uQ29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgICAgIGNsaWVudF9sb2dnZWRfaW46ICdnZXRDbGllbnRMb2dpbicsXG4gICAgICAgICAgICAgICAgc3RvcmllczogJ2dldFN0b3JpZXMnLFxuICAgICAgICAgICAgICAgIHBhZ2luYXRlOiAnZ2V0U3Rvcmllc1BhZ2luYXRlT2JqZWN0JyxcbiAgICAgICAgICAgICAgICBtYWlsZXJTdG9yaWVzOiAnZ2V0TWFpbGVyU3RvcmllcydcbiAgICAgICAgICAgIH0pLFxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAnJHJvdXRlJyh0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hTdG9yaWVzKHRoaXMuZ2V0UXVlcnlPYmplY3QoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hTdG9yaWVzKHRoaXMuZ2V0UXVlcnlPYmplY3QoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgZmV0Y2hTdG9yaWVzKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2ZldGNoU3RvcmllcycsIHF1ZXJ5KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFF1ZXJ5T2JqZWN0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuJHJvdXRlLnF1ZXJ5LnBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaDogdGhpcy4kcm91dGUucXVlcnkuc2VhcmNoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95ZWQoKSB7XG4gICAgICAgICAgICAvL3Jlc2V0IHN0b3JpZXMgc3RvcmVcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0UmVzZXRTdG9yaWVzJyk7XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yaWVzQ29tcG9uZW50LnZ1ZSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1N0b3J5TG9vcENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTA2MzQ1NWZhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU3RvcnlMb29wQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9tb2R1bGVzL1N0b3J5TG9vcENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMDYzNDU1ZmFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wNjM0NTVmYVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA4MDZcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiIsIjx0ZW1wbGF0ZT5cbiAgICA8di1mbGV4IGQtZmxleCB4czEyIHNtMTIgbWQ2IGxnNiB4bDYgY2xhc3M9XCJzdG9yeS1jb250ZW50IHBiLTNcIj5cbiAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtNSBtZDUgbGc1IHhsNT5cbiAgICAgICAgICAgICAgICA8di1jYXJkIGNvbnRhaW4gY2xhc3M9XCJzdG9yeS1tZWRpYS10aHVtYm5haWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtY2FyZC1tZWRpYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzcmM9XCJzdG9yeS50aHVtYlwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtbGljZW5zZWRcIiB2LWlmPVwicHVyY2hhc2VkXCI+UHVyY2hhc2VkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8di1mbGV4IHhzMTIgc203IG1kNyBsZzcgeGw3IGNsYXNzPVwicHktMlwiPlxuICAgICAgICAgICAgICAgIDxoMiB2LWh0bWw9XCJnZXRGaWx0ZXJUZXh0KHN0b3J5LnRpdGxlLCA1MClcIj48L2gyPlxuICAgICAgICAgICAgICAgIDxkaXYgdi1odG1sPVwiZ2V0RmlsdGVyVGV4dChzdG9yeS5kZXNjcmlwdGlvbiwgMjIwKVwiIGNsYXNzPVwiZGVzY3JpcHRpb25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgYWxpZ24tZW5kPlxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1eS1xdW90ZS1idXR0b24tY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0eXBlPVwiJ3N0b3J5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphc3NldD1cInN0b3J5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L2J1eS1xdW90ZS1idXR0b24tY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICA8di1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uU3RvcnlEZXRhaWxcIj5WaWV3XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgPC92LWZsZXg+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBCdXlRdW90ZUJ1dHRvbkNvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9pbmNsdWRlcy9CdXlRdW90ZUJ1dHRvbkNvbXBvbmVudCdcbiAgICBpbXBvcnQge21hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnXG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIEJ1eVF1b3RlQnV0dG9uQ29tcG9uZW50LFxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICAuLi5tYXBHZXR0ZXJzKHtcbiAgICAgICAgICAgICAgICBjbGllbnRfbG9naW46ICdnZXRDbGllbnRMb2dpbidcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHB1cmNoYXNlZDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc3Rvcnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXNQdXJjaGFzZWRBc3NldCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGdldEZpbHRlclRleHQodGV4dCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtcC50ZXh0Q29udGVudC5zdWJzdHJpbmcoMCwgbGVuZ3RoKSB8fCB0bXAuaW5uZXJUZXh0LnN1YnN0cmluZygwLCBsZW5ndGgpIHx8IFwiXCI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblN0b3J5RGV0YWlsKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOiAnc3Rvcmllc19kZXRhaWwnLCBwYXJhbXM6IHsnYWxwaGFfaWQnOiB0aGlzLnN0b3J5LmFscGhhX2lkfX0pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJc1B1cmNoYXNlZEFzc2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0b3J5LnN0b3J5X2NvbGxlY3Rpb25zICYmIHRoaXMuc3Rvcnkuc3RvcnlfY29sbGVjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cmNoYXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnB1cmNoYXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtZmxleFwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3J5LWNvbnRlbnQgcGItM1wiLFxuICAgICAgYXR0cnM6IHsgXCJkLWZsZXhcIjogXCJcIiwgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ2OiBcIlwiLCBsZzY6IFwiXCIsIHhsNjogXCJcIiB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtNTogXCJcIiwgbWQ1OiBcIlwiLCBsZzU6IFwiXCIsIHhsNTogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcnktbWVkaWEtdGh1bWJuYWlsXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb250YWluOiBcIlwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1tZWRpYVwiLFxuICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHNyYzogX3ZtLnN0b3J5LnRodW1iLCBoZWlnaHQ6IFwiMTAwJVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5wdXJjaGFzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwibGFiZWwgbGFiZWwtbGljZW5zZWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiUHVyY2hhc2VkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJweS0yXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtNzogXCJcIiwgbWQ3OiBcIlwiLCBsZzc6IFwiXCIsIHhsNzogXCJcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImgyXCIsIHtcbiAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLmdldEZpbHRlclRleHQoX3ZtLnN0b3J5LnRpdGxlLCA1MCkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICBfdm0uZ2V0RmlsdGVyVGV4dChfdm0uc3RvcnkuZGVzY3JpcHRpb24sIDIyMClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIsIFwiYWxpZ24tZW5kXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJidXktcXVvdGUtYnV0dG9uLWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInN0b3J5XCIsIGFzc2V0OiBfdm0uc3RvcnkgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogX3ZtLm9uU3RvcnlEZXRhaWwgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJWaWV3XFxuICAgICAgICAgICAgICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMDYzNDU1ZmFcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTA2MzQ1NWZhXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvbW9kdWxlcy9TdG9yeUxvb3BDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA4MDhcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcInN0b3JpZXMtY29tcG9uZW50XCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJzZWN0aW9uXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic3Rvcmllcy1zZWN0aW9uIHNlY3Rpb24tc3BhY2VcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLmNsaWVudF9sb2dnZWRfaW4gJiYgT2JqZWN0LmtleXMoX3ZtLm1haWxlclN0b3JpZXMpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JpZXMgcHQtMCBwYi01XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBcImdyaWQtbGlzdC1sZ1wiOiBcIlwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXJcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXVwcGVyY2FzZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJZb3VyIFN1Z2dlc3RlZCBTdG9yaWVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiV2UndmUgZ29uZSBhaGVhZCBhbmQgcHJvY3VyZWQgYSBsaXN0IG9mIHN0b3JpZXMgd2UgdGhpbmsgeW91IHdpbGwgbG92ZSFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IFwib3ZlcmZsb3cteFwiOiBcInNjcm9sbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgXCJhbGlnbi1jb250ZW50LWNlbnRlclwiOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5tYWlsZXJTdG9yaWVzLCBmdW5jdGlvbihtYWlsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJzdG9yeS1sb29wLWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG1haWxlci5hbHBoYV9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHN0b3J5OiBtYWlsZXIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHktMFwiLCBhdHRyczogeyBcImdyaWQtbGlnLWxnXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicy1wYWdpbmF0aW9uLWdvdG9cIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwdC0wIG1iLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXIgdGV4dC11cHBlcmNhc2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJBbGwgU3Rvcmllc1wiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLnN0b3JpZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyBfYyhcInNlYXJjaC1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBzZWFyY2hPcHRpb246IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uc2VhcmNoT3B0aW9uKCRldmVudClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLnN0b3JpZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzdG9yaWVzIHB0LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnN0b3JpZXMsIGZ1bmN0aW9uKHN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwic3RvcnktbG9vcC1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBzdG9yeS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHN0b3J5OiBzdG9yeSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzdG9yaWVzIHB0LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlclwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcImgyXCIsIFtfdm0uX3YoXCJTb3JyeSBubyBzdG9yeSBmb3VuZFwiKV0pXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnBhZ2luYXRlLmxhc3RfcGFnZSA+IDFcbiAgICAgICAgPyBfYyhcInBhZ2luYXRpb24tY29tcG9uZW50XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHBhZ2luYXRpb246IF92bS5wYWdpbmF0ZSwgcGFnZTogXCJzdG9yaWVzXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi05M2Y3MTEzZVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOTNmNzExM2VcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yaWVzQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gODA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMjIiXSwic291cmNlUm9vdCI6IiJ9