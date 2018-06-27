@extends('admin.master')

@section('content')


    <div id="admin-container">
        <!-- This is where -->

        <div class="admin-section-title">
            <h3><i class="fa fa-exclamation"></i> Quote Requests </h3>
        </div>
        <div class="clear"></div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-body" style="">
                        @foreach($collections as $collection)
                            <h4>{{ $collection->name }}</h4>
                            @foreach($collection->collectionVideos as $videoCollection)
                                <h5>Pending Videos ({{ $collection->collectionVideos->count() }})</h5>
                                <table class="table table-condensed table-striped">
                                    <thead>
                                        <th style="width: 10%;" class="text-center"><small>User</small></th>
                                        <th style="width: 10%;" class="text-center"><small>Company</small></th>
                                        <th style="width: 10%;" class="text-center"><small>Video</small></th>
                                        <th style="width: 10%;" class="text-center"><small>Offer Price (£)</small></th>
                                        <th style="width: 2%;" class="text-center"><small>Discount (%)</small></th>
                                        <th style="width: 1%;" class="text-center" colspan="3"></th>
                                    </thead>
                                    <tbody>
                                        <form action="{{ route('quotes.update', ['id' => $collection->id]) }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('PUT') }}

                                            <tr class="text-center">
                                                <td>
                                                    <small><b>{{ $videoCollection->collection->user->full_name ?? $videoCollection->collection->user->username }}</b></small> <br>
                                                    <small>Email: <b>{{ $videoCollection->collection->user->email }}</b> </small> <br>
                                                    <small>Tel: <b>{{ $videoCollection->collection->user->tel ?? 'unknown' }}</b></small>
                                                </td>
                                                <td>
                                                    <small><b>{{ $videoCollection->collection->user->client->name ?? 'unknown' }} </b> <br></small>
                                                    <small>Location: <b>{{ $videoCollection->company_location ?? 'unknown' }}</b><br></small>
                                                    <small>Tier:     <b>{{ $videoCollection->compant_tier ?? 'unknown' }}    </b><br></small>
                                                </td>
                                                <td>
                                                    <small>
                                                    <table>
                                                        <tr><td class="pull-left">Title: </td><td class="pull-right"><b><a target="_blank" href="{{ url('videos/'.$videoCollection->video->alpha_id) }}">{{ $videoCollection->video->title ?? 'unknown' }} <i class="fa fa-external-link"></i> </a></b></td></tr>
                                                        <tr><td class="pull-left">Type: </td><td class="pull-right"><b>{{ $videoCollection->type ?? 'unknown' }}        </b></td></tr>
                                                        <tr><td class="pull-left">Platform: </td><td class="pull-right"><b>{{ $videoCollection->platform ?? 'unknown' }}</b></td></tr>
                                                        <tr><td class="pull-left">Length: </td><td class="pull-right"><b>{{ $videoCollection->length ?? 'unknown' }}    </b></td></tr>
                                                        <tr><td class="pull-left">Class: </td><td class="pull-right"><b>{{ $videoCollection->class ?? 'unknown' }}      </b></td></tr>
                                                    </table>
                                                    </small>
                                                </td>
                                                <td><input placeholder="The power is in your hands..." value="" name="final_price" type="text" class="form-control"></td>
                                                <td>
                                                    <select name="discount" id="discount" class="form-control">
                                                        <option value="0">None</option>
                                                        <option value="10">10%</option>
                                                        <option value="20">20%</option>
                                                        <option value="30">30%</option>
                                                        <option value="40">40%</option>
                                                        <option value="50">50%</option>
                                                        <option value="60">60%</option>
                                                        <option value="70">70%</option>
                                                        <option value="80">80%</option>
                                                        <option value="90">90%</option>
                                                        <option value="100">100%</option>
                                                    </select>
                                                </td>
                                                <td><button type="submit" class="btn btn-success btn-sm">Submit</button></td>
                                            </tr>
                                        </form>
                                    </tbody>
                                </table>
                                <br>
                            @endforeach
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection