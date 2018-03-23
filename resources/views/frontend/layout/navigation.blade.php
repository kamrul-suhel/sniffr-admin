<section id="nav" class="section_space @if(!Request::is('/')) nav_background @endif">

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
                            <li class="dropdown">
                                <a href="#_" class="user-link-desktop dropdown-toggle" data-toggle="dropdown"><img src="<?= Config::get('site.uploads_dir') . 'avatars/' . Auth::user()->avatar ?>" class="img-circle" /> <?= ucwords(Auth::user()->username) ?> <i class="fa fa-chevron-down"></i></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="<?= url('user') ?><?= '/' . Auth::user()->username; ?>">My Profile</a></li>
                                    <?php if(Auth::user()->role == 'client' && Auth::user()->username == 'dailymail'): ?>
                                    <li><a href="<?= url('client/dashboard') ?>">Dailies</a></li>
                                    <?php endif; ?>
                                    <?php if(Auth::user()->role == 'admin' || Auth::user()->role == 'manager'): ?>
                                    <li class="divider"></li>
                                    <li><a href="<?= url('admin') ?>"> Admin</a></li>
                                    <?php endif; ?>
                                    <li class="divider"></li>
                                    <li><a href="<?= url('logout') ?>" id="user_logout_mobile"><i class="fa fa-power-off"></i> Logout</a></li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </nav>
            </v-flex>
        </v-layout>
    </v-container>

</section>