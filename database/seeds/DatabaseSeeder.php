<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            ContactsTableSeeder::class,
            VideoCategoriesTableSeeder::class,
            VideoCollectionsTableSeeder::class,
            VideoShotTypesTableSeeder::class,
            VideosTableSeeder::class,
            CampaignVideoTableSeeder::class,
            ClientsTableSeeder::class,
            CommentsTableSeeder::class,
            DownloadsTableSeeder::class,
            FavoritesTableSeeder::class,
            MenuTableSeeder::class,
            PagesTableSeeder::class,
            LegalTermsSeeder::class,
            TagsTableSeeder::class,
            TagVideoTableSeeder::class,
        ]);
    }
}
