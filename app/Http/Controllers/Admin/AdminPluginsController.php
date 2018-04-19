<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Redirect;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminPluginsController extends Controller
{

    /**
     * AdminPluginsController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $plugins = $this->get_plugins();

        $data = [
            'user' => Auth::user(),
            'plugins' => $plugins,
        ];

        return view('admin.plugins.index', $data);
    }

    /**
     * @return array
     */
    public function get_plugins()
    {
        $plugins = [];
        $plugin_folder = 'content/plugins';
        $plugins_dir = @ opendir($plugin_folder);

        if ($plugins_dir) {
            while (($folder = readdir($plugins_dir)) !== false) {
                if (@is_readable("$plugin_folder/$folder/info.json")) {
                    $plugin_info = file_get_contents("$plugin_folder/$folder/info.json");
                    $plugin_info = json_decode($plugin_info, true);
                    $plugin_info['slug'] = $folder;
                    array_push($plugins, $plugin_info);
                }
            }
            closedir($plugins_dir);
        }
        return $plugins;
    }

    /**
     * @param $slug
     * @return bool|mixed|string
     */
    private function get_plugin($slug)
    {
        $plugin_folder = 'content/plugins';
        if (@is_readable("$plugin_folder/$slug/info.json")) {
            $plugin_info = file_get_contents("$plugin_folder/$slug/info.json");
            $plugin_info = json_decode($plugin_info, true);
            $plugin_info['slug'] = $slug;
        }
        return $plugin_info;
    }

    /**
     * @param $slug
     * @return \Illuminate\Http\RedirectResponse
     */
    public function activate($slug)
    {
        $plugin = Plugin::where('slug', '=', $slug)->first();
        $plugin_data = $this->get_plugin($slug);
        if (!empty($plugin->slug)) {
            $plugin->active = 1;
            $plugin->save();
        } else {
            $new_plugin = new Plugin();
            $new_plugin->name = $plugin_data['name'];
            $new_plugin->description = $plugin_data['description'];
            $new_plugin->version = $plugin_data['version'];
            $new_plugin->slug = $slug;
            $new_plugin->active = 1;
            $new_plugin->save();
        }

        return Redirect::to('admin/plugins')->with([
            'note' => 'Successfully Activated ' . $plugin_data['name'],
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $slug
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deactivate($slug)
    {
        $plugin_data = $this->get_plugin($slug);
        $plugin = Plugin::where('slug', '=', $slug)->first();
        $plugin->active = 0;
        $plugin->save();

        return Redirect::to('admin/plugins')->with([
            'note' => 'Successfully De-activated ' . $plugin_data['name'],
            'note_type' => 'success'
        ]);
    }
}
