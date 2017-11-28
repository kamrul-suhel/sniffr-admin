<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PostCategory extends Model {
	protected $guarded = array();

	protected $table = 'post_categories';

	public static $rules = array();

	public function posts(){
		return $this->hasMany(Post::class);
	}

	public function hasChildren(){
		if(DB::table('post_categories')->where('parent_id', '=', $this->id)->count() >= 1){
			return true;
		} else {
			return false;
		}
	}

}