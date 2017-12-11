<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use Redirect;

use App\Page;
use App\Menu;
use App\Setting;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ThemeHelper;
use App\Libraries\ImageHandler;

use Illuminate\Support\Facades\Input;

class AdminSettingsController extends Controller {

	/**
     * constructor.
     */
    public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

	public function index()
	{

		$data = array(
			'admin_user' => Auth::user(),
			'settings' => Setting::first(),
			);
		return view('admin.settings.index', $data);
	}

	public function save_settings(){

		$input = Input::all();
		$settings = Setting::first();

		$demo_mode = Input::get('demo_mode');
		$enable_https = Input::get('enable_https');
		$free_registration = Input::get('free_registration');
		$activation_email = Input::get('activation_email');
		$premium_upgrade = Input::get('premium_upgrade');

		if(empty($demo_mode)){
			$input['demo_mode'] = 0;
		}

		if(empty($enable_https)){
			$input['enable_https'] = 0;
		}

		if(empty($free_registration)){
			$input['free_registration'] = 0;
		}

		if(empty($activation_email)){
			$input['activation_email'] = 0;
		}

		if(empty($premium_upgrade)){
			$input['premium_upgrade'] = 0;
		}

		if(Input::hasFile('logo')){
        	$input['logo'] = ImageHandler::uploadImage(Input::file('logo'), 'settings');
        } else { $input['logo'] = $settings->logo; }

        if(Input::hasFile('favicon')){
        	$input['favicon'] = ImageHandler::uploadImage(Input::file('favicon'), 'settings');
        } else { $input['favicon'] = $settings->favicon; }


        $settings->update($input);

        return Redirect::to('admin/settings')->with(array('note' => 'Successfully Updated Site Settings!', 'note_type' => 'success') );

	}

}
