<?php

use App\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    public function run()
    {
        $sampleTagNames = ['dog', 'cat'];

        foreach ($sampleTagNames as $tag) {
            Tag::create([
                'name' => $tag,
            ]);
        }
    }
}