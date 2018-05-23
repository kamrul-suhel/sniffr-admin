<?php

use App\Order;
use App\User;
use App\Video;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $videoIds = Video::pluck('id')->toArray();
        $userIds = User::where('client_id', '!=', null)->get()->toArray();

        foreach (range(1, 200) as $index) {
            $user = $faker->randomElement($userIds);
            Order::create([
                'video_id' => $faker->randomElement($videoIds),
                'user_id' => $user['id'],
                'client_id' => $user['client_id'],
                'ip' => $faker->ipv4,
                'user_agent' => $faker->userAgent,
                'ordered_at' => $faker->dateTime(),
            ]);
        }
    }
}
