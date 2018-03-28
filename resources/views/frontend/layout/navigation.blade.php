<section id="nav" class="section-space @if(!Request::is('/')) nav-background @endif">
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg4>
                <div class="logo">
                    <a href="{!! url('/') !!}"><img src="{{asset('assets/frontend/images/logo-sniffr-white.png')}}"/></a>
                </div>
            </v-flex>
            <v-flex xs12 sm6 md8 lg8>
                <nav class="navigation">
                    <ul>
                        <li><a href="{!! url('/upload') !!}"><i class="fas fa-upload"></i> Upload</a></li>
                        <li><a href="{{ route('videos') }}"><i class="fas fa-video"></i> Videos</a></li>

                        @if(Auth::guest())
                            <li>
                                <a href="#" @click.stop.prevent="login_dialog = true">
                                    <i class="fas fa-lock-alt"></i> Login
                                </a>
                            </li>
                        @else
                            <li>
                                <v-menu open-on-hover offset-y>
                                    <v-btn color="white" outline slot="activator">
                                        <v-icon left>keyboard_arrow_down</v-icon>{{Auth::user()->username}}
                                    </v-btn>
                                    <v-list>
                                        <v-list-tile-title><a href="<?= url('user') ?><?= '/' . Auth::user()->username; ?>">My Profile</a></v-list-tile-title>
                                        <v-list-tile-title><a href="<?= url('client/dashboard') ?>">Dailies</a></v-list-tile-title>
                                        <v-list-title-title><a href="<?= url('logout') ?>" id="user-logout-mobile"><i class="fa fa-power-off"></i> Logout</a></v-list-title-title>
                                    </v-list>
                                </v-menu>
                            </li>


                        @endif
                    </ul>
                </nav>
            </v-flex>
        </v-layout>
    </v-container>
</section>