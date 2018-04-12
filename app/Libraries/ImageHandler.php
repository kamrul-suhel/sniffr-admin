<?php

namespace App\Libraries;

trait ImageHandler {

	public static function uploadImage($image, $folder, $filename = '', $type = 'upload'){
		return ImageHandler::upload(array('image' => $image, 'folder' => $folder, 'filename' => $filename, 'type' => $type) );
	}

	public static function getImage($image, $size = ''){
		$img = ''; // placeholder image
	
		$image_url = config('site.uploads_dir') . 'images/';

		if($size == ''){
			$img = $image;
		} else {

			switch($size){
				case 'large':
					$img = str_replace('.' . pathinfo($image, PATHINFO_EXTENSION), '-large.' . pathinfo($image, PATHINFO_EXTENSION), $image);
					break;
				case 'medium':
					$img = str_replace('.' . pathinfo($image, PATHINFO_EXTENSION), '-medium.' . pathinfo($image, PATHINFO_EXTENSION), $image);
					break;
				case 'small':
					$img = str_replace('.' . pathinfo($image, PATHINFO_EXTENSION), '-small.' . pathinfo($image, PATHINFO_EXTENSION), $image);
					break;
				default:
					$img = $image;
					break;
			}
		}

		return $image_url . $img;

	}

	public static function getVideoImage($video, $size = ''){
		if($video->youtube_id){
			return 'https://img.youtube.com/vi/'.$video->youtube_id.'/mqdefault.jpg';
		}elseif(str_contains($video->url, 'facebook')){
			$bits = explode('/', rtrim($video->url,'/	'));
			return 'https://graph.facebook.com/'.end($bits).'/picture';
		}elseif($video->image){
			return ImageHandler::getImage($video->image, $size);
		}
	}


	public static function uploadImg($image, $filename){
		// Lets get all these Arguments and assign them!
		$image = $image;
		$filename = $filename; 
		$month_year = date('FY').'/';

		// Check it out! This is the upload folder
		$upload_folder = 'content/uploads/images/'.$month_year;

		if ( @getimagesize($image) ){

			// if the folder doesn't exist then create it.
			if (!file_exists($upload_folder)) {
				mkdir($upload_folder, 0777, true);
			}

			$filename =  $image->getClientOriginalName();

			// if the file exists give it a unique name
			while (file_exists($upload_folder.$filename)) {
				$filename =  uniqid() . '-' . $filename;
			}

			$uploadSuccess = $image->move($upload_folder, $filename);
		
			$settings = config('settings.site');

			$img = \Image::make($upload_folder . $filename);

			$img->save($upload_folder . $filename);
			
			return $month_year . $filename;

		} else {
			return false;
		}
	}

	public static function upload($args){

		// Lets get all these Arguments and assign them!
		$image = $args['image'];
		$folder = $args['folder'];
		$filename = $args['filename']; 
		$type = $args['type'];

		// Hey if the folder we want to put them in is images. Let's give them a month and year folder
		if($folder == 'images'){
			$month_year = date('FY').'/';
		} else {
			$month_year = '';
		}

		// Check it out! This is the upload folder
		$upload_folder = 'content/uploads/' . $folder . '/'.$month_year;


		if ( @getimagesize($image) ){

			// if the folder doesn't exist then create it.
			if (!file_exists($upload_folder)) {
				mkdir($upload_folder, 0777, true);
			}

			if($type =='upload'){

				$filename =  $image->getClientOriginalName();

				// if the file exists give it a unique name
				while (file_exists($upload_folder.$filename)) {
					$filename =  uniqid() . '-' . $filename;
				}


				$uploadSuccess = $image->move($upload_folder, $filename);

				if(strpos($filename, '.gif') > 0){
					$new_filename = str_replace('.gif', '-animation.gif', $filename);
					copy($upload_folder . $filename, $upload_folder . $new_filename);
				}

			} else if($type = 'url'){
				
				$file = file_get_contents($image);

				if(strpos($image, '.gif') > 0){
					$extension = '-animation.gif';
				} else {
					$extension = '.jpg';
				}


				$filename = $filename . $extension;

				if (file_exists($upload_folder.$filename)) {
					$filename =  uniqid() . '-' . $filename;
				}

			    if(strpos($image, '.gif') > 0){
					file_put_contents($upload_folder.$filename, $file);
					$filename = str_replace('-animation.gif', '.gif', $filename);
				}

			    file_put_contents($upload_folder.$filename, $file);

			}
		   
		
			$settings = config('settings.site');

			$img = \Image::make($upload_folder . $filename);

			if($folder == 'images'){
				$img->resize(1280, 720);

				\Image::make($upload_folder . $filename)->resize(960, null, function ($constraint) {
				    $constraint->aspectRatio();
				})->save($upload_folder . pathinfo($filename, PATHINFO_FILENAME) . '-large.' . pathinfo($filename, PATHINFO_EXTENSION));
				
				\Image::make($upload_folder . $filename)->resize(640, null, function ($constraint) {
				    $constraint->aspectRatio();
				})->save($upload_folder . pathinfo($filename, PATHINFO_FILENAME) . '-medium.' . pathinfo($filename, PATHINFO_EXTENSION));
				
				\Image::make($upload_folder . $filename)->resize(320, null, function ($constraint) {
				    $constraint->aspectRatio();
				})->save($upload_folder . pathinfo($filename, PATHINFO_FILENAME) . '-small.' . pathinfo($filename, PATHINFO_EXTENSION));
				
			} else if($folder == 'avatars'){
				$img->resize(300, null, function ($constraint) {
				    $constraint->aspectRatio();
				});
			}

			$img->save($upload_folder . $filename);
			
			return $month_year . $filename;

		} else {
			return false;
		}
	}

}