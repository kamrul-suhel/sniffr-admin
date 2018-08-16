webpackJsonp([7],{

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

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(16)
/* script */
var __vue_script__ = __webpack_require__(751)
/* template */
var __vue_template__ = __webpack_require__(752)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/clients/stories/ClientStoryDetailComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d6971800", Component.options)
  } else {
    hotAPI.reload("data-v-d6971800", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 751:
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







/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        QuoteButtonComponent: __WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent___default.a,
        assetComponent: __WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent___default.a
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])({
        story: 'getCurrentStory',
        assets: 'getCurrentStoryAssets',
        user: 'getUserStatus'
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

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "client-video-detail-section" },
    [
      _c(
        "v-container",
        {
          staticClass: "client-story-detail-section",
          attrs: { "grid-list-lg": "", "pt-0": "" }
        },
        [
          _vm.story
            ? _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c(
                    "v-flex",
                    { attrs: { xs12: "", "pt-0": "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0",
                          attrs: { outline: "" },
                          on: {
                            click: function($event) {
                              _vm.onGoback()
                            }
                          }
                        },
                        [
                          _c("v-icon", [_vm._v("chevron_left")]),
                          _vm._v(
                            "\n                    Go back\n                "
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
                          _c("v-divider", {
                            staticStyle: { margin: "15px 0" }
                          }),
                          _vm._v(" "),
                          _c("div", {
                            domProps: {
                              innerHTML: _vm._s(_vm.story.description)
                            }
                          }),
                          _vm._v(" "),
                          _c("quote-button-component", {
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
                        _vm._l(_vm.story.assets, function(asset) {
                          return _c("asset-component", {
                            key: asset.alpha_id,
                            attrs: {
                              asset: asset,
                              assets: _vm.story.assets,
                              story_id: _vm.story.alpha_id
                            }
                          })
                        })
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
    require("vue-hot-reload-api")      .rerender("data-v-d6971800", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9zZXJ2aWNlcy9WaWRlb1JlbG9hZFNlcnZpY2VzLmpzIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWU/NTY5MSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9zdG9yaWVzL0NsaWVudFN0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvc3Rvcmllcy9DbGllbnRTdG9yeURldGFpbENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvc3Rvcmllcy9DbGllbnRTdG9yeURldGFpbENvbXBvbmVudC52dWU/NjNhNCJdLCJuYW1lcyI6WyJWaWRlb1JlbG9hZFNlcnZpY2VzIiwicmVsb2FkRmFjZWJvb2siLCJyZWxvYWRJbnN0YWdybSIsInJlbG9hZFR3aXR0ZXIiLCJyZWxvYWRWaWRlb0pzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJzZXRUaW1lb3V0Iiwid2luZG93IiwiRkIiLCJYRkJNTCIsInBhcnNlIiwiVHdpdHRlcldpZGdldHNMb2FkZXIiLCJsb2FkIiwidHd0dHIiLCJ0d2VldHMiLCJqUXVlcnkiLCIkIiwiZWFjaCIsInQiLCJ0d2VldCIsImF0dHIiLCJ3aWRnZXRzIiwiY3JlYXRlVmlkZW8iLCJ0aGVuIiwiZWwiLCJ3aWRnZXRfdHlwZSIsInZpZGVvIiwidmlkZW9qczEiLCJ0eXBlIiwidmltZW8iLCJhcHBlbmQiLCJhc3luYyIsImluc3Rncm0iLCJFbWJlZHMiLCJwcm9jZXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7SUN4Q3FCQSxtQjs7Ozs7OztvQ0FDTjtBQUNQLGlCQUFLQyxjQUFMO0FBQ0EsaUJBQUtDLGNBQUw7QUFDQSxpQkFBS0MsYUFBTDtBQUNBLGlCQUFLQyxhQUFMO0FBQ0g7Ozt5Q0FFZ0I7QUFDYixnQkFBSSxDQUFDQyxTQUFTQyxjQUFULENBQXdCLGdCQUF4QixDQUFMLEVBQWdEO0FBQzNDLDJCQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ2pCLHdCQUFJQyxFQUFKO0FBQUEsd0JBQVFDLE1BQU1KLEVBQUVLLG9CQUFGLENBQXVCSixDQUF2QixFQUEwQixDQUExQixDQUFkO0FBQ0Esd0JBQUlELEVBQUVELGNBQUYsQ0FBaUJHLEVBQWpCLENBQUosRUFBMEI7QUFDMUJDLHlCQUFLSCxFQUFFTSxhQUFGLENBQWdCTCxDQUFoQixDQUFMO0FBQ0FFLHVCQUFHRCxF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QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qyx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFNBQVMsb0JBQW9CLEVBQUU7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3RvcnlBc3NldHNDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yMDc4YWJlOVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTIwNzhhYmU5XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjA3OGFiZTlcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDcwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDYgNyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZGVvUmVsb2FkU2VydmljZXMge1xuICAgIHJlbG9hZEFsbCgpe1xuICAgICAgICB0aGlzLnJlbG9hZEZhY2Vib29rKCk7XG4gICAgICAgIHRoaXMucmVsb2FkSW5zdGFncm0oKTtcbiAgICAgICAgdGhpcy5yZWxvYWRUd2l0dGVyKCk7XG4gICAgICAgIHRoaXMucmVsb2FkVmlkZW9KcygpO1xuICAgIH1cblxuICAgIHJlbG9hZEZhY2Vib29rKCkge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNlYm9vay1qc3NkaycpKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKGQsIHMsIGlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuICAgICAgICAgICAgICAgIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGpzID0gZC5jcmVhdGVFbGVtZW50KHMpO1xuICAgICAgICAgICAgICAgIGpzLmlkID0gaWQ7XG4gICAgICAgICAgICAgICAganMuc3JjID0gXCJodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX0dCL3Nkay5qcyN4ZmJtbD0xJnZlcnNpb249djIuMTEmYXBwSWQ9MTUxMDY4ODU1NTI2NTA0XCI7XG4gICAgICAgICAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xuICAgICAgICAgICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LkZCLlhGQk1MLnBhcnNlKCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWxvYWRUd2l0dGVyKCl7XG4gICAgICAgIFR3aXR0ZXJXaWRnZXRzTG9hZGVyLmxvYWQoZnVuY3Rpb24gKHR3dHRyKSB7XG4gICAgICAgICAgICB2YXIgdHdlZXRzID0galF1ZXJ5KFwiLnR3ZWV0XCIpO1xuXG4gICAgICAgICAgICAkKHR3ZWV0cykuZWFjaChmdW5jdGlvbiAodCwgdHdlZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBqUXVlcnkodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgICAgICB0d3R0ci53aWRnZXRzLmNyZWF0ZVZpZGVvKGlkLCB0d2VldCkudGhlbihmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0X3R5cGUgPSB2aWRlb1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbG9hZFZpZGVvSnMoKSB7XG5cbiAgICAgICAgbGV0IHZpZGVvanMxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHZpZGVvanMxLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgICB2aWRlb2pzMS5zcmMgPSBcIi9hc3NldHMvc2NyaXB0cy92aWRlby5qc1wiO1xuXG4gICAgICAgIGxldCB2aW1lbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICB2aW1lby50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgdmltZW8uc3JjID0gXCIvYXNzZXRzL3NjcmlwdHMvdmlkZW9qcy12aW1lby5qc1wiO1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKHZpZGVvanMxKTtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCh2aW1lbyk7XG5cbiAgICB9XG5cbiAgICByZWxvYWRJbnN0YWdybSgpIHtcbiAgICAgICAgdmFyIHNyYyA9ICcvL3BsYXRmb3JtLmluc3RhZ3JhbS5jb20vZW5fVVMvZW1iZWRzLmpzJztcbiAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgcy5hc3luYyA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5pbnN0Z3JtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQocyk7XG4gICAgICAgICAgICAgICAgd2luZG93Lmluc3Rncm0uRW1iZWRzLnByb2Nlc3MoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQocyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3NlcnZpY2VzL1ZpZGVvUmVsb2FkU2VydmljZXMuanMiLCI8dGVtcGxhdGU+XG4gICAgPHYtZmxleCB4czYgc202IG1kMTIgbGcxMiB4bDEyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGh1bWJuYWlsXCJcbiAgICAgICAgICAgICA6c3R5bGU9XCJ7YmFja2dyb3VuZEltYWdlOid1cmwoJyt0aHVtYm5haWxJbWcrJyknfVwiXG4gICAgICAgICAgICAgQGNsaWNrPVwib25PcGVuRGlhbG9nKGFzc2V0LmlkKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvLWljb25cIlxuICAgICAgICAgICAgICAgICB2LWlmPVwiYXNzZXQubWltZV90eXBlID09PSAndmlkZW8vbXA0J1wiPlxuICAgICAgICAgICAgICAgIDx2LWljb24gZGFyayBtZWRpdW0+cGxheV9jaXJjbGVfb3V0bGluZTwvdi1pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gSW1hZ2Ugb3IgVmlkZW8gaW4gZGlhbG9nIC0tPlxuICAgICAgICA8di1kaWFsb2dcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic3RvcnlfZGlhbG9nXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInN0b3J5LWRpYWxvZy1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgIGNvbnRlbnQtY2xhc3M9XCJzdG9yeS1kaWFsb2ctY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICBtYXgtd2lkdGg9XCIxMjAwcHhcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWJveC1zd2l0Y2ggcHJldlwiPlxuICAgICAgICAgICAgICAgIDx2LWJ0biBjb2xvcj1cImRhcmsgbWEtMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIGZhYlxuICAgICAgICAgICAgICAgICAgICAgICBzbWFsbFxuICAgICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uUHJldmlvdXNWaWRlbygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwiIXByZXZpb3VzSW1nRXhpc3RzXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWljb24+Y2hldnJvbl9sZWZ0PC92LWljb24+XG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWJveC1zd2l0Y2ggbmV4dFwiPlxuICAgICAgICAgICAgICAgIDx2LWJ0biBjb2xvcj1cImRhcmsgbWEtMFwiXG4gICAgICAgICAgICAgICAgICAgICAgIGZhYlxuICAgICAgICAgICAgICAgICAgICAgICBzbWFsbFxuICAgICAgICAgICAgICAgICAgICAgICBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uTmV4dFZpZGVvKClcIlxuICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCIhbmV4dEltZ0V4aXN0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8di1pY29uPmNoZXZyb25fcmlnaHQ8L3YtaWNvbj5cbiAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDx2LWNhcmQgZmxhdCB2LWlmPVwic3RvcnlfZGlhbG9nXCI+XG5cbiAgICAgICAgICAgICAgICA8di1jYXJkLW1lZGlhXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiIXNob3dWaWRlb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3JjPVwiY3VycmVudF9pdGVtLm1pbWVfdHlwZSA9PT0gJ3ZpZGVvL21wNCc/IGN1cnJlbnRfaXRlbS50aHVtYm5haWwgOiBjdXJyZW50X2l0ZW0udXJsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1idXR0b25cIiB2LWlmPVwiY3VycmVudF9pdGVtLm1pbWVfdHlwZSA9PT0gJ3ZpZGVvL21wNCdcIiBAY2xpY2s9XCJvblBsYXlWaWRlbygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1idG4gZGFyayBmYWIgY2xhc3M9XCJkYXJrXCIgbWVkaXVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24gZGFyayBsYXJnZT5wbGF5X2Fycm93PC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cblxuICAgICAgICAgICAgICAgIDx2LWNhcmQtbWVkaWEgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICA8dmlkZW8gd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGNvbnRyb2xzIHJlZj1cInBsYXllclZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIDpzcmM9XCJjdXJyZW50X2l0ZW0udXJsXCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy5cbiAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZC1tZWRpYT5cbiAgICAgICAgICAgIDwvdi1jYXJkPlxuICAgICAgICA8L3YtZGlhbG9nPlxuXG4gICAgPC92LWZsZXg+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9hZGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRfaXRlbTogJycsXG4gICAgICAgICAgICAgICAgY3VycmVudF9pdGVtX3RodW1ibmFpbDogJycsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nOiAnJyxcblxuICAgICAgICAgICAgICAgIHN0b3J5X2RpYWxvZzogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICBuZXh0SW1nRXhpc3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5leHRJbWdPYmo6ICcnLFxuXG4gICAgICAgICAgICAgICAgcHJldmlvdXNJbWdFeGlzdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldmlvdXNJbWdPYmo6ICcnLFxuXG4gICAgICAgICAgICAgICAgc2hvd1ZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9wczogW1xuICAgICAgICAgICAgJ2Fzc2V0JyxcbiAgICAgICAgICAgICdzdG9yeV9pZCcsXG4gICAgICAgICAgICAnYXNzZXRzJ1xuICAgICAgICBdLFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBsb2FkZXIoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMubG9hZGVyXG4gICAgICAgICAgICAgICAgdGhpc1tsXSA9ICF0aGlzW2xdXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzW2xdID0gZmFsc2UpLCAzMDAwKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9yeV9kaWFsb2codmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldE5leHRQcmV2aW91cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbWFnZVVybCh0aGlzLmFzc2V0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBzZXRJbWFnZVVybChhc3NldCkge1xuICAgICAgICAgICAgICAgIGlmIChhc3NldC5taW1lX3R5cGUgPT09IFwidmlkZW8vbXA0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYm5haWxJbWcgPSBhc3NldC50aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYm5haWxJbWcgPSBhc3NldC51cmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZG93bmxvYWRBc3NldCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9ICdsb2FkaW5nJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlciA9ICdsb2FkaW5nJztcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gJy9jbGllbnQvc3Rvcmllcy8nICsgdGhpcy5zdG9yeV9pZCArICcvZG93bmxvYWQnO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uT3BlbkRpYWxvZyhpZCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdPYmogPSB0aGlzLmFzc2V0c1tpbmRleCArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ09iaiA9IHRoaXMuYXNzZXRzW2luZGV4IC0gMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0SW1nT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmV2aW91c0ltZ09iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5X2RpYWxvZyA9IHRydWU7XG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgICAgIG9uUHJldmlvdXNWaWRlbygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfaXRlbSA9IHRoaXMucHJldmlvdXNJbWdPYmo7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09IHRoaXMuY3VycmVudF9pdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdPYmogPSB0aGlzLmFzc2V0c1tpbmRleCArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ09iaiA9IHRoaXMuYXNzZXRzW2luZGV4IC0gMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0SW1nT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnByZXZpb3VzSW1nT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25OZXh0VmlkZW8oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X2l0ZW0gPSB0aGlzLm5leHRJbWdPYmo7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09IHRoaXMuY3VycmVudF9pdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRfaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdPYmogPSB0aGlzLmFzc2V0c1tpbmRleCArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ09iaiA9IHRoaXMuYXNzZXRzW2luZGV4IC0gMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0SW1nT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnByZXZpb3VzSW1nT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0ltZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ0V4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25DbG9zZURpYWxvZ0JveCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3J5X2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25QbGF5VmlkZW8oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnBsYXllclZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXNldE5leHRQcmV2aW91cygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dEltZ09iaiA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNJbWdPYmogPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1mbGV4XCIsXG4gICAgeyBhdHRyczogeyB4czY6IFwiXCIsIHNtNjogXCJcIiwgbWQxMjogXCJcIiwgbGcxMjogXCJcIiwgeGwxMjogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0aHVtYm5haWxcIixcbiAgICAgICAgICBzdHlsZTogeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFwiICsgX3ZtLnRodW1ibmFpbEltZyArIFwiKVwiIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgX3ZtLm9uT3BlbkRpYWxvZyhfdm0uYXNzZXQuaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLmFzc2V0Lm1pbWVfdHlwZSA9PT0gXCJ2aWRlby9tcDRcIlxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidmlkZW8taWNvblwiIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgeyBhdHRyczogeyBkYXJrOiBcIlwiLCBtZWRpdW06IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcInBsYXlfY2lyY2xlX291dGxpbmVcIilcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWRpYWxvZ1wiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcnktZGlhbG9nLWNvbnRhaW5lclwiLFxuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICBcImNvbnRlbnQtY2xhc3NcIjogXCJzdG9yeS1kaWFsb2ctY29udGFpbmVyXCIsXG4gICAgICAgICAgICBcIm1heC13aWR0aFwiOiBcIjEyMDBweFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWU6IF92bS5zdG9yeV9kaWFsb2csXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgIF92bS5zdG9yeV9kaWFsb2cgPSAkJHZcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcInN0b3J5X2RpYWxvZ1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJkaWFsb2ctYm94LXN3aXRjaCBwcmV2XCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmsgbWEtMFwiLFxuICAgICAgICAgICAgICAgICAgICBmYWI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNtYWxsOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIV92bS5wcmV2aW91c0ltZ0V4aXN0c1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ub25QcmV2aW91c1ZpZGVvKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJjaGV2cm9uX2xlZnRcIildKV0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImRpYWxvZy1ib3gtc3dpdGNoIG5leHRcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFyayBtYS0wXCIsXG4gICAgICAgICAgICAgICAgICAgIGZhYjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc21hbGw6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhX3ZtLm5leHRJbWdFeGlzdHNcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uTmV4dFZpZGVvKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW19jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJjaGV2cm9uX3JpZ2h0XCIpXSldLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLnN0b3J5X2RpYWxvZ1xuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgZmxhdDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgIV92bS5zaG93VmlkZW9cbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jYXJkLW1lZGlhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRfaXRlbS5taW1lX3R5cGUgPT09IFwidmlkZW8vbXA0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfdm0uY3VycmVudF9pdGVtLnRodW1ibmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5jdXJyZW50X2l0ZW0udXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW46IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnRfaXRlbS5taW1lX3R5cGUgPT09IFwidmlkZW8vbXA0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidmlkZW8tYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uUGxheVZpZGVvKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBkYXJrOiBcIlwiLCBmYWI6IFwiXCIsIG1lZGl1bTogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgZGFyazogXCJcIiwgbGFyZ2U6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJwbGF5X2Fycm93XCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX2MoXCJ2LWNhcmQtbWVkaWFcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlkZW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJwbGF5ZXJWaWRlb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHM6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNvdXJjZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IF92bS5jdXJyZW50X2l0ZW0udXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInZpZGVvL21wNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSB2aWRlbyB0YWcuXFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMjA3OGFiZTlcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTIwNzhhYmU5XCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gNiA3IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vQ2xpZW50U3RvcnlEZXRhaWxDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1kNjk3MTgwMFxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0NsaWVudFN0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9zdG9yaWVzL0NsaWVudFN0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kNjk3MTgwMFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQ2OTcxODAwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9zdG9yaWVzL0NsaWVudFN0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzUwXG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiY2xpZW50LXZpZGVvLWRldGFpbC1zZWN0aW9uXCI+XG4gICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGcgY2xhc3M9XCJjbGllbnQtc3RvcnktZGV0YWlsLXNlY3Rpb25cIiBwdC0wPlxuICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwIHYtaWY9XCJzdG9yeVwiPlxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBwdC0wPlxuICAgICAgICAgICAgICAgICAgICA8di1idG4gb3V0bGluZSBAY2xpY2s9XCJvbkdvYmFjaygpXCIgY2xhc3M9XCJtbC0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1pY29uPmNoZXZyb25fbGVmdDwvdi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgR28gYmFja1xuICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ3IGxnOCB4bDg+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdG9yeS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1iYWRnZSByaWdodCBjb2xvcj1cImJsYWNrXCIgdi1pZj1cIm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc2xvdD1cImJhZGdlXCI+PHYtaWNvbiBkYXJrIGNvbG9yPVwid2hpdGVcIj5kb25lPC92LWljb24+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiB2LWh0bWw9XCJzdG9yeS50aXRsZVwiPjwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtYmFkZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgdi1odG1sPVwic3RvcnkudGl0bGVcIiB2LWVsc2U+PC9oMj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5BdXRob3I6IHt7IHN0b3J5LmF1dGhvciB9fSB8IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DcmVhdGVkIGF0OiB7eyBkYXRlRm9ybWF0ZXIoc3RvcnkuZGF0ZV9pbmdlc3RlZCkgfX08L3NwYW4+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHNwYW4+U3RhdGU6IDxzdHJvbmc+e3sgc3Rvcnkuc3RhdGUgfX08L3N0cm9uZz4gfDwvc3Bhbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHNwYW4+U3RhdHVzIDoge3sgc3Rvcnkuc3RhdHVzIH19PC9zcGFuPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWRpdmlkZXIgc3R5bGU9XCJtYXJnaW46IDE1cHggMFwiPjwvdi1kaXZpZGVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaHRtbD1cInN0b3J5LmRlc2NyaXB0aW9uXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxdW90ZS1idXR0b24tY29tcG9uZW50IDp0eXBlPVwiJ3N0b3J5J1wiIDphc3NldD1cInN0b3J5XCI+PC9xdW90ZS1idXR0b24tY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNSBsZzQgeGw0IGNsYXNzPVwiY2xpZW50LWFzc2V0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+QXNzZXRzPC9oMj5cblxuICAgICAgICAgICAgICAgICAgICA8di1kaXZpZGVyIHN0eWxlPVwibWFyZ2luLWJvdHRvbToyMHB4O1wiPjwvdi1kaXZpZGVyPlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhc3NldC1jb21wb25lbnQgdi1mb3I9XCJhc3NldCBpbiBzdG9yeS5hc3NldHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiYXNzZXQuYWxwaGFfaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXNzZXQ9XCJhc3NldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphc3NldHM9XCJzdG9yeS5hc3NldHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c3RvcnlfaWQ9XCJzdG9yeS5hbHBoYV9pZFwiPjwvYXNzZXQtY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICA8L3YtY29udGFpbmVyPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgQXNzZXRDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQnO1xuICAgIGltcG9ydCBWaWRlb1JlbG9hZFNlcnZpY2VzIGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL1ZpZGVvUmVsb2FkU2VydmljZXMnO1xuICAgIGltcG9ydCBRdW90ZUJ1dHRvbkNvbXBvbmVudCBmcm9tIFwiLi4vLi4vLi4vaW5jbHVkZXMvQnV5UXVvdGVCdXR0b25Db21wb25lbnRcIjtcblxuICAgIGltcG9ydCB7bWFwR2V0dGVyc30gZnJvbSAndnVleCc7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIFF1b3RlQnV0dG9uQ29tcG9uZW50LFxuICAgICAgICAgICAgYXNzZXRDb21wb25lbnQ6IEFzc2V0Q29tcG9uZW50XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQgOntcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoe1xuICAgICAgICAgICAgICAgIHN0b3J5OiAnZ2V0Q3VycmVudFN0b3J5JyxcbiAgICAgICAgICAgICAgICBhc3NldHM6ICdnZXRDdXJyZW50U3RvcnlBc3NldHMnLFxuICAgICAgICAgICAgICAgIHVzZXI6ICdnZXRVc2VyU3RhdHVzJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2FkZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgb3JkZXI6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmdldFN0b3J5RGV0YWlsKCk7XG5cbiAgICAgICAgICAgIHZhciB2aWRlb19yZWxvYWQgPSBuZXcgVmlkZW9SZWxvYWRTZXJ2aWNlcygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBsb2FkZXIgKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLmxvYWRlclxuICAgICAgICAgICAgICAgIHRoaXNbbF0gPSAhdGhpc1tsXVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAodGhpc1tsXSA9IGZhbHNlKSwgMzAwMClcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIG9uR29iYWNrKCkge1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Um91dGUgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFJvdXRlVXJsO1xuICAgICAgICAgICAgICAgIGlmKHByZXZSb3V0ZSAhPSAnJyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lIDogdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRSb3V0ZVVybH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIuZ28oLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFN0b3J5RGV0YWlsKCl7XG4gICAgICAgICAgICAgICAgbGV0IGFscGhhX2lkID0gdGhpcy4kcm91dGUucGFyYW1zLmFscGhhX2lkO1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdmZXRjaEN1cnJlbnRTdG9yeScsIGFscGhhX2lkKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRhdGVGb3JtYXRlcihkYXRlKXtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudF9kYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShkYXRlLnJlcGxhY2UoJy0nLCAnLycsICdnJykpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudF9kYXRlLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvc3Rvcmllcy9DbGllbnRTdG9yeURldGFpbENvbXBvbmVudC52dWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJjbGllbnQtdmlkZW8tZGV0YWlsLXNlY3Rpb25cIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtY29udGFpbmVyXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbGllbnQtc3RvcnktZGV0YWlsLXNlY3Rpb25cIixcbiAgICAgICAgICBhdHRyczogeyBcImdyaWQtbGlzdC1sZ1wiOiBcIlwiLCBcInB0LTBcIjogXCJcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfdm0uc3RvcnlcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBcInB0LTBcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWwtMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBvdXRsaW5lOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uR29iYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIFtfdm0uX3YoXCJjaGV2cm9uX2xlZnRcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBHbyBiYWNrXFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ3OiBcIlwiLCBsZzg6IFwiXCIsIHhsODogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInN0b3J5LWNvbnRlbnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ub3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYmFkZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByaWdodDogXCJcIiwgY29sb3I6IFwiYmxhY2tcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBzbG90OiBcImJhZGdlXCIgfSwgc2xvdDogXCJiYWRnZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBkYXJrOiBcIlwiLCBjb2xvcjogXCJ3aGl0ZVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiZG9uZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IF92bS5fcyhfdm0uc3RvcnkudGl0bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXCJoMlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5zdG9yeS50aXRsZSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FwdGlvblwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkF1dGhvcjogXCIgKyBfdm0uX3MoX3ZtLnN0b3J5LmF1dGhvcikgKyBcIiB8IFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNyZWF0ZWQgYXQ6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGF0ZUZvcm1hdGVyKF92bS5zdG9yeS5kYXRlX2luZ2VzdGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImJyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtZGl2aWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgbWFyZ2luOiBcIjE1cHggMFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLnN0b3J5LmRlc2NyaXB0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicXVvdGUtYnV0dG9uLWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJzdG9yeVwiLCBhc3NldDogX3ZtLnN0b3J5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xpZW50LWFzc2V0c1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kNTogXCJcIiwgbGc0OiBcIlwiLCB4bDQ6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KFwiQXNzZXRzXCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtZGl2aWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBcIm1hcmdpbi1ib3R0b21cIjogXCIyMHB4XCIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnN0b3J5LmFzc2V0cywgZnVuY3Rpb24oYXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiYXNzZXQtY29tcG9uZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGFzc2V0LmFscGhhX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldDogYXNzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldHM6IF92bS5zdG9yeS5hc3NldHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yeV9pZDogX3ZtLnN0b3J5LmFscGhhX2lkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtZDY5NzE4MDBcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWQ2OTcxODAwXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvc3Rvcmllcy9DbGllbnRTdG9yeURldGFpbENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDciXSwic291cmNlUm9vdCI6IiJ9