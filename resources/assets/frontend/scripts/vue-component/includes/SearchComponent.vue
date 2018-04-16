<template>
	<section class="videos-filter-section">
	    <div  class="videos-filter-form">
	        <v-container grid-list-lg pt-2 pb-2 pl-5 pr-5>
	            <v-layout row wrap>
	                <v-flex xs12>
	                    <div class="form-group">
	                        <v-text-field
	                                type="text"
	                                name="value"
									v-model="value"
	                                color="white"
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
                this.$router.push({name: 'videos_search', query: { value: this.value}});
			}
		}
	}
</script>