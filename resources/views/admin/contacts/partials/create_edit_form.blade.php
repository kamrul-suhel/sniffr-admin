<div class="row">
    <div class="col-sm-12">
        <form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Full Name</div>
                    <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
                </div>
                <div class="panel-body" style="display: block;">
                    <p>Add first name in the textbox below:</p>
                    <input type="text" class="form-control" name="full_name" id="full_name" placeholder="Full Name" value="{{ ($contact) ? $contact->full_name : '' }}" />
                </div>
            </div>

            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Email Address</div>
                    <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
                </div>
                <div class="panel-body" style="display: block;">
                    <p>Add email address in the textbox below:</p>
                    <input type="text" class="form-control" name="email" id="email" placeholder="Email Address" value="{{ ($contact) ? $contact->email : '' }}" />
                </div>
            </div>

            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Telephone Number</div>
                    <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
                </div>
                <div class="panel-body" style="display: block;">
                    <p>Add telephone number in the textbox below:</p>
                    <input type="text" class="form-control" name="tel" id="tel" placeholder="Telephone Number" value="{{ ($contact) ? $contact->tel : '' }}" />
                </div>
            </div>

            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Locale</div>
                    <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
                </div>
                <div class="panel-body" style="display: block;">
                    <div class="form-group">
                        <label>Language:</label>
                        <input type="text" class="form-control" name="language" id="language" value="{{ ($contact) ? $contact->language : '' }}" />
                    </div>

                    <div class="form-group">
                        <label>Location:</label>
                        <input type="text" class="form-control" name="location" id="location" value="{{ ($contact) ? $contact->location : '' }}" />
                    </div>
                </div>
            </div>

            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Online Profile</div>
                    <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div>
                </div>
                <div class="panel-body" style="display: block;">
                    <div class="form-group">
                        <label>Facebook Profile:</label>
                        <input type="text" class="form-control" name="facebook" id="facebook" value="{{ ($contact) ? $contact->facebook : '' }}" />
                    </div>

                    <div class="form-group">
                        <label>Youtube Page:</label>
                        <input type="text" class="form-control" name="youtube" id="youtube" value="{{ ($contact) ? $contact->youtube : '' }}" />
                    </div>

                    <div class="form-group">
                        <label>Instagram Handle:</label>
                        <input type="text" class="form-control" name="instagram" id="instagram" value="{{ ($contact) ? $contact->instagram : '' }}" />
                    </div>

                    <div class="form-group">
                        <label>Twitter Handle:</label>
                        <input type="text" class="form-control" name="twitter" id="twitter" value="{{ ($contact) ? $contact->twitter : '' }}" />
                    </div>

                    <div class="form-group">
                        <label>Other:</label>
                        <input type="text" class="form-control" name="other" id="other" value="{{ ($contact) ? $contact->other : '' }}" />
                    </div>
                </div>
            </div>

            <input type="hidden" id="id" name="id" value="{{ ($contact) ? $contact->id : '' }}" />

            <input type="hidden" name="_token" value="<?= csrf_token() ?>" />
            <input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />
        </form>
    </div>
</div>