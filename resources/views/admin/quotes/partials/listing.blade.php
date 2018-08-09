<div class="panel panel-primary">
    <div class="panel-heading">
        <div class="col-lg-6">
            <h5>
                <b>
                    @if(\Carbon\Carbon::parse($asset->created_at) < \Carbon\Carbon::now()->subDay())
                        <span class="label label-success">{{ \Carbon\Carbon::parse($asset->created_at)->diffForHumans() }}</span>
                    @else
                        <span class="label label-success">{{ \Carbon\Carbon::parse($asset->created_at)->diffForHumans() }}</span>
                    @endif
                    <b>{{ $collection->name }} :
                        ({{ $collection->{'collection'.str_plural($type)}->count() }} {{ ucwords($type) }})</b>
                </b>
            </h5>
        </div>
        <div class="col-lg-6">
            <b class="pull-right" title="{{ $asset->collection->user->email }}">
                {{ $asset->collection->user->full_name
                ?? $asset->collection->user->username }}
                @ {{ $asset->collection->user->client ?  $asset->collection->user->client->name : 'No Company' }}
                @if($asset->collection->user->tel) -
                <b>{{ $asset->collection->user->tel }}</b>
                @endif
            </b>
        </div>
    </div>

    <div class="panel-body">
        <div class="row">
            <div class="col-lg-12">
                {{--Title --}}
                <div class="col-lg-7">
                    <h4 class="title">
                        <a target="_blank"
                           href="{{ url('admin/'.str_plural($type).'/edit/'.$asset->{$type}->alpha_id) }}">
                            {{ $asset->{$type}->title }} <i class="fa fa-external-link"></i>
                        </a>
                    </h4>
                </div>

                {{-- Quote Input--}}
                <div class="col-lg-5">
                    @if($asset->final_price)
                        <div class="form-group input-group">
                            <span class="input-group-addon">Quote <b class="pull-right">£</b></span>
                            <input value="{{ number_format($asset->final_price) }}" name="final_price" type="text"
                                   class="form-control" disabled>
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-danger pull-right">Retract</button>
                            </span>
                        </div>
                    @elseif($asset->collection->client && $asset->collection->client->active)
                        <div class="form-group input-group">
                            <span class="input-group-btn">
                                <a class="btn btn-warning" onClick="toggleLicenseChanges({{$asset->id}})">Neg.</a>
                                <button type="submit" id="{{$asset->id}}_update-quote" name="update-quote" value="true"
                                        disabled
                                        class="btn btn-warning">Update</button>
                            </span>
                            <span class="input-group-addon" style="min-width: 80px;">Quote <b
                                        class="pull-right">£</b>
                            </span>
                            <input placeholder="{{ isset($matrixPrice) ? 'Matrix £:'. $matrixPrice : '1000' }}"
                                   value="{{ $asset->final_price }}" name="final_price" type="text"
                                   class="form-control">
                            <span class="input-group-btn">
                                <button style="border-radius: 0px;"
                                        onClick="return confirm('Are you sure you want to submit this quote?');"
                                        class="btn btn-success" type="submit">Submit</button>
                            </span>
                            @if($asset->status !== 'offered')
                                <span class="input-group-btn">
                                    <button style="border-radius: 0px;"
                                            onClick="return confirm('Are you sure you want to ignore this quote?');"
                                            class="btn btn-danger pull-right" name="delete" value="true" type="submit">Reject</button>
                                </span>
                            @endif
                        </div>
                    @else
                        @if($asset->collection->client)
                            <a class="btn btn-danger pull-right"
                               href="{{ url('/admin/clients/edit', $asset->collection->client->id) }}">Moderate
                                Company</a>
                        @else
                            <a class="btn btn-danger pull-right"
                               href="{{ url('/admin/users/'.$asset->collection->user->id.'/edit') }}">Moderate User</a>
                        @endif
                    @endif
                </div>
            </div>
        </div>

        <div class="col-lg-12">
            {{-- Image --}}
            <div class="col-lg-3">
                <img src="{{ $asset->{$type}->thumb ?? $asset->{$type}->image }}" width="100%">
            </div>
            {{-- Company Terms --}}
            <div class="col-lg-2">
                <h6><u>Company</u></h6>
                @if($asset->collection->client)<p>Name: <b>{{ $asset->collection->user->client->name }} </b></p>@endif
                @if($asset->collection->client)<p>
                    Region:<b>{{ config('pricing.region.'.$asset->collection->client->region.'.name') }} </b></p>@endif
                @if($asset->collection->client)<p>
                    Tier:<b>{{ config('pricing.tier.'.$asset->collection->client->tier.'.name') }} </b></p>@endif
            </div>
            {{-- License Terms --}}
            <div class="col-lg-2" id="neg-license-terms">
                <h6><u>Quote</u></h6>
                @if($asset->type)
                    <p>License: <b>{{ config('pricing.type.'.$asset->type.'.name') }} </b></p>
                @endif
                <select name="license_type" id="{{$asset->id}}_license_type" disabled hidden>
                    @foreach(config('pricing.type') as $key => $value)
                        <option @if($asset->type == $key) selected
                                @endif value="{{$key}}">{{ ucwords($value['name']) }} -
                            (x{{ $value['modifier'] }})
                        </option>
                    @endforeach
                </select>
                @if($asset->platform)
                    <p>Platform: <b>{{ ucwords(str_replace(',',', ', $asset->platform)) }} </b></p>
                @endif
                <select multiple="multiple" name="license_platform[]" id="{{$asset->id}}_license_platform" disabled
                        hidden>
                    @foreach(config('pricing.platform') as $key => $value)
                        <option @if($asset->platform == $key) selected="selected"
                                @endif value="{{$key}}">{{ ucwords($value['name']) }} - (x{{ $value['modifier'] }})
                        </option>
                    @endforeach
                </select>
                @if($asset->length)
                    <p>License Length: <b>{{ config('pricing.length.'.$asset->length.'.name') }} </b></p>
                @endif
                <select name="license_length" id="{{$asset->id}}_license_length" disabled hidden>
                    @foreach(config('pricing.length') as $key => $value)
                        <option @if($asset->length == $key) selected
                                @endif value="{{$key}}">{{ ucwords($value['name']) }} -
                            (x{{ $value['modifier'] }})
                        </option>
                    @endforeach
                </select>
            </div>
            {{-- Notes --}}
            <div class="col-lg-3">
                @if($asset->notes)
                    <label for="notes">
                        <small>Notes</small>
                    </label>
                    <textarea style="font-size:9pt;" class="form-control" id="notes" rows="6"
                              disabled>{{ $asset->notes }}</textarea>
                @endif
            </div>
            {{-- Rejection Notes --}}
            <div class="col-lg-2">
                @if($asset->quotes->count())
                    <label for="notes">
                        <small>Rejection Notes</small>
                    </label>
                    <textarea style="font-size:9pt;" class="form-control" id="notes" rows="6"
                              disabled>{{ $asset->rejection_notes }}</textarea>
                @endif
            </div>
        </div>


    </div>
</div>

<script>
    function toggleLicenseChanges(assetId) {
        let update_button = $("#" + assetId + "_update-quote");
        let license_length = $("#" + assetId + "_license_length");
        let license_platform = $("#" + assetId + "_license_platform");
        let license_type = $("#" + assetId + "_license_type");

        if (update_button.prop('disabled') === true) {
            update_button.prop('disabled', false);
        } else {
            update_button.prop('disabled', true);
        }

        license_length.toggle();
        if (license_length.prop('disabled') === true) {
            license_length.prop('disabled', false);
        } else {
            license_length.prop('disabled', true);
        }
        license_platform.toggle();
        if (license_platform.prop('disabled') === true) {
            license_platform.prop('disabled', false);
        } else {
            license_platform.prop('disabled', true);
        }
        license_type.toggle();
        if (license_type.prop('disabled') === true) {
            license_type.prop('disabled', false);
        } else {
            license_type.prop('disabled', true);
        }

    }
</script>
