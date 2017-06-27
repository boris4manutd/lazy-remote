<?php

namespace App\Http\Controllers;

use Log;
use Laravel\Lumen\Routing\Controller;
use Illuminate\Http\Request;
use \App\Classes\Platforms\iPlatform;

class SystemController extends Controller
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
	
	public function ShutDown()
	{
		$this->platform->ShutDownServer();
	}
	
	public function Reset()
	{
		$this->platform->ResetServer();
	}
	
	public function Sleep()
	{
		$this->platform->SleepServer();
	}
	
	public function Lock()
	{
		$this->platform->LockServer();
	}
	
	public function LogOff()
	{
		$this->platform->LogOffCurrentUser();
	}
}
