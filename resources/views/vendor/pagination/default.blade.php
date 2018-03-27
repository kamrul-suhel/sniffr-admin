@if ($paginator->hasPages())
    <section class="pagination_section">
        <v-container fill-height>
            <v-layout row wrap align-center>
                <v-flex text-xs-center>
                    <ul class="pagination">
                        {{-- Previous Page Link --}}
                        @if ($paginator->onFirstPage())
                            <li class="disabled default"><i class="fas fa-angle-left"></i></li>
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
                            <li class="disabled default"><i class="fas fa-angle-right"></i></li>
                        @endif
                    </ul>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
@endif
