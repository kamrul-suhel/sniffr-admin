<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Download extends Model {

	protected $table = 'downloads';
	protected $guarded = array();
	public static $rules = array();

	protected $fillable = array('user_id', 'video_id');

	public function user(){
		return $this->belongsTo(User::class)->first();
	}

	public function video(){
		return $this->belongsTo(Video::class)->first();
	}
}
