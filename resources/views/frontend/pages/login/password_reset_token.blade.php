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
                                        <h2 class="login_title">Reset Password</h2>
                                        @if (session()->has('note'))
                                            <div class="alert alert-danger">
                                                {{ session('note') }}
                                            </div>
                                        @endif
                                        <form method="post" action="@if($settings['enable_https']) {{ secure_url('password/reset') }} @else {{ URL::to('password/reset') }} @endif" accept-charset="UTF-8">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="email" id="login_email" aria-describedby="emailhelp" placeholder="Enter Email">
                                            </div>
                                            <div class="form-submit">
                                                <input type="hidden" id="redirect" name="redirect" value="" />
                                                <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                                                <input type="submit" class="btn btn-block"  id="login_submit" value="Send Password">
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
