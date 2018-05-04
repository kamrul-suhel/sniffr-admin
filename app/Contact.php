<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Contact
 *
 * @property int $id
 * @property string|null $full_name
 * @property string|null $email
 * @property string|null $tel
 * @property string|null $language
 * @property string|null $location
 * @property string|null $paypal
 * @property string|null $facebook
 * @property string|null $youtube
 * @property string|null $instagram
 * @property string|null $twitter
 * @property string|null $other
 * @property string|null $deleted_at
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Video[] $videos
 * @property array|string reddit
 * @property array|string country_code
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Contact onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFacebook($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereInstagram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereOther($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact wherePaypal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereTel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereTwitter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereYoutube($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Contact withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Contact withoutTrashed()
 * @mixin \Eloquent
 */
class Contact extends Model
{
    use SoftDeletes;
    protected $softDelete = true;

    protected $fillable = [
        'full_name',
        'email',
        'tel',
        'language',
        'country_code',
        'location',
        'comments',
        'facebook',
        'youtube',
        'instagram',
        'twitter',
        'reddit',
        'other',
        'terms'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
