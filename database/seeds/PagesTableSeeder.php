<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PagesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        \DB::table('pages')->insert([
            [
                'user_id' => 1,
                'title' => 'Frequently Asked Questions',
                'slug' => 'faq',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
            [
                'user_id' => 1,
                'title' => 'Terms of Use',
                'slug' => 'terms-of-use',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
            [
                'user_id' => 1,
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
            [
                'user_id' => 1,
                'title' => 'Terms Ex',
                'slug' => 'terms-ex',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
            [
                'user_id' => 1,
                'title' => 'Terms Ex Contact Is Owner',
                'slug' => 'terms-ex-contact-is-owner',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
            [
                'user_id' => 1,
                'title' => 'terms ex allow publish',
                'slug' => 'terms-ex-allow-publish',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
            [
                'user_id' => 1,
                'title' => 'terms ex is exclusive',
                'slug' => 'terms-ex-is-exclusive',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
            [
                'user_id' => 1,
                'title' => 'terms non ex',
                'slug' => 'terms-non-ex',
                'body' => $faker->paragraph(200, true),
                'active' => 1,
            ],
        ]);
    }
}