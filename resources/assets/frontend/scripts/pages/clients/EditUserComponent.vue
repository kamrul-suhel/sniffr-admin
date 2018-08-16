<template>
    <div class="client-user-create">
        <v-container grid-list-lg class="pt-0" v-if="iniState">
            <v-layout row wrap>
                <v-flex xs12 pt-0 v-if="user.role !== 'client'">
                    <v-btn outline @click="onGoback()" class="ml-0">
                        <v-icon>chevron_left</v-icon>
                        Go back
                    </v-btn>
                </v-flex>

                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Edit {{ user.full_name }} </h2>
                </v-flex>

                <v-flex xs12>
                    <v-form ref="form" v-model="valid" id="user-create-form">

                        <!--User Details -->

                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Full Name:"
                                        v-model="user.full_name"
                                        name="full_name"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Job Title"
                                        v-model="user.job_title"
                                        name="job_title"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        label="Email Address"
                                        v-model="user.email"
                                        name="email"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                                <small class="red--text" v-if="error && errors.email">{{ errors.email[0] }}</small>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        label="Phone Number"
                                        v-model="user.tel"
                                        name="tel"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 v-if="user.role !== 'client'">
                                <v-select
                                        :items="clientRoles"
                                        v-model="user.role"
                                        label="Client role"
                                        name="role"
                                        :rules="[v => !!v || 'Field is required']"
                                        color="dark"
                                        item-text="name"
                                        item-value="id"
                                        return object
                                        required
                                ></v-select>
                            </v-flex>
                        </v-layout>


                        <!-- CTA -->

                        <v-layout row wrap>
                            <v-flex xsl2 text-xs-right pa-0>
                                <v-btn dark
                                       @click="onSubmit()">Update User
                                </v-btn>
                            </v-flex>
                        </v-layout>

                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                error: false,
                errors: null,
                valid: false,
                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                emailError: '',
                clientRoles: [
                    {id: 'client', name: 'Client'},
                    {id: 'client_admin', name: 'Client Admin'},
                ]
            }
        },

        computed : {
            ...mapGetters({
                user: 'getCompanyCurrentUser',
                iniState: 'getIniState'
            })
        },

        created() {
            let slug = this.$route.params.slug;
            let userId = this.$route.params.userid;
            let url = '/client/profile/' + slug + '/users/' + userId + '/edit';
            this.$store.dispatch('fetchClientUser', {url: url})
        },

        methods: {
            onGoback() {
                let prevRoute = this.$store.getters.getRouteUrl;
                if (prevRoute != '') {
                    this.$router.push({name: this.$store.getters.getRouteUrl});
                } else {
                    this.$router.go(-1);
                }
            },
            onSubmit() {
                this.errors = null;
                this.error = false;

                if (this.$refs.form.validate()) {
                    let slug = this.$route.params.slug;
                    let updateUserForm = new FormData();

                    updateUserForm.append('full_name', this.user.full_name);
                    updateUserForm.append('job_title', this.user.job_title);
                    updateUserForm.append('email', this.user.email);
                    updateUserForm.append('tel', this.user.tel);
                    updateUserForm.append('role', this.user.role);
                    updateUserForm.append('_method', 'patch');

                    axios.post('/client/profile/' + slug + '/users/' + this.user.id, updateUserForm)
                        .then(response => {

                            if (response.data.success) {
                                // this.$router.push({name: 'client_profile'});
                                let toast = {
                                    active : true,
                                    message: 'User successfully updated',
                                    duration: 5000,
                                    color: 'success',
                                }

                                this.$store.commit('setToast', toast)
                            }
                        })
                        .catch(error => {
                            this.errors = error.response.data.errors;
                            this.error = true;
                        });
                }
            }
        },
    }
</script>
