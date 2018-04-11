<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class LegalTerm
 * @package App
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @mixin \Eloquent
 */
class LegalTerm extends Model
{
    protected $guarded = [];
    public static $rules = [];
    protected $fillable = ['user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at'];
}
