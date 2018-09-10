<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    protected $table = 'audits';

    public function videoTagUpdate($video, $tags)
	{
		return \DB::table('audits')->insert([
			'user_type' => 'App\User',
			'user_id' => auth()->user()->id,
			'event' => 'updated',
			'auditable_type' => 'App\Video',
			'auditable_id' => request()->get('id'),
			'old_values' => implode(',',$video->tags->pluck('name')->toArray()),
			'new_values' => str_replace(' ', '',rtrim($tags)),
			'url' => request()->url(),
			'created_at' => now(),
			'updated_at' => now()
		]);
	}
}
