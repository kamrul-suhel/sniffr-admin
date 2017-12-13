<ul id="main-menu" class="main-menu">
    <!-- add class "multiple-expanded" to allow multiple submenus to open -->
    <!-- class "auto-inherit-active-class" will automatically add "active" class for parent elements who are marked already with class "active" -->
    <li class="{{ Request::segment(2) == '' ? 'active' : '' }}">
        <a href="{{ URL::to('admin') }}">
            <i class="entypo-gauge"></i>
            <span class="title">Dashboard</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'videos' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/videos') }}" class="tlink">
            <i class="entypo-video"></i>
            <span class="title">Videos</span>
        </a>
        <ul>
            <li>
                <a href="{{ URL::to('admin/videos/new') }}">
                    <span class="title">New Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ URL::to('admin/videos/accepted') }}">
                    <span class="title">Accepted Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ URL::to('admin/videos/pending') }}">
                    <span class="title">Pending Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ URL::to('admin/videos/rejected') }}">
                    <span class="title">Rejected Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ URL::to('admin/videos/problem') }}">
                    <span class="title">Problem Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ URL::to('admin/videos/licensed') }}">
                    <span class="title">Licensed Videos</span>
                </a>
            </li>
            <li>
                <a href="{{ URL::to('admin/videos/restricted') }}">
                    <span class="title">Restricted Videos</span>
                </a>
            </li>
            @if(Auth::user()->isAdmin())
            <li>
                <a href="{{ URL::to('admin/videos/deleted') }}">
                    <span class="title">Deleted Videos</span>
                </a>
            </li>
            @endif
            <li>
                <a href="{{ URL::to('admin/videos/categories') }}">
                    <span class="title">Video Categories</span>
                </a>
            </li>
        </ul>
    </li>

    <li class="{{ Request::segment(2) == 'pages' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/pages') }}" class="tlink">
            <i class="entypo-book-open"></i>
            <span class="title">Pages</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'posts' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/posts') }}" class="tlink">
            <i class="entypo-newspaper"></i>
            <span class="title">Posts</span>
        </a>
        <ul>
            <li>
                <a href="{{ URL::to('admin/posts/categories') }}">
                    <span class="title">Post Categories</span>
                </a>
            </li>
        </ul>
    </li>

    <li class="{{ Request::segment(2) == 'media' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/media') }}">
            <i class="entypo-picture"></i>
            <span class="title">Media</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'menu' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/menu') }}">
            <i class="entypo-list"></i>
            <span class="title">Menu</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'contacts' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/contacts') }}" class="tlink">
            <i class="entypo-user-add"></i>
            <span class="title">Contacts</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'clients' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/clients') }}" class="tlink">
            <i class="entypo-user"></i>
            <span class="title">Clients</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'campaigns' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/campaigns') }}" class="tlink">
            <i class="entypo-list"></i>
            <span class="title">Campaigns</span>
        </a>
    </li>
    <!-- <li>
        <a href="{{ URL::to('admin/themes') }}">
            <i class="entypo-monitor"></i>
            <span class="title">Themes</span>
        </a>
    </li> -->
    <!-- <li>
        <a href="{{ URL::to('admin/plugins') }}">
            <i class="fa fa-plug"></i>
            <span class="title">Plugins</span>
        </a>
        <ul>
            <li>
                <a href="{{ URL::to('admin/plugins') }}">All Plugins</a>
            </li>
        </ul>
    </li> -->

    <li class="{{ Request::segment(2) == 'users' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/users') }}" class="tlink">
            <i class="entypo-users"></i>
            <span class="title">Users</span>
        </a>
    </li>

    <li class="{{ Request::segment(2) == 'settings' ? 'active' : '' }}">
        <a href="{{ URL::to('admin/settings') }}" class="tlink">
            <i class="entypo-cog"></i>
            <span class="title">Settings</span>
        </a>
        <ul>
            <li>
                <a href="{{ URL::to('admin/settings') }}">
                    <span class="title">Site Settings</span>
                </a>
            </li>
            <!--<li>
                <a href="{{ URL::to('admin/payment_settings') }}">
                    <span class="title">Payment Settings</span>
                </a>
            </li>-->
            <li>
                <a href="{{ URL::to('admin/theme_settings') }}">
                    <span class="title">Theme Settings</span>
                </a>
            </li>
        </ul>
    </li>
</ul>