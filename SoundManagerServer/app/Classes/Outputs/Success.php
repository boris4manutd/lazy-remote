<?php

namespace App\Classes\Outputs;
use Log;

class Success 
{
	use Output;
	
	public function __construct($message, $statusCode)
	{
		/*$this->messsage = $message;
		$this->statusCode = $statusCode;*/
	}

}