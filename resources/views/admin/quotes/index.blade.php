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
                    <div class="panel-heading">
                        <h3 class="mb-0">Pending Quotes</h3>
                    </div>

                    <div class="panel-body">
                        @foreach($pendingVideoCollections as $collection)
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
                                <form class="form_quote" action="{{ route('quotes.update', ['id' => $videoCollection->id]) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" value="video" name="asset_type">
                                    <div class="panel panel-primary" data-collapsed="0">
                                        <div class="panel-heading">
                                            {{ $collection->name }} : ({{ $collection->collectionVideos->count() }} video)<b title="{{ $videoCollection->collection->user->email }}">{{ $videoCollection->collection->user->full_name ?? $videoCollection->collection->user->username }} @ {{ $videoCollection->collection->user->client->name }} - @if($videoCollection->collection->user->tel)<b>{{ $videoCollection->collection->user->tel }}</b>@endif</b>
                                        </div>

                                        <div class="panel-body">
                                            <div class="col-xs-2">
                                                <img src="{{ $videoCollection->video->thumb }}" width="100%">
                                            </div>

                                            <div class="col-xs-7">
                                                <h3 class="title"><a target="_blank" href="{{ url('admin/videos/edit/'.$videoCollection->video->alpha_id) }}">{{ $videoCollection->video->title }} <i class="fa fa-external-link"></i></a></h3>

                                                <div class="row">
                                                    <div class="col-xs-6">
                                                        @if($videoCollection->collection->client->name)<p>Name: <b>{{ $videoCollection->collection->user->client->name }} </b></p>@endif
                                                        @if($videoCollection->collection->client->region)<p>Region: <b>{{ config('pricing.region.'.$videoCollection->collection->client->region.'.name') }} </b></p>@endif
                                                        @if($videoCollection->collection->client->tier)<p>Tier: <b>{{ config('pricing.tier.'.$videoCollection->collection->client->tier.'.name') }} </b></p>@endif
                                                        @if($videoCollection->type)<p>License: <b>{{ config('pricing.type.'.$videoCollection->type.'.name') }} </b></p>@endif
                                                        @if($videoCollection->platform)<p>Platform: <b>{{ config('pricing.platform.'.$videoCollection->platform.'.name') }} </b></p>@endif
                                                        @if($videoCollection->length)<p>License Length: <b>{{ config('pricing.length.'.$videoCollection->length.'.name') }} </b></p>@endif
                                                    </div>

                                                    <div class="col-xs-6">
                                                        @if($videoCollection->notes)
                                                        <div class="form-group">
                                                            <label for="notes">Notes</label>
                                                            <textarea class="form-control" id="notes" rows="5" disabled>{{ $videoCollection->notes }}</textarea>
                                                        </div>
                                                        @endif
                                                    </div>
                                                </div>
                                             </div>

                                            <div class="col-xs-3">
                                                <span class="form-group input-group">
                                                    <span class="input-group-addon">
                                                        Quote
                                                    </span>
                                                    <input placeholder="£" value="{{ $videoCollection->final_price }}" name="final_price" type="text" class="form-control">
                                                </span>

                                                <button type="submit" class="btn btn-success btn-sm pull-right">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            @endforeach
                        @endforeach
                        <div class="text-center">
                            {{ $pendingVideoCollections->links() }}
                        </div>

                        <hr>

                        @foreach($pendingStoryCollections as $collection)
                            @foreach($collection->collectionStories as $storyCollection)
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
                                <form class="form_quote" action="{{ route('quotes.update', ['id' => $storyCollection->id]) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('PUT') }}
                                    <input type="hidden" value="story" name="asset_type">
                                    <div class="panel panel-primary" data-collapsed="0">
                                        <div class="panel-heading">
                                            {{ $collection->name }} : ({{ $collection->collectionStories->count() }} story)<b title="{{ $storyCollection->collection->user->email }}">{{ $storyCollection->collection->user->full_name ?? $storyCollection->collection->user->username }} @ {{ $storyCollection->collection->user->client->name }} - @if($storyCollection->collection->user->tel)<b>{{ $storyCollection->collection->user->tel }}</b>@endif</b>
                                        </div>

                                        <div class="panel-body">
                                            <div class="col-xs-2">
                                                <img src="{{ $storyCollection->story->thumb }}" width="100%">
                                            </div>

                                            <div class="col-xs-7">
                                                <h3 class="title"><a target="_blank" href="{{ url('admin/stories/edit/'.$storyCollection->story->alpha_id) }}">{{ $storyCollection->story->title }} <i class="fa fa-external-link"></i></a></h3>

                                                <div class="row">
                                                    <div class="col-xs-6">
                                                        @if($storyCollection->collection->client->name)<p>Name: <b>{{ $storyCollection->collection->user->client->name }} </b></p>@endif
                                                        @if($storyCollection->collection->client->region)<p>Region: <b>{{ config('pricing.region.'.$storyCollection->collection->client->region.'.name') }} </b></p>@endif
                                                        @if($storyCollection->collection->client->tier)<p>Tier: <b>{{ config('pricing.tier.'.$storyCollection->collection->client->tier.'.name') }} </b></p>@endif
                                                    </div>

                                                    <div class="col-xs-6">
                                                        @if($storyCollection->notes)
                                                        <div class="form-group">
                                                            <label for="notes">Notes</label>
                                                            <textarea class="form-control" id="notes" rows="5" disabled>{{ $storyCollection->notes }}</textarea>
                                                        </div>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-3">
                                                <span class="form-group input-group">
                                                    <span class="input-group-addon">
                                                        Quote
                                                    </span>
                                                    <input placeholder="£" value="{{ $storyCollection->final_price }}" name="final_price" type="text" class="form-control">
                                                </span>

                                                <button type="submit" class="btn btn-success btn-sm pull-right">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            @endforeach
                        @endforeach
                        <div class="text-center">
                            {{ $pendingStoryCollections->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">
                        <h3 class="mb-0">Offered Quotes</h3>
                    </div>

                    <div class="panel-body">
                        @foreach($offeredVideoCollections as $collection)
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
                                <form class="form_quote" action="{{ route('quotes.update', ['id' => $videoCollection->id]) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}
                                    <input type="hidden" value="video" name="asset_type">
                                    <div class="panel panel-primary" data-collapsed="0">
                                        <div class="panel-heading">
                                            {{ $collection->name }} : ({{ $collection->collectionVideos->count() }} video)<b title="{{ $videoCollection->collection->user->email }}">{{ $videoCollection->collection->user->full_name ?? $videoCollection->collection->user->username }} @ {{ $videoCollection->collection->user->client->name }} - @if($videoCollection->collection->user->tel)<b>{{ $videoCollection->collection->user->tel }}</b>@endif</b>
                                        </div>

                                        <div class="panel-body">
                                            <div class="col-xs-2">
                                                <img src="{{ $videoCollection->video->thumb }}" width="100%">
                                            </div>

                                            <div class="col-xs-7">
                                                <h3 class="title"><a target="_blank" href="{{ url('admin/videos/edit/'.$videoCollection->video->alpha_id) }}">{{ $videoCollection->video->title }} <i class="fa fa-external-link"></i></a></h3>

                                                <div class="row">
                                                    <div class="col-xs-6">
                                                        @if($videoCollection->collection->client->name)<p>Name: <b>{{ $videoCollection->collection->user->client->name }} </b></p>@endif
                                                        @if($videoCollection->collection->client->region)<p>Region: <b>{{ config('pricing.region.'.$videoCollection->collection->client->region.'.name') }} </b></p>@endif
                                                        @if($videoCollection->collection->client->tier)<p>Tier: <b>{{ config('pricing.tier.'.$videoCollection->collection->client->tier.'.name') }} </b></p>@endif
                                                        @if($videoCollection->type)<p>License: <b>{{ config('pricing.type.'.$videoCollection->type.'.name') }} </b></p>@endif
                                                        @if($videoCollection->platform)<p>Platform: <b>{{ config('pricing.platform.'.$videoCollection->platform.'.name') }} </b></p>@endif
                                                        @if($videoCollection->length)<p>License Length: <b>{{ config('pricing.length.'.$videoCollection->length.'.name') }} </b></p>@endif
                                                    </div>

                                                    <div class="col-xs-6">
                                                        @if($videoCollection->notes)
                                                        <div class="form-group">
                                                            <label for="notes">Notes</label>
                                                            <textarea class="form-control" id="notes" rows="5" disabled>{{ $videoCollection->notes }}</textarea>
                                                        </div>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-3">
                                                <span class="form-group input-group">
                                                    <span class="input-group-addon">
                                                        Quote
                                                    </span>
                                                    <input placeholder="£" value="{{ $videoCollection->final_price }}" name="final_price" type="text" class="form-control">
                                                </span>

                                                <button type="submit" class="btn btn-danger btn-sm pull-right">Retract</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            @endforeach
                        @endforeach
                        <div class="text-center">
                            {{ $offeredVideoCollections->links() }}
                        </div>
                        <hr>
                        @foreach($offeredStoryCollections as $collection)
                            @foreach($collection->collectionStories as $storyCollection)
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
                                <form class="form_quote" action="{{ route('quotes.update', ['id' => $storyCollection->id]) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}
                                    <input type="hidden" value="story" name="asset_type">
                                    <div class="panel panel-primary" data-collapsed="0">
                                        <div class="panel-heading">
                                            {{ $collection->name }} : ({{ $collection->collectionStories->count() }} story)<b title="{{ $storyCollection->collection->user->email }}">{{ $storyCollection->collection->user->full_name ?? $storyCollection->collection->user->username }} @ {{ $storyCollection->collection->user->client->name }} - @if($storyCollection->collection->user->tel)<b>{{ $storyCollection->collection->user->tel }}</b>@endif</b>
                                        </div>

                                        <div class="panel-body">
                                            <div class="col-xs-2">
                                                <img src="{{ $storyCollection->story->thumb }}" width="100%">
                                            </div>

                                            <div class="col-xs-7">
                                                <h3 class="title"><a target="_blank" href="{{ url('admin/stories/edit/'.$storyCollection->story->alpha_id) }}">{{ $storyCollection->story->title }} <i class="fa fa-external-link"></i></a></h3>

                                                <div class="row">
                                                    <div class="col-xs-6">
                                                        @if($storyCollection->collection->client->name)<p>Name: <b>{{ $storyCollection->collection->user->client->name }} </b></p>@endif
                                                        @if($storyCollection->collection->client->region)<p>Region: <b>{{ config('pricing.region.'.$storyCollection->collection->client->region.'.name') }} </b></p>@endif
                                                        @if($storyCollection->collection->client->tier)<p>Tier: <b>{{ config('pricing.tier.'.$storyCollection->collection->client->tier.'.name') }} </b></p>@endif
                                                    </div>

                                                    <div class="col-xs-6">
                                                        @if($storyCollection->notes)
                                                        <div class="form-group">
                                                            <label for="notes">Notes</label>
                                                            <textarea class="form-control" id="notes" rows="5" disabled>{{ $storyCollection->notes }}</textarea>
                                                        </div>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-3">
                                                <span class="form-group input-group">
                                                    <span class="input-group-addon">
                                                        Quote
                                                    </span>
                                                    <input placeholder="£" value="{{ $storyCollection->final_price }}" name="final_price" type="text" class="form-control" disabled>
                                                </span>

                                                <button type="submit" class="btn btn-danger btn-sm pull-right">Retract</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            @endforeach
                        @endforeach
                        <div class="text-center">
                            {{ $offeredStoryCollections->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection