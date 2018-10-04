@php $contact = $asset->contact ? $asset->contact : '' @endphp
@if($contact)
    @if($contact->blacklist)
        <small style="color: red;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($contact->blacklist_created_at)->diffForHumans() }}</small>
    @endif
    @if($contact->whitelist)
        <small style="color: green;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($contact->whitelist_created_at)->diffForHumans() }}</small>
    @endif

    @if($contact->email)
        <a href="{{ url('admin/contacts/'.$contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-envelope"></i> {{ $contact->email }} @if($asset_type == 'video')(<strong>{{ count($contact->videos) }}</strong>)@endif
        </a>
    @elseif($contact->twitter)
        <a href="https://twitter.com/{{ $contact->twitter }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-twitter"></i> {{ $contact->twitter }}
        </a>
    @elseif($contact->reddit)
        <a href="https://www.reddit.com/user/{{ $contact->reddit }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-reddit"></i> {{ $contact->reddit }}
        </a>
    @elseif($contact->imgur)
        <a href="https://imgur.com/user/{{ $contact->imgur }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-italic"></i> {{ $contact->imgur }}
        </a>
    @elseif($contact->instagram)
        <a href="{{ url('admin/contacts/'.$contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
            <i class="fa fa-instagram"></i> {{ $contact->instagram }}
        </a>
    @elseif($contact->youtube)
        <a href="{{ url('admin/contacts/'.$contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
            <i class="fa fa-youtube"></i> {{ $contact->youtube }}
        </a>
    @elseif($contact->facebook)
        <a href="{{ url('admin/contacts/'.$contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact">
            <i class="fa fa-facebook"></i> {{ $contact->facebook }}
        </a>
    @endif
@else
    <span class="btn btn-mini-info"><i class="fa fa-address-book"></i> No Contact</span>
@endif