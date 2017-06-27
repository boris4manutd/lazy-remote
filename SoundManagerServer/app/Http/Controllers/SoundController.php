<?php

namespace App\Http\Controllers;

use Log;
use Laravel\Lumen\Routing\Controller;
use Illuminate\Http\Request;
use \App\Classes\Platforms\iPlatform;

class SoundController extends Controller
{
	private $platform;
	
	public function __construct()
	{
		$os = php_uname('s');
		switch ($os) 
		{
			case "Windows NT":
				$this->platform = new \App\Classes\Platforms\Windows();
				break;
			case "Linux":
				$this->platform = new \App\Classes\Platforms\Linux();
				break;
			default:
				$this->platform = new \App\Classes\Platforms\MacOS();
			
		}
	}

	public function VolumeUp()
	{
		$this->platform->VolumeUp();
	}

	public function VolumeDown()
	{
		$this->platform->VolumeDown();
	}

	public function VolumeSet(Request $request)
	{
		$volume = $request->input('volume');

		if(!$this->ValidateInputVolume($volume))
			return response("Bad volume ({$volume}) sent.", 400);
		
		$this->platform->SetVolume($volume);
	}

	public function VolumeGet()
	{
		return $this->platform->GetVolume();
	}

	private function ValidateInputVolume($volume) 
	{
		$output = true;
		if(!is_numeric($volume))
			$output = false;

		if($volume <0 || $volume > 100)
			$output = false;

		return $output;
	}

	public function MuteVolume()
	{
		$this->platform->VolumeMute();
	}

	public function UnmuteVolume()
	{
		$this->platform->VolumeUnmute();
	}
}