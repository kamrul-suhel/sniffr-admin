<?php

use App\Order;
use App\Story;
use App\User;
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
        $storyIds = Story::pluck('id')->toArray();
        $userIds = User::where('client_id', '!=', null)->get()->toArray();

        foreach (range(1, 200) as $index) {
            $user = $faker->randomElement($userIds);
            Order::create([
                'story_id' => $faker->randomElement($storyIds),
                'user_id' => $user['id'],
                'client_id' => $user['client_id'],
                'ip_address' => $faker->ipv4,
                'user_agent' => $faker->userAgent,
            ]);
        }
    }
}
