<?php

namespace App\Classes\Components\Sound;

interface iSound
{
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

}