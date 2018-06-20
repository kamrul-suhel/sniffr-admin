@extends('client.master')

@section('content')
    <div id="container">

        <div class="section-title">
            <h1>{!! ($company) ? $company->name : '<i class="fa fa-plus"></i> Add New Client' !!}</h1>
        </div>
        <div class="clear"></div>

        <form method="POST" action="{{($company) ? route($update_path, ['id' => $company->id]) : route('clients.store')}}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
            {{ ($company) ? method_field('PUT') : method_field('POST') }}
            {{ csrf_field() }}

            <div class="row">
                <div class="col-lg-12">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <p>{{ $error }}</p>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">Company Name</div>
                        </div>
                        <div class="panel-body" style="display: block;">
                            <input type="text" class="form-control" name="company_name" id="company_name"
                                   placeholder="Company Name" value="{{ ($company) ? $company->name : '' }}"/>
                        </div>
                    </div>
                </div>
            </div>

            @if($company)
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Billing Information</div>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-6">
                                    <div class="panel-title">Address Line 1</div>
                                    <input type="text" class="form-control" name="address_line1" id="address_line1"
                                           placeholder="Building Name"
                                           value="{{ ($company) ? $company->address_line1 : '' }}"/>
                                    <br>
                                </div>

                                <div class="col-lg-6">
                                    <div class="panel-title">VAT Number</div>
                                    <input type="text" class="form-control" name="vat_number" id="vat_number"
                                           value="{{($company->vat_number) ? $company->vat_number : '' }}"/>
                                    <br>
                                </div>

                                <div class="col-lg-6">
                                    <div class="panel-title">Address Line 2</div>
                                    <input type="text" class="form-control" name="address_line2" id="address_line2"
                                           placeholder="Street Address"
                                           value="{{ ($company->address_line2) ? $company->address_line2 : '' }}"/>
                                    <br>
                                </div>

                                <div class="col-lg-6">
                                    <div class="panel-title">Billing Phone Number</div>
                                    <input type="text" class="form-control" name="billing_tel" id="billing_tel" value="{{($company->billing_tel) ? $company->billing_tel : '' }}"/>
                                    <br>
                                </div>
                                <div class="col-lg-6">
                                    <div class="panel-title">City</div>
                                    <input type="text" class="form-control" name="city" id="city" placeholder="City"
                                           value="{{ ($company->city) ? $company->city : '' }}"/>
                                </div>
                                <div class="col-lg-6">
                                    <div class="panel-title">Billing Email Address</div>
                                    <input type="text" class="form-control" name="billing_email" id="billing_email" value="{{($company->billing_email) ? $company->billing_email : '' }}"/>
                                    <br>
                                </div>
                                <div class="col-lg-6">
                                    <div class="panel-title">Postcode / Zip Code</div>
                                    <input type="text" class="form-control" name="postcode" id="postcode"
                                           value="{{($company->postcode) ? $company->postcode : '' }}"/>
                                    <br>
                                </div>
                                <div class="col-lg-6">
                                    <div class="panel-title">Billing Contact / Owner</div>
                                    <input type="text" disabled class="form-control" name="fullname" id="fullname"
                                           value="{{($company->owner->full_name) ? $company->owner->full_name : '' }}"/>
                                    <br>
                                </div>
                                <div class="col-lg-6">
                                    <br>
                                    <div class="panel-title">Country</div>
                                    <input type="text" class="form-control" name="country" id="country"
                                           value="{{($company->country) ? $company->country : ''}}"/>
                                    <br>
                                </div>

                                <div class="col-lg-6">
                                    <div class="panel-title">
                                        Change Owner -
                                        <b class="">Note: Once the account owner is changed, you will <u>lose access</u> to these settings.</b>
                                    </div>
                                    <select id="account_owner_id" @if($user->id !== $company->account_owner_id) disabled @endif name="account_owner_id" class="form-control">
                                        @if($company_users))
                                        <option value="">-- Please Select --</option>
                                        @foreach($company_users as $company_user)
                                            <option value="{{ $company_user->id }}" {{($company->account_owner_id==$company_user->id) ? 'selected' : '' }}>
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
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Email Domains Usable With this Account</div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <input type="text" class="form-control" name="usable_domains" id="usable_domains"
                                       placeholder="bbc.co.uk, news.bbc.co.uk, etc" value="{{
                                       ($company->usable_domains) ? $company->usable_domains : '' }}"/>
                            </div>
                        </div>
                    </div>
                </div>

                @include('client.account.partials.users')
            @endif

            <input type="submit" value="{{ ($company) ? 'Update Company' : 'Create Company' }}"
                   class="btn btn-success pull-right"/>
        </form>

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
