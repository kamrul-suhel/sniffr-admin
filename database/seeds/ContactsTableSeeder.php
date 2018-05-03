<?php

use App\Contact;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ContactsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 300) as $index) {
            Contact::create([
                'full_name' => $faker->name,
                'email' => $faker->email,
                'tel' => $faker->phoneNumber,
                'language' => NULL,
                'location' => NULL,
                'paypal' => $faker->email,
                'facebook' => NULL,
                'youtube' => NULL,
                'instagram' => NULL,
                'twitter' => NULL,
                'other' => NULL,
            ]);
        }
    }
}