webpackJsonp([12],{"2BqO":function(t,e,a){"use strict";var s=function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"video-upload-page"},[e("upload-video-component")],1)};s._withStripped=!0;var i={render:s,staticRenderFns:[]};e.a=i},"4l4O":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"upload-video-section section-space",class:{"iframe-style":t.is_iframe}},[s("v-container",{staticClass:"pt-0",attrs:{"grid-list-xl":""}},[t.source?s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"text-xs-center pt-0",attrs:{xs12:""}},[s("h1",{staticClass:"heading text-uppercase"},[t._v("Share your content and grab £100 while you’re at it!")])]),s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[s("p",[t._v("We never get bored of seeing videos from our fans! Whether it’s a must-see moment of comedy gold,\n                    an unbelievable skill or just something that’s flat out bizarre, send it our way and if we put\n                    it up on the official UNILAD Facebook (www.facebook.com/uniladmag) page we’ll send you £100!\n                    *Terms and conditions apply")])])],1):t._e(),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("div",{staticClass:"upload-video-title"},[s("h1",{staticClass:"heading"},[t._v("UPLOAD YOUR VIDEO")])]),s("div",[s("h2",{staticClass:"text-center text-uppercase"},[t._v("Your Contact Details")])]),s("v-form",{ref:"form",attrs:{id:"upload-form"},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Full Name:",name:"full_name",rules:t.nameRules,color:"dark",required:""},model:{value:t.full_name,callback:function(e){t.full_name=e},expression:"full_name"}})],1),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Email Address:",name:"email",type:"email",rules:t.emailRules,color:"dark",required:""},on:{keyup:function(e){t.checkEmailfield(t.email)}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t.email_optional_error?s("div",{staticClass:"email-validation red--text"},[t._v("Are you sure\n                                    this is correct?\n                                ")]):t._e()],1)],1),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Phone Number",name:"tel",type:"tel",color:"dark"},model:{value:t.tel,callback:function(e){t.tel=e},expression:"tel"}})],1)],1),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h2",{staticClass:"text-xs-center text-uppercase"},[t._v("Your video details")])])],1),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Video title",name:"title",color:"dark",error:t.title_optional,hint:t.title_optional?"Title must be 70 characters or less.":"",required:t.title_optional,counter:70},on:{keyup:function(e){t.checkTitleLength()}},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),s("v-flex",{staticClass:"upload-video-button",attrs:{xs12:"","p-0":""}},[s("v-btn",{staticClass:"ml-0",class:{error:t.error},attrs:{dark:"",raised:""},on:{click:function(e){t.onPickFile()}}},[t._v("\n                                    Choose file\n                                    "),s("v-icon",{attrs:{dark:"",right:""}},[t._v("attachment")])],1),t.error?s("span",{staticClass:"red--text"},[t._v("Upload your video OR provide video a link please.")]):t._e(),s("span",[t._v(t._s(t.file_name))]),s("p",{staticClass:"small-italic"},[t._v("\n                                    Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv,\n                                    wmv, 3gp.")]),s("input",{ref:"inputfile",staticStyle:{display:"none"},attrs:{color:"dark",type:"file",name:"file",accept:"video/mp4,video/x-m4v,video/*"},on:{change:function(e){t.onFilechange(e)}}})],1),s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[s("div",{staticClass:"video-upload-separator"},[s("h2",[t._v("Or")])])]),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{color:"dark",label:"Video link/URL",name:"url"},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}})],1)],1)],1),s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h2",{staticClass:"text-xs-center text-uppercase"},[t._v("Terms & Conditions")])])],1)],1),s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"terms",attrs:{xs12:"","pb-0":""}},[s("v-checkbox",{attrs:{rules:[function(t){return!!t||"You must agree to continue"}],color:"dark",name:"terms",required:""},model:{value:t.terms_condition,callback:function(e){t.terms_condition=e},expression:"terms_condition"}},[s("span",{attrs:{slot:"label"},slot:"label"},[t._v("I agree to the "),s("a",{attrs:{href:t.termslink,target:"_blank"}},[t._v("terms and conditions")])])])],1),s("v-flex",{attrs:{xsl2:"","text-xs-right":"","pa-0":""}},[t.validate_email_error?s("p",{staticClass:"red-text"},[t._v("\n                                    Look your email is not valid plese try again")]):t._e(),s("v-btn",{attrs:{dark:"",loading:t.validete_email_progress,disabled:t.validete_email_progress},on:{click:function(e){t.onSubmit()}}},[t._v("Submit your video\n                                ")])],1)],1)],1)],1)],1)],1)],1),s("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.uplod_progress,callback:function(e){t.uplod_progress=e},expression:"uplod_progress"}},[s("v-card",{staticClass:"upload-loading-modal",attrs:{dark:"",color:"dark"}},[s("v-card-title",[s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-flex",[s("h2",{staticClass:"text-xs-center sub-heading"},[t._v("Your file is uploading")])])],1)],1),s("v-card-text",[s("v-layout",[s("v-flex",[s("img",{attrs:{src:a("Nlz5")}})])],1),s("v-layout",[s("v-flex",{attrs:{xs10:""}},[t.upload_error_msg?s("div",[t._v(t._s(t.upload_error_msg))]):t._e()])],1)],1)],1)],1),s("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.thank_you_dialog,callback:function(e){t.thank_you_dialog=e},expression:"thank_you_dialog"}},[s("v-card",{attrs:{dark:"",color:"dark"}},[s("v-card-text",{staticClass:"text-xs-center pb-0"},[s("h2",[t._v("Thanks for the video.. You rock!")])]),s("v-card-actions",{staticClass:"text-xs-center"},[s("v-spacer"),s("v-btn",{attrs:{color:"dark",raised:"",flat:""},on:{click:function(e){e.stopPropagation(),t.thank_you_dialog=!1}}},[t._v("Close")])],1)],1)],1)],1)};s._withStripped=!0;var i={render:s,staticRenderFns:[]};e.a=i},"9B8u":function(t,e,a){"use strict";var s=a("M0+a");e.a={layout:"iframeForm",components:{uploadVideoComponent:s.a},data:function(){return{}}}},"M0+a":function(t,e,a){"use strict";var s=a("cdPu"),i=a("4l4O"),r=a("VU/8")(s.a,i.a,!1,null,null,null);r.options.__file="resources/nuxt/components/forms/UploadVideoComponent.vue",e.a=r.exports},Nlz5:function(t,e,a){t.exports=a.p+"img/hamster_wheel.6a8569e.gif"},cdPu:function(t,e,a){"use strict";e.a={data:function(){return{valid:!1,full_name:"",title:"",url:"",file:"",terms_condition:!1,nameRules:[function(t){return!!t||"Full name is required"}],email:"",emailRules:[function(t){return!!t||"Email is required"},function(t){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(t)||"E-mail must be valid"}],tel:"",source:"",uplod_progress:!1,file_name:"",progressbar:0,error:!1,validete_email_progress:!1,loader:null,validate_email_error:!1,upload_error_msg:"",thank_you_dialog:!1,email_optional_error:!1,termslink:"",title_optional:!1,is_iframe:!1}},created:function(){this.setSourceField()},methods:{onScroll:function(t){this.offsetTop=t.target.scrollTop},onPickFile:function(){this.progressbar=0,this.$refs.inputfile.click()},onFilechange:function(t){t.target.files[0]&&(this.error=!1,this.file=t.target.files[0],this.file_name=this.file.name)},onSubmit:function(){var t=this;if(""===this.url&&""===this.file?this.error=!0:this.error=!1,this.title&&this.title.length>70)return!1;if(this.$refs.form.validate()){if(this.error)return;this.validete_email_progress=!0,this.loader="loading",setTimeout(function(){t.loader=null,t.validete_email_progress=!1,t.uploadFormData()},1e3)}},uploadFormData:function(){var t=this,e=new FormData;this.file&&e.append("file",this.file),e.append("full_name",this.full_name),e.append("email",this.email),e.append("title",this.title),""!=this.tel&&e.append("tel",this.tel),e.append("terms",this.terms_condition),e.append("url",this.url),e.append("source",this.source),this.uplod_progress=!0,this.$axios.$post("/upload",e,{headers:{"Content-Type":"multipart/form-data","X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":this.csrf_token}}).then(function(e){var a=e;"success"==a.status&&(t.progressbar=0,t.uplod_progress=!1,t.$refs.form.reset(),t.file_name="",t.file="",setTimeout(function(){t.thank_you_dialog=!0},1e3)),a.error&&(t.upload_error_msg=a.error_message)}).catch(function(t){})},setSourceField:function(){this.$route.query.source&&(this.source=this.$route.query.source),this.setTermsLink()},setTermsLink:function(){""!==this.source?(this.is_iframe=!0,this.termslink="https://www.unilad.co.uk/submit/submission-terms-and-conditions/"):this.termslink="/terms"},checkEmailfield:function(t){null!=t&&(t.toLowerCase().indexOf(".con")>=0||t.toLowerCase().indexOf(".conuk")>=0?this.email_optional_error=!0:this.email_optional_error=!1)},checkTitleLength:function(){if(this.title&&this.title.length>70)return this.title_optional=!0,!0;this.title_optional=!1}}}},lBDF:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("9B8u"),i=a("2BqO"),r=a("VU/8")(s.a,i.a,!1,null,null,null);r.options.__file="resources/nuxt/pages/upload/form/index.vue",e.default=r.exports}});