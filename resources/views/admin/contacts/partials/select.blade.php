<span class="form-group">
    <?php if(Session::get('contact_id')){ $contact_id = Session::get('contact_id'); }else if(isset($asset) && $asset->contact_id){ $contact_id = $asset->contact_id; } ?>

    <div id="selectpicker-creator" class="input-group">
        <span class="input-group-addon">Contact</span>
        <input type="text" id="js-autocomplete-contact" class="form-control" name="contact" id="contact" placeholder="Search contacts" value="{{ isset($contact_id) ? \App\Contact::find($contact_id)->email : '' }}" />

        <span class="input-group-btn">
            <button id="contact-add" class="btn btn-default js-contact" type="button" data-toggle="modal" data-target="#add_contact_modal">New</button>
        </span>
    </div>

    <input type="hidden" id="js-contact-id" name="contact_id" value="{{ isset($contact_id) ? $contact_id : ''  }}" />
</span>