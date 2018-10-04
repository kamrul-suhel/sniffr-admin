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
		$assetId = $request->input('asset_id');
		$assetType = $request->input('asset_type');
		$fieldId = $request->input('field_id');
		$fieldValue = $request->input('field_value');

		// Instantiate the asset model type
		$this->assetModel = app("App\\".str_singular(ucwords($assetType)));

		$asset = $this->assetModel->where('alpha_id', $assetId)->first();

		if($isJson){
			if($fieldId && $fieldValue) {
				switch (true) {
					case ($fieldId == 'priority'):
						$asset->priority = ($fieldValue != 'Priority' ? $fieldValue : $asset->priority);
						break;
					case ($fieldId == 'assign_to'):
						$asset->user_id = ($fieldValue != 'Assign To' ? $fieldValue : $asset->user_id);
						break;
				}

				// Save story data to database
				$asset->save();

				return response()->json([
					'status' => 'success',
					'message' => 'Updated',
					'field_id' => ($fieldId ? $fieldId : 0),
					'field_value' => ($fieldValue ? $fieldValue : NULL),
					'asset_id' => ($asset ? $asset->id : 0),
					'asset_alpha_id' => ($asset ? $asset->alpha_id : 0),
				]);
			} else {
				return response()->json([
					'status' => 'error',
					'message' => 'Error',
					'field_id' => ($fieldId ? $fieldId : 0),
					'field_value' => ($fieldValue ? $fieldValue : NULL),
					'asset_id' => ($asset ? $asset->id : 0),
					'asset_alpha_id' => ($asset ? $asset->alpha_id : 0),
				]);
			}
		}
	}
}
