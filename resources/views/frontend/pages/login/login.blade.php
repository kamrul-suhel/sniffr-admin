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
                                        <form action="#" method="post">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="username" id="username" aria-describedby="usernamehelp" placeholder="Enter Username">
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control" name="password" id="password" aria-describedby="passwordhelp" placeholder="Enter password">
                                            </div>
                                            <div class="form-submit">
                                                <input type="submit" class="btn btn-block"  id="submit" value="LOGIN">
                                            </div>
                                            <div class="forgot-password">
                                                <a href="#" class="">Forgot password</a>
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
