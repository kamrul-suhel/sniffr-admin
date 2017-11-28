<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Menu extends Model {
	protected $guarded = array();

	protected $table = 'menu';

	public static $rules = array();

	public function hasChildren(){
		if(DB::table('menu')->where('parent_id', '=', $this->id)->count() >= 1){
			return true;
		} else {
			return false;
		}
	}

}