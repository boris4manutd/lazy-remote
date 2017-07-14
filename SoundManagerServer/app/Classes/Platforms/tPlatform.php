<?php

namespace App\Classes\Platforms;

trait tPlatform
{
    private
        $platformInfo,
        $volume,
        $balance,
        $isMuted;

    private function SetPlatformInfo()
    {
        $this->platformInfo = [
            "os" => php_uname('s'),
            "hostname" => php_uname('n'),
            "machinetype" => php_uname('m')
        ];
    }


}