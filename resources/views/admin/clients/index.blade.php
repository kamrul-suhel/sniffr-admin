@extends('admin.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-xs-12">
                <h3>
                    <i class="fa fa-users"></i>
                    Clients
                    <a href="{{ url('admin/clients/create') }}" class="btn btn-success pull-right">
                        <i class="fa fa-plus-circle"></i>
                        Add New
                    </a>
                </h3>
            </div>
        </div>
    </div>
    <div class="clear"></div>

    <h4>Unmoderated Clients</h4>
    <p>Client must be set to <b>Active</b> so they can purchase assets from the marketplace</p>
    <div class="panel panel-danger">
        <table class="table table-striped pages-table">
            <thead>
            <th>Name</th>
            <th>Active</th>
            <th>Actions</th>
            </thead>
            <tbody>
            @foreach($unmoderatedClients as $client)
                <tr>
                    <td>{{ TextHelper::shorten($client->name, 250) }}</td>
                    <td>
                        @if($client->active)
                            Yes
                        @else
                            <div class="label label-danger"><i class="fa fa-exclamation"></i>
                                Moderation
                            </div>
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('clients.edit', ['id' => $client->id]) }}" class="btn btn-xs btn-info">
                            <span class="fa fa-edit"></span>
                            @if($client->active)
                                Edit
                            @else
                                Moderate
                            @endif
                        </a>
                        <a href="{{ route('clients.purchases', ['id' => $client->id]) }}"
                           class="btn btn-xs btn-warning">
                            <span class="fa fa-money"></span>
                            Purchases
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <br>

    <h4>Moderated Clients</h4>
    <table class="table table-striped pages-table">
        <thead>
        <th>Name</th>
        <th>Active</th>
        <th>Actions</th>
        </thead>
        <tbody>
        @foreach($clients as $client)
            <tr>
                <td>{{ TextHelper::shorten($client->name, 250) }}</td>
                <td>
                    @if($client->active)
                        Yes
                    @else
                        <div class="label label-danger"><i class="fa fa-exclamation"></i>
                            Moderation
                        </div>
                    @endif
                </td>
                <td>
                    <a href="{{ route('clients.edit', ['id' => $client->id]) }}" class="btn btn-xs btn-info">
                        <span class="fa fa-edit"></span>
                        @if($client->active)
                            Edit
                        @else
                            Moderate
                        @endif
                    </a>
                    <a href="{{ route('clients.purchases', ['id' => $client->id]) }}" class="btn btn-xs btn-warning">
                        <span class="fa fa-money"></span>
                        Purchases
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div class="clear"></div>

    <div class="text-center"><?= $clients->render(); ?></div>
@stop
