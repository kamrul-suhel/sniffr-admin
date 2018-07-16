<div class="row">
    <div class="col-sm-6">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Video Class</div>
                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>
            <div class="panel-body" style="display: block;">
                <select name="class" class="form-control" id="class">
                    @foreach(config('pricing.class') as $key => $value)
                        <option {{ $key === $asset->class ? 'selected': '' }} value="{{ $key }}">{{ $value['modifier'] }}:{{ $value['name'] }}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
</div>