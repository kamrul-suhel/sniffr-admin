<div id="contract_modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Create Contract for this Video</h4>
            </div>
            <div class="modal-body">
                <form method="POST" action="{{ route('contract.store') }}" accept-charset="UTF-8">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">Revenue share</span>
                                <select type="text" class="form-control" id="revenue_share" name="revenue_share"
                                        title="revenue_share">
                                    <option value="">--</option>
                                    @for($i=0; $i <= 100; $i = $i+5)
                                        <option value="{{ $i }}" {{ ((($video) && ($video->contract['revenue_share'] == $i)) || (old('revenue_share') == $i)) ? 'selected="selected"' : '' }}>
                                            Sniffer {{ 100 - $i }} %
                                            -
                                            Creator {{ $i }} %
                                        </option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">Upfront Payment</span>
                                <input type="text" class="form-control" id="upfront_payment" name="upfront_payment" title="upfront_payment"
                                       value="{{ $video->contract->upfront_payment or old('upfront_payment') }}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <span class="input-group-addon">Success System</span>
                                <select type="text" class="form-control" id="success_system" name="success_system"
                                        title="success system">
                                    <option value="">--</option>
                                    @foreach(config('success_system') as $k => $success_system_option)
                                        <option value="{{ $k }}" {{ (old('success_system') == $k) ? 'selected="selected"' : '' }}>
                                            {{ $success_system_option }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="panel panel-primary" data-collapsed="0">
                                <div class="panel-heading">
                                    <div class="panel-title">
                                        <label for="description">Credit</label>
                                    </div>
                                    <div class="panel-options">
                                        <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <textarea class="form-control" name="credit" id="credit" rows="4" title="">{{
                                    $video->contract['credit']
                                    }}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            {{ csrf_field() }}
                            {{ method_field('POST') }}
                            <input type="hidden" id="video_id" name="video_id" value="{{ $video->id }}"/>
                            <input type="hidden" id="video_alpha_id" name="video_alpha_id" value="{{ $video->alpha_id }}"/>
                            <input type="submit" value="{{ 'Create' }} Contract" class="btn btn-success pull-right"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>