<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
// use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Client
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $deleted_at
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Campaign[] $campaigns
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Client extends Model
{
    use Notifiable;

    protected $guarded = [];

  	public static $rules = array();

    protected $table = 'clients';

  	//protected $fillable = array('user_id', 'title', 'slug', 'image', 'body', 'active', 'created_at');

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }

    public function routeNotificationForSlack()
    {
        return 'https://hooks.slack.com/services/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';
    }
}
