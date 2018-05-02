<div class="row">
    <div class="col-md-12">
        <h2>Contact Information</h2>
    </div>
    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">First Name</span>
            <input type="text" class="form-control" id="first_name" name="first_name" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>

    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Last Name</span>
            <input type="text" class="form-control" id="last_name" name="last_name" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Email</span>
            <input type="text" class="form-control" id="email" name="email" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>

    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Phone</span>
            <input type="text" class="form-control" id="phone" name="phone" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>

    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Country</span>
            <select type="text" class="form-control" id="country" name="country" placeholder="" aria-describedby="basic-addon1">
                @foreach(config('countries') as $country)
                    <option value="{{ $country['code'] }}">{{ $country['name'] }}</option>
                @endforeach
            </select>
        </div>
    </div>

    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">City</span>
            <input type="text" class="form-control" id="city" name="city" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <h2>Social Media</h2>
    </div>
    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Twitter</span>
            <input type="text" class="form-control" id="twitter" name="twitter" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>

    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Facebook</span>
            <input type="text" class="form-control" id="facebook" name="facebook" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>

    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Instagram</span>
            <input type="text" class="form-control" id="instagram" name="instagram" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>

    <div class="col-md-6">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Reddit</span>
            <input type="text" class="form-control" id="reddit" name="reddit" placeholder="" aria-describedby="basic-addon1">
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <h2>Notes</h2>
    </div>

    <div class="col-md-12">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Notes</span>
            <textarea class="form-control" id="notes" name="notes" placeholder="Other contact information" aria-describedby="basic-addon1" rows="4"></textarea>
        </div>
    </div>
</div>
