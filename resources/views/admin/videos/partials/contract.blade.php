@if((!$video->currentContract) && ($video->contact))
    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#contract_modal">
        Create Contract
    </button>
@elseif($video->contact)
    <a href="{{ route('contract.send', ['id' => $video->id]) }}" class="btn btn-info btn-lg">
        Send Contract
    </a>
@else
    <p>
        Can't create/send a contract if there the video is not assigned to a creator
    </p>
@endif
