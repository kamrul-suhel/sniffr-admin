webpackJsonp([10],{GTG7:function(e,t,r){"use strict";var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"upload-video-section section-space"},[s("v-container",{attrs:{"grid-list-xl":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("div",[s("h2",{staticClass:"text-center text-uppercase"},[e._v("Your Contact Details")])]),s("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Full Name:",name:"full_name",rules:e.nameRules,color:"dark",required:""},model:{value:e.full_name,callback:function(t){e.full_name=t},expression:"full_name"}})],1),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Email Address:",name:"email",rules:e.emailRules,color:"dark",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1)],1),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"","text-xs-center":""}},[s("h2",{staticClass:"text-xs-center text-uppercase"},[e._v("Your video details")])]),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Video title",name:"title",color:"dark",rules:[function(e){return e&&e.length<=140||"Max 140 characters"}],counter:140},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}})],1),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{color:"dark",label:"Video link/URL",name:"url"},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}})],1)],1),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"","p-0":""}},[s("v-btn",{staticClass:"ml-0",class:{error:e.error},attrs:{dark:"",raised:""},on:{click:function(t){e.onPickFile()}}},[e._v("\n                                    Upload your video "),s("v-icon",{attrs:{dark:"",right:""}},[e._v("system_update_alt")])],1),e.error?s("span",{staticClass:"red--text"},[e._v("Upload your file or provide a links please")]):e._e(),s("span",[e._v(e._s(e.file_name))]),s("p",{staticClass:"small-italic"},[e._v("Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv, wmv, 3gp.")]),s("input",{ref:"inputfile",staticStyle:{display:"none"},attrs:{type:"file",name:"file",accept:"video/mp4,video/x-m4v,video/*"},on:{change:function(t){e.onFilechange(t)}}})],1)],1)],1),s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-textarea",{attrs:{label:"Notes",name:"notes",color:"dark",hint:"If we need to know anything about the video, let us know here"},model:{value:e.notes,callback:function(t){e.notes=t},expression:"notes"}})],1),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{name:"credit",label:"Credit link",hint:"Credits are placed in the pinned comment (unless alternative method is agreed)",color:"dark"},model:{value:e.credit,callback:function(t){e.credit=t},expression:"credit"}})],1),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{name:"referrer",label:"Unilad Referrer",hint:"Who at UNILAD asked you to fill in this form?",color:"dark"},model:{value:e.referrer,callback:function(t){e.referrer=t},expression:"referrer"}})],1)],1)],1),s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h2",{staticClass:"text-xs-center text-uppercase"},[e._v("Terms & Conditions")])])],1)],1),s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"terms",attrs:{xs12:"","pb-0":""}},[s("v-checkbox",{attrs:{rules:[function(e){return!!e||"You must agree to continue"}],color:"dark",name:"terms",required:""},model:{value:e.terms_condition,callback:function(t){e.terms_condition=t},expression:"terms_condition"}},[s("span",{attrs:{slot:"label"},slot:"label"},[e._v("I agree to the above "),s("a",{staticClass:"dark--text",attrs:{href:e.termslink,target:"_blank"}},[e._v("terms and conditions")])])])],1),s("v-flex",{attrs:{xl2:"","text-xs-right":"","pa-0":""}},[e.validate_email_error?s("p",{staticClass:"red-text"},[e._v("Look your email is not valid plese try again")]):e._e(),e.validete_email_progress?s("v-progress-circular",{attrs:{indeterminate:"",color:"dark"}}):e._e(),s("v-btn",{attrs:{dark:""},on:{click:function(t){e.onSubmit()}}},[e._v("Submit your video")])],1)],1)],1)],1)],1)],1)],1),s("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:e.uplod_progress,callback:function(t){e.uplod_progress=t},expression:"uplod_progress"}},[s("v-card",{staticClass:"upload-loading-modal",attrs:{dark:""}},[s("v-card-title",[s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-flex",[s("h2",{staticClass:"text-xs-center sub-heading"},[e._v("Your file is uploading")])])],1)],1),s("v-card-text",[s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-flex",[s("img",{attrs:{src:r("Nlz5")}})])],1)],1)],1)],1),s("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:e.thank_you_dialog,callback:function(t){e.thank_you_dialog=t},expression:"thank_you_dialog"}},[s("v-card",{attrs:{dark:"",color:"dark"}},[s("v-card-text",{staticClass:"text-xs-center pb-0"},[s("h2",[e._v("Thanks for the video.. You rock!")])]),s("v-card-actions",{staticClass:"text-xs-center"},[s("v-spacer"),s("v-btn",{attrs:{color:"dark",raised:"",flat:""},on:{click:function(t){t.stopPropagation(),e.thank_you_dialog=!1}}},[e._v("Close")])],1)],1)],1)],1)};s._withStripped=!0;var a={render:s,staticRenderFns:[]};t.a=a},Jh93:function(e,t,r){"use strict";var s=r("SSN4"),a=r("GTG7"),i=r("VU/8")(s.a,a.a,!1,null,null,null);i.options.__file="resources/nuxt/components/forms/VideoSubmissionComponent.vue",t.a=i.exports},Nlz5:function(e,t,r){e.exports=r.p+"img/hamster_wheel.6a8569e.gif"},SSN4:function(e,t,r){"use strict";t.a={data:function(){return{valid:!1,full_name:"",title:"",url:"",file:"",file_name:"",tel:"",notes:"",credit:"",referrer:"",source:"",terms_condition:!1,termslink:"",nameRules:[function(e){return!!e||"Name is required"}],email:"",emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)||"E-mail must be valid"}],uplod_progress:!1,progressbar:0,error:!1,validete_email_progress:!1,validate_email_error:!1,thank_you_dialog:!1}},created:function(){this.setSourceField()},methods:{onScroll:function(e){this.offsetTop=e.target.scrollTop},onPickFile:function(){this.progressbar=0,this.$refs.inputfile.click()},onFilechange:function(e){e.target.files[0]&&(this.error=!1,this.file=e.target.files[0],this.file_name=this.file.name)},onSubmit:function(){var e=this;if(""===this.url&&""===this.file?this.error=!0:this.error=!1,this.$refs.form.validate()){if(this.error)return;setTimeout(function(){e.uploadFormData()},1e3)}},uploadFormData:function(){var e=this,t=new FormData;this.file&&t.append("file",this.file),t.append("full_name",this.full_name),t.append("email",this.email),t.append("title",this.title),t.append("tel",this.tel),t.append("terms",this.terms_condition),t.append("url",this.url),t.append("notes",this.notes),t.append("credit",this.credit),t.append("referrer",this.referrer),t.append("source",this.source),this.uplod_progress=!0,this.$axios.$post("/submission",t).then(function(t){"success"==t.status&&(e.progressbar=0,e.uplod_progress=!1,setTimeout(function(){e.thank_you_dialog=!0},1e3),e.$refs.form.reset(),e.file_name="")}).catch(function(e){console.log(e),console.log("FAILURE!!")})},setSourceField:function(){this.$route.query.source&&(this.source=this.$route.query.source),this.setTermsLink()},setTermsLink:function(){""!==this.source?this.termslink="https://www.unilad.co.uk/terms-use":this.termslink="/terms"}}}},ZWWf:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("wOpv"),a=r("wVqT"),i=r("VU/8")(s.a,a.a,!1,null,null,null);i.options.__file="resources/nuxt/pages/submission/form/index.vue",t.default=i.exports},wOpv:function(e,t,r){"use strict";var s=r("Jh93");t.a={layout:"iframeForm",components:{VideoSubmission:s.a}}},wVqT:function(e,t,r){"use strict";var s=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"video-more-detail-component fill-height"},[t("video-submission")],1)};s._withStripped=!0;var a={render:s,staticRenderFns:[]};t.a=a}});