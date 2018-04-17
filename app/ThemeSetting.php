<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class ThemeSetting extends Model
{
    protected $guarded = [];
    public static $rules = [];
    protected $fillable = ['theme_slug', 'key', 'value'];
}