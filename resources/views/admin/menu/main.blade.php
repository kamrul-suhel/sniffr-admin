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

        <li class="{{ Request::segment(2) == 'videos' ? 'active' : '' }}">
            <a href="{{ url('admin/videos') }}" class="tlink">
                <i class="fa fa-youtube-play"></i>
                <span class="title">Videos</span>
                <!-- <div class="mobile-menu">Videos</div> -->
            </a>
            <ul>
                <li>
                    <a href="{{ url('admin/videos/new') }}">
                        <span class="title">New Videos</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('admin/videos/accepted') }}">
                        <span class="title">Accepted Videos</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('admin/videos/pending') }}">
                        <span class="title">Pending Videos</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('admin/videos/rejected') }}">
                        <span class="title">Rejected Videos</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('admin/videos/problem') }}">
                        <span class="title">Problem Videos</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('admin/videos/licensed') }}">
                        <span class="title">Licensed Videos</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('admin/videos/restricted') }}">
                        <span class="title">Restricted Videos</span>
                    </a>
                </li>
                @if(Auth::user()->isAdmin())
                    <li>
                        <a href="{{ url('admin/videos/deleted') }}">
                            <span class="title">Deleted Videos</span>
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
    @endif

    @if(Auth::user()->isAdmin())
        <li class="{{ Request::segment(2) == 'mailers' ? 'active' : '' }}">
            <a href="{{ url('admin/stories') }}" class="tlink">
                <i class="fa fa-tasks"></i>
                <span class="title">Stories</span>
            </a>
            <ul>
                <li>
                    <a href="{{ url('admin/mailers') }}">
                        <span class="title">Mailers</span>
                    </a>
                </li>
                <!-- li>
                    <a href="{{ url('admin/mailers') }}">
                        <span class="title">Edit Client Mailers</span>
                    </a>
                </li -->
                <!-- <li>
                    <a href="{{ url('admin/stories/trello') }}">
                        <span class="title">Stories Board</span>
                    </a>
                </li> -->
            </ul>
        </li>

        <li class="{{ Request::segment(2) == 'media' ? 'active' : '' }}">
        <a href="{{ url('admin/media') }}">
            <i class="fa fa-picture-o"></i>
            <span class="title">Media</span>
        </a>
    </li>
    @endif

    @if(Auth::user()->role != 'client')
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
                <i class="fa fa-users"></i>
                <span class="title">Clients</span>
            </a>
        </li>
    @endif

    @if(Auth::user()->isAdmin())
        <li class="{{ Request::segment(2) == 'users' ? 'active' : '' }}">
        <a href="{{ url('admin/users') }}" class="tlink">
            <i class="fa fa-user-circle"></i>
            <span class="title">Users</span>
        </a>
    </li>
    @endif

    @if((Auth::user()->role == 'client') && (Auth::user()->id == Auth::user()->client()->account_owner_id))
        <li class="{{ Request::segment(2) == 'users' ? 'active' : '' }}">
            <a href="{{ url('client/users') }}" class="tlink">
                <i class="fa fa-user-circle"></i>
                <span class="title">Users</span>
            </a>
        </li>
    @endif

    <li class="{{ Request::segment(2) == 'quotes' ? 'active' : '' }}">
        <a href="{{ url('admin/quotes') }}" class="tlink">
            <i class="fa fa-exclamation"></i><small class="badge">12</small>
            <span class="title">Quotes</span>
        </a>
    </li>

</ul>
