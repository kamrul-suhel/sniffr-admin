<?php

use App\Comment;
use App\User;
use App\Video;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CommentsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $videoIds = Video::lists('id');
        $userIds = User::lists('id');
        foreach (range(1, 30) as $index) {
            Comment::create([
                'video_id' => $faker->randomElement($videoIds),
                'contact_id' => NULL,
                'user_id' => $faker->randomElement($userIds),
                'comment' => $faker->sentence(10, true),
                'moderated' => $faker->randomElement([1, 0]),
            ]);
        }
    }
}