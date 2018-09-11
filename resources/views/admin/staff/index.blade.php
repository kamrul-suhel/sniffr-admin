@extends('admin.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-xs-12">
                <h3>
                    <i class="fa fa-users"></i>
                    Staff Management
                </h3>
            </div>
        </div>
    </div>
    <div class="clear"></div>

    <div id="tab_staff" class="tab-pane">
        <div class="panel-body">
            <table class="table table-striped table-responsive">
                <thead>
                <th>Name</th>
                <th>Role</th>
                <th>Assigned Videos</th>
                <th>Assigned Story</th>
                </thead>

                <tbody>
                @foreach($users as $user)
                    <tr>
                        <td>
                            {{ (strlen($user->full_name) > 40) ? substr($user->full_name, 0, 40) . '...' : $user->full_name }}
                        </td>
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
                        <td>{{ $user->assignedVideos->count() }}</td>
                        <td>{{ $user->assignedStories->count() }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
