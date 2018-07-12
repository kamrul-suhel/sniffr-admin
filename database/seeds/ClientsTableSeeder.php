<?php

use App\Client;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ClientsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {
            Client::create([
                'name' => $index == 1 ? 'The DailyMail' : ( $index == 2 ? 'The Sun' : $faker->sentence(2) ),
                'slug' => $faker->slug(2),
				'tier' => $faker->randomElement(['social-media-agency', 'online', 'production', 'publisher', 'well-known', NULL]),
				'region' => $faker->randomElement(['western-europe', 'north-america', 'asia', 'singapore', 'china', NULL]),
                'active' => 1,
            ]);
        }
    }
}