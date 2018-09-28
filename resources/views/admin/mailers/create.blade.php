@extends('admin.master')

@section('css')
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <!-- Vue style integration -->
    <link rel="stylesheet" href="{{mix('assets/admin/css/vuetify.css')}}"/>
@stop

@section('content')
    <div id="sniffr-app">
        <v-app>
            <v-content>
                <ol class="breadcrumb">
                    <li><a href="/admin/mailers"><i class="fa fa-tasks"></i> All Client Mailers </a></li>
                    <li><a href="/admin/mailers/create"> Create Mailer </a></li>
                </ol>
                <router-view></router-view>

                <footer-component></footer-component>
            </v-content>
        </v-app>
    </div>
@stop

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
        });
    </script>
@stop
