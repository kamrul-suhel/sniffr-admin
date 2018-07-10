<div class="@if($contact) col-lg-9 @else col-lg-12 @endif">
    <form method="POST" action="{{ (isset($contact)) ? route('contacts.update', ['id' => $contact->id]) : route('contacts.store') }}" accept-charset="UTF-8">
        <div class="row">
            <div class="col-md-12">
                <h2>Contact Information</h2>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="form-group input-group">
                    <span class="input-group-addon">Full Name</span>
                    <input type="text" class="form-control" id="full_name" name="full_name" value="{{
                    $contact->full_name or old('full_name')
                    }}" title="full name">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="form-group input-group">
                    <span class="input-group-addon">Email</span>
                    <input type="text" class="form-control" id="email" name="email" value="{{ $contact->email or old('email') }}">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Phone</span>
                    <input type="text" class="form-control" id="tel" name="tel" value="{{ $contact->tel or old('tel') }}">
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Country</span>
                    <select type="text" class="form-control" id="country_code" name="country_code" title="country_code">
                        <option value="">--</option>
                        @foreach(config('countries') as $country)
                            <option value="{{ $country['code'] }}" {{ ((($contact) && ($country['code'] == $contact->country_code)) || (old('country_code') == $country['code'])) ? 'selected="selected"' : '' }}>
                                {{ $country['name'] }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Language</span>
                    <select type="text" class="form-control" id="language_code" name="language_code" title="language_code">
                        <option value="">--</option>
                        @foreach(config('languages') as $language)
                            <option value="{{ $language['code'] }}" {{ ((($contact) && ($language['code'] == $contact->language)) || (old('language_code') == $language['code'])) ? 'selected="selected"' : '' }}>
                                {{ $language['name'] }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">City</span>
                    <input type="text" class="form-control" id="location" name="location" title="location" value="{{
                    $contact->location or old('location')
                    }}">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Payment</h2>
            </div>
            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Paypal</span>
                    <input type="text" class="form-control" id="paypal" name="paypal" value="{{
                    $contact->paypal or old('paypal')
                    }}" title="paypal">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Social Media</h2>
            </div>
            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Twitter</span>
                    <input type="text" class="form-control" id="twitter" name="twitter" value="{{
                    $contact->twitter or old('twitter')
                    }}">
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Facebook</span>
                    <input type="text" class="form-control" id="facebook" name="facebook" value="{{
                    $contact->facebook or old('facebook')
                    }}">
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Instagram</span>
                    <input type="text" class="form-control" id="instagram" name="instagram" value="{{
                    $contact->instagram or old('instagram')
                    }}">
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Reddit</span>
                    <input type="text" class="form-control" id="reddit" name="reddit" value="{{
                    $contact->reddit or old('reddit')
                    }}">
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group input-group">
                    <span class="input-group-addon">Youtube</span>
                    <input type="text" class="form-control" id="youtube" name="youtube" value="{{
                    $contact->youtube or old('youtube')
                    }}">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Notes</h2>
            </div>

            <div class="col-md-12">
                <div class="form-group input-group">
                    <span class="input-group-addon">Notes</span>
                    <textarea class="form-control" id="other" name="other" rows="4" title="notes">{{
                    $contact->other or old('other')
                    }}</textarea>
                </div>
            </div>
        </div>
        {{ csrf_field() }}

        @if(\Request::route()->getName() != "contact.create")
            <input type="hidden" value="{{ \Request::route()->getName() }}" name="referral" id="referral" title="referral">
        @endif

        {{ ($contact) ? method_field('PUT') : method_field('POST') }}

        <input type="submit" value="{{ ($contact) ? 'Update' : 'Create' }} Contact" class="btn btn-success pull-right"/>
    </form>

    @if($contact)
        @include('admin.contacts.partials.delete')
    @endif
</div>
