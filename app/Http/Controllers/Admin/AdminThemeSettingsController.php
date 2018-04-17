<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Redirect;
use App\Setting;
use App\Libraries\ThemeHelper;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class AdminThemeSettingsController extends Controller
{
	/**
     * constructor.
     */
    public function __construct()
    {
        $this->middleware('admin');
    }

	public function theme_settings(){
		$settings = Setting::first();
		$user = Auth::user();
		$data = array(
			'settings' => $settings,
			'admin_user'	=> $user,
			);
		return view('admin.settings.theme_settings', $data);
	}

	public function theme_settings_form(){
		$settings = Setting::first();
		$user = Auth::user();

		$data = array(
			'settings' => $settings,
			'admin_user'	=> $user,
			'theme_settings' => ThemeHelper::getThemeSettings(),
			);
		return view('Theme::includes.settings', $data);
	}

	public function update_theme_settings(){
		// Get the Active Theme
		$active_theme = Setting::first()->theme;

		$input = Input::all();
		foreach($input as $key => $value){
			$this->createOrUpdateThemeSetting($active_theme, $key, $value);
		}

		return Redirect::to('/admin/theme_settings');
	}

	private function createOrUpdateThemeSetting($theme_slug, $key, $value){

       	$setting = array(
        		'theme_slug' => $theme_slug,
        		'key' => $key,
        		'value' => $value
        	);

       	$theme_setting = ThemeSetting::where('theme_slug', '=', $theme_slug)->where('key', '=', $key)->first();

        if (isset($theme_setting->id))
        {
            $theme_setting->update($setting);
            $theme_setting->save();
        }
        else
        {
            ThemeSetting::create($setting);
        }

    }

 }
