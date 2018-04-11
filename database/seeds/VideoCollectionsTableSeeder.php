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
            [
                'parent_id' => NULL,
                'order' => 1,
                'name' => 'Animals',
                'slug' => 'animals',
            ],
            [
                'parent_id' => NULL,
                'order' => 2,
                'name' => 'New Content',
                'slug' => 'new-content',
            ],
            [
                'parent_id' => NULL,
                'order' => 3,
                'name' => 'Fails',
                'slug' => 'fails',
            ],
            [
                'parent_id' => NULL,
                'order' => 4,
                'name' => 'News/Newsworthy',
                'slug' => 'newsworthy',
            ],
            [
                'parent_id' => NULL,
                'order' => 5,
                'name' => 'Funny/Humour',
                'slug' => 'funny',
            ],
            [
                'parent_id' => NULL,
                'order' => 6,
                'name' => 'Feel Good',
                'slug' => 'feel-good',
            ],
            [
                'parent_id' => NULL,
                'order' => 7,
                'name' => 'Sports',
                'slug' => 'sports',
            ],
            [
                'parent_id' => NULL,
                'order' => 8,
                'name' => 'Weather',
                'slug' => 'weather',
            ],
            [
                'parent_id' => NULL,
                'order' => 9,
                'name' => 'Cool Stuff',
                'slug' => 'cool-stuff',
            ],
            [
                'parent_id' => NULL,
                'order' => 10,
                'name' => 'Archive',
                'slug' => 'archive',
            ],
        ]);
    }
}