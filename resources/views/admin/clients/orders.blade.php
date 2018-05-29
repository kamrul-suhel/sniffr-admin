@extends('admin.master')

@section('content')
    <div id="admin-container">

        <ol class="breadcrumb">
            <li>
                <a href="/admin/clients"><i class="fa fa-newspaper-o"></i>All Clients</a>
            </li>

            <li class="active">
                {{ $client->name }}
            </li>
        </ol>

        <div class="clear"></div>

        <table class="table table-striped pages-table">
            <tr class="table-header">
                <th>Name</th>
                <th>Actions</th>
                @foreach($orders as $order)
                    <tr>
                        <td>
                            {{ ($order->story()->title) ?: 'Title' }}
                        </td>
                        <td>
                            {{ $order->story()->alpha_id }}
                        </td>
                    </tr>
                @endforeach
        </table>
    </div>
@endsection
