<template>
	<section class="videos-filter-section">
	    <div  class="videos-filter-form">
	        <v-container grid-list-lg pt-2 pb-2>
	            <v-layout row wrap>
	                <v-flex xs12>
	                    <div class="form-group">
	                        <v-text-field
									dark
	                                type="text"
	                                name="value"
									v-model="value"
	                                color="white"
									dark
	                                label="Search"
	                                append-icon="search"
	                                aria-describedby="filterhelp"
	                                @change="onSearchaActive"
									@keyup.enter="onSearchaActive"
									autocomplete="off">
	                        </v-text-field>
	                    </div>
	                </v-flex>
	            </v-layout>
	        </v-container>
	    </div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				value : ''
			}
		},
		props: [
		    'searchOption'
		],
		created(){

		},
		methods:{
            onSearchaActive(){
                if(this.$route.name === 'stories'){
					this.$router.push({name: 'stories', query: { search: this.value, page: 1}});
				}else{
					this.$router.push({name: 'videos', query: { search: this.value, page: 1}});
				}
			}
		}
	}
</script>