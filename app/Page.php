<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class Page extends Model
{
    //use SoftDeletes;
    protected $table = 'pages';
    protected $fillable = ['user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at'];
}
