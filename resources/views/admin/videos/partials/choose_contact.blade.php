<span class="input-group">
    <div class="input-group" id="selectpicker-contact">
        <span class="input-group-addon">Contact</span>
        {{ Form::text('js-autocomplete-contact', '', ['id' =>  'js-autocomplete-contact', 'placeholder' =>  'Search contacts', 'class' => 'form-control'])}}
    </div>

    @if(!$video)
    <span class="input-group-btn">
        <button id="contact-add" class="btn btn-default js-contact" type="button" data-toggle="modal" data-target="#add_contact_modal">New Contact</button>
    </span>
    @endif

    <input type="hidden" id="contact-id" name="contact_id" value="{{ $video ? $video->contact_id : '' }}" />
</span>