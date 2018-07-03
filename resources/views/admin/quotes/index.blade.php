@extends('admin.master')

@section('content')
    <div id="admin-container">
        <div class="admin-section-title">
            <h3><i class="fa fa-exclamation"></i> Quote Requests </h3>
        </div>
        <div class="clear"></div>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">Pending Collections</div>
                    <div class="panel-body" style="">
                        @foreach($pendingVideoCollections as $collection)
                            <h4>Collection: <b>{{ $collection->name }}</b></h4>
                            @foreach($collection->collectionVideos as $videoCollection)
                                @if (count($errors) > 0)
                                    <div class="alert alert-danger">
                                        <strong>Whoops!</strong> There were some problems with your input.<br><br>
                                        <ul>
                                            @foreach ($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif
                                <h5>Pending Videos ({{ $collection->collectionVideos->count() }})</h5>
                                <table class="table table-condensed table-striped table-primary">
                                    <thead>
                                        <th style="width: 1%;" class="text-center"><small>User</small></th>
                                        <th style="width: 1%;" class=""><small>Company</small></th>
                                        <th style="width: 1%;" class=""><small>Video</small></th>
                                        <th style="width: 1%;" class="text-center"><small>Offer Price (£)</small></th>
                                        <th style="width: 1%;" class="text-center"></th>
                                    </thead>
                                    <tbody>
                                        <form action="{{ route('quotes.update', ['id' => $videoCollection->id]) }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('PUT') }}

                                            <tr>
                                                <td class="text-center">
                                                    <small><b>{{ $videoCollection->collection->user->full_name ?? $videoCollection->collection->user->username }}</b></small> <br>
                                                    <small>Email: <b>{{ $videoCollection->collection->user->email }}</b> </small> <br>
                                                    <small>Tel: <b>{{ $videoCollection->collection->user->tel ?? 'unknown' }}</b></small>
                                                </td>
                                                <td class="small text-center">
                                                    <table>
                                                        <tr><td class="pull-left">Name:</td><td class="pull-right"><b>{{ $videoCollection->collection->user->client->name ?? 'unknown' }} </b></td></tr>
                                                        <tr><td class="pull-left">Region</td><td class="pull-right"><b>{{ $videoCollection->user->client->company_location ?? 'unknown' }} </b></td></tr>
                                                        <tr><td class="pull-left">Tier</td><td class="pull-right"><b>{{ $videoCollection->user->client->compant_tier ?? 'unknown' }} </b></td></tr>
                                                    </table>
                                                </td>
                                                <td class="small text-center">
                                                    <table>
                                                        <tr><td class="pull-left">Title: </td><td class="pull-right"><b><a target="_blank" href="{{ url('videos/'.$videoCollection->video->alpha_id) }}">{{ $videoCollection->video->title ?? 'unknown' }} <i class="fa fa-external-link"></i> </a></b></td></tr>
                                                        <tr><td class="pull-left">Type: </td><td class="pull-right"><b>{{ $videoCollection->type ?? 'unknown' }}        </b></td></tr>
                                                        <tr><td class="pull-left">Platform: </td><td class="pull-right"><b>{{ $videoCollection->platform ?? 'unknown' }}</b></td></tr>
                                                        <tr><td class="pull-left">Length: </td><td class="pull-right"><b>{{ $videoCollection->length ?? 'unknown' }}    </b></td></tr>
                                                        <tr><td class="pull-left">Class: </td><td class="pull-right"><b>{{ $videoCollection->class ?? 'unknown' }}      </b></td></tr>
                                                    </table>
                                                </td>
                                                <td><input placeholder="The power is in your hands..." value="{{ $videoCollection->final_price }}" name="final_price" type="text" class="form-control"></td>
                                                <td><button type="submit" class="btn btn-success btn-sm pull-right">Submit</button></td>
                                            </tr>
                                        </form>
                                    </tbody>
                                </table>
                                <br>
                            @endforeach
                        @endforeach
                        {{ $pendingVideoCollections->links() }}
                    </div>
                </div>
            </div>
        </div>s

        <hr>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">Offered Collections</div>
                    <div class="panel-body" style="">
                        @foreach($offeredVideoCollections as $collection)
                            <h4>Collection: <b>{{ $collection->name }}</b></h4>
                            @foreach($collection->collectionVideos as $videoCollection)
                                <h5>Offered Videos ({{ $collection->collectionVideos->count() }})</h5>
                                <table class="table table-condensed table-striped table-primary">
                                    <thead>
                                    <th style="width: 1%;" class="text-center"><small>User</small></th>
                                    <th style="width: 1%;" class=""><small>Company</small></th>
                                    <th style="width: 1%;" class=""><small>Video</small></th>
                                    <th style="width: 1%;" class="text-center"><small>Offer Price (£)</small></th>
                                    <th style="width: 1%;" class="text-center"></th>
                                    </thead>
                                    <tbody>
                                    <form action="{{ route('quotes.update', ['id' => $videoCollection->id]) }}" method="POST">
                                        {{ csrf_field() }}
                                        {{ method_field('PUT') }}

                                        <tr>
                                            <td class="text-center">
                                                <small><b>{{ $videoCollection->collection->user->full_name ?? $videoCollection->collection->user->username }}</b></small> <br>
                                                <small>Email: <b>{{ $videoCollection->collection->user->email }}</b> </small> <br>
                                                <small>Tel: <b>{{ $videoCollection->collection->user->tel ?? 'unknown' }}</b></small>
                                            </td>
                                            <td class="small text-center">
                                                <table>
                                                    <tr><td class="pull-left">Name:</td><td class="pull-right"><b>{{ $videoCollection->collection->user->client->name ?? 'unknown' }} </b></td></tr>
                                                    <tr><td class="pull-left">Region</td><td class="pull-right"><b>{{ $videoCollection->user->client->company_location ?? 'unknown' }} </b></td></tr>
                                                    <tr><td class="pull-left">Tier</td><td class="pull-right"><b>{{ $videoCollection->user->client->compant_tier ?? 'unknown' }} </b></td></tr>
                                                </table>
                                            </td>
                                            <td class="small text-center">
                                                <table>
                                                    <tr><td class="pull-left">Title: </td><td class="pull-right"><b><a target="_blank" href="{{ url('videos/'.$videoCollection->video->alpha_id) }}">{{ $videoCollection->video->title ?? 'unknown' }} <i class="fa fa-external-link"></i> </a></b></td></tr>
                                                    <tr><td class="pull-left">Type: </td><td class="pull-right"><b>{{ $videoCollection->type ?? 'unknown' }}        </b></td></tr>
                                                    <tr><td class="pull-left">Platform: </td><td class="pull-right"><b>{{ $videoCollection->platform ?? 'unknown' }}</b></td></tr>
                                                    <tr><td class="pull-left">Length: </td><td class="pull-right"><b>{{ $videoCollection->length ?? 'unknown' }}    </b></td></tr>
                                                    <tr><td class="pull-left">Class: </td><td class="pull-right"><b>{{ $videoCollection->class ?? 'unknown' }}      </b></td></tr>
                                                </table>
                                            </td>
                                            <td><input placeholder="The power is in your hands..." value="{{ $videoCollection->final_price }}" name="final_price" type="text" class="form-control"></td>
                                            <td><button type="submit" class="btn btn-danger btn-sm pull-right">Retract</button></td>
                                        </tr>
                                    </form>
                                    </tbody>
                                </table>
                                <br>
                            @endforeach
                        @endforeach
                        {{ $offeredVideoCollections->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection