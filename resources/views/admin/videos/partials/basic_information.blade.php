<form method="POST" action="{{ route('videos.store') }}" id="video-create-form" name="video-create-form"
      accept-charset="UTF-8" file="1" enctype="multipart/form-data">
    <div class="row">
        <div class="col-md-12">
            <h2>Add Contact</h2>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            @include('admin.videos.partials.choose_contact')
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h2>Initial Copy</h2>
            @include('admin.videos.partials.copy')
            <input type="submit" class="btn btn-primary" value="Save &rarr;"/>
        </div>
    </div>
    {{ csrf_field() }}
</form>