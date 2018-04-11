<?php

use Illuminate\Database\Seeder;

/**
 * Class VideoCollectionsTableSeeder
 * TODO maybe this should be moved to an config file because it doesn't change that often
 */
class VideoCollectionsTableSeeder extends Seeder
{
    public function run()
    {
        \DB::table('video_collections')->insert([
            0 => [
                'parent_id' => NULL,
                'order' => 1,
                'name' => 'Animals',
                'slug' => 'animals',
            ],
            1 => [
                'parent_id' => NULL,
                'order' => 2,
                'name' => 'New Content',
                'slug' => 'new-content',
            ],
            2 => [
                'parent_id' => NULL,
                'order' => 3,
                'name' => 'Fails',
                'slug' => 'fails',
            ],
            3 => [
                'parent_id' => NULL,
                'order' => 4,
                'name' => 'News/Newsworthy',
                'slug' => 'newsworthy',
            ],
            4 => [
                'parent_id' => NULL,
                'order' => 5,
                'name' => 'Funny/Humour',
                'slug' => 'funny',
            ],
            5 => [
                'parent_id' => NULL,
                'order' => 6,
                'name' => 'Feel Good',
                'slug' => 'feel-good',
            ],
            6 => [
                'parent_id' => NULL,
                'order' => 7,
                'name' => 'Sports',
                'slug' => 'sports',
            ],
            7 => [
                'parent_id' => NULL,
                'order' => 8,
                'name' => 'Weather',
                'slug' => 'weather',
            ],
            8 => [
                'parent_id' => NULL,
                'order' => 9,
                'name' => 'Cool Stuff',
                'slug' => 'cool-stuff',
            ],
            9 => [
                'parent_id' => NULL,
                'order' => 10,
                'name' => 'Archive',
                'slug' => 'archive',
            ],
        ]);
    }
}