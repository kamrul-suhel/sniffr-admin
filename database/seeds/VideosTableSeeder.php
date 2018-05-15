<?php

use App\Contact;
use App\Libraries\VideoHelper;
use App\Video;
use App\VideoCategory;
use App\VideoCollection;
use App\VideoShotType;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class VideosTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $horizontal_video = [
            'file' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4',
            'image' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg'
        ];
        $vertical_video =  [
            'file' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV',
            'image' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg'
        ];
        $contactIds = Contact::pluck('id')->toArray();
        $videoCategoryIds = VideoCategory::pluck('id')->toArray();
        $videoCollectionIds = VideoCollection::pluck('id')->toArray();
        $videoShotTypeIds = VideoShotType::pluck('id')->toArray();
        //$verticals = config('verticals');
        $social_videos = [
            'instagram' => [
                'url' => 'https://www.instagram.com/p/BhLgtbSnHCQ/embed/captioned/?cr=1&v=8&wp=658&rd=sniffrmedia.co.uk#%7B%22ci%22%3A3%2C%22os%22%3A1439890.7%7D',
                'image' => ''
            ],
            'facebook' => [
                'url' => 'https://www.facebook.com/v2.11/plugins/video.php?allowfullscreen=true&app_id=151068855526504&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FRQ7NiRXMcYA.js%3Fversion%3D42%23cb%3Df159526e5446e7c%26domain%3Dsniffrmedia.co.uk%26origin%3Dhttps%253A%252F%252Fsniffrmedia.co.uk%252Ff1a4351b06cdd14%26relation%3Dparent.parent&container_width=1153&href=https%3A%2F%2Fwww.facebook.com%2Ftracy.butler3%2Fvideos%2Fo.146505212039213%2F10156335040753485%2F%3Ftype%3D2%26theater&locale=en_GB&sdk=joey',
                'image' => ''
            ],
            'twitter' => [
                'url' => 'https://twitter.com/_3Trinity/status/768577512112664580/video/1',
                'image' => ''
            ]
        ];

        $states = config('videos.states');
        // "inprogress" and "noresponse" states aren't used currently.
        unset($states[3]);
        unset($states[8]);

        foreach (range(1, 1000) as $index) {
            $social_video = $faker->boolean(60);
            $social_video_data = $social_video ? $faker->randomElement($social_videos) : null;
            $verticalOrientation = $faker->boolean(60);
            $video_data = (!$social_video) ? ($verticalOrientation ? $vertical_video : $horizontal_video) : null;
            $dimension_height = (!$social_video) ? ($verticalOrientation ? '640' : '480') : null;
            $dimension_width = (!$social_video) ? ($verticalOrientation ? '480' : '640') : null;

            $state = $faker->randomElement($states);
            $youtubeIds = ['8geuehYuMP0','eK0pO79YkvY','8GvDudVgxCY'];
            $acceptedStates = ['accepted', 'licensed'];
            $exclusiveStates = ['pending', 'licensed'];
            //TODO: source should be renamed to referral and be an enum field
            $referral = $faker->randomElement(['facebook', 'website', NULL]);

            Video::create([
                'alpha_id' => VideoHelper::quickRandom(),
                'maybe' => NULL,
                'user_id' => NULL,
                'state' => $state,
                'contact_id' => $faker->randomElement($contactIds),
                'video_category_id' => $faker->randomElement($videoCategoryIds),
                'video_collection_id' => $faker->randomElement($videoCollectionIds),
                'video_shottype_id' => $faker->randomElement($videoShotTypeIds),
                'mime' => $faker->randomElement(['video/mp4', 'video/quicktime', 'video/x-m4v']),
                'rights' => 'ex',
                'youtube_id' => $social_video ? null : ((array_search($state, $acceptedStates)) ? $faker->randomElement($youtubeIds) : NULL),
                'title' => $faker->sentence(4),
                'access' => 'guest',
                'details' => NULL,
                'description' => $faker->paragraph(50),
                'notes' => NULL,
                'nsfw' => $faker->boolean(5),
                'referrer' => $faker->name(),
                'credit' => $faker->name(),
                'active' => $faker->boolean(80),
                'featured' => $faker->boolean(1),
                'views' => $faker->numberBetween(0, 1000),
                'image' => $social_video ? $social_video_data['image'] : $video_data['image'],
                'thumb' => $social_video ? $social_video_data['image'] : $video_data['image'],
                'ext' => NULL,
                'url' => $social_video ? $social_video_data['url'] : null,

                'file' => $social_video ? null : $video_data['file'] . '.mp4',
                'file_watermark' => $social_video ? null : $video_data['file'] . '-watermark.mp4',
                'file_watermark_dirty' => $social_video ? null : $video_data['file'] . '-watermark-dirty.mp4',

                'link' => '',
                'vertical' => $verticalOrientation,
                'embed_code' => '',
                'duration' => $faker->numberBetween(10, 1000),
                'date_filmed' => $faker->date(),
                'location' => $faker->city,
                'source' => $referral,
                'more_details' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'more_details_sent' => (array_search($state, $exclusiveStates)) ? $faker->dateTime() : NULL,
                'more_details_code' => (array_search($state, $exclusiveStates)) ? $faker->uuid : NULL,
                'reminders' => NULL,
                'contact_is_owner' => NULL,
                'submitted_elsewhere' => NULL,
                'submitted_where' => NULL,
                'allow_publish' => NULL,
                'filmed_by_me' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'permission' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'is_exclusive' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'terms' => NULL,
                'ip' => $faker->ipv4,
                'user_agent' => $faker->userAgent,
                'licensed_at' => ($state == 'licensed') ? $faker->dateTime() : null,
                'dimension_height' => $dimension_height,
                'dimension_width' => $dimension_width,
            ]);
        }
    }
}