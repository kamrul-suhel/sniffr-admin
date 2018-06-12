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
        ($company) ? route('clients.update', ['id' => $company->id]) : route('clients.store')
        }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
            {{ method_field('PUT') }}
            <div class="row">

                <div class="{{ ($company) ? 'col-sm-6' : 'col-sm-8' }}">

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
                                    <label for="user_first_name" class="input-group-addon">Account Owner First
                                        Name</label>
                                    <input type="text" class="form-control" name="user_first_name" id="user_first_name"
                                           value="{{
                                ($user) ? $company->user_first_name : ''
                                }}"/>
                                </div>
                            </div>

                            <div class="panel-body">
                                @if($errors->first('user_last_name'))
                                    <div class="alert alert-danger">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×
                                        </button>
                                        <strong>Error:</strong>
                                        {{ $errors->first('user_last_name') }}
                                    </div>
                                @endif

                                <div class="input-group">
                                    <label for="user_last_name" class="input-group-addon">Account Owner Last
                                        Name</label>
                                    <input type="text" class="form-control" name="user_last_name" id="user_last_name"
                                           value="{{
                                ($user) ? $user->user_last_name : ''
                                }}"/>
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
                                    <input type="checkbox" name="send_invitation" id="send_invitation">
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
                                <p>Add Building Name in the textbox below:</p>
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
                                <p>Add Street Address in the textbox below:</p>
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
                                <p>Add City in the textbox below:</p>
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
                                <p>Add Postcode / Zip Code in the textbox below:</p>
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
                                <p>Add Country in the textbox below:</p>
                                <input type="text" class="form-control" name="country" id="country" value="{{
                                       ($company->country) ? $company->country : ''}}"/>
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
                                <p>Add Billing Phone Number in the textbox below:</p>
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
                                <p>Add Email Address in the textbox below:</p>
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
                </div>
            @endif

            @if($company)
                <input type="hidden" id="id" name="id" value="{{ $company->id }}"/>
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
