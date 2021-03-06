<ul id="main-menu" class="main-menu">
    <!-- add class "multiple-expanded" to allow multiple submenus to open -->
    <!-- class "auto-inherit-active-class" will automatically add "active" class for parent elements who are marked already with class "active" -->

    @if(Auth::user()->role != 'client')
        <li class="{{ Request::segment(2) == '' ? 'active' : '' }}">
            <a href="{{ url('admin') }}">
                <i class="fa fa-tachometer"></i>
                <span class="title">Dashboard</span>
            </a>
        </li>

        <li class="{{ Request::segment(3) == 'videos' ? 'active' : '' }}">
            <a href="{{ url('admin/licenses/videos') }}" class="tlink">
                <i class="fa fa-youtube-play"></i>
                <span class="title">Videos</span>
            </a>

            <ul>
                @if(Auth::user()->isAdmin())
                    <li>
                        <a href="{{ url('admin/licenses/videos?state=all&rights=ex') }}">
                            <span class="title">Ex Submissions</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ url('admin/licenses/videos?state=all&rights=exc') }}">
                            <span class="title">Ex Chaser</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ url('admin/videos/categories') }}">
                            <span class="title">Video Categories</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ url('admin/videos/collections') }}">
                            <span class="title">Video Collections</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ url('admin/videos/shottypes') }}">
                            <span class="title">Video Shot Types</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ url('admin/videos/ingest') }}">
                            <span class="title">CSV Upload</span>
                        </a>
                    </li>
                @endif
            </ul>
        </li>

        <li class="{{ Request::segment(3) == 'stories' ? 'active' : '' }}">
            <a href="{{ url('admin/licenses/stories') }}" class="tlink">
                <i class="fa fa-book"></i>
                <span class="title">Stories</span>
            </a>
        </li>
    @endif

    @if(Auth::user()->isAdmin())
        <li class="{{ Request::segment(2) == 'staff' ? 'active' : '' }}">
            <a href="{{ url('admin/staff?type=video') }}" class="tlink">
                <i class="fa fa-group"></i>
                <span class="title">Video Staff</span>
            </a>
            <ul>
                <li>
                    <a href="{{ url('admin/staff?type=story') }}">
                        <span class="title">Story Staff</span>
                    </a>
                </li>
            </ul>
        </li>
    @endif

    @if(Auth::user()->isAdmin())
        <li class="{{ Request::segment(2) == 'mailers' ? 'active' : '' }}">
            <a href="{{ url('admin/mailers') }}" class="tlink">
                <i class="fa fa-envelope-open"></i>
                <span class="title">Mailers</span>
            </a>
        </li>
    @endif

    @if(auth()->user()->isAdmin())
        <li class="{{ Request::segment(2) == 'contacts' ? 'active' : '' }}">
            <a href="{{ url('admin/contacts') }}" class="tlink">
                <i class="fa fa-address-book"></i>
                <span class="title">Contacts</span>
            </a>
        </li>
    @endif

    @if(Auth::user()->isAdmin())
        <li class="{{ Request::segment(2) == 'clients' ? 'active' : '' }}">
            <a href="{{ url('admin/clients') }}" class="tlink">
                <i class="fa fa-building"></i>
                <span class="title">Clients</span>
                <small style="position:relative; margin:-8px; padding:4px; border-radius: 20px" class="label label-danger">{{ \App\Client::where('active', 0)->count() > 0 ? \App\Client::where('active', 0)->count() : null }}</small>
            </a>
        </li>
    @endif

    @if(Auth::user()->isAdmin())
        <li class="{{ Request::segment(2) == 'users' ? 'active' : '' }}">
            <a href="{{ url('admin/users') }}" class="tlink">
                <i class="fa fa-user"></i>
                <span class="title">Users</span>
                <small style="position:relative; margin:-8px; padding:4px; border-radius: 20px" class="label label-danger">{{ \App\User::where('active', 0)->count() > 0 ? \App\User::where('active', 0)->count() : null }}</small>
            </a>
        </li>
    @endif

    <li class="{{ Request::segment(2) == 'quotes' ? 'active' : '' }}">
        <a href="{{ url('admin/quotes') }}" class="tlink">
            <i class="fa fa-exclamation"></i>
            <span class="title">Quotes</span>
            <small style="position:relative; margin:-2px; padding:4px; border-radius: 20px" class="label label-danger">{{ \App\Collection::getQuotesByStatus('requested')->count() > 0 ? \App\Collection::getQuotesByStatus('requested')->count() : null }}</small>
        </a>
        <ul>
            <li>
                <a href="{{ url('admin/collections') }}">Collections</a>
            </li>
        </ul>
    </li>

</ul>
