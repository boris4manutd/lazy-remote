<?php

namespace App\Classes\Components\System;

class Windows implements iSystem
{
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