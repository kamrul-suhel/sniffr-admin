<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Support\Facades\Input;

class ThemeContactController extends Controller
{
    public function index($email){

        $contact = Contact::where('email', base64_decode($email))->first();

    	$data = [
            'contact' => $contact,
            'key' => $email,
            'success' => false
    	];

        return view('Theme::unsubscribe', $data);
    }

    public function edit()
    {
        $success = false;

        if (Input::get('key')) {
            $contact = Contact::where('email', base64_decode(Input::get('key')))->first();
            if (isset($contact)) {
                $contact->delete(); //DO WE SOFT DELETE OR HARD DELETE (?)
                $success = true;
                if (isset($contact->videos)) {
                    foreach ($contact->videos as $video) {
                        $video->contact_id = 0;
                        $video->save();
                    }
                }
            }
        }

        $data = [
            'contact' => NULL,
            'key' => NULL,
            'success' => $success
    	];

        return view('Theme::unsubscribe', $data);
    }
}
