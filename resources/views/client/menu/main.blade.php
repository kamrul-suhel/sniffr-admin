<ul id="main-menu" class="main-menu">
    <!-- add class "multiple-expanded" to allow multiple submenus to open -->
    <!-- class "auto-inherit-active-class" will automatically add "active" class for parent elements who are marked already with class "active" -->
    <li class="{{ Request::segment(2) == '' ? 'active' : '' }}">
        <a href="{{ url('client') }}">
            <i class="fa fa-youtube-play"></i>
            <span class="title">Videos</span>
        </a>
    </li>

    @if($user->username == 'dailymail')
    <li class="{{ Request::segment(2) == 'dashboard' ? 'active' : '' }}">
        <a href="{{ url('client/dashboard') }}">
            <i class="fa fa-tachometer"></i>
            <span class="title">Dashboard</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'dailies' ? 'active' : '' }}">
        <a href="{{ url('client/dailies') }}" class="tlink">
            <i class="fa fa-folder"></i>
            <span class="title">Daily Videos</span>
        </a>
        <ul>
            <li>
                <a href="{{ url('client/dailies/new') }}">
                    <span class="title">New Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ url('client/dailies/yes') }}">
                    <span class="title">Chosen Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ url('client/dailies/maybe') }}">
                    <span class="title">Maybe Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ url('client/dailies/no') }}">
                    <span class="title">Rejected Videos</span>
                </a>
            </li>
        </ul>
    </li>
    @endif
</ul>
