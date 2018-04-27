<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        \DB::table('users')->insert([
            [
                'client_id' => null,
                'username' => 'ianlainchbury',
                'email' => 'ian@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'admin',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 0,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
                'created_at' => $faker->date(),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
            ],
            [
                'client_id' => NULL,
                'username' => 'mikewright',
                'email' => 'mike@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'admin',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 0,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
                'created_at' => $faker->date(),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
            ],
            [
                'client_id' => 1,
                'username' => 'dailymail',
                'email' => 'dailymail@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'client',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 0,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
                'created_at' => $faker->date(),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
            ],
            [
                'client_id' => NULL,
                'username' => 'kahmed',
                'email' => 'kamrul@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'admin',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 0,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
                'created_at' => $faker->date(),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
            ],
            [
                'client_id' => NULL,
                'username' => 'frank',
                'email' => 'frank@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'admin',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 0,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
                'created_at' => $faker->date(),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
            ],
            [
                'client_id' => NULL,
                'username' => 'manager',
                'email' => 'manager@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'manager',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 0,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
                'created_at' => $faker->date(),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
            ],
            [
                'client_id' => NULL,
                'username' => 'editorial',
                'email' => 'editorial@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'editorial',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 0,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
                'created_at' => $faker->date(),
                'password' => Hash::make(env('ADMIN_PASSWORD')),
            ],
        ]);
    }
}