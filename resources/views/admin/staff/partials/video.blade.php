<div class="panel-body">
    <table class="table table-striped table-responsive table-bordered">
        <thead>
        <th>Name</th>
        <th>System Role</th>
        <th>Job Role</th>
        <th>Assigned Videos</th>
        @foreach($states as $key => $value)
            <th>{{ucwords($value)}}</th>
        @endforeach
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
                <td>{{ $user['workloadTotal']  }}</td>
                @foreach($states as $key => $value)
                    @if(array_key_exists($key, $user['workload']))
                        <td class="text-center"><a class="badge" href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $user['workload'][$key] }}</a></td>
                    @else
                        <td class="text-center"><span>-</span></td>
                    @endif
                @endforeach
            </tr>
        @endforeach
        </tbody>
    </table>
</div>