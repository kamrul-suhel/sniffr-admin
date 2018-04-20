<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Support\Facades\Input;
use App\Traits\FrontendResponser;
use Illuminate\Http\Request;

class ThemeContactController extends Controller
{
    use FrontendResponser;

    public function index(Request $request, $email){

        $contact = Contact::where('email', $email)->first();
    	$data = [
            'contact' => $contact,
    	];

        if($request->ajax()){
            if($contact){
                return $this->successResponse($data);
            }
            return $this->errorResponse("Sorry, we cannot find the email associated with your account. Please contact <u>submissions@unilad.co.uk</u>");
        }
        return view('frontend.master');
    }

    public function edit(Request $request)
    {
        if ($request->input('key')) {
            // $contact = Contact::where('email', base64_decode(Input::get('key')))->first();
            $contact = Contact::where('email', $request->input('key'))->first();
            if (isset($contact)) {
                // $contact->delete(); //DO WE SOFT DELETE OR HARD DELETE (?)
                // if (isset($contact->videos)) {
                //     foreach ($contact->videos as $video) {
                //         $video->contact_id = 0;
                //         $video->save();
                //     }
                // }
            }
        }

        if($request->ajax()){
            return $this->successResponse();
        }

        return view('Theme::unsubscribe');
    }
}
