<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;

use App\Page;
use App\Menu;
use App\Setting;
use App\VideoCategory;
use App\PostCategory;
use App\PaymentSetting;

use App\Libraries\ThemeHelper;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AdminPaymentSettingsController extends Controller {

	/**
     * constructor.
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

	public function index()
	{

		$data = array(
			'admin_user' => Auth::user(),
			'settings' => Setting::first(),
			'payment_settings' => PaymentSetting::first(),
			);
		return view('admin.paymentsettings.index', $data);
	}

	public function save_payment_settings(){

		$input = Input::all();

		$payment_settings = PaymentSetting::first();

		if(!isset($input['live_mode'])){
			$input['live_mode'] = 0;
		}

        $payment_settings->update($input);

        return Redirect::to('admin/payment_settings')->with(array('note' => 'Successfully Updated Payment Settings!', 'note_type' => 'success') );

	}

}
