<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\Post|null $posts
 * @mixin \Eloquent
 */
class PostCategory extends Model
{
    protected $guarded = [];
    protected $table = 'post_categories';
    public static $rules = [];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function hasChildren()
    {
        return (DB::table('post_categories')->where('parent_id', '=', $this->id)->count() >= 1);
    }
}