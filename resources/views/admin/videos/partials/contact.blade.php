
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
            @if(($asset->contact) && $asset->contact_id!=0)
                <h3>
                    <a href="{{ route('contacts.edit', ['id' => $asset->contact->id]) }}">
                        {{ $asset->contact->full_name or 'Not submitted' }}
                    </a>
                </h3>
                <p>
                    <a href="mailto:{{ $asset->contact->email }}">
                        {{ $asset->contact->email }}
                    </a>
                </p>
            @else
                <h3>No Contact Details</h3>
            @endif
        </div>
    </div>
