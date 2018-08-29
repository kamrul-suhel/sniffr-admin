<template>
    <div class="client-profile">
        <v-container grid-list-lg
                     class="pt-0"
                     v-if="iniState">
            <v-layout row
                      wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Account Settings</h2>
                </v-flex>

                <v-form lazy-validation
                        ref="form"
                        v-model="valid"
                        id="company-update-form">
                    <!--Company Name-->
                    <v-container grid-list-lg
                                 pa-0>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Company Name:"
                                        v-model="company.name"
                                        name="company_name"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <!-- Billing Info-->
                    <v-container grid-list-lg
                                 pa-0>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <h2 class="sub-heading text-xs-center text-uppercase">Company &amp; Billing
                                    Information</h2>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="Address Line 1"
                                        v-model="company.address_line1"
                                        name="address_line1"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="VAT Number"
                                        v-model="company.vat_number"
                                        name="vat_number"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="Address Line 2"
                                        v-model="company.address_line2"
                                        name="address_line2"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="Billing Name"
                                        v-model="company.billing_name"
                                        name="billing_name"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="Billing Email Address"
                                        v-model="company.billing_email"
                                        name="billing_email"
                                        type="email"
                                        color="dark"
                                        :rules="emailRules"
                                        :error-messages="emailError"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="Postcode"
                                        v-model="company.postcode"
                                        name="postcode"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="Billing Phone Number"
                                        v-model="company.billing_tel"
                                        name="billing_tel"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-autocomplete
                                        :items="allCountries"
                                        label="Country"
                                        return-object
                                        v-model="company.country"
                                        name="country"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-autocomplete>
                            </v-flex>

                            <v-flex xs12 sm12 md6>
                                <v-text-field
                                        label="City"
                                        v-model="company.city"
                                        name="city"
                                        type="text"
                                        color="dark"
                                        :rules="[v => !!v || 'Field is required']"
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                        :items="companyOwners"
                                        v-model="companyOwner"
                                        label="Change Owner - Note: Once the account owner is changed, you will lose access to these settings."
                                        name="client_owner_id"
                                        item-value="id"
                                        item-text="name"
                                        color="dark"
                                        return object>
                                </v-select>
                            </v-flex>

                            <v-flex xsl2 text-xs-right pa-0>
                                <v-btn dark
                                       :loading="loading"
                                       class="sf-button"
                                       @click="onSubmit()">Update Settings
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>

                <!-- Company User Accounts -->
                <v-container grid-list-lg
                             pa-0>
                    <v-layout row wrap>
                        <v-flex xs12 text-xs-center pb-3>
                            <h2 class="sub-heading text-uppercase">User Accounts</h2>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-data-table
                                    class="data-table"
                                    :headers="headers"
                                    :items="companyUsers"
                                    hide-actions
                                    item-key="id">
                                <template slot="items"
                                          slot-scope="props">
                                    <tr>
                                        <td>{{ props.item.full_name ? props.item.full_name : props.item.username }}</td>
                                        <td>{{ props.item.tel }}</td>
                                        <td style="text-transform: capitalize;">{{ props.item.role.replace('_', '')}}
                                        </td>
                                        <td>{{ props.item.active === 1 ? 'Active' : 'Deactivated' }}</td>
                                        <td class="text-xs-center">
                                            <v-btn
                                                    @click="editUser(props.item.id)"
                                                    flat icon
                                                    color="dark">
                                                <v-icon size="15px">edit</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xsl2
                                text-xs-right
                                pt-2
                        >
                            <v-btn
                                    dark
                                    raised
                                    color="dark"
                                    class="sf-button mr-0"
                                    :to="{name: 'client-profile-slug-users-create', params:{slug : company.slug}}">New User
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
    import ClientAccountServices from '@/plugins/services/ClientAccountServices'
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                valid: false,
                formState: false,
                companyOwner: null,

                loader: null,
                loading: false,

                headers: [
                    {text: 'Name', align: 'left', sortable: true, value: 'name'},
                    {text: 'Tel', align: 'left', sortable: true, value: 'tel'},
                    {text: 'Role', align: 'left', sortable: true, value: 'role'},
                    {text: 'Status', align: 'left', sortable: true, value: 'status'},
                    {text: 'Action', align: 'center', sortable: true, value: ''},
                ],

                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                emailError: '',
            }
        },

        beforeRouteEnter(to, from, next) {
            next(vm => {
                let isCompanyOwner = vm.$store.getters.getIsCompanyOwner;
                if (!isCompanyOwner) {
                    vm.$router.push({
                        name: 'client-profile-slug-users-userid-edit',
                        params: {
                            slug: vm.$store.getters.getCompanySlug,
                            userid: vm.$store.getters.getUserId
                        }
                    })
                }
            });
        },

        computed: {
            ...mapGetters({
                company: 'getCompany',
                user: 'getCompanyCurrentUser',
                companyOwners: 'getCompanyOwners',
                companyUsers: 'getCompanyUsers',
                iniState: 'getClientIniState',
            }),

            allCountries(){
                return ClientAccountServices.getAllCountries();
            }
        },

        watch: {
            iniState(){
            }
        },

        created() {
            this.$store.commit('setClientInitState', false);
            this.getCompanyData();
        },

        methods: {
            getCompanyData() {
                this.$store.dispatch('fetchClientAccount');
            },

            editUser(userId) {
                this.$router.push({
                    name: 'client-profile-slug-users-userid-edit',
                    params: {slug: this.company.slug, userid: userId}
                });
            },

            onSubmit() {
                if (this.$refs.form.validate()) {
                    let companyUpdateForm = new FormData();
                    companyUpdateForm.append('company_name', this.company.name);
                    companyUpdateForm.append('address_line1', this.company.address_line1);
                    companyUpdateForm.append('address_line2', this.company.address_line2);
                    companyUpdateForm.append('city', this.company.city);
                    companyUpdateForm.append('postcode', this.company.postcode);
                    companyUpdateForm.append('country', this.company.country);
                    companyUpdateForm.append('vat_number', this.company.vat_number);
                    companyUpdateForm.append('billing_name', this.company.billing_name);
                    companyUpdateForm.append('billing_email', this.company.billing_email);
                    companyUpdateForm.append('billing_tel', this.company.billing_tel);
                    companyUpdateForm.append('account_owner_id', this.company.account_owner_id);

                    this.$axios.$post('/client/profile/' + this.company.id, companyUpdateForm)
                        .then(response => {
                            if (response.success) {
                                let toastOption = {
                                    message: response.data.message,
                                    duration: 3000,
                                    color: "success",
                                    horizontalAlign: "right"
                                };
                                this.$store.commit('setToast', toastOption);
                            }

                            this.loading = false;
                            this.loader = null;

                        }).catch(error => {

                    });

                }
            }
        },

        destroyed() {
            this.$store.commit('resetClientAccount');
        }
    }
</script>
