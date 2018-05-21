@if(($video->currentContract) && ($video->contact))
    <div class="row">
        <div class="col-md-8">
            <h2>
                {{ ($video->currentContract->signed_at) ? '' : 'Proposed' }}
                Contract
            </h2>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
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
                    <div class="input-group">
                        <span class="input-group-addon">Revenue Share</span>
                        <input type="text" class="form-control" disabled="disabled"
                               value="{{ $video->currentContract->revenue_share }}%">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">Success System</span>
                        <textarea class="form-control" disabled="disabled">{{
                (key_exists($video->currentContract->success_system, config('success_system'))) ?
                config('success_system')[$video->currentContract->success_system]
                : ''
                }}</textarea>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">Credit</span>
                        <textarea class="form-control" disabled="disabled">{{
                        $video->currentContract->credit
                        }}</textarea>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">Notes</span>
                        <textarea class="form-control" disabled="disabled">{{
                        $video->currentContract->notes
                        }}</textarea>
                    </div>
                </div>

                @if($video->currentContract->signed_at)
                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">Signed At</span>
                            <input type="text" class="form-control" disabled="disabled" value="{{
                        date('l jS \of F Y h:i:s A', strtotime($video->currentContract->signed_at))
                        }}">
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">IP Address</span>
                            <input type="text" class="form-control" disabled="disabled" value="{{
                        $video->currentContract->ip
                        }}">
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">User Agent</span>
                            <textarea class="form-control" disabled="disabled" rows="4">{{
                        $video->currentContract->user_agent
                        }}</textarea>
                        </div>
                    </div>

                @else
                    <div class="col-md-12">
                        <div class="input-group">
                            <span class="input-group-addon">Contract Link</span>
                            <textarea class="form-control" disabled="disabled" rows="2">{{
                        route('contract.accept', ['token' => $video->currentContract->token])
                        }}</textarea>
                        </div>
                    </div>
                @endif
            </div>
            @if(!$video->currentContract->signed_at)
                <div class="input-group text-center">
                    <a href="{{ route('contract.delete', ['id' => $video->currentContract->id]) }}"
                       class="btn btn-warning btn-lg">
                        Delete
                    </a>
                </div>
            @endif
        </div>

        @if(!$video->currentContract->signed_at)
            <div class="col-md-4 text-center">
                <div class="input-group">
                    <h4>Send Contract to {{ $video->contact->email }}</h4>

                    <a href="{{ route('contract.send', ['id' => $video->id]) }}" class="btn btn-info btn-lg">
                        Send
                    </a>
                </div>
            </div>
        @endif
    </div>
@elseif($video->contact)
    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#contract_modal">
        Create Contract
    </button>
@else
    <p>
        We cannot create a contract if the video is not assigned to a creator/contact. Perhaps the contact has unsubscribed.
    </p>
@endif
