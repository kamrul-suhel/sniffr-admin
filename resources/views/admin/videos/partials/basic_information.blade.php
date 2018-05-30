<form method="POST" action="{{ route('videos.store') }}" id="video-create-form" name="video-create-form"
      accept-charset="UTF-8" file="1" enctype="multipart/form-data">
    <div class="row">
        <div class="col-md-12">
            <h2>1- Add/Choose a Creator</h2>
        </div>
    </div>

    @include('admin.videos.partials.choose_creator')

    <div class="row">
        <div class="col-md-6">
            <h2>2- Initial Copy</h2>
            @include('admin.videos.partials.copy')
            <input type="submit" class="btn btn-primary btn-lg" value="Save &rarr;"/>
        </div>
    </div>
    {{ csrf_field() }}
</form>