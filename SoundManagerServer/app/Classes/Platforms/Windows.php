<?php

namespace App\Classes\Platforms;

class Windows implements IPlatform
{
    private
        $nirCmd,
        $volume,
        $isMuted,
        $balance,
        $platformInfo;

    const VOLUME_MAX = 65536;
    const VOLUME_MIN = 0;
    const VOLUME_SINGLE_STEP = 655.36;
    const VOLUME_STEP = 6553.6 / 2.0;

    public function __construct()
    {
        $this->nirCmd = base_path() . env('LIB_NIRCMD_EXE');

        $this->InitParameters();

    }

    private function InitParameters()
    {
        // for now leave as is (no balance or volume manipulation)
        $this->volume = 0;
        $this->isMuted = false;
        $this->balance = 0;

        // system
        $this->platformInfo = [
            "os" => php_uname('s'),
            "hostname" => php_uname('n'),
            "machinetype" => php_uname('m')
        ];
    }

    public function VolumeUp()
    {
        shell_exec($this->nirCmd . " changesysvolume " . self::VOLUME_STEP);
    }

    public function VolumeDown()
    {
        shell_exec($this->nirCmd . " changesysvolume -" . self::VOLUME_STEP);
    }

    public function SetVolume($volume)
    {
        shell_exec($this->nirCmd . " setsysvolume " . ($volume * self::VOLUME_SINGLE_STEP));
    }

    public function GetVolume()
    {
        return $this->volume;
    }

    public function GetIsMuted()
    {
        // TODO: Implement GetIsMuted() method.
    }

    public function GetBalance()
    {
        // TODO: Implement GetBalance() method.
    }

    public function SetBalance($balance)
    {
        // TODO: Implement SetBalance() method.
    }

    public function VolumeMute()
    {
        // TODO: Implement VolumeMute() method.
    }

    public function VolumeUnmute()
    {
        // TODO: Implement VolumeUnmute() method.
    }

    public function MuteVolume()
    {
        shell_exec($this->nirCmd . " mutesysvolume 1");
    }

    public function UnmuteVolume()
    {
        shell_exec($this->nirCmd . " mutesysvolume 0");
    }

    public function GetStatus()
    {
        /*$volume = $this->volume;
        $balance = $this->balance;
        $isMuted = $this->isMuted;*/
        $platformInfo = $this->platformInfo;

        return compact("platformInfo");
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