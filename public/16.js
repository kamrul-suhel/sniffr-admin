webpackJsonp([16],{ECaW:function(e,a,t){var n=t("VU/8")(t("Xy4A"),t("wbLD"),!1,null,null,null);e.exports=n.exports},Xy4A:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(a,t,n){return t&&e(a.prototype,t),n&&e(a,n),a}}();var i=function(){function e(){!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,[{key:"getAllCountries",value:function(){return["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]}}]),e}(),r=i=new i,s=t("NYxO"),l=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};a.default={data:function(){return{valid:!1,formState:!1,companyOwner:null,countries:[],loader:null,loading:!1,headers:[{text:"Name",align:"left",sortable:!0,value:"name"},{text:"Tel",align:"left",sortable:!0,value:"tel"},{text:"Role",align:"left",sortable:!0,value:"role"},{text:"Status",align:"left",sortable:!0,value:"status"},{text:"Action",align:"center",sortable:!0,value:""}],emailRules:[function(e){return!!e||"Email is required"},function(e){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)||"E-mail must be valid"}],emailError:""}},beforeRouteEnter:function(e,a,t){t(function(e){e.$store.getters.getIsCompanyOwner||e.$router.push({name:"client_edit_create_user",params:{slug:e.$store.getters.getCompanySlug,userid:e.$store.getters.getUserId}})})},computed:l({},Object(s.b)({company:"getCompany",user:"getCompanyCurrentUser",companyOwners:"getCompanyOwners",companyUsers:"getCompanyUsers",iniState:"getClientIniState"})),watch:{},created:function(){this.$store.commit("setClientInitState",!1),this.countries=r.getAllCountries(),this.getCompanyData()},methods:{getCompanyData:function(){this.$store.dispatch("fetchClientAccount")},editUser:function(e){this.$router.push({name:"client_edit_create_user",params:{slug:this.company.slug,userid:e}})},onSubmit:function(){var e=this;if(this.$refs.form.validate()){var a=new FormData;a.append("company_name",this.company.name),a.append("address_line1",this.company.address_line1),a.append("address_line2",this.company.address_line2),a.append("city",this.company.city),a.append("postcode",this.company.postcode),a.append("country",this.company.country),a.append("vat_number",this.company.vat_number),a.append("billing_name",this.company.billing_name),a.append("billing_email",this.company.billing_email),a.append("billing_tel",this.company.billing_tel),a.append("account_owner_id",this.company.account_owner_id),axios.post("/client/profile/"+this.company.id,a).then(function(a){if(a.data.success){var t={message:a.data.message,duration:3e3,color:"success",horizontalAlign:"right"};e.$store.commit("setToast",t)}e.loading=!1,e.loader=null}).catch(function(e){})}}},destroyed:function(){this.$store.commit("resetClientAccount")}}},wbLD:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"client-profile"},[e.iniState?t("v-container",{staticClass:"pt-0",attrs:{"grid-list-lg":""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs12:""}},[t("h2",{staticClass:"text-center text-uppercase"},[e._v("Account Settings")])]),e._v(" "),t("v-form",{ref:"form",attrs:{"lazy-validation":"",id:"company-update-form"},model:{value:e.valid,callback:function(a){e.valid=a},expression:"valid"}},[t("v-container",{attrs:{"grid-list-lg":"","pa-0":""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs12:""}},[t("v-text-field",{attrs:{label:"Company Name:",name:"company_name",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.name,callback:function(a){e.$set(e.company,"name",a)},expression:"company.name"}})],1)],1)],1),e._v(" "),t("v-container",{attrs:{"grid-list-lg":"","pa-0":""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs12:""}},[t("h2",{staticClass:"sub-heading text-xs-center text-uppercase"},[e._v("Company & Billing\n                                Information")])])],1),e._v(" "),t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"Address Line 1",name:"address_line1",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.address_line1,callback:function(a){e.$set(e.company,"address_line1",a)},expression:"company.address_line1"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"VAT Number",name:"vat_number",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.vat_number,callback:function(a){e.$set(e.company,"vat_number",a)},expression:"company.vat_number"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"Address Line 2",name:"address_line2",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.address_line2,callback:function(a){e.$set(e.company,"address_line2",a)},expression:"company.address_line2"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"Billing Name",name:"billing_name",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.billing_name,callback:function(a){e.$set(e.company,"billing_name",a)},expression:"company.billing_name"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"Billing Email Address",name:"billing_email",type:"email",color:"dark",rules:e.emailRules,"error-messages":e.emailError,required:""},model:{value:e.company.billing_email,callback:function(a){e.$set(e.company,"billing_email",a)},expression:"company.billing_email"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"Postcode",name:"postcode",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.postcode,callback:function(a){e.$set(e.company,"postcode",a)},expression:"company.postcode"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"Billing Phone Number",name:"billing_tel",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.billing_tel,callback:function(a){e.$set(e.company,"billing_tel",a)},expression:"company.billing_tel"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-autocomplete",{attrs:{items:e.countries,label:"Country","return-object":"",name:"country",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.country,callback:function(a){e.$set(e.company,"country",a)},expression:"company.country"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:"",sm12:"",md6:""}},[t("v-text-field",{attrs:{label:"City",name:"city",type:"text",color:"dark",rules:[function(e){return!!e||"Field is required"}],required:""},model:{value:e.company.city,callback:function(a){e.$set(e.company,"city",a)},expression:"company.city"}})],1),e._v(" "),t("v-flex",{attrs:{xs12:""}},[t("v-select",{attrs:{items:e.companyOwners,label:"Change Owner - Note: Once the account owner is changed, you will lose access to these settings.",name:"client_owner_id","item-value":"id","item-text":"name",color:"dark",return:"",object:""},model:{value:e.companyOwner,callback:function(a){e.companyOwner=a},expression:"companyOwner"}})],1),e._v(" "),t("v-flex",{attrs:{xsl2:"","text-xs-right":"","pa-0":""}},[t("v-btn",{staticClass:"sf-button",attrs:{dark:"",loading:e.loading},on:{click:function(a){e.onSubmit()}}},[e._v("Update Settings\n                            ")])],1)],1)],1)],1),e._v(" "),t("v-container",{attrs:{"grid-list-lg":"","pa-0":""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs12:"","text-xs-center":"","pb-3":""}},[t("h2",{staticClass:"sub-heading text-uppercase"},[e._v("User Accounts")])])],1),e._v(" "),t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs12:""}},[t("v-data-table",{attrs:{headers:e.headers,items:e.companyUsers,"hide-actions":"","item-key":"id"},scopedSlots:e._u([{key:"items",fn:function(a){return[t("tr",[t("td",[e._v(e._s(a.item.full_name?a.item.full_name:a.item.username))]),e._v(" "),t("td",[e._v(e._s(a.item.tel))]),e._v(" "),t("td",{staticStyle:{"text-transform":"capitalize"}},[e._v(e._s(a.item.role.replace("_",""))+"\n                                    ")]),e._v(" "),t("td",[e._v(e._s(1===a.item.active?"Active":"Deactivated"))]),e._v(" "),t("td",{staticClass:"text-xs-center"},[t("v-btn",{attrs:{flat:"",icon:"",color:"dark"},on:{click:function(t){e.editUser(a.item.id)}}},[t("v-icon",{attrs:{size:"15px"}},[e._v("edit")])],1)],1)])]}}])})],1)],1),e._v(" "),t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xsl2:"","text-xs-right":"","pt-2":""}},[t("v-btn",{staticClass:"sf-button mr-0",attrs:{dark:"",raised:"",color:"dark",to:{name:"client_create_user",params:{slug:e.company.slug}}}},[e._v("New User\n                        ")])],1)],1)],1)],1)],1):e._e()],1)},staticRenderFns:[]}}});
//# sourceMappingURL=16.js.map