<?php

use Illuminate\Database\Seeder;

class VideoShotTypesTableSeeder extends Seeder
{
    public function run()
    {
        \DB::table('video_shot_types')->insert([
            0 => [
                'parent_id' => NULL,
                'order' => 1,
                'name' => 'Drone',
                'slug' => 'drone',
            ],
            1 => [
                'parent_id' => NULL,
                'order' => 2,
                'name' => 'Go Pro',
                'slug' => 'gopro',
            ],
            2 => [
                'parent_id' => NULL,
                'order' => 3,
                'name' => 'Camera',
                'slug' => 'camera',
            ],
            3 => [
                'parent_id' => NULL,
                'order' => 4,
                'name' => 'Mobile',
                'slug' => 'mobile',
            ],
            4 => [
                'parent_id' => NULL,
                'order' => 5,
                'name' => 'Animation',
                'slug' => 'animation',
            ],
        ]);
    }
}