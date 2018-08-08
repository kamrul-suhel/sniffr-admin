@extends('admin.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-md-8">
                <h3>
                    <i class="fa fa-address-book"></i>
                    Contacts
                    <a href="{{ route('contacts.create') }}" class="btn btn-success pull-right">
                        <i class="fa fa-plus-circle"></i>
                        Add New
                    </a>
                </h3>
            </div>
            <div class="col-md-4">
                <form method="get" role="form" class="search-form-full">
                    <div class="form-group">
                        <input type="text" class="form-control" name="s" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}">
                        <i class="fa fa-search"></i>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="clear"></div>

    <table class="table table-striped pages-table">
        <tr class="table-header">
            <th>Name</th>
            <th>Email</th>
            <th>Videos</th>
            <th>Stories</th>
            <th>Edit</th>
        @foreach($contacts as $contact)
            <tr>
                <td>{{ $contact->full_name }}</td>
                <td>{{ $contact->email }}</td>
                <td>{{ count($contact->videos) }}</td>
                <td>{{ count($contact->stories) }}</td>
                <td>
                    <a href="{{ route('contacts.edit', ['id' => $contact->id]) }}" class="btn btn-xs btn-info">
                        <span class="fa fa-edit"></span>
                        Edit
                    </a>
                </td>
            </tr>
        @endforeach
    </table>

    <div class="clear"></div>

    <div class="text-center">{{ $contacts->render() }}</div>
@stop
