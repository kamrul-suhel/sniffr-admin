<?php 

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;

class ApiController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct(){
		
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('api.v1.documentation');
	}

}
