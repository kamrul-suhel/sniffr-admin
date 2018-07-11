@extends('admin.master')

@section('css')
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
@endsection

@section('content')
    <div id="admin-mailer">
        <v-app>
            <v-content>
                <ol class="breadcrumb">
                    <li><a href="/admin/mailers/"><i class="fa fa-tasks"></i> All Client Mailers </a></li>
                    <li><a href="/admin/mailers/create_mailer/"> Create Mailer </a></li>
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
        });
    </script>
@endsection
