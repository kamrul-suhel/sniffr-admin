@extends('admin.master')

@section('content')
    <div id="admin-container">
        <ol class="breadcrumb">
            <li>
                <a href="/admin/clients">
                    <i class="fa fa-newspaper-o"></i>
                    All Clients
                </a>
            </li>
            <li class="active">
                <strong>
                    {{ ($client) ? $client->name : 'New Client' }}
                </strong>
            </li>
        </ol>

        <div class="admin-section-title">
            <h3>
                {!! ($client) ? $client->name : '<i class="fa fa-plus"></i> Add New Client' !!}
            </h3>
        </div>
        <div class="clear"></div>

        <form method="POST" action="{{
        ($client) ? route('clients.update', ['id' => $client->id]) : route('clients.store')
        }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

            <div class="row">

                <div class="{{ ($client) ? 'col-sm-6' : 'col-sm-8' }}">

                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="panel-title">Basic Details</div>
                        </div>

                        <div class="panel-body">
                            @if($errors->first('company_name'))
                            <div class="alert alert-danger">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <strong>Error:</strong>
                                {{ $errors->first('company_name') }}
                            </div>
                            @endif

                            <div class="input-group">
                                <label for="company_name" class="input-group-addon">Company Name</label>
                                <input type="text" class="form-control" name="company_name" id="company_name" value="{{
                                ($client) ? $client->company_name : ''
                                }}"/>
                            </div>
                        </div>

                        <div class="panel-body">
                            @if($errors->first('user_first_name'))
                            <div class="alert alert-danger">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <strong>Error:</strong>
                                {{ $errors->first('user_first_name') }}
                            </div>
                            @endif

                            <div class="input-group">
                                <label for="user_first_name" class="input-group-addon">Account Owner First Name</label>
                                <input type="text" class="form-control" name="user_first_name" id="user_first_name" value="{{
                                ($user) ? $client->user_first_name : ''
                                }}"/>
                            </div>
                        </div>

                        <div class="panel-body">
                            @if($errors->first('user_last_name'))
                            <div class="alert alert-danger">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <strong>Error:</strong>
                                {{ $errors->first('user_last_name') }}
                            </div>
                            @endif

                            <div class="input-group">
                                <label for="user_last_name" class="input-group-addon">Account Owner Last Name</label>
                                <input type="text" class="form-control" name="user_last_name" id="user_last_name" value="{{
                                ($user) ? $user->user_last_name : ''
                                }}"/>
                            </div>
                        </div>

                        <div class="panel-body">
                            @if($errors->first('user_email'))
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
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
                        @if(!$client)
                            <div class="panel-body">
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="send_invitation" id="send_invitation">
                                    Send Email Invitation
                                </label>
                            </div>
                        @endif
                    </div>
                </div>

                @if($client)
                    <div class="col-sm-3">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Created Date</div>
                                <div class="panel-options">
                                    <a href="#" data-rel="collapse">
                                        <i class="fa fa-angle-down"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <p>Select Date/Time Below</p>
                                <input type="text" class="form-control" name="created_at" id="created_at" value="{{
                                ($client) ? $client->created_at : ''
                                }}"/>
                            </div>
                        </div>
                    </div> -->
                @endif
            </div>

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
                            <p>Add Building Name in the textbox below:</p>
                            <input type="text" class="form-control" name="address_line1" id="address_line1" placeholder="Building Name"
                                   value="@if(!empty($client->address_line1)){{ $client->address_line1 }}@endif"/>
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
                            <p>Add Street Address in the textbox below:</p>
                            <input type="text" class="form-control" name="address_line2" id="address_line2" placeholder="Street Address"
                                   value="@if(!empty($client->address_line2)){{ $client->address_line2 }}@endif"/>
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
                            <p>Add City in the textbox below:</p>
                            <input type="text" class="form-control" name="city" id="city" placeholder="City"
                                   value="@if(!empty($client->city)){{ $client->city }}@endif"/>
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
                            <p>Add Postcode / Zip Code in the textbox below:</p>
                            <input type="text" class="form-control" name="postcode" id="postcode" placeholder="Postcode"
                                   value="@if(!empty($client->postcode)){{ $client->postcode }}@endif"/>
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
                            <p>Add Country in the textbox below:</p>
                            <input type="text" class="form-control" name="country" id="country" placeholder="Country"
                                   value="@if(!empty($client->country)){{ $client->country }}@endif"/>
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
                            <p>Add VAT Number in the textbox below:</p>
                            <input type="text" class="form-control" name="vat_number" id="vat_number" placeholder="VAT Number"
                                   value="@if(!empty($client->vat_number)){{ $client->vat_number }}@endif"/>
                        </div>
                    </div>

                </div>

            </div>

            <div class="row">

                <div class="col-sm-12">

                    <hr >

                </div>

            </div>

            <div class="row">

                <div class="col-sm-6">

                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">Billing Phone Number</div>
                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>
                        <div class="panel-body" style="display: block;">
                            <p>Add Billing Phone Number in the textbox below:</p>
                            <input type="text" class="form-control" name="billing_tel" id="billing_tel" placeholder="Billing Phone Number"
                                   value="@if(!empty($client->billing_tel)){{ $client->billing_tel }}@endif"/>
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
                            <p>Add Email Address in the textbox below:</p>
                            <input type="text" class="form-control" name="billing_email" id="billing_email" placeholder="Billing Email Address"
                                   value="@if(!empty($client->billing_email)){{ $client->billing_email }}@endif"/>
                        </div>
                    </div>

                </div>

            </div>

            <div class="row">

                <div class="col-sm-12">

                    <hr >

                </div>

            </div>

            <div class="row">

                <div class="col-sm-6">

                    <div class="panel panel-primary" data-collapsed="0">
    					<div class="panel-heading">
    						<div class="panel-title">Billing Contact / Owner</div>

    						<div class="panel-options">
    							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
    						</div>
    					</div>

    					<div class="panel-body" style="display: block;">
    						<p>Select client user</p>
    						<select id="billing_user_id" name="billing_user_id">
    							@if(isset($client_users))
    								<option value="">Please Select</option>
    								@foreach($client_users as $client_user)
        								<option value="{{ $client->id }}" {{
        								($client->billing_user_id==$client_user->user_id) ? 'selected' : ''
                                        }}>{{ ($client_user->full_name ? $client_user->full_name : $client_user->username) }}</option>
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
                            <p>Email domains usable with this account:</p>
                            <input type="text" class="form-control" name="usable_domains" id="usable_domains" placeholder="bbc.co.uk, news.bbc.co.uk, etc"
                                   value="@if(!empty($client->usable_domains)){{ $client->usable_domains }}@endif"/>
                        </div>
                    </div>

                </div>

            </div>

            @if($client)
                <input type="hidden" id="id" name="id" value="{{ $client->id }}"/>
            @endif

            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="submit" value="{{ ($client) ? 'Edit Client' : 'Create Client' }}" class="btn btn-success pull-right"/>
        </form>

        @if($client)
            {!! Form::open(['method' => 'DELETE', 'route' => ['clients.destroy', $client->id], 'id' => 'form-delete-clients-' . $client->id]) !!}
            <button class="btn btn-danger delete" data-form="clients-{{ $client->id }} ">
                <i class="fa fa-trash-o"></i>
                Delete
            </button>
            {!! Form::close() !!}
        @endif

        <div class="clear"></div>
    </div>
@endsection

@section('javascript')
    <script type="text/javascript">
        $ = jQuery;

        $(document).ready(function () {

            $('#duration').mask('00:00:00');

            $('input[type="checkbox"]').change(function () {
                if ($(this).is(":checked")) {
                    $(this).val(1);
                } else {
                    $(this).val(0);
                }
                console.log('test ' + $(this).is(':checked'));
            });

            tinymce.init({
                relative_urls: false,
                selector: '#body',
                toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor | code",
                plugins: [
                    "advlist autolink link image code lists charmap print preview hr anchor pagebreak spellchecker code fullscreen",
                    "save table contextmenu directionality emoticons template paste textcolor code"
                ],
                menubar: false,
            });

        });
    </script>
@endsection
