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
            0 => [
                'parent_id' => NULL,
                'order' => 1,
                'name' => 'UNILAD',
                'slug' => 'unilad',
            ],
            1 => [
                'parent_id' => NULL,
                'order' => 3,
                'name' => 'Gaming',
                'slug' => 'gaming',
            ],
            2 => [
                'parent_id' => NULL,
                'order' => 4,
                'name' => 'Adventure',
                'slug' => 'adventure',
            ],
            3 => [
                'parent_id' => NULL,
                'order' => 6,
                'name' => 'Fitness',
                'slug' => 'fitness',
            ],
            4 => [
                'parent_id' => NULL,
                'order' => 7,
                'name' => 'Grub',
                'slug' => 'grub',
            ],
            5 => [
                'parent_id' => NULL,
                'order' => 8,
                'name' => 'Film',
                'slug' => 'film',
            ],
            6 => [
                'parent_id' => NULL,
                'order' => 2,
                'name' => 'Tech',
                'slug' => 'tech',
            ],
            7 => [
                'parent_id' => NULL,
                'order' => 5,
                'name' => 'Sound',
                'slug' => 'sound',
            ],
            8 => [
                'parent_id' => NULL,
                'order' => 9,
                'name' => 'Sensitive',
                'slug' => 'sensitive',
            ],
            9 => [
                'parent_id' => NULL,
                'order' => 10,
                'name' => 'Editorial',
                'slug' => 'editorial',
            ],
        ]);
    }
}