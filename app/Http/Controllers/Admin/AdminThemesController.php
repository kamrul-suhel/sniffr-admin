<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Redirect;
use App\Setting;
use App\Libraries\ThemeHelper;
use App\Http\Controllers\Controller;

class AdminThemesController extends Controller
{
    /**
     * AdminThemesController constructor.
     */
     public function __construct()
     {
         $this->middleware('admin');
     }

	public function index()
	{
		$data = [
			'admin_user' => Auth::user(),
			'themes' => ThemeHelper::get_themes(),
			'active_theme' => Setting::first()->theme
        ];

		return view('admin.themes.index', $data);
	}

	public function activate($slug)
	{
		$settings = Setting::first();
		$settings->theme = $slug;
		$settings->save();

		return Redirect::to('admin/themes')->with([
		    'note' => 'Successfully Activated ' . ucfirst($slug) . ' Theme',
            'note_type' => 'success'
        ]);
	}

}
