webpackJsonp([19],{H5Ym:function(s,e,r){"use strict";var t=function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("v-container",{staticClass:"section-space",attrs:{fluid:"","fill-height":""}},[r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-form",{ref:"password_set_form",on:{submit:function(e){e.preventDefault(),s.onPasswordSetSubmit()}},model:{value:s.valid,callback:function(e){s.valid=e},expression:"valid"}},[r("v-card",{attrs:{width:"400"}},[r("v-card-text",[r("v-flex",{attrs:{xs12:"","align-center":""}},[r("h2",{staticClass:"text-xs-center"},[s._v("SET PASSWORD")])]),r("v-flex",{attrs:{xs12:""}},[s.error&&s.errors.email?r("small",{staticStyle:{color:"red"}},[s._v(s._s(s.errors.email[0]))]):s._e(),r("v-text-field",{attrs:{color:"dark",label:"Email"},model:{value:s.email,callback:function(e){s.email=e},expression:"email"}})],1),r("v-flex",{attrs:{xs12:""}},[s.error&&s.errors.password?r("small",{staticStyle:{color:"red"}},[s._v(s._s(s.errors.password[0]))]):s._e(),r("v-text-field",{attrs:{color:"dark",label:"Enter your password",hint:"At least 8 characters","append-icon":s.passwordType?"visibility":"visibility_off",type:s.passwordType?"password":"text",counter:s.counter,rules:s.passwordRules,required:""},on:{"click:append":function(e){s.passwordType=!s.passwordType}},model:{value:s.password,callback:function(e){s.password=e},expression:"password"}})],1),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{color:"dark",label:"Confirm your password","append-icon":s.passwordTypeConfirm?"visibility":"visibility_off",type:s.passwordTypeConfirm?"password":"text",counter:s.counter,rules:s.passwordConfirmationRules,required:""},on:{"click:append":function(e){s.passwordTypeConfirm=!s.passwordTypeConfirm},keyup:function(e){if(!("button"in e)&&s._k(e.keyCode,"enter",13,e.key,"Enter"))return null;s.onPasswordResetSubmit()}},model:{value:s.confirm_password,callback:function(e){s.confirm_password=e},expression:"confirm_password"}})],1),r("v-flex",{staticClass:"text-center",attrs:{xs12:""}},[r("v-btn",{attrs:{raised:"",dark:"",loading:s.loading,disabled:s.loading||s.buttonDisable},on:{click:function(e){s.onPasswordSetSubmit()}}},[s._v("set password")])],1),r("v-flex",{attrs:{xs12:"","text-xs-center":""}},[s.showMessage?r("span",{class:[s.error?"red--text":"green--text"]},[s._v(s._s(s.message))]):s._e()])],1)],1)],1)],1)],1)};t._withStripped=!0;var a={render:t,staticRenderFns:[]};e.a=a},YkOc:function(s,e,r){"use strict";e.a={data:function(){var s=this;return{token:"",email:"",password:"",confirm_password:"",passwordType:!0,passwordTypeConfirm:!0,counter:30,valid:!1,passwordRules:[function(s){return!!s||"Password is required"}],passwordConfirmationRules:[function(s){return!!s||"Confirmation password is required"},function(e){return e==s.password||"Password is not match"}],loading:!1,loader:null,buttonDisable:!1,showMessage:!1,message:"",error:!1,errors:[]}},created:function(){this.token=this.$route.params.token,this.email=this.$route.params.email},methods:{onPasswordSetSubmit:function(){var s=this;if(this.$refs.password_set_form.validate()){var e=new FormData;e.append("email",this.email),e.append("password",this.password),e.append("password_confirmation",this.password),e.append("token",this.token);var r="/password/set/"+this.token+"/"+this.email;this.$axios.$post(r,e).then(function(e){s.showMessage=!0,s.error=!1,s.buttonDisable=!0,e.error||(s.message=e.success_message,s.$store.dispatch("getLoginStatus").then(function(e){s.$router.push({name:"client-profile"})}))}).catch(function(e){s.error=!1,s.showMessage=!1,void 0===e.response.data.error?(s.error=!0,s.showMessage=!0,s.message=e.response.data.message):(s.error=!0,s.showMessage=!0,s.message=e.response.data.error_message)})}}}}},mlCK:function(s,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r("YkOc"),a=r("H5Ym"),o=r("VU/8")(t.a,a.a,!1,null,null,null);o.options.__file="resources/nuxt/pages/password/set/_token/_email/index.vue",e.default=o.exports}});