webpackJsonp([17],{"6kZ+":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"client-user-create"},[e.iniState?r("v-container",{staticClass:"pt-0",attrs:{"grid-list-lg":""}},[r("v-layout",{attrs:{row:"",wrap:""}},[e.$store.getters.getIsCompanyOwner?r("v-flex",{attrs:{xs12:"","pt-0":""}},[r("v-btn",{staticClass:"ml-0",attrs:{outline:""},on:{click:function(t){e.onGoback()}}},[r("v-icon",[e._v("chevron_left")]),e._v("\n                    Go back\n                ")],1)],1):e._e(),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("h2",{staticClass:"text-center text-uppercase"},[e._v("Edit "+e._s(e.user.full_name)+" ")])]),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("v-form",{ref:"form",attrs:{id:"user-create-form"},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Full Name:",name:"full_name",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.user.full_name,callback:function(t){e.$set(e.user,"full_name",t)},expression:"user.full_name"}})],1)],1),e._v(" "),r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Job Title",name:"job_title",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.user.job_title,callback:function(t){e.$set(e.user,"job_title",t)},expression:"user.job_title"}})],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Email Address",name:"email",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}}),e._v(" "),e.error&&e.errors.email?r("small",{staticClass:"red--text"},[e._v(e._s(e.errors.email[0]))]):e._e()],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Phone Number",name:"tel",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.user.tel,callback:function(t){e.$set(e.user,"tel",t)},expression:"user.tel"}})],1),e._v(" "),"client"!==e.user.role?r("v-flex",{attrs:{xs12:""}},[r("v-select",{attrs:{items:e.clientRoles,label:"Client role",name:"role",rules:[function(e){return!!e||"Field is required"}],color:"dark","item-text":"name","item-value":"id",return:"",object:"",required:""},model:{value:e.user.role,callback:function(t){e.$set(e.user,"role",t)},expression:"user.role"}})],1):e._e()],1),e._v(" "),r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xsl2:"","text-xs-right":"","pa-0":""}},[r("v-btn",{attrs:{dark:""},on:{click:function(t){e.onSubmit()}}},[e._v("Update User\n                            ")])],1)],1)],1)],1)],1)],1):e._e()],1)},staticRenderFns:[]}},HYjn:function(e,t,r){var s=r("VU/8")(r("u36Z"),r("6kZ+"),!1,null,null,null);e.exports=s.exports},u36Z:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("NYxO"),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e};t.default={data:function(){return{error:!1,errors:null,valid:!1,emailRules:[function(e){return!!e||"Email is required"},function(e){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)||"E-mail must be valid"}],emailError:"",clientRoles:[{id:"client",name:"Client"},{id:"client_admin",name:"Client Admin"}]}},computed:l({},Object(s.b)({user:"getCompanyCurrentUser",iniState:"getClientIniState"})),created:function(){var e="/client/profile/"+this.$route.params.slug+"/users/"+this.$route.params.userid+"/edit";this.$store.dispatch("fetchClientUser",{url:e})},methods:{onGoback:function(){""!=this.$store.getters.getRouteUrl?this.$router.push({name:this.$store.getters.getRouteUrl}):this.$router.go(-1)},onSubmit:function(){var e=this;if(this.errors=null,this.error=!1,this.$refs.form.validate()){var t=this.$route.params.slug,r=new FormData;r.append("full_name",this.user.full_name),r.append("job_title",this.user.job_title),r.append("email",this.user.email),r.append("tel",this.user.tel),r.append("role",this.user.role),r.append("_method","patch"),axios.post("/client/profile/"+t+"/users/"+this.user.id,r).then(function(t){if(t.data.success){e.$store.commit("setToast",{message:"User successfully updated",duration:3e3,color:"success",horizontalAlign:"right"})}}).catch(function(t){e.errors=t.response.data.errors,e.error=!0})}}}}}});
//# sourceMappingURL=17.js.map