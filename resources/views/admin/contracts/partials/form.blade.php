@if(($asset->currentContract) && ($asset->contact))
<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Contract {{ ($asset->currentContract->signed_at) ? 'Agreed' : (($asset->currentContract->sent_at) ? 'Sent' : 'Draft') }}</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block; background: #fcfcfc;">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group input-group">
                    <span class="input-group-addon">Sent By</span>
                    <input type="text" class="form-control" disabled="disabled" value="{{ \App\User::find($asset->currentContract->user_id)->full_name }}">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Upfront Payment</span>
                    <input type="text" class="form-control" disabled="disabled" value="{{
                               $asset->currentContract->upfront_payment }} {{
                               (key_exists($asset->currentContract->upfront_payment_currency_id, config('currencies'))) ?
                               config('currencies')[$asset->currentContract->upfront_payment_currency_id]['abbreviation']
                               : ''
                         }}">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="form-group input-group">
                    <span class="input-group-addon">Revenue Share</span>
                    <input type="text" class="form-control" disabled="disabled"
                           value="{{ $asset->currentContract->revenue_share }}%">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="form-group input-group">
                    <span class="input-group-addon">Success System</span>
                    <textarea class="form-control" disabled="disabled">{{
                        (key_exists($asset->currentContract->success_system, config('success_system'))) ?
                        config('success_system')[$asset->currentContract->success_system]
                        : ''
                        }}</textarea>
                </div>
            </div>
        </div>

        @if(key_exists($asset->currentContract->contract_model_id, config('contracts')))
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Contract Template</span>
                        <input type="text" class="form-control" disabled="disabled" value="{!!
                        config('contracts')[$asset->currentContract->contract_model_id]['name']
                        !!}">
                    </div>
                </div>
            </div>
        @endif

        @if($asset->currentContract->signed_at)
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Signed</span>
                        <input type="text" class="form-control" disabled="disabled" value="{{
                    date('l, jS F Y - H:i:s', strtotime($asset->currentContract->signed_at))
                    }}">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">IP Address</span>
                        <input type="text" class="form-control" disabled="disabled" value="{{
                    $asset->currentContract->ip
                    }}">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">User Agent</span>
                        <textarea class="form-control" disabled="disabled" rows="4">{{
                    $asset->currentContract->user_agent
                    }}</textarea>
                    </div>
                </div>
            </div>
        @else
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Contract Link</span>
                        <textarea class="form-control" disabled="disabled" rows="2">{{
                    route('contract.accept', ['token' => $asset->currentContract->token])
                    }}</textarea>
                    </div>
                </div>
            </div>
        @endif

        <div class="row">
            <div class="col-md-12">
                <div class="input-group pull-right">
                    @if(!$asset->currentContract->signed_at)
                        @if($asset->currentContract->sent_at)
                            <p>{{ 'Sent:' . \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $asset->currentContract->sent_at)->diffForHumans().' ' }}
                                <a href="{{ route('contract.send', ['type' => $asset_type, 'id' => $asset->id]) }}" class="btn btn-info" id="sendContract">
                                    Resend Contract
                                </a>
                            </p>
                        @else
                            @if($asset->contact && !$asset->contact->email)
                            <span class="text-danger">
                               Contact must have email address!
                            </span>
                            @else
                            <p>
                                <a href="{{ route('contract.send', ['type' => $asset_type, 'id' => $asset->id]) }}" class="btn btn-info" id="sendContract">
                                    Send Contract
                                </a>
                            </p>
                            @endif
                        @endif
                    @endif
                </div>

                @if(!$asset->currentContract->signed_at)
                    <div class="input-group text-center">
                        <a href="{{ route('contract.delete', ['id' => $asset->currentContract->id]) }}"
                           class="btn btn-danger">
                            Delete
                        </a>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@elseif($asset->contact)
<button type="button" class="btn btn-info pull-right" data-toggle="modal" data-target="#contract_modal">
    Create Contract
</button>

<div class="clear"></div>
@else
<p>
    We cannot create a contract if the story is not assigned to a creator/contact. Perhaps the contact has unsubscribed.
</p>
@endif
<br />
