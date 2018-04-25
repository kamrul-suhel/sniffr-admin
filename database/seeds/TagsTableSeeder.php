<?php

use App\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    public function run()
    {
        $sampleTagNames = ['dog', 'cat', 'funny', 'tv', 'accident'];

        foreach ($sampleTagNames as $tag) {
            Tag::create([
                'name' => $tag,
            ]);
        }
    }
}