<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class YoutubeAccessTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        \DB::table('youtube_access_tokens')->insert([
            [
                'access_token' => '',
                'created_at' => $faker->dateTime(),
            ],
        ]);
    }
}
