<?php
/**
 * Created by PhpStorm.
 * User: kamrulahmed
 * Date: 27/09/2018
 * Time: 11:52
 */

namespace App\Services;

use App\Contract;
use App\Story;
use App\Video;

class ContractService
{
	/**
	 * @param Contract $contract
	 * @return mixed
	 */
	private function getContractText(Contract $contract, $asset_id, $assetType = 'video', $redacted = false)
	{
		$asset = ($assetType=='video' ? Video::find($asset_id) : Story::find($asset_id));

		$contract_text = config('contracts')[$contract->contract_model_id]['text'];
		$contract_text = $contract->signed_at ? str_replace(':contract_date', '<strong>'.$contract->signed_at.'</strong>', $contract_text) : str_replace(':contract_date', '<strong>'.date('d-m-Y').'</strong>', $contract_text);
		$contract_text = str_replace(':licensor_name', '<strong>'.$asset->contact->full_name.'</strong>', $contract_text);
		$contract_text = str_replace(':licensor_email', ($redacted ? '********************' : '<strong>'.$asset->contact->email.'</strong>'), $contract_text);
		$contract_text = $asset->title ? str_replace(':story_title', ucwords($assetType).' Title: <strong>'.$asset->title.'</strong>', $contract_text) : str_replace(':story_title', '', $contract_text);
		$contract_text = $asset->url ? str_replace(':story_link', 'URL: <strong>'.$asset->url.'</strong>', $contract_text) : str_replace(':story_link', '', $contract_text);
		$contract_text = $asset->author ? str_replace(':story_author','Author: <strong>'.$asset->author.'</strong>', $contract_text) : str_replace(':story_author', '', $contract_text);
		$contract_text = !$redacted && $contract->upfront_payment ? str_replace(':upfront_payment', 'UNILAD agree to pay an initial upfront payment of: <strong>£'.$contract->upfront_payment.'</strong>.<br />', $contract_text) : str_replace(':upfront_payment', '', $contract_text);
		$contract_text = !$redacted && $contract->success_system ? str_replace(':success_system', 'UNILAD agree to pay the following, based on the performance of the '.$assetType.' on UNILAD\'s Facebook page: <strong>'.config('success_system')[$contract->success_system].'</strong>', $contract_text) : str_replace(':success_system', '', $contract_text);
		$contract_text = str_replace(':video_ref', '<strong>'.$asset->alpha_id.'</strong>', $contract_text);
		$contract_text = str_replace(':contract_ref_number', ($redacted ? '********-********-*******' : '<strong>'.$contract->reference_id.'</strong>'), $contract_text);
		$contract_text = str_replace(':unilad_share', ($redacted ? '***' : '<strong>'.(100 - $contract->revenue_share).'%</strong>'), $contract_text);
		$contract_text = str_replace(':creator_share', ($redacted ? '***' : '<strong>'.$contract->revenue_share.'%</strong>'), $contract_text);

		$currencies = config('currencies');
		if (($contract->upfront_payment_currency_id != 1) && (key_exists($contract->upfront_payment_currency_id, $currencies))) {
			$contract_text = str_replace('£', $currencies[$contract->upfront_payment_currency_id]['symbol'], $contract_text);
		}

		return $contract_text;
	}
}
