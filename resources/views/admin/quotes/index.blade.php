@extends('admin.master')

@section('content')
    <div id="admin-container">
        <div class="admin-section-title">
            <h3><i class="fa fa-exclamation"></i> Quote Requests </h3>
        </div>

        <hr>

        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary" data-collapsed="0">
                    <div class="panel-heading">
                        <h3 class="mb-0">Pending Quotes</h3>
                    </div>

                    <ul class="nav nav-tabs">
                        <li><a data-toggle="tab" href="#pending_videos">Videos ({{ $pendingVideoCollections->count() }})</a></li>
                        <li><a data-toggle="tab" href="#pending_stories">Stories ({{ $pendingStoryCollections->count() }})</a></li>
                    </ul>

                    <div class="tab-content">

                        <div id="pending_videos" class="tab-pane fade in active">
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
                                        @if($videoCollection->collection->user)
                                        <form class="form_quote" action="{{ route('quotes.update', ['id' => $videoCollection->id]) }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('PUT') }}
                                            <input type="hidden" value="video" name="asset_type">
                                            @include('admin.quotes.partials.listing', ['collections' => $collection, 'asset' => $videoCollection, 'type' => 'video'])
                                        </form>
                                        @endif
                                    @endforeach
                                @endforeach
                                <div class="text-center">
                                    {{ $pendingVideoCollections->links() }}
                                </div>
                            </div>
                        </div>

                        <div id="pending_stories" class="tab-pane fade">
                            <div class="panel-body">
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

                                        @if($storyCollection->collection->user)
                                        <form class="form_quote" action="{{ route('quotes.update', ['id' => $storyCollection->id]) }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('PUT') }}
                                            <input type="hidden" value="story" name="asset_type">
                                            @include('admin.quotes.partials.listing', ['collections' => $collection, 'asset' => $storyCollection, 'type' => 'story'])
                                        </form>
                                        @endif
                                    @endforeach
                                @endforeach
                                <div class="text-center">
                                    {{ $pendingStoryCollections->links() }}
                                </div>
                            </div>
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

                    <ul class="nav nav-tabs">
                        <li><a data-toggle="tab" href="#offered_videos">Videos ({{ $offeredVideoCollections->count() }})</a></li>
                        <li><a data-toggle="tab" href="#offered_stories">Stories ({{ $offeredStoryCollections->count() }})</a></li>
                    </ul>

                    <div class="tab-content">
                        <div id="offered_videos" class="tab-pane fade in active">
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

                                        @if($videoCollection->collection->user)
                                        <form class="form_quote" action="{{ route('quotes.update', ['id' => $videoCollection->id]) }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('DELETE') }}
                                            <input type="hidden" value="video" name="asset_type">
                                            @include('admin.quotes.partials.listing', ['collections' => $collection, 'asset' => $videoCollection, 'type' => 'video'])
                                        </form>
                                        @endif
                                    @endforeach
                                @endforeach
                                <div class="text-center">
                                    {{ $offeredVideoCollections->links() }}
                                </div>
                            </div>
                        </div>
                        <div id="offered_stories" class="tab-pane fade">
                            <div class="panel-body">
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

                                        @if($storyCollection->collection->user)
                                        <form class="form_quote" action="{{ route('quotes.update', ['id' => $storyCollection->id]) }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('DELETE') }}
                                            <input type="hidden" value="story" name="asset_type">
                                            @include('admin.quotes.partials.listing', ['collections' => $collection, 'asset' => $storyCollection, 'type' => 'story'])
                                        </form>
                                        @endif
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
        </div>
    </div>
@endsection