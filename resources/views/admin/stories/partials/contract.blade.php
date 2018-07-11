@if(($story->currentContract) && ($story->contact))
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Contract {{ ($story->currentContract->signed_at) ? 'Agreed' : (($story->currentContract->sent_at) ? 'Sent' : 'Draft') }}</div>
                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>
            <div class="panel-body" style="display: block; background: #fcfcfc;">

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group input-group">
                            <span class="input-group-addon">Upfront Payment</span>
                            <input type="text" class="form-control" disabled="disabled" value="{{
                                   $story->currentContract->upfront_payment }} {{
                                   (key_exists($story->currentContract->upfront_payment_currency_id, config('currencies'))) ?
                                   config('currencies')[$story->currentContract->upfront_payment_currency_id]['abbreviation']
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
                                   value="{{ $story->currentContract->revenue_share }}%">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group input-group">
                            <span class="input-group-addon">Success System</span>
                            <textarea class="form-control" disabled="disabled">{{
                            (key_exists($story->currentContract->success_system, config('success_system'))) ?
                            config('success_system')[$story->currentContract->success_system]
                            : ''
                            }}</textarea>
                        </div>
                    </div>
                </div>

                @if(key_exists($story->currentContract->contract_model_id, config('contracts')))
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group input-group">
                            <span class="input-group-addon">Contract Template</span>
                            <input type="text" class="form-control" disabled="disabled" value="{!!
                            config('contracts')[$story->currentContract->contract_model_id]['name']
                            !!}">
                        </div>
                    </div>
                </div>
                @endif

                @if($story->currentContract->signed_at)
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group input-group">
                            <span class="input-group-addon">Signed</span>
                            <input type="text" class="form-control" disabled="disabled" value="{{
                        date('l, jS F Y - H:i:s', strtotime($story->currentContract->signed_at))
                        }}">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group input-group">
                            <span class="input-group-addon">IP Address</span>
                            <input type="text" class="form-control" disabled="disabled" value="{{
                        $story->currentContract->ip
                        }}">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group input-group">
                            <span class="input-group-addon">User Agent</span>
                            <textarea class="form-control" disabled="disabled" rows="4">{{
                        $story->currentContract->user_agent
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
                        route('contract.accept', ['token' => $story->currentContract->token])
                        }}</textarea>
                        </div>
                    </div>
                </div>
                @endif

                <div class="col-md-12">
                    <div class="input-group pull-right">
                        @if(!$story->currentContract->signed_at)
                            @if($story->currentContract->sent_at)
                            <p>{{ 'Sent:' . \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $story->currentContract->sent_at)->diffForHumans().' ' }}
                                <a href="{{ route('contract.send', ['type' => 'story', 'id' => $story->id]) }}" class="btn btn-info" id="sendContract">
                                    Resend Contract
                                </a>
                            </p>
                            @else
                            <p>
                                <a href="{{ route('contract.send', ['type' => 'story', 'id' => $story->id]) }}" class="btn btn-info" id="sendContract">
                                    Send Contract
                                </a>
                            </p>
                            @endif
                        @endif
                    </div>

                    @if(!$story->currentContract->signed_at)
                        <div class="input-group text-center">
                            <a href="{{ route('contract.delete', ['id' => $story->currentContract->id]) }}"
                               class="btn btn-danger">
                                Delete
                            </a>
                        </div>
                    @endif
                </div>

            </div>


        </div>

@elseif($story->contact)
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
