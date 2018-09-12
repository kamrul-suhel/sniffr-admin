<div class="panel-body">
    <table class="table table-striped table-responsive">
        <thead>
        <th>Name</th>
        <th>System Role</th>
        <th>Job Role</th>
        <th>Assigned Videos</th>
        <th>In Progress</th>
        <th>Non-Licensed</th>
        <th>Licensed</th>
        </thead>

        <tbody>
        @foreach($users as $user)
            <tr>
                <td>
                    <a target="_blank"
                       href="{{url('admin/users/'.$user->id.'/edit')}}">{{ (strlen($user->full_name) > 40) ? substr($user->full_name, 0, 40) . '...' : $user->full_name }}
                        ({{$user->email}})</a>
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
                <td>{{ ucwords(\App\UserRole::$videoJobRoles[$user->job_role] ?? 'Unset') }}</td>
                <td>{{ $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->count() }}</td>
                <td>
					<?php $inProgress = $user->assignedVideos->whereIn('state', ['new', 'accepted', 'inprogress', 'pending'])->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->groupBy('state'); ?>
                    <ul>
                        @foreach($inProgress as $key => $value)
                            <li>{{ ucwords($key) }} : {{ $value->count() }}</li>
                        @endforeach
                    </ul>

                </td>
                <td>
					<?php $nonLicensed = $user->assignedVideos->whereIn('state', ['rejected', 'restricted', 'problem', 'noresponse'])->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->groupBy('state'); ?>
                    <ul>
                        @foreach($nonLicensed as $key => $value)
                            <li>{{ ucwords($key) }} : {{ $value->count() }}</li>
                        @endforeach
                    </ul>
                </td>
                <td>
	                <?php $licensed = $user->assignedVideos->whereIn('state', ['licensed'])->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->groupBy('state'); ?>
                    <ul>
                        @foreach($licensed as $key => $value)
                            <li>{{ ucwords($key) }} : {{ $value->count() }}</li>
                        @endforeach
                    </ul>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>