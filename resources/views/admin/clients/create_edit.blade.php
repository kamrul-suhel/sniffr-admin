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
                    </div>
                @endif
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
