<?php

namespace Tests\Feature;

use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VideoUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_a_video()
    {
        $stub = __DIR__ . '/../fixtures/sample.m4v';
        $file_name = str_random(8) . '.m4v';
        $path = sys_get_temp_dir() . '/' . $file_name;

        copy($stub, $path);

        $file = new UploadedFile($path, $file_name, filesize($path), 'video/m4v', null, true);

        $faker = \Faker\Factory::create();
        $email = $faker->email;
        $name = $faker->name();

        $this->json('POST', '/upload', [
            'email' => $email,
            'full_name' => $name,
            'file' => $file,
            'terms' => '1'
        ]);

        $this->assertDatabaseHas('contacts', [
            'email' => $email,
        ]);
    }
}
