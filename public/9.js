webpackJsonp([9],{

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(766)
/* template */
var __vue_template__ = __webpack_require__(767)
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

/***/ 766:
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

/***/ 767:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdW5zdWJzY3JpYmUvVW5zdWJzY3JpYmVDb21wb25lbnQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdW5zdWJzY3JpYmUvVW5zdWJzY3JpYmVDb21wb25lbnQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy91bnN1YnNjcmliZS9VbnN1YnNjcmliZUNvbXBvbmVudC52dWU/YTNjNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBLEtBREEsa0JBQ0E7QUFDQTtBQUNBLFlBREE7QUFFQSxvQkFGQTtBQUdBLHlCQUhBO0FBSUEsd0JBSkE7QUFLQSxzQkFMQTs7QUFPQTtBQUNBLGlCQVJBO0FBU0E7QUFUQTtBQVdBLEVBYkE7QUFlQSxRQWZBLHFCQWVBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFWQTtBQVdBO0FBQ0EsRUFqQ0E7OztBQW1DQTtBQUNBLGVBREEsMkJBQ0E7QUFBQTs7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsS0FUQSxFQVNBLElBVEE7QUFVQSxJQWZBLEVBZ0JBLEtBaEJBLENBZ0JBLGtCQUVBLENBbEJBO0FBbUJBO0FBekJBO0FBbkNBLEc7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxTQUFTLG9CQUFvQixFQUFFO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUywyQ0FBMkMsRUFBRTtBQUMvRDtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsYUFBYSxFQUFFO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTLCtCQUErQixFQUFFO0FBQzNEO0FBQ0EscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0EsdUJBQXVCLHdEQUF3RDtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywyQkFBMkI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9VbnN1YnNjcmliZUNvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTMxNzI3MDM2XFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vVW5zdWJzY3JpYmVDb21wb25lbnQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gbnVsbFxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy91bnN1YnNjcmliZS9VbnN1YnNjcmliZUNvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMzE3MjcwMzZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0zMTcyNzAzNlwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3Vuc3Vic2NyaWJlL1Vuc3Vic2NyaWJlQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTUxXG4vLyBtb2R1bGUgY2h1bmtzID0gOSIsIjx0ZW1wbGF0ZT5cblx0PHYtY29udGFpbmVyIGZpbGwtaGVpZ2h0PlxuXHRcdDx2LWxheW91dCBqdXN0aWZ5LWNlbnRlciBhbGlnbi1jZW50ZXI+XG5cdFx0XHQ8di1mbGV4IHNocmluaz5cblx0XHRcdFx0PHYtY2FyZCBjb2xvcj1cImxpZ2h0XCIgd2lkdGg9XCI0NTBcIj5cblx0ICAgICAgICAgICAgICA8di1jYXJkLXRleHQgY2xhc3M9XCJ0ZXh0LXhzLWNlbnRlclwiPlxuICAgICAgICAgICAgICBcdFx0PGRpdiBjbGFzcz1cImhlYWRsaW5lIHRleHQtdXBwZXJjYXNlIHRleHQteHMtY2VudGVyXCI+VW5zdWJzY3JpYmU8L2Rpdj5cbiAgICAgICAgICAgICAgXHRcdDxkaXYgdi1pZj1cImNvbnRhY3RGb3VuZFwiPlxuICAgICAgICAgICAgICBcdFx0XHQ8cD5QbGVhc2UgcmV2aWV3IHlvdXIgZW1haWwgYWRkZHJlc3MgYmVsb3cgYW5kIGNsaWNrICd1bnN1YnNjcmliZScgdG8gZGVsZXRlIHlvdXIgZGV0YWlscyBmcm9tIG91ciBwbGF0Zm9ybS4gPHN0cm9uZz5XYXJuaW5nOjwvc3Ryb25nPiBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lIGFuZCB3aWxsIGJlIHBlcm1hbmVudC48L3A+XG4gICAgICAgICAgICAgIFx0XHRcdDxwIGNsYXNzPVwicmVkLS10ZXh0XCI+e3sgZGlzcGxheV9lbWFpbCB9fTwvcD5cbiAgICAgICAgICBcdFx0XHRcbiAgICAgICAgICBcdFx0XHRcdDx2LWJ0biBkYXJrIFxuICAgICAgICAgIFx0XHRcdFx0XHRAY2xpY2s9XCJvblVuc3Vic2NyaWJlKClcIlxuICAgICAgICAgIFx0XHRcdFx0XHQ6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5VbnN1YnNjcmliZTwvdi1idG4+XG4gICAgICAgICAgICAgIFx0XHQ8L2Rpdj5cbiAgICAgICAgICAgICAgXHRcdFx0XG4gICAgICAgICAgICAgIFx0XHQ8ZGl2IHYtaWY9XCJjb250YWN0RGVsZXRlZFwiPlxuICAgICAgICAgICAgICBcdFx0XHQ8cCBjbGFzcz1cInJlZC0tdGV4dFwiPllvdXIgZGV0YWlscyBoYXZlIGJlZW4gZGVsZXRlZCBmcm9tIG91ciBwbGF0Zm9ybS48L3A+XG4gICAgICAgICAgICAgIFx0XHQ8L2Rpdj5cblxuICAgICAgICAgICAgICBcdFx0PGRpdiB2LWlmPVwiY29udGFjdE5vdEZvdW5kXCI+XG4gICAgICAgICAgICAgIFx0XHRcdDxwPlNvcnJ5LCB3ZSBjYW5ub3QgZmluZCB0aGUgZW1haWwgYXNzb2NpYXRlZCB3aXRoIHlvdXIgYWNjb3VudC4gUGxlYXNlIGNvbnRhY3QgPHU+bGljZW5zaW5nQHVuaWxhZC5jby51azwvdT48L3A+XG4gICAgICAgICAgICAgIFx0XHQ8L2Rpdj5cblx0ICAgICAgICAgICAgICA8L3YtY2FyZC10ZXh0PlxuXHQgICAgICAgICAgICA8L3YtY2FyZD5cblx0XHRcdDwvdi1mbGV4PlxuXHRcdDwvdi1sYXlvdXQ+XG5cdDwvdi1jb250YWluZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXHRkYXRhKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRlbWFpbDogJycsXG5cdFx0XHRkaXNwbGF5X2VtYWlsOicnLFxuXHRcdFx0Y29udGFjdE5vdEZvdW5kOiBmYWxzZSxcblx0XHRcdGNvbnRhY3REZWxldGVkOiBmYWxzZSxcblx0XHRcdGNvbnRhY3RGb3VuZDogZmFsc2UsXG5cblx0XHRcdC8vTG9hZGluZyBidXR0b25cbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgbG9hZGVyOiBudWxsLFxuXHRcdH1cblx0fSxcblxuXHRjcmVhdGVkKCl7XG5cdFx0dGhpcy5lbWFpbCA9IHRoaXMuJHJvdXRlLnBhcmFtcy5lbWFpbDtcblx0XHRpZih0aGlzLmVtYWlsKXtcblx0XHRcdGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XG5cdFx0XHRsZXQgdXJsID0gJy91bnN1YnNjcmliZS8nK3RoaXMuZW1haWw7XG5cdFx0XHRheGlvcy5nZXQodXJsLCBmb3JtRGF0YSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRpZihyZXNwb25zZS5kYXRhLmVycm9yKXtcblx0XHRcdFx0XHR0aGlzLmNvbnRhY3ROb3RGb3VuZCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihyZXNwb25zZS5kYXRhLnN1Y2Nlc3Mpe1xuXHRcdFx0XHRcdHRoaXMuY29udGFjdEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXlfZW1haWwgPSByZXNwb25zZS5kYXRhLmNvbnRhY3QuZW1haWw7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblxuXHRtZXRob2RzOiB7XG5cdFx0b25VbnN1YnNjcmliZSgpIHtcblx0XHRcdGxldCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRmb3JtLmFwcGVuZCgna2V5JywgdGhpcy5lbWFpbCk7XG5cblx0XHRcdC8vcmVxdWVzdCBmb3IgdW5zdWJzY3JpYmVcblx0XHRcdGF4aW9zLnBvc3QoJy91bnN1YnNjcmliZScsIGZvcm0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGE7XG5cdFx0XHRcdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdFx0XHRcdFxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIFx0Ly8gc2V0IGRlZmF1bHQgXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWN0Tm90Rm91bmQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMuY29udGFjdERlbGV0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dGhpcy5jb250YWN0Rm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cdFx0fVxuXHR9XG59XG48L3NjcmlwdD5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL3Vuc3Vic2NyaWJlL1Vuc3Vic2NyaWJlQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgIHsgYXR0cnM6IHsgXCJmaWxsLWhlaWdodFwiOiBcIlwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IFwianVzdGlmeS1jZW50ZXJcIjogXCJcIiwgXCJhbGlnbi1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHNocmluazogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1jYXJkXCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyBjb2xvcjogXCJsaWdodFwiLCB3aWR0aDogXCI0NTBcIiB9IH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LWNhcmQtdGV4dFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQteHMtY2VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaGVhZGxpbmUgdGV4dC11cHBlcmNhc2UgdGV4dC14cy1jZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJVbnN1YnNjcmliZVwiKV1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmNvbnRhY3RGb3VuZFxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBsZWFzZSByZXZpZXcgeW91ciBlbWFpbCBhZGRkcmVzcyBiZWxvdyBhbmQgY2xpY2sgJ3Vuc3Vic2NyaWJlJyB0byBkZWxldGUgeW91ciBkZXRhaWxzIGZyb20gb3VyIHBsYXRmb3JtLiBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3Ryb25nXCIsIFtfdm0uX3YoXCJXYXJuaW5nOlwiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lIGFuZCB3aWxsIGJlIHBlcm1hbmVudC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwicmVkLS10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZGlzcGxheV9lbWFpbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vblVuc3Vic2NyaWJlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiVW5zdWJzY3JpYmVcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmNvbnRhY3REZWxldGVkXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcInJlZC0tdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIllvdXIgZGV0YWlscyBoYXZlIGJlZW4gZGVsZXRlZCBmcm9tIG91ciBwbGF0Zm9ybS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLmNvbnRhY3ROb3RGb3VuZFxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU29ycnksIHdlIGNhbm5vdCBmaW5kIHRoZSBlbWFpbCBhc3NvY2lhdGVkIHdpdGggeW91ciBhY2NvdW50LiBQbGVhc2UgY29udGFjdCBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ1XCIsIFtfdm0uX3YoXCJsaWNlbnNpbmdAdW5pbGFkLmNvLnVrXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi0zMTcyNzAzNlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtMzE3MjcwMzZcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvdW5zdWJzY3JpYmUvVW5zdWJzY3JpYmVDb21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA3Njdcbi8vIG1vZHVsZSBjaHVua3MgPSA5Il0sInNvdXJjZVJvb3QiOiIifQ==