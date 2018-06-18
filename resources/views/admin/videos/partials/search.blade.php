<div class="col-sm-12">
    <form id="search-form" method="get" role="form" class="search-form-full" action="/admin/videos">
        <div class="form-group">
            <input type="text" class="form-control" name="s" id="search-input"
                   placeholder="Search..." value="{{ Request::get('s') }}">
            <i class="fa fa-search"></i>
        </div>
    </form>
</div>