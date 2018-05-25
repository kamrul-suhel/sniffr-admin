<?php

use App\Libraries\VideoHelper;
use App\Story;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class StoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        //$contactIds = Contact::pluck('id')->toArray();
        $states = config('videos.states');

        foreach (range(1, 200) as $index) {
            //$state = $faker->randomElement($states);

            Story::create([
                'alpha_id' => VideoHelper::quickRandom(),
                'title' => $faker->title,
                'created_at' => $faker->date(),
            ]);
        }
    }
}
