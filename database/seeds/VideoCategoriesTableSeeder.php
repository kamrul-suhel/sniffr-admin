<?php

use Illuminate\Database\Seeder;

/**
 * Class VideoCategoriesTableSeeder
 * TODO maybe this should be moved to an config file because it doesn't change that often
 */
class VideoCategoriesTableSeeder extends Seeder
{
    public function run()
    {
        \DB::table('video_categories')->insert([
            [
                'parent_id' => NULL,
                'order' => 1,
                'name' => 'UNILAD',
                'slug' => 'unilad',
            ],
            [
                'parent_id' => NULL,
                'order' => 3,
                'name' => 'Gaming',
                'slug' => 'gaming',
            ],
            [
                'parent_id' => NULL,
                'order' => 4,
                'name' => 'Adventure',
                'slug' => 'adventure',
            ],
            [
                'parent_id' => NULL,
                'order' => 6,
                'name' => 'Fitness',
                'slug' => 'fitness',
            ],
            [
                'parent_id' => NULL,
                'order' => 7,
                'name' => 'Grub',
                'slug' => 'grub',
            ],
            [
                'parent_id' => NULL,
                'order' => 8,
                'name' => 'Film',
                'slug' => 'film',
            ],
            [
                'parent_id' => NULL,
                'order' => 2,
                'name' => 'Tech',
                'slug' => 'tech',
            ],
            [
                'parent_id' => NULL,
                'order' => 5,
                'name' => 'Sound',
                'slug' => 'sound',
            ],
            [
                'parent_id' => NULL,
                'order' => 9,
                'name' => 'Sensitive',
                'slug' => 'sensitive',
            ],
            [
                'parent_id' => NULL,
                'order' => 10,
                'name' => 'Editorial',
                'slug' => 'editorial',
            ],
        ]);
    }
}