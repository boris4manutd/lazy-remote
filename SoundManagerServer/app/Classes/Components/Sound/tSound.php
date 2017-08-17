<?php

namespace App\Classes\Components\Sound;

/**
 * Trait tSound, used for handling common sound data.
 *
 * @package App\Classes\Sound
 */
trait tSound
{
    private
        $platformInfo,
        $volume,
        $balance,
        $isMuted;

    /**
     * Method will set all platform related values.
     *
     */
    private function SetPlatformInfo()
    {
        $this->platformInfo = [
            "os" => php_uname('s'),
            "hostname" => php_uname('n'),
            "machinetype" => php_uname('m'),
        ];
    }
}