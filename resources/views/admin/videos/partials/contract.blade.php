@if(($video->currentContract) && ($video->contact))
    <div class="row">
        <div class="col-md-6">
            <h2>Current Contract</h2>
            <div class="row">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">Upfront Payment</span>
                        <input type="text" class="form-control" disabled="disabled"
                               value="{{ $video->currentContract->upfront_payment }}">
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
                        <input type="text" class="form-control" disabled="disabled" value="{{
                (key_exists($video->currentContract->success_system, config('success_system'))) ?
                config('success_system')[$video->currentContract->success_system]
                : ''
                }}">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">Success System</span>
                        <textarea class="form-control" disabled="disabled">{{
                        $video->currentContract->credit
                        }}</textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6 text-center">
            <h2>Send Contract By Email</h2>

            <a href="{{ route('contract.send', ['id' => $video->id]) }}" class="btn btn-info btn-lg">
                Send to {{ $video->contact->email }}
            </a>
        </div>
    </div>
@elseif($video->contact)
    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#contract_modal">
        Create Contract
    </button>
@else
    <p>
        Can't create/send a contract if there the video is not assigned to a creator
    </p>
@endif
