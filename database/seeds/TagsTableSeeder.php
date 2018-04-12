<?php

use App\Tag;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class TagsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $tags = [];

        foreach (range(1, 300) as $index) {
            $word = $faker->word;
            // check if keyword already exists in the table
            if (key_exists($word, $tags)) {
                continue;
            }
            $tags[$word] = $word;

            Tag::create([
                'name' => $word,
            ]);
        }
    }
}