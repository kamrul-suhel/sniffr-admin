@extends('admin.master')

@section('css')
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">

    <!-- Mailer stories & video style -->
    <link rel="stylesheet" href="{{ asset('assets/admin/css/styles.css') }}"/>
@endsection

@section('content')
    <div id="admin-mailer">
        <v-app>
            <v-content>
                <ol class="breadcrumb">
                    <li><a href="/admin/stories"><i class="fa fa-tasks"></i> All Stories</a></li>
                </ol>
                <router-view></router-view>
            </v-content>
        </v-app>
    </div>

@endsection

@section('javascript')
    <!-- Vue scripts -->
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>

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
                                }).then(function() {
                                    window.location.reload();
                                });
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
                                swal({
                                    title: 'Stories are already up-to-date.',
                                    icon: 'success',
                                    closeModal: true,
                                    closeOnClickOutside: true,
                                    closeOnEsc: true
                                }).then(function() {
                                    $('.js-refresh-stories').css('display', 'block');
                                });
                            } else {
                                // jobs have been sent to queue so need to check the job queue
                                checkJobs();
                            }
                        }
                    });
                }
            });
        });
    </script>
@endsection
