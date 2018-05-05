<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Create Contact for this Video</h4>
            </div>
            <div class="modal-body">
                <form method="POST" action="{{ ($video) ? route('contacts.create') : route('contacts.store') }}" accept-charset="UTF-8">
                    <input type="hidden" id="id" name="id" value="{{ $video->alpha_id }}"/>
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
                                <input type="text" class="form-control" id="location" name="upfront_payment"
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
                                    @for($y=1; $y <= 3; $y++)
                                        <option value="">--</option>
                                        @for($i=(50); $i <= (150); $i = ($i+50))
                                            <option value="{{ $i }}" {{ ((($video) && ($video->contract['success_system'] == $i)) || (old('success_system') == $i)) ? 'selected="selected"' : '' }}>
                                                {{ $i*$y }}&pound;
                                                =>
                                                {{ number_format($i * 100000, 2, ',', ',') }} views
                                            </option>
                                        @endfor
                                    @endfor
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
                    <textarea class="form-control" name="credit" id="credit" rows="3" title="">{{
                    ($video) ? $video->contract['credit'] : ''
                    }}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <input type="hidden" value="{{ $video->id or '' }}" name="video_id" title="video_id"
                                   id="video_id">
                            {{ csrf_field() }}
                            {{ ($video) ? method_field('PUT') : method_field('POST') }}
                            <input type="submit" value="{{ ($video) ? 'Update' : 'Create' }} Contact"
                                   class="btn btn-success pull-right"/>
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