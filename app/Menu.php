<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read boolean $hasChildren
 * @mixin \Eloquent
 */
class Menu extends Model
{
    protected $guarded = [];
    protected $table = 'menu';
    public static $rules = [];

    public function hasChildren()
    {
        if (DB::table('menu')->where('parent_id', '=', $this->id)->count() >= 1) {
            return true;
        }
    }

}