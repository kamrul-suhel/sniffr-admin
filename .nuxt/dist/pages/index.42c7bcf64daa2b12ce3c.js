webpackJsonp([9],{"1SYl":function(t,e,i){"use strict";var s=i("UUUv"),o=i("xdkF"),a=i("VU/8")(s.a,o.a,!1,null,null,null);a.options.__file="resources/nuxt/components/FeatureComponent.vue",e.a=a.exports},Hiky:function(t,e,i){"use strict";var s=i("1SYl");e.a={asyncData:function(t,e){t.app.$axios.$post("/search/videos",{featured:"true"}).then(function(t){e(null,{videos:t.videos.data})})},head:{title:"Sniffr media"},components:{featureComponent:s.a},data:function(){return{fullHeight:window.innerHeight+"px"}},watch:{},created:function(){this.fullHeight=window.innerHeight+"px"},methods:{onUploadVideo:function(){var t=this;this.$vuetify.goTo("#header",{duration:500,easing:"easeInCubic"}),setTimeout(function(){t.$router.push({name:"upload_video"})},500)}}}},OcmM:function(t,e,i){"use strict";var s=i("iDB9"),o=i("iSbw"),a=i("VU/8")(s.a,o.a,!1,null,null,null);a.options.__file="resources/nuxt/components/includes/VideoLoopComponent.vue",e.a=a.exports},UUUv:function(t,e,i){"use strict";var s=i("OcmM");e.a={data:function(){return{}},props:{videos:{type:Array,require:!0}},components:{VideoLoopComponent:s.a},methods:{},created:function(){}}},iDB9:function(t,e,i){"use strict";e.a={data:function(){return{video_image:"~/assets/images/placeholder.png"}},props:{video:{type:Object,required:!0},type:{type:String,required:!1},width:{type:String,required:!1},index:{type:Number,required:!1}},methods:{getVideoPurchased:function(){return!!(this.video.video_collections&&this.video.video_collections.length>0)},defaultImage:function(){this.video_image="~/assets/images/placeholder.png"},onGetThumbnailImage:function(){return new RegExp("instagram","i").test(this.video.image)?"~/assets/images/placeholder.png":this.video.image},goToDetail:function(){"client_videos"===this.$route.name?this.$router.push({name:"client_video_download",params:{alpha_id:this.video.alpha_id}}):this.$router.push({path:"videos/"+this.video.alpha_id})},openVideoDialog:function(t){var e="/videos?id="+t.alpha_id;if(this.$route.query.tag&&(e+="&tag="+this.$route.query.tag),this.$route.query.search&&(e+="&search="+this.$route.query.search),"suggest"===this.type){this.$store.commit("setVideoDialogBox",!0),this.$store.commit("setVideoLoading",!0),e="/videos?id="+t.alpha_id,e+="&suggest=true",window.history.pushState({},null,e),this.$route.query.type="suggest";var i=this.index;return this.$store.commit("setEnterRouteObject",this.$route),this.$store.commit("setMailerVideoCurrentIndex",i),void this.$store.commit("setSuggestNextPrevious")}window.history.pushState({},null,e),this.$store.commit("setEnterRouteObject",this.$route),this.$store.commit("setCurrentVideoAlphaId",t.alpha_id),this.$store.commit("setCurrentRouteObject",this.$route),this.$store.commit("setVideoDialogBox",!0),this.$store.commit("setVideoLoading",!0),this.$store.dispatch("getVideoNextAndPrevLink",{alpha_id:t.alpha_id})}},directives:{checkimage:{inserted:function(t,e){var i=e.value,s=new Image;s.src=i,s.onload=function(){var e=document.createElement("img");e.src=i,t.appendChild(e)},s.onerror=function(){var e=document.createElement("img");e.src="~/assets/images/placeholder.png",t.appendChild(e)}}}}}},iSbw:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-flex",{staticClass:"asset-video-content",attrs:{xs12:"",sm6:"",md4:"",lg4:"",xl3:""}},[i("v-card",{staticClass:"video-card block",style:t.width?{"min-width":t.width}:""},[i("v-card-media",{staticClass:"video-card-thumb-wrapper",attrs:{src:t.onGetThumbnailImage()}},[i("a",{staticClass:"video-card-thumb",on:{click:function(e){e.stopPropagation(),t.openVideoDialog(t.video)}}},[i("div",{staticClass:"thumbnail-overlay"}),i("span",{staticClass:"play-button"},[i("v-icon",{attrs:{color:"white",size:"60px"}},[t._v("play_circle_outline")])],1),t.getVideoPurchased()?i("span",{staticClass:"label label-licensed"},[t._v("Purchased")]):t._e(),"1"==t.video.nsfw?i("span",{staticClass:"label",class:"1"==t.video.nsfw?"label-nsfw":"label-danger"},[t._v("\n                    NSFW\n                ")]):t._e(),t.video.duration?i("div",{staticClass:"video-duration"},[t._v("\n                    "+t._s(t._f("convertTime")(t.video.duration))+"\n                ")]):t._e()])]),i("v-card-title",{staticClass:"pb-0"},[i("h3",{staticClass:"video-card-title mb-0",on:{click:function(e){e.stopPropagation(),t.goToDetail(t.video)}}},[t._v("\n                "+t._s(t.video.title)+"\n            ")])]),i("v-card-text",{staticClass:"pt-0"},["null"!==t.video.description?i("p",{staticClass:"video-card-text"},[t._v("\n                "+t._s(t._f("readmore")(t.video.description,100,"..."))+"\n            ")]):t._e()])],1)],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},xdkF:function(t,e,i){"use strict";var s=function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"feature-section section-space"},[e("v-container",{staticClass:"pt-0",attrs:{"grid-list-lg":""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{staticClass:"py-0",attrs:{xs12:"","text-center":""}},[e("div",{staticClass:"featured-section-title"},[e("h1",{staticClass:"heading"},[this._v("FEATURED VIDEOS")])])])],1),e("v-layout",{staticClass:"videos-section",attrs:{row:"",wrap:""}},this._l(this.videos,function(t){return e("video-loop-component",{key:t.id,attrs:{video:t}})}))],1)],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},zFIu:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("section",{ref:"js_fullheight",staticClass:"js-fullheight",style:{height:t.fullHeight},attrs:{id:"header"}},[i("div",{staticClass:"header-content"},[i("h1",{staticClass:"heading home"},[t._v("Video Licensing Platform")]),i("p",{staticClass:"sub-heading"},[t._v("License viral videos viewed by millions around the world from Sniffr Media")]),i("button",{staticClass:"btn btn-primary upload-video-button",on:{click:function(e){t.onUploadVideo()}}},[t._v("Upload your video")])])]),i("feature-component",{attrs:{videos:t.videos}})],1)};s._withStripped=!0;var o={render:s,staticRenderFns:[]};e.a=o},zmsi:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Hiky"),o=i("zFIu"),a=i("VU/8")(s.a,o.a,!1,null,null,null);a.options.__file="resources/nuxt/pages/index.vue",e.default=a.exports}});