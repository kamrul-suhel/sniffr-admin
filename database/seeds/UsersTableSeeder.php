<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        \DB::table('users')->insert([
            0 => 
            [
                'client_id' => NULL,
                'username' => 'ianlainchbury',
                'email' => 'ian@unilad.co.uk',
                'avatar' => 'default.jpg',
                'role' => 'admin',
                'active' => 1,
                'activation_code' => NULL,
                'stripe_active' => 1,
                'stripe_id' => NULL,
                'stripe_subscription' => NULL,
                'stripe_plan' => NULL,
                'last_four' => NULL,
                'trial_ends_at' => NULL,
                'subscription_ends_at' => NULL,
            ],
            1 => 
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
            ],
            2 => 
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
            ],
            3 => 
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
            ],
            4 => 
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
            ],
        ]);
    }
}