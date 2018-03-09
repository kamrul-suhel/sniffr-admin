<!-- Modal Login -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="Loginmodal" aria-hidden="true">
    <div class="table">
        <div class="table-cell">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <a href="#" class="modal_close" data-dismiss="modal"><i class="fas fa-times"></i></a>
                        <!-- LOGIN SECTION -->
                        <section id="login_section" class="login_section">
                            <h2 class="login_title">LOGIN</h2>
                            <form method="post" action="@if($settings->enable_https) {{ secure_url('login') }} @else {{ route('login') }} @endif">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="email" id="username" aria-describedby="usernamehelp" placeholder="Enter Email">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" name="password" id="password" aria-describedby="passwordhelp" placeholder="Enter password">
                                </div>
                                <div class="form-submit">
                                    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                                    <input type="submit" class="btn btn-block"  id="submit" value="LOGIN">
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