webpackJsonp([1],{

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(790)
/* template */
var __vue_template__ = __webpack_require__(797)
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

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent__ = __webpack_require__(791);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_AssetStoryOfferedComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_AssetVideoOfferedComponent__ = __webpack_require__(794);
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

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(792)
/* template */
var __vue_template__ = __webpack_require__(793)
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

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_bus_story_dialog_box_event_bus__ = __webpack_require__(394);
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

/***/ 793:
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
              _vm.story.deleted_at != null
                ? _c("div", [
                    _vm._v(
                      "\n            This story has been removed from Sniffr.\n            As you already have a license you have a right to still download this story.\n        "
                    )
                  ])
                : _c(
                    "div",
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mb-3",
                          attrs: {
                            block: "",
                            dark: "",
                            large: "",
                            color: "dark"
                          },
                          on: {
                            click: function($event) {
                              _vm.goToDetail()
                            }
                          }
                        },
                        [_vm._v("\n                View\n            ")]
                      )
                    ],
                    1
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
                              [_vm._v("Cancel\n                    ")]
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
                              [_vm._v("Send")]
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

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(795)
/* template */
var __vue_template__ = __webpack_require__(796)
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

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(32);
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

/***/ 796:
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
                  _vm.video.deleted_at != null
                    ? _c("div", [
                        _vm._v(
                          "\n            This video has been removed from Sniffr.\n            As you already have a license you have a right to still download this video.\n        "
                        )
                      ])
                    : _c(
                        "div",
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "mb-3",
                              attrs: {
                                block: "",
                                dark: "",
                                large: "",
                                color: "dark"
                              },
                              on: {
                                click: function($event) {
                                  _vm.goToDetail()
                                }
                              }
                            },
                            [_vm._v("\n                View\n            ")]
                          )
                        ],
                        1
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
                                [_vm._v("Send")]
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

/***/ 797:
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
                                { key: "videos" },
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
                                { key: "stories" },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9QdXJjaGFzZWRPZmZlcmVkQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hhc2VkT2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlP2M5OTAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlPzExZTgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hh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QUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1B1cmNoYXNlZE9mZmVyZWRDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi03NzRkNWVmM1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1B1cmNoYXNlZE9mZmVyZWRDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL1B1cmNoYXNlZE9mZmVyZWRDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTc3NGQ1ZWYzXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNzc0ZDVlZjNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL1B1cmNoYXNlZE9mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA1NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjbGllbnQtb2ZmZXItc2VjdGlvblwiPlxuICAgICAgICA8IS0tIEVuZCByZWZyZXNoIHN0b3JpZXMgZGlhbG9nIGJveCAtLT5cbiAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC1sZyBjbGFzcz1cInB0LTBcIj5cbiAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQtdXBwZXJjYXNlXCI+e3sgaGVhZGluZ1RleHQgfX08L2gyPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIiB2LWlmPVwidG90YWxTdG9yaWVzIDw9IDAgJiYgdG90YWxWaWRlb3MgPD0gMCAmJiAhc2VhcmNoVmlkZW9UZXJtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj5Zb3UgaGF2ZSBubyBvZmZlcnMgeWV0LiBZb3UgY2FuIGJ1eSBvciByZXF1ZXN0IHF1b3RlcyBmb3IgYW55IG9mIG91clxuICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRhZz1cImFcIiAgOnRvPVwie3BhdGg6ICcvdmlkZW9zJ31cIj5WaWRlb3M8L3JvdXRlci1saW5rPiwgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdGFnPVwiYVwiIDp0bz1cIntwYXRoOiAnL3N0b3JpZXMnfVwiPlN0b3JpZXM8L3JvdXRlci1saW5rPi5cbiAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgIDx2LXRhYnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyLWNvbG9yPVwiYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYiB2LWlmPVwidG90YWxWaWRlb3MgPiAwIHx8IHNlYXJjaFZpZGVvVGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwidmlkZW9zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYmFkZ2UgcmlnaHQgY29sb3I9XCJibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwiYmFkZ2VcIj57eyB0b3RhbFZpZGVvcyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlkZW9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJhZGdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRhYj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFiIHYtaWY9XCJ0b3RhbFN0b3JpZXMgPiAwIHx8IHNlYXJjaFN0b3J5VGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwic3Rvcmllc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJhZGdlIHJpZ2h0IGNvbG9yPVwiYmxhY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cImJhZGdlXCI+e3t0b3RhbFN0b3JpZXN9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3Rvcmllc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1iYWRnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRhYi1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJ0b3RhbFZpZGVvcyA+IDAgfHwgc2VhcmNoVmlkZW9UZXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwidmlkZW9zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZC1pY29uPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaFZpZGVvVGVybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcCB2LWlmPVwidG90YWxWaWRlb3MgPD0gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPldlIGNvdWxkIG5vdCBmaW5kIGFueSB2aWRlb3MgbWF0Y2hpbmcgeW91ciBzZWFyY2guPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhc3NldC12aWRlby1vZmZlcmVkLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIodmlkZW8sIGluZGV4KSBpbiB2aWRlb3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0eXBlPVwidHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aW5kZXg9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dmlkZW89XCJ2aWRlb1wiPjwvYXNzZXQtdmlkZW8tb2ZmZXJlZC1jb21wb25lbnQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIiB2LWlmPVwidG90YWxWaWRlb3MgPiB2aWRlb3NQZXJQYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bGVuZ3RoPVwibnVtYmVyT2ZWaWRlb1BhZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidmlkZW9QYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG90YWwtdmlzaWJsZT1cIjdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmsgY29sb3I9XCJibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtcGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWItaXRlbT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGFiLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInRvdGFsU3RvcmllcyA+IDAgfHwgc2VhcmNoU3RvcnlUZXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwic3Rvcmllc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwidGV4dC14cy1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtdGV4dC1maWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmQtaWNvbj1cInNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hTdG9yeVRlcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlNlYXJjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgdi1pZj1cInRvdGFsU3RvcmllcyA8PSAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+V2UgY291bGQgbm90IGZpbmQgYW55IHN0b3JpZXMgbWF0Y2hpbmcgeW91ciBzZWFyY2guPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhc3NldC1zdG9yeS1vZmZlcmVkLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoc3RvcnksIGluZGV4KSBpbiBzdG9yaWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHlwZT1cInR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnN0b3J5PVwic3RvcnlcIj48L2Fzc2V0LXN0b3J5LW9mZmVyZWQtY29tcG9uZW50PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQteHMtY2VudGVyXCIgdi1pZj1cInRvdGFsU3RvcmllcyA+IHN0b3JpZXNQZXJQYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXBhZ2luYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6bGVuZ3RoPVwibnVtYmVyT2ZTdG9yeVBhZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwic3RvcnlQYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dG90YWwtdmlzaWJsZT1cIjdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmsgY29sb3I9XCJibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtcGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10YWItaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC92LXRhYnM+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IEFzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50IGZyb20gJy4vcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQnXG4gICAgaW1wb3J0IEFzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50IGZyb20gJy4vcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQnXG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIEFzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50LFxuICAgICAgICAgICAgQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnRcbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IG51bGwsXG4gICAgICAgICAgICAgICAgaGVhZGluZ1RleHQ6JycsXG4gICAgICAgICAgICAgICAgcGFnZToxLFxuICAgICAgICAgICAgICAgIHZpZGVvUGFnZTogMSxcbiAgICAgICAgICAgICAgICBzdG9yeVBhZ2U6MSxcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgICAgICAgICAgICBzZWFyY2hWaWRlb1Rlcm06JycsXG4gICAgICAgICAgICAgICAgc2VhcmNoU3RvcnlUZXJtOicnLFxuICAgICAgICAgICAgICAgIHRhYkl0ZW1zOlsnVmlkZW8nLCAnU3RvcmllcyddXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICBnZXQoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlLnF1ZXJ5LnR5cGU7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHNldCh2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9yaWVzOiB7XG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAnb2ZmZXJlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldE9mZmVyZWRTdG9yaWVzO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3B1cmNoYXNlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFB1cmNoYXNlZFN0b3JpZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB2aWRlb3M6IHtcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PT0gJ29mZmVyZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldE9mZmVyZWRWaWRlb3M7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnR5cGUgPT09ICdwdXJjaGFzZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFB1cmNoYXNlZFZpZGVvcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0b3JpZXNQZXJQYWdlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFN0b3JpZXNQYWdpbmF0ZU9iamVjdC5wZXJfcGFnZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG51bWJlck9mU3RvcnlQYWdlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRTdG9yaWVzUGFnaW5hdGVPYmplY3QubGFzdF9wYWdlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG90YWxTdG9yaWVzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFN0b3JpZXNQYWdpbmF0ZU9iamVjdC50b3RhbDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHZpZGVvc1BlclBhZ2UoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRWaWRlb1BhZ2luYXRlT2JqZWN0LnBlcl9wYWdlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG90YWxWaWRlb3MoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRWaWRlb1BhZ2luYXRlT2JqZWN0LnRvdGFsO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbnVtYmVyT2ZWaWRlb1BhZ2VzKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0VmlkZW9QYWdpbmF0ZU9iamVjdC5sYXN0X3BhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgdmlkZW9QYWdlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSgndmlkZW8nKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0b3J5UGFnZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSgnc3RvcnknKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICckcm91dGUnKHRvLCBuZXh0LCBwcmV2aW91cyl7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLiRyb3V0ZS5xdWVyeS5pZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLiRyb3V0ZS5xdWVyeS50eXBlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFZpZGVvVGVybSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFN0b3J5VGVybSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9ICd2aWRlb3MnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZWFyY2hWaWRlb1Rlcm0odmFsdWUpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoVmlkZW9UZXJtO1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKCd2aWRlbycpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2VhcmNoU3RvcnlUZXJtKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gdGhpcy5zZWFyY2hTdG9yeVRlcm07XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoJ3N0b3J5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRoaXMuJHJvdXRlLnF1ZXJ5LnR5cGU7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHNldERhdGEodGVybSA9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL2JlZm9yZSBzZXQgc3RvcmUgY2xlYXIgYWxsIGRhdGFcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAnb2ZmZXJlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGluZ1RleHQgPSAnWW91ciBvZmZlcnMnXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICd2aWRlbycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRPZmZlcmVkVmlkZW9zRGF0YSh0aGlzLmdldFF1ZXJ5T2JqZWN0KHRlcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICdzdG9yeScpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRPZmZlcmVkU3Rvcmllc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFJlc2V0U3RvcmllcycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFJlc2V0VmlkZW9zJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0T2ZmZXJlZFZpZGVvc0RhdGEodGhpcy5nZXRRdWVyeU9iamVjdCh0ZXJtKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0T2ZmZXJlZFN0b3JpZXNEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3B1cmNoYXNlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkaW5nVGV4dCA9ICdQdXJjaGFzZXMnXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICd2aWRlbycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQdXJjaGFzZWRWaWRlb3NEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3N0b3J5Jyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFB1cmNoYXNlZFN0b3JpZXNEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0UmVzZXRTdG9yaWVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0UmVzZXRWaWRlb3MnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQdXJjaGFzZWRWaWRlb3NEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFB1cmNoYXNlZFN0b3JpZXNEYXRhKHRoaXMuZ2V0UXVlcnlPYmplY3QodGVybSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldE9mZmVyZWRWaWRlb3NEYXRhKHF1ZXJ5T2JqZWN0ID0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdlbmVyYXRlVXJsKHF1ZXJ5T2JqZWN0LCAndmlkZW8nLCAnb2ZmZXJlZCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdmZXRjaE9mZmVyZWRWaWRlb3MnLCB1cmwpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRQdXJjaGFzZWRWaWRlb3NEYXRhKHF1ZXJ5T2JqZWN0ID0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdlbmVyYXRlVXJsKHF1ZXJ5T2JqZWN0LCAndmlkZW8nLCAncHVyY2hhc2VkJylcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hQdXJjaGFzZWRWaWRlb3MnLCB1cmwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0T2ZmZXJlZFN0b3JpZXNEYXRhKHF1ZXJ5T2JqZWN0ID0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2VuZXJhdGVVcmwocXVlcnlPYmplY3QsICdzdG9yeScsICdvZmZlcmVkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2ZldGNoT2ZmZXJlZFN0b3JpZXMnLCB1cmwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0UHVyY2hhc2VkU3Rvcmllc0RhdGEocXVlcnlPYmplY3QgPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2VuZXJhdGVVcmwocXVlcnlPYmplY3QsICdzdG9yeScsICdwdXJjaGFzZWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hQdXJjaGFzZWRTdG9yaWVzJywgdXJsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFF1ZXJ5T2JqZWN0KHRlcm0gPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAndmlkZW8nKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMudmlkZW9QYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVGVybTogdGhpcy5zZWFyY2hUZXJtXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodGVybSA9PT0gJ3N0b3J5Jyl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnN0b3J5UGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFRlcm06IHRoaXMuc2VhcmNoVGVybVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hUZXJtOiB0aGlzLnNlYXJjaFRlcm1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2VuZXJhdGVVcmwocXVlcnlPYmplY3QsIHR5cGUgPSBudWxsLCB0ZXJtPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9Jyc7XG4gICAgICAgICAgICAgICAgaWYodHlwZSA9PT0gJ3ZpZGVvJyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICdvZmZlcmVkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnL2NsaWVudC92aWRlb3Mvb2ZmZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAncHVyY2hhc2VkJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSAnL2NsaWVudC92aWRlb3MvcHVyY2hhc2VkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHR5cGUgPT09ICdzdG9yeScpe1xuICAgICAgICAgICAgICAgICAgICBpZih0ZXJtID09PSAnb2ZmZXJlZCcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gJy9jbGllbnQvc3Rvcmllcy9vZmZlcmVkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlcm0gPT09ICdwdXJjaGFzZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9ICcvY2xpZW50L3N0b3JpZXMvcHVyY2hhc2VkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChxdWVyeU9iamVjdC5wYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICc/cGFnZT0nICsgcXVlcnlPYmplY3QucGFnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocXVlcnlPYmplY3Quc2VhcmNoVGVybSAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJyZzZWFyY2g9JyArIHF1ZXJ5T2JqZWN0LnNlYXJjaFRlcm07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL1B1cmNoYXNlZE9mZmVyZWRDb21wb25lbnQudnVlIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00ZmE5YjQ5Y1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0Fzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFN0b3J5T2ZmZXJlZENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNGZhOWI0OWNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi00ZmE5YjQ5Y1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3OTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxheW91dCByb3cgd3JhcFxuICAgICAgICAgICAgICBjbGFzcz1cImNkLWJveFwiPlxuICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDM+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2RpLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICA6c3R5bGU9XCJ7YmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyBnZXRJbWFnZShzdG9yeS50aHVtYikgKyAnKScgfVwiXG4gICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uU3RvcnlDbGljaygpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNkaS1sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICB2LWlmPVwicHVyY2hhc2VkXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtdG9vbHRpcCB0b3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gc2xvdD1cImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwid2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIHNpemU9XCIyNXB4XCI+bW9uZXk8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QdXJjaGFzZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvdi10b29sdGlwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNkaS1sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICB2LWlmPVwiZGVjbGluZVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LXRvb2x0aXAgdG9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzaXplPVwiMjVweFwiPmVycm9yX291dGxpbmU8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRlY2xpbmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtdG9vbHRpcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3Qtc3RvcnlcIlxuICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInN0b3J5LmZsYWdnZWQgPT09IDFcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdC1zdG9yeS1jb250ZW50XCI+SE9UPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ2IHBsLTM+XG5cbiAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgcGItMD5cblxuICAgICAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwic3RvcnkudGl0bGVcIj48L2gyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2QtdGltZVwiPnt7IHN0b3J5LmRhdGVfaW5nZXN0ZWQgfCBjb252ZXJ0RGF0ZSB9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3sgc3RvcnkuZXhjZXJwdCB8IHJlYWRtb3JlKDIwMCwgJy4uLicpIH19PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInF1b3RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidHlwZSA9PT0gJ29mZmVyZWQnIHx8IHR5cGUgPT09ICdwdXJjaGFzZWQnXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCBjb2x1bW4gZmlsbC1oZWlnaHQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwic3RvcnkucGxhdGZvcm1cIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QbGF0Zm9ybToge3sgc3RvcnkucGxhdGZvcm0gfCBjb252ZXJ0SHlwaGVuVG9TcGFjZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYi0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJzdG9yeS5wbGF0Zm9ybVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkxlbmd0aDoge3sgc2V0dGluZ3MucHJpY2luZy5sZW5ndGhbc3RvcnkubGVuZ3RoXS5uYW1lIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBiLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInN0b3J5LnR5cGVcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UeXBlOiB7eyBzZXR0aW5ncy5wcmljaW5nLnR5cGVbc3RvcnkudHlwZV0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB2LWlmPVwiZXhwaXJlZFwiIHhzMTIgc20xMiBtZDMgcGwtMz5cbiAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIE5vIExvbmdlciBBdmFpbGFibGVcbiAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXggdi1pZj1cImFzc2V0VHlwZSA9PT0gJ3B1cmNoYXNlZCdcIiB4czEyIHNtMTIgbWQzIHBsLTM+XG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJzdG9yeS5kZWxldGVkX2F0ICE9IG51bGxcIj5cbiAgICAgICAgICAgICAgICBUaGlzIHN0b3J5IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSBTbmlmZnIuXG4gICAgICAgICAgICAgICAgQXMgeW91IGFscmVhZHkgaGF2ZSBhIGxpY2Vuc2UgeW91IGhhdmUgYSByaWdodCB0byBzdGlsbCBkb3dubG9hZCB0aGlzIHN0b3J5LlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiZ29Ub0RldGFpbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgVmlld1xuICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrLm5hdGl2ZT1cIm9uRG93bmxvYWRTdG9yeSgpXCJcbiAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwibG9hZGluZ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgYnV0dG9uX3RleHQgfX1cbiAgICAgICAgICAgIDwvdi1idG4+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXB0aW9uIHRleHQteHMtY2VudGVyIHB0LTJcIlxuICAgICAgICAgICAgICAgICB2LWlmPVwiYXNzZXRUeXBlID09PSAncHVyY2hhc2VkJ1wiPnt7IHN0b3J5LmxpY2Vuc2VfZW5kc19hdCB8IGxpY2Vuc2VFeHBpcmVkIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQzIHBsLTNcbiAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJzdG9yeS5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gJ3JlcXVlc3RlZCdcIj5cbiAgICAgICAgICAgIDxwPldhaXRpbmcgZm9yIHF1b3RlPC9wPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDNcbiAgICAgICAgICAgICAgICBwbC0zXG4gICAgICAgICAgICAgICAgdi1lbHNlPlxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJhY2NlcHRMb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiYWNjZXB0TG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25BY2NlcHQoKVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIMKje3sgc3RvcnkuZmluYWxfcHJpY2UgfCBudW1iZXJGb3JtYXQgfX0gLSBCdXkgTm93XG4gICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICA8c21hbGw+RG9uJ3QgbGlrZSB0aGlzIG9mZmVyPzwvc21hbGw+XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8di1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiIHBlcnNpc3RlbnQgbWF4LXdpZHRoPVwiNTAwcHhcIj5cbiAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJkZWNsaW5lTG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkZWNsaW5lTG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDb250YWN0IFVzXG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgICAgIDx2LWNhcmQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRsaW5lXCI+Q29udGFjdCBVczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUGxlYXNlIHRlbGwgdXMgd2h5IHRoaXMgcXVvdGUgaXNuJ3QgZ29vZCBmb3IgeW91LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZWNsaW5lX25vdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvdi10ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiYmxhY2tcIiBkYXJrIGZsYXQgQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlOyBkZWNsaW5lTG9hZGluZyA9IGZhbHNlO1wiPkNhbmNlbFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBkYXJrIEBjbGljaz1cIm9uRGVjbGluZSgpXCI+U2VuZDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkLWFjdGlvbnM+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgICAgICA8L3YtZGlhbG9nPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJteS00XCI+XG4gICAgICAgICAgICA8di1kaXZpZGVyPjwvdi1kaXZpZGVyPlxuICAgICAgICA8L3YtZmxleD5cbiAgICA8L3YtbGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQge21hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xuICAgIGltcG9ydCBTdG9yeURpYWxvZ0JveEV2ZW50QnVzIGZyb20gJy4uLy4uLy4uL2V2ZW50LWJ1cy9zdG9yeS1kaWFsb2ctYm94LWV2ZW50LWJ1cyc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGJ1dHRvbl90ZXh0OiAnRG93bmxvYWQgU3RvcnknLFxuICAgICAgICAgICAgICAgIHB1cmNoYXNlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVjbGluZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVjbGluZV9ub3RlOiBudWxsLFxuICAgICAgICAgICAgICAgIGRpYWxvZzogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBsb2FkZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgc2hvd0J1dHRvbjogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhY2NlcHRMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNsaW5lTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXNzZXREZWNsaW5lZDogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBhc3NldFR5cGU6ICcnLFxuXG4gICAgICAgICAgICAgICAgZXhwaXJlZDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc3Rvcnk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogdHJ1ZVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpbmRleDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgICAgIHNldHRpbmdzOiAnZ2V0U2V0dGluZ3NPYmplY3QnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmFzc2V0VHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXNQdXJjaGFzZWRBc3NldCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9yeS5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gJ2V4cGlyZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgbG9hZGVyKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLmxvYWRlclxuICAgICAgICAgICAgICAgIHRoaXNbbF0gPSAhdGhpc1tsXVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdPcmRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwgMzAwMClcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHNob3dEb3dubG9hZEJ1dHRvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCdXR0b24gPSAhdGhpcy5zaG93QnV0dG9uO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ29Ub0RldGFpbCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ2NsaWVudF9zdG9yeV9kZXRhaWwnLCBwYXJhbXM6IHsnYWxwaGFfaWQnOiB0aGlzLnN0b3J5LmFscGhhX2lkfX0pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJbWFnZShpbWFnZSkge1xuICAgICAgICAgICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRvd25sb2FkU3RvcnkoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvY2xpZW50L3N0b3JpZXMvJyArIHRoaXMuc3RvcnkuaWQgKyAnL2Rvd25sb2FkJztcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB1cmw7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkFjY2VwdCgpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gJ2NvbGxlY3Rpb25zL2FjY2VwdF9hc3NldF9wcmljZS8nICsgdGhpcy5zdG9yeS5jb2xsZWN0aW9uX3N0b3J5X2lkICsgJy9zdG9yeSc7XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NlcHRMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VXNlck9mZmVycycsIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0VXNlclN0YXR1cy5vZmZlcnMgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldFR5cGUgPSBcInB1cmNoYXNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRlY2xpbmUoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdjb2xsZWN0aW9ucy9yZWplY3RfYXNzZXRfcHJpY2UvJyArIHRoaXMuc3RvcnkuY29sbGVjdGlvbl9zdG9yeV9pZCArICcvc3RvcnknO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1fZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIGZvcm1fZGF0YS5hcHBlbmQoJ3JlamVjdGlvbl9ub3RlcycsIHRoaXMuZGVjbGluZV9ub3RlKTtcbiAgICAgICAgICAgICAgICBheGlvcy5wb3N0KHVybCwgZm9ybV9kYXRhKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXREZWNsaW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2xpbmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblN0b3J5Q2xpY2soKSB7XG4gICAgICAgICAgICAgICAgU3RvcnlEaWFsb2dCb3hFdmVudEJ1cy4kZW1pdCgnb3BlblN0b3J5RGlhbG9nJywgdGhpcy5zdG9yeSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJc1B1cmNoYXNlZEFzc2V0KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwic3RvcnlcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdG9yeS5zdG9yeV9jb2xsZWN0aW9ucyAmJiB0aGlzLnN0b3J5LnN0b3J5X2NvbGxlY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVyY2hhc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL3BhcnRpYWxzL0Fzc2V0U3RvcnlPZmZlcmVkQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxheW91dFwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2QtYm94XCIsIGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIgfSB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2RpLWNvbnRlbnRcIixcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyBfdm0uZ2V0SW1hZ2UoX3ZtLnN0b3J5LnRodW1iKSArIFwiKVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5vblN0b3J5Q2xpY2soKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfdm0ucHVyY2hhc2VkXG4gICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjZGktbGFiZWxcIiB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdG9wOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBzaXplOiBcIjI1cHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIm1vbmV5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcIlB1cmNoYXNlZFwiKV0pXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5kZWNsaW5lXG4gICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjZGktbGFiZWxcIiB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdG9wOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaXNlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBzaXplOiBcIjI1cHhcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcImVycm9yX291dGxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbX3ZtLl92KFwiRGVjbGluZWRcIildKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfdm0uc3RvcnkuZmxhZ2dlZCA9PT0gMVxuICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaG90LXN0b3J5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJob3Qtc3RvcnktY29udGVudFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiSE9UXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICBdXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kNjogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgXCJwYi0wXCI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7IGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5zdG9yeS50aXRsZSkgfSB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2QtdGltZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLl9mKFwiY29udmVydERhdGVcIikoX3ZtLnN0b3J5LmRhdGVfaW5nZXN0ZWQpKSlcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5fZihcInJlYWRtb3JlXCIpKF92bS5zdG9yeS5leGNlcnB0LCAyMDAsIFwiLi4uXCIpKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX3ZtLnR5cGUgPT09IFwib2ZmZXJlZFwiIHx8IF92bS50eXBlID09PSBcInB1cmNoYXNlZFwiXG4gICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJxdW90ZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBjb2x1bW46IFwiXCIsIFwiZmlsbC1oZWlnaHRcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc3RvcnkucGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBiLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGxhdGZvcm06IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwiY29udmVydEh5cGhlblRvU3BhY2VcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5LnBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc3RvcnkucGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBiLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTGVuZ3RoOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZXR0aW5ncy5wcmljaW5nLmxlbmd0aFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc3RvcnkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeS50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYi0wXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNldHRpbmdzLnByaWNpbmcudHlwZVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc3RvcnkudHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZXhwaXJlZFxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtYi0zXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICBObyBMb25nZXIgQXZhaWxhYmxlXFxuICAgICAgICBcIildXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5hc3NldFR5cGUgPT09IFwicHVyY2hhc2VkXCJcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0uc3RvcnkuZGVsZXRlZF9hdCAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIFRoaXMgc3RvcnkgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIFNuaWZmci5cXG4gICAgICAgICAgICBBcyB5b3UgYWxyZWFkeSBoYXZlIGEgbGljZW5zZSB5b3UgaGF2ZSBhIHJpZ2h0IHRvIHN0aWxsIGRvd25sb2FkIHRoaXMgc3RvcnkuXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmdvVG9EZXRhaWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICAgICAgVmlld1xcbiAgICAgICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ub25Eb3dubG9hZFN0b3J5KClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIFwiICsgX3ZtLl9zKF92bS5idXR0b25fdGV4dCkgKyBcIlxcbiAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5hc3NldFR5cGUgPT09IFwicHVyY2hhc2VkXCJcbiAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FwdGlvbiB0ZXh0LXhzLWNlbnRlciBwdC0yXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwibGljZW5zZUV4cGlyZWRcIikoX3ZtLnN0b3J5LmxpY2Vuc2VfZW5kc19hdClcbiAgICAgICAgICAgICAgICAgICAgICApICsgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLnN0b3J5LmNvbGxlY3Rpb25fc3RhdHVzID09PSBcInJlcXVlc3RlZFwiXG4gICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIsIFwicGwtM1wiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW19jKFwicFwiLCBbX3ZtLl92KFwiV2FpdGluZyBmb3IgcXVvdGVcIildKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTNcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5hY2NlcHRMb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uYWNjZXB0TG9hZGluZyB8fCBfdm0uYXNzZXREZWNsaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ub25BY2NlcHQoKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgwqNcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLl9mKFwibnVtYmVyRm9ybWF0XCIpKF92bS5zdG9yeS5maW5hbF9wcmljZSkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIC0gQnV5IE5vd1xcbiAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInNtYWxsXCIsIFtfdm0uX3YoXCJEb24ndCBsaWtlIHRoaXMgb2ZmZXI/XCIpXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImJyXCIpLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInYtZGlhbG9nXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHBlcnNpc3RlbnQ6IFwiXCIsIFwibWF4LXdpZHRoXCI6IFwiNTAwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZGlhbG9nLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kaWFsb2cgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3RlbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsYXJnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0uZGVjbGluZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uZGVjbGluZUxvYWRpbmcgfHwgX3ZtLmFzc2V0RGVjbGluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgIENvbnRhY3QgVXNcXG4gICAgICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWNhcmQtdGl0bGVcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJoZWFkbGluZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJDb250YWN0IFVzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IFwiZ3JpZC1saXN0LW1kXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0YXJlYVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBsZWFzZSB0ZWxsIHVzIHdoeSB0aGlzIHF1b3RlIGlzbid0IGdvb2QgZm9yIHlvdS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBcIjEwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5kZWNsaW5lX25vdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGVjbGluZV9ub3RlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGVjbGluZV9ub3RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1hY3Rpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtc3BhY2VyXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcImJsYWNrXCIsIGRhcms6IFwiXCIsIGZsYXQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWNsaW5lTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIkNhbmNlbFxcbiAgICAgICAgICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGFyazogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkRlY2xpbmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJTZW5kXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJteS00XCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICBbX2MoXCJ2LWRpdmlkZXJcIildLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNGZhOWI0OWNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTRmYTliNDljXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRTdG9yeU9mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3OTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0wZGM1NDIzOFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9wYXJ0aWFscy9Bc3NldFZpZGVvT2ZmZXJlZENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMGRjNTQyMzhcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0wZGM1NDIzOFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3OTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiPHRlbXBsYXRlPlxuICAgIDx2LWxheW91dFxuICAgICAgICAgICAgcm93IHdyYXBcbiAgICAgICAgICAgIGNsYXNzPVwiY2QtYm94XCI+XG4gICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kMz5cbiAgICAgICAgICAgIDx2LWNhcmQ+XG4gICAgICAgICAgICAgICAgPHYtY2FyZC1tZWRpYVxuICAgICAgICAgICAgICAgICAgICAgICAgOnNyYz1cInZpZGVvLnRodW1iID8gdmlkZW8udGh1bWIgOiAgKHZpZGVvLmltYWdlID8gdmlkZW8uaW1hZ2UgOiAnL2Fzc2V0cy9pbWFnZXMvcGxhY2Vob2xkZXIucG5nJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMjUwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25WaWRlb0RpYWxvZygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2xpZW50LXZpZGVvLXRodW1ibmFpbCBjZGktY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2RpLWxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwicHVyY2hhc2VkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di10b29sdGlwIHRvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJ3aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIHNpemU9XCIyNXB4XCI+bW9uZXk8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlB1cmNoYXNlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10b29sdGlwPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2RpLWxhYmVsXCIgdi1pZj1cImRlY2xpbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRvb2x0aXAgdG9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdD1cImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIndoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24gc2l6ZT1cIjI1cHhcIj5lcnJvcl9vdXRsaW5lPC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EZWNsaW5lZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10b29sdGlwPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cbiAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDY+XG4gICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHBiLTA+XG4gICAgICAgICAgICAgICAgICAgIDxoMiB2LWh0bWw9XCJ2aWRlby50aXRsZVwiPjwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZC10aW1lXCI+e3sgdmlkZW8udXBkYXRlZF9hdCB8IGNvbnZlcnREYXRlIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3sgdmlkZW8uZGVzY3JpcHRpb24gfCByZWFkbW9yZSgzMDAsICcgLi4uJyl9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdW90ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInR5cGUgPT09ICdvZmZlcmVkJyB8fCB0eXBlID09PSAncHVyY2hhc2VkJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsLWhlaWdodD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4czEyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBiLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cInZpZGVvLnBsYXRmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBsYXRmb3JtOiB7eyB2aWRlby5wbGF0Zm9ybSB8IGNvbnZlcnRIeXBoZW5Ub1NwYWNlIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHMxMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwYi0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCJ2aWRlby5wbGF0Zm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5MZW5ndGg6IHt7IHNldHRpbmdzLnByaWNpbmcubGVuZ3RoW3ZpZGVvLmxlbmd0aF0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidmlkZW8udHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UeXBlOiB7eyBzZXR0aW5ncy5wcmljaW5nLnR5cGVbdmlkZW8udHlwZV0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGItMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwidmlkZW8uY3JlZGl0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBsZWFzZSBDcmVkaXQ6IHt7IHZpZGVvLmNyZWRpdCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB2LWlmPVwiZXhwaXJlZFwiIHhzMTIgc20xMiBtZDMgcGwtMz5cbiAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIE5vIExvbmdlciBBdmFpbGFibGVcbiAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJ2aWRlby5jb2xsZWN0aW9uX3N0YXR1cyA9PT0gJ3JlcXVlc3RlZCdcIlxuICAgICAgICAgICAgICAgIHhzMTIgc20xMiBtZDMgcGwtM1xuICAgICAgICAgICAgICAgIGFsaWduLWNvbnRlbnQtY2VudGVyIGp1c3RpZnktY2VudGVyPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlciBkYXJrZW4tNFwiPldhaXRpbmcgZm9yIHF1b3RlPC9wPlxuICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICA8di1mbGV4IHYtZWxzZS1pZj1cImFzc2V0VHlwZSA9PT0gJ3B1cmNoYXNlZCcgfHwgdmlkZW8ucHVyY2hhc2VkXCIgeHMxMiBzbTEyIG1kMyBwbC0zPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwidmlkZW8uZGVsZXRlZF9hdCAhPSBudWxsXCI+XG4gICAgICAgICAgICAgICAgVGhpcyB2aWRlbyBoYXMgYmVlbiByZW1vdmVkIGZyb20gU25pZmZyLlxuICAgICAgICAgICAgICAgIEFzIHlvdSBhbHJlYWR5IGhhdmUgYSBsaWNlbnNlIHlvdSBoYXZlIGEgcmlnaHQgdG8gc3RpbGwgZG93bmxvYWQgdGhpcyB2aWRlby5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiB2LWVsc2U+XG4gICAgICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImdvVG9EZXRhaWwoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgIFZpZXdcbiAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICBibG9ja1xuICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljay5uYXRpdmU9XCJvbkRvd25sb2FkVmlkZW8oKVwiXG4gICAgICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cImxvYWRpbmdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt7IGJ1dHRvbl90ZXh0IH19XG4gICAgICAgICAgICA8L3YtYnRuPlxuXG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXB0aW9uIHRleHQteHMtY2VudGVyIHB0LTJcIlxuICAgICAgICAgICAgICAgICB2LWlmPVwiYXNzZXRUeXBlID09PSAncHVyY2hhc2VkJ1wiPnt7IHZpZGVvLmxpY2Vuc2VfZW5kc19hdCB8IGxpY2Vuc2VFeHBpcmVkIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB2LWVsc2UgeHMxMiBzbTEyIG1kMyBwbC0zPlxuICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2VcbiAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJhY2NlcHRMb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiYWNjZXB0TG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25BY2NlcHQoKVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiPlxuICAgICAgICAgICAgICAgIMKje3sgdmlkZW8uZmluYWxfcHJpY2UgfCBudW1iZXJGb3JtYXQgfX0gLSBCdXkgTm93XG4gICAgICAgICAgICA8L3YtYnRuPlxuXG4gICAgICAgICAgICA8c21hbGw+RG9uJ3QgbGlrZSB0aGlzIG9mZmVyPzwvc21hbGw+XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8di1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiIHBlcnNpc3RlbnQgbWF4LXdpZHRoPVwiNTAwcHhcIj5cbiAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q9XCJhY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJkZWNsaW5lTG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJkZWNsaW5lTG9hZGluZyB8fCBhc3NldERlY2xpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWItM1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBDb250YWN0IFVzXG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cblxuICAgICAgICAgICAgICAgIDx2LWNhcmQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWRsaW5lXCI+Q29udGFjdCBVczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUGxlYXNlIHRlbGwgdXMgd2h5IHRoaXMgcXVvdGUgaXNuJ3QgZ29vZCBmb3IgeW91LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZWNsaW5lX25vdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvdi10ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNwYWNlcj48L3Ytc3BhY2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiYmxhY2tcIiBkYXJrIGZsYXQgQGNsaWNrLm5hdGl2ZT1cImRpYWxvZyA9IGZhbHNlOyBkZWNsaW5lTG9hZGluZyA9IGZhbHNlO1wiPkNhbmNlbDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gZGFyayBAY2xpY2s9XCJvbkRlY2xpbmUoKVwiPlNlbmQ8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8L3YtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICAgICAgPC92LWRpYWxvZz5cbiAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwibXktMlwiPlxuICAgICAgICAgICAgPHYtZGl2aWRlcj48L3YtZGl2aWRlcj5cbiAgICAgICAgPC92LWZsZXg+XG4gICAgPC92LWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHttYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uX3RleHQ6ICdEb3dubG9hZCBWaWRlbycsXG4gICAgICAgICAgICAgICAgcHVyY2hhc2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNsaW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWNsaW5lX25vdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgZGlhbG9nOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIGxvYWRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBzaG93QnV0dG9uOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFjY2VwdExvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlY2xpbmVMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhc3NldERlY2xpbmVkOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIGV4cGlyZWQ6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgYXNzZXRUeXBlOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB2aWRlbzoge1xuICAgICAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgICAgICAgICByZXF1aXJlOiB0cnVlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGluZGV4OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgLi4ubWFwR2V0dGVycyh7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICdnZXRTZXR0aW5nc09iamVjdCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXRUeXBlID0gdGhpcy50eXBlO1xuICAgICAgICAgICAgaWYgKHRoaXMudmlkZW8uY29sbGVjdGlvbl9zdGF0dXMgPT09ICdleHBpcmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGxvYWRlcigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5sb2FkZXI7XG4gICAgICAgICAgICAgICAgdGhpc1tsXSA9ICF0aGlzW2xdO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbF0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdPcmRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9IG51bGxcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHNob3dEb3dubG9hZEJ1dHRvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCdXR0b24gPSAhdGhpcy5zaG93QnV0dG9uO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ29Ub0RldGFpbCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ2NsaWVudF92aWRlb19kZXRhaWwnLCBwYXJhbXM6IHsnYWxwaGFfaWQnOiB0aGlzLnZpZGVvLmFscGhhX2lkfX0pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJbWFnZShpbWFnZSkge1xuICAgICAgICAgICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2ltYWdlcy9wbGFjZWhvbGRlci5wbmcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRvd25sb2FkVmlkZW8oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvY2xpZW50L3ZpZGVvcy8nICsgdGhpcy52aWRlby5pZCArICcvZG93bmxvYWQnO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uQWNjZXB0KCkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAnY29sbGVjdGlvbnMvYWNjZXB0X2Fzc2V0X3ByaWNlLycgKyB0aGlzLnZpZGVvLmNvbGxlY3Rpb25fdmlkZW9faWQgKyAnL3ZpZGVvJztcbiAgICAgICAgICAgICAgICB0aGlzLmFjY2VwdExvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF4aW9zLnBvc3QodXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzID09PSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VXNlck9mZmVycycsIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0VXNlclN0YXR1cy5vZmZlcnMgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldFR5cGUgPSBcInB1cmNoYXNlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXJjaGFzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkRlY2xpbmUoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdjb2xsZWN0aW9ucy9yZWplY3RfYXNzZXRfcHJpY2UvJyArIHRoaXMudmlkZW8uY29sbGVjdGlvbl92aWRlb19pZCArICcvdmlkZW8nO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjbGluZUxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1fZGF0YSA9ICBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICBmb3JtX2RhdGEuYXBwZW5kKCdyZWplY3Rpb25fbm90ZXMnLCB0aGlzLmRlY2xpbmVfbm90ZSk7XG4gICAgICAgICAgICAgICAgYXhpb3MucG9zdCh1cmwsIGZvcm1fZGF0YSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2VzcyA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2xpbmVMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0RGVjbGluZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNsaW5lID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25WaWRlb0RpYWxvZygpIHtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy4kcm91dGUucGF0aDtcblxuICAgICAgICAgICAgICAgIHVybCArPSAnP3R5cGU9JyArIHRoaXMudHlwZTtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJyZpZD0nICsgdGhpcy52aWRlby5hbHBoYV9pZDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRyb3V0ZS5xdWVyeS50YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsICs9ICcmdGFnPScgKyB0aGlzLiRyb3V0ZS5xdWVyeS50YWc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlLnF1ZXJ5LmFscGhhX2lkID0gdGhpcy52aWRlby5hbHBoYV9pZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0RW50ZXJSb3V0ZU9iamVjdCcsIHRoaXMuJHJvdXRlKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgbnVsbCwgdXJsKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kcm91dGUubmFtZSA9PT0gJ2NsaWVudF9vZmZlcmVkX2Fzc2V0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xpZW50IG9mZmVyZWQgcGFnZVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0QXNzZXRPZmZlcmVkQ3VycmVudEluZGV4JywgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hPZmZlcmVkRGlhbG9nTmV4dFByZXZpb3VzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRWaWRlb0RpYWxvZ0JveCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NldFZpZGVvTG9hZGluZycsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRDdXJyZW50VmlkZW9BbHBoYUlkJywgdGhpcy52aWRlby5hbHBoYV9pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRDdXJyZW50Um91dGVPYmplY3QnLCB0aGlzLiRyb3V0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRWaWRlb0RpYWxvZ0JveCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VmlkZW9Mb2FkaW5nJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ2V0VmlkZW9OZXh0QW5kUHJldkxpbmsnLCB7YWxwaGFfaWQ6IHRoaXMudmlkZW8uYWxwaGFfaWR9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL3BhcnRpYWxzL0Fzc2V0VmlkZW9PZmZlcmVkQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWxheW91dFwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2QtYm94XCIsIGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmQtbWVkaWFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbGllbnQtdmlkZW8tdGh1bWJuYWlsIGNkaS1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBzcmM6IF92bS52aWRlby50aHVtYlxuICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLnZpZGVvLnRodW1iXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0udmlkZW8uaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLnZpZGVvLmltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiL2Fzc2V0cy9pbWFnZXMvcGxhY2Vob2xkZXIucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIyNTBweFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5vblZpZGVvRGlhbG9nKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLnB1cmNoYXNlZFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2RpLWxhYmVsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHRvcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJtb25leVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtfdm0uX3YoXCJQdXJjaGFzZWRcIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0uZGVjbGluZVxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2RpLWxhYmVsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHRvcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgc2l6ZTogXCIyNXB4XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJlcnJvcl9vdXRsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcIkRlY2xpbmVkXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kNjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInBiLTBcIjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHsgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnZpZGVvLnRpdGxlKSB9IH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjZC10aW1lXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uX2YoXCJjb252ZXJ0RGF0ZVwiKShfdm0udmlkZW8udXBkYXRlZF9hdCkpKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwicmVhZG1vcmVcIikoX3ZtLnZpZGVvLmRlc2NyaXB0aW9uLCAzMDAsIFwiIC4uLlwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfdm0udHlwZSA9PT0gXCJvZmZlcmVkXCIgfHwgX3ZtLnR5cGUgPT09IFwicHVyY2hhc2VkXCJcbiAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInF1b3RlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbjogXCJcIiwgXCJmaWxsLWhlaWdodFwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQbGF0Zm9ybTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjb252ZXJ0SHlwaGVuVG9TcGFjZVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW8ucGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5wbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGItMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJMZW5ndGg6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNldHRpbmdzLnByaWNpbmcubGVuZ3RoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBiLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2V0dGluZ3MucHJpY2luZy50eXBlW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5jcmVkaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBiLTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGxlYXNlIENyZWRpdDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS52aWRlby5jcmVkaXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmV4cGlyZWRcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kMzogXCJcIiwgXCJwbC0zXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgTm8gTG9uZ2VyIEF2YWlsYWJsZVxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0udmlkZW8uY29sbGVjdGlvbl9zdGF0dXMgPT09IFwicmVxdWVzdGVkXCJcbiAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBzbTEyOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgbWQzOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgXCJwbC0zXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcImFsaWduLWNvbnRlbnQtY2VudGVyXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcImp1c3RpZnktY2VudGVyXCI6IFwiXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlciBkYXJrZW4tNFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIldhaXRpbmcgZm9yIHF1b3RlXCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogX3ZtLmFzc2V0VHlwZSA9PT0gXCJwdXJjaGFzZWRcIiB8fCBfdm0udmlkZW8ucHVyY2hhc2VkXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDM6IFwiXCIsIFwicGwtM1wiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0udmlkZW8uZGVsZXRlZF9hdCAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIFRoaXMgdmlkZW8gaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIFNuaWZmci5cXG4gICAgICAgICAgICBBcyB5b3UgYWxyZWFkeSBoYXZlIGEgbGljZW5zZSB5b3UgaGF2ZSBhIHJpZ2h0IHRvIHN0aWxsIGRvd25sb2FkIHRoaXMgdmlkZW8uXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmdvVG9EZXRhaWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgIFZpZXdcXG4gICAgICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkRvd25sb2FkVmlkZW8oKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmJ1dHRvbl90ZXh0KSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfdm0uYXNzZXRUeXBlID09PSBcInB1cmNoYXNlZFwiXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXB0aW9uIHRleHQteHMtY2VudGVyIHB0LTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwibGljZW5zZUV4cGlyZWRcIikoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5saWNlbnNlX2VuZHNfYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApICsgXCJcXG4gICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfYyhcbiAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQzOiBcIlwiLCBcInBsLTNcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1iLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0uYWNjZXB0TG9hZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0uYWNjZXB0TG9hZGluZyB8fCBfdm0uYXNzZXREZWNsaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uQWNjZXB0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIMKjXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9mKFwibnVtYmVyRm9ybWF0XCIpKF92bS52aWRlby5maW5hbF9wcmljZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiIC0gQnV5IE5vd1xcbiAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJzbWFsbFwiLCBbX3ZtLl92KFwiRG9uJ3QgbGlrZSB0aGlzIG9mZmVyP1wiKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiYnJcIiksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHBlcnNpc3RlbnQ6IFwiXCIsIFwibWF4LXdpZHRoXCI6IFwiNTAwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmRpYWxvZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRpYWxvZyA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYWN0aXZhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdGVudDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhcmdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBfdm0uZGVjbGluZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5kZWNsaW5lTG9hZGluZyB8fCBfdm0uYXNzZXREZWNsaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90OiBcImFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgICAgICBDb250YWN0IFVzXFxuICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1jYXJkLXRpdGxlXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJoZWFkbGluZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkNvbnRhY3QgVXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJncmlkLWxpc3QtbWRcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dGFyZWFcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQbGVhc2UgdGVsbCB1cyB3aHkgdGhpcyBxdW90ZSBpc24ndCBnb29kIGZvciB5b3UuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiMTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZGVjbGluZV9ub3RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWNsaW5lX25vdGUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGVjbGluZV9ub3RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtYWN0aW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNvbG9yOiBcImJsYWNrXCIsIGRhcms6IFwiXCIsIGZsYXQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGlhbG9nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRlY2xpbmVMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJDYW5jZWxcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkYXJrOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uRGVjbGluZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiU2VuZFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJteS0yXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICBbX2MoXCJ2LWRpdmlkZXJcIildLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMGRjNTQyMzhcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTBkYzU0MjM4XCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvcGFydGlhbHMvQXNzZXRWaWRlb09mZmVyZWRDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3OTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2xpZW50LW9mZmVyLXNlY3Rpb25cIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHQtMFwiLCBhdHRyczogeyBcImdyaWQtbGlzdC1sZ1wiOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtY2VudGVyIHRleHQtdXBwZXJjYXNlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uaGVhZGluZ1RleHQpKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0udG90YWxTdG9yaWVzIDw9IDAgJiZcbiAgICAgICAgICAgICAgX3ZtLnRvdGFsVmlkZW9zIDw9IDAgJiZcbiAgICAgICAgICAgICAgIV92bS5zZWFyY2hWaWRlb1Rlcm1cbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsIGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImgyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIllvdSBoYXZlIG5vIG9mZmVycyB5ZXQuIFlvdSBjYW4gYnV5IG9yIHJlcXVlc3QgcXVvdGVzIGZvciBhbnkgb2Ygb3VyXFxuICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB0YWc6IFwiYVwiLCB0bzogeyBwYXRoOiBcIi92aWRlb3NcIiB9IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiVmlkZW9zXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIsIGFuZFxcbiAgICAgICAgICAgICAgICAgICAgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB0YWc6IFwiYVwiLCB0bzogeyBwYXRoOiBcIi9zdG9yaWVzXCIgfSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlN0b3JpZXNcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIi5cXG4gICAgICAgICAgICAgICAgXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWJzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVyLWNvbG9yXCI6IFwiYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hY3RpdmUgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsVmlkZW9zID4gMCB8fCBfdm0uc2VhcmNoVmlkZW9UZXJtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LXRhYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogXCJ2aWRlb3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYmFkZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcmlnaHQ6IFwiXCIsIGNvbG9yOiBcImJsYWNrXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcImJhZGdlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3Q6IFwiYmFkZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnRvdGFsVmlkZW9zKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWaWRlb3NcXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsU3RvcmllcyA+IDAgfHwgX3ZtLnNlYXJjaFN0b3J5VGVybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IFwic3Rvcmllc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1iYWRnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByaWdodDogXCJcIiwgY29sb3I6IFwiYmxhY2tcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwiYmFkZ2VcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdDogXCJiYWRnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0udG90YWxTdG9yaWVzKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdG9yaWVzXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA+IDAgfHwgX3ZtLnNlYXJjaFZpZGVvVGVybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi10YWItaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogXCJ2aWRlb3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoVmlkZW9UZXJtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zZWFyY2hWaWRlb1Rlcm0gPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoVmlkZW9UZXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnRvdGFsVmlkZW9zIDw9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZSBjb3VsZCBub3QgZmluZCBhbnkgdmlkZW9zIG1hdGNoaW5nIHlvdXIgc2VhcmNoLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS52aWRlb3MsIGZ1bmN0aW9uKHZpZGVvLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiYXNzZXQtdmlkZW8tb2ZmZXJlZC1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IF92bS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogdmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFZpZGVvcyA+IF92bS52aWRlb3NQZXJQYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLWNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXBhZ2luYXRpb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogX3ZtLm51bWJlck9mVmlkZW9QYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsLXZpc2libGVcIjogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnZpZGVvUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW9QYWdlID0gJCR2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInZpZGVvUGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFN0b3JpZXMgPiAwIHx8IF92bS5zZWFyY2hTdG9yeVRlcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtdGFiLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IFwic3Rvcmllc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWFyY2hTdG9yeVRlcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlYXJjaFN0b3J5VGVybSA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2hTdG9yeVRlcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udG90YWxTdG9yaWVzIDw9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXZSBjb3VsZCBub3QgZmluZCBhbnkgc3RvcmllcyBtYXRjaGluZyB5b3VyIHNlYXJjaC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uc3RvcmllcywgZnVuY3Rpb24oc3RvcnksIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJhc3NldC1zdG9yeS1vZmZlcmVkLWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IF92bS50eXBlLCBzdG9yeTogc3RvcnkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50b3RhbFN0b3JpZXMgPiBfdm0uc3Rvcmllc1BlclBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtcGFnaW5hdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBfdm0ubnVtYmVyT2ZTdG9yeVBhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWwtdmlzaWJsZVwiOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc3RvcnlQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zdG9yeVBhZ2UgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic3RvcnlQYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNzc0ZDVlZjNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTc3NGQ1ZWYzXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvUHVyY2hhc2VkT2ZmZXJlZENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9