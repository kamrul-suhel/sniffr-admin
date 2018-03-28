<!-- UPLODA VIDEO SECTION -->
<submission-form inline-template>
    <section class="upload-video-section section-space">
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex xs12>
                    <div>
                        <h2 class="text-center">Your Contact Details</h2>
                    </div>

                    <v-form v-model="valid" ref="form">
                        <v-container grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Full Name:"
                                            v-model="full_name"
                                            :rules="nameRules"
                                            color="dark"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Email Address:"
                                            v-model="email"
                                            :rules="emailRules"
                                            color="dark"
                                            required
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>

                            <v-layout row wrap>
                               <v-flex xs12 text-xs-center>
                                   <h2 class="text-xs-center">Your video details</h2>
                               </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Video title"
                                            v-model="title"
                                            color="dark"
                                            :rules="[v => !!v || 'Title is required']"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            color="dark"
                                            label="Video link/URL"
                                            v-model="url"
                                    ></v-text-field>

                                    <span v-if="error" class="red--text">Upload your file or provide a links please</span>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12 p-0>
                                    <v-btn
                                            dark
                                            raised
                                            class="{error: error}"
                                            @click="onPickFile()">
                                        Upload your video <v-icon dark right>system_update_alt</v-icon>
                                    </v-btn>

                                    <span v-if="error" class="red--text">Upload your file or provide a links please</span>

                                    <span>@{{file_name}}</span>

                                    <p class="small-italic">Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv, wmv, 3gp.</p>

                                    <input
                                            type="file"
                                            style="display:none;"
                                            ref="inputfile"
                                            accept="video/mp4,video/x-m4v,video/*"
                                            @change="onFilechange($event)"/>
                                </v-flex>


                            </v-layout>
                        </v-container>

                        <v-container grid-list-lg
                                     >

                            <div class="term-condition-content scroll-y term-condition"
                                 style="max-height: 250px"
                                 class=""
                                 id="scroll-target">
                                <v-layout row wrap text-center>
                                    <h2>Terms & Conditions</h2>
                                </v-layout>

                                <v-layout row wrap
                                          column
                                          align-center
                                          justify-center
                                          v-scroll:#scroll-target="onScroll">

                                    <v-flex xs12>

                                        <h4>Ownership</h4>
                                        <p>I certify that I am the sole owner of all intellectual property rights for this video or have the express permission of the rights holder to submit this video to UNILAD for exclusive publishing on UNILAD.</p>
                                        <p>I agree to submit and licence this video and its content to UNILAD and their associated companies for their use at their sole discretion, in exchange for entry into their £300 monthly prize draw.</p>

                                        <h4>Video Publishing Acknowledgement</h4>
                                        <p>I understand that the video I am submitting may be published to UNILAD web properties including, but not limited to, YouTube, UNILAD.co.uk, Twitter, Facebook, and any other avenues of promotion, as determined by UNILAD according to the terms of this agreement, which I have read and agree to.</p>

                                        <h4>Exclusive Licensing</h4>
                                        <p>I agree that UNILAD as the ‘License Holder’ be granted the exclusive, unlimited right to use, and to exhibit, distribute, and hereafter devise, in any manner upon all UNILAD platforms throughout the world, in perpetuity, for any purpose whatsoever as UNILAD in its sole discretion may determine (the “Licensed Rights”). I do hereby irrevocably appoint UNILAD as its attorney-in-fact in relation to the rights over these images.</p>
                                        <p>I certify that I act with full lawful authority to grant this license, and warrant that there has not been any previous grant of any other license to third parties in relation to these images and it is expressly understood that UNILAD has not assumed any obligations under any other contracts entered into by myself.</p>
                                        <p>I further undertake not to enter any future agreements over this content with any third parties, as required by the exclusivity of this agreement and will promptly forward any communications regarding my content to UNILAD, as the new License Holder.</p>
                                        <p>I hereby agree to indemnify, release and hold harmless UNILAD, its successors, in any action arising from the use of the images, resulting from any breach by Licensor of any warranty, representation or any other provision of these Terms.</p>

                                        <h4>Publicity/Confidentiality</h4>
                                        <p>I shall not release, or cause the release, of any information concerning the Licensed Rights, UNILAD or the terms of this License. I will inform UNILAD if there are any changes to my personal details for the duration of this agreement. UNILAD undertakes to maintain personal details confidentially and in accordance with all relevant data protection laws and the Privacy Policy available on our Website and incorporated herein.</p>

                                        <h4>Terms & Services</h4>
                                        <p>I acknowledged, understands and agree to the additional terms and services displayed on the UNILAD website which are incorporated herein by this reference and subject to change.</p>

                                        <h4>Termination Clause</h4>
                                        <p>The License shall only be terminable upon the mutual agreement of the parties with 5 months’ notice, I agree to indemnify UNILAD for any losses from third party contracts arising due to termination. Termination will have no effect on any prior use or treatment of the images by UNILAD, which may continue in perpetuity.</p>
                                        <p>I understand that participation in the UNILAD video system is at will and I agree that this license may only be terminated by mutual agreement between UNILAD and I as set out above.</p>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-container> <!-- End container -->


                        <v-container grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                    label="Notes"
                                    name="notes"
                                    color="dark"
                                    hint="If we need to know anything about the video, let us know here"
                                    multi-line></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                    label="Credit link"
                                    name="credit"
                                    hint="Credits are placed in the pinned comment (unless alternative method is agreed)"
                                    color="dark"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                    label="Unilad Referrer"
                                    name="referrer"
                                    hint="Who at UNILAD asked you to fill in this form?"
                                    color="dark">

                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>



                        <v-container grid-list-lg>
                            <v-layout row wrap>

                                <v-flex xs12 pb-0>
                                    <v-checkbox
                                            label="I agree to the above terms and conditions"
                                            v-model="terms_condition"
                                            :rules="[v => !!v || 'You must agree to continue']"
                                            color="dark"
                                            required
                                    ></v-checkbox>
                                </v-flex>

                                <v-flex xl2 text-xs-right pa-0>
                                    <p class="red-text" v-if="validate_email_error">Look your email is not valid plese try again</p>

                                    <v-progress-circular
                                            indeterminate
                                            color="dark"
                                            v-if="validete_email_progress"></v-progress-circular>

                                    <v-btn dark @click="onSubmit()">Submit your file</v-btn>

                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>

        <v-dialog v-model="uplod_progress" max-width="500px" >
            <v-card class="upload-dialog">
                <v-card-title>
                    <v-container >
                        <v-layout row justify-center>
                            <v-flex>
                                <h2 class="text-xs-center sub-heading">Your file is uploading</h2>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-xl>
                        <v-layout>
                            <v-flex>
                                <img src="{{ asset('assets/frontend/images/hamster_wheel.gif')}}"/>
                            </v-flex>
                        </v-layout>

                        <v-layout>
                            <v-flex xs10>
                                <v-progress-linear
                                        :value="progressbar"
                                        color="warning"
                                ></v-progress-linear>
                            </v-flex>

                            <v-flex xs2>
                                @{{progressbar}}
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</submission-form>