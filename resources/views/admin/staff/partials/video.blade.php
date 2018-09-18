<div class="panel-body">
    <table class="table table-striped table-responsive table-bordered">
        <thead>
        <th>Name</th>
        <th>System Role</th>
        <th>Job Role</th>
        <th>Assigned Videos</th>
        <th>New</th>
        <th>Accepted</th>
        <th>Rejected</th>
        <th>In Progress</th>
        <th>Pending</th>
        <th>Licensed</th>
        <th>Restricted</th>
        <th>Problem</th>
        <th>No Response</th>
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
		            <?php $new = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['new'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($new as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $accepted = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['accepted'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($accepted as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $rejected = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['rejected'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($rejected as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $inprogress = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['inprogress'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($inprogress as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $pending = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['pending'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($pending as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $licensed = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['licensed'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($licensed as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $restricted = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['restricted'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($restricted as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $problem = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['problem'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($problem as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>

                <td>
		            <?php $noresponse = $user->assignedVideos->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['noresponse'])->where('rights', $rights)->groupBy('state'); ?>
                    @foreach($noresponse as $key => $value)
                        <a href="{{ url('admin/licenses/videos?assignee='.$user->id.'&state='.$key)  }}">{{ $value->count() }}</a>
                    @endforeach
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>