{!! Form::open(['method' => 'DELETE', 'route' => ['contacts.destroy', $contact->id], 'id' => 'form-delete-contacts-' . $contact->id]) !!}
<a href="" class="btn btn-danger delete" data-form="contacts-{{ $contact->id }} ">
    <i class="fa fa-trash-o"></i>
    Delete
</a>
{!! Form::close() !!}