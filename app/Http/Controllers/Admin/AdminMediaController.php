<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class AdminMediaController extends Controller
{
	public function __construct()
    {
    	$this->middleware(['admin:admin']);
    }

	public function index()
	{
		return view('admin.media.index');
	}
}
