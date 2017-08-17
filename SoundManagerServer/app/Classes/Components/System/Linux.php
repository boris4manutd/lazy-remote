<?php

namespace App\Classes\Components\System;

class Linux implements iSystem
{
    private $rootPass;

    public function __construct()
    {
        $this->rootPass = env('ROOT_PASSWORD');
    }

    public function ShutDownServer()
    {
        shell_exec(sprintf('echo "%s" | sudo -S shutdown -h now 2> /dev/null', $this->rootPass));
    }

    public function SleepServer()
    {
        shell_exec(sprintf('echo "%s" | sudo -S pm-suspend -h now 2> /dev/null', $this->rootPass));
    }

    public function ResetServer()
    {
        shell_exec(sprintf('echo "%s" | sudo -S shutdown -r now 2> /dev/null', $this->rootPass));
    }

    public function LockServer()
    {
        shell_exec('gnome-screensaver-command -l');
    }

    public function LogOffCurrentUser()
    {
        // TODO: Implement LogOffCurrentUser() method.
    }
}