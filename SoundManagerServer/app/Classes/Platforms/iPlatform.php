<?php

namespace App\Classes\Platforms;

interface iPlatform
{
	// sound controlls
    public function GetStatus();

    public function GetIsMuted();

    public function GetBalance();
    public function SetBalance($balance);

	public function VolumeUp($balance = null);
	public function VolumeDown($balance = null);

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