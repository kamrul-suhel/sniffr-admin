webpackJsonp([10],{

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(763)
/* template */
var __vue_template__ = __webpack_require__(764)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/unsubscribe/UnsubscribeComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31727036", Component.options)
  } else {
    hotAPI.reload("data-v-31727036", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 763:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			email: '',
			display_email: '',
			contactNotFound: false,
			contactDeleted: false,
			contactFound: false,

			//Loading button
			loading: false,
			loader: null
		};
	},
	created: function created() {
		var _this = this;

		this.email = this.$route.params.email;
		if (this.email) {
			var formData = new FormData();

			var url = '/unsubscribe/' + this.email;
			axios.get(url, formData).then(function (response) {
				if (response.data.error) {
					_this.contactNotFound = true;
				}

				if (response.data.success) {
					_this.contactFound = true;
					_this.display_email = response.data.contact.email;
				}
			});
		}
	},


	methods: {
		onUnsubscribe: function onUnsubscribe() {
			var _this2 = this;

			var form = new FormData();
			form.append('key', this.email);

			//request for unsubscribe
			axios.post('/unsubscribe', form).then(function (response) {
				var result = response.data;
				_this2.loading = true;

				setTimeout(function () {
					_this2.loading = false;
					if (response.data.success) {
						// set default 
						_this2.contactNotFound = false;
						_this2.contactDeleted = true;
						_this2.contactFound = false;
					}
				}, 1000);
			}).catch(function (error) {});
		}
	}
});

/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "fill-height": "" } },
    [
      _c(
        "v-layout",
        { attrs: { "justify-center": "", "align-center": "" } },
        [
          _c(
            "v-flex",
            { attrs: { shrink: "" } },
            [
              _c(
                "v-card",
                { attrs: { color: "light", width: "450" } },
                [
                  _c("v-card-text", { staticClass: "text-xs-center" }, [
                    _c(
                      "div",
                      { staticClass: "headline text-uppercase text-xs-center" },
                      [_vm._v("Unsubscribe")]
                    ),
                    _vm._v(" "),
                    _vm.contactFound
                      ? _c(
                          "div",
                          [
                            _c("p", [
                              _vm._v(
                                "Please review your email adddress below and click 'unsubscribe' to delete your details from our platform. "
                              ),
                              _c("strong", [_vm._v("Warning:")]),
                              _vm._v(
                                " This action cannot be undone and will be permanent."
                              )
                            ]),
                            _vm._v(" "),
                            _c("p", { staticClass: "red--text" }, [
                              _vm._v(_vm._s(_vm.display_email))
                            ]),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                attrs: {
                                  dark: "",
                                  loading: _vm.loading,
                                  disabled: _vm.loading
                                },
                                on: {
                                  click: function($event) {
                                    _vm.onUnsubscribe()
                                  }
                                }
                              },
                              [_vm._v("Unsubscribe")]
                            )
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.contactDeleted
                      ? _c("div", [
                          _c("p", { staticClass: "red--text" }, [
                            _vm._v(
                              "Your details have been deleted from our platform."
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.contactNotFound
                      ? _c("div", [
                          _c("p", [
                            _vm._v(
                              "Sorry, we cannot find the email associated with your account. Please contact "
                            ),
                            _c("u", [_vm._v("licensing@unilad.co.uk")])
                          ])
                        ])
                      : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-31727036", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdW5zdWJzY3JpYmUvVW5zdWJzY3JpYmVDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdW5zdWJzY3JpYmUvVW5zdWJzY3JpYmVDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy91bnN1YnNjcmliZS9VbnN1YnNjcmliZUNvbXBvbmVudC52dWU/YTNjNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBLEtBREEsa0JBQ0E7QUFDQTtBQUNBLFlBREE7QUFFQSxvQkFGQTtBQUdBLHlCQUhBO0FBSUEsd0JBSkE7QUFLQSxzQkFMQTs7QUFPQTtBQUNBLGlCQVJBO0FBU0E7QUFUQTtBQVdBLEVBYkE7QUFlQSxRQWZBLHFCQWVBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFWQTtBQVdBO0FBQ0EsRUFqQ0E7OztBQW1DQTtBQUNBLGVBREEsMkJBQ0E7QUFBQTs7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsS0FUQSxFQVNBLElBVEE7QUFVQSxJQWZBLEVBZ0JBLEtBaEJBLENBZ0JBLGtCQUVBLENBbEJBO0FBbUJBO0FBekJBO0FBbkNBLEc7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxTQUFTLG9CQUFvQixFQUFFO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUywyQ0FBMkMsRUFBRTtBQUMvRDtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsYUFBYSxFQUFFO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLCtCQUErQixFQUFFO0FBQzNEO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0EsdUJBQXVCLHdEQUF3RDtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywyQkFBMkI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XV19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vVW5zdWJzY3JpYmVDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi0zMTcyNzAzNlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL1Vuc3Vic2NyaWJlQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdW5zdWJzY3JpYmUvVW5zdWJzY3JpYmVDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTMxNzI3MDM2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtMzE3MjcwMzZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy91bnN1YnNjcmliZS9VbnN1YnNjcmliZUNvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDU0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEwIiwiPHRlbXBsYXRlPlxuXHQ8di1jb250YWluZXIgZmlsbC1oZWlnaHQ+XG5cdFx0PHYtbGF5b3V0IGp1c3RpZnktY2VudGVyIGFsaWduLWNlbnRlcj5cblx0XHRcdDx2LWZsZXggc2hyaW5rPlxuXHRcdFx0XHQ8di1jYXJkIGNvbG9yPVwibGlnaHRcIiB3aWR0aD1cIjQ1MFwiPlxuXHQgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dCBjbGFzcz1cInRleHQteHMtY2VudGVyXCI+XG4gICAgICAgICAgICAgIFx0XHQ8ZGl2IGNsYXNzPVwiaGVhZGxpbmUgdGV4dC11cHBlcmNhc2UgdGV4dC14cy1jZW50ZXJcIj5VbnN1YnNjcmliZTwvZGl2PlxuICAgICAgICAgICAgICBcdFx0PGRpdiB2LWlmPVwiY29udGFjdEZvdW5kXCI+XG4gICAgICAgICAgICAgIFx0XHRcdDxwPlBsZWFzZSByZXZpZXcgeW91ciBlbWFpbCBhZGRkcmVzcyBiZWxvdyBhbmQgY2xpY2sgJ3Vuc3Vic2NyaWJlJyB0byBkZWxldGUgeW91ciBkZXRhaWxzIGZyb20gb3VyIHBsYXRmb3JtLiA8c3Ryb25nPldhcm5pbmc6PC9zdHJvbmc+IFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUgYW5kIHdpbGwgYmUgcGVybWFuZW50LjwvcD5cbiAgICAgICAgICAgICAgXHRcdFx0PHAgY2xhc3M9XCJyZWQtLXRleHRcIj57eyBkaXNwbGF5X2VtYWlsIH19PC9wPlxuICAgICAgICAgIFx0XHRcdFxuICAgICAgICAgIFx0XHRcdFx0PHYtYnRuIGRhcmsgXG4gICAgICAgICAgXHRcdFx0XHRcdEBjbGljaz1cIm9uVW5zdWJzY3JpYmUoKVwiXG4gICAgICAgICAgXHRcdFx0XHRcdDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmRpc2FibGVkPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlVuc3Vic2NyaWJlPC92LWJ0bj5cbiAgICAgICAgICAgICAgXHRcdDwvZGl2PlxuICAgICAgICAgICAgICBcdFx0XHRcbiAgICAgICAgICAgICAgXHRcdDxkaXYgdi1pZj1cImNvbnRhY3REZWxldGVkXCI+XG4gICAgICAgICAgICAgIFx0XHRcdDxwIGNsYXNzPVwicmVkLS10ZXh0XCI+WW91ciBkZXRhaWxzIGhhdmUgYmVlbiBkZWxldGVkIGZyb20gb3VyIHBsYXRmb3JtLjwvcD5cbiAgICAgICAgICAgICAgXHRcdDwvZGl2PlxuXG4gICAgICAgICAgICAgIFx0XHQ8ZGl2IHYtaWY9XCJjb250YWN0Tm90Rm91bmRcIj5cbiAgICAgICAgICAgICAgXHRcdFx0PHA+U29ycnksIHdlIGNhbm5vdCBmaW5kIHRoZSBlbWFpbCBhc3NvY2lhdGVkIHdpdGggeW91ciBhY2NvdW50LiBQbGVhc2UgY29udGFjdCA8dT5saWNlbnNpbmdAdW5pbGFkLmNvLnVrPC91PjwvcD5cbiAgICAgICAgICAgICAgXHRcdDwvZGl2PlxuXHQgICAgICAgICAgICAgIDwvdi1jYXJkLXRleHQ+XG5cdCAgICAgICAgICAgIDwvdi1jYXJkPlxuXHRcdFx0PC92LWZsZXg+XG5cdFx0PC92LWxheW91dD5cblx0PC92LWNvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cdGRhdGEoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGVtYWlsOiAnJyxcblx0XHRcdGRpc3BsYXlfZW1haWw6JycsXG5cdFx0XHRjb250YWN0Tm90Rm91bmQ6IGZhbHNlLFxuXHRcdFx0Y29udGFjdERlbGV0ZWQ6IGZhbHNlLFxuXHRcdFx0Y29udGFjdEZvdW5kOiBmYWxzZSxcblxuXHRcdFx0Ly9Mb2FkaW5nIGJ1dHRvblxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBsb2FkZXI6IG51bGwsXG5cdFx0fVxuXHR9LFxuXG5cdGNyZWF0ZWQoKXtcblx0XHR0aGlzLmVtYWlsID0gdGhpcy4kcm91dGUucGFyYW1zLmVtYWlsO1xuXHRcdGlmKHRoaXMuZW1haWwpe1xuXHRcdFx0bGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRcblx0XHRcdGxldCB1cmwgPSAnL3Vuc3Vic2NyaWJlLycrdGhpcy5lbWFpbDtcblx0XHRcdGF4aW9zLmdldCh1cmwsIGZvcm1EYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdGlmKHJlc3BvbnNlLmRhdGEuZXJyb3Ipe1xuXHRcdFx0XHRcdHRoaXMuY29udGFjdE5vdEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcyl7XG5cdFx0XHRcdFx0dGhpcy5jb250YWN0Rm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheV9lbWFpbCA9IHJlc3BvbnNlLmRhdGEuY29udGFjdC5lbWFpbDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXG5cdG1ldGhvZHM6IHtcblx0XHRvblVuc3Vic2NyaWJlKCkge1xuXHRcdFx0bGV0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdGZvcm0uYXBwZW5kKCdrZXknLCB0aGlzLmVtYWlsKTtcblxuXHRcdFx0Ly9yZXF1ZXN0IGZvciB1bnN1YnNjcmliZVxuXHRcdFx0YXhpb3MucG9zdCgnL3Vuc3Vic2NyaWJlJywgZm9ybSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHRcdFx0XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgXHQvLyBzZXQgZGVmYXVsdCBcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3ROb3RGb3VuZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0dGhpcy5jb250YWN0RGVsZXRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRhY3RGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblx0XHR9XG5cdH1cbn1cbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdW5zdWJzY3JpYmUvVW5zdWJzY3JpYmVDb21wb25lbnQudnVlIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcInYtY29udGFpbmVyXCIsXG4gICAgeyBhdHRyczogeyBcImZpbGwtaGVpZ2h0XCI6IFwiXCIgfSB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgXCJqdXN0aWZ5LWNlbnRlclwiOiBcIlwiLCBcImFsaWduLWNlbnRlclwiOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgc2hyaW5rOiBcIlwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJ2LWNhcmRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IGNvbG9yOiBcImxpZ2h0XCIsIHdpZHRoOiBcIjQ1MFwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtY2FyZC10ZXh0XCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJoZWFkbGluZSB0ZXh0LXVwcGVyY2FzZSB0ZXh0LXhzLWNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlVuc3Vic2NyaWJlXCIpXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uY29udGFjdEZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGxlYXNlIHJldmlldyB5b3VyIGVtYWlsIGFkZGRyZXNzIGJlbG93IGFuZCBjbGljayAndW5zdWJzY3JpYmUnIHRvIGRlbGV0ZSB5b3VyIGRldGFpbHMgZnJvbSBvdXIgcGxhdGZvcm0uIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzdHJvbmdcIiwgW192bS5fdihcIldhcm5pbmc6XCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUgYW5kIHdpbGwgYmUgcGVybWFuZW50LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJyZWQtLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5kaXNwbGF5X2VtYWlsKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogX3ZtLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uVW5zdWJzY3JpYmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJVbnN1YnNjcmliZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uY29udGFjdERlbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwicmVkLS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiWW91ciBkZXRhaWxzIGhhdmUgYmVlbiBkZWxldGVkIGZyb20gb3VyIHBsYXRmb3JtLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uY29udGFjdE5vdEZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTb3JyeSwgd2UgY2Fubm90IGZpbmQgdGhlIGVtYWlsIGFzc29jaWF0ZWQgd2l0aCB5b3VyIGFjY291bnQuIFBsZWFzZSBjb250YWN0IFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInVcIiwgW192bS5fdihcImxpY2Vuc2luZ0B1bmlsYWQuY28udWtcIildKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTMxNzI3MDM2XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0zMTcyNzAzNlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy91bnN1YnNjcmliZS9VbnN1YnNjcmliZUNvbXBvbmVudC52dWVcbi8vIG1vZHVsZSBpZCA9IDc2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEwIl0sInNvdXJjZVJvb3QiOiIifQ==