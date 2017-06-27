<?php

namespace App\Classes\Platforms;

class Windows implements IPlatform 
{
	private $nirCmd;
	
    const VOLUME_MAX = 65536;
    const VOLUME_MIN = 0;
    const VOLUME_SINGLE_STEP = 655.36;
    const VOLUME_STEP = 6553.6/2.0;
	
	public function __construct()
	{
		$this->nirCmd = base_path().env('LIB_NIRCMD_EXE');
	}
	
	public function VolumeUp()
	{
		shell_exec($this->nirCmd . " changesysvolume ".self::VOLUME_STEP);
	}
	public function VolumeDown()
	{
		shell_exec($this->nirCmd . " changesysvolume -".self::VOLUME_STEP);
	}
	
	public function SetVolume($volume)
	{
		shell_exec($this->nirCmd . " setsysvolume ".($volume * self::VOLUME_SINGLE_STEP ));
	}
	public function GetVolume()
	{
		
	}
	
	public function MuteVolume()
	{
		shell_exec($this->nirCmd . " mutesysvolume 1");
	}
	public function UnmuteVolume()
	{
		shell_exec($this->nirCmd . " mutesysvolume 0");
	}
	
	// system controlls
	public function ShutDownServer()
	{
		shell_exec("shutdown -s now");
	}
	public function SleepServer()
	{
		shell_exec("shutdown -h now");
	}
	public function ResetServer()
	{
		shell_exec("shutdown -r now");
	}
	
	public function LockServer()
	{
		shell_exec("rundll32.exe user32.dll,LockWorkStation");
	}
	public function LogOffCurrentUser()
	{
		shell_exec("shutdown -l now");
	}
}