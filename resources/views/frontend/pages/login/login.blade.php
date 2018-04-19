@extends('frontend.master')
@section('content')
    <section id="video">
        <video>
        </video>
        <v-container grid-list-lg align-content-center justify-center class="heading">
            <div class="position-center">




                <!-- LOGIN SECTION -->
                <section class="login_section">
                    <h2 class="login_title">LOGIN</h2>

                    <v-form method="post" action="@if($settings['enable_https']) {{ secure_url('login') }} @else {{ route('login') }} @endif">
                        <v-flex xs12>
                          <v-text-field
                            label="Email"
                            v-model="user.email"
                            :rules="emailRules"
                            required
                            :error="validation.error">
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

                        <v-flex xs12>
                            @if (session()->has('note'))
                                <v-flex xs12 text-align-center>
                                    <p class="red--text">{{ session('note') }}</p>
                                </v-flex>
                            @endif
                        </v-flex>
                        <div class="form-submit">
                            <input type="hidden" id="redirect" name="redirect" value="" />
                            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                            <v-btn raised type="submit" dark>LOGIN</v-btn>
                        </div>
                        <div class="forgot-password">
                            <a href="{{route('password.remind')}}" class="">Forgot password</a>
                        </div>
                    </v-form>
                </section>
            </div>
        </v-container>
    </section>
@endsection
