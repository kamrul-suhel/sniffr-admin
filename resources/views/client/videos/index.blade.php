@extends('client.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-xs-12">
                <h3><i class="fa fa-youtube-play"></i> Video Library</h3>
            </div>
        </div>

        <div class="row">
            <form id="search-form" method="get" role="form" class="search-form-full">
                <div class="col-md-4">
                    <div class="form-group">
                        <select id="collection" name="collection" class="selectpicker form-control">
                            <option value="">Collection</option>
                            @foreach($video_collections as $collection)
                                <option value="{{ $collection->id }}"{{ isset($_GET['collection']) && ($_GET['collection'] == $collection->id) ? ' selected="selected"' : '' }}>{{ $collection->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-md-4 col-md-offset-4">
                    <div class="form-group">
                        <input type="text" class="form-control" name="s" id="search-input" placeholder="Search videos..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="clear"></div>

    @if(!count($videos))
        <p>Sorry, there are no videos to show.</p>
    @else

    <div class="gallery-env">
        <div class="row">
            <?php
			$currentDay = '';
			foreach($videos as $video):
				if($video->created_at->isToday()) {
					$date = 'Today';
				} else {
					// $date = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->created_at)->diffForHumans();
					$date = date('jS M',strtotime($video->created_at));
				}
				if($currentDay != $date){
					$currentDay = $date;
					echo '<div class="col-xs-12 date-header"><h2>'.$date.'</h2></div>';
				}
			?>
            <div class="col-sm-6 col-md-4" id="video-{{ $video->alpha_id }}">
                <article class="album">
                    <header>
                        {!! App\Libraries\VideoHelper::getVideoHTML($video) !!}
                    </header>

                    <section class="album-info">
                        <h3><a href="{{ url('client/videos/view/'.$video->alpha_id) }}">{{ $video->title }}</a></h3>

                        <p>{{ $video->description }}</p>
                    </section>

                    <footer>
                        <div class="album-images-count"></div>

                        <div class="album-options">
                            <a href="{{ url('client/videos/interest/'.$video->alpha_id) }}" class="js-state btn btn-default" title="Interested in video">
                                <i class="fa fa-envelope"></i> Request Interest
                            </a>
                        </div>
                    </footer>
                </article>
            </div>
            <?php endforeach; ?>

            <div class="col-md-12 text-center"><?= $videos->appends(request()->except('page'))->render(); ?></div>
        </div>
    </div>
    @endif
@stop
