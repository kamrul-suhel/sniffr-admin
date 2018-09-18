<div class="panel-body">
    <table class="table table-striped table-responsive table-bordered">
        <thead>
        <th>Name</th>
        <th>System Role</th>
        <th>Job Role</th>
        <th>Assigned Stories</th>
        <th>Content Sourced</th>
        <th>Licensing</th>
        <th>Writing</th>
        <th>Subbing</th>
        <th>Ready To Publish</th>
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
                <td>{{ ucwords(\App\UserRole::$storyJobRoles[$user->job_role] ?? 'Unset') }}</td>
                <td>{{ $user->assignedStories->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->count() }}</td>
                <td>
	                <?php $contentSourced = $user->assignedStories->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['unapproved', 'approved', 'rejected'])->groupBy('state'); ?>
                    <ul>
                        @foreach($contentSourced as $key => $value)
                            <li><a href="{{ url('admin/licenses/stories?assignee='.$user->id.'&state=content-sourced--'.$key)  }}">{{ ucwords($key) }}&nbsp;:&nbsp;{{ $value->count() }}</a></li>
                        @endforeach
                    </ul>
                </td>

                <td>
		            <?php $licensing = $user->assignedStories->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['approved', 'licensing', 'purgatory'])->groupBy('state'); ?>
                    <ul>
                        @foreach($licensing as $key => $value)
                            <li><a href="{{ url('admin/licenses/stories?assignee='.$user->id.'&state=licensing--'.$key)  }}">{{ ucwords($key) }}&nbsp;:&nbsp;{{ $value->count() }}</a></li>
                        @endforeach
                    </ul>
                </td>

                <td>
		            <?php $writing = $user->assignedStories->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['licensed', 'writing-inprogress', 'subs-rejected'])->groupBy('state'); ?>
                    <ul>
                        @foreach($writing as $key => $value)
                            <li><a href="{{ url('admin/licenses/stories?assignee='.$user->id.'&state=writing--'.$key)  }}">{{ ucwords($key) }}&nbsp;:&nbsp;{{ $value->count() }}</a></li>
                        @endforeach
                    </ul>
                </td>

                <td>
		            <?php $subbing = $user->assignedStories->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['writing-completed', 'subs-inprogress', 'subs-unassigned'])->groupBy('state'); ?>
                    <ul>
                        @foreach($subbing as $key => $value)
                            <li><a href="{{ url('admin/licenses/stories?assignee='.$user->id.'&state=subbing--'.$key)  }}">{{ ucwords($key) }}&nbsp;:&nbsp;{{ $value->count() }}</a></li>
                        @endforeach
                    </ul>
                </td>

                <td>
		            <?php $readyToPublish = $user->assignedStories->where('updated_at', '>=', $from)->where('updated_at', '<=', $to)->whereIn('state', ['subs-approved', 'published', 'archive'])->groupBy('state'); ?>
                    <ul>
                        @foreach($readyToPublish as $key => $value)
                            <li><a href="{{ url('admin/licenses/stories?assignee='.$user->id.'&state=ready-to-publish--'.$key)  }}">{{ ucwords($key) }}&nbsp;:&nbsp;{{ $value->count() }}</a></li>
                        @endforeach
                    </ul>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>