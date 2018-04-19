<detail-form inline-template>
    <v-form v-model="valid" ref="detail_form" action="/details/<?php echo Request::segment(2); ?>">

        <?php if(empty($video->more_details)): ?>

        <v-container grid-list-lg>
            <v-layout row wrap>
                <?php if(!isset($video->id)): ?>
                    <v-flex xs12>
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">Sorry, we can't seem to find your video with the code you provided. Please contact <u>submissions@unilad.co.uk</u></div>
                        </div>
                    </v-flex>
                <?php elseif(!isset($video->more_details)): ?>
                <v-flex xs12>
                    <h1 class="heading text-xs-center">Your Video Details</h1>
                </v-flex>

                <v-flex xs12>
                    <div class="item-video text-xs-center">
                        {!!  App\Libraries\VideoHelper::getVideoHTML($video, true, 'edit') !!}
                    </div>
                </v-flex>

                <v-flex xs12>
                    <h3 class="sub-heading text-xs-center"><?php echo $video->title ?></h3>
                </v-flex>

                <v-flex xs12>
                    <h2 class="sub-heading text-xs-center">Your Contact Details</h2>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                            color="dark"
                            v-model="full_name"
                            value="{{$video->contact->full_name}}"
                            label="Name"
                            hint="Please type your full name">
                    </v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                            v-model="email"
                            label="Email"
                            color="dark"
                            value="{{$video->contact->email}}"
                            hint=""
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                            v-model="tel"
                            value="{{$video->contact->tel}}"
                            color="dark"
                            label="Phone Number:"></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <h2 class="sub-heading text-xs-center">Additional Details</h2>
                </v-flex>

                <v-flex xs12>
                    <v-dialog
                            color="dark"
                            ref="dialog"
                            persistent
                            v-model="date_picker_modal"
                            lazy
                            full-width
                            width="290px"
                            :return-value.sync="date_filmed">
                        <v-text-field
                                slot="activator"
                                v-model="date_filmed"
                                label="When was the video filmed?"
                                v-model="date_filmed"
                                prepend-icon="event"
                                value="{{old('date_filmed')}}"
                                readonly>
                        </v-text-field>

                        <v-date-picker
                                color="dark"
                                dark
                                v-model="date_filmed"
                                scrollable>
                            <v-spacer></v-spacer>

                            <v-btn flat color="dark" @click="date_picker_modal = false">Cancel</v-btn>

                            <v-btn flat color="dark" @click="$refs.dialog.save(date_filmed)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                            v-model="description"
                            label="Please provide us with any other information (what's the story behind your video?)"
                            value="{{old('description')}}"
                            color="dark"
                        multi-line
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-radio-group
                            label="Who filmed the video?"
                            v-model="filmed_by_me">
                        <v-layout row wrap>
                            <v-flex xs6 sm4 md4 lg4>
                                <v-radio
                                        color="dark"
                                        label="I filmed the video"
                                        value="yes"
                                ></v-radio>
                            </v-flex>

                            <v-flex xs6 sm4 md4 lg4 align-content-left>
                                <v-radio
                                        color="dark"
                                        label="Someone else filmed it"
                                        value="no"
                                ></v-radio>
                            </v-flex>
                        </v-layout>
                    </v-radio-group>
                </v-flex>

                <v-flex xs12>
                    <v-radio-group
                            v-model="permission"
                            label="Have you received permission to film/submit this video from those who are featured? (Especially in cases where there are minors/children in the video)">
                        <v-layout row wrap>
                            <v-flex xs6 sm4 md4 lg4>
                                <v-radio
                                        label="Yes"
                                        color="dark"
                                        value="yes"
                                ></v-radio>
                            </v-flex>

                            <v-flex xs6 sm4 md4 lg4 align-content-start>
                                <v-radio
                                        label="No"
                                        color="dark"
                                        value="no"
                                ></v-radio>
                            </v-flex>
                        </v-layout>
                    </v-radio-group>
                </v-flex>

                <v-flex xs12>
                    <v-radio-group
                        label="Have you submitted this video through any other online form?"
                        :rules="[v => !!v || 'Field is required']"
                        v-model="submitted_elsewhere"
                        required>
                        <v-layout row wrap>
                            <v-flex xs6 sm4 md4 lg4>
                                <v-radio
                                    label="Yes"
                                    color="dark"
                                    value="yes"
                                ></v-radio>
                            </v-flex>

                            <v-flex xs6 sm4 md4 lg4>
                                <v-radio
                                    label="No"
                                    color="dark"
                                    value="no"></v-radio>
                            </v-flex>
                        </v-layout>
                    </v-radio-group>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                        label="Where else have you submitted this video?"
                        v-model="submitted_where"
                        color="dark"
                        multi-line
                        value="{{old('submitted_where')}}">

                    </v-text-field>
                </v-flex>

                <v-flex xs12>
                    <h2 class="sub-heading text-xs-center">Important Legal Stuff</h2>
                </v-flex>

                <v-flex xs12>
                    <v-checkbox
                        color="dark"
                        label="{{$settings['terms_ex_contact_is_owner']}}"
                        v-model="contact_is_owner"
                        :rules="[v => !!v || 'You must agree to continue']"
                        :value="contact_is_owner"
                        required
                        ></v-checkbox>
                </v-flex>

                <v-flex xs12>
                    <v-checkbox
                        color="dark"
                        label="{{$settings['terms_ex_contact_is_owner']}}"
                        v-model="allow_publish"
                        :rules="[v => !!v || 'You must agree to continue']"
                        required></v-checkbox>
                </v-flex>

                <v-flex xs12>
                    <v-checkbox
                        color="dark"
                        label="{{$settings['terms_ex_is_exclusive']}}"
                        :rules="[v => !!v || 'You must agree to continue']"
                        v-model="is_exclusive"
                        required></v-checkbox>
                </v-flex>

                <v-flex xs12 class="text-xs-right">
                    <v-btn
                            dark
                            :loading="loading"
                            {{--@click.native="loader = 'loading'"--}}
                            @click="onSubmit()">
                        Update Details
                    </v-btn>
                </v-flex>

                <?php endif; ?>
            </v-layout>
        </v-container>

        <?php endif; ?>
    </v-form>
</detail-form>
