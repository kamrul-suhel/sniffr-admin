webpackJsonp([1],{

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(782)
/* template */
var __vue_template__ = __webpack_require__(789)
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

/***/ 782:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent__ = __webpack_require__(783);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AssetVideoOfferedComponent__ = __webpack_require__(786);
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
                this.active = 'videos';
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

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(784)
/* template */
var __vue_template__ = __webpack_require__(785)
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

/***/ 784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_bus_story_dialog_box_event_bus__ = __webpack_require__(393);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            decline_note: null,
            dialog: false,

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

            var url = 'collections/accept_asset_price/' + this.story.collection_story_id + '/story';
            this.acceptLoading = true;
            axios.post(url).then(function (response) {
                console.log(response);
                if (response.data.success === '1') {
                    _this2.$store.commit('setUserOffers', _this2.$store.getters.getUserStatus.offers - 1);
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

            var form_data = new FormData();
            form_data.append('rejection_notes', this.decline_note);
            axios.post(url, form_data).then(function (response) {
                if (response.data.success === '1') {
                    _this3.declineLoading = false;
                    _this3.assetDeclined = true;
                    _this3.decline = true;

                    _this3.dialog = false;
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

/***/ 785:
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
                _c("small", [_vm._v("Don't like this offer?")]),
                _vm._v(" "),
                _c("br"),
                _vm._v(" "),
                _c(
                  "v-dialog",
                  {
                    attrs: { persistent: "", "max-width": "500px" },
                    model: {
                      value: _vm.dialog,
                      callback: function($$v) {
                        _vm.dialog = $$v
                      },
                      expression: "dialog"
                    }
                  },
                  [
                    _c(
                      "v-btn",
                      {
                        staticClass: "mb-3",
                        attrs: {
                          slot: "activator",
                          persistent: "",
                          block: "",
                          dark: "",
                          large: "",
                          color: "dark",
                          loading: _vm.declineLoading,
                          disabled: _vm.declineLoading || _vm.assetDeclined
                        },
                        slot: "activator"
                      },
                      [_vm._v("\n                Contact Us\n            ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-card",
                      [
                        _c("v-card-title", [
                          _c("span", { staticClass: "headline" }, [
                            _vm._v("Contact Us")
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "v-card-text",
                          [
                            _c(
                              "v-container",
                              { attrs: { "grid-list-md": "" } },
                              [
                                _c(
                                  "v-layout",
                                  { attrs: { wrap: "" } },
                                  [
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "" } },
                                      [
                                        _c("v-textarea", {
                                          attrs: {
                                            label:
                                              "Please tell us why this quote isn't good for you.",
                                            color: "dark",
                                            rows: "10",
                                            required: ""
                                          },
                                          model: {
                                            value: _vm.decline_note,
                                            callback: function($$v) {
                                              _vm.decline_note = $$v
                                            },
                                            expression: "decline_note"
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
                        ),
                        _vm._v(" "),
                        _c(
                          "v-card-actions",
                          [
                            _c("v-spacer"),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                attrs: { color: "black", dark: "", flat: "" },
                                nativeOn: {
                                  click: function($event) {
                                    _vm.dialog = false
                                    _vm.declineLoading = false
                                  }
                                }
                              },
                              [_vm._v("Cancel")]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                attrs: { dark: "" },
                                on: {
                                  click: function($event) {
                                    _vm.onDecline()
                                  }
                                }
                              },
                              [_vm._v("Save")]
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

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(787)
/* template */
var __vue_template__ = __webpack_require__(788)
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

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(36);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            decline_note: null,
            dialog: false,

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
            axios.post(url).then(function (response) {
                if (response.data.success === '1') {
                    _this2.$store.commit('setUserOffers', _this2.$store.getters.getUserStatus.offers - 1);
                    _this2.acceptLoading = false;
                    _this2.assetType = "purchased";
                    _this2.purchased = true;
                }
            });
        },
        onDecline: function onDecline() {
            var _this3 = this;

            var url = 'collections/reject_asset_price/' + this.video.collection_video_id + '/video';
            this.declineLoading = true;

            var form_data = new FormData();
            form_data.append('rejection_notes', this.decline_note);
            axios.post(url, form_data).then(function (response) {
                if (response.data.success === '1') {
                    _this3.declineLoading = false;
                    _this3.assetDeclined = true;
                    _this3.decline = true;

                    _this3.dialog = false;
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

/***/ 788:
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
                  _c("small", [_vm._v("Don't like this offer?")]),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c(
                    "v-dialog",
                    {
                      attrs: { persistent: "", "max-width": "500px" },
                      model: {
                        value: _vm.dialog,
                        callback: function($$v) {
                          _vm.dialog = $$v
                        },
                        expression: "dialog"
                      }
                    },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mb-3",
                          attrs: {
                            slot: "activator",
                            persistent: "",
                            block: "",
                            dark: "",
                            large: "",
                            color: "dark",
                            loading: _vm.declineLoading,
                            disabled: _vm.declineLoading || _vm.assetDeclined
                          },
                          slot: "activator"
                        },
                        [_vm._v("\n                Contact Us\n            ")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card",
                        [
                          _c("v-card-title", [
                            _c("span", { staticClass: "headline" }, [
                              _vm._v("Contact Us")
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            [
                              _c(
                                "v-container",
                                { attrs: { "grid-list-md": "" } },
                                [
                                  _c(
                                    "v-layout",
                                    { attrs: { wrap: "" } },
                                    [
                                      _c(
                                        "v-flex",
                                        { attrs: { xs12: "" } },
                                        [
                                          _c("v-textarea", {
                                            attrs: {
                                              label:
                                                "Please tell us why this quote isn't good for you.",
                                              color: "dark",
                                              rows: "10",
                                              required: ""
                                            },
                                            model: {
                                              value: _vm.decline_note,
                                              callback: function($$v) {
                                                _vm.decline_note = $$v
                                              },
                                              expression: "decline_note"
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
                          ),
                          _vm._v(" "),
                          _c(
                            "v-card-actions",
                            [
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "black", dark: "", flat: "" },
                                  nativeOn: {
                                    click: function($event) {
                                      _vm.dialog = false
                                      _vm.declineLoading = false
                                    }
                                  }
                                },
                                [_vm._v("Cancel")]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { dark: "" },
                                  on: {
                                    click: function($event) {
                                      _vm.onDecline()
                                    }
                                  }
                                },
                                [_vm._v("Save")]
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

/***/ 789:
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
                          _c(
                            "v-tab",
                            { key: "videos" },
                            [
                              _c(
                                "v-badge",
                                { attrs: { right: "", color: "black" } },
                                [
                                  _c(
                                    "span",
                                    { attrs: { slot: "badge" }, slot: "badge" },
                                    [_vm._v(_vm._s(_vm.totalVideos))]
                                  ),
                                  _vm._v(
                                    "\n                            Videos\n                        "
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-tab",
                            { key: "stories" },
                            [
                              _c(
                                "v-badge",
                                { attrs: { right: "", color: "black" } },
                                [
                                  _c(
                                    "span",
                                    { attrs: { slot: "badge" }, slot: "badge" },
                                    [_vm._v(_vm._s(_vm.totalStories))]
                                  ),
                                  _vm._v(
                                    "\n                            Stories\n                        "
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.totalVideos > 0 || _vm.searchVideoTerm
                            ? _c(
                                "v-tab-item",
                                { key: "videos" },
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
                                { key: "stories" },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hhc2VkT2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlP2M5OTAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlPzExZTgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hh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QUFxQyxTQUFTLG9CQUFvQixFQUFFO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFNBQVMsb0JBQW9CLEVBQUU7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RCw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUMscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxnQ0FBZ0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzc0ZDVlZjNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi03NzRkNWVmM1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTc3NGQ1ZWYzXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LW9mZmVyLXNlY3Rpb25cIj5cbiAgICAgICAgPCEtLSBFbmQgcmVmcmVzaCBzdG9yaWVzIGRpYWxvZyBib3ggLS0+XG4gICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgY2xhc3M9XCJwdC0wXCI+XG4gICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0ZXh0LWNlbnRlciB0ZXh0LXVwcGVyY2FzZVwiPnt7IGhlYWRpbmdUZXh0IH19PC9oMj5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInRleHQteHMtY2VudGVyXCIgdi1pZj1cInRvdGFsU3RvcmllcyA8PSAwICYmIHRvdGFsVmlkZW9zIDw9IDAgJiYgIXNlYXJjaFZpZGVvVGVybVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+WW91IGhhdmUgbm8gb2ZmZXJzIHlldC4gWW91IGNhbiBidXkgb3IgcmVxdWVzdCBxdW90ZXMgZm9yIGFueSBvZiBvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0YWc9XCJhXCIgIDp0bz1cIntwYXRoOiAnL3ZpZGVvcyd9XCI+VmlkZW9zPC9yb3V0ZXItbGluaz4sIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRhZz1cImFcIiA6dG89XCJ7cGF0aDogJy9zdG9yaWVzJ31cIj5TdG9yaWVzPC9yb3V0ZXItbGluaz4uXG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICA8di10YWJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlci1jb2xvcj1cImJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwidmlkZW9zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYmFkZ2UgcmlnaHQgY29sb3I9XCJibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwiYmFkZ2VcIj57eyB0b3RhbFZpZGVvcyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlkZW9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJhZGdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT1cInN0b3JpZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1iYWRnZSByaWdodCBjb2xvcj1cImJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJiYWRnZVwiPnt7dG90YWxTdG9yaWVzfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0b3JpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYmFkZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8di10YWItaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidG90YWxWaWRlb3MgPiAwIHx8IHNlYXJjaFZpZGVvVGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCIndmlkZW9zJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hWaWRlb1Rlcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlNlYXJjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgdi1pZj1cInRvdGFsVmlkZW9zIDw9IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5XZSBjb3VsZCBub3QgZmluZCBhbnkgdmlkZW9zIG1hdGNoaW5nIHlvdXIgc2VhcmNoLjwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXNzZXQtdmlkZW8tb2ZmZXJlZC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKHZpZGVvLCBpbmRleCkgaW4gdmlkZW9zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHlwZT1cInR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmluZGV4PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnZpZGVvPVwidmlkZW9cIj48L2Fzc2V0LXZpZGVvLW9mZmVyZWQtY29tcG9uZW50PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQteHMtY2VudGVyXCIgdi1pZj1cInRvdGFsVmlkZW9zID4gdmlkZW9zUGVyUGFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1wYWdpbmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxlbmd0aD1cIm51bWJlck9mVmlkZW9QYWdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInZpZGVvUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRvdGFsLXZpc2libGU9XCI3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrIGNvbG9yPVwiYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LXBhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFiLWl0ZW0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYi1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJ0b3RhbFN0b3JpZXMgPiAwIHx8IHNlYXJjaFN0b3J5VGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT1cInN0b3JpZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInRleHQteHMtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kLWljb249XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoU3RvcnlUZXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwIHYtaWY9XCJ0b3RhbFN0b3JpZXMgPD0gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPldlIGNvdWxkIG5vdCBmaW5kIGFueSBzdG9yaWVzIG1hdGNoaW5nIHlvdXIgc2VhcmNoLjwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXNzZXQtc3Rvcnktb2ZmZXJlZC1jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKHN0b3J5LCBpbmRleCkgaW4gc3Rvcmllc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR5cGU9XCJ0eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzdG9yeT1cInN0b3J5XCI+PC9hc3NldC1zdG9yeS1vZmZlcmVkLWNvbXBvbmVudD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiIHYtaWY9XCJ0b3RhbFN0b3JpZXMgPiBzdG9yaWVzUGVyUGFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1wYWdpbmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmxlbmd0aD1cIm51bWJlck9mU3RvcnlQYWdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInN0b3J5UGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnRvdGFsLXZpc2libGU9XCI3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrIGNvbG9yPVwiYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LXBhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGFiLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvdi10YWJzPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG48c2NyaXB0PlxuICAgIGltcG9ydCBBc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudCBmcm9tICcuL3BhcnRpYWxzL0Fzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50J1xuICAgIGltcG9ydCBBc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudCBmcm9tICcuL3BhcnRpYWxzL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50J1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBBc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudCxcbiAgICAgICAgICAgIEFzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiBudWxsLFxuICAgICAgICAgICAgICAgIGhlYWRpbmdUZXh0OicnLFxuICAgICAgICAgICAgICAgIHBhZ2U6MSxcbiAgICAgICAgICAgICAgICB2aWRlb1BhZ2U6IDEsXG4gICAgICAgICAgICAgICAgc3RvcnlQYWdlOjEsXG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgICAgICAgICAgc2VhcmNoVmlkZW9UZXJtOicnLFxuICAgICAgICAgICAgICAgIHNlYXJjaFN0b3J5VGVybTonJyxcbiAgICAgICAgICAgICAgICB0YWJJdGVtczpbJ1ZpZGVvJywgJ1N0b3JpZXMnXVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgZ2V0KCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRyb3V0ZS5xdWVyeS50eXBlO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBzZXQodmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3Rvcmllczoge1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ29mZmVyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRPZmZlcmVkU3RvcmllcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwdXJjaGFzZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRQdXJjaGFzZWRTdG9yaWVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdmlkZW9zOiB7XG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnR5cGUgPT09ICdvZmZlcmVkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRPZmZlcmVkVmlkZW9zO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy50eXBlID09PSAncHVyY2hhc2VkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRQdXJjaGFzZWRWaWRlb3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9yaWVzUGVyUGFnZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRTdG9yaWVzUGFnaW5hdGVPYmplY3QucGVyX3BhZ2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBudW1iZXJPZlN0b3J5UGFnZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0U3Rvcmllc1BhZ2luYXRlT2JqZWN0Lmxhc3RfcGFnZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvdGFsU3RvcmllcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRTdG9yaWVzUGFnaW5hdGVPYmplY3QudG90YWw7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB2aWRlb3NQZXJQYWdlKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0VmlkZW9QYWdpbmF0ZU9iamVjdC5wZXJfcGFnZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvdGFsVmlkZW9zKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0VmlkZW9QYWdpbmF0ZU9iamVjdC50b3RhbDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG51bWJlck9mVmlkZW9QYWdlcygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFZpZGVvUGFnaW5hdGVPYmplY3QubGFzdF9wYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIHZpZGVvUGFnZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoJ3ZpZGVvJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9yeVBhZ2UoKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoJ3N0b3J5Jyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnJHJvdXRlJyh0bywgbmV4dCwgcHJldmlvdXMpe1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy4kcm91dGUucXVlcnkuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlID0gdGhpcy4kcm91dGUucXVlcnkudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hWaWRlb1Rlcm0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTdG9yeVRlcm0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSAndmlkZW9zJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2VhcmNoVmlkZW9UZXJtKHZhbHVlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSB0aGlzLnNlYXJjaFZpZGVvVGVybTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSgndmlkZW8nKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNlYXJjaFN0b3J5VGVybSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoU3RvcnlUZXJtO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKCdzdG9yeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLiRyb3V0ZS5xdWVyeS50eXBlO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzZXREYXRhKHRlcm0gPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9iZWZvcmUgc2V0IHN0b3JlIGNsZWFyIGFsbCBkYXRhXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ29mZmVyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRpbmdUZXh0ID0gJ1lvdXIgb2ZmZXJzJ1xuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAndmlkZW8nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0T2ZmZXJlZFZpZGVvc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAnc3RvcnknKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0T2ZmZXJlZFN0b3JpZXNEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSZXNldFN0b3JpZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRSZXNldFZpZGVvcycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE9mZmVyZWRWaWRlb3NEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE9mZmVyZWRTdG9yaWVzRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwdXJjaGFzZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGluZ1RleHQgPSAnUHVyY2hhc2VzJ1xuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAndmlkZW8nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHVyY2hhc2VkVmlkZW9zRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICdzdG9yeScpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQdXJjaGFzZWRTdG9yaWVzRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFJlc2V0U3RvcmllcycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFJlc2V0VmlkZW9zJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHVyY2hhc2VkVmlkZW9zRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQdXJjaGFzZWRTdG9yaWVzRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRPZmZlcmVkVmlkZW9zRGF0YShxdWVyeU9iamVjdCA9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZW5lcmF0ZVVybChxdWVyeU9iamVjdCwgJ3ZpZGVvJywgJ29mZmVyZWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hPZmZlcmVkVmlkZW9zJywgdXJsKVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0UHVyY2hhc2VkVmlkZW9zRGF0YShxdWVyeU9iamVjdCA9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZW5lcmF0ZVVybChxdWVyeU9iamVjdCwgJ3ZpZGVvJywgJ3B1cmNoYXNlZCcpXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2ZldGNoUHVyY2hhc2VkVmlkZW9zJywgdXJsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldE9mZmVyZWRTdG9yaWVzRGF0YShxdWVyeU9iamVjdCA9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdlbmVyYXRlVXJsKHF1ZXJ5T2JqZWN0LCAnc3RvcnknLCAnb2ZmZXJlZCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdmZXRjaE9mZmVyZWRTdG9yaWVzJywgdXJsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFB1cmNoYXNlZFN0b3JpZXNEYXRhKHF1ZXJ5T2JqZWN0ID0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdlbmVyYXRlVXJsKHF1ZXJ5T2JqZWN0LCAnc3RvcnknLCAncHVyY2hhc2VkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2ZldGNoUHVyY2hhc2VkU3RvcmllcycsIHVybCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRRdWVyeU9iamVjdCh0ZXJtID0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3ZpZGVvJyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnZpZGVvUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFRlcm06IHRoaXMuc2VhcmNoVGVybVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICdzdG9yeScpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5zdG9yeVBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUZXJtOiB0aGlzLnNlYXJjaFRlcm1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoVGVybTogdGhpcy5zZWFyY2hUZXJtXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdlbmVyYXRlVXJsKHF1ZXJ5T2JqZWN0LCB0eXBlID0gbnVsbCwgdGVybT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPScnO1xuICAgICAgICAgICAgICAgIGlmKHR5cGUgPT09ICd2aWRlbycpe1xuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAnb2ZmZXJlZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJy9jbGllbnQvdmlkZW9zL29mZmVyZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3B1cmNoYXNlZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJy9jbGllbnQvdmlkZW9zL3B1cmNoYXNlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlID09PSAnc3RvcnknKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ29mZmVyZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICcvY2xpZW50L3N0b3JpZXMvb2ZmZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAncHVyY2hhc2VkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnL2NsaWVudC9zdG9yaWVzL3B1cmNoYXNlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocXVlcnlPYmplY3QucGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCArPSAnP3BhZ2U9JyArIHF1ZXJ5T2JqZWN0LnBhZ2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5T2JqZWN0LnNlYXJjaFRlcm0gIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICcmc2VhcmNoPScgKyBxdWVyeU9iamVjdC5zZWFyY2hUZXJtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0Fzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNGZhOWI0OWNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTRmYTliNDljXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNGZhOWI0OWNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL3BhcnRpYWxzL0Fzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIjx0ZW1wbGF0ZT5cbiAgICA8di1sYXlvdXQgcm93IHdyYXBcbiAgICAgICAgICAgICAgY2xhc3M9XCJjZC1ib3hcIj5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQzPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNkaS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgOnN0eWxlPVwie2JhY2tncm91bmRJbWFnZTogJ3VybCgnICsgZ2V0SW1hZ2Uoc3RvcnkudGh1bWIpICsgJyknIH1cIlxuICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvblN0b3J5Q2xpY2soKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZGktbGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInB1cmNoYXNlZFwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LXRvb2x0aXAgdG9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzaXplPVwiMjVweFwiPm1vbmV5PC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHVyY2hhc2VkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtdG9vbHRpcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZGktbGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgdi1pZj1cImRlY2xpbmVcIj5cblxuICAgICAgICAgICAgICAgICAgICA8di10b29sdGlwIHRvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBzbG90PVwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24gc2l6ZT1cIjI1cHhcIj5lcnJvcl9vdXRsaW5lPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EZWNsaW5lZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LXRvb2x0aXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG90LXN0b3J5XCJcbiAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzdG9yeS5mbGFnZ2VkID09PSAxXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3Qtc3RvcnktY29udGVudFwiPkhPVDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNiBwbC0zPlxuXG4gICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHBiLTA+XG5cbiAgICAgICAgICAgICAgICAgICAgPGgyIHYtaHRtbD1cInN0b3J5LnRpdGxlXCI+PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNkLXRpbWVcIj57eyBzdG9yeS5kYXRlX2luZ2VzdGVkIHwgY29udmVydERhdGUgfX08L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2Pnt7IHN0b3J5LmV4Y2VycHQgfCByZWFkbW9yZSgyMDAsICcuLi4nKSB9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdW90ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInR5cGUgPT09ICdvZmZlcmVkJyB8fCB0eXBlID09PSAncHVyY2hhc2VkJ1wiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgY29sdW1uIGZpbGwtaGVpZ2h0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBiLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInN0b3J5LnBsYXRmb3JtXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGxhdGZvcm06IHt7IHN0b3J5LnBsYXRmb3JtIHwgY29udmVydEh5cGhlblRvU3BhY2UgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwic3RvcnkucGxhdGZvcm1cIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5MZW5ndGg6IHt7IHNldHRpbmdzLnByaWNpbmcubGVuZ3RoW3N0b3J5Lmxlbmd0aF0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYi0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzdG9yeS50eXBlXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VHlwZToge3sgc2V0dGluZ3MucHJpY2luZy50eXBlW3N0b3J5LnR5cGVdLm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggdi1pZj1cImV4cGlyZWRcIiB4czEyIHNtMTIgbWQzIHBsLTM+XG4gICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICBObyBMb25nZXIgQXZhaWxhYmxlXG4gICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHYtaWY9XCJhc3NldFR5cGUgPT09ICdwdXJjaGFzZWQnXCIgeHMxMiBzbTEyIG1kMyBwbC0zPlxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiZ29Ub0RldGFpbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgVmlld1xuICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrLm5hdGl2ZT1cIm9uRG93bmxvYWRTdG9yeSgpXCJcbiAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwibG9hZGluZ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgYnV0dG9uX3RleHQgfX1cbiAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXB0aW9uIHRleHQteHMtY2VudGVyIHB0LTJcIlxuICAgICAgICAgICAgICAgICB2LWlmPVwiYXNzZXRUeXBlID09PSAncHVyY2hhc2VkJ1wiPnt7IHN0b3J5LmxpY2Vuc2VfZW5kc19hdCB8IGxpY2Vuc2VFeHBpcmVkIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQzIHBsLTNcbiAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJzdG9yeS5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gJ3JlcXVlc3RlZCdcIj5cbiAgICAgICAgICAgIDxwPldhaXRpbmcgZm9yIHF1b3RlPC9wPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDNcbiAgICAgICAgICAgICAgICBwbC0zXG4gICAgICAgICAgICAgICAgdi1lbHNlPlxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJhY2NlcHRMb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiYWNjZXB0TG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25BY2NlcHQoKVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIMKje3sgc3RvcnkuZmluYWxfcHJpY2UgfCBudW1iZXJGb3JtYXQgfX0gLSBCdXkgTm93XG4gICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICA8c21hbGw+RG9uJ3QgbGlrZSB0aGlzIG9mZmVyPzwvc21hbGw+XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8di1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiIHBlcnNpc3RlbnQgbWF4LXdpZHRoPVwiNTAwcHhcIj5cbiAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJkZWNsaW5lTG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkZWNsaW5lTG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDb250YWN0IFVzXG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgICAgIDx2LWNhcmQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRsaW5lXCI+Q29udGFjdCBVczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUGxlYXNlIHRlbGwgdXMgd2h5IHRoaXMgcXVvdGUgaXNuJ3QgZ29vZCBmb3IgeW91LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZWNsaW5lX25vdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvdi10ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiYmxhY2tcIiBkYXJrIGZsYXQgQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlOyBkZWNsaW5lTG9hZGluZyA9IGZhbHNlO1wiPkNhbmNlbDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gZGFyayBAY2xpY2s9XCJvbkRlY2xpbmUoKVwiPlNhdmU8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICAgICAgPC92LWRpYWxvZz5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwibXktNFwiPlxuICAgICAgICAgICAgPHYtZGl2aWRlcj48L3YtZGl2aWRlcj5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgPC92LWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHttYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcbiAgICBpbXBvcnQgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cyBmcm9tICcuLi8uLi8uLi9ldmVudC1idXMvc3RvcnktZGlhbG9nLWJveC1ldmVudC1idXMnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBidXR0b25fdGV4dDogJ0Rvd25sb2FkIFN0b3J5JyxcbiAgICAgICAgICAgICAgICBwdXJjaGFzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlY2xpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlY2xpbmVfbm90ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBkaWFsb2c6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgbG9hZGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHNob3dCdXR0b246IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWNjZXB0TG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVjbGluZUxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFzc2V0RGVjbGluZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgYXNzZXRUeXBlOiAnJyxcblxuICAgICAgICAgICAgICAgIGV4cGlyZWQ6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHN0b3J5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaW5kZXg6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICAuLi5tYXBHZXR0ZXJzKHtcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogJ2dldFNldHRpbmdzT2JqZWN0J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5hc3NldFR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICB0aGlzLmdldElzUHVyY2hhc2VkQXNzZXQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcnkuY29sbGVjdGlvbl9zdGF0dXMgPT09ICdleHBpcmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGxvYWRlcigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5sb2FkZXJcbiAgICAgICAgICAgICAgICB0aGlzW2xdID0gIXRoaXNbbF1cblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2xdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3T3JkZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0sIDMwMDApXG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBzaG93RG93bmxvYWRCdXR0b24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QnV0dG9uID0gIXRoaXMuc2hvd0J1dHRvbjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdvVG9EZXRhaWwoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICdjbGllbnRfc3RvcnlfZGV0YWlsJywgcGFyYW1zOiB7J2FscGhhX2lkJzogdGhpcy5zdG9yeS5hbHBoYV9pZH19KVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0SW1hZ2UoaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnL2Fzc2V0cy9pbWFnZXMvcGxhY2Vob2xkZXIucG5nJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25Eb3dubG9hZFN0b3J5KCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnL2NsaWVudC9zdG9yaWVzLycgKyB0aGlzLnN0b3J5LmlkICsgJy9kb3dubG9hZCc7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdXJsO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25BY2NlcHQoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdjb2xsZWN0aW9ucy9hY2NlcHRfYXNzZXRfcHJpY2UvJyArIHRoaXMuc3RvcnkuY29sbGVjdGlvbl9zdG9yeV9pZCArICcvc3RvcnknO1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2VzcyA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFVzZXJPZmZlcnMnLCB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFVzZXJTdGF0dXMub2ZmZXJzIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY2VwdExvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRUeXBlID0gXCJwdXJjaGFzZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVyY2hhc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25EZWNsaW5lKCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAnY29sbGVjdGlvbnMvcmVqZWN0X2Fzc2V0X3ByaWNlLycgKyB0aGlzLnN0b3J5LmNvbGxlY3Rpb25fc3RvcnlfaWQgKyAnL3N0b3J5JztcbiAgICAgICAgICAgICAgICB0aGlzLmRlY2xpbmVMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGxldCBmb3JtX2RhdGEgPSAgbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgZm9ybV9kYXRhLmFwcGVuZCgncmVqZWN0aW9uX25vdGVzJywgdGhpcy5kZWNsaW5lX25vdGUpO1xuICAgICAgICAgICAgICAgIGF4aW9zLnBvc3QodXJsLCBmb3JtX2RhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MgPT09ICcxJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsaW5lTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldERlY2xpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uU3RvcnlDbGljaygpIHtcbiAgICAgICAgICAgICAgICBTdG9yeURpYWxvZ0JveEV2ZW50QnVzLiRlbWl0KCdvcGVuU3RvcnlEaWFsb2cnLCB0aGlzLnN0b3J5KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldElzUHVyY2hhc2VkQXNzZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gXCJzdG9yeVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0b3J5LnN0b3J5X2NvbGxlY3Rpb25zICYmIHRoaXMuc3Rvcnkuc3RvcnlfY29sbGVjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtbGF5b3V0XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJjZC1ib3hcIiwgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiB9IH0sIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZGktY29udGVudFwiLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcInVybChcIiArIF92bS5nZXRJbWFnZShfdm0uc3RvcnkudGh1bWIpICsgXCIpXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLm9uU3RvcnlDbGljaygpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF92bS5wdXJjaGFzZWRcbiAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNkaS1sYWJlbFwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidi10b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB0b3A6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHNpemU6IFwiMjVweFwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwibW9uZXlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbX3ZtLl92KFwiUHVyY2hhc2VkXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX3ZtLmRlY2xpbmVcbiAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNkaS1sYWJlbFwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidi10b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB0b3A6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IHNpemU6IFwiMjVweFwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiZXJyb3Jfb3V0bGluZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJEZWNsaW5lZFwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5zdG9yeS5mbGFnZ2VkID09PSAxXG4gICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJob3Qtc3RvcnlcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhvdC1zdG9yeS1jb250ZW50XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJIT1RcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgIF1cbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ2OiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInBiLTBcIjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHsgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5LnRpdGxlKSB9IH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjZC10aW1lXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uX2YoXCJjb252ZXJ0RGF0ZVwiKShfdm0uc3RvcnkuZGF0ZV9pbmdlc3RlZCkpKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwicmVhZG1vcmVcIikoX3ZtLnN0b3J5LmV4Y2VycHQsIDIwMCwgXCIuLi5cIikpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfdm0udHlwZSA9PT0gXCJvZmZlcmVkXCIgfHwgX3ZtLnR5cGUgPT09IFwicHVyY2hhc2VkXCJcbiAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInF1b3RlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbjogXCJcIiwgXCJmaWxsLWhlaWdodFwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeS5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQbGF0Zm9ybTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjb252ZXJ0SHlwaGVuVG9TcGFjZVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc3RvcnkucGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeS5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMZW5ndGg6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNldHRpbmdzLnByaWNpbmcubGVuZ3RoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5LnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBiLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2V0dGluZ3MucHJpY2luZy50eXBlW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeS50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5leHBpcmVkXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIsIFwicGwtM1wiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTNcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgIE5vIExvbmdlciBBdmFpbGFibGVcXG4gICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmFzc2V0VHlwZSA9PT0gXCJwdXJjaGFzZWRcIlxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYi0zXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBibG9jazogXCJcIiwgZGFyazogXCJcIiwgbGFyZ2U6IFwiXCIsIGNvbG9yOiBcImRhcmtcIiB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5nb1RvRGV0YWlsKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgIFZpZXdcXG4gICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0ubG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkRvd25sb2FkU3RvcnkoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgXCIgKyBfdm0uX3MoX3ZtLmJ1dHRvbl90ZXh0KSArIFwiXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLmFzc2V0VHlwZSA9PT0gXCJwdXJjaGFzZWRcIlxuICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXB0aW9uIHRleHQteHMtY2VudGVyIHB0LTJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJsaWNlbnNlRXhwaXJlZFwiKShfdm0uc3RvcnkubGljZW5zZV9lbmRzX2F0KVxuICAgICAgICAgICAgICAgICAgICAgICkgKyBcIlxcbiAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uc3RvcnkuY29sbGVjdGlvbl9zdGF0dXMgPT09IFwicmVxdWVzdGVkXCJcbiAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbX2MoXCJwXCIsIFtfdm0uX3YoXCJXYWl0aW5nIGZvciBxdW90ZVwiKV0pXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmFjY2VwdExvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5hY2NlcHRMb2FkaW5nIHx8IF92bS5hc3NldERlY2xpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkFjY2VwdCgpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICDCo1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uX2YoXCJudW1iZXJGb3JtYXRcIikoX3ZtLnN0b3J5LmZpbmFsX3ByaWNlKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIgLSBCdXkgTm93XFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwic21hbGxcIiwgW192bS5fdihcIkRvbid0IGxpa2UgdGhpcyBvZmZlcj9cIildKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiYnJcIiksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwidi1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcGVyc2lzdGVudDogXCJcIiwgXCJtYXgtd2lkdGhcIjogXCI1MDBweFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5kaWFsb2csXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRpYWxvZyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkaWFsb2dcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5kZWNsaW5lTG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5kZWNsaW5lTG9hZGluZyB8fCBfdm0uYXNzZXREZWNsaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgQ29udGFjdCBVc1xcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtY2FyZC10aXRsZVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRsaW5lXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkNvbnRhY3QgVXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJncmlkLWxpc3QtbWRcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHRhcmVhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGxlYXNlIHRlbGwgdXMgd2h5IHRoaXMgcXVvdGUgaXNuJ3QgZ29vZCBmb3IgeW91LlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiMTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmRlY2xpbmVfbm90ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWNsaW5lX25vdGUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJkZWNsaW5lX25vdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLWFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgY29sb3I6IFwiYmxhY2tcIiwgZGFyazogXCJcIiwgZmxhdDogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kaWFsb2cgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRlY2xpbmVMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiQ2FuY2VsXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGFyazogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkRlY2xpbmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJTYXZlXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJteS00XCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICBbX2MoXCJ2LWRpdmlkZXJcIildLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNGZhOWI0OWNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTRmYTliNDljXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0wZGM1NDIzOFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMGRjNTQyMzhcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wZGM1NDIzOFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3ODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxheW91dFxuICAgICAgICAgICAgcm93IHdyYXBcbiAgICAgICAgICAgIGNsYXNzPVwiY2QtYm94XCI+XG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMz5cbiAgICAgICAgICAgIDx2LWNhcmQ+XG4gICAgICAgICAgICAgICAgPHYtY2FyZC1tZWRpYVxuICAgICAgICAgICAgICAgICAgICAgICAgOnNyYz1cInZpZGVvLnRodW1iID8gdmlkZW8udGh1bWIgOiAgKHZpZGVvLmltYWdlID8gdmlkZW8uaW1hZ2UgOiAnL2Fzc2V0cy9pbWFnZXMvcGxhY2Vob2xkZXIucG5nJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMjUwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25WaWRlb0RpYWxvZygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2xpZW50LXZpZGVvLXRodW1ibmFpbCBjZGktY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2RpLWxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwicHVyY2hhc2VkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di10b29sdGlwIHRvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIHNpemU9XCIyNXB4XCI+bW9uZXk8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlB1cmNoYXNlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10b29sdGlwPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2RpLWxhYmVsXCIgdi1pZj1cImRlY2xpbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRvb2x0aXAgdG9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdD1cImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24gc2l6ZT1cIjI1cHhcIj5lcnJvcl9vdXRsaW5lPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EZWNsaW5lZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10b29sdGlwPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cbiAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDY+XG4gICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHBiLTA+XG4gICAgICAgICAgICAgICAgICAgIDxoMiB2LWh0bWw9XCJ2aWRlby50aXRsZVwiPjwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZC10aW1lXCI+e3sgdmlkZW8udXBkYXRlZF9hdCB8IGNvbnZlcnREYXRlIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3sgdmlkZW8uZGVzY3JpcHRpb24gfCByZWFkbW9yZSgzMDAsICcgLi4uJyl9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdW90ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInR5cGUgPT09ICdvZmZlcmVkJyB8fCB0eXBlID09PSAncHVyY2hhc2VkJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsLWhlaWdodD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4czEyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBiLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInZpZGVvLnBsYXRmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBsYXRmb3JtOiB7eyB2aWRlby5wbGF0Zm9ybSB8IGNvbnZlcnRIeXBoZW5Ub1NwYWNlIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYi0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJ2aWRlby5wbGF0Zm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5MZW5ndGg6IHt7IHNldHRpbmdzLnByaWNpbmcubGVuZ3RoW3ZpZGVvLmxlbmd0aF0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidmlkZW8udHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UeXBlOiB7eyBzZXR0aW5ncy5wcmljaW5nLnR5cGVbdmlkZW8udHlwZV0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidmlkZW8uY3JlZGl0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBsZWFzZSBDcmVkaXQ6IHt7IHZpZGVvLmNyZWRpdCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB2LWlmPVwiZXhwaXJlZFwiIHhzMTIgc20xMiBtZDMgcGwtMz5cbiAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIE5vIExvbmdlciBBdmFpbGFibGVcbiAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJ2aWRlby5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gJ3JlcXVlc3RlZCdcIlxuICAgICAgICAgICAgICAgIHhzMTIgc20xMiBtZDMgcGwtM1xuICAgICAgICAgICAgICAgIGFsaWduLWNvbnRlbnQtY2VudGVyIGp1c3RpZnktY2VudGVyPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlciBkYXJrZW4tNFwiPldhaXRpbmcgZm9yIHF1b3RlPC9wPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHYtZWxzZS1pZj1cImFzc2V0VHlwZSA9PT0gJ3B1cmNoYXNlZCcgfHwgdmlkZW8ucHVyY2hhc2VkXCIgeHMxMiBzbTEyIG1kMyBwbC0zPlxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiZ29Ub0RldGFpbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgVmlld1xuICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrLm5hdGl2ZT1cIm9uRG93bmxvYWRWaWRlbygpXCJcbiAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwibG9hZGluZ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgYnV0dG9uX3RleHQgfX1cbiAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXB0aW9uIHRleHQteHMtY2VudGVyIHB0LTJcIlxuICAgICAgICAgICAgICAgICB2LWlmPVwiYXNzZXRUeXBlID09PSAncHVyY2hhc2VkJ1wiPnt7IHZpZGVvLmxpY2Vuc2VfZW5kc19hdCB8IGxpY2Vuc2VFeHBpcmVkIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB2LWVsc2UgeHMxMiBzbTEyIG1kMyBwbC0zPlxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJhY2NlcHRMb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiYWNjZXB0TG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25BY2NlcHQoKVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIMKje3sgdmlkZW8uZmluYWxfcHJpY2UgfCBudW1iZXJGb3JtYXQgfX0gLSBCdXkgTm93XG4gICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICA8c21hbGw+RG9uJ3QgbGlrZSB0aGlzIG9mZmVyPzwvc21hbGw+XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8di1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiIHBlcnNpc3RlbnQgbWF4LXdpZHRoPVwiNTAwcHhcIj5cbiAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJkZWNsaW5lTG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkZWNsaW5lTG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDb250YWN0IFVzXG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgICAgIDx2LWNhcmQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRsaW5lXCI+Q29udGFjdCBVczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUGxlYXNlIHRlbGwgdXMgd2h5IHRoaXMgcXVvdGUgaXNuJ3QgZ29vZCBmb3IgeW91LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZWNsaW5lX25vdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvdi10ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiYmxhY2tcIiBkYXJrIGZsYXQgQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlOyBkZWNsaW5lTG9hZGluZyA9IGZhbHNlO1wiPkNhbmNlbDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gZGFyayBAY2xpY2s9XCJvbkRlY2xpbmUoKVwiPlNhdmU8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICAgICAgPC92LWRpYWxvZz5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwibXktMlwiPlxuICAgICAgICAgICAgPHYtZGl2aWRlcj48L3YtZGl2aWRlcj5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgPC92LWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHttYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uX3RleHQ6ICdEb3dubG9hZCBWaWRlbycsXG4gICAgICAgICAgICAgICAgcHVyY2hhc2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNsaW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNsaW5lX25vdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgZGlhbG9nOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIGxvYWRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBzaG93QnV0dG9uOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFjY2VwdExvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlY2xpbmVMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhc3NldERlY2xpbmVkOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIGV4cGlyZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgYXNzZXRUeXBlOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB2aWRlbzoge1xuICAgICAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGluZGV4OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgLi4ubWFwR2V0dGVycyh7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICdnZXRTZXR0aW5nc09iamVjdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXRUeXBlID0gdGhpcy50eXBlO1xuICAgICAgICAgICAgaWYgKHRoaXMudmlkZW8uY29sbGVjdGlvbl9zdGF0dXMgPT09ICdleHBpcmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGxvYWRlcigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5sb2FkZXI7XG4gICAgICAgICAgICAgICAgdGhpc1tsXSA9ICF0aGlzW2xdO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdPcmRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9IG51bGxcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHNob3dEb3dubG9hZEJ1dHRvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCdXR0b24gPSAhdGhpcy5zaG93QnV0dG9uO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ29Ub0RldGFpbCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ2NsaWVudF92aWRlb19kZXRhaWwnLCBwYXJhbXM6IHsnYWxwaGFfaWQnOiB0aGlzLnZpZGVvLmFscGhhX2lkfX0pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJbWFnZShpbWFnZSkge1xuICAgICAgICAgICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRvd25sb2FkVmlkZW8oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvY2xpZW50L3ZpZGVvcy8nICsgdGhpcy52aWRlby5pZCArICcvZG93bmxvYWQnO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uQWNjZXB0KCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAnY29sbGVjdGlvbnMvYWNjZXB0X2Fzc2V0X3ByaWNlLycgKyB0aGlzLnZpZGVvLmNvbGxlY3Rpb25fdmlkZW9faWQgKyAnL3ZpZGVvJztcbiAgICAgICAgICAgICAgICB0aGlzLmFjY2VwdExvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF4aW9zLnBvc3QodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VXNlck9mZmVycycsIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0VXNlclN0YXR1cy5vZmZlcnMgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldFR5cGUgPSBcInB1cmNoYXNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRlY2xpbmUoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdjb2xsZWN0aW9ucy9yZWplY3RfYXNzZXRfcHJpY2UvJyArIHRoaXMudmlkZW8uY29sbGVjdGlvbl92aWRlb19pZCArICcvdmlkZW8nO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1fZGF0YSA9ICBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICBmb3JtX2RhdGEuYXBwZW5kKCdyZWplY3Rpb25fbm90ZXMnLCB0aGlzLmRlY2xpbmVfbm90ZSk7XG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdCh1cmwsIGZvcm1fZGF0YSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2VzcyA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2xpbmVMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0RGVjbGluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsaW5lID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25WaWRlb0RpYWxvZygpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy4kcm91dGUucGF0aDtcblxuICAgICAgICAgICAgICAgIHVybCArPSAnP3R5cGU9JyArIHRoaXMudHlwZTtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJyZpZD0nICsgdGhpcy52aWRlby5hbHBoYV9pZDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRyb3V0ZS5xdWVyeS50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICcmdGFnPScgKyB0aGlzLiRyb3V0ZS5xdWVyeS50YWc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlLnF1ZXJ5LmFscGhhX2lkID0gdGhpcy52aWRlby5hbHBoYV9pZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0RW50ZXJSb3V0ZU9iamVjdCcsIHRoaXMuJHJvdXRlKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgbnVsbCwgdXJsKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kcm91dGUubmFtZSA9PT0gJ2NsaWVudF9vZmZlcmVkX2Fzc2V0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xpZW50IG9mZmVyZWQgcGFnZVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0QXNzZXRPZmZlcmVkQ3VycmVudEluZGV4JywgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hPZmZlcmVkRGlhbG9nTmV4dFByZXZpb3VzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRWaWRlb0RpYWxvZ0JveCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFZpZGVvTG9hZGluZycsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRDdXJyZW50VmlkZW9BbHBoYUlkJywgdGhpcy52aWRlby5hbHBoYV9pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRDdXJyZW50Um91dGVPYmplY3QnLCB0aGlzLiRyb3V0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRWaWRlb0RpYWxvZ0JveCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VmlkZW9Mb2FkaW5nJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ2V0VmlkZW9OZXh0QW5kUHJldkxpbmsnLCB7YWxwaGFfaWQ6IHRoaXMudmlkZW8uYWxwaGFfaWR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL3BhcnRpYWxzL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxheW91dFwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2QtYm94XCIsIGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmQtbWVkaWFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbGllbnQtdmlkZW8tdGh1bWJuYWlsIGNkaS1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBzcmM6IF92bS52aWRlby50aHVtYlxuICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLnZpZGVvLnRodW1iXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0udmlkZW8uaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLnZpZGVvLmltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiL2Fzc2V0cy9pbWFnZXMvcGxhY2Vob2xkZXIucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIyNTBweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5vblZpZGVvRGlhbG9nKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLnB1cmNoYXNlZFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2RpLWxhYmVsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHRvcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJtb25leVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJQdXJjaGFzZWRcIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0uZGVjbGluZVxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2RpLWxhYmVsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHRvcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJlcnJvcl9vdXRsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcIkRlY2xpbmVkXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kNjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInBiLTBcIjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHsgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnZpZGVvLnRpdGxlKSB9IH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjZC10aW1lXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uX2YoXCJjb252ZXJ0RGF0ZVwiKShfdm0udmlkZW8udXBkYXRlZF9hdCkpKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwicmVhZG1vcmVcIikoX3ZtLnZpZGVvLmRlc2NyaXB0aW9uLCAzMDAsIFwiIC4uLlwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfdm0udHlwZSA9PT0gXCJvZmZlcmVkXCIgfHwgX3ZtLnR5cGUgPT09IFwicHVyY2hhc2VkXCJcbiAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInF1b3RlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbjogXCJcIiwgXCJmaWxsLWhlaWdodFwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQbGF0Zm9ybTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjb252ZXJ0SHlwaGVuVG9TcGFjZVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW8ucGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMZW5ndGg6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNldHRpbmdzLnByaWNpbmcubGVuZ3RoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBiLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2V0dGluZ3MucHJpY2luZy50eXBlW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5jcmVkaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBiLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGxlYXNlIENyZWRpdDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS52aWRlby5jcmVkaXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmV4cGlyZWRcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgTm8gTG9uZ2VyIEF2YWlsYWJsZVxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0udmlkZW8uY29sbGVjdGlvbl9zdGF0dXMgPT09IFwicmVxdWVzdGVkXCJcbiAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBzbTEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgbWQzOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgXCJwbC0zXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcImFsaWduLWNvbnRlbnQtY2VudGVyXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcImp1c3RpZnktY2VudGVyXCI6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlciBkYXJrZW4tNFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIldhaXRpbmcgZm9yIHF1b3RlXCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogX3ZtLmFzc2V0VHlwZSA9PT0gXCJwdXJjaGFzZWRcIiB8fCBfdm0udmlkZW8ucHVyY2hhc2VkXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIsIFwicGwtM1wiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGJsb2NrOiBcIlwiLCBkYXJrOiBcIlwiLCBsYXJnZTogXCJcIiwgY29sb3I6IFwiZGFya1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmdvVG9EZXRhaWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgIFZpZXdcXG4gICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ub25Eb3dubG9hZFZpZGVvKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5idXR0b25fdGV4dCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmFzc2V0VHlwZSA9PT0gXCJwdXJjaGFzZWRcIlxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FwdGlvbiB0ZXh0LXhzLWNlbnRlciBwdC0yXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcImxpY2Vuc2VFeHBpcmVkXCIpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW8ubGljZW5zZV9lbmRzX2F0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSArIFwiXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYi0zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmFjY2VwdExvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmFjY2VwdExvYWRpbmcgfHwgX3ZtLmFzc2V0RGVjbGluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkFjY2VwdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICDCo1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fZihcIm51bWJlckZvcm1hdFwiKShfdm0udmlkZW8uZmluYWxfcHJpY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIiAtIEJ1eSBOb3dcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwic21hbGxcIiwgW192bS5fdihcIkRvbid0IGxpa2UgdGhpcyBvZmZlcj9cIildKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcImJyXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZGlhbG9nXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBwZXJzaXN0ZW50OiBcIlwiLCBcIm1heC13aWR0aFwiOiBcIjUwMHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5kaWFsb2csXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kaWFsb2cgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImRpYWxvZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmRlY2xpbmVMb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZGVjbGluZUxvYWRpbmcgfHwgX3ZtLmFzc2V0RGVjbGluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgQ29udGFjdCBVc1xcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtY2FyZC10aXRsZVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZGxpbmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJDb250YWN0IFVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLXRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IFwiZ3JpZC1saXN0LW1kXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRleHRhcmVhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGxlYXNlIHRlbGwgdXMgd2h5IHRoaXMgcXVvdGUgaXNuJ3QgZ29vZCBmb3IgeW91LlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBcIjEwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmRlY2xpbmVfbm90ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGVjbGluZV9ub3RlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImRlY2xpbmVfbm90ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLWFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJibGFja1wiLCBkYXJrOiBcIlwiLCBmbGF0OiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRpYWxvZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWNsaW5lTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiQ2FuY2VsXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGFyazogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkRlY2xpbmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlNhdmVcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibXktMlwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgW19jKFwidi1kaXZpZGVyXCIpXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTBkYzU0MjM4XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0wZGM1NDIzOFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL3BhcnRpYWxzL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNsaWVudC1vZmZlci1zZWN0aW9uXCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInB0LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LWNlbnRlciB0ZXh0LXVwcGVyY2FzZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmhlYWRpbmdUZXh0KSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLnRvdGFsU3RvcmllcyA8PSAwICYmXG4gICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA8PSAwICYmXG4gICAgICAgICAgICAgICFfdm0uc2VhcmNoVmlkZW9UZXJtXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJZb3UgaGF2ZSBubyBvZmZlcnMgeWV0LiBZb3UgY2FuIGJ1eSBvciByZXF1ZXN0IHF1b3RlcyBmb3IgYW55IG9mIG91clxcbiAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdGFnOiBcImFcIiwgdG86IHsgcGF0aDogXCIvdmlkZW9zXCIgfSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlZpZGVvc1wiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiLCBhbmRcXG4gICAgICAgICAgICAgICAgICAgIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdGFnOiBcImFcIiwgdG86IHsgcGF0aDogXCIvc3Rvcmllc1wiIH0gfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJTdG9yaWVzXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIuXFxuICAgICAgICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFic1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsaWRlci1jb2xvclwiOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uYWN0aXZlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogXCJ2aWRlb3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYmFkZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByaWdodDogXCJcIiwgY29sb3I6IFwiYmxhY2tcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBzbG90OiBcImJhZGdlXCIgfSwgc2xvdDogXCJiYWRnZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0udG90YWxWaWRlb3MpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZGVvc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogXCJzdG9yaWVzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJhZGdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIsIGNvbG9yOiBcImJsYWNrXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgc2xvdDogXCJiYWRnZVwiIH0sIHNsb3Q6IFwiYmFkZ2VcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnRvdGFsU3RvcmllcykpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3Rvcmllc1xcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA+IDAgfHwgX3ZtLnNlYXJjaFZpZGVvVGVybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogXCJ2aWRlb3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoVmlkZW9UZXJtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWFyY2hWaWRlb1Rlcm0gPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoVmlkZW9UZXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsVmlkZW9zIDw9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZSBjb3VsZCBub3QgZmluZCBhbnkgdmlkZW9zIG1hdGNoaW5nIHlvdXIgc2VhcmNoLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS52aWRlb3MsIGZ1bmN0aW9uKHZpZGVvLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiYXNzZXQtdmlkZW8tb2ZmZXJlZC1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IF92bS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogdmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA+IF92bS52aWRlb3NQZXJQYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXBhZ2luYXRpb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogX3ZtLm51bWJlck9mVmlkZW9QYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsLXZpc2libGVcIjogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnZpZGVvUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW9QYWdlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInZpZGVvUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFN0b3JpZXMgPiAwIHx8IF92bS5zZWFyY2hTdG9yeVRlcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFiLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IFwic3Rvcmllc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWFyY2hTdG9yeVRlcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlYXJjaFN0b3J5VGVybSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2hTdG9yeVRlcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG90YWxTdG9yaWVzIDw9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZSBjb3VsZCBub3QgZmluZCBhbnkgc3RvcmllcyBtYXRjaGluZyB5b3VyIHNlYXJjaC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uc3RvcmllcywgZnVuY3Rpb24oc3RvcnksIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJhc3NldC1zdG9yeS1vZmZlcmVkLWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IF92bS50eXBlLCBzdG9yeTogc3RvcnkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFN0b3JpZXMgPiBfdm0uc3Rvcmllc1BlclBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtcGFnaW5hdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBfdm0ubnVtYmVyT2ZTdG9yeVBhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWwtdmlzaWJsZVwiOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc3RvcnlQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeVBhZ2UgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic3RvcnlQYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNzc0ZDVlZjNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTc3NGQ1ZWYzXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hhc2VkT2ZmZXJlZENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9