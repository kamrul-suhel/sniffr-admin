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

class AdminThemesController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */

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
			'themes' => ThemeHelper::get_themes(),
			'active_theme' => Setting::first()->theme
			);

		return view('admin.themes.index', $data);
	}

	public function activate($slug)
	{
		$settings = Setting::first();
		$settings->theme = $slug;
		$settings->save();
		return Redirect::to('admin/themes')->with(array('note' => 'Successfully Activated ' . ucfirst($slug) . ' Theme', 'note_type' => 'success'));
	}

}
