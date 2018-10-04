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
                        <input type="text" class="form-control" name="s" id="search-input" placeholder="Search..."
                               value="{{ Request::get('s') }}">
                        <i class="fa fa-search"></i>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="clear"></div>

    <div class="panel">

        <div class="panel-body">
            @foreach($companies as $company)
                @if($company->collections->count() > 0)
                    <table class="table table-bordered">
                        <thead>
                        <th style="width: 90%;" colspan="2">
                            <a target="_blank" href="{{ route('clients.edit', $company->id) }}">{{ $company->name }}
                                <i class="fa fa-external-link"></i>
                            </a>

                            <small class="pull-right">
                                Videos: {{ $company['collectionVideosCount'] }}
                                Stories: {{ $company['collectionStoriesCount'] }}
                            </small>
                        </th>

                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <table class="table table-striped table-condensed table-bordered"
                                       style="width:100%; overflow-x:scroll;">
                                    <thead>
                                    <th class="text-center">
                                        <small>Type</small>
                                    </th>
                                    <th class="text-center">
                                        <small>Collection Name</small>
                                    </th>
                                    <th class="text-center">
                                        <small>User</small>
                                    </th>
                                    <th class="text-center">
                                        <small>Asset</small>
                                    </th>
                                    <th class="text-center">
                                        <small>Status</small>
                                    </th>
                                    <th class="text-center">
                                        <small>Reason</small>
                                    </th>
                                    <th class="text-center">
                                        <small>Licenced At</small>
                                    </th>
                                    <th class="text-center">
                                        <small>Until</small>
                                    </th>
                                    <th class="text-center">
                                        <small>Quote</small>
                                    </th>
                                    </thead>
                                    <tbody>
                                    @foreach($company->collections as $collection)
                                        @if($collection->collectionVideos && $collection->collectionVideos->count() > 0)
                                            @foreach($collection->collectionVideos as $collectionVideo)
                                                @include('admin.collections.partials.asset_listing', ['collectionAsset' => $collectionVideo, 'type' => 'video'])
                                            @endforeach
                                        @endif

                                        @if($collection->collectionStories && $collection->collectionStories->count() > 0)
                                            @foreach($collection->collectionStories as $collectionStory)
                                                @include('admin.collections.partials.asset_listing', ['collectionAsset' => $collectionStory, 'type' => 'story'])
                                            @endforeach
                                        @endif
                                    @endforeach
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                @endif
            @endforeach
        </div>
    </div>

@stop
