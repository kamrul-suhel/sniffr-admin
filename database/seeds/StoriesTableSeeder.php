<?php

use App\Story;
use Illuminate\Database\Seeder;
use App\Libraries\VideoHelper;
use Faker\Factory as Faker;

class StoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$faker = Faker::create();

		Story::create([
			'alpha_id' => VideoHelper::quickRandom(),
			'state' => 'unapproved',
			'user_id' => 1,
			'contact_id' => 301,
			'title' => $faker->sentence(4),
			'active' => 1,
			'flagged' => 0,
			'source' => 'https://www.reddit.com/r/firstworldanarchists/comments/6jsdo2/the_portuguese_love_a_bit_of_it/',
			'type' => 'new',
			'created_at' => now(),
		]);

		Story::create([
			'alpha_id' => VideoHelper::quickRandom(),
			'state' => 'unapproved',
			'user_id' => 1,
			'contact_id' => 302,
			'title' => $faker->sentence(4),
			'active' => 1,
			'flagged' => 0,
			'source' => 'https://twitter.com/ianlainchbury/status/1020272452918824962',
			'type' => 'new',
			'created_at' => now(),
		]);

		Story::create([
			'alpha_id' => VideoHelper::quickRandom(),
			'state' => 'unapproved',
			'user_id' => 1,
			'contact_id' => 303,
			'title' => $faker->sentence(4),
			'active' => 1,
			'flagged' => 0,
			'source' => 'https://imgur.com/gallery/M87Hvmq',
			'type' => 'new',
			'created_at' => now(),
		]);
    }
}
