<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <h4>
            <b>
                @if(\Carbon\Carbon::parse($asset->created_at) < \Carbon\Carbon::now()->subDay())
                    <span class="label label-danger">{{ \Carbon\Carbon::parse($asset->created_at)->diffForHumans() }}</span>
                @else
                    <span class="label label-success">{{ \Carbon\Carbon::parse($asset->created_at)->diffForHumans() }}</span>
                @endif
                <b>{{ $collection->name }} : ({{ $collection->{'collection'.str_plural($type)}->count() }} video)</b>
            </b>
       </h4>

        <b title="{{ $asset->collection->user->email }}">
            {{ $asset->collection->user->full_name
            ?? $asset->collection->user->username }} @ {{ $asset->collection->user->client->name }}
            @if($asset->collection->user->tel) -
                <b>{{ $asset->collection->user->tel }}</b>
            @endif
        </b>
    </div>

    <div class="panel-body">
        <div class="row">
            <div class="col-lg-12">
                {{--Title --}}
                <div class="col-lg-6">
                    <h3 class="title">
                        <a target="_blank" href="{{ url('admin/videos/edit/'.$asset->{$type}->alpha_id) }}">
                            {{ $asset->{$type}->title }} <i class="fa fa-external-link"></i>
                        </a>
                    </h3>
                </div>
                {{-- Quote Input--}}
                <div class="col-lg-6">
                    @if($asset->final_price)
                         <div class="form-group input-group">
                            <span class="input-group-addon">Quote <b class="pull-right">£</b></span>
                            <input value="{{ number_format($asset->final_price) }}" name="final_price" type="text" class="form-control" disabled>
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-danger pull-right">Retract</button>
                            </span>
                        </div>
                    @elseif($asset->collection->client->active)
                        <div class="form-group input-group">
                            <span class="input-group-addon">Quote <b class="pull-right">£</b></span>
                            <input placeholder="10000" value="{{ $asset->final_price }}" name="final_price" type="text" class="form-control">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="submit">Submit</button>
                            </span>
                        </div>
                    @else
                        <a class="btn btn-danger pull-right" href="{{ url('/admin/clients/edit', $asset->collection->client->id) }}">Moderate</a>
                    @endif
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            {{-- Image --}}
            <div class="col-lg-6">
                <img src="{{ $asset->{$type}->thumb }}" width="100%">
            </div>
            {{-- License Terms --}}
            <div class="col-lg-6">
                @if($asset->collection->client->name)<p>Name: <b>{{ $asset->collection->user->client->name }} </b></p>@endif
                @if($asset->collection->client->region)<p>Region: <b>{{ config('pricing.region.'.$asset->collection->client->region.'.name') }} </b></p>@endif
                @if($asset->collection->client->tier)<p>Tier: <b>{{ config('pricing.tier.'.$asset->collection->client->tier.'.name') }} </b></p>@endif
                @if($asset->type)<p>License: <b>{{ config('pricing.type.'.$asset->type.'.name') }} </b></p>@endif
                @if($asset->platform)<p>Platform: <b>{{ config('pricing.platform.'.$asset->platform.'.name') }} </b></p>@endif
                @if($asset->length)<p>License Length: <b>{{ config('pricing.length.'.$asset->length.'.name') }} </b></p>@endif
            </div>
        </div>

        <div class="col-lg-6">
            {{-- Notes --}}
            @if($asset->notes)
                <label for="notes">Notes</label>
                <textarea class="form-control" id="notes" rows="7" disabled>{{ $asset->notes }}</textarea>
            @endif
        </div>
    </div>
</div>