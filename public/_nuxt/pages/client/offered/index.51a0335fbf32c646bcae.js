webpackJsonp([7],{"1So9":function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{staticClass:"cd-box",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",sm12:"",md3:""}},[s("v-card",[s("v-card-media",{staticClass:"client-video-thumbnail cdi-content",attrs:{src:t.video.thumb?t.video.thumb:t.video.image?t.video.image:"/assets/images/placeholder.png",height:"250px"},on:{click:function(e){t.onVideoDialog()}}},[t.purchased?s("div",{staticClass:"cdi-label"},[s("v-tooltip",{attrs:{top:""}},[s("v-btn",{attrs:{slot:"activator",flat:"",icon:"",raised:"",light:"",color:"white"},slot:"activator"},[s("v-icon",{attrs:{size:"25px"}},[t._v("money")])],1),s("span",[t._v("Purchased")])],1)],1):t._e(),t.assetDeclined?s("div",{staticClass:"cdi-label"},[s("v-tooltip",{attrs:{top:""}},[s("v-btn",{attrs:{slot:"activator",flat:"",icon:"",raised:"",light:"",color:"white"},slot:"activator"},[s("v-icon",{attrs:{size:"25px"}},[t._v("error_outline")])],1),s("span",[t._v("Declined")])],1)],1):t._e()])],1)],1),s("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"","pb-0":""}},[s("h2",{domProps:{innerHTML:t._s(t.video.title)}}),s("div",{staticClass:"cd-time"},[t._v(t._s(t._f("convertDate")(t.video.updated_at)))]),s("div",[t._v(t._s(t._f("readmore")(t.video.description,300," ...")))]),"offered"===t.type||"purchased"===t.type?s("div",{staticClass:"quote"},[s("v-layout",{attrs:{column:"","fill-height":""}},[t.video.platform?s("v-flex",{staticClass:"pb-0",attrs:{xs12:""}},[s("span",[t._v("Platform: "+t._s(t._f("convertHyphenToSpace")(t.video.platform)))])]):t._e(),t.video.platform?s("v-flex",{staticClass:"pb-0",attrs:{xs12:""}},[s("span",[t._v("Length: "+t._s(t.settings.pricing.length[t.video.length].name))])]):t._e(),t.video.type?s("v-flex",{staticClass:"pb-0",attrs:{xs12:""}},[s("span",[t._v("Type: "+t._s(t.settings.pricing.type[t.video.type].name))])]):t._e(),t.video.credit?s("v-flex",{staticClass:"pb-0",attrs:{xs12:""}},[s("span",[t._v("Please Credit: "+t._s(t.video.credit))])]):t._e()],1)],1):t._e()])],1)],1),t.expired?s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":""}},[s("v-btn",{staticClass:"mb-3",attrs:{block:"",dark:"",large:"",disabled:"",color:"dark"}},[t._v("\n            No Longer Available\n        ")])],1):"requested"===t.video.collection_status?s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":"","align-content-center":"","justify-center":""}},[s("p",{staticClass:"text-xs-center darken-4"},[t._v("Waiting for quote")])]):"purchased"===t.assetType||t.video.purchased?s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":""}},[null!=t.video.deleted_at?s("div",[t._v("\n            This video has been removed from Sniffr.\n            As you already have a license you have a right to still download this video.\n        ")]):s("div",[s("v-btn",{staticClass:"mb-3",attrs:{block:"",dark:"",large:"",color:"dark"},on:{click:function(e){t.goToDetail()}}},[t._v("\n                View\n            ")])],1),s("v-btn",{attrs:{block:"",dark:"",large:"",color:"dark",loading:t.loading,disabled:t.loading},nativeOn:{click:function(e){t.onDownloadVideo()}}},[t._v("\n            "+t._s(t.button_text)+"\n        ")]),"purchased"===t.assetType?s("div",{staticClass:"caption text-xs-center pt-2"},[t._v(t._s(t._f("licenseExpired")(t.video.license_ends_at))+"\n        ")]):t._e()],1):s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":""}},[s("v-btn",{staticClass:"mb-3",attrs:{block:"",dark:"",large:"",loading:t.acceptLoading,disabled:t.acceptLoading||t.assetDeclined,color:"dark"},on:{click:function(e){t.onAccept()}}},[t._v("\n            £"+t._s(t._f("numberFormat")(t.video.final_price))+" - Buy Now\n        ")]),s("small",[t._v("Don't like this offer?")]),s("v-btn",{staticClass:"mb-3",attrs:{persistent:"",block:"",dark:"",large:"",color:"dark",loading:t.declineLoading,disabled:t.declineLoading||t.assetDeclined},on:{click:function(e){t.onContactUs()}}},[t._v("\n            Contact Us\n        ")])],1),s("v-flex",{staticClass:"my-2",attrs:{xs12:""}},[s("v-divider")],1)],1)};o._withStripped=!0;var i={render:o,staticRenderFns:[]};e.a=i},"5Gr2":function(t,e,s){"use strict";var o=s("Dd8w"),i=s.n(o),r=s("NYxO");e.a={data:function(){return{button_text:"Download Video",purchased:!1,decline:!1,loader:null,showButton:!1,loading:!1,acceptLoading:!1,declineLoading:!1,previouslyDecline:!1,expired:!1,assetType:""}},props:{video:{type:Object,require:!0},type:{type:String,require:!0},index:{type:Number,require:!0}},computed:i()({},Object(r.mapGetters)({settings:"getSettingsObject"}),{assetDeclined:{get:function(){return this.$store.getters.getConfirmDecline&&this.$store.getters.getDeclineAsset.collection_video_id===this.video.collection_video_id&&"video"===this.$store.getters.getDeclineType?(this.previouslyDecline=!0,!0):this.previouslyDecline}}}),created:function(){this.assetType=this.type,"expired"===this.video.collection_status&&(this.expired=!0)},watch:{loader:function(){var t=this,e=this.loader;this[e]=!this[e],setTimeout(function(){t[e]=!1,t.newOrder=!0},3e3),this.loader=null}},methods:{showDownloadButton:function(){this.showButton=!this.showButton},goToDetail:function(){this.$router.push({name:"client-video-alpha_id",params:{alpha_id:this.video.alpha_id}})},getImage:function(t){return t||"/assets/images/placeholder.png"},onDownloadVideo:function(){this.loader="loading";var t="/client/videos/"+this.video.id+"/download";window.location=t},onAccept:function(){var t=this,e="/client/collections/accept_asset_price/"+this.video.collection_video_id+"/video";this.acceptLoading=!0,this.$axios.$post(e).then(function(e){if("1"===e.success){t.$store.commit("setUserOffers",t.$store.getters.getUserStatus.offers-1),t.acceptLoading=!1,t.assetType="purchased";t.$store.commit("setThankYouMessage","You’ve video has been added to your order history"),t.$store.commit("setThankYouDialog",!0),t.purchased=!0}})},onContactUs:function(){this.$store.commit("setDeclineType","video"),this.$store.commit("setDeclineAsset",this.video),this.$store.commit("setDeclineDialogBox",!0)},onVideoDialog:function(){var t=this.$route.path;if(t+="?type="+this.type,t+="&id="+this.video.alpha_id,this.$route.query.tag&&(t+="&tag="+this.$route.query.tag),this.$route.query.alpha_id=this.video.alpha_id,this.$store.commit("setEnterRouteObject",this.$route),window.history.pushState({},null,t),"client_offered_assets"===this.$route.name){var e=this.index;return this.$store.commit("setAssetOfferedCurrentIndex",e),this.$store.dispatch("fetchOfferedDialogNextPrevious"),this.$store.commit("setVideoDialogBox",!0),void this.$store.commit("setVideoLoading",!0)}this.$store.commit("setCurrentVideoAlphaId",this.video.alpha_id),this.$store.commit("setCurrentRouteObject",this.$route),this.$store.commit("setVideoDialogBox",!0),this.$store.commit("setVideoLoading",!0),this.$store.dispatch("getVideoNextAndPrevLink",{alpha_id:this.video.alpha_id})}}}},"LY/U":function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{staticClass:"cd-box",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",sm12:"",md3:""}},[s("div",{staticClass:"cdi-content",style:{backgroundImage:"url("+t.getImage(t.story.thumb)+")"},on:{click:function(e){t.onStoryClick()}}},[t.purchased?s("div",{staticClass:"cdi-label"},[s("v-tooltip",{attrs:{top:""}},[s("v-btn",{attrs:{slot:"activator",flat:"",icon:"",raised:"",light:"",color:"white"},slot:"activator"},[s("v-icon",{attrs:{size:"25px"}},[t._v("money")])],1),s("span",[t._v("Purchased")])],1)],1):t._e(),t.assetDeclined?s("div",{staticClass:"cdi-label"},[s("v-tooltip",{attrs:{top:""}},[s("v-btn",{attrs:{slot:"activator",flat:"",icon:"",raised:"",light:"",color:"white"},slot:"activator"},[s("v-icon",{attrs:{size:"25px"}},[t._v("error_outline")])],1),s("span",[t._v("Declined")])],1)],1):t._e(),1===t.story.flagged?s("div",{staticClass:"hot-story"},[s("div",{staticClass:"hot-story-content"},[t._v("HOT")])]):t._e()])]),s("v-flex",{attrs:{xs12:"",sm12:"",md6:"","pl-3":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"","pb-0":""}},[s("h2",{domProps:{innerHTML:t._s(t.story.title)}}),s("div",{staticClass:"cd-time"},[t._v(t._s(t._f("convertDate")(t.story.date_ingested)))]),s("div",[t._v(t._s(t._f("readmore")(t.story.excerpt,200,"...")))]),"offered"===t.type||"purchased"===t.type?s("div",{staticClass:"quote"},[s("v-layout",{attrs:{column:"","fill-height":""}},[t.story.platform?s("v-flex",{staticClass:"pb-0",attrs:{xs12:""}},[s("span",[t._v("Platform: "+t._s(t._f("convertHyphenToSpace")(t.story.platform)))])]):t._e(),t.story.platform?s("v-flex",{staticClass:"pb-0",attrs:{xs12:""}},[s("span",[t._v("Length: "+t._s(t.settings.pricing.length[t.story.length].name))])]):t._e(),t.story.type?s("v-flex",{staticClass:"pb-0",attrs:{xs12:""}},[s("span",[t._v("Type: "+t._s(t.settings.pricing.type[t.story.type].name))])]):t._e()],1)],1):t._e()])],1)],1),t.expired?s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":""}},[s("v-btn",{staticClass:"mb-3",attrs:{block:"",dark:"",large:"",disabled:"",color:"dark"}},[t._v("\n            No Longer Available\n        ")])],1):"requested"===t.story.collection_status?s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":""}},[s("p",[t._v("Waiting for quote")])]):"purchased"===t.assetType||t.story.purchased?s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":""}},[null!=t.story.deleted_at?s("div",[t._v("\n            This story has been removed from Sniffr.\n            As you already have a license you have a right to still download this story.\n        ")]):s("div",[s("v-btn",{staticClass:"mb-3",attrs:{block:"",dark:"",large:"",color:"dark"},on:{click:function(e){t.goToDetail()}}},[t._v("\n                View\n            ")])],1),s("v-btn",{attrs:{block:"",dark:"",large:"",color:"dark",loading:t.loading,disabled:t.loading},nativeOn:{click:function(e){t.onDownloadStory()}}},[t._v("\n            "+t._s(t.button_text)+"\n        ")]),"purchased"===t.assetType?s("div",{staticClass:"caption text-xs-center pt-2"},[t._v(t._s(t._f("licenseExpired")(t.story.license_ends_at))+"\n        ")]):t._e()],1):s("v-flex",{attrs:{xs12:"",sm12:"",md3:"","pl-3":""}},[s("v-btn",{staticClass:"mb-3",attrs:{block:"",dark:"",large:"",loading:t.acceptLoading,disabled:t.acceptLoading||t.assetDeclined,color:"dark"},on:{click:function(e){t.onAccept()}}},[t._v("\n            £"+t._s(t._f("numberFormat")(t.story.final_price))+" - Buy Now\n        ")]),s("small",[t._v("Don't like this offer?")]),s("v-btn",{staticClass:"mb-3",attrs:{persistent:"",block:"",dark:"",large:"",disabled:t.acceptLoading||t.assetDeclined,color:"dark"},on:{click:function(e){t.onContactUs()}}},[t._v("\n            Contact Us\n        ")])],1),s("v-flex",{staticClass:"my-4",attrs:{xs12:""}},[s("v-divider")],1)],1)};o._withStripped=!0;var i={render:o,staticRenderFns:[]};e.a=i},Mhy2:function(t,e,s){"use strict";var o=s("Dd8w"),i=s.n(o),r=s("NYxO"),a=s("ddn2");e.a={data:function(){return{button_text:"Download Story",purchased:!1,decline:!1,loader:null,showButton:!1,loading:!1,acceptLoading:!1,assetType:"",expired:!1,previouslyDecline:!1}},props:{story:{type:Object,require:!0},type:{type:String,require:!0},index:{type:Number,require:!0}},computed:i()({},Object(r.mapGetters)({settings:"getSettingsObject"}),{assetDeclined:{get:function(){return this.$store.getters.getConfirmDecline&&this.$store.getters.getDeclineAsset.collection_story_id===this.story.collection_story_id&&"story"===this.$store.getters.getDeclineType?(this.previouslyDecline=!0,!0):this.previouslyDecline}}}),created:function(){this.assetType=this.type,this.getIsPurchasedAsset(),"expired"===this.story.collection_status&&(this.expired=!0)},watch:{loader:function(){var t=this,e=this.loader;this[e]=!this[e],setTimeout(function(){t[e]=!1,t.newOrder=!0},3e3),this.loader=null}},methods:{showDownloadButton:function(){this.showButton=!this.showButton},goToDetail:function(){this.$router.push({name:"client-stories-alpha_id",params:{alpha_id:this.story.alpha_id}})},getImage:function(t){return t||"~/assets/images/placeholder.png"},onDownloadStory:function(){this.loader="loading";var t="/client/stories/"+this.story.id+"/download";window.location=t},onAccept:function(){var t=this,e="/client/collections/accept_asset_price/"+this.story.collection_story_id+"/story";this.acceptLoading=!0,this.$axios.$post(e).then(function(e){if("1"===e.success){t.$store.commit("setUserOffers",t.$store.getters.getUserStatus.offers-1),t.acceptLoading=!1,t.assetType="purchased";t.$store.commit("setThankYouMessage","You’ve story has been added to your order history"),t.$store.commit("setThankYouDialog",!0),t.purchased=!0}})},onContactUs:function(){this.$store.commit("setDeclineType","story"),this.$store.commit("setDeclineAsset",this.story),this.$store.commit("setDeclineDialogBox",!0)},onStoryClick:function(){a.a.$emit("openStoryDialog",this.story)},getIsPurchasedAsset:function(){return"story"===this.type&&this.story.story_collections&&this.story.story_collections.length>0&&(this.purchased=!0),!1}}}},UcHp:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("wJz3"),i=s("dzrP"),r=s("VU/8")(o.a,i.a,!1,null,null,null);r.options.__file="resources/nuxt/pages/client/offered/index.vue",e.default=r.exports},Z7Yg:function(t,e,s){"use strict";var o=s("5Gr2"),i=s("1So9"),r=s("VU/8")(o.a,i.a,!1,null,null,null);r.options.__file="resources/nuxt/components/partials/AssetVideoOfferedComponent.vue",e.a=r.exports},ZtWl:function(t,e,s){"use strict";var o=s("Mhy2"),i=s("LY/U"),r=s("VU/8")(o.a,i.a,!1,null,null,null);r.options.__file="resources/nuxt/components/partials/AssetStoryOfferedComponent.vue",e.a=r.exports},ddn2:function(t,e,s){"use strict";var o=new(s("/5sW").default)({data:function(){return{openStoryDialogBox:!1}},methods:{}});e.a=o},dzrP:function(t,e,s){"use strict";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"client-offer-section"},[s("v-container",{staticClass:"pt-0",attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h2",{staticClass:"text-center text-uppercase"},[t._v(t._s(t.headingText))])]),t.totalStories<=0&&t.totalVideos<=0&&!t.searchVideoTerm?s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[s("h2",[t._v("You have no offers yet. You can buy or request quotes for any of our\n                    "),s("router-link",{attrs:{tag:"a",to:{path:"/videos"}}},[t._v("Videos")]),t._v(", and\n                    "),s("router-link",{attrs:{tag:"a",to:{path:"/stories"}}},[t._v("Stories")]),t._v(".\n                ")],1)]):s("v-flex",{attrs:{xs12:""}},[s("v-tabs",{attrs:{dark:"",color:"white","slider-color":"black"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[t.totalVideos>0||t.searchVideoTerm?s("v-tab",{key:"videos"},[s("v-badge",{attrs:{right:"",color:"black"}},[s("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.totalVideos))]),t._v("\n                            Videos\n                        ")])],1):t._e(),t.totalStories>0||t.searchStoryTerm?s("v-tab",{key:"stories"},[s("v-badge",{attrs:{right:"",color:"black"}},[s("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.totalStories))]),t._v("\n                            Stories\n                        ")])],1):t._e(),t.totalVideos>0||t.searchVideoTerm?s("v-tab-item",{key:"videos"},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"text-xs-right",attrs:{xs12:""}},[s("v-text-field",{attrs:{color:"dark","append-icon":"search",label:"Search"},model:{value:t.searchVideoTerm,callback:function(e){t.searchVideoTerm=e},expression:"searchVideoTerm"}})],1)],1),t.totalVideos<=0?s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[s("h2",[t._v("We could not find any videos matching your search.")])])],1):t._e(),t._l(t.videos,function(e,o){return s("asset-video-offered-component",{key:o,attrs:{type:t.type,index:o,video:e}})}),t.totalVideos>t.videosPerPage?s("div",{staticClass:"text-xs-center"},[s("v-pagination",{attrs:{length:t.numberOfVideoPages,"total-visible":7,dark:"",color:"black"},model:{value:t.videoPage,callback:function(e){t.videoPage=e},expression:"videoPage"}})],1):t._e()],2):t._e(),t.totalStories>0||t.searchStoryTerm?s("v-tab-item",{key:"stories"},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"text-xs-right",attrs:{xs12:""}},[s("v-text-field",{attrs:{color:"dark","append-icon":"search",label:"Search"},model:{value:t.searchStoryTerm,callback:function(e){t.searchStoryTerm=e},expression:"searchStoryTerm"}})],1)],1),t.totalStories<=0?s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[s("h2",[t._v("We could not find any stories matching your search.")])])],1):t._e(),t._l(t.stories,function(e,o){return s("asset-story-offered-component",{key:o,attrs:{type:t.type,story:e}})}),t.totalStories>t.storiesPerPage?s("div",{staticClass:"text-xs-center"},[s("v-pagination",{attrs:{length:t.numberOfStoryPages,"total-visible":7,dark:"",color:"black"},model:{value:t.storyPage,callback:function(e){t.storyPage=e},expression:"storyPage"}})],1):t._e()],2):t._e()],1)],1)],1)],1)],1)};o._withStripped=!0;var i={render:o,staticRenderFns:[]};e.a=i},wJz3:function(t,e,s){"use strict";var o=s("ZtWl"),i=s("Z7Yg");e.a={components:{AssetStoryOfferedComponent:o.a,AssetVideoOfferedComponent:i.a},data:function(){return{active:null,headingText:"",page:1,videoPage:1,storyPage:1,searchTerm:"",searchVideoTerm:"",searchStoryTerm:"",tabItems:["Video","Stories"]}},computed:{type:{get:function(){return this.$route.query.type},set:function(t){return t}},stories:{get:function(){return"offered"===this.type?this.$store.getters.getOfferedStories:"purchased"===this.type?this.$store.getters.getPurchasedStories:void 0}},videos:{get:function(){return"offered"===this.type?this.$store.getters.getOfferedVideos:"purchased"===this.type?this.$store.getters.getPurchasedVideos:void 0}},storiesPerPage:function(){return this.$store.getters.getStoriesPaginateObject.per_page},numberOfStoryPages:function(){return this.$store.getters.getStoriesPaginateObject.last_page},totalStories:function(){return this.$store.getters.getStoriesPaginateObject.total},videosPerPage:function(){return this.$store.getters.getVideoPaginateObject.per_page},totalVideos:function(){return this.$store.getters.getVideoPaginateObject.total},numberOfVideoPages:function(){return this.$store.getters.getVideoPaginateObject.last_page}},watch:{videoPage:function(){this.setData("video")},storyPage:function(){this.setData("story")},$route:function(t,e,s){this.$route.query.id||(this.type=this.$route.query.type,this.searchVideoTerm="",this.searchStoryTerm="",this.active="videos",this.setData())},searchVideoTerm:function(t){this.searchTerm=this.searchVideoTerm,this.page=1,this.setData("video")},searchStoryTerm:function(){this.searchTerm=this.searchStoryTerm,this.page=1,this.setData("story")}},created:function(){this.type=this.$route.query.type,this.setData()},methods:{setData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if("offered"===this.type){if(this.headingText="Your offers","video"===t)return void this.getOfferedVideosData(this.getQueryObject(t));if("story"===t)return void this.getOfferedStoriesData(this.getQueryObject(t));this.$store.commit("setResetStories"),this.$store.commit("setResetVideos"),this.getOfferedVideosData(this.getQueryObject(t)),this.getOfferedStoriesData(this.getQueryObject(t))}if("purchased"===this.type){if(this.headingText="Purchases","video"===t)return void this.getPurchasedVideosData(this.getQueryObject(t));if("story"===t)return void this.getPurchasedStoriesData(this.getQueryObject(t));this.$store.commit("setResetStories"),this.$store.commit("setResetVideos"),this.getPurchasedVideosData(this.getQueryObject(t)),this.getPurchasedStoriesData(this.getQueryObject(t))}},getOfferedVideosData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.generateUrl(t,"video","offered");this.$store.dispatch("fetchOfferedVideos",e)},getPurchasedVideosData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.generateUrl(t,"video","purchased");this.$store.dispatch("fetchPurchasedVideos",e)},getOfferedStoriesData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.generateUrl(t,"story","offered");this.$store.dispatch("fetchOfferedStories",e)},getPurchasedStoriesData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.generateUrl(t,"story","purchased");this.$store.dispatch("fetchPurchasedStories",e)},getQueryObject:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return"video"===t?{page:this.videoPage,searchTerm:this.searchTerm}:"story"===t?{page:this.storyPage,searchTerm:this.searchTerm}:{page:this.page,searchTerm:this.searchTerm}},generateUrl:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o="";return"video"===e&&("offered"===s&&(o="/client/videos/offered"),"purchased"===s&&(o="/client/videos/purchased")),"story"===e&&("offered"===s&&(o="/client/stories/offered"),"purchased"===s&&(o="/client/stories/purchased")),null!=t.page&&(o+="?page="+t.page),""!=t.searchTerm&&(o+="&search="+t.searchTerm),o}}}}});