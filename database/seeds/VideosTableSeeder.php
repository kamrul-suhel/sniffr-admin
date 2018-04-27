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
        $contactIds = Contact::pluck('id')->toArray();
        $videoCategoryIds = VideoCategory::pluck('id')->toArray();
        $videoCollectionIds = VideoCollection::pluck('id')->toArray();
        $videoShotTypeIds = VideoShotType::pluck('id')->toArray();
        $verticals = config('verticals');
        $states = config('videos.states');
        // "inprogress" and "noresponse" states aren't used currently.
        unset($states[3]);
        unset($states[8]);

        foreach (range(1, 60) as $index) {
            $videoDates[] = strtotime($index . ' days ago');
        }

        foreach (range(1, 1000) as $index) {
            $verticalOrientation = $faker->boolean(60);
            $dimension_height = $verticalOrientation ? '640' : '480';
            $dimension_width = $verticalOrientation ? '480' : '640';
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
                'youtube_id' => (array_search($state, $acceptedStates)) ? $faker->randomElement($youtubeIds) : NULL,
                'title' => $faker->sentence(10),
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
                'image' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1523079805-vid-20180406-wa0006-00001.jpg',
                'thumb' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1523079805-vid-20180406-wa0006-00001.jpg',
                'ext' => NULL,
                'url' => null,
                'file' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851.mp4',
                'file_watermark' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851-watermark.mp4',
                'file_watermark_dirty' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851-watermark-dirty.mp4',
                'link' => NULL,
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
                'created_at' => date('Y-m-d', $faker->randomElement($videoDates)),
                'licensed_at' => ($state == 'licensed') ? $faker->date() : null,
                'dimension_height' => $dimension_height,
                'dimension_width' => $dimension_width,
            ]);
        }
    }
}