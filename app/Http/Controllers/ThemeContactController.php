<?php


namespace App\Http\Controllers;

use Hash;
use Auth;
use Redirect;

use App\User;
use App\Contact;
use App\Favorite;
use App\Page;
use App\Menu;
use App\Video;
use App\Setting;
use App\PaymentSetting;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ThemeHelper;
use App\Libraries\Imagehandler;

use Illuminate\Support\Facades\Input;

class ThemeContactController extends Controller{

    public function index($email){

        $contact = Contact::where('email', base64_decode($email))->first();

        //dd(base64_encode($email));

    	$data = array(
            'contact' => $contact,
            'key' => $email,
            'success' => false
    	);

    	return view('Theme::unsubscribe', $data);
    }

    public function edit(){

        $success = false;

        if(Input::get('key')) {
            $contact = Contact::where('email', base64_decode(Input::get('key')))->first();
            if(isset($contact)) {
                $contact->delete(); //DO WE SOFT DELETE OR HARD DELETE (?)
                $success = true;
                if(isset($contact->videos)) {
                    foreach($contact->videos as $video) {
                        $video->contact_id = 0;
                        $video->save();
                    }
                }
            }
        }

        $data = array(
            'contact' => NULL,
            'key' => NULL,
            'success' => $success
    	);

        return view('Theme::unsubscribe', $data);
    }

}
