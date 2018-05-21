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
            'file' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000',
            'image' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg',
            'extension' => '.mp4',
            'mime' => 'video/mp4',
            'vertical' => 0,
            'dimension_width' => 640,
            'dimension_height' => 480,
        ];
        $vertical_video =  [
            'file' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5',
            'image' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg',
            'extension' => '.MOV',
            'mime' => 'video/quicktime',
            'vertical' => 1,
            'dimension_width' => 480,
            'dimension_height' => 640,
        ];
        $contactIds = Contact::pluck('id')->toArray();
        $videoCategoryIds = VideoCategory::pluck('id')->toArray();
        $videoCollectionIds = VideoCollection::pluck('id')->toArray();
        $videoShotTypeIds = VideoShotType::pluck('id')->toArray();
        //$verticals = config('verticals');
        $social_videos = [
            'facebook' => [
                'url' => 'https://www.facebook.com/uniladmag/videos/3761625000527198/',
                'image' => 'https://graph.facebook.com/3761625000527198/picture',
                'thumb' => 'https://graph.facebook.com/3761625000527198/picture',
                'youtube_id' => null,
            ],
            'instagram' => [
                'url' => 'https://www.instagram.com/p/BbC_fm_nf-b/',
                'image' => 'https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg',
                'thumb' => 'https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg',
                'youtube_id' => null,
            ],
            'twitter' => [
                'url' => 'https://twitter.com/AleReyes10/status/938830145263165440',
                'image' => 'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',
                'thumb' => 'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',
                'youtube_id' => null,
            ],
            'youtube' => [
                'url' => 'https://www.youtube.com/watch?v=hI_J8rK9jyw',
                'image' => 'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',
                'thumb' => 'https://img.youtube.com/vi/hI_J8rK9jyw/default.jpg',
                'youtube_id' => 'hI_J8rK9jyw',
            ]
        ];

        $sites = ['lad book', 'other site', 'viral site'];

        $states = config('videos.states');
        // "inprogress" and "noresponse" states aren't used currently.
        unset($states[3]);
        unset($states[8]);

        $videoDates =[];
        foreach (range(1, 60) as $index) {
            $videoDates[] = strtotime($index . ' days ago');
        }

        foreach (range(1, 1000) as $index) {
            $social_video = $faker->boolean(60);
            $submitted_elsewhere = $faker->boolean(70);
            $social_video_data = $social_video ? $faker->randomElement($social_videos) : null;

            $video_file = $faker->randomElement([$horizontal_video, $vertical_video]);

            $video_data = (!$social_video) ? $video_file : null;

            $state = $faker->randomElement($states);
            $youtubeIds = ['8geuehYuMP0','eK0pO79YkvY','8GvDudVgxCY'];

            $youtubeStates = ['accepted', 'licensed'];
            $exclusiveStates = ['pending', 'licensed', 'restricted', 'problem'];

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
                'mime' => $social_video ? null : $video_data['mime'],
                'rights' => 'ex',
                'youtube_id' => $social_video ? $social_video['youtube_id'] : ((array_search($state, $youtubeStates)) ? $faker->randomElement($youtubeIds) : NULL),
                'title' => $faker->sentence(4),
                'access' => 'guest',
                'details' => NULL,
                'notes' => NULL,
                'nsfw' => $faker->boolean(1),
                'referrer' => 0,
                'credit' => NULL,
                'active' => $faker->boolean(80),
                'featured' => (($state == 'licensed') && !$social_video) ? $faker->boolean(4) : 0,
                'views' => $faker->numberBetween(0, 1000),
                'image' => $social_video ? $social_video_data['image'] : $video_data['image'],
                'thumb' => $social_video ? $social_video_data['image'] : $video_data['image'],
                'ext' => NULL,
                'url' => $social_video ? $social_video_data['url'] : null,

                'file' => $social_video ? null : $video_data['file'] . $video_data['extension'],
                'file_watermark' => $social_video ? null : $video_data['file'] . '-watermark' . $video_data['extension'],
                'file_watermark_dirty' => $social_video ? null : $video_data['file'] . '-watermark-dirty' . $video_data['extension'],
                'link' => '',
                'vertical' => ($social_video) ? null : $video_data['vertical'],
                'embed_code' => '',
                'duration' => $faker->numberBetween(10, 1000),
                'reminders' => (array_search($state, $exclusiveStates)) ? $faker->randomNumber(1) : NULL,
                'source' => $referral,
                'more_details' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'more_details_sent' => (array_search($state, $exclusiveStates) || $state == 'accepted') ? $faker->dateTime() : NULL,
                'more_details_code' => (array_search($state, $exclusiveStates) || $state == 'accepted') ? $faker->uuid : NULL,
                'date_filmed' => (array_search($state, $exclusiveStates)) ? $faker->date() : NULL,
                'location' => (array_search($state, $exclusiveStates)) ? $faker->city : NULL,
                'description' => (array_search($state, $exclusiveStates)) ? $faker->paragraph(50) : NULL,
                'filmed_by_me' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'permission' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'submitted_elsewhere' => (array_search($state, $exclusiveStates)) ? $submitted_elsewhere : NULL,
                'submitted_where' => (((array_search($state, $exclusiveStates)) && $submitted_elsewhere)) ? $faker->randomElement($sites) : NULL,
                'contact_is_owner' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'allow_publish' => (array_search($state, $exclusiveStates)) ? 1 : NULL,
                'is_exclusive' => (array_search($state, $exclusiveStates)) ? 1 : NULL,

                'terms' => NULL,
                'ip' => $faker->ipv4,
                'user_agent' => $faker->userAgent,
                'licensed_at' => ($state == 'licensed') ? $faker->dateTime() : null,
                'dimension_height' => ($social_video) ? null : $video_data['dimension_height'],
                'dimension_width' => ($social_video) ? null : $video_data['dimension_width'],
                'created_at' => date('Y-m-d', $faker->randomElement($videoDates)),
            ]);
        }
    }
}