<?php

namespace App\Classes\Outputs;
use Log;

class Success 
{
	use tOutput;
	
	public function __construct($message, $statusCode)
	{
		$this->messsage = $message;
		$this->statusCode = $statusCode;
	}
}