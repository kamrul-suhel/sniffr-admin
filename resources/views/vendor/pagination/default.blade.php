@if ($paginator->hasPages())
    <section class="pagination-section">
        <v-container fill-height>
            <v-layout row wrap align-center>
                <v-flex text-xs-center>
                    <ul class="pagination">
                        {{-- Previous Page Link --}}
                        @if ($paginator->onFirstPage())

                        @else
                            <li><a href="{{ $paginator->previousPageUrl() }}" class="pagination-preview" rel="prev"><i class="fa fa-angle-left"></i></a></li>
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
                            <li><a href="{{ $paginator->nextPageUrl() }}" class="pagination-next" rel="next"><i class="fa fa-angle-right"></i></a></li>
                        @endif
                    </ul>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
@endif
