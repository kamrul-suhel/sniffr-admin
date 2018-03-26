<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;
use Response;

use App\Page;
use App\Menu;
use App\VideoCategory;
use App\PostCategory;

use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;

use App\Libraries\ThemeHelper;
use App\Http\Controllers\Controller;

class AdminMediaController extends Controller {

	public function __construct()
    {
    	$this->middleware(['admin:admin']);
    }

	public function index()
	{
		return view('admin.media.index');
	}
	
}
