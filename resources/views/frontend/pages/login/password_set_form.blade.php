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
                                        <h2 class="login_title">SET PASSWORD</h2>
                                        @if (session()->has('note'))
                                            <div class="alert alert-danger">
                                                {{ session('note') }}
                                            </div>
                                        @endif
                                        <form method="post" action="{{ route('password.set_password_post', ['email' => $email, 'token' => $token]) }}">
                                            <div class="form-group">
                                                <input name="email" type="text" id="set_email" class="form-control" placeholder="email">
                                            </div>
                                            <div class="form-group">
                                                <input name="password" type="password" id="set_password" class="form-control" placeholder="password">
                                            </div>
                                            <div class="form-group">
                                                <input name="password_confirmation" type="password" id="password_confirmation" class="form-control" placeholder="confirm password">
                                            </div>
                                            <div class="form-submit">
                                                <input name="token" type="hidden" value="{{ $token }}">
                                                {{ csrf_field() }}
                                                <input type="submit" class="btn btn-block"  id="set_submit" value="set PASSWORD">
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
