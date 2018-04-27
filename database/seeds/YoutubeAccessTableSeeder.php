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

        \DB::table('users')->insert([
            [
                'access_token' => 'ya29.Gl2nBefoVnCXvox0TSmppbH8eTe5f6OFgs9nUH6omMQfTUySfHml9ycCkxaMuA5quBadAy73U9_LlwoMcd_qnuCYIsufx8eALCI7g5t4uAr6-PUVJigMsaHHED9ZBIs',
                'created_at' => $faker->dateTime(),
            ],
        ]);
    }
}
