@if ($paginator->hasPages())
    <section class="pagination_section">
        <div class="container">
            <div class="row">
                <div class="col">
                    <ul class="pagination">
                        {{-- Previous Page Link --}}
                        @if ($paginator->onFirstPage())
                            <li class="disabled"><i class="fas fa-angle-left"></i></li>
                        @else
                            <li><a href="{{ $paginator->previousPageUrl() }}" class="pagination_preview" rel="prev"><i class="fas fa-angle-left"></i></a></li>
                        @endif

                        {{-- Pagination Elements --}}
                        @foreach ($elements as $element)
                            {{-- "Three Dots" Separator --}}
                            @if (is_string($element))
                                <li class="disabled"><span>{{ $element }}</span></li>
                            @endif

                            {{-- Array Of Links --}}
                            @if (is_array($element))
                                @foreach ($element as $page => $url)
                                    @if ($page == $paginator->currentPage())
                                        <li class="active"><span>{{ $page }}</span></li>
                                    @else
                                        <li><a href="{{ $url }}">{{ $page }}</a></li>
                                    @endif
                                @endforeach
                            @endif
                        @endforeach

                        {{-- Next Page Link --}}
                        @if ($paginator->hasMorePages())
                            <li><a href="{{ $paginator->nextPageUrl() }}" class="pagination_next" rel="next"><i class="fas fa-angle-right"></i></a></li>
                        @else
                            <li class="disabled"><i class="fas fa-angle-right"></i></li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </section>
@endif
