webpackJsonp([4],{

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(773)
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

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(750)
/* template */
var __vue_template__ = __webpack_require__(751)
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

/***/ 750:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            thumbnailImg: ''
        };
    },


    props: {
        asset: {
            type: Object,
            required: true
        }
    },

    watch: {},

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
        onOpenDialog: function onOpenDialog(id) {
            this.$store.commit('setStoryAssetDialogBox', { open: true, id: id });
        }
    }
});

/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-flex", { attrs: { xs6: "", sm6: "", md12: "" } }, [
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
    )
  ])
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

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__includes_StoryAssetsComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_VideoReloadServices__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__includes_BuyQuoteButtonComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(38);
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
        }
    }
});

/***/ }),

/***/ 774:
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

/***/ 775:
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
                                    _vm._f("convertDate")(
                                      _vm.story.date_ingested
                                    )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yeURldGFpbENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlPzU2OTEiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvc2VydmljZXMvVmlkZW9SZWxvYWRTZXJ2aWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yeURldGFpbENvbXBvbmVudC52dWU/MWVmYSJdLCJuYW1lcyI6WyJWaWRlb1JlbG9hZFNlcnZpY2VzIiwicmVsb2FkRmFjZWJvb2siLCJyZWxvYWRJbnN0YWdybSIsInJlbG9hZFR3aXR0ZXIiLCJyZWxvYWRWaWRlb0pzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImQiLCJzIiwiaWQiLCJqcyIsImZqcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJzZXRUaW1lb3V0Iiwid2luZG93IiwiRkIiLCJYRkJNTCIsInBhcnNlIiwiVHdpdHRlcldpZGdldHNMb2FkZXIiLCJsb2FkIiwidHd0dHIiLCJ0d2VldHMiLCJqUXVlcnkiLCIkIiwiZWFjaCIsInQiLCJ0d2VldCIsImF0dHIiLCJ3aWRnZXRzIiwiY3JlYXRlVmlkZW8iLCJ0aGVuIiwiZWwiLCJ3aWRnZXRfdHlwZSIsInZpZGVvIiwidmlkZW9qczEiLCJ0eXBlIiwidmltZW8iLCJhcHBlbmQiLCJhc3luYyIsImluc3Rncm0iLCJFbWJlZHMiLCJwcm9jZXNzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBLFFBREEsa0JBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQSxLQUxBOzs7QUFPQTtBQUNBO0FBQ0Esd0JBREE7QUFFQTtBQUZBO0FBREEsS0FQQTs7QUFjQSxhQWRBOztBQWdCQSxXQWhCQSxxQkFnQkE7QUFDQTtBQUNBLEtBbEJBOzs7QUFvQkE7QUFDQSxtQkFEQSx1QkFDQSxLQURBLEVBQ0E7QUFD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QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixTQUFTLG9CQUFvQixFQUFFO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQiw0Q0FBNEMsU0FBUyxXQUFXLEVBQUU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3RvcnlEZXRhaWxDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yNmExMWQ2ZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvc3Rvcmllcy9TdG9yeURldGFpbENvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMjZhMTFkNmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0yNmExMWQ2ZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3RvcnlEZXRhaWxDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA1NDZcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3RvcnlBc3NldHNDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0yMDc4YWJlOVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTIwNzhhYmU5XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMjA3OGFiZTlcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDQgNSIsIjx0ZW1wbGF0ZT5cbiAgICA8di1mbGV4IHhzNiBzbTYgbWQxMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRodW1ibmFpbFwiXG4gICAgICAgICAgICAgOnN0eWxlPVwie2JhY2tncm91bmRJbWFnZTondXJsKCcrdGh1bWJuYWlsSW1nKycpJ31cIlxuICAgICAgICAgICAgIEBjbGljaz1cIm9uT3BlbkRpYWxvZyhhc3NldC5pZClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1pY29uXCJcbiAgICAgICAgICAgICAgICAgdi1pZj1cImFzc2V0Lm1pbWVfdHlwZSA9PT0gJ3ZpZGVvL21wNCdcIj5cbiAgICAgICAgICAgICAgICA8di1pY29uIGRhcmsgbWVkaXVtPnBsYXlfY2lyY2xlX291dGxpbmU8L3YtaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3YtZmxleD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWc6ICcnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBhc3NldDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7fSxcblxuICAgICAgICBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbWFnZVVybCh0aGlzLmFzc2V0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBzZXRJbWFnZVVybChhc3NldCkge1xuICAgICAgICAgICAgICAgIGlmIChhc3NldC5taW1lX3R5cGUgPT09IFwidmlkZW8vbXA0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYm5haWxJbWcgPSBhc3NldC50aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYm5haWxJbWcgPSBhc3NldC51cmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25PcGVuRGlhbG9nKGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRTdG9yeUFzc2V0RGlhbG9nQm94Jywge29wZW46IHRydWUsIGlkOiBpZH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL2luY2x1ZGVzL1N0b3J5QXNzZXRzQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJ2LWZsZXhcIiwgeyBhdHRyczogeyB4czY6IFwiXCIsIHNtNjogXCJcIiwgbWQxMjogXCJcIiB9IH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICBzdHlsZTogeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKFwiICsgX3ZtLnRodW1ibmFpbEltZyArIFwiKVwiIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgX3ZtLm9uT3BlbkRpYWxvZyhfdm0uYXNzZXQuaWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBfdm0uYXNzZXQubWltZV90eXBlID09PSBcInZpZGVvL21wNFwiXG4gICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ2aWRlby1pY29uXCIgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwidi1pY29uXCIsIHsgYXR0cnM6IHsgZGFyazogXCJcIiwgbWVkaXVtOiBcIlwiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwicGxheV9jaXJjbGVfb3V0bGluZVwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICBdXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0yMDc4YWJlOVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMjA3OGFiZTlcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvaW5jbHVkZXMvU3RvcnlBc3NldHNDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NTFcbi8vIG1vZHVsZSBjaHVua3MgPSA0IDUiLCI8dGVtcGxhdGU+XG4gICAgPHNlY3Rpb24gY2xhc3M9XCJjbGllbnQtc3RvcnktZGV0YWlsLXNlY3Rpb24gc2VjdGlvbi1zcGFjZVwiPlxuICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LWxnIGNsYXNzPVwicHktMFwiIHYtaWY9XCJzdG9yeVwiPlxuICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwID5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgY2xhc3M9XCJwdC0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGxpbmUgQGNsaWNrPVwib25Hb2JhY2soKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtbC0wIG10LTBcIlxuICAgICAgICAgICAgICAgICAgICA+PHYtaWNvbj5jaGV2cm9uX2xlZnQ8L3YtaWNvbj5HbyBiYWNrPC92LWJ0bj5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgc20xMiBtZDcgbGc4IHhsOD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0b3J5LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJhZGdlIHJpZ2h0IGNvbG9yPVwiYmxhY2tcIiB2LWlmPVwib3JkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVwiYmFkZ2VcIj48di1pY29uIGRhcmsgY29sb3I9XCJ3aGl0ZVwiPmRvbmU8L3YtaWNvbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIHYtaHRtbD1cInN0b3J5LnRpdGxlXCI+PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1iYWRnZT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIHYtaHRtbD1cInN0b3J5LnRpdGxlXCIgdi1lbHNlPjwvaDI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+QXV0aG9yOiB7eyBzdG9yeS5hdXRob3IgfX0gfCA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q3JlYXRlZCBhdDoge3sgc3RvcnkuZGF0ZV9pbmdlc3RlZCB8IGNvbnZlcnREYXRlIH19PC9zcGFuPjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxzcGFuPlN0YXRlOiA8c3Ryb25nPnt7IHN0b3J5LnN0YXRlIH19PC9zdHJvbmc+IHw8L3NwYW4+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxzcGFuPlN0YXR1cyA6IHt7IHN0b3J5LnN0YXR1cyB9fTwvc3Bhbj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHYtZGl2aWRlciBzdHlsZT1cIm1hcmdpbjogMTVweCAwXCI+PC92LWRpdmlkZXI+LS0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1odG1sPVwic3RvcnkuZGVzY3JpcHRpb25cIj48L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1eS1xdW90ZS1idXR0b24tY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDp0eXBlPVwiJ3N0b3J5J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphc3NldD1cInN0b3J5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1eS1xdW90ZS1idXR0b24tY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBzbTEyIG1kNSBsZzQgeGw0IGNsYXNzPVwiY2xpZW50LWFzc2V0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8aDI+QXNzZXRzPC9oMj5cblxuICAgICAgICAgICAgICAgICAgICA8di1kaXZpZGVyIHN0eWxlPVwibWFyZ2luLWJvdHRvbToyMHB4O1wiPjwvdi1kaXZpZGVyPlxuXG4gICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhc3NldC1jb21wb25lbnQgdi1pZj1cImFzc2V0c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiYXNzZXQgaW4gYXNzZXRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImFzc2V0LmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmFzc2V0PVwiYXNzZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXNzZXRzPVwiYXNzZXRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnN0b3J5X2lkPVwic3RvcnkuYWxwaGFfaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvYXNzZXQtY29tcG9uZW50PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5Tb3JyeSBubyBhc3NldHMgd2l0aCB0aGlzIHN0b3J5PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICA8L3NlY3Rpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBBc3NldENvbXBvbmVudCBmcm9tICcuLi8uLi9pbmNsdWRlcy9TdG9yeUFzc2V0c0NvbXBvbmVudCc7XG4gICAgaW1wb3J0IFZpZGVvUmVsb2FkU2VydmljZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvVmlkZW9SZWxvYWRTZXJ2aWNlcyc7XG4gICAgaW1wb3J0IEJ1eVF1b3RlQnV0dG9uQ29tcG9uZW50IGZyb20gXCIuLi8uLi9pbmNsdWRlcy9CdXlRdW90ZUJ1dHRvbkNvbXBvbmVudFwiO1xuXG4gICAgaW1wb3J0IHttYXBHZXR0ZXJzfSBmcm9tICd2dWV4JztcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgQnV5UXVvdGVCdXR0b25Db21wb25lbnQsXG4gICAgICAgICAgICBhc3NldENvbXBvbmVudDogQXNzZXRDb21wb25lbnRcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDp7XG4gICAgICAgICAgICAuLi5tYXBHZXR0ZXJzKHtcbiAgICAgICAgICAgICAgICBzdG9yeTogJ2dldEN1cnJlbnRTdG9yeScsXG4gICAgICAgICAgICAgICAgYXNzZXRzOiAnZ2V0Q3VycmVudFN0b3J5QXNzZXRzJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2FkZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgb3JkZXI6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmdldFN0b3J5RGV0YWlsKCk7XG5cbiAgICAgICAgICAgIHZhciB2aWRlb19yZWxvYWQgPSBuZXcgVmlkZW9SZWxvYWRTZXJ2aWNlcygpO1xuICAgICAgICAgICAgdmlkZW9fcmVsb2FkLnJlbG9hZEFsbCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICBsb2FkZXIgKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLmxvYWRlclxuICAgICAgICAgICAgICAgIHRoaXNbbF0gPSAhdGhpc1tsXVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAodGhpc1tsXSA9IGZhbHNlKSwgMzAwMClcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIG9uR29iYWNrKCkge1xuICAgICAgICAgICAgICAgIGxldCBwcmV2Um91dGUgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzLmdldFJvdXRlVXJsO1xuICAgICAgICAgICAgICAgIGlmKHByZXZSb3V0ZSAhPSAnJyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lIDogdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRSb3V0ZVVybH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIuZ28oLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldFN0b3J5RGV0YWlsKCl7XG4gICAgICAgICAgICAgICAgbGV0IGFscGhhX2lkID0gdGhpcy4kcm91dGUucGFyYW1zLmFscGhhX2lkO1xuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdmZXRjaEN1cnJlbnRTdG9yeScsIGFscGhhX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9zdG9yaWVzL1N0b3J5RGV0YWlsQ29tcG9uZW50LnZ1ZSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZGVvUmVsb2FkU2VydmljZXMge1xuICAgIHJlbG9hZEFsbCgpe1xuICAgICAgICB0aGlzLnJlbG9hZEZhY2Vib29rKCk7XG4gICAgICAgIHRoaXMucmVsb2FkSW5zdGFncm0oKTtcbiAgICAgICAgdGhpcy5yZWxvYWRUd2l0dGVyKCk7XG4gICAgICAgIHRoaXMucmVsb2FkVmlkZW9KcygpO1xuICAgIH1cblxuICAgIHJlbG9hZEZhY2Vib29rKCkge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNlYm9vay1qc3NkaycpKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKGQsIHMsIGlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xuICAgICAgICAgICAgICAgIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGpzID0gZC5jcmVhdGVFbGVtZW50KHMpO1xuICAgICAgICAgICAgICAgIGpzLmlkID0gaWQ7XG4gICAgICAgICAgICAgICAganMuc3JjID0gXCJodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX0dCL3Nkay5qcyN4ZmJtbD0xJnZlcnNpb249djIuMTEmYXBwSWQ9MTUxMDY4ODU1NTI2NTA0XCI7XG4gICAgICAgICAgICAgICAgZmpzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGpzLCBmanMpO1xuICAgICAgICAgICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LkZCLlhGQk1MLnBhcnNlKCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWxvYWRUd2l0dGVyKCl7XG4gICAgICAgIFR3aXR0ZXJXaWRnZXRzTG9hZGVyLmxvYWQoZnVuY3Rpb24gKHR3dHRyKSB7XG4gICAgICAgICAgICB2YXIgdHdlZXRzID0galF1ZXJ5KFwiLnR3ZWV0XCIpO1xuXG4gICAgICAgICAgICAkKHR3ZWV0cykuZWFjaChmdW5jdGlvbiAodCwgdHdlZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBqUXVlcnkodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgICAgICB0d3R0ci53aWRnZXRzLmNyZWF0ZVZpZGVvKGlkLCB0d2VldCkudGhlbihmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0X3R5cGUgPSB2aWRlb1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbG9hZFZpZGVvSnMoKSB7XG5cbiAgICAgICAgbGV0IHZpZGVvanMxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHZpZGVvanMxLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgICB2aWRlb2pzMS5zcmMgPSBcIi9hc3NldHMvc2NyaXB0cy92aWRlby5qc1wiO1xuXG4gICAgICAgIGxldCB2aW1lbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICB2aW1lby50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAgICAgdmltZW8uc3JjID0gXCIvYXNzZXRzL3NjcmlwdHMvdmlkZW9qcy12aW1lby5qc1wiO1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKHZpZGVvanMxKTtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCh2aW1lbyk7XG5cbiAgICB9XG5cbiAgICByZWxvYWRJbnN0YWdybSgpIHtcbiAgICAgICAgdmFyIHNyYyA9ICcvL3BsYXRmb3JtLmluc3RhZ3JhbS5jb20vZW5fVVMvZW1iZWRzLmpzJztcbiAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgICAgICBzLnNyYyA9IHNyYztcbiAgICAgICAgcy5hc3luYyA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5pbnN0Z3JtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQocyk7XG4gICAgICAgICAgICAgICAgd2luZG93Lmluc3Rncm0uRW1iZWRzLnByb2Nlc3MoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQocyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3NlcnZpY2VzL1ZpZGVvUmVsb2FkU2VydmljZXMuanMiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwic2VjdGlvblwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiY2xpZW50LXN0b3J5LWRldGFpbC1zZWN0aW9uIHNlY3Rpb24tc3BhY2VcIiB9LFxuICAgIFtcbiAgICAgIF92bS5zdG9yeVxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJweS0wXCIsIGF0dHJzOiB7IFwiZ3JpZC1saXN0LWxnXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInB0LTBcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWwtMCBtdC0wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG91dGxpbmU6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ub25Hb2JhY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNoZXZyb25fbGVmdFwiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJHbyBiYWNrXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyByb3c6IFwiXCIsIHdyYXA6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgeHMxMjogXCJcIiwgc20xMjogXCJcIiwgbWQ3OiBcIlwiLCBsZzg6IFwiXCIsIHhsODogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInN0b3J5LWNvbnRlbnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ub3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtYmFkZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyByaWdodDogXCJcIiwgY29sb3I6IFwiYmxhY2tcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBzbG90OiBcImJhZGdlXCIgfSwgc2xvdDogXCJiYWRnZVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1pY29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBkYXJrOiBcIlwiLCBjb2xvcjogXCJ3aGl0ZVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiZG9uZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IF92bS5fcyhfdm0uc3RvcnkudGl0bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX2MoXCJoMlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5zdG9yeS50aXRsZSkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FwdGlvblwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkF1dGhvcjogXCIgKyBfdm0uX3MoX3ZtLnN0b3J5LmF1dGhvcikgKyBcIiB8IFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNyZWF0ZWQgYXQ6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjb252ZXJ0RGF0ZVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnN0b3J5LmRhdGVfaW5nZXN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJiclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IF92bS5fcyhfdm0uc3RvcnkuZGVzY3JpcHRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJidXktcXVvdGUtYnV0dG9uLWNvbXBvbmVudFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJzdG9yeVwiLCBhc3NldDogX3ZtLnN0b3J5IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2xpZW50LWFzc2V0c1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHhzMTI6IFwiXCIsIHNtMTI6IFwiXCIsIG1kNTogXCJcIiwgbGc0OiBcIlwiLCB4bDQ6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KFwiQXNzZXRzXCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtZGl2aWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBcIm1hcmdpbi1ib3R0b21cIjogXCIyMHB4XCIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLmFzc2V0cywgZnVuY3Rpb24oYXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5hc3NldHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiYXNzZXQtY29tcG9uZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBhc3NldC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldDogYXNzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRzOiBfdm0uYXNzZXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3J5X2lkOiBfdm0uc3RvcnkuYWxwaGFfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9jKFwidi1mbGV4XCIsIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiU29ycnkgbm8gYXNzZXRzIHdpdGggdGhpcyBzdG9yeVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtMjZhMTFkNmVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTI2YTExZDZlXCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3N0b3JpZXMvU3RvcnlEZXRhaWxDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3NzVcbi8vIG1vZHVsZSBjaHVua3MgPSA0Il0sInNvdXJjZVJvb3QiOiIifQ==