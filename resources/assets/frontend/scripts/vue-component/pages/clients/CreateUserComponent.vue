<template>
    <div class="client-user-create">
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">
                        <v-icon color="white" left size="20px">settings</v-icon>
                        Account Settings
                    </h2>
                </v-flex>

                <v-form ref="form" id="company-update-form">

                    <!--Company Name-->
                    <v-container grid-list-lg>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Company Name:"
                                        v-model="company.company_name"
                                        name="company_name"
                                        color="dark"
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
                                        required>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs6>
                                <v-text-field
                                        label="Billing Email Address"
                                        v-model="company.billing_email"
                                        name="billing_tel"
                                        type="text"
                                        color="dark"
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
                                        required>
                                </v-text-field>
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
                    <v-container grid-list-lg>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <h4 class="text-xs-center text-uppercase">User Accounts</h4>
                            </v-flex>
                        </v-layout>

                        <v-data-table :headers="headers" :items="companyUsers" hide-actions item-key="name">

                            <template slot="items" slot-scope="props">
                                <tr @click="props.expanded = !props.expanded">
                                    <td class="">{{ props.item.full_name ? props.item.full_name : props.item.username }}
                                    </td>
                                    <td class="">{{ props.item.tel }}</td>
                                    <td class="">{{ props.item.role }}</td>
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

                </v-form>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                html:''
            }
        },

        created(){
            let slug = this.$route.params.slug;
            axios.get('/client/profile/'+slug+'/users/create').then((response) => {
                this.html = response.data;
            });
        },

        methods: {

        },
    }
</script>