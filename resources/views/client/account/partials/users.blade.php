@if($company_users)
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">User(s)</div>
                    <div class="panel-title">
                        <span class="pull-right">
                            <a href="{{ route('clients.users.create', ['slug' => $company->slug]) }}"><i class="fa fa-user"></i><i class="fa fa-plus"></i></a>
                        </span>
                    </div>
                </div>
                <div class="panel-body">
                    <table class="table table-responsive table-striped">
                        <thead>
                        <th width="60%">Name</th>
                        <th>Tel</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th colspan="2"></th>
                        </thead>
                        <tbody>
                        @foreach($company_users as $company_user)
                            <tr>
                                <td>
                                    <a href="{{ url('client/profile/'.$company->slug.'/users/'.$company_user->id.'/edit') }}">{{ $company_user->full_name ?? $company_user->email }}</a>
                                </td>
                                <td>{{ $company_user->tel ?? 'Not Set' }}</td>
                                <td>{{ ucwords(str_replace('_', ' ', $company_user->role)) }}</td>
                                <td>{{ $company_user->active == 1 ? 'Active' : 'Deactivated' }}</td>
                                <td></td>
                                <td>
                                    <a href="{{ url('client/profile/'.$company->slug.'/users/'.$company_user->id.'/edit') }}"
                                       class="btn-sm btn-primary pull-right" style=""><i class="fa fa-edit"></i></a>
                                </td>
                                {{--<td>--}}
                                {{--@if(isset($user->id))--}}
                                {{--{!! Form::open(['method' => 'DELETE', 'route' => [ 'clients.users.destroy', $company->slug, $user->id] ] ) !!}--}}
                                {{--<a href="" class="btn-sm btn-danger pull-right"><i class="fa fa-trash-o"></i></a>--}}
                                {{--{!! Form::close() !!}--}}
                                {{--@endif--}}
                                {{--</td>--}}
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endif