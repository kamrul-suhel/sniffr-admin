<template>
    <div class="client-profile">
        <v-container grid-list-lg class="pt-0" v-if="iniState">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Account Settings</h2>
                </v-flex>

                <v-form ref="form" v-model="valid" id="company-update-form" lazy-validation>

                    <!--Company Name-->
                    <v-container grid-list-lg>

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
                    <v-container grid-list-lg>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <h2 class="sub-heading text-xs-center text-uppercase">Company &amp; Billing
                                    Information</h2>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm12 md6 lg6 xl6>
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
                                <v-autocomplete
                                        :items="countries"
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

                            <v-flex xs12 sm12 md6 lg6 xl6>
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
                                        return object
                                ></v-select>
                            </v-flex>

                        </v-layout>

                    </v-container>

                    <!-- CTA -->
                    <v-container grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xsl2 text-xs-right pa-0>
                                <v-btn dark
                                       :loading="loading"

                                       class="sf-button"
                                       @click="onSubmit()">Update Settings
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <!-- Company User Accounts -->
                    <v-container grid-list-lg v-if="isAccountOwner">
                        <!--<v-container grid-list-lg>-->

                        <v-layout row wrap>
                            <v-flex xs12>
                                <h2 class="sub-heading text-xs-center text-uppercase pb-3">User Accounts</h2>
                            </v-flex>
                        </v-layout>

                        <v-data-table
                                :headers="headers"
                                :items="companyUsers"
                                hide-actions item-key="id">
                            <template slot="items" slot-scope="props">
                                <tr @click="props.expanded = !props.expanded">
                                    <td class="">{{ props.item.full_name ? props.item.full_name : props.item.username }}
                                    </td>
                                    <td class="">{{ props.item.tel }}</td>
                                    <td class="" style="text-transform: capitalize;">{{ props.item.role.replace('_', '')}}
                                    </td>
                                    <td class="">{{ props.item.active === 1 ? 'Active' : 'Deactivated' }}</td>
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

                    </v-container>

                    <!-- Users CTA -->
                    <br>
                    <v-container grid-list-lg v-if="isAccountOwner">
                        <!--<v-container grid-list-lg>-->
                        <v-layout row wrap>
                            <v-flex xsl2 text-xs-right pa-0>
                                <v-btn
                                        dark
                                        raised
                                        color="dark"
                                        class="sf-button"
                                        :to="{name: 'client_create_user', params:{slug : company.slug}}">New User
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-form>

            </v-layout>
        </v-container>
    </div>

</template>

<script>
    import ClientAccountServices from '../../services/ClientAccountServices'
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                valid: false,
                formState: false,
                companyOwner: null,
                countries: [],
                successMessage: false,

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

        computed: {
            ...mapGetters({
                company: 'getCompany',
                user: 'getCompanyCurrentUser',
                companyOwners: 'getCompanyOwners',
                isAccountOwner: 'getAccountOwner',
                companyUsers: 'getCompanyUsers',
                iniState: 'getIniState',
            })
        },

        watch: {
            isAccountOwner(value) {
                if (!value) {
                    this.$router.push({
                        name: 'client_edit_create_user',
                        params: {slug: this.company.slug, userid: this.user.id}
                    });
                }
            }
        },

        created() {
            this.countries = ClientAccountServices.getAllCountries();
            this.getCompanyData();
        },

        methods: {
            getCompanyData() {
                this.$store.dispatch('fetchClientAccount');
            },

            editUser(userId) {
                this.$router.push({
                    name: 'client_edit_create_user',
                    params: {slug: this.company.slug, userid: userId}
                });
            },

            onSubmit() {
                let toastOption = {
                    active: true,
                    message: "User successfully updated",
                    duration: 3000,
                    color: "success",
                };

                this.$store.commit('setToast', toastOption);
                return;
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

                    axios.post('/client/profile/' + this.company.id, companyUpdateForm)
                        .then(response => {
                            if (response.data.success) {
                                this.success = true;
                                this.successMessage = response.data.message;
                            }

                            // if(!this.isAccountOwner()) {
                            //     this.editUser(this.user.id);
                            // }

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
