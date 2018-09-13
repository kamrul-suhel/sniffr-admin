webpackJsonp([8],{"0jF4":function(t,e,s){"use strict";var o=s("T5XD"),i=s("zh9u"),n=s("VU/8")(o.a,i.a,!1,null,null,null);n.options.__file="resources/nuxt/components/includes/StoryAssetsComponent.vue",e.a=n.exports},"58/M":function(t,e,s){"use strict";var o=s("Dd8w"),i=s.n(o),n=s("NYxO");e.a={props:["type","asset"],data:function(){return{canBuy:!1,loader:null,loading:!1}},watch:{asset:function(){this.checkLogin()},loader:function(){var t=this,e=this.loader;this[e]=!this[e],setTimeout(function(){t[e]=!1,t.newOrder=!0},3e3),this.loader=null}},computed:i()({},Object(n.mapGetters)({user:"getUserStatus",client_logged_in:"getClientLogin"})),created:function(){this.checkLogin()},methods:{openQuoteDialog:function(){var t=this,e={type:this.type,asset_alpha_id:this.asset.alpha_id};this.$axios.$post("/client/collections",e).then(function(e){t.$store.commit("setBuyQuoteCollection",e),t.$store.commit("setBuyQuoteAsset",t.asset),t.$store.commit("setBuyQuoteType",t.type),t.$store.commit("setQuoteDialog",!0)}).catch(function(t){console.log(t)})},createCollection:function(){var t=this,e={type:this.type,asset_alpha_id:this.asset.alpha_id};this.$axios.$post("/client/collections",e).then(function(e){t.$store.commit("setBuyQuoteCollection",e),t.$store.commit("setBuyQuoteAsset",t.asset),t.$store.commit("setBuyQuoteType",t.type),t.$store.commit("setBuyDialog",!0)}).catch(function(t){console.log(t)})},checkLogin:function(){this.canBuy=!(!this.client_logged_in||"exceptional"===this.asset.class||""===this.asset.class||!this.asset.class||0===this.user.active)},getAssetPurchased:function(){return!!("video"===this.type&&this.asset.video_collections&&this.asset.video_collections.length>0)||!!("story"===this.type&&this.asset.story_collections&&this.asset.story_collections.length>0)},onDownloadVideo:function(){if("video"===this.type){this.loader="loading";var t="/client/videos/"+this.asset.id+"/download";window.location=t}if("story"===this.type){t="/client/stories/"+this.asset.id+"/download";window.location=t}}}}},"7KGw":function(t,e,s){"use strict";var o=s("58/M"),i=s("cRwL"),n=s("VU/8")(o.a,i.a,!1,null,null,null);n.options.__file="resources/nuxt/components/includes/BuyQuoteButtonComponent.vue",e.a=n.exports},"8xIT":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("RYv1"),i=s("Sstb"),n=s("VU/8")(o.a,i.a,!1,null,null,null);n.options.__file="resources/nuxt/pages/client/stories/_alpha_id/index.vue",e.default=n.exports},RYv1:function(t,e,s){"use strict";var o=s("Dd8w"),i=s.n(o),n=s("0jF4"),a=s("7KGw"),r=s("NYxO");e.a={components:{QuoteButtonComponent:a.a,assetComponent:n.a},computed:i()({},Object(r.mapGetters)({story:"getCurrentStory",assets:"getCurrentStoryAssets",user:"getUserStatus"})),data:function(){return{loading:!1,loader:null,order:!1}},created:function(){this.getStoryDetail()},watch:{loader:function(){var t=this,e=this.loader;this[e]=!this[e],setTimeout(function(){return t[e]=!1},3e3),this.loader=null}},methods:{onGoback:function(){""!=this.$store.getters.getRouteUrl?this.$router.push({name:this.$store.getters.getRouteUrl}):this.$router.go(-1)},getStoryDetail:function(){var t=this.$route.params.alpha_id;this.$store.dispatch("fetchCurrentStory",t)}}}},Sstb:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"client-story-detail-section"},[s("v-container",{staticClass:"client-story-detail-section",attrs:{"grid-list-lg":"","pt-0":""}},[t.story?s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"","pt-0":""}},[s("v-btn",{staticClass:"ml-0",attrs:{outline:""},on:{click:function(e){t.onGoback()}}},[s("v-icon",[t._v("chevron_left")]),t._v("\n                    Go back\n                ")],1)],1),s("v-flex",{attrs:{xs12:"",sm12:"",md7:"",lg8:"",xl8:""}},[s("div",{staticClass:"story-content"},[t.order?s("v-badge",{attrs:{right:"",color:"black"}},[s("span",{attrs:{slot:"badge"},slot:"badge"},[s("v-icon",{attrs:{dark:"",color:"white"}},[t._v("done")])],1),s("h2",{domProps:{innerHTML:t._s(t.story.title)}})]):s("h2",{domProps:{innerHTML:t._s(t.story.title)}}),s("div",{staticClass:"caption"},[s("span",[t._v("Author: "+t._s(t.story.author)+" | ")]),s("span",[t._v("Created at: "+t._s(t._f("convertDate")(t.story.date_ingested)))]),s("br")]),s("v-divider",{staticStyle:{margin:"15px 0"}}),s("div",{domProps:{innerHTML:t._s(t.story.description)}}),s("quote-button-component",{attrs:{type:"story",asset:t.story}})],1)]),s("v-flex",{staticClass:"client-assets",attrs:{xs12:"",sm12:"",md5:"",lg4:""}},[s("h2",[t._v("Assets")]),s("v-divider",{staticClass:"header-divider"}),s("v-layout",{attrs:{row:"",wrap:""}},t._l(t.story.assets,function(t){return s("asset-component",{key:t.alpha_id,attrs:{asset:t}})}))],1)],1):t._e()],1)],1)};o._withStripped=!0;var i={render:o,staticRenderFns:[]};e.a=i},T5XD:function(t,e,s){"use strict";e.a={data:function(){return{thumbnailImg:""}},props:{asset:{type:Object,required:!0}},watch:{},created:function(){this.setImageUrl(this.asset)},methods:{setImageUrl:function(t){"video/mp4"===t.mime_type?this.thumbnailImg=t.thumbnail:this.thumbnailImg=t.url},onOpenDialog:function(t){this.$store.commit("setStoryAssetDialogBox",{open:!0,id:t})}}}},cRwL:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{attrs:{row:"",wrap:""}},[t.getAssetPurchased()?s("v-flex",{attrs:{xs12:""}},[s("v-btn",{staticClass:"mb-0",attrs:{block:"",dark:"",color:"dark",loading:t.loading,disabled:t.loading},nativeOn:{click:function(e){t.onDownloadVideo()}}},[t._v("\n            Download Video\n        ")])],1):s("v-flex",{attrs:{xs12:""}},[s("v-btn",{staticClass:"mb-0",attrs:{dark:"",block:""},on:{click:function(e){e.stopPropagation(),t.openQuoteDialog()}}},[t._v("Request Quote\n        ")])],1)],1)};o._withStripped=!0;var i={render:o,staticRenderFns:[]};e.a=i},zh9u:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-flex",{attrs:{xs6:"",sm6:"",md12:""}},[s("div",{staticClass:"thumbnail",style:{backgroundImage:"url("+t.thumbnailImg+")"},on:{click:function(e){t.onOpenDialog(t.asset.id)}}},["video/mp4"===t.asset.mime_type?s("div",{staticClass:"video-icon"},[s("v-icon",{attrs:{dark:"",medium:""}},[t._v("play_circle_outline")])],1):t._e()])])};o._withStripped=!0;var i={render:o,staticRenderFns:[]};e.a=i}});