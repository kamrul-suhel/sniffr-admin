<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Redirect;
use App\Setting;
use App\PaymentSetting;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AdminPaymentSettingsController extends Controller
{
    /**
     * AdminPaymentSettingsController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    public function index()
    {
        $data = [
            'admin_user' => Auth::user(),
            'settings' => Setting::first(),
            'payment_settings' => PaymentSetting::first(),
        ];
        return view('admin.paymentsettings.index', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
	public function save_payment_settings()
    {
		$input = Input::all();

		$payment_settings = PaymentSetting::first();

        if (!isset($input['live_mode'])) {
            $input['live_mode'] = 0;
        }

        $payment_settings->update($input);

        return Redirect::to('admin/payment_settings')->with([
            'note' => 'Successfully Updated Payment Settings!',
            'note_type' => 'success'
        ]);
	}
}
