@extends('admin.master')

@section('content')
    <div id="admin-container">
        <ol class="breadcrumb">
            <li>
                <a href="/">
                    <i class="fa fa-home"></i>
                    Home
                </a>
            </li>
            <li class="active">
                <strong>
                    {{ ($company) ? $company->name : 'New Client' }}
                </strong>
            </li>
        </ol>

        <div class="admin-section-title">
            <h3>
                {!! ($company) ? $company->name : '<i class="fa fa-plus"></i> Add New Client' !!}
            </h3>
        </div>
        <div class="clear"></div>

        <form method="POST" action="{{
        ($company) ? route($update_path, ['id' => $company->id]) : route('clients.store')
        }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
            {{ ($company) ? method_field('PUT') : method_field('POST') }}
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-primary">

                        <div class="panel-heading">
                            <div class="panel-title">Basic Details</div>
                        </div>

                        <div class="panel-body">
                            @if($errors->first('company_name'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    <strong>Error:</strong>
                                    {{ $errors->first('company_name') }}
                                </div>
                            @endif

                            <div class="input-group">
                                <label for="company_name" class="input-group-addon">Company Name</label>
                                <input type="text" class="form-control" name="company_name" id="company_name" value="{{
                                ($company) ? $company->name : ''
                                }}"/>
                            </div>
                        </div>
                        @if(!$company)
                            <div class="panel-body">
                                @if($errors->first('user_first_name'))
                                    <div class="alert alert-danger">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                        </button>
                                        <strong>Error:</strong>
                                        {{ $errors->first('user_first_name') }}
                                    </div>
                                @endif

                                <div class="input-group">
                                    <label for="user_full_name" class="input-group-addon">Account Owner Name</label>
                                    <input type="text" class="form-control" name="user_full_name" id="user_full_name"
                                           value="{{ ($user) ? $company->user_full_name : ''}}"/>
                                </div>
                            </div>

                            <div class="panel-body">
                                @if($errors->first('user_email'))
                                    <div class="alert alert-danger">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                        </button>
                                        <strong>Error:</strong>
                                        {{ $user->first('user_email') }}
                                    </div>
                                @endif

                                <div class="input-group">
                                    <label for="user_email" class="input-group-addon">Account Owner Email</label>
                                    <input type="email" class="form-control" name="user_email" id="user_email" value="{{
                                ($user) ? $user->user_email : ''
                                }}"/>
                                </div>
                            </div>

                            <div class="panel-body">
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="send_invitation" id="send_invitation" value="1" checked>
                                    Send Email Invitation
                                </label>
                            </div>
                        @endif
                    </div>
                </div>
            </div>

            @if($company)
                <div class="row">
                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Building Name</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="address_line1" id="address_line1"
                                       placeholder="Building Name"
                                       value="{{ ($company) ? $company->address_line1 : '' }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Street Address</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="address_line2" id="address_line2"
                                       placeholder="Street Address"
                                       value="{{ ($company->address_line2) ? $company->address_line2 : '' }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">City</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="city" id="city" placeholder="City"
                                       value="{{ ($company->city) ? $company->city : '' }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Postcode / Zip Code</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="postcode" id="postcode" value="{{
                                ($company->postcode) ? $company->postcode : '' }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Country</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="country" id="country" value="{{
                                       ($company->country) ? $company->country : ''}}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Region</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <select name="region" class="form-control" id="region">
                                    @foreach(config('pricing.region') as $key => $value)
                                        <option {{ $key === $company->region ? 'selected': '' }} value="{{ $key}}">{{ $value['name'] }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Tier</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <select name="tier" class="form-control" id="tier">
                                    @foreach(config('pricing.tier') as $key => $value)
                                        <option {{ $key === $company->tier ? 'selected': '' }} value="{{ $key }}">{{ $value['name'] }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">VAT Number</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="vat_number" id="vat_number" value="{{
                                       ($company->vat_number) ? $company->vat_number : '' }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Billing Phone Number</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="billing_tel" id="billing_tel" value="{{
                                ($company->billing_tel) ? $company->billing_tel : '' }}"/>
                            </div>
                        </div>

                    </div>

                    <div class="col-sm-6">

                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Billing Email Address</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="billing_email" id="billing_email" value="{{
                                       ($company->billing_email) ? $company->billing_email : '' }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Billing Contact / Owner</div>

                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>

                            <div class="panel-body" style="display: block;">
                                <label for="account_owner_id">Select client user</label>
                                <select id="account_owner_id" name="account_owner_id">
                                    @if($company_users))
                                        <option value="">Please Select</option>
                                        @foreach($company_users as $company_user)
                                            <option value="{{ $company_user->id }}" {{
                                                ($company->account_owner_id==$company_user->id) ? 'selected' : ''
                                            }}>
                                                {{ ($company_user->full_name ?: $company_user->username) }}
                                            </option>
                                        @endforeach
                                    @else
                                        <option value="">Create some users first</option>
                                    @endif
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Usable domains</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <label for="usable_domains">
                                    Email domains usable with this account:
                                </label>
                                <input type="text" class="form-control" name="usable_domains" id="usable_domains"
                                       placeholder="bbc.co.uk, news.bbc.co.uk, etc" value="{{
                                       ($company->usable_domains) ? $company->usable_domains : '' }}"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Company Location</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <label for="location">
                                    Select the Company Location
                                </label>
                                <select id="location" name="location">
                                    @if(config('pricing.location'))
                                        <option value="">N/A</option>
                                        @foreach(config('pricing.location') as $key => $value)
                                            <option value="{{ $value['slug'] }}" @if($value['slug']==$company->location) selected @endif>
                                               {{ $value['name'] }}
                                            </option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
                                <div class="panel-title">Active</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
                            <div class="panel-body" style="display: block;">
                                <label>Active</label>
                                <input type="checkbox" id="active" name="active" {{ ((($company) && ($company->active)) || (!$company)) ? 'checked="checked" value=1' : '' }} />
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
                                <div class="panel-title">Active</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
                            @if($errors->first('account_owner_id'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                    </button>
                                    <strong>Error:</strong>
                                    {{ $errors->first('account_owner_id') }}
                                </div>
                            @endif
                            <div class="panel-body" style="display: block;">
                                <label>Client Owner</label>
                                <select id="account_owner_id" name="account_owner_id">
                                    <option value="">N/A</option>
                                    @foreach($company->users as $key => $value)
                                        <option value="{{ $value['id'] }}" @if($value['id']== $company->account_owner_id) selected @endif>
                                            {{ $value['name'] }} - {{ $value['email'] }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

            @endif

            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="submit" value="{{ ($company) ? 'Update Company' : 'Create Company' }}"
                   class="btn btn-success pull-right"/>
        </form>


        @if($company)
            {!! Form::open(['method' => 'DELETE', 'route' => ['clients.destroy', $company->id], 'id' => 'form-delete-clients-' . $company->id]) !!}
            <button class="btn btn-danger delete" data-form="clients-{{ $company->id }} ">
                <i class="fa fa-trash-o"></i>
                Delete
            </button>
            {!! Form::close() !!}
        @endif

        <div class="clear"></div>
    </div>
@stop

@section('javascript')
    <!-- Vue scripts -->
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
    <script>
        $ = jQuery;
        $(document).ready(function () {
            $('.js-delete').click(function (e) {
                e.preventDefault();
                if (confirm("Are you sure you want to delete this story?")) {
                    window.location = $(this).attr('href');
                }
                return false;
            });

            function checkJobs() {
                setTimeout(
                    function() {
                        $.ajax({
                            type: 'GET',
                            url: '/admin/stories/checkjobs',
                            data: {},
                            dataType: 'json',
                            success: function (data) {
                                if (data.jobs == 0) {
                                    swal.close();
                                    swal({
                                        title: 'Stories are now up-to-date.',
                                        icon: 'success',
                                        closeModal: true,
                                        closeOnClickOutside: true,
                                        closeOnEsc: true
                                    }).then(function() {
                                        window.location.reload();
                                    });
                                } else {
                                    // jobs are still in the queue, so run again
                                    checkJobs();
                                }
                            }
                        });
                    }, 500);
            }

            $('.js-refresh-stories').click(function (e) {
                e.preventDefault();
                swal({
                    title: 'Please wait while the stories update. This may take a few minutes.',
                    icon: 'info',
                    closeModal: false,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    buttons: {
                        confirm: false,
                        cancel: {
                            text: "Cancel",
                            value: null,
                            visible: true,
                            closeModal: true,
                        }
                    }
                });
                var refreshUrl = '/admin/stories/refresh';
                if (refreshUrl) {
                    $('.js-refresh-stories').css('display', 'none');
                    $.ajax({
                        type: 'GET',
                        url: refreshUrl,
                        data: {},
                        dataType: 'json',
                        success: function (data) {
                            if (data.dispatched == false) {
                                swal.close();
                                swal({
                                    title: 'Stories are already up-to-date.',
                                    icon: 'success',
                                    closeModal: true,
                                    closeOnClickOutside: true,
                                    closeOnEsc: true
                                }).then(function() {
                                    $('.js-refresh-stories').css('display', 'block');
                                });
                            } else {
                                // jobs have been sent to queue so need to check the job queue
                                checkJobs();
                            }
                        }
                    });
                }
            });
        });
    </script>
@stop
