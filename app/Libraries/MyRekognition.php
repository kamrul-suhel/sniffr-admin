<?php

namespace App\Libraries;
use Rekognition;

class MyRekognition extends Rekognition
{
    public function startLabelDetection(array $params = [])
    {
        return $this->client->startLabelDetection($params);
    }

    public function getLabelDetection(array $params = [])
    {
        return $this->client->getLabelDetection($params);
    }

    public function startContentModeration(array $params = [])
    {
        return $this->client->startContentModeration($params);
    }

    public function getContentModeration(array $params = [])
    {
        return $this->client->getContentModeration($params);
    }

    public function startCelebrityRecognition(array $params = [])
    {
        return $this->client->startCelebrityRecognition($params);
    }

    public function getCelebrityRecognition(array $params = [])
    {
        return $this->client->getCelebrityRecognition($params);
    }
}
