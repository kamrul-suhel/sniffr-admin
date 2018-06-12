@extends('admin.master')

@section('css')
    <style>
        .story_pic {
            display: flex;
            height: 200px;
            width: auto;
            border: none
        }
    </style>
@endsection

@section('content')
    <ol class="breadcrumb">
        <li><a href="/admin/stories"><i class="fa fa-tasks"></i> All Stories</a></li>
    </ol>

    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-xs-12">
                <h3>
                    <i class="fa fa-users"></i> Stories
                    <a href="#" class="btn btn-primary pull-right js-create-mailer">
                        <i class="fa fa-plus-circle"></i> Create Mailer
                    </a> <a href="#" class="btn btn-warning pull-right js-refresh-stories"
                            style="margin-right:10px;">
                        <i class="fa fa-refresh"></i> Refresh Stories
                    </a>
                <!-- <a href="{{ url('admin/stories/create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i> Add New Story
					</a> -->
                </h3>
            </div>
        </div>
    </div>
    <div class="clear"></div>

    <ul class="nav nav-tabs">
        <li class="active">
            <a href="#stories" role="tab" data-toggle="tab">Stories</a>
        </li>

        <li class="">
            <a href="#videos" role="tab" data-toggle="tab">Videos</a>
        </li>
    </ul>

    <div class="panel-body tab-content">
        <div class="tab-pane active" id="stories">
            @include('admin.stories.partials.stories')
        </div>
        <div class="tab-pane" id="videos">
            @include('admin.stories.partials.videos')
        </div>
        <div class="clear"></div>
    </div>

@endsection

@section('javascript')
    <script>
        $ = jQuery;
        $(document).ready(function () {
            $('.js-delete').click(function (e) {
                e.preventDefault();
                if (confirm("Are you sure you want to delete this story?")) {
                    window.location = $(this).attr('href');
                }
                return false;
            });

            function checkJobs() {
                setTimeout(
                function() {
                    $.ajax({
                        type: 'GET',
                        url: '/admin/stories/checkjobs',
                        data: {},
                        dataType: 'json',
                        success: function (data) {
                            if (data.jobs == 0) {
                                swal.close();
                                swal({
                                    title: 'Stories are now up-to-date.',
                                    icon: 'success',
                                    closeModal: true,
                                    closeOnClickOutside: true,
                                    closeOnEsc: true
                                });
                                window.location.reload();
                            } else {
                                // jobs are still in the queue, so run again
                                checkJobs();
                            }
                        }
                    });
                }, 500);
            }

            $('.js-refresh-stories').click(function (e) {
                e.preventDefault();
                swal({
                    title: 'Please wait while the stories update. This may take a few minutes.',
                    icon: 'info',
                    closeModal: false,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    buttons: {
                        confirm: false,
                        cancel: {
                            text: "Cancel",
                            value: null,
                            visible: true,
                            closeModal: true,
                          }
                    }
                });
                var refreshUrl = '/admin/stories/refresh';
                if (refreshUrl) {
                    $('.js-refresh-stories').css('display', 'none');
                    $.ajax({
                        type: 'GET',
                        url: refreshUrl,
                        data: {},
                        dataType: 'json',
                        success: function (data) {
                            if (data.dispatched == false) {
                                swal.close();
                                $('.js-refresh-stories').css('display', 'block');
                                swal({
                                    title: 'Stories are already up-to-date.',
                                    icon: 'success',
                                    closeModal: true,
                                    closeOnClickOutside: true,
                                    closeOnEsc: true
                                });
                            } else {
                                // jobs have been sent to queue so need to check the job queue
                                checkJobs();
                            }
                        }
                    });
                }
            });

            $('.js-create-mailer').click(function (e) {
                e.preventDefault();
                var storiesArray = [];
                $("input:checkbox[name=stories]:checked").each(function () {
                    storiesArray.push($(this).val());
                });
                var videosArray = [];
                $("input:checkbox[name=videos]:checked").each(function () {
                    videosArray.push($(this).val());
                });
                if ((storiesArray.length != 0) || (videosArray.length != 0)) {
                    var dataString = "stories=" + JSON.stringify(storiesArray) + "&videos=" + JSON.stringify(videosArray);
                    $.ajax({
                        type: 'GET',
                        url: '/admin/mailers/create/',
                        data: dataString,
                        dataType: 'json',
                        success: function (data) {
                            if (data.status == 'success') {
                                if (data.mailer_id) {
                                    window.location.href = '/admin/mailers/edit/' + data.mailer_id;
                                }
                            } else {
                                alert('Something went wrong');
                            }
                        }
                    });
                } else {
                    swal({
                        title: 'Please select some stories first.',
                        icon: 'error',
                        closeModal: false,
                        closeOnClickOutside: true,
                        closeOnEsc: true
                    });
                }
            });
        });
    </script>
@endsection
