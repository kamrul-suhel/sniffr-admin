<?php

namespace Tests\Feature;

use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VideoUploadTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @group uploadVideo
     */
    public function test_user_can_upload_a_video()
    {
        $mimeType = 'video/x-m4v';
        $stub = __DIR__ . '/../fixtures/sample.m4v';
        $file_name = str_random(8) . '.m4v';
        $path = sys_get_temp_dir() . '/' . $file_name;
        copy($stub, $path);

        $file = new UploadedFile($path, $file_name, filesize($path), $mimeType, null, true);

        $faker = \Faker\Factory::create();
        $email = $faker->email;
        $name = $faker->name();
        $title = $faker->sentence;

        $response = $this->json('POST', '/upload', [
            'email' => $email,
            'full_name' => $name,
            'title' => $title,
            'file' => $file,
            'terms' => '1'
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'success'
        ]);

        $this->assertDatabaseHas('contacts', [
            'email' => $email,
        ]);

        $this->assertDatabaseHas('videos', [
            'title' => $title,
            'mime' => $mimeType,
        ]);
    }

    /**
     * @group uploadVideo
     */
    public function test_user_fails_to_upload_a_video()
    {
        $mimeType = 'video/x-m4v';
        $stub = __DIR__ . '/../fixtures/sample.m4v';
        $file_name = str_random(8) . '.m4v';
        $path = sys_get_temp_dir() . '/' . $file_name;
        copy($stub, $path);

        $file = new UploadedFile($path, $file_name, filesize($path), $mimeType, null, true);

        $faker = \Faker\Factory::create();
        $email = $faker->email;
        $name = $faker->name();
        $title = $faker->sentence;

        $response = $this->json('POST', '/upload', [
            'email' => $email,
            'full_name' => $name,
            'title' => $title,
            'file' => $file,
            'terms' => '1'
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'success'
        ]);

        $this->assertDatabaseHas('contacts', [
            'email' => $email,
        ]);

        $this->assertDatabaseHas('videos', [
            'title' => $title,
            'mime' => $mimeType,
        ]);
    }

    /**
     * @group sendVideoUrl
     */
    public function test_user_can_send_a_video_url()
    {
        $faker = \Faker\Factory::create();
        $email = $faker->email;
        $name = $faker->name();
        $title = $faker->sentence;
        $url = $faker->url;

        $response = $this->json('POST', '/upload', [
            'email' => $email,
            'full_name' => $name,
            'title' => $title,
            'url' => $url,
            'terms' => '1'
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'success'
        ]);

        $this->assertDatabaseHas('contacts', [
            'email' => $email,
        ]);

        $this->assertDatabaseHas('videos', [
            'title' => $title,
            'url' => $url,
        ]);
    }

    /**
     * @group sendVideoUrl
     */
    public function test_user_fails_to_send_video_url()
    {
        $faker = \Faker\Factory::create();
        $email = $faker->email;
        $name = $faker->name();
        $title = $faker->sentence;
        $url = 'bad link';

        $response = $this->json('POST', '/upload', [
            'email' => $email,
            'full_name' => $name,
            'title' => $title,
            'url' => $url,
            'terms' => '1'
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'success'
        ]);

        $this->assertDatabaseHas('contacts', [
            'email' => $email,
        ]);

        $this->assertDatabaseHas('videos', [
            'title' => $title,
            'url' => $url,
        ]);
    }
}
