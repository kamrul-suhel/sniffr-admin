@extends('admin.master')

@section('content')

<div id="admin-container" class="media-section">
<!-- This is where -->

	<div class="admin-section-title">
		<h3><i class="fa fa-picture-o"></i> Media</h3>
	</div>
	<div class="clear"></div>

	<div id="app">
        <media-manager></media-manager>
    </div>

</div>

@stop
