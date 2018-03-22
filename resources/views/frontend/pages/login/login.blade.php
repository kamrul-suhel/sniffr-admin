@extends('frontend.master')
@section('content')
    <section id="video">
        <video>
        </video>
        <div class="heading">
            <div class="position-center">
                <div class="table">
                    <div class="table-cell">
                        <div class="modal-dialog modal-sm" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <!-- LOGIN SECTION -->

                                    <section id="login_section" class="login_section">
                                        <h2 class="login_title">LOGIN</h2>
                                        @if (session()->has('note'))
                                            <div class="alert
                                                @if(session('note_type') == 'success')
                                                    alert-success
                                                @else
                                                    alert-danger
                                                @endif">
                                                {{ session('note') }}
                                            </div>
                                        @endif
                                        <form method="post" action="@if($settings->enable_https) {{ secure_url('login') }} @else {{ route('login') }} @endif">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="email" id="login_email" aria-describedby="emailhelp" placeholder="Enter Email">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control" name="password" id="login_password" aria-describedby="passwordhelp" placeholder="Enter password">
                                            </div>
                                            <div class="form-submit">
                                                <input type="hidden" id="redirect" name="redirect" value="" />
                                                <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                                                <input type="submit" class="btn btn-block"  id="login_submit" value="LOGIN">
                                            </div>
                                            <div class="forgot-password">
                                                <a href="{{route('password.remind')}}" class="">Forgot password</a>
                                            </div>
                                        </form>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
