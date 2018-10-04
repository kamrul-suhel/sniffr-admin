<ol class="breadcrumb">
    <li>
        <a href="/admin/contacts">
            <i class="fa fa-newspaper-o"></i>
            All Contacts
        </a>
    </li>
    <li class="active">
        <strong>
            {{ ($contact) ? $contact->full_name : 'New Contact' }}
        </strong>
    </li>
</ol>

<div class="clear"></div>