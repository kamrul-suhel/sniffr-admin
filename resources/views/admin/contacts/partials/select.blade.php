<div class="form-group">
    <?php
        if(Session::get('contact_id')){
        	$contact_id = Session::get('contact_id');
        	$contact = \App\Contact::find($contact_id);
        }
    ?>

    <div id="selectpicker-creator" class="input-group">
        <span class="input-group-addon">
             @if($asset && $asset->contact)
                @if($asset->contact->blacklist)
                    <span><i class="fa fa-flag" style="color:red"></i></span>
                @endif
                @if($asset->contact->whitelist)
                    <span style="color:green;"><i class="fa fa-flag" style="color:green"></i></span>
                @endif
            @endif
            Contact{!! isset($contact) ? '<span class="pull-right"><a href="'.route('contacts.edit', $contact->id).'" target=_blank"><i class="fa fa-external-link"></i></a></span>' : '' !!}
        </span>

        <input type="text" id="js-autocomplete-contact" class="form-control" name="contact" id="contact" placeholder="Search contacts" value="{{ isset($contact) ? $contact->full_name : '' }}" />

        <span class="input-group-btn">
            <button id="contact-add" class="btn btn-default js-contact" type="button" data-toggle="modal" data-target="#add_contact_modal">{{ isset($contact) ? 'Edit' : 'New' }}</button>
        </span>
    </div>

    <input type="hidden" id="js-contact-id" name="contact_id" value="{{ isset($contact) ? $contact->id : ''  }}" />
</div>