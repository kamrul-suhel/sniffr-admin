<?php

use App\Contact;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ContactsTableSeeder extends Seeder
{
    public function run()
    {
        $languages = config('languages');
        $countries = config('countries');
        $faker = Faker::create();
        foreach (range(1, 300) as $index) {
            Contact::create([
                'full_name' => $faker->name,
                'email' => $faker->email,
                'tel' => $faker->phoneNumber,
                'language' => $faker->randomElement($languages)['code'],
                'country_code' => $faker->randomElement($countries)['code'],
                'location' => $faker->city,
                'paypal' => $faker->email,
                'facebook' => NULL,
                'youtube' => NULL,
                'instagram' => NULL,
                'twitter' => NULL,
                'reddit' => NULL,
                'other' => NULL,
            ]);
        }

		Contact::create([
			'full_name' => 'REDDIT IAN - Test',
			'reddit' => 'schooch',
		]);

		Contact::create([
			'full_name' => 'TWITTER IAN - Test',
			'twitter' => 'ian_tweettest',
		]);

		Contact::create([
			'full_name' => 'IMGUR IAN - Test',
			'imgur' => 'schoooch',
		]);
    }
}