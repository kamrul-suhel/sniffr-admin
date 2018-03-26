<v-dialog v-model="login_dialog" max-width="500px" class="login_section">
    <v-card>
      <v-card-text class="login_section">
          <v-form method="post" v-model="valid" ref="login_form"
                action="@if($settings->enable_https) {{ secure_url('login') }}
                @else {{ route('login') }}@endif">
                <v-layout row wrap id="login_section">

                    <v-flex xs12>
                        <h2 class="login_title">LOGIN</h2>
                    </v-flex>

                    <v-flex xs12>
                          <v-text-field
                                  color="dark"
                                  label="Full Name:"
                                  v-model="user.email"
                                  :rules="emailRules"
                                  required
                                  :error="validation.error"
                          >
                          </v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field
                              name="password"
                              label="Enter your password"
                              v-model="user.password"
                              :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                              :append-icon-cb="() => (showpassword = !showpassword)"
                              :type="showpassword ? 'password' : 'text'"
                              :rules="passwordRules"
                              :error="validation.error"
                              required
                      ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout row justify-center>
                  <v-flex>
                    <div v-if="validation.error" class="red--text text-xs-center">@{{validation.message}}</div>
                  </v-flex>
                </v-layout>

                <v-layout row justify-center>
                    <v-flex xs3>
                        <div class="login-button">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                            <v-btn raised dark @click="onSubmit()">
                                LOGIN
                            </v-btn>
                            <div class="login-progress">
                                <v-progress-circular v-if="login_progress" indeterminate color="dark"></v-progress-circular>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>

                <v-layout row justify-center>
                    <v-flex xs3>
                        <a href="{{route('password.remind')}}" class="forgot_password">Forgot password</a>
                    </v-flex>
                </v-layout>
          </v-form>
      </v-card-text>
    </v-card>
</v-dialog>