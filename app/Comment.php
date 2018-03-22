<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Comment
 * @property int $id
 * @property int $user_id
 * @property string $comment
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $created_at
 * @property mixed $contact
 * @property mixed $video
 * @property mixed $user
 * @property int|null video_id
 */
class Comment extends Model
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contact(){
        return $this->belongsTo(Contact::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function video(){
        return $this->belongsTo(Video::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo(User::class);
    }
}
