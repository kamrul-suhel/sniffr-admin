@if($asset->contact)
    @if($asset->contact->blacklist)
        <small style="color: red;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($asset->contact->blacklist_created_at)->diffForHumans() }}</small>
    @endif
    @if($asset->contact->whitelist)
        <small style="color: green;"><i class="fa fa-flag"></i> {{ Carbon\carbon::parse($asset->contact->whitelist_created_at)->diffForHumans() }}</small>
    @endif

    @if($asset->contact->email)
        <a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-envelope"></i> {{ $asset->contact->email }}
        </a>
    @elseif($asset->contact->twitter)
        <a href="https://twitter.com/{{ $asset->contact->twitter }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-twitter"></i> {{ $asset->contact->twitter }}
        </a>
    @elseif($asset->contact->reddit)
        <a href="https://www.reddit.com/user/{{ $asset->contact->reddit }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-reddit"></i> {{ $asset->contact->reddit }}
        </a>
    @elseif($asset->contact->imgur)
        <a href="https://imgur.com/user/{{ $asset->contact->imgur }}" class="btn btn-mini-info" title="View Contact" target="_blank">
            <i class="fa fa-italic"></i> {{ $asset->contact->imgur }}
        </a>
    @elseif($asset->contact->instagram)
        <a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
            <i class="fa fa-instagram"></i> {{ $asset->contact->instagram }}
        </a>
    @elseif($asset->contact->youtube)
        <a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
            <i class="fa fa-youtube"></i> {{ $asset->contact->youtube }}
        </a>
    @elseif($asset->contact->facebook)
        <a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact">
            <i class="fa fa-facebook"></i> {{ $asset->contact->facebook }}
        </a>
    @endif
@else
    <span class="btn btn-mini-info"><i class="fa fa-address-book"></i> No Contact</span>
@endif