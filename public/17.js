webpackJsonp([17],{

/***/ 560:
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
Component.options.__file = "resources/assets/frontend/scripts/pages/clients/EditUserComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cb7c1bd4", Component.options)
  } else {
    hotAPI.reload("data-v-cb7c1bd4", Component.options)
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            error: false,
            errors: null,
            valid: false,
            user: {
                full_name: null,
                job_title: null,
                email: null,
                tel: null,
                role: null
            },
            emailRules: [function (v) {
                return !!v || 'Email is required';
            }, function (v) {
                return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                );
            }],
            emailError: '',
            clientRoles: [{ id: 'client', name: 'Client' }, { id: 'client_admin', name: 'Client Admin' }]
        };
    },
    created: function created() {
        var _this = this;

        var slug = this.$route.params.slug;
        var userId = this.$route.params.userid;
        axios.get('/client/profile/' + slug + '/users/' + userId + '/edit').then(function (response) {
            _this.user = response.data.user;
        });
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
        onSubmit: function onSubmit() {
            var _this2 = this;

            this.errors = null;
            this.error = false;

            if (this.$refs.form.validate()) {
                var slug = this.$route.params.slug;
                var updateUserForm = new FormData();

                updateUserForm.append('full_name', this.user.full_name);
                updateUserForm.append('job_title', this.user.job_title);
                updateUserForm.append('email', this.user.email);
                updateUserForm.append('tel', this.user.tel);
                updateUserForm.append('role', this.user.role);
                updateUserForm.append('_method', 'patch');

                axios.post('/client/profile/' + slug + '/users/' + this.user.id, updateUserForm).then(function (response) {

                    if (response.data.success) {
                        _this2.$router.push({ name: 'client_profile' });
                    }
                }).catch(function (error) {
                    _this2.errors = error.response.data.errors;
                    _this2.error = true;
                });
            }
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
    "div",
    { staticClass: "client-user-create" },
    [
      _c(
        "v-container",
        { staticClass: "pt-0", attrs: { "grid-list-lg": "" } },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _vm.user.role !== "client"
                ? _c(
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
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("v-flex", { attrs: { xs12: "" } }, [
                _c("h2", { staticClass: "text-center text-uppercase" }, [
                  _vm._v("Edit " + _vm._s(_vm.user.full_name) + " ")
                ])
              ]),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c(
                    "v-form",
                    {
                      ref: "form",
                      attrs: { id: "user-create-form" },
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
                        "v-container",
                        { attrs: { "grid-list-lg": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { xs12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Full Name:",
                                      name: "full_name",
                                      color: "dark",
                                      rules: [
                                        function(v) {
                                          return !!v || "Field is required"
                                        }
                                      ],
                                      required: ""
                                    },
                                    model: {
                                      value: _vm.user.full_name,
                                      callback: function($$v) {
                                        _vm.$set(_vm.user, "full_name", $$v)
                                      },
                                      expression: "user.full_name"
                                    }
                                  })
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
                                { attrs: { xs12: "" } },
                                [
                                  _c("v-text-field", {
                                    attrs: {
                                      label: "Job Title",
                                      name: "job_title",
                                      type: "text",
                                      color: "dark",
                                      rules: [
                                        function(v) {
                                          return !!v || "Field is required"
                                        }
                                      ],
                                      required: ""
                                    },
                                    model: {
                                      value: _vm.user.job_title,
                                      callback: function($$v) {
                                        _vm.$set(_vm.user, "job_title", $$v)
                                      },
                                      expression: "user.job_title"
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
                                      label: "Email Address",
                                      name: "email",
                                      type: "text",
                                      color: "dark",
                                      rules: [
                                        function(v) {
                                          return !!v || "Field is required"
                                        }
                                      ],
                                      required: ""
                                    },
                                    model: {
                                      value: _vm.user.email,
                                      callback: function($$v) {
                                        _vm.$set(_vm.user, "email", $$v)
                                      },
                                      expression: "user.email"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _vm.error && _vm.errors.email
                                    ? _c(
                                        "small",
                                        { staticClass: "red--text" },
                                        [_vm._v(_vm._s(_vm.errors.email[0]))]
                                      )
                                    : _vm._e()
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
                                      label: "Phone Number",
                                      name: "tel",
                                      type: "text",
                                      color: "dark",
                                      rules: [
                                        function(v) {
                                          return !!v || "Field is required"
                                        }
                                      ],
                                      required: ""
                                    },
                                    model: {
                                      value: _vm.user.tel,
                                      callback: function($$v) {
                                        _vm.$set(_vm.user, "tel", $$v)
                                      },
                                      expression: "user.tel"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _vm.user.role !== "client"
                                ? _c(
                                    "v-flex",
                                    { attrs: { xs12: "" } },
                                    [
                                      _c("v-select", {
                                        attrs: {
                                          items: _vm.clientRoles,
                                          label: "Client role",
                                          name: "role",
                                          rules: [
                                            function(v) {
                                              return !!v || "Field is required"
                                            }
                                          ],
                                          color: "dark",
                                          "item-text": "name",
                                          "item-value": "id",
                                          return: "",
                                          object: "",
                                          required: ""
                                        },
                                        model: {
                                          value: _vm.user.role,
                                          callback: function($$v) {
                                            _vm.$set(_vm.user, "role", $$v)
                                          },
                                          expression: "user.role"
                                        }
                                      })
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
                      _c(
                        "v-container",
                        { attrs: { "grid-list-lg": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                {
                                  attrs: {
                                    xsl2: "",
                                    "text-xs-right": "",
                                    "pa-0": ""
                                  }
                                },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: { dark: "" },
                                      on: {
                                        click: function($event) {
                                          _vm.onSubmit()
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "Update User\n                                "
                                      )
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
    require("vue-hot-reload-api")      .rerender("data-v-cb7c1bd4", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9FZGl0VXNlckNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL0VkaXRVc2VyQ29tcG9uZW50LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvcGFnZXMvY2xpZW50cy9FZGl0VXNlckNvbXBvbmVudC52dWU/YjExZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLDRDQUFzUjtBQUN0UjtBQUNBLDhDQUFzTDtBQUN0TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN1RUE7QUFDQSxRQURBLGtCQUNBO0FBQ0E7QUFDQSx3QkFEQTtBQUVBLHdCQUZBO0FBR0Esd0JBSEE7QUFJQTtBQUNBLCtCQURBO0FBRUEsK0JBRkE7QUFHQSwyQkFIQTtBQUlBLHlCQUpBO0FBS0E7QUFMQSxhQUpBO0FBV0EseUJBQ0E7QUFBQTtBQUFBLGFBREEsRUFFQTtBQUFBO0FBQUE7QUFBQSxhQUZBLENBWEE7QUFlQSwwQkFmQTtBQWdCQSwwQkFDQSxnQ0FEQSxFQUVBLDRDQUZBO0FBaEJBO0FBcUJBLEtB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QSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxTQUFTLFdBQVcsRUFBRTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUyxxQkFBcUIsRUFBRTtBQUN6RDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUyxvQkFBb0IsRUFBRTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiIxNy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV1dfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0VkaXRVc2VyQ29tcG9uZW50LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtY2I3YzFiZDRcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9FZGl0VXNlckNvbXBvbmVudC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL3BhZ2VzL2NsaWVudHMvRWRpdFVzZXJDb21wb25lbnQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWNiN2MxYmQ0XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtY2I3YzFiZDRcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL0VkaXRVc2VyQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTciLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImNsaWVudC11c2VyLWNyZWF0ZVwiPlxuICAgICAgICA8di1jb250YWluZXIgZ3JpZC1saXN0LWxnIGNsYXNzPVwicHQtMFwiPlxuICAgICAgICAgICAgPHYtbGF5b3V0IHJvdyB3cmFwPlxuICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMiBwdC0wIHYtaWY9XCJ1c2VyLnJvbGUgIT09ICdjbGllbnQnXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2LWJ0biBvdXRsaW5lIEBjbGljaz1cIm9uR29iYWNrKClcIiBjbGFzcz1cIm1sLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWljb24+Y2hldnJvbl9sZWZ0PC92LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICBHbyBiYWNrXG4gICAgICAgICAgICAgICAgICAgIDwvdi1idG4+XG4gICAgICAgICAgICAgICAgPC92LWZsZXg+XG5cbiAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQtY2VudGVyIHRleHQtdXBwZXJjYXNlXCI+RWRpdCB7eyB1c2VyLmZ1bGxfbmFtZSB9fSA8L2gyPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgPHYtZmxleCB4czEyPlxuICAgICAgICAgICAgICAgICAgICA8di1mb3JtIHJlZj1cImZvcm1cIiB2LW1vZGVsPVwidmFsaWRcIiBpZD1cInVzZXItY3JlYXRlLWZvcm1cIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLVVzZXIgRGV0YWlscyAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LWNvbnRhaW5lciBncmlkLWxpc3QtbGc+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJGdWxsIE5hbWU6XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXIuZnVsbF9uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImZ1bGxfbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpydWxlcz1cIlt2ID0+ICEhdiB8fCAnRmllbGQgaXMgcmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC92LXRleHQtZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1sYXlvdXQgcm93IHdyYXA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJKb2IgVGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlci5qb2JfdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiam9iX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbdiA9PiAhIXYgfHwgJ0ZpZWxkIGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di10ZXh0LWZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRW1haWwgQWRkcmVzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyLmVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbdiA9PiAhIXYgfHwgJ0ZpZWxkIGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzPVwicmVkLS10ZXh0XCIgdi1pZj1cImVycm9yICYmIGVycm9ycy5lbWFpbFwiPnt7IGVycm9ycy5lbWFpbFswXSB9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWZsZXggeHMxMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXRleHQtZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJQaG9uZSBOdW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlci50ZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwidGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbdiA9PiAhIXYgfHwgJ0ZpZWxkIGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi10ZXh0LWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8di1mbGV4IHhzMTIgdi1pZj1cInVzZXIucm9sZSAhPT0gJ2NsaWVudCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXRlbXM9XCJjbGllbnRSb2xlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyLnJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkNsaWVudCByb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbdiA9PiAhIXYgfHwgJ0ZpZWxkIGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImRhcmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLXRleHQ9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS12YWx1ZT1cImlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvdi1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1sYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gQ1RBIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHYtY29udGFpbmVyIGdyaWQtbGlzdC1sZz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWxheW91dCByb3cgd3JhcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHYtZmxleCB4c2wyIHRleHQteHMtcmlnaHQgcGEtMD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2LWJ0biBkYXJrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25TdWJtaXQoKVwiPlVwZGF0ZSBVc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtYnRuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtZmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3YtbGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3YtY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvdi1mb3JtPlxuICAgICAgICAgICAgICAgIDwvdi1mbGV4PlxuICAgICAgICAgICAgPC92LWxheW91dD5cbiAgICAgICAgPC92LWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3JzOiBudWxsLFxuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxfbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgam9iX3RpdGxlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdGVsOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiBudWxsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW1haWxSdWxlczogW1xuICAgICAgICAgICAgICAgICAgICB2ID0+ICEhdiB8fCAnRW1haWwgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgICAgICAgICB2ID0+IC9eXFx3KyhbLi1dP1xcdyspKkBcXHcrKFsuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLy50ZXN0KHYpIHx8ICdFLW1haWwgbXVzdCBiZSB2YWxpZCdcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGVtYWlsRXJyb3I6ICcnLFxuICAgICAgICAgICAgICAgIGNsaWVudFJvbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtpZDogJ2NsaWVudCcsIG5hbWU6ICdDbGllbnQnfSxcbiAgICAgICAgICAgICAgICAgICAge2lkOiAnY2xpZW50X2FkbWluJywgbmFtZTogJ0NsaWVudCBBZG1pbid9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgIGxldCBzbHVnID0gdGhpcy4kcm91dGUucGFyYW1zLnNsdWc7XG4gICAgICAgICAgICBsZXQgdXNlcklkID0gdGhpcy4kcm91dGUucGFyYW1zLnVzZXJpZDtcbiAgICAgICAgICAgIGF4aW9zLmdldCgnL2NsaWVudC9wcm9maWxlLycgKyBzbHVnICsgJy91c2Vycy8nICsgdXNlcklkICsgJy9lZGl0JykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvbkdvYmFjaygpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldlJvdXRlID0gdGhpcy4kc3RvcmUuZ2V0dGVycy5nZXRSb3V0ZVVybDtcbiAgICAgICAgICAgICAgICBpZihwcmV2Um91dGUgIT0gJycpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZSA6IHRoaXMuJHN0b3JlLmdldHRlcnMuZ2V0Um91dGVVcmx9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLmdvKC0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25TdWJtaXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRyZWZzLmZvcm0udmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2x1ZyA9IHRoaXMuJHJvdXRlLnBhcmFtcy5zbHVnO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXBkYXRlVXNlckZvcm0gPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVVc2VyRm9ybS5hcHBlbmQoJ2Z1bGxfbmFtZScsIHRoaXMudXNlci5mdWxsX25hbWUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVVc2VyRm9ybS5hcHBlbmQoJ2pvYl90aXRsZScsIHRoaXMudXNlci5qb2JfdGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVVc2VyRm9ybS5hcHBlbmQoJ2VtYWlsJywgdGhpcy51c2VyLmVtYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVXNlckZvcm0uYXBwZW5kKCd0ZWwnLCB0aGlzLnVzZXIudGVsKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVXNlckZvcm0uYXBwZW5kKCdyb2xlJywgdGhpcy51c2VyLnJvbGUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVVc2VyRm9ybS5hcHBlbmQoJ19tZXRob2QnLCAncGF0Y2gnKTtcblxuICAgICAgICAgICAgICAgICAgICBheGlvcy5wb3N0KCcvY2xpZW50L3Byb2ZpbGUvJyArIHNsdWcgKyAnL3VzZXJzLycgKyB0aGlzLnVzZXIuaWQsIHVwZGF0ZVVzZXJGb3JtKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ2NsaWVudF9wcm9maWxlJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL0VkaXRVc2VyQ29tcG9uZW50LnZ1ZSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNsaWVudC11c2VyLWNyZWF0ZVwiIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwdC0wXCIsIGF0dHJzOiB7IFwiZ3JpZC1saXN0LWxnXCI6IFwiXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtbGF5b3V0XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS51c2VyLnJvbGUgIT09IFwiY2xpZW50XCJcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHhzMTI6IFwiXCIsIFwicHQtMFwiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWJ0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtbC0wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG91dGxpbmU6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ub25Hb2JhY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LWljb25cIiwgW192bS5fdihcImNoZXZyb25fbGVmdFwiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIEdvIGJhY2tcXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcInYtZmxleFwiLCB7IGF0dHJzOiB7IHhzMTI6IFwiXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJoMlwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtY2VudGVyIHRleHQtdXBwZXJjYXNlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiRWRpdCBcIiArIF92bS5fcyhfdm0udXNlci5mdWxsX25hbWUpICsgXCIgXCIpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ2LWZvcm1cIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJmb3JtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwidXNlci1jcmVhdGUtZm9ybVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udmFsaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS52YWxpZCA9ICQkdlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyBcImdyaWQtbGlzdC1sZ1wiOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWxheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93OiBcIlwiLCB3cmFwOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkZ1bGwgTmFtZTpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmdWxsX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIXYgfHwgXCJGaWVsZCBpcyByZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udXNlci5mdWxsX25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0udXNlciwgXCJmdWxsX25hbWVcIiwgJCR2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInVzZXIuZnVsbF9uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJKb2IgVGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqb2JfdGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF2IHx8IFwiRmllbGQgaXMgcmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnVzZXIuam9iX3RpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnVzZXIsIFwiam9iX3RpdGxlXCIsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJ1c2VyLmpvYl90aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2LWZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidi10ZXh0LWZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkVtYWlsIEFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhIXYgfHwgXCJGaWVsZCBpcyByZXF1aXJlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS51c2VyLCBcImVtYWlsXCIsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJ1c2VyLmVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lcnJvciAmJiBfdm0uZXJyb3JzLmVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInJlZC0tdGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmVycm9ycy5lbWFpbFswXSkpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgeHMxMjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInYtdGV4dC1maWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQaG9uZSBOdW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0ZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISF2IHx8IFwiRmllbGQgaXMgcmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnVzZXIudGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnVzZXIsIFwidGVsXCIsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJ1c2VyLnRlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udXNlci5yb2xlICE9PSBcImNsaWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInYtZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB4czEyOiBcIlwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2LXNlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBfdm0uY2xpZW50Um9sZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJDbGllbnQgcm9sZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhdiB8fCBcIkZpZWxkIGlzIHJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcImRhcmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbS10ZXh0XCI6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpdGVtLXZhbHVlXCI6IFwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS51c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS51c2VyLCBcInJvbGVcIiwgJCR2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwidXNlci5yb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidi1jb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgXCJncmlkLWxpc3QtbGdcIjogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1sYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvdzogXCJcIiwgd3JhcDogXCJcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1mbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHNsMjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dC14cy1yaWdodFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYS0wXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZGFyazogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5vblN1Ym1pdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVcGRhdGUgVXNlclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LWNiN2MxYmQ0XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1jYjdjMWJkNFwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9wYWdlcy9jbGllbnRzL0VkaXRVc2VyQ29tcG9uZW50LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTciXSwic291cmNlUm9vdCI6IiJ9