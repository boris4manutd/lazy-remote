<?php

namespace App\Classes\Platforms;

interface iPlatform
{
	// sound controlls
	public function VolumeUp();
	public function VolumeDown();
	
	public function SetVolume($volume);
	public function GetVolume();
	
	public function VolumeMute();
	public function VolumeUnmute();
	
	// system controlls
	public function ShutDownServer();
	public function SleepServer();
	public function ResetServer();
	
	public function LockServer();
	public function LogOffCurrentUser();
}