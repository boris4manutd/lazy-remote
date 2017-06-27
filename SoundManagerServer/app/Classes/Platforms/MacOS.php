<?php

namespace App\Classes\Platforms;

class MacOS {
	public function VolumeUp(){};
	public function VolumeDown(){};
	
	public function SetVolume(double $volume){};
	public function GetVolume(){};
	
	public function VolumeMute(){};
	public function VolumeUnmute(){};
}