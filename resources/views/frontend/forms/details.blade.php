<detail-form inline-template>
    <v-form v-model="valid" ref="form" action="/details/<?php echo Request::segment(2); ?>">

        <?php if(empty($video->more_details)): ?>

        <v-container grid-list-lg>
            <?php if (count($errors)): ?>
            <v-layout row wrap>
                <v-flex xs12>
                    <div class="alert alert-danger">
                        <p><strong>Please correct the errors below.</strong></p>
                        <ul>
                            <?php foreach ($errors->all() as $error){
                                echo '<li>'. $error .'</li>';
                            } ?>
                        </ul>
                    </div>
                </v-flex>
            </v-layout>
            <?php endif; ?>

            <v-layout row wrap>
                <?php if(!isset($video->id)): ?>
                <v-flex xs12>
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">Sorry, we can't seem to find your video with the code you provided. Please contact <u>submissions@unilad.co.uk</u></div>
                    </div>
                </v-flex>

                <?php elseif(!isset($video->more_details)): ?>

                <h2 class="sub-heading">Your Video Details</h2>

                <v-layout row wrap>
                    <v-flex xs12>
                        <div class="item-video">
                            <?php echo App\Libraries\VideoHelper::getVideoHTML($video, true, 'edit'); ?>
                        </div>
                        <h3><?php echo $video->title ?></h3>
                    </v-flex>
                </v-layout>

                <h2 class="sub-heading">Your Contact Details</h2>

                <v-flex xs12>
                    <v-text-field
                            color="dark"
                            name="full_name"
                            value="{{$video->contact->full_name}}"
                            label="Name"
                            hint="Please type your full name">
                    </v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                            name="email"
                            label="Email"
                            color="dark"
                            value="{{$video->contact->email}}"
                            hint=""
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                            name="tel"
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
                                name="date_filmed"
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
                            name="description"
                            v-model="description"
                            label="Please provide us with any other information (what's the story behind your video?)"
                            value="{{old('description')}}"
                            color="dark"
                        multi-line
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-radio-group
                            name="filmed_by_me"
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
                            name="permission"
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

                <div class="form-group form-radio">
                    <div class="label-control" id="submitted_elsewhere_label"><strong>Have you submitted this video through any other online form? <span>* </span></strong></div>
                    <label class="radio-inline">
                        <input type="radio" name="submitted_elsewhere" value="yes" <?php if(old('submitted_elsewhere')=='yes') { echo 'checked'; } ?>> Yes
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="submitted_elsewhere" value="no" <?php if(old('submitted_elsewhere')=='no') { echo 'checked'; } ?>> No
                    </label>
                    <div class="submitted_elsewhere-below error"></div>
                </div>

                <div class="form-group form-group" id="submitted_where_container">
                    <label for="submitted_where">Where else have you submitted this video?</label>
                    <input type="text" class="form-control" id="submitted_where" name="submitted_where" value="<?php old('submitted_where'); ?>">
                </div>

                <h2>Important Legal Stuff</h2>

                <div class="styled-checkbox">
                    <input id="contact_is_owner" name="contact_is_owner" type="checkbox" value="1">
                    <label class="form-check-label-left" for="contact_is_owner"></label>
                    <p class="terms-copy" data-attr="contact_is_owner"><?php echo $settings->terms_ex_contact_is_owner; ?> <span>* </span></p>
                </div>

                <div class="styled-checkbox">
                    <input id="allow_publish" name="allow_publish" type="checkbox" value="1">
                    <label class="form-check-label-left" for="allow_publish"></label>
                    <p class="terms-copy" data-attr="allow_publish"><?php echo $settings->terms_ex_allow_publish; ?> <span>* </span></p>
                </div>

                <div class="styled-checkbox">
                    <input id="is_exclusive" name="is_exclusive" type="checkbox" value="1">
                    <label class="form-check-label-left" for="is_exclusive"></label>
                    <p class="terms-copy" data-attr="is_exclusive"><?php echo $settings->terms_ex_is_exclusive; ?> <span>* </span></p>
                </div>

                <div class="form-group">
                    <input type="submit" value="Update Details" class="btn btn-primary">
                </div>
                <?php endif; ?>
            </v-layout>
        </v-container>

        <?php else: ?>

        <div class="container bg-404">
            <div class="area-404">
                <h1>Thanks for the extra info buddy!</h1>
                <img src="/content/themes/default/assets/img/hamster_thanks.png" class="hamster_thanks" border="0" />
                <div class="clear"></div>
            </div>
        </div>

        <?php endif; ?>
    </v-form>
</detail-form>
