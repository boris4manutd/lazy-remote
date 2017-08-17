<?php

namespace App\Classes\Outputs;

use Log;

trait tOutput
{
    private $statusCode = 200;

    private $message;

    public function SendOutput()
    {
        if (300 - (int) $this->statusCode > 100)
        {
            Log::error("Error output sent with message: {$this->message} and status code: {$this->statusCode}.");
        }

        return Response::json([
            'code' => $this->statusCode,
            'output' => $this->message,
        ], $this->statusCode);
    }
}
