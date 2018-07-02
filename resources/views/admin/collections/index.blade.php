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
            <table class="table table-striped pages-table">
                @foreach($companies as $company)
                    @if($company->collections->count())
                        <thead class="panel-title">
                            <th>{{ $company->name }}</th>
                        </thead>
                        <tbody>
                            <table class="table table-condensed table-striped">
                                <thead>
                                    <th class="text-center">Name</th>
                                    <th class="text-center">Created</th>
                                    <th class="text-center">By</th>
                                    <th class="text-center">Videos</th>
                                    <th class="text-center">Video Quotes</th>
                                    <th class="text-center">Stories</th>
                                    <th class="text-center">Story Quotes</th>
                                    <th class="text-center">Status</th>
                                </thead>
                                <tbody>
                                @foreach($company->collections as $collection)
                                    <tr class="text-center">
                                        <td><a href="{{ route('admin.collections.show', ['id' => $collection->id]) }}">{{ $collection->name }}</a></td>
                                        <td>{{ $collection->created_at }}</td>
                                        <td>{{ $collection->user->full_name ?? $collection->user->username }} <br> {{ $collection->user->email }}</td>

                                        <td>{{ $collection->collectionVideos->count() }}</td>
                                        <td>
                                            @foreach($collection->collectionVideos as $collectionVideo)
                                                - <a target="_blank" href="{{ route('videos_show', ['id' => $collectionVideo->alpha_id]) }}">
                                                    {{ $collectionVideo->video->alpha_id }}</a>
                                                (£{{$collectionVideo->final_price}})<br>
                                            @endforeach
                                        </td>
                                        <td>{{ $collection->collectionStories->count() }}</td>
                                        <td>
                                            @foreach($collection->collectionStories as $collectionStory)
                                                - <a target="_blank" href="{{ route('videos_shows', ['id' => $collectionStory->alpha_id]) }}">
                                                    {{ $collectionStory->story->alpha_id }}</a>
                                                (£{{$collectionStory->final_price}})<br>
                                            @endforeach
                                        </td>
                                        <td>{{ ucwords($collection->status) }}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </tbody>
                    @endif
                @endforeach
            </table>
        </div>
    </div>

@endsection
