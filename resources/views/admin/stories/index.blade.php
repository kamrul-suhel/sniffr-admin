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
@endsection
