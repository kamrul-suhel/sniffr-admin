<template>
	<v-container fill-height>
		<v-layout justify-center align-center>
			<v-flex shrink>
				<v-card color="light" width="450">
	              <v-card-text class="text-xs-center">
              		<div class="headline text-uppercase text-xs-center">Unsubscribe</div>
              		<div v-if="contactFound">
              			<p>Please review your email adddress below and click 'unsubscribe' to delete your details from our platform. <strong>Warning:</strong> This action cannot be undone and will be permanent.</p>
              			<p class="red--text">{{ display_email }}</p>
          			
          				<v-btn dark 
          					@click="onUnsubscribe()"
          					:loading="loading"
                            :disabled="loading"
                            >Unsubscribe</v-btn>
              		</div>
              			
              		<div v-if="contactDeleted">
              			<p class="red--text">Your details have been deleted from our platform.</p>
              		</div>

              		<div v-if="contactNotFound">
              			<p>Sorry, we cannot find the email associated with your account. Please contact <u>submissions@unilad.co.uk</u></p>
              		</div>
	              </v-card-text>
	            </v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			display_email:'',
			contactNotFound: false,
			contactDeleted: false,
			contactFound: false,

			//Loading button
            loading: false,
            loader: null,
		}
	},

	created(){
		this.email = this.$route.params.email;
		if(this.email){
			let formData = new FormData();
			
			let url = '/unsubscribe/'+this.email;
			axios.get(url, formData)
			.then((response) => {
				if(response.data.error){
					this.contactNotFound = true;
				}

				if(response.data.success){
					this.contactFound = true;
					this.display_email = response.data.contact.email;
				}
			});
		}
	},

	methods: {
		onUnsubscribe() {
			let form = new FormData();
			form.append('key', this.email);

			//request for unsubscribe
			axios.post('/unsubscribe', form)
            .then(response => {
                let result = response.data;
				this.loading = true;
				
				setTimeout(() => {
                    this.loading = false;
                    if(response.data.success){
                    	// set default 
	                    this.contactNotFound = false;
						this.contactDeleted = true;
						this.contactFound = false;
                    }

                }, 1000);
            })
            .catch(error => {
            
            });
		}
	}
}
</script>