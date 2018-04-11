<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PagesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        \DB::table('pages')->insert([
            0 => [
                'user_id' => 1,
                'title' => 'Frequently Asked Questions',
                'slug' => 'faq',
                'body' => $faker->paragraph(20, true),
                'active' => 1,
            ],
            1 => [
                'user_id' => 1,
                'title' => 'Terms of Use',
                'slug' => 'terms-of-use',
                'body' => $faker->paragraph(20, true),
                'active' => 1,
            ],
            2 => [
                'user_id' => 1,
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'body' => $faker->paragraph(20, true),
                'active' => 1,
            ],
        ]);
    }
}