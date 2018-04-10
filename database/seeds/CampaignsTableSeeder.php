<?php

use App\Campaign;
use App\Client;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

/**
 * Class CampaignsTableSeeder
 */
class CampaignsTableSeeder extends Seeder
{
    public function run()
    {
        $clientIds = Client::lists('id');
        $faker = Faker::create();
        foreach (range(1, 30) as $index) {
            Campaign::create([
                'client_id' => $faker->randomElement($clientIds),
                'name' => $faker->sentence(2),
                'slug' => $faker->slug(2)
            ]);
        }
    }
}