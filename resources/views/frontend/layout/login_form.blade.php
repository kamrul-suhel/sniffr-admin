<v-dialog v-model="login_dialog" max-width="500px" class="login_section">
    <v-card>
      <v-card-text class="login_section">
          <form method="post"
                action="@if($settings->enable_https) {{ secure_url('login') }}
                @else {{ route('login') }}@endif">
                <v-layout row wrap id="login_section">

                    <v-flex xs12>
                        <h2 class="login_title">LOGIN</h2>
                    </v-flex>

                    <v-flex xs12>
                          <v-text-field
                                  color="primary"
                                  label="Full Name:"
                                  v-model="user.email">
                          </v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field
                              name="password"
                              label="Enter your password"
                              hint="At least 8 characters"
                              v-model="user.password"
                              :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                              :append-icon-cb="() => (showpassword = !showpassword)"
                              :type="showpassword ? 'password' : 'text'"
                              counter
                      ></v-text-field>
                    </v-flex>
                </v-layout>

                  <v-layout row justify-center>
                      <v-flex xs3>
                          <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                          <v-btn raised dark type="submit">
                              LOGIN
                          </v-btn>
                      </v-flex>
                  </v-layout>

                  <v-layout row justify-center>
                      <v-flex xs3>
                          <a href="{{route('password.remind')}}" class="forgot_password">Forgot password</a>
                      </v-flex>
                  </v-layout>
          </form>
      </v-card-text>
    </v-card>
</v-dialog>