<?php

use Illuminate\Database\Seeder;

/**
 * Class MenuTableSeeder
 * TODO maybe this should be moved to an config file because it doesn't change that often
 */
class MenuTableSeeder extends Seeder
{
    public function run()
    {
        \DB::table('menu')->insert(array (
            0 => 
            array (
                'parent_id' => NULL,
                'order' => 1,
                'name' => 'Home',
                'url' => '/',
                'type' => 'none',
            ),
            1 => 
            array (
                'parent_id' => NULL,
                'order' => 4,
                'name' => 'Pages',
                'url' => '/pages',
                'type' => 'none',
            ),
            2 => 
            array (
                'parent_id' => 4,
                'order' => 5,
                'name' => 'F.A.Q.s',
                'url' => '/page/faq',
                'type' => 'none',
            ),
            3 => 
            array (
                'parent_id' => NULL,
                'order' => 2,
                'name' => 'Videos',
                'url' => '',
                'type' => 'videos',
            ),
            4 => 
            array (
                'parent_id' => NULL,
                'order' => 3,
                'name' => 'Posts',
                'url' => '',
                'type' => 'posts',
            ),
        ));
        
        
    }
}