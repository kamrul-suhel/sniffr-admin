<template>
    <div class="client-profile">
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap v-if="stateReady">
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Account Settings</h2>
                </v-flex>

                <v-form ref="form" v-model="valid" id="company-update-form" >

                    <!--Company Name-->
                    <v-container grid-list-lg>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Company Name:"
                                        v-model="company.company_name"
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
                                <h4 class="text-xs-center text-uppercase">Company &amp; Billing Information</h4>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs6>
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

                            <v-flex xs6>
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

                            <v-flex xs6>
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

                            <v-flex xs6>
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

                            <v-flex xs6>
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

                            <v-flex xs6>
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

                            <v-flex xs6>
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

                            <v-flex xs6>
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

                            <v-flex xs6>
                                <v-text-field
                                        label="Country"
                                        v-model="company.country"
                                        name="country"
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
                                        color="dark"
                                        item-text="name"
                                        item-value="id"
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
                                       @click="onSubmit()">Update Settings
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <!-- Company User Accounts -->
                    <v-container grid-list-lg v-if="isAccountOwner()">

                        <v-layout row wrap>
                            <v-flex xs12>
                                <h4 class="text-xs-center text-uppercase">User Accounts</h4>
                            </v-flex>
                        </v-layout>

                        <v-data-table :headers="headers" :items="companyUsers" hide-actions item-key="id">
                            <template slot="items" slot-scope="props">
                                <tr @click="props.expanded = !props.expanded">
                                    <td class="">{{ props.item.full_name ? props.item.full_name : props.item.username }}</td>
                                    <td class="">{{ props.item.tel }}</td>
                                    <td class="" style="text-transform: capitalize;">{{ props.item.role.replace('_', ' ')}}</td>
                                    <td class="">{{ props.item.active === 1 ? 'Active' : 'Deactivated' }}</td>
                                    <td class="right">
                                        <v-btn dark @click="editUser(props.item.id)">
                                            <v-icon color="white" size="20px">edit</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>

                    </v-container>

                    <!-- Users CTA -->
                    <br>
                    <v-container grid-list-lg v-if="isAccountOwner()">
                        <v-layout row wrap>
                            <v-flex xsl2 text-xs-right pa-0>
                                <router-link :to="{name: 'client_create_user', params:{slug : companyData.slug}}">
                                    <v-btn dark>New User</v-btn>
                                </router-link>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-form>

            </v-layout>
        </v-container>

        <!-- Success Message -->
        <v-snackbar
                top="top"
                :timeout="3000"
                v-model="success">{{ successMessage }}
            <v-btn flat color="light" @click.native="success = false">Close</v-btn>
        </v-snackbar>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                stateReady: false,
                valid: false,
                companyData: null,
                company: null,
                user: null,
                companyUsers: null,
                companyOwners: null,
                companyOwner: null,
                success: false,
                successMessage: false,

                headers: [
                    {text: 'Name', align: 'left', sortable: true, value: 'name'},
                    {text: 'Tel', align: 'left', sortable: true, value: 'tel'},
                    {text: 'Role', align: 'left', sortable: true, value: 'role'},
                    {text: 'Status', align: 'left', sortable: true, value: 'status'},
                    {text: '', align: 'left', sortable: true, value: ''},
                ],

                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                emailError: '',
            }
        },

        created() {
            this.getCompanyData();
        },


        methods: {
            getCompanyData() {
                axios.get('/client/profile').then((response) => {
                    this.user = response.data.user;
                    this.companyData = response.data.company;
                    this.companyUsers = response.data.company_users;
                    this.companyOwner = this.companyData.account_owner_id;
                    let companyOwners = [];
                    let users = Object.entries(response.data.account_owner_users);
                    users.forEach(function (index, value) {
                        companyOwners.push({id: index[0], name: index[1]});
                    });
                    this.companyOwners = companyOwners;

                    this.company = {
                        company_name: this.companyData.name,
                        address_line1: this.companyData.address_line1,
                        address_line2: this.companyData.address_line2,
                        city: this.companyData.city,
                        postcode: this.companyData.postcode,
                        country: this.companyData.country,
                        vat_number: this.companyData.vat_number,
                        billing_name: this.companyData.billing_name,
                        billing_email: this.companyData.billing_email,
                        billing_tel: this.companyData.billing_tel,
                        account_owner_id: this.companyData.account_owner_id,
                    };

                    this.stateReady = true;

                    if(this.user.id !== this.companyOwner || this.user.role !== 'client_admin') {
                        this.editUser(this.user.id);
                    }
                });
            },

            editUser(userId) {
                this.$router.push({
                    name: 'client_edit_create_user',
                    params: {slug: this.companyData.slug, userid: userId}
                });
            },

            onSubmit() {
                if (this.$refs.form.validate()) {

                    let companyUpdateForm = new FormData();
                    companyUpdateForm.append('company_name', this.company.company_name);
                    companyUpdateForm.append('address_line1', this.company.address_line1);
                    companyUpdateForm.append('address_line2', this.company.address_line2);
                    companyUpdateForm.append('city', this.company.city);
                    companyUpdateForm.append('postcode', this.company.postcode);
                    companyUpdateForm.append('country', this.company.country);
                    companyUpdateForm.append('vat_number', this.company.vat_number);
                    companyUpdateForm.append('billing_name', this.company.billing_name);
                    companyUpdateForm.append('billing_email', this.company.billing_email);
                    companyUpdateForm.append('billing_tel', this.company.billing_tel);
                    companyUpdateForm.append('account_owner_id', this.companyOwner);

                    axios.post('/client/profile/' + this.companyData.id, companyUpdateForm)
                        .then(response => {

                            if (response.data.success) {
                                this.success = true;
                                this.successMessage = response.data.message;
                            }

                            if(!this.isAccountOwner()) {
                                this.editUser(this.user.id);
                            }

                        }).catch(error => {

                    });

                }
            },

            isAccountOwner() {
                return this.user.id === this.companyData.account_owner_id
            }
        },
    }
</script>
