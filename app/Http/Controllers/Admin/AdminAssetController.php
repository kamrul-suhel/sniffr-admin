<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Story;
use App\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminAssetController extends Controller
{
	/**
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function updateField(Request $request)
	{
		$isJson = $request->ajax();
		$asset_id = $request->input('asset_id');
		$assetType = $request->input('asset_type');
		$field_id = $request->input('field_id');
		$field_value = $request->input('field_value');

		// Instantiate the asset model type
		$this->assetModel = app("App\\".str_singular(ucwords($assetType)));

		$asset = $this->assetModel->where('alpha_id', $asset_id)->first();

		dd($asset);

		if($field_id && $field_value) {
			switch (true) {
				case ($field_id == 'priority'):
					$story->priority = ($field_value!='Priority' ? $field_value : $story->priority);
					break;
				case ($field_id == 'assign_to'):
					$story->user_id = ($field_value!='Assign To' ? $field_value : $story->user_id);
					break;
			}

			// Save story data to database
			$story->save();

			return response()->json([
				'status' => 'success',
				'message' => 'Updated',
				'field_id' => ($field_id ? $field_id : 0),
				'field_value' => ($field_value ? $field_value : NULL),
				'story_id' => ($story ? $story->id : 0),
				'story_alpha_id' => ($story ? $story->alpha_id : 0),
			]);
		} else {
			return response()->json([
				'status' => 'error',
				'message' => 'Error',
				'field_id' => ($field_id ? $field_id : 0),
				'field_value' => ($field_value ? $field_value : NULL),
				'story_id' => ($story ? $story->id : 0),
				'story_alpha_id' => ($story ? $story->alpha_id : 0),
			]);
		}
	}
}
