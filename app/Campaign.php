<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Campaign
 *
 * @property int $id
 * @property int|null $client_id
 * @property string $name
 * @property string $slug
 * @property string|null $deleted_at
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Client|null $client
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Video[] $videos
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Campaign extends Model
{
    protected $guarded = [];
    public static $rules = [];
    protected $table = 'campaigns';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function videos()
    {
        return $this->belongsToMany(Video::class);
    }
}
