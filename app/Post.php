<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\PostCategory|null $category
 * @mixin \Eloquent
 */
class Post extends Model
{
    protected $guarded = [];
    public static $rules = [];
    protected $table = 'posts';
    protected $fillable = [
        'post_category_id',
        'user_id',
        'title',
        'slug',
        'image',
        'body',
        'body_guest',
        'access',
        'active',
        'created_at'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(PostCategory::class);
    }
}