<ol class="breadcrumb">
    <li>
        <a href="/admin/videos">
            All Videos
        </a>
    </li>
    @if($video)
        <li>
            <a href="/admin/videos/{{ ($video->state) ?: 'new' }}">
                {{ ($video->state) ? ucfirst($video->state) : 'New' }}
            </a>
        </li>
        <li class="active">
            <strong>
                <a href="/admin/videos/edit/{{ $video->alpha_id }}">{{ $video->title  }}</a>
            </strong>
        </li>
    @else
        <li class="active">
            <strong>
                Add New Video
            </strong>
        </li>
    @endif
</ol>