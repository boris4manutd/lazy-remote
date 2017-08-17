<?php

namespace App\Classes\Outputs;
use Log;

class Failure
{
    use tOutput;

    public function __construct($message, $statusCode)
    {
        $this->messsage = $message;
        $this->statusCode = $statusCode;
    }
}