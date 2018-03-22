<!-- UPLODA VIDEO SECTION -->
<section class="upload_video_section section_space">
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12>
                <div class="upload_video_title">
                    <h1>UPLOAD YOUR VIDEO</h1>
                </div>

                <div>
                    <h3 class="text-center">Your Contact Details</h3>
                </div>
                <v-form v-model="valid">
                    <v-container grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Full Name:"
                                        v-model="full_name"
                                        :rules="nameRules"
                                        required
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        label="Email Address:"
                                        v-model="email"
                                        :rules="emailRules"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                        label="Phone Number"
                                        v-model="phone"
                                        :reles="phoneRules"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        label="Video title"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-flex xs12>
                            <h3 class="text-xs-center">Your video details</h3>
                        </v-flex>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-btn
                                    m0 
                                    raised 
                                    class="dark" @click="onPickFile()">
                                    Upload your video
                                </v-btn>
                                <p>Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv, wmv, 3gp.</p>
                                <span>@{{file_name}}</span>
                                <input
                                    color="dark"
                                    type="file"
                                    style="display:none;"
                                    ref="inputfile"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    @change="onFilechange($event)"/>

                                {{--<v-progress-circular--}}
                                        {{--:size="100"--}}
                                        {{--:width="15"--}}
                                        {{--:rotate="360"--}}
                                        {{--:value="progressbar"--}}
                                        {{--color="teal"--}}
                                {{-->--}}
                                    {{--@{{ progressbar }}--}}
                                {{--</v-progress-circular>--}}
                                
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        color="dark"
                                        label="Video link/URL"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12>

                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-container grid-list-lg
                                 style="max-height: 250px"
                                 class="scroll-y"
                                 id="scroll-target"
                    >
                        <v-layout row wrap text-center>
                            <h2>Terms & Conditions</h2>
                        </v-layout>
                        <v-layout row wrap
                                  column
                                  align-center
                                  justify-center
                                  v-scroll:#scroll-target="onScroll"
                        >
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
                    </v-container>

                    <v-container grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-checkbox
                                        label="I agree to the above terms and conditions"
                                        v-model="terms_condition"
                                ></v-checkbox>
                            </v-flex>

                            <v-flex xs12>
                                <v-btn dark>Submit your file</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-form>
            </v-layout>
        </v-layout>
    </v-container>
</section>

