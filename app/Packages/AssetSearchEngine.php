<?php

namespace App\Packages;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class AssetSearchEngine
{

	/**
	 * @var
	 */
	protected $model, $result, $data;

	/**
	 * AssetSearchEngine constructor.
	 * @param $model
	 * @param $data
	 */
	public function __construct(Model $model, array $data)
	{
		$this->model = $model;

		$this->data = $data;
	}

	/**
	 * Run search engine
	 * @return array of assets based on search parameters
	 */
	public function run(): array
	{
		$this->result = $this->model;

		$this->removeParameterFromData('page');

		// Run initial search by getting assets with a defined state.
		$this->result = $this->getState();

		// For each given parameter, filter the builder
		foreach ($this->data as $key => $value) {
			$this->result = $this->model->{'search' . ucwords($key)}($this->result, $value);
		}

		// Paginate
		$this->result = $this->paginateData();

		// Generate data for view.
		return $this->model->generateData($this->result);
	}

	/**
	 * Paginate results from asset model
	 * @return LengthAwarePaginator
	 */
	public function paginateData(): LengthAwarePaginator
	{
		return $this->model->paginateResults($this->result);
	}

	/**
	 * Get the state chosen from asset search
	 * @return mixed
	 */
	public function getState()
	{
		return $this->model->searchState($this->result, $this->data['state'] ?? null);
	}

	/**
	 * Remove page for pagination to deal with
	 * @param $name
	 */
	public function removeParameterFromData($name)
	{
		unset($this->data[$name]);
	}
}