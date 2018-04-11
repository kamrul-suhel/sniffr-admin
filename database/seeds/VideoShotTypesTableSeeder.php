<?php

use Illuminate\Database\Seeder;

/**
 * Class VideoShotTypesTableSeeder
 * TODO maybe this should be moved to an config file because it doesn't change that often
 */
class VideoShotTypesTableSeeder extends Seeder
{
    public function run()
    {
        \DB::table('video_shot_types')->insert([
            [
                'parent_id' => NULL,
                'order' => 1,
                'name' => 'Drone',
                'slug' => 'drone',
            ],
            [
                'parent_id' => NULL,
                'order' => 2,
                'name' => 'Go Pro',
                'slug' => 'gopro',
            ],
            [
                'parent_id' => NULL,
                'order' => 3,
                'name' => 'Camera',
                'slug' => 'camera',
            ],
            [
                'parent_id' => NULL,
                'order' => 4,
                'name' => 'Mobile',
                'slug' => 'mobile',
            ],
            [
                'parent_id' => NULL,
                'order' => 5,
                'name' => 'Animation',
                'slug' => 'animation',
            ],
        ]);
    }
}