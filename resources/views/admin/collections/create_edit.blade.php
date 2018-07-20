@extends('admin.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-md-8">
                <h3>
                    <i class="fa fa-list"></i>
                    Collections
                </h3>
            </div>
            <div class="col-md-4">
                <form method="get" role="form" class="search-form-full">
                    <div class="form-group">
                        <input type="text" class="form-control" name="s" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}">
                        <i class="fa fa-search"></i>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="clear"></div>

    <div class="panel">
        <div class="panel-body">
        </div>
    </div>


@stop