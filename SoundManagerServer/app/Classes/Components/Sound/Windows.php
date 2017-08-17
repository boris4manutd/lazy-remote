<?php

namespace App\Classes\Components\Sound;

class Windows implements iSound
{
    use tSound;

    private $nirCmd;

    const VOLUME_MAX = 65536;
    const VOLUME_MIN = 0;
    const VOLUME_SINGLE_STEP = 655.36;
    const VOLUME_STEP = 6553.6 / 2.0;

    /**
     * Windows constructor. Here will be initiated all params that will be used in request.
     *
     */
    public function __construct()
    {
        // set path to the nircmd executable, more about nircmd: http://www.nirsoft.net/utils/nircmd.html
        $this->nirCmd = base_path().env('LIB_NIRCMD_EXE');

        $this->InitParameters();
    }

    /**
     * Params initialization, for now balance and volume are 0, because there is no native api
     * to obtain that info, also isMuted is false for same reason.
     *
     */
    private function InitParameters()
    {
        // for now leave as is (no balance or volume manipulation)
        $this->volume = 0;
        $this->isMuted = false;
        $this->balance = 0;

        // system
        $this->SetPlatformInfo();
    }

    /**
     * Method for increasing volume via nircmd program.
     *
     */
    public function VolumeUp($balance = null)
    {
        shell_exec($this->nirCmd." changesysvolume ".self::VOLUME_STEP);
    }

    /**
     * Method for decreasing volume via nircmd program.
     *
     */
    public function VolumeDown($balance = null)
    {
        shell_exec($this->nirCmd." changesysvolume -".self::VOLUME_STEP);
    }

    /**
     * Set volume by passing new value.
     *
     * @param $volume
     */
    public function SetVolume($volume)
    {
        shell_exec($this->nirCmd." setsysvolume ".($volume * self::VOLUME_SINGLE_STEP));
    }

    /**
     *  Method that will mute volume via nircmd program.
     *
     */
    public function VolumeMute()
    {
        shell_exec($this->nirCmd." mutesysvolume 1");
    }

    /**
     * Method for un muting volume via nircmd program.
     *
     */
    public function VolumeUnmute()
    {
        shell_exec($this->nirCmd." mutesysvolume 0");
    }

    /**
     * Method that will set all variables required for single request.
     *
     * @return array
     */
    public function GetStatus()
    {
        /*$volume = $this->volume;
        $balance = $this->balance;
        $isMuted = $this->isMuted;*/

        // hardcoded values for now
        $volume = 100;
        $balance = 0;
        $isMuted = false;

        $platformInfo = $this->platformInfo;

        return compact("platformInfo", "balance", "isMuted", "volume");
    }

    public function GetVolume()
    {
        // TODO: Implement GetVolume() method.
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
}