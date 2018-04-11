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
            $tags[$word] = 1;

            if (key_exists($word, $tags)) {
                continue;
            }

            Tag::create([
                'name' => $faker->word,
            ]);
        }
    }
}