webpackJsonp([9],{

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(755)
/* template */
var __vue_template__ = __webpack_require__(756)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/videos/VideoDetailComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-81819746", Component.options)
  } else {
    hotAPI.reload("data-v-81819746", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_components_VideoPlayerComponent__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_components_VideoPlayerComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scripts_components_VideoPlayerComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_BuyQuoteButtonComponent__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_BuyQuoteButtonComponent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__includes_BuyQuoteButtonComponent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(32);
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






/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        BuyQuoteButtonComponent: __WEBPACK_IMPORTED_MODULE_1__includes_BuyQuoteButtonComponent___default.a,
        videoPlayer: __WEBPACK_IMPORTED_MODULE_0__scripts_components_VideoPlayerComponent___default.a
    },

    data: function data() {
        return {
            content_padding: true
        };
    },


    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapGetters */])({}), {

        video: {
            get: function get() {
                return this.$store.getters.getCurrentVideo;
            }
        },

        tags: function tags() {
            return this.$store.getters.getCurrentVideoTags;
        }
    }),

    created: function created() {
        var breakpoint = this.$vuetify.breakpoint.name;
        if (breakpoint === 'sm' || breakpoint === 'xs') {
            this.content_padding = false;
        }

        var alpha_id = this.$route.params.alpha_id;

        this.$store.commit('setCurrentVideoAlphaId', alpha_id);
        this.$store.commit('setCurrentRouteObject', this.$route);
        this.$store.dispatch('getVideoNextAndPrevLink', { alpha_id: alpha_id });
    },


    methods: {
        onGoback: function onGoback() {
            this.$router.go(-1);
        }
    }

});

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "videos-section" }, [
    _c(
      "div",
      { staticClass: "videos-detail-section section-space" },
      [
        _c(
          "v-container",
          { attrs: { "grid-list-xl": "" } },
          [
            _c(
              "v-layout",
              { attrs: { row: "", wrap: "" } },
              [
                _c(
                  "v-flex",
                  { attrs: { xs12: "" } },
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
                    attrs: {
                      "align-content-center": "",
                      xs12: "",
                      sm12: "",
                      md7: "",
                      lg7: "",
                      xl7: ""
                    }
                  },
                  [_c("video-player", { attrs: { video: _vm.video } })],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-flex",
                  { attrs: { xs12: "", sm12: "", md5: "", lg5: "", xl5: "" } },
                  [
                    _c(
                      "v-layout",
                      {
                        staticClass: "video-detail-content",
                        class: { "pl-4": _vm.content_padding },
                        attrs: { row: "", wrap: "" }
                      },
                      [
                        _c(
                          "v-flex",
                          { attrs: { xs12: "" } },
                          [
                            _c("h2", [_vm._v(_vm._s(_vm.video.title))]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "video-title-caption" },
                              [
                                _c(
                                  "v-layout",
                                  {
                                    attrs: {
                                      row: "",
                                      wrap: "",
                                      "justify-center": ""
                                    }
                                  },
                                  [
                                    _vm.video.duration != null
                                      ? _c(
                                          "v-flex",
                                          { attrs: { xs6: "" } },
                                          [
                                            _c(
                                              "v-icon",
                                              { attrs: { small: "" } },
                                              [_vm._v("alarm")]
                                            ),
                                            _vm._v(
                                              _vm._s(
                                                _vm._f("convertTime")(
                                                  _vm.video.duration
                                                )
                                              ) +
                                                "\n                                    "
                                            )
                                          ],
                                          1
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c("v-spacer"),
                                    _vm._v(" "),
                                    _vm.video.views
                                      ? _c(
                                          "v-flex",
                                          {
                                            staticClass: "text-xs-right",
                                            attrs: { xs6: "" }
                                          },
                                          [
                                            _c(
                                              "v-icon",
                                              { attrs: { small: "" } },
                                              [_vm._v("remove_red_eye")]
                                            ),
                                            _vm._v(
                                              " " +
                                                _vm._s(_vm.video.views + 1) +
                                                " views\n                                    "
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
                            ),
                            _vm._v(" "),
                            _vm.video.description != "null"
                              ? _c("p", [_vm._v(_vm._s(_vm.video.description))])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.tags.length > 0
                              ? _c(
                                  "div",
                                  { staticClass: "video-detail-tags" },
                                  [
                                    _c("h3", { attrs: { id: "tags" } }, [
                                      _vm._v("Tags:")
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "ul",
                                      _vm._l(_vm.tags, function(tag) {
                                        return _c(
                                          "li",
                                          [
                                            _c(
                                              "router-link",
                                              {
                                                attrs: {
                                                  to: "/videos?tag=" + tag.name
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                            #" +
                                                    _vm._s(tag.name) +
                                                    "\n                                        "
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        )
                                      })
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _c("buy-quote-button-component", {
                              attrs: { type: "video", asset: _vm.video }
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
    require("vue-hot-reload-api")      .rerender("data-v-81819746", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdmlkZW9zL1ZpZGVvRGV0YWlsQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3ZpZGVvcy9WaWRlb0RldGFpbENvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3ZpZGVvcy9WaWRlb0RldGFpbENvbXBvbmVudC52dWU/MGFlOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNxQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsMEdBREE7QUFFQTtBQUZBLEtBREE7O0FBTUEsUUFOQSxrQkFNQTtBQUNBO0FBQ0E7QUFEQTtBQUdBLEtBVkE7OztBQVlBLDJCQUNBLG9FQURBOztBQUtBO0FBQ0EsZUFEQSxpQkFDQTtBQUNBO0FBQ0E7QUFIQSxTQUxBOztBQVdBLFlBWEEsa0JBV0E7QUFDQTtBQUNBO0FBYkEsTUFaQTs7QUE2QkEsV0E3QkEscUJBNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBR0EsS0ExQ0E7OztBQTRDQTtBQUNBLGdCQURBLHNCQUNBO0FBQ0E7QUFDQTtBQUhBOztBQTVDQSxHOzs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdDQUFnQztBQUN4RDtBQUNBO0FBQ0EsT0FBTyxxREFBcUQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTLHFCQUFxQixFQUFFO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUyxvQkFBb0IsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUyxXQUFXLEVBQUU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxjQUFjO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTLG9CQUFvQixFQUFFO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQix1Q0FBdUMsU0FBUyxtQkFBbUIsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVMsZ0RBQWdELEVBQUU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw4QkFBOEI7QUFDOUQsZ0NBQWdDO0FBQ2hDLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUyxXQUFXLEVBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixxQ0FBcUM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFNBQVMsVUFBVSxFQUFFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxTQUFTLFlBQVksRUFBRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRCwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFNBQVMsWUFBWSxFQUFFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1DQUFtQztBQUN0RTtBQUNBLDhDQUE4QyxTQUFTLGFBQWEsRUFBRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9WaWRlb0RldGFpbENvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTgxODE5NzQ2XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vVmlkZW9EZXRhaWxDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy92aWRlb3MvVmlkZW9EZXRhaWxDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTgxODE5NzQ2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtODE4MTk3NDZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy92aWRlb3MvVmlkZW9EZXRhaWxDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA1NDFcbi8vIG1vZHVsZSBjaHVua3MgPSA5IiwiPHRlbXBsYXRlPlxuICAgIDwhLS0gVklERU9TIElURU0gU0VDVElPTiAtLT5cbiAgICA8c2VjdGlvbiBjbGFzcz1cInZpZGVvcy1zZWN0aW9uXCI+XG4gICAgICAgIDwhLS08ZGl2IGlkPVwiaGVhZGVyXCIgY2xhc3M9XCJwYWdlLXZpZGVvc1wiPi0tPlxuICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJoZWFkZXItY29udGVudFwiPi0tPlxuICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicG9zaXRpb24tY2VudGVyXCI+LS0+XG4gICAgICAgICAgICAgICAgICAgIDwhLS08di1jb250YWluZXIgZ3JpZC1saXN0LWxnPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTx2LWxheW91dCByb3cgd3JhcD4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPHYtZmxleCB4czEyPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGgxIGNsYXNzPVwiaGVhZGluZ1wiPnt7dmlkZW8udGl0bGUgPyB2aWRlby50aXRsZSA6ICcnfX08L2gxPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3YtZmxleD4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L3YtbGF5b3V0Pi0tPlxuICAgICAgICAgICAgICAgICAgICA8IS0tPC92LWNvbnRhaW5lcj4tLT5cbiAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgIDwhLS08L2Rpdj4tLT5cblxuICAgICAgICA8IS0tIFZJREVPUyBERVRBSUwgU0VDVElPTiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvcy1kZXRhaWwtc2VjdGlvbiBzZWN0aW9uLXNwYWNlXCI+XG4gICAgICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LXhsPlxuICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuIG91dGxpbmUgQGNsaWNrPVwib25Hb2JhY2soKVwiIGNsYXNzPVwibWwtMFwiPjx2LWljb24+Y2hldnJvbl9sZWZ0PC92LWljb24+R28gYmFjazwvdi1idG4+XG4gICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgIDx2LWZsZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbi1jb250ZW50LWNlbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhzMTIgc20xMiBtZDcgbGc3IHhsNz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2aWRlby1wbGF5ZXIgOnZpZGVvPVwidmlkZW9cIj48L3ZpZGVvLXBsYXllcj5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyIHNtMTIgbWQ1IGxnNSB4bDU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAgY2xhc3M9XCJ2aWRlby1kZXRhaWwtY29udGVudFwiIDpjbGFzcz1cInsncGwtNCcgOiBjb250ZW50X3BhZGRpbmd9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+e3sgdmlkZW8udGl0bGUgfX08L2gyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby10aXRsZS1jYXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXAganVzdGlmeS1jZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czYgdi1pZj1cInZpZGVvLmR1cmF0aW9uICE9IG51bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzbWFsbD5hbGFybTwvdi1pY29uPnt7dmlkZW8uZHVyYXRpb24gfCBjb252ZXJ0VGltZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtc3BhY2VyPjwvdi1zcGFjZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzNiBjbGFzcz1cInRleHQteHMtcmlnaHRcIiB2LWlmPVwidmlkZW8udmlld3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtaWNvbiBzbWFsbCA+cmVtb3ZlX3JlZF9leWU8L3YtaWNvbj4ge3sgdmlkZW8udmlld3MrMX19IHZpZXdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCB2LWlmPVwidmlkZW8uZGVzY3JpcHRpb24gIT0gJ251bGwnXCI+e3sgdmlkZW8uZGVzY3JpcHRpb24gfX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1kZXRhaWwtdGFnc1wiIHYtaWY9XCJ0YWdzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBpZD1cInRhZ3NcIj5UYWdzOjwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwidGFnIGluIHRhZ3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cIicvdmlkZW9zP3RhZz0nK3RhZy5uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAje3sgdGFnLm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1eS1xdW90ZS1idXR0b24tY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR5cGU9XCIndmlkZW8nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6YXNzZXQ9XCJ2aWRlb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L2J1eS1xdW90ZS1idXR0b24tY29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG4gICAgICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IFZpZGVvUGxheWVyIGZyb20gJy4uLy4uLy4uLy4uL3NjcmlwdHMvY29tcG9uZW50cy9WaWRlb1BsYXllckNvbXBvbmVudCdcbiAgICBpbXBvcnQgQnV5UXVvdGVCdXR0b25Db21wb25lbnQgZnJvbSBcIi4uLy4uL2luY2x1ZGVzL0J1eVF1b3RlQnV0dG9uQ29tcG9uZW50XCI7XG5cbiAgICBpbXBvcnQge21hcEdldHRlcnMgfSBmcm9tICd2dWV4JztcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgQnV5UXVvdGVCdXR0b25Db21wb25lbnQsXG4gICAgICAgICAgICB2aWRlb1BsYXllcjogVmlkZW9QbGF5ZXIsXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29udGVudF9wYWRkaW5nOnRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIC4uLm1hcEdldHRlcnMoe1xuXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICBnZXQoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Q3VycmVudFZpZGVvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRhZ3MoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRDdXJyZW50VmlkZW9UYWdzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIGxldCBicmVha3BvaW50ID0gdGhpcy4kdnVldGlmeS5icmVha3BvaW50Lm5hbWU7XG4gICAgICAgICAgICBpZihicmVha3BvaW50ID09PSAnc20nIHx8IGJyZWFrcG9pbnQgPT09ICd4cycgKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRfcGFkZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgYWxwaGFfaWQgPSB0aGlzLiRyb3V0ZS5wYXJhbXMuYWxwaGFfaWQ7XG5cbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0Q3VycmVudFZpZGVvQWxwaGFJZCcsIGFscGhhX2lkKTtcbiAgICAgICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0Q3VycmVudFJvdXRlT2JqZWN0JywgdGhpcy4kcm91dGUpO1xuICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2dldFZpZGVvTmV4dEFuZFByZXZMaW5rJywge2FscGhhX2lkOiBhbHBoYV9pZH0pO1xuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvbkdvYmFjaygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIuZ28oLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdmlkZW9zL1ZpZGVvRGV0YWlsQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJzZWN0aW9uXCIsIHsgc3RhdGljQ2xhc3M6IFwidmlkZW9zLXNlY3Rpb25cIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJ2aWRlb3MtZGV0YWlsLXNlY3Rpb24gc2VjdGlvbi1zcGFjZVwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICB7IGF0dHJzOiB7IFwiZ3JpZC1saXN0LXhsXCI6IFwiXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtbC0wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBvdXRsaW5lOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uR29iYWNrKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNoZXZyb25fbGVmdFwiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiR28gYmFja1wiKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJhbGlnbi1jb250ZW50LWNlbnRlclwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHhzMTI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc20xMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICBtZDc6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGc3OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHhsNzogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW19jKFwidmlkZW8tcGxheWVyXCIsIHsgYXR0cnM6IHsgdmlkZW86IF92bS52aWRlbyB9IH0pXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiLCBzbTEyOiBcIlwiLCBtZDU6IFwiXCIsIGxnNTogXCJcIiwgeGw1OiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInZpZGVvLWRldGFpbC1jb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBcInBsLTRcIjogX3ZtLmNvbnRlbnRfcGFkZGluZyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMlwiLCBbX3ZtLl92KF92bS5fcyhfdm0udmlkZW8udGl0bGUpKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ2aWRlby10aXRsZS1jYXB0aW9uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqdXN0aWZ5LWNlbnRlclwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udmlkZW8uZHVyYXRpb24gIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHM2OiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWljb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHNtYWxsOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiYWxhcm1cIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX2YoXCJjb252ZXJ0VGltZVwiKShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLmR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi1zcGFjZXJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnZpZGVvLnZpZXdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LXhzLXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHhzNjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgc21hbGw6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJyZW1vdmVfcmVkX2V5ZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0udmlkZW8udmlld3MgKyAxKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiB2aWV3c1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52aWRlby5kZXNjcmlwdGlvbiAhPSBcIm51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInBcIiwgW192bS5fdihfdm0uX3MoX3ZtLnZpZGVvLmRlc2NyaXB0aW9uKSldKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS50YWdzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInZpZGVvLWRldGFpbC10YWdzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgzXCIsIHsgYXR0cnM6IHsgaWQ6IFwidGFnc1wiIH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJUYWdzOlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWdzLCBmdW5jdGlvbih0YWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogXCIvdmlkZW9zP3RhZz1cIiArIHRhZy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0YWcubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImJ1eS1xdW90ZS1idXR0b24tY29tcG9uZW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidmlkZW9cIiwgYXNzZXQ6IF92bS52aWRlbyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtODE4MTk3NDZcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTgxODE5NzQ2XCIsXCJoYXNTY29wZWRcIjpmYWxzZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3ZpZGVvcy9WaWRlb0RldGFpbENvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDkiXSwic291cmNlUm9vdCI6IiJ9