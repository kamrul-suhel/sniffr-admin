@extends('admin.master')

@section('content')
    <div id="admin-container">

        <ol class="breadcrumb">
            <li><a href="/admin/clients"><i class="fa fa-newspaper-o"></i>All Clients</a></li>
            <li class="active">@if(!empty($client->id)) <strong>{{ $client->name }}</strong> @else <strong>New
                    Client</strong> @endif</li>
        </ol>

        <div class="admin-section-title">
            @if(!empty($client->id))
                <h3>{{ $client->name }}</h3>
            @else
                <h3><i class="fa fa-plus"></i> Add New Client</h3>
            @endif
        </div>
        <div class="clear"></div>

        <form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

            <div class="row">

                <div class="@if(!empty($client->created_at)) col-sm-6 @else col-sm-8 @endif">

                    <div class="panel panel-primary" data-collapsed="0">
                        <div class="panel-heading">
                            <div class="panel-title">Client Name</div>
                            <div class="panel-options">
                                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                            </div>
                        </div>
                        <div class="panel-body" style="display: block;">
                            <?php if($errors->first('name')): ?>
                            <div class="alert alert-danger">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <strong>Oh snap!</strong>
                                <?= $errors->first('name'); ?>
                            </div>
                            <?php endif; ?>

                            <p>Add the client name in the textbox below:</p>
                            <input type="text" class="form-control" name="name" id="name" placeholder="Client Name"
                                   value="@if(!empty($client->name)){{ $client->name }}@endif"/>
                        </div>
                    </div>
                </div>

                @if(empty($client->created_at))
                    <!-- <div class="col-sm-3">
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">
                                <div class="panel-title">Created Date</div>
                                <div class="panel-options"><a href="#" data-rel="collapse"><i
                                                class="fa fa-angle-down"></i></a></div>
                            </div>
                            <div class="panel-body" style="display: block;">
                                <p>Select Date/Time Below</p>
                                <input type="text" class="form-control" name="created_at" id="created_at" placeholder=""
                                       value="@if(!empty($client->created_at)){{ $client->created_at }}@endif"/>
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

            @if(isset($client->id))
                <input type="hidden" id="id" name="id" value="{{ $client->id }}"/>
            @endif

            <input type="hidden" name="_token" value="<?= csrf_token() ?>"/>
            <input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right"/>
        </form>

        {!! Form::open(['method' => 'DELETE', 'route' => ['clients.destroy', $client->id], 'id' => 'form-delete-clients-' . $client->id]) !!}
        <a href="" class="btn btn-danger delete" data-form="clients-{{ $client->id }} ">
            <i class="fa fa-trash-o"></i>
            Delete
        </a>
        {!! Form::close() !!}

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
