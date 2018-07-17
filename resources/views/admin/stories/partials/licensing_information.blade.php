<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Licensing Information</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block;">
        <span class="input-group">
            <span class="input-group-addon">
                Source URL
            </span>

            <input type="text" class="form-control js-story-get-source" name="source" id="source" placeholder="" value="{{ isset($asset) ? $asset->source : '' }}" />
        </span>

        <br />

        <span class="input-group">
            <div class="input-group" id="selectpicker-creator">
                <span class="input-group-addon">Contact</span>
                {{ Form::text('js-autocomplete-contact', '', ['id' =>  'js-autocomplete-contact', 'placeholder' =>  'Search contacts', 'class' => 'form-control'])}}
            </div>

            <span class="input-group-btn">
                <button id="contact-add" class="btn btn-default js-contact" type="button" data-toggle="modal" data-target="#add_contact_modal">New</button>
            </span>

            <input type="hidden" id="contact-id" name="contact_id" value="{{ isset($asset) ? $asset->contact_id : ''  }}" />
        </span>

        @if(!empty($asset))

        <br />

        <div class="input-group">
            <label class="checkbox-inline" for="contact_is_owner">
                <input type="checkbox" name="contact_is_owner" id="contact_is_owner" class="js-contact-is-owner" value="1" {{ (isset($asset)  &&  $asset->contact_is_owner==1) ? 'checked' : '' }}>
                Contact is owner
            </label>
            <label class="checkbox-inline" for="allow_publish">
                <input type="checkbox" name="allow_publish" id="allow_publish" class="js-allow-publish" value="1" {{ (isset($asset)  &&  $asset->allow_publish==1) ? 'checked' : '' }}>
                Happy to publish
            </label>
            <label class="checkbox-inline" for="permission">
                <input type="checkbox" name="permission" id="permission" class="js-permission" value="1" {{ (isset($asset)  &&  $asset->permission==1) ? 'checked' : '' }}>
                Has permission
            </label>
        </div>

        <br />

        <span class="input-group has-feedback">
            <span class="input-group-addon">
                Date Sourced
            </span>
            <input type="text" class="form-control" name="sourced_at" id="sourced_at" />
            <i class="glyphicon glyphicon-calendar form-control-feedback"></i>
        </span>
        <br />
        <span class="input-group">
            <span class="input-group-addon">
                Location
            </span>
            <input type="text" class="form-control placepicker" data-map-container-id="locationCollapse" name="location" id="location" value="@if(!empty($asset->location)){{ $asset->location }}@endif" />
            <div id="locationCollapse" class="collapse">
                <div class="placepicker-map thumbnail"></div>
            </div>
        </span>
        <br />
        <span class="input-group">
            <span class="input-group-addon">
                Removed from Social for
            </span>
            <select name="removed_from_social" id="removed_from_social" class="form-control">
                @foreach(config('stories.removed_from_social') as $from)
                <option value="{{ $from }}" {{ (isset($asset)  &&  $asset->removed_from_social==$type) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $from)) }}</option>
                @endforeach
            </select>
        </span>
        <br />
        <span class="input-group">
            <span class="input-group-addon">
                Problem Status
            </span>
            <select name="problem_status" id="problem_status" class="form-control js-problem-status">
                <option value="">No Problem</option>
                @foreach(config('stories.problem_status') as $problem)
                <option value="{{ $problem }}" {{ (isset($asset)  &&  $asset->problem_status==$problem) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $problem)) }}</option>
                @endforeach
            </select>
        </span>
        <br />
        <span class="input-group">
            <span class="input-group-addon">
                Categorisation
            </span>
            <select name="category" id="category" class="form-control drop-5050">
                <option value="">Select vertical</option>
                @foreach($video_categories as $category)
                <option value="{{ $category->id }}" {{ (isset($asset)  &&  $asset->story_category_id==$category->id) ? 'selected' : '' }}>{{ $category->name }}</option>
                @endforeach
            </select>
            <select name="collection" id="collection" class="form-control drop-5050">
                <option value="">Select collection</option>
                @foreach($video_collections as $collection)
                <option value="{{ $collection->id }}" {{ (isset($asset)  &&  $asset->story_collection_id==$collection->id) ? 'selected' : '' }}>{{ $collection->name }}</option>
                @endforeach
            </select>
        </span>
        <br />
        <span class="input-group">
            <span class="input-group-addon">
                Submitted to
            </span>
            <select name="submitted_to[]" id="submitted_to" class="selectpicker js-submitted-to" data-width="100%" title="Select who you submitted to" multiple>
                @foreach(config('stories.submitted_to') as $site)
                <option value="{{ $site }}" {{ (isset($asset) && (in_array($site, explode(',', $asset->submitted_to)))) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $site)) }}</option>
                @endforeach
            </select>
        </span>

        @endif
    </div>
</div>
