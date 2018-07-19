<span class="form-group">
    <?php
        if(Session::get('contact_id')){
        	$contact_id = Session::get('contact_id');
        	$contact = \App\Contact::find($contact_id);
        }
    ?>

    <div id="selectpicker-creator" class="input-group">
        <span class="input-group-addon">Contact</span>
        <input type="text" id="js-autocomplete-contact" class="form-control" name="contact" id="contact" placeholder="Search contacts" value="{{ isset($contact) ? $contact->full_name : '' }}" />

        <span class="input-group-btn">
            <button id="contact-add" class="btn btn-default js-contact" type="button" data-toggle="modal" data-target="#add_contact_modal">{{ isset($contact) ? 'Edit' : 'New' }}</button>
        </span>
    </div>

    <input type="hidden" id="js-contact-id" name="contact_id" value="{{ isset($contact) ? $contact->id : ''  }}" />
</span>