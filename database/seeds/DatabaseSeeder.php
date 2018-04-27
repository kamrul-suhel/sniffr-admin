<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ClientsTableSeeder::class,
            UsersTableSeeder::class,
            ContactsTableSeeder::class,
            VideoCategoriesTableSeeder::class,
            VideoCollectionsTableSeeder::class,
            VideoShotTypesTableSeeder::class,
            VideosTableSeeder::class,
            CampaignsTableSeeder::class,
            CampaignVideoTableSeeder::class,
            CommentsTableSeeder::class,
            //DownloadsTableSeeder::class, not being used now
            FavoritesTableSeeder::class,
            MenuTableSeeder::class,
            PagesTableSeeder::class,
            LegalTermsSeeder::class,
            TagsTableSeeder::class,
            TagVideoTableSeeder::class,
            YoutubeAccessTableSeeder::class,
        ]);
    }
}
