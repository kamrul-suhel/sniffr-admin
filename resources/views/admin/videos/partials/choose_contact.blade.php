<span class="input-group">
    <div class="input-group" id="selectpicker-contact">
        <span class="input-group-addon">Contact</span>
        <input type="text" id="js-autocomplete-contact" class="form-control" name="contact" id="contact" placeholder="Search contacts" value="{{  isset($video) && $video->contact_id ? \App\Contact::find($video->contact_id)->email : '' }}" />
    </div>

    @if(!$video)
    <span class="input-group-btn">
        <button id="contact-add" class="btn btn-default js-contact" type="button" data-toggle="modal" data-target="#add_contact_modal">New Contact</button>
    </span>
    @endif

    <input type="hidden" id="contact-id" name="contact_id" value="{{ $video ? $video->contact_id : '' }}" />
</span>