@extends('admin.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-md-8">
                <h3>
                    <i class="fa fa-user-circle"></i>
                    Users
                    <a href="{{ (Auth::user()->role == 'client') ? route('client.users.create') : route('users.create') }}"
                       class="btn btn-success ">
                        <i class="fa fa-plus-circle"></i>
                        Add New
                    </a>
                </h3>
            </div>
            <div class="col-md-4">
                @if(Auth::user()->role != 'client')
                    <form method="get" role="form" class="search-form-full">
                        <div class="form-group">
                            <input type="text" class="form-control" name="s" id="search-input" value="{{ old('s') }}"
                                   placeholder="Search...">
                            <i class="fa fa-search"></i>
                        </div>
                    </form>
                @endif
            </div>
        </div>
    </div>
    <div class="clear"></div>

    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#tab_client">Clients</a></li>
        <li><a data-toggle="tab" href="#tab_staff">Staff</a></li>
    </ul>

    <div class="tab-content">
        <div id="tab_client" class="tab-pane fade in active">
            <div class="panel-body">
                <h4>Unmoderated Users</h4>
                <p>Users must be set to <b>Active</b> so they can purchase assets from the marketplace</p>
                <div class="panel panel-danger">
                    <table class="table table-responsive table-striped panel-danger">
                    <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>System Role</th>
                    <th>Active</th>

                    @if(Auth::user()->isAdmin())
                        <th>Actions</th>
                    @endif
                    </thead>

                    <tbody>
                    @foreach($unmoderatedUsers as $user)
                        <tr>
                            <td>
                                {{ (strlen($user->full_name) > 40) ? substr($user->full_name, 0, 40) . '...' : $user->full_name }}
                            </td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->client->name ?? 'N/A' }}</td>
                            <td>
                                @if($user->role == 'client' || $user->role == 'client_admin')
                                    <div class="label label-success"><i class="fa fa-users"></i>
                                        Client
                                    </div>
                                @elseif($user->role == 'client_owner')
                                    <div class="label label-success"><i class="fa fa-users"></i>
                                        Owner
                                    </div>
                                @elseif($user->role == 'manager')
                                    <div class="label label-info"><i class="fa fa-envelope"></i>
                                        Manager
                                    </div>
                                @elseif($user->role == 'editorial')
                                    <div class="label label-info"><i class="fa fa-pencil"></i>
                                        Editorial
                                    </div>
                                @elseif($user->role == 'admin')
                                    <div class="label label-primary"><i class="fa fa-star"></i>
                                        Admin
                                    </div>
                                @endif
                            </td>
                            <td>
                                @if($user->active)
                                    Yes
                                @else
                                    <div class="label label-danger"><i class="fa fa-exclamation"></i>
                                        Moderation
                                    </div>
                                @endif
                            </td>

                            @if(Auth::user()->isAdmin())
                                <td>
                                    <a href="{{ route('users.edit', ['id' => $user->id]) }}"
                                       class="btn btn-xs btn-info">
                                        <span class="fa fa-edit"></span>
                                        @if($user->active)
                                            Edit
                                        @else
                                            Moderate
                                        @endif
                                    </a>
                                    @if($user->client_id)
                                        <a href="{{ route('users.stories.sent', ['id' => $user->id]) }}"
                                           class="btn btn-xs btn-warning">
                                            <span class="fa fa-edit"></span>
                                            Stories Sent
                                        </a>
                                    @endif
                                </td>
                            @endif
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                </div>

                <br>

                <h4>Active Users</h4>
                <table class="table table-responsive table-striped">
                    <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Active</th>

                    @if(Auth::user()->isAdmin())
                        <th>Actions</th>
                    @endif
                    </thead>

                    <tbody>
                    @foreach($users as $user)
                        <tr>
                            <td>
                                {{ (strlen($user->full_name) > 40) ? substr($user->full_name, 0, 40) . '...' : $user->full_name }}
                            </td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->client->name ?? 'N/A' }}</td>
                            <td>
                                @if($user->role == 'client' || $user->role == 'client_admin')
                                    <div class="label label-success"><i class="fa fa-users"></i>
                                        Client
                                    </div>
                                @elseif($user->role == 'client_owner')
                                    <div class="label label-success"><i class="fa fa-users"></i>
                                        Owner
                                    </div>
                                @elseif($user->role == 'manager')
                                    <div class="label label-info"><i class="fa fa-envelope"></i>
                                        Manager
                                    </div>
                                @elseif($user->role == 'editorial')
                                    <div class="label label-info"><i class="fa fa-pencil"></i>
                                        Editorial
                                    </div>
                                @elseif($user->role == 'admin')
                                    <div class="label label-primary"><i class="fa fa-star"></i>
                                        Admin
                                    </div>
                                @endif
                            </td>
                            <td>
                                @if($user->active)
                                    Yes
                                @else
                                    <div class="label label-danger"><i class="fa fa-exclamation"></i>
                                        Moderation
                                    </div>
                                @endif
                            </td>

                            @if(Auth::user()->isAdmin())
                                <td>
                                    <a href="{{ route('users.edit', ['id' => $user->id]) }}"
                                       class="btn btn-xs btn-info">
                                        <span class="fa fa-edit"></span>
                                        @if($user->active)
                                            Edit
                                        @else
                                            Moderate
                                        @endif
                                    </a>
                                    @if($user->client_id)
                                        <a href="{{ route('users.stories.sent', ['id' => $user->id]) }}"
                                           class="btn btn-xs btn-warning">
                                            <span class="fa fa-edit"></span>
                                            Stories Sent
                                        </a>
                                    @endif
                                </td>
                            @endif
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <div id="tab_staff" class="tab-pane">
            <div class="panel-body">
                <table class="table table-striped table-responsive">
                    <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Active</th>

                    @if(Auth::user()->isAdmin())
                        <th>Actions</th>
                    @endif
                    </thead>

                    <tbody>
                    @foreach($clients as $user)
                        <tr>
                            <td>
                                {{ (strlen($user->full_name) > 40) ? substr($user->full_name, 0, 40) . '...' : $user->full_name }}
                            </td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->client->name ?? 'N/A' }}</td>
                            <td>
                                @if($user->role == 'client' || $user->role == 'client_admin')
                                    <div class="label label-success"><i class="fa fa-users"></i>
                                        Client
                                    </div>
                                @elseif($user->role == 'client_owner')
                                    <div class="label label-success"><i class="fa fa-users"></i>
                                        Owner
                                    </div>
                                @elseif($user->role == 'manager')
                                    <div class="label label-info"><i class="fa fa-envelope"></i>
                                        Manager
                                    </div>
                                @elseif($user->role == 'editorial')
                                    <div class="label label-info"><i class="fa fa-pencil"></i>
                                        Editorial
                                    </div>
                                @elseif($user->role == 'admin')
                                    <div class="label label-primary"><i class="fa fa-star"></i>
                                        Admin
                                    </div>
                                @endif
                            </td>
                            <td>
                                @if($user->active)
                                    Yes
                                @else
                                    <div class="label label-danger"><i class="fa fa-exclamation"></i>
                                        Moderation
                                    </div>
                                @endif
                            </td>

                            @if(Auth::user()->isAdmin())
                                <td>
                                    <a href="{{ route('users.edit', ['id' => $user->id]) }}"
                                       class="btn btn-xs btn-info">
                                        <span class="fa fa-edit"></span>
                                        @if($user->active)
                                            Edit
                                        @else
                                            Moderate
                                        @endif
                                    </a>
                                    @if($user->client_id)
                                        <a href="{{ route('users.stories.sent', ['id' => $user->id]) }}"
                                           class="btn btn-xs btn-warning">
                                            <span class="fa fa-edit"></span>
                                            Stories Sent
                                        </a>
                                    @endif
                                </td>
                            @endif
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@stop

@section('javascript')
    <script>
        $ = jQuery;
        $(document).ready(function () {
            $('.delete').click(function (e) {
                e.preventDefault();
                if (confirm("Are you sure you want to delete this user?")) {
                    window.location = $(this).attr('href');
                }
                return false;
            });
        });
    </script>
@stop
