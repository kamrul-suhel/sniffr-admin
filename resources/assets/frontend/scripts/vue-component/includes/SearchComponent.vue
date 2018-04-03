<template>
	<div class="videos-filter-section">
	    <v-form action="/search" method="get" class="videos-filter-form">
	        <v-container grid-list-lg pt-2 pb-2>
	            <v-layout row wrap>
	                <v-flex xs12>
	                    <div class="form-group">
	                        <v-text-field
	                                type="text"
	                                name="value"
	                                color="white"
	                                label="Search"
	                                append-icon="search"
	                                aria-describedby="filterhelp"
	                                >
	                        </v-text-field>
	                    </div>
	                </v-flex>
	            </v-layout>
	        </v-container>
	    </v-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		created(){

		},
		methods:{

		}
	}
</script>