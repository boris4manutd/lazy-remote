<?php

namespace App\Classes\Platforms;

class Linux 
{
	const VOLUME_MAX = 65536;
    const VOLUME_MIN = 0;
    const VOLUME_SINGLE_STEP = 655.36;
    const VOLUME_STEP = 6553.6/2.0; //5%

	public function VolumeUp()
	{
		shell_exec("amixer -D pulse sset Master ".self::VOLUME_STEP."+");
	}
	public function VolumeDown()
	{
		shell_exec("amixer -D pulse sset Master ".self::VOLUME_STEP."-");
	}
	
	public function SetVolume(double $volume)
	{
		shell_exec("amixer -D pulse sset Master ". ($volume * self::VOLUME_SINGLE_STEP));
	}

	public function GetVolume()
	{
		/*$b = "awk -F'[][]' '/dB/ { print $2 }' <(amixer sget Master)";
		$a = exec($b);

		die(var_dump($a));*/
	}
	
	public function VolumeMute()
	{
		shell_exec("amixer -D pulse sset Master mute");
	}

	public function VolumeUnmute()
	{
		shell_exec("amixer -D pulse sset Master unmute");
	}

	// system controlls
	public function ShutDownServer()
	{
		shell_exec("shutdown -h now");
	}
	public function SleepServer()
	{
		shell_exec("pmi action suspend");
	}
	public function ResetServer()
	{
		shell_exec("shutdown -r now");
	}
	
	public function LockServer()
	{
		shell_exec("gnome-screensaver-command -l");
	}
	public function LogOffCurrentUser()
	{
		shell_exec("gnome-session-save --force-logout");
	}
}