webpackJsonp([23],{

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(769)
/* template */
var __vue_template__ = __webpack_require__(776)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/clients/PurchasedOfferedComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-774d5ef3", Component.options)
  } else {
    hotAPI.reload("data-v-774d5ef3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AssetVideoOfferedComponent__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AssetVideoOfferedComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__partials_AssetVideoOfferedComponent__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        AssetStoryOfferedComponent: __WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent___default.a,
        AssetVideoOfferedComponent: __WEBPACK_IMPORTED_MODULE_1__partials_AssetVideoOfferedComponent___default.a
    },

    data: function data() {
        return {
            active: null,
            headingText: '',
            page: 1,
            videoPage: 1,
            storyPage: 1,
            searchTerm: '',
            searchVideoTerm: '',
            searchStoryTerm: '',
            tabItems: ['Video', 'Stories']
        };
    },


    computed: {
        type: {
            get: function get() {
                return this.$route.query.type;
            },
            set: function set(value) {
                return value;
            }
        },

        stories: {
            get: function get() {
                if (this.type === 'offered') {
                    return this.$store.getters.getOfferedStories;
                }

                if (this.type === 'purchased') {
                    return this.$store.getters.getPurchasedStories;
                }
            }
        },

        videos: {
            get: function get() {
                if (this.type === 'offered') {
                    return this.$store.getters.getOfferedVideos;
                }

                if (this.type === 'purchased') {
                    return this.$store.getters.getPurchasedVideos;
                }
            }
        },

        storiesPerPage: function storiesPerPage() {
            return this.$store.getters.getStoriesPaginateObject.per_page;
        },
        numberOfStoryPages: function numberOfStoryPages() {
            return this.$store.getters.getStoriesPaginateObject.last_page;
        },
        totalStories: function totalStories() {
            return this.$store.getters.getStoriesPaginateObject.total;
        },
        videosPerPage: function videosPerPage() {
            return this.$store.getters.getVideoPaginateObject.per_page;
        },
        totalVideos: function totalVideos() {
            return this.$store.getters.getVideoPaginateObject.total;
        },
        numberOfVideoPages: function numberOfVideoPages() {
            return this.$store.getters.getVideoPaginateObject.last_page;
        }
    },

    watch: {
        videoPage: function videoPage() {
            this.setData('video');
        },
        storyPage: function storyPage() {
            this.setData('story');
        },
        '$route': function $route(to, next, previous) {
            if (!this.$route.query.id) {
                this.type = this.$route.query.type;
                this.searchVideoTerm = '';
                this.searchStoryTerm = '';
                this.setData();
            }
        },
        searchVideoTerm: function searchVideoTerm(value) {
            this.searchTerm = this.searchVideoTerm;
            this.page = 1;
            this.setData('video');
        },
        searchStoryTerm: function searchStoryTerm() {
            this.searchTerm = this.searchStoryTerm;
            this.page = 1;
            this.setData('story');
        }
    },

    created: function created() {
        this.type = this.$route.query.type;
        this.setData();
    },


    methods: {
        setData: function setData() {
            var term = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            //before set store clear all data
            if (this.type === 'offered') {
                this.headingText = 'Your offers';
                if (term === 'video') {
                    this.getOfferedVideosData(this.getQueryObject(term));
                    return;
                }

                if (term === 'story') {
                    this.getOfferedStoriesData(this.getQueryObject(term));
                    return;
                }

                this.$store.commit('setResetStories');
                this.$store.commit('setResetVideos');
                this.getOfferedVideosData(this.getQueryObject(term));
                this.getOfferedStoriesData(this.getQueryObject(term));
            }

            if (this.type === 'purchased') {
                this.headingText = 'Purchases';
                if (term === 'video') {
                    this.getPurchasedVideosData(this.getQueryObject(term));
                    return;
                }

                if (term === 'story') {
                    this.getPurchasedStoriesData(this.getQueryObject(term));
                    return;
                }
                this.$store.commit('setResetStories');
                this.$store.commit('setResetVideos');
                this.getPurchasedVideosData(this.getQueryObject(term));
                this.getPurchasedStoriesData(this.getQueryObject(term));
            }
        },
        getOfferedVideosData: function getOfferedVideosData() {
            var queryObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var url = this.generateUrl(queryObject, 'video', 'offered');
            this.$store.dispatch('fetchOfferedVideos', url);
        },
        getPurchasedVideosData: function getPurchasedVideosData() {
            var queryObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var url = this.generateUrl(queryObject, 'video', 'purchased');
            this.$store.dispatch('fetchPurchasedVideos', url);
        },
        getOfferedStoriesData: function getOfferedStoriesData() {
            var queryObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


            var url = this.generateUrl(queryObject, 'story', 'offered');
            this.$store.dispatch('fetchOfferedStories', url);
        },
        getPurchasedStoriesData: function getPurchasedStoriesData() {
            var queryObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var url = this.generateUrl(queryObject, 'story', 'purchased');
            this.$store.dispatch('fetchPurchasedStories', url);
        },
        getQueryObject: function getQueryObject() {
            var term = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


            if (term === 'video') {
                return {
                    page: this.videoPage,
                    searchTerm: this.searchTerm
                };
            }

            if (term === 'story') {
                return {
                    page: this.storyPage,
                    searchTerm: this.searchTerm
                };
            }

            return {
                page: this.page,
                searchTerm: this.searchTerm
            };
        },
        generateUrl: function generateUrl(queryObject) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var term = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var url = '';
            if (type === 'video') {
                if (term === 'offered') {
                    url = '/client/videos/offered';
                }

                if (term === 'purchased') {
                    url = '/client/videos/purchased';
                }
            }

            if (type === 'story') {
                if (term === 'offered') {
                    url = '/client/stories/offered';
                }

                if (term === 'purchased') {
                    url = '/client/stories/purchased';
                }
            }

            if (queryObject.page != null) {
                url += '?page=' + queryObject.page;
            }

            if (queryObject.searchTerm != '') {
                url += '&search=' + queryObject.searchTerm;
            }

            return url;
        }
    }
});

/***/ }),

/***/ 770:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(771)
/* template */
var __vue_template__ = __webpack_require__(772)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/clients/partials/AssetStoryOfferedComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fa9b49c", Component.options)
  } else {
    hotAPI.reload("data-v-4fa9b49c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_bus_story_dialog_box_event_bus__ = __webpack_require__(525);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            button_text: 'Download Story',
            purchased: false,
            decline: false,

            loader: null,
            showButton: false,

            loading: false,
            acceptLoading: false,
            declineLoading: false,
            assetDeclined: false,

            assetType: '',

            expired: false
        };
    },


    props: {
        story: {
            type: Object,
            require: true
        },

        type: {
            type: String,
            require: true
        },

        index: {
            type: Number,
            require: true
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
        settings: 'getSettingsObject'
    })),

    created: function created() {
        this.assetType = this.type;
        this.getIsPurchasedAsset();

        if (this.story.collection_status === 'expired') {
            this.expired = true;
        }
    },


    watch: {
        loader: function loader() {
            var _this = this;

            var l = this.loader;
            this[l] = !this[l];

            setTimeout(function () {
                _this[l] = false;
                _this.newOrder = true;
            }, 3000);

            this.loader = null;
        }
    },

    methods: {
        showDownloadButton: function showDownloadButton() {
            this.showButton = !this.showButton;
        },
        goToDetail: function goToDetail() {
            this.$router.push({ name: 'client_story_detail', params: { 'alpha_id': this.story.alpha_id } });
        },
        getImage: function getImage(image) {
            if (!image) {
                return '/assets/images/placeholder.png';
            }
            return image;
        },
        onDownloadStory: function onDownloadStory() {
            this.loader = 'loading';
            var url = '/client/stories/' + this.story.id + '/download';
            window.location = url;
        },
        onAccept: function onAccept() {
            var _this2 = this;

            console.log('accept story');
            var url = 'collections/accept_asset_price/' + this.story.collection_story_id + '/story';
            this.acceptLoading = true;
            axios.get(url).then(function (response) {
                console.log(response);
                if (response.data.success === '1') {
                    _this2.acceptLoading = false;
                    _this2.assetType = "purchased";
                    _this2.purchased = true;
                }
            });
        },
        onDecline: function onDecline() {
            var _this3 = this;

            var url = 'collections/reject_asset_price/' + this.story.collection_story_id + '/story';
            this.declineLoading = true;
            axios.get(url).then(function (response) {
                if (response.data.success === '1') {
                    // Do some action when they accept
                    _this3.declineLoading = false;
                    _this3.assetDeclined = true;
                    _this3.decline = true;
                }
            });
        },
        onStoryClick: function onStoryClick() {
            __WEBPACK_IMPORTED_MODULE_1__event_bus_story_dialog_box_event_bus__["a" /* default */].$emit('openStoryDialog', this.story);
        },
        getIsPurchasedAsset: function getIsPurchasedAsset() {
            if (this.type === "story") {
                if (this.story.story_collections && this.story.story_collections.length > 0) {
                    this.purchased = true;
                }
            }

            return false;
        }
    }
});

/***/ }),

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { staticClass: "cd-box", attrs: { row: "", wrap: "" } },
    [
      _c("v-flex", { attrs: { xs12: "", sm12: "", md3: "" } }, [
        _c(
          "div",
          {
            staticClass: "cdi-content",
            style: {
              backgroundImage: "url(" + _vm.getImage(_vm.story.thumb) + ")"
            },
            on: {
              click: function($event) {
                _vm.onStoryClick()
              }
            }
          },
          [
            _vm.purchased
              ? _c(
                  "div",
                  { staticClass: "cdi-label" },
                  [
                    _c(
                      "v-tooltip",
                      { attrs: { top: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              slot: "activator",
                              flat: "",
                              icon: "",
                              raised: "",
                              light: "",
                              color: "white"
                            },
                            slot: "activator"
                          },
                          [
                            _c("v-icon", { attrs: { size: "25px" } }, [
                              _vm._v("money")
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("span", [_vm._v("Purchased")])
                      ],
                      1
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.decline
              ? _c(
                  "div",
                  { staticClass: "cdi-label" },
                  [
                    _c(
                      "v-tooltip",
                      { attrs: { top: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              slot: "activator",
                              flat: "",
                              icon: "",
                              raised: "",
                              light: "",
                              color: "white"
                            },
                            slot: "activator"
                          },
                          [
                            _c("v-icon", { attrs: { size: "25px" } }, [
                              _vm._v("error_outline")
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("span", [_vm._v("Declined")])
                      ],
                      1
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.story.flagged === 1
              ? _c("div", { staticClass: "hot-story" }, [
                  _c("div", { staticClass: "hot-story-content" }, [
                    _vm._v("HOT")
                  ])
                ])
              : _vm._e()
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { xs12: "", sm12: "", md6: "", "pl-3": "" } },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c("v-flex", { attrs: { xs12: "", "pb-0": "" } }, [
                _c("h2", { domProps: { innerHTML: _vm._s(_vm.story.title) } }),
                _vm._v(" "),
                _c("div", { staticClass: "cd-time" }, [
                  _vm._v(_vm._s(_vm._f("convertDate")(_vm.story.date_ingested)))
                ]),
                _vm._v(" "),
                _c("div", [
                  _vm._v(
                    _vm._s(_vm._f("readmore")(_vm.story.excerpt, 200, "..."))
                  )
                ]),
                _vm._v(" "),
                _vm.type === "offered" || _vm.type === "purchased"
                  ? _c(
                      "div",
                      { staticClass: "quote" },
                      [
                        _c(
                          "v-layout",
                          { attrs: { column: "", "fill-height": "" } },
                          [
                            _vm.story.platform
                              ? _c(
                                  "v-flex",
                                  { staticClass: "pb-0", attrs: { xs12: "" } },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        "Platform: " +
                                          _vm._s(
                                            _vm._f("convertHyphenToSpace")(
                                              _vm.story.platform
                                            )
                                          )
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.story.platform
                              ? _c(
                                  "v-flex",
                                  { staticClass: "pb-0", attrs: { xs12: "" } },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        "Length: " +
                                          _vm._s(
                                            _vm.settings.pricing.length[
                                              _vm.story.length
                                            ].name
                                          )
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.story.type
                              ? _c(
                                  "v-flex",
                                  { staticClass: "pb-0", attrs: { xs12: "" } },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        "Type: " +
                                          _vm._s(
                                            _vm.settings.pricing.type[
                                              _vm.story.type
                                            ].name
                                          )
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.expired
        ? _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md3: "", "pl-3": "" } },
            [
              _c(
                "v-btn",
                {
                  staticClass: "mb-3",
                  attrs: {
                    block: "",
                    dark: "",
                    large: "",
                    disabled: "",
                    color: "dark"
                  }
                },
                [_vm._v("\n            No Longer Available\n        ")]
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.assetType === "purchased"
        ? _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md3: "", "pl-3": "" } },
            [
              _c(
                "v-btn",
                {
                  staticClass: "mb-3",
                  attrs: { block: "", dark: "", large: "", color: "dark" },
                  on: {
                    click: function($event) {
                      _vm.goToDetail()
                    }
                  }
                },
                [_vm._v("\n            View\n        ")]
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    block: "",
                    dark: "",
                    large: "",
                    color: "dark",
                    loading: _vm.loading,
                    disabled: _vm.loading
                  },
                  nativeOn: {
                    click: function($event) {
                      _vm.onDownloadStory()
                    }
                  }
                },
                [
                  _vm._v(
                    "\n            " + _vm._s(_vm.button_text) + "\n        "
                  )
                ]
              ),
              _vm._v(" "),
              _vm.assetType === "purchased"
                ? _c("div", { staticClass: "caption text-xs-center pt-2" }, [
                    _vm._v(
                      _vm._s(
                        _vm._f("licenseExpired")(_vm.story.license_ends_at)
                      ) + "\n        "
                    )
                  ])
                : _vm._e()
            ],
            1
          )
        : _vm.story.collection_status === "requested"
          ? _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md3: "", "pl-3": "" } },
              [_c("p", [_vm._v("Waiting for quote")])]
            )
          : _c(
              "v-flex",
              { attrs: { xs12: "", sm12: "", md3: "", "pl-3": "" } },
              [
                _c(
                  "v-btn",
                  {
                    staticClass: "mb-3",
                    attrs: {
                      block: "",
                      dark: "",
                      large: "",
                      loading: _vm.acceptLoading,
                      disabled: _vm.acceptLoading || _vm.assetDeclined,
                      color: "dark"
                    },
                    on: {
                      click: function($event) {
                        _vm.onAccept()
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n            £" +
                        _vm._s(_vm._f("numberFormat")(_vm.story.final_price)) +
                        " - Buy Now\n        "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    attrs: {
                      block: "",
                      dark: "",
                      large: "",
                      color: "dark",
                      loading: _vm.declineLoading,
                      disabled: _vm.declineLoading || _vm.assetDeclined
                    },
                    nativeOn: {
                      click: function($event) {
                        _vm.onDecline()
                      }
                    }
                  },
                  [_vm._v("\n            Decline\n        ")]
                )
              ],
              1
            ),
      _vm._v(" "),
      _c(
        "v-flex",
        { staticClass: "my-4", attrs: { xs12: "" } },
        [_c("v-divider")],
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
    require("vue-hot-reload-api")      .rerender("data-v-4fa9b49c", module.exports)
  }
}

/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(774)
/* template */
var __vue_template__ = __webpack_require__(775)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/clients/partials/AssetVideoOfferedComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0dc54238", Component.options)
  } else {
    hotAPI.reload("data-v-0dc54238", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(55);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            button_text: 'Download Video',
            purchased: false,
            decline: false,

            loader: null,
            showButton: false,

            loading: false,
            acceptLoading: false,
            declineLoading: false,
            assetDeclined: false,

            expired: false,

            assetType: ''
        };
    },


    props: {
        video: {
            type: Object,
            require: true
        },

        type: {
            type: String,
            require: true
        },

        index: {
            type: Number,
            require: true
        }
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
        settings: 'getSettingsObject'
    })),

    created: function created() {
        this.assetType = this.type;
        if (this.video.collection_status === 'expired') {
            this.expired = true;
        }
    },


    watch: {
        loader: function loader() {
            var _this = this;

            var l = this.loader;
            this[l] = !this[l];

            setTimeout(function () {
                _this[l] = false;
                _this.newOrder = true;
            }, 3000);

            this.loader = null;
        }
    },

    methods: {
        showDownloadButton: function showDownloadButton() {
            this.showButton = !this.showButton;
        },
        goToDetail: function goToDetail() {
            this.$router.push({ name: 'client_video_detail', params: { 'alpha_id': this.video.alpha_id } });
        },
        getImage: function getImage(image) {
            if (!image) {
                return '/assets/images/placeholder.png';
            }
            return image;
        },
        onDownloadVideo: function onDownloadVideo() {
            this.loader = 'loading';
            var url = '/client/videos/' + this.video.id + '/download';
            window.location = url;
        },
        onAccept: function onAccept() {
            var _this2 = this;

            var url = 'collections/accept_asset_price/' + this.video.collection_video_id + '/video';
            this.acceptLoading = true;

            axios.get(url).then(function (response) {
                if (response.data.success === '1') {
                    _this2.$store.commit('setUserOffers', _this2.$store.getters.getUserStatus.offers - 1);
                    _this2.acceptLoading = false;
                    _this2.assetType = "purchased";
                    _this2.purchased = true;
                    // SnackbarEventBus.displayMessage(5000, 'Video has successfully purchased');

                    // After purchased, if we need to to change another component data this event need to enable
                    // ClientVideoOfferPurchasedEventBus.clientRemoveVideo(this.index);
                }
            });
        },
        onDecline: function onDecline() {
            var _this3 = this;

            var url = 'collections/reject_asset_price/' + this.video.collection_video_id + '/video';
            this.declineLoading = true;
            axios.get(url).then(function (response) {
                if (response.data.success === '1') {
                    // Do some action when they accept
                    _this3.declineLoading = false;

                    _this3.assetDeclined = true;
                    _this3.decline = true;
                    // SnackbarEventBus.displayMessage(5000, 'Video has declined');
                }
            });
        },
        onVideoDialog: function onVideoDialog() {
            var url = this.$route.path;

            url += '?type=' + this.type;
            url += '&id=' + this.video.alpha_id;

            if (this.$route.query.tag) {
                url += '&tag=' + this.$route.query.tag;
            }
            this.$route.query.alpha_id = this.video.alpha_id;

            this.$store.commit('setEnterRouteObject', this.$route);

            window.history.pushState({}, null, url);
            if (this.$route.name === 'client_offered_assets') {
                // client offered page

                var index = this.index;
                this.$store.commit('setAssetOfferedCurrentIndex', index);
                this.$store.dispatch('fetchOfferedDialogNextPrevious');

                this.$store.commit('setVideoDialogBox', true);
                this.$store.commit('setVideoLoading', true);
                return;
            }

            this.$store.commit('setCurrentVideoAlphaId', this.video.alpha_id);
            this.$store.commit('setCurrentRouteObject', this.$route);
            this.$store.commit('setVideoDialogBox', true);
            this.$store.commit('setVideoLoading', true);

            this.$store.dispatch('getVideoNextAndPrevLink', { alpha_id: this.video.alpha_id });
        }
    }
});

/***/ }),

/***/ 775:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { staticClass: "cd-box", attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-flex",
        { attrs: { xs12: "", sm12: "", md3: "" } },
        [
          _c(
            "v-card",
            [
              _c(
                "v-card-media",
                {
                  staticClass: "client-video-thumbnail cdi-content",
                  attrs: {
                    src: _vm.video.thumb
                      ? _vm.video.thumb
                      : _vm.video.image
                        ? _vm.video.image
                        : "/assets/images/placeholder.png",
                    height: "250px"
                  },
                  on: {
                    click: function($event) {
                      _vm.onVideoDialog()
                    }
                  }
                },
                [
                  _vm.purchased
                    ? _c(
                        "div",
                        { staticClass: "cdi-label" },
                        [
                          _c(
                            "v-tooltip",
                            { attrs: { top: "" } },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    slot: "activator",
                                    flat: "",
                                    icon: "",
                                    raised: "",
                                    light: "",
                                    color: "white"
                                  },
                                  slot: "activator"
                                },
                                [
                                  _c("v-icon", { attrs: { size: "25px" } }, [
                                    _vm._v("money")
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("span", [_vm._v("Purchased")])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.decline
                    ? _c(
                        "div",
                        { staticClass: "cdi-label" },
                        [
                          _c(
                            "v-tooltip",
                            { attrs: { top: "" } },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    slot: "activator",
                                    flat: "",
                                    icon: "",
                                    raised: "",
                                    light: "",
                                    color: "white"
                                  },
                                  slot: "activator"
                                },
                                [
                                  _c("v-icon", { attrs: { size: "25px" } }, [
                                    _vm._v("error_outline")
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("span", [_vm._v("Declined")])
                            ],
                            1
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
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { xs12: "", sm12: "", md6: "" } },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c("v-flex", { attrs: { xs12: "", "pb-0": "" } }, [
                _c("h2", { domProps: { innerHTML: _vm._s(_vm.video.title) } }),
                _vm._v(" "),
                _c("div", { staticClass: "cd-time" }, [
                  _vm._v(_vm._s(_vm._f("convertDate")(_vm.video.updated_at)))
                ]),
                _vm._v(" "),
                _c("div", [
                  _vm._v(
                    _vm._s(
                      _vm._f("readmore")(_vm.video.description, 300, " ...")
                    )
                  )
                ]),
                _vm._v(" "),
                _vm.type === "offered" || _vm.type === "purchased"
                  ? _c(
                      "div",
                      { staticClass: "quote" },
                      [
                        _c(
                          "v-layout",
                          { attrs: { column: "", "fill-height": "" } },
                          [
                            _vm.video.platform
                              ? _c(
                                  "v-flex",
                                  { staticClass: "pb-0", attrs: { xs12: "" } },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        "Platform: " +
                                          _vm._s(
                                            _vm._f("convertHyphenToSpace")(
                                              _vm.video.platform
                                            )
                                          )
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.video.platform
                              ? _c(
                                  "v-flex",
                                  { staticClass: "pb-0", attrs: { xs12: "" } },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        "Length: " +
                                          _vm._s(
                                            _vm.settings.pricing.length[
                                              _vm.video.length
                                            ].name
                                          )
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.video.type
                              ? _c(
                                  "v-flex",
                                  { staticClass: "pb-0", attrs: { xs12: "" } },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        "Type: " +
                                          _vm._s(
                                            _vm.settings.pricing.type[
                                              _vm.video.type
                                            ].name
                                          )
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.video.credit
                              ? _c(
                                  "v-flex",
                                  { staticClass: "pb-0", attrs: { xs12: "" } },
                                  [
                                    _c("span", [
                                      _vm._v(
                                        "Please Credit: " +
                                          _vm._s(_vm.video.credit)
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.expired
        ? _c(
            "v-flex",
            { attrs: { xs12: "", sm12: "", md3: "", "pl-3": "" } },
            [
              _c(
                "v-btn",
                {
                  staticClass: "mb-3",
                  attrs: {
                    block: "",
                    dark: "",
                    large: "",
                    disabled: "",
                    color: "dark"
                  }
                },
                [_vm._v("\n            No Longer Available\n        ")]
              )
            ],
            1
          )
        : _vm.video.collection_status === "requested"
          ? _c(
              "v-flex",
              {
                attrs: {
                  xs12: "",
                  sm12: "",
                  md3: "",
                  "pl-3": "",
                  "align-content-center": "",
                  "justify-center": ""
                }
              },
              [
                _c("p", { staticClass: "text-xs-center darken-4" }, [
                  _vm._v("Waiting for quote")
                ])
              ]
            )
          : _vm.assetType === "purchased" || _vm.video.purchased
            ? _c(
                "v-flex",
                { attrs: { xs12: "", sm12: "", md3: "", "pl-3": "" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "mb-3",
                      attrs: { block: "", dark: "", large: "", color: "dark" },
                      on: {
                        click: function($event) {
                          _vm.goToDetail()
                        }
                      }
                    },
                    [_vm._v("\n            View\n        ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        block: "",
                        dark: "",
                        large: "",
                        color: "dark",
                        loading: _vm.loading,
                        disabled: _vm.loading
                      },
                      nativeOn: {
                        click: function($event) {
                          _vm.onDownloadVideo()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.button_text) +
                          "\n        "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.assetType === "purchased"
                    ? _c(
                        "div",
                        { staticClass: "caption text-xs-center pt-2" },
                        [
                          _vm._v(
                            _vm._s(
                              _vm._f("licenseExpired")(
                                _vm.video.license_ends_at
                              )
                            ) + "\n        "
                          )
                        ]
                      )
                    : _vm._e()
                ],
                1
              )
            : _c(
                "v-flex",
                { attrs: { xs12: "", sm12: "", md3: "", "pl-3": "" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "mb-3",
                      attrs: {
                        block: "",
                        dark: "",
                        large: "",
                        loading: _vm.acceptLoading,
                        disabled: _vm.acceptLoading || _vm.assetDeclined,
                        color: "dark"
                      },
                      on: {
                        click: function($event) {
                          _vm.onAccept()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n            £" +
                          _vm._s(
                            _vm._f("numberFormat")(_vm.video.final_price)
                          ) +
                          " - Buy Now\n        "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        block: "",
                        dark: "",
                        large: "",
                        color: "dark",
                        loading: _vm.declineLoading,
                        disabled: _vm.declineLoading || _vm.assetDeclined
                      },
                      nativeOn: {
                        click: function($event) {
                          _vm.onDecline()
                        }
                      }
                    },
                    [_vm._v("\n            Decline\n        ")]
                  )
                ],
                1
              ),
      _vm._v(" "),
      _c(
        "v-flex",
        { staticClass: "my-2", attrs: { xs12: "" } },
        [_c("v-divider")],
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
    require("vue-hot-reload-api")      .rerender("data-v-0dc54238", module.exports)
  }
}

/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "client-offer-section" },
    [
      _c(
        "v-container",
        { staticClass: "pt-0", attrs: { "grid-list-lg": "" } },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c("v-flex", { attrs: { xs12: "" } }, [
                _c("h2", { staticClass: "text-center text-uppercase" }, [
                  _vm._v(_vm._s(_vm.headingText))
                ])
              ]),
              _vm._v(" "),
              _vm.totalStories <= 0 &&
              _vm.totalVideos <= 0 &&
              !_vm.searchVideoTerm
                ? _c(
                    "v-flex",
                    { staticClass: "text-xs-center", attrs: { xs12: "" } },
                    [
                      _c(
                        "h2",
                        [
                          _vm._v(
                            "You have no offers yet. You can buy or request quotes for any of our\n                    "
                          ),
                          _c(
                            "router-link",
                            { attrs: { tag: "a", to: { path: "/videos" } } },
                            [_vm._v("Videos")]
                          ),
                          _vm._v(", and\n                    "),
                          _c(
                            "router-link",
                            { attrs: { tag: "a", to: { path: "/stories" } } },
                            [_vm._v("Stories")]
                          ),
                          _vm._v(".\n                ")
                        ],
                        1
                      )
                    ]
                  )
                : _c(
                    "v-flex",
                    { attrs: { xs12: "" } },
                    [
                      _c(
                        "v-tabs",
                        {
                          attrs: {
                            dark: "",
                            color: "white",
                            "slider-color": "black"
                          },
                          model: {
                            value: _vm.active,
                            callback: function($$v) {
                              _vm.active = $$v
                            },
                            expression: "active"
                          }
                        },
                        [
                          _vm.totalVideos > 0 || _vm.searchVideoTerm
                            ? _c(
                                "v-tab",
                                [
                                  _c(
                                    "v-badge",
                                    { attrs: { right: "", color: "black" } },
                                    [
                                      _c(
                                        "span",
                                        {
                                          attrs: { slot: "badge" },
                                          slot: "badge"
                                        },
                                        [_vm._v(_vm._s(_vm.totalVideos))]
                                      ),
                                      _vm._v(
                                        "\n                            Videos\n                        "
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.totalStories > 0 || _vm.searchStoryTerm
                            ? _c(
                                "v-tab",
                                [
                                  _c(
                                    "v-badge",
                                    { attrs: { right: "", color: "black" } },
                                    [
                                      _c(
                                        "span",
                                        {
                                          attrs: { slot: "badge" },
                                          slot: "badge"
                                        },
                                        [_vm._v(_vm._s(_vm.totalStories))]
                                      ),
                                      _vm._v(
                                        "\n                            Stories\n                        "
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.totalVideos > 0 || _vm.searchVideoTerm
                            ? _c(
                                "v-tab-item",
                                [
                                  _c(
                                    "v-layout",
                                    { attrs: { row: "", wrap: "" } },
                                    [
                                      _c(
                                        "v-flex",
                                        {
                                          staticClass: "text-xs-right",
                                          attrs: { xs12: "" }
                                        },
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              color: "dark",
                                              "append-icon": "search",
                                              label: "Search"
                                            },
                                            model: {
                                              value: _vm.searchVideoTerm,
                                              callback: function($$v) {
                                                _vm.searchVideoTerm = $$v
                                              },
                                              expression: "searchVideoTerm"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _vm.totalVideos <= 0
                                    ? _c(
                                        "v-layout",
                                        { attrs: { row: "", wrap: "" } },
                                        [
                                          _c(
                                            "v-flex",
                                            {
                                              staticClass: "text-xs-center",
                                              attrs: { xs12: "" }
                                            },
                                            [
                                              _c("h2", [
                                                _vm._v(
                                                  "We could not find any videos matching your search."
                                                )
                                              ])
                                            ]
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm._l(_vm.videos, function(video, index) {
                                    return _c("asset-video-offered-component", {
                                      key: index,
                                      attrs: {
                                        type: _vm.type,
                                        index: index,
                                        video: video
                                      }
                                    })
                                  }),
                                  _vm._v(" "),
                                  _vm.totalVideos > _vm.videosPerPage
                                    ? _c(
                                        "div",
                                        { staticClass: "text-xs-center" },
                                        [
                                          _c("v-pagination", {
                                            attrs: {
                                              length: _vm.numberOfVideoPages,
                                              "total-visible": 7,
                                              dark: "",
                                              color: "black"
                                            },
                                            model: {
                                              value: _vm.videoPage,
                                              callback: function($$v) {
                                                _vm.videoPage = $$v
                                              },
                                              expression: "videoPage"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ],
                                2
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.totalStories > 0 || _vm.searchStoryTerm
                            ? _c(
                                "v-tab-item",
                                [
                                  _c(
                                    "v-layout",
                                    { attrs: { row: "", wrap: "" } },
                                    [
                                      _c(
                                        "v-flex",
                                        {
                                          staticClass: "text-xs-right",
                                          attrs: { xs12: "" }
                                        },
                                        [
                                          _c("v-text-field", {
                                            attrs: {
                                              color: "dark",
                                              "append-icon": "search",
                                              label: "Search"
                                            },
                                            model: {
                                              value: _vm.searchStoryTerm,
                                              callback: function($$v) {
                                                _vm.searchStoryTerm = $$v
                                              },
                                              expression: "searchStoryTerm"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _vm.totalStories <= 0
                                    ? _c(
                                        "v-layout",
                                        { attrs: { row: "", wrap: "" } },
                                        [
                                          _c(
                                            "v-flex",
                                            {
                                              staticClass: "text-xs-center",
                                              attrs: { xs12: "" }
                                            },
                                            [
                                              _c("h2", [
                                                _vm._v(
                                                  "We could not find any stories matching your search."
                                                )
                                              ])
                                            ]
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm._l(_vm.stories, function(story, index) {
                                    return _c("asset-story-offered-component", {
                                      key: index,
                                      attrs: { type: _vm.type, story: story }
                                    })
                                  }),
                                  _vm._v(" "),
                                  _vm.totalStories > _vm.storiesPerPage
                                    ? _c(
                                        "div",
                                        { staticClass: "text-xs-center" },
                                        [
                                          _c("v-pagination", {
                                            attrs: {
                                              length: _vm.numberOfStoryPages,
                                              "total-visible": 7,
                                              dark: "",
                                              color: "black"
                                            },
                                            model: {
                                              value: _vm.storyPage,
                                              callback: function($$v) {
                                                _vm.storyPage = $$v
                                              },
                                              expression: "storyPage"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ],
                                2
                              )
                            : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-774d5ef3", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hhc2VkT2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlP2M5OTAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlPzExZTgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hh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QTtBQUNBLEMiLCJmaWxlIjoiMjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzc0ZDVlZjNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi03NzRkNWVmM1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTc3NGQ1ZWYzXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjMiLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImNsaWVudC1vZmZlci1zZWN0aW9uXCI+XG4gICAgICAgIDwhLS0gRW5kIHJlZnJlc2ggc3RvcmllcyBkaWFsb2cgYm94IC0tPlxuICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LWxnIGNsYXNzPVwicHQtMFwiPlxuICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC11cHBlcmNhc2VcIj57eyBoZWFkaW5nVGV4dCB9fTwvaDI+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiIHYtaWY9XCJ0b3RhbFN0b3JpZXMgPD0gMCAmJiB0b3RhbFZpZGVvcyA8PSAwICYmICFzZWFyY2hWaWRlb1Rlcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPllvdSBoYXZlIG5vIG9mZmVycyB5ZXQuIFlvdSBjYW4gYnV5IG9yIHJlcXVlc3QgcXVvdGVzIGZvciBhbnkgb2Ygb3VyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdGFnPVwiYVwiICA6dG89XCJ7cGF0aDogJy92aWRlb3MnfVwiPlZpZGVvczwvcm91dGVyLWxpbms+LCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0YWc9XCJhXCIgOnRvPVwie3BhdGg6ICcvc3Rvcmllcyd9XCI+U3Rvcmllczwvcm91dGVyLWxpbms+LlxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPHYtdGFic1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXItY29sb3I9XCJibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFiIHYtaWY9XCJ0b3RhbFZpZGVvcyA+IDAgfHwgc2VhcmNoVmlkZW9UZXJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYmFkZ2UgcmlnaHQgY29sb3I9XCJibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwiYmFkZ2VcIj57eyB0b3RhbFZpZGVvcyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlkZW9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJhZGdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFiIHYtaWY9XCJ0b3RhbFN0b3JpZXMgPiAwIHx8IHNlYXJjaFN0b3J5VGVybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJhZGdlIHJpZ2h0IGNvbG9yPVwiYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cImJhZGdlXCI+e3t0b3RhbFN0b3JpZXN9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3Rvcmllc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1iYWRnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYi1pdGVtIHYtaWY9XCJ0b3RhbFZpZGVvcyA+IDAgfHwgc2VhcmNoVmlkZW9UZXJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaFZpZGVvVGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWlmPVwidG90YWxWaWRlb3MgPD0gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPldlIGNvdWxkIG5vdCBmaW5kIGFueSB2aWRlb3MgbWF0Y2hpbmcgeW91ciBzZWFyY2guPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhc3NldC12aWRlby1vZmZlcmVkLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIodmlkZW8sIGluZGV4KSBpbiB2aWRlb3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0eXBlPVwidHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aW5kZXg9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dmlkZW89XCJ2aWRlb1wiPjwvYXNzZXQtdmlkZW8tb2ZmZXJlZC1jb21wb25lbnQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIiB2LWlmPVwidG90YWxWaWRlb3MgPiB2aWRlb3NQZXJQYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bGVuZ3RoPVwibnVtYmVyT2ZWaWRlb1BhZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidmlkZW9QYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG90YWwtdmlzaWJsZT1cIjdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmsgY29sb3I9XCJibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtcGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWItaXRlbT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFiLWl0ZW0gdi1pZj1cInRvdGFsU3RvcmllcyA+IDAgfHwgc2VhcmNoU3RvcnlUZXJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaFN0b3J5VGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWlmPVwidG90YWxTdG9yaWVzIDw9IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5XZSBjb3VsZCBub3QgZmluZCBhbnkgc3RvcmllcyBtYXRjaGluZyB5b3VyIHNlYXJjaC48L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFzc2V0LXN0b3J5LW9mZmVyZWQtY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cIihzdG9yeSwgaW5kZXgpIGluIHN0b3JpZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0eXBlPVwidHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c3Rvcnk9XCJzdG9yeVwiPjwvYXNzZXQtc3Rvcnktb2ZmZXJlZC1jb21wb25lbnQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIiB2LWlmPVwidG90YWxTdG9yaWVzID4gc3Rvcmllc1BlclBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtcGFnaW5hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpsZW5ndGg9XCJudW1iZXJPZlN0b3J5UGFnZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzdG9yeVBhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0b3RhbC12aXNpYmxlPVwiN1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyayBjb2xvcj1cImJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1wYWdpbmF0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYi1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8L3YtdGFicz5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbiAgICBpbXBvcnQgQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQgZnJvbSAnLi9wYXJ0aWFscy9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudCdcbiAgICBpbXBvcnQgQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQgZnJvbSAnLi9wYXJ0aWFscy9Bc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudCdcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQsXG4gICAgICAgICAgICBBc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudFxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFjdGl2ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBoZWFkaW5nVGV4dDonJyxcbiAgICAgICAgICAgICAgICBwYWdlOjEsXG4gICAgICAgICAgICAgICAgdmlkZW9QYWdlOiAxLFxuICAgICAgICAgICAgICAgIHN0b3J5UGFnZToxLFxuICAgICAgICAgICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICAgICAgICAgIHNlYXJjaFZpZGVvVGVybTonJyxcbiAgICAgICAgICAgICAgICBzZWFyY2hTdG9yeVRlcm06JycsXG4gICAgICAgICAgICAgICAgdGFiSXRlbXM6WydWaWRlbycsICdTdG9yaWVzJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIGdldCgpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcm91dGUucXVlcnkudHlwZTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0b3JpZXM6IHtcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdvZmZlcmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0T2ZmZXJlZFN0b3JpZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAncHVyY2hhc2VkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0UHVyY2hhc2VkU3RvcmllcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHZpZGVvczoge1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy50eXBlID09PSAnb2ZmZXJlZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0T2ZmZXJlZFZpZGVvcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PT0gJ3B1cmNoYXNlZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0UHVyY2hhc2VkVmlkZW9zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3Rvcmllc1BlclBhZ2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0U3Rvcmllc1BhZ2luYXRlT2JqZWN0LnBlcl9wYWdlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbnVtYmVyT2ZTdG9yeVBhZ2VzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFN0b3JpZXNQYWdpbmF0ZU9iamVjdC5sYXN0X3BhZ2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b3RhbFN0b3JpZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0U3Rvcmllc1BhZ2luYXRlT2JqZWN0LnRvdGFsO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdmlkZW9zUGVyUGFnZSgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFZpZGVvUGFnaW5hdGVPYmplY3QucGVyX3BhZ2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b3RhbFZpZGVvcygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFZpZGVvUGFnaW5hdGVPYmplY3QudG90YWw7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBudW1iZXJPZlZpZGVvUGFnZXMoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRWaWRlb1BhZ2luYXRlT2JqZWN0Lmxhc3RfcGFnZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICB2aWRlb1BhZ2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKCd2aWRlbycpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RvcnlQYWdlKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKCdzdG9yeScpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJyRyb3V0ZScodG8sIG5leHQsIHByZXZpb3VzKXtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuJHJvdXRlLnF1ZXJ5LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMuJHJvdXRlLnF1ZXJ5LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVmlkZW9UZXJtID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU3RvcnlUZXJtID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNlYXJjaFZpZGVvVGVybSh2YWx1ZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gdGhpcy5zZWFyY2hWaWRlb1Rlcm07XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoJ3ZpZGVvJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZWFyY2hTdG9yeVRlcm0oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSB0aGlzLnNlYXJjaFN0b3J5VGVybTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSgnc3RvcnknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdGhpcy4kcm91dGUucXVlcnkudHlwZTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc2V0RGF0YSh0ZXJtID0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vYmVmb3JlIHNldCBzdG9yZSBjbGVhciBhbGwgZGF0YVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdvZmZlcmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkaW5nVGV4dCA9ICdZb3VyIG9mZmVycydcbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3ZpZGVvJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE9mZmVyZWRWaWRlb3NEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3N0b3J5Jyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE9mZmVyZWRTdG9yaWVzRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0UmVzZXRTdG9yaWVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0UmVzZXRWaWRlb3MnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRPZmZlcmVkVmlkZW9zRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRPZmZlcmVkU3Rvcmllc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAncHVyY2hhc2VkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRpbmdUZXh0ID0gJ1B1cmNoYXNlcydcbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3ZpZGVvJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFB1cmNoYXNlZFZpZGVvc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAnc3RvcnknKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHVyY2hhc2VkU3Rvcmllc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSZXNldFN0b3JpZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSZXNldFZpZGVvcycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFB1cmNoYXNlZFZpZGVvc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHVyY2hhc2VkU3Rvcmllc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0T2ZmZXJlZFZpZGVvc0RhdGEocXVlcnlPYmplY3QgPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2VuZXJhdGVVcmwocXVlcnlPYmplY3QsICd2aWRlbycsICdvZmZlcmVkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2ZldGNoT2ZmZXJlZFZpZGVvcycsIHVybClcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFB1cmNoYXNlZFZpZGVvc0RhdGEocXVlcnlPYmplY3QgPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2VuZXJhdGVVcmwocXVlcnlPYmplY3QsICd2aWRlbycsICdwdXJjaGFzZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdmZXRjaFB1cmNoYXNlZFZpZGVvcycsIHVybCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRPZmZlcmVkU3Rvcmllc0RhdGEocXVlcnlPYmplY3QgPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZW5lcmF0ZVVybChxdWVyeU9iamVjdCwgJ3N0b3J5JywgJ29mZmVyZWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hPZmZlcmVkU3RvcmllcycsIHVybCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRQdXJjaGFzZWRTdG9yaWVzRGF0YShxdWVyeU9iamVjdCA9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZW5lcmF0ZVVybChxdWVyeU9iamVjdCwgJ3N0b3J5JywgJ3B1cmNoYXNlZCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdmZXRjaFB1cmNoYXNlZFN0b3JpZXMnLCB1cmwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0UXVlcnlPYmplY3QodGVybSA9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICd2aWRlbycpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy52aWRlb1BhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUZXJtOiB0aGlzLnNlYXJjaFRlcm1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAnc3RvcnknKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuc3RvcnlQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVGVybTogdGhpcy5zZWFyY2hUZXJtXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFRlcm06IHRoaXMuc2VhcmNoVGVybVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZW5lcmF0ZVVybChxdWVyeU9iamVjdCwgdHlwZSA9IG51bGwsIHRlcm09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0nJztcbiAgICAgICAgICAgICAgICBpZih0eXBlID09PSAndmlkZW8nKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ29mZmVyZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICcvY2xpZW50L3ZpZGVvcy9vZmZlcmVkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICdwdXJjaGFzZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICcvY2xpZW50L3ZpZGVvcy9wdXJjaGFzZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodHlwZSA9PT0gJ3N0b3J5Jyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICdvZmZlcmVkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnL2NsaWVudC9zdG9yaWVzL29mZmVyZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3B1cmNoYXNlZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJy9jbGllbnQvc3Rvcmllcy9wdXJjaGFzZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5T2JqZWN0LnBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJz9wYWdlPScgKyBxdWVyeU9iamVjdC5wYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChxdWVyeU9iamVjdC5zZWFyY2hUZXJtICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCArPSAnJnNlYXJjaD0nICsgcXVlcnlPYmplY3Quc2VhcmNoVGVybTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hhc2VkT2ZmZXJlZENvbXBvbmVudC52dWUiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTRmYTliNDljXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL3BhcnRpYWxzL0Fzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00ZmE5YjQ5Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTRmYTliNDljXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIzIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxheW91dCByb3cgd3JhcFxuICAgICAgICAgICAgICBjbGFzcz1cImNkLWJveFwiPlxuICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDM+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2RpLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICA6c3R5bGU9XCJ7YmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBnZXRJbWFnZShzdG9yeS50aHVtYikgKyAnKScgfVwiXG4gICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uU3RvcnlDbGljaygpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNkaS1sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICB2LWlmPVwicHVyY2hhc2VkXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtdG9vbHRpcCB0b3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gc2xvdD1cImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwid2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIHNpemU9XCIyNXB4XCI+bW9uZXk8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QdXJjaGFzZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvdi10b29sdGlwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNkaS1sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICB2LWlmPVwiZGVjbGluZVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LXRvb2x0aXAgdG9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzaXplPVwiMjVweFwiPmVycm9yX291dGxpbmU8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRlY2xpbmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtdG9vbHRpcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3Qtc3RvcnlcIlxuICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInN0b3J5LmZsYWdnZWQgPT09IDFcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdC1zdG9yeS1jb250ZW50XCI+SE9UPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ2IHBsLTM+XG5cbiAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgcGItMD5cblxuICAgICAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwic3RvcnkudGl0bGVcIj48L2gyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2QtdGltZVwiPnt7IHN0b3J5LmRhdGVfaW5nZXN0ZWQgfCBjb252ZXJ0RGF0ZSB9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3sgc3RvcnkuZXhjZXJwdCB8IHJlYWRtb3JlKDIwMCwgJy4uLicpIH19PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInF1b3RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidHlwZSA9PT0gJ29mZmVyZWQnIHx8IHR5cGUgPT09ICdwdXJjaGFzZWQnXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCBjb2x1bW4gZmlsbC1oZWlnaHQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwic3RvcnkucGxhdGZvcm1cIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QbGF0Zm9ybToge3sgc3RvcnkucGxhdGZvcm0gfCBjb252ZXJ0SHlwaGVuVG9TcGFjZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYi0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzdG9yeS5wbGF0Zm9ybVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkxlbmd0aDoge3sgc2V0dGluZ3MucHJpY2luZy5sZW5ndGhbc3RvcnkubGVuZ3RoXS5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBiLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInN0b3J5LnR5cGVcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UeXBlOiB7eyBzZXR0aW5ncy5wcmljaW5nLnR5cGVbc3RvcnkudHlwZV0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB2LWlmPVwiZXhwaXJlZFwiIHhzMTIgc20xMiBtZDMgcGwtMz5cbiAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIE5vIExvbmdlciBBdmFpbGFibGVcbiAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggdi1pZj1cImFzc2V0VHlwZSA9PT0gJ3B1cmNoYXNlZCdcIiB4czEyIHNtMTIgbWQzIHBsLTM+XG4gICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJnb1RvRGV0YWlsKClcIlxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICBWaWV3XG4gICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2submF0aXZlPVwib25Eb3dubG9hZFN0b3J5KClcIlxuICAgICAgICAgICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7eyBidXR0b25fdGV4dCB9fVxuICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcHRpb24gdGV4dC14cy1jZW50ZXIgcHQtMlwiXG4gICAgICAgICAgICAgICAgIHYtaWY9XCJhc3NldFR5cGUgPT09ICdwdXJjaGFzZWQnXCI+e3sgc3RvcnkubGljZW5zZV9lbmRzX2F0IHwgbGljZW5zZUV4cGlyZWQgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDMgcGwtM1xuICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cInN0b3J5LmNvbGxlY3Rpb25fc3RhdHVzID09PSAncmVxdWVzdGVkJ1wiPlxuICAgICAgICAgICAgPHA+V2FpdGluZyBmb3IgcXVvdGU8L3A+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kM1xuICAgICAgICAgICAgICAgIHBsLTNcbiAgICAgICAgICAgICAgICB2LWVsc2U+XG4gICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICA6bG9hZGluZz1cImFjY2VwdExvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJhY2NlcHRMb2FkaW5nIHx8IGFzc2V0RGVjbGluZWRcIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbkFjY2VwdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgwqN7eyBzdG9yeS5maW5hbF9wcmljZSB8IG51bWJlckZvcm1hdCB9fSAtIEJ1eSBOb3dcbiAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljay5uYXRpdmU9XCJvbkRlY2xpbmUoKVwiXG4gICAgICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwiZGVjbGluZUxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkZWNsaW5lTG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBEZWNsaW5lXG4gICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJteS00XCI+XG4gICAgICAgICAgICA8di1kaXZpZGVyPjwvdi1kaXZpZGVyPlxuICAgICAgICA8L3YtZmxleD5cbiAgICA8L3YtbGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQge21hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xuICAgIGltcG9ydCBTdG9yeURpYWxvZ0JveEV2ZW50QnVzIGZyb20gJy4uLy4uLy4uL2V2ZW50LWJ1cy9zdG9yeS1kaWFsb2ctYm94LWV2ZW50LWJ1cyc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGJ1dHRvbl90ZXh0OiAnRG93bmxvYWQgU3RvcnknLFxuICAgICAgICAgICAgICAgIHB1cmNoYXNlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVjbGluZTogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBsb2FkZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgc2hvd0J1dHRvbjogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhY2NlcHRMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNsaW5lTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXNzZXREZWNsaW5lZDogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBhc3NldFR5cGU6ICcnLFxuXG4gICAgICAgICAgICAgICAgZXhwaXJlZDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc3Rvcnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpbmRleDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAnZ2V0U2V0dGluZ3NPYmplY3QnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmFzc2V0VHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXNQdXJjaGFzZWRBc3NldCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9yeS5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gJ2V4cGlyZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgbG9hZGVyKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLmxvYWRlclxuICAgICAgICAgICAgICAgIHRoaXNbbF0gPSAhdGhpc1tsXVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdPcmRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwgMzAwMClcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHNob3dEb3dubG9hZEJ1dHRvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCdXR0b24gPSAhdGhpcy5zaG93QnV0dG9uO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ29Ub0RldGFpbCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ2NsaWVudF9zdG9yeV9kZXRhaWwnLCBwYXJhbXM6IHsnYWxwaGFfaWQnOiB0aGlzLnN0b3J5LmFscGhhX2lkfX0pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJbWFnZShpbWFnZSkge1xuICAgICAgICAgICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRvd25sb2FkU3RvcnkoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvY2xpZW50L3N0b3JpZXMvJyArIHRoaXMuc3RvcnkuaWQgKyAnL2Rvd25sb2FkJztcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB1cmw7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkFjY2VwdCgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYWNjZXB0IHN0b3J5Jyk7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdjb2xsZWN0aW9ucy9hY2NlcHRfYXNzZXRfcHJpY2UvJyArIHRoaXMuc3RvcnkuY29sbGVjdGlvbl9zdG9yeV9pZCArICcvc3RvcnknO1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldFR5cGUgPSBcInB1cmNoYXNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRlY2xpbmUoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdjb2xsZWN0aW9ucy9yZWplY3RfYXNzZXRfcHJpY2UvJyArIHRoaXMuc3RvcnkuY29sbGVjdGlvbl9zdG9yeV9pZCArICcvc3RvcnknO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MgPT09ICcxJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gc29tZSBhY3Rpb24gd2hlbiB0aGV5IGFjY2VwdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsaW5lTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldERlY2xpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25TdG9yeUNsaWNrKCkge1xuICAgICAgICAgICAgICAgIFN0b3J5RGlhbG9nQm94RXZlbnRCdXMuJGVtaXQoJ29wZW5TdG9yeURpYWxvZycsIHRoaXMuc3RvcnkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0SXNQdXJjaGFzZWRBc3NldCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcInN0b3J5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3Rvcnkuc3RvcnlfY29sbGVjdGlvbnMgJiYgdGhpcy5zdG9yeS5zdG9yeV9jb2xsZWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cmNoYXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1sYXlvdXRcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNkLWJveFwiLCBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiIH0gfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNkaS1jb250ZW50XCIsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFwiICsgX3ZtLmdldEltYWdlKF92bS5zdG9yeS50aHVtYikgKyBcIilcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0ub25TdG9yeUNsaWNrKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX3ZtLnB1cmNoYXNlZFxuICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2RpLWxhYmVsXCIgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHRvcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJtb25leVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJQdXJjaGFzZWRcIildKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfdm0uZGVjbGluZVxuICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2RpLWxhYmVsXCIgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHRvcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJlcnJvcl9vdXRsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcIkRlY2xpbmVkXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX3ZtLnN0b3J5LmZsYWdnZWQgPT09IDFcbiAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhvdC1zdG9yeVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaG90LXN0b3J5LWNvbnRlbnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkhPVFwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgXVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDY6IFwiXCIsIFwicGwtM1wiOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwicGItMFwiOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgeyBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0uc3RvcnkudGl0bGUpIH0gfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNkLXRpbWVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcImNvbnZlcnREYXRlXCIpKF92bS5zdG9yeS5kYXRlX2luZ2VzdGVkKSkpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uX2YoXCJyZWFkbW9yZVwiKShfdm0uc3RvcnkuZXhjZXJwdCwgMjAwLCBcIi4uLlwiKSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF92bS50eXBlID09PSBcIm9mZmVyZWRcIiB8fCBfdm0udHlwZSA9PT0gXCJwdXJjaGFzZWRcIlxuICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicXVvdGVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uOiBcIlwiLCBcImZpbGwtaGVpZ2h0XCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5LnBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYi0wXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBsYXRmb3JtOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImNvbnZlcnRIeXBoZW5Ub1NwYWNlXCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeS5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5LnBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYi0wXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxlbmd0aDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2V0dGluZ3MucHJpY2luZy5sZW5ndGhbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc3RvcnkudHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZXR0aW5ncy5wcmljaW5nLnR5cGVbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5LnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmV4cGlyZWRcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgTm8gTG9uZ2VyIEF2YWlsYWJsZVxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uYXNzZXRUeXBlID09PSBcInB1cmNoYXNlZFwiXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIsIFwicGwtM1wiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTNcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGJsb2NrOiBcIlwiLCBkYXJrOiBcIlwiLCBsYXJnZTogXCJcIiwgY29sb3I6IFwiZGFya1wiIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLmdvVG9EZXRhaWwoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgVmlld1xcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uRG93bmxvYWRTdG9yeSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICBcIiArIF92bS5fcyhfdm0uYnV0dG9uX3RleHQpICsgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uYXNzZXRUeXBlID09PSBcInB1cmNoYXNlZFwiXG4gICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcHRpb24gdGV4dC14cy1jZW50ZXIgcHQtMlwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImxpY2Vuc2VFeHBpcmVkXCIpKF92bS5zdG9yeS5saWNlbnNlX2VuZHNfYXQpXG4gICAgICAgICAgICAgICAgICAgICAgKSArIFwiXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5zdG9yeS5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gXCJyZXF1ZXN0ZWRcIlxuICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtfYyhcInBcIiwgW192bS5fdihcIldhaXRpbmcgZm9yIHF1b3RlXCIpXSldXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIsIFwicGwtM1wiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYi0zXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0uYWNjZXB0TG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmFjY2VwdExvYWRpbmcgfHwgX3ZtLmFzc2V0RGVjbGluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uQWNjZXB0KClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIMKjXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5fZihcIm51bWJlckZvcm1hdFwiKShfdm0uc3RvcnkuZmluYWxfcHJpY2UpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiAtIEJ1eSBOb3dcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmRlY2xpbmVMb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZGVjbGluZUxvYWRpbmcgfHwgX3ZtLmFzc2V0RGVjbGluZWRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ub25EZWNsaW5lKClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgRGVjbGluZVxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJteS00XCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICBbX2MoXCJ2LWRpdmlkZXJcIildLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNGZhOWI0OWNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTRmYTliNDljXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyMyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMGRjNTQyMzhcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Bc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTBkYzU0MjM4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMGRjNTQyMzhcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL3BhcnRpYWxzL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzczXG4vLyBtb2R1bGUgY2h1bmtzID0gMjMiLCI8dGVtcGxhdGU+XG4gICAgPHYtbGF5b3V0XG4gICAgICAgICAgICByb3cgd3JhcFxuICAgICAgICAgICAgY2xhc3M9XCJjZC1ib3hcIj5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQzPlxuICAgICAgICAgICAgPHYtY2FyZD5cbiAgICAgICAgICAgICAgICA8di1jYXJkLW1lZGlhXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3JjPVwidmlkZW8udGh1bWIgPyB2aWRlby50aHVtYiA6ICAodmlkZW8uaW1hZ2UgPyB2aWRlby5pbWFnZSA6ICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyNTBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvblZpZGVvRGlhbG9nKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjbGllbnQtdmlkZW8tdGh1bWJuYWlsIGNkaS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZGktbGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJwdXJjaGFzZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRvb2x0aXAgdG9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdD1cImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24gc2l6ZT1cIjI1cHhcIj5tb25leTwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHVyY2hhc2VkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRvb2x0aXA+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZGktbGFiZWxcIiB2LWlmPVwiZGVjbGluZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdG9vbHRpcCB0b3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90PVwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwid2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzaXplPVwiMjVweFwiPmVycm9yX291dGxpbmU8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRlY2xpbmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRvb2x0aXA+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkLW1lZGlhPlxuICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNj5cbiAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgcGItMD5cbiAgICAgICAgICAgICAgICAgICAgPGgyIHYtaHRtbD1cInZpZGVvLnRpdGxlXCI+PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNkLXRpbWVcIj57eyB2aWRlby51cGRhdGVkX2F0IHwgY29udmVydERhdGUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj57eyB2aWRlby5kZXNjcmlwdGlvbiB8IHJlYWRtb3JlKDMwMCwgJyAuLi4nKX19PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInF1b3RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidHlwZSA9PT0gJ29mZmVyZWQnIHx8IHR5cGUgPT09ICdwdXJjaGFzZWQnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGwtaGVpZ2h0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidmlkZW8ucGxhdGZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGxhdGZvcm06IHt7IHZpZGVvLnBsYXRmb3JtIHwgY29udmVydEh5cGhlblRvU3BhY2UgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4czEyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBiLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInZpZGVvLnBsYXRmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkxlbmd0aDoge3sgc2V0dGluZ3MucHJpY2luZy5sZW5ndGhbdmlkZW8ubGVuZ3RoXS5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYi0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJ2aWRlby50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlR5cGU6IHt7IHNldHRpbmdzLnByaWNpbmcudHlwZVt2aWRlby50eXBlXS5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYi0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJ2aWRlby5jcmVkaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGxlYXNlIENyZWRpdDoge3sgdmlkZW8uY3JlZGl0IH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHYtaWY9XCJleHBpcmVkXCIgeHMxMiBzbTEyIG1kMyBwbC0zPlxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgTm8gTG9uZ2VyIEF2YWlsYWJsZVxuICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleFxuICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cInZpZGVvLmNvbGxlY3Rpb25fc3RhdHVzID09PSAncmVxdWVzdGVkJ1wiXG4gICAgICAgICAgICAgICAgeHMxMiBzbTEyIG1kMyBwbC0zXG4gICAgICAgICAgICAgICAgYWxpZ24tY29udGVudC1jZW50ZXIganVzdGlmeS1jZW50ZXI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInRleHQteHMtY2VudGVyIGRhcmtlbi00XCI+V2FpdGluZyBmb3IgcXVvdGU8L3A+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggdi1lbHNlLWlmPVwiYXNzZXRUeXBlID09PSAncHVyY2hhc2VkJyB8fCB2aWRlby5wdXJjaGFzZWRcIiB4czEyIHNtMTIgbWQzIHBsLTM+XG4gICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJnb1RvRGV0YWlsKClcIlxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICBWaWV3XG4gICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2submF0aXZlPVwib25Eb3dubG9hZFZpZGVvKClcIlxuICAgICAgICAgICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7eyBidXR0b25fdGV4dCB9fVxuICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcHRpb24gdGV4dC14cy1jZW50ZXIgcHQtMlwiXG4gICAgICAgICAgICAgICAgIHYtaWY9XCJhc3NldFR5cGUgPT09ICdwdXJjaGFzZWQnXCI+e3sgdmlkZW8ubGljZW5zZV9lbmRzX2F0IHwgbGljZW5zZUV4cGlyZWQgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHYtZWxzZSB4czEyIHNtMTIgbWQzIHBsLTM+XG4gICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICA6bG9hZGluZz1cImFjY2VwdExvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJhY2NlcHRMb2FkaW5nIHx8IGFzc2V0RGVjbGluZWRcIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbkFjY2VwdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgwqN7eyB2aWRlby5maW5hbF9wcmljZSB8IG51bWJlckZvcm1hdCB9fSAtIEJ1eSBOb3dcbiAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljay5uYXRpdmU9XCJvbkRlY2xpbmUoKVwiXG4gICAgICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwiZGVjbGluZUxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkZWNsaW5lTG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBEZWNsaW5lXG4gICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJteS0yXCI+XG4gICAgICAgICAgICA8di1kaXZpZGVyPjwvdi1kaXZpZGVyPlxuICAgICAgICA8L3YtZmxleD5cbiAgICA8L3YtbGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQge21hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBidXR0b25fdGV4dDogJ0Rvd25sb2FkIFZpZGVvJyxcbiAgICAgICAgICAgICAgICBwdXJjaGFzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlY2xpbmU6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgbG9hZGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHNob3dCdXR0b246IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWNjZXB0TG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVjbGluZUxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFzc2V0RGVjbGluZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgZXhwaXJlZDogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBhc3NldFR5cGU6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaW5kZXg6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICAuLi5tYXBHZXR0ZXJzKHtcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ2dldFNldHRpbmdzT2JqZWN0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5hc3NldFR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICBpZiAodGhpcy52aWRlby5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gJ2V4cGlyZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgbG9hZGVyKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLmxvYWRlcjtcbiAgICAgICAgICAgICAgICB0aGlzW2xdID0gIXRoaXNbbF07XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tsXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld09yZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbnVsbFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgc2hvd0Rvd25sb2FkQnV0dG9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J1dHRvbiA9ICF0aGlzLnNob3dCdXR0b247XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnb1RvRGV0YWlsKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOiAnY2xpZW50X3ZpZGVvX2RldGFpbCcsIHBhcmFtczogeydhbHBoYV9pZCc6IHRoaXMudmlkZW8uYWxwaGFfaWR9fSlcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldEltYWdlKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy9hc3NldHMvaW1hZ2VzL3BsYWNlaG9sZGVyLnBuZyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uRG93bmxvYWRWaWRlbygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9ICdsb2FkaW5nJztcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gJy9jbGllbnQvdmlkZW9zLycgKyB0aGlzLnZpZGVvLmlkICsgJy9kb3dubG9hZCc7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdXJsO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25BY2NlcHQoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdjb2xsZWN0aW9ucy9hY2NlcHRfYXNzZXRfcHJpY2UvJyArIHRoaXMudmlkZW8uY29sbGVjdGlvbl92aWRlb19pZCArICcvdmlkZW8nO1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VXNlck9mZmVycycsIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0VXNlclN0YXR1cy5vZmZlcnMgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldFR5cGUgPSBcInB1cmNoYXNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU25hY2tiYXJFdmVudEJ1cy5kaXNwbGF5TWVzc2FnZSg1MDAwLCAnVmlkZW8gaGFzIHN1Y2Nlc3NmdWxseSBwdXJjaGFzZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcHVyY2hhc2VkLCBpZiB3ZSBuZWVkIHRvIHRvIGNoYW5nZSBhbm90aGVyIGNvbXBvbmVudCBkYXRhIHRoaXMgZXZlbnQgbmVlZCB0byBlbmFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsaWVudFZpZGVvT2ZmZXJQdXJjaGFzZWRFdmVudEJ1cy5jbGllbnRSZW1vdmVWaWRlbyh0aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25EZWNsaW5lKCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAnY29sbGVjdGlvbnMvcmVqZWN0X2Fzc2V0X3ByaWNlLycgKyB0aGlzLnZpZGVvLmNvbGxlY3Rpb25fdmlkZW9faWQgKyAnL3ZpZGVvJztcbiAgICAgICAgICAgICAgICB0aGlzLmRlY2xpbmVMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBheGlvcy5nZXQodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIHNvbWUgYWN0aW9uIHdoZW4gdGhleSBhY2NlcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZUxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldERlY2xpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTbmFja2JhckV2ZW50QnVzLmRpc3BsYXlNZXNzYWdlKDUwMDAsICdWaWRlbyBoYXMgZGVjbGluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblZpZGVvRGlhbG9nKCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLiRyb3V0ZS5wYXRoO1xuXG4gICAgICAgICAgICAgICAgdXJsICs9ICc/dHlwZT0nICsgdGhpcy50eXBlO1xuICAgICAgICAgICAgICAgIHVybCArPSAnJmlkPScgKyB0aGlzLnZpZGVvLmFscGhhX2lkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHJvdXRlLnF1ZXJ5LnRhZykge1xuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJyZ0YWc9JyArIHRoaXMuJHJvdXRlLnF1ZXJ5LnRhZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kcm91dGUucXVlcnkuYWxwaGFfaWQgPSB0aGlzLnZpZGVvLmFscGhhX2lkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRFbnRlclJvdXRlT2JqZWN0JywgdGhpcy4kcm91dGUpO1xuXG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBudWxsLCB1cmwpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRyb3V0ZS5uYW1lID09PSAnY2xpZW50X29mZmVyZWRfYXNzZXRzJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbGllbnQgb2ZmZXJlZCBwYWdlXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRBc3NldE9mZmVyZWRDdXJyZW50SW5kZXgnLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdmZXRjaE9mZmVyZWREaWFsb2dOZXh0UHJldmlvdXMnKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFZpZGVvRGlhbG9nQm94JywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VmlkZW9Mb2FkaW5nJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldEN1cnJlbnRWaWRlb0FscGhhSWQnLCB0aGlzLnZpZGVvLmFscGhhX2lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldEN1cnJlbnRSb3V0ZU9iamVjdCcsIHRoaXMuJHJvdXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFZpZGVvRGlhbG9nQm94JywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRWaWRlb0xvYWRpbmcnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdnZXRWaWRlb05leHRBbmRQcmV2TGluaycsIHthbHBoYV9pZDogdGhpcy52aWRlby5hbHBoYV9pZH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtbGF5b3V0XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJjZC1ib3hcIiwgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZC1tZWRpYVwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNsaWVudC12aWRlby10aHVtYm5haWwgY2RpLWNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLnZpZGVvLnRodW1iXG4gICAgICAgICAgICAgICAgICAgICAgPyBfdm0udmlkZW8udGh1bWJcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS52aWRlby5pbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfdm0udmlkZW8uaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCIvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjI1MHB4XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uVmlkZW9EaWFsb2coKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0ucHVyY2hhc2VkXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjZGktbGFiZWxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdG9wOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBzaXplOiBcIjI1cHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIm1vbmV5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcIlB1cmNoYXNlZFwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF92bS5kZWNsaW5lXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjZGktbGFiZWxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdG9wOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBzaXplOiBcIjI1cHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImVycm9yX291dGxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbX3ZtLl92KFwiRGVjbGluZWRcIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ2OiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwicGItMFwiOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgeyBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0udmlkZW8udGl0bGUpIH0gfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNkLXRpbWVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcImNvbnZlcnREYXRlXCIpKF92bS52aWRlby51cGRhdGVkX2F0KSkpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJyZWFkbW9yZVwiKShfdm0udmlkZW8uZGVzY3JpcHRpb24sIDMwMCwgXCIgLi4uXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF92bS50eXBlID09PSBcIm9mZmVyZWRcIiB8fCBfdm0udHlwZSA9PT0gXCJwdXJjaGFzZWRcIlxuICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicXVvdGVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgY29sdW1uOiBcIlwiLCBcImZpbGwtaGVpZ2h0XCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLnBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYi0wXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBsYXRmb3JtOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImNvbnZlcnRIeXBoZW5Ub1NwYWNlXCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLnBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYi0wXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkxlbmd0aDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2V0dGluZ3MucHJpY2luZy5sZW5ndGhbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW8udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUeXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZXR0aW5ncy5wcmljaW5nLnR5cGVbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLmNyZWRpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQbGVhc2UgQ3JlZGl0OiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnZpZGVvLmNyZWRpdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZXhwaXJlZFxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYi0zXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICBObyBMb25nZXIgQXZhaWxhYmxlXFxuICAgICAgICBcIildXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS52aWRlby5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gXCJyZXF1ZXN0ZWRcIlxuICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgeHMxMjogXCJcIixcbiAgICAgICAgICAgICAgICAgIHNtMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBtZDM6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcInBsLTNcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgIFwiYWxpZ24tY29udGVudC1jZW50ZXJcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgIFwianVzdGlmeS1jZW50ZXJcIjogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyIGRhcmtlbi00XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiV2FpdGluZyBmb3IgcXVvdGVcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBfdm0uYXNzZXRUeXBlID09PSBcInB1cmNoYXNlZFwiIHx8IF92bS52aWRlby5wdXJjaGFzZWRcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYi0zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgYmxvY2s6IFwiXCIsIGRhcms6IFwiXCIsIGxhcmdlOiBcIlwiLCBjb2xvcjogXCJkYXJrXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZ29Ub0RldGFpbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgVmlld1xcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkRvd25sb2FkVmlkZW8oKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmJ1dHRvbl90ZXh0KSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0uYXNzZXRUeXBlID09PSBcInB1cmNoYXNlZFwiXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXB0aW9uIHRleHQteHMtY2VudGVyIHB0LTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwibGljZW5zZUV4cGlyZWRcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5saWNlbnNlX2VuZHNfYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApICsgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0uYWNjZXB0TG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uYWNjZXB0TG9hZGluZyB8fCBfdm0uYXNzZXREZWNsaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uQWNjZXB0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIMKjXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwibnVtYmVyRm9ybWF0XCIpKF92bS52aWRlby5maW5hbF9wcmljZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiIC0gQnV5IE5vd1xcbiAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5kZWNsaW5lTG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZGVjbGluZUxvYWRpbmcgfHwgX3ZtLmFzc2V0RGVjbGluZWRcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkRlY2xpbmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgIERlY2xpbmVcXG4gICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJteS0yXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICBbX2MoXCJ2LWRpdmlkZXJcIildLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMGRjNTQyMzhcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTBkYzU0MjM4XCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NzVcbi8vIG1vZHVsZSBjaHVua3MgPSAyMyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNsaWVudC1vZmZlci1zZWN0aW9uXCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInB0LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlciB0ZXh0LXVwcGVyY2FzZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmhlYWRpbmdUZXh0KSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLnRvdGFsU3RvcmllcyA8PSAwICYmXG4gICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA8PSAwICYmXG4gICAgICAgICAgICAgICFfdm0uc2VhcmNoVmlkZW9UZXJtXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJZb3UgaGF2ZSBubyBvZmZlcnMgeWV0LiBZb3UgY2FuIGJ1eSBvciByZXF1ZXN0IHF1b3RlcyBmb3IgYW55IG9mIG91clxcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdGFnOiBcImFcIiwgdG86IHsgcGF0aDogXCIvdmlkZW9zXCIgfSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlZpZGVvc1wiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiLCBhbmRcXG4gICAgICAgICAgICAgICAgICAgIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdGFnOiBcImFcIiwgdG86IHsgcGF0aDogXCIvc3Rvcmllc1wiIH0gfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJTdG9yaWVzXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIuXFxuICAgICAgICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsaWRlci1jb2xvclwiOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uYWN0aXZlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA+IDAgfHwgX3ZtLnNlYXJjaFZpZGVvVGVybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJhZGdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiLCBjb2xvcjogXCJibGFja1wiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJiYWRnZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImJhZGdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS50b3RhbFZpZGVvcykpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlkZW9zXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFN0b3JpZXMgPiAwIHx8IF92bS5zZWFyY2hTdG9yeVRlcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1iYWRnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByaWdodDogXCJcIiwgY29sb3I6IFwiYmxhY2tcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwiYmFkZ2VcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJiYWRnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0udG90YWxTdG9yaWVzKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdG9yaWVzXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA+IDAgfHwgX3ZtLnNlYXJjaFZpZGVvVGVybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoVmlkZW9UZXJtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWFyY2hWaWRlb1Rlcm0gPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoVmlkZW9UZXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsVmlkZW9zIDw9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZSBjb3VsZCBub3QgZmluZCBhbnkgdmlkZW9zIG1hdGNoaW5nIHlvdXIgc2VhcmNoLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS52aWRlb3MsIGZ1bmN0aW9uKHZpZGVvLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiYXNzZXQtdmlkZW8tb2ZmZXJlZC1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IF92bS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogdmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA+IF92bS52aWRlb3NQZXJQYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXBhZ2luYXRpb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogX3ZtLm51bWJlck9mVmlkZW9QYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsLXZpc2libGVcIjogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnZpZGVvUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW9QYWdlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInZpZGVvUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFN0b3JpZXMgPiAwIHx8IF92bS5zZWFyY2hTdG9yeVRlcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFiLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHhzMTI6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHQtZmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZC1pY29uXCI6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlYXJjaFN0b3J5VGVybSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VhcmNoU3RvcnlUZXJtID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlYXJjaFN0b3J5VGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFN0b3JpZXMgPD0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldlIGNvdWxkIG5vdCBmaW5kIGFueSBzdG9yaWVzIG1hdGNoaW5nIHlvdXIgc2VhcmNoLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5zdG9yaWVzLCBmdW5jdGlvbihzdG9yeSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImFzc2V0LXN0b3J5LW9mZmVyZWQtY29tcG9uZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogX3ZtLnR5cGUsIHN0b3J5OiBzdG9yeSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsU3RvcmllcyA+IF92bS5zdG9yaWVzUGVyUGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1wYWdpbmF0aW9uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IF92bS5udW1iZXJPZlN0b3J5UGFnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbC12aXNpYmxlXCI6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zdG9yeVBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5UGFnZSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzdG9yeVBhZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi03NzRkNWVmM1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNzc0ZDVlZjNcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMjMiXSwic291cmNlUm9vdCI6IiJ9