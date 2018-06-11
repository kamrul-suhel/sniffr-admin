<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
		App\Client::truncate();
		App\User::truncate();
		App\Tag::truncate();
		DB::table('youtube_access_tokens')->truncate();

        $this->call([
            ClientsTableSeeder::class,
            UsersTableSeeder::class,
            ContactsTableSeeder::class,
            VideoCategoriesTableSeeder::class,
            VideoCollectionsTableSeeder::class,
            VideoShotTypesTableSeeder::class,
            VideosTableSeeder::class,
            CommentsTableSeeder::class,
            DownloadsTableSeeder::class,
            FavoritesTableSeeder::class,
            MenuTableSeeder::class,
            PagesTableSeeder::class,
            TagsTableSeeder::class,
            TagVideoTableSeeder::class,
            YoutubeAccessTableSeeder::class,
            //OrdersTableSeeder::class,
        ]);
    }
}
