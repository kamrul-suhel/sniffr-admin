@extends('admin.master')

@section('css')
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
@endsection

@section('content')
    <div id="admin-mailer">
        <v-app>
            <v-content>

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
                                </a> <a href="{{ url('admin/stories/refresh') }}" class="btn btn-warning pull-right"
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

                <mailer-component></mailer-component>
            </v-content>
        </v-app>
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

    <!-- Vue injection -->
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
@endsection
