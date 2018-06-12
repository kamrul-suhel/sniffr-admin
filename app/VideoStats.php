<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp;

class VideoStats extends Model
{
    protected $table = 'video_stats';

    protected $fillable = ['video_social_link_id', 'likes', 'comments',
        'shares', 'reach', 'reactions', 'link_clicks'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function link()
    {
        return $this->belongsTo(VideoSocialLink::class);
    }

    /**
     * @param $link
     * @return mixed
     */
    public function validateUrl($link)
    {
        $client = new GuzzleHttp\Client();

        $validateResult = $client->post(env('INSIGHTS_URL').'/api/v1/validate_url',
            ['form_params' =>
                [
                    'link' => $link,
                    'user' => env('INSIGHTS_AUTH_USER'),
                    'pass' => env('INSIGHTS_AUTH_PASS'),
                ]
            ]);

        return json_decode($validateResult->getBody()->getContents());
    }

    /**
     * @param $link
     * @return mixed
     */
    public function getPost($link)
    {
        $client = new GuzzleHttp\Client();

        $result = $client->post(env('INSIGHTS_URL').'/api/v1/get_post',
            ['form_params' =>
                [
                    'link' => $link,
                    'user' => env('INSIGHTS_AUTH_USER'),
                    'pass' => env('INSIGHTS_AUTH_PASS'),
                ]
            ]);

        return json_decode($result->getBody()->getContents());
    }
}
