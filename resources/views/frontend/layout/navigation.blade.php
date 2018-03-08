<section id="nav" class="section_space @if(!Request::is('/')) nav_background @endif">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                <div class="logo">
                    <a href="{!! url('/') !!}"><img src="{{asset('assets/frontend/assets/images/logo-sniffr-white.png')}}"/></a>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg8">
                <nav class="navigation">
                    <ul>
                        <li><a href="{!! url('/upload') !!}"><i class="fas fa-upload"></i> Upload</a></li>
                        <li><a href="{{ route('videos') }}"><i class="fas fa-video"></i> Videos</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#loginModal"><i class="fas fa-lock-alt"></i> Login</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</section>