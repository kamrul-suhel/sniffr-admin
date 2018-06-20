@extends('client.master')

@section('content')

    <div id="container">
        <div class="section-title">
            @if($user)
                <h1>
                    <i class="fa fa-users"></i> {{ $user->username ?? 'New User' }}
                </h1>
            @else
                <h3><i class="fa fa-users"></i> Add New User</h3>
            @endif
        </div>

        @include('admin.users.partials.errors')

        <div class="clear"></div>
        <?php
        $update_path = 'clients.users.update';
        $store_path = 'clients.users.store';
        ?>

        <form method="POST" action="{{ ($user) ? route($update_path, ['slug' => $slug, 'user' => $user->id]) : route($store_path, ['slug' => $slug]) }}" id="update_profile_form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
            {{ method_field($user ? 'PATCH' : 'POST') }}
            <div id="user-badge">
                <img src="{{ Config::get('site.uploads_url') }}{{ ($user && $user->avatar) ? $user->avatar : 'default.jpg' }}"/>
                <label for="avatar">{{ ($user) ? ucfirst($user->username) . '\'s' : '' }} Profile Image</label>
                <input type="file" multiple="true" class="form-control" name="avatar" id="avatar"/>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">
                                User's Details
                            </div>
                        </div>

                        <div class="panel-body" style="display: block;">
                            @if($errors->first('username'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    {{ $errors->first('username') }}
                                </div>
                            @endif

                            <label for="username">Username</label>
                            <input type="text" class="form-control" name="username" id="username" autocomplete="off"
                                   value="{{ ($user) ? $user->username : old('username')	}}"/>

                            <br>

                            @if($errors->first('first_name'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    {{ $errors->first('first_name') }}
                                </div>
                            @endif

                            <label for="first_name">First Name</label>
                            <input type="text" class="form-control" name="first_name" id="first_name" autocomplete="off"
                                   value="{{ ($user) ? $user->first_name : old('first_name')	}}"/>

                            <br>

                            @if($errors->first('last_name'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    {{ $errors->first('last_name') }}
                                </div>
                            @endif
                            <label for="last_name">Last Name</label>
                            <input type="text" class="form-control" name="last_name" id="last_name" autocomplete="off"
                                   value="{{($user) ? $user->last_name : old('last_name') }}"/>

                            <br>

                            @if($errors->first('job_title'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    {{ $errors->first('job_title') }}
                                </div>
                            @endif
                            <label>User's Job Title</label>
                            <input type="text" class="form-control" name="job_title" id="job_title" autocomplete="off"
                                   value="{{($user) ? $user->job_title : old('job_title')}}"/>

                            <br>

                            @if($errors->first('email'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    {{ $errors->first('email') }}
                                </div>
                            @endif

                            <label>User's Email Address</label>
                            <input type="text" class="form-control" name="email" id="email" autocomplete="off"
                                   value="{{ ($user) ? $user->email : old('email') }}" readonly
                                   onfocus="this.removeAttribute('readonly');"/>

                            <br>

                            @if($errors->first('tel'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    {{ $errors->first('tel') }}
                                </div>
                            @endif
                            <label>User's Phone Number</label>
                            <input type="text" class="form-control" name="tel" id="tel" autocomplete="off"
                                   value="{{($user) ? $user->tel : old('tel') }}"/>


                            <br>

                            @if($errors->first('password'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    {{ $errors->first('password') }}
                                </div>
                            @endif

                            <label>{{ ($user) ? '(leave empty to keep your original password)' : 'Enter users password:' }}</label>
                            <input type="password" class="form-control" name="password" id="password"
                                   autocomplete="off"
                                   value=""
                                   readonly onfocus="this.removeAttribute('readonly');" title="password"/>

                            <br>

                            <label>Select the user's role below</label>
                            <select id="role" class="form-control" name="role">
                                <option value="client"{{ ((($user) && ($user->role == 'client')) || (old('role') == 'client')) ? ' selected' : '' }}>
                                    Client
                                </option>
                                <option value="client_admin"{{ ((($user) && ($user->role == 'client_admin')) || (old('role') == 'client_admin')) ? ' selected' : '' }}>
                                    Client Admin
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            @if($user)
                <input type="hidden" id="id" name="id" value="{{ $user->id }}"/>
            @endif

            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ ($user) ? method_field('PUT') : method_field('POST') }}
            <input type="submit" value="{{ ($user) ? 'Update' : 'Create' }} User" class="btn btn-success pull-right"/>

            <label>Active</label>
            <input type="checkbox" id="active" name="active" {{ ((($user) && ($user->active)) || (!$user)) ? 'checked="checked" value=1' : '' }} />

        </form>


    </div>


@endsection

@section('javascript')

@endsection
