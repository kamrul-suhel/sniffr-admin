<template>
    <section id="video">
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
                                        <form method="post" accept-charset="UTF-8">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="email" id="login_email" aria-describedby="emailhelp" placeholder="Enter Email">
                                            </div>
                                            <div class="form-submit">
                                                <input type="hidden" id="redirect" name="redirect" value="" />
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
</template>
<script>
    export default {
        data() {

        },

        methods: {

        }
    }
</script>