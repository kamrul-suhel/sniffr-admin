<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Support\Facades\Input;
use App\Traits\FrontendResponse;
use Illuminate\Http\Request;

class ThemeContactController extends Controller
{
    use FrontendResponse;

    public function index(Request $request, $email)
    {
        if ($request->ajax()) {
            $contact = Contact::where('email', $email)->first();
            $data = [
                'contact' => $contact,
            ];

            if ($contact) {
                return $this->successResponse($data);
            }
            return $this->errorResponse("Sorry, we cannot find the email associated with your account. Please contact <u>submissions@unilad.co.uk</u>");
        }
        return view('frontend.master');
    }

    public function edit(Request $request)
    {
        if ($request->ajax()) {
            if ($request->input('key')) {
                $contact = Contact::where('email', base64_decode(Input::get('key')))->first();
                if (isset($contact)) {
                    $contact->delete();
                    if (isset($contact->videos)) {
                        foreach ($contact->videos as $video) {
                            $video->contact_id = 0;
                            $video->save();
                        }
                    }
                }
            }

            return $this->successResponse();
        }

        return view('Theme::unsubscribe');
    }
}
