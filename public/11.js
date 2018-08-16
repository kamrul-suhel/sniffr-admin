webpackJsonp([11],{

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(11)
/* script */
var __vue_script__ = __webpack_require__(796)
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
Component.options.__file = "resources/assets/frontend/scripts/pages/login/PasswordSetTokenComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13b4f69a", Component.options)
  } else {
    hotAPI.reload("data-v-13b4f69a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 796:
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
//
//
//
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
        var _this = this;

        return {
            // validation & data
            token: '',
            email: '',
            password: '',
            confirm_password: '',

            passwordType: true,
            passwordTypeConfirm: true,

            counter: 30,
            valid: false,

            passwordRules: [function (v) {
                return !!v || 'Password is required';
            }],
            passwordConfirmationRules: [function (v) {
                return !!v || 'Confirmation password is required';
            }, function (v) {
                return v == _this.password || 'Password is not match';
            }],

            //Loading button
            loading: false,
            loader: null,

            buttonDisable: false,

            showMessage: false,
            message: '',
            error: false,
            errors: []
        };
    },
    created: function created() {
        this.token = this.$route.params.token;
        this.email = this.$route.params.email;
    },


    methods: {
        onPasswordSetSubmit: function onPasswordSetSubmit() {
            var _this2 = this;

            if (this.$refs.password_set_form.validate()) {
                //collect form data
                var passworchangeform = new FormData();
                passworchangeform.append('email', this.email);
                passworchangeform.append('password', this.password);
                passworchangeform.append('password_confirmation', this.password);
                passworchangeform.append('token', this.token);

                //send request
                var requestUrl = '/password/set/' + this.token + '/' + this.email;
                axios.post(requestUrl, passworchangeform).then(function (response) {
                    _this2.showMessage = true;
                    _this2.error = false;
                    _this2.buttonDisable = true;
                    if (!response.data.error) {
                        _this2.message = response.data.success_message;

                        // Set the user store
                        _this2.$store.dispatch('getLoginStatus').then(function (response) {
                            _this2.$router.push({ name: 'client_profile' });
                        });
                    }
                }).catch(function (error) {
                    _this2.error = false;
                    _this2.showMessage = false;

                    if (error.response.data.error_message === undefined) {
                        _this2.error = true;
                        _this2.errors = error.response.data.errors;
                    } else {
                        _this2.error = true;
                        _this2.showMessage = true;
                        _this2.message = error.response.data.error_message;
                    }
                });
            }
        }
    }
});

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { staticClass: "section-space", attrs: { fluid: "", "fill-height": "" } },
    [
      _c(
        "v-layout",
        { attrs: { "align-center": "", "justify-center": "" } },
        [
          _c(
            "v-form",
            {
              ref: "password_set_form",
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  _vm.onPasswordSetSubmit()
                }
              },
              model: {
                value: _vm.valid,
                callback: function($$v) {
                  _vm.valid = $$v
                },
                expression: "valid"
              }
            },
            [
              _c(
                "v-card",
                { attrs: { width: "400" } },
                [
                  _c(
                    "v-card-text",
                    [
                      _c(
                        "v-flex",
                        { attrs: { xs12: "", "align-center": "" } },
                        [
                          _c("h2", { staticClass: "text-xs-center" }, [
                            _vm._v("SET PASSWORD")
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { xs12: "" } },
                        [
                          _vm.error && _vm.errors.email
                            ? _c("small", { staticStyle: { color: "red" } }, [
                                _vm._v(_vm._s(_vm.errors.email[0]))
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              name: "email",
                              color: "dark",
                              label: "Email"
                            },
                            model: {
                              value: _vm.email,
                              callback: function($$v) {
                                _vm.email = $$v
                              },
                              expression: "email"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { xs12: "" } },
                        [
                          _vm.error && _vm.errors.password
                            ? _c("small", { staticStyle: { color: "red" } }, [
                                _vm._v(_vm._s(_vm.errors.password[0]))
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("v-text-field", {
                            attrs: {
                              name: "password",
                              color: "dark",
                              label: "Enter your password",
                              hint: "At least 8 characters",
                              "append-icon": _vm.passwordType
                                ? "visibility"
                                : "visibility_off",
                              type: _vm.passwordType ? "password" : "text",
                              counter: _vm.counter,
                              rules: _vm.passwordRules,
                              required: ""
                            },
                            on: {
                              "click:append": function($event) {
                                _vm.passwordType = !_vm.passwordType
                              }
                            },
                            model: {
                              value: _vm.password,
                              callback: function($$v) {
                                _vm.password = $$v
                              },
                              expression: "password"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { xs12: "" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              name: "password",
                              color: "dark",
                              label: "Confirm your password",
                              "append-icon": _vm.passwordTypeConfirm
                                ? "visibility"
                                : "visibility_off",
                              type: _vm.passwordTypeConfirm
                                ? "password"
                                : "text",
                              counter: _vm.counter,
                              rules: _vm.passwordConfirmationRules,
                              required: ""
                            },
                            on: {
                              "click:append": function($event) {
                                _vm.passwordTypeConfirm = !_vm.passwordTypeConfirm
                              },
                              keyup: function($event) {
                                if (
                                  !("button" in $event) &&
                                  _vm._k(
                                    $event.keyCode,
                                    "enter",
                                    13,
                                    $event.key,
                                    "Enter"
                                  )
                                ) {
                                  return null
                                }
                                _vm.onPasswordResetSubmit()
                              }
                            },
                            model: {
                              value: _vm.confirm_password,
                              callback: function($$v) {
                                _vm.confirm_password = $$v
                              },
                              expression: "confirm_password"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { staticClass: "text-center", attrs: { xs12: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              attrs: {
                                raised: "",
                                dark: "",
                                loading: _vm.loading,
                                disabled: _vm.loading || _vm.buttonDisable
                              },
                              on: {
                                click: function($event) {
                                  _vm.onPasswordSetSubmit()
                                }
                              }
                            },
                            [_vm._v("set password")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { xs12: "", "text-xs-center": "" } },
                        [
                          _vm.showMessage
                            ? _c(
                                "span",
                                {
                                  class: [
                                    _vm.error ? "red--text" : "green--text"
                                  ]
                                },
                                [_vm._v(_vm._s(_vm.message))]
                              )
                            : _vm._e()
                        ]
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-13b4f69a", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvbG9naW4vUGFzc3dvcmRTZXRUb2tlbkNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9sb2dpbi9QYXNzd29yZFNldFRva2VuQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvbG9naW4vUGFzc3dvcmRTZXRUb2tlbkNvbXBvbmVudC52dWU/OGFkMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdUNBO0FBQ0EsUUFEQSxrQkFDQTtBQUFBOztBQUNBO0FBQ0E7QUFDQSxxQkFGQTtBQUdBLHFCQUhBO0FBSUEsd0JBSkE7QUFLQSxnQ0FMQTs7QUFPQSw4QkFQQTtBQVFBLHFDQVJBOztBQVVBLHVCQVZBO0FBV0Esd0JBWEE7O0FBYUEsNEJBQ0E7QUFBQTtBQUFBLGFBREEsQ0FiQTtBQWdCQSx3Q0FDQTtBQUFBO0FBQUEsYUFEQSxFQUVBO0FBQUE7QUFBQSxhQUZBLENBaEJBOztBQXFCQTtBQUNBLDBCQXRCQTtBQXVCQSx3QkF2QkE7O0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV1dLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9QYXNzd29yZFNldFRva2VuQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtMTNiNGY2OWFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9QYXNzd29yZFNldFRva2VuQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvbG9naW4vUGFzc3dvcmRTZXRUb2tlbkNvbXBvbmVudC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtMTNiNGY2OWFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi0xM2I0ZjY5YVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2xvZ2luL1Bhc3N3b3JkU2V0VG9rZW5Db21wb25lbnQudnVlXG4vLyBtb2R1bGUgaWQgPSA1NTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxMSIsIjx0ZW1wbGF0ZT5cbiAgICA8IS0tIFBhc3N3b3JkIHNldCBzZWN0aW9uLS0+XG5cbiAgICA8IS0tIFBhc3N3b3JkIHNldCBmb3JtIC0tPlxuICAgIDx2LWNvbnRhaW5lciBmbHVpZCBmaWxsLWhlaWdodCBjbGFzcz1cInNlY3Rpb24tc3BhY2VcIj5cbiAgICAgICAgPHYtbGF5b3V0IGFsaWduLWNlbnRlciBqdXN0aWZ5LWNlbnRlcj5cbiAgICAgICAgICAgIDx2LWZvcm0gdi1tb2RlbD1cInZhbGlkXCIgcmVmPVwicGFzc3dvcmRfc2V0X2Zvcm1cIiBAc3VibWl0LnByZXZlbnQ9XCJvblBhc3N3b3JkU2V0U3VibWl0KClcIj5cbiAgICAgICAgICAgICAgICA8di1jYXJkIHdpZHRoPVwiNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBhbGlnbi1jZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC14cy1jZW50ZXJcIj5TRVQgUEFTU1dPUkQ8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgc3R5bGU9XCJjb2xvcjpyZWRcIiB2LWlmPVwiZXJyb3IgJiYgZXJyb3JzLmVtYWlsXCI+e3sgZXJyb3JzLmVtYWlsWzBdIH19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbCBzdHlsZT1cImNvbG9yOnJlZFwiIHYtaWY9XCJlcnJvciAmJiBlcnJvcnMucGFzc3dvcmRcIj57eyBlcnJvcnMucGFzc3dvcmRbMF0gfX08L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJFbnRlciB5b3VyIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ9XCJBdCBsZWFzdCA4IGNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcHBlbmQtaWNvbj1cInBhc3N3b3JkVHlwZSA/ICd2aXNpYmlsaXR5JyA6ICd2aXNpYmlsaXR5X29mZidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrOmFwcGVuZD1cInBhc3N3b3JkVHlwZSA9ICFwYXNzd29yZFR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR5cGU9XCJwYXNzd29yZFR5cGUgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjb3VudGVyPVwiY291bnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJwYXNzd29yZFJ1bGVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQ29uZmlybSB5b3VyIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJjb25maXJtX3Bhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDphcHBlbmQtaWNvbj1cInBhc3N3b3JkVHlwZUNvbmZpcm0gPyAndmlzaWJpbGl0eScgOiAndmlzaWJpbGl0eV9vZmYnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljazphcHBlbmQ9XCJwYXNzd29yZFR5cGVDb25maXJtID0gIXBhc3N3b3JkVHlwZUNvbmZpcm1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnR5cGU9XCJwYXNzd29yZFR5cGVDb25maXJtID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Y291bnRlcj1cImNvdW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOnJ1bGVzPVwicGFzc3dvcmRDb25maXJtYXRpb25SdWxlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwib25QYXNzd29yZFJlc2V0U3VibWl0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3YtdGV4dC1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJsb2FkaW5nIHx8IGJ1dHRvbkRpc2FibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25QYXNzd29yZFNldFN1Ym1pdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+c2V0IHBhc3N3b3JkPC92LWJ0bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdGV4dC14cy1jZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cInNob3dNZXNzYWdlXCIgOmNsYXNzPVwiW2Vycm9yID8gJ3JlZC0tdGV4dCcgOiAnZ3JlZW4tLXRleHQnXVwiPnt7bWVzc2FnZX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICAgICAgPC92LWNhcmQtdGV4dD5cbiAgICAgICAgICAgICAgICA8L3YtY2FyZD5cbiAgICAgICAgICAgIDwvdi1mb3JtPlxuICAgICAgICA8L3YtbGF5b3V0PlxuICAgIDwvdi1jb250YWluZXI+XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLy8gdmFsaWRhdGlvbiAmIGRhdGFcbiAgICAgICAgICAgICAgICB0b2tlbjonJyxcbiAgICAgICAgICAgICAgICBlbWFpbDonJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDonJyxcbiAgICAgICAgICAgICAgICBjb25maXJtX3Bhc3N3b3JkOicnLFxuXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRUeXBlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkVHlwZUNvbmZpcm06IHRydWUsXG5cbiAgICAgICAgICAgICAgICBjb3VudGVyOjMwLFxuICAgICAgICAgICAgICAgIHZhbGlkOmZhbHNlLFxuXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRSdWxlczogW1xuICAgICAgICAgICAgICAgICAgICAodikgPT4gISF2IHx8ICdQYXNzd29yZCBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZENvbmZpcm1hdGlvblJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICh2KSA9PiAhIXYgfHwgJ0NvbmZpcm1hdGlvbiBwYXNzd29yZCBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICAgICAgICAgICh2KSA9PiB2ID09IHRoaXMucGFzc3dvcmQgfHwgJ1Bhc3N3b3JkIGlzIG5vdCBtYXRjaCdcbiAgICAgICAgICAgICAgICBdLFxuXG4gICAgICAgICAgICAgICAgLy9Mb2FkaW5nIGJ1dHRvblxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogbnVsbCxcblxuICAgICAgICAgICAgICAgIGJ1dHRvbkRpc2FibGU6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgc2hvd01lc3NhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcm91dGUucGFyYW1zLnRva2VuO1xuICAgICAgICAgICAgdGhpcy5lbWFpbCA9IHRoaXMuJHJvdXRlLnBhcmFtcy5lbWFpbDtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvblBhc3N3b3JkU2V0U3VibWl0KCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy4kcmVmcy5wYXNzd29yZF9zZXRfZm9ybS52YWxpZGF0ZSgpKXtcbiAgICAgICAgICAgICAgICAgICAgLy9jb2xsZWN0IGZvcm0gZGF0YVxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFzc3dvcmNoYW5nZWZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmNoYW5nZWZvcm0uYXBwZW5kKCdlbWFpbCcsIHRoaXMuZW1haWwpO1xuICAgICAgICAgICAgICAgICAgICBwYXNzd29yY2hhbmdlZm9ybS5hcHBlbmQoJ3Bhc3N3b3JkJywgdGhpcy5wYXNzd29yZCk7XG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JjaGFuZ2Vmb3JtLmFwcGVuZCgncGFzc3dvcmRfY29uZmlybWF0aW9uJywgdGhpcy5wYXNzd29yZCk7XG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JjaGFuZ2Vmb3JtLmFwcGVuZCgndG9rZW4nLCB0aGlzLnRva2VuKTtcblxuICAgICAgICAgICAgICAgICAgICAvL3NlbmQgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVxdWVzdFVybCA9ICcvcGFzc3dvcmQvc2V0LycrdGhpcy50b2tlbisnLycrdGhpcy5lbWFpbDtcbiAgICAgICAgICAgICAgICAgICAgYXhpb3MucG9zdChyZXF1ZXN0VXJsLCBwYXNzd29yY2hhbmdlZm9ybSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25EaXNhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5lcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IHJlc3BvbnNlLmRhdGEuc3VjY2Vzc19tZXNzYWdlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgdXNlciBzdG9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnZ2V0TG9naW5TdGF0dXMnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICdjbGllbnRfcHJvZmlsZSd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3JfbWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3JzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcl9tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvbG9naW4vUGFzc3dvcmRTZXRUb2tlbkNvbXBvbmVudC52dWUiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1jb250YWluZXJcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcInNlY3Rpb24tc3BhY2VcIiwgYXR0cnM6IHsgZmx1aWQ6IFwiXCIsIFwiZmlsbC1oZWlnaHRcIjogXCJcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyBcImFsaWduLWNlbnRlclwiOiBcIlwiLCBcImp1c3RpZnktY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtZm9ybVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByZWY6IFwicGFzc3dvcmRfc2V0X2Zvcm1cIixcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgIF92bS5vblBhc3N3b3JkU2V0U3VibWl0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IF92bS52YWxpZCxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICBfdm0udmFsaWQgPSAkJHZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidmFsaWRcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcInYtY2FyZFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgd2lkdGg6IFwiNDAwXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtY2FyZC10ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwiYWxpZ24tY2VudGVyXCI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImgyXCIsIHsgc3RhdGljQ2xhc3M6IFwidGV4dC14cy1jZW50ZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiU0VUIFBBU1NXT1JEXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lcnJvciAmJiBfdm0uZXJyb3JzLmVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNtYWxsXCIsIHsgc3RhdGljU3R5bGU6IHsgY29sb3I6IFwicmVkXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmVycm9ycy5lbWFpbFswXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbWFpbCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lcnJvciAmJiBfdm0uZXJyb3JzLnBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNtYWxsXCIsIHsgc3RhdGljU3R5bGU6IHsgY29sb3I6IFwicmVkXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmVycm9ycy5wYXNzd29yZFswXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRW50ZXIgeW91ciBwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogXCJBdCBsZWFzdCA4IGNoYXJhY3RlcnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kLWljb25cIjogX3ZtLnBhc3N3b3JkVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidmlzaWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ2aXNpYmlsaXR5X29mZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogX3ZtLnBhc3N3b3JkVHlwZSA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcjogX3ZtLmNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlczogX3ZtLnBhc3N3b3JkUnVsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xpY2s6YXBwZW5kXCI6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucGFzc3dvcmRUeXBlID0gIV92bS5wYXNzd29yZFR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucGFzc3dvcmQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkNvbmZpcm0geW91ciBwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmQtaWNvblwiOiBfdm0ucGFzc3dvcmRUeXBlQ29uZmlybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidmlzaWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ2aXNpYmlsaXR5X29mZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogX3ZtLnBhc3N3b3JkVHlwZUNvbmZpcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXI6IF92bS5jb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IF92bS5wYXNzd29yZENvbmZpcm1hdGlvblJ1bGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrOmFwcGVuZFwiOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnBhc3N3b3JkVHlwZUNvbmZpcm0gPSAhX3ZtLnBhc3N3b3JkVHlwZUNvbmZpcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXl1cDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKFwiYnV0dG9uXCIgaW4gJGV2ZW50KSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5rZXlDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQua2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJFbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vblBhc3N3b3JkUmVzZXRTdWJtaXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY29uZmlybV9wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmNvbmZpcm1fcGFzc3dvcmQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNvbmZpcm1fcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGV4dC1jZW50ZXJcIiwgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlzZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcms6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IF92bS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmxvYWRpbmcgfHwgX3ZtLmJ1dHRvbkRpc2FibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm9uUGFzc3dvcmRTZXRTdWJtaXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwic2V0IHBhc3N3b3JkXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwidGV4dC14cy1jZW50ZXJcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5zaG93TWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lcnJvciA/IFwicmVkLS10ZXh0XCIgOiBcImdyZWVuLS10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5tZXNzYWdlKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTEzYjRmNjlhXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi0xM2I0ZjY5YVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9sb2dpbi9QYXNzd29yZFNldFRva2VuQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTEiXSwic291cmNlUm9vdCI6IiJ9