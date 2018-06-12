
    <div class="panel panel-primary" data-collapsed="0">
        <div class="panel-heading">
            <div class="panel-title">Uploaded By</div>
            <div class="panel-options">
                <a href="#" data-rel="collapse">
                    <i class="fa fa-angle-down"></i>
                </a>
            </div>
        </div>

        <div class="panel-body" style="display: block;">
            @if(($video->contact) && $video->contact_id!=0)
                <h3>
                    <a href="{{ route('contacts.edit', ['id' => $video->contact->id]) }}">
                        {{ $video->contact->full_name or 'Not submitted' }}
                    </a>
                </h3>
                <p>
                    <a href="mailto:{{ $video->contact->email }}">
                        {{ $video->contact->email }}
                    </a>
                </p>
            @else
                <h3>No Contact Details</h3>
            @endif
        </div>
    </div>
