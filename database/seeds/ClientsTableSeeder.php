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
                'name' => $faker->sentence(2),
                'slug' => $faker->slug(2),
            ]);
        }
    }
}