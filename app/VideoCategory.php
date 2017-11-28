<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class VideoCategory extends Model {
	protected $guarded = array();

	protected $table = 'video_categories';

	public static $rules = array();

	public function videos(){
		return $this->hasMany(Video::class);
	}

	public function hasChildren(){
		if(DB::table('video_categories')->where('parent_id', '=', $this->id)->count() >= 1){
			return true;
		} else {
			return false;
		}
	}
}