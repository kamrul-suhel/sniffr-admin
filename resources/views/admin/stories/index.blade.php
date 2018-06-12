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



                <router-view></router-view>

            </v-content>
        </v-app>
    </div>

@endsection

@section('javascript')
    <script>
        $ = jQuery;
        $(document).ready(function () {

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
