webpackJsonp([26],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9zZXJ2aWNlcy9WaWRlb1JlbG9hZFNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3RvcnlEZXRhaWxDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWU/NTY5MSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yeURldGFpbENvbXBvbmVudC52dWU/MWVmYSJdLCJuYW1lcyI6WyJWaWRlb1JlbG9hZFNlcnZpY2VzIiwicmVsb2FkRmFjZWJvb2siLCJyZWxvYWRJbnN0YWdybSIsInJlbG9hZFR3aXR0ZXIiLCJyZWxvYWRWaWRlb0pzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJzZXRUaW1lb3V0Iiwid2luZG93IiwiRkIiLCJYRkJNTCIsInBhcnNlIiwiVHdpdHRlcldpZGdldHNMb2FkZXIiLCJsb2FkIiwidHd0dHIiLCJ0d2VldHMiLCJqUXVlcnkiLCIkIiwiZWFjaCIsInQiLCJ0d2VldCIsImF0dHIiLCJ3aWRnZXRzIiwiY3JlYXRlVmlkZW8iLCJ0aGVuIiwiZWwiLCJ3aWRnZXRfdHlwZSIsInZpZGVvIiwidmlkZW9qczEiLCJ0eXBlIiwidmltZW8iLCJhcHBlbmQiLCJhc3luYyIsImluc3Rncm0iLCJFbWJlZHMiLCJwcm9jZXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7SUN4Q3FCQSxtQjs7Ozs7OztvQ0FDTjtBQUNQLGlCQUFLQyxjQUFMO0FBQ0EsaUJBQUtDLGNBQUw7QUFDQSxpQkFBS0MsYUFBTDtBQUNBLGlCQUFLQyxhQUFMO0FBQ0g7Ozt5Q0FFZ0I7QUFDYixnQkFBSSxDQUFDQyxTQUFTQyxjQUFULENBQXdCLGdCQUF4QixDQUFMLEVBQWdEO0FBQzNDLDJCQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ2pCLHdCQUFJQyxFQUFKO0FBQUEsd0JBQVFDLE1BQU1KLEVBQUVLLG9CQUFGLENBQXVCSixDQUF2QixFQUEwQixDQUExQixDQUFkO0FBQ0Esd0JBQUlELEVBQUVELGNBQUYsQ0FBaUJHLEVBQWpCLENBQUosRUFBMEI7QUFDMUJDLHlCQUFLSCxFQUFFTSxhQUFGLENBQWdCTCxDQUFoQixDQUFMO0FBQ0FFLHVCQUFHRCxFQUFILEdBQVFBLEVBQVI7QUFDQUMsdUJBQUdJLEdBQUgsR0FBUyx1RkFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLG9DQUFvQztBQUNwQywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUyxvQkFBb0IsRUFBRTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsNENBQTRDLFNBQVMsV0FBVyxFQUFFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTIwNzhhYmU5XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU3RvcnlBc3NldHNDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjA3OGFiZTlcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0yMDc4YWJlOVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMjYgMjciLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb1JlbG9hZFNlcnZpY2VzIHtcbiAgICByZWxvYWRBbGwoKXtcbiAgICAgICAgdGhpcy5yZWxvYWRGYWNlYm9vaygpO1xuICAgICAgICB0aGlzLnJlbG9hZEluc3RhZ3JtKCk7XG4gICAgICAgIHRoaXMucmVsb2FkVHdpdHRlcigpO1xuICAgICAgICB0aGlzLnJlbG9hZFZpZGVvSnMoKTtcbiAgICB9XG5cbiAgICByZWxvYWRGYWNlYm9vaygpIHtcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjZWJvb2stanNzZGsnKSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIChkLCBzLCBpZCkge1xuICAgICAgICAgICAgICAgIHZhciBqcywgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICAgICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTtcbiAgICAgICAgICAgICAgICBqcy5pZCA9IGlkO1xuICAgICAgICAgICAgICAgIGpzLnNyYyA9IFwiaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9HQi9zZGsuanMjeGZibWw9MSZ2ZXJzaW9uPXYyLjExJmFwcElkPTE1MTA2ODg1NTUyNjUwNFwiO1xuICAgICAgICAgICAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICAgICAgICAgIH0oZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5GQi5YRkJNTC5wYXJzZSgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVsb2FkVHdpdHRlcigpe1xuICAgICAgICBUd2l0dGVyV2lkZ2V0c0xvYWRlci5sb2FkKGZ1bmN0aW9uICh0d3R0cikge1xuICAgICAgICAgICAgdmFyIHR3ZWV0cyA9IGpRdWVyeShcIi50d2VldFwiKTtcblxuICAgICAgICAgICAgJCh0d2VldHMpLmVhY2goZnVuY3Rpb24gKHQsIHR3ZWV0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgdHd0dHIud2lkZ2V0cy5jcmVhdGVWaWRlbyhpZCwgdHdlZXQpLnRoZW4oZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldF90eXBlID0gdmlkZW9cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWxvYWRWaWRlb0pzKCkge1xuXG4gICAgICAgIGxldCB2aWRlb2pzMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICB2aWRlb2pzMS50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgdmlkZW9qczEuc3JjID0gXCIvYXNzZXRzL3NjcmlwdHMvdmlkZW8uanNcIjtcblxuICAgICAgICBsZXQgdmltZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgdmltZW8udHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgICAgIHZpbWVvLnNyYyA9IFwiL2Fzc2V0cy9zY3JpcHRzL3ZpZGVvanMtdmltZW8uanNcIjtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCh2aWRlb2pzMSk7XG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQodmltZW8pO1xuXG4gICAgfVxuXG4gICAgcmVsb2FkSW5zdGFncm0oKSB7XG4gICAgICAgIHZhciBzcmMgPSAnLy9wbGF0Zm9ybS5pbnN0YWdyYW0uY29tL2VuX1VTL2VtYmVkcy5qcyc7XG4gICAgICAgIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgcy50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgICAgIHMuYXN5bmMgPSB0cnVlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaW5zdGdybSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKHMpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5pbnN0Z3JtLkVtYmVkcy5wcm9jZXNzKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MDApO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9zZXJ2aWNlcy9WaWRlb1JlbG9hZFNlcnZpY2VzLmpzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3RvcnlEZXRhaWxDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yNmExMWQ2ZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yeURldGFpbENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjZhMTFkNmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0yNmExMWQ2ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3RvcnlEZXRhaWxDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NDJcbi8vIG1vZHVsZSBjaHVua3MgPSAyNiIsIjx0ZW1wbGF0ZT5cbiAgICA8c2VjdGlvbiBjbGFzcz1cImNsaWVudC1zdG9yeS1kZXRhaWwtc2VjdGlvbiBzZWN0aW9uLXNwYWNlXCI+XG4gICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgY2xhc3M9XCJweS0wXCIgdi1pZj1cInN0b3J5XCI+XG4gICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgPlxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInB0LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZSBAY2xpY2s9XCJvbkdvYmFjaygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1sLTAgbXQtMFwiXG4gICAgICAgICAgICAgICAgICAgID48di1pY29uPmNoZXZyb25fbGVmdDwvdi1pY29uPkdvIGJhY2s8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cblxuICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNyBsZzggeGw4PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RvcnktY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYmFkZ2UgcmlnaHQgY29sb3I9XCJibGFja1wiIHYtaWY9XCJvcmRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XCJiYWRnZVwiPjx2LWljb24gZGFyayBjb2xvcj1cIndoaXRlXCI+ZG9uZTwvdi1pY29uPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwic3RvcnkudGl0bGVcIj48L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWJhZGdlPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwic3RvcnkudGl0bGVcIiB2LWVsc2U+PC9oMj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5BdXRob3I6IHt7IHN0b3J5LmF1dGhvciB9fSB8IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DcmVhdGVkIGF0OiB7eyBkYXRlRm9ybWF0ZXIoc3RvcnkuZGF0ZV9pbmdlc3RlZCkgfX08L3NwYW4+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHNwYW4+U3RhdGU6IDxzdHJvbmc+e3sgc3Rvcnkuc3RhdGUgfX08L3N0cm9uZz4gfDwvc3Bhbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHNwYW4+U3RhdHVzIDoge3sgc3Rvcnkuc3RhdHVzIH19PC9zcGFuPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08di1kaXZpZGVyIHN0eWxlPVwibWFyZ2luOiAxNXB4IDBcIj48L3YtZGl2aWRlcj4tLT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWh0bWw9XCJzdG9yeS5kZXNjcmlwdGlvblwiPjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV5LXF1b3RlLWJ1dHRvbi1jb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR5cGU9XCInc3RvcnknXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFzc2V0PVwic3RvcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV5LXF1b3RlLWJ1dHRvbi1jb21wb25lbnQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ1IGxnNCB4bDQgY2xhc3M9XCJjbGllbnQtYXNzZXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj5Bc3NldHM8L2gyPlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LWRpdmlkZXIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOjIwcHg7XCI+PC92LWRpdmlkZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGFzc2V0LWNvbXBvbmVudCB2LWlmPVwiYXNzZXRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJhc3NldCBpbiBhc3NldHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiYXNzZXQuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXNzZXQ9XCJhc3NldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphc3NldHM9XCJhc3NldHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c3RvcnlfaWQ9XCJzdG9yeS5hbHBoYV9pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9hc3NldC1jb21wb25lbnQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPlNvcnJ5IG5vIGFzc2V0cyB3aXRoIHRoaXMgc3Rvcnk8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvc2VjdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IEFzc2V0Q29tcG9uZW50IGZyb20gJy4uLy4uL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50JztcbiAgICBpbXBvcnQgVmlkZW9SZWxvYWRTZXJ2aWNlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9WaWRlb1JlbG9hZFNlcnZpY2VzJztcbiAgICBpbXBvcnQgQnV5UXVvdGVCdXR0b25Db21wb25lbnQgZnJvbSBcIi4uLy4uL2luY2x1ZGVzL0J1eVF1b3RlQnV0dG9uQ29tcG9uZW50XCI7XG5cbiAgICBpbXBvcnQge21hcEdldHRlcnN9IGZyb20gJ3Z1ZXgnO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgICAgICBCdXlRdW90ZUJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgICAgIGFzc2V0Q29tcG9uZW50OiBBc3NldENvbXBvbmVudFxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgICAgIHN0b3J5OiAnZ2V0Q3VycmVudFN0b3J5JyxcbiAgICAgICAgICAgICAgICBhc3NldHM6ICdnZXRDdXJyZW50U3RvcnlBc3NldHMnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBvcmRlcjogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0U3RvcnlEZXRhaWwoKTtcblxuICAgICAgICAgICAgdmFyIHZpZGVvX3JlbG9hZCA9IG5ldyBWaWRlb1JlbG9hZFNlcnZpY2VzKCk7XG4gICAgICAgICAgICB2aWRlb19yZWxvYWQucmVsb2FkQWxsKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGxvYWRlciAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMubG9hZGVyXG4gICAgICAgICAgICAgICAgdGhpc1tsXSA9ICF0aGlzW2xdXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzW2xdID0gZmFsc2UpLCAzMDAwKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgb25Hb2JhY2soKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZSb3V0ZSA9IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Um91dGVVcmw7XG4gICAgICAgICAgICAgICAgaWYocHJldlJvdXRlICE9ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWUgOiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFJvdXRlVXJsfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5nbygtMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0U3RvcnlEZXRhaWwoKXtcbiAgICAgICAgICAgICAgICBsZXQgYWxwaGFfaWQgPSB0aGlzLiRyb3V0ZS5wYXJhbXMuYWxwaGFfaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2ZldGNoQ3VycmVudFN0b3J5JywgYWxwaGFfaWQpO1xuICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICBkYXRlRm9ybWF0ZXIoZGF0ZSl7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoZGF0ZS5yZXBsYWNlKCctJywgJy8nLCAnZycpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRfZGF0ZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZSIsIjx0ZW1wbGF0ZT5cbiAgICA8di1mbGV4IHhzNiBzbTYgbWQxMiBsZzEyIHhsMTI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWxcIlxuICAgICAgICAgICAgIDpzdHlsZT1cIntiYWNrZ3JvdW5kSW1hZ2U6J3VybCgnK3RodW1ibmFpbEltZysnKSd9XCJcbiAgICAgICAgICAgICBAY2xpY2s9XCJvbk9wZW5EaWFsb2coYXNzZXQuaWQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW8taWNvblwiXG4gICAgICAgICAgICAgICAgIHYtaWY9XCJhc3NldC5taW1lX3R5cGUgPT09ICd2aWRlby9tcDQnXCI+XG4gICAgICAgICAgICAgICAgPHYtaWNvbiBkYXJrIG1lZGl1bT5wbGF5X2NpcmNsZV9vdXRsaW5lPC92LWljb24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBJbWFnZSBvciBWaWRlbyBpbiBkaWFsb2cgLS0+XG4gICAgICAgIDx2LWRpYWxvZ1xuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzdG9yeV9kaWFsb2dcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwic3RvcnktZGlhbG9nLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgY29udGVudC1jbGFzcz1cInN0b3J5LWRpYWxvZy1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgIG1heC13aWR0aD1cIjEyMDBweFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctYm94LXN3aXRjaCBwcmV2XCI+XG4gICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiZGFyayBtYS0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgZmFiXG4gICAgICAgICAgICAgICAgICAgICAgIHNtYWxsXG4gICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25QcmV2aW91c1ZpZGVvKClcIlxuICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhcHJldmlvdXNJbWdFeGlzdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHYtaWNvbj5jaGV2cm9uX2xlZnQ8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctYm94LXN3aXRjaCBuZXh0XCI+XG4gICAgICAgICAgICAgICAgPHYtYnRuIGNvbG9yPVwiZGFyayBtYS0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgZmFiXG4gICAgICAgICAgICAgICAgICAgICAgIHNtYWxsXG4gICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25OZXh0VmlkZW8oKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cIiFuZXh0SW1nRXhpc3RzXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+Y2hldnJvbl9yaWdodDwvdi1pY29uPlxuICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHYtY2FyZCBmbGF0IHYtaWY9XCJzdG9yeV9kaWFsb2dcIj5cblxuICAgICAgICAgICAgICAgIDx2LWNhcmQtbWVkaWFcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XCIhc2hvd1ZpZGVvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpzcmM9XCJjdXJyZW50X2l0ZW0ubWltZV90eXBlID09PSAndmlkZW8vbXA0Jz8gY3VycmVudF9pdGVtLnRodW1ibmFpbCA6IGN1cnJlbnRfaXRlbS51cmxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvLWJ1dHRvblwiIHYtaWY9XCJjdXJyZW50X2l0ZW0ubWltZV90eXBlID09PSAndmlkZW8vbXA0J1wiIEBjbGljaz1cIm9uUGxheVZpZGVvKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBkYXJrIGZhYiBjbGFzcz1cImRhcmtcIiBtZWRpdW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBkYXJrIGxhcmdlPnBsYXlfYXJyb3c8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkLW1lZGlhPlxuXG4gICAgICAgICAgICAgICAgPHYtY2FyZC1tZWRpYSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgIDx2aWRlbyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgY29udHJvbHMgcmVmPVwicGxheWVyVmlkZW9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2UgOnNyYz1cImN1cnJlbnRfaXRlbS51cmxcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgdmlkZW8gdGFnLlxuICAgICAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICAgIDwvdi1jYXJkLW1lZGlhPlxuICAgICAgICAgICAgPC92LWNhcmQ+XG4gICAgICAgIDwvdi1kaWFsb2c+XG5cbiAgICA8L3YtZmxleD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2FkZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudF9pdGVtOiAnJyxcbiAgICAgICAgICAgICAgICBjdXJyZW50X2l0ZW1fdGh1bWJuYWlsOiAnJyxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWc6ICcnLFxuXG4gICAgICAgICAgICAgICAgc3RvcnlfZGlhbG9nOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIG5leHRJbWdFeGlzdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgbmV4dEltZ09iajogJycsXG5cbiAgICAgICAgICAgICAgICBwcmV2aW91c0ltZ0V4aXN0czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c0ltZ09iajogJycsXG5cbiAgICAgICAgICAgICAgICBzaG93VmlkZW86IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb3BzOiBbXG4gICAgICAgICAgICAnYXNzZXQnLFxuICAgICAgICAgICAgJ3N0b3J5X2lkJyxcbiAgICAgICAgICAgICdhc3NldHMnXG4gICAgICAgIF0sXG5cbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIGxvYWRlcigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5sb2FkZXJcbiAgICAgICAgICAgICAgICB0aGlzW2xdID0gIXRoaXNbbF1cblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXNbbF0gPSBmYWxzZSksIDMwMDApXG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9IG51bGxcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0b3J5X2RpYWxvZyh2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0TmV4dFByZXZpb3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEltYWdlVXJsKHRoaXMuYXNzZXQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHNldEltYWdlVXJsKGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFzc2V0Lm1pbWVfdHlwZSA9PT0gXCJ2aWRlby9tcDRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1ibmFpbEltZyA9IGFzc2V0LnRodW1ibmFpbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1ibmFpbEltZyA9IGFzc2V0LnVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkb3dubG9hZEFzc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gJ2xvYWRpbmcnO1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSAnL2NsaWVudC9zdG9yaWVzLycgKyB0aGlzLnN0b3J5X2lkICsgJy9kb3dubG9hZCc7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdXJsO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25PcGVuRGlhbG9nKGlkKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9pdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ09iaiA9IHRoaXMuYXNzZXRzW2luZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nT2JqID0gdGhpcy5hc3NldHNbaW5kZXggLSAxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5leHRJbWdPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZpb3VzSW1nT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlfZGlhbG9nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgb25QcmV2aW91c1ZpZGVvKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9pdGVtID0gdGhpcy5wcmV2aW91c0ltZ09iajtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT0gdGhpcy5jdXJyZW50X2l0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9pdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ09iaiA9IHRoaXMuYXNzZXRzW2luZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nT2JqID0gdGhpcy5hc3NldHNbaW5kZXggLSAxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5leHRJbWdPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMucHJldmlvdXNJbWdPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbk5leHRWaWRlbygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfaXRlbSA9IHRoaXMubmV4dEltZ09iajtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT0gdGhpcy5jdXJyZW50X2l0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudF9pdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ09iaiA9IHRoaXMuYXNzZXRzW2luZGV4ICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nT2JqID0gdGhpcy5hc3NldHNbaW5kZXggLSAxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5leHRJbWdPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMucHJldmlvdXNJbWdPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSW1nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvbkNsb3NlRGlhbG9nQm94KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlfZGlhbG9nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblBsYXlWaWRlbygpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucGxheWVyVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc2V0TmV4dFByZXZpb3VzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nT2JqID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ09iaiA9ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWZsZXhcIixcbiAgICB7IGF0dHJzOiB7IHhzNjogXCJcIiwgc202OiBcIlwiLCBtZDEyOiBcIlwiLCBsZzEyOiBcIlwiLCB4bDEyOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICAgIHN0eWxlOiB7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoXCIgKyBfdm0udGh1bWJuYWlsSW1nICsgXCIpXCIgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICBfdm0ub25PcGVuRGlhbG9nKF92bS5hc3NldC5pZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfdm0uYXNzZXQubWltZV90eXBlID09PSBcInZpZGVvL21wNFwiXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ2aWRlby1pY29uXCIgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCB7IGF0dHJzOiB7IGRhcms6IFwiXCIsIG1lZGl1bTogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwicGxheV9jaXJjbGVfb3V0bGluZVwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtZGlhbG9nXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9yeS1kaWFsb2ctY29udGFpbmVyXCIsXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIFwiY29udGVudC1jbGFzc1wiOiBcInN0b3J5LWRpYWxvZy1jb250YWluZXJcIixcbiAgICAgICAgICAgIFwibWF4LXdpZHRoXCI6IFwiMTIwMHB4XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICB2YWx1ZTogX3ZtLnN0b3J5X2RpYWxvZyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgX3ZtLnN0b3J5X2RpYWxvZyA9ICQkdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwic3RvcnlfZGlhbG9nXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImRpYWxvZy1ib3gtc3dpdGNoIHByZXZcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFyayBtYS0wXCIsXG4gICAgICAgICAgICAgICAgICAgIGZhYjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc21hbGw6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLnByZXZpb3VzSW1nRXhpc3RzXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5vblByZXZpb3VzVmlkZW8oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNoZXZyb25fbGVmdFwiKV0pXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZGlhbG9nLWJveC1zd2l0Y2ggbmV4dFwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJkYXJrIG1hLTBcIixcbiAgICAgICAgICAgICAgICAgICAgZmFiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzbWFsbDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGFyazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICFfdm0ubmV4dEltZ0V4aXN0c1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ub25OZXh0VmlkZW8oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNoZXZyb25fcmlnaHRcIildKV0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uc3RvcnlfZGlhbG9nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyBmbGF0OiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAhX3ZtLnNob3dWaWRlb1xuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNhcmQtbWVkaWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudF9pdGVtLm1pbWVfdHlwZSA9PT0gXCJ2aWRlby9tcDRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS5jdXJyZW50X2l0ZW0udGh1bWJuYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLmN1cnJlbnRfaXRlbS51cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uY3VycmVudF9pdGVtLm1pbWVfdHlwZSA9PT0gXCJ2aWRlby9tcDRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ2aWRlby1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ub25QbGF5VmlkZW8oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJkYXJrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGRhcms6IFwiXCIsIGZhYjogXCJcIiwgbWVkaXVtOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBkYXJrOiBcIlwiLCBsYXJnZTogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcInBsYXlfYXJyb3dcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfYyhcInYtY2FyZC1tZWRpYVwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aWRlb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInBsYXllclZpZGVvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sczogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic291cmNlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLmN1cnJlbnRfaXRlbS51cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidmlkZW8vbXA0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy5cXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0yMDc4YWJlOVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMjA3OGFiZTlcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NDVcbi8vIG1vZHVsZSBjaHVua3MgPSAyNiAyNyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJzZWN0aW9uXCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJjbGllbnQtc3RvcnktZGV0YWlsLXNlY3Rpb24gc2VjdGlvbi1zcGFjZVwiIH0sXG4gICAgW1xuICAgICAgX3ZtLnN0b3J5XG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInB5LTBcIiwgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHQtMFwiLCBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtbC0wIG10LTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgb3V0bGluZTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vbkdvYmFjaygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtaWNvblwiLCBbX3ZtLl92KFwiY2hldnJvbl9sZWZ0XCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIkdvIGJhY2tcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDc6IFwiXCIsIGxnODogXCJcIiwgeGw4OiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic3RvcnktY29udGVudFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1iYWRnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJpZ2h0OiBcIlwiLCBjb2xvcjogXCJibGFja1wiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHNsb3Q6IFwiYmFkZ2VcIiB9LCBzbG90OiBcImJhZGdlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGRhcms6IFwiXCIsIGNvbG9yOiBcIndoaXRlXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJkb25lXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKF92bS5zdG9yeS50aXRsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcImgyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5LnRpdGxlKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXB0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXV0aG9yOiBcIiArIF92bS5fcyhfdm0uc3RvcnkuYXV0aG9yKSArIFwiIHwgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ3JlYXRlZCBhdDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kYXRlRm9ybWF0ZXIoX3ZtLnN0b3J5LmRhdGVfaW5nZXN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYnJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5LmRlc2NyaXB0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiYnV5LXF1b3RlLWJ1dHRvbi1jb21wb25lbnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwic3RvcnlcIiwgYXNzZXQ6IF92bS5zdG9yeSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNsaWVudC1hc3NldHNcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDU6IFwiXCIsIGxnNDogXCJcIiwgeGw0OiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgW192bS5fdihcIkFzc2V0c1wiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWRpdmlkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5hc3NldHMsIGZ1bmN0aW9uKGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uYXNzZXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImFzc2V0LWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogYXNzZXQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQ6IGFzc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0czogX3ZtLmFzc2V0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yeV9pZDogX3ZtLnN0b3J5LmFscGhhX2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIlNvcnJ5IG5vIGFzc2V0cyB3aXRoIHRoaXMgc3RvcnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTI2YTExZDZlXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0yNmExMWQ2ZVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMjYiXSwic291cmNlUm9vdCI6IiJ9