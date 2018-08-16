webpackJsonp([6],{

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(744)
/* template */
var __vue_template__ = __webpack_require__(745)
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
Component.options.__file = "resources/assets/frontend/scripts/includes/StoryAssetsComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2078abe9", Component.options)
  } else {
    hotAPI.reload("data-v-2078abe9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoReloadServices = function () {
    function VideoReloadServices() {
        _classCallCheck(this, VideoReloadServices);
    }

    _createClass(VideoReloadServices, [{
        key: 'reloadAll',
        value: function reloadAll() {
            this.reloadFacebook();
            this.reloadInstagrm();
            this.reloadTwitter();
            this.reloadVideoJs();
        }
    }, {
        key: 'reloadFacebook',
        value: function reloadFacebook() {
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
        }
    }, {
        key: 'reloadTwitter',
        value: function reloadTwitter() {
            TwitterWidgetsLoader.load(function (twttr) {
                var tweets = jQuery(".tweet");

                $(tweets).each(function (t, tweet) {
                    var id = jQuery(this).attr('id');
                    twttr.widgets.createVideo(id, tweet).then(function (el) {
                        widget_type = video;
                    });
                });
            });
        }
    }, {
        key: 'reloadVideoJs',
        value: function reloadVideoJs() {

            var videojs1 = document.createElement('script');
            videojs1.type = "text/javascript";
            videojs1.src = "/assets/scripts/video.js";

            var vimeo = document.createElement('script');
            vimeo.type = "text/javascript";
            vimeo.src = "/assets/scripts/videojs-vimeo.js";
            $('body').append(videojs1);
            $('body').append(vimeo);
        }
    }, {
        key: 'reloadInstagrm',
        value: function reloadInstagrm() {
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
    }]);

    return VideoReloadServices;
}();

/* harmony default export */ __webpack_exports__["a"] = (VideoReloadServices);

/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(743)
/* template */
var __vue_template__ = __webpack_require__(746)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/stories/StoryDetailComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26a11d6e", Component.options)
  } else {
    hotAPI.reload("data-v-26a11d6e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_VideoReloadServices__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent__);
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
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        BuyQuoteButtonComponent: __WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent___default.a,
        assetComponent: __WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent___default.a
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])({
        story: 'getCurrentStory',
        assets: 'getCurrentStoryAssets'
    })),

    data: function data() {
        return {
            loading: false,
            loader: null,
            order: false
        };
    },
    created: function created() {
        this.getStoryDetail();

        var video_reload = new __WEBPACK_IMPORTED_MODULE_1__services_VideoReloadServices__["a" /* default */]();
        video_reload.reloadAll();
    },


    watch: {
        loader: function loader() {
            var _this = this;

            var l = this.loader;
            this[l] = !this[l];

            setTimeout(function () {
                return _this[l] = false;
            }, 3000);

            this.loader = null;
        }
    },

    methods: {
        onGoback: function onGoback() {
            var prevRoute = this.$store.getters.getRouteUrl;
            if (prevRoute != '') {
                this.$router.push({ name: this.$store.getters.getRouteUrl });
            } else {
                this.$router.go(-1);
            }
        },
        getStoryDetail: function getStoryDetail() {
            var alpha_id = this.$route.params.alpha_id;
            this.$store.dispatch('fetchCurrentStory', alpha_id);
        },
        dateFormater: function dateFormater(date) {
            var current_date = new Date(Date.parse(date.replace('-', '/', 'g')));
            return current_date.toDateString();
        }
    }
});

/***/ }),

/***/ 744:
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
//
//
//
//
//
//
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
            loading: false,
            loader: null,
            current_item: '',
            current_item_thumbnail: '',
            thumbnailImg: '',

            story_dialog: false,

            nextImgExists: true,
            nextImgObj: '',

            previousImgExists: true,
            previousImgObj: '',

            showVideo: false
        };
    },


    props: ['asset', 'story_id', 'assets'],

    watch: {
        loader: function loader() {
            var _this = this;

            var l = this.loader;
            this[l] = !this[l];

            setTimeout(function () {
                return _this[l] = false;
            }, 3000);

            this.loader = null;
        },
        story_dialog: function story_dialog(val) {
            if (!val) {
                this.showVideo = false;
                this.resetNextPrevious();
            }
        }
    },

    created: function created() {
        this.setImageUrl(this.asset);
    },


    methods: {
        setImageUrl: function setImageUrl(asset) {
            if (asset.mime_type === "video/mp4") {
                this.thumbnailImg = asset.thumbnail;
            } else {
                this.thumbnailImg = asset.url;
            }
        },
        downloadAsset: function downloadAsset() {
            this.loader = 'loading';
            this.loader = 'loading';
            var url = '/client/stories/' + this.story_id + '/download';
            window.location = url;
        },
        onOpenDialog: function onOpenDialog(id) {
            var _this2 = this;

            this.assets.forEach(function (item, index) {
                if (item.id === id) {
                    _this2.current_item = item;
                    _this2.nextImgObj = _this2.assets[index + 1];
                    _this2.previousImgObj = _this2.assets[index - 1];

                    if (!_this2.nextImgObj) {
                        _this2.nextImgExists = false;
                    }

                    if (!_this2.previousImgObj) {
                        _this2.previousImgExists = false;
                    }
                }
            });

            this.story_dialog = true;
        },
        onPreviousVideo: function onPreviousVideo() {
            var _this3 = this;

            this.current_item = this.previousImgObj;
            this.showVideo = false;

            this.assets.forEach(function (item, index) {
                if (item.id == _this3.current_item.id) {
                    _this3.current_item = item;
                    _this3.nextImgObj = _this3.assets[index + 1];
                    _this3.previousImgObj = _this3.assets[index - 1];

                    if (!_this3.nextImgObj) {
                        _this3.nextImgExists = false;
                        _this3.previousImgExists = true;
                    } else if (!_this3.previousImgObj) {
                        _this3.previousImgExists = false;
                        _this3.nextImgExists = true;
                    } else {
                        _this3.previousImgExists = true;
                        _this3.nextImgExists = true;
                    }
                }
            });
        },
        onNextVideo: function onNextVideo() {
            var _this4 = this;

            this.current_item = this.nextImgObj;
            this.showVideo = false;

            this.assets.forEach(function (item, index) {
                if (item.id == _this4.current_item.id) {
                    _this4.current_item = item;
                    _this4.nextImgObj = _this4.assets[index + 1];
                    _this4.previousImgObj = _this4.assets[index - 1];

                    if (!_this4.nextImgObj) {
                        _this4.nextImgExists = false;
                        _this4.previousImgExists = true;
                    } else if (!_this4.previousImgObj) {
                        _this4.previousImgExists = false;
                        _this4.nextImgExists = true;
                    } else {
                        _this4.previousImgExists = true;
                        _this4.nextImgExists = true;
                    }
                }
            });
        },
        onCloseDialogBox: function onCloseDialogBox() {
            this.story_dialog = false;
        },
        onPlayVideo: function onPlayVideo() {
            var _this5 = this;

            var promise = new Promise(function (resolve, reject) {
                _this5.showVideo = true;
                resolve();
            });

            promise.then(function () {
                setTimeout(function () {
                    _this5.$refs.playerVideo.play();
                }, 100);
            });
        },
        resetNextPrevious: function resetNextPrevious() {
            this.nextImgExists = true;
            this.nextImgObj = '';
            this.previousImgExists = true;
            this.previousImgObj = '';
        }
    }
});

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-flex",
    { attrs: { xs6: "", sm6: "", md12: "", lg12: "", xl12: "" } },
    [
      _c(
        "div",
        {
          staticClass: "thumbnail",
          style: { backgroundImage: "url(" + _vm.thumbnailImg + ")" },
          on: {
            click: function($event) {
              _vm.onOpenDialog(_vm.asset.id)
            }
          }
        },
        [
          _vm.asset.mime_type === "video/mp4"
            ? _c(
                "div",
                { staticClass: "video-icon" },
                [
                  _c("v-icon", { attrs: { dark: "", medium: "" } }, [
                    _vm._v("play_circle_outline")
                  ])
                ],
                1
              )
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          staticClass: "story-dialog-container",
          attrs: {
            "content-class": "story-dialog-container",
            "max-width": "1200px"
          },
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
                    color: "dark ma-0",
                    fab: "",
                    small: "",
                    dark: "",
                    disabled: !_vm.previousImgExists
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
                    color: "dark ma-0",
                    fab: "",
                    small: "",
                    dark: "",
                    disabled: !_vm.nextImgExists
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
          _vm.story_dialog
            ? _c(
                "v-card",
                { attrs: { flat: "" } },
                [
                  !_vm.showVideo
                    ? _c(
                        "v-card-media",
                        {
                          attrs: {
                            src:
                              _vm.current_item.mime_type === "video/mp4"
                                ? _vm.current_item.thumbnail
                                : _vm.current_item.url,
                            contain: ""
                          }
                        },
                        [
                          _vm.current_item.mime_type === "video/mp4"
                            ? _c(
                                "div",
                                {
                                  staticClass: "video-button",
                                  on: {
                                    click: function($event) {
                                      _vm.onPlayVideo()
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "dark",
                                      attrs: { dark: "", fab: "", medium: "" }
                                    },
                                    [
                                      _c(
                                        "v-icon",
                                        { attrs: { dark: "", large: "" } },
                                        [_vm._v("play_arrow")]
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            : _vm._e()
                        ]
                      )
                    : _c("v-card-media", [
                        _c(
                          "video",
                          {
                            ref: "playerVideo",
                            attrs: {
                              width: "100%",
                              height: "100%",
                              controls: ""
                            }
                          },
                          [
                            _c("source", {
                              attrs: {
                                src: _vm.current_item.url,
                                type: "video/mp4"
                              }
                            }),
                            _vm._v(
                              "\n                    Your browser does not support the video tag.\n                "
                            )
                          ]
                        )
                      ])
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2078abe9", module.exports)
  }
}

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    { staticClass: "client-story-detail-section section-space" },
    [
      _vm.story
        ? _c(
            "v-container",
            { staticClass: "py-0", attrs: { "grid-list-lg": "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c(
                    "v-flex",
                    { staticClass: "pt-0", attrs: { xs12: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 mt-0",
                          attrs: { outline: "" },
                          on: {
                            click: function($event) {
                              _vm.onGoback()
                            }
                          }
                        },
                        [
                          _c("v-icon", [_vm._v("chevron_left")]),
                          _vm._v("Go back")
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
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c(
                    "v-flex",
                    {
                      attrs: { xs12: "", sm12: "", md7: "", lg8: "", xl8: "" }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "story-content" },
                        [
                          _vm.order
                            ? _c(
                                "v-badge",
                                { attrs: { right: "", color: "black" } },
                                [
                                  _c(
                                    "span",
                                    { attrs: { slot: "badge" }, slot: "badge" },
                                    [
                                      _c(
                                        "v-icon",
                                        { attrs: { dark: "", color: "white" } },
                                        [_vm._v("done")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("h2", {
                                    domProps: {
                                      innerHTML: _vm._s(_vm.story.title)
                                    }
                                  })
                                ]
                              )
                            : _c("h2", {
                                domProps: { innerHTML: _vm._s(_vm.story.title) }
                              }),
                          _vm._v(" "),
                          _c("div", { staticClass: "caption" }, [
                            _c("span", [
                              _vm._v(
                                "Author: " + _vm._s(_vm.story.author) + " | "
                              )
                            ]),
                            _vm._v(" "),
                            _c("span", [
                              _vm._v(
                                "Created at: " +
                                  _vm._s(
                                    _vm.dateFormater(_vm.story.date_ingested)
                                  )
                              )
                            ]),
                            _c("br")
                          ]),
                          _vm._v(" "),
                          _c("div", {
                            domProps: {
                              innerHTML: _vm._s(_vm.story.description)
                            }
                          }),
                          _vm._v(" "),
                          _c("buy-quote-button-component", {
                            attrs: { type: "story", asset: _vm.story }
                          })
                        ],
                        1
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    {
                      staticClass: "client-assets",
                      attrs: { xs12: "", sm12: "", md5: "", lg4: "", xl4: "" }
                    },
                    [
                      _c("h2", [_vm._v("Assets")]),
                      _vm._v(" "),
                      _c("v-divider", {
                        staticStyle: { "margin-bottom": "20px" }
                      }),
                      _vm._v(" "),
                      _c(
                        "v-layout",
                        { attrs: { row: "", wrap: "" } },
                        _vm._l(_vm.assets, function(asset) {
                          return _vm.assets
                            ? _c("asset-component", {
                                key: asset.id,
                                attrs: {
                                  asset: asset,
                                  assets: _vm.assets,
                                  story_id: _vm.story.alpha_id
                                }
                              })
                            : _c("v-flex", { attrs: { xs12: "" } }, [
                                _c("h2", [
                                  _vm._v("Sorry no assets with this story")
                                ])
                              ])
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
    require("vue-hot-reload-api")      .rerender("data-v-26a11d6e", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9zZXJ2aWNlcy9WaWRlb1JlbG9hZFNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3RvcnlEZXRhaWxDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWU/NTY5MSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yeURldGFpbENvbXBvbmVudC52dWU/MWVmYSJdLCJuYW1lcyI6WyJWaWRlb1JlbG9hZFNlcnZpY2VzIiwicmVsb2FkRmFjZWJvb2siLCJyZWxvYWRJbnN0YWdybSIsInJlbG9hZFR3aXR0ZXIiLCJyZWxvYWRWaWRlb0pzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJzZXRUaW1lb3V0Iiwid2luZG93IiwiRkIiLCJYRkJNTCIsInBhcnNlIiwiVHdpdHRlcldpZGdldHNMb2FkZXIiLCJsb2FkIiwidHd0dHIiLCJ0d2VldHMiLCJqUXVlcnkiLCIkIiwiZWFjaCIsInQiLCJ0d2VldCIsImF0dHIiLCJ3aWRnZXRzIiwiY3JlYXRlVmlkZW8iLCJ0aGVuIiwiZWwiLCJ3aWRnZXRfdHlwZSIsInZpZGVvIiwidmlkZW9qczEiLCJ0eXBlIiwidmltZW8iLCJhcHBlbmQiLCJhc3luYyIsImluc3Rncm0iLCJFbWJlZHMiLCJwcm9jZXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7SUN4Q3FCQSxtQjs7Ozs7OztvQ0FDTjtBQUNQLGlCQUFLQyxjQUFMO0FBQ0EsaUJBQUtDLGNBQUw7QUFDQSxpQkFBS0MsYUFBTDtBQUNBLGlCQUFLQyxhQUFMO0FBQ0g7Ozt5Q0FFZ0I7QUFDYixnQkFBSSxDQUFDQyxTQUFTQyxjQUFULENBQXdCLGdCQUF4QixDQUFMLEVBQWdEO0FBQzNDLDJCQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ2pCLHdCQUFJQyxFQUFKO0FBQUEsd0JBQVFDLE1BQU1KLEVBQUVLLG9CQUFGLENBQXVCSixDQUF2QixFQUEwQixDQUExQixDQUFkO0FBQ0Esd0JBQUlELEVBQUVELGNBQUYsQ0FBaUJHLEVBQWpCLENBQUosRUFBMEI7QUFDMUJDLHlCQUFLSCxFQUFFTSxhQUFGLENBQWdCTCxDQUFoQixDQUFMO0FBQ0FFLHVCQUFHRCxFQUFILEdBQVFBLEVBQVI7QUFDQUMsdUJBQUdJLEdBQUgsR0FBUyx1RkFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLG9DQUFvQztBQUNwQywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUyxvQkFBb0IsRUFBRTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsNENBQTRDLFNBQVMsV0FBVyxFQUFFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMjA3OGFiZTlcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi0yMDc4YWJlOVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTIwNzhhYmU5XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3MDhcbi8vIG1vZHVsZSBjaHVua3MgPSA2IDciLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb1JlbG9hZFNlcnZpY2VzIHtcbiAgICByZWxvYWRBbGwoKXtcbiAgICAgICAgdGhpcy5yZWxvYWRGYWNlYm9vaygpO1xuICAgICAgICB0aGlzLnJlbG9hZEluc3RhZ3JtKCk7XG4gICAgICAgIHRoaXMucmVsb2FkVHdpdHRlcigpO1xuICAgICAgICB0aGlzLnJlbG9hZFZpZGVvSnMoKTtcbiAgICB9XG5cbiAgICByZWxvYWRGYWNlYm9vaygpIHtcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjZWJvb2stanNzZGsnKSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIChkLCBzLCBpZCkge1xuICAgICAgICAgICAgICAgIHZhciBqcywgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTtcbiAgICAgICAgICAgICAgICBqcy5pZCA9IGlkO1xuICAgICAgICAgICAgICAgIGpzLnNyYyA9IFwiaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9HQi9zZGsuanMjeGZibWw9MSZ2ZXJzaW9uPXYyLjExJmFwcElkPTE1MTA2ODg1NTUyNjUwNFwiO1xuICAgICAgICAgICAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICAgICAgICAgIH0oZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5GQi5YRkJNTC5wYXJzZSgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVsb2FkVHdpdHRlcigpe1xuICAgICAgICBUd2l0dGVyV2lkZ2V0c0xvYWRlci5sb2FkKGZ1bmN0aW9uICh0d3R0cikge1xuICAgICAgICAgICAgdmFyIHR3ZWV0cyA9IGpRdWVyeShcIi50d2VldFwiKTtcblxuICAgICAgICAgICAgJCh0d2VldHMpLmVhY2goZnVuY3Rpb24gKHQsIHR3ZWV0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgdHd0dHIud2lkZ2V0cy5jcmVhdGVWaWRlbyhpZCwgdHdlZXQpLnRoZW4oZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldF90eXBlID0gdmlkZW9cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWxvYWRWaWRlb0pzKCkge1xuXG4gICAgICAgIGxldCB2aWRlb2pzMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICB2aWRlb2pzMS50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgdmlkZW9qczEuc3JjID0gXCIvYXNzZXRzL3NjcmlwdHMvdmlkZW8uanNcIjtcblxuICAgICAgICBsZXQgdmltZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgdmltZW8udHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgICAgIHZpbWVvLnNyYyA9IFwiL2Fzc2V0cy9zY3JpcHRzL3ZpZGVvanMtdmltZW8uanNcIjtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCh2aWRlb2pzMSk7XG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQodmltZW8pO1xuXG4gICAgfVxuXG4gICAgcmVsb2FkSW5zdGFncm0oKSB7XG4gICAgICAgIHZhciBzcmMgPSAnLy9wbGF0Zm9ybS5pbnN0YWdyYW0uY29tL2VuX1VTL2VtYmVkcy5qcyc7XG4gICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgcy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgICAgIHMuYXN5bmMgPSB0cnVlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaW5zdGdybSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKHMpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5pbnN0Z3JtLkVtYmVkcy5wcm9jZXNzKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MDApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9zZXJ2aWNlcy9WaWRlb1JlbG9hZFNlcnZpY2VzLmpzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3RvcnlEZXRhaWxDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yNmExMWQ2ZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yeURldGFpbENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjZhMTFkNmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0yNmExMWQ2ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3RvcnlEZXRhaWxDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NDJcbi8vIG1vZHVsZSBjaHVua3MgPSA2IiwiPHRlbXBsYXRlPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwiY2xpZW50LXN0b3J5LWRldGFpbC1zZWN0aW9uIHNlY3Rpb24tc3BhY2VcIj5cbiAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC1sZyBjbGFzcz1cInB5LTBcIiB2LWlmPVwic3RvcnlcIj5cbiAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcCA+XG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIGNsYXNzPVwicHQtMFwiPlxuICAgICAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRsaW5lIEBjbGljaz1cIm9uR29iYWNrKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWwtMCBtdC0wXCJcbiAgICAgICAgICAgICAgICAgICAgPjx2LWljb24+Y2hldnJvbl9sZWZ0PC92LWljb24+R28gYmFjazwvdi1idG4+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ3IGxnOCB4bDg+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdG9yeS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1iYWRnZSByaWdodCBjb2xvcj1cImJsYWNrXCIgdi1pZj1cIm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cImJhZGdlXCI+PHYtaWNvbiBkYXJrIGNvbG9yPVwid2hpdGVcIj5kb25lPC92LWljb24+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiB2LWh0bWw9XCJzdG9yeS50aXRsZVwiPjwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYmFkZ2U+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiB2LWh0bWw9XCJzdG9yeS50aXRsZVwiIHYtZWxzZT48L2gyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkF1dGhvcjoge3sgc3RvcnkuYXV0aG9yIH19IHwgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNyZWF0ZWQgYXQ6IHt7IGRhdGVGb3JtYXRlcihzdG9yeS5kYXRlX2luZ2VzdGVkKSB9fTwvc3Bhbj48YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08c3Bhbj5TdGF0ZTogPHN0cm9uZz57eyBzdG9yeS5zdGF0ZSB9fTwvc3Ryb25nPiB8PC9zcGFuPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08c3Bhbj5TdGF0dXMgOiB7eyBzdG9yeS5zdGF0dXMgfX08L3NwYW4+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx2LWRpdmlkZXIgc3R5bGU9XCJtYXJnaW46IDE1cHggMFwiPjwvdi1kaXZpZGVyPi0tPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaHRtbD1cInN0b3J5LmRlc2NyaXB0aW9uXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXktcXVvdGUtYnV0dG9uLWNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6dHlwZT1cIidzdG9yeSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXNzZXQ9XCJzdG9yeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXktcXVvdGUtYnV0dG9uLWNvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDUgbGc0IHhsNCBjbGFzcz1cImNsaWVudC1hc3NldHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPkFzc2V0czwvaDI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtZGl2aWRlciBzdHlsZT1cIm1hcmdpbi1ib3R0b206MjBweDtcIj48L3YtZGl2aWRlcj5cblxuICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YXNzZXQtY29tcG9uZW50IHYtaWY9XCJhc3NldHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cImFzc2V0IGluIGFzc2V0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJhc3NldC5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphc3NldD1cImFzc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFzc2V0cz1cImFzc2V0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzdG9yeV9pZD1cInN0b3J5LmFscGhhX2lkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L2Fzc2V0LWNvbXBvbmVudD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+U29ycnkgbm8gYXNzZXRzIHdpdGggdGhpcyBzdG9yeTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgPC9zZWN0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgQXNzZXRDb21wb25lbnQgZnJvbSAnLi4vLi4vaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQnO1xuICAgIGltcG9ydCBWaWRlb1JlbG9hZFNlcnZpY2VzIGZyb20gJy4uLy4uL3NlcnZpY2VzL1ZpZGVvUmVsb2FkU2VydmljZXMnO1xuICAgIGltcG9ydCBCdXlRdW90ZUJ1dHRvbkNvbXBvbmVudCBmcm9tIFwiLi4vLi4vaW5jbHVkZXMvQnV5UXVvdGVCdXR0b25Db21wb25lbnRcIjtcblxuICAgIGltcG9ydCB7bWFwR2V0dGVyc30gZnJvbSAndnVleCc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIEJ1eVF1b3RlQnV0dG9uQ29tcG9uZW50LFxuICAgICAgICAgICAgYXNzZXRDb21wb25lbnQ6IEFzc2V0Q29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgLi4ubWFwR2V0dGVycyh7XG4gICAgICAgICAgICAgICAgc3Rvcnk6ICdnZXRDdXJyZW50U3RvcnknLFxuICAgICAgICAgICAgICAgIGFzc2V0czogJ2dldEN1cnJlbnRTdG9yeUFzc2V0cydcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9hZGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIG9yZGVyOiBmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5nZXRTdG9yeURldGFpbCgpO1xuXG4gICAgICAgICAgICB2YXIgdmlkZW9fcmVsb2FkID0gbmV3IFZpZGVvUmVsb2FkU2VydmljZXMoKTtcbiAgICAgICAgICAgIHZpZGVvX3JlbG9hZC5yZWxvYWRBbGwoKTtcbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgbG9hZGVyICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5sb2FkZXJcbiAgICAgICAgICAgICAgICB0aGlzW2xdID0gIXRoaXNbbF1cblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXNbbF0gPSBmYWxzZSksIDMwMDApXG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvbkdvYmFjaygpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldlJvdXRlID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRSb3V0ZVVybDtcbiAgICAgICAgICAgICAgICBpZihwcmV2Um91dGUgIT0gJycpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZSA6IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Um91dGVVcmx9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLmdvKC0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRTdG9yeURldGFpbCgpe1xuICAgICAgICAgICAgICAgIGxldCBhbHBoYV9pZCA9IHRoaXMuJHJvdXRlLnBhcmFtcy5hbHBoYV9pZDtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZmV0Y2hDdXJyZW50U3RvcnknLCBhbHBoYV9pZCk7XG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgICAgIGRhdGVGb3JtYXRlcihkYXRlKXtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShkYXRlLnJlcGxhY2UoJy0nLCAnLycsICdnJykpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3RvcnlEZXRhaWxDb21wb25lbnQudnVlIiwiPHRlbXBsYXRlPlxuICAgIDx2LWZsZXggeHM2IHNtNiBtZDEyIGxnMTIgeGwxMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRodW1ibmFpbFwiXG4gICAgICAgICAgICAgOnN0eWxlPVwie2JhY2tncm91bmRJbWFnZTondXJsKCcrdGh1bWJuYWlsSW1nKycpJ31cIlxuICAgICAgICAgICAgIEBjbGljaz1cIm9uT3BlbkRpYWxvZyhhc3NldC5pZClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1pY29uXCJcbiAgICAgICAgICAgICAgICAgdi1pZj1cImFzc2V0Lm1pbWVfdHlwZSA9PT0gJ3ZpZGVvL21wNCdcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIGRhcmsgbWVkaXVtPnBsYXlfY2lyY2xlX291dGxpbmU8L3YtaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIEltYWdlIG9yIFZpZGVvIGluIGRpYWxvZyAtLT5cbiAgICAgICAgPHYtZGlhbG9nXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInN0b3J5X2RpYWxvZ1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJzdG9yeS1kaWFsb2ctY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICBjb250ZW50LWNsYXNzPVwic3RvcnktZGlhbG9nLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoPVwiMTIwMHB4XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1ib3gtc3dpdGNoIHByZXZcIj5cbiAgICAgICAgICAgICAgICA8di1idG4gY29sb3I9XCJkYXJrIG1hLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICBmYWJcbiAgICAgICAgICAgICAgICAgICAgICAgc21hbGxcbiAgICAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvblByZXZpb3VzVmlkZW8oKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cIiFwcmV2aW91c0ltZ0V4aXN0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uPmNoZXZyb25fbGVmdDwvdi1pY29uPlxuICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1ib3gtc3dpdGNoIG5leHRcIj5cbiAgICAgICAgICAgICAgICA8di1idG4gY29sb3I9XCJkYXJrIG1hLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICBmYWJcbiAgICAgICAgICAgICAgICAgICAgICAgc21hbGxcbiAgICAgICAgICAgICAgICAgICAgICAgZGFya1xuICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJvbk5leHRWaWRlbygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiIW5leHRJbWdFeGlzdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5jaGV2cm9uX3JpZ2h0PC92LWljb24+XG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8di1jYXJkIGZsYXQgdi1pZj1cInN0b3J5X2RpYWxvZ1wiPlxuXG4gICAgICAgICAgICAgICAgPHYtY2FyZC1tZWRpYVxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cIiFzaG93VmlkZW9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgOnNyYz1cImN1cnJlbnRfaXRlbS5taW1lX3R5cGUgPT09ICd2aWRlby9tcDQnPyBjdXJyZW50X2l0ZW0udGh1bWJuYWlsIDogY3VycmVudF9pdGVtLnVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW8tYnV0dG9uXCIgdi1pZj1cImN1cnJlbnRfaXRlbS5taW1lX3R5cGUgPT09ICd2aWRlby9tcDQnXCIgQGNsaWNrPVwib25QbGF5VmlkZW8oKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIGRhcmsgZmFiIGNsYXNzPVwiZGFya1wiIG1lZGl1bT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uIGRhcmsgbGFyZ2U+cGxheV9hcnJvdzwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQtbWVkaWE+XG5cbiAgICAgICAgICAgICAgICA8di1jYXJkLW1lZGlhIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPHZpZGVvIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBjb250cm9scyByZWY9XCJwbGF5ZXJWaWRlb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSA6c3JjPVwiY3VycmVudF9pdGVtLnVybFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSB2aWRlbyB0YWcuXG4gICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICAgPC92LWNhcmQtbWVkaWE+XG4gICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgPC92LWRpYWxvZz5cblxuICAgIDwvdi1mbGV4PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBjdXJyZW50X2l0ZW06ICcnLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRfaXRlbV90aHVtYm5haWw6ICcnLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZzogJycsXG5cbiAgICAgICAgICAgICAgICBzdG9yeV9kaWFsb2c6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgbmV4dEltZ0V4aXN0czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuZXh0SW1nT2JqOiAnJyxcblxuICAgICAgICAgICAgICAgIHByZXZpb3VzSW1nRXhpc3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzSW1nT2JqOiAnJyxcblxuICAgICAgICAgICAgICAgIHNob3dWaWRlbzogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJvcHM6IFtcbiAgICAgICAgICAgICdhc3NldCcsXG4gICAgICAgICAgICAnc3RvcnlfaWQnLFxuICAgICAgICAgICAgJ2Fzc2V0cydcbiAgICAgICAgXSxcblxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgbG9hZGVyKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLmxvYWRlclxuICAgICAgICAgICAgICAgIHRoaXNbbF0gPSAhdGhpc1tsXVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAodGhpc1tsXSA9IGZhbHNlKSwgMzAwMClcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbnVsbFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RvcnlfZGlhbG9nKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXROZXh0UHJldmlvdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW1hZ2VVcmwodGhpcy5hc3NldCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgc2V0SW1hZ2VVcmwoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQubWltZV90eXBlID09PSBcInZpZGVvL21wNFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsSW1nID0gYXNzZXQudGh1bWJuYWlsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsSW1nID0gYXNzZXQudXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRvd25sb2FkQXNzZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSAnbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9ICcvY2xpZW50L3N0b3JpZXMvJyArIHRoaXMuc3RvcnlfaWQgKyAnL2Rvd25sb2FkJztcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB1cmw7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbk9wZW5EaWFsb2coaWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X2l0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nT2JqID0gdGhpcy5hc3NldHNbaW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdPYmogPSB0aGlzLmFzc2V0c1tpbmRleCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEltZ09iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJldmlvdXNJbWdPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeV9kaWFsb2cgPSB0cnVlO1xuICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICBvblByZXZpb3VzVmlkZW8oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X2l0ZW0gPSB0aGlzLnByZXZpb3VzSW1nT2JqO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PSB0aGlzLmN1cnJlbnRfaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X2l0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nT2JqID0gdGhpcy5hc3NldHNbaW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdPYmogPSB0aGlzLmFzc2V0c1tpbmRleCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEltZ09iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5wcmV2aW91c0ltZ09iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uTmV4dFZpZGVvKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9pdGVtID0gdGhpcy5uZXh0SW1nT2JqO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PSB0aGlzLmN1cnJlbnRfaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X2l0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nT2JqID0gdGhpcy5hc3NldHNbaW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdPYmogPSB0aGlzLmFzc2V0c1tpbmRleCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEltZ09iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5wcmV2aW91c0ltZ09iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uQ2xvc2VEaWFsb2dCb3goKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yeV9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uUGxheVZpZGVvKCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5wbGF5ZXJWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVzZXROZXh0UHJldmlvdXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdPYmogPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nT2JqID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtZmxleFwiLFxuICAgIHsgYXR0cnM6IHsgeHM2OiBcIlwiLCBzbTY6IFwiXCIsIG1kMTI6IFwiXCIsIGxnMTI6IFwiXCIsIHhsMTI6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGh1bWJuYWlsXCIsXG4gICAgICAgICAgc3R5bGU6IHsgYmFja2dyb3VuZEltYWdlOiBcInVybChcIiArIF92bS50aHVtYm5haWxJbWcgKyBcIilcIiB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIF92bS5vbk9wZW5EaWFsb2coX3ZtLmFzc2V0LmlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5hc3NldC5taW1lX3R5cGUgPT09IFwidmlkZW8vbXA0XCJcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInZpZGVvLWljb25cIiB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgZGFyazogXCJcIiwgbWVkaXVtOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJwbGF5X2NpcmNsZV9vdXRsaW5lXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidi1kaWFsb2dcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3J5LWRpYWxvZy1jb250YWluZXJcIixcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgXCJjb250ZW50LWNsYXNzXCI6IFwic3RvcnktZGlhbG9nLWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgXCJtYXgtd2lkdGhcIjogXCIxMjAwcHhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgIHZhbHVlOiBfdm0uc3RvcnlfZGlhbG9nLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICBfdm0uc3RvcnlfZGlhbG9nID0gJCR2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzdG9yeV9kaWFsb2dcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZGlhbG9nLWJveC1zd2l0Y2ggcHJldlwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrIG1hLTBcIixcbiAgICAgICAgICAgICAgICAgICAgZmFiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzbWFsbDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0ucHJldmlvdXNJbWdFeGlzdHNcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uUHJldmlvdXNWaWRlbygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiY2hldnJvbl9sZWZ0XCIpXSldLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJkaWFsb2ctYm94LXN3aXRjaCBuZXh0XCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmsgbWEtMFwiLFxuICAgICAgICAgICAgICAgICAgICBmYWI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNtYWxsOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5uZXh0SW1nRXhpc3RzXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5vbk5leHRWaWRlbygpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiY2hldnJvbl9yaWdodFwiKV0pXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5zdG9yeV9kaWFsb2dcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGZsYXQ6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICFfdm0uc2hvd1ZpZGVvXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC1tZWRpYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW50X2l0ZW0ubWltZV90eXBlID09PSBcInZpZGVvL21wNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLmN1cnJlbnRfaXRlbS50aHVtYm5haWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uY3VycmVudF9pdGVtLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jdXJyZW50X2l0ZW0ubWltZV90eXBlID09PSBcInZpZGVvL21wNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInZpZGVvLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vblBsYXlWaWRlbygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGFyazogXCJcIiwgZmFiOiBcIlwiLCBtZWRpdW06IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGRhcms6IFwiXCIsIGxhcmdlOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwicGxheV9hcnJvd1wiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF9jKFwidi1jYXJkLW1lZGlhXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpZGVvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwicGxheWVyVmlkZW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzb3VyY2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBfdm0uY3VycmVudF9pdGVtLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ2aWRlby9tcDRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgdmlkZW8gdGFnLlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTIwNzhhYmU5XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yMDc4YWJlOVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDYgNyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJzZWN0aW9uXCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJjbGllbnQtc3RvcnktZGV0YWlsLXNlY3Rpb24gc2VjdGlvbi1zcGFjZVwiIH0sXG4gICAgW1xuICAgICAgX3ZtLnN0b3J5XG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInB5LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHQtMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtbC0wIG10LTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3V0bGluZTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkdvYmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiY2hldnJvbl9sZWZ0XCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkdvIGJhY2tcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDc6IFwiXCIsIGxnODogXCJcIiwgeGw4OiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic3RvcnktY29udGVudFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1iYWRnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiLCBjb2xvcjogXCJibGFja1wiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHNsb3Q6IFwiYmFkZ2VcIiB9LCBzbG90OiBcImJhZGdlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGRhcms6IFwiXCIsIGNvbG9yOiBcIndoaXRlXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJkb25lXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKF92bS5zdG9yeS50aXRsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcImgyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5LnRpdGxlKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXV0aG9yOiBcIiArIF92bS5fcyhfdm0uc3RvcnkuYXV0aG9yKSArIFwiIHwgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ3JlYXRlZCBhdDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kYXRlRm9ybWF0ZXIoX3ZtLnN0b3J5LmRhdGVfaW5nZXN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYnJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5LmRlc2NyaXB0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYnV5LXF1b3RlLWJ1dHRvbi1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwic3RvcnlcIiwgYXNzZXQ6IF92bS5zdG9yeSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNsaWVudC1hc3NldHNcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDU6IFwiXCIsIGxnNDogXCJcIiwgeGw0OiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgW192bS5fdihcIkFzc2V0c1wiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWRpdmlkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5hc3NldHMsIGZ1bmN0aW9uKGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uYXNzZXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImFzc2V0LWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogYXNzZXQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQ6IGFzc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0czogX3ZtLmFzc2V0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yeV9pZDogX3ZtLnN0b3J5LmFscGhhX2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIlNvcnJ5IG5vIGFzc2V0cyB3aXRoIHRoaXMgc3RvcnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTI2YTExZDZlXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yNmExMWQ2ZVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gNiJdLCJzb3VyY2VSb290IjoiIn0=