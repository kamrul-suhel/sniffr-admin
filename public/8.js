webpackJsonp([8],{"NbD/":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("17XF"),n=s.n(o),a=s("hfVw"),i=s.n(a),r=s("NYxO"),v=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o])}return t};e.default={components:{BuyQuoteButtonComponent:i.a,videoPlayer:n.a},data:function(){return{content_padding:!0}},computed:v({},Object(r.b)({}),{video:{get:function(){return this.$store.getters.getCurrentVideo}},tags:function(){return this.$store.getters.getCurrentVideoTags}}),created:function(){var t=this.$vuetify.breakpoint.name;"sm"!==t&&"xs"!==t||(this.content_padding=!1);var e=this.$route.params.alpha_id;this.$store.commit("setCurrentVideoAlphaId",e),this.$store.commit("setCurrentRouteObject",this.$route),this.$store.dispatch("getVideoNextAndPrevLink",{alpha_id:e})},methods:{onGoback:function(){this.$router.go(-1)}}}},a86C:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"videos-section"},[s("div",{staticClass:"videos-detail-section section-space"},[s("v-container",{attrs:{"grid-list-xl":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-btn",{staticClass:"ml-0",attrs:{outline:""},on:{click:function(e){t.onGoback()}}},[s("v-icon",[t._v("chevron_left")]),t._v("Go back")],1)],1)],1),t._v(" "),s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{"align-content-center":"",xs12:"",sm12:"",md7:"",lg7:"",xl7:""}},[s("video-player",{attrs:{video:t.video}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm12:"",md5:"",lg5:"",xl5:""}},[s("v-layout",{staticClass:"video-detail-content",class:{"pl-4":t.content_padding},attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h2",[t._v(t._s(t.video.title))]),t._v(" "),s("div",{staticClass:"video-title-caption"},[s("v-layout",{attrs:{row:"",wrap:"","justify-center":""}},[null!=t.video.duration?s("v-flex",{attrs:{xs6:""}},[s("v-icon",{attrs:{small:""}},[t._v("alarm")]),t._v(t._s(t._f("convertTime")(t.video.duration))+"\n                                    ")],1):t._e(),t._v(" "),s("v-spacer"),t._v(" "),t.video.views?s("v-flex",{staticClass:"text-xs-right",attrs:{xs6:""}},[s("v-icon",{attrs:{small:""}},[t._v("remove_red_eye")]),t._v(" "+t._s(t.video.views+1)+" views\n                                    ")],1):t._e()],1)],1),t._v(" "),"null"!=t.video.description?s("p",[t._v(t._s(t.video.description))]):t._e(),t._v(" "),t.tags.length>0?s("div",{staticClass:"video-detail-tags"},[s("h3",{attrs:{id:"tags"}},[t._v("Tags:")]),t._v(" "),s("ul",t._l(t.tags,function(e){return s("li",[s("router-link",{attrs:{to:"/videos?tag="+e.name}},[t._v("\n                                            #"+t._s(e.name)+"\n                                        ")])],1)}))]):t._e(),t._v(" "),s("buy-quote-button-component",{attrs:{type:"video",asset:t.video}})],1)],1)],1)],1)],1)],1)])},staticRenderFns:[]}},y5SE:function(t,e,s){var o=s("VU/8")(s("NbD/"),s("a86C"),!1,null,null,null);t.exports=o.exports}});
//# sourceMappingURL=8.js.map