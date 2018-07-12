@if(($video->currentContract) && ($video->contact))
    <div class="row">
        <div class="col-md-8">
            <h2>
                Contract
                {{ ($video->currentContract->signed_at) ? 'Agreed' : (($video->currentContract->sent_at) ? 'Sent' : 'Draft') }}
            </h2>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Sent By</span>
                        <input type="text" class="form-control" disabled="disabled" value="{{ \App\User::find($video->currentContract->user_id)->full_name }}">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Upfront Payment</span>
                        <input type="text" class="form-control" disabled="disabled" value="{{
                               $video->currentContract->upfront_payment }} {{
                               (key_exists($video->currentContract->upfront_payment_currency_id, config('currencies'))) ?
                               config('currencies')[$video->currentContract->upfront_payment_currency_id]['abbreviation']
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
                               value="{{ $video->currentContract->revenue_share }}%">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Success System</span>
                        <textarea class="form-control" disabled="disabled">{{
                        (key_exists($video->currentContract->success_system, config('success_system'))) ?
                        config('success_system')[$video->currentContract->success_system]
                        : ''
                        }}</textarea>
                    </div>
                </div>
            </div>

            @if(key_exists($video->currentContract->contract_model_id, config('contracts')))
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Contract Template</span>
                        <input type="text" class="form-control" disabled="disabled" value="{!!
                        config('contracts')[$video->currentContract->contract_model_id]['name']
                        !!}">
                    </div>
                </div>
            </div>
            @endif

            @if($video->currentContract->signed_at)
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">Signed</span>
                        <input type="text" class="form-control" disabled="disabled" value="{{
                    date('l, jS F Y - H:i:s', strtotime($video->currentContract->signed_at))
                    }}">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">IP Address</span>
                        <input type="text" class="form-control" disabled="disabled" value="{{
                    $video->currentContract->ip
                    }}">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group input-group">
                        <span class="input-group-addon">User Agent</span>
                        <textarea class="form-control" disabled="disabled" rows="4">{{
                    $video->currentContract->user_agent
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
                    route('contract.accept', ['token' => $video->currentContract->token])
                    }}</textarea>
                    </div>
                </div>
            </div>
            @endif
        </div>


        <div class="col-md-12">
            <div class="input-group pull-right">
                @if(!$video->currentContract->signed_at)
                    @if($video->currentContract->sent_at)
                    <p>{{ 'Sent:' . \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $video->currentContract->sent_at)->diffForHumans().' ' }}
                        <a href="{{ route('contract.send', ['type' => 'video', 'id' => $video->id]) }}" class="btn btn-info" id="sendContract">
                            Resend Contract
                        </a>
                    </p>
                    @else
                    <p>
                        <a href="{{ route('contract.send', ['type' => 'video', 'id' => $video->id]) }}" class="btn btn-info" id="sendContract">
                            Send Contract
                        </a>
                    </p>
                    @endif
                @endif
            </div>

            @if(!$video->currentContract->signed_at)
                <div class="input-group text-center">
                    <a href="{{ route('contract.delete', ['id' => $video->currentContract->id]) }}"
                       class="btn btn-danger">
                        Delete
                    </a>
                </div>
            @endif
        </div>
    </div>
@elseif($video->contact)
    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#contract_modal">
        Create Contract
    </button>
@else
    <p>
        We cannot create a contract if the video is not assigned to a creator/contact. Perhaps the contact has unsubscribed.
    </p>
@endif
