<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class VideoCollection extends Model {
	protected $guarded = array();

	protected $table = 'video_collections';

	public static $rules = array();

	public function videos(){
		return $this->hasMany(Video::class);
	}

	public function hasChildren(){
		if(DB::table('video_collections')->where('parent_id', '=', $this->id)->count() >= 1){
			return true;
		} else {
			return false;
		}
	}
}